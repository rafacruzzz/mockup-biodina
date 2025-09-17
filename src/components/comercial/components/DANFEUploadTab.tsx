
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, Trash2, Eye } from "lucide-react";

interface DANFEData {
  id: string;
  numeroDanfe: string;
  cnpjCliente: string;
  nomeCliente: string;
  valorTotal: string;
  dataEmissao: Date;
  dataUpload: Date;
  tipoDanfe: 'entrada' | 'saida';
  produtos: Array<{
    referencia: string;
    descricao: string;
    valor: string;
  }>;
}

interface DANFEUploadTabProps {
  onDataExtracted: (data: DANFEData) => void;
  extractedData: DANFEData | null;
  historicoDANFEs: DANFEData[];
  onHistoricoUpdate: (historico: DANFEData[]) => void;
}

const DANFEUploadTab = ({ onDataExtracted, extractedData, historicoDANFEs, onHistoricoUpdate }: DANFEUploadTabProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionStatus, setExtractionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [tipoDanfe, setTipoDanfe] = useState<'entrada' | 'saida'>('entrada');

  // Simulate DANFE data extraction
  const simulateDANFEExtraction = async (file: File, tipo: 'entrada' | 'saida'): Promise<DANFEData> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data based on file name for simulation
    const mockData: DANFEData = {
      id: `danfe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      numeroDanfe: `55240112345678000199550010000000${Math.floor(Math.random() * 100).toString().padStart(2, '0')}${Math.floor(Math.random() * 10000000)}`,
      cnpjCliente: "12.345.678/0001-99",
      nomeCliente: "Hospital Albert Einstein",
      valorTotal: "85000.00",
      dataEmissao: new Date(),
      dataUpload: new Date(),
      tipoDanfe: tipo,
      produtos: [
        {
          referencia: "ABL800-FLEX-001",
          descricao: "Analisador de Gases Sanguíneos ABL800 FLEX",
          valor: "85000.00"
        }
      ]
    };

    return mockData;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsExtracting(true);
    setExtractionStatus('idle');

    try {
      const extractedData = await simulateDANFEExtraction(file, tipoDanfe);
      setExtractionStatus('success');
      onDataExtracted(extractedData);
      
      // Adicionar ao histórico
      const novoHistorico = [...historicoDANFEs, extractedData];
      onHistoricoUpdate(novoHistorico);
    } catch (error) {
      setExtractionStatus('error');
      console.error('Erro na extração:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAutoFill = () => {
    if (extractedData) {
      // Trigger auto-fill in parent component
      console.log('Auto-preenchendo dados:', extractedData);
    }
  };

  const handleRemoveFromHistorico = (id: string) => {
    const novoHistorico = historicoDANFEs.filter(danfe => danfe.id !== id);
    onHistoricoUpdate(novoHistorico);
  };

  const getTipoIcon = (tipo: 'entrada' | 'saida') => {
    return tipo === 'entrada' ? '↓' : '↑';
  };

  const getTipoBadgeClass = (tipo: 'entrada' | 'saida') => {
    return tipo === 'entrada' 
      ? 'bg-green-100 text-green-700 border-green-200' 
      : 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload da DANFE de Empréstimo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de DANFE *</Label>
              <RadioGroup
                value={tipoDanfe}
                onValueChange={(value) => setTipoDanfe(value as 'entrada' | 'saida')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="entrada" id="entrada" />
                  <Label htmlFor="entrada" className="flex items-center gap-1">
                    <span className="text-green-600">↓</span> Entrada
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="saida" id="saida" />
                  <Label htmlFor="saida" className="flex items-center gap-1">
                    <span className="text-red-600">↑</span> Saída
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-4">
              Selecione o arquivo da DANFE (PDF ou XML)
            </p>
            <input
              type="file"
              accept=".pdf,.xml"
              onChange={handleFileUpload}
              className="hidden"
              id="danfe-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('danfe-upload')?.click()}
              disabled={isExtracting}
            >
              {isExtracting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Selecionar Arquivo
                </>
              )}
            </Button>
          </div>

          {uploadedFile && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {extractionStatus === 'success' && (
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Processado
                  </Badge>
                )}
                {extractionStatus === 'error' && (
                  <Badge variant="destructive">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Erro
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {extractedData && extractionStatus === 'success' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Dados Extraídos da DANFE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Número da DANFE</p>
                <p className="text-sm">{extractedData.numeroDanfe}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">CNPJ do Cliente</p>
                <p className="text-sm">{extractedData.cnpjCliente}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Nome do Cliente</p>
                <p className="text-sm">{extractedData.nomeCliente}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Valor Total</p>
                <p className="text-sm">R$ {Number(extractedData.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Produtos</p>
              {extractedData.produtos.map((produto, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">{produto.referencia}</p>
                  <p className="text-sm text-gray-600">{produto.descricao}</p>
                  <p className="text-sm">Valor: R$ {Number(produto.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
              ))}
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Dados extraídos com sucesso! Clique em "Preencher Automaticamente" para aplicar nos outros campos.
              </AlertDescription>
            </Alert>

            <Button onClick={handleAutoFill} className="w-full bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Preencher Automaticamente
            </Button>
          </CardContent>
        </Card>
      )}

      {historicoDANFEs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Histórico de DANFEs ({historicoDANFEs.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Entrada: {historicoDANFEs.filter(d => d.tipoDanfe === 'entrada').length}</span>
              <span>Saída: {historicoDANFEs.filter(d => d.tipoDanfe === 'saida').length}</span>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {historicoDANFEs.map((danfe) => (
                <div key={danfe.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={`${getTipoBadgeClass(danfe.tipoDanfe)} border`}>
                      {getTipoIcon(danfe.tipoDanfe)} {danfe.tipoDanfe.toUpperCase()}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{danfe.numeroDanfe}</p>
                      <p className="text-xs text-gray-500">
                        {danfe.nomeCliente} • {danfe.dataUpload.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => console.log('Visualizar DANFE:', danfe)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFromHistorico(danfe.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DANFEUploadTab;
