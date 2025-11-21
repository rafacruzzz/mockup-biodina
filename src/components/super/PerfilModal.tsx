import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PerfilAcesso, ModuloSistema } from "@/types/super";
import { modulosDisponiveis } from "@/data/superModules";
import { useToast } from "@/hooks/use-toast";

interface PerfilModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (perfil: Omit<PerfilAcesso, "id" | "dataCriacao">) => void;
  perfilParaEditar?: PerfilAcesso;
}

export const PerfilModal = ({
  open,
  onOpenChange,
  onSave,
  perfilParaEditar,
}: PerfilModalProps) => {
  const { toast } = useToast();
  const [nome, setNome] = useState("");
  const [modulosSelecionados, setModulosSelecionados] = useState<ModuloSistema[]>([]);

  useEffect(() => {
    if (perfilParaEditar) {
      setNome(perfilParaEditar.nome);
      setModulosSelecionados(perfilParaEditar.modulosHabilitados);
    } else {
      setNome("");
      setModulosSelecionados([]);
    }
  }, [perfilParaEditar, open]);

  const handleMarcarTodos = () => {
    if (modulosSelecionados.length === modulosDisponiveis.length) {
      setModulosSelecionados([]);
    } else {
      setModulosSelecionados(modulosDisponiveis.map((m) => m.id));
    }
  };

  const toggleModulo = (moduloId: ModuloSistema) => {
    setModulosSelecionados((prev) =>
      prev.includes(moduloId)
        ? prev.filter((id) => id !== moduloId)
        : [...prev, moduloId]
    );
  };

  const handleSave = () => {
    if (!nome.trim()) {
      toast({
        title: "Erro",
        description: "O nome do perfil é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (modulosSelecionados.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um módulo",
        variant: "destructive",
      });
      return;
    }

    onSave({
      nome: nome.trim(),
      modulosHabilitados: modulosSelecionados,
      dataAtualizacao: perfilParaEditar ? new Date().toISOString() : undefined,
    });

    toast({
      title: "Sucesso",
      description: perfilParaEditar
        ? "Perfil atualizado com sucesso"
        : "Perfil criado com sucesso",
    });

    onOpenChange(false);
  };

  // Organizar módulos em 3 colunas
  const col1 = modulosDisponiveis.slice(0, 4);
  const col2 = modulosDisponiveis.slice(4, 8);
  const col3 = modulosDisponiveis.slice(8);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {perfilParaEditar ? "Editar Perfil" : "Novo Perfil"}
          </DialogTitle>
          <DialogDescription>
            Configure o nome e os módulos que este perfil terá acesso
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Nome do Perfil */}
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Perfil</Label>
            <Input
              id="nome"
              placeholder="Ex: Perfil Vendedor"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Botão Marcar Todos */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <Label className="text-base">Módulos</Label>
              <p className="text-sm text-muted-foreground">
                {modulosSelecionados.length} de {modulosDisponiveis.length} selecionados
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleMarcarTodos}
              size="sm"
            >
              {modulosSelecionados.length === modulosDisponiveis.length
                ? "Desmarcar Todos"
                : "Marcar Todos"}
            </Button>
          </div>

          {/* Grid de Módulos em 3 Colunas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna 1 */}
            <div className="space-y-4">
              {col1.map((modulo) => (
                <div
                  key={modulo.id}
                  className="flex items-center justify-between space-x-2"
                >
                  <Label
                    htmlFor={modulo.id}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    <span className="mr-2">{modulo.icon}</span>
                    {modulo.nome}
                  </Label>
                  <Switch
                    id={modulo.id}
                    checked={modulosSelecionados.includes(modulo.id)}
                    onCheckedChange={() => toggleModulo(modulo.id)}
                  />
                </div>
              ))}
            </div>

            {/* Coluna 2 */}
            <div className="space-y-4">
              {col2.map((modulo) => (
                <div
                  key={modulo.id}
                  className="flex items-center justify-between space-x-2"
                >
                  <Label
                    htmlFor={modulo.id}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    <span className="mr-2">{modulo.icon}</span>
                    {modulo.nome}
                  </Label>
                  <Switch
                    id={modulo.id}
                    checked={modulosSelecionados.includes(modulo.id)}
                    onCheckedChange={() => toggleModulo(modulo.id)}
                  />
                </div>
              ))}
            </div>

            {/* Coluna 3 */}
            <div className="space-y-4">
              {col3.map((modulo) => (
                <div
                  key={modulo.id}
                  className="flex items-center justify-between space-x-2"
                >
                  <Label
                    htmlFor={modulo.id}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    <span className="mr-2">{modulo.icon}</span>
                    {modulo.nome}
                  </Label>
                  <Switch
                    id={modulo.id}
                    checked={modulosSelecionados.includes(modulo.id)}
                    onCheckedChange={() => toggleModulo(modulo.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            {perfilParaEditar ? "Salvar Alterações" : "Criar Perfil"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
