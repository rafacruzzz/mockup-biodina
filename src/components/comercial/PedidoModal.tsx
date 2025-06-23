
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
            precoFinal: (p.precoUnitario * (1 - p.desconto / 100)) * quantidade 
          } 
        : p
    ));
  };

  const handleAtualizarDesconto = (id: number, desconto: number) => {
    setProdutos(prev => prev.map(p => 
      p.id === id 
        ? { 
            ...p, 
            desconto, 
            precoFinal: (p.precoUnitario * (1 - desconto / 100)) * p.quantidade 
          } 
        : p
    ));
  };

  const handleAtualizarObservacoes = (id: number, observacoes: string) => {
    setProdutos(prev => prev.map(p => 
      p.id === id ? { ...p, observacoes } : p
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
      observacoesGerais
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
            {/* Cabeçalho do Pedido */}
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

            {/* Produtos */}
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
                          <TableHead>Desconto %</TableHead>
                          <TableHead>Total</TableHead>
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
                            <TableCell>{formatCurrency(produto.precoUnitario)}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={produto.desconto}
                                onChange={(e) => handleAtualizarDesconto(produto.id, Number(e.target.value))}
                                className="w-16"
                                min="0"
                                max="100"
                                step="0.1"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatCurrency(produto.precoFinal)}
                            </TableCell>
                            <TableCell>
                              <Input
                                value={produto.observacoes || ''}
                                onChange={(e) => handleAtualizarObservacoes(produto.id, e.target.value)}
                                placeholder="Obs. específicas"
                                className="w-32"
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

            {/* Observações Gerais */}
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

            {/* Botões */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSalvarPedido}
                disabled={produtos.length === 0}
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
