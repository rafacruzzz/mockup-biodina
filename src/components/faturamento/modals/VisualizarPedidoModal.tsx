import React from "react";
import { ChecklistVenda } from "@/types/faturamento";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Package,
  Truck,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  FileDown,
  ExternalLink,
  AlertTriangle,
  DollarSign,
  Calendar,
} from "lucide-react";

interface VisualizarPedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  pedido: ChecklistVenda;
}

const VisualizarPedidoModal = ({ isOpen, onClose, pedido }: VisualizarPedidoModalProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Faturado':
        return 'bg-blue-600 text-white';
      case 'Liberado':
        return 'bg-green-600 text-white';
      case 'Validando':
        return 'bg-orange-500 text-white';
      case 'Aguardando':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusEntregaLabel = (status: string) => {
    const labels: Record<string, string> = {
      'aguardando_coleta': 'Aguardando Coleta',
      'em_transito': 'Em Trânsito',
      'em_rota_entrega': 'Em Rota de Entrega',
      'entregue': 'Entregue',
      'devolvido': 'Devolvido'
    };
    return labels[status] || status;
  };

  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case 'emissao_nf':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'atualizacao_entrega':
        return <Truck className="h-5 w-5 text-green-600" />;
      case 'mudanca_status':
        return <CheckCircle className="h-5 w-5 text-purple-600" />;
      case 'divergencia':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'atraso':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'urgente':
        return 'bg-red-600 text-white';
      case 'alta':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText className="h-6 w-6" />
            Resumo do Pedido #{pedido.numeroPedido}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="geral">Informações Gerais</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="nf">Informações NF</TabsTrigger>
            <TabsTrigger value="frete">Frete</TabsTrigger>
            <TabsTrigger value="acompanhamento">Acompanhamento</TabsTrigger>
          </TabsList>

          {/* ABA 1: INFORMAÇÕES GERAIS */}
          <TabsContent value="geral" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dados do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Natureza da Operação</label>
                  <p className="text-base font-medium">{pedido.naturezaOperacao || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Descritivo da Operação</label>
                  <p className="text-base font-medium">{pedido.descritivoOperacao || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cliente</label>
                  <p className="text-base font-medium">{pedido.cliente}</p>
                  <p className="text-sm text-muted-foreground">{pedido.cnpjCliente}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Vendedor</label>
                  <p className="text-base font-medium">{pedido.vendedor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Emissão do Pedido</label>
                  <p className="text-base font-medium">{formatDate(pedido.dataEmissaoPedido)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Faturamento</label>
                  <p className="text-base font-medium">
                    {pedido.dataFaturamento ? (
                      <span className="text-green-600">{formatDate(pedido.dataFaturamento)}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(pedido.status)}>
                      {pedido.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Valor Total</label>
                  <p className="text-xl font-bold text-primary">{formatCurrency(pedido.valorTotal)}</p>
                </div>
              </CardContent>
            </Card>

            {pedido.observacoes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Observações Gerais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{pedido.observacoes}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Validações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-lg border-2 ${pedido.estoqueValidado ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      {pedido.estoqueValidado ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-500" />
                      )}
                      <span className="text-sm font-medium">Estoque</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pedido.estoqueValidado ? 'Validado' : 'Pendente'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border-2 ${pedido.servicosConcluidos ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      {pedido.servicosConcluidos ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-500" />
                      )}
                      <span className="text-sm font-medium">Serviços</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pedido.servicosConcluidos ? 'Concluídos' : 'Pendentes'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border-2 ${pedido.documentacaoCompleta ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      {pedido.documentacaoCompleta ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-500" />
                      )}
                      <span className="text-sm font-medium">Documentação</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pedido.documentacaoCompleta ? 'Completa' : 'Pendente'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border-2 ${pedido.creditoAprovado ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      {pedido.creditoAprovado ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-500" />
                      )}
                      <span className="text-sm font-medium">Crédito</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pedido.creditoAprovado ? 'Aprovado' : 'Pendente'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABA 2: PRODUTOS */}
          <TabsContent value="produtos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Produtos do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pedido.produtos && pedido.produtos.length > 0 ? (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Produto</TableHead>
                            <TableHead>Un.</TableHead>
                            <TableHead>Estoque Disponível</TableHead>
                            <TableHead>Val. Mín. Exigida</TableHead>
                            <TableHead className="text-right">Qtd.</TableHead>
                            <TableHead className="text-right">Preço Unit.</TableHead>
                            <TableHead className="text-right">Desc. %</TableHead>
                            <TableHead className="text-right">Preço Final</TableHead>
                            <TableHead>Descr. NF</TableHead>
                            <TableHead>Obs.</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pedido.produtos.map((produto) => (
                            <TableRow key={produto.id}>
                              <TableCell className="font-medium">{produto.codigo}</TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <p className="font-medium">{produto.descricao}</p>
                                  <div className="flex gap-1 flex-wrap">
                                    {produto.estoqueDisponivel?.alertas?.map((alerta, idx) => (
                                      <Badge 
                                        key={idx} 
                                        variant="outline" 
                                        className={
                                          alerta.tipo === 'validade_proxima' 
                                            ? 'text-amber-600 border-amber-300 bg-amber-50 text-xs' 
                                            : 'text-blue-600 border-blue-300 bg-blue-50 text-xs'
                                        }
                                      >
                                        {alerta.tipo === 'validade_proxima' ? 'Validade' : 'Multi-lotes'}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="text-xs">{produto.unidade}</Badge>
                              </TableCell>
                              <TableCell>
                                {produto.estoqueDisponivel ? (
                                  <div className="space-y-0.5">
                                    <span className="text-green-600 font-medium text-sm">
                                      {produto.estoqueDisponivel.totalDisponivel} un
                                    </span>
                                    <p className="text-xs text-muted-foreground">
                                      Reservado: {produto.estoqueDisponivel.totalReservado}
                                    </p>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {produto.validadeMinima ? (
                                  new Date(produto.validadeMinima).toLocaleDateString('pt-BR')
                                ) : (
                                  <span className="text-muted-foreground">dd/mm/aaaa</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">{produto.quantidade}</TableCell>
                              <TableCell className="text-right">{formatCurrency(produto.precoUnitario)}</TableCell>
                              <TableCell className="text-right">{produto.desconto}%</TableCell>
                              <TableCell className="text-right font-medium text-green-600">
                                {formatCurrency(produto.precoFinal)}
                              </TableCell>
                              <TableCell className="max-w-[150px]">
                                <p className="text-sm truncate" title={produto.descritivoNF || '-'}>
                                  {produto.descritivoNF || '-'}
                                </p>
                              </TableCell>
                              <TableCell className="max-w-[120px]">
                                <p className="text-sm truncate" title={produto.observacoes || '-'}>
                                  {produto.observacoes || '-'}
                                </p>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <div className="w-80 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span className="font-medium">
                            {formatCurrency(pedido.produtos.reduce((sum, p) => sum + p.subtotal, 0))}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Desconto Total:</span>
                          <span className="font-medium text-red-600">
                            {formatCurrency(pedido.produtos.reduce((sum, p) => sum + (p.precoUnitario * p.quantidade * p.desconto / 100), 0))}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t pt-2">
                          <span>Valor Total:</span>
                          <span className="text-primary">{formatCurrency(pedido.valorTotal)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-muted-foreground py-8">Nenhum produto cadastrado</p>
                )}
              </CardContent>
            </Card>

            {pedido.itensUsoConsumo && pedido.itensUsoConsumo.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Itens de Uso e Consumo</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pedido.itensUsoConsumo.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.codigo}</TableCell>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.categoria}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{item.quantidade}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ABA 3: INFORMAÇÕES NF */}
          <TabsContent value="nf" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configurações de Emissão</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Deve Emitir NF?</label>
                  <p className="text-base font-medium">{pedido.deveEmitirNF ? 'Sim' : 'Não'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Natureza da Operação</label>
                  <p className="text-base">{pedido.naturezaOperacao || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Descritivo da Operação</label>
                  <p className="text-base">{pedido.descritivoOperacao || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Finalidade da NF</label>
                  <p className="text-base">{pedido.finalidadeNF || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Emails para NF</label>
                  <p className="text-sm">{pedido.emailsNF || '-'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Seção Separada: Configurações Fiscais (IR) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Configurações Fiscais
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Destacar IR?</label>
                  <p className="text-base font-medium">{pedido.destacarIR ? 'Sim' : 'Não'}</p>
                </div>
                {pedido.destacarIR && pedido.percentualIR && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Percentual IR</label>
                    <p className="text-base">{pedido.percentualIR}%</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {pedido.destinatario && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Dados do Destinatário
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Razão Social</label>
                    <p className="text-base font-medium">{pedido.destinatario.razaoSocial}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">CNPJ/CPF</label>
                    <p className="text-base">{pedido.destinatario.cnpjCpf}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">IE/RG</label>
                    <p className="text-base">{pedido.destinatario.ieRg || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                    <p className="text-base">{pedido.destinatario.telefone}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Endereço</label>
                    <p className="text-base">{pedido.destinatario.endereco}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-base">{pedido.destinatario.email}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Informações de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Forma de Pagamento</label>
                  <p className="text-base">{pedido.formaPagamento || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Condições de Pagamento</label>
                  <p className="text-base">{pedido.condicoesPagamento || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Conta Bancária de Recebimento</label>
                  <p className="text-base">{pedido.contaBancariaRecebimento || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Número de Parcelas</label>
                  <p className="text-base">{pedido.numeroParcelas || '-'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Condições (Parcelas, Vencimentos)</label>
                  <p className="text-base">{pedido.condicoesPagamentoFaturamento || '-'}</p>
                </div>
                {pedido.instrucoesBoleto && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Instruções para Boleto</label>
                    <p className="text-sm text-muted-foreground">{pedido.instrucoesBoleto}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {pedido.informacoesComplementares && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações Complementares</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{pedido.informacoesComplementares}</p>
                </CardContent>
              </Card>
            )}

            {pedido.documentosNF && pedido.documentosNF.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documentos Anexados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {pedido.documentosNF.map((doc, index) => (
                      <Badge key={index} variant="outline" className="text-sm py-2 px-3">
                        <FileText className="h-4 w-4 mr-2" />
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ABA 4: FRETE */}
          <TabsContent value="frete" className="space-y-4">
            {/* Seção 1: Informações Básicas de Frete */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Informações Básicas de Frete
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tipo de Frete</label>
                  <p className="text-base font-medium">{pedido.tipoFrete || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Prazo Máximo de Entrega</label>
                  <p className="text-base">{pedido.prazoEntrega || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Entrega (Agendada)</label>
                  <p className="text-base">{pedido.dataEntrega ? formatDate(pedido.dataEntrega) : '-'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Seção 2: Responsabilidades */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Responsabilidades</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Frete a Pagar Por</label>
                  <p className="text-base">{pedido.fretePagarPor || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Frete a Retirar Por</label>
                  <p className="text-base">{pedido.freteRetirarPor || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Entregar/Retirar aos Cuidados de Quem</label>
                  <p className="text-base">{pedido.entregarRetirarCuidados || '-'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Seção 3: Dados do Recebedor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dados do Recebedor
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                  <p className="text-base font-medium">{pedido.nomeCompletoRecebedor || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">CPF</label>
                  <p className="text-base">{pedido.cpfRecebedor || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                  <p className="text-base flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {pedido.telefoneRecebedor || '-'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-base flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {pedido.emailRecebedor || '-'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Seção 4: Detalhes da Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Detalhes da Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Horários Permitidos</label>
                  <p className="text-base">{pedido.horariosPermitidos || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Locais de Entrega</label>
                  <p className="text-base">{pedido.locaisEntrega || '-'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Endereço de Entrega</label>
                  <p className="text-base">{pedido.enderecoEntrega || '-'}</p>
                </div>
                {pedido.maisInformacoesEntrega && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Mais Informações</label>
                    <p className="text-sm text-muted-foreground">{pedido.maisInformacoesEntrega}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Seção 5: Urgência e Autorização */}
            {pedido.solicitarUrgencia && (
              <Card className="border-orange-500 bg-orange-50 dark:bg-orange-950/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-orange-700 dark:text-orange-400">
                    <AlertCircle className="h-5 w-5" />
                    Urgência e Autorização
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-orange-700 dark:text-orange-400">Status da Solicitação</label>
                    <div className="mt-1">
                      <Badge className={
                        pedido.urgenciaStatus === 'aprovada' ? 'bg-green-600 text-white' :
                        pedido.urgenciaStatus === 'rejeitada' ? 'bg-red-600 text-white' :
                        'bg-orange-600 text-white'
                      }>
                        {pedido.urgenciaStatus === 'aprovada' ? 'Aprovada' :
                         pedido.urgenciaStatus === 'rejeitada' ? 'Rejeitada' :
                         'Pendente'}
                      </Badge>
                    </div>
                  </div>
                  {pedido.justificativaUrgencia && (
                    <div>
                      <label className="text-sm font-medium text-orange-700 dark:text-orange-400">Justificativa da Urgência</label>
                      <p className="text-sm text-orange-900 dark:text-orange-300 mt-1">{pedido.justificativaUrgencia}</p>
                    </div>
                  )}
                  {pedido.autorizadoPor && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-orange-700 dark:text-orange-400">Autorizado Por</label>
                        <p className="text-sm text-orange-900 dark:text-orange-300">{pedido.autorizadoPor}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-orange-700 dark:text-orange-400">Data de Autorização</label>
                        <p className="text-sm text-orange-900 dark:text-orange-300">
                          {pedido.dataAutorizacao ? formatDate(pedido.dataAutorizacao) : '-'}
                        </p>
                      </div>
                      {pedido.emailAutorizador && (
                        <div className="col-span-2">
                          <label className="text-sm font-medium text-orange-700 dark:text-orange-400">Email do Autorizador</label>
                          <p className="text-sm text-orange-900 dark:text-orange-300">{pedido.emailAutorizador}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ABA 5: ACOMPANHAMENTO DO PEDIDO */}
          <TabsContent value="acompanhamento" className="space-y-4">
            {/* Timeline de Status / Progresso do Pedido */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Progresso do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge className={`${getStatusColor(pedido.status)} text-lg py-2 px-4`}>
                    {pedido.status}
                  </Badge>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Última atualização: {pedido.dataFaturamento ? formatDate(pedido.dataFaturamento) : formatDate(pedido.dataEmissaoPedido)}
                    </p>
                  </div>
                </div>
                
                {/* Timeline de eventos (se disponível) */}
                {pedido.timeline && pedido.timeline.length > 0 && (
                  <div className="space-y-3 mt-4 pt-4 border-t">
                    <h4 className="text-sm font-semibold">Histórico de Eventos</h4>
                    <div className="space-y-3">
                      {pedido.timeline.map((evento: any, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary text-primary-foreground">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">{evento.status}</p>
                              <p className="text-xs text-muted-foreground">
                                {evento.data} às {evento.hora}
                              </p>
                            </div>
                            {evento.responsavel && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <User className="h-3 w-3" />
                                {evento.responsavel}
                              </p>
                            )}
                            {evento.observacoes && (
                              <p className="text-xs text-muted-foreground mt-1">{evento.observacoes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Confirmação de Recebimento Interno (Estoque/Expedição) */}
            {pedido.recebimentoEstoque && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Confirmação de Recebimento Interno (Estoque/Expedição)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status Atual:</span>
                    <Badge variant={pedido.recebimentoEstoque.status === 'pronto_faturamento' ? 'default' : 'secondary'}>
                      {pedido.recebimentoEstoque.status === 'recebido' && 'Recebido'}
                      {pedido.recebimentoEstoque.status === 'em_separacao' && 'Em Separação'}
                      {pedido.recebimentoEstoque.status === 'pronto_faturamento' && 'Pronto para Faturamento'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Data/Hora Recebimento</p>
                        <p className="text-sm font-medium">
                          {pedido.recebimentoEstoque.dataRecebimento} às {pedido.recebimentoEstoque.horaRecebimento}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Responsável</p>
                        <p className="text-sm font-medium">{pedido.recebimentoEstoque.responsavel}</p>
                      </div>
                    </div>
                    {(pedido.recebimentoEstoque.numeroLote || pedido.recebimentoEstoque.numeroSerie) && (
                      <div>
                        <p className="text-xs text-muted-foreground">Lote/Número de Série</p>
                        <p className="text-sm font-medium">
                          {pedido.recebimentoEstoque.numeroLote && `Lote: ${pedido.recebimentoEstoque.numeroLote}`}
                          {pedido.recebimentoEstoque.numeroLote && pedido.recebimentoEstoque.numeroSerie && ' | '}
                          {pedido.recebimentoEstoque.numeroSerie && `Nº Série: ${pedido.recebimentoEstoque.numeroSerie}`}
                        </p>
                      </div>
                    )}
                    {pedido.recebimentoEstoque.referenciaInterna && (
                      <div>
                        <p className="text-xs text-muted-foreground">Referência Interna</p>
                        <p className="text-sm font-medium">{pedido.recebimentoEstoque.referenciaInterna}</p>
                      </div>
                    )}
                  </div>

                  {/* Tabela de Itens Conferidos */}
                  {pedido.recebimentoEstoque.itensConferidos && pedido.recebimentoEstoque.itensConferidos.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Itens Conferidos</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead className="text-right">Solicitado</TableHead>
                            <TableHead className="text-right">Conferido</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pedido.recebimentoEstoque.itensConferidos.map((item: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.codigoProduto}</TableCell>
                              <TableCell>{item.descricao}</TableCell>
                              <TableCell className="text-right">{item.quantidadeSolicitada}</TableCell>
                              <TableCell className="text-right">{item.quantidadeConferida}</TableCell>
                              <TableCell className="text-center">
                                {item.divergencia ? (
                                  <Badge variant="destructive" className="gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    {item.tipoDivergencia === 'falta' && 'Falta'}
                                    {item.tipoDivergencia === 'dano' && 'Avaria'}
                                    {item.tipoDivergencia === 'substituicao' && 'Substituído'}
                                  </Badge>
                                ) : (
                                  <Badge variant="default" className="gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    OK
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {/* Divergências */}
                  {pedido.recebimentoEstoque.observacoesDivergencia && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-yellow-900 dark:text-yellow-100">
                            Divergências Identificadas
                          </p>
                          <p className="text-xs text-yellow-800 dark:text-yellow-300 mt-1">
                            {pedido.recebimentoEstoque.observacoesDivergencia}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Previsão de Saída */}
                  {(pedido.recebimentoEstoque.dataSaidaPrevista || pedido.recebimentoEstoque.dataSaidaEfetiva) && (
                    <div className="grid grid-cols-2 gap-4">
                      {pedido.recebimentoEstoque.dataSaidaPrevista && (
                        <div>
                          <p className="text-xs text-muted-foreground">Previsão de Saída</p>
                          <p className="text-sm font-medium">{pedido.recebimentoEstoque.dataSaidaPrevista}</p>
                        </div>
                      )}
                      {pedido.recebimentoEstoque.dataSaidaEfetiva && (
                        <div>
                          <p className="text-xs text-muted-foreground">Saída Efetiva</p>
                          <p className="text-sm font-medium">{pedido.recebimentoEstoque.dataSaidaEfetiva}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Documentação Fiscal e Faturamento */}
            {pedido.notaFiscal && (
              <Card className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <FileText className="h-5 w-5" />
                    Documentação Fiscal e Faturamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* NF-e */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-blue-700 dark:text-blue-400">Nota Fiscal Eletrônica (NF-e)</h4>
                    <div className="p-4 bg-white/50 dark:bg-background/50 rounded-lg space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Número NF</p>
                          <p className="text-sm font-bold text-blue-900 dark:text-blue-100">{pedido.notaFiscal.numeroNF}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Série</p>
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{pedido.notaFiscal.serieNF}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Data de Emissão</p>
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{formatDate(pedido.notaFiscal.dataEmissao)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Chave de Acesso</p>
                        <p className="text-sm text-blue-900 dark:text-blue-100 font-mono">{pedido.notaFiscal.chaveAcesso}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Protocolo SEFAZ</p>
                        <p className="text-sm text-blue-900 dark:text-blue-100">{pedido.notaFiscal.protocoloSEFAZ}</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        {pedido.notaFiscal.linkXML && (
                          <Button size="sm" variant="outline" className="border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-400">
                            <FileDown className="h-4 w-4 mr-2" />
                            Download XML
                          </Button>
                        )}
                        {pedido.notaFiscal.linkDANFE && (
                          <Button size="sm" variant="outline" className="border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-400">
                            <FileDown className="h-4 w-4 mr-2" />
                            Visualizar DANFE
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Boleto */}
                  {pedido.boleto && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-blue-700 dark:text-blue-400">Boleto Bancário</h4>
                      <div className="p-4 bg-white/50 dark:bg-background/50 rounded-lg">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Vencimento</p>
                            <p className="text-sm font-medium">{pedido.boleto.dataVencimento}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Valor</p>
                            <p className="text-sm font-medium">{formatCurrency(pedido.boleto.valor)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Número</p>
                            <p className="text-sm font-medium">{pedido.boleto.numeroDocumento}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GNRE */}
                  {pedido.gnre && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-blue-700 dark:text-blue-400">GNRE</h4>
                      <div className="p-4 bg-white/50 dark:bg-background/50 rounded-lg">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Guia</p>
                            <p className="text-sm font-medium">{pedido.gnre.numeroGuia}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Vencimento</p>
                            <p className="text-sm font-medium">{pedido.gnre.dataVencimento}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Valor</p>
                            <p className="text-sm font-medium">{formatCurrency(pedido.gnre.valor)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Condições de Pagamento/Parcelas */}
                  {pedido.condicoesPagamentoFaturamento && (
                    <div className="p-3 border rounded-lg">
                      <h5 className="text-sm font-medium mb-2">Condições (Parcelas, Vencimentos)</h5>
                      <p className="text-sm text-muted-foreground">{pedido.condicoesPagamentoFaturamento}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Expedição e Logística */}
            {pedido.transportadora && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Expedição e Logística
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Transportadora */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Transportadora</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Nome</p>
                          <p className="text-sm font-medium">{pedido.transportadora.nome}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">CNPJ</p>
                          <p className="text-sm font-medium">{pedido.transportadora.cnpj}</p>
                        </div>
                        {pedido.transportadora.telefone && (
                          <div>
                            <p className="text-xs text-muted-foreground">Telefone</p>
                            <p className="text-sm font-medium">{pedido.transportadora.telefone}</p>
                          </div>
                        )}
                        {pedido.transportadora.email && (
                          <div>
                            <p className="text-xs text-muted-foreground">E-mail</p>
                            <p className="text-sm font-medium">{pedido.transportadora.email}</p>
                          </div>
                        )}
                        {pedido.transportadora.custoFrete && (
                          <div>
                            <p className="text-xs text-muted-foreground">Custo do Frete</p>
                            <p className="text-sm font-medium">{formatCurrency(pedido.transportadora.custoFrete)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CT-e */}
                  {pedido.cte && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Conhecimento de Transporte (CT-e)</h4>
                      <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">CT-e</p>
                            <p className="text-sm font-medium">{pedido.cte.numeroCTe}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Série</p>
                            <p className="text-sm font-medium">{pedido.cte.serieCTe}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Chave de Acesso</p>
                          <p className="text-sm font-mono break-all">{pedido.cte.chaveAcesso}</p>
                        </div>
                        {pedido.cte.linkRastreamento && (
                          <Button variant="outline" className="w-full gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Rastrear Entrega
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Status da Entrega */}
                  {pedido.statusEntrega && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Status da Entrega</h4>
                      <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                        <Badge variant={pedido.statusEntrega === 'entregue' ? 'default' : 'secondary'} className="text-sm">
                          {getStatusEntregaLabel(pedido.statusEntrega)}
                        </Badge>
                        <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                          {pedido.dataSaidaExpedicao && (
                            <div>
                              <p className="text-xs text-muted-foreground">Data de Saída</p>
                              <p className="font-medium">{formatDate(pedido.dataSaidaExpedicao)}</p>
                            </div>
                          )}
                          {pedido.previsaoEntrega && (
                            <div>
                              <p className="text-xs text-muted-foreground">Previsão de Entrega</p>
                              <p className="font-medium">{formatDate(pedido.previsaoEntrega)}</p>
                            </div>
                          )}
                          {pedido.dataEntregaEfetiva && (
                            <div>
                              <p className="text-xs text-muted-foreground">Entrega Efetiva</p>
                              <p className="font-medium">{formatDate(pedido.dataEntregaEfetiva)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Comprovante de Entrega */}
                  {pedido.comprovanteEntrega && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Comprovante de Entrega</h4>
                      <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Data/Hora Entrega</p>
                            <p className="font-medium">
                              {pedido.comprovanteEntrega.dataEntrega} às {pedido.comprovanteEntrega.horaEntrega}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Recebedor</p>
                            <p className="font-medium">{pedido.comprovanteEntrega.nomeRecebedor}</p>
                          </div>
                          {pedido.comprovanteEntrega.documentoRecebedor && (
                            <div>
                              <p className="text-xs text-muted-foreground">CPF Recebedor</p>
                              <p className="font-medium">{pedido.comprovanteEntrega.documentoRecebedor}</p>
                            </div>
                          )}
                        </div>
                        {pedido.comprovanteEntrega.imagemCanhoto && (
                          <Button variant="outline" className="w-full gap-2">
                            <FileText className="h-4 w-4" />
                            Ver Canhoto Digitalizado
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Feedback de Entrega */}
            {pedido.feedbackEntrega && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Feedback de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status de Recebimento:</span>
                    <Badge 
                      variant={pedido.feedbackEntrega.statusRecebimento === 'ok' ? 'default' : 'destructive'}
                      className="gap-1"
                    >
                      {pedido.feedbackEntrega.statusRecebimento === 'ok' && '✓ Recebido OK'}
                      {pedido.feedbackEntrega.statusRecebimento === 'com_avarias' && '⚠ Recebido com Avarias'}
                      {pedido.feedbackEntrega.statusRecebimento === 'temperatura_errada' && '🌡 Temperatura Errada'}
                      {pedido.feedbackEntrega.statusRecebimento === 'incompleto' && '📦 Recebido Incompleto'}
                      {pedido.feedbackEntrega.statusRecebimento === 'produto_errado' && '✗ Produto Errado'}
                      {pedido.feedbackEntrega.statusRecebimento === 'devolucao' && '↩ Devolução Solicitada'}
                      {pedido.feedbackEntrega.statusRecebimento === 'outros' && '📝 Outros'}
                    </Badge>
                  </div>

                  {pedido.feedbackEntrega.observacoesCliente && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Observações do Cliente</h4>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm">{pedido.feedbackEntrega.observacoesCliente}</p>
                      </div>
                    </div>
                  )}

                  {pedido.feedbackEntrega.statusRecebimento === 'outros' && pedido.feedbackEntrega.outrosDetalhes && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Detalhes</h4>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm">{pedido.feedbackEntrega.outrosDetalhes}</p>
                      </div>
                    </div>
                  )}

                  {pedido.feedbackEntrega.acoesTomadas && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Ações Tomadas</h4>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm">{pedido.feedbackEntrega.acoesTomadas}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Responsável pelo Feedback</p>
                      <p className="font-medium">{pedido.feedbackEntrega.responsavelFeedback}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Data do Registro</p>
                      <p className="font-medium">{pedido.feedbackEntrega.dataFeedback}</p>
                    </div>
                  </div>

                  {pedido.feedbackEntrega.anexos && pedido.feedbackEntrega.anexos.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Anexos</h4>
                      <div className="space-y-2">
                        {pedido.feedbackEntrega.anexos.map((anexo: any) => (
                          <div key={anexo.id} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{anexo.nome}</span>
                            </div>
                            <Button size="sm" variant="ghost">
                              <FileDown className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualizarPedidoModal;
