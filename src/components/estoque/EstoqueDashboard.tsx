
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingDown, AlertTriangle, ArrowUpDown } from "lucide-react";

const EstoqueDashboard = () => {
  const stats = [
    {
      title: "Total de Produtos",
      value: "1,234",
      description: "Produtos em estoque",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Produtos Abaixo do Mínimo",
      value: "23",
      description: "Necessitam reposição",
      icon: TrendingDown,
      color: "text-red-600"
    },
    {
      title: "Produtos Vencendo",
      value: "8",
      description: "Próximos 30 dias",
      icon: AlertTriangle,
      color: "text-yellow-600"
    },
    {
      title: "Movimentações Hoje",
      value: "156",
      description: "Entradas e saídas",
      icon: ArrowUpDown,
      color: "text-green-600"
    }
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50/50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Estoque</h1>
        <p className="text-gray-600">
          Controle completo do seu estoque com informações em tempo real
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Últimas Movimentações</CardTitle>
            <CardDescription>
              Movimentações mais recentes do estoque
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { tipo: "Entrada", produto: "Produto A", quantidade: "+50", tempo: "2 min atrás" },
                { tipo: "Saída", produto: "Produto B", quantidade: "-25", tempo: "15 min atrás" },
                { tipo: "Ajuste", produto: "Produto C", quantidade: "-2", tempo: "1 hora atrás" }
              ].map((mov, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{mov.tipo}</p>
                    <p className="text-sm text-gray-600">{mov.produto}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${mov.quantidade.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {mov.quantidade}
                    </p>
                    <p className="text-xs text-gray-500">{mov.tempo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas de Estoque</CardTitle>
            <CardDescription>
              Produtos que precisam de atenção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { tipo: "Estoque Baixo", produto: "Produto D", nivel: "5 unidades", cor: "text-red-600" },
                { tipo: "Vencimento Próximo", produto: "Produto E", nivel: "15 dias", cor: "text-yellow-600" },
                { tipo: "Sem Movimento", produto: "Produto F", nivel: "30 dias", cor: "text-gray-600" }
              ].map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{alert.tipo}</p>
                    <p className="text-sm text-gray-600">{alert.produto}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${alert.cor}`}>
                      {alert.nivel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EstoqueDashboard;
