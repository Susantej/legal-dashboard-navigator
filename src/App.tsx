import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Document from "./pages/Document";
import DashboardLayout from "./components/DashboardLayout"; // Import DashboardLayout
import Register from "./pages/Register";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Index />} />
          <Route path="/courtney-sessions" element={<DashboardLayout><Index /></DashboardLayout>} />
          <Route path="/courtney-sessions/documents" element={<Document />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Add this route */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
