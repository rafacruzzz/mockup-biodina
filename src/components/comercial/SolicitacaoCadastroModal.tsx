
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SolicitacaoCadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SolicitacaoCadastroModal = ({ isOpen, onClose }: SolicitacaoCadastroModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nomeRazaoSocial: '',
    cnpjCpf: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nomeRazaoSocial || !formData.cnpjCpf) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Simular envio da solicitação
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de cadastro foi enviada para o setor responsável.",
    });
    
    setFormData({ nomeRazaoSocial: '', cnpjCpf: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Solicitação de cadastro</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nomeRazaoSocial">Nome/Razão Social *</Label>
            <Input
              id="nomeRazaoSocial"
              value={formData.nomeRazaoSocial}
              onChange={(e) => setFormData({...formData, nomeRazaoSocial: e.target.value})}
              placeholder="Digite o nome ou razão social"
              required
            />
          </div>

          <div>
            <Label htmlFor="cnpjCpf">CNPJ/CPF *</Label>
            <Input
              id="cnpjCpf"
              value={formData.cnpjCpf}
              onChange={(e) => setFormData({...formData, cnpjCpf: e.target.value})}
              placeholder="Digite o CNPJ ou CPF"
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Enviar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SolicitacaoCadastroModal;
