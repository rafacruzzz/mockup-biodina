import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Package, AlertTriangle, Clock, ShoppingCart, DollarSign, BarChart3, TrendingUp, Search, Filter, Eye, Download, ArrowUpDown, FileSpreadsheet, FileText } from "lucide-react";
import { estoqueModules } from "@/data/estoqueModules";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

const EstoqueDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipoEstoque, setSelectedTipoEstoque] = useState("todos");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [quickFilter, setQuickFilter] = useState("todos");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);

  const posicaoEstoque = estoqueModules.posicao_estoque.subModules.visao_geral.data;

  // Dados do gráfico reduzidos para 4 meses
  const consumoData = [
    { mes: "Set", consumo: 780, estoque: 1300, entrada: 800 },
    { mes: "Out", consumo: 1050, estoque: 900, entrada: 400 },
    { mes: "Nov", consumo: 880, estoque: 1150, entrada: 700 },
    { mes: "Dez", consumo: 950, estoque: 1000, entrada: 600 }
  ];

  // Gerar dados para projeção de ruptura baseado nos produtos reais
  const produtosRuptura = posicaoEstoque
    .filter(item => item.quantidade_disponivel < 200)
    .slice(0, 5)
    .map(item => ({
      codigo: item.produto_codigo,
      descricao: item.produto_descricao.substring(0, 20) + "...",
      diasRestantes: Math.floor(Math.random() * 30) + 5
    }));

  // Chart config
  const chartConfig = {
    consumo: {
      label: "Consumo",
      color: "#ef4444"
    },
    estoque: {
      label: "Estoque",
      color: "#3b82f6"
    },
    entrada: {
      label: "Entrada",
      color: "#22c55e"
    }
  };

  // Calcular métricas do dashboard
  const produtosComEstoque = posicaoEstoque.length;
  const produtosVencendo = posicaoEstoque.filter(item => 
    item.data_validade && new Date(item.data_validade) <= new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
  ).length;
  const produtosVencidos = posicaoEstoque.filter(item => 
    item.data_validade && new Date(item.data_validade) <= new Date()
  ).length;
  const produtosMultilote = new Set(posicaoEstoque.map(p => p.produto_codigo)).size;
  const produtosMultiCNPJ = new Set(
    posicaoEstoque.filter(item => 
      posicaoEstoque.filter(p => p.produto_codigo === item.produto_codigo && p.cnpj !== item.cnpj).length > 0
    ).map(p => p.produto_codigo)
  ).size;
  const produtosComReserva = posicaoEstoque.filter(p => p.quantidade_reservada > 0).length;
  const valorTotalEstoque = posicaoEstoque.reduce((acc, item) => acc + item.cmc_total, 0);

  const stats = [
    {
      title: "Produtos com Estoque",
      value: produtosComEstoque.toString(),
      description: "Total de itens",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Validade < 60 dias",
      value: produtosVencendo.toString(),
      description: "Produtos vencendo",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Produtos Vencidos",
      value: produtosVencidos.toString(),
      description: "Necessitam ação",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Multi-lotes",
      value: produtosMultilote.toString(),
      description: "Produtos únicos",
      icon: BarChart3,
      color: "text-blue-400"
    },
    {
      title: "Multi-CNPJ",
      value: produtosMultiCNPJ.toString(),
      description: "Em várias empresas",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Com Reserva",
      value: produtosComReserva.toString(),
      description: "Pedidos abertos",
      icon: ShoppingCart,
      color: "text-green-600"
    },
    {
      title: "Valor Total",
      value: `R$ ${valorTotalEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      description: "Em estoque",
      icon: DollarSign,
      color: "text-gray-600"
    }
  ];

  // Função para determinar cor da linha baseada na validade
  const getRowColor = (item: any) => {
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

  // Função para calcular dias até vencimento
  const getDaysUntilExpiry = (dataValidade: string | null) => {
    if (!dataValidade) return null;
    const today = new Date();
    const expiryDate = new Date(dataValidade);
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Função para gerar o badge de tipo de estoque
  const getTipoEstoqueBadge = (tipo: string) => {
    const colors = {
      "Nacional": "bg-blue-100 text-blue-800",
      "Importação Direta": "bg-purple-100 text-purple-800",
      "Consignado": "bg-orange-100 text-orange-800"
    };
    return colors[tipo as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  // Função para gerar o cabeçalho ordenável
  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-gray-900 font-semibold"
    >
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  // Função para abrir detalhes do produto
  const handleOpenProductDetails = (item: any) => {
    setSelectedProduct(item);
    setIsProductSheetOpen(true);
  };

  // Obter todos os lotes do produto selecionado
  const getProductLots = () => {
    if (!selectedProduct) return [];
    return posicaoEstoque.filter(item => item.produto_codigo === selectedProduct.produto_codigo);
  };

  return (
    <TooltipProvider>
      <div className="flex-1 p-6 bg-gray-50/50 space-y-6">
        {/* Header com busca e filtros rápidos */}
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              
              <Button onClick={exportToExcel} variant="outline" size="sm">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Exportar Excel
              </Button>
            </div>
          </div>

          {/* Filtros rápidos */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-600">Filtros rápidos:</span>
            {[
              { key: "todos", label: "Todos", count: posicaoEstoque.length },
              { key: "vencidos", label: "Vencidos", count: produtosVencidos },
              { key: "vencendo", label: "Vencendo (30d)", count: produtosVencendo },
              { key: "estoque_baixo", label: "Estoque Baixo", count: posicaoEstoque.filter(i => i.quantidade_disponivel < 200).length },
              { key: "reservados", label: "Com Reserva", count: produtosComReserva }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={quickFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setQuickFilter(filter.key)}
                className="text-xs"
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>

          {/* 1. PAINEL RESUMO - Cards Visuais */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 2. TABELA DINÂMICA - Visão Consolidada */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Posição Consolidada de Estoque</CardTitle>
                <CardDescription>
                  {filteredData.length} registros encontrados • Clique nos cabeçalhos para ordenar
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={selectedTipoEstoque}
                  onChange={(e) => setSelectedTipoEstoque(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="todos">Todos os tipos</option>
                  <option value="Nacional">Nacional</option>
                  <option value="Importação Direta">Importação Direta</option>
                  <option value="Consignado">Consignado</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead><SortableHeader field="produto_descricao">Produto</SortableHeader></TableHead>
                    <TableHead><SortableHeader field="cnpj">CNPJ</SortableHeader></TableHead>
                    <TableHead><SortableHeader field="lote">Lote</SortableHeader></TableHead>
                    <TableHead className="text-right"><SortableHeader field="quantidade_disponivel">Qtde Atual</SortableHeader></TableHead>
                    <TableHead className="text-right"><SortableHeader field="quantidade_reservada">Reservada</SortableHeader></TableHead>
                    <TableHead><SortableHeader field="data_validade">Validade</SortableHeader></TableHead>
                    <TableHead><SortableHeader field="fornecedor">Fornecedor</SortableHeader></TableHead>
                    <TableHead><SortableHeader field="tipo_estoque">Tipo</SortableHeader></TableHead>
                    <TableHead><SortableHeader field="deposito">Local</SortableHeader></TableHead>
                    <TableHead className="text-right"><SortableHeader field="cmc_total">Valor</SortableHeader></TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => {
                    const daysUntilExpiry = getDaysUntilExpiry(item.data_validade);
                    return (
                      <TableRow key={item.id} className={`${getRowColor(item)} hover:bg-gray-50`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-semibold text-gray-900">{item.produto_descricao}</div>
                              <div className="text-sm text-gray-500">{item.produto_codigo}</div>
                            </div>
                            {posicaoEstoque.filter(p => p.produto_codigo === item.produto_codigo).length > 1 && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge variant="outline" className="text-xs">Multi-lote</Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Este produto possui múltiplos lotes
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{item.cnpj}</TableCell>
                        <TableCell className="font-mono text-sm">{item.lote}</TableCell>
                        <TableCell className="text-right font-semibold">{item.quantidade_disponivel}</TableCell>
                        <TableCell className="text-right text-orange-600 font-medium">
                          {item.quantidade_reservada > 0 ? item.quantidade_reservada : '-'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="text-sm">
                              {item.data_validade ? 
                                new Date(item.data_validade).toLocaleDateString('pt-BR') : 
                                <span className="text-gray-400">Sem validade</span>
                              }
                            </div>
                            {daysUntilExpiry !== null && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <div className={`w-16 h-1 rounded-full ${
                                    daysUntilExpiry <= 0 ? 'bg-red-500' :
                                    daysUntilExpiry <= 30 ? 'bg-yellow-500' :
                                    'bg-green-500'
                                  }`} />
                                </TooltipTrigger>
                                <TooltipContent>
                                  {daysUntilExpiry <= 0 ? 'Vencido' : `${daysUntilExpiry} dias restantes`}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="text-sm hover:text-blue-600 cursor-help">{item.fornecedor}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-1">
                                <p><strong>Fornecedor:</strong> {item.fornecedor}</p>
                                <p><strong>Origem:</strong> {item.origem_entrada}</p>
                                <p><strong>CMC Unit.:</strong> R$ {item.cmc_unitario.toFixed(2)}</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTipoEstoqueBadge(item.tipo_estoque)}>
                            {item.tipo_estoque}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="text-sm hover:text-blue-600 cursor-help">{item.deposito}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-1">
                                <p><strong>Depósito:</strong> {item.deposito}</p>
                                <p><strong>Qtde Total:</strong> {item.quantidade_total}</p>
                                <p><strong>Disponível:</strong> {item.quantidade_disponivel}</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          R$ {item.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleOpenProductDetails(item)}
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Ver todos os lotes deste produto
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 3. PAINEL RELATÓRIOS GERENCIAIS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consumo vs Estoque</CardTitle>
              <CardDescription>Últimos 4 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={consumoData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="consumo" 
                      stroke="var(--color-consumo)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-consumo)" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="estoque" 
                      stroke="var(--color-estoque)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-estoque)" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="entrada" 
                      stroke="var(--color-entrada)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-entrada)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Projeção de Ruptura</CardTitle>
              <CardDescription>Top {produtosRuptura.length} produtos em risco</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {produtosRuptura.length > 0 ? produtosRuptura.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-l-red-500">
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{item.codigo}</span>
                      <p className="text-xs text-gray-600">{item.descricao}</p>
                    </div>
                    <span className="text-xs font-medium text-red-600">{item.diasRestantes} dias</span>
                  </div>
                )) : (
                  <div className="text-center py-4 text-gray-500">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum produto em risco</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mapa de Vencimentos</CardTitle>
              <CardDescription>Próximos 3 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span className="text-sm">Janeiro 2025</span>
                  <Badge variant="secondary">2 lotes</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="text-sm">Fevereiro 2025</span>
                  <Badge variant="secondary">5 lotes</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="text-sm">Março 2025</span>
                  <Badge variant="secondary">1 lote</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sheet para detalhes do produto */}
        <Sheet open={isProductSheetOpen} onOpenChange={setIsProductSheetOpen}>
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
      </div>
    </TooltipProvider>
  );
};

export default EstoqueDashboard;
