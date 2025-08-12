import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Package,
  FileText, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Target,
  ArrowRight,
  Plus
} from "lucide-react";
import OportunidadeForm from "@/components/comercial/OportunidadeForm";
import OportunidadeAvancadaForm from "@/components/comercial/OportunidadeAvancadaForm";
import ContratacaoSimplesForm from "@/components/comercial/ContratacaoSimplesForm";
import ImportacaoDiretaForm from "@/components/comercial/ImportacaoDiretaForm";
import AgendaComercial from "@/components/comercial/AgendaComercial";
import ChatInterno from "@/components/comercial/ChatInterno";
import EmprestimosDashboard from "@/components/comercial/EmprestimosDashboard";

const Comercial = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showOportunidadeForm, setShowOportunidadeForm] = useState(false);
  const [showOportunidadeAvancadaForm, setShowOportunidadeAvancadaForm] = useState(false);
  const [showContratacaoSimplesForm, setShowContratacaoSimplesForm] = useState(false);
  const [showImportacaoDiretaForm, setShowImportacaoDiretaForm] = useState(false);
  const [selectedOportunidade, setSelectedOportunidade] = useState<any>(null);

  const modules = [
    {
      id: 'vendas',
      title: 'Vendas',
      description: 'Gestão completa do processo de vendas',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      items: [
        'Oportunidades',
        'Propostas Comerciais', 
        'Pedidos',
        'Contratos'
      ]
    },
    {
      id: 'pos-venda',
      title: 'Pós-Venda',
      description: 'Acompanhamento e suporte pós-venda',
      icon: <Users className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      items: [
        'Suporte ao Cliente',
        'Garantias',
        'Manutenções',
        'Feedback'
      ]
    },
    {
      id: 'emprestimos',
      title: 'Empréstimos',
      description: 'Gestão de empréstimos e devoluções',
      icon: <Package className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      items: [
        'Novos Empréstimos',
        'Devoluções',
        'Controle de Saldo',
        'Relatórios'
      ]
    }
  ];

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  const handleNovaOportunidadeClick = () => {
    setShowOportunidadeForm(true);
    setSelectedOportunidade(null);
  };

  const handleEditarOportunidadeClick = (oportunidade: any) => {
    setSelectedOportunidade(oportunidade);
    setShowOportunidadeForm(true);
  };

  const handleOportunidadeSaved = (oportunidadeData: any) => {
    console.log('Oportunidade salva:', oportunidadeData);
    setShowOportunidadeForm(false);
    setSelectedOportunidade(null);
  };

  const handleOportunidadeFormClose = () => {
    setShowOportunidadeForm(false);
    setSelectedOportunidade(null);
  };

  const handleNovaOportunidadeAvancadaClick = () => {
    setShowOportunidadeAvancadaForm(true);
  };

  const handleOportunidadeAvancadaFormClose = () => {
    setShowOportunidadeAvancadaForm(false);
  };

  const handleNovaContratacaoSimplesClick = () => {
    setShowContratacaoSimplesForm(true);
  };

  const handleContratacaoSimplesFormClose = () => {
    setShowContratacaoSimplesForm(false);
  };

  const handleNovaImportacaoDiretaClick = () => {
    setShowImportacaoDiretaForm(true);
    setSelectedOportunidade(null);
  };

  const handleImportacaoDiretaSaved = (oportunidadeData: any) => {
    console.log('Importação Direta salva:', oportunidadeData);
    setShowImportacaoDiretaForm(false);
    setSelectedOportunidade(null);
  };

  const handleImportacaoDiretaFormClose = () => {
    setShowImportacaoDiretaForm(false);
    setSelectedOportunidade(null);
  };

  const renderModuleContent = () => {
    if (activeModule === 'emprestimos') {
      return <EmprestimosDashboard />;
    }
    
    if (activeModule === 'vendas') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Oportunidades</CardTitle>
              <CardDescription>Gerencie suas oportunidades de venda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="ghost">
                <FileText className="h-4 w-4 mr-2" />
                Listar Oportunidades
              </Button>
              <Button className="w-full justify-start" variant="ghost" onClick={handleNovaOportunidadeClick}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Oportunidade
              </Button>
              <Button className="w-full justify-start" variant="ghost" onClick={handleNovaOportunidadeAvancadaClick}>
                <Target className="h-4 w-4 mr-2" />
                Oportunidade Avançada
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Contratações</CardTitle>
              <CardDescription>Gerencie suas contratações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="ghost">
                <FileText className="h-4 w-4 mr-2" />
                Listar Contratações
              </Button>
              <Button className="w-full justify-start" variant="ghost" onClick={handleNovaContratacaoSimplesClick}>
                <Plus className="h-4 w-4 mr-2" />
                Contratação Simples
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Importação Direta</CardTitle>
              <CardDescription>Gerencie suas importações diretas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="ghost">
                <FileText className="h-4 w-4 mr-2" />
                Listar Importações
              </Button>
              <Button className="w-full justify-start" variant="ghost" onClick={handleNovaImportacaoDiretaClick}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Importação Direta
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (activeModule === 'pos-venda') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Suporte ao Cliente</CardTitle>
              <CardDescription>Gerencie o suporte ao cliente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="ghost">
                <FileText className="h-4 w-4 mr-2" />
                Listar Tickets de Suporte
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Plus className="h-4 w-4 mr-2" />
                Novo Ticket de Suporte
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Garantias</CardTitle>
              <CardDescription>Gerencie as garantias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="ghost">
                <FileText className="h-4 w-4 mr-2" />
                Listar Garantias
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Plus className="h-4 w-4 mr-2" />
                Nova Garantia
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Manutenções</CardTitle>
              <CardDescription>Gerencie as manutenções</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="ghost">
                <FileText className="h-4 w-4 mr-2" />
                Listar Manutenções
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Plus className="h-4 w-4 mr-2" />
                Nova Manutenção
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="text-center py-24">
        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-xl font-semibold text-gray-600">
          Selecione um módulo para começar
        </p>
        <p className="text-gray-500">
          Clique em um dos módulos acima para acessar as ferramentas
        </p>
      </div>
    );
  };

  return (
    <SidebarLayout>
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-biodina-blue mb-2">
            Módulo Comercial
          </h1>
          <p className="text-gray-500">
            Gerencie suas vendas, pós-venda e outras atividades comerciais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {modules.map((module) => (
            <Card
              key={module.id}
              className={`bg-gradient-to-br ${module.color} text-white cursor-pointer hover:scale-105 transition-transform`}
              onClick={() => handleModuleClick(module.id)}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  {module.icon}
                  {module.title}
                </CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  {module.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 py-1">
                      <ArrowRight className="h-4 w-4 text-white/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {renderModuleContent()}

        <ImportacaoDiretaForm
          isOpen={showImportacaoDiretaForm}
          onClose={handleImportacaoDiretaFormClose}
          onSave={handleImportacaoDiretaSaved}
          oportunidade={selectedOportunidade}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Agenda Comercial</CardTitle>
              <CardDescription>Compromissos e eventos da equipe comercial</CardDescription>
            </CardHeader>
            <CardContent>
              <AgendaComercial />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Chat Interno</CardTitle>
              <CardDescription>Comunicação interna da equipe comercial</CardDescription>
            </CardHeader>
            <CardContent>
              <ChatInterno oportunidadeId="" />
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Comercial;
