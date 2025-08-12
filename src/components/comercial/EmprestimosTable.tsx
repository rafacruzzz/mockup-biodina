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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
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
    
    return matchesSearch && matchesStatus && matchesCliente;
  });

  const uniqueClientes = [...new Set(emprestimos.map(emp => emp.nomeCliente))];

  const stats = {
    total: emprestimos.length,
    emprestados: emprestimos.filter(emp => emp.status === 'emprestado').length,
    devolvidos: emprestimos.filter(emp => emp.status === 'devolvido').length,
    vencidos: emprestimos.filter(emp => emp.status === 'vencido').length,
    valorTotal: emprestimos.reduce((sum, emp) => sum + emp.valorEmprestimoDolar, 0)
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-biodina-blue">{stats.total}</div>
            <div className="text-sm text-gray-600">Total de Empréstimos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.emprestados}</div>
            <div className="text-sm text-gray-600">Em Empréstimo</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.devolvidos}</div>
            <div className="text-sm text-gray-600">Devolvidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.vencidos}</div>
            <div className="text-sm text-gray-600">Vencidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-biodina-gold">{formatCurrency(stats.valorTotal)}</div>
            <div className="text-sm text-gray-600">Valor Total</div>
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
                  <TableHead>Valor (USD)</TableHead>
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
                    <TableCell>{formatCurrency(emprestimo.valorEmprestimoDolar)}</TableCell>
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
