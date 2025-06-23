
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MovimentacaoEstoqueForm from "./MovimentacaoEstoqueForm";

interface NovaMovimentacaoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NovaMovimentacaoModal = ({ isOpen, onOpenChange }: NovaMovimentacaoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Movimentação de Estoque</DialogTitle>
        </DialogHeader>
        <MovimentacaoEstoqueForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default NovaMovimentacaoModal;
