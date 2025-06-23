
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

interface ConfirmacaoNFModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ConfirmacaoNFModal = ({ isOpen, onOpenChange, onConfirm }: ConfirmacaoNFModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Gerar NF de Entrada
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-center text-gray-700">
            Gerar NF de Entrada?
          </p>
        </div>

        <DialogFooter className="flex gap-2 justify-center">
          <Button variant="outline" onClick={handleCancel}>
            Não
          </Button>
          <Button onClick={handleConfirm}>
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmacaoNFModal;
