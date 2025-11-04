import React, { useState } from "react";
import DevolucaoOSModal from "@/components/faturamento/modals/DevolucaoOSModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RotateCcw, Search, Filter, Plus, FileText, 
  CheckCircle, Clock, AlertTriangle, Eye, Package
} from "lucide-react";

interface DevolucaoItem {
  id: string;
  numero: string;
  cliente: string;
  documentoOriginal: string;
  valorOriginal: number;
  valorDevolucao: number;
  dataEmissao: string;
  dataDevolucao: string;
  motivo: string;
  status: 'Solicitada' | 'Processando' | 'Concluída' | 'Rejeitada';
  observacoes?: string;
}

const DevolucaoFaturamento = () => {
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [pesquisa, setPesquisa] = useState('');
  const [modalDevolucaoOSOpen, setModalDevolucaoOSOpen] = useState(false);

  // Mock data para devolucoes
  const devolucoes: DevolucaoItem[] = [
    {
      id: 'DEV001',
      numero: '000000001',
      cliente: 'Farmácia Central Ltda',
      documentoOriginal: '000001234',
      valorOriginal: 15750.00,
      valorDevolucao: 2500.00,
      dataEmissao: '2025-01-25',
      dataDevolucao: '2025-01-24',
      motivo: 'Produto com defeito',
      status: 'Concluída',
      observacoes: 'Lote 202501 com problemas de qualidade'
    },
    {
      id: 'DEV002',
      numero: '000000002',
      cliente: 'Hospital São Lucas',
      documentoOriginal: '000001235',
      valorOriginal: 32400.00,
      valorDevolucao: 5400.00,
      dataEmissao: '2025-01-26',
      dataDevolucao: '2025-01-25',
      motivo: 'Produto incorreto',
      status: 'Processando'
    },
    {
      id: 'DEV003',
      numero: '000000003',
      cliente: 'Drogaria Moderna',
      documentoOriginal: '000001230',
      valorOriginal: 8900.00,
      valorDevolucao: 8900.00,
      dataEmissao: '2025-01-27',
      dataDevolucao: '2025-01-26',
      motivo: 'Cancelamento de pedido',
      status: 'Solicitada'
    }
  ];

  const statusColors = {
    'Solicitada': 'bg-blue-500',
    'Processando': 'bg-yellow-500',
    'Concluída': 'bg-green-500',
    'Rejeitada': 'bg-red-500'
  };

  const statusIcons = {
    'Solicitada': Clock,
    'Processando': AlertTriangle,
    'Concluída': CheckCircle,
    'Rejeitada': AlertTriangle
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const devolucoesFiltradas = devolucoes.filter(dev => {
    if (filtroStatus !== 'todos' && dev.status.toLowerCase() !== filtroStatus.toLowerCase()) {
      return false;
    }
    if (pesquisa && !dev.cliente.toLowerCase().includes(pesquisa.toLowerCase()) && 
        !dev.numero.includes(pesquisa) && !dev.documentoOriginal.includes(pesquisa)) {
      return false;
    }
    return true;
  });

  const totais = {
    solicitada: devolucoes.filter(d => d.status === 'Solicitada').length,
    processando: devolucoes.filter(d => d.status === 'Processando').length,
    concluida: devolucoes.filter(d => d.status === 'Concluída').length,
    valorTotal: devolucoes.reduce((sum, d) => sum + d.valorDevolucao, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Devolução de Faturamento</h1>
          <p className="text-gray-600">Gestão de devoluções e notas fiscais de entrada</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => setModalDevolucaoOSOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Devolução (OS)
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Solicitadas</p>
                <p className="text-2xl font-bold text-blue-600">{totais.solicitada}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processando</p>
                <p className="text-2xl font-bold text-yellow-600">{totais.processando}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-green-600">{totais.concluida}</p>
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
              <RotateCcw className="h-8 w-8 text-gray-600" />
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
                  placeholder="Pesquisar por cliente, número da devolução ou documento original..." 
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
                <SelectItem value="solicitada">Solicitada</SelectItem>
                <SelectItem value="processando">Processando</SelectItem>
                <SelectItem value="concluída">Concluída</SelectItem>
                <SelectItem value="rejeitada">Rejeitada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Devoluções */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Devoluções Registradas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número Devolução</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Doc. Original</TableHead>
                <TableHead>Valor Original</TableHead>
                <TableHead>Valor Devolução</TableHead>
                <TableHead>Data Devolução</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devolucoesFiltradas.map((devolucao) => {
                const StatusIcon = statusIcons[devolucao.status as keyof typeof statusIcons];
                return (
                  <TableRow key={devolucao.id}>
                    <TableCell className="font-medium">{devolucao.numero}</TableCell>
                    <TableCell>{devolucao.cliente}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {devolucao.documentoOriginal}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(devolucao.valorOriginal)}</TableCell>
                    <TableCell className="font-bold text-red-600">
                      -{formatCurrency(devolucao.valorDevolucao)}
                    </TableCell>
                    <TableCell>{new Date(devolucao.dataDevolucao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <div className="max-w-32 truncate" title={devolucao.motivo}>
                        {devolucao.motivo}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[devolucao.status as keyof typeof statusColors]} text-white flex items-center gap-1 w-fit`}>
                        <StatusIcon className="h-3 w-3" />
                        {devolucao.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {devolucao.status === 'Solicitada' && (
                          <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                            <Package className="h-4 w-4" />
                            Processar
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

      {/* Card de Instruções */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Fluxo de Devolução
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">1. Solicitação</h4>
              <p className="text-blue-700">Cliente solicita devolução informando motivo e produtos</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">2. Processamento</h4>
              <p className="text-yellow-700">Validação do motivo e emissão da nota fiscal de entrada</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">3. Estorno</h4>
              <p className="text-green-700">Estorno automático no estoque e ajustes contábeis</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">4. Conclusão</h4>
              <p className="text-gray-700">Finalização do processo e comunicação com logística</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Devolução OS */}
      <DevolucaoOSModal 
        isOpen={modalDevolucaoOSOpen} 
        onClose={() => setModalDevolucaoOSOpen(false)} 
      />
    </div>
  );
};

export default DevolucaoFaturamento;