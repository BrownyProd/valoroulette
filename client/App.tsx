import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Minigames from "./pages/Minigames";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const queryClient = new QueryClient();

import { I18nProvider } from "@/i18n/I18nProvider";

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <TooltipProvider> */}
      <Toaster />
      <Sonner />
      <I18nProvider>
      <BrowserRouter basename="/ui.valoroulette.com">
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/minigames" element={<Minigames />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
</I18nProvider>

    {/* </TooltipProvider> */}
  </QueryClientProvider>
);

const container = document.getElementById("root")!;
// Prevent creating multiple roots during HMR; reuse existing root if present
const existing = (window as any).__app_root;
const root = existing ?? createRoot(container);
if (!existing) (window as any).__app_root = root;
root.render(<App />);
