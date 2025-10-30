import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SeletorModulos } from "./SeletorModulos";
import { Empresa, ModuloSistema } from "@/types/super";
import { useToast } from "@/hooks/use-toast";

interface NovaEmpresaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (empresa: Empresa) => void;
  empresas: Empresa[];
}

export const NovaEmpresaModal = ({ open, onOpenChange, onSave, empresas }: NovaEmpresaModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  
  const temEmpresaMaster = empresas.some(e => e.tipo === 'master');
  
  const [formData, setFormData] = useState({
    nome: '',
    razaoSocial: '',
    cnpj: '',
    tipo: 'filial' as 'master' | 'filial',
    usuarioMaster: {
      nome: '',
      email: '',
      username: '',
      senha: '',
      confirmarSenha: ''
    },
    modulosHabilitados: [] as ModuloSistema[],
    configuracoes: {
      limiteUsuarios: 25,
      espacoArmazenamento: '50GB',
      backup: true,
      suporte: 'basico' as 'basico' | 'premium' | 'enterprise'
    }
  });

  const handleSave = () => {
    // Validações
    if (!formData.nome || !formData.razaoSocial || !formData.cnpj) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios da empresa",
        variant: "destructive"
      });
      setActiveTab("info");
      return;
    }

    if (!formData.usuarioMaster.nome || !formData.usuarioMaster.email || !formData.usuarioMaster.username) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos do usuário master",
        variant: "destructive"
      });
      setActiveTab("usuario");
      return;
    }

    if (formData.usuarioMaster.senha !== formData.usuarioMaster.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não conferem",
        variant: "destructive"
      });
      setActiveTab("usuario");
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

    const novaEmpresa: Empresa = {
      id: `empresa-${Date.now()}`,
      nome: formData.nome,
      razaoSocial: formData.razaoSocial,
      cnpj: formData.cnpj,
      tipo: formData.tipo,
      status: 'ativa',
      dataCriacao: new Date().toISOString().split('T')[0],
      modulosHabilitados: formData.modulosHabilitados,
      usuarioMaster: {
        id: `user-${Date.now()}`,
        nome: formData.usuarioMaster.nome,
        email: formData.usuarioMaster.email,
        username: formData.usuarioMaster.username,
        dataCriacao: new Date().toISOString().split('T')[0]
      },
      configuracoes: {
        limiteUsuarios: formData.configuracoes.limiteUsuarios,
        espacoArmazenamento: formData.configuracoes.espacoArmazenamento,
        backup: formData.configuracoes.backup,
        suporte: formData.configuracoes.suporte
      },
      estatisticas: {
        totalUsuarios: 1,
        totalProdutos: 0,
        totalClientes: 0,
        totalVendas: 0,
        espacoUtilizado: '0 GB'
      }
    };

    onSave(novaEmpresa);
    toast({
      title: "Sucesso",
      description: "Empresa criada com sucesso!"
    });
    onOpenChange(false);
    
    // Reset form
    setFormData({
      nome: '',
      razaoSocial: '',
      cnpj: '',
      tipo: 'filial',
      usuarioMaster: {
        nome: '',
        email: '',
        username: '',
        senha: '',
        confirmarSenha: ''
      },
      modulosHabilitados: [],
      configuracoes: {
        limiteUsuarios: 25,
        espacoArmazenamento: '50GB',
        backup: true,
        suporte: 'basico'
      }
    });
    setActiveTab("info");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Empresa</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="usuario">Usuário Master</TabsTrigger>
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
                placeholder="Ex: Imuv"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="razaoSocial">Razão Social *</Label>
              <Input
                id="razaoSocial"
                value={formData.razaoSocial}
                onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                placeholder="Ex: Imuv Farmacêutica S.A."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Empresa *</Label>
              <RadioGroup
                value={formData.tipo}
                onValueChange={(value: 'master' | 'filial') => setFormData({ ...formData, tipo: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="master" id="master" disabled={temEmpresaMaster} />
                  <Label htmlFor="master" className={temEmpresaMaster ? 'text-muted-foreground' : ''}>
                    Master {temEmpresaMaster && '(Já existe empresa Master)'}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="filial" id="filial" />
                  <Label htmlFor="filial">Filial</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="usuario" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userNome">Nome Completo *</Label>
              <Input
                id="userNome"
                value={formData.usuarioMaster.nome}
                onChange={(e) => setFormData({
                  ...formData,
                  usuarioMaster: { ...formData.usuarioMaster, nome: e.target.value }
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userEmail">Email *</Label>
              <Input
                id="userEmail"
                type="email"
                value={formData.usuarioMaster.email}
                onChange={(e) => setFormData({
                  ...formData,
                  usuarioMaster: { ...formData.usuarioMaster, email: e.target.value }
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username (Login) *</Label>
              <Input
                id="username"
                value={formData.usuarioMaster.username}
                onChange={(e) => setFormData({
                  ...formData,
                  usuarioMaster: { ...formData.usuarioMaster, username: e.target.value }
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha Inicial *</Label>
              <Input
                id="senha"
                type="password"
                value={formData.usuarioMaster.senha}
                onChange={(e) => setFormData({
                  ...formData,
                  usuarioMaster: { ...formData.usuarioMaster, senha: e.target.value }
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
              <Input
                id="confirmarSenha"
                type="password"
                value={formData.usuarioMaster.confirmarSenha}
                onChange={(e) => setFormData({
                  ...formData,
                  usuarioMaster: { ...formData.usuarioMaster, confirmarSenha: e.target.value }
                })}
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
            Criar Empresa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
