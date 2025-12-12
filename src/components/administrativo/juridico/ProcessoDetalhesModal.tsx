import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FileText, Calendar, User, Newspaper, Bell, CheckCircle, XCircle, Download, Eye } from 'lucide-react';
import { ProcessoJuridico, AtualizacaoDOU } from '@/types/juridico';
import { tipoProcessoLabels, statusProcessoLabels } from '@/data/juridicoModules';
import { toast } from '@/components/ui/use-toast';

interface ProcessoDetalhesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  processo: ProcessoJuridico;
  onProcessoUpdated?: (processo: ProcessoJuridico) => void;
}

export const ProcessoDetalhesModal = ({ open, onOpenChange, processo, onProcessoUpdated }: ProcessoDetalhesModalProps) => {
  const [processoLocal, setProcessoLocal] = useState(processo);
  
  const formatCurrency = (value?: number) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const atualizacoesNaoVisualizadas = processoLocal.atualizacoesDOU?.filter(a => !a.visualizada) ?? [];
  const todasAtualizacoes = processoLocal.atualizacoesDOU ?? [];

  const marcarComoVisualizada = (atualizacaoId: string) => {
    const novasAtualizacoes = processoLocal.atualizacoesDOU?.map(a => 
      a.id === atualizacaoId ? { ...a, visualizada: true } : a
    );
    const processoAtualizado = { ...processoLocal, atualizacoesDOU: novasAtualizacoes };
    setProcessoLocal(processoAtualizado);
    onProcessoUpdated?.(processoAtualizado);
  };

  const marcarRelevancia = (atualizacaoId: string, relevante: boolean, observacao?: string) => {
    const novasAtualizacoes = processoLocal.atualizacoesDOU?.map(a => 
      a.id === atualizacaoId 
        ? { ...a, visualizada: true, relevante, observacaoRelevancia: observacao } 
        : a
    );
    const processoAtualizado = { ...processoLocal, atualizacoesDOU: novasAtualizacoes };
    setProcessoLocal(processoAtualizado);
    onProcessoUpdated?.(processoAtualizado);
    
    toast({
      title: relevante ? 'Marcado como relevante' : 'Marcado como não relevante',
      description: 'A atualização foi classificada com sucesso.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Detalhes do Processo
            {atualizacoesNaoVisualizadas.length > 0 && (
              <Badge className="bg-orange-500 text-white animate-pulse">
                <Bell className="h-3 w-3 mr-1" />
                {atualizacoesNaoVisualizadas.length} nova{atualizacoesNaoVisualizadas.length > 1 ? 's' : ''} atualização{atualizacoesNaoVisualizadas.length > 1 ? 'ões' : ''} DOU
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Atualizações do DOU - Seção de Destaque */}
          {todasAtualizacoes.length > 0 && (
            <Card className={atualizacoesNaoVisualizadas.length > 0 ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/20' : ''}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-orange-600" />
                  Atualizações Automáticas do DOU
                  {atualizacoesNaoVisualizadas.length > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {atualizacoesNaoVisualizadas.length} não visualizada{atualizacoesNaoVisualizadas.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                </CardTitle>
                {processo.monitoramentoDOU && (
                  <div className="text-sm text-muted-foreground mt-2 space-y-1">
                    <p><strong>Monitoramento ativo:</strong></p>
                    {processo.monitoramentoDOU.cnpj && <p>CNPJ: {processo.monitoramentoDOU.cnpj}</p>}
                    {processo.monitoramentoDOU.numeroProcesso && <p>Nº Processo: {processo.monitoramentoDOU.numeroProcesso}</p>}
                    {processo.monitoramentoDOU.nomeParte && <p>Nome da Parte: {processo.monitoramentoDOU.nomeParte}</p>}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todasAtualizacoes.map((atualizacao) => (
                    <AtualizacaoDOUCard
                      key={atualizacao.id}
                      atualizacao={atualizacao}
                      onMarcarVisualizada={() => marcarComoVisualizada(atualizacao.id)}
                      onMarcarRelevancia={(relevante, obs) => marcarRelevancia(atualizacao.id, relevante, obs)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Número do Processo</p>
                  <p className="font-mono font-medium">{processo.numeroProcesso}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <Badge variant="outline" className="mt-1">{tipoProcessoLabels[processo.tipo]}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className="mt-1">{statusProcessoLabels[processo.status]}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data de Distribuição</p>
                  <p className="font-medium">{processo.dataDistribuicao}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Parte Contrária</p>
                  <p className="font-medium">{processo.parteContraria}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor da Causa</p>
                  <p className="font-medium">{formatCurrency(processo.valorCausa)}</p>
                </div>
              </div>

              {(processo.vara || processo.comarca || processo.tribunal) && (
                <>
                  <Separator />
                  <div className="grid grid-cols-3 gap-4">
                    {processo.vara && (
                      <div>
                        <p className="text-sm text-muted-foreground">Vara</p>
                        <p className="font-medium">{processo.vara}</p>
                      </div>
                    )}
                    {processo.comarca && (
                      <div>
                        <p className="text-sm text-muted-foreground">Comarca</p>
                        <p className="font-medium">{processo.comarca}</p>
                      </div>
                    )}
                    {processo.tribunal && (
                      <div>
                        <p className="text-sm text-muted-foreground">Tribunal</p>
                        <p className="font-medium">{processo.tribunal}</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Objeto</p>
                <p className="text-sm mt-1">{processo.objeto}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Responsável Interno</p>
                  <p className="font-medium">{processo.responsavelInterno}</p>
                </div>
                {processo.advogadoExterno && (
                  <div>
                    <p className="text-sm text-muted-foreground">Advogado Externo</p>
                    <p className="font-medium">{processo.advogadoExterno}</p>
                  </div>
                )}
              </div>

              {processo.observacoes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground">Observações</p>
                    <p className="text-sm mt-1">{processo.observacoes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Timeline de Andamentos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Andamentos do Processo</CardTitle>
            </CardHeader>
            <CardContent>
              {processo.andamentos.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum andamento registrado
                </p>
              ) : (
                <div className="space-y-4">
                  {processo.andamentos.map((andamento, index) => (
                    <div key={andamento.id} className="relative pl-8 pb-4">
                      {/* Linha vertical */}
                      {index !== processo.andamentos.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
                      )}
                      
                      {/* Ponto */}
                      <div className="absolute left-2 top-1 h-3 w-3 rounded-full bg-primary" />

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{andamento.data}</span>
                          <span>•</span>
                          <User className="h-4 w-4" />
                          <span>{andamento.responsavel}</span>
                        </div>

                        <p className="text-sm">{andamento.descricao}</p>

                        {andamento.documentosAnexados && andamento.documentosAnexados.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {andamento.documentosAnexados.map((doc) => (
                              <Badge key={doc.id} variant="secondary" className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {doc.nome}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documentos do Processo</CardTitle>
            </CardHeader>
            <CardContent>
              {processo.documentos.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum documento anexado
                </p>
              ) : (
                <div className="space-y-2">
                  {processo.documentos.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.nome}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.tipo} • {doc.tamanho} • Enviado em {doc.dataUpload}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Componente para cada atualização do DOU
interface AtualizacaoDOUCardProps {
  atualizacao: AtualizacaoDOU;
  onMarcarVisualizada: () => void;
  onMarcarRelevancia: (relevante: boolean, observacao?: string) => void;
}

const AtualizacaoDOUCard = ({ atualizacao, onMarcarVisualizada, onMarcarRelevancia }: AtualizacaoDOUCardProps) => {
  const [observacao, setObservacao] = useState(atualizacao.observacaoRelevancia || '');
  const [showObservacao, setShowObservacao] = useState(false);

  return (
    <div 
      className={`p-4 border rounded-lg ${
        !atualizacao.visualizada 
          ? 'border-orange-500 bg-orange-100/50 dark:bg-orange-900/30' 
          : atualizacao.relevante === true
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
            : atualizacao.relevante === false
              ? 'border-gray-300 bg-gray-50 dark:bg-gray-800/50'
              : 'border-border'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              {atualizacao.secaoDOU}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Publicado: {atualizacao.dataPublicacao}
            </span>
            <span className="text-xs text-muted-foreground">
              • Capturado: {atualizacao.dataCaptura}
            </span>
            {!atualizacao.visualizada && (
              <Badge className="bg-orange-500 text-white text-xs">
                <Bell className="h-3 w-3 mr-1" />
                Nova
              </Badge>
            )}
            {atualizacao.relevante === true && (
              <Badge className="bg-green-500 text-white text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Relevante
              </Badge>
            )}
            {atualizacao.relevante === false && (
              <Badge variant="secondary" className="text-xs">
                <XCircle className="h-3 w-3 mr-1" />
                Não relevante
              </Badge>
            )}
          </div>

          <p className="text-sm leading-relaxed">{atualizacao.conteudo}</p>

          {atualizacao.arquivoPDF && (
            <div className="flex items-center gap-2 mt-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                {atualizacao.arquivoPDF.nome}
              </Button>
              <span className="text-xs text-muted-foreground">{atualizacao.arquivoPDF.tamanho}</span>
            </div>
          )}

          {atualizacao.observacaoRelevancia && (
            <div className="mt-2 p-2 bg-muted rounded text-sm">
              <strong>Observação:</strong> {atualizacao.observacaoRelevancia}
            </div>
          )}

          {showObservacao && (
            <div className="mt-2 space-y-2">
              <Label className="text-xs">Observação sobre relevância</Label>
              <Textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                placeholder="Descreva por que esta atualização é ou não relevante..."
                rows={2}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {!atualizacao.visualizada && (
            <Button size="sm" variant="outline" onClick={onMarcarVisualizada}>
              <Eye className="h-4 w-4 mr-1" />
              Marcar lida
            </Button>
          )}
          
          {atualizacao.relevante === undefined && (
            <>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-green-600 border-green-600 hover:bg-green-50"
                onClick={() => {
                  if (!showObservacao) {
                    setShowObservacao(true);
                  } else {
                    onMarcarRelevancia(true, observacao);
                    setShowObservacao(false);
                  }
                }}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Relevante
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-gray-600"
                onClick={() => {
                  if (!showObservacao) {
                    setShowObservacao(true);
                  } else {
                    onMarcarRelevancia(false, observacao);
                    setShowObservacao(false);
                  }
                }}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Não relevante
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
