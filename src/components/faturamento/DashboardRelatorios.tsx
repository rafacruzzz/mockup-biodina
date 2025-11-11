import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DollarSign, Package, Settings, FileText, AlertTriangle, TrendingUp,
  Calendar, BarChart3, PieChart, Download, FileSpreadsheet, FileDown,
  CheckCircle, XCircle, RotateCcw, Edit3, Users, MapPin, Receipt
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';
import { mockDashboardData } from "@/data/dashboardRelatoriosData";
import { exportDashboardToExcel, exportNotasCanceladasToExcel, exportNotasDevolucidasToExcel, exportCartasCorrecaoToExcel } from "@/utils/export/exportToExcel";
import { exportDashboardToPDF, exportNotasCanceladasToPDF, exportCartasCorrecaoToPDF } from "@/utils/export/exportToPDF";
import { useToast } from "@/hooks/use-toast";

const DashboardRelatorios = () => {
  const { toast } = useToast();
  const [periodo, setPeriodo] = useState("mes-atual");
  const [ano, setAno] = useState("2025");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [visualizacaoFaturamento, setVisualizacaoFaturamento] = useState<'mes' | 'ano'>('mes');

  const data = mockDashboardData;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleExportExcel = (tipo: 'completo' | 'canceladas' | 'devolvidas' | 'cartas') => {
    const periodoTexto = `${periodo}_${ano}`;
    
    switch (tipo) {
      case 'completo':
        exportDashboardToExcel(data, periodoTexto);
        break;
      case 'canceladas':
        exportNotasCanceladasToExcel(data.notasCanceladas, periodoTexto);
        break;
      case 'devolvidas':
        exportNotasDevolucidasToExcel(data.notasDevolvidas, periodoTexto);
        break;
      case 'cartas':
        exportCartasCorrecaoToExcel(data.cartasCorrecao, periodoTexto);
        break;
    }

    toast({
      title: "Exportação concluída",
      description: "Arquivo Excel gerado com sucesso!",
    });
  };

  const handleExportPDF = (tipo: 'completo' | 'canceladas' | 'cartas') => {
    const periodoTexto = `${periodo}_${ano}`;
    
    switch (tipo) {
      case 'completo':
        exportDashboardToPDF(data, periodoTexto);
        break;
      case 'canceladas':
        exportNotasCanceladasToPDF(data.notasCanceladas, periodoTexto);
        break;
      case 'cartas':
        exportCartasCorrecaoToPDF(data.cartasCorrecao, periodoTexto);
        break;
    }

    toast({
      title: "Exportação concluída",
      description: "Arquivo PDF gerado com sucesso!",
    });
  };

  const COLORS = {
    primary: 'hsl(var(--primary))',
    success: '#16a34a',
    warning: '#eab308',
    danger: '#dc2626',
    info: '#0284c7',
    secondary: '#6b7280',
  };

  const distribuicaoProdutosServicos = [
    { name: 'Produtos (NF-e)', value: data.faturamentoProdutos, cor: COLORS.primary },
    { name: 'Serviços (NFS-e)', value: data.faturamentoServicos, cor: COLORS.info },
  ];

  const statusDocumentosData = [
    { name: 'Autorizadas', value: data.notasEmitidas.autorizadas, cor: COLORS.success },
    { name: 'Pendentes', value: data.notasEmitidas.pendentes, cor: COLORS.warning },
    { name: 'Rejeitadas', value: data.notasEmitidas.rejeitadas, cor: COLORS.danger },
    { name: 'Canceladas', value: data.notasEmitidas.canceladas, cor: COLORS.secondary },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho com Filtros */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard & Relatórios de Faturamento</h1>
          <p className="text-muted-foreground">Análise completa de faturamento e documentos fiscais</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes-atual">Mês Atual</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="semestre">Semestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select>

          <Select value={ano} onValueChange={setAno}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="produtos">Produtos</SelectItem>
              <SelectItem value="servicos">Serviços</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => handleExportExcel('completo')} variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>

          <Button onClick={() => handleExportPDF('completo')} variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Indicadores Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Faturamento Total</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(data.faturamentoTotal)}</p>
                <p className="text-sm text-green-600">+{data.variacaoMensal}% vs anterior</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Faturamento Produtos</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(data.faturamentoProdutos)}</p>
                <p className="text-sm text-green-600">+8.2% vs anterior</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Faturamento Serviços</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(data.faturamentoServicos)}</p>
                <p className="text-sm text-green-600">+18.5% vs anterior</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Notas</p>
                <p className="text-2xl font-bold text-foreground">{data.totalNotas}</p>
                <p className="text-sm text-green-600">+8.2% vs anterior</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendências Fiscais</p>
                <p className="text-2xl font-bold text-foreground">{data.pendenciasFiscais}</p>
                <p className="text-sm text-red-600">2 rejeitadas</p>
              </div>
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faturamento por Mês/Ano */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Faturamento por {visualizacaoFaturamento === 'mes' ? 'Mês' : 'Ano'}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={visualizacaoFaturamento === 'mes' ? 'default' : 'outline'}
                  onClick={() => setVisualizacaoFaturamento('mes')}
                >
                  Mês
                </Button>
                <Button
                  size="sm"
                  variant={visualizacaoFaturamento === 'ano' ? 'default' : 'outline'}
                  onClick={() => setVisualizacaoFaturamento('ano')}
                >
                  Ano
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {visualizacaoFaturamento === 'mes' ? (
                <LineChart data={data.faturamentoPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis tickFormatter={(value) => `${(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Line type="monotone" dataKey="faturamento" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              ) : (
                <BarChart data={data.faturamentoPorAno}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ano" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000)}M`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="faturamento" fill="hsl(var(--primary))" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição Produtos vs Serviços */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribuição Produtos vs Serviços
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={distribuicaoProdutosServicos}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                >
                  {distribuicaoProdutosServicos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Análise de Documentos Fiscais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notas Emitidas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Notas Fiscais Emitidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-3xl font-bold">{data.notasEmitidas.total} notas</p>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-sm">NF-e (Produtos)</span>
                  <span className="font-semibold">{data.notasEmitidas.nfe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">NFS-e (Serviços)</span>
                  <span className="font-semibold">{data.notasEmitidas.nfse}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <p className="text-sm font-medium">Por Status:</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Autorizadas
                  </span>
                  <span className="font-semibold">{data.notasEmitidas.autorizadas} ({((data.notasEmitidas.autorizadas / data.notasEmitidas.total) * 100).toFixed(1)}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    Pendentes
                  </span>
                  <span className="font-semibold">{data.notasEmitidas.pendentes} ({((data.notasEmitidas.pendentes / data.notasEmitidas.total) * 100).toFixed(1)}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    Rejeitadas
                  </span>
                  <span className="font-semibold">{data.notasEmitidas.rejeitadas} ({((data.notasEmitidas.rejeitadas / data.notasEmitidas.total) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notas Canceladas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Notas Fiscais Canceladas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-3xl font-bold">{data.notasCanceladas.length} notas</p>
                <p className="text-lg text-red-600 font-semibold">
                  {formatCurrency(data.notasCanceladas.reduce((acc, nota) => acc + nota.valor, 0))}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-sm">NF-e</span>
                  <span className="font-semibold">
                    {data.notasCanceladas.filter(n => n.tipo === 'NF-e').length} notas
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">NFS-e</span>
                  <span className="font-semibold">
                    {data.notasCanceladas.filter(n => n.tipo === 'NFS-e').length} notas
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Principais Motivos:</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Erro no cadastro</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Duplicidade</span>
                    <span className="font-semibold">2</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleExportExcel('canceladas')}
              >
                Ver detalhes →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notas Devolvidas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Notas Fiscais Devolvidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-3xl font-bold">{data.notasDevolvidas.length} notas</p>
                <p className="text-lg text-orange-600 font-semibold">
                  {formatCurrency(data.notasDevolvidas.reduce((acc, nota) => acc + nota.valor, 0))}
                </p>
                <Badge variant="outline" className="mt-2 bg-orange-100 text-orange-800">
                  ⚠️ Não contabilizado
                </Badge>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-sm">NF-e</span>
                  <span className="font-semibold">
                    {data.notasDevolvidas.filter(n => n.tipo === 'NF-e').length} notas
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">NFS-e</span>
                  <span className="font-semibold">
                    {data.notasDevolvidas.filter(n => n.tipo === 'NFS-e').length} notas
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <p className="text-sm font-medium">Status:</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Processadas
                  </span>
                  <span className="font-semibold">
                    {data.notasDevolvidas.filter(n => n.statusProcessamento === 'processada').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    Em processamento
                  </span>
                  <span className="font-semibold">
                    {data.notasDevolvidas.filter(n => n.statusProcessamento === 'em_processamento').length}
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleExportExcel('devolvidas')}
              >
                Ver detalhes →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cartas de Correção */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Notas com Carta de Correção (CC-e)
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportExcel('cartas')}
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportPDF('cartas')}
              >
                <FileDown className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Total de Cartas: <span className="font-bold text-foreground">{data.cartasCorrecao.length} CC-e emitidas</span>
          </p>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NF-e</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Motivo da Correção</TableHead>
                  <TableHead>Data Correção</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.cartasCorrecao.slice(0, 5).map((cc) => (
                  <TableRow key={cc.id}>
                    <TableCell className="font-medium">{cc.numeroNFe}</TableCell>
                    <TableCell>{cc.cliente}</TableCell>
                    <TableCell>{formatCurrency(cc.valor)}</TableCell>
                    <TableCell>{cc.motivoCorrecao}</TableCell>
                    <TableCell>{new Date(cc.dataCorrecao).toLocaleDateString('pt-BR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {data.cartasCorrecao.length > 5 && (
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                Ver todas as {data.cartasCorrecao.length} CC-e →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Faturamento Detalhado */}
      <Card>
        <CardHeader>
          <CardTitle>Faturamento Detalhado</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="clientes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="clientes">Por Cliente</TabsTrigger>
              <TabsTrigger value="produtos">Por Produto/Serviço</TabsTrigger>
              <TabsTrigger value="regioes">Por Região</TabsTrigger>
            </TabsList>

            <TabsContent value="clientes" className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>CNPJ</TableHead>
                      <TableHead className="text-right">Total Faturado</TableHead>
                      <TableHead className="text-right">Qtd Notas</TableHead>
                      <TableHead className="text-right">Ticket Médio</TableHead>
                      <TableHead className="text-right">% do Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.faturamentoPorCliente.map((cliente) => (
                      <TableRow key={cliente.cnpj}>
                        <TableCell className="font-medium">{cliente.cliente}</TableCell>
                        <TableCell>{cliente.cnpj}</TableCell>
                        <TableCell className="text-right font-semibold">{formatCurrency(cliente.valorTotal)}</TableCell>
                        <TableCell className="text-right">{cliente.quantidadeNotas}</TableCell>
                        <TableCell className="text-right">{formatCurrency(cliente.ticketMedio)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline">{cliente.percentualTotal.toFixed(1)}%</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="produtos" className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead className="text-right">Quantidade</TableHead>
                      <TableHead className="text-right">Valor Total</TableHead>
                      <TableHead className="text-right">Margem</TableHead>
                      <TableHead className="text-right">% do Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.faturamentoPorProduto.map((produto) => (
                      <TableRow key={produto.codigo}>
                        <TableCell className="font-medium">{produto.descricao}</TableCell>
                        <TableCell>{produto.codigo}</TableCell>
                        <TableCell className="text-right">{produto.quantidade}</TableCell>
                        <TableCell className="text-right font-semibold">{formatCurrency(produto.valorTotal)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {produto.margem.toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline">{produto.percentualTotal.toFixed(1)}%</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="regioes" className="space-y-4">
              <div className="space-y-4">
                {data.faturamentoPorRegiao.map((regiao) => (
                  <div key={regiao.regiao} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="font-semibold">{regiao.regiao}</span>
                      </div>
                      <Badge variant="outline">{regiao.percentualTotal.toFixed(1)}%</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{regiao.quantidadeNotas} notas</span>
                      <span className="font-bold text-lg">{formatCurrency(regiao.valorTotal)}</span>
                    </div>
                    <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${regiao.percentualTotal}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dashboard Comparativos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparativo Mensal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Comparativo Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Mês Atual vs Mês Anterior</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Faturamento</span>
                  <span className="text-sm font-semibold text-green-600">▲ +{data.variacaoMensal}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Atual:</span>
                  <span className="font-bold">{formatCurrency(data.faturamentoTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Anterior:</span>
                  <span>{formatCurrency(data.faturamentoTotal / (1 + data.variacaoMensal / 100))}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Notas Emitidas</span>
                  <span className="text-sm font-semibold text-green-600">▲ +8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Atual:</span>
                  <span className="font-bold">{data.totalNotas} notas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Anterior:</span>
                  <span>{Math.round(data.totalNotas / 1.082)} notas</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Ticket Médio</span>
                  <span className="text-sm font-semibold text-green-600">▲ +4.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Atual:</span>
                  <span className="font-bold">{formatCurrency(data.faturamentoTotal / data.totalNotas)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparativo Anual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Comparativo Anual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">2025 vs 2024 (mesmo período)</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Faturamento</span>
                  <span className="text-sm font-semibold text-green-600">▲ +{data.variacaoAnual}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">2025:</span>
                  <span className="font-bold">{formatCurrency(847500)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">2024:</span>
                  <span>{formatCurrency(735600)}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Notas Emitidas</span>
                  <span className="text-sm font-semibold text-green-600">▲ +12.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">2025:</span>
                  <span className="font-bold">156 notas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">2024:</span>
                  <span>139 notas</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Crescimento Mensal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">2025:</span>
                  <span className="font-bold text-green-600">+3.2% ao mês</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">2024:</span>
                  <span>+1.8% ao mês</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise de Impostos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Impostos e Retenções
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Total de Impostos Coletados: <span className="font-bold text-foreground">{formatCurrency(data.impostos.reduce((acc, imp) => acc + imp.valor, 0))}</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imposto</TableHead>
                    <TableHead>Alíquota Média</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">% do Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.impostos.map((imposto) => (
                    <TableRow key={imposto.tipo}>
                      <TableCell className="font-medium">{imposto.tipo}</TableCell>
                      <TableCell>{imposto.aliquotaMedia.toFixed(2)}%</TableCell>
                      <TableCell className="text-right font-semibold">{formatCurrency(imposto.valor)}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{imposto.percentualTotal.toFixed(1)}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={data.impostos}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="valor"
                    label={({ tipo, percentualTotal }) => `${tipo}: ${percentualTotal.toFixed(1)}%`}
                  >
                    {data.impostos.map((entry, index) => {
                      const colors = ['#0284c7', '#16a34a', '#eab308', '#dc2626', '#6b7280'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tempo Médio de Emissão e Taxa de Aprovação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tempo Médio de Emissão */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tempo Médio de Emissão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.tempoMedioEmissao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis label={{ value: 'Horas', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tempoMedio" stroke="hsl(var(--primary))" strokeWidth={2} name="Tempo Real" />
                <Line type="monotone" dataKey="meta" stroke="#dc2626" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Taxa de Aprovação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Taxa de Aprovação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[250px]">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-secondary stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <circle
                    className="text-green-600 progress-ring stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${data.taxaAprovacao * 2.51327} 251.327`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-foreground">{data.taxaAprovacao}%</span>
                  <span className="text-sm text-muted-foreground">Taxa Atual</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">Meta: 99%</p>
                <p className="text-sm font-semibold text-green-600">✓ Dentro da meta</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardRelatorios;
