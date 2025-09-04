import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginSignupPage from "./pages/LoginSignupPage";
import AccountPage from "./pages/AccountPage";
import SettingsPage from "./pages/SettingsPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import NearbyFacilitiesPage from "./pages/NearbyFacilitiesPage";
import ArrivalRegistrationPage from "./pages/ArrivalRegistrationPage";
import TriagePage from "./pages/TriagePage";
import ConsultationPage from "./pages/ConsultationPage";
import DiagnosticPage from "./pages/DiagnosticPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/patient-details" element={<PatientDetailsPage />} />
          <Route path="/nearby-facilities" element={<NearbyFacilitiesPage />} />
          <Route path="/arrival-registration" element={<ArrivalRegistrationPage />} />
          <Route path="/triage" element={<TriagePage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/diagnostics" element={<DiagnosticPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
