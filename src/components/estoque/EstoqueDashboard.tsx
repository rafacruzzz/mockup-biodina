import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { estoqueModules } from "@/data/estoqueModules";
import { PosicaoEstoque } from "@/types/estoque";
import EstoqueStats from "./dashboard/EstoqueStats";
import EstoqueFilters from "./dashboard/EstoqueFilters";
import EstoqueTable from "./dashboard/EstoqueTable";
import EstoqueCharts from "./dashboard/EstoqueCharts";
import ProductDetailsSheet from "./dashboard/ProductDetailsSheet";

const EstoqueDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipoEstoque, setSelectedTipoEstoque] = useState("todos");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [quickFilter, setQuickFilter] = useState("todos");
  const [selectedProduct, setSelectedProduct] = useState<PosicaoEstoque | null>(null);
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);

  const posicaoEstoque = estoqueModules.posicao_estoque.subModules.posicao_atual.data;

  // Calcular métricas básicas para os filtros
  const produtosVencidos = posicaoEstoque.filter(item => 
    item.data_validade && new Date(item.data_validade) <= new Date()
  ).length;
  const produtosVencendo = posicaoEstoque.filter(item => 
    item.data_validade && 
    new Date(item.data_validade) <= new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
  ).length;
  const produtosComReserva = posicaoEstoque.filter(p => p.quantidade_reservada > 0).length;

  // Função de ordenação
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filtros rápidos
  const applyQuickFilter = (data: typeof posicaoEstoque) => {
    switch (quickFilter) {
      case "vencidos":
        return data.filter(item => 
          item.data_validade && new Date(item.data_validade) <= new Date()
        );
      case "vencendo":
        return data.filter(item => 
          item.data_validade && 
          new Date(item.data_validade) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) &&
          new Date(item.data_validade) > new Date()
        );
      case "estoque_baixo":
        return data.filter(item => item.quantidade_disponivel < 200);
      case "reservados":
        return data.filter(item => item.quantidade_reservada > 0);
      default:
        return data;
    }
  };

  // Aplicar filtros e ordenação
  const getFilteredAndSortedData = () => {
    let filtered = posicaoEstoque.filter(item => {
      const matchesSearch = !searchTerm || 
        item.produto_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.produto_codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lote.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cnpj.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTipo = selectedTipoEstoque === "todos" || item.tipo_estoque === selectedTipoEstoque;
      
      return matchesSearch && matchesTipo;
    });

    // Aplicar filtro rápido
    filtered = applyQuickFilter(filtered);

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

  // Função para exportar para Excel
  const exportToExcel = () => {
    const csvContent = [
      ["Produto", "CNPJ", "Lote", "Qtde Atual", "Reservada", "Validade", "Fornecedor", "Tipo", "Local", "Valor"],
      ...filteredData.map(item => [
        item.produto_descricao,
        item.cnpj,
        item.lote,
        item.quantidade_disponivel,
        item.quantidade_reservada,
        item.data_validade || "Sem validade",
        item.fornecedor,
        item.tipo_estoque,
        item.deposito,
        `R$ ${item.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `estoque_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Função para abrir detalhes do produto
  const handleOpenProductDetails = (item: PosicaoEstoque) => {
    setSelectedProduct(item);
    setIsProductSheetOpen(true);
  };

  return (
    <TooltipProvider>
      <div className="flex-1 p-6 bg-gray-50/50 space-y-6">
        {/* Header com busca e filtros rápidos */}
        <EstoqueFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          quickFilter={quickFilter}
          onQuickFilterChange={setQuickFilter}
          selectedTipoEstoque={selectedTipoEstoque}
          onTipoEstoqueChange={setSelectedTipoEstoque}
          onExportExcel={exportToExcel}
          produtosVencidos={produtosVencidos}
          produtosVencendo={produtosVencendo}
          produtosComReserva={produtosComReserva}
          posicaoEstoqueLength={posicaoEstoque.length}
        />

        {/* 1. PAINEL RESUMO - Cards Visuais */}
        <EstoqueStats posicaoEstoque={posicaoEstoque} />

        {/* 2. TABELA DINÂMICA - Visão Consolidada */}
        <EstoqueTable
          filteredData={filteredData}
          posicaoEstoque={posicaoEstoque}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onOpenProductDetails={handleOpenProductDetails}
        />

        {/* 3. PAINEL RELATÓRIOS GERENCIAIS */}
        <EstoqueCharts posicaoEstoque={posicaoEstoque} />

        {/* Sheet para detalhes do produto */}
        <ProductDetailsSheet
          isOpen={isProductSheetOpen}
          onOpenChange={setIsProductSheetOpen}
          selectedProduct={selectedProduct}
          posicaoEstoque={posicaoEstoque}
        />
      </div>
    </TooltipProvider>
  );
};

export default EstoqueDashboard;
