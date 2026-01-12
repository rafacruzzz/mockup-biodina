
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { estoqueModules } from "@/data/estoqueModules";
import { PosicaoEstoque } from "@/types/estoque";
import EstoqueStats from "./dashboard/EstoqueStats";
import EstoqueFilters from "./dashboard/EstoqueFilters";
import PosicaoAtualTable from "./dashboard/PosicaoAtualTable";
import EstoqueCharts from "./dashboard/EstoqueCharts";

const EstoqueDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipoEstoque, setSelectedTipoEstoque] = useState("todos");
  const [quickFilter, setQuickFilter] = useState("todos");

  const posicaoEstoque = estoqueModules.posicao_estoque.subModules.visao_geral.data;

  // Calcular métricas básicas para os filtros
  const produtosVencidos = posicaoEstoque.filter(item => 
    item.data_validade && new Date(item.data_validade) <= new Date()
  ).length;
  const produtosVencendo = posicaoEstoque.filter(item => 
    item.data_validade && 
    new Date(item.data_validade) <= new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
  ).length;
  const produtosComReserva = posicaoEstoque.filter(p => p.quantidade_reservada > 0).length;

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

  // Aplicar filtros
  const getFilteredData = () => {
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

    return filtered;
  };

  const filteredData = getFilteredData();

  // Função para exportar para Excel
  const exportToExcel = () => {
    const csvContent = [
      ["Código", "Descrição", "Lote", "CNPJ", "Estado", "Depósito", "Localização", "Qtde Disponível", "Reservada", "Validade", "Fornecedor", "Tipo", "Valor"],
      ...filteredData.map(item => [
        item.produto_codigo,
        item.produto_descricao,
        item.lote,
        item.cnpj,
        item.cnpj_estado,
        item.deposito,
        item.localizacao_fisica,
        item.quantidade_disponivel,
        item.quantidade_reservada,
        item.data_validade || "Sem validade",
        item.fornecedor,
        item.tipo_estoque,
        `R$ ${item.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gestao_estoque_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

        {/* 2. TABELA DINÂMICA - Visão Consolidada com Detalhes */}
        <PosicaoAtualTable data={filteredData} />

        {/* 3. PAINEL RELATÓRIOS GERENCIAIS */}
        <EstoqueCharts posicaoEstoque={posicaoEstoque} />
      </div>
    </TooltipProvider>
  );
};

export default EstoqueDashboard;
