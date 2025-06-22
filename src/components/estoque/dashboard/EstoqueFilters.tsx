
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileSpreadsheet } from "lucide-react";

interface EstoqueFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  quickFilter: string;
  onQuickFilterChange: (filter: string) => void;
  selectedTipoEstoque: string;
  onTipoEstoqueChange: (tipo: string) => void;
  onExportExcel: () => void;
  produtosVencidos: number;
  produtosVencendo: number;
  produtosComReserva: number;
  posicaoEstoqueLength: number;
}

const EstoqueFilters = ({
  searchTerm,
  onSearchChange,
  quickFilter,
  onQuickFilterChange,
  selectedTipoEstoque,
  onTipoEstoqueChange,
  onExportExcel,
  produtosVencidos,
  produtosVencendo,
  produtosComReserva,
  posicaoEstoqueLength
}: EstoqueFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-biodina-blue mb-2">Gestão de Estoque</h1>
          <p className="text-gray-600">Controle completo com visão gerencial integrada</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar produto, lote, código, fornecedor..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          
          <Button onClick={onExportExcel} variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filtros rápidos */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-gray-600">Filtros rápidos:</span>
        {[
          { key: "todos", label: "Todos", count: posicaoEstoqueLength },
          { key: "vencidos", label: "Vencidos", count: produtosVencidos },
          { key: "vencendo", label: "Vencendo (30d)", count: produtosVencendo },
          { key: "estoque_baixo", label: "Estoque Baixo", count: posicaoEstoqueLength },
          { key: "reservados", label: "Com Reserva", count: produtosComReserva }
        ].map((filter) => (
          <Button
            key={filter.key}
            variant={quickFilter === filter.key ? "default" : "outline"}
            size="sm"
            onClick={() => onQuickFilterChange(filter.key)}
            className="text-xs"
          >
            {filter.label} ({filter.count})
          </Button>
        ))}
      </div>

      {/* Filtro por tipo */}
      <div className="flex items-center gap-2">
        <select
          value={selectedTipoEstoque}
          onChange={(e) => onTipoEstoqueChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm"
        >
          <option value="todos">Todos os tipos</option>
          <option value="Nacional">Nacional</option>
          <option value="Importação Direta">Importação Direta</option>
          <option value="Consignado">Consignado</option>
        </select>
      </div>
    </div>
  );
};

export default EstoqueFilters;
