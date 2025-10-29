import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Clock, 
  Package, 
  FileText, 
  Truck, 
  CheckCircle, 
  AlertTriangle,
  Download,
  ExternalLink,
  User,
  Calendar,
  MapPin,
  DollarSign,
  FileCheck,
  AlertCircle,
  XCircle,
  Info,
  Clipboard,
  Building
} from "lucide-react";
import { 
  PedidoCompleto, 
  StatusPedido,
  IndicadorPedido
} from "@/types/comercial";
import IndicadoresAlertasPanel from "./IndicadoresAlertasPanel";

interface AcompanhamentoPedidoTabProps {
  pedido: PedidoCompleto;
}

const AcompanhamentoPedidoTab = ({ pedido }: AcompanhamentoPedidoTabProps) => {
  const getStatusIcon = (status: StatusPedido) => {
    switch (status) {
      case 'enviado': return <Clock className="h-5 w-5" />;
      case 'recebido_estoque': return <Package className="h-5 w-5" />;
      case 'em_separacao': return <Package className="h-5 w-5" />;
      case 'pronto_faturamento': return <FileCheck className="h-5 w-5" />;
      case 'faturado': return <FileText className="h-5 w-5" />;
      case 'em_transito': return <Truck className="h-5 w-5" />;
      case 'entregue': return <CheckCircle className="h-5 w-5" />;
      case 'cancelado': return <XCircle className="h-5 w-5" />;
      case 'devolvido': return <AlertTriangle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusLabel = (status: StatusPedido) => {
    const labels = {
      'rascunho': 'Rascunho',
      'enviado': 'Pedido Enviado',
      'recebido_estoque': 'Recebido pelo Estoque',
      'em_separacao': 'Em Separação',
      'pronto_faturamento': 'Pronto para Faturamento',
      'faturado': 'Faturado',
      'em_transito': 'Em Trânsito',
      'entregue': 'Entregue',
      'cancelado': 'Cancelado',
      'devolvido': 'Devolvido'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: StatusPedido) => {
    switch (status) {
      case 'enviado': return 'bg-blue-500';
      case 'recebido_estoque': return 'bg-green-500';
      case 'em_separacao': return 'bg-yellow-500';
      case 'pronto_faturamento': return 'bg-purple-500';
      case 'faturado': return 'bg-indigo-500';
      case 'em_transito': return 'bg-orange-500';
      case 'entregue': return 'bg-green-600';
      case 'cancelado': return 'bg-red-500';
      case 'devolvido': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const calcularProgresso = () => {
    const etapas = ['enviado', 'recebido_estoque', 'em_separacao', 'pronto_faturamento', 'faturado', 'em_transito', 'entregue'];
    const statusAtual = pedido.statusAtual || 'rascunho';
    const indiceAtual = etapas.indexOf(statusAtual);
    return ((indiceAtual + 1) / etapas.length) * 100;
  };

  const calcularIndicadores = (pedido: PedidoCompleto): IndicadorPedido[] => {
    const indicadores: IndicadorPedido[] = [];
    const hoje = new Date();

    // 1. Atraso de separação
    if (pedido.recebimentoEstoque?.dataSaidaPrevista) {
      const dataSaida = new Date(pedido.recebimentoEstoque.dataSaidaPrevista);
      if (hoje > dataSaida && pedido.statusAtual === 'em_separacao') {
        indicadores.push({
          tipo: 'atraso_separacao',
          severidade: 'alta',
          mensagem: 'Pedido com atraso na separação',
          dataDeteccao: hoje.toISOString(),
          pedidoId: pedido.id,
          detalhes: `Previsão: ${pedido.recebimentoEstoque.dataSaidaPrevista}`
        });
      }
    }

    // 2. Prazo de entrega excedido
    if (pedido.logistica?.previsaoEntrega) {
      const previsao = new Date(pedido.logistica.previsaoEntrega);
      if (hoje > previsao && pedido.statusAtual === 'em_transito') {
        indicadores.push({
          tipo: 'prazo_excedido',
          severidade: 'critica',
          mensagem: 'Entrega com prazo excedido',
          dataDeteccao: hoje.toISOString(),
          pedidoId: pedido.id
        });
      }
    }

    // 3. NF pendente
    if (pedido.statusAtual === 'pronto_faturamento' && !pedido.faturamento) {
      indicadores.push({
        tipo: 'nf_pendente',
        severidade: 'media',
        mensagem: 'Nota fiscal pendente de emissão',
        dataDeteccao: hoje.toISOString(),
        pedidoId: pedido.id
      });
    }

    // 4. Divergência de quantidade
    if (pedido.recebimentoEstoque?.itensConferidos?.some(item => item.divergencia)) {
      indicadores.push({
        tipo: 'divergencia_quantidade',
        severidade: 'alta',
        mensagem: 'Pedido com divergência de quantidade',
        dataDeteccao: hoje.toISOString(),
        pedidoId: pedido.id
      });
    }

    return indicadores;
  };

  const indicadoresCalculados = calcularIndicadores(pedido);
  const alertasAtivos = pedido.alertas || [];

  // Verificar se há dados para exibir
  const temDados = pedido.statusAtual && pedido.statusAtual !== 'rascunho';

  if (!temDados) {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Acompanhamento do Pedido
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                Esta aba será preenchida automaticamente após o envio do pedido. As informações virão dos seguintes módulos:
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 ml-4 list-disc">
                <li><strong>Estoque/Expedição:</strong> Confirmação de recebimento, separação e saída dos materiais</li>
                <li><strong>Faturamento:</strong> Nota fiscal, boletos, GNRE e documentação fiscal</li>
                <li><strong>Logística:</strong> Dados da transportadora, rastreamento e comprovante de entrega</li>
                <li><strong>Feedback:</strong> Confirmação final do recebimento pelo cliente</li>
              </ul>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Aguardando Processamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Salve e envie o pedido para iniciar o acompanhamento automático.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Indicadores e Alertas */}
      <IndicadoresAlertasPanel 
        indicadores={indicadoresCalculados}
        alertas={alertasAtivos}
      />

      {/* Timeline de Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Progresso do Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{getStatusLabel(pedido.statusAtual!)}</span>
              <span className="text-muted-foreground">{Math.round(calcularProgresso())}% concluído</span>
            </div>
            <Progress value={calcularProgresso()} className="h-2" />
          </div>

          {pedido.timeline && pedido.timeline.length > 0 && (
            <div className="space-y-3 mt-6">
              <Separator />
              <h4 className="text-sm font-semibold">Histórico de Eventos</h4>
              <div className="space-y-3">
                {pedido.timeline.map((evento, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getStatusColor(evento.status)} text-white`}>
                      {getStatusIcon(evento.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{getStatusLabel(evento.status)}</p>
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

      {/* Confirmação de Recebimento Interno */}
      {pedido.recebimentoEstoque && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                <div className="flex items-center gap-2">
                  <Clipboard className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Lote/Número de Série</p>
                    <p className="text-sm font-medium">
                      {pedido.recebimentoEstoque.numeroLote && `Lote: ${pedido.recebimentoEstoque.numeroLote}`}
                      {pedido.recebimentoEstoque.numeroLote && pedido.recebimentoEstoque.numeroSerie && ' | '}
                      {pedido.recebimentoEstoque.numeroSerie && `Nº Série: ${pedido.recebimentoEstoque.numeroSerie}`}
                    </p>
                  </div>
                </div>
              )}
              {pedido.recebimentoEstoque.referenciaInterna && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Referência Interna</p>
                    <p className="text-sm font-medium">{pedido.recebimentoEstoque.referenciaInterna}</p>
                  </div>
                </div>
              )}
            </div>

            {pedido.recebimentoEstoque.itensConferidos.length > 0 && (
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
                    {pedido.recebimentoEstoque.itensConferidos.map((item, index) => (
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
      {pedido.faturamento && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentação Fiscal e Faturamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-3">Nota Fiscal Eletrônica (NF-e)</h4>
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Número NF</p>
                    <p className="text-sm font-medium">{pedido.faturamento.numeroNF}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Série</p>
                    <p className="text-sm font-medium">{pedido.faturamento.serieNF}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Data Emissão</p>
                    <p className="text-sm font-medium">{pedido.faturamento.dataEmissao}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Valor Total</p>
                    <p className="text-sm font-medium">
                      R$ {pedido.faturamento.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status SEFAZ</p>
                    <Badge variant={pedido.faturamento.statusSefaz === 'autorizada' ? 'default' : 'destructive'}>
                      {pedido.faturamento.statusSefaz === 'autorizada' && '✓ Autorizada'}
                      {pedido.faturamento.statusSefaz === 'cancelada' && '✗ Cancelada'}
                      {pedido.faturamento.statusSefaz === 'rejeitada' && '✗ Rejeitada'}
                      {pedido.faturamento.statusSefaz === 'processando' && '⏳ Processando'}
                    </Badge>
                  </div>
                </div>

                {pedido.faturamento.protocolo && (
                  <div>
                    <p className="text-xs text-muted-foreground">Protocolo SEFAZ</p>
                    <p className="text-sm font-mono">{pedido.faturamento.protocolo}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {pedido.faturamento.linkXML && (
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download XML
                    </Button>
                  )}
                  {pedido.faturamento.linkDANFE && (
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download DANFE
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {(pedido.faturamento.boleto || pedido.faturamento.gnre) && (
              <div>
                <h4 className="text-sm font-semibold mb-3">Acessórios à NF</h4>
                <div className="space-y-3">
                  {pedido.faturamento.boleto && (
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-medium flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Boleto Bancário
                        </h5>
                        {pedido.faturamento.boleto.linkBoleto && (
                          <Button size="sm" variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Vencimento</p>
                          <p className="font-medium">{pedido.faturamento.boleto.dataVencimento}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Valor</p>
                          <p className="font-medium">
                            R$ {pedido.faturamento.boleto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Número</p>
                          <p className="font-medium">{pedido.faturamento.boleto.numeroDocumento}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {pedido.faturamento.gnre && (
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-medium flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          GNRE
                        </h5>
                        {pedido.faturamento.gnre.linkGNRE && (
                          <Button size="sm" variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Guia</p>
                          <p className="font-medium">{pedido.faturamento.gnre.numeroGuia}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Vencimento</p>
                          <p className="font-medium">{pedido.faturamento.gnre.dataVencimento}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Valor</p>
                          <p className="font-medium">
                            R$ {pedido.faturamento.gnre.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {pedido.faturamento.condicoesPagamento && (
                    <div className="p-3 border rounded-lg">
                      <h5 className="text-sm font-medium mb-2">Condições (parcelas, vencimentos)</h5>
                      <p className="text-sm text-muted-foreground">{pedido.faturamento.condicoesPagamento}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Expedição e Logística */}
      {pedido.logistica && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Informações de Expedição e Logística
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-3">Transportadora</h4>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Nome</p>
                      <p className="text-sm font-medium">{pedido.logistica.transportadora.nome}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">CNPJ</p>
                    <p className="text-sm font-medium">{pedido.logistica.transportadora.cnpj}</p>
                  </div>
                  {pedido.logistica.transportadora.telefone && (
                    <div>
                      <p className="text-xs text-muted-foreground">Telefone</p>
                      <p className="text-sm font-medium">{pedido.logistica.transportadora.telefone}</p>
                    </div>
                  )}
                  {pedido.logistica.transportadora.email && (
                    <div>
                      <p className="text-xs text-muted-foreground">E-mail</p>
                      <p className="text-sm font-medium">{pedido.logistica.transportadora.email}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Custo do Frete</p>
                      <p className="text-sm font-medium">
                        R$ {pedido.logistica.transportadora.custoFrete.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Conhecimento de Transporte (CT-e)</h4>
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">CT-e</p>
                    <p className="text-sm font-medium">{pedido.logistica.conhecimentoTransporte.numeroCTe}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Série</p>
                    <p className="text-sm font-medium">{pedido.logistica.conhecimentoTransporte.serieCTe}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Chave de Acesso</p>
                  <p className="text-sm font-mono break-all">{pedido.logistica.conhecimentoTransporte.chaveAcesso}</p>
                </div>
                {pedido.logistica.conhecimentoTransporte.linkRastreamento && (
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Rastrear Entrega
                  </Button>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Status da Entrega</h4>
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant={pedido.logistica.statusEntrega === 'entregue' ? 'default' : 'secondary'} className="text-sm">
                    {pedido.logistica.statusEntrega === 'aguardando_coleta' && '⏳ Aguardando Coleta'}
                    {pedido.logistica.statusEntrega === 'em_transito' && '🚚 Em Trânsito'}
                    {pedido.logistica.statusEntrega === 'em_rota_entrega' && '📍 Em Rota de Entrega'}
                    {pedido.logistica.statusEntrega === 'entregue' && '✓ Entregue'}
                    {pedido.logistica.statusEntrega === 'devolvido' && '↩ Devolvido'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {pedido.logistica.dataSaida && (
                    <div>
                      <p className="text-xs text-muted-foreground">Data de Saída</p>
                      <p className="font-medium">{pedido.logistica.dataSaida}</p>
                    </div>
                  )}
                  {pedido.logistica.previsaoEntrega && (
                    <div>
                      <p className="text-xs text-muted-foreground">Previsão de Entrega</p>
                      <p className="font-medium">{pedido.logistica.previsaoEntrega}</p>
                    </div>
                  )}
                  {pedido.logistica.prazoEstimado && (
                    <div>
                      <p className="text-xs text-muted-foreground">Prazo Estimado</p>
                      <p className="font-medium">{pedido.logistica.prazoEstimado}</p>
                    </div>
                  )}
                  {pedido.logistica.dataEntregaEfetiva && (
                    <div>
                      <p className="text-xs text-muted-foreground">Entrega Efetiva</p>
                      <p className="font-medium">{pedido.logistica.dataEntregaEfetiva}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {pedido.logistica.comprovanteEntrega && (
              <div>
                <h4 className="text-sm font-semibold mb-3">Comprovante de Entrega</h4>
                <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Data/Hora Entrega</p>
                      <p className="font-medium">
                        {pedido.logistica.comprovanteEntrega.dataEntrega} às {pedido.logistica.comprovanteEntrega.horaEntrega}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Recebedor</p>
                      <p className="font-medium">{pedido.logistica.comprovanteEntrega.nomeRecebedor}</p>
                    </div>
                    {pedido.logistica.comprovanteEntrega.documentoRecebedor && (
                      <div>
                        <p className="text-xs text-muted-foreground">CPF Recebedor</p>
                        <p className="font-medium">{pedido.logistica.comprovanteEntrega.documentoRecebedor}</p>
                      </div>
                    )}
                    {pedido.logistica.comprovanteEntrega.protocoloCliente && (
                      <div>
                        <p className="text-xs text-muted-foreground">Protocolo Cliente</p>
                        <p className="font-medium">{pedido.logistica.comprovanteEntrega.protocoloCliente}</p>
                      </div>
                    )}
                  </div>
                  {pedido.logistica.comprovanteEntrega.imagemCanhoto && (
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
            <CardTitle className="flex items-center gap-2">
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
                  {pedido.feedbackEntrega.anexos.map((anexo) => (
                    <div key={anexo.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{anexo.nome}</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AcompanhamentoPedidoTab;
