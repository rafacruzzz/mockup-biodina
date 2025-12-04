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
                  <label className="text-sm font-medium text-muted-foreground">Forma de Pagamento</label>
                  <p className="text-base">{pedido.formaPagamento || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Emails para NF</label>
                  <p className="text-sm">{pedido.emailsNF || '-'}</p>
                </div>
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
                  <label className="text-sm font-medium text-muted-foreground">Condições de Pagamento</label>
                  <p className="text-base">{pedido.condicoesPagamento || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Número de Parcelas</label>
                  <p className="text-base">{pedido.numeroParcelas || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Destacar IR?</label>
                  <p className="text-base">{pedido.destacarIR ? 'Sim' : 'Não'}</p>
                </div>
                {pedido.destacarIR && pedido.percentualIR && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Percentual IR</label>
                    <p className="text-base">{pedido.percentualIR}%</p>
                  </div>
                )}
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Conta Bancária de Recebimento</label>
                  <p className="text-base">{pedido.contaBancariaRecebimento || '-'}</p>
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
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Informações de Frete
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tipo de Frete</label>
                  <p className="text-base font-medium">{pedido.tipoFrete || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Prazo de Entrega</label>
                  <p className="text-base">{pedido.prazoEntrega || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data Prevista de Entrega</label>
                  <p className="text-base">{pedido.dataEntrega ? formatDate(pedido.dataEntrega) : '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Frete a Pagar Por</label>
                  <p className="text-base">{pedido.fretePagarPor || '-'}</p>
                </div>
                {pedido.entregarRetirarCuidados && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Cuidados na Entrega/Retirada</label>
                    <p className="text-sm text-muted-foreground">{pedido.entregarRetirarCuidados}</p>
                  </div>
                )}
              </CardContent>
            </Card>

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

            {pedido.solicitarUrgencia && (
              <Card className="border-orange-500 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-orange-700">
                    <AlertCircle className="h-5 w-5" />
                    Pedido Urgente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-orange-700">Status da Solicitação</label>
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
                      <label className="text-sm font-medium text-orange-700">Justificativa</label>
                      <p className="text-sm text-orange-900 mt-1">{pedido.justificativaUrgencia}</p>
                    </div>
                  )}
                  {pedido.autorizadoPor && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-orange-700">Autorizado Por</label>
                        <p className="text-sm text-orange-900">{pedido.autorizadoPor}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-orange-700">Data de Autorização</label>
                        <p className="text-sm text-orange-900">
                          {pedido.dataAutorizacao ? formatDate(pedido.dataAutorizacao) : '-'}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ABA 5: ACOMPANHAMENTO DO PEDIDO */}
          <TabsContent value="acompanhamento" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Atual</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {pedido.notaFiscal && (
              <Card className="border-blue-500 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
                    <FileText className="h-5 w-5" />
                    Nota Fiscal Emitida
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-blue-700">Número da NF</label>
                      <p className="text-base font-bold text-blue-900">{pedido.notaFiscal.numeroNF}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-700">Série</label>
                      <p className="text-base text-blue-900">{pedido.notaFiscal.serieNF}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-700">Data de Emissão</label>
                      <p className="text-base text-blue-900">{formatDate(pedido.notaFiscal.dataEmissao)}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-700">Chave de Acesso</label>
                    <p className="text-sm text-blue-900 font-mono">{pedido.notaFiscal.chaveAcesso}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-700">Protocolo SEFAZ</label>
                    <p className="text-sm text-blue-900">{pedido.notaFiscal.protocoloSEFAZ}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {pedido.notaFiscal.linkXML && (
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-700">
                        <FileDown className="h-4 w-4 mr-2" />
                        Download XML
                      </Button>
                    )}
                    {pedido.notaFiscal.linkDANFE && (
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-700">
                        <FileDown className="h-4 w-4 mr-2" />
                        Visualizar DANFE
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {pedido.logistica && (
              <Card className="border-green-500 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                    <Truck className="h-5 w-5" />
                    Informações de Logística
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-green-700">Transportadora</label>
                      <p className="text-base font-medium text-green-900">{pedido.logistica.transportadora.nome}</p>
                      <p className="text-sm text-green-700">{pedido.logistica.transportadora.cnpj}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-green-700">Status de Entrega</label>
                      <Badge className={
                        pedido.logistica.statusEntrega === 'entregue' ? 'bg-green-700 text-white' :
                        pedido.logistica.statusEntrega === 'em_rota_entrega' ? 'bg-blue-600 text-white' :
                        'bg-orange-600 text-white'
                      }>
                        {getStatusEntregaLabel(pedido.logistica.statusEntrega)}
                      </Badge>
                    </div>
                  </div>
                  {pedido.logistica.codigoRastreamento && (
                    <div>
                      <label className="text-sm font-medium text-green-700">Código de Rastreamento</label>
                      <p className="text-base font-mono text-green-900">{pedido.logistica.codigoRastreamento}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-4">
                    {pedido.logistica.dataSaida && (
                      <div>
                        <label className="text-sm font-medium text-green-700">Data de Saída</label>
                        <p className="text-sm text-green-900">{formatDate(pedido.logistica.dataSaida)}</p>
                      </div>
                    )}
                    {pedido.logistica.previsaoEntrega && (
                      <div>
                        <label className="text-sm font-medium text-green-700">Previsão de Entrega</label>
                        <p className="text-sm text-green-900">{formatDate(pedido.logistica.previsaoEntrega)}</p>
                      </div>
                    )}
                    {pedido.logistica.dataEntregaEfetiva && (
                      <div>
                        <label className="text-sm font-medium text-green-700">Entrega Realizada</label>
                        <p className="text-sm text-green-900 font-bold">{formatDate(pedido.logistica.dataEntregaEfetiva)}</p>
                      </div>
                    )}
                  </div>
                  {pedido.logistica.linkRastreamento && (
                    <div className="pt-2">
                      <Button size="sm" variant="outline" className="border-green-700 text-green-800">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Rastrear Pedido
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {pedido.alertas && pedido.alertas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Alertas e Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pedido.alertas.map((alerta, index) => (
                      <div key={index} className="flex gap-3 p-3 border rounded-lg bg-muted/30">
                        <div className="flex-shrink-0 mt-1">
                          {getAlertIcon(alerta.tipo)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">{alerta.titulo}</h4>
                            <Badge variant="outline" className={getPrioridadeColor(alerta.prioridade)}>
                              {alerta.prioridade.charAt(0).toUpperCase() + alerta.prioridade.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{alerta.mensagem}</p>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {formatDate(alerta.dataAlerta)} às {alerta.horaAlerta}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualizarPedidoModal;
