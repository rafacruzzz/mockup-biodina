import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AssinaturaDigital } from "./AssinaturaDigital";
import { toast } from "sonner";

interface AssinaturaLoteModalProps {
  open: boolean;
  onClose: () => void;
  osIds: string[];
}

export function AssinaturaLoteModal({ open, onClose, osIds }: AssinaturaLoteModalProps) {
  const handleSave = (assinatura: {
    nomeCliente: string;
    assinaturaCliente: string;
    nomeAssessor: string;
    assinaturaAssessor: string;
    data: string;
  }) => {
    // Aqui implementar lógica para aplicar assinatura a todas as OS selecionadas
    console.log("Aplicando assinatura para OS:", osIds, assinatura);
    toast.success(`Assinatura aplicada a ${osIds.length} ordem(ns) de serviço`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Assinatura em Lote - {osIds.length} Ordem(ns) de Serviço
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            A assinatura será aplicada a todas as ordens de serviço selecionadas do mesmo cliente.
          </p>
          <AssinaturaDigital onSave={handleSave} onCancel={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
