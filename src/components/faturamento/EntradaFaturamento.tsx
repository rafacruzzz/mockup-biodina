import React, { useState, useMemo } from "react";
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
  Search,
  Eye,
  FileText,
  TrendingUp,
  Upload,
  FilePlus,
  FileEdit,
  PackageX,
  XCircle,
  Building2
} from "lucide-react";
import { mockPedidosEntrada } from "@/data/faturamentoModules";
import { PedidoEntradaMercadoria } from "@/types/faturamento";
import DetalhesEntradaModal from "./DetalhesEntradaModal";
import UploadXMLModal from "./UploadXMLModal";
import NFComplementarModal from "./modals/NFComplementarModal";
import CartaCorrecaoModal from "./modals/CartaCorrecaoModal";
import DevolucaoModal from "./modals/DevolucaoModal";
import CancelamentoModal from "./modals/CancelamentoModal";
import { useToast } from "@/hooks/use-toast";
import { useEmpresa } from "@/contexts/EmpresaContext";

const EntradaFaturamento = () => {
  const { empresaAtual, filialAtual } = useEmpresa();
  const empresaAtivaId = filialAtual?.id || empresaAtual?.id || '';
  const nomeEmpresaAtiva = filialAtual?.nome || empresaAtual?.razaoSocial || 'Empresa';
  
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [pesquisa, setPesquisa] = useState('');
  const [pedidoSelecionado, setPedidoSelecionado] = useState<PedidoEntradaMercadoria | null>(null);
  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
  const [modalXMLOpen, setModalXMLOpen] = useState(false);
  const [modalNFComplementarOpen, setModalNFComplementarOpen] = useState(false);
  const [modalCartaCorrecaoOpen, setModalCartaCorrecaoOpen] = useState(false);
  const [modalDevolucaoOpen, setModalDevolucaoOpen] = useState(false);
  const [modalCancelamentoOpen, setModalCancelamentoOpen] = useState(false);
  
  // Filtrar pedidos por empresa ativa
  const pedidosEmpresa = useMemo(() => 
    mockPedidosEntrada.filter(p => p.empresaId === empresaAtivaId),
    [empresaAtivaId]
  );
  
  const [pedidosAdicionais, setPedidosAdicionais] = useState<PedidoEntradaMercadoria[]>([]);
  const pedidos = useMemo(() => [...pedidosEmpresa, ...pedidosAdicionais.filter(p => p.empresaId === empresaAtivaId)], [pedidosEmpresa, pedidosAdicionais, empresaAtivaId]);
  
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
    aguardandoProdutos: pedidos.filter(p => 
      ['Pedido realizado', 'Mercadoria enviada – Aéreo', 'Mercadoria enviada – marítimo', 'Aguardando desembaraço - canal amarelo', 'Aguardando desembaraço - canal vermelho', 'Aguardando desembaraço - canal verde', 'Aguardando faturamento'].includes(p.status) && p.categoria === 'Produto'
    ).length,
    nfRecebidasHoje: pedidos.filter(p => {
      const hoje = new Date().toISOString().split('T')[0];
      return p.dataEmissao === hoje && p.status === 'Faturado';
    }).length,
    valorPendente: pedidos
      .filter(p => p.status !== 'Entrada no estoque' && p.status !== 'Cancelado')
      .reduce((acc, p) => acc + p.valorTotal, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pedido realizado':
        return 'bg-gray-100 text-gray-800';
      case 'Mercadoria enviada – Aéreo':
      case 'Mercadoria enviada – marítimo':
        return 'bg-blue-100 text-blue-800';
      case 'Aguardando desembaraço - canal amarelo':
        return 'bg-yellow-100 text-yellow-800';
      case 'Aguardando desembaraço - canal vermelho':
        return 'bg-red-100 text-red-800';
      case 'Aguardando desembaraço - canal verde':
        return 'bg-emerald-100 text-emerald-800';
      case 'Aguardando faturamento':
        return 'bg-orange-100 text-orange-800';
      case 'Faturado':
        return 'bg-indigo-100 text-indigo-800';
      case 'Desembaraçado - pronto para retirar':
        return 'bg-teal-100 text-teal-800';
      case 'Carga retirada – em trânsito':
        return 'bg-purple-100 text-purple-800';
      case 'Chegada no estoque – pronto para conferência':
        return 'bg-cyan-100 text-cyan-800';
      case 'Conferido – realizar ajuste':
        return 'bg-amber-100 text-amber-800';
      case 'Conferido – conforme':
        return 'bg-lime-100 text-lime-800';
      case 'Entrada no estoque':
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

  const handleNFComplementar = (pedido: PedidoEntradaMercadoria) => {
    setPedidoSelecionado(pedido);
    setModalNFComplementarOpen(true);
  };

  const handleCartaCorrecao = (pedido: PedidoEntradaMercadoria) => {
    setPedidoSelecionado(pedido);
    setModalCartaCorrecaoOpen(true);
  };

  const handleDevolucao = (pedido: PedidoEntradaMercadoria) => {
    setPedidoSelecionado(pedido);
    setModalDevolucaoOpen(true);
  };

  const handleCancelamento = (pedido: PedidoEntradaMercadoria) => {
    setPedidoSelecionado(pedido);
    setModalCancelamentoOpen(true);
  };

  const handleUploadXML = (xmlData: any) => {
    const empresaAtivaId = filialAtual?.id || empresaAtual?.id || 'biodina-001';
    
    const novaEntrada: PedidoEntradaMercadoria = {
      id: `IMP-${Date.now()}`,
      empresaId: empresaAtivaId,
      numeroPedido: xmlData.numeroNF,
      fornecedor: xmlData.fornecedor,
      cnpjFornecedor: xmlData.cnpjFornecedor || '00.000.000/0000-00',
      tipo: 'Compra Nacional',
      categoria: 'Produto',
      dataEmissao: xmlData.dataEmissao,
      dataEntrada: new Date().toISOString().split('T')[0],
      valorTotal: xmlData.valorTotal,
      valorImpostos: xmlData.valorImpostos || 0,
      status: 'Pedido realizado',
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

    setPedidosAdicionais(prev => [novaEntrada, ...prev]);
    
    toast({
      title: "Importação realizada com sucesso",
      description: `Entrada ${xmlData.numeroNF} adicionada à lista`,
    });
  };

  const canEditStatus = (status: string) => {
    return status === 'Faturado' || status === 'Entrada no estoque';
  };

  const canCancel = (status: string) => {
    return status !== 'Cancelado' && status !== 'Entrada no estoque';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <PackageCheck className="h-8 w-8" />
            Entrada
          </h2>
          <Badge variant="outline" className="ml-2 flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {nomeEmpresaAtiva}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1">
          Gestão de compras para revenda (nacional e internacional) com controle de DI e desembaraço
        </p>
      </div>

      {/* Indicadores Rápidos - 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <SelectItem value="Pedido realizado">Pedido realizado</SelectItem>
                <SelectItem value="Mercadoria enviada – Aéreo">Mercadoria enviada – Aéreo</SelectItem>
                <SelectItem value="Mercadoria enviada – marítimo">Mercadoria enviada – marítimo</SelectItem>
                <SelectItem value="Aguardando desembaraço - canal amarelo">Aguardando desembaraço - canal amarelo</SelectItem>
                <SelectItem value="Aguardando desembaraço - canal vermelho">Aguardando desembaraço - canal vermelho</SelectItem>
                <SelectItem value="Aguardando desembaraço - canal verde">Aguardando desembaraço - canal verde</SelectItem>
                <SelectItem value="Aguardando faturamento">Aguardando faturamento</SelectItem>
                <SelectItem value="Faturado">Faturado</SelectItem>
                <SelectItem value="Desembaraçado - pronto para retirar">Desembaraçado - pronto para retirar</SelectItem>
                <SelectItem value="Carga retirada – em trânsito">Carga retirada – em trânsito</SelectItem>
                <SelectItem value="Chegada no estoque – pronto para conferência">Chegada no estoque – pronto para conferência</SelectItem>
                <SelectItem value="Conferido – realizar ajuste">Conferido – realizar ajuste</SelectItem>
                <SelectItem value="Conferido – conforme">Conferido – conforme</SelectItem>
                <SelectItem value="Entrada no estoque">Entrada no estoque</SelectItem>
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
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerDetalhes(pedido.id)}
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {canEditStatus(pedido.status) && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleNFComplementar(pedido)}
                            title="NF Complementar"
                            className="border-blue-600 text-blue-700 hover:bg-blue-50"
                          >
                            <FilePlus className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCartaCorrecao(pedido)}
                            title="Carta de Correção"
                            className="border-purple-600 text-purple-700 hover:bg-purple-50"
                          >
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDevolucao(pedido)}
                            title="Devolução"
                            className="border-orange-600 text-orange-700 hover:bg-orange-50"
                          >
                            <PackageX className="h-4 w-4" />
                          </Button>
                        </>
                      )}

                      {canCancel(pedido.status) && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCancelamento(pedido)}
                          title="Cancelamento"
                          className="border-red-600 text-red-700 hover:bg-red-50"
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
        onConfirmarEntrada={() => {}}
        onCancelar={() => {}}
      />
      
      {/* Modal de Upload XML */}
      <UploadXMLModal
        isOpen={modalXMLOpen}
        onClose={() => setModalXMLOpen(false)}
        onUpload={handleUploadXML}
      />

      {/* Modais de Ação */}
      {pedidoSelecionado && (
        <>
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

export default EntradaFaturamento;
