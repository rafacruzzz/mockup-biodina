
import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEmprestimos } from '@/hooks/useEmprestimos';
import { EmprestimoResumo } from '@/types/emprestimo';

interface EmprestimosTableProps {
  onNovoEmprestimo: () => void;
  onRegistrarDevolucao: (emprestimo: EmprestimoResumo) => void;
}

const EmprestimosTable = ({ onNovoEmprestimo, onRegistrarDevolucao }: EmprestimosTableProps) => {
  const { emprestimos, isLoading, getStatusColor, formatCurrency, calcularMetricas } = useEmprestimos();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredEmprestimos = emprestimos.filter((emprestimo) => {
    const matchesSearch = 
      emprestimo.numero_processo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emprestimo.cliente_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emprestimo.cliente_cnpj.includes(searchTerm);
    
    const matchesStatus = statusFilter === '' || emprestimo.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const metricas = calcularMetricas(emprestimos);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando empréstimos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Em Aberto</h3>
          <p className="text-2xl font-bold text-blue-600">{metricas.emAberto}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Quitados</h3>
          <p className="text-2xl font-bold text-green-600">{metricas.quitados}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Saldo Devedor</h3>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(metricas.saldoDevedor)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Saldo Credor</h3>
          <p className="text-2xl font-bold text-purple-600">{formatCurrency(metricas.saldoCredor)}</p>
        </div>
      </div>

      {/* Filtros e Ações */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por processo, cliente ou CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="">Todos os Status</option>
            <option value="ATIVO">Ativo</option>
            <option value="PARCIAL">Parcial</option>
            <option value="QUITADO">Quitado</option>
            <option value="EM_DEBITO">Em Débito</option>
            <option value="EM_SUPERAVIT">Em Superávit</option>
          </select>
        </div>
        <Button onClick={onNovoEmprestimo} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Empréstimo
        </Button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº Processo</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Valor Empréstimo</TableHead>
              <TableHead>Valor Retornado</TableHead>
              <TableHead>Saldo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Empréstimo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmprestimos.map((emprestimo) => (
              <TableRow key={emprestimo.id}>
                <TableCell className="font-medium">
                  {emprestimo.numero_processo}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{emprestimo.cliente_nome}</p>
                    <p className="text-sm text-gray-600">{emprestimo.cliente_cnpj}</p>
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(emprestimo.valor_emprestimo_dolar)}</TableCell>
                <TableCell>{formatCurrency(emprestimo.total_retornado)}</TableCell>
                <TableCell>
                  <span className={emprestimo.saldo > 0 ? 'text-red-600 font-medium' : 
                                   emprestimo.saldo < 0 ? 'text-purple-600 font-medium' : 
                                   'text-green-600 font-medium'}>
                    {formatCurrency(Math.abs(emprestimo.saldo))}
                    {emprestimo.saldo < 0 && ' (crédito)'}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(emprestimo.status)}>
                    {emprestimo.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(emprestimo.data_emprestimo).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onRegistrarDevolucao(emprestimo)}
                      disabled={emprestimo.status === 'QUITADO'}
                    >
                      Devolução
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredEmprestimos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum empréstimo encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmprestimosTable;
