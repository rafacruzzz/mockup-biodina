import { useState, useEffect, useRef } from "react";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, FileText, Save, Loader2, Upload, X, Type } from "lucide-react";
import { toast } from "sonner";
import EmissaoTab from "@/components/cadastro/EmissaoTab";
import { Empresa, Filial } from "@/types/super";

const PerfilEmpresaContent = () => {
  const { empresaAtual, filialAtual, atualizarEmpresa, atualizarFilial } = useEmpresa();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("informacoes");
  const [timbradoFile, setTimbradoFile] = useState<File | null>(null);
  const [timbradoPreview, setTimbradoPreview] = useState<string | null>(null);
  const timbradoInputRef = useRef<HTMLInputElement>(null);

  const fontOptions = [
    "Arial", "Arial Black", "Calibri", "Cambria", "Comic Sans MS",
    "Courier New", "Georgia", "Helvetica", "Impact", "Lucida Console",
    "Palatino Linotype", "Segoe UI", "Tahoma", "Times New Roman",
    "Trebuchet MS", "Verdana"
  ];

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
        timbradoUrl: (currentEntity as any).timbradoUrl || "",
        fonteDocumentos: (currentEntity as any).fonteDocumentos || "Arial",
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
      if ((currentEntity as any).timbradoUrl) {
        setTimbradoPreview((currentEntity as any).timbradoUrl);
      }
    }
  }, [currentEntity]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEnderecoChange = (field: string, value: string) => {

  const handleTimbradoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type)) {
        toast.error("Formato não suportado. Use PNG, JPG ou PDF.");
        return;
      }
      setTimbradoFile(file);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setTimbradoPreview(url);
        handleInputChange("timbradoUrl", url);
      } else {
        setTimbradoPreview(null);
        handleInputChange("timbradoUrl", file.name);
      }
      toast.success("Timbrado carregado com sucesso!");
    }
  };

  const handleRemoveTimbrado = () => {
    setTimbradoFile(null);
    setTimbradoPreview(null);
    handleInputChange("timbradoUrl", "");
    if (timbradoInputRef.current) timbradoInputRef.current.value = "";
  };
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

              {/* Timbrado da Empresa */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Timbrado da Empresa
                </Label>
                <p className="text-sm text-muted-foreground">
                  Faça upload da imagem do timbrado que será usado na impressão dos documentos.
                </p>
                <input
                  ref={timbradoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                  className="hidden"
                  onChange={handleTimbradoUpload}
                />
                {timbradoPreview ? (
                  <div className="relative border rounded-lg p-2 inline-block">
                    <img src={timbradoPreview} alt="Timbrado" className="max-h-40 object-contain" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={handleRemoveTimbrado}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : formData.timbradoUrl ? (
                  <div className="flex items-center gap-2 border rounded-lg p-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{formData.timbradoUrl}</span>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-6 w-6 ml-auto"
                      onClick={handleRemoveTimbrado}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => timbradoInputRef.current?.click()}
                    className="w-full h-24 border-dashed flex flex-col gap-2"
                  >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Clique para enviar o timbrado (PNG, JPG ou PDF)</span>
                  </Button>
                )}
              </div>

              {/* Fonte para Documentos */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Fonte para Documentos
                </Label>
                <p className="text-sm text-muted-foreground">
                  Selecione a fonte padrão para impressão dos documentos desta empresa.
                </p>
                <Select
                  value={formData.fonteDocumentos || "Arial"}
                  onValueChange={(value) => handleInputChange("fonteDocumentos", value)}
                >
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Selecione a fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font} value={font}>
                        <span style={{ fontFamily: font }}>{font}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                  <p style={{ fontFamily: formData.fonteDocumentos || "Arial" }} className="text-sm">
                    A rápida raposa marrom pula sobre o cão preguiçoso. 0123456789
                  </p>
                </div>
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
