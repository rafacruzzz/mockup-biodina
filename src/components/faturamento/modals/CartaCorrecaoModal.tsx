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
import { AlertCircle, FileEdit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartaCorrecaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  numeroPedido?: string;
  pedidoId?: string;
  numeroNF?: string;
  chaveAcesso?: string;
  onSolicitar?: (data: any) => void;
}

const CartaCorrecaoModal = ({ 
  isOpen, 
  onClose, 
  numeroPedido, 
  pedidoId, 
  numeroNF, 
  chaveAcesso,
  onSolicitar 
}: CartaCorrecaoModalProps) => {
  const displayNumber = numeroPedido || numeroNF || '';

  const { toast } = useToast();
  const [justificativa, setJustificativa] = useState("");
  const [correcaoDesejada, setCorrecaoDesejada] = useState("");

  const handleSubmit = () => {
    if (!justificativa.trim()) {
      toast({
        title: "Justificativa obrigatória",
        description: "Por favor, informe a justificativa para a carta de correção.",
        variant: "destructive",
      });
      return;
    }

    if (!correcaoDesejada.trim()) {
      toast({
        title: "Correção obrigatória",
        description: "Por favor, descreva a correção que deseja realizar.",
        variant: "destructive",
      });
      return;
    }

    // Callback se fornecido (para Entrada)
    if (onSolicitar) {
      onSolicitar({
        pedidoId,
        numeroNF,
        chaveAcesso,
        correcaoDesejada,
        justificativa
      });
    }

    // Toast e limpeza
    toast({
      title: "Solicitação enviada",
      description: "A solicitação de carta de correção foi enviada para aprovação do gestor.",
    });

    setJustificativa("");
    setCorrecaoDesejada("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileEdit className="h-5 w-5" />
            Solicitar Carta de Correção {displayNumber && `- ${displayNumber}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Esta solicitação requer aprovação do gestor</p>
              <p className="mt-1">
                A Carta de Correção eletrônica (CC-e) é utilizada para corrigir erros em campos
                específicos da NF-e já autorizada. Nem todos os campos podem ser corrigidos por CC-e.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="correcao">Correção Desejada *</Label>
            <Textarea
              id="correcao"
              placeholder="Descreva exatamente qual informação está incorreta e qual deveria ser o valor correto..."
              value={correcaoDesejada}
              onChange={(e) => setCorrecaoDesejada(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              {correcaoDesejada.length}/1000 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativa">Justificativa *</Label>
            <Textarea
              id="justificativa"
              placeholder="Explique o motivo da necessidade de correção e como o erro ocorreu..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              {justificativa.length}/1000 caracteres
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <strong>Importante:</strong> A CC-e não pode ser utilizada para corrigir valores,
              quantidades, preços ou CFOP. Para esses casos, utilize NF Complementar ou Cancelamento.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Enviar para Aprovação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CartaCorrecaoModal;
