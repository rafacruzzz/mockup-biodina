
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, CheckCircle } from "lucide-react";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  oportunidadeId: string;
}

const ApprovalModal = ({ isOpen, onClose, onApprove, oportunidadeId }: ApprovalModalProps) => {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!senha.trim()) {
      setErro('Por favor, digite a senha do gestor.');
      return;
    }

    setLoading(true);
    setErro('');

    try {
      // Simulação da validação no backend
      // Em produção, fazer uma chamada real para o backend
      const response = await simulateBackendValidation(senha, oportunidadeId);
      
      if (response.success) {
        onApprove();
        handleClose();
      } else {
        setErro('Senha inválida ou gestor não autorizado.');
      }
    } catch (error) {
      setErro('Erro ao validar aprovação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSenha('');
    setErro('');
    setLoading(false);
    onClose();
  };

  // Simulação da validação no backend
  const simulateBackendValidation = async (password: string, oppId: string): Promise<{success: boolean}> => {
    // Simulação de delay da rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Para demonstração, aceita "admin123" como senha válida
    return { success: password === 'admin123' };
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-yellow-600" />
            Aprovação para Avançar para Participação
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="senha-gestor">Senha do Gestor</Label>
            <Input
              id="senha-gestor"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a senha do gestor"
              onKeyDown={(e) => e.key === 'Enter' && handleApprove()}
            />
          </div>
          
          {erro && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {erro}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="text-sm text-gray-600">
            <p>Para fins de demonstração, use a senha: <code className="bg-gray-100 px-1 rounded">admin123</code></p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            onClick={handleApprove} 
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              "Validando..."
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Aprovar e Avançar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalModal;
