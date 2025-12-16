import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaturamentoResumo from "@/components/faturamento/FaturamentoResumo";
import DashboardRelatorios from "@/components/faturamento/DashboardRelatorios";
import EntradaFaturamento from "@/components/faturamento/EntradaFaturamento";
import SaidaFaturamento from "@/components/faturamento/SaidaFaturamento";
import ServicosFaturamento from "@/components/faturamento/ServicosFaturamento";
import CartasFaturamento from "@/components/faturamento/CartasFaturamento";
import { 
  LayoutDashboard, 
  BarChart3, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Settings, 
  FileText 
} from "lucide-react";

const Faturamento = () => {
  const [activeTab, setActiveTab] = useState('faturamento');

  return (
    <SidebarLayout>
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Faturamento</h1>
              <p className="text-sm text-muted-foreground">Gestão completa de documentos fiscais</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start bg-muted/50 p-1 h-auto flex-wrap gap-1">
                <TabsTrigger 
                  value="faturamento" 
                  className="flex items-center gap-2 data-[state=active]:bg-background"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Faturamento
                </TabsTrigger>
                <TabsTrigger 
                  value="dashboard" 
                  className="flex items-center gap-2 data-[state=active]:bg-background"
                >
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="entrada" 
                  className="flex items-center gap-2 data-[state=active]:bg-background"
                >
                  <ArrowDownCircle className="h-4 w-4" />
                  Entrada
                </TabsTrigger>
                <TabsTrigger 
                  value="saida" 
                  className="flex items-center gap-2 data-[state=active]:bg-background"
                >
                  <ArrowUpCircle className="h-4 w-4" />
                  Saída
                </TabsTrigger>
                <TabsTrigger 
                  value="servicos" 
                  className="flex items-center gap-2 data-[state=active]:bg-background"
                >
                  <Settings className="h-4 w-4" />
                  Serviços
                </TabsTrigger>
                <TabsTrigger 
                  value="documentos" 
                  className="flex items-center gap-2 data-[state=active]:bg-background"
                >
                  <FileText className="h-4 w-4" />
                  Documentos e Declarações
                </TabsTrigger>
              </TabsList>

              <TabsContent value="faturamento" className="mt-6">
                <FaturamentoResumo />
              </TabsContent>

              <TabsContent value="dashboard" className="mt-6">
                <DashboardRelatorios />
              </TabsContent>

              <TabsContent value="entrada" className="mt-6">
                <EntradaFaturamento />
              </TabsContent>

              <TabsContent value="saida" className="mt-6">
                <SaidaFaturamento />
              </TabsContent>

              <TabsContent value="servicos" className="mt-6">
                <ServicosFaturamento />
              </TabsContent>

              <TabsContent value="documentos" className="mt-6">
                <CartasFaturamento />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Faturamento;
