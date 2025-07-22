
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FormacaoEscolaridade } from "@/types/colaborador";

interface FormacaoEscolaridadeTabProps {
  formData: FormacaoEscolaridade;
  onInputChange: (field: keyof FormacaoEscolaridade, value: string | boolean) => void;
}

const FormacaoEscolaridadeTab = ({ formData, onInputChange }: FormacaoEscolaridadeTabProps) => {
  const escolaridades = [
    { value: 'fundamental-incompleto', label: 'Ensino Fundamental Incompleto' },
    { value: 'fundamental-completo', label: 'Ensino Fundamental Completo' },
    { value: 'medio-incompleto', label: 'Ensino Médio Incompleto' },
    { value: 'medio-completo', label: 'Ensino Médio Completo' },
    { value: 'tecnico', label: 'Ensino Técnico' },
    { value: 'superior-incompleto', label: 'Ensino Superior Incompleto' },
    { value: 'superior-completo', label: 'Ensino Superior Completo' },
    { value: 'pos-graduacao', label: 'Pós-graduação' },
    { value: 'mestrado', label: 'Mestrado' },
    { value: 'doutorado', label: 'Doutorado' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="escolaridade">Escolaridade *</Label>
          <Select value={formData.escolaridade} onValueChange={(value) => onInputChange('escolaridade', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a escolaridade" />
            </SelectTrigger>
            <SelectContent>
              {escolaridades.map((escolaridade) => (
                <SelectItem key={escolaridade.value} value={escolaridade.value}>
                  {escolaridade.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="possuiDiploma"
            checked={formData.possuiDiploma}
            onCheckedChange={(checked) => onInputChange('possuiDiploma', checked)}
          />
          <Label htmlFor="possuiDiploma">Possui diploma?</Label>
        </div>
      </div>
    </div>
  );
};

export default FormacaoEscolaridadeTab;
