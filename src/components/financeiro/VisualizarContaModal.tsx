import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText, Download, Eye } from 'lucide-react';
import { ContaPagar } from '@/types/financeiro';

interface VisualizarContaModalProps {
  isOpen: boolean;
  onClose: () => void;
  conta: ContaPagar | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'programado':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'pendente':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'vencido':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'pago':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'programado': return 'Programado';
    case 'pendente': return 'Pendente';
    case 'vencido': return 'Vencido';
    case 'pago': return 'Pago';
    default: return status;
  }
};

const getTipoLabel = (tipo: string) => {
  switch (tipo) {
    case 'pagamento': return 'Pagamento';
    case 'compra': return 'Compra';
    case 'hospedagem': return 'Hospedagem';
    case 'passagem': return 'Passagem';
    case 'outros': return 'Outros';
    default: return tipo;
  }
};

const getFormaPagamentoLabel = (forma: string) => {
  switch (forma) {
    case 'boleto': return 'Boleto';
    case 'pix': return 'PIX';
    case 'debito_automatico': return 'Débito Automático';
    case 'cartao_credito': return 'Cartão de Crédito';
    case 'outros': return 'Outros';
    default: return forma;
  }
};

export const VisualizarContaModal: React.FC<VisualizarContaModalProps> = ({
  isOpen,
  onClose,
  conta
}) => {
  if (!conta) return null;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Detalhes da Conta a Pagar</DialogTitle>
            <Badge className={getStatusColor(conta.status)}>
              {getStatusLabel(conta.status)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Informações Gerais</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Número</label>
                    <p className="text-sm">{conta.numero}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tipo de Requisição</label>
                    <p className="text-sm">{getTipoLabel(conta.tipo)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Departamento Solicitante</label>
                    <p className="text-sm">{conta.departamentoSolicitante}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fornecedor</label>
                    <p className="text-sm">{conta.fornecedor}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Informações Financeiras</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Valor</label>
                    <p className="text-lg font-semibold text-primary">{formatCurrency(conta.valor)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Data de Vencimento</label>
                    <p className="text-sm">{format(conta.dataVencimento, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Forma de Pagamento Sugerida</label>
                    <p className="text-sm">{getFormaPagamentoLabel(conta.formaPagamentoSugerida)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Data de Criação</label>
                    <p className="text-sm">{format(conta.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Vinculação */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Vinculação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Vinculado a</label>
                <p className="text-sm capitalize">{conta.vincularA}</p>
              </div>
              {conta.projetoCliente && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Projeto/Cliente</label>
                  <p className="text-sm">{conta.projetoCliente}</p>
                </div>
              )}
              {conta.departamento && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Departamento</label>
                  <p className="text-sm">{conta.departamento}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Descrição */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Descrição da Despesa</h3>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{conta.descricao}</p>
            </div>
          </div>

          {/* Anexos */}
          {conta.anexos && conta.anexos.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Anexos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {conta.anexos.map((anexo, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{anexo}</p>
                          <p className="text-xs text-muted-foreground">Documento anexado</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Informações de Pagamento (se pago) */}
          {conta.status === 'pago' && conta.dataPagamento && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Informações de Pagamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Data do Pagamento</label>
                    <p className="text-sm">{format(conta.dataPagamento, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</p>
                  </div>
                  {conta.contaBancariaSaida && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Conta de Saída</label>
                      <p className="text-sm">{conta.contaBancariaSaida}</p>
                    </div>
                  )}
                </div>
                {conta.comprovantePagamento && (
                  <div className="mt-4">
                    <label className="text-sm font-medium text-muted-foreground">Comprovante de Pagamento</label>
                    <div className="flex items-center justify-between p-3 border rounded-lg mt-2">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">{conta.comprovantePagamento}</p>
                          <p className="text-xs text-muted-foreground">Comprovante anexado</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Botões */}
        <div className="flex justify-end">
          <Button onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};