import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NFComplementarModalProps {
  isOpen: boolean;
  onClose: () => void;
  numeroPedido?: string;
  pedidoId?: string;
  numeroNF?: string;
  onSolicitar?: (data: any) => void;
}

const NFComplementarModal = ({ 
  isOpen, 
  onClose, 
  numeroPedido, 
  pedidoId, 
  numeroNF, 
  onSolicitar 
}: NFComplementarModalProps) => {
  const displayNumber = numeroPedido || numeroNF || '';

  const { toast } = useToast();
  const [justificativaInterna, setJustificativaInterna] = useState("");
  const [justificativaNota, setJustificativaNota] = useState("COMPLEMENTO DE VALOR");
  const [valorComplementar, setValorComplementar] = useState("");

  const handleSubmit = () => {
    if (!valorComplementar || parseFloat(valorComplementar) <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, informe um valor válido para a NF complementar.",
        variant: "destructive",
      });
      return;
    }

    if (!justificativaInterna.trim()) {
      toast({
        title: "Justificativa interna obrigatória",
        description: "Por favor, informe a justificativa detalhada para uso interno.",
        variant: "destructive",
      });
      return;
    }

    if (!justificativaNota.trim()) {
      toast({
        title: "Justificativa na nota obrigatória",
        description: "Por favor, informe a justificativa que será enviada na NF Complementar.",
        variant: "destructive",
      });
      return;
    }

    // Callback se fornecido (para Entrada)
    if (onSolicitar) {
      onSolicitar({
        pedidoId,
        numeroNF,
        valorComplementar: parseFloat(valorComplementar),
        justificativaInterna,
        justificativaNota
      });
    }

    // Toast e limpeza
    toast({
      title: "Solicitação enviada",
      description: "A NF Complementar foi enviada para aprovação do gestor.",
    });

    setJustificativaInterna("");
    setJustificativaNota("COMPLEMENTO DE VALOR");
    setValorComplementar("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Gerar NF Complementar {displayNumber && `- ${displayNumber}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Esta solicitação requer aprovação do gestor</p>
              <p className="mt-1">
                Após o envio, a NF Complementar ficará pendente até que o gestor aprove ou rejeite a solicitação.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor">Valor Complementar *</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={valorComplementar}
              onChange={(e) => setValorComplementar(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativaInterna">Justificativa Detalhada (uso interno) *</Label>
            <Textarea
              id="justificativaInterna"
              placeholder="Descreva detalhadamente o motivo da NF complementar para análise do gestor..."
              value={justificativaInterna}
              onChange={(e) => setJustificativaInterna(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              Esta justificativa é para uso interno e não será enviada na NF-e. {justificativaInterna.length}/1000 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativaNota">Justificativa na NF Complementar *</Label>
            <Textarea
              id="justificativaNota"
              placeholder="Justificativa que será enviada na NF Complementar..."
              value={justificativaNota}
              onChange={(e) => setJustificativaNota(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              Esta justificativa será enviada na NF Complementar à SEFAZ. {justificativaNota.length}/500 caracteres
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

export default NFComplementarModal;
