import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Marca } from "@/types/produto";
import { toast } from "sonner";

interface EditarMarcaModalProps {
  open: boolean;
  onClose: () => void;
  marca: Marca;
  onSave: (marca: Marca) => void;
}

export function EditarMarcaModal({
  open,
  onClose,
  marca,
  onSave,
}: EditarMarcaModalProps) {
  const [formData, setFormData] = useState({
    nome: marca.nome,
    descricao: marca.descricao || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.nome.trim()) {
      toast.error("Nome da marca é obrigatório");
      return;
    }

    onSave({
      ...marca,
      nome: formData.nome,
      descricao: formData.descricao,
      ultimaAtualizacao: new Date(),
    });

    toast.success("Marca atualizada com sucesso");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Marca</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="nome">Nome da Marca *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              placeholder="Ex: Beckman Coulter"
              className="mt-2"
              maxLength={100}
            />
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
              placeholder="Descreva a marca..."
              className="mt-2"
              maxLength={300}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
