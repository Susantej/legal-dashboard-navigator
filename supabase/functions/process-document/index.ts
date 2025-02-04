import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { extract } from 'https://deno.land/x/pdf_extract@v1.1.1/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: 'No file uploaded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Generate a unique file path
    const fileExt = file.name.split('.').pop()
    const filePath = `${crypto.randomUUID()}.${fileExt}`

    // Create document record in database
    const { data: docRecord, error: dbError } = await supabase
      .from('processed_documents')
      .insert({
        original_filename: file.name,
        file_path: filePath,
        content_type: file.type,
        status: 'processing'
      })
      .select()
      .single()

    if (dbError) {
      throw dbError
    }

    // Start background processing
    EdgeRuntime.waitUntil((async () => {
      try {
        // Upload file to storage
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file)

        if (uploadError) {
          throw uploadError
        }

        // Get file URL
        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath)

        // Download the file for processing
        const response = await fetch(publicUrl)
        const fileBuffer = await response.arrayBuffer()

        let extractedText = ''
        if (file.type === 'application/pdf') {
          // Extract text from PDF
          const pdfText = await extract(new Uint8Array(fileBuffer))
          extractedText = pdfText.text
        } else {
          // For other file types, convert to text
          extractedText = new TextDecoder().decode(fileBuffer)
        }

        // Process the text and structure it
        const structuredData = {
          content: extractedText,
          metadata: {
            filename: file.name,
            fileType: file.type,
            processedAt: new Date().toISOString(),
          },
          // Add more structured data as needed
        }

        // Update the document record with processed data
        await supabase
          .from('processed_documents')
          .update({
            status: 'completed',
            processed_data: structuredData,
            updated_at: new Date().toISOString()
          })
          .eq('id', docRecord.id)

      } catch (error) {
        console.error('Processing error:', error)
        // Update document status to failed
        await supabase
          .from('processed_documents')
          .update({
            status: 'failed',
            updated_at: new Date().toISOString()
          })
          .eq('id', docRecord.id)
      }
    })())

    return new Response(
      JSON.stringify({ message: 'Document processing started', filePath }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing document:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})