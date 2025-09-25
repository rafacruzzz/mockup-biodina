import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  XCircle, Search, Filter, AlertTriangle, 
  CheckCircle, Clock, Eye, Ban, FileText
} from "lucide-react";

interface CancelamentoItem {
  id: string;
  documentoNumero: string;
  tipo: 'NF-e' | 'NFS-e' | 'CT-e';
  cliente: string;
  valor: number;
  dataEmissao: string;
  dataSolicitacao: string;
  solicitadoPor: string;
  justificativa: string;
  status: 'Solicitado' | 'Analisando' | 'Aprovado' | 'Cancelado' | 'Rejeitado';
  protocoloCancelamento?: string;
  observacoes?: string;
}

const CancelamentoFaturamento = () => {
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [pesquisa, setPesquisa] = useState('');
  const [justificativaCancelamento, setJustificativaCancelamento] = useState('');

  // Mock data para cancelamentos
  const cancelamentos: CancelamentoItem[] = [
    {
      id: 'CANC001',
      documentoNumero: '000001234',
      tipo: 'NF-e',
      cliente: 'Farmácia Central Ltda',
      valor: 15750.00,
      dataEmissao: '2025-01-20',
      dataSolicitacao: '2025-01-25',
      solicitadoPor: 'João Silva',
      justificativa: 'Erro no valor dos produtos - cliente solicitou cancelamento',
      status: 'Cancelado',
      protocoloCancelamento: '135250000123456'
    },
    {
      id: 'CANC002',
      documentoNumero: '000001236',
      tipo: 'NF-e',
      cliente: 'Hospital Regional',
      valor: 28900.00,
      dataEmissao: '2025-01-24',
      dataSolicitacao: '2025-01-25',
      solicitadoPor: 'Maria Santos',
      justificativa: 'Duplicação de documento fiscal',
      status: 'Analisando'
    },
    {
      id: 'CANC003',
      documentoNumero: '000000158',
      tipo: 'NFS-e',
      cliente: 'Clínica Esperança',
      valor: 3200.00,
      dataEmissao: '2025-01-25',
      dataSolicitacao: '2025-01-26',
      solicitadoPor: 'Pedro Costa',
      justificativa: 'Serviço não foi prestado conforme contratado',
      status: 'Solicitado'
    }
  ];

  const statusColors = {
    'Solicitado': 'bg-blue-500',
    'Analisando': 'bg-yellow-500',
    'Aprovado': 'bg-green-500',
    'Cancelado': 'bg-gray-500',
    'Rejeitado': 'bg-red-500'
  };

  const statusIcons = {
    'Solicitado': Clock,
    'Analisando': AlertTriangle,
    'Aprovado': CheckCircle,
    'Cancelado': XCircle,
    'Rejeitado': Ban
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const cancelamentosFiltrados = cancelamentos.filter(canc => {
    if (filtroStatus !== 'todos' && canc.status.toLowerCase() !== filtroStatus.toLowerCase()) {
      return false;
    }
    if (pesquisa && !canc.cliente.toLowerCase().includes(pesquisa.toLowerCase()) && 
        !canc.documentoNumero.includes(pesquisa)) {
      return false;
    }
    return true;
  });

  const totais = {
    solicitado: cancelamentos.filter(c => c.status === 'Solicitado').length,
    analisando: cancelamentos.filter(c => c.status === 'Analisando').length,
    cancelado: cancelamentos.filter(c => c.status === 'Cancelado').length,
    valorTotal: cancelamentos.filter(c => c.status === 'Cancelado').reduce((sum, c) => sum + c.valor, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cancelamento de Documentos</h1>
          <p className="text-gray-600">Gestão de cancelamentos de documentos fiscais</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Solicitados</p>
                <p className="text-2xl font-bold text-blue-600">{totais.solicitado}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Analisando</p>
                <p className="text-2xl font-bold text-yellow-600">{totais.analisando}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelados</p>
                <p className="text-2xl font-bold text-gray-600">{totais.cancelado}</p>
              </div>
              <XCircle className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Cancelado</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totais.valorTotal)}</p>
              </div>
              <Ban className="h-8 w-8 text-gray-600" />
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
                  placeholder="Pesquisar por cliente ou número do documento..." 
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
                <SelectItem value="solicitado">Solicitado</SelectItem>
                <SelectItem value="analisando">Analisando</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Cancelamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Solicitações de Cancelamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data Emissão</TableHead>
                <TableHead>Solicitado Por</TableHead>
                <TableHead>Data Solicitação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cancelamentosFiltrados.map((cancelamento) => {
                const StatusIcon = statusIcons[cancelamento.status as keyof typeof statusIcons];
                return (
                  <TableRow key={cancelamento.id}>
                    <TableCell className="font-medium">{cancelamento.documentoNumero}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{cancelamento.tipo}</Badge>
                    </TableCell>
                    <TableCell>{cancelamento.cliente}</TableCell>
                    <TableCell>{formatCurrency(cancelamento.valor)}</TableCell>
                    <TableCell>{new Date(cancelamento.dataEmissao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{cancelamento.solicitadoPor}</TableCell>
                    <TableCell>{new Date(cancelamento.dataSolicitacao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[cancelamento.status as keyof typeof statusColors]} text-white flex items-center gap-1 w-fit`}>
                        <StatusIcon className="h-3 w-3" />
                        {cancelamento.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Detalhes do Cancelamento</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Documento:</label>
                                <p className="text-sm text-gray-600">{cancelamento.documentoNumero} - {cancelamento.tipo}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Cliente:</label>
                                <p className="text-sm text-gray-600">{cancelamento.cliente}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Justificativa:</label>
                                <p className="text-sm text-gray-600">{cancelamento.justificativa}</p>
                              </div>
                              {cancelamento.protocoloCancelamento && (
                                <div>
                                  <label className="text-sm font-medium">Protocolo:</label>
                                  <p className="text-sm text-gray-600 font-mono">{cancelamento.protocoloCancelamento}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {cancelamento.status === 'Solicitado' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                <XCircle className="h-4 w-4" />
                                Processar
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Processar Cancelamento</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Documento a cancelar:</label>
                                  <p className="text-sm text-gray-600">{cancelamento.documentoNumero}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Justificativa adicional:</label>
                                  <Textarea 
                                    placeholder="Adicione observações sobre o cancelamento..."
                                    value={justificativaCancelamento}
                                    onChange={(e) => setJustificativaCancelamento(e.target.value)}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" className="flex-1">
                                    Rejeitar
                                  </Button>
                                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                                    Cancelar Documento
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
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
            Processo de Cancelamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">1. Solicitação</h4>
              <p className="text-blue-700">Usuário solicita cancelamento com justificativa</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">2. Análise</h4>
              <p className="text-yellow-700">Validação da justificativa e verificação de impactos</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">3. Cancelamento</h4>
              <p className="text-red-700">Envio do cancelamento para SEFAZ/Prefeitura</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">4. Ajustes</h4>
              <p className="text-gray-700">Reversão automática dos lançamentos contábeis</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CancelamentoFaturamento;