
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Shield, AlertTriangle } from "lucide-react";

interface ConfirmacaoSenhaModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const ConfirmacaoSenhaModal = ({ 
  isOpen, 
  onOpenChange, 
  onConfirm, 
  title, 
  description 
}: ConfirmacaoSenhaModalProps) => {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleConfirm = () => {
    // Simulação de validação de senha de administrador
    if (senha === 'admin123') {
      onConfirm();
      setSenha('');
      setErro('');
      onOpenChange(false);
    } else {
      setErro('Senha de administrador incorreta');
    }
  };

  const handleClose = () => {
    setSenha('');
    setErro('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-600" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800">Confirmação Necessária</p>
              <p className="text-sm text-orange-700">{description}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Senha do Administrador</Label>
            <Input
              type="password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErro('');
              }}
              placeholder="Digite a senha de administrador"
              className={erro ? 'border-red-500' : ''}
            />
            {erro && (
              <p className="text-sm text-red-600">{erro}</p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!senha}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Confirmar Operação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmacaoSenhaModal;
