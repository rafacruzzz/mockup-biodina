
import { useState } from "react";
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
import { Plus, X, Trash2, Info, ShoppingCart, AlertTriangle } from "lucide-react";
import { ProdutoPedido, PedidoCompleto, UnidadeVenda } from "@/types/comercial";
import AdicionarProdutoModal from "./AdicionarProdutoModal";

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

  // Estados para os novos campos das abas
  const [informacoesComplementares, setInformacoesComplementares] = useState('');
  const [condicoesPagamento, setCondicoesPagamento] = useState('');
  
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
  const [cpfAutorizador, setCpfAutorizador] = useState('');
  const [emailAutorizador, setEmailAutorizador] = useState('');
  const [observacoesAutorizacao, setObservacoesAutorizacao] = useState('');

  const handleAdicionarProduto = (produto: ProdutoPedido) => {
    setProdutos(prev => [...prev, { ...produto, id: Date.now() }]);
    setIsAdicionarProdutoOpen(false);
  };

  const handleRemoverProduto = (id: number) => {
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  const handleAtualizarQuantidade = (id: number, quantidade: number) => {
    setProdutos(prev => prev.map(p => 
      p.id === id 
        ? { 
            ...p, 
            quantidade, 
            precoFinal: p.precoUnitario * quantidade 
          } 
        : p
    ));
  };

  const handleAtualizarPreco = (id: number, preco: number) => {
    setProdutos(prev => prev.map(p => 
      p.id === id 
        ? { 
            ...p, 
            precoUnitario: preco,
            precoFinal: preco * p.quantidade 
          } 
        : p
    ));
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

  const calcularTotal = () => {
    return produtos.reduce((total, produto) => total + produto.precoFinal, 0);
  };

  const handleSalvarPedido = () => {
    const pedido: PedidoCompleto = {
      id: Date.now(),
      numeroOportunidade: oportunidade.id.toString(),
      cliente: oportunidade.nomeFantasia || oportunidade.cliente,
      vendedor: 'Usuário Atual',
      dataVenda: new Date().toISOString().split('T')[0],
      status: 'rascunho',
      produtos,
      valorTotal: calcularTotal(),
      observacoesGerais,
      // Novos campos
      informacoesComplementares,
      condicoesPagamento,
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
      cpfAutorizador,
      emailAutorizador,
      observacoesAutorizacao
    };
    onSave(pedido);
    onClose();
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
              Novo Pedido - {oportunidade.nomeFantasia || oportunidade.cliente}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <Tabs defaultValue="geral" className="w-full">
              <TabsList className="flex w-full overflow-x-auto mb-6">
                <TabsTrigger value="geral" className="min-w-fit whitespace-nowrap">Geral</TabsTrigger>
                <TabsTrigger value="produtos" className="min-w-fit whitespace-nowrap">Produtos</TabsTrigger>
                <TabsTrigger value="informacoes-nf" className="min-w-fit whitespace-nowrap">Informações NF</TabsTrigger>
                <TabsTrigger value="frete" className="min-w-fit whitespace-nowrap">Frete</TabsTrigger>
                <TabsTrigger value="autorizacao" className="min-w-fit whitespace-nowrap">Autorização</TabsTrigger>
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
                              <TableHead>Total</TableHead>
                              <TableHead>Validade Mín. Exigida</TableHead>
                              <TableHead>Descritivo do Item (para NF)</TableHead>
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
                                <TableCell className="font-medium">
                                  {formatCurrency(produto.precoFinal)}
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="date"
                                    value={produto.validadeMinima || ''}
                                    onChange={(e) => handleAtualizarValidadeMinima(produto.id, e.target.value)}
                                    className="w-36"
                                    min={new Date().toISOString().split('T')[0]}
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
                          <div className="text-sm text-gray-500">Total do Pedido</div>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Condições de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={condicoesPagamento}
                      onChange={(e) => setCondicoesPagamento(e.target.value)}
                      placeholder="Descreva as condições de pagamento..."
                      rows={3}
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
                          <SelectItem value="emitente">Emitente</SelectItem>
                          <SelectItem value="destinatario">Destinatário</SelectItem>
                          <SelectItem value="terceiros">Terceiros</SelectItem>
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
                          <SelectItem value="emitente">Emitente</SelectItem>
                          <SelectItem value="destinatario">Destinatário</SelectItem>
                          <SelectItem value="terceiros">Terceiros</SelectItem>
                          <SelectItem value="transportadora">Transportadora</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="entregarRetirarCuidados">Entregar/Retirar aos Cuidados de Quem</Label>
                      <Select value={entregarRetirarCuidados} onValueChange={setEntregarRetirarCuidados}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione aos cuidados de quem" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="responsavel_compras">Responsável pelas Compras</SelectItem>
                          <SelectItem value="gerente_filial">Gerente da Filial</SelectItem>
                          <SelectItem value="farmaceutico_responsavel">Farmacêutico Responsável</SelectItem>
                          <SelectItem value="almoxarifado">Almoxarifado</SelectItem>
                          <SelectItem value="recepcao">Recepção</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
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
                            <Label htmlFor="cpfAutorizadorFrete">Autorizado Por (CPF)</Label>
                            <Input
                              id="cpfAutorizadorFrete"
                              value={cpfAutorizador}
                              onChange={(e) => setCpfAutorizador(e.target.value)}
                              placeholder="000.000.000-00"
                              maxLength={14}
                            />
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

              {/* Aba Autorização */}
              <TabsContent value="autorizacao" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Urgência</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="urgente" 
                        checked={urgente}
                        onCheckedChange={handleUrgenteChange}
                      />
                      <Label htmlFor="urgente">Este pedido é urgente</Label>
                    </div>

                    {urgente && (
                      <div>
                        <Label htmlFor="justificativaUrgencia">Justificativa da Urgência *</Label>
                        <Textarea
                          id="justificativaUrgencia"
                          value={justificativaUrgencia}
                          onChange={(e) => setJustificativaUrgencia(e.target.value)}
                          placeholder="Por que este pedido é urgente?"
                          rows={3}
                          required
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dados do Autorizador</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpfAutorizador">CPF do Autorizador</Label>
                      <Input
                        id="cpfAutorizador"
                        value={cpfAutorizador}
                        onChange={(e) => setCpfAutorizador(e.target.value)}
                        placeholder="000.000.000-00"
                        maxLength={14}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emailAutorizador">Email do Autorizador</Label>
                      <Input
                        id="emailAutorizador"
                        type="email"
                        value={emailAutorizador}
                        onChange={(e) => setEmailAutorizador(e.target.value)}
                        placeholder="autorizador@empresa.com"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Observações de Autorização</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={observacoesAutorizacao}
                      onChange={(e) => setObservacoesAutorizacao(e.target.value)}
                      placeholder="Observações sobre a autorização do pedido..."
                      rows={3}
                    />
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
    </>
  );
};

export default PedidoModal;
