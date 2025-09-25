import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Filter, CheckCircle, AlertTriangle, Clock, 
  Eye, FileText, Package, Users
} from "lucide-react";
import { mockChecklistVendas } from "@/data/faturamentoModules";

const EntradaFaturamento = () => {
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [pesquisa, setPesquisa] = useState('');

  const statusColors = {
    'Liberado': 'bg-green-500',
    'Validando': 'bg-yellow-500', 
    'Aguardando': 'bg-blue-500',
    'Rejeitado': 'bg-red-500'
  };

  const statusIcons = {
    'Liberado': CheckCircle,
    'Validando': Clock,
    'Aguardando': AlertTriangle,
    'Rejeitado': AlertTriangle
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const checklists = mockChecklistVendas.filter(checklist => {
    if (filtroStatus !== 'todos' && checklist.status.toLowerCase() !== filtroStatus.toLowerCase()) {
      return false;
    }
    if (pesquisa && !checklist.cliente.toLowerCase().includes(pesquisa.toLowerCase()) && 
        !checklist.pedidoId.toLowerCase().includes(pesquisa.toLowerCase())) {
      return false;
    }
    return true;
  });

  const totais = {
    aguardando: mockChecklistVendas.filter(c => c.status === 'Aguardando').length,
    validando: mockChecklistVendas.filter(c => c.status === 'Validando').length,
    liberado: mockChecklistVendas.filter(c => c.status === 'Liberado').length,
    valorTotal: mockChecklistVendas.reduce((sum, c) => sum + c.valor, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entrada de Faturamento</h1>
          <p className="text-gray-600">Checklist de vendas confirmadas aguardando faturamento</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aguardando</p>
                <p className="text-2xl font-bold text-blue-600">{totais.aguardando}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Validando</p>
                <p className="text-2xl font-bold text-yellow-600">{totais.validando}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Liberados</p>
                <p className="text-2xl font-bold text-green-600">{totais.liberado}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totais.valorTotal)}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Pesquisar por cliente ou pedido..." 
                  className="pl-10"
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </div>
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="aguardando">Aguardando</SelectItem>
                <SelectItem value="validando">Validando</SelectItem>
                <SelectItem value="liberado">Liberado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Checklists */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Checklist de Vendas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data Confirmação</TableHead>
                <TableHead>Validações</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checklists.map((checklist) => {
                const StatusIcon = statusIcons[checklist.status as keyof typeof statusIcons];
                return (
                  <TableRow key={checklist.id}>
                    <TableCell className="font-medium">{checklist.pedidoId}</TableCell>
                    <TableCell>{checklist.cliente}</TableCell>
                    <TableCell>{checklist.vendedor}</TableCell>
                    <TableCell>{formatCurrency(checklist.valor)}</TableCell>
                    <TableCell>{new Date(checklist.dataConfirmacao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Badge variant={checklist.estoqueValidado ? "default" : "secondary"} className="text-xs">
                          <Package className="h-3 w-3 mr-1" />
                          {checklist.estoqueValidado ? "Estoque OK" : "Pendente"}
                        </Badge>
                        <Badge variant={checklist.servicosConcluidos ? "default" : "secondary"} className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {checklist.servicosConcluidos ? "Serviços OK" : "Pendente"}
                        </Badge>
                        <Badge variant={checklist.documentacaoCompleta ? "default" : "secondary"} className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {checklist.documentacaoCompleta ? "Docs OK" : "Pendente"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[checklist.status as keyof typeof statusColors]} text-white flex items-center gap-1 w-fit`}>
                        <StatusIcon className="h-3 w-3" />
                        {checklist.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {checklist.status === 'Liberado' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Faturar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntradaFaturamento;