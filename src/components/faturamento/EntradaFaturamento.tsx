import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  PackageCheck,
  Package,
  Wrench,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  TrendingUp,
  Upload
} from "lucide-react";
import { mockPedidosEntrada } from "@/data/faturamentoModules";
import { PedidoEntradaMercadoria } from "@/types/faturamento";
import PainelNotificacoesEntrada from "./PainelNotificacoesEntrada";
import DetalhesEntradaModal from "./DetalhesEntradaModal";
import UploadXMLModal from "./UploadXMLModal";
import { useToast } from "@/hooks/use-toast";

const EntradaFaturamento = () => {
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [pesquisa, setPesquisa] = useState('');
  const [pedidoSelecionado, setPedidoSelecionado] = useState<PedidoEntradaMercadoria | null>(null);
  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
  const [modalXMLOpen, setModalXMLOpen] = useState(false);
  const [pedidos, setPedidos] = useState<PedidoEntradaMercadoria[]>(mockPedidosEntrada);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const pedidosFiltrados = pedidos.filter(pedido => {
    const matchTipo = filtroTipo === 'todos' || pedido.tipo === filtroTipo;
    const matchCategoria = filtroCategoria === 'todos' || pedido.categoria === filtroCategoria;
    const matchStatus = filtroStatus === 'todos' || pedido.status === filtroStatus;
    const matchPesquisa = pesquisa === '' || 
      pedido.numeroPedido.toLowerCase().includes(pesquisa.toLowerCase()) ||
      pedido.fornecedor.toLowerCase().includes(pesquisa.toLowerCase()) ||
      (pedido.numeroNF && pedido.numeroNF.toLowerCase().includes(pesquisa.toLowerCase()));
    
    return matchTipo && matchCategoria && matchStatus && matchPesquisa;
  });

  const totais = {
    aguardandoProdutos: pedidos.filter(p => p.status === 'Aguardando Entrada' && p.categoria === 'Produto').length,
    aguardandoServicos: pedidos.filter(p => p.status === 'Aguardando Entrada' && p.categoria === 'Servico').length,
    nfRecebidasHoje: pedidos.filter(p => {
      const hoje = new Date().toISOString().split('T')[0];
      return p.dataEmissao === hoje && p.status === 'NF Recebida';
    }).length,
    valorPendente: pedidos
      .filter(p => p.status !== 'Entrada Confirmada' && p.status !== 'Cancelado')
      .reduce((acc, p) => acc + p.valorTotal, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aguardando Entrada':
        return 'bg-yellow-100 text-yellow-800';
      case 'NF Recebida':
        return 'bg-blue-100 text-blue-800';
      case 'Entrada Confirmada':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVerDetalhes = (pedidoId: string) => {
    const pedido = pedidos.find(p => p.id === pedidoId);
    if (pedido) {
      setPedidoSelecionado(pedido);
      setModalDetalhesOpen(true);
    }
  };

  const handleConfirmarEntrada = (pedidoId: string) => {
    setPedidos(prev =>
      prev.map(p =>
        p.id === pedidoId ? { ...p, status: 'Entrada Confirmada' as const } : p
      )
    );
  };

  const handleUploadXML = (xmlData: any) => {
    // Criar nova entrada de importação a partir dos dados do XML
    const novaEntrada: PedidoEntradaMercadoria = {
      id: `IMP-${Date.now()}`,
      numeroPedido: xmlData.numeroNF,
      fornecedor: xmlData.fornecedor,
      cnpjFornecedor: xmlData.cnpjFornecedor || '00.000.000/0000-00',
      tipo: 'Compra Nacional',
      categoria: 'Produto',
      dataEmissao: xmlData.dataEmissao,
      dataEntrada: new Date().toISOString().split('T')[0],
      valorTotal: xmlData.valorTotal,
      valorImpostos: xmlData.valorImpostos || 0,
      status: 'NF Recebida',
      numeroNF: xmlData.numeroNF,
      chaveAcesso: xmlData.chaveAcesso,
      itens: xmlData.itens?.map((item: any, index: number) => ({
        id: `item-${index}`,
        codigo: item.codigo || '',
        descricao: item.descricao || '',
        quantidade: item.quantidade || 0,
        valorUnitario: item.valorUnitario || 0,
        valorTotal: (item.quantidade || 0) * (item.valorUnitario || 0),
        ncm: item.ncm || '',
        cfop: '5102'
      })) || []
    };

    setPedidos(prev => [novaEntrada, ...prev]);
    
    toast({
      title: "Importação realizada com sucesso",
      description: `Entrada ${xmlData.numeroNF} adicionada à lista`,
    });
  };

  const handleCancelar = (pedidoId: string) => {
    setPedidos(prev =>
      prev.map(p =>
        p.id === pedidoId ? { ...p, status: 'Cancelado' as const } : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <PackageCheck className="h-8 w-8" />
          Entrada
        </h2>
        <p className="text-muted-foreground mt-1">
          Gestão de compras para revenda (nacional e internacional) com controle de DI e desembaraço
        </p>
      </div>

      {/* Indicadores Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Aguardando (Produtos)</p>
              <p className="text-2xl font-bold">{totais.aguardandoProdutos}</p>
            </div>
            <Package className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Aguardando (Serviços)</p>
              <p className="text-2xl font-bold">{totais.aguardandoServicos}</p>
            </div>
            <Wrench className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">NFs Recebidas Hoje</p>
              <p className="text-2xl font-bold">{totais.nfRecebidasHoje}</p>
            </div>
            <FileText className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Valor Pendente</p>
              <p className="text-2xl font-bold">{formatCurrency(totais.valorPendente)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Painel de Notificações */}
      <PainelNotificacoesEntrada onVerDetalhes={handleVerDetalhes} />

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por pedido, fornecedor, NF..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Entrada" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="Importacao">Importação</SelectItem>
                <SelectItem value="Compra Revenda">Compra Revenda</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas Categorias</SelectItem>
                <SelectItem value="Produto">Produto</SelectItem>
                <SelectItem value="Servico">Serviço</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="Aguardando Entrada">Aguardando Entrada</SelectItem>
                <SelectItem value="NF Recebida">NF Recebida</SelectItem>
                <SelectItem value="Entrada Confirmada">Entrada Confirmada</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={() => setModalXMLOpen(true)}
            className="bg-biodina-blue hover:bg-biodina-blue/90"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar XML
          </Button>
        </div>
      </Card>

      {/* Tabela de Pedidos */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº Pedido</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Nº NF</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Data Entrada</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidosFiltrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  Nenhum pedido de entrada encontrado
                </TableCell>
              </TableRow>
            ) : (
              pedidosFiltrados.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell className="font-medium">{pedido.numeroPedido}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{pedido.tipo}</Badge>
                  </TableCell>
                  <TableCell>{pedido.fornecedor}</TableCell>
                  <TableCell>{pedido.numeroNF || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{pedido.categoria}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(pedido.dataEntrada)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(pedido.valorTotal)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(pedido.status)}>
                      {pedido.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerDetalhes(pedido.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {pedido.status === 'NF Recebida' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleConfirmarEntrada(pedido.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {pedido.status !== 'Cancelado' && pedido.status !== 'Entrada Confirmada' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCancelar(pedido.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Modal de Detalhes */}
      <DetalhesEntradaModal
        isOpen={modalDetalhesOpen}
        onOpenChange={setModalDetalhesOpen}
        pedido={pedidoSelecionado}
        onConfirmarEntrada={handleConfirmarEntrada}
        onCancelar={handleCancelar}
      />
      
      {/* Modal de Upload XML */}
      <UploadXMLModal
        isOpen={modalXMLOpen}
        onClose={() => setModalXMLOpen(false)}
        onUpload={handleUploadXML}
      />
    </div>
  );
};

export default EntradaFaturamento;
