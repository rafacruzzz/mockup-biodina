import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Building2, MapPin, Package, Loader2, FileText } from "lucide-react";
import { useDraft } from "@/hooks/useDraft";
import { DraftIndicator, DraftSaveButton } from "@/components/cadastro/DraftIndicator";
import { Filial } from "@/types/super";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { SeletorModulosDetalhado } from "./SeletorModulosDetalhado";
import { useCepLookup } from "@/hooks/useCepLookup";
import { toast } from "sonner";
import { ModuloEmpresa } from "@/types/permissions";
import { modulosCompletosSistema } from "@/data/sistemaModulosCompletos";
import EmissaoTab from "./EmissaoTab";

interface FilialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filial: Filial | null;
}

const ESTADOS_BRASILEIROS = [
  { value: 'AC', label: 'AC - Acre' },
  { value: 'AL', label: 'AL - Alagoas' },
  { value: 'AP', label: 'AP - Amapá' },
  { value: 'AM', label: 'AM - Amazonas' },
  { value: 'BA', label: 'BA - Bahia' },
  { value: 'CE', label: 'CE - Ceará' },
  { value: 'DF', label: 'DF - Distrito Federal' },
  { value: 'ES', label: 'ES - Espírito Santo' },
  { value: 'GO', label: 'GO - Goiás' },
  { value: 'MA', label: 'MA - Maranhão' },
  { value: 'MT', label: 'MT - Mato Grosso' },
  { value: 'MS', label: 'MS - Mato Grosso do Sul' },
  { value: 'MG', label: 'MG - Minas Gerais' },
  { value: 'PA', label: 'PA - Pará' },
  { value: 'PB', label: 'PB - Paraíba' },
  { value: 'PR', label: 'PR - Paraná' },
  { value: 'PE', label: 'PE - Pernambuco' },
  { value: 'PI', label: 'PI - Piauí' },
  { value: 'RJ', label: 'RJ - Rio de Janeiro' },
  { value: 'RN', label: 'RN - Rio Grande do Norte' },
  { value: 'RS', label: 'RS - Rio Grande do Sul' },
  { value: 'RO', label: 'RO - Rondônia' },
  { value: 'RR', label: 'RR - Roraima' },
  { value: 'SC', label: 'SC - Santa Catarina' },
  { value: 'SP', label: 'SP - São Paulo' },
  { value: 'SE', label: 'SE - Sergipe' },
  { value: 'TO', label: 'TO - Tocantins' }
];

const REGIMES_TRIBUTARIOS = [
  { value: '1', label: '1 - Simples Nacional' },
  { value: '2', label: '2 - Simples Nacional - Excesso de sublimite de receita bruta' },
  { value: '3', label: '3 - Regime Normal' },
  { value: '4', label: '4 - Simples Nacional - Microempreendedor Individual - MEI' }
];

