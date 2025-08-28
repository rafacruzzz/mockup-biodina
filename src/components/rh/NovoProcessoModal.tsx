
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NovoProcessoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovoProcessoModal = ({ isOpen, onClose }: NovoProcessoModalProps) => {
  const [formData, setFormData] = useState({
    titulo: '',
    cargo: '',
    departamento: '',
    descricao: '',
    requisitos: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement process creation logic
    console.log('Novo processo:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Processo Seletivo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titulo">Título do Processo</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="cargo">Cargo</Label>
            <Input
              id="cargo"
              value={formData.cargo}
              onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="departamento">Departamento</Label>
            <Input
              id="departamento"
              value={formData.departamento}
              onChange={(e) => setFormData(prev => ({ ...prev, departamento: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="requisitos">Requisitos</Label>
            <Textarea
              id="requisitos"
              value={formData.requisitos}
              onChange={(e) => setFormData(prev => ({ ...prev, requisitos: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Processo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NovoProcessoModal;
