
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import SidebarLayout from "@/components/SidebarLayout";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Calendar as CalendarIcon, MapPin } from "lucide-react";

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
    { name: 'Cliente A', value: 35, color: '#0A2342' },
    { name: 'Cliente B', value: 25, color: '#D5A021' },
    { name: 'Cliente C', value: 20, color: '#1E4D8C' },
    { name: 'Cliente D', value: 20, color: '#061325' },
  ];

  const faturamentoData = [
    { mes: 'Jul', valor: 850000 },
    { mes: 'Ago', valor: 920000 },
    { mes: 'Set', valor: 780000 },
    { mes: 'Out', valor: 1200000 },
    { mes: 'Nov', valor: 1100000 },
    { mes: 'Dez', valor: 1350000 },
  ];

  const contasData = [
    { tipo: 'A Pagar', vencido: 45000, emDia: 120000, total: 165000 },
    { tipo: 'A Receber', vencido: 25000, emDia: 180000, total: 205000 },
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

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-biodina-blue mb-2">BI Geral</h1>
          <p className="text-gray-600">Dashboard executivo com indicadores principais</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Posição de Estoque */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Package className="h-5 w-5 text-biodina-blue" />
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
                  <Bar dataKey="quantidade" fill="#0A2342" name="Quantidade Atual" />
                  <Bar dataKey="minimo" fill="#D5A021" name="Estoque Mínimo" />
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

          {/* Faturamento do Mês */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Faturamento - Últimos 6 Meses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={faturamentoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis tickFormatter={(value) => `R$ ${(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Line type="monotone" dataKey="valor" stroke="#0A2342" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Caixa Contábil */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-biodina-gold" />
                Caixa Contábil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-biodina-blue">R$ 2.847.520</p>
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

          {/* Contas a Pagar/Receber */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Contas a Pagar/Receber</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                {contasData.map((conta, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-semibold text-center">{conta.tipo}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">Vencido</span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(conta.vencido)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Em Dia</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(conta.emDia)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-biodina-blue text-white rounded">
                        <span className="text-sm font-semibold">Total</span>
                        <span className="font-bold">
                          {formatCurrency(conta.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                  <Area type="monotone" dataKey="receita" stackId="1" stroke="#0A2342" fill="#0A2342" name="Receita" />
                  <Area type="monotone" dataKey="despesa" stackId="2" stroke="#D5A021" fill="#D5A021" name="Despesa" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Projetos Principais */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-biodina-blue" />
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
                      <span className="font-bold text-biodina-blue">
                        {formatCurrency(projeto.valor)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {projeto.progresso}% concluído
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-biodina-gold h-2 rounded-full transition-all duration-300"
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
                    <p className="text-xs text-biodina-blue mt-1">Etapa: {imp.etapa}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Programação de Férias */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-1 lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-biodina-blue" />
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
