import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Eye, CheckCircle, Clock, AlertTriangle, FileText, Download } from 'lucide-react';
import { PedidoFinanceiro } from '@/types/financeiro';
import { mockPedidosFinanceiros } from '@/data/contratosFinanceiros';
import { DetalhesContratoModal } from './components/DetalhesContratoModal';

export function ContratosView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [origemFilter, setOrigemFilter] = useState<string>('todos');
  const [selectedPedido, setSelectedPedido] = useState<PedidoFinanceiro | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const pedidos = mockPedidosFinanceiros.filter(pedido => {
    const matchesSearch = pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.numeroPedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.vendedor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || pedido.status === statusFilter;
    const matchesOrigem = origemFilter === 'todos' || pedido.origem === origemFilter;
    return matchesSearch && matchesStatus && matchesOrigem;
  });

  const resumoGeral = {
    totalPedidos: mockPedidosFinanceiros.length,
    valorTotal: mockPedidosFinanceiros.reduce((sum, p) => sum + p.valor, 0),
    pendentesAprovacao: mockPedidosFinanceiros.filter(p => p.status === 'pendente_aprovacao').length,
    vencendoHoje: mockPedidosFinanceiros.filter(p => {
      const hoje = new Date().toISOString().split('T')[0];
      return p.dataPrevistaPagamento === hoje;
    }).length
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusInfo = (status: string) => {
    const statusMap = {
      'pendente_aprovacao': { color: 'bg-yellow-500', icon: Clock, label: 'Pendente Aprovação' },
      'aprovado': { color: 'bg-green-500', icon: CheckCircle, label: 'Aprovado' },
      'em_pagamento': { color: 'bg-blue-500', icon: Clock, label: 'Em Pagamento' },
      'pago': { color: 'bg-gray-500', icon: CheckCircle, label: 'Pago' },
      'atrasado': { color: 'bg-red-500', icon: AlertTriangle, label: 'Atrasado' }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pendente_aprovacao;
  };

  const getOrigemLabel = (origem: string) => {
    const origemMap = {
      'licitacao': 'Licitação',
      'contratacao_direta': 'Contratação Direta',
      'importacao_direta': 'Importação Direta'
    };
    return origemMap[origem as keyof typeof origemMap] || origem;
  };

  const getPrioridadeColor = (prioridade: string) => {
    const prioridadeMap = {
      'baixa': 'bg-gray-100 text-gray-800',
      'media': 'bg-blue-100 text-blue-800',
      'alta': 'bg-orange-100 text-orange-800',
      'urgente': 'bg-red-100 text-red-800'
    };
    return prioridadeMap[prioridade as keyof typeof prioridadeMap] || prioridadeMap.media;
  };

  const handleViewDetails = (pedido: PedidoFinanceiro) => {
    setSelectedPedido(pedido);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contratos</h2>
          <p className="text-muted-foreground">
            Pedidos do comercial aguardando processamento financeiro
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Resumo Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoGeral.totalPedidos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(resumoGeral.valorTotal)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes Aprovação</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{resumoGeral.pendentesAprovacao}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencendo Hoje</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{resumoGeral.vencendoHoje}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente, número ou vendedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="pendente_aprovacao">Pendente Aprovação</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="em_pagamento">Em Pagamento</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={origemFilter} onValueChange={setOrigemFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Origens</SelectItem>
                <SelectItem value="licitacao">Licitação</SelectItem>
                <SelectItem value="contratacao_direta">Contratação Direta</SelectItem>
                <SelectItem value="importacao_direta">Importação Direta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos ({pedidos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data Prevista</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidos.map((pedido) => {
                const statusInfo = getStatusInfo(pedido.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <TableRow key={pedido.id}>
                    <TableCell className="font-medium">{pedido.numeroPedido}</TableCell>
                    <TableCell>{pedido.cliente}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getOrigemLabel(pedido.origem)}
                      </Badge>
                    </TableCell>
                    <TableCell>{pedido.vendedor}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(pedido.valor)}</TableCell>
                    <TableCell>{new Date(pedido.dataPrevistaPagamento).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge className={getPrioridadeColor(pedido.prioridade)}>
                        {pedido.prioridade.charAt(0).toUpperCase() + pedido.prioridade.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                        <span className="text-sm">{statusInfo.label}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(pedido)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <DetalhesContratoModal
        pedido={selectedPedido}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedPedido(null);
        }}
      />
    </div>
  );
}