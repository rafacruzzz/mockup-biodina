import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Calculator, 
  TrendingUp,
  TrendingDown,
  FileText, 
  Building2, 
  Truck, 
  Package,
  Coins,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Search,
  Eye,
  BarChart3
} from "lucide-react";

const CustosImportacaoView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [tipoFilter, setTipoFilter] = useState("todos");

  // Dados mock para custos de importação
  const custosImportacao = [
    {
      id: 1,
      processo: "PROC-IMP-001",
      tipo_custo: "frete_internacional",
      descricao: "Frete Internacional - Medical Equipment",
      fornecedor: "DHL Express",
      valor_previsto: 8500.00,
      valor_realizado: 9200.00,
      variacao: 8.24,
      status: "pago",
      data_previsao: "2024-01-15",
      data_pagamento: "2024-01-18"
    },
    {
      id: 2,
      processo: "PROC-IMP-001",
      tipo_custo: "despachante",
      descricao: "Serviços de Despachante Aduaneiro",
      fornecedor: "Despachos Rápidos Ltda",
      valor_previsto: 2800.00,
      valor_realizado: 2800.00,
      variacao: 0.00,
      status: "pago",
      data_previsao: "2024-01-20",
      data_pagamento: "2024-01-20"
    },
    {
      id: 3,
      processo: "PROC-IMP-002",
      tipo_custo: "impostos",
      descricao: "II + IPI + PIS/COFINS",
      fornecedor: "Receita Federal",
      valor_previsto: 15600.00,
      valor_realizado: null,
      variacao: null,
      status: "previsto",
      data_previsao: "2024-02-05",
      data_pagamento: null
    },
    {
      id: 4,
      processo: "PROC-IMP-002",
      tipo_custo: "armazenagem",
      descricao: "Armazenagem Aeroporto de Viracopos",
      fornecedor: "Viracopos Logística",
      valor_previsto: 1200.00,
      valor_realizado: 1350.00,
      variacao: 12.50,
      status: "confirmado",
      data_previsao: "2024-02-01",
      data_pagamento: null
    },
    {
      id: 5,
      processo: "PROC-IMP-003",
      tipo_custo: "frete_interno",
      descricao: "Transporte Viracopos → São Paulo",
      fornecedor: "TransLog Express",
      valor_previsto: 850.00,
      valor_realizado: null,
      variacao: null,
      status: "previsto",
      data_previsao: "2024-02-10",
      data_pagamento: null
    }
  ];

  // Dados para relatórios consolidados por processo
  const relatoriosProcesso = [
    {
      processo: "PROC-IMP-001",
      custo_previsto: 25300.00,
      custo_realizado: 27800.00,
      variacao: 9.88,
      status: "finalizado",
      fornecedores: 4,
      dias_processo: 25
    },
    {
      processo: "PROC-IMP-002",
      custo_previsto: 42800.00,
      custo_realizado: 38950.00,
      variacao: -9.00,
      status: "em_andamento",
      fornecedores: 6,
      dias_processo: 15
    },
    {
      processo: "PROC-IMP-003",
      custo_previsto: 18500.00,
      custo_realizado: null,
      variacao: null,
      status: "iniciado",
      fornecedores: 3,
      dias_processo: 5
    }
  ];

  const getTipoCustoLabel = (tipo: string) => {
    switch (tipo) {
      case 'frete_internacional': return 'Frete Internacional';
      case 'frete_interno': return 'Frete Interno';
      case 'armazenagem': return 'Armazenagem';
      case 'despachante': return 'Despachante';
      case 'impostos': return 'Impostos';
      case 'taxas_diversas': return 'Taxas Diversas';
      default: return tipo;
    }
  };

  const getTipoCustoIcon = (tipo: string) => {
    switch (tipo) {
      case 'frete_internacional': return <Truck className="h-4 w-4 text-blue-500" />;
      case 'frete_interno': return <Truck className="h-4 w-4 text-green-500" />;
      case 'armazenagem': return <Package className="h-4 w-4 text-orange-500" />;
      case 'despachante': return <Building2 className="h-4 w-4 text-purple-500" />;
      case 'impostos': return <Coins className="h-4 w-4 text-red-500" />;
      case 'taxas_diversas': return <Calculator className="h-4 w-4 text-gray-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-500';
      case 'confirmado': return 'bg-blue-500';
      case 'previsto': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pago': return 'Pago';
      case 'confirmado': return 'Confirmado';
      case 'previsto': return 'Previsto';
      default: return status;
    }
  };

  const getVariacaoIcon = (variacao: number | null) => {
    if (variacao === null) return null;
    return variacao >= 0 ? 
      <TrendingUp className="h-4 w-4 text-red-500" /> : 
      <TrendingDown className="h-4 w-4 text-green-500" />;
  };

  const getVariacaoColor = (variacao: number | null) => {
    if (variacao === null) return 'text-gray-500';
    return variacao >= 0 ? 'text-red-600' : 'text-green-600';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercent = (value: number | null) => {
    if (value === null) return '-';
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const filteredCustos = custosImportacao.filter(custo => {
    const matchesSearch = custo.processo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         custo.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         custo.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || custo.status === statusFilter;
    const matchesTipo = tipoFilter === 'todos' || custo.tipo_custo === tipoFilter;
    return matchesSearch && matchesStatus && matchesTipo;
  });

  const totalPrevisto = custosImportacao.reduce((sum, c) => sum + c.valor_previsto, 0);
  const totalRealizado = custosImportacao
    .filter(c => c.valor_realizado !== null)
    .reduce((sum, c) => sum + c.valor_realizado!, 0);
  const custosPagos = custosImportacao.filter(c => c.status === 'pago').length;
  const custosPrevistos = custosImportacao.filter(c => c.status === 'previsto').length;

  const tiposCusto = [...new Set(custosImportacao.map(c => c.tipo_custo))];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-biodina-blue mb-2">Custos de Importação</h1>
        <p className="text-gray-600">Gerencie e acompanhe todos os custos por processo de importação</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calculator className="h-4 w-4 text-blue-500" />
              Total Previsto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">
              {formatCurrency(totalPrevisto)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Total Realizado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">
              {formatCurrency(totalRealizado)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Coins className="h-4 w-4 text-green-500" />
              Custos Pagos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">
              {custosPagos}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Custos Previstos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-orange-600">
              {custosPrevistos}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="custos" className="w-full">
        <TabsList>
          <TabsTrigger value="custos">Custos Detalhados</TabsTrigger>
          <TabsTrigger value="processos">Relatório por Processo</TabsTrigger>
          <TabsTrigger value="fornecedores">Por Fornecedor</TabsTrigger>
          <TabsTrigger value="analises">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="custos" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2 flex-1 min-w-64">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar por processo, descrição ou fornecedor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="previsto">Previsto</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tipo de Custo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Tipos</SelectItem>
                    {tiposCusto.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>
                        {getTipoCustoLabel(tipo)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Custo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Custos */}
          <Card>
            <CardHeader>
              <CardTitle>Custos Detalhados por Processo</CardTitle>
              <CardDescription>
                Lista detalhada de todos os custos de importação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Processo / Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead className="text-right">Previsto</TableHead>
                    <TableHead className="text-right">Realizado</TableHead>
                    <TableHead>Variação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead className="w-20">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustos.map((custo) => (
                    <TableRow key={custo.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{custo.processo}</div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            {getTipoCustoIcon(custo.tipo_custo)}
                            {getTipoCustoLabel(custo.tipo_custo)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium text-sm">{custo.descricao}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          {custo.fornecedor}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(custo.valor_previsto)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {custo.valor_realizado ? formatCurrency(custo.valor_realizado) : '-'}
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 ${getVariacaoColor(custo.variacao)}`}>
                          {getVariacaoIcon(custo.variacao)}
                          <span className="font-medium">{formatPercent(custo.variacao)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(custo.status)}>
                          {getStatusLabel(custo.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Prev: {new Date(custo.data_previsao).toLocaleDateString('pt-BR')}</div>
                          {custo.data_pagamento && (
                            <div className="text-gray-500">
                              Pago: {new Date(custo.data_pagamento).toLocaleDateString('pt-BR')}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Consolidado por Processo</CardTitle>
              <CardDescription>
                Comparação entre custos previstos e realizados por processo de importação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatoriosProcesso.map((relatorio) => (
                  <Card key={relatorio.processo}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg text-biodina-blue">
                            {relatorio.processo}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Fornecedores: {relatorio.fornecedores}</span>
                            <span>Duração: {relatorio.dias_processo} dias</span>
                            <Badge variant="outline">
                              {relatorio.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          {relatorio.variacao !== null && (
                            <div className={`text-lg font-bold ${getVariacaoColor(relatorio.variacao)}`}>
                              {formatPercent(relatorio.variacao)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Custo Previsto</div>
                          <div className="text-xl font-bold text-blue-800">
                            {formatCurrency(relatorio.custo_previsto)}
                          </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Custo Realizado</div>
                          <div className="text-xl font-bold text-green-800">
                            {relatorio.custo_realizado ? 
                              formatCurrency(relatorio.custo_realizado) : 
                              'Em andamento'
                            }
                          </div>
                        </div>
                      </div>

                      {relatorio.custo_realizado && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Execução Orçamentária</span>
                            <span className="text-sm text-gray-600">
                              {((relatorio.custo_realizado / relatorio.custo_previsto) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <Progress 
                            value={(relatorio.custo_realizado / relatorio.custo_previsto) * 100} 
                            className="h-3"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fornecedores">
          <Card>
            <CardHeader>
              <CardTitle>Custos por Fornecedor</CardTitle>
              <CardDescription>
                Análise consolidada de custos por fornecedor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Funcionalidade em desenvolvimento</p>
                <p className="text-sm">Relatório consolidado por fornecedor</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analises">
          <Card>
            <CardHeader>
              <CardTitle>Análises e Gráficos</CardTitle>
              <CardDescription>
                Análises estatísticas e tendências de custos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Funcionalidade em desenvolvimento</p>
                <p className="text-sm">Gráficos e análises de tendências</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustosImportacaoView;