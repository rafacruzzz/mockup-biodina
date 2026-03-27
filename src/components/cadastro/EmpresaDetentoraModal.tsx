import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Save, Building2 } from "lucide-react";
import { toast } from "sonner";

interface EmpresaDetentoraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmpresaDetentoraModal = ({ isOpen, onClose }: EmpresaDetentoraModalProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    cnpjDetentor: "",
    autorizacaoFuncionamento: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.nome.trim()) {
      toast.error("Nome da empresa é obrigatório");
      return;
    }
    if (!formData.cnpjDetentor.trim()) {
      toast.error("CNPJ do Detentor é obrigatório");
      return;
    }
    if (!formData.autorizacaoFuncionamento.trim()) {
      toast.error("Autorização de Funcionamento é obrigatória");
      return;
    }

    console.log("Empresa Detentora salva:", formData);
    toast.success("Empresa Detentora cadastrada com sucesso!");
    setFormData({ nome: "", cnpjDetentor: "", autorizacaoFuncionamento: "" });
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
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Cadastro de Empresa Detentora</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <Label htmlFor="nome-empresa">
              Nome <span className="text-destructive">(obrigatório)</span>
            </Label>
            <Input
              id="nome-empresa"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              placeholder="Digite o nome da empresa"
              className="mt-2"
              maxLength={150}
            />
          </div>

          <div>
            <Label htmlFor="cnpj-detentor">
              CNPJ do Detentor <span className="text-destructive">(obrigatório)</span>
            </Label>
            <Input
              id="cnpj-detentor"
              value={formData.cnpjDetentor}
              onChange={(e) => handleInputChange("cnpjDetentor", e.target.value)}
              placeholder="Ex: 00.000.000/0000-00"
              className="mt-2"
              maxLength={18}
            />
          </div>

          <div>
            <Label htmlFor="autorizacao">
              Autorização de Funcionamento <span className="text-destructive">(obrigatório)</span>
            </Label>
            <Input
              id="autorizacao"
              value={formData.autorizacaoFuncionamento}
              onChange={(e) => handleInputChange("autorizacaoFuncionamento", e.target.value)}
              placeholder="Digite a autorização de funcionamento"
              className="mt-2"
              maxLength={100}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmpresaDetentoraModal;
