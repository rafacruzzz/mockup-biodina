import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, FileText, Clock, DollarSign, AlertTriangle,
  Building, TrendingUp, Eye, Download, Filter
} from "lucide-react";
import { mockPedidosFinanceiros } from "@/data/contratosFinanceiros";
import { DetalhesContratoModal } from "./components/DetalhesContratoModal";
import { PedidoFinanceiro } from "@/types/financeiro";

const ContratosTabContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [origemFilter, setOrigemFilter] = useState("todos");
  const [selectedPedido, setSelectedPedido] = useState<PedidoFinanceiro | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Filtrar pedidos baseado nos filtros
  const filteredPedidos = mockPedidosFinanceiros.filter(pedido => {
    const matchesSearch = 
      pedido.numeroPedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.vendedor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "todos" || pedido.status === statusFilter;
    const matchesOrigem = origemFilter === "todos" || pedido.origem === origemFilter;
    
    return matchesSearch && matchesStatus && matchesOrigem;
  });

  // Calcular resumo geral
  const resumoGeral = {
    totalPedidos: mockPedidosFinanceiros.length,
    valorTotal: mockPedidosFinanceiros.reduce((sum, p) => sum + p.valor, 0),
    pendentesAprovacao: mockPedidosFinanceiros.filter(p => p.status === "pendente_aprovacao").length,
    vencendoHoje: mockPedidosFinanceiros.filter(p => {
      const hoje = new Date();
      const vencimento = new Date(p.dataPrevistaPagamento);
      return vencimento.toDateString() === hoje.toDateString();
    }).length
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusInfo = (status: string) => {
    const statusMap = {
      "pendente_aprovacao": { color: "text-orange-600 border-orange-600", icon: Clock, label: "Pendente Aprovação" },
      "aprovado": { color: "text-blue-600 border-blue-600", icon: FileText, label: "Aprovado" },
      "em_pagamento": { color: "text-purple-600 border-purple-600", icon: DollarSign, label: "Em Pagamento" },
      "pago": { color: "text-green-600 border-green-600", icon: TrendingUp, label: "Pago" },
      "atrasado": { color: "text-red-600 border-red-600", icon: AlertTriangle, label: "Atrasado" }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pendente_aprovacao;
  };

  const getOrigemLabel = (origem: string) => {
    const origens = {
      "licitacao": "Licitação",
      "contratacao_direta": "Contratação Direta", 
      "importacao_direta": "Importação Direta"
    };
    return origens[origem as keyof typeof origens] || origem;
  };

  const getPrioridadeColor = (prioridade: string) => {
    const cores = {
      "alta": "text-red-600",
      "media": "text-yellow-600",
      "baixa": "text-green-600"
    };
    return cores[prioridade as keyof typeof cores] || "text-gray-600";
  };

  const handleViewDetails = (pedido: PedidoFinanceiro) => {
    setSelectedPedido(pedido);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header com informações gerais */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Building className="h-5 w-5" />
            Contratos Comerciais
          </h3>
          <p className="text-muted-foreground">
            Pedidos originados do comercial aguardando pagamento
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Pedidos</p>
                <p className="text-2xl font-bold">{resumoGeral.totalPedidos}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(resumoGeral.valorTotal)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendentes Aprovação</p>
                <p className="text-2xl font-bold text-orange-600">{resumoGeral.pendentesAprovacao}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vencendo Hoje</p>
                <p className="text-2xl font-bold text-red-600">{resumoGeral.vencendoHoje}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar por número, cliente ou vendedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="pendente_aprovacao">Pendente Aprovação</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="em_pagamento">Em Pagamento</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={origemFilter} onValueChange={setOrigemFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as origens</SelectItem>
                <SelectItem value="licitacao">Licitação</SelectItem>
                <SelectItem value="contratacao_direta">Contratação Direta</SelectItem>
                <SelectItem value="importacao_direta">Importação Direta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de contratos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Pedidos Financeiros ({filteredPedidos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPedidos.map((pedido) => {
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
                    <TableCell className="text-right font-medium">
                      {formatCurrency(pedido.valor)}
                    </TableCell>
                    <TableCell>
                      {new Date(pedido.dataPrevistaPagamento).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium capitalize ${getPrioridadeColor(pedido.prioridade)}`}>
                        {pedido.prioridade}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusInfo.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(pedido)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de detalhes */}
      <DetalhesContratoModal
        pedido={selectedPedido}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedPedido(null);
        }}
      />
    </div>
  );
};

export default ContratosTabContent;