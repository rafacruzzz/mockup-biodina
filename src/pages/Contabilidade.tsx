import React, { useState, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ArrowLeft } from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import AliquotasEstadoConfig from "@/components/financeiro/AliquotasEstadoConfig";

const Contabilidade = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null);

  const mainModules = [
    {
      id: 'cadastros',
      title: 'Cadastros Contábeis',
      description: 'Cenários Fiscais e Configurações Tributárias',
      icon: Settings,
      subModules: [
        { id: 'cenarios_fiscais', title: 'Cenários Fiscais' }
      ]
    },
    {
      id: 'configuracoes',
      title: 'Configurações',
      description: 'Alíquotas por Estado, Parâmetros Fiscais, Regras Contábeis',
      icon: Settings,
      subModules: [
        { id: 'aliquotas_estado', title: 'ICMS DIFAL para não contribuinte' },
        { id: 'naturezas_operacao', title: 'Naturezas de operação de entrada (tributação)' },
        { id: 'naturezas_operacao_saida', title: 'Naturezas de operação de saída (tributação)' },
        { id: 'emissao', title: 'Emissão' }
      ]
    },
  ];

  const renderMainModules = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mainModules.map((module) => (
        <Card 
          key={module.id} 
          className="cursor-pointer hover:shadow-xl transition-all duration-300 border-l-4 border-l-biodina-blue group hover:scale-105"
          onClick={() => setActiveModule(module.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-biodina-blue/10 rounded-lg group-hover:bg-biodina-blue group-hover:text-white transition-colors">
                <module.icon className="h-6 w-6 text-biodina-blue group-hover:text-white" />
              </div>
              <CardTitle className="text-lg">{module.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{module.description}</p>
            {module.subModules && module.subModules.length > 0 && (
              <p className="text-xs text-muted-foreground mt-3 font-medium">
                {module.subModules.length} submódulo(s) disponível(is)
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSubModules = () => {
    const module = mainModules.find(m => m.id === activeModule);
    if (!module || !module.subModules || module.subModules.length === 0) return null;

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
          <h2 className="text-2xl font-bold text-biodina-blue">{module.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {module.subModules.map((subModule) => (
            <Card 
              key={subModule.id} 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 border-l-4 border-l-biodina-gold group hover:scale-105"
              onClick={() => setActiveSubModule(subModule.id)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{subModule.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Clique para acessar
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderSubModuleContent = () => {
    switch (activeSubModule) {
      case 'cenarios_fiscais':
        const CenariosFiscaisConfig = lazy(() => import('@/components/financeiro/CenariosFiscaisConfig'));
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
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
                onClick={() => setActiveSubModule(null)}
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
                onClick={() => setActiveSubModule(null)}
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
                onClick={() => setActiveSubModule(null)}
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
      case 'emissao':
        const EmissaoConfig = lazy(() => import('@/components/financeiro/EmissaoConfig'));
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <Suspense fallback={<div>Carregando...</div>}>
              <EmissaoConfig />
            </Suspense>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <h2 className="text-2xl font-bold text-biodina-blue">
                {mainModules.find(m => m.id === activeModule)?.subModules.find(s => s.id === activeSubModule)?.title}
              </h2>
            </div>
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Este módulo está em desenvolvimento. Em breve estará disponível.
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  const renderContent = () => {
    if (activeSubModule) {
      return renderSubModuleContent();
    }
    
    if (activeModule) {
      return renderSubModules();
    }
    
    return renderMainModules();
  };

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-biodina-blue mb-2">Contabilidade</h1>
          <p className="text-gray-600">Gestão contábil e fiscal da empresa</p>
        </header>

        {/* Conteúdo principal */}
        <div className="space-y-6">
          {renderContent()}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Contabilidade;
