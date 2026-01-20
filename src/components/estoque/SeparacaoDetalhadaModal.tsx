
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Package, 
  AlertCircle, 
  CheckCircle, 
  CheckCircle2,
  Clock, 
  Printer, 
  Calendar as CalendarIcon, 
  MapPin, 
  Lock,
  FileText,
  Truck,
  Wallet,
  AlertTriangle,
  Info,
  Link as LinkIcon,
  Shield,
  Building,
  DollarSign,
  User,
  Download,
  ExternalLink
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { PedidoSeparacao, ItemPedidoSeparacao, StatusItemSeparacao, EstoqueDisponivel } from "@/types/estoque";
import EstoqueDisponivelModal from "./EstoqueDisponivelModal";
import { mockEstoquesDisponiveis } from "@/data/estoqueModules";
import { toast } from "@/hooks/use-toast";

interface SeparacaoDetalhadaModalProps {
  pedido: PedidoSeparacao;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ItemSeparacaoState {
  quantidade_a_separar: number;
  validade_separacao: Date | null;
  lote_selecionado: string;
  cnpj_estoque: string;
  deposito_estoque: string;
}

const SeparacaoDetalhadaModal = ({ pedido, isOpen, onOpenChange }: SeparacaoDetalhadaModalProps) => {
  const [selectedItem, setSelectedItem] = useState<ItemPedidoSeparacao | null>(null);
  const [showEstoqueModal, setShowEstoqueModal] = useState(false);
  
  // Estado para controle de separação por item
  const [itensSeparacao, setItensSeparacao] = useState<{[key: number]: ItemSeparacaoState}>({});

  const getStatusIcon = (status: StatusItemSeparacao) => {
    switch (status) {
      case StatusItemSeparacao.SEPARADO:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case StatusItemSeparacao.INDISPONIVEL:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case StatusItemSeparacao.PARCIAL:
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: StatusItemSeparacao) => {
    const statusConfig = {
      [StatusItemSeparacao.PENDENTE]: { label: "Pendente", className: "bg-gray-100 text-gray-800" },
      [StatusItemSeparacao.SEPARADO]: { label: "Separado", className: "bg-green-100 text-green-800" },
      [StatusItemSeparacao.INDISPONIVEL]: { label: "Indisponível", className: "bg-red-100 text-red-800" },
      [StatusItemSeparacao.PARCIAL]: { label: "Parcial", className: "bg-orange-100 text-orange-800" }
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleSelecionarEstoque = (item: ItemPedidoSeparacao) => {
    setSelectedItem(item);
    setShowEstoqueModal(true);
  };

  const handleAtualizarQuantidadeSeparar = (itemId: number, quantidade: number) => {
    setItensSeparacao(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        quantidade_a_separar: quantidade
      }
    }));
  };

  const handleAtualizarValidadeSeparacao = (itemId: number, data: Date | undefined) => {
    setItensSeparacao(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        validade_separacao: data || null
      }
    }));
  };

  const formatarDataValidade = (dataValidade: string | null) => {
    if (!dataValidade) return 'N/A';
    return new Date(dataValidade).toLocaleDateString('pt-BR');
  };

  // Simular validade mínima exigida (normalmente viria do pedido do comercial)
  const getValidadeMinimaExigida = (item: ItemPedidoSeparacao): string | null => {
    // Simulação - Em produção, isso viria dos dados do pedido
    const validadesSimuladas: {[key: string]: string} = {
      'PRD-001': '2025-06-30',
      'PRD-002': '2025-09-15',
      'PRD-003': '2025-12-31'
    };
    return validadesSimuladas[item.codigo_produto] || null;
  };

  const validarValidadeSeparacao = (itemId: number): { valido: boolean; mensagem?: string } => {
    const item = pedido.itens.find(i => i.id === itemId);
    if (!item) return { valido: true };

    const estadoItem = itensSeparacao[itemId];
    if (!estadoItem?.validade_separacao) return { valido: true };

    const validadeMinima = getValidadeMinimaExigida(item);
    if (!validadeMinima) return { valido: true };

    const dataMinima = new Date(validadeMinima);
    if (estadoItem.validade_separacao < dataMinima) {
      return { 
        valido: false, 
        mensagem: `Validade ${format(estadoItem.validade_separacao, 'dd/MM/yyyy')} é menor que a mínima exigida (${format(dataMinima, 'dd/MM/yyyy')})` 
      };
    }

    return { valido: true };
  };

  const handleFinalizarSeparacao = () => {
    // Validar todas as separações
    let temErro = false;
    
    for (const item of pedido.itens) {
      const estado = itensSeparacao[item.id];
      if (estado?.quantidade_a_separar && estado.quantidade_a_separar > 0) {
        const validacao = validarValidadeSeparacao(item.id);
        if (!validacao.valido) {
          toast({
            title: "Erro de Validação",
            description: `Produto ${item.codigo_produto}: ${validacao.mensagem}`,
            variant: "destructive"
          });
          temErro = true;
        }
      }
    }

    if (temErro) return;

    toast({
      title: "Separação Finalizada",
      description: "Os produtos foram separados com sucesso.",
    });

    onOpenChange(false);
  };

  const progressPercentage = (pedido.progresso.separados / pedido.progresso.total) * 100;

  const temItensSeparados = Object.values(itensSeparacao).some(
    estado => estado.quantidade_a_separar && estado.quantidade_a_separar > 0
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-biodina-blue">
              Separação do Pedido {pedido.numero_pedido}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="flex w-full overflow-x-auto mb-6">
              <TabsTrigger value="geral" className="min-w-fit whitespace-nowrap flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Geral
              </TabsTrigger>
              <TabsTrigger value="produtos" className="min-w-fit whitespace-nowrap">
                Produtos
              </TabsTrigger>
              <TabsTrigger value="informacoes-nf" className="min-w-fit whitespace-nowrap flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Informações NF
              </TabsTrigger>
              <TabsTrigger value="frete" className="min-w-fit whitespace-nowrap flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Frete
              </TabsTrigger>
              <TabsTrigger value="pagamento" className="min-w-fit whitespace-nowrap flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Pagamento
              </TabsTrigger>
              <TabsTrigger value="acompanhamento" className="min-w-fit whitespace-nowrap flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Acompanhamento
              </TabsTrigger>
            </TabsList>

            {/* Aba Geral (BLOQUEADA) */}
            <TabsContent value="geral" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Informações do Pedido
                    <Badge variant="outline" className="ml-2 text-amber-600 border-amber-300 bg-amber-50">
                      <Lock className="h-3 w-3 mr-1" />
                      Somente Leitura
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Cliente</Label>
                    <Input value={pedido.cliente} disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Vendedor</Label>
                    <Input value={pedido.vendedor} disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Data</Label>
                    <Input value={new Date(pedido.data_entrega).toLocaleDateString('pt-BR')} disabled className="bg-muted" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Observações Gerais</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={pedido.observacoes || ''}
                    disabled
                    className="bg-muted"
                    rows={3}
                    placeholder="Sem observações"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Natureza da Operação</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Selecione a operação e seu descritivo específico
                  </p>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Qual natureza da operação? *</Label>
                    <Input value={pedido.nop || 'Não definida'} disabled className="bg-muted mt-2" />
                  </div>
                  <div>
                    <Label>Descritivo da Operação *</Label>
                    <Input value="VENDA DE MERCADORIA" disabled className="bg-muted mt-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Progresso da Separação */}
              <Card>
                <CardHeader>
                  <CardTitle>Progresso da Separação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Itens Separados</p>
                    <p className="text-sm font-medium">{pedido.progresso.separados}/{pedido.progresso.total} itens</p>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Produtos (EDITÁVEL PARCIALMENTE) */}
            <TabsContent value="produtos" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Produtos do Pedido</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Selecione o estoque e defina a quantidade a separar para cada produto
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código</TableHead>
                          <TableHead>Produto</TableHead>
                          <TableHead>Un.</TableHead>
                          <TableHead>Estoque Disp.</TableHead>
                          <TableHead>Val. Mín. Exigida</TableHead>
                          <TableHead>Qtde Pedido</TableHead>
                          <TableHead>Qtde a Separar</TableHead>
                          <TableHead>Validade Separação</TableHead>
                          <TableHead>Lote</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pedido.itens.map((item) => {
                          const estadoItem: ItemSeparacaoState | undefined = itensSeparacao[item.id];
                          const validadeMinima = getValidadeMinimaExigida(item);
                          const validacaoValidade = validarValidadeSeparacao(item.id);
                          
                          // Simular estoque disponível
                          const estoqueDisponivel = mockEstoquesDisponiveis.reduce(
                            (sum, e) => sum + e.quantidade_disponivel, 0
                          );

                          return (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.codigo_produto}</TableCell>
                              <TableCell>
                                <div className="max-w-[200px]">
                                  <p className="truncate">{item.descricao_produto}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">UN</Badge>
                              </TableCell>
                              <TableCell>
                                <span className="text-green-600 font-medium">{estoqueDisponivel}</span>
                              </TableCell>
                              <TableCell>
                                {validadeMinima ? (
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    <CalendarIcon className="h-3 w-3 mr-1" />
                                    {format(new Date(validadeMinima), 'dd/MM/yyyy')}
                                  </Badge>
                                ) : (
                                  <span className="text-gray-400">N/A</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-biodina-gold text-white">
                                  {item.quantidade_solicitada}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min="0"
                                  max={item.quantidade_solicitada - item.quantidade_separada}
                                  value={estadoItem?.quantidade_a_separar || ''}
                                  onChange={(e) => handleAtualizarQuantidadeSeparar(item.id, parseInt(e.target.value) || 0)}
                                  className="w-20"
                                  placeholder="0"
                                />
                              </TableCell>
                              <TableCell>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-[130px] justify-start text-left font-normal",
                                        !estadoItem?.validade_separacao && "text-muted-foreground",
                                        !validacaoValidade.valido && "border-red-500 bg-red-50"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {estadoItem?.validade_separacao 
                                        ? format(estadoItem.validade_separacao, "dd/MM/yyyy")
                                        : "Selecionar"
                                      }
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={estadoItem?.validade_separacao || undefined}
                                      onSelect={(date) => handleAtualizarValidadeSeparacao(item.id, date)}
                                      initialFocus
                                      className={cn("p-3 pointer-events-auto")}
                                      locale={ptBR}
                                    />
                                  </PopoverContent>
                                </Popover>
                                {!validacaoValidade.valido && (
                                  <p className="text-xs text-red-500 mt-1">Menor que a mínima</p>
                                )}
                              </TableCell>
                              <TableCell>
                                {estadoItem?.lote_selecionado || (
                                  <span className="text-gray-400 text-sm">Selecionar...</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(item.status)}
                                  {getStatusBadge(item.status)}
                                </div>
                              </TableCell>
                              <TableCell>
                                {item.status !== StatusItemSeparacao.SEPARADO && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleSelecionarEstoque(item)}
                                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                                  >
                                    Selecionar Estoque
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Itens de Uso e Consumo (BLOQUEADO) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Itens de Uso e Consumo
                    <Badge variant="outline" className="ml-2 text-amber-600 border-amber-300 bg-amber-50">
                      <Lock className="h-3 w-3 mr-1" />
                      Somente Leitura
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    ⚠️ Itens NÃO comercializados - Apenas visualização
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500 bg-muted/30 rounded-lg">
                    <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="font-medium text-base">Nenhum item de uso e consumo neste pedido</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Informações NF (BLOQUEADA) */}
            <TabsContent value="informacoes-nf" className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-amber-600" />
                  <p className="text-sm text-amber-800 font-medium">
                    Estas informações são apenas para visualização. Edição disponível apenas no módulo Comercial.
                  </p>
                </div>
              </div>

              {/* Card 1: Vinculação e Origem */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Vinculação e Origem
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Projeto de Origem *</Label>
                    <div className="relative mt-2">
                      <Input value="PROJ-2024-001" disabled className="bg-muted pr-10" />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        Este pedido está vinculado automaticamente ao projeto de origem da oportunidade.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2: Configurações Fiscais */}
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Fiscais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Deve destacar IR?</Label>
                      <p className="text-sm text-muted-foreground">
                        Destacar Imposto de Renda na nota fiscal
                      </p>
                    </div>
                    <Switch checked={true} disabled />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Percentual de IR (%)</Label>
                      <Input value="1.5" disabled className="bg-muted mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 3: Comunicação e Envio */}
              <Card>
                <CardHeader>
                  <CardTitle>Comunicação e Envio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label>E-mails para envio das notas fiscais</Label>
                    <Textarea
                      value="FINANCEIRO@EMPRESA.COM, COMPRAS@CLIENTE.COM"
                      disabled
                      className="bg-muted mt-2"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground mt-1">E-mails separados por vírgula</p>
                  </div>
                </CardContent>
              </Card>

              {/* Card 4: Documentação para Envio junto à NF */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documentação para Envio junto à NF
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        ℹ️ A documentação pode vir pré-selecionada do projeto inicial pela equipe comercial
                      </p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3 space-y-2 bg-muted/30">
                    <h4 className="font-semibold text-sm">Documentos Selecionados (3)</h4>
                    <div className="space-y-1">
                      {['NOTA FISCAL', 'CERTIFICADO DE QUALIDADE', 'LAUDO TÉCNICO'].map(doc => (
                        <div key={doc} className="flex items-center p-2 bg-background rounded border">
                          <span className="text-sm">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Observações sobre a Documentação</Label>
                    <Textarea
                      value="ENVIAR VIA E-MAIL APÓS DESPACHO"
                      disabled
                      className="bg-muted mt-2"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Card 5: Informações Complementares da NF */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Complementares da NF</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value="ENTREGAR COM CUIDADO. PRODUTOS SENSÍVEIS À TEMPERATURA."
                    disabled
                    className="bg-muted"
                    rows={4}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Frete (BLOQUEADA) */}
            <TabsContent value="frete" className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-amber-600" />
                  <p className="text-sm text-amber-800 font-medium">
                    Informações de frete são apenas para visualização.
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Informações Básicas de Frete
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tipo de Frete</Label>
                    <Input value="CIF (Por conta do remetente)" disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Prazo Máximo de Entrega</Label>
                    <Input value="5 dias úteis" disabled className="bg-muted" />
                  </div>
                  <div className="col-span-2">
                    <Label>Data de Entrega (Agendada)</Label>
                    <Input value={new Date(pedido.data_entrega).toLocaleDateString('pt-BR')} disabled className="bg-muted" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Responsabilidades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Frete a Pagar Por</Label>
                      <Input value="EMPRESA" disabled className="bg-muted" />
                    </div>
                    <div>
                      <Label>Frete a Retirar Por</Label>
                      <Input value="DESTINO FINAL" disabled className="bg-muted" />
                    </div>
                  </div>
                  <div>
                    <Label>Entregar/Retirar aos Cuidados de Quem</Label>
                    <Input value="MARIA DA SILVA" disabled className="bg-muted" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dados do Recebedor</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome Completo</Label>
                    <Input value="João da Silva" disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>CPF</Label>
                    <Input value="123.456.789-00" disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <Input value="(11) 99999-9999" disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value="joao@empresa.com" disabled className="bg-muted" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detalhes da Entrega</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Endereço de Entrega</Label>
                    <Textarea value={pedido.endereco_cliente} disabled className="bg-muted" rows={2} />
                  </div>
                  <div>
                    <Label>Horários Permitidos</Label>
                    <Input value="Segunda a Sexta, 8h às 17h" disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Locais de Entrega Permitidos</Label>
                    <Textarea 
                      value="RECEPÇÃO PRINCIPAL, ALMOXARIFADO CENTRAL" 
                      disabled 
                      className="bg-muted" 
                      rows={2} 
                    />
                  </div>
                  <div>
                    <Label>Mais Informações sobre a Entrega</Label>
                    <Textarea 
                      value="LIGAR 30 MINUTOS ANTES DA CHEGADA. ENTRAR PELO PORTÃO LATERAL."
                      disabled 
                      className="bg-muted" 
                      rows={3} 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Urgência e Autorização
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Solicite aprovação do gestor para entregas urgentes
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
                    <Checkbox checked={true} disabled />
                    <div className="flex-1">
                      <Label className="font-semibold">
                        Solicitar urgência ao gestor
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Marque se esta entrega precisa de aprovação de urgência do gestor
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-orange-700 font-semibold">
                      Justificar a Urgência *
                    </Label>
                    <Textarea
                      value="CLIENTE NECESSITA DO PRODUTO URGENTE PARA PRODUÇÃO"
                      disabled
                      className="bg-muted mt-2"
                      rows={3}
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Informações de Autorização
                    </h5>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground text-xs">Autorizado Por:</p>
                        <p className="font-medium text-blue-700">JOSÉ GERENTE</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground text-xs">Data de Autorização:</p>
                        <p className="font-medium text-blue-700">15/01/2025</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground text-xs">Email do Autorizador:</p>
                        <p className="font-medium text-blue-700 truncate">JOSE.GERENTE@EMPRESA.COM</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border bg-green-50 border-green-200 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">Urgência aprovada pelo gestor</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Pagamento (BLOQUEADA) */}
            <TabsContent value="pagamento" className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-amber-600" />
                  <p className="text-sm text-amber-800 font-medium">
                    Informações de pagamento são apenas para visualização.
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Condições de Pagamento */}
                  <div>
                    <Label>Condições de Pagamento *</Label>
                    <div className="relative mt-2">
                      <Input value="30/60/90 dias" disabled className="bg-muted" />
                      <span className="text-xs text-muted-foreground ml-1 mt-1 block">
                        (pré-preenchido do projeto)
                      </span>
                    </div>
                  </div>
                  
                  {/* Conta Bancária Selecionada */}
                  <div>
                    <Label>Conta Bancária para Recebimento *</Label>
                    <Input 
                      value="Banco do Brasil - Ag: 1234 - Conta: 56789-0" 
                      disabled 
                      className="bg-muted mt-2" 
                    />
                  </div>
                  
                  {/* Card com detalhes bancários completos */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Dados Bancários Selecionados:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Banco:</span>
                        <span className="font-medium">BANCO DO BRASIL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Agência:</span>
                        <span className="font-medium">1234-5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Conta:</span>
                        <span className="font-medium">56789-0 (Corrente)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Gerente:</span>
                        <span className="font-medium">MARIA SILVA</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Número de Parcelas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Número de Parcelas *</Label>
                      <Input value="3" type="number" disabled className="bg-muted mt-2 w-32" />
                      <p className="text-xs text-muted-foreground mt-1">
                        3x de R$ 5.000,00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Instruções para Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Alerta de atenção para faturamento */}
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-300 dark:border-yellow-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-800 dark:text-yellow-300">
                        <strong>ATENÇÃO:</strong> O departamento de faturamento deverá emitir 3 boletos e anexar junto à Nota Fiscal antes do envio ao cliente.
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Instruções para o Boleto</Label>
                    <Textarea
                      value="Não aceitar pagamento em cheque. Multa de 2% após vencimento."
                      disabled
                      className="bg-muted mt-2"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label>Condições (parcelas, vencimentos)</Label>
                    <Textarea
                      value="Entrada + 2x30/60 dias, Vencimento: todo dia 10"
                      disabled
                      className="bg-muted mt-2"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Acompanhamento (BLOQUEADA) */}
            <TabsContent value="acompanhamento" className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-amber-600" />
                  <p className="text-sm text-amber-800 font-medium">
                    Informações de acompanhamento são apenas para visualização.
                  </p>
                </div>
              </div>

              {/* Indicadores e Alertas */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-3 border rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-green-600">0</p>
                  <p className="text-xs text-muted-foreground">Atraso Separação</p>
                </div>
                <div className="p-3 border rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-green-600">0</p>
                  <p className="text-xs text-muted-foreground">Prazo Excedido</p>
                </div>
                <div className="p-3 border rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                  <p className="text-xs text-muted-foreground">NF Pendente</p>
                </div>
                <div className="p-3 border rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-green-600">0</p>
                  <p className="text-xs text-muted-foreground">Divergência Qtd</p>
                </div>
              </div>

              {/* Progresso do Pedido */}
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
                      <span className="font-medium">Em Separação</span>
                      <span className="text-muted-foreground">{Math.round(progressPercentage)}% concluído</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Histórico de Eventos</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-blue-500 text-white">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Pedido Enviado</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(pedido.data_entrega).toLocaleDateString('pt-BR')} às 10:30
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">{pedido.vendedor}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-green-500 text-white">
                          <Package className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Recebido pelo Estoque</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(pedido.data_entrega).toLocaleDateString('pt-BR')} às 14:00
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">Departamento de Expedição</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-orange-500 text-white">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Separação Iniciada</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(pedido.data_entrega).toLocaleDateString('pt-BR')} às 14:30
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">Operador de Estoque</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Confirmação de Recebimento Interno */}
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
                    <Badge className="bg-blue-100 text-blue-800">Pronto para Faturamento</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Data/Hora Recebimento</p>
                        <p className="text-sm font-medium">15/01/2025 às 14:30</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Responsável</p>
                        <p className="text-sm font-medium">CARLOS EXPEDIÇÃO</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tabela de Itens Conferidos */}
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
                      {pedido.itens.slice(0, 3).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.codigo_produto}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{item.descricao_produto}</TableCell>
                          <TableCell className="text-right">{item.quantidade_solicitada}</TableCell>
                          <TableCell className="text-right">{item.quantidade_separada}</TableCell>
                          <TableCell className="text-center">
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              OK
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Documentação Fiscal e Faturamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documentação Fiscal e Faturamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* NF-e */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Nota Fiscal Eletrônica (NF-e)</h4>
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Número NF</p>
                          <p className="text-sm font-medium">123456</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Série</p>
                          <p className="text-sm font-medium">001</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Data Emissão</p>
                          <p className="text-sm font-medium">15/01/2025</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Valor Total</p>
                          <p className="text-sm font-medium">R$ 15.000,00</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Status SEFAZ</p>
                          <Badge className="bg-green-100 text-green-800">Autorizada</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="gap-2" disabled>
                          <Download className="h-4 w-4" /> Download XML
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2" disabled>
                          <Download className="h-4 w-4" /> Download DANFE
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Boleto */}
                  <div className="p-3 border rounded-lg">
                    <h5 className="text-sm font-medium flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4" /> Boleto Bancário
                    </h5>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Vencimento</p>
                        <p className="font-medium">15/02/2025</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Valor</p>
                        <p className="font-medium">R$ 5.000,00</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Número</p>
                        <p className="font-medium">001-12345</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expedição e Logística */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Informações de Expedição e Logística
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Transportadora */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Transportadora</h4>
                    <div className="p-4 bg-muted/50 rounded-lg grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Nome</p>
                        <p className="text-sm font-medium">TRANSPORTADORA ABC LTDA</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">CNPJ</p>
                        <p className="text-sm font-medium">12.345.678/0001-90</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Telefone</p>
                        <p className="text-sm font-medium">(11) 99999-9999</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Custo do Frete</p>
                        <p className="text-sm font-medium">R$ 500,00</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* CT-e */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Conhecimento de Transporte (CT-e)</h4>
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">CT-e</p>
                          <p className="text-sm font-medium">789012</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Série</p>
                          <p className="text-sm font-medium">001</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full gap-2" disabled>
                        <ExternalLink className="h-4 w-4" /> Rastrear Entrega
                      </Button>
                    </div>
                  </div>
                  
                  {/* Status da Entrega */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Status da Entrega</h4>
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <Badge className="bg-blue-100 text-blue-800">Em Trânsito</Badge>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Data de Saída</p>
                          <p className="font-medium">16/01/2025</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Previsão de Entrega</p>
                          <p className="font-medium">18/01/2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback de Entrega */}
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
                    <Badge className="bg-green-100 text-green-800">Recebido OK</Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Observações do Cliente</h4>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">PRODUTOS RECEBIDOS EM PERFEITO ESTADO.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Rodapé com Ações */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-3">
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Etiqueta de Separação
              </Button>
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Etiqueta de Expedição
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
              <Button 
                className="bg-biodina-blue hover:bg-biodina-blue/90"
                disabled={!temItensSeparados && pedido.progresso.separados === 0}
                onClick={handleFinalizarSeparacao}
              >
                Finalizar Separação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {selectedItem && (
        <EstoqueDisponivelModal
          item={selectedItem}
          pedido={pedido}
          isOpen={showEstoqueModal}
          onOpenChange={setShowEstoqueModal}
        />
      )}
    </>
  );
};

export default SeparacaoDetalhadaModal;
