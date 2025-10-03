import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Link, Package, Barcode, Hash } from "lucide-react";

interface VincularProdutoProps {
  produto: any;
  onClose: () => void;
  onVincular: (vinculacao: any) => void;
}

const VincularProduto = ({ produto, onClose, onVincular }: VincularProdutoProps) => {
  const [busca, setBusca] = useState({
    nome: '',
    codigoBarras: '',
    codeProduct: '',
    tipoProduto: 'todos'
  });
  const [resultados, setResultados] = useState<any[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  // Dados simulados de produtos cadastrados
  const produtosCadastrados = [
    {
      id: 1,
      nome: "Paracetamol 500mg Genérico",
      descricao: "Analgésico e antipirético para dor e febre",
      codigoBarras: "7891234567890",
      codeProduct: "PAR500GEN",
      tipoProduto: "Medicamento",
      controladoPorLote: true,
      requerNumeroSerie: false,
      fabricante: "EMS Pharma",
      registro: "MS123456"
    },
    {
      id: 2,
      nome: "Termômetro Digital Clínico Premium",
      descricao: "Termômetro digital de alta precisão para uso clínico",
      codigoBarras: "7891234567891",
      codeProduct: "TERMDIG001",
      tipoProduto: "Equipamento",
      controladoPorLote: true,
      requerNumeroSerie: true,
      fabricante: "Tech Medical",
      registro: "ANVISA789"
    },
    {
      id: 3,
      nome: "Ibuprofeno 400mg",
      descricao: "Anti-inflamatório não esteroidal para dor e inflamação",
      codigoBarras: "7891234567892",
      codeProduct: "IBU400",
      tipoProduto: "Medicamento",
      controladoPorLote: true,
      requerNumeroSerie: false,
      fabricante: "Medley",
      registro: "MS654321"
    }
  ];

  const handleBuscar = () => {
    setBuscando(true);
    
    // Simular busca com delay
    setTimeout(() => {
      const resultadosFiltrados = produtosCadastrados.filter(p => {
        const matchNome = !busca.nome || 
          p.nome.toLowerCase().includes(busca.nome.toLowerCase()) ||
          p.descricao?.toLowerCase().includes(busca.nome.toLowerCase());
        const matchCodigo = !busca.codigoBarras || p.codigoBarras.includes(busca.codigoBarras);
        const matchProduct = !busca.codeProduct || p.codeProduct.toLowerCase().includes(busca.codeProduct.toLowerCase());
        const matchTipo = !busca.tipoProduto || busca.tipoProduto === 'todos' || p.tipoProduto === busca.tipoProduto;
        
        return matchNome && matchCodigo && matchProduct && matchTipo;
      });
      
      setResultados(resultadosFiltrados);
      setBuscando(false);
    }, 1000);
  };

  const handleSelecionarProduto = (produtoCadastrado: any) => {
    setProdutoSelecionado(produtoCadastrado);
  };

  const handleConfirmarVinculacao = () => {
    if (produtoSelecionado) {
      onVincular({
        produtoId: produtoSelecionado.id,
        nome: produtoSelecionado.nome,
        codeProduct: produtoSelecionado.codeProduct,
        controladoPorLote: produtoSelecionado.controladoPorLote,
        requerNumeroSerie: produtoSelecionado.requerNumeroSerie
      });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-biodina-blue flex items-center gap-2">
            <Link className="h-5 w-5" />
            Vincular Produto do Sistema
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Produto a ser vinculado */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">Produto da Nota Fiscal</h4>
            <div className="text-sm text-gray-600">
              <p><strong>Código:</strong> {produto.codigo}</p>
              <p><strong>Descrição:</strong> {produto.descricao}</p>
              <p><strong>Lote:</strong> {produto.lote}</p>
              {produto.numeroSerie && <p><strong>Número de Série:</strong> {produto.numeroSerie}</p>}
            </div>
          </div>

          {/* Formulário de busca */}
          <div className="space-y-4">
            <h4 className="font-medium text-biodina-blue flex items-center gap-2">
              <Search className="h-4 w-4" />
              Buscar Produto Cadastrado
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="nomeBusca">Nome ou Descrição do Produto</Label>
                <Input
                  id="nomeBusca"
                  placeholder="Digite o nome ou descrição do produto..."
                  value={busca.nome}
                  onChange={(e) => setBusca(prev => ({ ...prev, nome: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigoBarrasBusca">Código de Barras</Label>
                <Input
                  id="codigoBarrasBusca"
                  placeholder="Digite o código de barras..."
                  value={busca.codigoBarras}
                  onChange={(e) => setBusca(prev => ({ ...prev, codigoBarras: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codeProductBusca">Code Product</Label>
                <Input
                  id="codeProductBusca"
                  placeholder="Digite o código do produto..."
                  value={busca.codeProduct}
                  onChange={(e) => setBusca(prev => ({ ...prev, codeProduct: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoProdutoBusca">Tipo do Produto</Label>
                <Select 
                  value={busca.tipoProduto} 
                  onValueChange={(value) => setBusca(prev => ({ ...prev, tipoProduto: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="Medicamento">Medicamento</SelectItem>
                    <SelectItem value="Equipamento">Equipamento</SelectItem>
                    <SelectItem value="Material">Material</SelectItem>
                    <SelectItem value="Consumível">Consumível</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleBuscar} disabled={buscando} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              {buscando ? "Buscando..." : "Buscar Produtos"}
            </Button>
          </div>

          {/* Resultados da busca */}
          {resultados.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-biodina-blue">
                Resultados da Busca ({resultados.length})
              </h4>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {resultados.map((resultado) => (
                  <div
                    key={resultado.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      produtoSelecionado?.id === resultado.id 
                        ? 'border-biodina-blue bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSelecionarProduto(resultado)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-medium text-biodina-blue">{resultado.nome}</h5>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            Code: {resultado.codeProduct}
                          </div>
                          <div className="flex items-center gap-1">
                            <Barcode className="h-3 w-3" />
                            {resultado.codigoBarras}
                          </div>
                          <div>Fabricante: {resultado.fabricante}</div>
                          <div>Registro: {resultado.registro}</div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {resultado.tipoProduto}
                          </Badge>
                          {resultado.controladoPorLote && (
                            <Badge variant="outline" className="text-xs bg-yellow-50 border-yellow-200 text-yellow-700">
                              <Hash className="h-3 w-3 mr-1" />
                              Lote
                            </Badge>
                          )}
                          {resultado.requerNumeroSerie && (
                            <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                              <Hash className="h-3 w-3 mr-1" />
                              Série
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {produtoSelecionado?.id === resultado.id && (
                        <div className="text-biodina-blue">
                          <Search className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultados.length === 0 && busca.nome && !buscando && (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum produto encontrado com os critérios informados</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmarVinculacao} 
            disabled={!produtoSelecionado}
            className="flex-1 bg-biodina-blue hover:bg-biodina-blue/90"
          >
            <Link className="h-4 w-4 mr-2" />
            Confirmar Vinculação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VincularProduto;
