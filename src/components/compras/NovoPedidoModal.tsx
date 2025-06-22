
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
import { X, Save, Plus, Trash2, ShoppingCart } from "lucide-react";

interface NovoPedidoModalProps {
  onClose: () => void;
  onSave: (pedido: any) => void;
}

const NovoPedidoModal = ({ onClose, onSave }: NovoPedidoModalProps) => {
  const [formData, setFormData] = useState({
    numeroPedido: '',
    hop: '',
    vendedor: '',
    cliente: '',
    dataEntrega: '',
    transportadora: '',
    regiao: '',
    status: 'Em Andamento',
    bairro: '',
    cidade: '',
    cep: '',
    pesoBruto: 0,
    pesoLiquido: 0,
    observacoes: ''
  });

  const [itens, setItens] = useState([
    {
      id: 1,
      codigo: '',
      descricao: '',
      lote: '',
      dataValidade: '',
      numeroSerie: '',
      deposito: '',
      localizacao: '',
      quantidade: 1
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pedido = {
      ...formData,
      itens,
      id: Date.now() // ID temporário
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
    setItens(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const adicionarItem = () => {
    const novoId = Math.max(...itens.map(i => i.id)) + 1;
    setItens(prev => [...prev, {
      id: novoId,
      codigo: '',
      descricao: '',
      lote: '',
      dataValidade: '',
      numeroSerie: '',
      deposito: '',
      localizacao: '',
      quantidade: 1
    }]);
  };

  const removerItem = (id: number) => {
    if (itens.length > 1) {
      setItens(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[95vh] overflow-y-auto">
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
            {/* Informações Básicas do Pedido */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="numeroPedido">Nº do Pedido</Label>
                <Input
                  id="numeroPedido"
                  value={formData.numeroPedido}
                  onChange={(e) => setFormData({...formData, numeroPedido: e.target.value})}
                  placeholder="PED-2024-XXX"
                />
              </div>
              <div>
                <Label htmlFor="hop">HOP</Label>
                <Input
                  id="hop"
                  value={formData.hop}
                  onChange={(e) => setFormData({...formData, hop: e.target.value})}
                  placeholder="HOP001"
                />
              </div>
              <div>
                <Label htmlFor="vendedor">Vendedor</Label>
                <Input
                  id="vendedor"
                  value={formData.vendedor}
                  onChange={(e) => setFormData({...formData, vendedor: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cliente">Cliente</Label>
                <Input
                  id="cliente"
                  value={formData.cliente}
                  onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
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

            <div className="grid grid-cols-2 gap-4">
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
              <div className="grid grid-cols-2 gap-2">
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
            </div>

            {/* Endereço de Entrega */}
            <div className="grid grid-cols-3 gap-4">
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

            {/* Itens do Pedido */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Itens do Pedido</h3>
                <Button type="button" onClick={adicionarItem} className="bg-biodina-gold hover:bg-biodina-gold/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>
              
              <div className="overflow-x-auto max-h-60 overflow-y-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Lote</TableHead>
                      <TableHead>Data Validade</TableHead>
                      <TableHead>Nº Série</TableHead>
                      <TableHead>Depósito</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Qtd</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itens.map((item) => (
                      <TableRow key={item.id}>
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
                          <Input
                            type="number"
                            value={item.quantidade}
                            onChange={(e) => handleItemChange(item.id, 'quantidade', Number(e.target.value))}
                            className="w-16"
                            min="1"
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
            </div>

            {/* Observações */}
            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                rows={3}
                placeholder="Observações adicionais sobre o pedido..."
              />
            </div>

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
