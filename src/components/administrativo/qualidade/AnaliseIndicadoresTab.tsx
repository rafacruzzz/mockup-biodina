import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingDown, Repeat, CheckCircle2, Users, AlertTriangle, CheckCircle, TrendingUp, Package, Truck, Headphones, Activity } from 'lucide-react';
import { 
  dadosNCMensal, 
  dadosRetrabalho, 
  dadosEficienciaCAPA, 
  indicesQualidadeFornecedores
} from '@/data/qualidadeData';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

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

export const AnaliseIndicadoresTab = () => {
  return (
    <div className="space-y-6">
      {/* Seção de KPIs */}
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

      {/* Row 1: NC Mensal e Retrabalho */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI: Indicador de Não Conformidade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-green-500" />
              Evolução de Não Conformidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosNCMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="quantidade" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="NCs Abertas"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-green-500">Tendência positiva:</span> Redução de 62,5% nos últimos 6 meses
              </p>
            </div>
          </CardContent>
        </Card>

        {/* KPI: Taxas de Retrabalho */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Repeat className="h-5 w-5" />
              Taxas de Retrabalho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosRetrabalho}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ tipo, percentual }) => `${tipo}: ${percentual}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {dadosRetrabalho.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {dadosRetrabalho.map((item, index) => (
                <div key={index} className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: COLORS[index] }}>
                    {item.percentual}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{item.tipo}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: CAPA e Fornecedores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI: Eficiência da CAPA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Eficiência da CAPA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosEficienciaCAPA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="quantidade" 
                  fill="hsl(var(--primary))" 
                  name="Quantidade"
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-sm text-green-700 dark:text-green-400">
                <span className="font-semibold">Excelente desempenho:</span> 70% de ações preventivas demonstra cultura de qualidade proativa
              </p>
            </div>
          </CardContent>
        </Card>

        {/* KPI: Índices de Qualidade dos Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Qualidade dos Fornecedores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={indicesQualidadeFornecedores} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="nome" width={100} />
                <Tooltip />
                <Bar 
                  dataKey="indiceQualidade" 
                  fill="hsl(var(--primary))"
                  name="Índice de Qualidade (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Detalhada de Fornecedores */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Fornecedores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Índice de Qualidade</TableHead>
                <TableHead>Materiais Não Conformes</TableHead>
                <TableHead>Total de Materiais</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indicesQualidadeFornecedores.map((fornecedor) => (
                <TableRow key={fornecedor.id}>
                  <TableCell className="font-medium">{fornecedor.nome}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold">{fornecedor.indiceQualidade}%</div>
                      <Badge 
                        variant={fornecedor.indiceQualidade >= 95 ? 'default' : fornecedor.indiceQualidade >= 90 ? 'secondary' : 'destructive'}
                      >
                        {fornecedor.indiceQualidade >= 95 ? 'Excelente' : fornecedor.indiceQualidade >= 90 ? 'Bom' : 'Atenção'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{fornecedor.materiaisNaoConformes}</TableCell>
                  <TableCell>{fornecedor.totalMateriais}</TableCell>
                  <TableCell>
                    {fornecedor.indiceQualidade >= 95 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : fornecedor.indiceQualidade >= 90 ? (
                      <CheckCircle className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
