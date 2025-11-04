import React, { useState } from "react";
import EmissaoNFeModal from "@/components/faturamento/modals/EmissaoNFeModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, Search, Filter, FileText, Send, Download, 
  CheckCircle, Clock, AlertTriangle, XCircle, Eye
} from "lucide-react";
import { mockDocumentosFiscais, mockProtocolosSefaz } from "@/data/faturamentoModules";

const SaidaFaturamento = () => {
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [pesquisa, setPesquisa] = useState('');
  const [modalEmissaoOpen, setModalEmissaoOpen] = useState(false);

  const statusColors = {
    'Rascunho': 'bg-gray-500',
    'Emitido': 'bg-blue-500',
    'Autorizado': 'bg-green-500',
    'Cancelado': 'bg-red-500',
    'Rejeitado': 'bg-orange-500'
  };

  const statusIcons = {
    'Rascunho': FileText,
    'Emitido': Clock,
    'Autorizado': CheckCircle,
    'Cancelado': XCircle,
    'Rejeitado': AlertTriangle
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const documentos = mockDocumentosFiscais.filter(doc => {
    if (filtroTipo !== 'todos' && doc.tipo !== filtroTipo) {
      return false;
    }
    if (filtroStatus !== 'todos' && doc.status.toLowerCase() !== filtroStatus.toLowerCase()) {
      return false;
    }
    if (pesquisa && !doc.cliente.toLowerCase().includes(pesquisa.toLowerCase()) && 
        !doc.numero.includes(pesquisa)) {
      return false;
    }
    return true;
  });

  const totais = {
    rascunho: mockDocumentosFiscais.filter(d => d.status === 'Rascunho').length,
    emitido: mockDocumentosFiscais.filter(d => d.status === 'Emitido').length,
    autorizado: mockDocumentosFiscais.filter(d => d.status === 'Autorizado').length,
    valorTotal: mockDocumentosFiscais.reduce((sum, d) => sum + d.valorTotal, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saída de Faturamento</h1>
          <p className="text-gray-600">Emissão e transmissão de documentos fiscais</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => setModalEmissaoOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova NF-e
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rascunhos</p>
                <p className="text-2xl font-bold text-gray-600">{totais.rascunho}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emitidos</p>
                <p className="text-2xl font-bold text-blue-600">{totais.emitido}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Autorizados</p>
                <p className="text-2xl font-bold text-green-600">{totais.autorizado}</p>
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
              <Send className="h-8 w-8 text-gray-600" />
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
                  placeholder="Pesquisar por cliente ou número..." 
                  className="pl-10"
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </div>
            </div>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo de Documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="NF-e">NF-e</SelectItem>
                <SelectItem value="NFS-e">NFS-e</SelectItem>
                <SelectItem value="CT-e">CT-e</SelectItem>
                <SelectItem value="Fatura">Fatura</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="rascunho">Rascunho</SelectItem>
                <SelectItem value="emitido">Emitido</SelectItem>
                <SelectItem value="autorizado">Autorizado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentos Fiscais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número/Série</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Emissão</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Protocolo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentos.map((documento) => {
                const StatusIcon = statusIcons[documento.status as keyof typeof statusIcons];
                const protocolo = mockProtocolosSefaz.find(p => p.documentoId === documento.id);
                
                return (
                  <TableRow key={documento.id}>
                    <TableCell>
                      <div>
                        <span className="font-medium">{documento.numero}</span>
                        <div className="text-sm text-gray-500">Série: {documento.serie}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{documento.tipo}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium">{documento.cliente}</span>
                        <div className="text-sm text-gray-500">{documento.cnpjCpf}</div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(documento.emissao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{formatCurrency(documento.valorTotal)}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[documento.status as keyof typeof statusColors]} text-white flex items-center gap-1 w-fit`}>
                        <StatusIcon className="h-3 w-3" />
                        {documento.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {protocolo ? (
                        <div className="text-sm">
                          <div className="font-medium">{protocolo.protocolo}</div>
                          <div className="text-gray-500">
                            {protocolo.dataRetorno ? 
                              new Date(protocolo.dataRetorno).toLocaleString('pt-BR') : 
                              'Processando...'}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {documento.status === 'Autorizado' && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        {documento.status === 'Emitido' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4" />
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

      {/* Modal de Emissão de NF-e */}
      <EmissaoNFeModal 
        isOpen={modalEmissaoOpen} 
        onClose={() => setModalEmissaoOpen(false)} 
      />
    </div>
  );
};

export default SaidaFaturamento;