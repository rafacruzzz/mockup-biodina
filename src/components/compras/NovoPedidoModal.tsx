
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Save, Plus, Trash2, ShoppingCart, FileText } from "lucide-react";

interface NovoPedidoModalProps {
  onClose: () => void;
  onSave: (pedido: any) => void;
}

const NovoPedidoModal = ({ onClose, onSave }: NovoPedidoModalProps) => {
  const [formData, setFormData] = useState({
    // Dados Gerais
    numeroPedido: '',
    codFornecedor: '',
    nop: '',
    codComprador: '',
    dataPedido: '',
    dataEntrega: '',
    status: 'Em Andamento',
    
    // Cliente/Vendedor
    vendedor: '',
    cliente: '',
    regiao: '',
    consumidorFinal: false,
    recebimentoXML: false,
    aprovacao: false,
    
    // Logística
    transportadora: '',
    bairro: '',
    cidade: '',
    cep: '',
    pesoBruto: 0,
    pesoLiquido: 0,
    
    // Totais
    subtotal: 0,
    desconto: 0,
    impostos: 0,
    total: 0,
    observacoes: ''
  });

  const [itens, setItens] = useState([
    {
      id: 1,
      seq: 1,
      codigo: '',
      descricao: '',
      saldo: 0,
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
      lote: '',
      dataValidade: '',
      numeroSerie: '',
      deposito: '',
      localizacao: ''
    }
  ]);

  // Estado para dados da Nota Fiscal
  const [dadosNF, setDadosNF] = useState({
    // Identificação da Nota
    tipoNota: '0', // Entrada
    naturezaOperacao: 'Compra para revenda',
    finalidadeEmissao: '1',
    dataEmissao: '',
    dataEntrada: '',
    ufEmitente: '',
    
    // Emitente
    cnpjEmitente: '',
    razaoSocialEmitente: '',
    inscricaoEstadualEmitente: '',
    enderecoEmitente: '',
    numeroEmitente: '',
    bairroEmitente: '',
    cidadeEmitente: '',
    ufEmitenteEnd: '',
    cepEmitente: '',
    
    // Destinatário
    cnpjDestinatario: '',
    razaoSocialDestinatario: '',
    inscricaoEstadualDestinatario: '',
    enderecoDestinatario: '',
    numeroDestinatario: '',
    bairroDestinatario: '',
    cidadeDestinatario: '',
    ufDestinatario: '',
    cepDestinatario: '',
    indicadorIE: '1',
    
    // Totalizações
    valorTotalProdutos: 0,
    valorICMS: 0,
    valorIPI: 0,
    valorPIS: 0,
    valorCOFINS: 0,
    valorTotalNota: 0,
    descontoNF: 0,
    valorFrete: 0,
    baseCalculoICMS: 0,
    baseCalculoIPI: 0,
    
    // Transporte
    modalidadeFrete: '1',
    transportadoraNF: '',
    placaVeiculo: '',
    
    // Informações Adicionais
    informacoesComplementares: '',
    observacoesInternas: ''
  });

  const [itensFiscais, setItensFiscais] = useState([
    {
      id: 1,
      codigoProduto: '',
      descricaoProduto: '',
      ncm: '',
      cfop: '1102',
      unidadeComercial: 'UN',
      quantidade: 1,
      valorUnitario: 0,
      valorTotalBruto: 0,
      origemMercadoria: '0',
      cstICMS: '',
      aliquotaICMS: 0,
      cstIPI: '',
      aliquotaIPI: 0,
      cstPIS: '',
      aliquotaPIS: 0,
      cstCOFINS: '',
      aliquotaCOFINS: 0
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pedido = {
      ...formData,
      itens,
      id: Date.now()
    };
    onSave(pedido);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento': return 'bg-blue-500';
      case 'Finalizado': return 'bg-green-500';
      case 'Cancelado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setItens(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Calcular valor total automaticamente
        if (field === 'quantidade' || field === 'valorUnitario') {
          updatedItem.valorTotal = updatedItem.quantidade * updatedItem.valorUnitario;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const adicionarItem = () => {
    const novoId = Math.max(...itens.map(i => i.id)) + 1;
    const novaSeq = Math.max(...itens.map(i => i.seq)) + 1;
    setItens(prev => [...prev, {
      id: novoId,
      seq: novaSeq,
      codigo: '',
      descricao: '',
      saldo: 0,
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
      lote: '',
      dataValidade: '',
      numeroSerie: '',
      deposito: '',
      localizacao: ''
    }]);
  };

  const removerItem = (id: number) => {
    if (itens.length > 1) {
      setItens(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleItemFiscalChange = (id: number, field: string, value: any) => {
    setItensFiscais(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Calcular valor total automaticamente
        if (field === 'quantidade' || field === 'valorUnitario') {
          updatedItem.valorTotalBruto = updatedItem.quantidade * updatedItem.valorUnitario;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const adicionarItemFiscal = () => {
    const novoId = Math.max(...itensFiscais.map(i => i.id)) + 1;
    setItensFiscais(prev => [...prev, {
      id: novoId,
      codigoProduto: '',
      descricaoProduto: '',
      ncm: '',
      cfop: '1102',
      unidadeComercial: 'UN',
      quantidade: 1,
      valorUnitario: 0,
      valorTotalBruto: 0,
      origemMercadoria: '0',
      cstICMS: '',
      aliquotaICMS: 0,
      cstIPI: '',
      aliquotaIPI: 0,
      cstPIS: '',
      aliquotaPIS: 0,
      cstCOFINS: '',
      aliquotaCOFINS: 0
    }]);
  };

  const removerItemFiscal = (id: number) => {
    if (itensFiscais.length > 1) {
      setItensFiscais(prev => prev.filter(item => item.id !== id));
    }
  };

  // Calcular totais automaticamente
  const calcularTotais = () => {
    const subtotal = itens.reduce((sum, item) => sum + item.valorTotal, 0);
    const total = subtotal - formData.desconto + formData.impostos;
    
    setFormData(prev => ({
      ...prev,
      subtotal,
      total
    }));
  };

  // Preencher dados da NF automaticamente baseado no pedido
  const preencherDadosNF = () => {
    // Preencher dados do emitente baseado no fornecedor
    if (formData.codFornecedor) {
      setDadosNF(prev => ({
        ...prev,
        cnpjEmitente: formData.codFornecedor,
        razaoSocialEmitente: `Fornecedor ${formData.codFornecedor}`,
        transportadoraNF: formData.transportadora,
        valorTotalProdutos: formData.subtotal,
        valorTotalNota: formData.total,
        descontoNF: formData.desconto
      }));
    }

    // Sincronizar itens fiscais com itens do pedido
    const novositensFiscais = itens.map(item => ({
      id: item.id,
      codigoProduto: item.codigo,
      descricaoProduto: item.descricao,
      ncm: '',
      cfop: '1102',
      unidadeComercial: 'UN',
      quantidade: item.quantidade,
      valorUnitario: item.valorUnitario,
      valorTotalBruto: item.valorTotal,
      origemMercadoria: '0',
      cstICMS: '',
      aliquotaICMS: 0,
      cstIPI: '',
      aliquotaIPI: 0,
      cstPIS: '',
      aliquotaPIS: 0,
      cstCOFINS: '',
      aliquotaCOFINS: 0
    }));
    
    setItensFiscais(novositensFiscais);
  };

  const handleGerarNF = () => {
    console.log('Gerando Nota Fiscal:', {
      dadosNF,
      itensFiscais
    });
    // Aqui seria implementada a lógica de geração da NF
  };

  // Recalcular totais quando itens mudarem
  useState(() => {
    calcularTotais();
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Novo Pedido
            </CardTitle>
            <Badge className={`${getStatusColor(formData.status)} text-white`}>
              {formData.status}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="dados-gerais" className="space-y-4" onValueChange={(value) => {
              if (value === 'processo-importacao') {
                preencherDadosNF();
              }
            }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
                <TabsTrigger value="processo-importacao">Processo de Importação</TabsTrigger>
              </TabsList>

              <TabsContent value="dados-gerais" className="space-y-6">
                {/* Informações Básicas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informações Básicas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="numeroPedido">Cod do Pedido *</Label>
                        <Input
                          id="numeroPedido"
                          value={formData.numeroPedido}
                          onChange={(e) => setFormData({...formData, numeroPedido: e.target.value})}
                          placeholder="PED-2024-XXX"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="codFornecedor">Cod Fornecedor *</Label>
                        <Input
                          id="codFornecedor"
                          value={formData.codFornecedor}
                          onChange={(e) => setFormData({...formData, codFornecedor: e.target.value})}
                          placeholder="FORN001"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="nop">NOP</Label>
                        <Input
                          id="nop"
                          value={formData.nop}
                          onChange={(e) => setFormData({...formData, nop: e.target.value})}
                          placeholder="NOP001"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="codComprador">Cod Comprador *</Label>
                        <Input
                          id="codComprador"
                          value={formData.codComprador}
                          onChange={(e) => setFormData({...formData, codComprador: e.target.value})}
                          placeholder="COMP001"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataPedido">Data do Pedido</Label>
                        <Input
                          id="dataPedido"
                          type="date"
                          value={formData.dataPedido}
                          onChange={(e) => setFormData({...formData, dataPedido: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                            <SelectItem value="Finalizado">Finalizado</SelectItem>
                            <SelectItem value="Cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cliente/Vendedor */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cliente/Vendedor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="vendedor">Vendedor *</Label>
                        <Input
                          id="vendedor"
                          value={formData.vendedor}
                          onChange={(e) => setFormData({...formData, vendedor: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cliente">Cliente *</Label>
                        <Input
                          id="cliente"
                          value={formData.cliente}
                          onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="regiao">Região</Label>
                        <Select value={formData.regiao} onValueChange={(value) => setFormData({...formData, regiao: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a região" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Norte">Norte</SelectItem>
                            <SelectItem value="Nordeste">Nordeste</SelectItem>
                            <SelectItem value="Centro-Oeste">Centro-Oeste</SelectItem>
                            <SelectItem value="Sudeste">Sudeste</SelectItem>
                            <SelectItem value="Sul">Sul</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="consumidorFinal"
                          checked={formData.consumidorFinal}
                          onCheckedChange={(checked) => setFormData({...formData, consumidorFinal: !!checked})}
                        />
                        <Label htmlFor="consumidorFinal">Consumidor Final</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="recebimentoXML"
                          checked={formData.recebimentoXML}
                          onCheckedChange={(checked) => setFormData({...formData, recebimentoXML: !!checked})}
                        />
                        <Label htmlFor="recebimentoXML">Recebimento por XML</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="aprovacao"
                          checked={formData.aprovacao}
                          onCheckedChange={(checked) => setFormData({...formData, aprovacao: !!checked})}
                        />
                        <Label htmlFor="aprovacao">Aprovação</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Logística */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Logística</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dataEntrega">Data de Entrega</Label>
                        <Input
                          id="dataEntrega"
                          type="date"
                          value={formData.dataEntrega}
                          onChange={(e) => setFormData({...formData, dataEntrega: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="transportadora">Transportadora</Label>
                        <Input
                          id="transportadora"
                          value={formData.transportadora}
                          onChange={(e) => setFormData({...formData, transportadora: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input
                          id="bairro"
                          value={formData.bairro}
                          onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                          id="cidade"
                          value={formData.cidade}
                          onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cep">CEP</Label>
                        <Input
                          id="cep"
                          value={formData.cep}
                          onChange={(e) => setFormData({...formData, cep: e.target.value})}
                          placeholder="00000-000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pesoBruto">Peso Bruto (kg)</Label>
                        <Input
                          id="pesoBruto"
                          type="number"
                          step="0.1"
                          value={formData.pesoBruto}
                          onChange={(e) => setFormData({...formData, pesoBruto: Number(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="pesoLiquido">Peso Líquido (kg)</Label>
                        <Input
                          id="pesoLiquido"
                          type="number"
                          step="0.1"
                          value={formData.pesoLiquido}
                          onChange={(e) => setFormData({...formData, pesoLiquido: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Produtos */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Produtos</CardTitle>
                    <Button type="button" onClick={adicionarItem} className="bg-biodina-gold hover:bg-biodina-gold/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Item
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Seq</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Saldo</TableHead>
                            <TableHead>Qtd</TableHead>
                            <TableHead>Valor Unit</TableHead>
                            <TableHead>Valor Total</TableHead>
                            <TableHead>Lote</TableHead>
                            <TableHead>Validade</TableHead>
                            <TableHead>Nº Série</TableHead>
                            <TableHead>Depósito</TableHead>
                            <TableHead>Localização</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {itens.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <Input
                                  value={item.seq}
                                  onChange={(e) => handleItemChange(item.id, 'seq', parseInt(e.target.value) || 0)}
                                  className="w-16"
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.codigo}
                                  onChange={(e) => handleItemChange(item.id, 'codigo', e.target.value)}
                                  className="w-24"
                                  placeholder="MED001"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.descricao}
                                  onChange={(e) => handleItemChange(item.id, 'descricao', e.target.value)}
                                  className="w-48"
                                  placeholder="Descrição do produto"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.saldo}
                                  onChange={(e) => handleItemChange(item.id, 'saldo', parseInt(e.target.value) || 0)}
                                  className="w-20"
                                  type="number"
                                  readOnly
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={item.quantidade}
                                  onChange={(e) => handleItemChange(item.id, 'quantidade', parseInt(e.target.value) || 0)}
                                  className="w-16"
                                  min="1"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={item.valorUnitario}
                                  onChange={(e) => handleItemChange(item.id, 'valorUnitario', parseFloat(e.target.value) || 0)}
                                  className="w-24"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.valorTotal.toFixed(2)}
                                  className="w-24 bg-gray-100"
                                  readOnly
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.lote}
                                  onChange={(e) => handleItemChange(item.id, 'lote', e.target.value)}
                                  className="w-24"
                                  placeholder="LOT001"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="date"
                                  value={item.dataValidade}
                                  onChange={(e) => handleItemChange(item.id, 'dataValidade', e.target.value)}
                                  className="w-32"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.numeroSerie}
                                  onChange={(e) => handleItemChange(item.id, 'numeroSerie', e.target.value)}
                                  className="w-24"
                                  placeholder="SER001"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.deposito}
                                  onChange={(e) => handleItemChange(item.id, 'deposito', e.target.value)}
                                  className="w-24"
                                  placeholder="DEP001"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.localizacao}
                                  onChange={(e) => handleItemChange(item.id, 'localizacao', e.target.value)}
                                  className="w-24"
                                  placeholder="A1-P2"
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removerItem(item.id)}
                                  disabled={itens.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Totais */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Totais e Observações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Valores</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="subtotal">Subtotal</Label>
                            <Input
                              id="subtotal"
                              type="number"
                              step="0.01"
                              value={formData.subtotal.toFixed(2)}
                              className="bg-gray-100"
                              readOnly
                            />
                          </div>
                          <div>
                            <Label htmlFor="desconto">Desconto</Label>
                            <Input
                              id="desconto"
                              type="number"
                              step="0.01"
                              value={formData.desconto}
                              onChange={(e) => setFormData({...formData, desconto: parseFloat(e.target.value) || 0})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="impostos">Impostos</Label>
                            <Input
                              id="impostos"
                              type="number"
                              step="0.01"
                              value={formData.impostos}
                              onChange={(e) => setFormData({...formData, impostos: parseFloat(e.target.value) || 0})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="total">Total Final</Label>
                            <Input
                              id="total"
                              type="number"
                              step="0.01"
                              value={formData.total.toFixed(2)}
                              className="bg-green-100 font-bold"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Observações</h3>
                        <Textarea
                          id="observacoes"
                          value={formData.observacoes}
                          onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                          rows={6}
                          placeholder="Observações adicionais sobre o pedido..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="processo-importacao" className="space-y-6">
                {/* Identificação da Nota */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Identificação da Nota</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tipoNota">Tipo da Nota</Label>
                        <Select value={dadosNF.tipoNota} onValueChange={(value) => setDadosNF({...dadosNF, tipoNota: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Entrada (0)</SelectItem>
                            <SelectItem value="1">Saída (1)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="naturezaOperacao">Natureza da Operação</Label>
                        <Select value={dadosNF.naturezaOperacao} onValueChange={(value) => setDadosNF({...dadosNF, naturezaOperacao: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Compra para revenda">Compra para revenda</SelectItem>
                            <SelectItem value="Importação">Importação</SelectItem>
                            <SelectItem value="Devolução">Devolução</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="finalidadeEmissao">Finalidade da Emissão</Label>
                        <Select value={dadosNF.finalidadeEmissao} onValueChange={(value) => setDadosNF({...dadosNF, finalidadeEmissao: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 - NF Normal</SelectItem>
                            <SelectItem value="3">3 - Ajuste</SelectItem>
                            <SelectItem value="4">4 - Devolução</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="dataEmissao">Data/Hora de Emissão</Label>
                        <Input
                          id="dataEmissao"
                          type="datetime-local"
                          value={dadosNF.dataEmissao}
                          onChange={(e) => setDadosNF({...dadosNF, dataEmissao: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataEntrada">Data/Hora de Entrada</Label>
                        <Input
                          id="dataEntrada"
                          type="datetime-local"
                          value={dadosNF.dataEntrada}
                          onChange={(e) => setDadosNF({...dadosNF, dataEntrada: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ufEmitente">UF do Emitente</Label>
                        <Input
                          id="ufEmitente"
                          value={dadosNF.ufEmitente}
                          onChange={(e) => setDadosNF({...dadosNF, ufEmitente: e.target.value})}
                          placeholder="SP"
                          maxLength={2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emitente */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Emitente (Fornecedor)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="cnpjEmitente">CNPJ</Label>
                        <Input
                          id="cnpjEmitente"
                          value={dadosNF.cnpjEmitente}
                          onChange={(e) => setDadosNF({...dadosNF, cnpjEmitente: e.target.value})}
                          placeholder="00.000.000/0000-00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="razaoSocialEmitente">Razão Social</Label>
                        <Input
                          id="razaoSocialEmitente"
                          value={dadosNF.razaoSocialEmitente}
                          onChange={(e) => setDadosNF({...dadosNF, razaoSocialEmitente: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="inscricaoEstadualEmitente">Inscrição Estadual</Label>
                        <Input
                          id="inscricaoEstadualEmitente"
                          value={dadosNF.inscricaoEstadualEmitente}
                          onChange={(e) => setDadosNF({...dadosNF, inscricaoEstadualEmitente: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="enderecoEmitente">Endereço</Label>
                        <Input
                          id="enderecoEmitente"
                          value={dadosNF.enderecoEmitente}
                          onChange={(e) => setDadosNF({...dadosNF, enderecoEmitente: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="numeroEmitente">Número</Label>
                        <Input
                          id="numeroEmitente"
                          value={dadosNF.numeroEmitente}
                          onChange={(e) => setDadosNF({...dadosNF, numeroEmitente: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="bairroEmitente">Bairro</Label>
                        <Input
                          id="bairroEmitente"
                          value={dadosNF.bairroEmitente}
                          onChange={(e) => setDadosNF({...dadosNF, bairroEmitente: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cidadeEmitente">Cidade</Label>
                        <Input
                          id="cidadeEmitente"
                          value={dadosNF.cidadeEmitente}
                          onChange={(e) => setDadosNF({...dadosNF, cidadeEmitente: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ufEmitenteEnd">UF</Label>
                        <Input
                          id="ufEmitenteEnd"
                          value={dadosNF.ufEmitenteEnd}
                          onChange={(e) => setDadosNF({...dadosNF, ufEmitenteEnd: e.target.value})}
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cepEmitente">CEP</Label>
                        <Input
                          id="cepEmitente"
                          value={dadosNF.cepEmitente}
                          onChange={(e) => setDadosNF({...dadosNF, cepEmitente: e.target.value})}
                          placeholder="00000-000"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Destinatário */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Destinatário (Sua Empresa)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="cnpjDestinatario">CNPJ/CPF</Label>
                        <Input
                          id="cnpjDestinatario"
                          value={dadosNF.cnpjDestinatario}
                          onChange={(e) => setDadosNF({...dadosNF, cnpjDestinatario: e.target.value})}
                          placeholder="00.000.000/0000-00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="razaoSocialDestinatario">Razão Social</Label>
                        <Input
                          id="razaoSocialDestinatario"
                          value={dadosNF.razaoSocialDestinatario}
                          onChange={(e) => setDadosNF({...dadosNF, razaoSocialDestinatario: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="inscricaoEstadualDestinatario">Inscrição Estadual</Label>
                        <Input
                          id="inscricaoEstadualDestinatario"
                          value={dadosNF.inscricaoEstadualDestinatario}
                          onChange={(e) => setDadosNF({...dadosNF, inscricaoEstadualDestinatario: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="enderecoDestinatario">Endereço</Label>
                        <Input
                          id="enderecoDestinatario"
                          value={dadosNF.enderecoDestinatario}
                          onChange={(e) => setDadosNF({...dadosNF, enderecoDestinatario: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="numeroDestinatario">Número</Label>
                        <Input
                          id="numeroDestinatario"
                          value={dadosNF.numeroDestinatario}
                          onChange={(e) => setDadosNF({...dadosNF, numeroDestinatario: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <Label htmlFor="bairroDestinatario">Bairro</Label>
                        <Input
                          id="bairroDestinatario"
                          value={dadosNF.bairroDestinatario}
                          onChange={(e) => setDadosNF({...dadosNF, bairroDestinatario: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cidadeDestinatario">Cidade</Label>
                        <Input
                          id="cidadeDestinatario"
                          value={dadosNF.cidadeDestinatario}
                          onChange={(e) => setDadosNF({...dadosNF, cidadeDestinatario: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ufDestinatario">UF</Label>
                        <Input
                          id="ufDestinatario"
                          value={dadosNF.ufDestinatario}
                          onChange={(e) => setDadosNF({...dadosNF, ufDestinatario: e.target.value})}
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cepDestinatario">CEP</Label>
                        <Input
                          id="cepDestinatario"
                          value={dadosNF.cepDestinatario}
                          onChange={(e) => setDadosNF({...dadosNF, cepDestinatario: e.target.value})}
                          placeholder="00000-000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="indicadorIE">Indicador IE</Label>
                        <Select value={dadosNF.indicadorIE} onValueChange={(value) => setDadosNF({...dadosNF, indicadorIE: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 - Contribuinte ICMS</SelectItem>
                            <SelectItem value="2">2 - Contribuinte isento</SelectItem>
                            <SelectItem value="9">9 - Não contribuinte</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Itens/Produtos Fiscais */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Itens/Produtos (Tributação)</CardTitle>
                    <Button type="button" onClick={adicionarItemFiscal} className="bg-biodina-gold hover:bg-biodina-gold/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Item Fiscal
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>NCM</TableHead>
                            <TableHead>CFOP</TableHead>
                            <TableHead>Un</TableHead>
                            <TableHead>Qtd</TableHead>
                            <TableHead>Valor Unit</TableHead>
                            <TableHead>Valor Total</TableHead>
                            <TableHead>Origem</TableHead>
                            <TableHead>CST ICMS</TableHead>
                            <TableHead>Aliq ICMS</TableHead>
                            <TableHead>CST IPI</TableHead>
                            <TableHead>Aliq IPI</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {itensFiscais.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <Input
                                  value={item.codigoProduto}
                                  onChange={(e) => handleItemFiscalChange(item.id, 'codigoProduto', e.target.value)}
                                  className="w-24"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.descricaoProduto}
                                  onChange={(e) => handleItemFiscalChange(item.id, 'descricaoProduto', e.target.value)}
                                  className="w-48"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.ncm}
                                  onChange={(e) => handleItemFiscalChange(item.id, 'ncm', e.target.value)}
                                  className="w-24"
                                  placeholder="0000.00.00"
                                />
                              </TableCell>
                              <TableCell>
                                <Select value={item.cfop} onValueChange={(value) => handleItemFiscalChange(item.id, 'cfop', value)}>
                                  <SelectTrigger className="w-24">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1102">1102</SelectItem>
                                    <SelectItem value="1553">1553</SelectItem>
                                    <SelectItem value="1949">1949</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.unidadeComercial}
                                  onChange={(e) => handleItemFiscalChange(item.id, 'unidadeComercial', e.target.value)}
                                  className="w-16"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={item.quantidade}
                                  onChange={(e) => handleItemFiscalChange(item.id, 'quantidade', parseInt(e.target.value) || 0)}
                                  className="w-16"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={item.valorUnitario}
                                  onChange={(e) => handleItemFiscalChange(item.id, 'valorUnitario', parseFloat(e.target.value) || 0)}
                                  className="w-24"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.valorTotalBruto.toFixed(2)}
                                  className="w-24 bg-gray-100"
                                  readOnly
                                />
                              </TableCell>
                              <TableCell>
                                <Select value={item.origemMercadoria} onValueChange={(value) => handleItemFiscalChange(item.id, 'origemMercadoria', value)}>
                                  <SelectTrigger className="w-16">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="0">0</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.cstICMS}
                                  onChange={(e) => handleItemFiscalChange(item.id, 'cstICMS', e.target.value)}
                                  className="w-16"
                                  placeholder="000"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={item.aliquotaICMS}
                                  onChange={(e) => handleItemFiscalChange(item.id, 'aliquotaICMS', parseFloat(e.target.value) || 0)}
                                  className="w-16"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.cstIPI}
                                  onChange={(e) => handleItemFiscalChange(item.id, 'cstIPI', e.target.value)}
                                  className="w-16"
                                  placeholder="00"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={item.aliquotaIPI}
                                  onChange={(e) => handleItemFiscalChange(item.id, 'aliquotaIPI', parseFloat(e.target.value) || 0)}
                                  className="w-16"
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removerItemFiscal(item.id)}
                                  disabled={itensFiscais.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Totalizações */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Totalizações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="valorTotalProdutos">Valor Total dos Produtos</Label>
                        <Input
                          id="valorTotalProdutos"
                          type="number"
                          step="0.01"
                          value={dadosNF.valorTotalProdutos}
                          onChange={(e) => setDadosNF({...dadosNF, valorTotalProdutos: parseFloat(e.target.value) || 0})}
                          className="bg-gray-100"
                          readOnly
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorICMS">Valor ICMS</Label>
                        <Input
                          id="valorICMS"
                          type="number"
                          step="0.01"
                          value={dadosNF.valorICMS}
                          onChange={(e) => setDadosNF({...dadosNF, valorICMS: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorIPI">Valor IPI</Label>
                        <Input
                          id="valorIPI"
                          type="number"
                          step="0.01"
                          value={dadosNF.valorIPI}
                          onChange={(e) => setDadosNF({...dadosNF, valorIPI: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorTotalNota">Valor Total da Nota</Label>
                        <Input
                          id="valorTotalNota"
                          type="number"
                          step="0.01"
                          value={dadosNF.valorTotalNota}
                          onChange={(e) => setDadosNF({...dadosNF, valorTotalNota: parseFloat(e.target.value) || 0})}
                          className="bg-green-100 font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="valorPIS">Valor PIS</Label>
                        <Input
                          id="valorPIS"
                          type="number"
                          step="0.01"
                          value={dadosNF.valorPIS}
                          onChange={(e) => setDadosNF({...dadosNF, valorPIS: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorCOFINS">Valor COFINS</Label>
                        <Input
                          id="valorCOFINS"
                          type="number"
                          step="0.01"
                          value={dadosNF.valorCOFINS}
                          onChange={(e) => setDadosNF({...dadosNF, valorCOFINS: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="descontoNF">Desconto</Label>
                        <Input
                          id="descontoNF"
                          type="number"
                          step="0.01"
                          value={dadosNF.descontoNF}
                          onChange={(e) => setDadosNF({...dadosNF, descontoNF: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorFrete">Valor do Frete</Label>
                        <Input
                          id="valorFrete"
                          type="number"
                          step="0.01"
                          value={dadosNF.valorFrete}
                          onChange={(e) => setDadosNF({...dadosNF, valorFrete: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="baseCalculoICMS">Base de Cálculo ICMS</Label>
                        <Input
                          id="baseCalculoICMS"
                          type="number"
                          step="0.01"
                          value={dadosNF.baseCalculoICMS}
                          onChange={(e) => setDadosNF({...dadosNF, baseCalculoICMS: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="baseCalculoIPI">Base de Cálculo IPI</Label>
                        <Input
                          id="baseCalculoIPI"
                          type="number"
                          step="0.01"
                          value={dadosNF.baseCalculoIPI}
                          onChange={(e) => setDadosNF({...dadosNF, baseCalculoIPI: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Transporte */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Transporte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="modalidadeFrete">Modalidade do Frete</Label>
                        <Select value={dadosNF.modalidadeFrete} onValueChange={(value) => setDadosNF({...dadosNF, modalidadeFrete: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0 - Emitente</SelectItem>
                            <SelectItem value="1">1 - Destinatário</SelectItem>
                            <SelectItem value="2">2 - Terceiros</SelectItem>
                            <SelectItem value="9">9 - Sem frete</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="transportadoraNF">Transportadora</Label>
                        <Input
                          id="transportadoraNF"
                          value={dadosNF.transportadoraNF}
                          onChange={(e) => setDadosNF({...dadosNF, transportadoraNF: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="placaVeiculo">Placa do Veículo</Label>
                        <Input
                          id="placaVeiculo"
                          value={dadosNF.placaVeiculo}
                          onChange={(e) => setDadosNF({...dadosNF, placaVeiculo: e.target.value})}
                          placeholder="ABC-1234"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Informações Adicionais */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informações Adicionais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="informacoesComplementares">Informações Complementares (Fisco)</Label>
                        <Textarea
                          id="informacoesComplementares"
                          value={dadosNF.informacoesComplementares}
                          onChange={(e) => setDadosNF({...dadosNF, informacoesComplementares: e.target.value})}
                          rows={4}
                          placeholder="Informações de interesse do Fisco..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="observacoesInternas">Observações Internas</Label>
                        <Textarea
                          id="observacoesInternas"
                          value={dadosNF.observacoesInternas}
                          onChange={(e) => setDadosNF({...dadosNF, observacoesInternas: e.target.value})}
                          rows={4}
                          placeholder="Observações internas..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Botão Gerar NF */}
                <div className="flex justify-center pt-4">
                  <Button 
                    type="button" 
                    onClick={handleGerarNF}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Gerar NF de Entrada
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar Pedido
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovoPedidoModal;
