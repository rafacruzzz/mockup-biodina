import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Upload, Trash2, Plus, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentoAlteracao {
  id: number;
  subtitulo: string;
  arquivo?: File;
  dataAlteracao: string;
}

interface GeracaoDocumentacaoStepProps {
  produtoSelecionado: any;
  atualizacaoData: any;
  onVoltar: () => void;
  onProximaEtapa: (data: any) => void;
}

export const GeracaoDocumentacaoStep = ({ 
  produtoSelecionado, 
  atualizacaoData, 
  onVoltar, 
  onProximaEtapa 
}: GeracaoDocumentacaoStepProps) => {
  const [nomeArquivoPrincipal, setNomeArquivoPrincipal] = useState(atualizacaoData.nomeArquivoPrincipal || '');
  const [documentos, setDocumentos] = useState<DocumentoAlteracao[]>(atualizacaoData.documentosAlteracao || []);
  const [protocoloPeticionamento, setProtocoloPeticionamento] = useState<File | null>(null);
  const [novoSubtitulo, setNovoSubtitulo] = useState('');
  
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const protocoloInputRef = useRef<HTMLInputElement>(null);

  const formatarTamanhoArquivo = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const adicionarNovoDocumento = () => {
    if (!novoSubtitulo.trim()) {
      toast.error('Digite um subtítulo para o documento');
      return;
    }

    const novoDocumento: DocumentoAlteracao = {
      id: Date.now(),
      subtitulo: novoSubtitulo,
      dataAlteracao: new Date().toISOString().split('T')[0]
    };

    setDocumentos(prev => [...prev, novoDocumento].sort((a, b) => new Date(a.dataAlteracao).getTime() - new Date(b.dataAlteracao).getTime()));
    setNovoSubtitulo('');
    toast.success('Documento adicionado à lista');
  };

  const handleFileUpload = (documentoId: number, event: React.ChangeEvent<HTMLInputElement>) => {
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

    setDocumentos(prev => 
      prev.map(doc => 
        doc.id === documentoId 
          ? { ...doc, arquivo: file }
          : doc
      )
    );

    toast.success('Arquivo anexado com sucesso!');
  };

  const handleProtocoloUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    setProtocoloPeticionamento(file);
    toast.success('Protocolo de Peticionamento anexado!');
  };

  const removerDocumento = (documentoId: number) => {
    setDocumentos(prev => prev.filter(doc => doc.id !== documentoId));
    toast.success('Documento removido');
  };

  const removerArquivoDocumento = (documentoId: number) => {
    setDocumentos(prev => 
      prev.map(doc => 
        doc.id === documentoId 
          ? { ...doc, arquivo: undefined }
          : doc
      )
    );

    // Limpar input
    if (fileInputRefs.current[documentoId]) {
      fileInputRefs.current[documentoId]!.value = '';
    }
    
    toast.success('Arquivo removido');
  };

  const removerProtocolo = () => {
    setProtocoloPeticionamento(null);
    if (protocoloInputRef.current) {
      protocoloInputRef.current.value = '';
    }
    toast.success('Protocolo removido');
  };

  const handleProximaEtapa = () => {
    // Validação dos campos obrigatórios
    if (!nomeArquivePrincipal.trim()) {
      toast.error('Digite o nome do arquivo principal');
      return;
    }

    if (!protocoloPeticionamento) {
      toast.error('Anexe o Protocolo de Peticionamento na ANVISA');
      return;
    }

    if (documentos.length === 0) {
      toast.error('Adicione pelo menos um documento de alteração');
      return;
    }

    const data = {
      ...atualizacaoData,
      nomeArquivoPrincipal,
      documentosAlteracao: documentos,
      protocoloPeticionamentoAnexado: !!protocoloPeticionamento
    };
    
    onProximaEtapa(data);
  };

  // Ordenar documentos por data de alteração
  const documentosOrdenados = [...documentos].sort((a, b) => 
    new Date(a.dataAlteracao).getTime() - new Date(b.dataAlteracao).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Produto Selecionado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Produto Selecionado para Atualização
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

      {/* Nome do Arquivo Principal */}
      <Card>
        <CardHeader>
          <CardTitle>Nome do Arquivo Principal *</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="nomeArquivoPrincipal">Nome do arquivo principal para esta atualização</Label>
          <Input 
            id="nomeArquivoPrincipal"
            value={nomeArquivoPrincipal}
            onChange={(e) => setNomeArquivoPrincipal(e.target.value)}
            placeholder="Ex: Alteracao_Instrucao_Uso_Produto_v2024"
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Documentos de Alteração */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos de Alteração (Ordem Cronológica)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Adicione os subtítulos e arquivos relacionados às alterações, organizados por data
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Adicionar Novo Documento */}
          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="novoSubtitulo">Subtítulo do documento</Label>
                <Input 
                  id="novoSubtitulo"
                  value={novoSubtitulo}
                  onChange={(e) => setNovoSubtitulo(e.target.value)}
                  placeholder="Ex: Instrução de Uso Atualizada"
                />
              </div>
              <Button onClick={adicionarNovoDocumento} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>

          {/* Lista de Documentos */}
          {documentosOrdenados.length > 0 ? (
            <div className="space-y-3">
              {documentosOrdenados.map((documento, index) => (
                <div key={documento.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <h4 className="font-medium">{documento.subtitulo}</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(documento.dataAlteracao).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removerDocumento(documento.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Upload de Arquivo */}
                  {!documento.arquivo ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Anexar arquivo relacionado</p>
                      <Button 
                        size="sm"
                        onClick={() => fileInputRefs.current[documento.id]?.click()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Selecionar Arquivo
                      </Button>
                      <input
                        ref={(el) => fileInputRefs.current[documento.id] = el}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(documento.id, e)}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="border border-green-200 bg-green-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800 text-sm">
                              {documento.arquivo.name}
                            </p>
                            <p className="text-xs text-green-600">
                              {formatarTamanhoArquivo(documento.arquivo.size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRefs.current[documento.id]?.click()}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Trocar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removerArquivoDocumento(documento.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remover
                          </Button>
                        </div>
                      </div>
                      <input
                        ref={(el) => fileInputRefs.current[documento.id] = el}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(documento.id, e)}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>Nenhum documento adicionado ainda</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Protocolo de Peticionamento (Obrigatório) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Protocolo de Peticionamento na ANVISA *
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Campo obrigatório para prosseguir. Anexe o protocolo oficial de peticionamento.
          </p>
        </CardHeader>
        <CardContent>
          {!protocoloPeticionamento ? (
            <div className="border-2 border-dashed border-red-300 rounded-lg p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-600 mb-4 font-medium">
                Protocolo de Peticionamento na ANVISA obrigatório
              </p>
              <Button 
                onClick={() => protocoloInputRef.current?.click()}
                className="bg-red-600 hover:bg-red-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Anexar Protocolo
              </Button>
              <input
                ref={protocoloInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleProtocoloUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">
                      {protocoloPeticionamento.name}
                    </p>
                    <p className="text-sm text-green-600">
                      {formatarTamanhoArquivo(protocoloPeticionamento.size)} • Protocolo anexado
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => protocoloInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Trocar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removerProtocolo}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
              </div>
              <input
                ref={protocoloInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleProtocoloUpload}
                className="hidden"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onVoltar} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <Button 
          onClick={handleProximaEtapa} 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!nomeArquivePrincipal.trim() || !protocoloPeticionamento || documentos.length === 0}
        >
          Próxima Etapa
        </Button>
      </div>
    </div>
  );
};