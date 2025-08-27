
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Package, Eye, Building, Plus, ShoppingCart, Calendar, AlertTriangle } from "lucide-react";
import { ProdutoPedido, UnidadeVenda } from "@/types/comercial";
import { mockProdutosCatalogo, mockProdutosEstoque } from "@/data/comercialEstoque";
import DetalhesEstoqueProduto from "./DetalhesEstoqueProduto";
import FiltrosAvancados, { FiltrosState } from "./FiltrosAvancados";

interface AdicionarProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdicionarProduto: (produto: ProdutoPedido) => void;
}

const AdicionarProdutoModal = ({ isOpen, onClose, onAdicionarProduto }: AdicionarProdutoModalProps) => {
  const [busca, setBusca] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState<string | null>(null);
  const [quantidades, setQuantidades] = useState<Record<string, number>>({});
  const [filtros, setFiltros] = useState<FiltrosState>({
    linhasProdutos: [],
    fornecedores: [],
    categoria: ''
  });

  const aplicarFiltros = (produtos: typeof mockProdutosCatalogo) => {
    return produtos.filter(produto => {
      const estoque = mockProdutosEstoque[produto.codigo];
      if (!estoque) return false;

      // Filtro de busca
      const matchBusca = !busca || 
        produto.codigo.toLowerCase().includes(busca.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        produto.fabricante.toLowerCase().includes(busca.toLowerCase());

      if (!matchBusca) return false;

      // Filtro de categoria
      if (filtros.categoria && filtros.categoria !== 'todas' && produto.categoria !== filtros.categoria) {
        return false;
      }

      // Filtro de linha de produtos (usando categoria como proxy)
      if (filtros.linhasProdutos.length > 0) {
        const temLinhaProduto = filtros.linhasProdutos.includes(produto.categoria);
        if (!temLinhaProduto) return false;
      }

      // Filtro de fornecedor
      if (filtros.fornecedores.length > 0) {
        const temFornecedor = filtros.fornecedores.includes(produto.fabricante);
        if (!temFornecedor) return false;
      }

      return true;
    });
  };

  const produtosFiltrados = aplicarFiltros(mockProdutosCatalogo);

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

  const handleAdicionarDireto = (codigo: string) => {
    const quantidade = quantidades[codigo] || 1;
    const produtoCatalogo = mockProdutosCatalogo.find(p => p.codigo === codigo);
    const estoqueInfo = mockProdutosEstoque[codigo];
    
    if (!produtoCatalogo || !estoqueInfo || quantidade > estoqueInfo.totalDisponivel) return;

    const produto: ProdutoPedido = {
      id: Date.now(),
      codigo: produtoCatalogo.codigo,
      descricao: produtoCatalogo.descricao,
      quantidade,
      unidade: UnidadeVenda.UNIDADE,
      precoUnitario: estoqueInfo.precoSugerido,
      desconto: 0,
      precoFinal: estoqueInfo.precoSugerido * quantidade,
      observacoes: '',
      estoqueDisponivel: estoqueInfo
    };

    onAdicionarProduto(produto);
    
    // Limpar a quantidade após adicionar
    setQuantidades(prev => ({ ...prev, [codigo]: 1 }));
  };

  const handleQuantidadeChange = (codigo: string, novaQuantidade: number) => {
    const estoque = mockProdutosEstoque[codigo];
    const quantidadeValida = Math.max(1, Math.min(novaQuantidade, estoque?.totalDisponivel || 1));
    setQuantidades(prev => ({ ...prev, [codigo]: quantidadeValida }));
  };

  const getQuantidadeProduto = (codigo: string) => {
    return quantidades[codigo] || 1;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getEstoqueStatus = (quantidade: number) => {
    if (quantidade === 0) return { color: 'bg-red-500', icon: '🔴' };
    if (quantidade < 50) return { color: 'bg-orange-500', icon: '🟠' };
    return { color: 'bg-green-500', icon: '🟢' };
  };

  const calcularDiasVencimento = (dataValidade: string) => {
    const hoje = new Date();
    const validade = new Date(dataValidade);
    return Math.ceil((validade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getIndicadorValidade = (estoque: any) => {
    const loteProximoVencimento = estoque.lotes.find((lote: any) => lote.alertaValidade && lote.dataValidade);
    if (!loteProximoVencimento) return null;
    
    const diasVencimento = calcularDiasVencimento(loteProximoVencimento.dataValidade);
    if (diasVencimento <= 30) {
      return { dias: diasVencimento, severidade: 'alta' as const };
    } else if (diasVencimento <= 90) {
      return { dias: diasVencimento, severidade: 'media' as const };
    }
    return null;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Adicionar Produto ao Pedido
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Barra de Busca e Filtros */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por código, descrição ou fabricante..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
              <FiltrosAvancados 
                onFiltrosChange={setFiltros}
                filtrosAtivos={filtros}
              />
            </div>

            {/* Contador de Resultados */}
            <div className="text-sm text-gray-600">
              {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
            </div>

            {/* Lista de Produtos */}
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {produtosFiltrados.map((produto) => {
                const estoque = mockProdutosEstoque[produto.codigo];
                const statusEstoque = getEstoqueStatus(estoque.totalDisponivel);
                const quantidadeAtual = getQuantidadeProduto(produto.codigo);
                const indicadorValidade = getIndicadorValidade(estoque);
                
                return (
                  <div key={produto.codigo} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        {/* Header do Produto */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                            {produto.codigo}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{statusEstoque.icon}</span>
                            <Badge 
                              className={`${statusEstoque.color} text-white`}
                            >
                              {estoque.totalDisponivel} un
                            </Badge>
                          </div>
                          {/* Indicador de Validade */}
                          {indicadorValidade && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs flex items-center gap-1 ${
                                indicadorValidade.severidade === 'alta' ? 'border-red-300 text-red-700 bg-red-50' :
                                'border-orange-300 text-orange-700 bg-orange-50'
                              }`}
                            >
                              <Calendar className="h-3 w-3" />
                              {indicadorValidade.dias} dias
                            </Badge>
                          )}
                        </div>

                        {/* Descrição */}
                        <h3 className="font-semibold text-lg mb-2">{produto.descricao}</h3>
                        
                        {/* Informações Básicas */}
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="text-sm text-gray-600">
                            <strong>Fabricante:</strong> {produto.fabricante}
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Categoria:</strong> {produto.categoria}
                          </div>
                        </div>

                        {/* Preço */}
                        <div className="mb-3">
                          <span className="text-lg font-bold text-green-600">
                            {formatCurrency(estoque.precoSugerido)}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">preço sugerido</span>
                        </div>

                        {/* Estoque por CNPJ */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Building className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Estoque por filial:</span>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {estoque.estoquesPorCnpj.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {item.nomeEmpresa}: {item.quantidade} un
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Alertas */}
                        {estoque.alertas && estoque.alertas.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {estoque.alertas.slice(0, 3).map((alerta, idx) => {
                              let icon = '⚠️';
                              let label = 'Alerta';
                              
                              if (alerta.tipo === 'multiplos_lotes') {
                                icon = '📦';
                                label = `${estoque.lotes.length} lotes`;
                              } else if (alerta.tipo === 'estoque_baixo') {
                                icon = '📉';
                                label = 'Baixo';
                              } else if (alerta.tipo === 'numero_serie') {
                                icon = '🔢';
                                label = 'Série';
                              }
                              
                              return (
                                <Badge 
                                  key={idx} 
                                  variant="outline" 
                                  className={`text-xs ${
                                    alerta.severidade === 'alta' ? 'border-red-300 text-red-700' :
                                    alerta.severidade === 'media' ? 'border-orange-300 text-orange-700' :
                                    'border-yellow-300 text-yellow-700'
                                  }`}
                                >
                                  {icon} {label}
                                </Badge>
                              );
                            })}
                            {estoque.alertas.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{estoque.alertas.length - 3} mais
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Área de Ação - Quantidade e Botões */}
                      <div className="ml-4 flex flex-col gap-3 min-w-[200px]">
                        {/* Campo de Quantidade */}
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-700 min-w-[60px]">
                            Qtd:
                          </label>
                          <Input
                            type="number"
                            min="1"
                            max={estoque.totalDisponivel}
                            value={quantidadeAtual}
                            onChange={(e) => handleQuantidadeChange(produto.codigo, parseInt(e.target.value) || 1)}
                            className="w-20 h-8 text-center"
                            disabled={estoque.totalDisponivel === 0}
                          />
                        </div>

                        {/* Total Calculado */}
                        <div className="text-sm">
                          <span className="text-gray-600">Total: </span>
                          <span className="font-bold text-green-600">
                            {formatCurrency(estoque.precoSugerido * quantidadeAtual)}
                          </span>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAdicionarDireto(produto.codigo)}
                            disabled={estoque.totalDisponivel === 0 || quantidadeAtual > estoque.totalDisponivel}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 text-sm flex items-center gap-1 flex-1"
                          >
                            <Plus className="h-3 w-3" />
                            Adicionar
                          </Button>
                          
                          <Button
                            onClick={() => setProdutoSelecionado(produto.codigo)}
                            variant="outline"
                            className="px-3 py-2 text-sm flex items-center gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            Detalhes
                          </Button>
                        </div>

                        {/* Validação de Quantidade */}
                        {quantidadeAtual > estoque.totalDisponivel && (
                          <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                            ⚠️ Quantidade maior que disponível
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {produtosFiltrados.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum produto encontrado</p>
                  <p className="text-sm">Tente ajustar os filtros ou termo de busca</p>
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
