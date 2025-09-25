import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, Download, Calendar, TrendingUp, 
  Users, Package, Clock, DollarSign, BarChart3
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const RelatoriosFaturamento = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes_atual');
  const [tipoRelatorio, setTipoRelatorio] = useState('geral');

  const faturamentoPorCliente = [
    { cliente: 'Hospital São Lucas', valor: 85400, documentos: 12 },
    { cliente: 'Farmácia Central', valor: 67200, documentos: 8 },
    { cliente: 'Clínica Esperança', valor: 45600, documentos: 15 },
    { cliente: 'Laboratório XYZ', valor: 38900, documentos: 6 },
    { cliente: 'Drogaria Moderna', valor: 32100, documentos: 9 }
  ];

  const faturamentoPorProduto = [
    { produto: 'Medicamentos Controlados', valor: 156000, quantidade: 2500 },
    { produto: 'Suplementos', valor: 89300, quantidade: 1800 },
    { produto: 'Cosméticos', valor: 67500, quantidade: 1200 },
    { produto: 'Equipamentos Médicos', valor: 45200, quantidade: 150 },
    { produto: 'Material Hospitalar', valor: 38900, quantidade: 890 }
  ];

  const faturamentoPorRegiao = [
    { regiao: 'São Paulo', valor: 245600, documentos: 35 },
    { regiao: 'Rio de Janeiro', valor: 156800, documentos: 22 },
    { regiao: 'Minas Gerais', valor: 134200, documentos: 18 },
    { regiao: 'Paraná', valor: 98500, documentos: 14 },
    { regiao: 'Santa Catarina', valor: 76300, documentos: 11 }
  ];

  const evolucaoMensal = [
    { mes: 'Jul', faturamento: 650000, documentos: 142, tempo: 2.8 },
    { mes: 'Ago', faturamento: 720000, documentos: 156, tempo: 2.5 },
    { mes: 'Set', faturamento: 680000, documentos: 149, tempo: 2.3 },
    { mes: 'Out', faturamento: 790000, documentos: 168, tempo: 2.1 },
    { mes: 'Nov', faturamento: 850000, documentos: 185, tempo: 2.0 },
    { mes: 'Dez', faturamento: 847500, documentos: 182, tempo: 1.9 }
  ];

  const statusDocumentos = [
    { status: 'Autorizados', quantidade: 168, cor: '#16a34a' },
    { status: 'Pendentes', quantidade: 12, cor: '#eab308' },
    { status: 'Cancelados', quantidade: 8, cor: '#dc2626' },
    { status: 'Rejeitados', quantidade: 4, cor: '#6b7280' }
  ];

  const impostosPorTipo = [
    { tipo: 'ICMS', valor: 45600, aliquota: '18%' },
    { tipo: 'PIS', valor: 12300, aliquota: '1.65%' },
    { tipo: 'COFINS', valor: 24800, aliquota: '7.6%' },
    { tipo: 'ISS', valor: 18900, aliquota: '5%' },
    { tipo: 'IPI', valor: 8700, aliquota: '10%' }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const indicadoresPerformance = [
    {
      titulo: "Faturamento Médio Diário",
      valor: "R$ 28.250,00",
      variacao: "+8.5%",
      icone: DollarSign,
      cor: "text-green-600"
    },
    {
      titulo: "Tempo Médio Emissão", 
      valor: "1.9h",
      variacao: "-32.1%",
      icone: Clock,
      cor: "text-green-600"
    },
    {
      titulo: "Documentos por Dia",
      valor: "6.1",
      variacao: "+12.3%",
      icone: FileText,
      cor: "text-green-600"
    },
    {
      titulo: "Taxa de Aprovação",
      valor: "97.9%",
      variacao: "+2.1%",
      icone: TrendingUp,
      cor: "text-green-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios de Faturamento</h1>
          <p className="text-gray-600">Análises e indicadores de performance</p>
        </div>
        <div className="flex gap-4">
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes_atual">Mês Atual</SelectItem>
              <SelectItem value="trimestre">Último Trimestre</SelectItem>
              <SelectItem value="semestre">Último Semestre</SelectItem>
              <SelectItem value="ano">Ano Corrente</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Indicadores de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {indicadoresPerformance.map((indicador) => {
          const Icon = indicador.icone;
          return (
            <Card key={indicador.titulo}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{indicador.titulo}</p>
                    <p className="text-2xl font-bold text-gray-900">{indicador.valor}</p>
                    <p className={`text-sm ${indicador.cor}`}>
                      {indicador.variacao} vs período anterior
                    </p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-full">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução Mensal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Evolução do Faturamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolucaoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(value) => `${(value / 1000)}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line dataKey="faturamento" stroke="hsl(var(--primary))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status dos Documentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
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

      {/* Faturamento por Cliente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Faturamento por Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={faturamentoPorCliente}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="cliente" 
                angle={-45}
                textAnchor="end" 
                height={100}
              />
              <YAxis tickFormatter={(value) => `${(value / 1000)}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="valor" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Produtos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Faturamento por Produto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faturamentoPorProduto.map((produto, index) => (
                <div key={produto.produto} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-sm">{produto.produto}</span>
                    <p className="text-xs text-gray-600">Qty: {produto.quantidade.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">{formatCurrency(produto.valor)}</span>
                    <Badge variant="outline" className="ml-2">#{index + 1}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impostos Coletados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Impostos Coletados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {impostosPorTipo.map((imposto) => (
                <div key={imposto.tipo} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-sm">{imposto.tipo}</span>
                    <p className="text-xs text-gray-600">Alíquota: {imposto.aliquota}</p>
                  </div>
                  <span className="font-bold">{formatCurrency(imposto.valor)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total de Impostos:</span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(impostosPorTipo.reduce((sum, imp) => sum + imp.valor, 0))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tempo Médio de Emissão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Tempo Médio de Emissão (Pedido → NF)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={evolucaoMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis tickFormatter={(value) => `${value}h`} />
              <Tooltip formatter={(value) => `${value} horas`} />
              <Line 
                dataKey="tempo" 
                stroke="#dc2626" 
                strokeWidth={3}
                name="Tempo Médio (horas)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Botões de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Relatórios Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
              <div className="text-left">
                <div className="font-medium">Faturamento Consolidado</div>
                <div className="text-sm text-gray-500">Relatório mensal completo</div>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
              <div className="text-left">
                <div className="font-medium">Retenções de Impostos</div>
                <div className="text-sm text-gray-500">Detalhes por NF emitida</div>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
              <div className="text-left">
                <div className="font-medium">Performance Operacional</div>
                <div className="text-sm text-gray-500">Indicadores e métricas</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosFaturamento;