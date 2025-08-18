
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, UserMinus } from "lucide-react";

interface DesligarColaboradorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (motivo: string, data: string) => void;
  colaboradorNome: string;
}

const DesligarColaboradorModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  colaboradorNome 
}: DesligarColaboradorModalProps) => {
  const [motivo, setMotivo] = useState('');
  const [dataDesligamento, setDataDesligamento] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleConfirm = () => {
    if (!motivo.trim()) {
      setErro('Motivo do desligamento é obrigatório');
      return;
    }
    
    if (!dataDesligamento) {
      setErro('Data do desligamento é obrigatória');
      return;
    }

    // Validação da senha de administrador
    if (senha !== 'admin123') {
      setErro('Senha de administrador incorreta');
      return;
    }

    onConfirm(motivo, dataDesligamento);
    handleClose();
  };

  const handleClose = () => {
    setMotivo('');
    setDataDesligamento('');
    setSenha('');
    setErro('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <UserMinus className="h-5 w-5" />
            Desligar Colaborador
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Confirmação de Desligamento</p>
              <p className="text-sm text-red-700">
                Você está prestes a desligar o colaborador <strong>{colaboradorNome}</strong>. 
                Esta ação não pode ser desfeita.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label>Motivo do Desligamento *</Label>
              <Textarea
                value={motivo}
                onChange={(e) => {
                  setMotivo(e.target.value);
                  setErro('');
                }}
                placeholder="Descreva o motivo do desligamento..."
                className={erro && !motivo.trim() ? 'border-red-500' : ''}
                rows={3}
              />
            </div>

            <div>
              <Label>Data do Desligamento *</Label>
              <Input
                type="date"
                value={dataDesligamento}
                onChange={(e) => {
                  setDataDesligamento(e.target.value);
                  setErro('');
                }}
                className={erro && !dataDesligamento ? 'border-red-500' : ''}
              />
            </div>

            <div>
              <Label>Senha do Administrador *</Label>
              <Input
                type="password"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErro('');
                }}
                placeholder="Digite a senha de administrador"
                className={erro && senha !== 'admin123' ? 'border-red-500' : ''}
              />
            </div>

            {erro && (
              <p className="text-sm text-red-600">{erro}</p>
            )}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmar Desligamento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesligarColaboradorModal;
