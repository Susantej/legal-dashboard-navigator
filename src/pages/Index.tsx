import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import DashboardLayout from "@/components/DashboardLayout";
import ResearchInterface from "@/components/ResearchInterface";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <DashboardLayout>
      <ResearchInterface />
    </DashboardLayout>
  );
};

export default Index;