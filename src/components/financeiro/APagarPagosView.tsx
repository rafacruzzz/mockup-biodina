import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, Search, Calendar, FileText, Clock, DollarSign,
  AlertTriangle, CheckCircle, CreditCard, Building, Download
} from "lucide-react";
import ConciliacaoBancariaView from "./ConciliacaoBancariaView";
import CalendarioVencimentos from "./CalendarioVencimentos";
import PagamentosRecorrentesModal from "./PagamentosRecorrentesModal";
import { NovaContaPagarModal } from "./NovaContaPagarModal";
import { NovaContaRecorrenteModal } from "./NovaContaRecorrenteModal";
import { VisualizarContaModal } from "./VisualizarContaModal";
import { PagarContaModal } from "./PagarContaModal";
import { EditarContaModal } from "./EditarContaModal";
import { ContaPagar, ContaRecorrenteEnhanced, Periodicidade } from "@/types/financeiro";
import { useToast } from "@/hooks/use-toast";
import ContratosTabContent from "./ContratosTabContent";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { addMonths } from "date-fns";
import { SolicitacaoPagamento } from "@/types/solicitacaoPagamento";
import { SolicitacoesPagamentoModal } from "./SolicitacoesPagamentoModal";
import { NovaSolicitacaoModal } from "./NovaSolicitacaoModal";
import { Inbox } from "lucide-react";

