import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/SidebarLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Plus } from "lucide-react";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { SuperStats } from "@/components/super/SuperStats";
import { GestaoEmpresas } from "@/components/super/GestaoEmpresas";
import { NovaEmpresaModal } from "@/components/super/NovaEmpresaModal";
import { Empresa } from "@/types/super";
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
    ativarEmpresa
  } = useEmpresa();
  
  const [novaEmpresaOpen, setNovaEmpresaOpen] = useState(false);

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

  return (
    <SidebarLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">SUPER</h1>
              <p className="text-muted-foreground">Gestão Multi-Tenant do Sistema</p>
            </div>
          </div>
          <Button onClick={() => setNovaEmpresaOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Nova Empresa
          </Button>
        </div>

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
              onAcessarEmpresa={handleAcessarEmpresa}
              onAtualizarEmpresa={atualizarEmpresa}
              onSuspenderEmpresa={suspenderEmpresa}
              onAtivarEmpresa={ativarEmpresa}
            />
          </CardContent>
        </Card>

        {/* Modal Nova Empresa */}
        <NovaEmpresaModal
          open={novaEmpresaOpen}
          onOpenChange={setNovaEmpresaOpen}
          onSave={handleNovaEmpresa}
          empresas={empresas}
        />
      </div>
    </SidebarLayout>
  );
};

export default Super;
