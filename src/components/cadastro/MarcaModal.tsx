import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X, Save, Plus, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";

interface Linha {
  id: string;
  nome: string;
}

interface MarcaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarcaModal = ({ isOpen, onClose }: MarcaModalProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    linhas: [] as Linha[],
  });

  const handleInputChange = (value: string) => {
    setFormData(prev => ({ ...prev, nome: value }));
  };

  const addLinha = () => {
    const newLinha: Linha = {
      id: `linha-${Date.now()}`,
      nome: "",
    };
    setFormData(prev => ({
      ...prev,
      linhas: [...prev.linhas, newLinha],
    }));
  };

  const updateLinha = (id: string, nome: string) => {
    setFormData(prev => ({
      ...prev,
      linhas: prev.linhas.map(l => l.id === id ? { ...l, nome } : l),
    }));
  };

  const removeLinha = (id: string) => {
    setFormData(prev => ({
      ...prev,
      linhas: prev.linhas.filter(l => l.id !== id),
    }));
  };

  const handleSubmit = () => {
    if (!formData.nome.trim()) {
      toast.error("Nome da marca é obrigatório");
      return;
    }

    console.log("Marca salva:", formData);
    toast.success("Marca cadastrada com sucesso!");
    setFormData({ nome: "", linhas: [] });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Tag className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Cadastro de Marca</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Nome da Marca */}
          <div>
            <Label htmlFor="nome-marca">
              Nome <span className="text-destructive">(obrigatório)</span>
            </Label>
            <Input
              id="nome-marca"
              value={formData.nome}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Digite o nome da marca"
              className="mt-2"
              maxLength={100}
            />
          </div>

          {/* Linhas */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-semibold">Linhas</Label>
              <Button variant="outline" size="sm" onClick={addLinha}>
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Linha
              </Button>
            </div>

            {formData.linhas.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Nenhuma linha adicionada. Clique em "Adicionar Linha" para começar.
              </p>
            ) : (
              <div className="space-y-3">
                {formData.linhas.map((linha) => (
                  <Card key={linha.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <Label htmlFor={`linha-${linha.id}`} className="text-sm">Nome</Label>
                          <Input
                            id={`linha-${linha.id}`}
                            value={linha.nome}
                            onChange={(e) => updateLinha(linha.id, e.target.value)}
                            placeholder="Nome da linha"
                            className="mt-1"
                            maxLength={100}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLinha(linha.id)}
                          className="text-destructive hover:text-destructive/80 mt-5"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Marca
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarcaModal;
