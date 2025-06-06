
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SPIDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (selectedCnpj: string) => void;
}

const SPIDownloadModal = ({ isOpen, onClose, onDownload }: SPIDownloadModalProps) => {
  const [selectedCnpj, setSelectedCnpj] = useState('');

  const cnpjOptions = [
    { value: '12.345.678/0001-90', label: '12.345.678/0001-90 - Empresa Alpha Ltda' },
    { value: '98.765.432/0001-10', label: '98.765.432/0001-10 - Beta Comércio S/A' },
    { value: '11.222.333/0001-44', label: '11.222.333/0001-44 - Gamma Tecnologia ME' },
    { value: '55.666.777/0001-88', label: '55.666.777/0001-88 - Delta Importação Ltda' }
  ];

  const handleDownload = () => {
    if (selectedCnpj) {
      onDownload(selectedCnpj);
      onClose();
      setSelectedCnpj('');
    }
  };

  const handleCancel = () => {
    onClose();
    setSelectedCnpj('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Deseja baixar qual modelo de PI?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="cnpj-select" className="text-sm font-medium">
              Selecione o CNPJ:
            </Label>
            <Select value={selectedCnpj} onValueChange={setSelectedCnpj}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Escolha um CNPJ" />
              </SelectTrigger>
              <SelectContent>
                {cnpjOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button 
            onClick={handleDownload}
            disabled={!selectedCnpj}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Baixar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SPIDownloadModal;
