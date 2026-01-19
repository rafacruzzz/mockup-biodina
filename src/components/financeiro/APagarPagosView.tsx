import { useState } from "react";
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
import { ContaPagar } from "@/types/financeiro";
import { useToast } from "@/hooks/use-toast";
import ContratosTabContent from "./ContratosTabContent";
import { useEmpresa } from "@/contexts/EmpresaContext";

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
                              createdAt: new Date()
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
                              createdAt: new Date()
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
                              createdAt: new Date()
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
                              createdAt: new Date()
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
                              createdAt: new Date()
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
                              createdAt: new Date()
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
          <CalendarioVencimentos />
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
          console.log('Nova conta criada:', novaConta);
          // Aqui você adicionaria a lógica para salvar a conta
        }}
      />

      <NovaContaRecorrenteModal
        isOpen={showNovaRecorrenteModal}
        onClose={() => setShowNovaRecorrenteModal(false)}
        onSave={(novaConta) => {
          console.log('Nova conta recorrente criada:', novaConta);
          // Aqui você adicionaria a lógica para salvar a conta recorrente
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
    </div>
  );
};

export default APagarPagosView;