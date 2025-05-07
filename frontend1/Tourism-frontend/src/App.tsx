import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sooner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Home";
import Attractions from "./pages/Attractions";
import AttractionDetail from "./pages/AttractionDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TouristDashboard from "./pages/TouristDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import NotFound from "./pages/NotFound";
import Authentication from './pages/Authentication';
import { AuthProvider, useAuth } from "./pages/lib/auth-context";  // Add useAuth here

const queryClient = new QueryClient();

const App = () => {
  const { user } = useAuth();  // Get user info here

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/attractions" element={<Attractions />} />
             
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/attractions/:id" element={<AttractionDetail />} />
              <Route path='/tourist-dashboard' element={<TouristDashboard/>}/>
              <Route path='/company-dashboard' element={<CompanyDashboard/>} />
              <Route path='/authenticate'   element={<Authentication/>}/>
              
         

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
