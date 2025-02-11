import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, FileText, CheckCircle, XCircle } from "lucide-react";

interface ProcessedDocument {
  id: string;
  original_filename: string;
  status: string;
  processed_data: any;
  created_at: string;
}

const DocumentProcessor = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<ProcessedDocument[]>([]);

  useEffect(() => {
    fetchDocuments();
    // Subscribe to realtime updates
    const subscription = supabase
      .channel('processed_documents_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'processed_documents' 
      }, payload => {
        fetchDocuments();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('processed_documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching documents:', error);
      toast.error("Failed to fetch documents");
      return;
    }

    setDocuments(data || []);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await supabase.functions.invoke('process-document', {
        body: formData,
      });

      if (response.error) throw response.error;

      toast.success("Document uploaded and processing started");
      setFile(null);
      // Clear the file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-white">
      <h2 className="text-2xl font-bold text-primary">Document Processing</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Document
          </label>
          <Input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="w-full bg-white"
          />
          <p className="mt-1 text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX, TXT
          </p>
        </div>

        <Button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Process Document"
          )}
        </Button>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Documents</h3>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(doc.status)}
                  <div>
                    <p className="font-medium">{doc.original_filename}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(doc.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DocumentProcessor;