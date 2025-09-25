import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  DollarSign,
  Building,
  User
} from 'lucide-react';
import { mockCartoesCredito, formatCurrency } from '@/data/tesouraria';

export const GestaoCartoesCredito = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBanco, setFilterBanco] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-500';
      case 'Bloqueado': return 'bg-red-500';
      case 'Cancelado': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ativo': return <CheckCircle className="h-4 w-4" />;
      case 'Bloqueado': return <AlertTriangle className="h-4 w-4" />;
      case 'Cancelado': return <XCircle className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const getProximoVencimento = (vencimentoFatura: number) => {
    const hoje = new Date();
    const proximoVencimento = new Date(hoje.getFullYear(), hoje.getMonth(), vencimentoFatura);
    
    // Se o vencimento já passou este mês, vai para o próximo mês
    if (proximoVencimento < hoje) {
      proximoVencimento.setMonth(proximoVencimento.getMonth() + 1);
    }
    
    return proximoVencimento;
  };

  const getDiasParaVencimento = (vencimentoFatura: number) => {
    const proximoVencimento = getProximoVencimento(vencimentoFatura);
    const hoje = new Date();
    const diffTime = proximoVencimento.getTime() - hoje.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredData = mockCartoesCredito.filter(item => {
    const matchesSearch = item.banco.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.numeroCartao.includes(searchTerm) ||
                         item.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBanco = !filterBanco || item.banco === filterBanco;
    const matchesStatus = !filterStatus || item.status === filterStatus;
    return matchesSearch && matchesBanco && matchesStatus;
  });

  // Estatísticas
  const cartoesAtivos = mockCartoesCredito.filter(c => c.status === 'Ativo').length;
  const cartoesBloqueados = mockCartoesCredito.filter(c => c.status === 'Bloqueado').length;
  const cartoesCancelados = mockCartoesCredito.filter(c => c.status === 'Cancelado').length;
  const limiteTotal = mockCartoesCredito
    .filter(c => c.status === 'Ativo')
    .reduce((sum, c) => sum + c.limite, 0);
  
  const cartoesVencendoSoon = mockCartoesCredito
    .filter(c => c.status === 'Ativo' && getDiasParaVencimento(c.vencimentoFatura) <= 7)
    .length;

  const bancos = [...new Set(mockCartoesCredito.map(c => c.banco))];

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cartões Ativos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{cartoesAtivos}</div>
            <p className="text-xs text-muted-foreground">em operação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite Total</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(limiteTotal)}</div>
            <p className="text-xs text-muted-foreground">disponível</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencendo</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{cartoesVencendoSoon}</div>
            <p className="text-xs text-muted-foreground">próximos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bloqueados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{cartoesBloqueados}</div>
            <p className="text-xs text-muted-foreground">requerem atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
            <XCircle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{cartoesCancelados}</div>
            <p className="text-xs text-muted-foreground">desativados</p>
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
                placeholder="Buscar por banco, número ou responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterBanco} onValueChange={setFilterBanco}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Banco" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os bancos</SelectItem>
                {bancos.map(banco => (
                  <SelectItem key={banco} value={banco}>{banco}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Cartões */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cartões de Crédito</CardTitle>
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
                <TableHead>Banco</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Limite</TableHead>
                <TableHead>Vencimento Fatura</TableHead>
                <TableHead>Próximo Vencimento</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Nenhum cartão encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((cartao) => {
                  const diasVencimento = getDiasParaVencimento(cartao.vencimentoFatura);
                  const proximoVencimento = getProximoVencimento(cartao.vencimentoFatura);
                  
                  return (
                    <TableRow key={cartao.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          {cartao.banco}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono font-semibold">
                        {cartao.numeroCartao}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(cartao.limite)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Dia {cartao.vencimentoFatura}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {diasVencimento <= 7 && (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                          <span className={diasVencimento <= 7 ? 'text-orange-600 font-semibold' : ''}>
                            {proximoVencimento.toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {diasVencimento === 0 ? 'Hoje' : 
                           diasVencimento === 1 ? 'Amanhã' : 
                           `${diasVencimento} dias`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm">
                            {cartao.responsavel}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={`${getStatusColor(cartao.status)} text-white flex items-center gap-1 w-fit`}
                        >
                          {getStatusIcon(cartao.status)}
                          {cartao.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {cartao.observacoes || (
                          <span className="text-muted-foreground">Sem observações</span>
                        )}
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
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};