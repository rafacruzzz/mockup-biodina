import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Package, DollarSign, Calendar } from 'lucide-react';
import { getEmprestimosByImportacaoId, Emprestimo } from '@/data/emprestimos';

interface GestaoEmprestimosTabProps {
  importacaoId?: string;
}

const GestaoEmprestimosTab = ({ importacaoId }: GestaoEmprestimosTabProps) => {
  const emprestimos = importacaoId ? getEmprestimosByImportacaoId(importacaoId) : [];

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

  // Calcular estatísticas considerando múltiplas moedas
  const stats = {
    total: emprestimos.length,
    emprestados: emprestimos.filter(emp => emp.status === 'emprestado').length,
    devolvidos: emprestimos.filter(emp => emp.status === 'devolvido').length,
    vencidos: emprestimos.filter(emp => emp.status === 'vencido').length,
    valorTotalBRL: emprestimos.filter(emp => emp.moeda === 'BRL').reduce((sum, emp) => sum + emp.valorEmprestimo, 0),
    valorTotalUSD: emprestimos.filter(emp => emp.moeda === 'USD').reduce((sum, emp) => sum + emp.valorEmprestimo, 0),
    totalBRL: emprestimos.filter(emp => emp.moeda === 'BRL').length,
    totalUSD: emprestimos.filter(emp => emp.moeda === 'USD').length
  };

  if (!importacaoId) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
        <FileText className="h-16 w-16 text-gray-400" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">ID da Importação Necessário</h3>
          <p className="text-gray-500 mt-2">
            Para visualizar os empréstimos vinculados, é necessário que esta importação direta 
            tenha um ID válido definido.
          </p>
        </div>
      </div>
    );
  }

  if (emprestimos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
        <Package className="h-16 w-16 text-gray-400" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">Nenhum Empréstimo Vinculado</h3>
          <p className="text-gray-500 mt-2">
            Não há empréstimos vinculados à importação direta <strong>{importacaoId}</strong>.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Os empréstimos podem ser vinculados através do módulo de Empréstimos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com ID da Importação */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-600" />
          <span className="font-medium text-purple-900">
            Empréstimos Vinculados à Importação: {importacaoId}
          </span>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.emprestados}</div>
                <div className="text-sm text-gray-600">Emprestados</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.devolvidos}</div>
                <div className="text-sm text-gray-600">Devolvidos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.vencidos}</div>
                <div className="text-sm text-gray-600">Vencidos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-lg font-bold text-green-600">{formatCurrency(stats.valorTotalBRL, 'BRL')}</div>
                <div className="text-sm text-gray-600">BRL ({stats.totalBRL})</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-lg font-bold text-blue-600">{formatCurrency(stats.valorTotalUSD, 'USD')}</div>
                <div className="text-sm text-gray-600">USD ({stats.totalUSD})</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Empréstimos */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes dos Empréstimos</CardTitle>
        </CardHeader>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {emprestimos.map((emprestimo) => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GestaoEmprestimosTab;
