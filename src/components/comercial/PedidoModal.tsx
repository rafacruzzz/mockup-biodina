
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
import { Plus, X, Trash2, Info, ShoppingCart, AlertTriangle, Package, Link as LinkIcon, Lock, Wallet, Building, FileText } from "lucide-react";
import { ProdutoPedido, PedidoCompleto, UnidadeVenda, ItemUsoConsumoPedido } from "@/types/comercial";
import AdicionarProdutoModal from "./AdicionarProdutoModal";
import AdicionarItemUsoConsumoModal from "./AdicionarItemUsoConsumoModal";
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
  
  // Estados para PAGAMENTO
  const [contaBancariaRecebimento, setContaBancariaRecebimento] = useState('');
  const [numeroParcelas, setNumeroParcelas] = useState(1);
  const [instrucoesBoleto, setInstrucoesBoleto] = useState('');
  const [observacoesDocumentacao, setObservacoesDocumentacao] = useState('');

  // Estado derivado do projeto (auto-preenchido)
  const projetoOrigem = oportunidade.codigo || oportunidade.id || '';
  const condicoesPagamentoProjeto = oportunidade.condicoesPagamento || '';
  
  // Frete - Seção 1: Informações Básicas
  const [valorFrete, setValorFrete] = useState(0);
  const [tipoFrete, setTipoFrete] = useState('');
  const [transportadora, setTransportadora] = useState('');
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
  
  // Frete - Seção 5: Urgência (já existe mas melhorado)
  const [observacoesFrete, setObservacoesFrete] = useState('');
  const [conhecimento, setConhecimento] = useState('');
  
  // Autorização
  const [urgente, setUrgente] = useState(false);
  const [justificativaUrgencia, setJustificativaUrgencia] = useState('');
  const [autorizadoPor, setAutorizadoPor] = useState('');
  const [dataAutorizacao, setDataAutorizacao] = useState('');
  const [emailAutorizador, setEmailAutorizador] = useState('');
  const [observacoesAutorizacao, setObservacoesAutorizacao] = useState('');

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
  
  // Controle de Canhoto
  const [exigeCanhoto, setExigeCanhoto] = useState(false);
  const [observacoesCanhoto, setObservacoesCanhoto] = useState('');

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
      valorFrete,
      tipoFrete,
      transportadora,
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
      observacoesFrete,
      conhecimento,
      urgente,
      justificativaUrgencia,
      autorizadoPor,
      dataAutorizacao,
      emailAutorizador,
      observacoesAutorizacao,
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
      destacarIR,
      // Controle de Canhoto
      exigeCanhoto,
      observacoesCanhoto: exigeCanhoto ? observacoesCanhoto : undefined,
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

  // Handler para o checkbox urgente
  const handleUrgenteChange = (checked: boolean | "indeterminate") => {
    setUrgente(checked === true);
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

                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Estoque</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Validade Mínima */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="validade-minima" className="text-base font-medium">
                          Validade Mínima?
                        </Label>
                        <Switch
                          id="validade-minima"
                          checked={temValidadeMinima}
                          onCheckedChange={setTemValidadeMinima}
                        />
                      </div>
                      
                      {temValidadeMinima && (
                        <div>
                          <Label htmlFor="validade-minima-data">Qual validade mínima permitida?</Label>
                          <Input
                            id="validade-minima-data"
                            type="date"
                            value={validadeMinimaGlobal}
                            onChange={(e) => setValidadeMinimaGlobal(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="mt-2"
                          />
                        </div>
                      )}
                    </div>

                    {/* Previsão de Consumo */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="previsao-consumo" className="text-base font-medium">
                          Previsão de consumo?
                        </Label>
                        <Switch
                          id="previsao-consumo"
                          checked={temPrevisaoConsumo}
                          onCheckedChange={setTemPrevisaoConsumo}
                        />
                      </div>
                      
                      {temPrevisaoConsumo && (
                        <div>
                          <Label htmlFor="previsao-consumo-mensal">Qual previsão de consumo mensal?</Label>
                          <Input
                            id="previsao-consumo-mensal"
                            type="number"
                            value={previsaoConsumoMensal}
                            onChange={(e) => setPrevisaoConsumoMensal(Number(e.target.value))}
                            min="0"
                            placeholder="0"
                            className="mt-2"
                          />
                        </div>
                      )}
                    </div>

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
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valorFrete">Valor do Frete</Label>
                      <Input
                        id="valorFrete"
                        type="number"
                        value={valorFrete}
                        onChange={(e) => setValorFrete(Number(e.target.value))}
                        step="0.01"
                        min="0"
                        placeholder="0,00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tipoFrete">Tipo de Frete</Label>
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
                    <div>
                      <Label htmlFor="transportadora">Transportadora</Label>
                      <Input
                        id="transportadora"
                        value={transportadora}
                        onChange={(e) => setTransportadora(e.target.value)}
                        placeholder="Nome da transportadora"
                      />
                    </div>
                    <div>
                      <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
                      <Input
                        id="prazoEntrega"
                        value={prazoEntrega}
                        onChange={(e) => setPrazoEntrega(e.target.value)}
                        placeholder="Ex: 5 dias úteis"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dataEntrega">Data de Entrega</Label>
                      <Input
                        id="dataEntrega"
                        type="date"
                        value={dataEntrega}
                        onChange={(e) => setDataEntrega(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="conhecimento">Conhecimento</Label>
                      <Input
                        id="conhecimento"
                        value={conhecimento}
                        onChange={(e) => setConhecimento(e.target.value)}
                        placeholder="Número do conhecimento"
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

                {/* Seção 5: Controle de Canhoto */}
                <Card>
                  <CardHeader>
                    <CardTitle>Controle de Canhoto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Exige canhoto assinado?</Label>
                        <p className="text-xs text-muted-foreground">Marque se for necessário comprovante de entrega assinado</p>
                      </div>
                      <Switch
                        checked={exigeCanhoto}
                        onCheckedChange={setExigeCanhoto}
                      />
                    </div>
                    
                    {exigeCanhoto && (
                      <div>
                        <Label htmlFor="observacoesCanhoto">Observações sobre o canhoto</Label>
                        <Textarea
                          id="observacoesCanhoto"
                          value={observacoesCanhoto}
                          onChange={(e) => setObservacoesCanhoto(e.target.value)}
                          placeholder="Instruções especiais sobre o canhoto de entrega..."
                          rows={3}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Seção 6: Urgência e Autorização */}
                <Card>
                  <CardHeader>
                    <CardTitle>Urgência e Autorização</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="urgenteFreteTab" 
                        checked={urgente}
                        onCheckedChange={handleUrgenteChange}
                      />
                      <Label htmlFor="urgenteFreteTab">Esta entrega é urgente</Label>
                    </div>

                    {urgente && (
                      <>
                        <div>
                          <Label htmlFor="justificativaUrgenciaFrete">Justificar a Urgência *</Label>
                          <Textarea
                            id="justificativaUrgenciaFrete"
                            value={justificativaUrgencia}
                            onChange={(e) => setJustificativaUrgencia(e.target.value)}
                            placeholder="Por que esta entrega é urgente?"
                            rows={3}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="autorizadoPorFrete">Autorizado Por</Label>
                            <Input
                              id="autorizadoPorFrete"
                              value={autorizadoPor}
                              onChange={(e) => setAutorizadoPor(e.target.value)}
                              placeholder="Nome do autorizador"
                            />
                          </div>
                          <div>
                            <Label htmlFor="dataAutorizacaoFrete">Data de Autorização</Label>
                            <Input
                              id="dataAutorizacaoFrete"
                              type="date"
                              value={dataAutorizacao}
                              onChange={(e) => setDataAutorizacao(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="emailAutorizadorFrete">Email do Autorizador</Label>
                          <Input
                            id="emailAutorizadorFrete"
                            type="email"
                            value={emailAutorizador}
                            onChange={(e) => setEmailAutorizador(e.target.value)}
                            placeholder="autorizador@empresa.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="observacoesAutorizacaoFrete">Observações de Autorização</Label>
                          <Textarea
                            id="observacoesAutorizacaoFrete"
                            value={observacoesAutorizacao}
                            onChange={(e) => setObservacoesAutorizacao(e.target.value)}
                            placeholder="Observações sobre a autorização do pedido..."
                            rows={3}
                          />
                        </div>
                      </>
                    )}
                    
                    <div>
                      <Label htmlFor="observacoesFreteGeral">Observações Gerais do Frete</Label>
                      <Textarea
                        id="observacoesFreteGeral"
                        value={observacoesFrete}
                        onChange={(e) => setObservacoesFrete(e.target.value)}
                        placeholder="Observações específicas sobre o frete e entrega..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>

            {/* Botões */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSalvarPedido}
                disabled={produtos.length === 0 || (urgente && !justificativaUrgencia.trim())}
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
