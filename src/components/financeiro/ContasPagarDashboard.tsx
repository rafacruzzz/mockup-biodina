import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Filter, Clock, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { NovaRequisicaoModal } from './NovaRequisicaoModal';
import { AprovacaoModal } from './AprovacaoModal';
import { PagamentosRecorrentesModal } from './PagamentosRecorrentesModal';
import { RequisicaoPagamento, StatusRequisicao, TipoRequisicao } from '@/types/financeiro';
import { contasPagarMockData } from '@/data/contasPagarData';

export const ContasPagarDashboard: React.FC = () => {
  const [requisicoes, setRequisicoes] = useState<RequisicaoPagamento[]>(contasPagarMockData);
  const [filtroStatus, setFiltroStatus] = useState<string>('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [busca, setBusca] = useState('');
  const [showNovaRequisicao, setShowNovaRequisicao] = useState(false);
  const [showAprovacao, setShowAprovacao] = useState(false);
  const [showRecorrentes, setShowRecorrentes] = useState(false);
  const [requisicaoSelecionada, setRequisicaoSelecionada] = useState<RequisicaoPagamento | null>(null);

  const getStatusColor = (status: StatusRequisicao) => {
    switch (status) {
      case StatusRequisicao.RASCUNHO: return 'secondary';
      case StatusRequisicao.AGUARDANDO_GESTOR: return 'outline';
      case StatusRequisicao.AGUARDANDO_FINANCEIRO: return 'outline';
      case StatusRequisicao.APROVADA: return 'default';
      case StatusRequisicao.PAGA: return 'default';
      case StatusRequisicao.CONCILIADA: return 'default';
      case StatusRequisicao.REJEITADA: return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: StatusRequisicao) => {
    switch (status) {
      case StatusRequisicao.AGUARDANDO_GESTOR:
      case StatusRequisicao.AGUARDANDO_FINANCEIRO:
        return <Clock className="h-3 w-3" />;
      case StatusRequisicao.PAGA:
      case StatusRequisicao.CONCILIADA:
        return <CheckCircle className="h-3 w-3" />;
      case StatusRequisicao.REJEITADA:
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const requisicoesFiltradas = requisicoes.filter(req => {
    const matchStatus = !filtroStatus || req.status === filtroStatus;
    const matchTipo = !filtroTipo || req.tipo === filtroTipo;
    const matchBusca = !busca || 
      req.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      req.solicitante.toLowerCase().includes(busca.toLowerCase());
    
    return matchStatus && matchTipo && matchBusca;
  });

  const stats = {
    totalPendente: requisicoes.filter(r => 
      [StatusRequisicao.AGUARDANDO_GESTOR, StatusRequisicao.AGUARDANDO_FINANCEIRO, StatusRequisicao.APROVADA]
      .includes(r.status)
    ).reduce((sum, r) => sum + r.valor, 0),
    
    totalVencidas: requisicoes.filter(r => 
      r.vencimento < new Date() && 
      ![StatusRequisicao.PAGA, StatusRequisicao.CONCILIADA].includes(r.status)
    ).length,
    
    documentacaoIncompleta: requisicoes.filter(r => 
      r.documentos.some(d => d.obrigatorio && !d.arquivo)
    ).length,
    
    aguardandoAprovacao: requisicoes.filter(r => 
      [StatusRequisicao.AGUARDANDO_GESTOR, StatusRequisicao.AGUARDANDO_FINANCEIRO].includes(r.status)
    ).length
  };

  const handleNovaRequisicao = (novaRequisicao: RequisicaoPagamento) => {
    setRequisicoes(prev => [...prev, novaRequisicao]);
    setShowNovaRequisicao(false);
  };

  const handleAprovacao = (requisicaoId: string, aprovada: boolean, comentarios?: string) => {
    setRequisicoes(prev => prev.map(req => {
      if (req.id === requisicaoId) {
        if (req.status === StatusRequisicao.AGUARDANDO_GESTOR) {
          return {
            ...req,
            status: aprovada ? StatusRequisicao.AGUARDANDO_FINANCEIRO : StatusRequisicao.REJEITADA,
            dataAprovacaoGestor: aprovada ? new Date() : undefined,
            motivoRejeicao: aprovada ? undefined : comentarios,
            comentarios: comentarios
          };
        } else if (req.status === StatusRequisicao.AGUARDANDO_FINANCEIRO) {
          return {
            ...req,
            status: aprovada ? StatusRequisicao.APROVADA : StatusRequisicao.REJEITADA,
            dataAprovacaoFinanceiro: aprovada ? new Date() : undefined,
            motivoRejeicao: aprovada ? undefined : comentarios,
            comentarios: comentarios
          };
        }
      }
      return req;
    }));
    setShowAprovacao(false);
    setRequisicaoSelecionada(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header e Estatísticas */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Contas a Pagar</h2>
          <div className="flex gap-2">
            <Button onClick={() => setShowRecorrentes(true)} variant="outline">
              Pagamentos Recorrentes
            </Button>
            <Button onClick={() => setShowNovaRequisicao(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Requisição
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalPendente)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.totalVencidas}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Aguardando Aprovação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.aguardandoAprovacao}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Doc. Incompleta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.documentacaoIncompleta}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição ou solicitante..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os Status</SelectItem>
                <SelectItem value={StatusRequisicao.AGUARDANDO_GESTOR}>Aguardando Gestor</SelectItem>
                <SelectItem value={StatusRequisicao.AGUARDANDO_FINANCEIRO}>Aguardando Financeiro</SelectItem>
                <SelectItem value={StatusRequisicao.APROVADA}>Aprovada</SelectItem>
                <SelectItem value={StatusRequisicao.PAGA}>Paga</SelectItem>
                <SelectItem value={StatusRequisicao.CONCILIADA}>Conciliada</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os Tipos</SelectItem>
                <SelectItem value={TipoRequisicao.SUPRIMENTOS}>Suprimentos</SelectItem>
                <SelectItem value={TipoRequisicao.PASSAGENS}>Passagens</SelectItem>
                <SelectItem value={TipoRequisicao.HOSPEDAGEM}>Hospedagem</SelectItem>
                <SelectItem value={TipoRequisicao.RECORRENTE}>Recorrente</SelectItem>
                <SelectItem value={TipoRequisicao.OUTROS}>Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Requisições */}
      <Card>
        <CardHeader>
          <CardTitle>Requisições de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requisicoesFiltradas.map((requisicao) => (
                <TableRow key={requisicao.id}>
                  <TableCell className="font-mono text-sm">
                    #{requisicao.id.slice(-6)}
                  </TableCell>
                  <TableCell>{requisicao.solicitante}</TableCell>
                  <TableCell>{requisicao.descricao}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {requisicao.tipo.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(requisicao.valor)}</TableCell>
                  <TableCell>
                    <span className={requisicao.vencimento < new Date() ? 'text-red-600' : ''}>
                      {requisicao.vencimento.toLocaleDateString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(requisicao.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(requisicao.status)}
                      {requisicao.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {[StatusRequisicao.AGUARDANDO_GESTOR, StatusRequisicao.AGUARDANDO_FINANCEIRO].includes(requisicao.status) && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setRequisicaoSelecionada(requisicao);
                          setShowAprovacao(true);
                        }}
                      >
                        Aprovar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modais */}
      <NovaRequisicaoModal
        open={showNovaRequisicao}
        onClose={() => setShowNovaRequisicao(false)}
        onSave={handleNovaRequisicao}
      />

      <AprovacaoModal
        open={showAprovacao}
        onClose={() => {
          setShowAprovacao(false);
          setRequisicaoSelecionada(null);
        }}
        requisicao={requisicaoSelecionada}
        onApprove={handleAprovacao}
      />

      <PagamentosRecorrentesModal
        open={showRecorrentes}
        onClose={() => setShowRecorrentes(false)}
      />
    </div>
  );
};