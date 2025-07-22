
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Beneficios } from "@/types/colaborador";

interface BeneficiosTabProps {
  formData: Beneficios;
  onInputChange: (field: keyof Beneficios, value: string) => void;
}

const BeneficiosTab = ({ formData, onInputChange }: BeneficiosTabProps) => {
  const tiposPlano = [
    { value: 'basico', label: 'Plano Básico' },
    { value: 'intermediario', label: 'Plano Intermediário' },
    { value: 'premium', label: 'Plano Premium' },
    { value: 'executivo', label: 'Plano Executivo' },
    { value: 'familiar', label: 'Plano Familiar' },
    { value: 'individual', label: 'Plano Individual' },
    { value: 'nao-possui', label: 'Não possui plano' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="tipoPlano">Tipo de Plano</Label>
        <Select value={formData.tipoPlano} onValueChange={(value) => onInputChange('tipoPlano', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de plano" />
          </SelectTrigger>
          <SelectContent>
            {tiposPlano.map((plano) => (
              <SelectItem key={plano.value} value={plano.value}>
                {plano.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantidadeDependentesPlano">Quantidade de Dependentes no Plano</Label>
        <Input
          id="quantidadeDependentesPlano"
          type="number"
          value={formData.quantidadeDependentesPlano}
          onChange={(e) => onInputChange('quantidadeDependentesPlano', e.target.value)}
          placeholder="Número de dependentes"
          min="0"
        />
      </div>
    </div>
  );
};

export default BeneficiosTab;
