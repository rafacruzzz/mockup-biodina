
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, Clock, ShoppingCart, DollarSign, BarChart3, TrendingUp } from "lucide-react";
import { PosicaoEstoque } from "@/types/estoque";

interface EstoqueStatsProps {
  posicaoEstoque: PosicaoEstoque[];
}

const EstoqueStats = ({ posicaoEstoque }: EstoqueStatsProps) => {
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

  return (
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
  );
};

export default EstoqueStats;
