import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Lock, FileText, Upload, MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { useCepLookup } from "@/hooks/useCepLookup";

interface EmitenteData {
  // Informações Básicas
  nome_fantasia: string;
  inscricao_estadual: string;
  inscricao_municipal: string;
  regime_tributario: '1' | '2' | '3' | '4';
  
  // Endereço
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  
  // Contato
  email: string;
  telefone: string;
  
  // Configurações
  discrimina_impostos: boolean;
}

interface CertificadoData {
  serialCertificado: string;
  inicio: string;
  expiracao: string;
  idctx: string;
}

interface NfeConfig {
  homologacao: {
    serie: number;
    proximoNumero: number;
  };
  producao: {
    serie: number;
    proximoNumero: number;
  };
}

const emitenteDataMock: EmitenteData = {
  nome_fantasia: "Biodina Indústria e Comércio Ltda",
  inscricao_estadual: "123.456.789.012",
  inscricao_municipal: "987654321",
  regime_tributario: "1",
  
  cep: "13184-206",
  logradouro: "Rua das Palmeiras",
  numero: "1234",
  complemento: "Galpão 5 - Fundos",
  bairro: "Jardim Santa Clara",
  municipio: "Hortolândia",
  uf: "SP",
  
  email: "fiscal@biodina.com.br",
  telefone: "(19) 3897-1234",
  
  discrimina_impostos: true
};

