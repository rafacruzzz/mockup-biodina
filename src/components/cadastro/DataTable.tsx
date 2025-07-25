
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, MoreHorizontal, Package } from "lucide-react";
import { ModuleData } from "@/types/cadastro";

interface DataTableProps {
  data: ModuleData[];
  moduleName: string;
  onRowClick?: (item: any) => void;
}

const DataTable = ({ data, moduleName, onRowClick }: DataTableProps) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Nenhum registro encontrado</p>
        <p className="text-gray-400 text-sm">Clique em "Novo Registro" para começar</p>
      </div>
    );
  }

  const headers = Object.keys(data[0]).filter(key => key !== 'id');

  const renderCellContent = (value: any, header: string) => {
    // Handle null/undefined values
    if (value === null || value === undefined) {
      return <span className="text-gray-400">-</span>;
    }

    // Handle boolean values
    if (typeof value === 'boolean') {
      return (
        <Badge className={`${value ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'} px-2 py-1`}>
          {value ? 'Sim' : 'Não'}
        </Badge>
      );
    }

    // Handle numeric values for currency fields
    if (typeof value === 'number' && (header.includes('valor') || header.includes('preco') || header.includes('custo'))) {
      return (
        <span className="font-medium text-biodina-blue">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
        </span>
      );
    }

    // Handle status/category/type fields with badges
    if (header === 'status' || header === 'categoria' || header === 'tipo') {
      return (
        <Badge variant="outline" className="border-biodina-gold/30 text-biodina-blue">
          {String(value)}
        </Badge>
      );
    }

    // Handle arrays (like itens in pedidos)
    if (Array.isArray(value)) {
      return (
        <span className="text-gray-600 text-sm">
          {value.length} {value.length === 1 ? 'item' : 'itens'}
        </span>
      );
    }

    // Handle objects
    if (typeof value === 'object') {
      return (
        <span className="text-gray-600 text-sm">
          Objeto
        </span>
      );
    }

    // Handle all other values (strings, numbers)
    return <span className="text-gray-700">{String(value)}</span>;
  };

  // Função para lidar com clique no botão de editar
  const handleEditClick = (item: ModuleData, event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que o clique na linha seja acionado
    
    // Emitir evento customizado para o componente pai
    const editEvent = new CustomEvent('editItem', { 
      detail: { item, moduleName } 
    });
    window.dispatchEvent(editEvent);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="bg-gray-50/50 border-b">
                {headers.map(header => (
                  <TableHead key={header} className="font-semibold text-gray-700 py-4 px-6 min-w-[150px] whitespace-nowrap">
                    {header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
                  </TableHead>
                ))}
                <TableHead className="w-32 text-center sticky right-0 bg-gray-50/50 whitespace-nowrap">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: ModuleData) => (
                <TableRow 
                  key={item.id} 
                  className={`hover:bg-gray-50/50 transition-colors border-b border-gray-100 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {headers.map(header => (
                    <TableCell key={header} className="py-4 px-6 min-w-[150px] whitespace-nowrap">
                      {renderCellContent(item[header], header)}
                    </TableCell>
                  ))}
                  <TableCell className="text-center sticky right-0 bg-white border-l border-gray-100">
                    <div className="flex justify-center gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 hover:bg-biodina-gold/10"
                        onClick={(event) => handleEditClick(item, event)}
                      >
                        <Edit className="h-4 w-4 text-biodina-gold" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
