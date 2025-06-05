
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PedidoConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const PedidoConfirmationModal = ({ isOpen, onConfirm, onCancel }: PedidoConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold text-purple-600">
            Confirmação de Pedido
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-center text-gray-700 mb-6">
            O cliente confirmou o pedido?
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={onConfirm}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Sim
            </Button>
            <Button 
              onClick={onCancel}
              variant="outline"
              className="px-8"
            >
              Não
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PedidoConfirmationModal;
