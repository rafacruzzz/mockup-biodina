
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Eye, Building } from "lucide-react";
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
  const [filtros, setFiltros] = useState<FiltrosState>({
    cnpjs: [],
    tipoEstoque: [],
    validadeMinima: '',
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

      // Filtro de CNPJ
      if (filtros.cnpjs.length > 0) {
        const temEstoqueNoCnpj = estoque.estoquesPorCnpj.some(e => 
          filtros.cnpjs.includes(e.cnpj) && e.quantidade > 0
        );
        if (!temEstoqueNoCnpj) return false;
      }

      // Filtro de tipo de estoque
      if (filtros.tipoEstoque.length > 0) {
        const temTipoEstoque = estoque.tiposEstoque.some(t => 
          filtros.tipoEstoque.includes(t.tipo) && t.quantidade > 0
        );
        if (!temTipoEstoque) return false;
      }

      // Filtro de categoria
      if (filtros.categoria && filtros.categoria !== 'todas' && produto.categoria !== filtros.categoria) {
        return false;
      }

      // Filtro de validade mínima (simplificado - apenas verifica se há filtro)
      if (filtros.validadeMinima) {
        const temValidadeOk = estoque.lotes.some(lote => {
          if (!lote.dataValidade) return true;
          const diasVencimento = Math.ceil(
            (new Date(lote.dataValidade).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          return diasVencimento >= 180; // 6 meses aproximadamente
        });
        if (!temValidadeOk) return false;
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
                              
                              if (alerta.tipo === 'validade_proxima') {
                                icon = '📅';
                                const loteVencimento = estoque.lotes.find(l => l.alertaValidade);
                                label = loteVencimento ? `${calcularDiasVencimento(loteVencimento.dataValidade!)} dias` : 'Validade';
                              } else if (alerta.tipo === 'multiplos_lotes') {
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
                      
                      {/* Botão de Ação */}
                      <div className="ml-4">
                        <button
                          onClick={() => setProdutoSelecionado(produto.codigo)}
                          disabled={estoque.totalDisponivel === 0}
                          className="bg-biodina-gold hover:bg-biodina-gold/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          Ver Detalhes
                        </button>
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
