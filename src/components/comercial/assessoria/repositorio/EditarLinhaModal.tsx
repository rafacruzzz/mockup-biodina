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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Linha } from "@/types/produto";
import { toast } from "sonner";

interface EditarLinhaModalProps {
  open: boolean;
  onClose: () => void;
  linha: Linha;
  onSave: (linha: Linha) => void;
}

export function EditarLinhaModal({
  open,
  onClose,
  linha,
  onSave,
}: EditarLinhaModalProps) {
  const [formData, setFormData] = useState({
    nome: linha.nome,
    descricao: linha.descricao || "",
    status: linha.status,
    statusCadastro: linha.statusCadastro,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.nome.trim()) {
      toast.error("Nome da linha é obrigatório");
      return;
    }

    onSave({
      ...linha,
      nome: formData.nome,
      descricao: formData.descricao,
      status: formData.status as 'ativo' | 'inativo',
      statusCadastro: formData.statusCadastro as 'completo' | 'incompleto',
    });

    toast.success("Linha atualizada com sucesso");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Linha</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="nome">Nome da Linha *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              placeholder="Ex: Hematologia"
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
              placeholder="Descreva a linha..."
              className="mt-2"
              maxLength={300}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger id="status" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="statusCadastro">Status do Cadastro</Label>
              <Select
                value={formData.statusCadastro}
                onValueChange={(value) => handleInputChange("statusCadastro", value)}
              >
                <SelectTrigger id="statusCadastro" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completo">Completo</SelectItem>
                  <SelectItem value="incompleto">Incompleto</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
