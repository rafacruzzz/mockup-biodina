import { useState, useEffect } from "react";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, FileText, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import EmissaoTab from "@/components/cadastro/EmissaoTab";
import { Empresa, Filial } from "@/types/super";

const PerfilEmpresaContent = () => {
  const { empresaAtual, filialAtual, atualizarEmpresa, atualizarFilial } = useEmpresa();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("informacoes");

  // Determinar se estamos editando empresa ou filial
  const isEditingFilial = !!filialAtual;
  const currentEntity = filialAtual || empresaAtual;
  
  // Estado do formulário
  const [formData, setFormData] = useState<Partial<Empresa & Filial>>({});

  // Carregar dados quando a entidade mudar
  useEffect(() => {
    if (currentEntity) {
      setFormData({
        nome: currentEntity.nome || "",
        razaoSocial: currentEntity.razaoSocial || "",
        cnpj: currentEntity.cnpj || "",
        inscricaoEstadual: (currentEntity as any).inscricaoEstadual || "",
        inscricaoMunicipal: (currentEntity as any).inscricaoMunicipal || "",
        regimeTributario: (currentEntity as any).regimeTributario || "",
        email: (currentEntity as any).email || "",
        telefone: (currentEntity as any).telefone || "",
        discriminaImpostos: (currentEntity as any).discriminaImpostos || false,
        endereco: (currentEntity as any).endereco || {
          cep: "",
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          uf: ""
        },
        certificadoDigital: (currentEntity as any).certificadoDigital,
        nfeConfig: (currentEntity as any).nfeConfig
      });
    }
  }, [currentEntity]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEnderecoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      endereco: {
        ...(prev.endereco || {}),
        [field]: value
      }
    } as any));
  };

  // Busca CEP
  const buscarCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          endereco: {
            ...(prev.endereco || {}),
            cep: cepLimpo,
            logradouro: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            uf: data.uf || ""
          }
        } as any));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  // Máscara de telefone
  const formatTelefone = (value: string) => {
    const numeros = value.replace(/\D/g, "").slice(0, 11);
    if (numeros.length <= 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    }
    return numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isEditingFilial && filialAtual) {
        atualizarFilial(filialAtual.id, formData);
      } else if (empresaAtual) {
        atualizarEmpresa(empresaAtual.id, formData);
      }
      toast.success("Perfil da empresa atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar alterações");
    } finally {
      setIsSaving(false);
    }
  };

  if (!currentEntity) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Nenhuma empresa selecionada</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-biodina-blue flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Perfil da Empresa
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure os dados da {isEditingFilial ? "filial" : "empresa"}: 
            <Badge variant="outline" className="ml-2">{currentEntity.nome}</Badge>
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-biodina-gold hover:bg-biodina-gold/90">
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="informacoes" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Informações
          </TabsTrigger>
          <TabsTrigger value="endereco" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Endereço
          </TabsTrigger>
          <TabsTrigger value="emissao" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Emissão
          </TabsTrigger>
        </TabsList>

        {/* Aba Informações */}
        <TabsContent value="informacoes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dados da Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Fantasia *</Label>
                  <Input
                    id="nome"
                    value={formData.nome || ""}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Nome fantasia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razaoSocial">Razão Social *</Label>
                  <Input
                    id="razaoSocial"
                    value={formData.razaoSocial || ""}
                    onChange={(e) => handleInputChange("razaoSocial", e.target.value)}
                    placeholder="Razão social"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj || ""}
                    onChange={(e) => handleInputChange("cnpj", e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                  <Input
                    id="inscricaoEstadual"
                    value={formData.inscricaoEstadual || ""}
                    onChange={(e) => handleInputChange("inscricaoEstadual", e.target.value)}
                    placeholder="Inscrição estadual"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
                  <Input
                    id="inscricaoMunicipal"
                    value={formData.inscricaoMunicipal || ""}
                    onChange={(e) => handleInputChange("inscricaoMunicipal", e.target.value)}
                    placeholder="Inscrição municipal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regimeTributario">Regime Tributário</Label>
                  <Select
                    value={formData.regimeTributario || ""}
                    onValueChange={(value) => handleInputChange("regimeTributario", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o regime" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Simples Nacional</SelectItem>
                      <SelectItem value="2">Simples Nacional - Excesso</SelectItem>
                      <SelectItem value="3">Lucro Presumido</SelectItem>
                      <SelectItem value="4">Lucro Real</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@empresa.com.br"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone || ""}
                    onChange={(e) => handleInputChange("telefone", formatTelefone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="discriminaImpostos"
                  checked={formData.discriminaImpostos || false}
                  onCheckedChange={(checked) => handleInputChange("discriminaImpostos", checked)}
                />
                <Label htmlFor="discriminaImpostos">Discriminar impostos na nota fiscal</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Endereço */}
        <TabsContent value="endereco" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Endereço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={formData.endereco?.cep || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      handleEnderecoChange("cep", value);
                      if (value.length === 8) buscarCep(value);
                    }}
                    placeholder="00000-000"
                    maxLength={9}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="logradouro">Logradouro</Label>
                  <Input
                    id="logradouro"
                    value={formData.endereco?.logradouro || ""}
                    onChange={(e) => handleEnderecoChange("logradouro", e.target.value)}
                    placeholder="Rua, Avenida, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    value={formData.endereco?.numero || ""}
                    onChange={(e) => handleEnderecoChange("numero", e.target.value)}
                    placeholder="Nº"
                  />
                </div>
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    value={formData.endereco?.complemento || ""}
                    onChange={(e) => handleEnderecoChange("complemento", e.target.value)}
                    placeholder="Sala, Andar, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    value={formData.endereco?.bairro || ""}
                    onChange={(e) => handleEnderecoChange("bairro", e.target.value)}
                    placeholder="Bairro"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.endereco?.cidade || ""}
                    onChange={(e) => handleEnderecoChange("cidade", e.target.value)}
                    placeholder="Cidade"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uf">UF</Label>
                  <Select
                    value={formData.endereco?.uf || ""}
                    onValueChange={(value) => handleEnderecoChange("uf", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map((uf) => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Emissão */}
        <TabsContent value="emissao" className="mt-6">
          <EmissaoTab formData={formData} setFormData={setFormData as any} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerfilEmpresaContent;
