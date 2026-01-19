import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { ModuloUsuario } from "@/types/permissions";
import ModuleAccessTree from "../../cadastro/ModuleAccessTree";

interface NovoUsuarioModalProps {
  open: boolean;
  onClose: () => void;
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

export const NovoUsuarioModal = ({ open, onClose }: NovoUsuarioModalProps) => {
  const [formData, setFormData] = useState({
    nomeUsuario: "",
    nomeCompleto: "",
    departamento: "",
    senha: "",
    confirmarSenha: "",
    gruposPermissao: [] as string[],
    moduleAccess: [] as ModuloUsuario[]
  });

  const departamentos = [
    "Comercial",
    "RH", 
    "Financeiro",
    "TI",
    "Administrativo",
    "Diretoria"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    // Validar se tem pelo menos um tipo de permissão
    const hasGrupoPermissao = formData.gruposPermissao.length > 0;
    const hasModuleAccess = formData.moduleAccess.some(m => m.habilitado);
    
    if (!hasGrupoPermissao && !hasModuleAccess) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um grupo de permissão ou configure os controles de sistema",
        variant: "destructive"
      });
      return;
    }

    console.log('Salvando usuário com:', {
      ...formData,
      gruposPermissao: formData.gruposPermissao,
      moduleAccess: formData.moduleAccess
    });

    toast({
      title: "Sucesso",
      description: "Usuário de rede criado com sucesso!"
    });
    
    onClose();
  };

  const handleModuleAccessChange = (modules: ModuloUsuario[]) => {
    setFormData(prev => ({
      ...prev,
      moduleAccess: modules
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGroupToggle = (groupId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      gruposPermissao: checked 
        ? [...prev.gruposPermissao, groupId]
        : prev.gruposPermissao.filter(id => id !== groupId)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Usuário de Rede</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basico">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basico">
                <User className="h-4 w-4 mr-2" />
                Dados Básicos
              </TabsTrigger>
              <TabsTrigger value="permissoes">
                <Shield className="h-4 w-4 mr-2" />
                Permissões e Controles de Sistema
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basico" className="space-y-6">
              {/* Dados básicos */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomeUsuario">Nome de Usuário (Login)</Label>
                  <Input
                    id="nomeUsuario"
                    value={formData.nomeUsuario}
                    onChange={(e) => handleInputChange("nomeUsuario", e.target.value)}
                    placeholder="usuario.nome"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nomeCompleto">Nome Completo</Label>
                  <Input
                    id="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                    placeholder="Nome completo do usuário"
                    required
                  />
                </div>
              </div>

              {/* Departamento */}
              <div>
                <Label htmlFor="departamento">Departamento</Label>
                <Select
                  value={formData.departamento}
                  onValueChange={(value) => handleInputChange("departamento", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departamentos.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Senhas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    placeholder="Senha segura"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    value={formData.confirmarSenha}
                    onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                    placeholder="Confirme a senha"
                    required
                  />
                </div>
              </div>

              {/* Grupos de permissão simples (compatibilidade) */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Grupos de Permissão (Sistema Legado)</Label>
                <div className="grid gap-3 max-h-60 overflow-y-auto p-1">
                  {gruposDisponiveis.map((grupo) => (
                    <div key={grupo.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={grupo.id}
                        checked={formData.gruposPermissao.includes(grupo.id)}
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

            <TabsContent value="permissoes" className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Permissões e Controles de Sistema
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Configure permissões detalhadas de acesso aos módulos e submódulos
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Permissões Detalhadas
                </h4>
                <ModuleAccessTree 
                  modules={formData.moduleAccess}
                  onModuleChange={handleModuleAccessChange}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Usuário
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};