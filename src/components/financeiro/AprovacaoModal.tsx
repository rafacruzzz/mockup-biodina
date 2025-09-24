import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, X, FileText, User, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import { RequisicaoPagamento, StatusRequisicao, TipoRequisicao } from '@/types/financeiro';

interface AprovacaoModalProps {
  open: boolean;
  onClose: () => void;
  requisicao: RequisicaoPagamento | null;
  onApprove: (requisicaoId: string, aprovada: boolean, comentarios?: string) => void;
}

export const AprovacaoModal: React.FC<AprovacaoModalProps> = ({ 
  open, 
  onClose, 
  requisicao, 
  onApprove 
}) => {
  const [comentarios, setComentarios] = useState('');
  const [showRejeicao, setShowRejeicao] = useState(false);

  if (!requisicao) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTipoAprovacao = () => {
    if (requisicao.status === StatusRequisicao.AGUARDANDO_GESTOR) {
      return 'Aprovação de Gestor';
    }
    if (requisicao.status === StatusRequisicao.AGUARDANDO_FINANCEIRO) {
      return 'Aprovação Financeira';
    }
    return 'Aprovação';
  };

  const handleAprovar = () => {
    onApprove(requisicao.id, true, comentarios);
    setComentarios('');
    setShowRejeicao(false);
  };

  const handleRejeitar = () => {
    if (!comentarios.trim()) {
      alert('Comentários são obrigatórios para rejeição');
      return;
    }
    onApprove(requisicao.id, false, comentarios);
    setComentarios('');
    setShowRejeicao(false);
  };

  const documentosObrigatorios = requisicao.documentos.filter(d => d.obrigatorio);
  const documentosOpcianis = requisicao.documentos.filter(d => !d.obrigatorio);
  const documentosIncompletos = documentosObrigatorios.filter(d => !d.arquivo);

  const isVencida = requisicao.vencimento < new Date();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {getTipoAprovacao()} - #{requisicao.id.slice(-6)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status e Alertas */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              {requisicao.tipo.replace('_', ' ')}
            </Badge>
            <Badge variant={isVencida ? 'destructive' : 'default'}>
              {isVencida ? 'Vencida' : 'No prazo'}
            </Badge>
            {documentosIncompletos.length > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Documentação Incompleta
              </Badge>
            )}
          </div>

          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Informações da Requisição
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Solicitante</Label>
                  <p className="font-medium">{requisicao.solicitante}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Descrição</Label>
                  <p>{requisicao.descricao}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Vinculação</Label>
                  <p>
                    {requisicao.tipoVinculacao === 'projeto_cliente' ? 'Projeto/Cliente' : 'Departamento'}: 
                    {requisicao.projetoClienteId || requisicao.departamentoId}
                  </p>
                </div>
                
                {requisicao.justificativa && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Justificativa</Label>
                    <p>{requisicao.justificativa}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Informações Financeiras
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Valor Solicitado</Label>
                  <p className="text-2xl font-bold">{formatCurrency(requisicao.valor)}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Data de Vencimento</Label>
                  <p className={isVencida ? 'text-red-600 font-medium' : ''}>
                    {requisicao.vencimento.toLocaleDateString('pt-BR')}
                  </p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Data da Requisição</Label>
                  <p>{requisicao.dataRequisicao.toLocaleDateString('pt-BR')}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detalhes específicos por tipo */}
          {requisicao.tipo === TipoRequisicao.SUPRIMENTOS && requisicao.cotacoes && (
            <Card>
              <CardHeader>
                <CardTitle>Cotações ({requisicao.cotacoes.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requisicao.cotacoes.map((cotacao, index) => (
                    <div key={cotacao.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{cotacao.fornecedor}</p>
                          <p className="text-lg font-bold text-primary">{formatCurrency(cotacao.valor)}</p>
                          <p className="text-sm text-muted-foreground">Prazo: {cotacao.prazo}</p>
                          {cotacao.observacoes && (
                            <p className="text-sm mt-1">{cotacao.observacoes}</p>
                          )}
                        </div>
                        <Badge variant={index === 0 ? 'default' : 'secondary'}>
                          {index === 0 ? 'Menor Preço' : `Cotação ${index + 1}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {[TipoRequisicao.PASSAGENS, TipoRequisicao.HOSPEDAGEM].includes(requisicao.tipo) && (
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Viagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Destino</Label>
                  <p>{requisicao.destino}</p>
                </div>
                {requisicao.periodo && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Período</Label>
                    <p>
                      {requisicao.periodo.inicio.toLocaleDateString('pt-BR')} a {requisicao.periodo.fim.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Documentos</span>
                {documentosIncompletos.length > 0 && (
                  <Badge variant="destructive">
                    {documentosIncompletos.length} obrigatório(s) faltando
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label className="font-medium">Documentos Obrigatórios</Label>
                  <div className="space-y-2 mt-2">
                    {documentosObrigatorios.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                        <span>{doc.nome}</span>
                        <div className="flex items-center gap-2">
                          {doc.arquivo ? (
                            <Badge variant="default" className="flex items-center gap-1 bg-green-100 text-green-800">
                              <Check className="h-3 w-3" />
                              Anexado
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <X className="h-3 w-3" />
                              Faltando
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {documentosOpcianis.length > 0 && (
                  <div>
                    <Label className="font-medium">Documentos Opcionais</Label>
                    <div className="space-y-2 mt-2">
                      {documentosOpcianis.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                          <span>{doc.nome}</span>
                          <div className="flex items-center gap-2">
                            {doc.arquivo ? (
                              <Badge variant="default" className="flex items-center gap-1 bg-green-100 text-green-800">
                                <Check className="h-3 w-3" />
                                Anexado
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Não anexado
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Aprovações */}
          {(requisicao.dataAprovacaoGestor || requisicao.dataAprovacaoFinanceiro) && (
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Aprovações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {requisicao.dataAprovacaoGestor && (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Aprovado pelo gestor em {requisicao.dataAprovacaoGestor.toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                  {requisicao.dataAprovacaoFinanceiro && (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Aprovado pelo financeiro em {requisicao.dataAprovacaoFinanceiro.toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Área de Comentários */}
          <div>
            <Label htmlFor="comentarios">Comentários {showRejeicao && <span className="text-red-600">*</span>}</Label>
            <Textarea
              id="comentarios"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder={showRejeicao ? "Motivo da rejeição (obrigatório)" : "Comentários sobre a aprovação (opcional)"}
              rows={3}
            />
          </div>

          {/* Alertas para problemas */}
          {(documentosIncompletos.length > 0 || isVencida) && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Atenção</p>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      {documentosIncompletos.length > 0 && (
                        <li>• Existem {documentosIncompletos.length} documento(s) obrigatório(s) em falta</li>
                      )}
                      {isVencida && (
                        <li>• Esta requisição está vencida</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ações */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() => setShowRejeicao(true)}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Rejeitar
              </Button>
              
              <Button
                onClick={handleAprovar}
                className="flex items-center gap-2"
                disabled={documentosIncompletos.length > 0}
              >
                <Check className="h-4 w-4" />
                Aprovar
              </Button>
            </div>
          </div>

          {/* Modal de Confirmação de Rejeição */}
          {showRejeicao && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <p className="font-medium text-red-800">Confirmar Rejeição</p>
                  </div>
                  <p className="text-red-700">
                    Tem certeza que deseja rejeitar esta requisição? Esta ação não pode ser desfeita.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowRejeicao(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleRejeitar}
                      disabled={!comentarios.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};