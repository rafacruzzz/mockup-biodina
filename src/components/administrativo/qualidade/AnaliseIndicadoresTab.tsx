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
import { TrendingDown, Repeat, CheckCircle2, Users, Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { 
  dadosNCMensal, 
  dadosRetrabalho, 
  dadosEficienciaCAPA, 
  indicesQualidadeFornecedores,
  integracoesSensores
} from '@/data/qualidadeData';
import { StatusIntegracao } from '@/types/qualidade';
import { format } from 'date-fns';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export const AnaliseIndicadoresTab = () => {
  const getStatusIcon = (status: StatusIntegracao) => {
    switch (status) {
      case 'OK':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Alerta':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'Erro':
        return <WifiOff className="h-4 w-4 text-destructive" />;
      case 'Desativado':
        return <Wifi className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: StatusIntegracao) => {
    switch (status) {
      case 'OK':
        return 'default';
      case 'Alerta':
        return 'secondary';
      case 'Erro':
        return 'destructive';
      case 'Desativado':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
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

      {/* Integrações e Sensores */}
      <Card>
        <CardHeader>
          <CardTitle>Status das Integrações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {integracoesSensores.map((sensor) => (
              <div 
                key={sensor.id}
                className={`p-4 rounded-lg border-2 ${
                  sensor.status === 'OK' 
                    ? 'border-green-500/20 bg-green-500/5' 
                    : sensor.status === 'Alerta'
                    ? 'border-yellow-500/20 bg-yellow-500/5'
                    : sensor.status === 'Erro'
                    ? 'border-destructive/20 bg-destructive/5'
                    : 'border-border bg-muted/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-sm">{sensor.nome}</div>
                  {getStatusIcon(sensor.status)}
                </div>
                <div className="text-xs text-muted-foreground mb-2">{sensor.tipo}</div>
                {sensor.valor && (
                  <div className="text-2xl font-bold mb-1">
                    {sensor.valor}{sensor.unidade}
                  </div>
                )}
                {sensor.limiteMin !== undefined && sensor.limiteMax !== undefined && (
                  <div className="text-xs text-muted-foreground mb-2">
                    Limites: {sensor.limiteMin} - {sensor.limiteMax}{sensor.unidade}
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <Badge variant={getStatusBadgeVariant(sensor.status)}>
                    {sensor.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {format(sensor.ultimaAtualizacao, 'HH:mm')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
