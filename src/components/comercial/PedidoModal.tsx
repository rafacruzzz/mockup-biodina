
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
import { X, Save, Plus, Edit, Trash2, FileText } from "lucide-react";

interface PedidoModalProps {
  oportunidade: any;
  onClose: () => void;
  onSave: (pedido: any) => void;
}

const PedidoModal = ({ oportunidade, onClose, onSave }: PedidoModalProps) => {
  const [formData, setFormData] = useState({
    numeroPedido: '',
    cliente: oportunidade.cliente,
    cnpj: '',
    contato: '',
    tipo: 'produto',
    status: 'em_analise',
    origem: 'Atendente/Vendedor',
    prioridade: 90,
    tabelaPreco: '',
    codVendedor: '',
    nop: '',
    nfcReferenciada: '',
    condicaoPagto: '',
    pedidoVendedor: '',
    pedidoComprador: '',
    frete: '',
    codTransportadora: '',
    tipoAplicacao: 'venda',
    formaPagamento: '',
    observacoes: ''
  });

  const [itens, setItens] = useState([
    {
      id: 1,
      codigoProduto: '902-700',
      descricao: 'Válvula de membrana para solução mista (esquerda) [UN]',
      cfop: '6.949',
      unidade: 'Unidade',
      quantidade: 2,
      cstIcms: '00',
      precoUnitario: 109.90,
      faturarAntesEntrega: false,
      soFaturar: false,
      especial: false
    },
    {
      id: 2,
      codigoProduto: '902-701',
      descricao: 'Válvula de Membrana Plana, novo modelo [UN]',
      cfop: '6.949',
      unidade: 'Unidade',
      quantidade: 2,
      cstIcms: '00',
      precoUnitario: 109.90,
      faturarAntesEntrega: false,
      soFaturar: false,
      especial: false
    },
    {
      id: 3,
      codigoProduto: '910-318',
      descricao: 'Cabeça térmica de impressora, ABL800 Flex [UN]',
      cfop: '6.949',
      unidade: 'Unidade',
      quantidade: 1,
      cstIcms: '00',
      precoUnitario: 699.97,
      faturarAntesEntrega: false,
      soFaturar: false,
      especial: false
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pedido = {
      ...formData,
      itens,
      oportunidadeId: oportunidade.id,
      valorTotal: itens.reduce((total, item) => total + (item.quantidade * item.precoUnitario), 0)
    };
    onSave(pedido);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em_analise': return 'bg-yellow-500';
      case 'aprovado': return 'bg-green-500';
      case 'em_separacao': return 'bg-blue-500';
      case 'aprovado_expedicao': return 'bg-indigo-500';
      case 'aguardando_financeiro': return 'bg-orange-500';
      case 'finalizado': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularTotal = () => {
    return itens.reduce((total, item) => total + (item.quantidade * item.precoUnitario), 0);
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
      codigoProduto: '',
      descricao: '',
      cfop: '6.949',
      unidade: 'Unidade',
      quantidade: 1,
      cstIcms: '00',
      precoUnitario: 0,
      faturarAntesEntrega: false,
      soFaturar: false,
      especial: false
    }]);
  };

  const removerItem = (id: number) => {
    setItens(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Novo Pedido - {oportunidade.cliente}
            </CardTitle>
            <Badge className={`${getStatusColor(formData.status)} text-white`}>
              {formData.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cabeçalho do Pedido */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="numeroPedido">Nº do Pedido</Label>
                <Input
                  id="numeroPedido"
                  value={formData.numeroPedido}
                  onChange={(e) => setFormData({...formData, numeroPedido: e.target.value})}
                  placeholder="Auto-gerado"
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
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value: any) => setFormData({...formData, tipo: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="produto">Produto</SelectItem>
                    <SelectItem value="servico">Serviço</SelectItem>
                    <SelectItem value="importacao_direta">Importação Direta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contato">Contato</Label>
                <Input
                  id="contato"
                  value={formData.contato}
                  onChange={(e) => setFormData({...formData, contato: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="em_analise">Em Análise</SelectItem>
                    <SelectItem value="aprovado">Aprovado</SelectItem>
                    <SelectItem value="em_separacao">Em Separação</SelectItem>
                    <SelectItem value="aprovado_expedicao">Aprovado pela Expedição</SelectItem>
                    <SelectItem value="aguardando_financeiro">Aguardando Financeiro</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="origem">Origem</Label>
                <Select value={formData.origem} onValueChange={(value: any) => setFormData({...formData, origem: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Atendente/Vendedor">Atendente/Vendedor</SelectItem>
                    <SelectItem value="Site">Site</SelectItem>
                    <SelectItem value="Telemarketing">Telemarketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="prioridade">Prioridade</Label>
                <Input
                  id="prioridade"
                  type="number"
                  value={formData.prioridade}
                  onChange={(e) => setFormData({...formData, prioridade: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="tabelaPreco">Tabela de Preço</Label>
                <Input
                  id="tabelaPreco"
                  value={formData.tabelaPreco}
                  onChange={(e) => setFormData({...formData, tabelaPreco: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="codVendedor">Cód Vendedor</Label>
                <Input
                  id="codVendedor"
                  value={formData.codVendedor}
                  onChange={(e) => setFormData({...formData, codVendedor: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="nop">NOP</Label>
                <Input
                  id="nop"
                  value={formData.nop}
                  onChange={(e) => setFormData({...formData, nop: e.target.value})}
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
              
              <div className="overflow-x-auto max-h-80 overflow-y-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">✓</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>CFOP</TableHead>
                      <TableHead>UN</TableHead>
                      <TableHead>Qtd</TableHead>
                      <TableHead>CST/ICMS%</TableHead>
                      <TableHead>Preço Venda</TableHead>
                      <TableHead>Esp.</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itens.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.codigoProduto}
                            onChange={(e) => handleItemChange(item.id, 'codigoProduto', e.target.value)}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.descricao}
                            onChange={(e) => handleItemChange(item.id, 'descricao', e.target.value)}
                            className="w-64"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.cfop}
                            onChange={(e) => handleItemChange(item.id, 'cfop', e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={item.unidade} 
                            onValueChange={(value) => handleItemChange(item.id, 'unidade', value)}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Unidade">UN</SelectItem>
                              <SelectItem value="Peça">PC</SelectItem>
                              <SelectItem value="Metro">M</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantidade}
                            onChange={(e) => handleItemChange(item.id, 'quantidade', Number(e.target.value))}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.cstIcms}
                            onChange={(e) => handleItemChange(item.id, 'cstIcms', e.target.value)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.precoUnitario}
                            onChange={(e) => handleItemChange(item.id, 'precoUnitario', Number(e.target.value))}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={item.especial}
                            onCheckedChange={(checked) => handleItemChange(item.id, 'especial', checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => removerItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <div className="text-lg font-semibold">
                  Total: {formatCurrency(calcularTotal())}
                </div>
              </div>
            </div>

            {/* Rodapé do Pedido */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                <Input
                  id="formaPagamento"
                  value={formData.formaPagamento}
                  onChange={(e) => setFormData({...formData, formaPagamento: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="condicaoPagto">Condição de Pagamento</Label>
                <Input
                  id="condicaoPagto"
                  value={formData.condicaoPagto}
                  onChange={(e) => setFormData({...formData, condicaoPagto: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                rows={3}
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

export default PedidoModal;
