
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Package, DollarSign, ShoppingCart, FileText, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ComprasDashboard = () => {
  // Dados simulados baseados nas suas planilhas
  const sugestoesPedidos = [
    {
      codigo: "MED001",
      descricao: "Paracetamol 500mg",
      estoque_atual: 150,
      consumo_medio: 85,
      sugestao_pedido: 340,
      valor_usd: 2850.00,
      status: "Crítico"
    },
    {
      codigo: "MED002", 
      descricao: "Ibuprofeno 400mg",
      estoque_atual: 280,
      consumo_medio: 120,
      sugestao_pedido: 480,
      valor_usd: 3200.00,
      status: "Normal"
    },
    {
      codigo: "MED003",
      descricao: "Amoxicilina 500mg",
      estoque_atual: 75,
      consumo_medio: 60,
      sugestao_pedido: 240,
      valor_usd: 1950.00,
      status: "Crítico"
    }
  ];

  const consumoMensal = [
    { mes: "Jan", consumo: 2400, importacao: 3200 },
    { mes: "Fev", consumo: 2800, importacao: 2800 },
    { mes: "Mar", consumo: 3200, importacao: 4100 },
    { mes: "Abr", consumo: 2900, importacao: 3500 },
    { mes: "Mai", consumo: 3100, importacao: 3800 },
    { mes: "Jun", consumo: 2700, importacao: 3200 }
  ];

  const statusCompras = [
    { name: "Em Andamento", value: 12, color: "#3B82F6" },
    { name: "Pendente", value: 8, color: "#F59E0B" },
    { name: "Finalizado", value: 25, color: "#10B981" },
    { name: "Cancelado", value: 3, color: "#EF4444" }
  ];

  const totalSugestaoUSD = sugestoesPedidos.reduce((acc, item) => acc + item.valor_usd, 0);
  const totalItens = sugestoesPedidos.reduce((acc, item) => acc + item.sugestao_pedido, 0);
  const itensCriticos = sugestoesPedidos.filter(item => item.status === "Crítico").length;

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-biodina-blue mb-2">Dashboard de Compras</h1>
        <p className="text-gray-600">Visão geral das previsões, estoque e análises de compras</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-biodina-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-biodina-blue" />
              Total Sugestão USD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-biodina-blue">
              ${totalSugestaoUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-600 mt-1">Baseado na média de consumo</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-biodina-gold">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Package className="h-4 w-4 text-biodina-gold" />
              Total de Itens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-biodina-gold">
              {totalItens.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 mt-1">Quantidade sugerida</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Itens Críticos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {itensCriticos}
            </div>
            <p className="text-xs text-gray-600 mt-1">Necessitam atenção urgente</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-green-500" />
              Pedidos Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              12
            </div>
            <p className="text-xs text-gray-600 mt-1">Em processamento</p>
          </CardContent>
        </Card>
      </div>

      {/* Sugestões de Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-biodina-blue flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Sugestões de Pedidos
          </CardTitle>
          <CardDescription>
            Baseado na análise de consumo médio e estoque atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">Código</th>
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">Descrição</th>
                  <th className="text-center py-2 px-4 font-semibold text-gray-700">Estoque</th>
                  <th className="text-center py-2 px-4 font-semibold text-gray-700">Consumo Médio</th>
                  <th className="text-center py-2 px-4 font-semibold text-gray-700">Sugestão</th>
                  <th className="text-right py-2 px-4 font-semibold text-gray-700">Valor USD</th>
                  <th className="text-center py-2 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {sugestoesPedidos.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-biodina-blue">{item.codigo}</td>
                    <td className="py-3 px-4">{item.descricao}</td>
                    <td className="py-3 px-4 text-center">{item.estoque_atual}</td>
                    <td className="py-3 px-4 text-center">{item.consumo_medio}</td>
                    <td className="py-3 px-4 text-center font-semibold">{item.sugestao_pedido}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      ${item.valor_usd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge 
                        variant="outline" 
                        className={item.status === "Crítico" ? "border-red-200 text-red-700" : "border-green-200 text-green-700"}
                      >
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Análise de Consumo vs Importação */}
        <Card>
          <CardHeader>
            <CardTitle className="text-biodina-blue">Consumo vs Importação</CardTitle>
            <CardDescription>Últimos 6 meses - Análise mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consumoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="consumo" fill="#1e40af" name="Consumo" />
                <Bar dataKey="importacao" fill="#d97706" name="Importação" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status dos Pedidos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-biodina-blue">Status dos Pedidos</CardTitle>
            <CardDescription>Distribuição atual dos pedidos de compra</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusCompras}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusCompras.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComprasDashboard;
