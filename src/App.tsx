import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SelfService from "./pages/Catalog";
import CatalogList from "./pages/CatalogList";
import ServiceDetail from "./pages/ServiceDetail";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import TeamOnboarding from "./pages/TeamOnboarding";
import CostInsights from "./pages/CostInsights";
import DocumentationPage from "./pages/Documentation";
import EngineeringMetrics from "./pages/EngineeringMetrics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/self-service" element={<SelfService />} />
          <Route path="/catalog" element={<CatalogList />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/onboarding" element={<TeamOnboarding />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/cost-insights" element={<CostInsights />} />
          <Route path="/docs" element={<DocumentationPage />} />
          <Route path="/engineering-metrics" element={<EngineeringMetrics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
