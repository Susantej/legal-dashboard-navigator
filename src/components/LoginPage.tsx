import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
  const handleGithubLogin = () => {
    // OAuth login logic would go here
    console.log("GitHub OAuth login initiated");
    toast.error("GitHub OAuth integration not configured. Please set up OAuth credentials.");
  };

  const handleGoogleLogin = () => {
    // OAuth login logic would go here
    console.log("Google OAuth login initiated");
    toast.error("Google OAuth integration not configured. Please set up OAuth credentials.");
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