const FilialModal = ({ open, onOpenChange, filial }: FilialModalProps) => {
  const { empresaAtual, adicionarFilial, atualizarFilial } = useEmpresa();
  const { lookupCep, loading: cepLoading } = useCepLookup();
  const [activeTab, setActiveTab] = useState("info");

  // Hook de rascunho
  const { 
    hasDraft, 
    draftInfo, 
    saveDraft, 
    loadDraft, 
    discardDraft, 
    clearDraftOnSave 
  } = useDraft<any>({
    moduleName: 'cadastro',
    entityType: 'filiais',
    expirationDays: 7
  });

  const handleRestoreDraft = () => {
    const draftData = loadDraft();
    if (draftData) {
      setFormData(draftData);
    }
  };
  const [formData, setFormData] = useState<Partial<Filial> & { modulosDetalhados?: ModuloEmpresa[] }>({
    nome: '',
    razaoSocial: '',
    cnpj: '',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    regimeTributario: '3',
    email: '',
    telefone: '',
    discriminaImpostos: true,
    modulosHabilitados: [],
    modulosDetalhados: [],
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

  // Converter modulosHabilitados da empresa para formato detalhado (para limite)
  const modulosDisponiveisDetalhados = empresaAtual?.modulosHabilitados || [];

  useEffect(() => {
    if (filial) {
      // Converter modulosHabilitados para modulosDetalhados se não existir
      const modulosDetalhados = (filial as any).modulosDetalhados || 
        (filial.modulosHabilitados?.map(key => {
          const moduloDef = modulosCompletosSistema.find(m => m.key === key);
          if (!moduloDef) return null;
          return {
            key: moduloDef.key,
            name: moduloDef.name,
            icon: moduloDef.icon,
            habilitado: true,
            subModulos: moduloDef.subModulos.map(s => ({
              key: s.key,
              name: s.name,
              habilitado: true
            }))
          } as ModuloEmpresa;
        }).filter(Boolean) as ModuloEmpresa[]) || [];
      
      setFormData({
        ...filial,
        modulosDetalhados
      });
    } else {
      setFormData({
        nome: '',
        razaoSocial: '',
        cnpj: '',
        inscricaoEstadual: '',
        inscricaoMunicipal: '',
        regimeTributario: '3',
        email: '',
        telefone: '',
        discriminaImpostos: true,
        modulosHabilitados: [],
        modulosDetalhados: [],
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

  const handleCepChange = async (cep: string) => {
    const cepNumeros = cep.replace(/\D/g, '');
    
    setFormData({ 
      ...formData, 
      endereco: { ...formData.endereco!, cep } 
    });

    if (cepNumeros.length === 8) {
      const resultado = await lookupCep(cepNumeros);
      if (resultado) {
        setFormData({
          ...formData,
          endereco: {
            ...formData.endereco!,
            cep,
            logradouro: resultado.logradouro,
            bairro: resultado.bairro,
            cidade: resultado.localidade,
            uf: resultado.uf
          }
        });
        toast.success("Endereço encontrado!");
      }
    }
  };

  const handleSave = () => {
    // Validações
    if (!formData.nome || !formData.razaoSocial || !formData.cnpj) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    // Verificar módulos detalhados
    const modulosHabilitados = formData.modulosDetalhados?.filter(m => m.habilitado) || [];
    if (modulosHabilitados.length === 0) {
      toast.error("Selecione pelo menos um módulo");
      return;
    }

    // Converter modulosDetalhados para modulosHabilitados (compatibilidade)
    const modulosHabilitadosKeys = modulosHabilitados.map(m => m.key);

    // Verificar se os módulos selecionados estão disponíveis na empresa principal
    const modulosInvalidos = modulosHabilitadosKeys.filter(
      mod => !empresaAtual?.modulosHabilitados.some(m => m === mod || (typeof m === 'object' && (m as any).key === mod))
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

    clearDraftOnSave();
    onOpenChange(false);
  };

  const isFormEmpty = !formData.nome && !formData.cnpj;

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
          {/* Draft Indicator */}
          {hasDraft && !filial && (
            <div className="mb-4">
              <DraftIndicator
                hasDraft={hasDraft}
                draftInfo={draftInfo}
                onRestore={handleRestoreDraft}
                onDiscard={discardDraft}
              />
            </div>
          )}

          <TabsList className="grid w-full grid-cols-4">
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
            <TabsTrigger value="emissao">
              <FileText className="h-4 w-4 mr-2" />
              Emissão
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

            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                <Input
                  id="inscricaoEstadual"
                  value={formData.inscricaoEstadual}
                  onChange={(e) => setFormData({ ...formData, inscricaoEstadual: e.target.value })}
                  placeholder="000.000.000.000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
              <Input
                id="inscricaoMunicipal"
                value={formData.inscricaoMunicipal}
                onChange={(e) => setFormData({ ...formData, inscricaoMunicipal: e.target.value })}
                placeholder="000000000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regimeTributario">Regime Tributário *</Label>
              <Select
                value={formData.regimeTributario}
                onValueChange={(value) => setFormData({ ...formData, regimeTributario: value as '1' | '2' | '3' | '4' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o regime tributário" />
                </SelectTrigger>
                <SelectContent>
                  {REGIMES_TRIBUTARIOS.map((regime) => (
                    <SelectItem key={regime.value} value={regime.value}>
                      {regime.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Contato</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contato@empresa.com.br"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => {
                      // Remove tudo que não é número
                      const apenasNumeros = e.target.value.replace(/\D/g, '');
                      // Aplica máscara de telefone brasileiro
                      let telefoneFormatado = '';
                      if (apenasNumeros.length > 0) {
                        telefoneFormatado = '(' + apenasNumeros.substring(0, 2);
                        if (apenasNumeros.length > 2) {
                          telefoneFormatado += ') ' + apenasNumeros.substring(2, 7);
                          if (apenasNumeros.length > 7) {
                            telefoneFormatado += '-' + apenasNumeros.substring(7, 11);
                          }
                        }
                      }
                      setFormData({ ...formData, telefone: telefoneFormatado });
                    }}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="discriminaImpostos">Discriminar impostos no corpo da nota?</Label>
                  <p className="text-sm text-muted-foreground">
                    Define se os impostos serão discriminados na nota fiscal
                  </p>
                </div>
                <Switch
                  id="discriminaImpostos"
                  checked={formData.discriminaImpostos}
                  onCheckedChange={(checked) => setFormData({ ...formData, discriminaImpostos: checked })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="endereco" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <div className="relative">
                  <Input
                    id="cep"
                    value={formData.endereco?.cep}
                    onChange={(e) => handleCepChange(e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                  />
                  {cepLoading && (
                    <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Busca automática ao digitar</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uf">Estado (UF)</Label>
                <Select
                  value={formData.endereco?.uf}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    endereco: { ...formData.endereco!, uf: value } 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADOS_BRASILEIROS.map((estado) => (
                      <SelectItem key={estado.value} value={estado.value}>
                        {estado.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={formData.endereco?.bairro}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    endereco: { ...formData.endereco!, bairro: e.target.value } 
                  })}
                  placeholder="Nome do bairro"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cidade">Município</Label>
                <Input
                  id="cidade"
                  value={formData.endereco?.cidade}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    endereco: { ...formData.endereco!, cidade: e.target.value } 
                  })}
                  placeholder="Nome da cidade"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="modulos" className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                ℹ️ A empresa principal <strong>{empresaAtual?.nome}</strong> possui{' '}
                <strong>{empresaAtual?.modulosHabilitados.length} módulos</strong> disponíveis.
                Selecione quais módulos e submódulos esta filial terá acesso.
              </p>
            </div>

            <SeletorModulosDetalhado
              modulosSelecionados={formData.modulosDetalhados || []}
              onChange={(modulos) => setFormData({ ...formData, modulosDetalhados: modulos })}
              modulosDisponiveis={modulosDisponiveisDetalhados.map(m => typeof m === 'string' ? m : (m as any).key)}
            />
          </TabsContent>

          <TabsContent value="emissao" className="space-y-4">
            <EmissaoTab formData={formData} setFormData={setFormData} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          {!filial && (
            <DraftSaveButton
              onSaveDraft={() => saveDraft(formData)}
              disabled={isFormEmpty}
            />
          )}
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
