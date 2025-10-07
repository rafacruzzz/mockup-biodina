import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Empresa } from "@/types/super";
import { modulosDisponiveis } from "@/data/superModules";
import { Building2, User, Calendar, Mail, CheckCircle2, XCircle } from "lucide-react";

interface DetalhesEmpresaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empresa: Empresa | null;
}

export const DetalhesEmpresaModal = ({ open, onOpenChange, empresa }: DetalhesEmpresaModalProps) => {
  if (!empresa) return null;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      ativa: "default",
      inativa: "secondary",
      suspensa: "destructive"
    };
    return <Badge variant={variants[status] || "default"}>{status.toUpperCase()}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Detalhes da Empresa
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="geral">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="usuario">Usuário Master</TabsTrigger>
            <TabsTrigger value="modulos">Módulos</TabsTrigger>
            <TabsTrigger value="config">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nome Fantasia</p>
                <p className="font-medium">{empresa.nome}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                {getStatusBadge(empresa.status)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Razão Social</p>
                <p className="font-medium">{empresa.razaoSocial}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CNPJ</p>
                <p className="font-medium">{empresa.cnpj}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo</p>
                <Badge variant={empresa.tipo === 'master' ? 'default' : 'secondary'}>
                  {empresa.tipo === 'master' ? '👑 Master' : 'Filial'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data de Criação</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(empresa.dataCriacao).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Estatísticas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Usuários</p>
                  <p className="text-2xl font-bold">{empresa.estatisticas.totalUsuarios}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Produtos</p>
                  <p className="text-2xl font-bold">{empresa.estatisticas.totalProdutos}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Clientes</p>
                  <p className="text-2xl font-bold">{empresa.estatisticas.totalClientes}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Storage</p>
                  <p className="text-2xl font-bold">{empresa.estatisticas.espacoUtilizado}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usuario" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nome Completo</p>
                <p className="font-medium flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {empresa.usuarioMaster.nome}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {empresa.usuarioMaster.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">@{empresa.usuarioMaster.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data de Criação</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(empresa.usuarioMaster.dataCriacao).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="modulos" className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                {empresa.modulosHabilitados.length} de {modulosDisponiveis.length} módulos habilitados
              </p>
              <div className="grid grid-cols-2 gap-2">
                {modulosDisponiveis.map((modulo) => {
                  const isHabilitado = empresa.modulosHabilitados.includes(modulo.id);
                  return (
                    <div
                      key={modulo.id}
                      className={`flex items-center gap-2 p-2 rounded border ${
                        isHabilitado ? 'border-primary bg-primary/5' : 'border-border opacity-50'
                      }`}
                    >
                      {isHabilitado ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{modulo.icon}</span>
                      <span className="text-sm font-medium">{modulo.nome}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Limite de Usuários</p>
                <p className="font-medium">
                  {empresa.configuracoes.limiteUsuarios === -1
                    ? 'Ilimitado'
                    : `${empresa.configuracoes.limiteUsuarios} usuários`}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Espaço de Armazenamento</p>
                <p className="font-medium">{empresa.configuracoes.espacoArmazenamento}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Backup Automático</p>
                <p className="font-medium flex items-center gap-1">
                  {empresa.configuracoes.backup ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Habilitado
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      Desabilitado
                    </>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Suporte</p>
                <Badge>
                  {empresa.configuracoes.suporte.charAt(0).toUpperCase() + 
                   empresa.configuracoes.suporte.slice(1)}
                </Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