const EmissaoConfig = () => {
  const [activeTab, setActiveTab] = useState("emitente");
  const [emitenteData, setEmitenteData] = useState<EmitenteData>(emitenteDataMock);
  const [ambiente, setAmbiente] = useState<"homologacao" | "producao">("homologacao");
  const [certificadoData, setCertificadoData] = useState<CertificadoData | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const { lookupCep, loading: cepLoading } = useCepLookup();
  
  const [nfeConfig, setNfeConfig] = useState<NfeConfig>({
    homologacao: { serie: 1, proximoNumero: 1 },
    producao: { serie: 1, proximoNumero: 1 }
  });

  const handleEmitenteChange = (campo: keyof EmitenteData, valor: any) => {
    setEmitenteData(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleCepChange = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '');
    handleEmitenteChange('cep', cep);
    
    if (cepLimpo.length === 8) {
      const dados = await lookupCep(cepLimpo);
      if (dados) {
        setEmitenteData(prev => ({
          ...prev,
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          municipio: dados.localidade,
          uf: dados.uf
        }));
        toast.success("Endereço encontrado!");
      }
    }
  };

  const formatarCep = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.replace(/(\d{5})(\d)/, '$1-$2');
  };

  const formatarTelefone = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3');
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3');
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;

    setNomeArquivo(file.name);

    // Simular processamento e carregar dados do certificado
    setTimeout(() => {
      const dadosSimulados: CertificadoData = {
        serialCertificado: "5A:3B:7C:9D:2E:1F:4A:8B:6C:0D",
        inicio: new Date().toLocaleDateString("pt-BR"),
        expiracao: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR"),
        idctx: "CTX-" + Math.random().toString(36).substring(2, 15).toUpperCase()
      };
      
      setCertificadoData(dadosSimulados);
      toast.success("Certificado carregado com sucesso!");
    }, 1000);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.pfx') || file.name.endsWith('.p12'))) {
      handleFileUpload(file);
    } else {
      toast.error("Apenas arquivos .pfx ou .p12 são aceitos");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleNfeConfigChange = (
    ambiente: "homologacao" | "producao",
    campo: "serie" | "proximoNumero",
    valor: number
  ) => {
    setNfeConfig(prev => ({
      ...prev,
      [ambiente]: {
        ...prev[ambiente],
        [campo]: valor
      }
    }));
  };

  const handleSalvar = () => {
    // Validações básicas
    if (!emitenteData.nome_fantasia || emitenteData.nome_fantasia.length < 3) {
      toast.error("Nome fantasia deve ter pelo menos 3 caracteres");
      return;
    }
    
    if (!emitenteData.email.includes('@')) {
      toast.error("Email inválido");
      return;
    }
    
    if (emitenteData.cep.replace(/\D/g, '').length !== 8) {
      toast.error("CEP inválido");
      return;
    }

    toast.success("Todas as configurações foram salvas com sucesso!");
    console.log("Emitente:", emitenteData);
    console.log("Certificado:", { ambiente, certificadoData, nomeArquivo });
    console.log("NF-e:", nfeConfig);
  };

  const regimesTributarios = [
    { value: '1', label: '1 - Simples Nacional' },
    { value: '2', label: '2 - Simples Nacional - Excesso de sublimite de receita bruta' },
    { value: '3', label: '3 - Regime Normal' },
    { value: '4', label: '4 - Simples Nacional - Microempreendedor Individual - MEI' },
  ];

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="space-y-6">
      {/* Título do Submódulo */}
      <div>
        <h2 className="text-2xl font-bold text-biodina-blue">Emissão</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure os dados do emitente, certificado digital e notas fiscais eletrônicas
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="emitente" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Dados do Emitente</span>
            <span className="sm:hidden">Emitente</span>
          </TabsTrigger>
          <TabsTrigger value="certificado" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Certificado Digital</span>
            <span className="sm:hidden">Certificado</span>
          </TabsTrigger>
          <TabsTrigger value="nfe" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Configuração NF-e</span>
            <span className="sm:hidden">NF-e</span>
          </TabsTrigger>
        </TabsList>

        {/* ABA 1: DADOS DO EMITENTE */}
        <TabsContent value="emitente" className="space-y-6 mt-6">
          {/* Informações Básicas */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-biodina-blue flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="nome_fantasia">Nome Fantasia *</Label>
                  <Input
                    id="nome_fantasia"
                    value={emitenteData.nome_fantasia}
                    onChange={(e) => handleEmitenteChange('nome_fantasia', e.target.value)}
                    placeholder="Nome da empresa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inscricao_estadual">Inscrição Estadual *</Label>
                  <Input
                    id="inscricao_estadual"
                    value={emitenteData.inscricao_estadual}
                    onChange={(e) => handleEmitenteChange('inscricao_estadual', e.target.value)}
                    placeholder="000.000.000.000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inscricao_municipal">Inscrição Municipal *</Label>
                  <Input
                    id="inscricao_municipal"
                    value={emitenteData.inscricao_municipal}
                    onChange={(e) => handleEmitenteChange('inscricao_municipal', e.target.value)}
                    placeholder="000000000"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="regime_tributario">Regime Tributário *</Label>
                  <Select
                    value={emitenteData.regime_tributario}
                    onValueChange={(value) => handleEmitenteChange('regime_tributario', value)}
                  >
                    <SelectTrigger id="regime_tributario">
                      <SelectValue placeholder="Selecione o regime tributário" />
                    </SelectTrigger>
                    <SelectContent>
                      {regimesTributarios.map(regime => (
                        <SelectItem key={regime.value} value={regime.value}>
                          {regime.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-biodina-blue flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP *</Label>
                  <div className="relative">
                    <Input
                      id="cep"
                      value={emitenteData.cep}
                      onChange={(e) => handleCepChange(formatarCep(e.target.value))}
                      placeholder="00000-000"
                      maxLength={9}
                    />
                    {cepLoading && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="animate-spin h-4 w-4 border-2 border-biodina-blue border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uf">Estado (UF) *</Label>
                  <Select
                    value={emitenteData.uf}
                    onValueChange={(value) => handleEmitenteChange('uf', value)}
                  >
                    <SelectTrigger id="uf">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estadosBrasileiros.map(estado => (
                        <SelectItem key={estado} value={estado}>
                          {estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="logradouro">Logradouro *</Label>
                  <Input
                    id="logradouro"
                    value={emitenteData.logradouro}
                    onChange={(e) => handleEmitenteChange('logradouro', e.target.value)}
                    placeholder="Rua, Avenida, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numero">Número *</Label>
                  <Input
                    id="numero"
                    value={emitenteData.numero}
                    onChange={(e) => handleEmitenteChange('numero', e.target.value)}
                    placeholder="1234"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    value={emitenteData.complemento}
                    onChange={(e) => handleEmitenteChange('complemento', e.target.value)}
                    placeholder="Apt, Sala, Galpão, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro *</Label>
                  <Input
                    id="bairro"
                    value={emitenteData.bairro}
                    onChange={(e) => handleEmitenteChange('bairro', e.target.value)}
                    placeholder="Nome do bairro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="municipio">Município *</Label>
                  <Input
                    id="municipio"
                    value={emitenteData.municipio}
                    onChange={(e) => handleEmitenteChange('municipio', e.target.value)}
                    placeholder="Nome da cidade"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contato e Configurações */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-biodina-blue flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contato e Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={emitenteData.email}
                    onChange={(e) => handleEmitenteChange('email', e.target.value)}
                    placeholder="contato@empresa.com.br"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={emitenteData.telefone}
                    onChange={(e) => handleEmitenteChange('telefone', formatarTelefone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Discriminar impostos no corpo da nota? *</Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      type="button"
                      variant={emitenteData.discrimina_impostos ? "default" : "outline"}
                      onClick={() => handleEmitenteChange('discrimina_impostos', true)}
                      className={emitenteData.discrimina_impostos ? "bg-biodina-blue hover:bg-biodina-blue/90" : ""}
                    >
                      Sim
                    </Button>
                    <Button
                      type="button"
                      variant={!emitenteData.discrimina_impostos ? "default" : "outline"}
                      onClick={() => handleEmitenteChange('discrimina_impostos', false)}
                      className={!emitenteData.discrimina_impostos ? "bg-biodina-blue hover:bg-biodina-blue/90" : ""}
                    >
                      Não
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 2: CERTIFICADO DIGITAL */}
        <TabsContent value="certificado" className="space-y-6 mt-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-biodina-blue flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Certificado Digital
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload com Drag & Drop */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Upload do Certificado</Label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
                      ? 'border-biodina-blue bg-biodina-blue/5'
                      : 'border-border hover:border-biodina-blue/50'
                  }`}
                >
                  <Input
                    id="certificado"
                    type="file"
                    accept=".pfx,.p12"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Arraste o arquivo aqui ou clique para selecionar
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Formatos aceitos: .pfx, .p12
                  </p>
                  <Button
                    type="button"
                    onClick={() => document.getElementById("certificado")?.click()}
                    className="bg-biodina-blue hover:bg-biodina-blue/90"
                  >
                    Selecionar Arquivo
                  </Button>
                  {nomeArquivo && (
                    <p className="text-sm text-biodina-blue font-medium mt-4">
                      📄 {nomeArquivo}
                    </p>
                  )}
                </div>
              </div>

              {/* Ambiente de Emissão */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Ambiente de Emissão</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={ambiente === "homologacao" ? "default" : "outline"}
                    onClick={() => setAmbiente("homologacao")}
                    className={`flex-1 ${
                      ambiente === "homologacao"
                        ? "bg-biodina-blue hover:bg-biodina-blue/90"
                        : ""
                    }`}
                  >
                    🧪 Homologação
                  </Button>
                  <Button
                    type="button"
                    variant={ambiente === "producao" ? "default" : "outline"}
                    onClick={() => setAmbiente("producao")}
                    className={`flex-1 ${
                      ambiente === "producao"
                        ? "bg-biodina-blue hover:bg-biodina-blue/90"
                        : ""
                    }`}
                  >
                    🏭 Produção
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  💡 Use Homologação para testes antes de emitir notas reais
                </p>
              </div>

              {/* Informações do Certificado */}
              {certificadoData && (
                <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      ✅ Certificado Carregado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground font-medium">Serial:</p>
                        <p className="font-mono text-xs">{certificadoData.serialCertificado}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground font-medium">IDCTX:</p>
                        <p className="font-mono text-xs">{certificadoData.idctx}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground font-medium">Início:</p>
                        <p>{certificadoData.inicio}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground font-medium">Validade:</p>
                        <p>{certificadoData.expiracao}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 3: CONFIGURAÇÃO NF-E */}
        <TabsContent value="nfe" className="space-y-6 mt-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-biodina-blue flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Configurações de Numeração NF-e
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Homologação */}
              <div className="space-y-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🧪</span>
                  <h3 className="text-base font-semibold">AMBIENTE DE HOMOLOGAÇÃO</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serie-homologacao">Série</Label>
                    <Input
                      id="serie-homologacao"
                      type="number"
                      min="0"
                      value={nfeConfig.homologacao.serie}
                      onChange={(e) =>
                        handleNfeConfigChange(
                          "homologacao",
                          "serie",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proximo-numero-homologacao">Próximo Número</Label>
                    <Input
                      id="proximo-numero-homologacao"
                      type="number"
                      min="1"
                      value={nfeConfig.homologacao.proximoNumero}
                      onChange={(e) =>
                        handleNfeConfigChange(
                          "homologacao",
                          "proximoNumero",
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Produção */}
              <div className="space-y-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🏭</span>
                  <h3 className="text-base font-semibold">AMBIENTE DE PRODUÇÃO</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serie-producao">Série</Label>
                    <Input
                      id="serie-producao"
                      type="number"
                      min="0"
                      value={nfeConfig.producao.serie}
                      onChange={(e) =>
                        handleNfeConfigChange(
                          "producao",
                          "serie",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proximo-numero-producao">Próximo Número</Label>
                    <Input
                      id="proximo-numero-producao"
                      type="number"
                      min="1"
                      value={nfeConfig.producao.proximoNumero}
                      onChange={(e) =>
                        handleNfeConfigChange(
                          "producao",
                          "proximoNumero",
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botão Salvar Geral */}
      <div className="flex justify-end">
        <Button
          onClick={handleSalvar}
          className="bg-biodina-blue hover:bg-biodina-blue/90 px-8"
          size="lg"
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default EmissaoConfig;
