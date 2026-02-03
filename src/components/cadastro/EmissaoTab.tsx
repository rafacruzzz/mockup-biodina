import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, FileText, Upload, Shield, Calendar, AlertTriangle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Filial } from "@/types/super";

interface CertificadoData {
  serial: string;
  idctx: string;
  inicio: string;
  expiracao: string;
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

interface EmissaoTabProps {
  formData: Partial<Filial> & { modulosDetalhados?: any[] };
  setFormData: (data: Partial<Filial> & { modulosDetalhados?: any[] }) => void;
}

const EmissaoTab = ({ formData, setFormData }: EmissaoTabProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [nomeArquivo, setNomeArquivo] = useState(formData.certificadoDigital?.nomeArquivo || "");
  const [senhaCertificado, setSenhaCertificado] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [ambienteEmissao, setAmbienteEmissao] = useState<'homologacao' | 'producao'>(
    formData.certificadoDigital?.ambienteEmissao || 'homologacao'
  );
  const [certificadoData, setCertificadoData] = useState<CertificadoData | null>(
    formData.certificadoDigital ? {
      serial: formData.certificadoDigital.serialCertificado,
      idctx: formData.certificadoDigital.idctx,
      inicio: formData.certificadoDigital.inicio,
      expiracao: formData.certificadoDigital.expiracao
    } : null
  );
  const [nfeConfig, setNfeConfig] = useState<NfeConfig>(
    formData.nfeConfig || {
      homologacao: { serie: 1, proximoNumero: 1 },
      producao: { serie: 1, proximoNumero: 1 }
    }
  );
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.pfx') && !file.name.endsWith('.p12')) {
      return;
    }
    
    setNomeArquivo(file.name);
    
    // Simular leitura do certificado (mock)
    const mockCertData: CertificadoData = {
      serial: Math.random().toString(36).substring(2, 10).toUpperCase(),
      idctx: Math.random().toString(36).substring(2, 8).toUpperCase(),
      inicio: new Date().toISOString().split('T')[0],
      expiracao: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    setCertificadoData(mockCertData);
    
    // Atualizar formData
    setFormData({
      ...formData,
      certificadoDigital: {
        nomeArquivo: file.name,
        serialCertificado: mockCertData.serial,
        idctx: mockCertData.idctx,
        inicio: mockCertData.inicio,
        expiracao: mockCertData.expiracao,
        ambienteEmissao
      }
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleAmbienteChange = (value: 'homologacao' | 'producao') => {
    setAmbienteEmissao(value);
    if (formData.certificadoDigital) {
      setFormData({
        ...formData,
        certificadoDigital: {
          ...formData.certificadoDigital,
          ambienteEmissao: value
        }
      });
    }
  };

  const handleNfeConfigChange = (
    ambiente: 'homologacao' | 'producao',
    campo: 'serie' | 'proximoNumero',
    valor: number
  ) => {
    const novaConfig = {
      ...nfeConfig,
      [ambiente]: {
        ...nfeConfig[ambiente],
        [campo]: valor
      }
    };
    setNfeConfig(novaConfig);
    setFormData({
      ...formData,
      nfeConfig: novaConfig
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const isCertificadoValido = () => {
    if (!certificadoData?.expiracao) return false;
    return new Date(certificadoData.expiracao) > new Date();
  };

  return (
    <div className="space-y-6">
      {/* Seção: Certificado Digital */}
      <Card className="border-l-4 border-l-biodina-gold">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-biodina-gold" />
            Certificado Digital
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Área de Upload */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
              isDragging 
                ? 'border-biodina-gold bg-biodina-gold/5' 
                : 'border-muted-foreground/25 hover:border-biodina-gold/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pfx,.p12"
              className="hidden"
              onChange={handleFileInputChange}
            />
            <Upload className={`h-10 w-10 mx-auto mb-3 ${isDragging ? 'text-biodina-gold' : 'text-muted-foreground'}`} />
            {nomeArquivo ? (
              <div>
                <p className="text-sm font-medium text-foreground">{nomeArquivo}</p>
                <p className="text-xs text-muted-foreground mt-1">Clique para substituir</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-foreground">
                  Arraste o arquivo ou clique para selecionar
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Aceita arquivos .pfx ou .p12
                </p>
              </div>
            )}
          </div>

          {/* Senha do Certificado */}
          <div className="space-y-2">
            <Label htmlFor="senhaCertificado" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Senha do Certificado
            </Label>
            <div className="relative">
              <Input
                id="senhaCertificado"
                type={mostrarSenha ? "text" : "password"}
                value={senhaCertificado}
                onChange={(e) => setSenhaCertificado(e.target.value)}
                placeholder="Digite a senha do certificado"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Ambiente de Emissão */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Ambiente de Emissão
            </Label>
            <RadioGroup
              value={ambienteEmissao}
              onValueChange={(value) => handleAmbienteChange(value as 'homologacao' | 'producao')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="homologacao" id="homologacao" />
                <Label htmlFor="homologacao" className="cursor-pointer">Homologação</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="producao" id="producao" />
                <Label htmlFor="producao" className="cursor-pointer">Produção</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Informações do Certificado */}
          {certificadoData && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Informações do Certificado</h4>
                {isCertificadoValido() ? (
                  <Badge className="bg-green-500 text-white gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Válido
                  </Badge>
                ) : (
                  <Badge className="bg-red-500 text-white gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Expirado
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Serial</p>
                  <p className="font-mono font-medium">{certificadoData.serial}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">IDCTX</p>
                  <p className="font-mono font-medium">{certificadoData.idctx}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Início</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(certificadoData.inicio)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Expiração</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(certificadoData.expiracao)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seção: Configuração NF-e */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-blue-500" />
            Configuração NF-e
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ambiente de Homologação */}
            <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  Ambiente de Homologação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="serieHom" className="text-xs">Série</Label>
                    <Input
                      id="serieHom"
                      type="number"
                      min={1}
                      value={nfeConfig.homologacao.serie}
                      onChange={(e) => handleNfeConfigChange('homologacao', 'serie', parseInt(e.target.value) || 1)}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="numHom" className="text-xs">Próximo Número</Label>
                    <Input
                      id="numHom"
                      type="number"
                      min={1}
                      value={nfeConfig.homologacao.proximoNumero}
                      onChange={(e) => handleNfeConfigChange('homologacao', 'proximoNumero', parseInt(e.target.value) || 1)}
                      className="h-9"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ambiente de Produção */}
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Ambiente de Produção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="serieProd" className="text-xs">Série</Label>
                    <Input
                      id="serieProd"
                      type="number"
                      min={1}
                      value={nfeConfig.producao.serie}
                      onChange={(e) => handleNfeConfigChange('producao', 'serie', parseInt(e.target.value) || 1)}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="numProd" className="text-xs">Próximo Número</Label>
                    <Input
                      id="numProd"
                      type="number"
                      min={1}
                      value={nfeConfig.producao.proximoNumero}
                      onChange={(e) => handleNfeConfigChange('producao', 'proximoNumero', parseInt(e.target.value) || 1)}
                      className="h-9"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmissaoTab;
