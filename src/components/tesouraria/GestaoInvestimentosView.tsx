import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, Search, Edit, Calendar, TrendingUp, TrendingDown, 
  DollarSign, PieChart, BarChart3, Eye, Download
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { mockInvestimentos, formatCurrency, formatDate, calcularRendimentoInvestimento } from "@/data/tesouraria";
import { TipoInvestimento } from "@/types/tesouraria";
import NovoInvestimentoModal from "./NovoInvestimentoModal";

const GestaoInvestimentosView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTipo, setFilterTipo] = useState('todos');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvestimentos = mockInvestimentos.filter(inv => {
    const matchesTipo = filterTipo === 'todos' || inv.tipoInvestimento === filterTipo;
    const matchesStatus = filterStatus === 'todos' || inv.status === filterStatus;
    const matchesSearch = inv.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inv.instituicaoFinanceira.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTipo && matchesStatus && matchesSearch;
  });

  const totalAplicado = mockInvestimentos.reduce((acc, inv) => acc + inv.valorAplicado, 0);
  const totalAtual = mockInvestimentos.reduce((acc, inv) => acc + inv.valorAtual, 0);
  const totalRendimento = totalAtual - totalAplicado;
  const rentabilidadeTotal = (totalRendimento / totalAplicado) * 100;
  const investimentosAtivos = mockInvestimentos.filter(inv => inv.status === 'Ativo').length;

  // Dados para gráficos
  const dadosRendimento = mockInvestimentos.map(inv => ({
    nome: inv.produto.substring(0, 15) + '...',
    aplicado: inv.valorAplicado,
    atual: inv.valorAtual,
    rendimento: inv.rendimentoAtual
  }));

  const dadosPorTipo = Object.values(TipoInvestimento).map(tipo => {
    const investimentosTipo = mockInvestimentos.filter(inv => inv.tipoInvestimento === tipo);
    const valor = investimentosTipo.reduce((acc, inv) => acc + inv.valorAtual, 0);
    const quantidade = investimentosTipo.length;
    
    return {
      tipo,
      valor,
      quantidade,
      rentabilidade: quantidade > 0 ? 
        investimentosTipo.reduce((acc, inv) => acc + inv.rentabilidadeEsperada, 0) / quantidade : 0
    };
  }).filter(item => item.quantidade > 0);

  const dadosEvolucao = [
    { mes: 'Jul 24', valor: 480000, rendimento: 12500 },
    { mes: 'Ago 24', valor: 510000, rendimento: 18200 },
    { mes: 'Set 24', valor: 525000, rendimento: 25800 },
    { mes: 'Out 24', valor: 540000, rendimento: 32100 },
    { mes: 'Nov 24', valor: 555000, rendimento: 38900 },
    { mes: 'Dez 24', valor: 570000, rendimento: 45200 },
    { mes: 'Jan 25', valor: totalAtual, rendimento: totalRendimento }
  ];

  const cores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Aplicado</p>
                <p className="text-2xl font-bold">{formatCurrency(totalAplicado)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Atual</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAtual)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rendimento</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRendimento)}</p>
                <p className="text-sm text-muted-foreground">+{rentabilidadeTotal.toFixed(2)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Investimentos Ativos</p>
                <p className="text-2xl font-bold text-blue-600">{investimentosAtivos}</p>
              </div>
              <PieChart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução dos Investimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dadosEvolucao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Area type="monotone" dataKey="valor" stackId="1" stroke="#0088FE" fill="#0088FE" name="Valor Investido" />
                <Area type="monotone" dataKey="rendimento" stackId="1" stroke="#00C49F" fill="#00C49F" name="Rendimento" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={dadosPorTipo}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({tipo, valor}) => `${tipo}: ${formatCurrency(valor)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {dadosPorTipo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Comparativo de Rendimento */}
      <Card>
        <CardHeader>
          <CardTitle>Rendimento por Investimento</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dadosRendimento}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="aplicado" fill="#94a3b8" name="Valor Aplicado" />
              <Bar dataKey="rendimento" fill="#22c55e" name="Rendimento" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Lista de Investimentos */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestão de Investimentos</CardTitle>
            <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Investimento
            </Button>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Pesquisar investimentos..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                {Object.values(TipoInvestimento).map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Resgatado">Resgatado</SelectItem>
                <SelectItem value="Vencido">Vencido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Instituição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor Aplicado</TableHead>
                <TableHead>Valor Atual</TableHead>
                <TableHead>Rendimento</TableHead>
                <TableHead>Rentabilidade</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestimentos.map((investimento) => {
                const rendimentoPercentual = ((investimento.valorAtual - investimento.valorAplicado) / investimento.valorAplicado) * 100;
                
                return (
                  <TableRow key={investimento.id}>
                    <TableCell className="font-medium">{investimento.produto}</TableCell>
                    <TableCell>{investimento.instituicaoFinanceira}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{investimento.tipoInvestimento}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(investimento.valorAplicado)}</TableCell>
                    <TableCell className="text-green-600 font-semibold">
                      {formatCurrency(investimento.valorAtual)}
                    </TableCell>
                    <TableCell className="text-green-600 font-semibold">
                      {formatCurrency(investimento.rendimentoAtual)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${rendimentoPercentual >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {rendimentoPercentual >= 0 ? '+' : ''}{rendimentoPercentual.toFixed(2)}%
                        </span>
                        <div className="w-16">
                          <Progress 
                            value={Math.min(Math.abs(rendimentoPercentual), 20)} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {investimento.dataVencimento ? formatDate(investimento.dataVencimento) : 'Sem vencimento'}
                    </TableCell>
                    <TableCell>
                      <Badge className={investimento.status === 'Ativo' ? 'bg-green-500 text-white' : 
                                     investimento.status === 'Resgatado' ? 'bg-gray-500 text-white' : 
                                     'bg-red-500 text-white'}>
                        {investimento.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {investimento.comprovanteUrl && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NovoInvestimentoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default GestaoInvestimentosView;