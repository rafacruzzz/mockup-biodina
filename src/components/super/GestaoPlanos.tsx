import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plano, PerfilAcesso } from "@/types/super";
import { Edit, Trash2, Search, DollarSign, CheckCircle } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

interface GestaoPlanosProps {
  planos: Plano[];
  perfis: PerfilAcesso[];
  onNovoPlano: () => void;
  onEditarPlano: (plano: Plano) => void;
  onExcluirPlano: (planoId: string) => void;
}

export const GestaoPlanos = ({
  planos,
  perfis,
  onNovoPlano,
  onEditarPlano,
  onExcluirPlano
}: GestaoPlanosProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [planoParaExcluir, setPlanoParaExcluir] = useState<Plano | null>(null);
  const [excluirOpen, setExcluirOpen] = useState(false);

  const planosFiltrados = planos.filter(plano =>
    plano.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plano.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPerfilNome = (perfilId: string) => {
    const perfil = perfis.find(p => p.id === perfilId);
    return perfil?.nome || 'Perfil não encontrado';
  };

  const handleExcluir = (plano: Plano) => {
    setPlanoParaExcluir(plano);
    setExcluirOpen(true);
  };

  const confirmExcluir = () => {
    if (planoParaExcluir) {
      onExcluirPlano(planoParaExcluir.id);
      toast({
        title: "Plano Excluído",
        description: `O plano "${planoParaExcluir.nome}" foi removido com sucesso`
      });
    }
    setExcluirOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar planos por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {planosFiltrados.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-center">
                {searchTerm ? "Nenhum plano encontrado" : "Nenhum plano cadastrado"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {planosFiltrados.map((plano) => (
              <Card key={plano.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{plano.nome}</CardTitle>
                      <div className="flex items-baseline gap-1">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="text-3xl font-bold text-primary">
                          {plano.valor.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground">/mês</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{plano.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-3">
                      {getPerfilNome(plano.perfilId)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Benefícios:</p>
                    <ul className="space-y-1">
                      {plano.beneficios.slice(0, 3).map((beneficio, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{beneficio}</span>
                        </li>
                      ))}
                      {plano.beneficios.length > 3 && (
                        <li className="text-sm text-muted-foreground pl-6">
                          +{plano.beneficios.length - 3} mais...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEditarPlano(plano)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleExcluir(plano)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={excluirOpen} onOpenChange={setExcluirOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Plano</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o plano "{planoParaExcluir?.nome}"?
              Esta ação não poderá ser desfeita.
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