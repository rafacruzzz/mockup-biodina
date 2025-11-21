import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Webform } from "@/types/super";
import { Copy, Edit, BarChart3, Power, PowerOff, Trash2, Search, ExternalLink } from "lucide-react";
import { gerarLinkWebform, copiarLinkWebform } from "@/utils/webformUtils";
import { useToast } from "@/hooks/use-toast";
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

interface GestaoWebformsProps {
  webforms: Webform[];
  onNovo: () => void;
  onEditar: (webform: Webform) => void;
  onExcluir: (webformId: string) => void;
  onAtivar: (webformId: string) => void;
  onDesativar: (webformId: string) => void;
  onVerStats: (webform: Webform) => void;
}

export const GestaoWebforms = ({
  webforms,
  onNovo,
  onEditar,
  onExcluir,
  onAtivar,
  onDesativar,
  onVerStats
}: GestaoWebformsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [excluirOpen, setExcluirOpen] = useState(false);
  const [webformParaExcluir, setWebformParaExcluir] = useState<Webform | null>(null);
  const { toast } = useToast();

  const webformsFiltrados = webforms.filter(webform =>
    webform.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopiarLink = async (webform: Webform) => {
    const link = gerarLinkWebform(webform.id);
    const sucesso = await copiarLinkWebform(link);
    
    if (sucesso) {
      toast({
        title: "Link Copiado!",
        description: `Link do webform "${webform.titulo}" copiado para a área de transferência.`,
      });
    } else {
      toast({
        title: "Erro ao Copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleAbrirLink = (webform: Webform) => {
    const link = gerarLinkWebform(webform.id);
    window.open(link, '_blank');
  };

  const handleExcluir = (webform: Webform) => {
    setWebformParaExcluir(webform);
    setExcluirOpen(true);
  };

  const confirmExcluir = () => {
    if (webformParaExcluir) {
      onExcluir(webformParaExcluir.id);
      toast({
        title: "Webform Excluído",
        description: `O webform "${webformParaExcluir.titulo}" foi removido com sucesso.`,
      });
    }
    setExcluirOpen(false);
  };

  const getStatusBadge = (status: string) => {
    return status === 'ativo' 
      ? <Badge variant="default" className="bg-green-500">🟢 ATIVO</Badge>
      : <Badge variant="secondary">⚪ INATIVO</Badge>;
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar webform por título..."
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
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Trial</TableHead>
                <TableHead>Acessos</TableHead>
                <TableHead>Cadastros</TableHead>
                <TableHead>Data Criação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webformsFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    Nenhum webform encontrado
                  </TableCell>
                </TableRow>
              ) : (
                webformsFiltrados.map((webform) => (
                  <TableRow key={webform.id}>
                    <TableCell className="font-medium">{webform.titulo}</TableCell>
                    <TableCell>{getStatusBadge(webform.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Criar Base</Badge>
                    </TableCell>
                    <TableCell>
                      {webform.trial ? (
                        <Badge variant="secondary">Sim ({webform.diasTrial}d)</Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">Não</span>
                      )}
                    </TableCell>
                    <TableCell>{webform.totalAcessos}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{webform.totalCadastros}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(webform.dataCriacao).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopiarLink(webform)}
                          title="Copiar Link"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAbrirLink(webform)}
                          title="Abrir Link"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onVerStats(webform)}
                          title="Ver Estatísticas"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onEditar(webform)}
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {webform.status === 'ativo' ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDesativar(webform.id)}
                            title="Desativar"
                          >
                            <PowerOff className="h-4 w-4 text-orange-500" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onAtivar(webform.id)}
                            title="Ativar"
                          >
                            <Power className="h-4 w-4 text-green-500" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleExcluir(webform)}
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={excluirOpen} onOpenChange={setExcluirOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Webform</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o webform "{webformParaExcluir?.titulo}"?
              Esta ação não pode ser desfeita. O link deixará de funcionar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmExcluir} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
