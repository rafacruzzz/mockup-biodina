import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Activity, Wrench, AlertCircle, Package, Truck, Headphones } from 'lucide-react';
import { KPIRT } from '@/types/rt';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DashboardKPIsSectionProps {
  kpis: KPIRT;
}

// Dados mock para os KPIs
const kpisQualidadeProduto = [
  { nome: 'Taxa de Não Conformidade (TNC)', valor: 2.3, unidade: '%', meta: 3, status: 'bom', variacao: -0.5 },
  { nome: 'Acuracidade do Laudo/Certificado', valor: 98.5, unidade: '%', meta: 98, status: 'bom', variacao: 1.2 },
  { nome: 'Adesão às Boas Práticas (BP)', valor: 96.8, unidade: '%', meta: 95, status: 'bom', variacao: 0.8 }
];

const kpisQualidadeEntrega = [
  { nome: 'Lead Time da Entrega', valor: 3.2, unidade: 'dias', meta: 4, status: 'bom', variacao: -0.3 },
  { nome: 'Acuracidade do Estoque', valor: 97.1, unidade: '%', meta: 98, status: 'atencao', variacao: -0.9 },
  { nome: 'Taxa de Avarias no Transporte', valor: 0.8, unidade: '%', meta: 1, status: 'bom', variacao: -0.2 }
];

const kpisQualidadeSuporte = [
  { nome: 'MTTR (Mean Time To Repair)', valor: 4.5, unidade: 'horas', meta: 6, status: 'bom', variacao: -1.2 },
  { nome: 'NPS (Net Promoter Score)', valor: 72, unidade: '', meta: 70, status: 'bom', variacao: 5 },
  { nome: 'Tempo Médio de Atendimento (TMA)', valor: 12, unidade: 'min', meta: 15, status: 'bom', variacao: -2 }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'bom': return 'text-green-600 bg-green-50 border-green-200';
    case 'atencao': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'critico': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-muted-foreground bg-muted border-border';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'bom': return <Badge className="bg-green-500 hover:bg-green-600">Conforme</Badge>;
    case 'atencao': return <Badge className="bg-yellow-500 hover:bg-yellow-600">Atenção</Badge>;
    case 'critico': return <Badge variant="destructive">Crítico</Badge>;
    default: return <Badge variant="secondary">-</Badge>;
  }
};

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
      {/* Seção de KPIs de Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            KPIs - Indicadores de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Qualidade do Produto (Conformidade) */}
            <Card className="border-2 border-blue-200 bg-blue-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-800">Qualidade do Produto</span>
                </CardTitle>
                <p className="text-xs text-blue-600">(Conformidade)</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {kpisQualidadeProduto.map((kpi, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${getStatusColor(kpi.status)}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium truncate flex-1">{kpi.nome}</span>
                      {getStatusBadge(kpi.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{kpi.valor}{kpi.unidade}</span>
                      <div className="flex items-center gap-1 text-xs">
                        {kpi.variacao > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-green-500" />
                        )}
                        <span className={kpi.variacao > 0 ? 'text-green-600' : 'text-green-600'}>
                          {kpi.variacao > 0 ? '+' : ''}{kpi.variacao}{kpi.unidade}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Meta: {kpi.meta}{kpi.unidade}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Qualidade da Entrega (Logística) */}
            <Card className="border-2 border-emerald-200 bg-emerald-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Truck className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-800">Qualidade da Entrega</span>
                </CardTitle>
                <p className="text-xs text-emerald-600">(Logística)</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {kpisQualidadeEntrega.map((kpi, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${getStatusColor(kpi.status)}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium truncate flex-1">{kpi.nome}</span>
                      {getStatusBadge(kpi.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{kpi.valor}{kpi.unidade ? ` ${kpi.unidade}` : ''}</span>
                      <div className="flex items-center gap-1 text-xs">
                        {kpi.variacao < 0 ? (
                          <TrendingDown className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-red-500" />
                        )}
                        <span className={kpi.variacao < 0 ? 'text-green-600' : 'text-red-600'}>
                          {kpi.variacao > 0 ? '+' : ''}{kpi.variacao}{kpi.unidade ? ` ${kpi.unidade}` : ''}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Meta: {kpi.meta}{kpi.unidade ? ` ${kpi.unidade}` : ''}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Qualidade do Suporte (Pós-venda) */}
            <Card className="border-2 border-violet-200 bg-violet-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-violet-600" />
                  <span className="text-violet-800">Qualidade do Suporte</span>
                </CardTitle>
                <p className="text-xs text-violet-600">(Pós-venda)</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {kpisQualidadeSuporte.map((kpi, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${getStatusColor(kpi.status)}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium truncate flex-1">{kpi.nome}</span>
                      {getStatusBadge(kpi.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{kpi.valor}{kpi.unidade ? ` ${kpi.unidade}` : ''}</span>
                      <div className="flex items-center gap-1 text-xs">
                        {(kpi.nome.includes('MTTR') || kpi.nome.includes('TMA')) ? (
                          kpi.variacao < 0 ? (
                            <TrendingDown className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingUp className="h-3 w-3 text-red-500" />
                          )
                        ) : (
                          kpi.variacao > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )
                        )}
                        <span className={
                          (kpi.nome.includes('MTTR') || kpi.nome.includes('TMA'))
                            ? (kpi.variacao < 0 ? 'text-green-600' : 'text-red-600')
                            : (kpi.variacao > 0 ? 'text-green-600' : 'text-red-600')
                        }>
                          {kpi.variacao > 0 ? '+' : ''}{kpi.variacao}{kpi.unidade ? ` ${kpi.unidade}` : ''}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Meta: {kpi.meta}{kpi.unidade ? ` ${kpi.unidade}` : ''}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
