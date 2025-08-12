
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign, Package, Clock, TrendingUp } from 'lucide-react';
import { useEmprestimos } from '@/hooks/useEmprestimos';
import EmprestimosTable from './EmprestimosTable';
import NovoEmprestimoModal from './NovoEmprestimoModal';
import RegistrarDevolucaoModal from './RegistrarDevolucaoModal';

const EmprestimosDashboard = () => {
  const [showNovoEmprestimo, setShowNovoEmprestimo] = useState(false);
  const [showDevolucao, setShowDevolucao] = useState(false);
  const [selectedEmprestimo, setSelectedEmprestimo] = useState(null);
  
  const { data: emprestimos, isLoading } = useEmprestimos();

  // Calcular estatísticas
  const stats = emprestimos?.reduce((acc, emp) => {
    acc.total += 1;
    acc.valorTotal += emp.valor_emprestimo_dolar || 0;
    acc.valorRetornado += emp.total_retornado || 0;
    acc.saldoPendente += emp.saldo || 0;
    
    if (emp.status === 'Ativo') acc.ativos += 1;
    if (emp.status === 'Quitado') acc.quitados += 1;
    
    return acc;
  }, {
    total: 0,
    ativos: 0,
    quitados: 0,
    valorTotal: 0,
    valorRetornado: 0,
    saldoPendente: 0
  }) || {
    total: 0,
    ativos: 0,
    quitados: 0,
    valorTotal: 0,
    valorRetornado: 0,
    saldoPendente: 0
  };

  const handleRegistrarDevolucao = (emprestimo: any) => {
    setSelectedEmprestimo(emprestimo);
    setShowDevolucao(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-biodina-blue">Gestão de Empréstimos</h1>
          <p className="text-gray-600 mt-1">Gerencie empréstimos e devoluções de produtos</p>
        </div>
        <Button 
          onClick={() => setShowNovoEmprestimo(true)}
          className="bg-biodina-gold hover:bg-biodina-gold/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Empréstimo
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Empréstimos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.ativos} ativos, {stats.quitados} quitados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total Emprestado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.valorTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Em dólares americanos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Retornado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.valorRetornado.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Devoluções recebidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Pendente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.saldoPendente.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Aguardando devolução</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Empréstimos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empréstimos</CardTitle>
        </CardHeader>
        <CardContent>
          <EmprestimosTable 
            emprestimos={emprestimos || []} 
            isLoading={isLoading}
            onRegistrarDevolucao={handleRegistrarDevolucao}
          />
        </CardContent>
      </Card>

      {/* Modais */}
      <NovoEmprestimoModal
        isOpen={showNovoEmprestimo}
        onClose={() => setShowNovoEmprestimo(false)}
      />

      <RegistrarDevolucaoModal
        isOpen={showDevolucao}
        onClose={() => {
          setShowDevolucao(false);
          setSelectedEmprestimo(null);
        }}
        emprestimo={selectedEmprestimo}
      />
    </div>
  );
};

export default EmprestimosDashboard;
