
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Save } from "lucide-react";
import { Funcao } from "@/types/funcao";

interface FuncaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  funcao?: Funcao | null;
}

const FuncaoModal = ({ isOpen, onClose, funcao }: FuncaoModalProps) => {
  const [formData, setFormData] = useState<Funcao>({
    nome: funcao?.nome || "",
  });

  if (!isOpen) return null;

  const handleInputChange = (field: keyof Funcao, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Salvando função:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-biodina-blue/10 rounded-lg">
              <svg className="h-6 w-6 text-biodina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-biodina-blue">
                {funcao ? "Editar Função" : "Nova Função"}
              </h2>
              <p className="text-gray-600 text-sm">
                {funcao ? "Edite as informações da função" : "Cadastre uma nova função"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                placeholder="Digite o nome da função"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FuncaoModal;
