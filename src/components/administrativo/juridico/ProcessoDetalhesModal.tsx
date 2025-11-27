import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Calendar, User } from 'lucide-react';
import { ProcessoJuridico } from '@/types/juridico';
import { tipoProcessoLabels, statusProcessoLabels } from '@/data/juridicoModules';

interface ProcessoDetalhesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  processo: ProcessoJuridico;
}

export const ProcessoDetalhesModal = ({ open, onOpenChange, processo }: ProcessoDetalhesModalProps) => {
  const formatCurrency = (value?: number) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Processo</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
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
