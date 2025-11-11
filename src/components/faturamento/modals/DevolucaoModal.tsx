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
import { AlertCircle, PackageX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DevolucaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  numeroPedido: string;
}

const DevolucaoModal = ({ isOpen, onClose, numeroPedido }: DevolucaoModalProps) => {
  const { toast } = useToast();
  const [justificativa, setJustificativa] = useState("");
  const [motivo, setMotivo] = useState("");
  const [tipoDevolucao, setTipoDevolucao] = useState("");

  const handleSubmit = () => {
    if (!tipoDevolucao) {
      toast({
        title: "Tipo de devolução obrigatório",
        description: "Por favor, selecione o tipo de devolução.",
        variant: "destructive",
      });
      return;
    }

    if (!motivo) {
      toast({
        title: "Motivo obrigatório",
        description: "Por favor, selecione o motivo da devolução.",
        variant: "destructive",
      });
      return;
    }

    if (!justificativa.trim()) {
      toast({
        title: "Justificativa obrigatória",
        description: "Por favor, informe a justificativa detalhada da devolução.",
        variant: "destructive",
      });
      return;
    }

    // Aqui seria feita a chamada para o backend/Supabase
    toast({
      title: "Solicitação enviada",
      description: "A solicitação de devolução foi enviada para aprovação do gestor.",
    });

    // Limpar campos e fechar
    setJustificativa("");
    setMotivo("");
    setTipoDevolucao("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PackageX className="h-5 w-5" />
            Solicitar Devolução - Pedido {numeroPedido}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800">
              <p className="font-medium">Esta solicitação requer aprovação do gestor</p>
              <p className="mt-1">
                A devolução de mercadoria requer análise e autorização. Uma NF-e de devolução
                será emitida após a aprovação e confirmação do recebimento dos produtos.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoDevolucao">Tipo de Devolução *</Label>
            <Select value={tipoDevolucao} onValueChange={setTipoDevolucao}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de devolução" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="total">Devolução Total</SelectItem>
                <SelectItem value="parcial">Devolução Parcial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo da Devolução *</Label>
            <Select value={motivo} onValueChange={setMotivo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="defeito">Produto com Defeito</SelectItem>
                <SelectItem value="avaria">Produto Avariado no Transporte</SelectItem>
                <SelectItem value="divergencia">Divergência na Entrega</SelectItem>
                <SelectItem value="insatisfacao">Insatisfação do Cliente</SelectItem>
                <SelectItem value="erro_pedido">Erro no Pedido</SelectItem>
                <SelectItem value="desistencia">Desistência da Compra</SelectItem>
                <SelectItem value="outro">Outro Motivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativa">Justificativa Detalhada *</Label>
            <Textarea
              id="justificativa"
              placeholder="Descreva detalhadamente o motivo da devolução, incluindo fotos ou evidências se necessário..."
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
              <strong>Atenção:</strong> A mercadoria deve ser devolvida em perfeito estado,
              com embalagem original e nota fiscal. O prazo para devolução é de até 7 dias
              corridos após o recebimento.
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

export default DevolucaoModal;
