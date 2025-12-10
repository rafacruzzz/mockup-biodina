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
import { CheckCircle2, FileText } from "lucide-react";
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
  const [justificativa, setJustificativa] = useState("");
  const [valorComplementar, setValorComplementar] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const handleSubmit = () => {
    if (!justificativa.trim()) {
      toast({
        title: "Justificativa obrigatória",
        description: "Por favor, informe a justificativa para liberação do gestor.",
        variant: "destructive",
      });
      return;
    }

    if (!valorComplementar || parseFloat(valorComplementar) <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, informe um valor válido para a NF complementar.",
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
        justificativa,
        observacoes
      });
    }

    // Toast e limpeza
    toast({
      title: "NF Complementar gerada",
      description: "A NF Complementar foi gerada e enviada para liberação do gestor.",
    });

    setJustificativa("");
    setValorComplementar("");
    setObservacoes("");
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
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-medium">Geração de NF Complementar</p>
              <p className="mt-1">
                Preencha os dados abaixo para gerar a NF Complementar. Após a geração, 
                informe a justificativa para que o gestor possa liberar a nota.
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
            <Label htmlFor="justificativa">Justificativa para o Gestor *</Label>
            <Textarea
              id="justificativa"
              placeholder="Descreva o motivo da NF complementar para que o gestor possa liberar..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              {justificativa.length}/1000 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações Adicionais</Label>
            <Textarea
              id="observacoes"
              placeholder="Informações complementares..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {observacoes.length}/500 caracteres
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Gerar e Enviar para Liberação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NFComplementarModal;
