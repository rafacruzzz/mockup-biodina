import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  User, 
  Calendar, 
  DollarSign,
  Building,
  Building2,
  ShoppingCart,
  History,
  Download,
  RefreshCw,
  Shield,
  ExternalLink
} from 'lucide-react';
import { PedidoFinanceiro } from '@/types/financeiro';
import AlteracaoCNPJModal from '@/components/comercial/AlteracaoCNPJModal';

interface DetalhesContratoModalProps {
  pedido: PedidoFinanceiro | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DetalhesContratoModal({ pedido, isOpen, onClose }: DetalhesContratoModalProps) {
  const [showAlteracaoCNPJModal, setShowAlteracaoCNPJModal] = useState(false);

  if (!pedido) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusInfo = (status: string) => {
    const statusMap = {
      'pendente_aprovacao': { color: 'bg-yellow-500', icon: Clock, label: 'Pendente Aprovação', variant: 'secondary' as const },
      'aprovado': { color: 'bg-green-500', icon: CheckCircle, label: 'Aprovado', variant: 'default' as const },
      'em_pagamento': { color: 'bg-blue-500', icon: Clock, label: 'Em Pagamento', variant: 'secondary' as const },
      'pago': { color: 'bg-gray-500', icon: CheckCircle, label: 'Pago', variant: 'outline' as const },
      'atrasado': { color: 'bg-red-500', icon: AlertTriangle, label: 'Atrasado', variant: 'destructive' as const }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pendente_aprovacao;
  };

  const getOrigemLabel = (origem: string) => {
    const origemMap = {
      'licitacao': 'Licitação',
      'contratacao_direta': 'Contratação Direta',
      'importacao_direta': 'Importação Direta'
    };
    return origemMap[origem as keyof typeof origemMap] || origem;
  };

  const getPrioridadeColor = (prioridade: string) => {
    const prioridadeMap = {
      'baixa': 'bg-gray-100 text-gray-800',
      'media': 'bg-blue-100 text-blue-800',
      'alta': 'bg-orange-100 text-orange-800',
      'urgente': 'bg-red-100 text-red-800'
    };
    return prioridadeMap[prioridade as keyof typeof prioridadeMap] || prioridadeMap.media;
  };

  const handleAlteracaoCNPJConfirmar = (aditivo: any) => {
    console.log('Aditivo de alteração de CNPJ registrado:', aditivo);
    setShowAlteracaoCNPJModal(false);
    // Em produção: salvar no backend e atualizar o estado
  };

  // Verifica se o contrato está vigente (aprovado ou em_pagamento)
  const contratoVigente = pedido.status === 'aprovado' || pedido.status === 'em_pagamento';
  
  // Verifica se tem dados jurídicos
  const temDadosJuridicos = pedido.empresaContratanteId || pedido.empresaContratanteNome;

  const statusInfo = getStatusInfo(pedido.status);
  const StatusIcon = statusInfo.icon;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Detalhes do Pedido {pedido.numeroPedido}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-120px)]">
            <div className="space-y-6">
              {/* Informações Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Informações do Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Cliente</p>
                      <p className="font-medium">{pedido.cliente}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vendedor Responsável</p>
                      <p className="font-medium">{pedido.vendedor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Origem</p>
                      <Badge variant="outline">{getOrigemLabel(pedido.origem)}</Badge>
                    </div>
                    {pedido.numeroLicitacao && (
                      <div>
                        <p className="text-sm text-muted-foreground">Número da Licitação</p>
                        <p className="font-medium">{pedido.numeroLicitacao}</p>
                      </div>
                    )}
                    {pedido.numeroOportunidade && (
                      <div>
                        <p className="text-sm text-muted-foreground">Oportunidade</p>
                        <p className="font-medium">{pedido.numeroOportunidade}</p>
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
                      <p className="text-sm text-muted-foreground">Valor Total</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(pedido.valor)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data da Venda</p>
                      <p className="font-medium">{new Date(pedido.dataVenda).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Previsão de Pagamento</p>
                      <p className="font-medium">{new Date(pedido.dataPrevistaPagamento).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Status:</p>
                      <Badge variant={statusInfo.variant} className="flex items-center gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prioridade</p>
                      <Badge className={getPrioridadeColor(pedido.prioridade)}>
                        {pedido.prioridade.charAt(0).toUpperCase() + pedido.prioridade.slice(1)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Dados Jurídicos - Nova Seção */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Dados Jurídicos do Contrato
                    {pedido.aditivos && pedido.aditivos.length > 0 && (
                      <Badge variant="outline" className="ml-2 bg-orange-50 text-orange-700 border-orange-200">
                        CNPJ Alterado
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {temDadosJuridicos ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Empresa Contratante</p>
                          <p className="font-semibold">{pedido.empresaContratanteNome || 'Não informado'}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            CNPJ: {pedido.empresaContratanteCNPJ || 'Não informado'}
                          </p>
                        </div>
                        
                        {pedido.origemLicitacao && (
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Origem da Aprovação</p>
                            <p className="font-semibold">Licitação {pedido.origemLicitacao.numeroPregao}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Shield className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-muted-foreground">
                                Aprovado por {pedido.origemLicitacao.aprovadoPor || 'Sistema'} em{' '}
                                {pedido.origemLicitacao.dataAprovacao 
                                  ? new Date(pedido.origemLicitacao.dataAprovacao).toLocaleDateString('pt-BR')
                                  : 'data não disponível'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Histórico de Aditivos */}
                      {pedido.aditivos && pedido.aditivos.length > 0 && (
                        <div className="mt-4">
                          <Separator className="my-4" />
                          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Histórico de Aditivos ({pedido.aditivos.length})
                          </h4>
                          <div className="space-y-3">
                            {pedido.aditivos.map((aditivo, index) => (
                              <div 
                                key={aditivo.id || index} 
                                className="p-3 border rounded-lg bg-orange-50/50 border-orange-200"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium text-sm">
                                      {aditivo.tipo === 'alteracao_cnpj' ? 'Alteração de CNPJ' : 
                                       aditivo.tipo === 'aditivo_valor' ? 'Aditivo de Valor' :
                                       aditivo.tipo === 'aditivo_prazo' ? 'Aditivo de Prazo' : 'Outros'}
                                    </p>
                                    {aditivo.tipo === 'alteracao_cnpj' && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {aditivo.empresaAnteriorNome} → {aditivo.empresaNovoNome}
                                      </p>
                                    )}
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {aditivo.justificativa}
                                    </p>
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-7">
                                    <Download className="h-3 w-3 mr-1" />
                                    Documento
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Validado por {aditivo.validadoPor} em{' '}
                                  {new Date(aditivo.validadoEm).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Botão Alterar CNPJ */}
                      {contratoVigente && (
                        <div className="mt-4 pt-4 border-t">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowAlteracaoCNPJModal(true)}
                            className="gap-2"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Alterar CNPJ do Contrato
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            Requer validação com senha master e upload de aditivo contratual
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Building2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>Dados jurídicos não disponíveis</p>
                      <p className="text-xs mt-1">
                        Este contrato não possui empresa contratante vinculada
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Descrição */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Descrição do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{pedido.descricao}</p>
                  {pedido.observacoes && (
                    <>
                      <Separator className="my-3" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Observações:</p>
                        <p className="text-sm leading-relaxed text-orange-700 bg-orange-50 p-3 rounded-md">
                          {pedido.observacoes}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Documentos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Documentos ({pedido.documentos.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pedido.documentos.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{doc}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Histórico */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Histórico de Atividades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pedido.historico.map((item, index) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          {index < pedido.historico.length - 1 && (
                            <div className="w-px h-12 bg-gray-200 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">{item.acao}</p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.data).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          {item.observacao && (
                            <p className="text-sm text-muted-foreground">{item.observacao}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">por {item.usuario}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>

          {/* Ações */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              {pedido.status === 'pendente_aprovacao' && (
                <>
                  <Button variant="default" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                  <Button variant="outline" size="sm">
                    Solicitar Ajustes
                  </Button>
                </>
              )}
              {pedido.status === 'aprovado' && (
                <Button variant="default" size="sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Processar Pagamento
                </Button>
              )}
            </div>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Alteração de CNPJ */}
      <AlteracaoCNPJModal
        isOpen={showAlteracaoCNPJModal}
        onClose={() => setShowAlteracaoCNPJModal(false)}
        contratoData={{
          id: pedido.id,
          numero: pedido.numeroPedido,
          empresaAtualNome: pedido.empresaContratanteNome || 'Não informado',
          empresaAtualCNPJ: pedido.empresaContratanteCNPJ || 'Não informado'
        }}
        onConfirmar={handleAlteracaoCNPJConfirmar}
      />
    </>
  );
}
