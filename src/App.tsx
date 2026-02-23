import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { AppShell } from "@/components/layout/AppShell";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { CategoryPage } from "./pages/CategoryPage";
import { JovenesTalentos } from "./pages/JovenesTalentos";

const queryClient = new QueryClient();
const NEW_UX_ENABLED = (import.meta.env.VITE_NEW_UX ?? "true") === "true";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TranslationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {NEW_UX_ENABLED ? (
            <AppShell>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/restaurants" element={<CategoryPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/jovenes-talentos" element={<JovenesTalentos />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppShell>
          ) : (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/restaurants" element={<CategoryPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/jovenes-talentos" element={<JovenesTalentos />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TranslationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
