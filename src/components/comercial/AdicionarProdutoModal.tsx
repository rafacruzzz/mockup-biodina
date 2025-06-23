
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Info } from "lucide-react";
import { ProdutoPedido, UnidadeVenda } from "@/types/comercial";
import { mockProdutosCatalogo, mockProdutosEstoque } from "@/data/comercialEstoque";
import DetalhesEstoqueProduto from "./DetalhesEstoqueProduto";

interface AdicionarProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdicionarProduto: (produto: ProdutoPedido) => void;
}

const AdicionarProdutoModal = ({ isOpen, onClose, onAdicionarProduto }: AdicionarProdutoModalProps) => {
  const [busca, setBusca] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState<string | null>(null);

  const produtosFiltrados = mockProdutosCatalogo.filter(produto =>
    produto.codigo.toLowerCase().includes(busca.toLowerCase()) ||
    produto.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  const handleVerDetalhes = (codigo: string) => {
    setProdutoSelecionado(codigo);
  };

  const handleAdicionarProduto = (codigo: string, quantidade: number, unidade: UnidadeVenda, desconto: number, observacoes: string) => {
    const produtoCatalogo = mockProdutosCatalogo.find(p => p.codigo === codigo);
    const estoqueInfo = mockProdutosEstoque[codigo];
    
    if (!produtoCatalogo || !estoqueInfo) return;

    const precoUnitario = estoqueInfo.precoSugerido;
    const precoComDesconto = precoUnitario * (1 - desconto / 100);
    
    const produto: ProdutoPedido = {
      id: Date.now(),
      codigo: produtoCatalogo.codigo,
      descricao: produtoCatalogo.descricao,
      quantidade,
      unidade,
      precoUnitario,
      desconto,
      precoFinal: precoComDesconto * quantidade,
      observacoes,
      estoqueDisponivel: estoqueInfo
    };

    onAdicionarProduto(produto);
    setProdutoSelecionado(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Adicionar Produto ao Pedido
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por código ou descrição do produto..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Lista de Produtos */}
            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {produtosFiltrados.map((produto) => {
                const estoque = mockProdutosEstoque[produto.codigo];
                const temEstoque = estoque && estoque.totalDisponivel > 0;
                
                return (
                  <div key={produto.codigo} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                            {produto.codigo}
                          </span>
                          <Badge 
                            variant={temEstoque ? "default" : "destructive"}
                            className={temEstoque ? "bg-green-500" : ""}
                          >
                            {temEstoque ? `${estoque.totalDisponivel} un` : 'Sem estoque'}
                          </Badge>
                        </div>
                        <h3 className="font-medium mb-1">{produto.descricao}</h3>
                        <div className="text-sm text-gray-500">
                          <p>Categoria: {produto.categoria}</p>
                          <p>Fabricante: {produto.fabricante}</p>
                          {estoque && (
                            <p className="text-green-600 font-medium">
                              Preço sugerido: {formatCurrency(estoque.precoSugerido)}
                            </p>
                          )}
                        </div>
                        
                        {estoque?.alertas && estoque.alertas.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {estoque.alertas.slice(0, 2).map((alerta, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {alerta.tipo === 'validade_proxima' ? '⚠️ Validade' : 
                                 alerta.tipo === 'multiplos_lotes' ? '📦 Multi-lotes' : 
                                 alerta.tipo === 'estoque_baixo' ? '📉 Baixo' : 
                                 alerta.tipo === 'numero_serie' ? '🔢 Série' : '⚠️ Alerta'}
                              </Badge>
                            ))}
                            {estoque.alertas.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{estoque.alertas.length - 2} mais
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVerDetalhes(produto.codigo)}
                          disabled={!estoque}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {produtosFiltrados.length === 0 && busca && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum produto encontrado</p>
                  <p className="text-sm">Tente buscar por outro termo</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {produtoSelecionado && (
        <DetalhesEstoqueProduto
          isOpen={!!produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
          produto={mockProdutosCatalogo.find(p => p.codigo === produtoSelecionado)!}
          estoque={mockProdutosEstoque[produtoSelecionado]}
          onAdicionarProduto={handleAdicionarProduto}
        />
      )}
    </>
  );
};

export default AdicionarProdutoModal;
