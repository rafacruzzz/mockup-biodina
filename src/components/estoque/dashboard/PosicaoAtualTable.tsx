import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { PosicaoEstoque, StatusQualidade } from "@/types/estoque";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, AlertTriangle, Calendar, ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table as TanStackTable,
  TableHeader as TanStackTableHeader,
  TableBody as TanStackTableBody,
  TableHead as TanStackTableHead,
  TableRow as TanStackTableRow,
  TableCell as TanStackTableCell,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { ExportTable } from "@/components/shared/ExportTable";
import PosicaoEstoqueModalEnriquecido from "./PosicaoEstoqueModalEnriquecido";

interface PosicaoAtualTableProps {
  data: PosicaoEstoque[];
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

const PosicaoAtualTable = ({ data }: PosicaoAtualTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<PosicaoEstoque | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleDetailsClick = (item: PosicaoEstoque) => {
    setSelectedProduto(item);
    setIsModalOpen(true);
  };

  const getStatusBadgeColor = (status: StatusQualidade) => {
    switch (status) {
      case StatusQualidade.APROVADO:
        return "bg-green-100 text-green-800";
      case StatusQualidade.QUARENTENA:
        return "bg-yellow-100 text-yellow-800";
      case StatusQualidade.REJEITADO:
        return "bg-red-100 text-red-800";
      case StatusQualidade.LIBERADO:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    if (!sortConfig) return [...data];

    return [...data].sort((a, b) => {
      const key = sortConfig.key as keyof PosicaoEstoque;
      const direction = sortConfig.direction;

      if (a[key] === null && b[key] === null) return 0;
      if (a[key] === null) return direction === 'asc' ? -1 : 1;
      if (b[key] === null) return direction === 'asc' ? 1 : -1;

      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return direction === 'asc' ? a[key] as number - (b[key] as number) : (b[key] as number) - (a[key] as number);
      }

      const aValue = String(a[key]).toUpperCase();
      const bValue = String(b[key]).toUpperCase();

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredData = sortedData().filter(item => {
    const searchTermLower = debouncedSearchTerm.toLowerCase();
    const matchesSearch =
      item.produto_codigo.toLowerCase().includes(searchTermLower) ||
      item.produto_descricao.toLowerCase().includes(searchTermLower) ||
      item.lote.toLowerCase().includes(searchTermLower) ||
      (item.numero_serie?.toLowerCase().includes(searchTermLower) ?? false) ||
      item.cnpj.toLowerCase().includes(searchTermLower) ||
      item.cnpj_estado.toLowerCase().includes(searchTermLower) ||
      item.deposito.toLowerCase().includes(searchTermLower) ||
      item.localizacao_fisica.toLowerCase().includes(searchTermLower) ||
      item.fornecedor.toLowerCase().includes(searchTermLower);

    const matchesStatus = statusFilter ? item.status_qualidade === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationRange = () => {
    const delta = 2;
    let range = [];
    let pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
    const l = currentPage - delta;
    const r = currentPage + delta + 1;
  
    const shouldShowLeftDots = l > 2;
    const shouldShowRightDots = r < totalPages - 1;
  
    const leftmost = shouldShowLeftDots ? 1 : currentPage - delta;
    const rightmost = shouldShowRightDots ? totalPages : currentPage + delta;
  
    range.push(1);
  
    if (shouldShowLeftDots) {
      range.push('...');
    }
  
    for (let i = leftmost > 1 ? leftmost : 2; i <= (rightmost < totalPages ? rightmost : totalPages - 1); i++) {
      range.push(i);
    }
  
    if (shouldShowRightDots) {
      range.push('...');
    }
  
    range.push(totalPages);
  
    return range;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          type="search"
          placeholder="Buscar por código, descrição, lote..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center space-x-2">
          <Label htmlFor="status">Filtrar por Status:</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos os Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os Status</SelectItem>
              <SelectItem value={StatusQualidade.APROVADO}>Aprovado</SelectItem>
              <SelectItem value={StatusQualidade.QUARENTENA}>Quarentena</SelectItem>
              <SelectItem value={StatusQualidade.REJEITADO}>Rejeitado</SelectItem>
              <SelectItem value={StatusQualidade.LIBERADO}>Liberado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ExportTable data={filteredData} filename="posicao_estoque.csv" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50" 
                onClick={() => handleSort('produto_codigo')}
              >
                <div className="flex items-center gap-2">
                  Código
                  {sortConfig?.key === 'produto_codigo' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50" 
                onClick={() => handleSort('produto_descricao')}
              >
                <div className="flex items-center gap-2">
                  Descrição
                  {sortConfig?.key === 'produto_descricao' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Número de Série</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Depósito</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50" 
                onClick={() => handleSort('quantidade_disponivel')}
              >
                <div className="flex items-center gap-2">
                  Disponível
                  {sortConfig?.key === 'quantidade_disponivel' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>Reservada</TableHead>
              <TableHead>Dias p/ Venc.</TableHead>
              <TableHead>Status Qualidade</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-mono text-sm">{item.produto_codigo}</TableCell>
                <TableCell className="max-w-64">
                  <div className="truncate" title={item.produto_descricao}>
                    {item.produto_descricao}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{item.lote}</TableCell>
                <TableCell className="font-mono text-xs">{item.numero_serie || '-'}</TableCell>
                <TableCell className="text-xs">{item.cnpj}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {item.cnpj_estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{item.deposito}</TableCell>
                <TableCell className="font-mono text-xs">{item.localizacao_fisica}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-600">{item.quantidade_disponivel}</span>
                    {item.quantidade_disponivel < 50 && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" title="Estoque baixo" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-orange-600 font-semibold">{item.quantidade_reservada}</TableCell>
                <TableCell>
                  {item.dias_para_vencimento !== null ? (
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${
                        item.dias_para_vencimento <= 30 ? 'text-red-600' :
                        item.dias_para_vencimento <= 90 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {item.dias_para_vencimento}
                      </span>
                      {item.dias_para_vencimento <= 90 && (
                        <Calendar className="h-4 w-4 text-orange-500" title="Vencimento próximo" />
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(item.status_qualidade)}>
                    {item.status_qualidade}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm max-w-32 truncate" title={item.fornecedor}>
                  {item.fornecedor}
                </TableCell>
                <TableCell className="font-semibold text-blue-600">
                  R$ {item.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDetailsClick(item)}
                    className="hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Mostrando {startIndex + 1} - {Math.min(endIndex, totalItems)} de {totalItems}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </Button>

          {getPaginationRange().map((page, index) => (
            page === '...' ? (
              <span key={index} className="px-2 text-gray-500">
                {page}
              </span>
            ) : (
              <Button
                key={index}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </Button>
            )
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Próximo
          </Button>
        </div>
      </div>

      <PosicaoEstoqueModalEnriquecido
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        produto={selectedProduto}
        todosProdutos={filteredData}
      />
    </div>
  );
};

export default PosicaoAtualTable;
