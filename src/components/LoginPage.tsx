import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing. Please check your environment variables.');
  toast.error('Authentication configuration error. Please contact support.');
}

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

const LoginPage = () => {
  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      toast.error("Failed to sign in with GitHub. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Google OAuth error:', error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Legal Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
          >
            <Github className="h-5 w-5" />
            Sign in with GitHub
          </Button>
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
          >
            <Mail className="h-5 w-5" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;