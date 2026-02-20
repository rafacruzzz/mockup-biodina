import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import SidebarLayout from "@/components/SidebarLayout";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ComposedChart
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Calendar as CalendarIcon, MapPin, AlertCircle, CheckCircle } from "lucide-react";

const BIGeral = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Dados fictícios para os gráficos
  const estoqueData = [
    { produto: 'Produto A', quantidade: 120, minimo: 50 },
    { produto: 'Produto B', quantidade: 85, minimo: 30 },
    { produto: 'Produto C', quantidade: 200, minimo: 100 },
    { produto: 'Produto D', quantidade: 15, minimo: 25 },
    { produto: 'Produto E', quantidade: 95, minimo: 40 },
  ];

  const estoqueReservadoData = [
    { name: 'Cliente A', value: 35, color: '#0000FE' },
    { name: 'Cliente B', value: 25, color: '#0BB8F6' },
    { name: 'Cliente C', value: 20, color: '#1122A9' },
    { name: 'Cliente D', value: 20, color: '#29324F' },
  ];

  const faturamentoData = [
    { mes: 'Jul', valor: 850000 },
    { mes: 'Ago', valor: 920000 },
    { mes: 'Set', valor: 780000 },
    { mes: 'Out', valor: 1200000 },
    { mes: 'Nov', valor: 1100000 },
    { mes: 'Dez', valor: 1350000 },
  ];

  // Novo: Dados de comparativo anual de faturamento
  const faturamentoAnualData = [
    { mes: 'Jan', ano2023: 1200000, ano2024: 1350000 },
    { mes: 'Fev', ano2023: 1100000, ano2024: 1250000 },
    { mes: 'Mar', ano2023: 1300000, ano2024: 1400000 },
    { mes: 'Abr', ano2023: 1150000, ano2024: 1320000 },
    { mes: 'Mai', ano2023: 1250000, ano2024: 1450000 },
    { mes: 'Jun', ano2023: 1180000, ano2024: 1380000 },
    { mes: 'Jul', ano2023: 850000, ano2024: 1200000 },
    { mes: 'Ago', ano2023: 920000, ano2024: 1150000 },
    { mes: 'Set', ano2023: 780000, ano2024: 950000 },
    { mes: 'Out', ano2023: 1000000, ano2024: 1200000 },
    { mes: 'Nov', ano2023: 900000, ano2024: 1100000 },
    { mes: 'Dez', ano2023: 1200000, ano2024: 1350000 },
  ];

  // Expandido: Dados detalhados de contas a pagar/receber
  const contasDetalhadasData = {
    aPagar: {
      vencido: 45000,
      aVencer: {
        recorrente: 85000,
        eventual: 35000
      },
      emDia: 120000,
      total: 285000
    },
    aReceber: {
      vencido: 25000,
      aVencer: {
        recorrente: 120000,
        eventual: 60000
      },
      emDia: 180000,
      emNegociacao: {
        reparcelamento: 15000,
        aumentoPrazo: 8000,
        desconto: 12000
      },
      precatorio: 45000,
      juridico: 22000,
      lost: 8000,
      total: 495000
    }
  };

  // Dados para o gráfico de status de contas a receber
  const statusContasReceberData = [
    { status: 'Em Dia', valor: 180000, cor: '#10b981' },
    { status: 'A Vencer', valor: 180000, cor: '#f59e0b' },
    { status: 'Vencido', valor: 25000, cor: '#ef4444' },
    { status: 'Negociação', valor: 35000, cor: '#8b5cf6' },
    { status: 'Precatório', valor: 45000, cor: '#06b6d4' },
    { status: 'Jurídico', valor: 22000, cor: '#f97316' },
    { status: 'Lost', valor: 8000, cor: '#6b7280' },
  ];

  const dreData = [
    { mes: 'Jul', receita: 850000, despesa: 620000 },
    { mes: 'Ago', receita: 920000, despesa: 680000 },
    { mes: 'Set', receita: 780000, despesa: 590000 },
    { mes: 'Out', receita: 1200000, despesa: 850000 },
    { mes: 'Nov', receita: 1100000, despesa: 780000 },
    { mes: 'Dez', receita: 1350000, despesa: 950000 },
  ];

  const projetos = [
    { nome: 'Projeto Alpha', valor: 2500000, regiao: 'Sudeste', status: 'Em Andamento', progresso: 75 },
    { nome: 'Projeto Beta', valor: 1800000, regiao: 'Sul', status: 'Planejamento', progresso: 25 },
    { nome: 'Projeto Gamma', valor: 3200000, regiao: 'Nordeste', status: 'Em Andamento', progresso: 60 },
    { nome: 'Projeto Delta', valor: 1200000, regiao: 'Centro-Oeste', status: 'Concluído', progresso: 100 },
  ];

  const importacoes = [
    { id: 'IMP001', fornecedor: 'Fornecedor A', produto: 'Matéria Prima X', etapa: 'Embarque', status: 'Em Trânsito' },
    { id: 'IMP002', fornecedor: 'Fornecedor B', produto: 'Componente Y', etapa: 'Desembaraço', status: 'Liberado' },
    { id: 'IMP003', fornecedor: 'Fornecedor C', produto: 'Produto Z', etapa: 'Transporte', status: 'Em Trânsito' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento': return 'bg-blue-500';
      case 'Planejamento': return 'bg-yellow-500';
      case 'Concluído': return 'bg-green-500';
      case 'Em Trânsito': return 'bg-orange-500';
      case 'Liberado': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Custom label function for better positioning
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, status }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.03) return null; // Don't show labels for very small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="#374151" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="11"
        fontWeight="500"
      >
        {`${status} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-imuv-blue mb-2">BI Geral</h1>
          <p className="text-gray-600">Dashboard executivo com indicadores principais</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Posição de Estoque */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Package className="h-5 w-5 text-imuv-blue" />
                Posição de Estoque
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={estoqueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="produto" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantidade" fill="#0000FE" name="Quantidade Atual" />
                  <Bar dataKey="minimo" fill="#0BB8F6" name="Estoque Mínimo" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Estoque Reservado */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Estoque Reservado</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={estoqueReservadoData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {estoqueReservadoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Novo: Comparativo Anual de Faturamento */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-3">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Comparativo Anual de Faturamento - 2023 vs 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={faturamentoAnualData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis tickFormatter={(value) => `R$ ${(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="ano2023" fill="#94a3b8" name="2023" />
                  <Bar dataKey="ano2024" fill="#0000FE" name="2024" />
                  <Line type="monotone" dataKey="ano2024" stroke="#0BB8F6" strokeWidth={2} name="Tendência 2024" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Caixa Contábil */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-imuv-cyan" />
                Caixa Contábil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-imuv-blue">R$ 2.847.520</p>
                  <p className="text-sm text-gray-600">Saldo Atual</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-lg font-semibold text-green-600">R$ 1.2M</p>
                    <p className="text-xs text-gray-600">Entradas</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-lg font-semibold text-red-600">R$ 850k</p>
                    <p className="text-xs text-gray-600">Saídas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expandido: Contas a Pagar/Receber Detalhadas */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-imuv-cyan" />
                Contas a Pagar/Receber - Detalhado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contas a Pagar */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-center text-red-700">Contas a Pagar</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-red-100 rounded">
                      <span className="text-sm font-medium">Vencido</span>
                      <span className="font-semibold text-red-700">
                        {formatCurrency(contasDetalhadasData.aPagar.vencido)}
                      </span>
                    </div>
                    <div className="pl-4 space-y-1">
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded text-sm">
                        <span>Recorrente - a vencer</span>
                        <span className="font-medium text-yellow-700">
                          {formatCurrency(contasDetalhadasData.aPagar.aVencer.recorrente)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded text-sm">
                        <span>Eventual - a vencer</span>
                        <span className="font-medium text-yellow-700">
                          {formatCurrency(contasDetalhadasData.aPagar.aVencer.eventual)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm">Em Dia</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(contasDetalhadasData.aPagar.emDia)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-imuv-blue text-white rounded">
                      <span className="text-sm font-semibold">Total</span>
                      <span className="font-bold">
                        {formatCurrency(contasDetalhadasData.aPagar.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contas a Receber */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-center text-green-700">Contas a Receber</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-red-100 rounded">
                      <span className="text-sm font-medium">Vencido</span>
                      <span className="font-semibold text-red-700">
                        {formatCurrency(contasDetalhadasData.aReceber.vencido)}
                      </span>
                    </div>
                    <div className="pl-4 space-y-1">
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded text-sm">
                        <span>Recorrente - a vencer</span>
                        <span className="font-medium text-yellow-700">
                          {formatCurrency(contasDetalhadasData.aReceber.aVencer.recorrente)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded text-sm">
                        <span>Eventual - a vencer</span>
                        <span className="font-medium text-yellow-700">
                          {formatCurrency(contasDetalhadasData.aReceber.aVencer.eventual)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm">Em Dia</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(contasDetalhadasData.aReceber.emDia)}
                      </span>
                    </div>
                    <div className="pl-4 space-y-1">
                      <div className="flex justify-between items-center p-1 bg-purple-50 rounded text-xs">
                        <span>Reparcelamento</span>
                        <span className="font-medium text-purple-600">
                          {formatCurrency(contasDetalhadasData.aReceber.emNegociacao.reparcelamento)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-1 bg-purple-50 rounded text-xs">
                        <span>Aumento de prazo</span>
                        <span className="font-medium text-purple-600">
                          {formatCurrency(contasDetalhadasData.aReceber.emNegociacao.aumentoPrazo)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-1 bg-purple-50 rounded text-xs">
                        <span>Desconto</span>
                        <span className="font-medium text-purple-600">
                          {formatCurrency(contasDetalhadasData.aReceber.emNegociacao.desconto)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="text-sm">Precatório</span>
                      <span className="font-semibold text-blue-600">
                        {formatCurrency(contasDetalhadasData.aReceber.precatorio)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="text-sm">Jurídico</span>
                      <span className="font-semibold text-orange-600">
                        {formatCurrency(contasDetalhadasData.aReceber.juridico)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                      <span className="text-sm">Lost</span>
                      <span className="font-semibold text-gray-600">
                        {formatCurrency(contasDetalhadasData.aReceber.lost)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-imuv-blue text-white rounded">
                      <span className="text-sm font-semibold">Total</span>
                      <span className="font-bold">
                        {formatCurrency(contasDetalhadasData.aReceber.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Novo: Status de Contas a Receber - Gráfico */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Status - Contas a Receber
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                  <Pie
                    data={statusContasReceberData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="valor"
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {statusContasReceberData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* DRE Comparativo */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-3">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">DRE Comparativo - Receita vs Despesa</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis tickFormatter={(value) => `R$ ${(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Area type="monotone" dataKey="receita" stackId="1" stroke="#0000FE" fill="#0000FE" name="Receita" />
                  <Area type="monotone" dataKey="despesa" stackId="2" stroke="#0BB8F6" fill="#0BB8F6" name="Despesa" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Projetos Principais */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-imuv-blue" />
                Projetos Principais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projetos.map((projeto, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{projeto.nome}</h4>
                        <p className="text-sm text-gray-600">{projeto.regiao}</p>
                      </div>
                      <Badge className={`${getStatusColor(projeto.status)} text-white`}>
                        {projeto.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-imuv-blue">
                        {formatCurrency(projeto.valor)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {projeto.progresso}% concluído
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-imuv-cyan h-2 rounded-full transition-all duration-300"
                        style={{ width: `${projeto.progresso}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Importações em Andamento */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Importações em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {importacoes.map((imp, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm">{imp.id}</span>
                      <Badge className={`${getStatusColor(imp.status)} text-white text-xs`}>
                        {imp.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{imp.fornecedor}</p>
                    <p className="text-xs font-medium">{imp.produto}</p>
                    <p className="text-xs text-imuv-blue mt-1">Etapa: {imp.etapa}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Programação de Férias */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-imuv-blue" />
                Programação de Férias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold mb-3">Próximas Férias</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">João Silva</p>
                      <p className="text-sm text-gray-600">15/01 - 29/01/2025</p>
                      <p className="text-xs text-blue-600">Vendas</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium">Maria Santos</p>
                      <p className="text-sm text-gray-600">05/02 - 19/02/2025</p>
                      <p className="text-xs text-green-600">Financeiro</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="font-medium">Carlos Oliveira</p>
                      <p className="text-sm text-gray-600">20/02 - 06/03/2025</p>
                      <p className="text-xs text-yellow-600">Produção</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default BIGeral;
