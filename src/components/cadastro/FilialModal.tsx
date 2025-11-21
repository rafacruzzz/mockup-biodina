import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Package } from "lucide-react";
import { Filial } from "@/types/super";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { SeletorModulos } from "../super/SeletorModulos";
import { toast } from "sonner";

interface FilialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filial: Filial | null;
}

const FilialModal = ({ open, onOpenChange, filial }: FilialModalProps) => {
  const { empresaAtual, adicionarFilial, atualizarFilial } = useEmpresa();
  const [activeTab, setActiveTab] = useState("info");
  const [formData, setFormData] = useState<Partial<Filial>>({
    nome: '',
    razaoSocial: '',
    cnpj: '',
    modulosHabilitados: [],
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: ''
    }
  });

  useEffect(() => {
    if (filial) {
      setFormData(filial);
    } else {
      setFormData({
        nome: '',
        razaoSocial: '',
        cnpj: '',
        modulosHabilitados: [],
        endereco: {
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: ''
        }
      });
    }
  }, [filial, open]);

  const handleSave = () => {
    // Validações
    if (!formData.nome || !formData.razaoSocial || !formData.cnpj) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (formData.modulosHabilitados?.length === 0) {
      toast.error("Selecione pelo menos um módulo");
      return;
    }

    // Verificar se os módulos selecionados estão disponíveis na empresa principal
    const modulosInvalidos = formData.modulosHabilitados?.filter(
      mod => !empresaAtual?.modulosHabilitados.includes(mod)
    );

    if (modulosInvalidos && modulosInvalidos.length > 0) {
      toast.error("Alguns módulos selecionados não estão disponíveis na empresa principal");
      return;
    }

    if (filial) {
      // Modo edição
      atualizarFilial(filial.id, formData);
      toast.success("Filial atualizada com sucesso!");
    } else {
      // Modo criação
      const novaFilial: Filial = {
        id: `filial-${Date.now()}`,
        nome: formData.nome!,
        razaoSocial: formData.razaoSocial!,
        cnpj: formData.cnpj!,
        empresaPrincipalId: empresaAtual!.id,
        modulosHabilitados: formData.modulosHabilitados!,
        status: 'ativa',
        dataCriacao: new Date().toISOString(),
        endereco: formData.endereco
      };
      adicionarFilial(novaFilial);
      toast.success("Filial cadastrada com sucesso!");
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-biodina-gold/10 rounded-lg">
              <Building2 className="h-6 w-6 text-biodina-gold" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-biodina-blue">
                {filial ? 'Editar Filial' : 'Nova Filial'}
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                {filial ? 'Edite as informações da filial' : 'Cadastre uma nova filial da empresa'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">
              <Building2 className="h-4 w-4 mr-2" />
              Informações
            </TabsTrigger>
            <TabsTrigger value="endereco">
              <MapPin className="h-4 w-4 mr-2" />
              Endereço
            </TabsTrigger>
            <TabsTrigger value="modulos">
              <Package className="h-4 w-4 mr-2" />
              Módulos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Fantasia *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Nome da filial"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="razaoSocial">Razão Social *</Label>
              <Input
                id="razaoSocial"
                value={formData.razaoSocial}
                onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                placeholder="Razão social da filial"
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
          </TabsContent>

          <TabsContent value="endereco" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={formData.endereco?.cep}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    endereco: { ...formData.endereco!, cep: e.target.value } 
                  })}
                  placeholder="00000-000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  value={formData.endereco?.numero}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    endereco: { ...formData.endereco!, numero: e.target.value } 
                  })}
                  placeholder="123"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logradouro">Logradouro</Label>
              <Input
                id="logradouro"
                value={formData.endereco?.logradouro}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  endereco: { ...formData.endereco!, logradouro: e.target.value } 
                })}
                placeholder="Rua, Avenida, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complemento">Complemento</Label>
              <Input
                id="complemento"
                value={formData.endereco?.complemento}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  endereco: { ...formData.endereco!, complemento: e.target.value } 
                })}
                placeholder="Sala, Andar, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                value={formData.endereco?.bairro}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  endereco: { ...formData.endereco!, bairro: e.target.value } 
                })}
                placeholder="Bairro"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={formData.endereco?.cidade}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    endereco: { ...formData.endereco!, cidade: e.target.value } 
                  })}
                  placeholder="Cidade"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uf">UF</Label>
                <Input
                  id="uf"
                  value={formData.endereco?.uf}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    endereco: { ...formData.endereco!, uf: e.target.value } 
                  })}
                  placeholder="SP"
                  maxLength={2}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="modulos" className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                ℹ️ A empresa principal <strong>{empresaAtual?.nome}</strong> possui{' '}
                <strong>{empresaAtual?.modulosHabilitados.length} módulos</strong> disponíveis.
                Selecione quais módulos esta filial terá acesso.
              </p>
            </div>

            <SeletorModulos
              modulosSelecionados={formData.modulosHabilitados || []}
              onChange={(modulos) => setFormData({ ...formData, modulosHabilitados: modulos })}
              modulosDisponiveis={empresaAtual?.modulosHabilitados}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            {filial ? 'Salvar Alterações' : 'Cadastrar Filial'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilialModal;
