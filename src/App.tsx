
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import BIGeral from "./pages/BIGeral";
import Cadastro from "./pages/Cadastro";
import Comercial from "./pages/Comercial";
import Compras from "./pages/Compras";
import Estoque from "./pages/Estoque";
import Financeiro from "./pages/Financeiro";
import RH from "./pages/RH";
import EditarPerfil from "./pages/EditarPerfil";
import CandidaturaPublica from "./pages/CandidaturaPublica";
import PersonalizarNavegacao from "./pages/PersonalizarNavegacao";
import NotFound from "./pages/NotFound";

// Create QueryClient instance outside of component to avoid recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/bi-geral" element={<BIGeral />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/comercial" element={<Comercial />} />
              <Route path="/compras" element={<Compras />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/rh" element={<RH />} />
              <Route path="/editar-perfil" element={<EditarPerfil />} />
              <Route path="/personalizar-navegacao" element={<PersonalizarNavegacao />} />
              {/* Rota pública para candidatura */}
              <Route path="/candidatura/:linkId" element={<CandidaturaPublica />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
