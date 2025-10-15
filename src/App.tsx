import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import BottomNav from "@/components/BottomNav";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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

// Create query client outside component to avoid recreating on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /><BottomNav /></ProtectedRoute>} />
            <Route path="/disease-detection" element={<ProtectedRoute><DiseaseDetection /><BottomNav /></ProtectedRoute>} />
            <Route path="/crop-recommendation" element={<ProtectedRoute><CropRecommendation /><BottomNav /></ProtectedRoute>} />
            <Route path="/fertilizer-recommendation" element={<ProtectedRoute><FertilizerRecommendation /><BottomNav /></ProtectedRoute>} />
            <Route path="/chatbot" element={<ProtectedRoute><Chatbot /><BottomNav /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><History /><BottomNav /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><Community /><BottomNav /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /><BottomNav /></ProtectedRoute>} />
            <Route path="/weather" element={<ProtectedRoute><Weather /><BottomNav /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
