import React, { useState, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calculator, FileInput, FileOutput } from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import AliquotasEstadoConfig from "@/components/financeiro/AliquotasEstadoConfig";

const Contabilidade = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const modules = [
    { id: 'cenarios_fiscais', title: 'Cenários Fiscais', icon: FileText },
    { id: 'aliquotas_estado', title: 'ICMS DIFAL para não contribuinte', icon: Calculator },
    { id: 'naturezas_operacao', title: 'Naturezas de operação de entrada (tributação)', icon: FileInput },
    { id: 'naturezas_operacao_saida', title: 'Naturezas de operação de saída (tributação)', icon: FileOutput }
  ];

  const renderModules = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <Card 
          key={module.id} 
          className="cursor-pointer hover:shadow-xl transition-all duration-300 border-l-4 border-l-biodina-gold group hover:scale-105"
          onClick={() => setActiveModule(module.id)}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-biodina-gold/10 rounded-lg group-hover:bg-biodina-gold group-hover:text-white transition-colors">
                <module.icon className="h-6 w-6 text-biodina-gold group-hover:text-white" />
              </div>
              <CardTitle className="text-lg">{module.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Clique para acessar
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'cenarios_fiscais':
        const CenariosFiscaisConfig = lazy(() => import('@/components/financeiro/CenariosFiscaisConfig'));
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <Suspense fallback={<div>Carregando...</div>}>
              <CenariosFiscaisConfig />
            </Suspense>
          </div>
        );
      case 'aliquotas_estado':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <AliquotasEstadoConfig />
          </div>
        );
      case 'naturezas_operacao':
        const NaturezasOperacaoConfig = lazy(() => import('@/components/financeiro/NaturezasOperacaoConfig'));
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <Suspense fallback={<div>Carregando...</div>}>
              <NaturezasOperacaoConfig />
            </Suspense>
          </div>
        );
      case 'naturezas_operacao_saida':
        const NaturezasOperacaoSaidaConfig = lazy(() => import('@/components/financeiro/NaturezasOperacaoSaidaConfig'));
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <Suspense fallback={<div>Carregando...</div>}>
              <NaturezasOperacaoSaidaConfig />
            </Suspense>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-biodina-blue mb-2">Contabilidade</h1>
          <p className="text-gray-600">Gestão contábil e fiscal da empresa</p>
        </header>

        <div className="space-y-6">
          {activeModule ? renderModuleContent() : renderModules()}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Contabilidade;
