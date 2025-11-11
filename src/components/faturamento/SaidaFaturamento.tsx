import React, { useState } from "react";
import EmissaoNFeModal from "@/components/faturamento/modals/EmissaoNFeModal";
import VisualizarPedidoModal from "@/components/faturamento/modals/VisualizarPedidoModal";
import NFComplementarModal from "@/components/faturamento/modals/NFComplementarModal";
import CartaCorrecaoModal from "@/components/faturamento/modals/CartaCorrecaoModal";
import DevolucaoModal from "@/components/faturamento/modals/DevolucaoModal";
import CancelamentoModal from "@/components/faturamento/modals/CancelamentoModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, Search, Filter, FileText, 
  CheckCircle, Clock, AlertTriangle, Eye, Users, DollarSign,
  FilePlus, FileEdit, PackageX, XCircle
} from "lucide-react";
import { mockChecklistVendas } from "@/data/faturamentoModules";
import { ChecklistVenda } from "@/types/faturamento";

const SaidaFaturamento = () => {
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [pesquisa, setPesquisa] = useState('');
  const [modalEmissaoOpen, setModalEmissaoOpen] = useState(false);
  const [modalVisualizarOpen, setModalVisualizarOpen] = useState(false);
  const [modalNFComplementarOpen, setModalNFComplementarOpen] = useState(false);
  const [modalCartaCorrecaoOpen, setModalCartaCorrecaoOpen] = useState(false);
  const [modalDevolucaoOpen, setModalDevolucaoOpen] = useState(false);
  const [modalCancelamentoOpen, setModalCancelamentoOpen] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<ChecklistVenda | null>(null);

  const handleVisualizarPedido = (pedido: ChecklistVenda) => {
    setPedidoSelecionado(pedido);
    setModalVisualizarOpen(true);
  };

  const handleNFComplementar = (pedido: ChecklistVenda) => {
    setPedidoSelecionado(pedido);
    setModalNFComplementarOpen(true);
  };

  const handleCartaCorrecao = (pedido: ChecklistVenda) => {
    setPedidoSelecionado(pedido);
    setModalCartaCorrecaoOpen(true);
  };

  const handleDevolucao = (pedido: ChecklistVenda) => {
    setPedidoSelecionado(pedido);
    setModalDevolucaoOpen(true);
  };

  const handleCancelamento = (pedido: ChecklistVenda) => {
    setPedidoSelecionado(pedido);
    setModalCancelamentoOpen(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const vendasFiltradas = mockChecklistVendas.filter(venda => {
    if (filtroStatus !== 'todos' && venda.status.toLowerCase() !== filtroStatus.toLowerCase()) {
      return false;
    }
    if (pesquisa && 
        !venda.numeroPedido.toLowerCase().includes(pesquisa.toLowerCase()) && 
        !venda.cliente.toLowerCase().includes(pesquisa.toLowerCase())) {
      return false;
    }
    return true;
  });

  const stats = {
    aguardando: mockChecklistVendas.filter(v => v.status === 'Aguardando').length,
    validando: mockChecklistVendas.filter(v => v.status === 'Validando').length,
    liberado: mockChecklistVendas.filter(v => v.status === 'Liberado').length,
    faturado: mockChecklistVendas.filter(v => v.status === 'Faturado').length,
    valorTotal: mockChecklistVendas.reduce((sum, v) => sum + v.valorTotal, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saída</h1>
          <p className="text-gray-600">Checklist de vendas e emissão de documentos fiscais</p>
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aguardando</p>
                <p className="text-2xl font-bold text-gray-600">{stats.aguardando}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Validando</p>
                <p className="text-2xl font-bold text-orange-600">{stats.validando}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Liberado</p>
                <p className="text-2xl font-bold text-green-600">{stats.liberado}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Faturado</p>
                <p className="text-2xl font-bold text-blue-600">{stats.faturado}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.valorTotal)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-gray-600" />
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
                  placeholder="Pesquisar por pedido ou cliente..." 
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
                <SelectItem value="faturado">Faturado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Checklist de Vendas */}
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
                <TableHead>Nº Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data Emissão Pedido</TableHead>
                <TableHead>Data Faturamento</TableHead>
                <TableHead>Validações</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendasFiltradas.map((venda) => (
                <TableRow key={venda.id}>
                  <TableCell className="font-medium">{venda.numeroPedido}</TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{venda.cliente}</span>
                      <div className="text-sm text-gray-500">{venda.cnpjCliente}</div>
                    </div>
                  </TableCell>
                  <TableCell>{venda.vendedor}</TableCell>
                  <TableCell>{formatCurrency(venda.valorTotal)}</TableCell>
                  <TableCell>
                    {new Date(venda.dataEmissaoPedido).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {venda.dataFaturamento ? (
                      <span className="text-green-600 font-medium">
                        {new Date(venda.dataFaturamento).toLocaleDateString('pt-BR')}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      <Badge variant={venda.estoqueValidado ? "default" : "secondary"} className="text-xs">
                        {venda.estoqueValidado ? "✓" : "✗"} Estoque
                      </Badge>
                      <Badge variant={venda.servicosConcluidos ? "default" : "secondary"} className="text-xs">
                        {venda.servicosConcluidos ? "✓" : "✗"} Serviços
                      </Badge>
                      <Badge variant={venda.documentacaoCompleta ? "default" : "secondary"} className="text-xs">
                        {venda.documentacaoCompleta ? "✓" : "✗"} Docs
                      </Badge>
                      <Badge variant={venda.creditoAprovado ? "default" : "secondary"} className="text-xs">
                        {venda.creditoAprovado ? "✓" : "✗"} Crédito
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        venda.status === 'Liberado' ? 'default' : 
                        venda.status === 'Faturado' ? 'default' :
                        venda.status === 'Validando' ? 'secondary' : 
                        'outline'
                      }
                      className={
                        venda.status === 'Faturado' ? 'bg-blue-600' :
                        venda.status === 'Liberado' ? 'bg-green-600' : ''
                      }
                    >
                      {venda.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleVisualizarPedido(venda)}
                        title="Visualizar Pedido"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {venda.status === 'Liberado' && (
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => setModalEmissaoOpen(true)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Faturar
                        </Button>
                      )}

                      {venda.status === 'Faturado' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleNFComplementar(venda)}
                            title="NF Complementar"
                            className="border-blue-600 text-blue-700 hover:bg-blue-50"
                          >
                            <FilePlus className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCartaCorrecao(venda)}
                            title="Carta de Correção"
                            className="border-purple-600 text-purple-700 hover:bg-purple-50"
                          >
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDevolucao(venda)}
                            title="Devolução"
                            className="border-orange-600 text-orange-700 hover:bg-orange-50"
                          >
                            <PackageX className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCancelamento(venda)}
                            title="Cancelamento"
                            className="border-red-600 text-red-700 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Emissão de NF-e */}
      <EmissaoNFeModal 
        isOpen={modalEmissaoOpen} 
        onClose={() => setModalEmissaoOpen(false)} 
      />

      {/* Modal de Visualização de Pedido */}
      {pedidoSelecionado && (
        <>
          <VisualizarPedidoModal
            isOpen={modalVisualizarOpen}
            onClose={() => {
              setModalVisualizarOpen(false);
              setPedidoSelecionado(null);
            }}
            pedido={pedidoSelecionado}
          />

          <NFComplementarModal
            isOpen={modalNFComplementarOpen}
            onClose={() => {
              setModalNFComplementarOpen(false);
              setPedidoSelecionado(null);
            }}
            numeroPedido={pedidoSelecionado.numeroPedido}
          />

          <CartaCorrecaoModal
            isOpen={modalCartaCorrecaoOpen}
            onClose={() => {
              setModalCartaCorrecaoOpen(false);
              setPedidoSelecionado(null);
            }}
            numeroPedido={pedidoSelecionado.numeroPedido}
          />

          <DevolucaoModal
            isOpen={modalDevolucaoOpen}
            onClose={() => {
              setModalDevolucaoOpen(false);
              setPedidoSelecionado(null);
            }}
            numeroPedido={pedidoSelecionado.numeroPedido}
          />

          <CancelamentoModal
            isOpen={modalCancelamentoOpen}
            onClose={() => {
              setModalCancelamentoOpen(false);
              setPedidoSelecionado(null);
            }}
            numeroPedido={pedidoSelecionado.numeroPedido}
          />
        </>
      )}
    </div>
  );
};

export default SaidaFaturamento;