import { useEffect, useState } from "react";
import LoginPage from "@/components/LoginPage";
import DashboardLayout from "@/components/DashboardLayout";
import ResearchInterface from "@/components/ResearchInterface";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { toast } from "sonner";

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clean up URL hash if present
    if (window.location.hash) {
      // Remove the hash without triggering a page reload
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Check current session
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        toast.error("Failed to get session. Please try again.");
        console.error('Session error:', error);
      } else {
        console.log('Session:', session);
        setSession(session);
      }
      setLoading(false);
    };

    checkSession();

    // Listen for changes to the auth state
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session);
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <DashboardLayout>
      <ResearchInterface />
    </DashboardLayout>
  );
};

export default Index;