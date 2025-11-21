import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Empresa, Plano } from "@/types/super";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Edit, Ban, CheckCircle, Crown, Building2, Search, LogIn } from "lucide-react";
import { DetalhesEmpresaModal } from "./DetalhesEmpresaModal";
import { EditarEmpresaModal } from "./EditarEmpresaModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GestaoEmpresasProps {
  empresas: Empresa[];
  planos?: Plano[];
  onAcessarEmpresa: (empresaId: string) => void;
  onAtualizarEmpresa: (empresaId: string, empresa: Partial<Empresa>) => void;
  onSuspenderEmpresa: (empresaId: string) => void;
  onAtivarEmpresa: (empresaId: string) => void;
}

export const GestaoEmpresas = ({
  empresas,
  planos = [],
  onAcessarEmpresa,
  onAtualizarEmpresa,
  onSuspenderEmpresa,
  onAtivarEmpresa
}: GestaoEmpresasProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null);
  const [detalhesOpen, setDetalhesOpen] = useState(false);
  const [editarOpen, setEditarOpen] = useState(false);
  const [suspenderOpen, setSuspenderOpen] = useState(false);
  const [ativarOpen, setAtivarOpen] = useState(false);

  const empresasFiltradas = empresas.filter(empresa =>
    empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.cnpj.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      ativa: "default",
      inativa: "secondary",
      suspensa: "destructive"
    };
    return <Badge variant={variants[status] || "default"}>{status.toUpperCase()}</Badge>;
  };

  const handleVerDetalhes = (empresa: Empresa) => {
    setEmpresaSelecionada(empresa);
    setDetalhesOpen(true);
  };

  const handleEditar = (empresa: Empresa) => {
    setEmpresaSelecionada(empresa);
    setEditarOpen(true);
  };

  const handleSuspender = (empresa: Empresa) => {
    setEmpresaSelecionada(empresa);
    setSuspenderOpen(true);
  };

  const handleAtivar = (empresa: Empresa) => {
    setEmpresaSelecionada(empresa);
    setAtivarOpen(true);
  };

  const confirmSuspender = () => {
    if (empresaSelecionada) {
      onSuspenderEmpresa(empresaSelecionada.id);
    }
    setSuspenderOpen(false);
  };

  const confirmAtivar = () => {
    if (empresaSelecionada) {
      onAtivarEmpresa(empresaSelecionada.id);
    }
    setAtivarOpen(false);
  };

  const getPlanoNome = (planoId?: string) => {
    if (!planoId) return '-';
    const plano = planos.find(p => p.id === planoId);
    return plano?.nome || 'Plano não encontrado';
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, razão social ou CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Módulos</TableHead>
                <TableHead>Usuários</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empresasFiltradas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    Nenhuma empresa encontrada
                  </TableCell>
                </TableRow>
              ) : (
                empresasFiltradas.map((empresa) => (
                  <TableRow key={empresa.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{empresa.nome}</p>
                          <p className="text-xs text-muted-foreground">{empresa.razaoSocial}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{empresa.cnpj}</TableCell>
                    <TableCell>
                      {empresa.planoId ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="outline" className="cursor-help">
                                {getPlanoNome(empresa.planoId)}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Clique em Detalhes para ver informações do plano</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(empresa.status)}</TableCell>
                    <TableCell>
                      {empresa.origem ? (
                        <Badge variant={empresa.origem.tipo === 'manual' ? 'secondary' : 'default'}>
                          {empresa.origem.tipo === 'manual' ? '📝 Manual' : `🌐 ${empresa.origem.webformNome}`}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">📝 Manual</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{empresa.modulosHabilitados.length}</Badge>
                    </TableCell>
                    <TableCell>{empresa.estatisticas.totalUsuarios}</TableCell>
                    <TableCell>{empresa.estatisticas.espacoUtilizado}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleVerDetalhes(empresa)}
                          title="Ver Detalhes"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onAcessarEmpresa(empresa.id)}
                          title="Acessar Sistema"
                        >
                          <LogIn className="h-4 w-4" />
                        </Button>
                        {empresa.tipo !== 'master' && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditar(empresa)}
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {empresa.status === 'ativa' ? (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleSuspender(empresa)}
                                title="Suspender"
                              >
                                <Ban className="h-4 w-4 text-destructive" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleAtivar(empresa)}
                                title="Ativar"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <DetalhesEmpresaModal
        open={detalhesOpen}
        onOpenChange={setDetalhesOpen}
        empresa={empresaSelecionada}
        planos={planos}
      />

      <EditarEmpresaModal
        open={editarOpen}
        onOpenChange={setEditarOpen}
        empresa={empresaSelecionada}
        planos={planos}
        onSave={onAtualizarEmpresa}
      />

      <AlertDialog open={suspenderOpen} onOpenChange={setSuspenderOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspender Empresa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja suspender a empresa "{empresaSelecionada?.nome}"?
              Os usuários desta empresa não poderão acessar o sistema até que ela seja reativada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSuspender} className="bg-destructive text-destructive-foreground">
              Suspender
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={ativarOpen} onOpenChange={setAtivarOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ativar Empresa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja ativar a empresa "{empresaSelecionada?.nome}"?
              Os usuários desta empresa poderão voltar a acessar o sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAtivar}>
              Ativar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
