import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, FileText, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';

interface DisponibilizacaoInstrucaoAtualizacaoStepProps {
  produtoSelecionado: any;
  atualizacaoData: any;
  onVoltar: () => void;
  onSalvarAtualizacao: (data: any) => void;
}

export const DisponibilizacaoInstrucaoAtualizacaoStep = ({ 
  produtoSelecionado, 
  atualizacaoData, 
  onVoltar, 
  onSalvarAtualizacao 
}: DisponibilizacaoInstrucaoAtualizacaoStepProps) => {
  const [formData, setFormData] = useState({
    transacaoInstrucao: atualizacaoData.transacaoInstrucao || '',
    expedienteInstrucao: atualizacaoData.expedienteInstrucao || '',
    dataEnvioInstrucao: atualizacaoData.dataEnvioInstrucao || ''
  });
  const [arquivoInstrucao, setArquivoInstrucao] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatarTamanhoArquivo = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      toast.error('Tipo de arquivo não permitido. Use PDF, DOC ou DOCX.');
      return;
    }

    // Validar tamanho (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo 10MB.');
      return;
    }

    setArquivoInstrucao(file);
    toast.success('Arquivo da Instrução de Uso carregado com sucesso!');
  };

  const handleRemoverArquivo = () => {
    setArquivoInstrucao(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Arquivo removido');
  };

  const handleSalvarAtualizacao = () => {
    // Validação dos campos obrigatórios
    if (!arquivoInstrucao) {
      toast.error('Anexe o arquivo da Instrução de Uso');
      return;
    }
    
    const data = {
      ...atualizacaoData,
      ...formData,
      arquivoInstrucaoAnexado: !!arquivoInstrucao
    };
    
    onSalvarAtualizacao(data);
  };

  return (
    <div className="space-y-6">
      {/* Produto Selecionado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Produto Selecionado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Código:</span> {produtoSelecionado?.codigo}</div>
            <div><span className="font-medium">Nome:</span> {produtoSelecionado?.nome}</div>
            <div><span className="font-medium">Registro ANVISA:</span> {atualizacaoData.numeroRegistroAnvisa}</div>
            <div><span className="font-medium">Fabricante:</span> {produtoSelecionado?.fabricante}</div>
          </div>
        </CardContent>
      </Card>

      {/* Disponibilização de Instrução de Uso */}
      <Card>
        <CardHeader>
          <CardTitle>Disponibilização de Instrução de Uso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="transacaoInstrucao">Transação</Label>
              <Input 
                id="transacaoInstrucao"
                value={formData.transacaoInstrucao}
                onChange={(e) => handleInputChange('transacaoInstrucao', e.target.value)}
                placeholder="Número da transação"
              />
            </div>

            <div>
              <Label htmlFor="expedienteInstrucao">Expediente</Label>
              <Input 
                id="expedienteInstrucao"
                value={formData.expedienteInstrucao}
                onChange={(e) => handleInputChange('expedienteInstrucao', e.target.value)}
                placeholder="Número do expediente"
              />
            </div>

            <div>
              <Label htmlFor="dataEnvioInstrucao">Data de envio</Label>
              <Input 
                id="dataEnvioInstrucao"
                type="date"
                value={formData.dataEnvioInstrucao}
                onChange={(e) => handleInputChange('dataEnvioInstrucao', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload da Instrução de Uso */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Anexar Arquivo da Instrução de Uso *</CardTitle>
          <p className="text-sm text-muted-foreground">
            Campo obrigatório. Formatos aceitos: PDF, DOC, DOCX (máximo 10MB)
          </p>
        </CardHeader>
        <CardContent>
          {!arquivoInstrucao ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Clique para anexar o arquivo da Instrução de Uso
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Selecionar Arquivo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">
                      {arquivoInstrucao.name}
                    </p>
                    <p className="text-sm text-green-600">
                      {formatarTamanhoArquivo(arquivoInstrucao.size)} • 
                      Carregado agora
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Trocar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoverArquivo}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumo da Atualização */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Atualização de Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Nome do Arquivo Principal:</span>
              <p className="text-muted-foreground">{atualizacaoData.nomeArquivoPrincipal}</p>
            </div>
            <div>
              <span className="font-medium">Área da ANVISA:</span>
              <p className="text-muted-foreground">
                {atualizacaoData.areaAnvisa === 'produtos_saude' ? 'Produtos para Saúde' : 
                 atualizacaoData.areaAnvisa === 'diagnostico_in_vitro' ? 'Diagnóstico In Vitro' : 
                 atualizacaoData.areaAnvisa}
              </p>
            </div>
            <div>
              <span className="font-medium">Transação:</span>
              <p className="text-muted-foreground">{atualizacaoData.transacao || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium">Documentos de Alteração:</span>
              <p className="text-muted-foreground">{atualizacaoData.documentosAlteracao?.length || 0} documento(s)</p>
            </div>
            <div>
              <span className="font-medium">Protocolo Peticionamento:</span>
              <p className="text-muted-foreground">
                {atualizacaoData.protocoloPeticionamentoAnexado ? 'Anexado' : 'Não anexado'}
              </p>
            </div>
            <div>
              <span className="font-medium">Instrução de Uso:</span>
              <p className="text-muted-foreground">
                {arquivoInstrucao ? 'Anexado' : 'Não anexado'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onVoltar} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <Button 
          onClick={handleSalvarAtualizacao} 
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={!arquivoInstrucao}
        >
          <Download className="h-4 w-4 mr-2" />
          Salvar Atualização
        </Button>
      </div>
    </div>
  );
};