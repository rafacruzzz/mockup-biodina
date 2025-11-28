import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Activity, Wrench, AlertCircle } from 'lucide-react';
import { KPIRT } from '@/types/rt';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DashboardKPIsSectionProps {
  kpis: KPIRT;
}

export const DashboardKPIsSection = ({ kpis }: DashboardKPIsSectionProps) => {
  // Dados para gráfico de CAPAs
  const dadosCAPAs = [
    { name: 'Pendente', value: 2, color: 'hsl(var(--destructive))' },
    { name: 'Em Andamento', value: 3, color: 'hsl(var(--warning))' },
    { name: 'Concluída', value: 1, color: 'hsl(var(--success))' }
  ];

  // Tendência do índice (simulada)
  const tendenciaPositiva = true;
  const variacao = 3.2;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Dashboard de KPIs da RT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Card: Status dos CAPAs */}
            <Card className="col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Status dos CAPAs</span>
                  {kpis.capasAtrasados > 0 && (
                    <Badge variant="destructive" className="animate-pulse">
                      {kpis.capasAtrasados} atrasado{kpis.capasAtrasados > 1 ? 's' : ''}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Abertos</span>
                      <span className="text-2xl font-bold">{kpis.capasAbertos}</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={dadosCAPAs}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {dadosCAPAs.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend 
                        iconType="circle" 
                        wrapperStyle={{ fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Card: Índice de Qualidade */}
            <Card className="col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Índice de Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {kpis.indiceQualidadePerformance.toFixed(1)}%
                    </div>
                    <Progress value={kpis.indiceQualidadePerformance} className="h-3" />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    {tendenciaPositiva ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-success">+{variacao}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-destructive" />
                        <span className="text-destructive">-{variacao}%</span>
                      </>
                    )}
                    <span className="text-muted-foreground">vs mês anterior</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground text-center">
                      Índice calculado com base em conformidades, treinamentos e liberações
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card: Manutenções Preventivas */}
            <Card className="col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Manutenções Preventivas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {kpis.manutencoesPreventivasPendentes}
                    </div>
                    <p className="text-sm text-muted-foreground">Pendentes</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="secondary">Em Dia</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Todas as fábricas</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card: Manutenções Corretivas */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Manutenções Corretivas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {kpis.manutencoesCorretivasPendentes}
                    </div>
                    <p className="text-sm text-muted-foreground">Pendentes</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Prioridade:</span>
                      <Badge variant="destructive">Atenção</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Todas as fábricas</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card: Resumo Geral */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Resumo de Atividades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{kpis.capasAbertos}</div>
                    <p className="text-xs text-muted-foreground">CAPAs Ativos</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {kpis.manutencoesPreventivasPendentes + kpis.manutencoesCorretivasPendentes}
                    </div>
                    <p className="text-xs text-muted-foreground">Total Manutenções</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">
                      {kpis.indiceQualidadePerformance.toFixed(0)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Performance Geral</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
