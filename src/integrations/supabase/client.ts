// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ktmtukpggnlliitfplpp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0bXR1a3BnZ25sbGlpdGZwbHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODU1OTQsImV4cCI6MjA1NDI2MTU5NH0.KqyWQaukXkP7o_p2fG5afvXgVKZZXhb_tJu3sfitpFY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);