import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { ContaEmail } from "@/types/ti";

interface EditarEmailModalProps {
  open: boolean;
  onClose: () => void;
  email: ContaEmail | null;
}

export const EditarEmailModal = ({ open, onClose, email }: EditarEmailModalProps) => {
  const [formData, setFormData] = useState({
    status: "",
    redirecionadoPara: "",
    aliases: [] as string[],
    novoAlias: ""
  });
  
  const [redirecionamentoAtivo, setRedirecionamentoAtivo] = useState(false);

  useEffect(() => {
    if (email) {
      setFormData({
        status: email.status,
        redirecionadoPara: email.redirecionadoPara || "",
        aliases: email.aliases || [],
        novoAlias: ""
      });
      setRedirecionamentoAtivo(email.status === "redirecionado");
    }
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Sucesso",
      description: "Configurações do e-mail atualizadas com sucesso!"
    });
    
    onClose();
  };

  const handleAddAlias = () => {
    if (formData.novoAlias && !formData.aliases.includes(formData.novoAlias)) {
      setFormData(prev => ({
        ...prev,
        aliases: [...prev.aliases, prev.novoAlias],
        novoAlias: ""
      }));
    }
  };

  const handleRemoveAlias = (alias: string) => {
    setFormData(prev => ({
      ...prev,
      aliases: prev.aliases.filter(a => a !== alias)
    }));
  };

  const handleRedirecionamentoChange = (checked: boolean) => {
    setRedirecionamentoAtivo(checked);
    setFormData(prev => ({
      ...prev,
      status: checked ? "redirecionado" : "ativo",
      redirecionadoPara: checked ? prev.redirecionadoPara : ""
    }));
  };

  if (!email) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Configurações - {email.endereco}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="status">Status da Conta</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="bloqueado">Bloqueado</SelectItem>
                <SelectItem value="redirecionado">Redirecionado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Redirecionamento */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <Label htmlFor="redirecionamento">Redirecionamento de E-mails</Label>
              <Switch
                id="redirecionamento"
                checked={redirecionamentoAtivo}
                onCheckedChange={handleRedirecionamentoChange}
              />
            </div>
            
            {redirecionamentoAtivo && (
              <div className="space-y-2">
                <Label htmlFor="redirecionadoPara">Redirecionar para</Label>
                <Input
                  id="redirecionadoPara"
                  value={formData.redirecionadoPara}
                  onChange={(e) => setFormData(prev => ({ ...prev, redirecionadoPara: e.target.value }))}
                  placeholder="email@destino.com"
                />
              </div>
            )}
          </div>

          {/* Aliases */}
          <div className="space-y-4 p-4 border rounded-lg">
            <Label>Aliases de E-mail</Label>
            
            <div className="flex gap-2">
              <Input
                value={formData.novoAlias}
                onChange={(e) => setFormData(prev => ({ ...prev, novoAlias: e.target.value }))}
                placeholder="Adicionar novo alias"
              />
              <Button type="button" onClick={handleAddAlias} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.aliases.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.aliases.map((alias, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {alias}
                    <button
                      type="button"
                      onClick={() => handleRemoveAlias(alias)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};