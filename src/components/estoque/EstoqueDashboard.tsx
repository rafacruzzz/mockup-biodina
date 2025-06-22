
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, AlertTriangle, Clock, ShoppingCart, DollarSign, BarChart3, TrendingUp, Search, Filter, Eye } from "lucide-react";
import { estoqueModules } from "@/data/estoqueModules";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

const EstoqueDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipoEstoque, setSelectedTipoEstoque] = useState("todos");

  const posicaoEstoque = estoqueModules.posicao_estoque.subModules.visao_geral.data;

  // Gerar dados para o gráfico de consumo vs estoque
  const consumoData = [
    { mes: "Jul", consumo: 850, estoque: 1200, entrada: 500 },
    { mes: "Ago", consumo: 920, estoque: 1100, entrada: 650 },
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

  // Filtrar dados da tabela
  const filteredData = posicaoEstoque.filter(item => {
    const matchesSearch = !searchTerm || 
      item.produto_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.produto_codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lote.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTipo = selectedTipoEstoque === "todos" || item.tipo_estoque === selectedTipoEstoque;
    
    return matchesSearch && matchesTipo;
  });

  const getRowColor = (item: any) => {
    if (item.data_validade && new Date(item.data_validade) <= new Date()) {
      return "bg-red-50 border-l-4 border-l-red-500";
    }
    if (item.data_validade && new Date(item.data_validade) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) {
      return "bg-yellow-50 border-l-4 border-l-yellow-500";
    }
    if (item.quantidade_reservada > 0) {
      return "bg-green-50 border-l-4 border-l-green-500";
    }
    return "";
  };

  const getTipoEstoqueBadge = (tipo: string) => {
    const colors = {
      "Nacional": "bg-blue-100 text-blue-800",
      "Importação Direta": "bg-purple-100 text-purple-800",
      "Consignado": "bg-orange-100 text-orange-800"
    };
    return colors[tipo as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex-1 p-6 bg-gray-50/50 space-y-6">
      {/* 1. PAINEL RESUMO - Cards Visuais */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-biodina-blue mb-2">Gestão de Estoque</h1>
            <p className="text-gray-600">Controle completo com visão gerencial integrada</p>
          </div>
          
          {/* Busca Global */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produto, lote, código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </div>

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
                Visão agrupada por produto, lote e CNPJ com alertas visuais
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
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Mais Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Produto</TableHead>
                  <TableHead className="font-semibold">CNPJ</TableHead>
                  <TableHead className="font-semibold">Lote</TableHead>
                  <TableHead className="font-semibold text-right">Qtde Atual</TableHead>
                  <TableHead className="font-semibold text-right">Reservada</TableHead>
                  <TableHead className="font-semibold">Validade</TableHead>
                  <TableHead className="font-semibold">Fornecedor</TableHead>
                  <TableHead className="font-semibold">Tipo</TableHead>
                  <TableHead className="font-semibold">Local</TableHead>
                  <TableHead className="font-semibold text-right">Valor</TableHead>
                  <TableHead className="font-semibold">Ações</TableHead>
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
                    <TableCell className="text-sm">{item.cnpj}</TableCell>
                    <TableCell className="font-mono text-sm">{item.lote}</TableCell>
                    <TableCell className="text-right font-semibold">{item.quantidade_disponivel}</TableCell>
                    <TableCell className="text-right text-orange-600 font-medium">
                      {item.quantidade_reservada > 0 ? item.quantidade_reservada : '-'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {item.data_validade ? 
                        new Date(item.data_validade).toLocaleDateString('pt-BR') : 
                        <span className="text-gray-400">Sem validade</span>
                      }
                    </TableCell>
                    <TableCell className="text-sm">{item.fornecedor}</TableCell>
                    <TableCell>
                      <Badge className={getTipoEstoqueBadge(item.tipo_estoque)}>
                        {item.tipo_estoque}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{item.deposito}</TableCell>
                    <TableCell className="text-right font-semibold">
                      R$ {item.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
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

      {/* 3. PAINEL RELATÓRIOS GERENCIAIS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Consumo vs Estoque</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
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
    </div>
  );
};

export default EstoqueDashboard;
