import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { ContaEmail } from "@/types/ti";

interface ConfirmacaoExclusaoModalProps {
  open: boolean;
  onClose: () => void;
  email: ContaEmail | null;
}

export const ConfirmacaoExclusaoModal = ({ open, onClose, email }: ConfirmacaoExclusaoModalProps) => {
  const handleConfirmDelete = () => {
    if (!email) return;
    
    // Aqui implementaria a exclusão da conta
    toast({
      title: "Conta Excluída",
      description: `A conta ${email.endereco} foi excluída com sucesso.`,
      variant: "destructive"
    });
    
    onClose();
  };

  if (!email) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Exclusão
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Tem certeza de que deseja excluir a conta de e-mail:
          </p>
          
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="font-medium text-red-800">{email.endereco}</div>
            <div className="text-sm text-red-600">{email.nomeUsuario}</div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <strong>Atenção:</strong> Esta ação não pode ser desfeita. Todos os e-mails e configurações serão permanentemente removidos.
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Confirmar Exclusão
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};