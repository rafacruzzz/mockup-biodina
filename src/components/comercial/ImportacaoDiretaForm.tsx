
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImportacaoDiretaContent from './ImportacaoDiretaContent';

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const ImportacaoDiretaForm = ({ isOpen, onClose, onSave, oportunidade }: ImportacaoDiretaFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Importação Direta</DialogTitle>
        </DialogHeader>
        
        <ImportacaoDiretaContent 
          onClose={onClose}
          onSave={onSave}
          oportunidade={oportunidade}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImportacaoDiretaForm;
