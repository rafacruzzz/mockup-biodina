
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
import { X, Save, Plus, Trash2, ShoppingCart } from "lucide-react";

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
            <Tabs defaultValue="dados-gerais" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
                <TabsTrigger value="cliente-vendedor">Cliente/Vendedor</TabsTrigger>
                <TabsTrigger value="logistica">Logística</TabsTrigger>
                <TabsTrigger value="produtos">Produtos</TabsTrigger>
                <TabsTrigger value="totais">Totais</TabsTrigger>
              </TabsList>

              <TabsContent value="dados-gerais" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="cliente-vendedor" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="logistica" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="produtos" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Itens do Pedido</h3>
                  <Button type="button" onClick={adicionarItem} className="bg-biodina-gold hover:bg-biodina-gold/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Item
                  </Button>
                </div>
                
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
              </TabsContent>

              <TabsContent value="totais" className="space-y-4">
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
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4">
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
