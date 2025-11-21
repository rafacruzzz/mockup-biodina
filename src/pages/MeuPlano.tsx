import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, TrendingUp, Calendar, Check, ArrowLeft, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIsMasterUser } from '@/hooks/useIsMasterUser';
import { planosMock, historicoPagamentosMock, informacaoPagamentoMock } from '@/data/superModules';
import { toast } from 'sonner';
import SidebarLayout from '@/components/SidebarLayout';
import MudarPlanoModal from '@/components/profile/MudarPlanoModal';
import { Plano } from '@/types/super';

const MeuPlano = () => {
  const navigate = useNavigate();
  const { isMaster, empresaAtual, planoId } = useIsMasterUser();
  const [planoAtual, setPlanoAtual] = useState<Plano | null>(null);
  const [modalMudarPlano, setModalMudarPlano] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState<Plano | null>(null);

  // Redirecionar se não for master
  useEffect(() => {
    if (!isMaster) {
      toast.error('Acesso negado', {
        description: 'Apenas o usuário master pode acessar o gerenciamento de planos.'
      });
      navigate('/');
    }
  }, [isMaster, navigate]);

  // Buscar plano atual
  useEffect(() => {
    if (planoId) {
      const plano = planosMock.find(p => p.id === planoId);
      setPlanoAtual(plano || null);
    }
  }, [planoId]);

  const handleMudarPlano = (plano: Plano) => {
    setPlanoSelecionado(plano);
    setModalMudarPlano(true);
  };

  const handleConfirmarMudanca = () => {
    setModalMudarPlano(false);
    toast.success('Plano alterado com sucesso!', {
      description: `Seu plano foi alterado para ${planoSelecionado?.nome}`
    });
    // Aqui você atualizaria o plano no backend
    if (planoSelecionado) {
      setPlanoAtual(planoSelecionado);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pago: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      pendente: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      cancelado: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {status === 'pago' && '✅ Pago'}
        {status === 'pendente' && '⏳ Pendente'}
        {status === 'cancelado' && '❌ Cancelado'}
      </Badge>
    );
  };

  if (!isMaster || !planoAtual) return null;

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-background p-8">
        {/* Header com botão voltar */}
        <div className="max-w-7xl mx-auto mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Meu Plano</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie seu plano e pagamentos
              </p>
            </div>
          </div>
        </div>

        {/* Tabs principais */}
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="resumo" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 h-12">
              <TabsTrigger value="resumo" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Resumo
              </TabsTrigger>
              <TabsTrigger value="planos" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Comparar Planos
              </TabsTrigger>
              <TabsTrigger value="historico" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Histórico
              </TabsTrigger>
              <TabsTrigger value="pagamento" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Pagamento
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Resumo do Plano Atual */}
            <TabsContent value="resumo" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Seu Plano Atual</CardTitle>
                      <CardDescription>Informações do seu plano ativo</CardDescription>
                    </div>
                    {planoAtual.diasTrialGratuito > 0 && (
                      <Badge variant="secondary" className="text-sm">
                        🎉 Trial Ativo
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{planoAtual.nome}</h3>
                    <p className="text-3xl font-bold text-primary">
                      R$ {planoAtual.valor.toFixed(2)}<span className="text-lg font-normal text-muted-foreground">/mês</span>
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Benefícios incluídos:</h4>
                    <div className="grid gap-2">
                      {planoAtual.beneficios.map((beneficio, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{beneficio}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Próxima cobrança</p>
                      <p className="font-semibold">{informacaoPagamentoMock.proximaCobranca}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Método de pagamento</p>
                      <p className="font-semibold">
                        {informacaoPagamentoMock.cartao?.bandeira} {informacaoPagamentoMock.cartao?.numero}
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => {
                      // Scroll para a tab de planos
                      const element = document.querySelector('[value="planos"]');
                      if (element instanceof HTMLElement) {
                        element.click();
                      }
                    }}
                  >
                    Ver Outros Planos
                  </Button>
                </CardContent>
              </Card>

              {/* Card de informações importantes */}
              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        Informações Importantes
                      </p>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                        As cobranças proporcionais serão aplicadas na próxima fatura.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2: Comparar Planos */}
            <TabsContent value="planos">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {planosMock.map((plano) => (
                  <Card 
                    key={plano.id} 
                    className={plano.id === planoAtual.id ? 'border-primary shadow-lg' : ''}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle>{plano.nome}</CardTitle>
                        {plano.id === planoAtual.id && (
                          <Badge variant="default">Atual</Badge>
                        )}
                      </div>
                      <div className="text-3xl font-bold">
                        R$ {plano.valor.toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground">/mês</span>
                      </div>
                      {plano.diasTrialGratuito > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {plano.diasTrialGratuito} dias de trial gratuito
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 min-h-[200px]">
                        {plano.beneficios.slice(0, 5).map((beneficio, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-xs">{beneficio}</span>
                          </div>
                        ))}
                        {plano.beneficios.length > 5 && (
                          <p className="text-xs text-muted-foreground">
                            + {plano.beneficios.length - 5} benefícios adicionais
                          </p>
                        )}
                      </div>

                      {plano.id === planoAtual.id ? (
                        <Button variant="outline" className="w-full" disabled>
                          Plano Atual
                        </Button>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={() => handleMudarPlano(plano)}
                        >
                          {plano.valor > planoAtual.valor ? 'Fazer Upgrade' : 'Mudar para este Plano'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tab 3: Histórico de Pagamentos */}
            <TabsContent value="historico">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                  <CardDescription>
                    Confira todos os pagamentos realizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead>Fatura</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historicoPagamentosMock.map((pagamento) => (
                        <TableRow key={pagamento.id}>
                          <TableCell>
                            {new Date(pagamento.data).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>{pagamento.planoNome}</TableCell>
                          <TableCell className="font-semibold">
                            {pagamento.valor === 0 
                              ? 'Gratuito' 
                              : `R$ ${pagamento.valor.toFixed(2)}`
                            }
                          </TableCell>
                          <TableCell>{getStatusBadge(pagamento.status)}</TableCell>
                          <TableCell className="capitalize">
                            {pagamento.metodoPagamento === 'cartao' && '💳 Cartão'}
                            {pagamento.metodoPagamento === 'pix' && '🔑 PIX'}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {pagamento.numeroFatura}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 4: Método de Pagamento */}
            <TabsContent value="pagamento">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Método de Pagamento</CardTitle>
                    <CardDescription>
                      Gerencie suas formas de pagamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold">
                              {informacaoPagamentoMock.cartao?.bandeira} {informacaoPagamentoMock.cartao?.numero}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Válido até {informacaoPagamentoMock.cartao?.validade}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">Principal</Badge>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Alterar Método de Pagamento
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informações de Cobrança</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Próxima cobrança</p>
                        <p className="font-semibold">
                          {new Date(informacaoPagamentoMock.proximaCobranca).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Dia de vencimento</p>
                        <p className="font-semibold">
                          Todo dia {informacaoPagamentoMock.diaVencimento}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Valor mensal</p>
                        <p className="font-semibold text-lg">
                          R$ {planoAtual.valor.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          ✅ Ativo
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modal de mudança de plano */}
      {planoAtual && planoSelecionado && (
        <MudarPlanoModal
          open={modalMudarPlano}
          onOpenChange={setModalMudarPlano}
          planoAtual={planoAtual}
          planoNovo={planoSelecionado}
          onConfirm={handleConfirmarMudanca}
        />
      )}
    </SidebarLayout>
  );
};

export default MeuPlano;
