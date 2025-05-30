
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TipoPropostaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tipo: 'licitacao' | 'contratacao_simples') => void;
}

const TipoPropostaModal = ({ isOpen, onClose, onSelect }: TipoPropostaModalProps) => {
  const [tipoSelecionado, setTipoSelecionado] = useState<string>('');

  const handleContinuar = () => {
    if (tipoSelecionado) {
      onSelect(tipoSelecionado as 'licitacao' | 'contratacao_simples');
      onClose();
    }
  };

  const handleClose = () => {
    setTipoSelecionado('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selecione o Tipo de Proposta</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <Select value={tipoSelecionado} onValueChange={setTipoSelecionado}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de proposta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="licitacao">Licitação</SelectItem>
              <SelectItem value="contratacao_simples">Contratação Simples</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleContinuar}
              disabled={!tipoSelecionado}
              className="bg-biodina-gold hover:bg-biodina-gold/90"
            >
              Continuar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipoPropostaModal;
