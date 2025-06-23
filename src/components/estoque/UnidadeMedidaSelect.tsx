
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const unidadesMedida = [
  { value: 'unidade', label: 'Unidade (UN)' },
  { value: 'caixa', label: 'Caixa (CX)' },
  { value: 'embalagem', label: 'Embalagem (EMB)' },
  { value: 'frasco', label: 'Frasco (FR)' },
  { value: 'kit', label: 'Kit (KT)' },
  { value: 'pacote', label: 'Pacote (PCT)' },
  { value: 'rolo', label: 'Rolo (RL)' },
  { value: 'tubo', label: 'Tubo (TB)' },
  { value: 'litro', label: 'Litro (L)' },
  { value: 'ml', label: 'Mililitro (ML)' },
  { value: 'kg', label: 'Quilograma (KG)' },
  { value: 'g', label: 'Grama (G)' }
];

interface UnidadeMedidaSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const UnidadeMedidaSelect = ({ 
  value, 
  onValueChange, 
  label = "Unidade de Medida",
  placeholder = "Selecione a unidade",
  className = ""
}: UnidadeMedidaSelectProps) => {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {unidadesMedida.map((unidade) => (
            <SelectItem key={unidade.value} value={unidade.value}>
              {unidade.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UnidadeMedidaSelect;
