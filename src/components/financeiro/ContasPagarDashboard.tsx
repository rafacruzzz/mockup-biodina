// Dashboard principal do módulo Contas a Pagar

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, Plus, Search, Edit, Calendar as CalendarIcon, 
  Filter, FileText, CheckCircle, Clock, AlertTriangle,
  TrendingUp, TrendingDown, DollarSign, Users
} from 'lucide-react';

import { 
  Requisicao, 
  StatusRequisicao, 
  TipoRequisicao,
  VinculacaoRequisicao,
  ResumoFinanceiro,
  FiltrosRequisicao,
  STATUS_COLORS
} from '@/types/financeiro';

import { 
  mockRequisicoes, 
  mockContasRecorrentes,
  mockCalendarioItens,
  calcularUrgencia
} from '@/data/contasPagarData';

import NovaRequisicaoModal from './NovaRequisicaoModal';
import CalendarioVencimentos from './CalendarioVencimentos';
import AprovacaoModal from './AprovacaoModal';
import PagamentosRecorrentesModal from './PagamentosRecorrentesModal';

const ContasPagarDashboard = () => {
  const [activeTab, setActiveTab] = useState('requisicoes');
  const [filtros, setFiltros] = useState<FiltrosRequisicao>({});
  const [pesquisa, setPesquisa] = useState('');
  const [novaRequisicaoOpen, setNovaRequisicaoOpen] = useState(false);
  const [recorrentesOpen, setRecorrentesOpen] = useState(false);
  const [aprovacaoOpen, setAprovacaoOpen] = useState(false);
  const [requisicaoSelecionada, setRequisicaoSelecionada] = useState<Requisicao | null>(null);

  // Filtrar requisições baseado nos filtros e pesquisa
  const requisicoesFiltradasMemo = useMemo(() => {
    let resultado = [...mockRequisicoes];

    // Aplicar pesquisa
    if (pesquisa) {
      resultado = resultado.filter(req => 
        req.numeroRequisicao.toLowerCase().includes(pesquisa.toLowerCase()) ||
        req.descricao.toLowerCase().includes(pesquisa.toLowerCase()) ||
        req.solicitante.nome.toLowerCase().includes(pesquisa.toLowerCase())
      );
    }

    // Aplicar filtros de status
    if (filtros.status && filtros.status.length > 0) {
      resultado = resultado.filter(req => filtros.status!.includes(req.status));
    }

    // Aplicar filtros de tipo
    if (filtros.tipo && filtros.tipo.length > 0) {
      resultado = resultado.filter(req => filtros.tipo!.includes(req.tipo));
    }

    return resultado;
  }, [mockRequisicoes, pesquisa, filtros]);

  // Calcular resumo financeiro
  const resumoFinanceiro: ResumoFinanceiro = useMemo(() => {
    const pendentes = requisicoesFiltradasMemo.filter(req => 
      [StatusRequisicao.AGUARDANDO_APROVACAO_SETOR, StatusRequisicao.AGUARDANDO_APROVACAO_FINANCEIRO, StatusRequisicao.APROVADA]
        .includes(req.status)
    );
    
    const vencidas = requisicoesFiltradasMemo.filter(req => {
      const hoje = new Date();
      return req.dataVencimento < hoje && 
        [StatusRequisicao.AGUARDANDO_APROVACAO_SETOR, StatusRequisicao.AGUARDANDO_APROVACAO_FINANCEIRO, StatusRequisicao.APROVADA]
          .includes(req.status);
    });

    const totalPendente = pendentes.reduce((sum, req) => sum + req.valor, 0);
    const totalVencido = vencidas.reduce((sum, req) => sum + req.valor, 0);
    const totalMes = requisicoesFiltradasMemo.reduce((sum, req) => sum + req.valor, 0);

    return {
      totalPendente,
      totalVencido,
      totalMes,
      quantidadePendente: pendentes.length,
      quantidadeVencida: vencidas.length,
      mediaValor: requisicoesFiltradasMemo.length > 0 ? totalMes / requisicoesFiltradasMemo.length : 0
    };
  }, [requisicoesFiltradasMemo]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status: StatusRequisicao) => {
    const colorClass = STATUS_COLORS[status];
    
    const statusLabels = {
      [StatusRequisicao.RASCUNHO]: 'Rascunho',
      [StatusRequisicao.AGUARDANDO_APROVACAO_SETOR]: 'Aguard. Setor',
      [StatusRequisicao.AGUARDANDO_APROVACAO_FINANCEIRO]: 'Aguard. Financeiro',
      [StatusRequisicao.APROVADA]: 'Aprovada',
      [StatusRequisicao.REJEITADA]: 'Rejeitada',
      [StatusRequisicao.PAGAMENTO_PROGRAMADO]: 'Programada',
      [StatusRequisicao.PAGA]: 'Paga',
      [StatusRequisicao.CANCELADA]: 'Cancelada'
    };

    const statusIcons = {
      [StatusRequisicao.RASCUNHO]: <Edit className="h-3 w-3" />,
      [StatusRequisicao.AGUARDANDO_APROVACAO_SETOR]: <Clock className="h-3 w-3" />,
      [StatusRequisicao.AGUARDANDO_APROVACAO_FINANCEIRO]: <Clock className="h-3 w-3" />,
      [StatusRequisicao.APROVADA]: <CheckCircle className="h-3 w-3" />,
      [StatusRequisicao.REJEITADA]: <AlertTriangle className="h-3 w-3" />,
      [StatusRequisicao.PAGAMENTO_PROGRAMADO]: <CalendarIcon className="h-3 w-3" />,
      [StatusRequisicao.PAGA]: <CheckCircle className="h-3 w-3" />,
      [StatusRequisicao.CANCELADA]: <AlertTriangle className="h-3 w-3" />
    };

    return (
      <Badge className={`${colorClass} text-white flex items-center gap-1 w-fit text-xs`}>
        {statusIcons[status]}
        {statusLabels[status]}
      </Badge>
    );
  };

  const handleAprovar = (requisicao: Requisicao) => {
    setRequisicaoSelecionada(requisicao);
    setAprovacaoOpen(true);
  };

  const renderResumoCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Pendente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {formatCurrency(resumoFinanceiro.totalPendente)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {resumoFinanceiro.quantidadePendente} requisições
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Vencido</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(resumoFinanceiro.totalVencido)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {resumoFinanceiro.quantidadeVencida} requisições
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total do Mês</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(resumoFinanceiro.totalMes)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {requisicoesFiltradasMemo.length} requisições
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Valor Médio</p>
              <p className="text-2xl font-bold text-biodina-blue">
                {formatCurrency(resumoFinanceiro.mediaValor)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Por requisição
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-biodina-blue" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabelaRequisicoes = () => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Requisições de Pagamento
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setRecorrentesOpen(true)}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Recorrentes
            </Button>
            <Button 
              onClick={() => setNovaRequisicaoOpen(true)}
              className="bg-biodina-gold hover:bg-biodina-gold/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Requisição
            </Button>
          </div>
        </div>
        
        {/* Filtros */}
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar por número, descrição ou solicitante..." 
              className="pl-10"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>
          
          <Select 
            value={filtros.status?.[0] || 'todos'} 
            onValueChange={(value) => 
              setFiltros(prev => ({
                ...prev, 
                status: value === 'todos' ? undefined : [value as StatusRequisicao]
              }))
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              {Object.values(StatusRequisicao).map(status => (
                <SelectItem key={status} value={status}>
                  {status.replace('_', ' ').toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filtros.tipo?.[0] || 'todos'} 
            onValueChange={(value) => 
              setFiltros(prev => ({
                ...prev, 
                tipo: value === 'todos' ? undefined : [value as TipoRequisicao]
              }))
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Tipos</SelectItem>
              {Object.values(TipoRequisicao).map(tipo => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo.replace('_', ' ').toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº Requisição</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vinculação</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requisicoesFiltradasMemo.map((requisicao) => (
              <TableRow key={requisicao.id}>
                <TableCell className="font-medium">
                  {requisicao.numeroRequisicao}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{requisicao.solicitante.nome}</div>
                    <div className="text-sm text-muted-foreground">{requisicao.setor}</div>
                  </div>
                </TableCell>
                <TableCell className="capitalize">
                  {requisicao.tipo.replace('_', ' ')}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {requisicao.descricao}
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(requisicao.valor)}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {requisicao.dataVencimento.toLocaleDateString('pt-BR')}
                  </div>
                  {calcularUrgencia(requisicao.dataVencimento) !== 'normal' && (
                    <Badge variant="destructive" className="text-xs mt-1">
                      {calcularUrgencia(requisicao.dataVencimento) === 'vencido' ? 'Vencido' : 
                       calcularUrgencia(requisicao.dataVencimento) === 'proximo' ? 'Próximo' : 'Crítico'}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {getStatusBadge(requisicao.status)}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {requisicao.vinculacao === VinculacaoRequisicao.PROJETO_CLIENTE && requisicao.projeto
                      ? requisicao.projeto.nome
                      : requisicao.departamento}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {requisicao.vinculacao === VinculacaoRequisicao.PROJETO_CLIENTE 
                      ? 'Projeto' : 'Centro de Custo'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4" />
                    </Button>
                    {[StatusRequisicao.AGUARDANDO_APROVACAO_SETOR, StatusRequisicao.AGUARDANDO_APROVACAO_FINANCEIRO].includes(requisicao.status) && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAprovar(requisicao)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Contas a Pagar</h1>
          <p className="text-muted-foreground">
            Gerencie todas as requisições de pagamento e contas da empresa
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Relatórios
          </Button>
        </div>
      </div>

      {/* Resumo Financeiro */}
      {renderResumoCards()}

      {/* Tabs de Navegação */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requisicoes">Requisições</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="recorrentes">Recorrentes</TabsTrigger>
        </TabsList>

        <TabsContent value="requisicoes" className="space-y-6">
          {renderTabelaRequisicoes()}
        </TabsContent>

        <TabsContent value="calendario" className="space-y-6">
          <CalendarioVencimentos />
        </TabsContent>

        <TabsContent value="recorrentes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contas Recorrentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Clique em "Recorrentes" no header para gerenciar contas fixas</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modais */}
      <NovaRequisicaoModal
        isOpen={novaRequisicaoOpen}
        onClose={() => setNovaRequisicaoOpen(false)}
      />
      
      <PagamentosRecorrentesModal
        isOpen={recorrentesOpen}
        onClose={() => setRecorrentesOpen(false)}
      />
      
      {requisicaoSelecionada && (
        <AprovacaoModal
          isOpen={aprovacaoOpen}
          onClose={() => setAprovacaoOpen(false)}
          requisicao={requisicaoSelecionada}
        />
      )}
    </div>
  );
};

export default ContasPagarDashboard;