
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TipoPropostaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (tipo: 'licitacao' | 'contratacao_simples') => void;
}

const TipoPropostaModal = ({ isOpen, onClose, onContinue }: TipoPropostaModalProps) => {
  const [selectedType, setSelectedType] = useState<string>('');

  const handleContinue = () => {
    if (selectedType) {
      onContinue(selectedType as 'licitacao' | 'contratacao_simples');
      setSelectedType('');
    }
  };

  const handleClose = () => {
    setSelectedType('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selecione o Tipo de Proposta</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha o tipo de proposta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="licitacao">Licitação</SelectItem>
              <SelectItem value="contratacao_simples">Contratação Simples</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!selectedType}
            className="bg-biodina-gold hover:bg-biodina-gold/90"
          >
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipoPropostaModal;
