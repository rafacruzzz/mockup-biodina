import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShoppingCart, Package, Truck, CheckCircle, Eye, ClipboardList } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { meusPedidosMock, MeuPedido } from '@/data/meusPedidosMock';
import { StatusPedido } from '@/types/comercial';
import { formatCurrency } from '@/lib/utils';

const getStatusLabel = (status: StatusPedido): string => {
  const labels: Record<StatusPedido, string> = {
    'rascunho': 'Rascunho',
    'enviado': 'Enviado',
    'recebido_estoque': 'Recebido no Estoque',
    'em_separacao': 'Em Separação',
    'pronto_faturamento': 'Pronto p/ Faturamento',
    'faturado': 'Faturado',
    'em_transito': 'Em Trânsito',
    'entregue': 'Entregue',
    'cancelado': 'Cancelado',
    'devolvido': 'Devolvido',
  };
  return labels[status] || status;
};

const getStatusBadgeClass = (status: StatusPedido): string => {
  switch (status) {
    case 'rascunho': return 'bg-gray-100 text-gray-800 border-gray-300';
    case 'enviado': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'recebido_estoque': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    case 'em_separacao': return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'pronto_faturamento': return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'faturado': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'em_transito': return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'entregue': return 'bg-green-100 text-green-800 border-green-300';
    case 'cancelado': return 'bg-red-100 text-red-800 border-red-300';
    case 'devolvido': return 'bg-rose-100 text-rose-800 border-rose-300';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const MeusPedidosView = () => {
  const { user } = useUser();
  const [filtroContratacao, setFiltroContratacao] = useState('todas');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  // Filtra pedidos pelo usuário logado (mock: "Rafael Oliveira" como fallback)
  const nomeUsuario = user?.name || 'Rafael Oliveira';

  const pedidosUsuario = useMemo(() => {
    return meusPedidosMock.filter(p => p.criadoPor === nomeUsuario);
  }, [nomeUsuario]);

  const pedidosFiltrados = useMemo(() => {
    return pedidosUsuario.filter(p => {
      if (filtroContratacao !== 'todas' && p.contratacaoCodigo !== filtroContratacao) return false;
      if (filtroStatus !== 'todos' && p.statusAtual !== filtroStatus) return false;
      if (dataInicio && p.dataCriacao < dataInicio) return false;
      if (dataFim && p.dataCriacao > dataFim) return false;
      return true;
    });
  }, [pedidosUsuario, filtroContratacao, filtroStatus, dataInicio, dataFim]);

  // Contratações únicas para o filtro
  const contratacoes = useMemo(() => {
    const map = new Map<string, string>();
    pedidosUsuario.forEach(p => map.set(p.contratacaoCodigo, p.contratacaoNome));
    return Array.from(map, ([codigo, nome]) => ({ codigo, nome }));
  }, [pedidosUsuario]);

  // Contadores para cards
  const total = pedidosFiltrados.length;
  const emAndamento = pedidosFiltrados.filter(p => ['enviado', 'recebido_estoque', 'em_separacao', 'pronto_faturamento'].includes(p.statusAtual)).length;
  const faturados = pedidosFiltrados.filter(p => ['faturado', 'em_transito'].includes(p.statusAtual)).length;
  const entregues = pedidosFiltrados.filter(p => p.statusAtual === 'entregue').length;

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{emAndamento}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Faturados / Em Trânsito</CardTitle>
            <Truck className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{faturados}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Entregues</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{entregues}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Contratação</Label>
              <Select value={filtroContratacao} onValueChange={setFiltroContratacao}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Contratações</SelectItem>
                  {contratacoes.map(c => (
                    <SelectItem key={c.codigo} value={c.codigo}>{c.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                  <SelectItem value="enviado">Enviado</SelectItem>
                  <SelectItem value="recebido_estoque">Recebido no Estoque</SelectItem>
                  <SelectItem value="em_separacao">Em Separação</SelectItem>
                  <SelectItem value="pronto_faturamento">Pronto p/ Faturamento</SelectItem>
                  <SelectItem value="faturado">Faturado</SelectItem>
                  <SelectItem value="em_transito">Em Trânsito</SelectItem>
                  <SelectItem value="entregue">Entregue</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="devolvido">Devolvido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Data Início</Label>
              <Input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
            </div>
            <div>
              <Label>Data Fim</Label>
              <Input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de pedidos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Meus Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          {pedidosFiltrados.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>Nenhum pedido encontrado com os filtros selecionados.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº Pedido</TableHead>
                  <TableHead>Contratação</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidosFiltrados.map(pedido => (
                  <TableRow key={pedido.id}>
                    <TableCell className="font-medium">{pedido.numeroPedido}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{pedido.contratacaoNome}</span>
                        <span className="text-xs text-muted-foreground">{pedido.contratacaoCodigo}</span>
                      </div>
                    </TableCell>
                    <TableCell>{pedido.cliente}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">{pedido.produtos}</TableCell>
                    <TableCell className="text-sm">{new Date(pedido.dataCriacao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(pedido.valorTotal)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeClass(pedido.statusAtual)}>
                        {getStatusLabel(pedido.statusAtual)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MeusPedidosView;
