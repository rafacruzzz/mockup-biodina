import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Banknote, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Calendar,
  TrendingUp,
  Building
} from 'lucide-react';
import { mockContasBancarias, formatCurrency } from '@/data/tesouraria';

export const GestaoContasBancarias = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBanco, setFilterBanco] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTipo, setFilterTipo] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa': return 'bg-green-500';
      case 'Inativa': return 'bg-gray-500';
      case 'Bloqueada': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ativa': return <CheckCircle className="h-4 w-4" />;
      case 'Inativa': return <XCircle className="h-4 w-4" />;
      case 'Bloqueada': return <XCircle className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const filteredData = mockContasBancarias.filter(item => {
    const matchesSearch = item.banco.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.agencia.includes(searchTerm) ||
                         item.conta.includes(searchTerm) ||
                         item.gerente?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBanco = !filterBanco || item.banco === filterBanco;
    const matchesStatus = !filterStatus || item.status === filterStatus;
    const matchesTipo = !filterTipo || item.tipo === filterTipo;
    return matchesSearch && matchesBanco && matchesStatus && matchesTipo;
  });

  // Estatísticas
  const contasAtivas = mockContasBancarias.filter(c => c.status === 'Ativa').length;
  const contasInativas = mockContasBancarias.filter(c => c.status === 'Inativa').length;
  const contasBloqueadas = mockContasBancarias.filter(c => c.status === 'Bloqueada').length;
  const saldoTotal = mockContasBancarias
    .filter(c => c.status === 'Ativa')
    .reduce((sum, c) => sum + c.saldo, 0);
  const contasComOFX = mockContasBancarias.filter(c => c.integracaoOFX).length;

  const bancos = [...new Set(mockContasBancarias.map(c => c.banco))];
  const tipos = [...new Set(mockContasBancarias.map(c => c.tipo))];

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Ativas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{contasAtivas}</div>
            <p className="text-xs text-muted-foreground">em operação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(saldoTotal)}</div>
            <p className="text-xs text-muted-foreground">disponível</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Integração OFX</CardTitle>
            <RefreshCw className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{contasComOFX}</div>
            <p className="text-xs text-muted-foreground">automatizadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inativas</CardTitle>
            <XCircle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{contasInativas}</div>
            <p className="text-xs text-muted-foreground">desativadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bloqueadas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{contasBloqueadas}</div>
            <p className="text-xs text-muted-foreground">requerem atenção</p>
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
                placeholder="Buscar por banco, agência, conta ou gerente..."
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
                <SelectItem value="">Todos os bancos</SelectItem>
                {bancos.map(banco => (
                  <SelectItem key={banco} value={banco}>{banco}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os tipos</SelectItem>
                {tipos.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Ativa">Ativa</SelectItem>
                <SelectItem value="Inativa">Inativa</SelectItem>
                <SelectItem value="Bloqueada">Bloqueada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Contas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contas Bancárias</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sincronizar OFX
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banco</TableHead>
                <TableHead>Agência</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Gerente</TableHead>
                <TableHead>OFX</TableHead>
                <TableHead>Última Conciliação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    Nenhuma conta encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((conta) => (
                  <TableRow key={conta.id}>
                    <TableCell className="font-medium">
                      {conta.banco}
                    </TableCell>
                    <TableCell className="font-mono">
                      {conta.agencia}
                    </TableCell>
                    <TableCell className="font-mono">
                      {conta.conta}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {conta.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(conta.saldo)}
                    </TableCell>
                    <TableCell>
                      {conta.gerente ? (
                        <div className="text-sm">
                          <div>{conta.gerente}</div>
                          {conta.telefoneGerente && (
                            <div className="text-muted-foreground">{conta.telefoneGerente}</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Não informado</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {conta.integracaoOFX ? (
                          <Badge variant="secondary" className="bg-green-500 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Ativo
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <XCircle className="h-3 w-3 mr-1" />
                            Inativo
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {conta.ultimaConciliacao ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(conta.ultimaConciliacao).toLocaleDateString('pt-BR')}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Nunca</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={`${getStatusColor(conta.status)} text-white flex items-center gap-1 w-fit`}
                      >
                        {getStatusIcon(conta.status)}
                        {conta.status}
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
                        {conta.integracaoOFX && (
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
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