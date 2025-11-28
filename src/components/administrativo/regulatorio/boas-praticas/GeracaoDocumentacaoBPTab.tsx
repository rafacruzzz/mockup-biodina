import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, X, Upload, FileText, AlertCircle } from 'lucide-react';
import { DocumentoBoasPraticas } from '@/types/boasPraticas';
import { toast } from 'sonner';

interface GeracaoDocumentacaoBPTabProps {
  nomeArquivoPrincipal: string;
  setNomeArquivoPrincipal: (value: string) => void;
  documentos: DocumentoBoasPraticas[];
  setDocumentos: (docs: DocumentoBoasPraticas[]) => void;
  protocoloPeticionamento?: File;
  setProtocoloPeticionamento: (file: File | undefined) => void;
  onProximaEtapa: () => void;
}

export const GeracaoDocumentacaoBPTab = ({
  nomeArquivoPrincipal,
  setNomeArquivoPrincipal,
  documentos,
  setDocumentos,
  protocoloPeticionamento,
  setProtocoloPeticionamento,
  onProximaEtapa
}: GeracaoDocumentacaoBPTabProps) => {
  const [nextId, setNextId] = useState(documentos.length + 1);

  const adicionarSubtitulo = () => {
    const novoDoc: DocumentoBoasPraticas = {
      id: nextId,
      subtitulo: '',
      dataCriacao: new Date().toISOString()
    };
    setDocumentos([...documentos, novoDoc]);
    setNextId(nextId + 1);
  };

  const removerSubtitulo = (id: number) => {
    setDocumentos(documentos.filter(doc => doc.id !== id));
  };

  const atualizarSubtitulo = (id: number, valor: string) => {
    setDocumentos(documentos.map(doc => 
      doc.id === id ? { ...doc, subtitulo: valor } : doc
    ));
  };

  const handleArquivoSubtitulo = (id: number, file: File | null) => {
    if (file) {
      setDocumentos(documentos.map(doc => 
        doc.id === id ? { ...doc, arquivo: file, nomeArquivo: file.name } : doc
      ));
    }
  };

  const handleProtocoloUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProtocoloPeticionamento(file);
      toast.success('Protocolo de Peticionamento anexado com sucesso!');
    }
  };

  const removerProtocolo = () => {
    setProtocoloPeticionamento(undefined);
  };

  const podeAvancar = !!protocoloPeticionamento && !!nomeArquivoPrincipal;

  return (
    <div className="space-y-6">
      {/* Nome do Arquivo Principal */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nome-arquivo-principal" className="text-base font-semibold">
              Nome do Arquivo Principal *
            </Label>
            <p className="text-sm text-muted-foreground mb-3">
              Descreva o nome principal da documentação para certificação
            </p>
            <Input
              id="nome-arquivo-principal"
              value={nomeArquivoPrincipal}
              onChange={(e) => setNomeArquivoPrincipal(e.target.value)}
              placeholder="Ex: Documentação Certificado BPF - Fornecedor 2024"
              className="text-base"
            />
          </div>
        </div>
      </Card>

      {/* Subtítulos e Arquivos */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold">Documentos Complementares</Label>
              <p className="text-sm text-muted-foreground">
                Adicione subtítulos e anexe arquivos relacionados
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={adicionarSubtitulo}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Subtítulo
            </Button>
          </div>

          {documentos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum documento complementar adicionado</p>
              <p className="text-sm">Clique em "Adicionar Subtítulo" para começar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documentos.map((doc) => (
                <Card key={doc.id} className="p-4 border-2">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label htmlFor={`subtitulo-${doc.id}`} className="text-sm">
                            Subtítulo
                          </Label>
                          <Input
                            id={`subtitulo-${doc.id}`}
                            value={doc.subtitulo}
                            onChange={(e) => atualizarSubtitulo(doc.id, e.target.value)}
                            placeholder="Ex: Manual de Qualidade"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`arquivo-${doc.id}`} className="text-sm">
                            Arquivo Anexo
                          </Label>
                          <div className="mt-1">
                            <Input
                              id={`arquivo-${doc.id}`}
                              type="file"
                              onChange={(e) => handleArquivoSubtitulo(doc.id, e.target.files?.[0] || null)}
                              className="cursor-pointer"
                            />
                          </div>
                          {doc.nomeArquivo && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Arquivo: {doc.nomeArquivo}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removerSubtitulo(doc.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Protocolo de Peticionamento - OBRIGATÓRIO */}
      <Card className="p-6 border-2 border-primary/20 bg-primary/5">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <Label className="text-base font-semibold text-primary">
                Protocolo de Peticionamento na ANVISA *
              </Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Anexo obrigatório para prosseguir para a próxima etapa
              </p>
              
              {!protocoloPeticionamento ? (
                <div>
                  <Input
                    id="protocolo-peticionamento"
                    type="file"
                    onChange={handleProtocoloUpload}
                    className="cursor-pointer"
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              ) : (
                <Card className="p-4 bg-background">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Upload className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">{protocoloPeticionamento.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(protocoloPeticionamento.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={removerProtocolo}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Botão Próxima Etapa */}
      <div className="flex justify-end">
        <Button
          onClick={onProximaEtapa}
          disabled={!podeAvancar}
          size="lg"
        >
          Próxima Etapa: Informações Regulatórias
        </Button>
      </div>

      {!podeAvancar && (
        <p className="text-sm text-muted-foreground text-center">
          Preencha o nome do arquivo principal e anexe o protocolo de peticionamento para continuar
        </p>
      )}
    </div>
  );
};
