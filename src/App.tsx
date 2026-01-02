import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import VisitorTracker from "@/components/VisitorTracker";
import { DataDashboard } from "@/components/DataDashboard";
import PreLaunchIndex from "./pages/PreLaunchIndex";
import WaitlistConfirmation from "./pages/WaitlistConfirmation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminWaitlist from "./pages/admin/AdminWaitlist";
import AdminVisitors from "./pages/admin/AdminVisitors";
import AdminEmails from "./pages/admin/AdminEmails";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GoogleAnalytics />
            <VisitorTracker />
            <Routes>
              <Route path="/" element={<PreLaunchIndex />} />
              <Route path="/dashboard" element={<DataDashboard />} />
              <Route path="/confirmation" element={<WaitlistConfirmation />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              
              {/* Admin Routes */}
              <Route path="/admin/auth" element={<AdminAuth />} />
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<AdminOverview />} />
                <Route path="waitlist" element={<AdminWaitlist />} />
                <Route path="visitors" element={<AdminVisitors />} />
                <Route path="emails" element={<AdminEmails />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
