import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { EmpresaProvider } from "@/contexts/EmpresaContext";
import { LicitacoesGanhasProvider } from "@/contexts/LicitacoesGanhasContext";
import Index from "./pages/Index";
import Super from "./pages/Super";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectPlan from "./pages/SelectPlan";
import BIGeral from "./pages/BIGeral";
import Cadastro from "./pages/Cadastro";
import Comercial from "./pages/Comercial";
import Compras from "./pages/Compras";
import Estoque from "./pages/Estoque";
import Financeiro from "./pages/Financeiro";
import Contabilidade from "./pages/Contabilidade";
import RH from "./pages/RH";
import TI from "./pages/TI";
import Administrativo from "./pages/Administrativo";
import ProcessoRescisao from "./pages/ProcessoRescisao";
import Solicitacoes from "./pages/Solicitacoes";
import Faturamento from "./pages/Faturamento";
import EditarPerfil from "./pages/EditarPerfil";
import CandidaturaPublica from "./pages/CandidaturaPublica";
import PersonalizarNavegacao from "./pages/PersonalizarNavegacao";
import MeuPlano from "./pages/MeuPlano";
import Configuracao from "./pages/Configuracao";
import AprovacaoSPIExterna from "./pages/AprovacaoSPIExterna";
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

const SuperOnlyRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useUser();

  if (user?.email !== "super@super.com.br") {
    return <Navigate to="/bi-geral" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UserProvider>
            <EmpresaProvider>
              <LicitacoesGanhasProvider>
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
                <Route path="/contabilidade" element={<Contabilidade />} />
                <Route path="/administrativo" element={<Administrativo />} />
          <Route path="/rh" element={<RH />} />
          <Route path="/ti" element={<TI />} />
          <Route path="/rh/rescisao/:colaboradorId" element={<ProcessoRescisao />} />
                <Route path="/solicitacoes" element={<SuperOnlyRoute><Solicitacoes /></SuperOnlyRoute>} />
                <Route path="/super" element={<SuperOnlyRoute><Super /></SuperOnlyRoute>} />
                <Route path="/editar-perfil" element={<EditarPerfil />} />
                <Route path="/meu-plano" element={<MeuPlano />} />
                <Route path="/personalizar-navegacao" element={<SuperOnlyRoute><PersonalizarNavegacao /></SuperOnlyRoute>} />
                <Route path="/configuracao" element={<Configuracao />} />
                {/* Rota pública para candidatura */}
                <Route path="/candidatura/:linkId" element={<CandidaturaPublica />} />
                {/* Rota pública para aprovação de SPI */}
                <Route path="/aprovacao-spi/:linkId" element={<AprovacaoSPIExterna />} />
                {/* Rota pública para seleção de planos */}
                <Route path="/select-plan/:webformId" element={<SelectPlan />} />
                {/* Rota pública para registro via webform */}
                <Route path="/register/:webformId" element={<Register />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
                </Routes>
              </LicitacoesGanhasProvider>
            </EmpresaProvider>
          </UserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
