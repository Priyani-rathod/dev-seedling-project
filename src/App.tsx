import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DiseaseDetection from "./pages/DiseaseDetection";
import CropRecommendation from "./pages/CropRecommendation";
import FertilizerRecommendation from "./pages/FertilizerRecommendation";
import Chatbot from "./pages/Chatbot";
import History from "./pages/History";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Weather from "./pages/Weather";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<><Dashboard /><BottomNav /></>} />
        <Route path="/disease-detection" element={<><DiseaseDetection /><BottomNav /></>} />
        <Route path="/crop-recommendation" element={<><CropRecommendation /><BottomNav /></>} />
        <Route path="/fertilizer-recommendation" element={<><FertilizerRecommendation /><BottomNav /></>} />
        <Route path="/chatbot" element={<><Chatbot /><BottomNav /></>} />
        <Route path="/history" element={<><History /><BottomNav /></>} />
        <Route path="/community" element={<><Community /><BottomNav /></>} />
        <Route path="/profile" element={<><Profile /><BottomNav /></>} />
        <Route path="/weather" element={<><Weather /><BottomNav /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
