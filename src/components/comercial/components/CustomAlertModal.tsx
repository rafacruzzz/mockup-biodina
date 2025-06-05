
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface CustomAlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

const CustomAlertModal = ({ isOpen, title, message, onConfirm }: CustomAlertModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onConfirm}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-gray-700">{message}</p>
        </div>

        <DialogFooter>
          <Button onClick={onConfirm} className="bg-purple-600 hover:bg-purple-700">
            Entendi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomAlertModal;
