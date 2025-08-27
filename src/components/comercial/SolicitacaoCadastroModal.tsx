
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface SolicitacaoCadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SolicitacaoCadastroModal = ({ isOpen, onClose }: SolicitacaoCadastroModalProps) => {
  const [formData, setFormData] = useState({
    nomeRazaoSocial: '',
    cnpjCpf: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular envio da solicitação
    console.log('Solicitação de cadastro enviada:', formData);
    
    // Reset form and close modal
    setFormData({ nomeRazaoSocial: '', cnpjCpf: '' });
    onClose();
    
    // Aqui você pode adicionar toast notification ou outras ações
    alert('Solicitação de cadastro enviada com sucesso!');
  };

  const isFormValid = formData.nomeRazaoSocial.trim() !== '' && formData.cnpjCpf.trim() !== '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Solicitação de Cadastro
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nomeRazaoSocial">Nome/Razão Social *</Label>
            <Input
              id="nomeRazaoSocial"
              value={formData.nomeRazaoSocial}
              onChange={(e) => handleInputChange('nomeRazaoSocial', e.target.value)}
              placeholder="Digite o nome ou razão social"
              required
            />
          </div>

          <div>
            <Label htmlFor="cnpjCpf">CNPJ/CPF *</Label>
            <Input
              id="cnpjCpf"
              value={formData.cnpjCpf}
              onChange={(e) => handleInputChange('cnpjCpf', e.target.value)}
              placeholder="Digite o CNPJ ou CPF"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={!isFormValid}
            >
              Enviar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SolicitacaoCadastroModal;
