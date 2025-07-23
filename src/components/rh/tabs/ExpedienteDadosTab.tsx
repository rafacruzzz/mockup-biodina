
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExpedienteDadosTabProps {
  formData: {
    nome: string;
    observacoes: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const ExpedienteDadosTab = ({ formData, onInputChange }: ExpedienteDadosTabProps) => {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
            Nome do Expediente *
          </Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => onInputChange('nome', e.target.value)}
            placeholder="Ex: Expediente Comercial"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="observacoes" className="text-sm font-medium text-gray-700">
            Observações
          </Label>
          <Textarea
            id="observacoes"
            value={formData.observacoes}
            onChange={(e) => onInputChange('observacoes', e.target.value)}
            placeholder="Descreva as características deste expediente..."
            className="w-full min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpedienteDadosTab;
