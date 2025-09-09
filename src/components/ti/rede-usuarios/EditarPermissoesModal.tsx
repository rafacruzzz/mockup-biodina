import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import type { UsuarioRede } from "@/types/ti";

interface EditarPermissoesModalProps {
  open: boolean;
  onClose: () => void;
  user: UsuarioRede | null;
}

const gruposDisponiveis = [
  { id: "usuarios_padrao", name: "Usuários Padrão", description: "Acesso básico aos sistemas" },
  { id: "comercial_total", name: "Comercial Total", description: "Acesso completo ao módulo comercial" },
  { id: "comercial_leitura", name: "Comercial Leitura", description: "Somente leitura no comercial" },
  { id: "rh_total", name: "RH Total", description: "Acesso completo ao módulo RH" },
  { id: "rh_leitura", name: "RH Leitura", description: "Somente leitura no RH" },
  { id: "financeiro_total", name: "Financeiro Total", description: "Acesso completo ao financeiro" },
  { id: "financeiro_leitura", name: "Financeiro Leitura", description: "Somente leitura no financeiro" },
  { id: "ti_admin", name: "TI Admin", description: "Administrador de TI" },
  { id: "gestao", name: "Gestão", description: "Acesso de gestão e relatórios" }
];

export const EditarPermissoesModal = ({ open, onClose, user }: EditarPermissoesModalProps) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      // Mapear os nomes dos grupos para os IDs
      const groupIds = user.gruposPermissao.map(groupName => {
        const grupo = gruposDisponiveis.find(g => g.name === groupName);
        return grupo ? grupo.id : groupName.toLowerCase().replace(/\s+/g, '_');
      });
      setSelectedGroups(groupIds);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedGroups.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um grupo de permissão",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Permissões do usuário atualizadas com sucesso!"
    });
    
    onClose();
  };

  const handleGroupToggle = (groupId: string, checked: boolean) => {
    setSelectedGroups(prev => 
      checked 
        ? [...prev, groupId]
        : prev.filter(id => id !== groupId)
    );
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Permissões - {user.nomeCompleto}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do usuário */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Login:</span> {user.nomeUsuario}
              </div>
              <div>
                <span className="font-medium">Departamento:</span> {user.departamento}
              </div>
            </div>
          </div>

          {/* Permissões atuais */}
          <div>
            <Label className="text-base font-medium">Permissões Atuais</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.gruposPermissao.map((grupo, index) => (
                <Badge key={index} variant="secondary">
                  {grupo}
                </Badge>
              ))}
            </div>
          </div>

          {/* Seleção de novos grupos */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Grupos de Permissão Disponíveis</Label>
            <div className="grid gap-3 max-h-60 overflow-y-auto p-1">
              {gruposDisponiveis.map((grupo) => (
                <div key={grupo.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={grupo.id}
                    checked={selectedGroups.includes(grupo.id)}
                    onCheckedChange={(checked) => handleGroupToggle(grupo.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={grupo.id} className="font-medium cursor-pointer">
                      {grupo.name}
                    </Label>
                    <p className="text-sm text-gray-500">{grupo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Atualizar Permissões
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};