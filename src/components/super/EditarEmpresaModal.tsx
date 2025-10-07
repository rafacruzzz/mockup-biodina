import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SeletorModulos } from "./SeletorModulos";
import { Empresa, ModuloSistema } from "@/types/super";
import { useToast } from "@/hooks/use-toast";

interface EditarEmpresaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empresa: Empresa | null;
  onSave: (empresaId: string, empresa: Partial<Empresa>) => void;
}

export const EditarEmpresaModal = ({ open, onOpenChange, empresa, onSave }: EditarEmpresaModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  
  const [formData, setFormData] = useState({
    nome: '',
    razaoSocial: '',
    cnpj: '',
    modulosHabilitados: [] as ModuloSistema[],
    configuracoes: {
      limiteUsuarios: 25,
      espacoArmazenamento: '50GB',
      backup: true,
      suporte: 'basico' as 'basico' | 'premium' | 'enterprise'
    }
  });

  useEffect(() => {
    if (empresa) {
      setFormData({
        nome: empresa.nome,
        razaoSocial: empresa.razaoSocial,
        cnpj: empresa.cnpj,
        modulosHabilitados: empresa.modulosHabilitados,
        configuracoes: empresa.configuracoes
      });
    }
  }, [empresa]);

  const handleSave = () => {
    if (!empresa) return;

    if (!formData.nome || !formData.razaoSocial || !formData.cnpj) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (formData.modulosHabilitados.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um módulo",
        variant: "destructive"
      });
      setActiveTab("modulos");
      return;
    }

    onSave(empresa.id, formData);
    toast({
      title: "Sucesso",
      description: "Empresa atualizada com sucesso!"
    });
    onOpenChange(false);
  };

  if (!empresa) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Empresa</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="modulos">Módulos</TabsTrigger>
            <TabsTrigger value="config">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Fantasia *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="razaoSocial">Razão Social *</Label>
              <Input
                id="razaoSocial"
                value={formData.razaoSocial}
                onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="modulos">
            <SeletorModulos
              modulosSelecionados={formData.modulosHabilitados}
              onChange={(modulos) => setFormData({ ...formData, modulosHabilitados: modulos })}
            />
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="limiteUsuarios">Limite de Usuários</Label>
              <Select
                value={formData.configuracoes.limiteUsuarios.toString()}
                onValueChange={(value) => setFormData({
                  ...formData,
                  configuracoes: { ...formData.configuracoes, limiteUsuarios: parseInt(value) }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 usuários</SelectItem>
                  <SelectItem value="25">25 usuários</SelectItem>
                  <SelectItem value="50">50 usuários</SelectItem>
                  <SelectItem value="100">100 usuários</SelectItem>
                  <SelectItem value="-1">Ilimitado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="espacoArmazenamento">Espaço de Armazenamento</Label>
              <Select
                value={formData.configuracoes.espacoArmazenamento}
                onValueChange={(value) => setFormData({
                  ...formData,
                  configuracoes: { ...formData.configuracoes, espacoArmazenamento: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10GB">10 GB</SelectItem>
                  <SelectItem value="50GB">50 GB</SelectItem>
                  <SelectItem value="100GB">100 GB</SelectItem>
                  <SelectItem value="ilimitado">Ilimitado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="backup">Backup Automático</Label>
              <Switch
                id="backup"
                checked={formData.configuracoes.backup}
                onCheckedChange={(checked) => setFormData({
                  ...formData,
                  configuracoes: { ...formData.configuracoes, backup: checked }
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="suporte">Tipo de Suporte</Label>
              <Select
                value={formData.configuracoes.suporte}
                onValueChange={(value: 'basico' | 'premium' | 'enterprise') => setFormData({
                  ...formData,
                  configuracoes: { ...formData.configuracoes, suporte: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basico">Básico</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
