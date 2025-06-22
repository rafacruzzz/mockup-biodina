
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PosicaoEstoque } from "@/types/estoque";

interface ProductDetailsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProduct: PosicaoEstoque | null;
  posicaoEstoque: PosicaoEstoque[];
}

const ProductDetailsSheet = ({ isOpen, onOpenChange, selectedProduct, posicaoEstoque }: ProductDetailsSheetProps) => {
  // Obter todos os lotes do produto selecionado
  const getProductLots = () => {
    if (!selectedProduct) return [];
    return posicaoEstoque.filter(item => item.produto_codigo === selectedProduct.produto_codigo);
  };

  // Função para determinar cor da linha baseada na validade
  const getRowColor = (item: PosicaoEstoque) => {
    if (!item.data_validade) return "";
    
    const today = new Date();
    const expiryDate = new Date(item.data_validade);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "bg-red-50 border-l-4 border-l-red-500";
    if (diffDays <= 30) return "bg-yellow-50 border-l-4 border-l-yellow-500";
    if (diffDays <= 60) return "bg-orange-50 border-l-4 border-l-orange-500";
    return "";
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="text-xl">
            {selectedProduct?.produto_descricao}
          </SheetTitle>
          <SheetDescription>
            Código: {selectedProduct?.produto_codigo} | Todos os lotes e informações detalhadas
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Resumo do produto */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total de Lotes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getProductLots().length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Qtde Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getProductLots().reduce((acc, item) => acc + item.quantidade_disponivel, 0)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Todos os lotes */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Todos os Lotes</h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Qtde</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Local</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getProductLots().map((lot) => (
                    <TableRow key={lot.id} className={getRowColor(lot)}>
                      <TableCell className="text-sm">{lot.cnpj}</TableCell>
                      <TableCell className="font-mono text-sm">{lot.lote}</TableCell>
                      <TableCell className="font-semibold">{lot.quantidade_disponivel}</TableCell>
                      <TableCell className="text-sm">
                        {lot.data_validade ? 
                          new Date(lot.data_validade).toLocaleDateString('pt-BR') : 
                          <span className="text-gray-400">Sem validade</span>
                        }
                      </TableCell>
                      <TableCell className="text-sm">{lot.deposito}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Seções placeholder para futuras implementações */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Histórico de Movimentações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Últimas entradas, saídas e transferências deste produto serão exibidas aqui.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pedidos e Notas Vinculadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Pedidos em aberto e notas fiscais relacionadas a este produto.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductDetailsSheet;
