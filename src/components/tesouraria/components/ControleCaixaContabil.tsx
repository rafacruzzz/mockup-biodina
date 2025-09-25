import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download,
  ArrowUpDown
} from 'lucide-react';
import { mockMovimentacoesCaixa, formatCurrency } from '@/data/tesouraria';
import { MovimentacaoCaixa } from '@/types/tesouraria';

export const ControleCaixaContabil = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado': return 'bg-green-500';
      case 'Pendente': return 'bg-yellow-500';
      case 'Cancelado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'Entrada' ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const filteredData = mockMovimentacoesCaixa
    .filter(item => {
      const matchesSearch = item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTipo = !filterTipo || item.tipo === filterTipo;
      const matchesStatus = !filterStatus || item.status === filterStatus;
      return matchesSearch && matchesTipo && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dataMovimentacao).getTime();
      const dateB = new Date(b.dataMovimentacao).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  // Estatísticas
  const totalEntradas = mockMovimentacoesCaixa
    .filter(m => m.tipo === 'Entrada' && m.status === 'Confirmado')
    .reduce((sum, m) => sum + m.valor, 0);
  
  const totalSaidas = mockMovimentacoesCaixa
    .filter(m => m.tipo === 'Saída' && m.status === 'Confirmado')
    .reduce((sum, m) => sum + m.valor, 0);

  const saldoAtual = totalEntradas - totalSaidas;
  const movimentacoesPendentes = mockMovimentacoesCaixa.filter(m => m.status === 'Pendente').length;

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entradas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalEntradas)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saídas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalSaidas)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoAtual >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(saldoAtual)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Filter className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{movimentacoesPendentes}</div>
            <p className="text-xs text-muted-foreground">movimentações</p>
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
                placeholder="Buscar por descrição ou responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="Entrada">Entrada</SelectItem>
                <SelectItem value="Saída">Saída</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="Confirmado">Confirmado</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Data {sortOrder === 'desc' ? '↓' : '↑'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Movimentações */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Movimentações de Caixa</CardTitle>
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
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Forma Pagamento</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Nenhuma movimentação encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((movimentacao) => (
                  <TableRow key={movimentacao.id}>
                    <TableCell>
                      {new Date(movimentacao.dataMovimentacao).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTipoIcon(movimentacao.tipo)}
                        {movimentacao.tipo}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {movimentacao.descricao}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {movimentacao.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell className={movimentacao.tipo === 'Entrada' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {movimentacao.tipo === 'Entrada' ? '+' : '-'}{formatCurrency(movimentacao.valor)}
                    </TableCell>
                    <TableCell>{movimentacao.formaPagamento}</TableCell>
                    <TableCell>{movimentacao.responsavel}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={`${getStatusColor(movimentacao.status)} text-white`}
                      >
                        {movimentacao.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
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