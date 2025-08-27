import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Download } from "lucide-react";
import NovoEmprestimoModal from "./NovoEmprestimoModal";
import { emprestimosMock, Emprestimo } from "@/data/emprestimos";

const EmprestimosTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [clienteFilter, setClienteFilter] = useState('todos');
  const [moedaFilter, setMoedaFilter] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Usar dados centralizados
  const emprestimos: Emprestimo[] = emprestimosMock;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'emprestado': return 'bg-blue-500';
      case 'devolvido': return 'bg-green-500';
      case 'vencido': return 'bg-red-500';
      case 'parcial': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'emprestado': return 'Emprestado';
      case 'devolvido': return 'Devolvido';
      case 'vencido': return 'Vencido';
      case 'parcial': return 'Devolução Parcial';
      default: return status;
    }
  };

  const formatCurrency = (value: number, currency: 'BRL' | 'USD') => {
    if (currency === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const filteredEmprestimos = emprestimos.filter(emprestimo => {
    const matchesSearch = 
      emprestimo.numeroProcesso.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emprestimo.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emprestimo.cnpjCliente.includes(searchTerm) ||
      emprestimo.referenciaProdutoEmprestado.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || emprestimo.status === statusFilter;
    const matchesCliente = clienteFilter === 'todos' || emprestimo.nomeCliente === clienteFilter;
    const matchesMoeda = moedaFilter === 'todos' || emprestimo.moeda === moedaFilter;
    
    return matchesSearch && matchesStatus && matchesCliente && matchesMoeda;
  });

  const uniqueClientes = [...new Set(emprestimos.map(emp => emp.nomeCliente))];

  // Calcular estatísticas separadas por moeda
  const statsBRL = {
    total: emprestimos.filter(emp => emp.moeda === 'BRL').length,
    emprestados: emprestimos.filter(emp => emp.status === 'emprestado' && emp.moeda === 'BRL').length,
    devolvidos: emprestimos.filter(emp => emp.status === 'devolvido' && emp.moeda === 'BRL').length,
    vencidos: emprestimos.filter(emp => emp.status === 'vencido' && emp.moeda === 'BRL').length,
    valorTotal: emprestimos.filter(emp => emp.moeda === 'BRL').reduce((sum, emp) => sum + emp.valorEmprestimo, 0)
  };

  const statsUSD = {
    total: emprestimos.filter(emp => emp.moeda === 'USD').length,
    emprestados: emprestimos.filter(emp => emp.status === 'emprestado' && emp.moeda === 'USD').length,
    devolvidos: emprestimos.filter(emp => emp.status === 'devolvido' && emp.moeda === 'USD').length,
    vencidos: emprestimos.filter(emp => emp.status === 'vencido' && emp.moeda === 'USD').length,
    valorTotal: emprestimos.filter(emp => emp.moeda === 'USD').reduce((sum, emp) => sum + emp.valorEmprestimo, 0)
  };

  const statsGeral = {
    total: emprestimos.length,
    emprestados: emprestimos.filter(emp => emp.status === 'emprestado').length,
    devolvidos: emprestimos.filter(emp => emp.status === 'devolvido').length,
    vencidos: emprestimos.filter(emp => emp.status === 'vencido').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-biodina-blue">Empréstimos</h2>
          <p className="text-gray-600">Gestão de empréstimos de equipamentos e produtos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button 
            className="bg-biodina-gold hover:bg-biodina-gold/90"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Empréstimo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-biodina-blue">{statsGeral.total}</div>
            <div className="text-sm text-gray-600">Total Geral</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{statsGeral.emprestados}</div>
            <div className="text-sm text-gray-600">Em Empréstimo</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{statsGeral.devolvidos}</div>
            <div className="text-sm text-gray-600">Devolvidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{statsGeral.vencidos}</div>
            <div className="text-sm text-gray-600">Vencidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-green-700">{formatCurrency(statsBRL.valorTotal, 'BRL')}</div>
            <div className="text-sm text-gray-600">Total BRL ({statsBRL.total})</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-blue-700">{formatCurrency(statsUSD.valorTotal, 'USD')}</div>
            <div className="text-sm text-gray-600">Total USD ({statsUSD.total})</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-bold text-biodina-gold">Multi-Moeda</div>
            <div className="text-xs text-gray-600">R$ + USD</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Pesquisar por processo, cliente, CNPJ ou produto..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="emprestado">Emprestado</SelectItem>
                  <SelectItem value="devolvido">Devolvido</SelectItem>
                  <SelectItem value="vencido">Vencido</SelectItem>
                  <SelectItem value="parcial">Devolução Parcial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Select value={moedaFilter} onValueChange={setMoedaFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Moeda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  <SelectItem value="BRL">BRL</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Select value={clienteFilter} onValueChange={setClienteFilter}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Clientes</SelectItem>
                  {uniqueClientes.map((cliente) => (
                    <SelectItem key={cliente} value={cliente}>{cliente}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº Processo</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Produto Emprestado</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Moeda</TableHead>
                  <TableHead>Data Empréstimo</TableHead>
                  <TableHead>Data Retorno</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmprestimos.map((emprestimo) => (
                  <TableRow key={emprestimo.numeroProcesso}>
                    <TableCell className="font-medium">{emprestimo.numeroProcesso}</TableCell>
                    <TableCell>{emprestimo.nomeCliente}</TableCell>
                    <TableCell>{emprestimo.cnpjCliente}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{emprestimo.referenciaProdutoEmprestado}</div>
                        <div className="text-sm text-gray-500">{emprestimo.descricaoProdutoEmprestado}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(emprestimo.valorEmprestimo, emprestimo.moeda)}</TableCell>
                    <TableCell>
                      <Badge variant={emprestimo.moeda === 'BRL' ? 'default' : 'secondary'}>
                        {emprestimo.moeda}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(emprestimo.dataEmprestimo)}</TableCell>
                    <TableCell>
                      {emprestimo.dataRetorno ? formatDate(emprestimo.dataRetorno) : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(emprestimo.status)} text-white`}>
                        {getStatusLabel(emprestimo.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <NovoEmprestimoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default EmprestimosTable;
