import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package, FileText, Building, CheckCircle } from "lucide-react";
import { modules } from "@/data/cadastroModules";
import { toast } from "sonner";

interface NovoRegistroAnvisaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NovoRegistroAnvisaModal = ({ isOpen, onClose }: NovoRegistroAnvisaModalProps) => {
  const [busca, setBusca] = useState('');
  const [filtros, setFiltros] = useState({
    familiaProduto: '',
    marca: '',
    areaAnvisa: ''
  });

  // Obter dados dos produtos do cadastro
  const produtos = modules.produtos.subModules.produtos.data;

  const aplicarFiltros = () => {
    return produtos.filter(produto => {
      // Filtro de busca
      const matchBusca = !busca || 
        produto.codigo?.toLowerCase().includes(busca.toLowerCase()) ||
        produto.referencia?.toLowerCase().includes(busca.toLowerCase()) ||
        produto.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        produto.descricao?.toLowerCase().includes(busca.toLowerCase()) ||
        produto.marca?.toLowerCase().includes(busca.toLowerCase());

      if (!matchBusca) return false;

      // Filtro de família de produto
      if (filtros.familiaProduto && produto.familiaProduto !== filtros.familiaProduto) {
        return false;
      }

      // Filtro de marca
      if (filtros.marca && produto.marca !== filtros.marca) {
        return false;
      }

      // Filtro de área ANVISA
      if (filtros.areaAnvisa && produto.areaAnvisa !== filtros.areaAnvisa) {
        return false;
      }

      return true;
    });
  };

  const produtosFiltrados = aplicarFiltros();

  // Obter opções únicas para os filtros
  const familiasProdutos = [...new Set(produtos.map(p => p.familiaProduto).filter(Boolean))];
  const marcas = [...new Set(produtos.map(p => p.marca).filter(Boolean))];

  const handleSelecionarProduto = (produto: any) => {
    toast.success(`Produto "${produto.nome}" selecionado para registro ANVISA`, {
      description: `Código: ${produto.codigo} | Referência: ${produto.referencia}`
    });
    onClose();
  };

  const limparFiltros = () => {
    setBusca('');
    setFiltros({
      familiaProduto: '',
      marca: '',
      areaAnvisa: ''
    });
  };

  const getAreaAnvisaLabel = (area: string) => {
    switch (area) {
      case 'produtos_saude': return 'Produtos para Saúde';
      case 'diagnostico_in_vitro': return 'Diagnóstico In Vitro';
      default: return area;
    }
  };

  const getAreaAnvisaBadgeColor = (area: string) => {
    switch (area) {
      case 'produtos_saude': return 'bg-blue-100 text-blue-800';
      case 'diagnostico_in_vitro': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Novo Registro ANVISA - Selecionar Produto
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            {/* Busca Geral */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Busca Geral
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Código, Referência, Nome, Descrição, Marca..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Família de Produto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Família de Produto
              </label>
              <Select value={filtros.familiaProduto} onValueChange={(value) => setFiltros(prev => ({ ...prev, familiaProduto: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as famílias</SelectItem>
                  {familiasProdutos.map(familia => (
                    <SelectItem key={familia} value={familia}>{familia}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marca
              </label>
              <Select value={filtros.marca} onValueChange={(value) => setFiltros(prev => ({ ...prev, marca: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as marcas</SelectItem>
                  {marcas.map(marca => (
                    <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Área da ANVISA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área da ANVISA
              </label>
              <Select value={filtros.areaAnvisa} onValueChange={(value) => setFiltros(prev => ({ ...prev, areaAnvisa: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as áreas</SelectItem>
                  <SelectItem value="produtos_saude">Produtos para Saúde</SelectItem>
                  <SelectItem value="diagnostico_in_vitro">Diagnóstico In Vitro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Botão Limpar Filtros */}
            <div className="lg:col-span-4 flex justify-end">
              <Button variant="outline" onClick={limparFiltros} className="text-sm">
                Limpar Filtros
              </Button>
            </div>
          </div>

          {/* Contador de Resultados */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Lista de Produtos */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {produtosFiltrados.map((produto) => (
              <div key={produto.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* Header do Produto */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {produto.codigo}
                      </span>
                      <span className="font-mono text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        REF: {produto.referencia}
                      </span>
                      <Badge className={getAreaAnvisaBadgeColor(produto.areaAnvisa)}>
                        {getAreaAnvisaLabel(produto.areaAnvisa)}
                      </Badge>
                    </div>

                    {/* Nome e Descrição */}
                    <h3 className="font-semibold text-lg mb-1">{produto.nome}</h3>
                    <p className="text-gray-600 text-sm mb-3">{produto.descricao}</p>
                    
                    {/* Informações Organizadas */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Família:</span>
                        <span className="ml-2 font-medium">{produto.familiaProduto}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Marca:</span>
                        <span className="ml-2 font-medium">{produto.marca}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Modelo:</span>
                        <span className="ml-2 font-medium">{produto.modelo}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Fabricante:</span>
                        <span className="ml-2 font-medium">{produto.fabricante}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Botão de Seleção */}
                  <div className="ml-4">
                    <Button
                      onClick={() => handleSelecionarProduto(produto)}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Selecionar Produto
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {produtosFiltrados.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
                <p className="text-sm">Tente ajustar os filtros ou termo de busca</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};