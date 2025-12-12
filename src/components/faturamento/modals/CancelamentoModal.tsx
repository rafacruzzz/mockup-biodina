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
import { AlertCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CancelamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  numeroPedido: string;
  onSolicitar?: (justificativaInterna: string, justificativaNota: string) => void;
}

const CancelamentoModal = ({ isOpen, onClose, numeroPedido, onSolicitar }: CancelamentoModalProps) => {
  const { toast } = useToast();
  const [justificativa, setJustificativa] = useState("");
  const [justificativaNota, setJustificativaNota] = useState("");

  const handleSubmit = () => {
    if (!justificativa.trim()) {
      toast({
        title: "Justificativa obrigatória",
        description: "Por favor, informe a justificativa detalhada do cancelamento.",
        variant: "destructive",
      });
      return;
    }

    if (!justificativaNota.trim()) {
      toast({
        title: "Justificativa na Nota obrigatória",
        description: "Por favor, informe a justificativa que será enviada na NF-e.",
        variant: "destructive",
      });
      return;
    }

    // Chamar callback para atualizar o status no componente pai
    if (onSolicitar) {
      onSolicitar(justificativa, justificativaNota);
    }

    toast({
      title: "Solicitação enviada",
      description: "A solicitação de cancelamento foi enviada para aprovação do gestor.",
    });

    // Limpar campos e fechar
    setJustificativa("");
    setJustificativaNota("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Solicitar Cancelamento - Pedido {numeroPedido}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800">
              <p className="font-medium">Esta solicitação requer aprovação do gestor</p>
              <p className="mt-1">
                O cancelamento de NF-e só pode ser realizado dentro do prazo legal de 24 horas
                após a autorização. Após esse período, será necessário emitir uma NF de devolução.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativa">Justificativa Detalhada (uso interno) *</Label>
            <Textarea
              id="justificativa"
              placeholder="Descreva detalhadamente o motivo do cancelamento para aprovação do gestor..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              {justificativa.length}/1000 caracteres - Esta justificativa é para uso interno e não será enviada à NF-e
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativaNota">Justificativa na Nota *</Label>
            <Textarea
              id="justificativaNota"
              placeholder="Informe a justificativa que será registrada no cancelamento da NF-e..."
              value={justificativaNota}
              onChange={(e) => setJustificativaNota(e.target.value)}
              rows={3}
              maxLength={255}
            />
            <p className="text-xs text-muted-foreground">
              {justificativaNota.length}/255 caracteres - Esta justificativa será enviada à SEFAZ no evento de cancelamento
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <strong>Importante:</strong> O cancelamento da NF-e é irreversível. Certifique-se
              de que esta é realmente a ação necessária. Após o cancelamento, uma nova NF-e
              deverá ser emitida se a operação for realizada.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} variant="destructive">
            Enviar para Aprovação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelamentoModal;
