import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/SidebarLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Plus } from "lucide-react";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { SuperStats } from "@/components/super/SuperStats";
import { GestaoEmpresas } from "@/components/super/GestaoEmpresas";
import { GestaoPerfis } from "@/components/super/GestaoPerfis";
import { GestaoPlanos } from "@/components/super/GestaoPlanos";
import { GestaoWebforms } from "@/components/super/GestaoWebforms";
import { NovaEmpresaModal } from "@/components/super/NovaEmpresaModal";
import { PerfilModal } from "@/components/super/PerfilModal";
import { PlanoModal } from "@/components/super/PlanoModal";
import { WebformModal } from "@/components/super/WebformModal";
import { WebformStatsModal } from "@/components/super/WebformStatsModal";
import { SuperSidebar } from "@/components/super/SuperSidebar";
import { EmptyStateSuper } from "@/components/super/EmptyStateSuper";
import { Empresa, PerfilAcesso, Plano, Webform } from "@/types/super";
import { perfisAcessoMock, planosMock } from "@/data/superModules";
import { useToast } from "@/hooks/use-toast";

const Super = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    empresas,
    isMasterUser,
    trocarEmpresa,
    adicionarEmpresa,
    atualizarEmpresa,
    suspenderEmpresa,
    ativarEmpresa,
    webforms,
    adicionarWebform,
    atualizarWebform,
    excluirWebform,
    ativarWebform,
    desativarWebform,
  } = useEmpresa();
  
  const [novaEmpresaOpen, setNovaEmpresaOpen] = useState(false);
  const [perfilModalOpen, setPerfilModalOpen] = useState(false);
  const [perfilParaEditar, setPerfilParaEditar] = useState<PerfilAcesso | undefined>();
  const [perfis, setPerfis] = useState<PerfilAcesso[]>(perfisAcessoMock);
  const [planoModalOpen, setPlanoModalOpen] = useState(false);
  const [planoParaEditar, setPlanoParaEditar] = useState<Plano | undefined>();
  const [planos, setPlanos] = useState<Plano[]>(planosMock);
  const [webformModalOpen, setWebformModalOpen] = useState(false);
  const [webformParaEditar, setWebformParaEditar] = useState<Webform | undefined>();
  const [webformStatsOpen, setWebformStatsOpen] = useState(false);
  const [webformParaStats, setWebformParaStats] = useState<Webform | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState("empresas");
  const [activeSubModule, setActiveSubModule] = useState("gestao");
  const [expandedModules, setExpandedModules] = useState<string[]>(["empresas"]);

  // Proteção: apenas usuários Master podem acessar
  if (!isMasterUser) {
    return (
      <SidebarLayout>
        <div className="flex items-center justify-center h-screen">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Acesso Negado</CardTitle>
              <CardDescription>
                Você não tem permissão para acessar o módulo SUPER.
                Apenas usuários da empresa Master podem gerenciar o sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/home")} className="w-full">
                Voltar para Aplicativos
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    );
  }

  const handleAcessarEmpresa = (empresaId: string) => {
    trocarEmpresa(empresaId);
    toast({
      title: "Empresa Alterada",
      description: `Você está agora acessando o sistema como ${empresas.find(e => e.id === empresaId)?.nome}`
    });
    navigate("/home");
  };

  const handleNovaEmpresa = (empresa: Empresa) => {
    adicionarEmpresa(empresa);
  };

  // Handlers para Perfis
  const handleNovoPerfil = () => {
    setPerfilParaEditar(undefined);
    setPerfilModalOpen(true);
  };

  const handleEditarPerfil = (perfil: PerfilAcesso) => {
    setPerfilParaEditar(perfil);
    setPerfilModalOpen(true);
  };

  const handleSalvarPerfil = (perfilData: Omit<PerfilAcesso, "id" | "dataCriacao">) => {
    if (perfilParaEditar) {
      // Editar perfil existente
      setPerfis((prev) =>
        prev.map((p) =>
          p.id === perfilParaEditar.id
            ? { ...p, ...perfilData, dataAtualizacao: new Date().toISOString() }
            : p
        )
      );
    } else {
      // Criar novo perfil
      const novoPerfil: PerfilAcesso = {
        id: `perfil-${Date.now()}`,
        ...perfilData,
        dataCriacao: new Date().toISOString(),
      };
      setPerfis((prev) => [...prev, novoPerfil]);
    }
  };

  const handleExcluirPerfil = (perfilId: string) => {
    setPerfis((prev) => prev.filter((p) => p.id !== perfilId));
    toast({
      title: "Perfil Excluído",
      description: "O perfil foi removido com sucesso",
    });
  };

  // Handlers para Planos
  const handleNovoPlano = () => {
    setPlanoParaEditar(undefined);
    setPlanoModalOpen(true);
  };

  const handleEditarPlano = (plano: Plano) => {
    setPlanoParaEditar(plano);
    setPlanoModalOpen(true);
  };

  const handleSalvarPlano = (planoData: Omit<Plano, "id" | "dataCriacao">) => {
    if (planoParaEditar) {
      // Editar plano existente
      setPlanos((prev) =>
        prev.map((p) =>
          p.id === planoParaEditar.id
            ? { ...p, ...planoData, dataAtualizacao: new Date().toISOString() }
            : p
        )
      );
    } else {
      // Criar novo plano
      const novoPlano: Plano = {
        id: `plano-${Date.now()}`,
        ...planoData,
        dataCriacao: new Date().toISOString(),
      };
      setPlanos((prev) => [...prev, novoPlano]);
    }
  };

  const handleExcluirPlano = (planoId: string) => {
    setPlanos((prev) => prev.filter((p) => p.id !== planoId));
  };

  // Handlers para Webforms
  const handleNovoWebform = () => {
    setWebformParaEditar(undefined);
    setWebformModalOpen(true);
  };

  const handleEditarWebform = (webform: Webform) => {
    setWebformParaEditar(webform);
    setWebformModalOpen(true);
  };

  const handleSalvarWebform = (webformData: Omit<Webform, "id" | "dataCriacao" | "totalAcessos" | "totalCadastros">) => {
    if (webformParaEditar) {
      // Editar webform existente
      atualizarWebform(webformParaEditar.id, webformData);
    } else {
      // Criar novo webform
      const novoWebform: Webform = {
        id: `wf-${Date.now()}`,
        ...webformData,
        dataCriacao: new Date().toISOString(),
        totalAcessos: 0,
        totalCadastros: 0,
      };
      adicionarWebform(novoWebform);
    }
  };

  const handleVerStatsWebform = (webform: Webform) => {
    setWebformParaStats(webform);
    setWebformStatsOpen(true);
  };

  const handleModuleToggle = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
    setActiveModule(moduleId);
  };

  const handleSubModuleSelect = (moduleId: string, subModuleId: string) => {
    setActiveModule(moduleId);
    setActiveSubModule(subModuleId);
    if (!expandedModules.includes(moduleId)) {
      setExpandedModules((prev) => [...prev, moduleId]);
    }
  };

  const renderContent = () => {
    // Gestão de Empresas
    if (activeModule === "empresas" && activeSubModule === "gestao") {
      return (
        <>
          {/* Stats Cards */}
          <SuperStats empresas={empresas} />

          {/* Tabela de Empresas */}
          <Card>
            <CardHeader>
              <CardTitle>Empresas Cadastradas</CardTitle>
              <CardDescription>
                Gerencie todas as empresas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GestaoEmpresas
                empresas={empresas}
                planos={planos}
                onAcessarEmpresa={handleAcessarEmpresa}
                onAtualizarEmpresa={atualizarEmpresa}
                onSuspenderEmpresa={suspenderEmpresa}
                onAtivarEmpresa={ativarEmpresa}
              />
            </CardContent>
          </Card>
        </>
      );
    }

    // Gestão de Perfis
    if (activeModule === "empresas" && activeSubModule === "perfis") {
      return (
        <GestaoPerfis
          perfis={perfis}
          onNovoPerfil={handleNovoPerfil}
          onEditarPerfil={handleEditarPerfil}
          onExcluirPerfil={handleExcluirPerfil}
        />
      );
    }

    // Gestão de Planos
    if (activeModule === "empresas" && activeSubModule === "planos") {
      return (
        <GestaoPlanos
          planos={planos}
          perfis={perfis}
          onNovoPlano={handleNovoPlano}
          onEditarPlano={handleEditarPlano}
          onExcluirPlano={handleExcluirPlano}
        />
      );
    }

    // Gestão de Webforms
    if (activeModule === "empresas" && activeSubModule === "webforms") {
      return (
        <GestaoWebforms
          webforms={webforms}
          onNovo={handleNovoWebform}
          onEditar={handleEditarWebform}
          onExcluir={excluirWebform}
          onAtivar={ativarWebform}
          onDesativar={desativarWebform}
          onVerStats={handleVerStatsWebform}
        />
      );
    }

    // Estado vazio para outros módulos (preparado para futuro)
    return <EmptyStateSuper />;
  };

  return (
    <SidebarLayout>
      <div className="flex h-screen overflow-hidden">
        {/* Secondary Sidebar */}
        {sidebarOpen && (
          <SuperSidebar
            activeModule={activeModule}
            activeSubModule={activeSubModule}
            expandedModules={expandedModules}
            onModuleToggle={handleModuleToggle}
            onSubModuleSelect={handleSubModuleSelect}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {!sidebarOpen && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Crown className="h-5 w-5" />
                  </Button>
                )}
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Crown className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">SUPER</h1>
                  <p className="text-muted-foreground">Gestão Multi-Tenant do Sistema</p>
                </div>
              </div>
              {activeModule === "empresas" && activeSubModule === "gestao" && (
                <Button onClick={() => setNovaEmpresaOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Nova Empresa
                </Button>
              )}
              {activeModule === "empresas" && activeSubModule === "perfis" && (
                <Button onClick={handleNovoPerfil}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Perfil
                </Button>
              )}
              {activeModule === "empresas" && activeSubModule === "planos" && (
                <Button onClick={handleNovoPlano}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Plano
                </Button>
              )}
              {activeModule === "empresas" && activeSubModule === "webforms" && (
                <Button onClick={handleNovoWebform}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Webform
                </Button>
              )}
            </div>

            {/* Dynamic Content */}
            {renderContent()}

            {/* Modal Nova Empresa */}
            <NovaEmpresaModal
              open={novaEmpresaOpen}
              onOpenChange={setNovaEmpresaOpen}
              onSave={handleNovaEmpresa}
              empresas={empresas}
              planos={planos}
              perfis={perfis}
            />

            {/* Modal Perfil */}
            <PerfilModal
              open={perfilModalOpen}
              onOpenChange={setPerfilModalOpen}
              onSave={handleSalvarPerfil}
              perfilParaEditar={perfilParaEditar}
            />

            {/* Modal Plano */}
            <PlanoModal
              open={planoModalOpen}
              onOpenChange={setPlanoModalOpen}
              onSave={handleSalvarPlano}
              perfis={perfis}
              planoParaEditar={planoParaEditar}
            />

            {/* Modal Webform */}
            <WebformModal
              open={webformModalOpen}
              onOpenChange={setWebformModalOpen}
              onSave={handleSalvarWebform}
              webformParaEditar={webformParaEditar}
              planos={planos}
            />

            {/* Modal Estatísticas Webform */}
            <WebformStatsModal
              open={webformStatsOpen}
              onOpenChange={setWebformStatsOpen}
              webform={webformParaStats}
            />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Super;
