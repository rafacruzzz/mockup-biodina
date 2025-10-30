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
  DollarSign, AlertTriangle, FileText, Eye
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { mockEmprestimos, mockParcelasEmprestimo, formatCurrency, formatDate } from "@/data/tesouraria";
import { StatusEmprestimo, StatusParcela, STATUS_COLORS_TESOURARIA } from "@/types/tesouraria";
import NovoEmprestimoModal from "./NovoEmprestimoModal";
import DetalhesEmprestimoModal from "./DetalhesEmprestimoModal";

const GestaoEmprestimosView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetalhesOpen, setIsDetalhesOpen] = useState(false);
  const [selectedEmprestimo, setSelectedEmprestimo] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmprestimos = mockEmprestimos.filter(emp => {
    const matchesStatus = filterStatus === 'todos' || emp.status === filterStatus;
    const matchesSearch = emp.instituicaoFinanceira.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalEmprestimos = mockEmprestimos.reduce((acc, emp) => acc + emp.valorTotal, 0);
  const totalSaldoDevedor = mockEmprestimos.reduce((acc, emp) => acc + emp.saldoDevedor, 0);
  const emprestimosAtivos = mockEmprestimos.filter(emp => emp.status === StatusEmprestimo.ATIVO).length;
  const percentualPago = ((totalEmprestimos - totalSaldoDevedor) / totalEmprestimos) * 100;

  const dadosGrafico = mockEmprestimos.map(emp => ({
    nome: emp.codigo,
    total: emp.valorTotal,
    pago: emp.valorTotal - emp.saldoDevedor,
    saldo: emp.saldoDevedor
  }));

  const dadosIndexador = mockEmprestimos.reduce((acc, emp) => {
    const existing = acc.find(item => item.indexador === emp.indexador);
    if (existing) {
      existing.valor += emp.saldoDevedor;
      existing.quantidade++;
    } else {
      acc.push({
        indexador: emp.indexador,
        valor: emp.saldoDevedor,
        quantidade: 1
      });
    }
    return acc;
  }, [] as any[]);

  const cores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const proximasParcelasPendentes = mockParcelasEmprestimo
    .filter(p => p.status === StatusParcela.PENDENTE)
    .sort((a, b) => a.dataVencimento.getTime() - b.dataVencimento.getTime())
    .slice(0, 5);

  const handleViewDetails = (emprestimoId: string) => {
    setSelectedEmprestimo(emprestimoId);
    setIsDetalhesOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Empréstimos</p>
                <p className="text-2xl font-bold">{formatCurrency(totalEmprestimos)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Saldo Devedor</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalSaldoDevedor)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Empréstimos Ativos</p>
                <p className="text-2xl font-bold text-blue-600">{emprestimosAtivos}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">% Amortizado</p>
                <p className="text-2xl font-bold text-green-600">{percentualPago.toFixed(1)}%</p>
                <Progress value={percentualPago} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução dos Empréstimos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="pago" stackId="a" fill="#22c55e" name="Pago" />
                <Bar dataKey="saldo" stackId="a" fill="#ef4444" name="Saldo Devedor" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Indexador</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosIndexador}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({indexador, valor}) => `${indexador}: ${formatCurrency(valor)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {dadosIndexador.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Parcelas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Próximas Parcelas a Vencer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {proximasParcelasPendentes.map((parcela) => {
              const emprestimo = mockEmprestimos.find(e => e.id === parcela.emprestimoId);
              const isVencido = parcela.dataVencimento < new Date();
              
              return (
                <div key={parcela.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`h-4 w-4 ${isVencido ? 'text-red-500' : 'text-yellow-500'}`} />
                    <div>
                      <p className="font-medium">{emprestimo?.instituicaoFinanceira} - {emprestimo?.codigo}</p>
                      <p className="text-sm text-muted-foreground">Parcela {parcela.numerosParcela}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(parcela.valorTotal)}</p>
                    <p className={`text-sm ${isVencido ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {formatDate(parcela.dataVencimento)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Empréstimos */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestão de Empréstimos</CardTitle>
            <Button onClick={() => setIsModalOpen(true)} className="bg-imuv-gold hover:bg-imuv-gold/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Novo Empréstimo
            </Button>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Pesquisar empréstimos..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value={StatusEmprestimo.ATIVO}>Ativo</SelectItem>
                <SelectItem value={StatusEmprestimo.QUITADO}>Quitado</SelectItem>
                <SelectItem value={StatusEmprestimo.EM_ATRASO}>Em Atraso</SelectItem>
                <SelectItem value={StatusEmprestimo.CANCELADO}>Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Instituição</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Saldo Devedor</TableHead>
                <TableHead>Indexador</TableHead>
                <TableHead>Taxa Juros</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmprestimos.map((emprestimo) => (
                <TableRow key={emprestimo.id}>
                  <TableCell className="font-medium">{emprestimo.codigo}</TableCell>
                  <TableCell>{emprestimo.instituicaoFinanceira}</TableCell>
                  <TableCell>{formatCurrency(emprestimo.valorTotal)}</TableCell>
                  <TableCell className="text-red-600 font-semibold">
                    {formatCurrency(emprestimo.saldoDevedor)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{emprestimo.indexador}</Badge>
                  </TableCell>
                  <TableCell>{emprestimo.taxaJuros}% a.a.</TableCell>
                  <TableCell>{formatDate(emprestimo.dataFim)}</TableCell>
                  <TableCell>
                    <Badge className={`${STATUS_COLORS_TESOURARIA[emprestimo.status]} text-white`}>
                      {emprestimo.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(emprestimo.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NovoEmprestimoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {selectedEmprestimo && (
        <DetalhesEmprestimoModal
          isOpen={isDetalhesOpen}
          onClose={() => setIsDetalhesOpen(false)}
          emprestimoId={selectedEmprestimo}
        />
      )}
    </div>
  );
};

export default GestaoEmprestimosView;