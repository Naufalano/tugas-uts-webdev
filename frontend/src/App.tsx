import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  )
}

export default App