
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Eye, Package } from "lucide-react";
import { ProductRegistrationData } from "@/types/product";

interface ProductListingTableProps {
  products: ProductRegistrationData[];
  onEdit: (product: ProductRegistrationData) => void;
  onView: (product: ProductRegistrationData) => void;
  onDelete: (productId: string) => void;
}

const ProductListingTable = ({ products, onEdit, onView, onDelete }: ProductListingTableProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Nenhum produto cadastrado</p>
        <p className="text-gray-400 text-sm">Clique em "Novo Produto" para começar</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow className="bg-gray-50/50 border-b">
              <TableHead className="font-semibold text-gray-700 py-4 px-6 min-w-[120px]">Código</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4 px-6 min-w-[200px]">Descrição</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4 px-6 min-w-[150px]">Marca</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4 px-6 min-w-[130px]">Preço Unitário</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4 px-6 min-w-[120px]">Estoque Disponível</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4 px-6 min-w-[130px]">Última Alteração</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4 px-6 w-32 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow 
                key={product.codigo}
                className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
              >
                <TableCell className="py-4 px-6 font-medium text-biodina-blue">
                  {product.codigo}
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900 truncate max-w-[200px]" title={product.descricao}>
                      {product.descricao}
                    </p>
                    <p className="text-sm text-gray-500">{product.linhaProduto}</p>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <Badge variant="outline" className="border-biodina-gold/30 text-biodina-blue">
                    {product.marca || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-6 font-medium text-biodina-blue">
                  {formatCurrency(product.precoUnitarioVenda)}
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${product.estoqueDisponivel > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.estoqueDisponivel}
                    </span>
                    <Badge 
                      variant={product.estoqueDisponivel > 0 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {product.estoqueDisponivel > 0 ? 'Disponível' : 'Indisponível'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6 text-gray-600">
                  {formatDate(product.ultimaAlteracao)}
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex justify-center gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 hover:bg-blue-50"
                      onClick={() => onView(product)}
                    >
                      <Eye className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 hover:bg-biodina-gold/10"
                      onClick={() => onEdit(product)}
                    >
                      <Edit className="h-4 w-4 text-biodina-gold" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 hover:bg-red-50"
                      onClick={() => onDelete(product.codigo)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductListingTable;
