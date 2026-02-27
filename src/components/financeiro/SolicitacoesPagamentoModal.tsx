import { useMemo } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, AlertTriangle, FileText, Mail } from "lucide-react";
import { SolicitacaoPagamento } from "@/types/solicitacaoPagamento";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SolicitacoesPagamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitacoes: SolicitacaoPagamento[];
  onAceitar: (id: string) => void;
  onRejeitar: (id: string) => void;
}

export const SolicitacoesPagamentoModal = ({
  isOpen, onClose, solicitacoes, onAceitar, onRejeitar
}: SolicitacoesPagamentoModalProps) => {

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  // Recalculate urgency on render
  const solicitacoesComUrgencia = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return solicitacoes.map(s => ({
      ...s,
      urgente: new Date(s.dataVencimento) <= hoje,
    }));
  }, [solicitacoes]);

  const pendentes = solicitacoesComUrgencia.filter(s => s.status === 'pendente_analise');
  const analisadas = solicitacoesComUrgencia.filter(s => s.status !== 'pendente_analise');

  const renderTable = (items: SolicitacaoPagamento[], showActions: boolean) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Departamento</TableHead>
          <TableHead>Solicitado Por</TableHead>
          <TableHead>Autorizado Por</TableHead>
          <TableHead>Fornecedor</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Data Pgto</TableHead>
          <TableHead>Docs</TableHead>
          <TableHead>Status</TableHead>
          {showActions && <TableHead>Ações</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 && (
          <TableRow>
            <TableCell colSpan={showActions ? 10 : 9} className="text-center text-muted-foreground py-8">
              Nenhuma solicitação encontrada.
            </TableCell>
          </TableRow>
        )}
        {items.map(sol => (
          <TableRow key={sol.id} className={sol.urgente ? "bg-red-50 dark:bg-red-950/20" : ""}>
            <TableCell className="font-medium">{sol.departamentoSolicitante}</TableCell>
            <TableCell>{sol.solicitadoPor}</TableCell>
            <TableCell>{sol.autorizadoPor}</TableCell>
            <TableCell>{sol.fornecedor}</TableCell>
            <TableCell className="max-w-[200px] truncate">{sol.descricao}</TableCell>
            <TableCell className="text-right whitespace-nowrap">{formatCurrency(sol.valor)}</TableCell>
            <TableCell className="whitespace-nowrap">
              <div className="flex flex-col gap-1">
                {format(new Date(sol.dataVencimento), "dd/MM/yyyy", { locale: ptBR })}
                {sol.urgente && (
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0 animate-pulse">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    URGENTE
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                {sol.notaFiscalUrl && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    <FileText className="h-3 w-3 mr-0.5" /> NF
                  </Badge>
                )}
                {sol.emailsTrocados.length > 0 && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    <Mail className="h-3 w-3 mr-0.5" /> {sol.emailsTrocados.length}
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              {sol.status === 'pendente_analise' && (
                <Badge variant="outline" className="text-orange-600 border-orange-300">Pendente</Badge>
              )}
              {sol.status === 'aceita' && (
                <Badge variant="outline" className="text-green-600 border-green-300">Aceita</Badge>
              )}
              {sol.status === 'rejeitada' && (
                <Badge variant="outline" className="text-red-600 border-red-300">Rejeitada</Badge>
              )}
            </TableCell>
            {showActions && (
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-300 hover:bg-green-50"
                    onClick={() => onAceitar(sol.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" /> Aceitar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                    onClick={() => onRejeitar(sol.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" /> Rejeitar
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const urgentesCount = pendentes.filter(s => s.urgente).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Solicitações de Pagamento
            {urgentesCount > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {urgentesCount} URGENTE{urgentesCount > 1 ? 'S' : ''}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-orange-600">
              Pendentes de Análise ({pendentes.length})
            </h3>
            {renderTable(pendentes, true)}
          </div>

          {analisadas.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                Já Analisadas ({analisadas.length})
              </h3>
              {renderTable(analisadas, false)}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
