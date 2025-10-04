import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Index = lazy(() => import("./pages/Index"));
const LoginSignupPage = lazy(() => import("./pages/LoginSignupPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const PatientDetailsPage = lazy(() => import("./pages/PatientDetailsPage"));
const NearbyFacilitiesPage = lazy(() => import("./pages/NearbyFacilitiesPage"));
const ArrivalRegistrationPage = lazy(() => import("./pages/ArrivalRegistrationPage"));
const TriagePage = lazy(() => import("./pages/TriagePage"));
const ConsultationPage = lazy(() => import("./pages/ConsultationPage"));
const DiagnosticPage = lazy(() => import("./pages/DiagnosticPage"));
const DonatePage = lazy(() => import("./pages/DonatePage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
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
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
