import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Eye, 
  Download,
  BarChart3,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { mockBalancos, formatCurrency } from '@/data/tesouraria';

export const ControleBalancos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTipo, setFilterTipo] = useState('');
  const [filterAno, setFilterAno] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recebido': return 'bg-blue-500';
      case 'Em Análise': return 'bg-yellow-500';
      case 'Aprovado': return 'bg-green-500';
      case 'Questionado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Recebido': return <FileText className="h-4 w-4" />;
      case 'Em Análise': return <Clock className="h-4 w-4" />;
      case 'Aprovado': return <CheckCircle className="h-4 w-4" />;
      case 'Questionado': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredData = mockBalancos.filter(item => {
    const matchesSearch = item.periodo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.escritorioContabil.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || item.status === filterStatus;
    const matchesTipo = !filterTipo || item.tipoBalanco === filterTipo;
    const matchesAno = !filterAno || item.anoExercicio.toString() === filterAno;
    return matchesSearch && matchesStatus && matchesTipo && matchesAno;
  });

  // Estatísticas
  const totalBalancos = mockBalancos.length;
  const balancosAprovados = mockBalancos.filter(b => b.status === 'Aprovado').length;
  const balancosEmAnalise = mockBalancos.filter(b => b.status === 'Em Análise').length;
  const balancosQuestionados = mockBalancos.filter(b => b.status === 'Questionado').length;

  // Dados para gráficos
  const dadosGraficos = mockBalancos
    .sort((a, b) => new Date(a.dataRecebimento).getTime() - new Date(b.dataRecebimento).getTime())
    .map(balanco => ({
      periodo: balanco.periodo,
      receitas: balanco.receitas,
      despesas: balanco.despesas,
      resultado: balanco.resultado
    }));

  const anos = [...new Set(mockBalancos.map(b => b.anoExercicio.toString()))];
  const tipos = [...new Set(mockBalancos.map(b => b.tipoBalanco))];

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balanços</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalBalancos}</div>
            <p className="text-xs text-muted-foreground">documentos recebidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{balancosAprovados}</div>
            <p className="text-xs text-muted-foreground">análise concluída</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Análise</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{balancosEmAnalise}</div>
            <p className="text-xs text-muted-foreground">aguardando revisão</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questionados</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{balancosQuestionados}</div>
            <p className="text-xs text-muted-foreground">necessitam esclarecimento</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução Receitas vs Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosGraficos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line type="monotone" dataKey="receitas" stroke="#22c55e" strokeWidth={2} name="Receitas" />
                <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} name="Despesas" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultado por Período</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGraficos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar 
                  dataKey="resultado" 
                  fill="#22c55e"
                  name="Resultado"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por período ou escritório..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterAno} onValueChange={setFilterAno}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {anos.map(ano => (
                  <SelectItem key={ano} value={ano}>{ano}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {tipos.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Recebido">Recebido</SelectItem>
                <SelectItem value="Em Análise">Em Análise</SelectItem>
                <SelectItem value="Aprovado">Aprovado</SelectItem>
                <SelectItem value="Questionado">Questionado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Balanços */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Controle de Balanços</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Período</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Escritório</TableHead>
                <TableHead>Receitas</TableHead>
                <TableHead>Despesas</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Data Recebimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Nenhum balanço encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((balanco) => (
                  <TableRow key={balanco.id}>
                    <TableCell className="font-medium">
                      {balanco.periodo}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {balanco.tipoBalanco}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {balanco.escritorioContabil}
                    </TableCell>
                    <TableCell className="text-green-600 font-semibold">
                      {formatCurrency(balanco.receitas)}
                    </TableCell>
                    <TableCell className="text-red-600 font-semibold">
                      {formatCurrency(balanco.despesas)}
                    </TableCell>
                    <TableCell className={`font-semibold ${balanco.resultado >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(balanco.resultado)}
                    </TableCell>
                    <TableCell>
                      {new Date(balanco.dataRecebimento).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={`${getStatusColor(balanco.status)} text-white flex items-center gap-1 w-fit`}
                      >
                        {getStatusIcon(balanco.status)}
                        {balanco.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};