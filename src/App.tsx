import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Landing from "./pages/auth/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import HospitalDashboard from "./pages/dashboard/HospitalDashboard";
import DonorDashboard from "./pages/dashboard/DonorDashboard";
import BloodBankDashboard from "./pages/dashboard/BloodBankDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import DonorManagement from "./pages/hospital/DonorManagement";
import PatientManagement from "./pages/hospital/PatientManagement";
import EmergencySOS from "./pages/hospital/EmergencySOS";
import Profile from "./pages/donor/Profile";
import SOSAlerts from "./pages/donor/SOSAlerts";
import RecentActivity from "./pages/donor/RecentActivity";
import Inventory from "./pages/bloodbank/Inventory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/login/:role" element={<Login />} />
              <Route path="/auth/signup/:role" element={<Signup />} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/dashboard/hospital" element={<DashboardLayout><HospitalDashboard /></DashboardLayout>} />
              <Route path="/hospital/donors" element={<DashboardLayout><DonorManagement /></DashboardLayout>} />
              <Route path="/hospital/patients" element={<DashboardLayout><PatientManagement /></DashboardLayout>} />
              <Route path="/hospital/emergency" element={<DashboardLayout><EmergencySOS /></DashboardLayout>} />
              
              <Route path="/dashboard/donor" element={<DashboardLayout><DonorDashboard /></DashboardLayout>} />
              <Route path="/donor/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
              <Route path="/donor/sos" element={<DashboardLayout><SOSAlerts /></DashboardLayout>} />
              <Route path="/donor/activity" element={<DashboardLayout><RecentActivity /></DashboardLayout>} />
              
              <Route path="/dashboard/bloodbank" element={<DashboardLayout><BloodBankDashboard /></DashboardLayout>} />
              <Route path="/bloodbank/inventory" element={<DashboardLayout><Inventory /></DashboardLayout>} />
              
              <Route path="/dashboard/admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
