import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, TrendingUp, HardDrive } from "lucide-react";
import { Empresa } from "@/types/super";

interface SuperStatsProps {
  empresas: Empresa[];
}

export const SuperStats = ({ empresas }: SuperStatsProps) => {
  const empresasAtivas = empresas.filter(e => e.status === 'ativa').length;
  const totalUsuarios = empresas.reduce((acc, e) => acc + e.estatisticas.totalUsuarios, 0);
  
  const empresasNovas = empresas.filter(e => {
    const dataCriacao = new Date(e.dataCriacao);
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
    return dataCriacao >= trintaDiasAtras;
  }).length;

  const espacoTotalUtilizado = empresas
    .map(e => parseFloat(e.estatisticas.espacoUtilizado.replace(' GB', '')))
    .reduce((acc, val) => acc + val, 0)
    .toFixed(1);

  const stats = [
    {
      title: "Empresas Ativas",
      value: empresasAtivas,
      icon: Building2,
      description: "Total de empresas"
    },
    {
      title: "Usuários Totais",
      value: totalUsuarios,
      icon: Users,
      description: "Em todas as empresas"
    },
    {
      title: "Novas Empresas",
      value: empresasNovas,
      icon: TrendingUp,
      description: "Últimos 30 dias"
    },
    {
      title: "Storage Utilizado",
      value: `${espacoTotalUtilizado} GB`,
      icon: HardDrive,
      description: "Armazenamento total"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
