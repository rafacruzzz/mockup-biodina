import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, DollarSign, Clock, CheckCircle, AlertTriangle,
  TrendingUp, Calendar, Users
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const FaturamentoDashboard = () => {
  const stats = [
    {
      title: "Faturamento Mensal",
      value: "R$ 847.500,00",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Documentos Emitidos",
      value: "156",
      change: "+8.2%", 
      icon: FileText,
      trend: "up"
    },
    {
      title: "Tempo Médio Emissão",
      value: "2.3h",
      change: "-15.8%",
      icon: Clock,
      trend: "down"
    },
    {
      title: "Taxa de Aprovação",
      value: "98.7%",
      change: "+1.2%",
      icon: CheckCircle,
      trend: "up"
    }
  ];

  const faturamentoPorMes = [
    { mes: 'Jul', valor: 650000 },
    { mes: 'Ago', valor: 720000 },
    { mes: 'Set', valor: 680000 },
    { mes: 'Out', valor: 790000 },
    { mes: 'Nov', valor: 850000 },
    { mes: 'Dez', valor: 847500 }
  ];

  const tiposDocumento = [
    { tipo: 'NF-e', quantidade: 89, cor: '#0284c7' },
    { tipo: 'NFS-e', quantidade: 45, cor: '#16a34a' },
    { tipo: 'CT-e', quantidade: 15, cor: '#dc2626' },
    { tipo: 'Fatura', quantidade: 7, cor: '#ca8a04' }
  ];

  const statusDocumentos = [
    { status: 'Autorizados', quantidade: 143, cor: '#16a34a' },
    { status: 'Pendentes', quantidade: 8, cor: '#eab308' },
    { status: 'Rejeitados', quantidade: 3, cor: '#dc2626' },
    { status: 'Cancelados', quantidade: 2, cor: '#6b7280' }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Faturamento</h1>
          <p className="text-gray-600">Visão geral da operação de faturamento</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          Janeiro 2025
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} vs mês anterior
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Icon className={`h-6 w-6 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faturamento por Mês */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Faturamento por Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={faturamentoPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(value) => `${(value / 1000)}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="valor" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status dos Documentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Status dos Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDocumentos}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="quantidade"
                  label={({ status, quantidade }) => `${status}: ${quantidade}`}
                >
                  {statusDocumentos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Documentos Pendentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Documentos Pendentes de Atenção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <h4 className="font-medium text-gray-900">NF-e 000001235 - Hospital São Lucas</h4>
                <p className="text-sm text-gray-600">Aguardando retorno SEFAZ há 2 horas</p>
              </div>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                Processando
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <h4 className="font-medium text-gray-900">NFS-e 000000157 - Clínica Esperança</h4>
                <p className="text-sm text-gray-600">Rejeitada: CPF/CNPJ inválido</p>
              </div>
              <Badge variant="outline" className="bg-red-100 text-red-800">
                Rejeitada
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Próximos Vencimentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Próximos Vencimentos (Títulos Gerados)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">Farmácia Central Ltda</span>
                <p className="text-sm text-gray-600">NF-e 000001234 - Venc: 19/02/2025</p>
              </div>
              <span className="font-bold text-lg">R$ 15.750,00</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">Hospital São Lucas</span>
                <p className="text-sm text-gray-600">NF-e 000001235 - Venc: 21/02/2025</p>
              </div>
              <span className="font-bold text-lg">R$ 32.400,00</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaturamentoDashboard;