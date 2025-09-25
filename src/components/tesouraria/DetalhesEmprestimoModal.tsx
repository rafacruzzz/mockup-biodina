import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, Calendar, TrendingUp, FileText, Download, 
  AlertTriangle, CheckCircle, Clock
} from "lucide-react";
import { mockEmprestimos, mockParcelasEmprestimo, formatCurrency, formatDate, gerarCronogramaEmprestimo } from "@/data/tesouraria";
import { StatusParcela, STATUS_COLORS_TESOURARIA } from "@/types/tesouraria";

interface DetalhesEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
  emprestimoId: string;
}

const DetalhesEmprestimoModal = ({ isOpen, onClose, emprestimoId }: DetalhesEmprestimoModalProps) => {
  const emprestimo = mockEmprestimos.find(e => e.id === emprestimoId);
  
  if (!emprestimo) return null;

  const parcelasEmprestimo = mockParcelasEmprestimo.filter(p => p.emprestimoId === emprestimoId);
  const cronogramaCompleto = gerarCronogramaEmprestimo(emprestimo);
  
  const percentualPago = ((emprestimo.valorTotal - emprestimo.saldoDevedor) / emprestimo.valorTotal) * 100;
  const parcelasPagas = parcelasEmprestimo.filter(p => p.status === StatusParcela.PAGO).length;
  const parcelasVencidas = parcelasEmprestimo.filter(p => p.status === StatusParcela.VENCIDO).length;
  const proximaParcela = parcelasEmprestimo
    .filter(p => p.status === StatusParcela.PENDENTE)
    .sort((a, b) => a.dataVencimento.getTime() - b.dataVencimento.getTime())[0];

  const getStatusIcon = (status: StatusParcela) => {
    switch (status) {
      case StatusParcela.PAGO:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case StatusParcela.VENCIDO:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case StatusParcela.PENDENTE:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Detalhes do Empréstimo - {emprestimo.codigo}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Gerais */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Instituição Financeira</p>
                  <p className="font-semibold">{emprestimo.instituicaoFinanceira}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className={`${STATUS_COLORS_TESOURARIA[emprestimo.status]} text-white w-fit`}>
                    {emprestimo.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                  <p className="text-xl font-bold">{formatCurrency(emprestimo.valorTotal)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo Devedor</p>
                  <p className="text-xl font-bold text-red-600">{formatCurrency(emprestimo.saldoDevedor)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Indexador</p>
                  <p className="font-semibold">{emprestimo.indexador}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Juros</p>
                  <p className="font-semibold">{emprestimo.taxaJuros}% a.a.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data Início</p>
                  <p className="font-semibold">{formatDate(emprestimo.dataInicio)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data Vencimento</p>
                  <p className="font-semibold">{formatDate(emprestimo.dataFim)}</p>
                </div>
              </div>
              
              {emprestimo.garantia && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Garantia</p>
                  <p className="font-semibold">{emprestimo.garantia}</p>
                </div>
              )}
              
              {emprestimo.observacoes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Observações</p>
                  <p className="text-sm">{emprestimo.observacoes}</p>
                </div>
              )}
              
              {emprestimo.contratoUrl && (
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Contrato
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progresso de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Amortizado</span>
                      <span>{percentualPago.toFixed(1)}%</span>
                    </div>
                    <Progress value={percentualPago} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{parcelasPagas}</p>
                      <p className="text-xs text-green-600">Pagas</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{parcelasVencidas}</p>
                      <p className="text-xs text-red-600">Vencidas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {proximaParcela && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Próxima Parcela
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Parcela</span>
                      <span className="font-semibold">{proximaParcela.numerosParcela}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Vencimento</span>
                      <span className="font-semibold">{formatDate(proximaParcela.dataVencimento)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Valor</span>
                      <span className="text-lg font-bold">{formatCurrency(proximaParcela.valorTotal)}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-xs">
                        <span>Principal: {formatCurrency(proximaParcela.valorPrincipal)}</span>
                        <span>Juros: {formatCurrency(proximaParcela.valorJuros)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Cronograma de Parcelas */}
        <Card>
          <CardHeader>
            <CardTitle>Cronograma de Amortização</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parcela</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Juros</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Pagamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cronogramaCompleto.slice(0, 12).map((parcela) => { // Mostrar apenas primeiras 12 parcelas
                  const parcelaReal = parcelasEmprestimo.find(p => p.numerosParcela === parcela.numerosParcela);
                  const status = parcelaReal?.status || StatusParcela.PENDENTE;
                  
                  return (
                    <TableRow key={parcela.id}>
                      <TableCell className="font-medium">{parcela.numerosParcela}</TableCell>
                      <TableCell>{formatDate(parcela.dataVencimento)}</TableCell>
                      <TableCell>{formatCurrency(parcela.valorPrincipal)}</TableCell>
                      <TableCell>{formatCurrency(parcela.valorJuros)}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(parcela.valorTotal)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(status)}
                          <Badge className={`${STATUS_COLORS_TESOURARIA[status]} text-white`}>
                            {status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {parcelaReal?.dataPagamento ? formatDate(parcelaReal.dataPagamento) : '-'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {cronogramaCompleto.length > 12 && (
              <div className="text-center mt-4">
                <Button variant="outline">
                  Ver Cronograma Completo ({cronogramaCompleto.length} parcelas)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default DetalhesEmprestimoModal;