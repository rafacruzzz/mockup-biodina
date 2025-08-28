import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Save } from "lucide-react";
import { Departamento } from "@/types/departamento";
import { rhModules } from "@/data/rhModules";

interface DepartamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  departamento?: Departamento | null;
}

const DepartamentoModal = ({ isOpen, onClose, departamento }: DepartamentoModalProps) => {
  const [formData, setFormData] = useState<Departamento>({
    nome: departamento?.nome || "",
    responsavel: departamento?.responsavel || "",
    observacoes: departamento?.observacoes || "",
    cargos: departamento?.cargos || [],
  });

  if (!isOpen) return null;

  const cargosList = rhModules.departamentos.subModules.cargos?.data || [];

  const handleInputChange = (field: keyof Departamento, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCargoToggle = (cargoId: number) => {
    setFormData(prev => ({
      ...prev,
      cargos: prev.cargos?.includes(cargoId)
        ? prev.cargos.filter(id => id !== cargoId)
        : [...(prev.cargos || []), cargoId]
    }));
  };

  const handleSave = () => {
    console.log("Salvando setor:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-biodina-blue/10 rounded-lg">
              <svg className="h-6 w-6 text-biodina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-biodina-blue">
                {departamento ? "Editar Setor" : "Novo Setor"}
              </h2>
              <p className="text-gray-600 text-sm">
                {departamento ? "Edite as informações do setor" : "Cadastre um novo setor"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Digite o nome do setor"
                />
              </div>

              <div>
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) => handleInputChange("responsavel", e.target.value)}
                  placeholder="Digite o nome do responsável"
                />
              </div>

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange("observacoes", e.target.value)}
                  placeholder="Digite observações sobre o setor"
                  rows={4}
                />
              </div>

              <div>
                <Label>Cargos do Setor</Label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
                  {cargosList.map((cargo) => (
                    <div key={cargo.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cargo-${cargo.id}`}
                        checked={formData.cargos?.includes(cargo.id!) || false}
                        onCheckedChange={() => handleCargoToggle(cargo.id!)}
                      />
                      <Label htmlFor={`cargo-${cargo.id}`} className="text-sm">
                        {cargo.nome}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Selecione os cargos que pertencem a este setor
                </p>
              </div>
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

export default DepartamentoModal;
