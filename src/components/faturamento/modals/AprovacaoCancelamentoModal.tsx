import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, XCircle, FileText, User, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface SolicitacaoCancelamento {
  numeroPedido: string;
  numeroNF?: string;
  cliente: string;
  valor: number;
  justificativa: string;
  solicitante: string;
  dataSolicitacao: string;
  horaSolicitacao: string;
}

interface AprovacaoCancelamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitacao: SolicitacaoCancelamento | null;
  onAprovar: (numeroPedido: string) => void;
  onReprovar: (numeroPedido: string, motivoRejeicao: string) => void;
}

const AprovacaoCancelamentoModal = ({
  isOpen,
  onClose,
  solicitacao,
  onAprovar,
  onReprovar,
}: AprovacaoCancelamentoModalProps) => {
  const { toast } = useToast();
  const [motivoRejeicao, setMotivoRejeicao] = useState("");
  const [processando, setProcessando] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleAprovar = () => {
    if (!solicitacao) return;
    
    setProcessando(true);
    
    // Simular chamada à API
    setTimeout(() => {
      onAprovar(solicitacao.numeroPedido);
      toast({
        title: "Cancelamento aprovado",
        description: `O pedido ${solicitacao.numeroPedido} foi cancelado com sucesso.`,
      });
      setProcessando(false);
      onClose();
    }, 500);
  };

  const handleReprovar = () => {
    if (!solicitacao) return;
    
    if (!motivoRejeicao.trim()) {
      toast({
        title: "Motivo obrigatório",
        description: "Por favor, informe o motivo da rejeição.",
        variant: "destructive",
      });
      return;
    }

    setProcessando(true);
    
    // Simular chamada à API
    setTimeout(() => {
      onReprovar(solicitacao.numeroPedido, motivoRejeicao);
      toast({
        title: "Cancelamento rejeitado",
        description: `A solicitação de cancelamento do pedido ${solicitacao.numeroPedido} foi rejeitada. O pedido voltou para status Faturado.`,
        variant: "destructive",
      });
      setMotivoRejeicao("");
      setProcessando(false);
      onClose();
    }, 500);
  };

  if (!solicitacao) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Aprovar Cancelamento - Pedido {solicitacao.numeroPedido}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 px-4 py-2">
              Aguardando Aprovação do Gestor
            </Badge>
          </div>

          {/* Detalhes da Solicitação */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Detalhes da Solicitação
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Número do Pedido</p>
                  <p className="font-medium">{solicitacao.numeroPedido}</p>
                </div>
              </div>
              
              {solicitacao.numeroNF && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Número da NF-e</p>
                    <p className="font-medium">{solicitacao.numeroNF}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Cliente</p>
                  <p className="font-medium">{solicitacao.cliente}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Valor Total</p>
                  <p className="font-medium">{formatCurrency(solicitacao.valor)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Solicitante</p>
                  <p className="font-medium">{solicitacao.solicitante}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Data/Hora da Solicitação</p>
                  <p className="font-medium">{solicitacao.dataSolicitacao} às {solicitacao.horaSolicitacao}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Justificativa */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Justificativa do Solicitante</Label>
            <div className="bg-muted/30 border rounded-lg p-4">
              <p className="text-sm whitespace-pre-wrap">{solicitacao.justificativa}</p>
            </div>
          </div>

          {/* Alerta */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Atenção</p>
              <p className="mt-1">
                Ao aprovar, a NF-e será cancelada junto à SEFAZ. Esta ação é irreversível.
                Se rejeitar, o pedido voltará ao status "Faturado".
              </p>
            </div>
          </div>

          {/* Motivo da Rejeição (só aparece se for rejeitar) */}
          <div className="space-y-2">
            <Label htmlFor="motivo-rejeicao">Motivo da Rejeição (obrigatório para rejeitar)</Label>
            <Textarea
              id="motivo-rejeicao"
              placeholder="Informe o motivo caso vá rejeitar esta solicitação de cancelamento..."
              value={motivoRejeicao}
              onChange={(e) => setMotivoRejeicao(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={processando}>
            Voltar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleReprovar}
            disabled={processando}
            className="gap-2"
          >
            <XCircle className="h-4 w-4" />
            Rejeitar
          </Button>
          <Button 
            onClick={handleAprovar}
            disabled={processando}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4" />
            Aprovar Cancelamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AprovacaoCancelamentoModal;
