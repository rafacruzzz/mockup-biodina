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
import { AlertTriangle, FileEdit } from "lucide-react";
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
  const [justificativaInterna, setJustificativaInterna] = useState("");
  const [textoCartaCorrecao, setTextoCartaCorrecao] = useState("");

  const handleSubmit = () => {
    if (!justificativaInterna.trim()) {
      toast({
        title: "Justificativa interna obrigatória",
        description: "Por favor, informe a justificativa detalhada para uso interno.",
        variant: "destructive",
      });
      return;
    }

    if (!textoCartaCorrecao.trim()) {
      toast({
        title: "Texto da carta obrigatório",
        description: "Por favor, informe o texto que será enviado na Carta de Correção.",
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
        justificativaInterna,
        textoCartaCorrecao
      });
    }

    // Toast e limpeza
    toast({
      title: "Solicitação enviada",
      description: "A Carta de Correção foi enviada para aprovação do gestor.",
    });

    setJustificativaInterna("");
    setTextoCartaCorrecao("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileEdit className="h-5 w-5" />
            Gerar Carta de Correção {displayNumber && `- ${displayNumber}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Esta solicitação requer aprovação do gestor</p>
              <p className="mt-1">
                Após o envio, a Carta de Correção ficará pendente até que o gestor aprove ou rejeite a solicitação.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativaInterna">Justificativa Detalhada (uso interno) *</Label>
            <Textarea
              id="justificativaInterna"
              placeholder="Descreva detalhadamente o motivo da correção para análise do gestor..."
              value={justificativaInterna}
              onChange={(e) => setJustificativaInterna(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              Esta justificativa é para uso interno e não será enviada à CC-e. {justificativaInterna.length}/1000 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="textoCartaCorrecao">Texto da Carta de Correção *</Label>
            <Textarea
              id="textoCartaCorrecao"
              placeholder="Descreva exatamente qual informação está incorreta e qual deveria ser o valor correto..."
              value={textoCartaCorrecao}
              onChange={(e) => setTextoCartaCorrecao(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              Este texto será enviado à SEFAZ no evento de CC-e. {textoCartaCorrecao.length}/1000 caracteres
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
