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
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        toast.success("Successfully logged in!");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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