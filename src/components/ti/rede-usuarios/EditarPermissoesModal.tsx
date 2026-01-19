import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { UsuarioRede } from "@/types/ti";
import type { ModuloUsuario } from "@/types/permissions";
import ModuleAccessTree from "../../cadastro/ModuleAccessTree";

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
  const [moduleAccess, setModuleAccess] = useState<ModuloUsuario[]>([]);

  useEffect(() => {
    if (user) {
      // Mapear os nomes dos grupos para os IDs
      const groupIds = user.gruposPermissao.map(groupName => {
        const grupo = gruposDisponiveis.find(g => g.name === groupName);
        return grupo ? grupo.id : groupName.toLowerCase().replace(/\s+/g, '_');
      });
      setSelectedGroups(groupIds);
      
      // Inicializar moduleAccess
      // Por enquanto vazio - aqui você pode carregar as permissões salvas do usuário
      setModuleAccess([]);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar se tem pelo menos um tipo de permissão
    const hasGrupoPermissao = selectedGroups.length > 0;
    const hasModuleAccess = moduleAccess.some(m => m.habilitado);
    
    if (!hasGrupoPermissao && !hasModuleAccess) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um grupo de permissão ou configure os controles de sistema",
        variant: "destructive"
      });
      return;
    }

    console.log('Atualizando permissões:', {
      user: user?.nomeUsuario,
      gruposPermissao: selectedGroups,
      moduleAccess: moduleAccess
    });

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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

          <Tabs defaultValue="grupos-simples">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grupos-simples">
                Grupos de Permissão
              </TabsTrigger>
              <TabsTrigger value="permissoes-detalhadas">
                <Shield className="h-4 w-4 mr-2" />
                Permissões Detalhadas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grupos-simples" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="permissoes-detalhadas" className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Permissões Detalhadas por Módulo
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Configure permissões granulares de acesso aos módulos e submódulos do sistema
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Permissões Detalhadas
                </h4>
                <ModuleAccessTree 
                  modules={moduleAccess}
                  onModuleChange={setModuleAccess}
                />
              </div>
            </TabsContent>
          </Tabs>

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