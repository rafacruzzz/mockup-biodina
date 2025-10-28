
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Trash2, Info, ShoppingCart, AlertTriangle, Package, Link as LinkIcon, Lock, Wallet, Building, FileText, CheckCircle2, XCircle, Clock, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProdutoPedido, PedidoCompleto, UnidadeVenda, ItemUsoConsumoPedido } from "@/types/comercial";
import AdicionarProdutoModal from "./AdicionarProdutoModal";
import AdicionarItemUsoConsumoModal from "./AdicionarItemUsoConsumoModal";
import AcompanhamentoPedidoTab from "./components/AcompanhamentoPedidoTab";
import { mockContasBancarias } from "@/data/tesouraria";
import { naturezasOperacao, getDescritivosOperacao, temDescritivoUnico, type DescritivoOperacao } from "@/data/naturezasOperacao";
import { tiposDocumentosNF } from "@/data/documentosNF";

interface PedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pedido: PedidoCompleto) => void;
  oportunidade: any;
}

const PedidoModal = ({ isOpen, onClose, onSave, oportunidade }: PedidoModalProps) => {
  const [produtos, setProdutos] = useState<ProdutoPedido[]>([]);
  const [observacoesGerais, setObservacoesGerais] = useState('');
  const [isAdicionarProdutoOpen, setIsAdicionarProdutoOpen] = useState(false);
  
  // Estados para Itens de Uso e Consumo
  const [itensUsoConsumo, setItensUsoConsumo] = useState<ItemUsoConsumoPedido[]>([]);
  const [isAdicionarItemUCOpen, setIsAdicionarItemUCOpen] = useState(false);

  // Estados para os novos campos das abas
  const [informacoesComplementares, setInformacoesComplementares] = useState('');
  const [condicoesPagamento, setCondicoesPagamento] = useState('');
  const [destacarIR, setDestacarIR] = useState(false);
  const [percentualIR, setPercentualIR] = useState(0);
  
  // Estados para PAGAMENTO
  const [contaBancariaRecebimento, setContaBancariaRecebimento] = useState('');
  const [numeroParcelas, setNumeroParcelas] = useState(1);
  const [instrucoesBoleto, setInstrucoesBoleto] = useState('');
  const [observacoesDocumentacao, setObservacoesDocumentacao] = useState('');

  // Estado derivado do projeto (auto-preenchido)
  const projetoOrigem = oportunidade.codigo || oportunidade.id || '';
  const condicoesPagamentoProjeto = oportunidade.condicoesPagamento || '';
  
  // Frete - Seção 1: Informações Básicas
  const [tipoFrete, setTipoFrete] = useState('');
  const [prazoEntrega, setPrazoEntrega] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  
  // Frete - Seção 2: Responsabilidades
  const [fretePagarPor, setFretePagarPor] = useState('');
  const [freteRetirarPor, setFreteRetirarPor] = useState('');
  const [entregarRetirarCuidados, setEntregarRetirarCuidados] = useState('');
  
  // Frete - Seção 3: Dados do Recebedor
  const [nomeCompletoRecebedor, setNomeCompletoRecebedor] = useState('');
  const [cpfRecebedor, setCpfRecebedor] = useState('');
  const [telefoneRecebedor, setTelefoneRecebedor] = useState('');
  const [emailRecebedor, setEmailRecebedor] = useState('');
  
  // Frete - Seção 4: Detalhes da Entrega
  const [horariosPermitidos, setHorariosPermitidos] = useState('');
  const [locaisEntrega, setLocaisEntrega] = useState('');
  const [enderecoEntrega, setEnderecoEntrega] = useState('');
  const [maisInformacoesEntrega, setMaisInformacoesEntrega] = useState('');
  
  // Autorização e Urgência
  const [solicitarUrgencia, setSolicitarUrgencia] = useState(false);
  const [justificativaUrgencia, setJustificativaUrgencia] = useState('');
  const [urgenciaStatus, setUrgenciaStatus] = useState<'pendente' | 'aprovada' | 'rejeitada' | null>(null);
  const [autorizadoPor, setAutorizadoPor] = useState('');
  const [dataAutorizacao, setDataAutorizacao] = useState('');
  const [emailAutorizador, setEmailAutorizador] = useState('');

  // Configurações de Estoque
  const [temValidadeMinima, setTemValidadeMinima] = useState(false);
  const [validadeMinimaGlobal, setValidadeMinimaGlobal] = useState('');
  const [temPrevisaoConsumo, setTemPrevisaoConsumo] = useState(false);
  const [previsaoConsumoMensal, setPrevisaoConsumoMensal] = useState(0);
  const [materiaisComplementares, setMateriaisComplementares] = useState({
    cabo: false,
    nobreak: false,
    manuais: false,
    gelox: false,
    geloSeco: false,
    outrosAcessorios: false,
    especificacaoOutros: ''
  });

  // Faturamento
  const [pedidoOrigem, setPedidoOrigem] = useState('');
  const [naturezaOperacao, setNaturezaOperacao] = useState('');
  const [descritivoOperacao, setDescritivoOperacao] = useState('');
  const [descritivosFiltrados, setDescritivosFiltrados] = useState<DescritivoOperacao[]>([]);
  const [emailsNF, setEmailsNF] = useState('');
  const [formaPagamentoNF, setFormaPagamentoNF] = useState('');
  const [documentosSelecionados, setDocumentosSelecionados] = useState<string[]>([]);
  
  // Acompanhamento - Campos de entrada
  const [canhotoNota, setCanhotoNota] = useState<File | null>(null);
  const [feedbackEntregaStatus, setFeedbackEntregaStatus] = useState<'ok' | 'com_avarias' | 'temperatura_errada' | 'outros' | ''>('');
  const [feedbackEntregaOutros, setFeedbackEntregaOutros] = useState('');
  
  // Faturamento - Novos campos
  const [condicoesPagamentoFaturamento, setCondicoesPagamentoFaturamento] = useState('');
  const [documentacaoEnviadaNF, setDocumentacaoEnviadaNF] = useState('');
  

  // Auto-preencher descritivo quando operação tem apenas 1 opção
  useEffect(() => {
    if (naturezaOperacao) {
      const descritivos = getDescritivosOperacao(naturezaOperacao);
      setDescritivosFiltrados(descritivos);
      
      // Se tiver apenas 1 descritivo, preencher automaticamente
      if (temDescritivoUnico(naturezaOperacao)) {
        setDescritivoOperacao(descritivos[0].descritivo);
      } else {
        // Limpar seleção se mudar operação
        setDescritivoOperacao('');
      }
    } else {
      setDescritivosFiltrados([]);
      setDescritivoOperacao('');
    }
  }, [naturezaOperacao]);

  const handleToggleDocumento = (documento: string) => {
    setDocumentosSelecionados(prev => 
      prev.includes(documento)
        ? prev.filter(d => d !== documento)
        : [...prev, documento]
    );
  };

  const handleAdicionarProduto = (produto: ProdutoPedido) => {
    setProdutos(prev => [...prev, { ...produto, id: Date.now() }]);
    setIsAdicionarProdutoOpen(false);
  };

  const handleRemoverProduto = (id: number) => {
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  const handleAtualizarQuantidade = (id: number, quantidade: number) => {
    setProdutos(prev => prev.map(p => {
      if (p.id === id) {
        const descontoDecimal = (p.desconto || 0) / 100;
        const valorDesconto = p.precoUnitario * quantidade * descontoDecimal;
        const precoFinal = (p.precoUnitario * quantidade) - valorDesconto;
        
        return { 
          ...p, 
          quantidade,
          precoFinal 
        };
      }
      return p;
    }));
  };

  const handleAtualizarPreco = (id: number, preco: number) => {
    setProdutos(prev => prev.map(p => {
      if (p.id === id) {
        const descontoDecimal = (p.desconto || 0) / 100;
        const valorDesconto = preco * p.quantidade * descontoDecimal;
        const precoFinal = (preco * p.quantidade) - valorDesconto;
        
        return { 
          ...p, 
          precoUnitario: preco,
          precoFinal 
        };
      }
      return p;
    }));
  };

  const handleAtualizarValidadeMinima = (id: number, validade: string) => {
    setProdutos(prev => prev.map(p => 
      p.id === id ? { ...p, validadeMinima: validade } : p
    ));
  };

  const handleAtualizarDescritivoNF = (id: number, descritivo: string) => {
    setProdutos(prev => prev.map(p => 
      p.id === id ? { ...p, descritivoNF: descritivo } : p
    ));
  };

  const handleAtualizarDesconto = (produtoId: number, desconto: number) => {
    setProdutos(produtos.map(p => {
      if (p.id === produtoId) {
        const descontoDecimal = desconto / 100;
        const valorDesconto = p.precoUnitario * p.quantidade * descontoDecimal;
        const precoFinal = (p.precoUnitario * p.quantidade) - valorDesconto;
        
        return { 
          ...p, 
          desconto,
          precoFinal 
        };
      }
      return p;
    }));
  };

  const handleAtualizarObservacoes = (produtoId: number, observacoes: string) => {
    setProdutos(produtos.map(p => 
      p.id === produtoId ? { ...p, observacoes } : p
    ));
  };

  const calcularTotal = () => {
    return produtos.reduce((total, produto) => total + produto.precoFinal, 0);
  };

  const handleSalvarPedido = () => {
    const pedido: PedidoCompleto = {
      id: Date.now(),
      numeroOportunidade: oportunidade.id.toString(),
      numeroCliente: oportunidade.codigo || oportunidade.id.toString(),
      nomeCliente: oportunidade.nomeFantasia || oportunidade.cliente || '',
      cnpjCliente: oportunidade.cnpj || '',
      dataEmissao: new Date().toISOString().split('T')[0],
      projetoOrigem,
      cliente: oportunidade.nomeFantasia || oportunidade.cliente,
      vendedor: 'Usuário Atual',
      dataVenda: new Date().toISOString().split('T')[0],
      status: 'rascunho',
      produtos,
      valorTotal: calcularTotal(),
      observacoesGerais,
      // Novos campos
      informacoesComplementares,
      condicoesPagamento: condicoesPagamento || condicoesPagamentoProjeto,
      tipoFrete,
      prazoEntrega,
      dataEntrega,
      fretePagarPor,
      freteRetirarPor,
      entregarRetirarCuidados,
      nomeCompletoRecebedor,
      cpfRecebedor,
      telefoneRecebedor,
      emailRecebedor,
      horariosPermitidos,
      locaisEntrega,
      enderecoEntrega,
      maisInformacoesEntrega,
      // Urgência
      solicitarUrgencia,
      justificativaUrgencia: solicitarUrgencia ? justificativaUrgencia : undefined,
      urgenciaStatus: solicitarUrgencia ? (urgenciaStatus || 'pendente') : null,
      autorizadoPor: urgenciaStatus === 'aprovada' ? autorizadoPor : undefined,
      dataAutorizacao: urgenciaStatus === 'aprovada' ? dataAutorizacao : undefined,
      emailAutorizador: urgenciaStatus === 'aprovada' ? emailAutorizador : undefined,
      // Configurações de Estoque
      temValidadeMinima,
      validadeMinimaGlobal,
      temPrevisaoConsumo,
      previsaoConsumoMensal,
      materiaisComplementares,
      // Faturamento
      pedidoOrigem,
      naturezaOperacao,
      descritivoNaturezaOperacao: descritivoOperacao,
      emailsNF,
      formaPagamentoNF,
      contaBancariaRecebimento,
      numeroParcelas,
      instrucoesBoleto,
      documentosNF: documentosSelecionados,
      observacoesDocumentacao,
      condicoesPagamentoFaturamento,
      documentacaoEnviadaNF,
      destacarIR,
      percentualIR,
      // Acompanhamento
      canhotoNota: canhotoNota?.name,
      feedbackEntrega: feedbackEntregaStatus ? {
        statusRecebimento: feedbackEntregaStatus,
        responsavelFeedback: 'Usuário Atual',
        dataFeedback: new Date().toISOString().split('T')[0],
        outrosDetalhes: feedbackEntregaStatus === 'outros' ? feedbackEntregaOutros : undefined
      } : undefined,
      // Itens de Uso e Consumo
      itensUsoConsumo
    };
    onSave(pedido);
    onClose();
  };
  
  // Handlers para Itens de Uso e Consumo
  const handleAdicionarItemUC = (item: ItemUsoConsumoPedido) => {
    setItensUsoConsumo(prev => [...prev, { ...item, id: Date.now() }]);
    setIsAdicionarItemUCOpen(false);
  };

  const handleRemoverItemUC = (id: number) => {
    setItensUsoConsumo(prev => prev.filter(item => item.id !== id));
  };

  const handleAtualizarQuantidadeItemUC = (id: number, quantidade: number) => {
    setItensUsoConsumo(prev => prev.map(item => 
      item.id === id ? { ...item, quantidade } : item
    ));
  };

  const handleAtualizarObservacoesItemUC = (id: number, observacoes: string) => {
    setItensUsoConsumo(prev => prev.map(item => 
      item.id === id ? { ...item, observacoes } : item
    ));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getUnidadeLabel = (unidade: UnidadeVenda) => {
    switch (unidade) {
      case UnidadeVenda.UNIDADE: return 'UN';
      case UnidadeVenda.CAIXA: return 'CX';
      case UnidadeVenda.FRASCO: return 'FR';
      case UnidadeVenda.KIT: return 'KT';
      default: return 'UN';
    }
  };


  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Novo Pedido
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <Tabs defaultValue="geral" className="w-full">
              <TabsList className="flex w-full overflow-x-auto mb-6">
                <TabsTrigger value="geral" className="min-w-fit whitespace-nowrap">Geral</TabsTrigger>
                <TabsTrigger value="produtos" className="min-w-fit whitespace-nowrap">Produtos</TabsTrigger>
                <TabsTrigger value="informacoes-nf" className="min-w-fit whitespace-nowrap">Informações NF</TabsTrigger>
                <TabsTrigger value="frete" className="min-w-fit whitespace-nowrap">Frete</TabsTrigger>
                <TabsTrigger value="acompanhamento" className="min-w-fit whitespace-nowrap">Acompanhamento do Pedido</TabsTrigger>
              </TabsList>

              {/* Aba Geral */}
              <TabsContent value="geral" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Cliente</Label>
                      <Input value={oportunidade.nomeFantasia || oportunidade.cliente} disabled />
                    </div>
                    <div>
                      <Label>Vendedor</Label>
                      <Input value="Usuário Atual" disabled />
                    </div>
                    <div>
                      <Label>Data</Label>
                      <Input value={new Date().toLocaleDateString('pt-BR')} disabled />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Observações Gerais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={observacoesGerais}
                      onChange={(e) => setObservacoesGerais(e.target.value)}
                      placeholder="Observações gerais para o pedido..."
                      rows={3}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Produtos */}
              <TabsContent value="produtos" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Produtos do Pedido</CardTitle>
                    <Button 
                      onClick={() => setIsAdicionarProdutoOpen(true)}
                      className="bg-biodina-gold hover:bg-biodina-gold/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Produto
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {produtos.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Nenhum produto adicionado ao pedido</p>
                        <p className="text-sm">Clique em "Adicionar Produto" para começar</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Produto</TableHead>
                              <TableHead>Estoque</TableHead>
                              <TableHead>Quantidade</TableHead>
                              <TableHead>Unidade</TableHead>
                              <TableHead>Preço Unit.</TableHead>
                              <TableHead>Desconto%</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead>Validade Mín. Exigida</TableHead>
                              <TableHead>Descritivo do Item (para NF)</TableHead>
                              <TableHead>Observações</TableHead>
                              <TableHead className="w-20">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {produtos.map((produto) => (
                              <TableRow key={produto.id}>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{produto.codigo}</div>
                                    <div className="text-sm text-gray-500">{produto.descricao}</div>
                                    {produto.estoqueDisponivel.alertas.length > 0 && (
                                      <div className="flex gap-1 mt-1">
                                        {produto.estoqueDisponivel.alertas.map((alerta, idx) => (
                                          <Badge key={idx} variant="outline" className="text-xs">
                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                            {alerta.tipo === 'validade_proxima' ? 'Validade' : 
                                             alerta.tipo === 'multiplos_lotes' ? 'Multi-lotes' : 
                                             alerta.tipo === 'estoque_baixo' ? 'Baixo' : 
                                             alerta.tipo === 'numero_serie' ? 'Série' : 'Alerta'}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm">
                                    <div className="font-medium text-green-600">
                                      {produto.estoqueDisponivel.totalDisponivel} un
                                    </div>
                                    <div className="text-gray-500">
                                      Reservado: {produto.estoqueDisponivel.totalReservado}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={produto.quantidade}
                                    onChange={(e) => handleAtualizarQuantidade(produto.id, Number(e.target.value))}
                                    className="w-20"
                                    min="1"
                                    max={produto.estoqueDisponivel.totalDisponivel}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {getUnidadeLabel(produto.unidade)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={produto.precoUnitario}
                                    onChange={(e) => handleAtualizarPreco(produto.id, Number(e.target.value))}
                                    className="w-28"
                                    step="0.0001"
                                    min="0"
                                    placeholder="0.0000"
                                  />
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <Input
                                      type="number"
                                      value={produto.desconto || 0}
                                      onChange={(e) => handleAtualizarDesconto(produto.id, Number(e.target.value))}
                                      className="w-20"
                                      step="0.01"
                                      min="0"
                                      max="100"
                                      placeholder="0"
                                    />
                                    <span className="ml-1 text-gray-500">%</span>
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                  {formatCurrency(produto.precoFinal)}
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="date"
                                    value={produto.validadeMinima || validadeMinimaGlobal}
                                    onChange={(e) => handleAtualizarValidadeMinima(produto.id, e.target.value)}
                                    className="w-36"
                                    disabled={!temValidadeMinima}
                                    min={validadeMinimaGlobal || new Date().toISOString().split('T')[0]}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={produto.descritivoNF || ''}
                                    onChange={(e) => handleAtualizarDescritivoNF(produto.id, e.target.value)}
                                    placeholder="Descritivo para NF"
                                    className="w-40"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Textarea
                                    value={produto.observacoes || ''}
                                    onChange={(e) => handleAtualizarObservacoes(produto.id, e.target.value)}
                                    placeholder="Observações do produto"
                                    className="w-48 min-h-[60px]"
                                    rows={2}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoverProduto(produto.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    
                    {produtos.length > 0 && (
                      <div className="flex justify-end mt-4 pt-4 border-t">
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Total dos Produtos</div>
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(calcularTotal())}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Seção de Itens de Uso e Consumo */}
                <Card className="mt-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Itens de Uso e Consumo
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        ⚠️ Itens NÃO comercializados - Controle interno de estoque e reabastecimento
                      </p>
                    </div>
                    <Button 
                      onClick={() => setIsAdicionarItemUCOpen(true)}
                      variant="outline"
                      className="border-biodina-gold text-biodina-gold hover:bg-biodina-gold/10"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Item U&C
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {itensUsoConsumo.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 bg-muted/30 rounded-lg">
                        <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-medium text-base">Nenhum item de uso e consumo adicionado</p>
                        <p className="text-sm mt-1">
                          Adicione cabos, nobreaks, manuais, gelo seco e outros itens complementares
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead>Categoria</TableHead>
                              <TableHead>Quantidade</TableHead>
                              <TableHead>Unidade</TableHead>
                              <TableHead>Observações</TableHead>
                              <TableHead className="w-20">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {itensUsoConsumo.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{item.codigo}</div>
                                    <div className="text-sm text-gray-500">{item.descricao}</div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{item.categoria}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={item.quantidade}
                                    onChange={(e) => handleAtualizarQuantidadeItemUC(item.id, Number(e.target.value))}
                                    className="w-20"
                                    min="1"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Badge variant="secondary">{item.unidade}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Textarea
                                    value={item.observacoes}
                                    onChange={(e) => handleAtualizarObservacoesItemUC(item.id, e.target.value)}
                                    placeholder="Observações do item"
                                    className="w-48 min-h-[60px]"
                                    rows={2}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoverItemUC(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    
                    {itensUsoConsumo.length > 0 && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-blue-800">
                            <strong>Informação importante:</strong> Estes itens serão separados pelo estoque/expedição 
                            e não geram movimentação comercial. O controle serve para reabastecimento pelo Financeiro/Compras.
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Informações NF */}
              <TabsContent value="informacoes-nf" className="space-y-6">
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
                      <Label htmlFor="projetoOrigem">Projeto de Origem *</Label>
                      <div className="relative mt-2">
                        <Input
                          id="projetoOrigem"
                          value={projetoOrigem}
                          disabled
                          className="bg-muted/50 cursor-not-allowed pr-10"
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          Este pedido está vinculado automaticamente ao projeto de origem da oportunidade.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: Natureza da Operação */}
                <Card>
                  <CardHeader>
                    <CardTitle>Natureza da Operação</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Selecione a operação e seu descritivo específico
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="operacao">Qual natureza da operação? *</Label>
                        <Select 
                          value={naturezaOperacao} 
                          onValueChange={setNaturezaOperacao}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecione a operação" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {naturezasOperacao.map((nat) => (
                              <SelectItem key={nat.operacao} value={nat.operacao}>
                                {nat.label}
                                {temDescritivoUnico(nat.operacao) && (
                                  <span className="text-xs text-muted-foreground ml-2">
                                    (preenchimento automático)
                                  </span>
                                )}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="descritivoOperacao">
                          Descritivo da Operação *
                          {temDescritivoUnico(naturezaOperacao) && (
                            <span className="text-xs text-green-600 dark:text-green-400 ml-2">
                              ✓ Preenchido automaticamente
                            </span>
                          )}
                        </Label>
                        <Select 
                          value={descritivoOperacao} 
                          onValueChange={setDescritivoOperacao}
                          disabled={!naturezaOperacao || temDescritivoUnico(naturezaOperacao)}
                        >
                          <SelectTrigger className={`mt-2 ${temDescritivoUnico(naturezaOperacao) ? 'bg-muted/50 cursor-not-allowed' : ''}`}>
                            <SelectValue placeholder={
                              !naturezaOperacao 
                                ? "Selecione primeiro a operação" 
                                : "Selecione o descritivo"
                            } />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {descritivosFiltrados.map((desc) => (
                              <SelectItem 
                                key={`${naturezaOperacao}-${desc.numero}`} 
                                value={desc.descritivo}
                              >
                                {desc.descritivo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Informação visual sobre a seleção */}
                    {naturezaOperacao && descritivoOperacao && (
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <strong className="text-green-800 dark:text-green-300">Operação selecionada:</strong>
                            <p className="text-green-700 dark:text-green-400 mt-1">
                              {naturezasOperacao.find(n => n.operacao === naturezaOperacao)?.label} - {descritivoOperacao}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Card 3: Configurações Fiscais */}
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Fiscais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <Label htmlFor="destacarIR" className="text-base font-medium cursor-pointer">
                          Deve destacar IR?
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Destacar Imposto de Renda na nota fiscal
                        </p>
                      </div>
                      <Switch
                        id="destacarIR"
                        checked={destacarIR}
                        onCheckedChange={setDestacarIR}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="percentualIR">Percentual de IR (%)</Label>
                        <Input
                          id="percentualIR"
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={percentualIR}
                          onChange={(e) => setPercentualIR(parseFloat(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 4: Comunicação e Envio */}
                <Card>
                  <CardHeader>
                    <CardTitle>Comunicação e Envio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="emailsNF">E-mails para envio das notas fiscais</Label>
                      <Textarea
                        id="emailsNF"
                        value={emailsNF}
                        onChange={(e) => setEmailsNF(e.target.value)}
                        placeholder="exemplo@email.com, outro@email.com"
                        rows={3}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Separe múltiplos e-mails por vírgula</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 5: PAGAMENTO */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="formaPagamentoNF">Forma de Pagamento *</Label>
                        <Select value={formaPagamentoNF} onValueChange={setFormaPagamentoNF}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecione a forma de pagamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a_vista">À Vista</SelectItem>
                            <SelectItem value="boleto">Boleto</SelectItem>
                            <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                            <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                            <SelectItem value="cheque">Cheque</SelectItem>
                            <SelectItem value="parcelado">Parcelado</SelectItem>
                            <SelectItem value="deposito">Depósito</SelectItem>
                            <SelectItem value="pix">PIX</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="condicoesPagamento">Condições de Pagamento *</Label>
                        <div className="relative mt-2">
                          <Input
                            id="condicoesPagamento"
                            value={condicoesPagamento || condicoesPagamentoProjeto}
                            onChange={(e) => setCondicoesPagamento(e.target.value)}
                            placeholder="Ex: 30/60/90 dias"
                            className={condicoesPagamentoProjeto ? "bg-muted/30" : ""}
                          />
                          {condicoesPagamentoProjeto && (
                            <span className="text-xs text-muted-foreground ml-1 mt-1 block">
                              (pré-preenchido do projeto)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="contaBancaria">Conta Bancária para Recebimento *</Label>
                      <Select value={contaBancariaRecebimento} onValueChange={setContaBancariaRecebimento}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Selecione a conta bancária" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockContasBancarias
                            .filter(c => c.status === 'Ativa')
                            .map(conta => (
                              <SelectItem key={conta.id} value={conta.id}>
                                {conta.banco} - Ag: {conta.agencia} - Conta: {conta.conta}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {contaBancariaRecebimento && (() => {
                      const contaSelecionada = mockContasBancarias.find(c => c.id === contaBancariaRecebimento);
                      return contaSelecionada && (
                        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Dados Bancários Selecionados:
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">🏦 Banco:</span>
                              <span className="font-medium">{contaSelecionada.banco}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">🔢 Agência:</span>
                              <span className="font-medium">{contaSelecionada.agencia}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">💳 Conta:</span>
                              <span className="font-medium">{contaSelecionada.conta} ({contaSelecionada.tipo})</span>
                            </div>
                            {contaSelecionada.gerente && (
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">👤 Gerente:</span>
                                <span className="font-medium">{contaSelecionada.gerente}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                    
                    {(formaPagamentoNF === 'parcelado' || formaPagamentoNF === 'boleto') && (
                      <div>
                        <Label htmlFor="numeroParcelas">Número de Parcelas *</Label>
                        <Input
                          id="numeroParcelas"
                          type="number"
                          value={numeroParcelas}
                          onChange={(e) => setNumeroParcelas(Number(e.target.value))}
                          min="1"
                          max="12"
                          className="mt-2 w-32"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {numeroParcelas > 1 ? `${numeroParcelas}x de ${formatCurrency(calcularTotal() / numeroParcelas)}` : 'Pagamento à vista'}
                        </p>
                      </div>
                    )}
                    
                    {formaPagamentoNF === 'boleto' && (
                      <>
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-300 dark:border-yellow-800">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-yellow-800 dark:text-yellow-300">
                              <strong>ATENÇÃO:</strong> O departamento de faturamento deverá emitir {numeroParcelas > 1 ? `${numeroParcelas} boletos` : 'o boleto'} e anexar junto à Nota Fiscal antes do envio ao cliente.
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="instrucoesBoleto">Instruções para o Boleto (opcional)</Label>
                          <Textarea
                            id="instrucoesBoleto"
                            value={instrucoesBoleto}
                            onChange={(e) => setInstrucoesBoleto(e.target.value)}
                            placeholder="Ex: Não aceitar pagamento em cheque, multa de 2% após vencimento..."
                            rows={3}
                            className="mt-2"
                          />
                        </div>
                      </>
                    )}
                    
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          💡 Estas informações serão incluídas automaticamente nas <strong>informações complementares da Nota Fiscal</strong>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 6: DOCUMENTAÇÃO */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documentação para Envio junto à NF
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          ℹ️ A documentação pode vir pré-selecionada do projeto inicial pela equipe comercial
                        </p>
                      </div>
                    </div>
                    
                    {/* Select Multi-escolha */}
                    <div>
                      <Label htmlFor="documentosNF">Documentos a serem enviados</Label>
                      <Select 
                        value="" 
                        onValueChange={(value) => {
                          if (value && !documentosSelecionados.includes(value)) {
                            handleToggleDocumento(value);
                          }
                        }}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder={
                            documentosSelecionados.length === 0 
                              ? "Selecione os documentos..." 
                              : `${documentosSelecionados.length} documento(s) selecionado(s)`
                          } />
                        </SelectTrigger>
                        <SelectContent className="max-h-[400px]">
                          {tiposDocumentosNF
                            .filter(doc => !documentosSelecionados.includes(doc))
                            .map(doc => (
                              <SelectItem key={doc} value={doc}>
                                {doc}
                              </SelectItem>
                            ))
                          }
                          {tiposDocumentosNF.every(doc => documentosSelecionados.includes(doc)) && (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                              Todos os documentos já foram selecionados
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Clique para adicionar documentos à lista. Você pode selecionar múltiplos documentos.
                      </p>
                    </div>
                    
                    {/* Lista de documentos selecionados */}
                    {documentosSelecionados.length > 0 && (
                      <div className="border rounded-lg p-3 space-y-2 bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">
                            Documentos Selecionados ({documentosSelecionados.length})
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDocumentosSelecionados([])}
                            className="h-7 text-xs"
                          >
                            Limpar todos
                          </Button>
                        </div>
                        <div className="space-y-1 max-h-[300px] overflow-y-auto">
                          {documentosSelecionados.map(doc => (
                            <div 
                              key={doc}
                              className="flex items-center justify-between p-2 bg-background rounded border hover:border-primary/50 transition-colors"
                            >
                              <span className="text-sm flex-1">{doc}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleDocumento(doc)}
                                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Campo Observações (mantido) */}
                    <div>
                      <Label htmlFor="observacoesDocumentacao">Observações sobre a Documentação</Label>
                      <Textarea
                        id="observacoesDocumentacao"
                        value={observacoesDocumentacao}
                        onChange={(e) => setObservacoesDocumentacao(e.target.value)}
                        placeholder="Instruções especiais sobre documentos..."
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                    
                    {/* Novos campos */}
                    <div>
                      <Label htmlFor="condicoesPagamentoFaturamento">Condições (parcelas, vencimentos)</Label>
                      <Textarea
                        id="condicoesPagamentoFaturamento"
                        value={condicoesPagamentoFaturamento}
                        onChange={(e) => setCondicoesPagamentoFaturamento(e.target.value)}
                        placeholder="Ex: Entrada + 2x30/60 dias, Vencimento: todo dia 10..."
                        rows={2}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="documentacaoEnviadaNF">Documentação enviada junto à NF</Label>
                      <Textarea
                        id="documentacaoEnviadaNF"
                        value={documentacaoEnviadaNF}
                        onChange={(e) => setDocumentacaoEnviadaNF(e.target.value)}
                        placeholder="Liste a documentação que será enviada junto com a nota fiscal..."
                        rows={2}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informações Complementares da NF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={informacoesComplementares}
                      onChange={(e) => setInformacoesComplementares(e.target.value)}
                      placeholder="Informações complementares que aparecerão na nota fiscal..."
                      rows={4}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Frete */}
              <TabsContent value="frete" className="space-y-6">
                {/* Seção 1: Informações Básicas de Frete */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Básicas de Frete</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Preencha as informações básicas de entrega
                    </p>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    {/* Tipo de Frete */}
                    <div>
                      <Label htmlFor="tipoFrete">Tipo de Frete *</Label>
                      <Select value={tipoFrete} onValueChange={setTipoFrete}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cif">CIF (Por conta do remetente)</SelectItem>
                          <SelectItem value="fob">FOB (Por conta do destinatário)</SelectItem>
                          <SelectItem value="terceiros">Terceiros</SelectItem>
                          <SelectItem value="sem_frete">Sem frete</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Prazo Máximo de Entrega */}
                    <div>
                      <Label htmlFor="prazoEntrega" className="flex items-center gap-2">
                        Prazo Máximo de Entrega *
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[300px]">
                              <p>Prazo máximo que o cliente precisa receber o material. O estoque informará depois quando receberá efetivamente.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input
                        id="prazoEntrega"
                        value={prazoEntrega}
                        onChange={(e) => setPrazoEntrega(e.target.value)}
                        placeholder="Ex: 5 dias úteis"
                      />
                    </div>

                    {/* Data de Entrega Agendada */}
                    <div className="col-span-2">
                      <Label htmlFor="dataEntrega" className="flex items-center gap-2">
                        Data de Entrega (Agendada)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[300px]">
                              <p>Use apenas se houver agendamento direto com o cliente</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input
                        id="dataEntrega"
                        type="date"
                        value={dataEntrega}
                        onChange={(e) => setDataEntrega(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Seção 2: Responsabilidades */}
                <Card>
                  <CardHeader>
                    <CardTitle>Responsabilidades</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-4">
                     <div>
                       <Label htmlFor="fretePagarPor">Frete a Pagar Por</Label>
                       <Select value={fretePagarPor} onValueChange={setFretePagarPor}>
                         <SelectTrigger>
                           <SelectValue placeholder="Selecione quem pagará o frete" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="cliente">CLIENTE</SelectItem>
                           <SelectItem value="representante">REPRESENTANTE</SelectItem>
                           <SelectItem value="empresa">EMPRESA</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                     <div>
                       <Label htmlFor="freteRetirarPor">Frete a Retirar Por</Label>
                       <Select value={freteRetirarPor} onValueChange={setFreteRetirarPor}>
                         <SelectTrigger>
                           <SelectValue placeholder="Selecione quem retirará" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="cliente">CLIENTE</SelectItem>
                           <SelectItem value="representante">REPRESENTANTE</SelectItem>
                           <SelectItem value="portador_interno">PORTADOR INTERNO</SelectItem>
                           <SelectItem value="destino_final">DESTINO FINAL</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                     <div>
                       <Label htmlFor="entregarRetirarCuidados">Entregar/Retirar aos Cuidados de Quem</Label>
                       <Input
                         id="entregarRetirarCuidados"
                         value={entregarRetirarCuidados}
                         onChange={(e) => setEntregarRetirarCuidados(e.target.value)}
                         placeholder="Nome da pessoa responsável pelo recebimento"
                       />
                     </div>
                  </CardContent>
                </Card>

                {/* Seção 3: Dados do Recebedor */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados do Recebedor</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nomeCompletoRecebedor">Nome Completo</Label>
                      <Input
                        id="nomeCompletoRecebedor"
                        value={nomeCompletoRecebedor}
                        onChange={(e) => setNomeCompletoRecebedor(e.target.value)}
                        placeholder="Nome completo do recebedor"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpfRecebedor">CPF</Label>
                      <Input
                        id="cpfRecebedor"
                        value={cpfRecebedor}
                        onChange={(e) => setCpfRecebedor(e.target.value)}
                        placeholder="000.000.000-00"
                        maxLength={14}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefoneRecebedor">Telefone</Label>
                      <Input
                        id="telefoneRecebedor"
                        value={telefoneRecebedor}
                        onChange={(e) => setTelefoneRecebedor(e.target.value)}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emailRecebedor">Email</Label>
                      <Input
                        id="emailRecebedor"
                        type="email"
                        value={emailRecebedor}
                        onChange={(e) => setEmailRecebedor(e.target.value)}
                        placeholder="recebedor@empresa.com"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Seção 4: Detalhes da Entrega */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detalhes da Entrega</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="horariosPermitidos">Horários Permitidos para Entrega</Label>
                      <Input
                        id="horariosPermitidos"
                        value={horariosPermitidos}
                        onChange={(e) => setHorariosPermitidos(e.target.value)}
                        placeholder="Ex: Segunda a Sexta, 8h às 17h"
                      />
                    </div>
                    <div>
                      <Label htmlFor="locaisEntrega">Locais de Entrega Permitidos</Label>
                      <Textarea
                        id="locaisEntrega"
                        value={locaisEntrega}
                        onChange={(e) => setLocaisEntrega(e.target.value)}
                        placeholder="Descreva os locais onde a entrega pode ser realizada (recepção, almoxarifado, etc.)"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="enderecoEntrega">Endereço Completo de Entrega</Label>
                      <Textarea
                        value={enderecoEntrega}
                        onChange={(e) => setEnderecoEntrega(e.target.value)}
                        placeholder="Endereço completo para entrega (incluir pontos de referência se necessário)..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maisInformacoesEntrega">Mais Informações sobre a Entrega</Label>
                      <Textarea
                        id="maisInformacoesEntrega"
                        value={maisInformacoesEntrega}
                        onChange={(e) => setMaisInformacoesEntrega(e.target.value)}
                        placeholder="Informações adicionais importantes para a entrega..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Seção 5: Urgência e Autorização */}
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
                    {/* Checkbox para solicitar urgência */}
                    <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
                      <Checkbox 
                        id="solicitarUrgencia" 
                        checked={solicitarUrgencia}
                        onCheckedChange={(checked) => {
                          setSolicitarUrgencia(checked as boolean);
                          if (!checked) {
                            setJustificativaUrgencia('');
                            setUrgenciaStatus(null);
                          }
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor="solicitarUrgencia" className="font-semibold cursor-pointer">
                          Solicitar urgência ao gestor
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Marque se esta entrega precisa de aprovação de urgência do gestor
                        </p>
                      </div>
                    </div>

                    {/* Campo de justificativa (aparece quando marcado) */}
                    {solicitarUrgencia && (
                      <>
                        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                          <div className="flex items-start gap-2 mb-3">
                            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-orange-800 dark:text-orange-300">
                              <strong>Atenção:</strong> Esta solicitação será enviada ao gestor para aprovação. Justifique claramente o motivo da urgência.
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="justificativaUrgencia" className="text-orange-700 dark:text-orange-400 font-semibold">
                            Justificar a Urgência *
                          </Label>
                          <Textarea
                            id="justificativaUrgencia"
                            value={justificativaUrgencia}
                            onChange={(e) => setJustificativaUrgencia(e.target.value)}
                            placeholder="Explique detalhadamente por que esta entrega é urgente e precisa de aprovação do gestor..."
                            rows={4}
                            required
                            className="mt-2 border-orange-300 dark:border-orange-700 focus:border-orange-500"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Seja específico sobre prazos, comprometimentos com cliente, etc.
                          </p>
                        </div>

                        {/* Informações de autorização (preenchidas automaticamente pelo sistema) */}
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Informações de Autorização (Preenchimento Automático)
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="space-y-1">
                              <p className="text-muted-foreground text-xs">Autorizado Por:</p>
                              <p className="font-medium text-blue-700 dark:text-blue-300">
                                {urgenciaStatus === 'aprovada' ? autorizadoPor || 'Aguardando aprovação' : 'Aguardando aprovação'}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground text-xs">Data de Autorização:</p>
                              <p className="font-medium text-blue-700 dark:text-blue-300">
                                {urgenciaStatus === 'aprovada' && dataAutorizacao 
                                  ? new Date(dataAutorizacao).toLocaleDateString('pt-BR') 
                                  : 'Aguardando aprovação'}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground text-xs">Email do Autorizador:</p>
                              <p className="font-medium text-blue-700 dark:text-blue-300 truncate">
                                {urgenciaStatus === 'aprovada' ? emailAutorizador || 'Aguardando aprovação' : 'Aguardando aprovação'}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3 italic">
                            ℹ️ Estes campos serão preenchidos automaticamente quando o gestor aprovar a solicitação
                          </p>
                        </div>

                        {/* Status da solicitação */}
                        {urgenciaStatus && (
                          <div className={`p-3 rounded-lg border flex items-center gap-2 ${
                            urgenciaStatus === 'aprovada' 
                              ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                              : urgenciaStatus === 'rejeitada'
                              ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                              : 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800'
                          }`}>
                            {urgenciaStatus === 'aprovada' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                            {urgenciaStatus === 'rejeitada' && <XCircle className="h-5 w-5 text-red-600" />}
                            {urgenciaStatus === 'pendente' && <Clock className="h-5 w-5 text-yellow-600" />}
                            <span className="text-sm font-medium">
                              {urgenciaStatus === 'aprovada' && 'Urgência aprovada pelo gestor'}
                              {urgenciaStatus === 'rejeitada' && 'Urgência rejeitada pelo gestor'}
                              {urgenciaStatus === 'pendente' && 'Aguardando aprovação do gestor'}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Acompanhamento do Pedido */}
              <TabsContent value="acompanhamento" className="space-y-6">
                {/* Card de Entrada de Dados do Acompanhamento */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informações de Entrega</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="canhotoNota">Canhoto da Nota</Label>
                        <div className="mt-2">
                          <Input
                            id="canhotoNota"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setCanhotoNota(file);
                              }
                            }}
                            className="cursor-pointer"
                          />
                          {canhotoNota && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Arquivo selecionado: {canhotoNota.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="feedbackEntrega">Feedback de Entrega</Label>
                        <Select value={feedbackEntregaStatus} onValueChange={(value: any) => setFeedbackEntregaStatus(value)}>
                          <SelectTrigger id="feedbackEntrega">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ok">Recebido OK</SelectItem>
                            <SelectItem value="com_avarias">Recebido com avarias</SelectItem>
                            <SelectItem value="temperatura_errada">Recebido em temperatura errada</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {feedbackEntregaStatus === 'outros' && (
                        <div>
                          <Label htmlFor="feedbackEntregaOutros">Especificar</Label>
                          <Input
                            id="feedbackEntregaOutros"
                            value={feedbackEntregaOutros}
                            onChange={(e) => setFeedbackEntregaOutros(e.target.value)}
                            placeholder="Descreva o feedback de entrega"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <AcompanhamentoPedidoTab
                  pedido={{
                    id: 12345,
                    numeroOportunidade: oportunidade.codigo || oportunidade.id || 'OPP-2025-001',
                    numeroCliente: oportunidade.codigo || '',
                    nomeCliente: oportunidade.nomeFantasia || oportunidade.cliente || '',
                    cnpjCliente: oportunidade.cnpj || '',
                    dataEmissao: new Date().toISOString().split('T')[0],
                    cliente: oportunidade.nomeFantasia || oportunidade.cliente,
                    vendedor: 'Usuário Atual',
                    dataVenda: new Date().toISOString().split('T')[0],
                    status: 'enviado',
                    statusAtual: 'em_transito',
                    produtos,
                    valorTotal: calcularTotal(),
                    timeline: [
                      {
                        status: 'enviado',
                        data: '12/01/2025',
                        hora: '10:30',
                        responsavel: 'João Vendedor',
                        observacoes: 'Pedido criado e enviado para processamento'
                      },
                      {
                        status: 'recebido_estoque',
                        data: '13/01/2025',
                        hora: '08:15',
                        responsavel: 'Maria Silva (Estoque)',
                        observacoes: 'Pedido recebido pelo departamento de estoque'
                      },
                      {
                        status: 'em_separacao',
                        data: '13/01/2025',
                        hora: '14:20',
                        responsavel: 'Carlos Santos (Expedição)',
                        observacoes: 'Iniciada separação dos itens'
                      },
                      {
                        status: 'pronto_faturamento',
                        data: '14/01/2025',
                        hora: '09:00',
                        responsavel: 'Ana Costa (Expedição)',
                        observacoes: 'Separação concluída, pronto para faturamento'
                      },
                      {
                        status: 'faturado',
                        data: '14/01/2025',
                        hora: '11:30',
                        responsavel: 'Pedro Oliveira (Faturamento)',
                        observacoes: 'Nota fiscal emitida com sucesso'
                      },
                      {
                        status: 'em_transito',
                        data: '14/01/2025',
                        hora: '16:00',
                        responsavel: 'Sistema Logística',
                        observacoes: 'Material coletado pela transportadora'
                      }
                    ],
                    recebimentoEstoque: {
                      status: 'pronto_faturamento',
                      dataRecebimento: '13/01/2025',
                      horaRecebimento: '08:15',
                      responsavel: 'Maria Silva (Estoque)',
                      numeroLote: 'LT-2025-001',
                      referenciaInterna: 'REF-12345-ESTQ',
                      itensConferidos: [
                        {
                          produtoId: 1,
                          codigoProduto: 'PRD-001',
                          descricao: 'Reagente Diagnóstico A',
                          quantidadeSolicitada: 10,
                          quantidadeConferida: 10,
                          divergencia: false
                        },
                        {
                          produtoId: 2,
                          codigoProduto: 'PRD-002',
                          descricao: 'Kit Análise Laboratorial B',
                          quantidadeSolicitada: 5,
                          quantidadeConferida: 4,
                          divergencia: true,
                          tipoDivergencia: 'dano',
                          observacoes: '1 caixa com avaria na embalagem externa, produto interno íntegro'
                        },
                        {
                          produtoId: 3,
                          codigoProduto: 'PRD-003',
                          descricao: 'Equipamento Portátil C',
                          quantidadeSolicitada: 2,
                          quantidadeConferida: 2,
                          divergencia: false
                        }
                      ],
                      observacoesDivergencia: 'PRD-002: 1 caixa com avaria na embalagem. Cliente foi informado e aceitou receber o produto com desconto de 10%.',
                      dataSaidaPrevista: '14/01/2025',
                      dataSaidaEfetiva: '14/01/2025 15:45'
                    },
                    faturamento: {
                      numeroNF: '000012345',
                      serieNF: '1',
                      dataEmissao: '14/01/2025',
                      valorTotal: 15750.00,
                      chaveAcesso: '35250112345678000190550010000123451234567890',
                      statusSefaz: 'autorizada',
                      protocolo: '135250000012345',
                      linkXML: '/documentos/nfe/12345.xml',
                      linkDANFE: '/documentos/nfe/12345.pdf',
                      boleto: {
                        numeroDocumento: '00001-2025',
                        dataVencimento: '28/02/2025',
                        valor: 5250.00,
                        linkBoleto: '/documentos/boletos/00001-2025.pdf',
                        codigoBarras: '34191.79001 01234.567890 12345.678901 1 99990000525000',
                        linhaDigitavel: '34191790010123456789012345678901199990000525000'
                      },
                      gnre: {
                        numeroGuia: 'GNRE-987654',
                        dataVencimento: '28/02/2025',
                        valor: 450.00,
                        linkGNRE: '/documentos/gnre/987654.pdf'
                      },
                      condicoesPagamento: condicoesPagamentoFaturamento || 'Entrada + 2x30/60 dias',
                      documentacaoEnviada: documentacaoEnviadaNF || 'Certificado de Qualidade, Manual de Uso',
                      documentosAnexos: [
                        {
                          id: 'doc-1',
                          tipo: 'Certificado de Qualidade',
                          nome: 'certificado_qualidade.pdf',
                          url: '/documentos/anexos/cert_qual.pdf',
                          dataUpload: '14/01/2025 11:45'
                        }
                      ]
                    },
                    logistica: {
                      transportadora: {
                        nome: 'Transportadora XYZ Ltda',
                        cnpj: '12.345.678/0001-90',
                        telefone: '(11) 1234-5678',
                        email: 'contato@transportadoraxyz.com.br',
                        custoFrete: 350.00
                      },
                      conhecimentoTransporte: {
                        numeroCTe: '000054321',
                        serieCTe: '1',
                        chaveAcesso: '35250112345678000190570010000543211234567890',
                        linkRastreamento: 'https://rastreamento.transportadoraxyz.com.br/54321',
                        protocolo: '135250000054321'
                      },
                      statusEntrega: 'em_transito',
                      prazoEstimado: '5 dias úteis',
                      dataSaida: '14/01/2025 16:00',
                      previsaoEntrega: '21/01/2025',
                      dataEntregaEfetiva: undefined
                    }
                  }} 
                />
              </TabsContent>

            </Tabs>

            {/* Botões */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSalvarPedido}
                disabled={produtos.length === 0 || (solicitarUrgencia && !justificativaUrgencia.trim())}
                className="bg-biodina-gold hover:bg-biodina-gold/90"
              >
                Salvar Pedido
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AdicionarProdutoModal
        isOpen={isAdicionarProdutoOpen}
        onClose={() => setIsAdicionarProdutoOpen(false)}
        onAdicionarProduto={handleAdicionarProduto}
      />
      
      <AdicionarItemUsoConsumoModal
        isOpen={isAdicionarItemUCOpen}
        onClose={() => setIsAdicionarItemUCOpen(false)}
        onAdicionarItem={handleAdicionarItemUC}
      />
    </>
  );
};

export default PedidoModal;
