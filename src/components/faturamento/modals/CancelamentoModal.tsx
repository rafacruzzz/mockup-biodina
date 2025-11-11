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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CancelamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  numeroPedido: string;
}

const CancelamentoModal = ({ isOpen, onClose, numeroPedido }: CancelamentoModalProps) => {
  const { toast } = useToast();
  const [justificativa, setJustificativa] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleSubmit = () => {
    if (!motivo) {
      toast({
        title: "Motivo obrigatório",
        description: "Por favor, selecione o motivo do cancelamento.",
        variant: "destructive",
      });
      return;
    }

    if (!justificativa.trim()) {
      toast({
        title: "Justificativa obrigatória",
        description: "Por favor, informe a justificativa detalhada do cancelamento.",
        variant: "destructive",
      });
      return;
    }

    // Aqui seria feita a chamada para o backend/Supabase
    toast({
      title: "Solicitação enviada",
      description: "A solicitação de cancelamento foi enviada para aprovação do gestor.",
    });

    // Limpar campos e fechar
    setJustificativa("");
    setMotivo("");
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
            <Label htmlFor="motivo">Motivo do Cancelamento *</Label>
            <Select value={motivo} onValueChange={setMotivo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="erro_emissao">Erro na Emissão</SelectItem>
                <SelectItem value="duplicidade">Duplicidade de NF-e</SelectItem>
                <SelectItem value="desistencia_cliente">Desistência do Cliente</SelectItem>
                <SelectItem value="erro_valores">Erro nos Valores</SelectItem>
                <SelectItem value="erro_destinatario">Erro no Destinatário</SelectItem>
                <SelectItem value="operacao_nao_realizada">Operação Não Realizada</SelectItem>
                <SelectItem value="outro">Outro Motivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativa">Justificativa Detalhada *</Label>
            <Textarea
              id="justificativa"
              placeholder="Descreva detalhadamente o motivo do cancelamento da NF-e..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              rows={5}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              {justificativa.length}/1000 caracteres
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
