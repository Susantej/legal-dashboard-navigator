import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const LoginPage = () => {
  const handleOAuthLogin = () => {
    // OAuth login logic would go here
    console.log("OAuth login initiated");
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
            onClick={handleOAuthLogin}
            className="w-full flex items-center justify-center gap-2"
          >
            <Github className="h-5 w-5" />
            Sign in with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;