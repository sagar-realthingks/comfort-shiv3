import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import GoogleReviewWidget from "@/components/GoogleReviewWidget";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";
import { DataStoreProvider } from "@/contexts/DataStoreContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AMC from "./pages/AMC";
import ServiceAreas from "./pages/ServiceAreas";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AdminLogin } from "./pages/admin/Login";
import { AdminDashboard } from "./pages/admin/Dashboard";

const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Admin routes should not have PageTransition or Navbar/Footer
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes location={location}>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DataStoreProvider>
          <AppContent />
        </DataStoreProvider>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <ScrollProgress />}
      <div className="flex flex-col min-h-screen">
        {!isAdminRoute && <Navbar />}
        <main className={isAdminRoute ? "" : "flex-grow"}>
          <AnimatedRoutes />
        </main>
        {!isAdminRoute && (
          <>
            <Footer />
            <WhatsAppButton />
            <GoogleReviewWidget />
          </>
        )}
      </div>
    </>
  );
};

export default App;