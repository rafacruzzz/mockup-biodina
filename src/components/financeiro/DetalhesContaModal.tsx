import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContaPagar } from "@/types/financeiro";
import { 
  Calendar, DollarSign, Building2, User, FileText, Clock,
  CheckCircle, XCircle, CreditCard, Eye, Edit, Paperclip
} from "lucide-react";

interface ContaDetalhesLegacy {
  id: string;
  descricao: string;
  valor: number;
  fornecedor: string;
  status: string;
  tipo: string;
  origem: string;
  setor: string;
  solicitante: string;
  detalhes: Record<string, any>;
}

interface DetalhesContaModalProps {
  isOpen: boolean;
  onClose: () => void;
  conta: ContaPagar | ContaDetalhesLegacy | null;
}

const isContaPagar = (conta: any): conta is ContaPagar => {
  return conta && 'tipoPagamento' in conta;
};

const DetalhesContaModal = ({ isOpen, onClose, conta }: DetalhesContaModalProps) => {
  if (!conta) return null;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '—';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  };

  // Render for ContaPagar (new format)
  if (isContaPagar(conta)) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <div>Detalhes da Conta a Pagar</div>
                <div className="text-sm font-normal text-muted-foreground mt-1">
                  {conta.numero} • {conta.departamentoSolicitante}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Info principal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <DollarSign className="h-5 w-5" />
                  Informações Principais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Descrição</label>
                    <p className="text-sm font-semibold">{conta.descricao}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Valor Total</label>
                    <p className="text-lg font-bold text-primary">{formatCurrency(conta.valor)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fornecedor</label>
                    <p className="text-sm font-semibold flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {conta.fornecedor}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Vencimento</label>
                    <p className="text-sm font-semibold flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(conta.dataVencimento)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Badge variant="outline" className={
                      conta.pagamentoEfetuado ? "bg-green-100 text-green-700 border-green-200" :
                      conta.status === 'vencido' ? "bg-red-100 text-red-700 border-red-200" :
                      "bg-blue-100 text-blue-700 border-blue-200"
                    }>
                      {conta.pagamentoEfetuado ? '✓ Pago' : conta.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tipo Pagamento</label>
                    <p className="text-sm font-semibold capitalize">{conta.tipoPagamento}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dados bancários e pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="h-5 w-5" />
                  Dados do Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Pago na data</label>
                    <p className="text-sm font-semibold">{conta.pagamentoEfetuado ? 'Sim' : 'Não'}</p>
                  </div>
                  {conta.dataPagamentoEfetuado && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Data do Pagamento</label>
                      <p className="text-sm font-semibold">{formatDate(conta.dataPagamentoEfetuado)}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Banco</label>
                    <p className="text-sm font-semibold">{conta.bancoPagamento || '—'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Agência</label>
                    <p className="text-sm font-semibold">{conta.agenciaPagamento || '—'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Conta</label>
                    <p className="text-sm font-semibold">{conta.contaPagamento || '—'}</p>
                  </div>
                </div>
                {(conta.multa || conta.juros || conta.desconto) && (
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Multa</label>
                      <p className="text-sm font-semibold text-red-600">{conta.multa ? formatCurrency(conta.multa) : '—'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Juros</label>
                      <p className="text-sm font-semibold text-red-600">{conta.juros ? formatCurrency(conta.juros) : '—'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Desconto</label>
                      <p className="text-sm font-semibold text-green-600">{conta.desconto ? formatCurrency(conta.desconto) : '—'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Parcelas */}
            {conta.tipoPagamento === 'parcelado' && conta.parcelas && conta.parcelas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CreditCard className="h-5 w-5" />
                    Parcelas ({conta.parcelas.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parcela</TableHead>
                        <TableHead>Vencimento</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Multa</TableHead>
                        <TableHead>Juros</TableHead>
                        <TableHead>Desconto</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {conta.parcelas.map((p) => (
                        <TableRow key={p.numero}>
                          <TableCell className="font-medium">{p.numero} de {conta.numeroParcelas || conta.parcelas!.length}</TableCell>
                          <TableCell>{formatDate(p.dataVencimento)}</TableCell>
                          <TableCell>{formatCurrency(p.valor)}</TableCell>
                          <TableCell>{p.multa ? formatCurrency(p.multa) : '—'}</TableCell>
                          <TableCell>{p.juros ? formatCurrency(p.juros) : '—'}</TableCell>
                          <TableCell>{p.desconto ? formatCurrency(p.desconto) : '—'}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={p.pago ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                              {p.pago ? 'Pago' : 'Pendente'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Documentos anexados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Paperclip className="h-5 w-5" />
                  Documentos Anexados
                </CardTitle>
              </CardHeader>
              <CardContent>
                {conta.anexos && conta.anexos.length > 0 ? (
                  <div className="space-y-2">
                    {conta.anexos.map((anexo, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 border rounded-lg hover:bg-accent/5">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{anexo}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Visualizar
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum documento anexado.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Separator />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Legacy render for old format
  const legacyConta = conta as ContaDetalhesLegacy;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText className="h-6 w-6" />
            <div>
              <div>Detalhes da Conta a Pagar</div>
              <div className="text-sm font-normal text-muted-foreground mt-1">
                {legacyConta.id} • {legacyConta.setor}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Informações Principais</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Descrição</label>
                  <p className="text-sm font-semibold">{legacyConta.descricao}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Valor</label>
                  <p className="text-lg font-bold text-primary">{formatCurrency(legacyConta.valor)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fornecedor</label>
                  <p className="text-sm font-semibold flex items-center gap-1"><Building2 className="h-4 w-4" />{legacyConta.fornecedor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Solicitante</label>
                  <p className="text-sm font-semibold flex items-center gap-1"><User className="h-4 w-4" />{legacyConta.solicitante}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" />Detalhes Específicos</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(legacyConta.detalhes).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</label>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetalhesContaModal;
