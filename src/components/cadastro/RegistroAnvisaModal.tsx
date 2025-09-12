import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RegistroAnvisaForm } from './RegistroAnvisaForm';
import { RegistroAnvisa } from '@/types/anvisa';

interface RegistroAnvisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (registro: RegistroAnvisa) => void;
  editingRegistro?: RegistroAnvisa | null;
}

export const RegistroAnvisaModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingRegistro 
}: RegistroAnvisaModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingRegistro ? 'Editar Registro ANVISA' : 'Novo Registro ANVISA'}
          </DialogTitle>
        </DialogHeader>
        
        <RegistroAnvisaForm 
          onSubmit={onSave}
          onCancel={onClose}
          initialData={editingRegistro}
        />
      </DialogContent>
    </Dialog>
  );
};