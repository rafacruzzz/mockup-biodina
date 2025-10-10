import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Trash2, Info, ShoppingCart, AlertTriangle, Package, Lock, Wallet, Building, FileText, Save } from "lucide-react";
import { ProdutoPedido, PedidoEmprestimo, UnidadeVenda } from "@/types/comercial";
import AdicionarProdutoModal from "./AdicionarProdutoModal";
import AcompanhamentoPedidoTab from "./components/AcompanhamentoPedidoTab";
import { mockContasBancarias } from "@/data/tesouraria";
import { naturezasOperacao, getDescritivosOperacao, temDescritivoUnico, type DescritivoOperacao } from "@/data/naturezasOperacao";
import { tiposDocumentosNF } from "@/data/documentosNF";
import { toast } from "sonner";

interface PedidoEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pedido: PedidoEmprestimo) => void;
  pedidoInicial?: PedidoEmprestimo | null;
  dadosEmprestimo: {
    numeroProcesso: string;
    cliente: string;
    cnpj: string;
    moeda: 'BRL' | 'USD';
  };
}

const PedidoEmprestimoModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  pedidoInicial,
  dadosEmprestimo 
}: PedidoEmprestimoModalProps) => {
  const [produtos, setProdutos] = useState<ProdutoPedido[]>(pedidoInicial?.produtos || []);
  const [observacoesGerais, setObservacoesGerais] = useState(pedidoInicial?.observacoesGerais || '');
  const [isAdicionarProdutoOpen, setIsAdicionarProdutoOpen] = useState(false);

  // Configurações de Estoque
  const [temValidadeMinima, setTemValidadeMinima] = useState(pedidoInicial?.temValidadeMinima || false);
  const [validadeMinimaGlobal, setValidadeMinimaGlobal] = useState(pedidoInicial?.validadeMinimaGlobal || '');
  const [temPrevisaoConsumo, setTemPrevisaoConsumo] = useState(pedidoInicial?.temPrevisaoConsumo || false);
  const [previsaoConsumoMensal, setPrevisaoConsumoMensal] = useState(pedidoInicial?.previsaoConsumoMensal || 0);

  // Faturamento
  const [naturezaOperacao, setNaturezaOperacao] = useState(pedidoInicial?.naturezaOperacao || '');
  const [descritivoOperacao, setDescritivoOperacao] = useState(pedidoInicial?.descritivoNaturezaOperacao || '');
  const [descritivosFiltrados, setDescritivosFiltrados] = useState<DescritivoOperacao[]>([]);
  const [emailsNF, setEmailsNF] = useState(pedidoInicial?.emailsNF || '');
  const [formaPagamentoNF, setFormaPagamentoNF] = useState(pedidoInicial?.formaPagamentoNF || '');
  const [documentosSelecionados, setDocumentosSelecionados] = useState<string[]>(pedidoInicial?.documentosNF || []);
  const [destacarIR, setDestacarIR] = useState(pedidoInicial?.destacarIR || false);
  const [contaBancariaRecebimento, setContaBancariaRecebimento] = useState(pedidoInicial?.contaBancariaRecebimento || '');
  const [numeroParcelas, setNumeroParcelas] = useState(pedidoInicial?.numeroParcelas || 1);
  const [instrucoesBoleto, setInstrucoesBoleto] = useState(pedidoInicial?.instrucoesBoleto || '');
  const [observacoesDocumentacao, setObservacoesDocumentacao] = useState(pedidoInicial?.observacoesDocumentacao || '');
  const [condicoesPagamento, setCondicoesPagamento] = useState(pedidoInicial?.condicoesPagamento || '');

  // Frete
  const [tipoFrete, setTipoFrete] = useState(pedidoInicial?.tipoFrete || '');
  const [prazoEntrega, setPrazoEntrega] = useState(pedidoInicial?.prazoEntrega || '');
  const [dataEntrega, setDataEntrega] = useState(pedidoInicial?.dataEntrega || '');
  const [fretePagarPor, setFretePagarPor] = useState(pedidoInicial?.fretePagarPor || '');
  const [freteRetirarPor, setFreteRetirarPor] = useState(pedidoInicial?.freteRetirarPor || '');
  const [entregarRetirarCuidados, setEntregarRetirarCuidados] = useState(pedidoInicial?.entregarRetirarCuidados || '');
  const [nomeCompletoRecebedor, setNomeCompletoRecebedor] = useState(pedidoInicial?.nomeCompletoRecebedor || '');
  const [cpfRecebedor, setCpfRecebedor] = useState(pedidoInicial?.cpfRecebedor || '');
  const [telefoneRecebedor, setTelefoneRecebedor] = useState(pedidoInicial?.telefoneRecebedor || '');
  const [emailRecebedor, setEmailRecebedor] = useState(pedidoInicial?.emailRecebedor || '');
  const [horariosPermitidos, setHorariosPermitidos] = useState(pedidoInicial?.horariosPermitidos || '');
  const [locaisEntrega, setLocaisEntrega] = useState(pedidoInicial?.locaisEntrega || '');
  const [enderecoEntrega, setEnderecoEntrega] = useState(pedidoInicial?.enderecoEntrega || '');
  const [maisInformacoesEntrega, setMaisInformacoesEntrega] = useState(pedidoInicial?.maisInformacoesEntrega || '');

  // Auto-preencher descritivo quando operação tem apenas 1 opção
  useEffect(() => {
    if (naturezaOperacao) {
      const descritivos = getDescritivosOperacao(naturezaOperacao);
      setDescritivosFiltrados(descritivos);
      
      if (temDescritivoUnico(naturezaOperacao)) {
        setDescritivoOperacao(descritivos[0].descritivo);
      } else {
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
    if (produtos.length === 0) {
      toast.error("Adicione pelo menos um produto ao pedido");
      return;
    }

    const pedido: PedidoEmprestimo = {
      id: pedidoInicial?.id || Date.now(),
      numeroOportunidade: `EMP-${dadosEmprestimo.numeroProcesso}-${String(Date.now()).slice(-3)}`,
      cliente: dadosEmprestimo.cliente,
      vendedor: 'Usuário Atual',
      dataVenda: new Date().toISOString().split('T')[0],
      status: 'rascunho',
      produtos,
      valorTotal: calcularTotal(),
      observacoesGerais,
      emprestimoId: dadosEmprestimo.numeroProcesso,
      projetoOrigem: dadosEmprestimo.numeroProcesso,
      // Configurações de Estoque
      temValidadeMinima,
      validadeMinimaGlobal,
      temPrevisaoConsumo,
      previsaoConsumoMensal,
      // Faturamento
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
      condicoesPagamento,
      // Frete
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
      maisInformacoesEntrega
    };

    onSave(pedido);
    toast.success(pedidoInicial ? "Pedido atualizado com sucesso!" : "Pedido criado com sucesso!");
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: dadosEmprestimo.moeda
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
              {pedidoInicial ? 'Editar Pedido do Empréstimo' : 'Novo Pedido do Empréstimo'}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Empréstimo: {dadosEmprestimo.numeroProcesso} • Cliente: {dadosEmprestimo.cliente}
            </p>
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
                      <Input value={dadosEmprestimo.cliente} disabled />
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
              </TabsContent>

              {/* Aba Informações NF */}
              <TabsContent value="informacoes-nf" className="space-y-6">
                {/* Card 1: Natureza da Operação */}
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
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="descritivo">Descritivo da Operação *</Label>
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
                  </CardContent>
                </Card>

                {/* Card 2: Configurações Fiscais */}
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

                {/* Card 3: Comunicação e Envio */}
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

                {/* Card 4: PAGAMENTO */}
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
                        <Input
                          id="condicoesPagamento"
                          value={condicoesPagamento}
                          onChange={(e) => setCondicoesPagamento(e.target.value)}
                          placeholder="Ex: 30/60/90 dias"
                          className="mt-2"
                        />
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
                  </CardContent>
                </Card>

                {/* Card 5: DOCUMENTAÇÃO */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documentação para Envio junto à NF
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                    </div>
                    
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
                    
                    <div>
                      <Label htmlFor="observacoesDoc">Observações sobre a Documentação</Label>
                      <Textarea
                        id="observacoesDoc"
                        value={observacoesDocumentacao}
                        onChange={(e) => setObservacoesDocumentacao(e.target.value)}
                        placeholder="Instruções especiais sobre os documentos..."
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Frete */}
              <TabsContent value="frete" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Básicas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tipoFrete">Tipo de Frete *</Label>
                        <Select value={tipoFrete} onValueChange={setTipoFrete}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cif">CIF - Pago pelo remetente</SelectItem>
                            <SelectItem value="fob">FOB - Pago pelo destinatário</SelectItem>
                            <SelectItem value="retirada">Retirada no local</SelectItem>
                            <SelectItem value="terceiros">Por conta de terceiros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
                        <Input
                          id="prazoEntrega"
                          value={prazoEntrega}
                          onChange={(e) => setPrazoEntrega(e.target.value)}
                          placeholder="Ex: 5 dias úteis"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataEntrega">Data de Entrega</Label>
                        <Input
                          id="dataEntrega"
                          type="date"
                          value={dataEntrega}
                          onChange={(e) => setDataEntrega(e.target.value)}
                          className="mt-2"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
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
                        <Label htmlFor="fretePagarPor">Frete será pago por</Label>
                        <Select value={fretePagarPor} onValueChange={setFretePagarPor}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecione quem pagará" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="remetente">Remetente</SelectItem>
                            <SelectItem value="destinatario">Destinatário</SelectItem>
                            <SelectItem value="terceiros">Terceiros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="freteRetirarPor">Frete será retirado por</Label>
                        <Select value={freteRetirarPor} onValueChange={setFreteRetirarPor}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecione quem retirará" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="destinatario">Destinatário</SelectItem>
                            <SelectItem value="transportadora">Transportadora</SelectItem>
                            <SelectItem value="remetente">Remetente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="entregarRetirarCuidados">Cuidados Especiais na Entrega/Retirada</Label>
                      <Textarea
                        id="entregarRetirarCuidados"
                        value={entregarRetirarCuidados}
                        onChange={(e) => setEntregarRetirarCuidados(e.target.value)}
                        placeholder="Ex: Produto frágil, requer refrigeração, manter na posição vertical..."
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dados do Recebedor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nomeRecebedor">Nome Completo</Label>
                        <Input
                          id="nomeRecebedor"
                          value={nomeCompletoRecebedor}
                          onChange={(e) => setNomeCompletoRecebedor(e.target.value)}
                          placeholder="Nome de quem receberá"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpfRecebedor">CPF</Label>
                        <Input
                          id="cpfRecebedor"
                          value={cpfRecebedor}
                          onChange={(e) => setCpfRecebedor(e.target.value)}
                          placeholder="000.000.000-00"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefoneRecebedor">Telefone</Label>
                        <Input
                          id="telefoneRecebedor"
                          value={telefoneRecebedor}
                          onChange={(e) => setTelefoneRecebedor(e.target.value)}
                          placeholder="(00) 00000-0000"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emailRecebedor">E-mail</Label>
                        <Input
                          id="emailRecebedor"
                          type="email"
                          value={emailRecebedor}
                          onChange={(e) => setEmailRecebedor(e.target.value)}
                          placeholder="email@exemplo.com"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
                        placeholder="Ex: 8h às 17h de segunda a sexta"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="locaisEntrega">Locais Específicos de Entrega</Label>
                      <Input
                        id="locaisEntrega"
                        value={locaisEntrega}
                        onChange={(e) => setLocaisEntrega(e.target.value)}
                        placeholder="Ex: Portaria principal, Doca 2, Almoxarifado..."
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="enderecoEntrega">Endereço de Entrega</Label>
                      <Textarea
                        id="enderecoEntrega"
                        value={enderecoEntrega}
                        onChange={(e) => setEnderecoEntrega(e.target.value)}
                        placeholder="Endereço completo de entrega..."
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maisInformacoesEntrega">Mais Informações sobre a Entrega</Label>
                      <Textarea
                        id="maisInformacoesEntrega"
                        value={maisInformacoesEntrega}
                        onChange={(e) => setMaisInformacoesEntrega(e.target.value)}
                        placeholder="Informações adicionais relevantes..."
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Acompanhamento */}
              <TabsContent value="acompanhamento">
                <AcompanhamentoPedidoTab 
                  pedido={{
                    id: pedidoInicial?.id || 0,
                    numeroOportunidade: `EMP-${dadosEmprestimo.numeroProcesso}`,
                    cliente: dadosEmprestimo.cliente,
                    vendedor: 'Usuário Atual',
                    dataVenda: new Date().toISOString().split('T')[0],
                    status: 'rascunho',
                    produtos,
                    valorTotal: calcularTotal()
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter className="gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSalvarPedido} className="bg-biodina-gold hover:bg-biodina-gold/90">
              <Save className="h-4 w-4 mr-2" />
              {pedidoInicial ? 'Atualizar' : 'Salvar'} Pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AdicionarProdutoModal
        isOpen={isAdicionarProdutoOpen}
        onClose={() => setIsAdicionarProdutoOpen(false)}
        onAdicionarProduto={handleAdicionarProduto}
      />
    </>
  );
};

export default PedidoEmprestimoModal;
