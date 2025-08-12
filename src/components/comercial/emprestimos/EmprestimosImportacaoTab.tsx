
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle } from 'lucide-react';
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

interface EmprestimosImportacaoTabProps {
  importacaoId?: string;
  onNovoEmprestimo?: () => void;
  onRegistrarDevolucao?: (emprestimo: EmprestimoResumo) => void;
}

const EmprestimosImportacaoTab = ({ 
  importacaoId, 
  onNovoEmprestimo, 
  onRegistrarDevolucao 
}: EmprestimosImportacaoTabProps) => {
  const { getEmprestimosByImportacao, getStatusColor, formatCurrency } = useEmprestimos();
  const [emprestimos, setEmprestimos] = useState<EmprestimoResumo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEmprestimos = async () => {
      if (!importacaoId) return;
      
      setLoading(true);
      try {
        const data = await getEmprestimosByImportacao(importacaoId);
        setEmprestimos(data);
      } catch (error) {
        console.error('Erro ao carregar empréstimos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEmprestimos();
  }, [importacaoId, getEmprestimosByImportacao]);

  const calcularTotais = () => {
    const totalEmprestado = emprestimos.reduce((acc, emp) => acc + emp.valor_emprestimo_dolar, 0);
    const totalRetornado = emprestimos.reduce((acc, emp) => acc + emp.total_retornado, 0);
    const saldoTotal = totalEmprestado - totalRetornado;
    
    return { totalEmprestado, totalRetornado, saldoTotal };
  };

  if (!importacaoId) {
    return (
      <div className="flex items-center justify-center h-64 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            Importação não salva
          </h3>
          <p className="text-yellow-700">
            Salve a importação direta primeiro para gerenciar empréstimos vinculados.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando empréstimos...</p>
        </div>
      </div>
    );
  }

  const totais = calcularTotais();

  return (
    <div className="space-y-6">
      {/* Header com totais */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Empréstimos Vinculados à Importação
          </h3>
          
          {emprestimos.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Total Emprestado</p>
                <p className="text-lg font-bold text-blue-800">{formatCurrency(totais.totalEmprestado)}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Total Retornado</p>
                <p className="text-lg font-bold text-green-800">{formatCurrency(totais.totalRetornado)}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">Saldo Total</p>
                <p className={`text-lg font-bold ${totais.saldoTotal > 0 ? 'text-red-600' : 
                                totais.saldoTotal < 0 ? 'text-purple-600' : 'text-green-600'}`}>
                  {formatCurrency(Math.abs(totais.saldoTotal))}
                  {totais.saldoTotal < 0 && ' (crédito)'}
                </p>
              </div>
            </div>
          )}
        </div>

        {onNovoEmprestimo && (
          <Button onClick={onNovoEmprestimo} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Empréstimo
          </Button>
        )}
      </div>

      {/* Tabela de empréstimos */}
      {emprestimos.length > 0 ? (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Processo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Valor Empréstimo</TableHead>
                <TableHead>Valor Retornado</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emprestimos.map((emprestimo) => (
                <TableRow key={emprestimo.id}>
                  <TableCell className="font-medium">
                    {emprestimo.numero_processo}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{emprestimo.cliente_nome}</p>
                      <p className="text-xs text-gray-600">{emprestimo.cliente_cnpj}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{emprestimo.ref_produto_emprestado}</p>
                      {emprestimo.desc_produto_emprestado && (
                        <p className="text-xs text-gray-600 truncate max-w-[150px]">
                          {emprestimo.desc_produto_emprestado}
                        </p>
                      )}
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
                    {onRegistrarDevolucao && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onRegistrarDevolucao(emprestimo)}
                        disabled={emprestimo.status === 'QUITADO'}
                      >
                        Devolução
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Nenhum empréstimo vinculado
            </h3>
            <p className="text-gray-600 mb-4">
              Não há empréstimos vinculados a esta importação direta.
            </p>
            {onNovoEmprestimo && (
              <Button onClick={onNovoEmprestimo} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Empréstimo
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmprestimosImportacaoTab;
