import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface NovaContaEmailModalProps {
  open: boolean;
  onClose: () => void;
}

export const NovaContaEmailModal = ({ open, onClose }: NovaContaEmailModalProps) => {
  const [formData, setFormData] = useState({
    endereco: "",
    nomeUsuario: "",
    departamento: "",
    senha: "",
    confirmarSenha: "",
    observacoes: ""
  });

  const departamentos = [
    "Comercial",
    "RH",
    "Financeiro",
    "TI",
    "Administrativo",
    "Diretoria"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    // Aqui implementaria a criação da conta
    toast({
      title: "Sucesso",
      description: "Conta de e-mail criada com sucesso!"
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Nova Conta de E-mail</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço de E-mail</Label>
            <div className="flex">
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                placeholder="usuario"
                required
              />
              <span className="flex items-center px-3 border border-l-0 rounded-r bg-gray-50">
                @biodina.com.br
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nomeUsuario">Nome do Usuário</Label>
            <Input
              id="nomeUsuario"
              value={formData.nomeUsuario}
              onChange={(e) => handleInputChange("nomeUsuario", e.target.value)}
              placeholder="Nome completo do usuário"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select value={formData.departamento} onValueChange={(value) => handleInputChange("departamento", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o departamento" />
              </SelectTrigger>
              <SelectContent>
                {departamentos.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                value={formData.senha}
                onChange={(e) => handleInputChange("senha", e.target.value)}
                placeholder="Senha segura"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <Input
                id="confirmarSenha"
                type="password"
                value={formData.confirmarSenha}
                onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                placeholder="Confirme a senha"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações (Opcional)</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Observações sobre a conta"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Conta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};