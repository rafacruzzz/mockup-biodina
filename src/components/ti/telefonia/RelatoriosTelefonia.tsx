import { useMemo } from "react";
import { Phone, AlertTriangle, CheckCircle, Clock, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { tiModules } from "@/data/tiModules";
import type { RamalTelefone, DefeitoRamal } from "@/types/ti";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const RelatoriosTelefonia = () => {
  const ramais = tiModules.telefonia.subModules.ramais.data as RamalTelefone[];

  // Estatísticas gerais
  const stats = useMemo(() => {
    const totalRamais = ramais.length;
    const operacionais = ramais.filter(r => r.status === 'operacional').length;
    const comDefeito = ramais.filter(r => r.status === 'com_defeito').length;
    const emManutencao = ramais.filter(r => r.status === 'em_manutencao').length;

    // Coletar todos os defeitos
    const todosDefeitos = ramais.flatMap(r => 
      (r.defeitos || []).map(d => ({ ...d, ramal: r }))
    );
    const defeitosAbertos = todosDefeitos.filter(d => d.statusDefeito !== 'resolvido').length;
    const defeitosResolvidos = todosDefeitos.filter(d => d.statusDefeito === 'resolvido').length;
    const taxaResolucao = todosDefeitos.length > 0 
      ? ((defeitosResolvidos / todosDefeitos.length) * 100).toFixed(1)
      : '0';

    // Calcular tempo médio de reparo (mockado)
    const tempoMedioReparo = "4h 20m";

    // Calcular custo total (mockado baseado em registros de uso)
    const custoTotal = ramais.reduce((total, ramal) => {
      return total + (ramal.registrosUso || []).reduce((sum, reg) => sum + (reg.custo || 0), 0);
    }, 0);

    return {
      totalRamais,
      operacionais,
      comDefeito,
      emManutencao,
      percentualOperacional: ((operacionais / totalRamais) * 100).toFixed(1),
      defeitosAbertos,
      taxaResolucao,
      tempoMedioReparo,
      custoTotal,
      todosDefeitos
    };
  }, [ramais]);

  // Dados para gráfico de distribuição por setor
  const distribuicaoSetor = useMemo(() => {
    const setores = ramais.reduce((acc, ramal) => {
      acc[ramal.setor] = (acc[ramal.setor] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(setores)
      .map(([setor, quantidade]) => ({ setor, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }, [ramais]);

  // Dados para gráfico de status
  const statusData = [
    { name: 'Operacional', value: stats.operacionais, color: '#10b981' },
    { name: 'Com Defeito', value: stats.comDefeito, color: '#ef4444' },
    { name: 'Em Manutenção', value: stats.emManutencao, color: '#f59e0b' }
  ];

  // Defeitos por tipo
  const defeitosPorTipo = useMemo(() => {
    const tipos = stats.todosDefeitos.reduce((acc, defeito) => {
      acc[defeito.tipoProblema] = (acc[defeito.tipoProblema] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tipos)
      .map(([tipo, quantidade]) => ({ tipo, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5);
  }, [stats.todosDefeitos]);

  // Modelos de aparelhos
  const distribuicaoModelos = useMemo(() => {
    const modelos = ramais.reduce((acc, ramal) => {
      acc[ramal.modeloAparelho] = (acc[ramal.modeloAparelho] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(modelos)
      .map(([modelo, quantidade]) => ({ modelo, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }, [ramais]);

  // Ramais com mais defeitos
  const ramaisProblematicos = useMemo(() => {
    return ramais
      .map(ramal => ({
        ...ramal,
        totalDefeitos: (ramal.defeitos || []).length,
        defeitosAbertos: (ramal.defeitos || []).filter(d => d.statusDefeito !== 'resolvido').length
      }))
      .filter(r => r.totalDefeitos > 0)
      .sort((a, b) => b.totalDefeitos - a.totalDefeitos)
      .slice(0, 5);
  }, [ramais]);

  const getStatusBadge = (status: DefeitoRamal['statusDefeito']) => {
    const config = {
      aberto: { label: "Aberto", variant: "destructive" as const },
      em_analise: { label: "Em Análise", variant: "default" as const },
      em_reparo: { label: "Em Reparo", variant: "default" as const },
      resolvido: { label: "Resolvido", variant: "secondary" as const }
    };
    const { label, variant } = config[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Ramais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold">{stats.totalRamais}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Operacionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{stats.operacionais}</span>
              <span className="text-sm text-muted-foreground">({stats.percentualOperacional}%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Defeitos Abertos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-2xl font-bold text-red-600">{stats.defeitosAbertos}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{stats.taxaResolucao}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tempo Médio Reparo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">{stats.tempoMedioReparo}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Custo Total (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">
                R$ {stats.custoTotal.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Setor */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Setor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distribuicaoSetor}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="setor" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status dos Ramais */}
        <Card>
          <CardHeader>
            <CardTitle>Status dos Ramais</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Defeitos por Tipo */}
        {defeitosPorTipo.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Tipos de Defeitos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={defeitosPorTipo} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="tipo" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Modelos de Aparelhos */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Modelo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {distribuicaoModelos.map(({ modelo, quantidade }) => (
                <div key={modelo} className="flex items-center justify-between">
                  <span className="text-sm">{modelo}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(quantidade / stats.totalRamais) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{quantidade}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabelas de Detalhamento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Histórico de Defeitos */}
        {stats.todosDefeitos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Defeitos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ramal</TableHead>
                    <TableHead>Problema</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.todosDefeitos
                    .sort((a, b) => new Date(b.dataRegistro).getTime() - new Date(a.dataRegistro).getTime())
                    .slice(0, 10)
                    .map((defeito) => (
                      <TableRow key={defeito.id}>
                        <TableCell className="font-mono font-bold">
                          {defeito.ramal.numeroRamal}
                        </TableCell>
                        <TableCell className="text-sm">{defeito.tipoProblema}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(defeito.dataRegistro).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>{getStatusBadge(defeito.statusDefeito)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Ramais Problemáticos */}
        {ramaisProblematicos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Ramais com Mais Defeitos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ramal</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Abertos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ramaisProblematicos.map((ramal) => (
                    <TableRow key={ramal.id}>
                      <TableCell className="font-mono font-bold">{ramal.numeroRamal}</TableCell>
                      <TableCell className="text-sm">{ramal.setor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{ramal.totalDefeitos}</Badge>
                      </TableCell>
                      <TableCell>
                        {ramal.defeitosAbertos > 0 ? (
                          <Badge variant="destructive">{ramal.defeitosAbertos}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Ramais sem Usuário */}
      {ramais.filter(r => !r.usuarioAssociado).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ramais sem Usuário Associado</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ramal</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ramais
                  .filter(r => !r.usuarioAssociado)
                  .map((ramal) => (
                    <TableRow key={ramal.id}>
                      <TableCell className="font-mono font-bold">{ramal.numeroRamal}</TableCell>
                      <TableCell>{ramal.setor}</TableCell>
                      <TableCell className="text-sm">{ramal.localizacao}</TableCell>
                      <TableCell>
                        <Badge variant={ramal.status === 'operacional' ? 'secondary' : 'destructive'}>
                          {ramal.status === 'operacional' ? 'Operacional' : 'Com Defeito'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RelatoriosTelefonia;