const APagarPagosView = () => {
  const { toast } = useToast();
  const { empresaAtual, filialAtual } = useEmpresa();
  const empresaAtivaId = filialAtual?.id || empresaAtual?.id || 'biodina-001';
  
  const [showRecorrentesModal, setShowRecorrentesModal] = useState(false);
  const [showNovaContaModal, setShowNovaContaModal] = useState(false);
  const [showNovaRecorrenteModal, setShowNovaRecorrenteModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showPagarModal, setShowPagarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [contaSelecionada, setContaSelecionada] = useState<ContaPagar | null>(null);
  const [contasPagas, setContasPagas] = useState<string[]>([]);
  const [contasSalvas, setContasSalvas] = useState<ContaPagar[]>([]);
  const [contasRecorrentesSalvas, setContasRecorrentesSalvas] = useState<ContaRecorrenteEnhanced[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoPagamento[]>([]);
  const [showSolicitacoesModal, setShowSolicitacoesModal] = useState(false);
  const [showNovaSolicitacaoModal, setShowNovaSolicitacaoModal] = useState(false);

  const solicitacoesPendentes = solicitacoes.filter(s => s.status === 'pendente_analise');
  const temUrgentes = solicitacoesPendentes.some(s => {
    const hoje = new Date(); hoje.setHours(0,0,0,0);
    return new Date(s.dataVencimento) <= hoje;
  });

  const handleAceitarSolicitacao = (id: string) => {
    const sol = solicitacoes.find(s => s.id === id);
    if (!sol) return;
    setSolicitacoes(prev => prev.map(s => s.id === id ? { ...s, status: 'aceita' as const } : s));
    const novaConta: ContaPagar = {
      id: `CP-SOL-${Date.now()}`,
      empresaId: empresaAtivaId,
      numero: `CP-SOL-${String(contasSalvas.length + 1).padStart(3, '0')}`,
      tipo: 'pagamento' as any,
      departamentoSolicitante: sol.departamentoSolicitante,
      vincularA: 'departamento',
      departamento: sol.departamentoSolicitante,
      fornecedor: sol.fornecedor,
      descricao: sol.descricao,
      valor: sol.valor,
      dataVencimento: new Date(sol.dataVencimento),
      formaPagamentoSugerida: 'boleto' as any,
      status: 'programado' as any,
      createdAt: new Date(),
      pagamentoEfetuado: false,
      tipoPagamento: 'unico',
      anexos: sol.anexos,
    };
    setContasSalvas(prev => [...prev, novaConta]);
    toast({
      title: "Solicitação Aceita",
      description: `Pagamento de ${sol.fornecedor} incluído no calendário.`,
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const handleRejeitarSolicitacao = (id: string) => {
    setSolicitacoes(prev => prev.map(s => s.id === id ? { ...s, status: 'rejeitada' as const } : s));
    toast({
      title: "Solicitação Rejeitada",
      description: "A solicitação foi rejeitada.",
      variant: "destructive",
    });
  };

  const handleNovaSolicitacao = (sol: SolicitacaoPagamento) => {
    setSolicitacoes(prev => [...prev, sol]);
    toast({
      title: "📩 Nova Solicitação Recebida!",
      description: `${sol.departamentoSolicitante} enviou solicitação de pagamento para ${sol.fornecedor}.` + (sol.urgente ? ' ⚠️ URGENTE!' : ''),
      className: sol.urgente ? "bg-red-50 border-red-200 text-red-800" : "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  const handleUpdateContaCalendario = (contaId: string, updates: Partial<ContaPagar>) => {
    setContasSalvas(prev => prev.map(c => c.id === contaId ? { ...c, ...updates } : c));
  };

  // Helper to get months offset for a given periodicidade
  const getMesesOffset = (periodicidade: Periodicidade): number => {
    switch (periodicidade) {
      case 'mensal': return 1;
      case 'bimestral': return 2;
      case 'trimestral': return 3;
      case 'semestral': return 6;
      case 'anual': return 12;
      default: return 1;
    }
  };

  // Convert recurring accounts into ContaPagar[] for the calendar (12 occurrences)
  const contasRecorrentesParaCalendario = useMemo(() => {
    const result: ContaPagar[] = [];
    contasRecorrentesSalvas.forEach(rec => {
      const offset = getMesesOffset(rec.periodicidade);
      for (let i = 0; i < 12; i++) {
        const dataVenc = addMonths(new Date(rec.dataPrimeiroVencimento), offset * i);
        result.push({
          id: `${rec.id}-occ-${i}`,
          empresaId: rec.empresaId,
          numero: `REC-${rec.id.slice(-3)}-${i + 1}`,
          tipo: (rec.tipo || 'outros') as any,
          departamentoSolicitante: rec.departamentoSolicitante || '',
          vincularA: rec.vincularA || 'departamento',
          projetoCliente: rec.projetoCliente,
          departamento: rec.departamento,
          fornecedor: rec.fornecedor,
          descricao: rec.descricao || rec.nome,
          valor: rec.alteracaoValor ? 0 : rec.valor,
          dataVencimento: dataVenc,
          formaPagamentoSugerida: rec.formaPagamento,
          status: 'programado' as any,
          createdAt: new Date(),
          pagamentoEfetuado: false,
          tipoPagamento: 'unico',
          anexos: rec.anexos,
          bancoPagamento: rec.bancoPagamento,
          agenciaPagamento: rec.agenciaPagamento,
          contaPagamento: rec.contaPagamento,
          isRecorrente: true,
        } as ContaPagar & { isRecorrente?: boolean });
      }
    });
    return result;
  }, [contasRecorrentesSalvas]);

  const todasContasCalendario = useMemo(() => {
    return [...contasSalvas, ...contasRecorrentesParaCalendario];
  }, [contasSalvas, contasRecorrentesParaCalendario]);

  const resumoGeral = {
    totalPendente: 47500.00,
    totalVencido: 12300.00,
    totalMes: 89200.00,
    proximosVencimentos: 15
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header com ações principais */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">A Pagar x Pagos</h2>
            <Badge variant="outline" className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              {filialAtual ? filialAtual.nome : empresaAtual?.razaoSocial || 'Empresa'}
            </Badge>
          </div>
          <p className="text-muted-foreground">Gestão completa de contas a pagar e programação financeira</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowRecorrentesModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Pagamentos Recorrentes
          </Button>
          <Button onClick={() => setShowNovaContaModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Conta a Pagar
          </Button>
          <Button
            variant="outline"
            className={temUrgentes ? "border-red-400 text-red-600 animate-pulse" : ""}
            onClick={() => setShowSolicitacoesModal(true)}
          >
            <Inbox className="h-4 w-4 mr-2" />
            Solicitações
            {solicitacoesPendentes.length > 0 && (
              <Badge variant={temUrgentes ? "destructive" : "default"} className="ml-2">
                {solicitacoesPendentes.length}
              </Badge>
            )}
          </Button>
          <Button variant="outline" onClick={() => setShowNovaSolicitacaoModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Solicitação
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pendente</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(resumoGeral.totalPendente)}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Vencido</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(resumoGeral.totalVencido)}</p>
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
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(resumoGeral.totalMes)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Próximos Vencimentos</p>
                <p className="text-2xl font-bold text-purple-600">{resumoGeral.proximosVencimentos}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abas principais */}
      <Tabs defaultValue="programacao" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="programacao">Programação</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="conciliacao">Conciliação</TabsTrigger>
          <TabsTrigger value="contratos">Contratos</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="programacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contas a Pagar - Programação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Pesquisar por fornecedor, descrição ou número..." 
                    className="w-96"
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Filtrar por Data
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Forma Pgto</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">CP-001</TableCell>
                    <TableCell>Fornecedor ABC Ltda</TableCell>
                    <TableCell>Material de escritório - Janeiro</TableCell>
                    <TableCell className="text-right">R$ 2.500,00</TableCell>
                    <TableCell>25/01/2025</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        contasPagas.includes('CP-001') 
                          ? "text-green-600 border-green-600" 
                          : "text-orange-600 border-orange-600"
                      }>
                        {contasPagas.includes('CP-001') ? 'Pago' : 'Pendente'}
                      </Badge>
                    </TableCell>
                    <TableCell>PIX</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setContaSelecionada({
                              id: 'CP-001',
                              empresaId: 'biodina-001',
                              numero: 'CP-001',
                              tipo: 'compra' as any,
                              departamentoSolicitante: 'Administrativo',
                              vincularA: 'departamento',
                              departamento: 'Administrativo',
                              fornecedor: 'Fornecedor ABC Ltda',
                              descricao: 'Material de escritório - Janeiro',
                              valor: 2500,
                              dataVencimento: new Date('2025-01-25'),
                              formaPagamentoSugerida: 'pix' as any,
                              status: 'pendente' as any,
                              createdAt: new Date(),
                              pagamentoEfetuado: false,
                              tipoPagamento: 'unico' as const
                            });
                            setShowVisualizarModal(true);
                          }}
                        >
                          Ver
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setContaSelecionada({
                              id: 'CP-001',
                              empresaId: 'biodina-001',
                              numero: 'CP-001',
                              tipo: 'compra' as any,
                              departamentoSolicitante: 'Administrativo',
                              vincularA: 'departamento',
                              departamento: 'Administrativo',
                              fornecedor: 'Fornecedor ABC Ltda',
                              descricao: 'Material de escritório - Janeiro',
                              valor: 2500,
                              dataVencimento: new Date('2025-01-25'),
                              formaPagamentoSugerida: 'pix' as any,
                              status: 'pendente' as any,
                              createdAt: new Date(),
                              pagamentoEfetuado: false,
                              tipoPagamento: 'unico' as const
                            });
                            setShowPagarModal(true);
                          }}
                        >
                          Pagar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CP-002</TableCell>
                    <TableCell>Energy Corp</TableCell>
                    <TableCell>Conta de energia elétrica</TableCell>
                    <TableCell className="text-right">R$ 4.800,00</TableCell>
                    <TableCell>15/01/2025</TableCell>
                    <TableCell>
                      <Badge variant={contasPagas.includes('CP-002') ? "outline" : "destructive"} className={
                        contasPagas.includes('CP-002') 
                          ? "text-green-600 border-green-600" 
                          : undefined
                      }>
                        {contasPagas.includes('CP-002') ? 'Pago' : 'Vencido'}
                      </Badge>
                    </TableCell>
                    <TableCell>Boleto</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setContaSelecionada({
                              id: 'CP-002',
                              empresaId: 'biodina-001',
                              numero: 'CP-002',
                              tipo: 'outros' as any,
                              departamentoSolicitante: 'Administrativo',
                              vincularA: 'departamento',
                              departamento: 'Administrativo',
                              fornecedor: 'Energy Corp',
                              descricao: 'Conta de energia elétrica',
                              valor: 4800,
                              dataVencimento: new Date('2025-01-15'),
                              formaPagamentoSugerida: 'boleto' as any,
                              status: 'vencido' as any,
                              createdAt: new Date(),
                              pagamentoEfetuado: false,
                              tipoPagamento: 'unico' as const
                            });
                            setShowVisualizarModal(true);
                          }}
                        >
                          Ver
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => {
                            setContaSelecionada({
                              id: 'CP-002',
                              empresaId: 'biodina-001',
                              numero: 'CP-002',
                              tipo: 'outros' as any,
                              departamentoSolicitante: 'Administrativo',
                              vincularA: 'departamento',
                              departamento: 'Administrativo',
                              fornecedor: 'Energy Corp',
                              descricao: 'Conta de energia elétrica',
                              valor: 4800,
                              dataVencimento: new Date('2025-01-15'),
                              formaPagamentoSugerida: 'boleto' as any,
                              status: 'vencido' as any,
                              createdAt: new Date(),
                              pagamentoEfetuado: false,
                              tipoPagamento: 'unico' as const
                            });
                            setShowPagarModal(true);
                          }}
                        >
                          Pagar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CP-003</TableCell>
                    <TableCell>Telecom Solutions</TableCell>
                    <TableCell>Internet e telefonia corporativa</TableCell>
                    <TableCell className="text-right">R$ 1.200,00</TableCell>
                    <TableCell>30/01/2025</TableCell>
                    <TableCell>
                      <Badge variant={contasPagas.includes('CP-003') ? "outline" : "secondary"} className={
                        contasPagas.includes('CP-003') 
                          ? "text-green-600 border-green-600" 
                          : undefined
                      }>
                        {contasPagas.includes('CP-003') ? 'Pago' : 'Programado'}
                      </Badge>
                    </TableCell>
                    <TableCell>Débito Automático</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setContaSelecionada({
                              id: 'CP-003',
                              empresaId: 'biodina-001',
                              numero: 'CP-003',
                              tipo: 'outros' as any,
                              departamentoSolicitante: 'TI',
                              vincularA: 'departamento',
                              departamento: 'TI',
                              fornecedor: 'Telecom Solutions',
                              descricao: 'Internet e telefonia corporativa',
                              valor: 1200,
                              dataVencimento: new Date('2025-01-30'),
                              formaPagamentoSugerida: 'debito_automatico' as any,
                              status: 'programado' as any,
                              createdAt: new Date(),
                              pagamentoEfetuado: false,
                              tipoPagamento: 'unico' as const
                            });
                            setShowVisualizarModal(true);
                          }}
                        >
                          Ver
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setContaSelecionada({
                              id: 'CP-003',
                              empresaId: 'biodina-001',
                              numero: 'CP-003',
                              tipo: 'outros' as any,
                              departamentoSolicitante: 'TI',
                              vincularA: 'departamento',
                              departamento: 'TI',
                              fornecedor: 'Telecom Solutions',
                              descricao: 'Internet e telefonia corporativa',
                              valor: 1200,
                              dataVencimento: new Date('2025-01-30'),
                              formaPagamentoSugerida: 'debito_automatico' as any,
                              status: 'programado' as any,
                              createdAt: new Date(),
                              pagamentoEfetuado: false,
                              tipoPagamento: 'unico' as const
                            });
                            setShowEditarModal(true);
                          }}
                        >
                          Editar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendario" className="space-y-4">
          <CalendarioVencimentos contasSalvas={todasContasCalendario} onUpdateConta={handleUpdateContaCalendario} />
        </TabsContent>

        <TabsContent value="conciliacao" className="space-y-4">
          <ConciliacaoBancariaView />
        </TabsContent>

        <TabsContent value="contratos" className="space-y-4">
          <ContratosTabContent />
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Relatórios de Pagamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <FileText className="h-8 w-8 mb-2" />
                  Relatório de Contas a Pagar
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Calendar className="h-8 w-8 mb-2" />
                  Relatório por Vencimento
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <DollarSign className="h-8 w-8 mb-2" />
                  Análise de Pagamentos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Pagamentos Recorrentes */}
      <PagamentosRecorrentesModal 
        isOpen={showRecorrentesModal}
        onClose={() => setShowRecorrentesModal(false)}
        onNovaContaRecorrente={() => {
          setShowRecorrentesModal(false);
          setShowNovaRecorrenteModal(true);
        }}
      />

      <NovaContaPagarModal
        isOpen={showNovaContaModal}
        onClose={() => setShowNovaContaModal(false)}
        onSave={(novaConta) => {
          const contaCompleta: ContaPagar = {
            ...(novaConta as any),
            id: `CP-${Date.now()}`,
            numero: `CP-${String(contasSalvas.length + 1).padStart(3, '0')}`,
            status: 'programado' as any,
            createdAt: new Date(),
          };
          setContasSalvas(prev => [...prev, contaCompleta]);
          toast({
            title: "Conta salva",
            description: `Conta ${contaCompleta.numero} adicionada com sucesso.`,
            className: "bg-green-50 border-green-200 text-green-800",
          });
        }}
      />

      <NovaContaRecorrenteModal
        isOpen={showNovaRecorrenteModal}
        onClose={() => setShowNovaRecorrenteModal(false)}
        onSave={(novaConta) => {
          const contaCompleta: ContaRecorrenteEnhanced = {
            ...(novaConta as any),
            id: `REC-${Date.now()}`,
            status: 'programado' as any,
            proximoVencimento: novaConta.dataPrimeiroVencimento,
          };
          setContasRecorrentesSalvas(prev => [...prev, contaCompleta]);
          toast({
            title: "Conta recorrente salva",
            description: `Conta recorrente "${contaCompleta.nome}" adicionada com sucesso. Ocorrências geradas no calendário.`,
            className: "bg-green-50 border-green-200 text-green-800",
          });
        }}
      />

      <VisualizarContaModal
        isOpen={showVisualizarModal}
        onClose={() => setShowVisualizarModal(false)}
        conta={contaSelecionada}
      />

      <PagarContaModal
        isOpen={showPagarModal}
        onClose={() => setShowPagarModal(false)}
        conta={contaSelecionada}
        onConfirmarPagamento={(dados) => {
          // Atualiza o status da conta para "Pago"
          setContasPagas(prev => [...prev, dados.contaId]);
          
          // Exibe mensagem de sucesso
          toast({
            title: "Pagamento Confirmado",
            description: `O pagamento da conta ${dados.contaId} foi confirmado com sucesso. Status alterado para "Pago".`,
            className: "bg-green-50 border-green-200 text-green-800",
          });
          
          // Fecha o modal de pagamento
          setShowPagarModal(false);
        }}
      />

      <EditarContaModal
        isOpen={showEditarModal}
        onClose={() => setShowEditarModal(false)}
        conta={contaSelecionada}
        onSave={(contaAtualizada) => {
          console.log('Conta atualizada:', contaAtualizada);
          // Aqui você adicionaria a lógica para atualizar a conta
        }}
      />

      <SolicitacoesPagamentoModal
        isOpen={showSolicitacoesModal}
        onClose={() => setShowSolicitacoesModal(false)}
        solicitacoes={solicitacoes}
        onAceitar={handleAceitarSolicitacao}
        onRejeitar={handleRejeitarSolicitacao}
      />

      <NovaSolicitacaoModal
        isOpen={showNovaSolicitacaoModal}
        onClose={() => setShowNovaSolicitacaoModal(false)}
        onSave={handleNovaSolicitacao}
      />
    </div>
  );
};

export default APagarPagosView;