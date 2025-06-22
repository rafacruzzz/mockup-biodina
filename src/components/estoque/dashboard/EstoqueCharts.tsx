
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { PosicaoEstoque } from "@/types/estoque";

interface EstoqueChartsProps {
  posicaoEstoque: PosicaoEstoque[];
}

const EstoqueCharts = ({ posicaoEstoque }: EstoqueChartsProps) => {
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

  return (
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
  );
};

export default EstoqueCharts;
