import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { ItemUsoConsumoPedido } from "@/types/comercial";
import { Card, CardContent } from "@/components/ui/card";

interface ItemUsoConsumo {
  id: string;
  codigo: string;
  descricao: string;
  categoria: string;
  unidade: string;
  estoqueAtual: number;
  estoqueMinimo: number;
  ultimaCompra?: string;
  fornecedor?: string;
}

const mockItensUsoConsumo: ItemUsoConsumo[] = [
  // CABOS E CONECTORES
  {
    id: "UC-001",
    codigo: "CABO-USB-2M",
    descricao: "Cabo USB 2.0 - 2 metros",
    categoria: "Cabos e Conectores",
    unidade: "UN",
    estoqueAtual: 45,
    estoqueMinimo: 10,
    ultimaCompra: "2024-09-15",
    fornecedor: "TechParts Ltda"
  },
  {
    id: "UC-002",
    codigo: "CABO-REDE-5M",
    descricao: "Cabo de Rede Cat6 - 5 metros",
    categoria: "Cabos e Conectores",
    unidade: "UN",
    estoqueAtual: 30,
    estoqueMinimo: 15,
    ultimaCompra: "2024-10-01",
    fornecedor: "TechParts Ltda"
  },
  {
    id: "UC-003",
    codigo: "CABO-FORCA-3P",
    descricao: "Cabo de Força 3 Pinos - 1,5m",
    categoria: "Cabos e Conectores",
    unidade: "UN",
    estoqueAtual: 60,
    estoqueMinimo: 20,
    ultimaCompra: "2024-08-20",
    fornecedor: "Eletromax"
  },
  // PROTEÇÃO ELÉTRICA
  {
    id: "UC-004",
    codigo: "NOBREAK-600VA",
    descricao: "Nobreak 600VA Bivolt",
    categoria: "Proteção Elétrica",
    unidade: "UN",
    estoqueAtual: 12,
    estoqueMinimo: 5,
    ultimaCompra: "2024-07-10",
    fornecedor: "SMS Tecnologia"
  },
  {
    id: "UC-005",
    codigo: "NOBREAK-1200VA",
    descricao: "Nobreak 1200VA Bivolt",
    categoria: "Proteção Elétrica",
    unidade: "UN",
    estoqueAtual: 8,
    estoqueMinimo: 3,
    ultimaCompra: "2024-07-10",
    fornecedor: "SMS Tecnologia"
  },
  {
    id: "UC-006",
    codigo: "ESTAB-1000VA",
    descricao: "Estabilizador 1000VA",
    categoria: "Proteção Elétrica",
    unidade: "UN",
    estoqueAtual: 15,
    estoqueMinimo: 5,
    ultimaCompra: "2024-06-25",
    fornecedor: "SMS Tecnologia"
  },
  // MANUAIS E DOCUMENTAÇÃO
  {
    id: "UC-007",
    codigo: "MANUAL-PT",
    descricao: "Manual de Operação PT-BR",
    categoria: "Documentação",
    unidade: "UN",
    estoqueAtual: 150,
    estoqueMinimo: 30,
    ultimaCompra: "2024-09-01",
    fornecedor: "Gráfica RápidaPrint"
  },
  {
    id: "UC-008",
    codigo: "MANUAL-EN",
    descricao: "Manual de Operação EN-US",
    categoria: "Documentação",
    unidade: "UN",
    estoqueAtual: 80,
    estoqueMinimo: 20,
    ultimaCompra: "2024-09-01",
    fornecedor: "Gráfica RápidaPrint"
  },
  {
    id: "UC-009",
    codigo: "FICHA-TEC",
    descricao: "Ficha Técnica Impressa",
    categoria: "Documentação",
    unidade: "UN",
    estoqueAtual: 200,
    estoqueMinimo: 50,
    ultimaCompra: "2024-08-15",
    fornecedor: "Gráfica RápidaPrint"
  },
  // MATERIAIS DE TRANSPORTE
  {
    id: "UC-010",
    codigo: "GELOX-1KG",
    descricao: "Gelox Reutilizável 1kg",
    categoria: "Materiais de Transporte",
    unidade: "UN",
    estoqueAtual: 100,
    estoqueMinimo: 25,
    ultimaCompra: "2024-10-05",
    fornecedor: "ColdChain Brasil"
  },
  {
    id: "UC-011",
    codigo: "GELO-SECO-5KG",
    descricao: "Gelo Seco - 5kg",
    categoria: "Materiais de Transporte",
    unidade: "KG",
    estoqueAtual: 50,
    estoqueMinimo: 20,
    ultimaCompra: "2024-10-08",
    fornecedor: "Dry Ice Solutions"
  },
  {
    id: "UC-012",
    codigo: "ISOPOR-TERM",
    descricao: "Caixa Térmica Isopor 20L",
    categoria: "Materiais de Transporte",
    unidade: "UN",
    estoqueAtual: 35,
    estoqueMinimo: 10,
    ultimaCompra: "2024-09-20",
    fornecedor: "Embalagens Premium"
  },
  // ACESSÓRIOS DIVERSOS
  {
    id: "UC-013",
    codigo: "ADAPT-TOMADA",
    descricao: "Adaptador de Tomada Universal",
    categoria: "Acessórios",
    unidade: "UN",
    estoqueAtual: 40,
    estoqueMinimo: 15,
    ultimaCompra: "2024-08-10",
    fornecedor: "TechParts Ltda"
  },
  {
    id: "UC-014",
    codigo: "FITA-ISOLANTE",
    descricao: "Fita Isolante 19mm x 10m",
    categoria: "Acessórios",
    unidade: "UN",
    estoqueAtual: 80,
    estoqueMinimo: 20,
    ultimaCompra: "2024-09-12",
    fornecedor: "3M do Brasil"
  },
  {
    id: "UC-015",
    codigo: "ORGANIZADOR-CABO",
    descricao: "Organizador de Cabos",
    categoria: "Acessórios",
    unidade: "UN",
    estoqueAtual: 55,
    estoqueMinimo: 15,
    ultimaCompra: "2024-07-30",
    fornecedor: "Office Supplies"
  }
];

interface AdicionarItemUsoConsumoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdicionarItem: (item: ItemUsoConsumoPedido) => void;
}

const AdicionarItemUsoConsumoModal = ({ isOpen, onClose, onAdicionarItem }: AdicionarItemUsoConsumoModalProps) => {
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [itemSelecionado, setItemSelecionado] = useState<ItemUsoConsumo | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [observacoes, setObservacoes] = useState('');

  const categorias = Array.from(new Set(mockItensUsoConsumo.map(item => item.categoria)));

  const itensFiltrados = mockItensUsoConsumo.filter(item => {
    const matchBusca = busca === '' || 
      item.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      item.descricao.toLowerCase().includes(busca.toLowerCase());
    
    const matchCategoria = categoriaFiltro === '' || item.categoria === categoriaFiltro;
    
    return matchBusca && matchCategoria;
  });

  const handleSelecionarItem = (item: ItemUsoConsumo) => {
    setItemSelecionado(item);
    setQuantidade(1);
    setObservacoes('');
  };

  const handleAdicionar = () => {
    if (!itemSelecionado) return;

    const novoItem: ItemUsoConsumoPedido = {
      id: 0, // será atualizado pelo componente pai
      itemId: itemSelecionado.id,
      codigo: itemSelecionado.codigo,
      descricao: itemSelecionado.descricao,
      quantidade,
      unidade: itemSelecionado.unidade,
      observacoes,
      categoria: itemSelecionado.categoria
    };

    onAdicionarItem(novoItem);
    handleFechar();
  };

  const handleFechar = () => {
    setBusca('');
    setCategoriaFiltro('');
    setItemSelecionado(null);
    setQuantidade(1);
    setObservacoes('');
    onClose();
  };

  const isEstoqueBaixo = (item: ItemUsoConsumo) => {
    return item.estoqueAtual <= item.estoqueMinimo;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleFechar}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Adicionar Item de Uso e Consumo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filtros */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="busca">Buscar Item</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="busca"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Digite código ou descrição..."
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="categoria">Filtrar por Categoria</Label>
              <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  {categorias.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lista de Itens */}
          <div>
            <Label className="mb-3 block">Itens Disponíveis ({itensFiltrados.length})</Label>
            <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto border rounded-lg p-2">
              {itensFiltrados.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <XCircle className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                  <p>Nenhum item encontrado</p>
                </div>
              ) : (
                itensFiltrados.map(item => (
                  <Card 
                    key={item.id} 
                    className={`cursor-pointer transition-all ${
                      itemSelecionado?.id === item.id 
                        ? 'border-biodina-gold bg-biodina-gold/5' 
                        : 'hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelecionarItem(item)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-semibold text-sm">{item.codigo}</span>
                            <Badge variant="outline" className="text-xs">{item.categoria}</Badge>
                            {isEstoqueBaixo(item) && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Estoque Baixo
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.descricao}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Estoque: <strong className={isEstoqueBaixo(item) ? 'text-red-600' : 'text-green-600'}>{item.estoqueAtual} {item.unidade}</strong></span>
                            <span>Mínimo: {item.estoqueMinimo} {item.unidade}</span>
                            {item.fornecedor && <span>Fornecedor: {item.fornecedor}</span>}
                          </div>
                        </div>
                        {itemSelecionado?.id === item.id && (
                          <CheckCircle className="h-5 w-5 text-biodina-gold flex-shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Configuração do Item Selecionado */}
          {itemSelecionado && (
            <Card className="border-biodina-gold">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <CheckCircle className="h-5 w-5 text-biodina-gold" />
                  <span className="font-semibold">Item Selecionado</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantidade">Quantidade *</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      value={quantidade}
                      onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))}
                      min="1"
                      max={itemSelecionado.estoqueAtual}
                      className="mt-2"
                    />
                    {quantidade > itemSelecionado.estoqueAtual && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Quantidade maior que o estoque disponível!
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Unidade</Label>
                    <Input value={itemSelecionado.unidade} disabled className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações (opcional)</Label>
                  <Textarea
                    id="observacoes"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Ex: Para equipamento XYZ, Versão atualizada, etc."
                    rows={3}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleFechar}>
            Cancelar
          </Button>
          <Button 
            onClick={handleAdicionar} 
            disabled={!itemSelecionado || quantidade <= 0}
            className="bg-biodina-gold hover:bg-biodina-gold/90"
          >
            Adicionar Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdicionarItemUsoConsumoModal;
