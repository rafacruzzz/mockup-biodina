import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUpDown, Eye, Download, Search, Filter } from "lucide-react";
import { PosicaoEstoque, StatusQualidade } from "@/types/estoque";
import PosicaoEstoqueModal from "./PosicaoEstoqueModal";

interface PosicaoAtualTableProps {
  data: PosicaoEstoque[];
}

const PosicaoAtualTable = ({ data }: PosicaoAtualTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCnpj, setSelectedCnpj] = useState("todos");
  const [selectedTipoEstoque, setSelectedTipoEstoque] = useState("todos");
  const [selectedFornecedor, setSelectedFornecedor] = useState("todos");
  const [selectedEstado, setSelectedEstado] = useState("todos");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedProduct, setSelectedProduct] = useState<PosicaoEstoque | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obter valores únicos para filtros
  const cnpjsUnicos = [...new Set(data.map(item => item.cnpj))];
  const tiposEstoque = [...new Set(data.map(item => item.tipo_estoque))];
  const fornecedores = [...new Set(data.map(item => item.fornecedor))];
  const estados = [...new Set(data.map(item => item.cnpj_estado))];

  // Função de ordenação
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Aplicar filtros e ordenação
  const getFilteredAndSortedData = () => {
    let filtered = data.filter(item => {
      const matchesSearch = !searchTerm || 
        item.produto_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.produto_codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lote.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numero_serie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCnpj = selectedCnpj === "todos" || item.cnpj === selectedCnpj;
      const matchesTipo = selectedTipoEstoque === "todos" || item.tipo_estoque === selectedTipoEstoque;
      const matchesFornecedor = selectedFornecedor === "todos" || item.fornecedor === selectedFornecedor;
      const matchesEstado = selectedEstado === "todos" || item.cnpj_estado === selectedEstado;
      
      return matchesSearch && matchesCnpj && matchesTipo && matchesFornecedor && matchesEstado;
    });

    // Aplicar ordenação
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField as keyof typeof a];
        let bValue = b[sortField as keyof typeof b];
        
        if (sortField === "data_validade") {
          aValue = aValue ? new Date(aValue as string).getTime() : 0;
          bValue = bValue ? new Date(bValue as string).getTime() : 0;
        }
        
        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();
        
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  };

  const filteredData = getFilteredAndSortedData();

  // Função para exportar
  const exportToExcel = () => {
    const csvContent = [
      ["Código", "Produto", "CNPJ", "Estado", "Lote", "Série", "Qtde Disp.", "Qtde Res.", "Validade", "Dias Venc.", "Status", "Fornecedor", "Tipo", "Localização", "Valor Total"],
      ...filteredData.map(item => [
        item.produto_codigo,
        item.produto_descricao,
        item.cnpj,
        item.cnpj_estado,
        item.lote,
        item.numero_serie || "",
        item.quantidade_disponivel,
        item.quantidade_reservada,
        item.data_validade ? new Date(item.data_validade).toLocaleDateString('pt-BR') : "Sem validade",
        item.dias_para_vencimento || "",
        item.status_qualidade,
        item.fornecedor,
        item.tipo_estoque,
        `${item.deposito} - ${item.localizacao_fisica}`,
        `R$ ${item.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `posicao_estoque_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Função para determinar cor da linha baseada na validade
  const getRowColor = (item: PosicaoEstoque) => {
    if (!item.data_validade) return "";
    
    const dias = item.dias_para_vencimento;
    if (dias === null) return "";
    
    if (dias <= 0) return "bg-red-50 border-l-4 border-l-red-500";
    if (dias <= 30) return "bg-yellow-50 border-l-4 border-l-yellow-500";
    if (dias <= 90) return "bg-orange-50 border-l-4 border-l-orange-500";
    return "";
  };

  const getStatusQualidadeBadge = (status: StatusQualidade) => {
    const colors = {
      [StatusQualidade.APROVADO]: "bg-green-100 text-green-800",
      [StatusQualidade.LIBERADO]: "bg-blue-100 text-blue-800", 
      [StatusQualidade.QUARENTENA]: "bg-yellow-100 text-yellow-800",
      [StatusQualidade.REJEITADO]: "bg-red-100 text-red-800"
    };
    return colors[status];
  };

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-gray-900 font-semibold"
    >
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  const handleViewDetails = (item: PosicaoEstoque) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Posição Atual de Estoque</CardTitle>
              <CardDescription>
                {filteredData.length} registros encontrados • Informações detalhadas por lote
              </CardDescription>
            </div>
            <Button onClick={exportToExcel} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filtros Avançados */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar produto, código, lote..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedEstado} onValueChange={setSelectedEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Estados</SelectItem>
                {estados.map(estado => (
                  <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCnpj} onValueChange={setSelectedCnpj}>
              <SelectTrigger>
                <SelectValue placeholder="CNPJ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os CNPJs</SelectItem>
                {cnpjsUnicos.map(cnpj => (
                  <SelectItem key={cnpj} value={cnpj}>{cnpj}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTipoEstoque} onValueChange={setSelectedTipoEstoque}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo Estoque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                {tiposEstoque.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedFornecedor} onValueChange={setSelectedFornecedor}>
              <SelectTrigger>
                <SelectValue placeholder="Fornecedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Fornecedores</SelectItem>
                {fornecedores.map(fornecedor => (
                  <SelectItem key={fornecedor} value={fornecedor}>{fornecedor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Limpar Filtros
            </Button>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><SortableHeader field="produto_descricao">Produto</SortableHeader></TableHead>
                  <TableHead><SortableHeader field="cnpj_estado">Estado</SortableHeader></TableHead>
                  <TableHead><SortableHeader field="lote">Lote</SortableHeader></TableHead>
                  <TableHead>Série</TableHead>
                  <TableHead className="text-right"><SortableHeader field="quantidade_disponivel">Disponível</SortableHeader></TableHead>
                  <TableHead className="text-right"><SortableHeader field="quantidade_reservada">Reservada</SortableHeader></TableHead>
                  <TableHead><SortableHeader field="data_validade">Validade</SortableHeader></TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><SortableHeader field="fornecedor">Fornecedor</SortableHeader></TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead className="text-right"><SortableHeader field="cmc_total">Valor</SortableHeader></TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className={`${getRowColor(item)} hover:bg-gray-50`}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold text-gray-900">{item.produto_descricao}</div>
                        <div className="text-sm text-gray-500">{item.produto_codigo}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.cnpj_estado}</div>
                        <div className="text-xs text-gray-500">{item.cnpj}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.lote}</TableCell>
                    <TableCell className="font-mono text-xs">{item.numero_serie || '-'}</TableCell>
                    <TableCell className="text-right font-semibold">{item.quantidade_disponivel}</TableCell>
                    <TableCell className="text-right text-orange-600 font-medium">
                      {item.quantidade_reservada > 0 ? item.quantidade_reservada : '-'}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">
                          {item.data_validade ? 
                            new Date(item.data_validade).toLocaleDateString('pt-BR') : 
                            <span className="text-gray-400">Sem validade</span>
                          }
                        </div>
                        {item.dias_para_vencimento !== null && (
                          <div className="text-xs text-gray-500">
                            {item.dias_para_vencimento <= 0 ? 'Vencido' : `${item.dias_para_vencimento} dias`}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusQualidadeBadge(item.status_qualidade)}>
                        {item.status_qualidade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-sm hover:text-blue-600 cursor-help">{item.fornecedor}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p><strong>Tipo:</strong> {item.tipo_estoque}</p>
                            <p><strong>Origem:</strong> {item.origem_entrada}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{item.deposito}</div>
                        <div className="text-xs text-gray-500">{item.localizacao_fisica}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      R$ {item.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PosicaoEstoqueModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        produto={selectedProduct}
        todosProdutos={data}
      />
    </>
  );
};

export default PosicaoAtualTable;
