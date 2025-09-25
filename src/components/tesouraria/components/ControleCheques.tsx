import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { mockCheques, formatCurrency } from '@/data/tesouraria';

export const ControleCheques = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterBanco, setFilterBanco] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Emitido': return 'bg-blue-500';
      case 'Compensado': return 'bg-green-500';
      case 'Devolvido': return 'bg-red-500';
      case 'Cancelado': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Emitido': return <Clock className="h-4 w-4" />;
      case 'Compensado': return <CheckCircle className="h-4 w-4" />;
      case 'Devolvido': return <XCircle className="h-4 w-4" />;
      case 'Cancelado': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredData = mockCheques.filter(item => {
    const matchesSearch = item.numeroCheque.includes(searchTerm) ||
                         item.beneficiario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.finalidade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || item.status === filterStatus;
    const matchesBanco = !filterBanco || item.banco === filterBanco;
    return matchesSearch && matchesStatus && matchesBanco;
  });

  // Estatísticas
  const totalEmitidos = mockCheques.filter(c => c.status === 'Emitido').length;
  const totalCompensados = mockCheques.filter(c => c.status === 'Compensado').length;
  const totalDevolvidos = mockCheques.filter(c => c.status === 'Devolvido').length;
  const valorEmAberto = mockCheques
    .filter(c => c.status === 'Emitido')
    .reduce((sum, c) => sum + c.valor, 0);

  const bancos = [...new Set(mockCheques.map(c => c.banco))];

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emitidos</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalEmitidos}</div>
            <p className="text-xs text-muted-foreground">cheques em aberto</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compensados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalCompensados}</div>
            <p className="text-xs text-muted-foreground">processados com sucesso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devolvidos</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalDevolvidos}</div>
            <p className="text-xs text-muted-foreground">requerem atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor em Aberto</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(valorEmAberto)}</div>
            <p className="text-xs text-muted-foreground">pendente compensação</p>
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
                placeholder="Buscar por número, beneficiário ou finalidade..."
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
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="Emitido">Emitido</SelectItem>
                <SelectItem value="Compensado">Compensado</SelectItem>
                <SelectItem value="Devolvido">Devolvido</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Cheques */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Controle de Cheques</CardTitle>
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
                <TableHead>Número</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Beneficiário</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data Emissão</TableHead>
                <TableHead>Data Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Finalidade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Nenhum cheque encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((cheque) => (
                  <TableRow key={cheque.id}>
                    <TableCell className="font-mono font-semibold">
                      {cheque.numeroCheque}
                    </TableCell>
                    <TableCell>{cheque.banco}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {cheque.beneficiario}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(cheque.valor)}
                    </TableCell>
                    <TableCell>
                      {new Date(cheque.dataEmissao).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      {new Date(cheque.dataVencimento).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={`${getStatusColor(cheque.status)} text-white flex items-center gap-1 w-fit`}
                      >
                        {getStatusIcon(cheque.status)}
                        {cheque.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {cheque.finalidade}
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