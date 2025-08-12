
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Eye, Package } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface EmprestimosTableProps {
  emprestimos: any[];
  isLoading: boolean;
  onRegistrarDevolucao: (emprestimo: any) => void;
}

const EmprestimosTable = ({ emprestimos, isLoading, onRegistrarDevolucao }: EmprestimosTableProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-biodina-blue mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando empréstimos...</p>
        </div>
      </div>
    );
  }

  if (emprestimos.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Nenhum empréstimo encontrado</p>
        <p className="text-gray-400 text-sm">Clique em "Novo Empréstimo" para começar</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Quitado':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Vencido':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="font-semibold text-gray-700">Processo</TableHead>
              <TableHead className="font-semibold text-gray-700">Cliente</TableHead>
              <TableHead className="font-semibold text-gray-700">Produto</TableHead>
              <TableHead className="font-semibold text-gray-700">Valor Emprestado</TableHead>
              <TableHead className="font-semibold text-gray-700">Valor Retornado</TableHead>
              <TableHead className="font-semibold text-gray-700">Saldo</TableHead>
              <TableHead className="font-semibold text-gray-700">Data Empréstimo</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emprestimos.map((emprestimo) => (
              <TableRow key={emprestimo.id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-medium text-biodina-blue">
                  {emprestimo.numero_processo}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{emprestimo.cliente_nome}</div>
                    <div className="text-sm text-gray-500">{emprestimo.cliente_cnpj}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{emprestimo.ref_produto_emprestado}</div>
                    <div className="text-sm text-gray-500">{emprestimo.desc_produto_emprestado}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-biodina-blue">
                  {formatCurrency(emprestimo.valor_emprestimo_dolar || 0)}
                </TableCell>
                <TableCell className="font-medium text-green-600">
                  {formatCurrency(emprestimo.total_retornado || 0)}
                </TableCell>
                <TableCell className={`font-medium ${(emprestimo.saldo || 0) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(emprestimo.saldo || 0)}
                </TableCell>
                <TableCell>{formatDate(emprestimo.data_emprestimo)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(emprestimo.status)}>
                    {emprestimo.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 hover:bg-biodina-gold/10"
                      title="Ver detalhes"
                    >
                      <Eye className="h-4 w-4 text-biodina-gold" />
                    </Button>
                    {emprestimo.status === 'Ativo' && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 hover:bg-green-50"
                        onClick={() => onRegistrarDevolucao(emprestimo)}
                        title="Registrar devolução"
                      >
                        <ArrowLeft className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmprestimosTable;
