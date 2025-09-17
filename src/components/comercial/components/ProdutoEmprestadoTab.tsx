
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MoneyInput } from "@/components/ui/money-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProdutoEmprestadoTabProps {
  formData: any;
  onInputChange: (field: string, value: string | Date | null) => void;
}

const ProdutoEmprestadoTab = ({ formData, onInputChange }: ProdutoEmprestadoTabProps) => {
  const getCurrencyLabel = () => {
    return formData.moeda === 'BRL' ? 'R$' : 'USD';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Moeda *</Label>
          <RadioGroup
            value={formData.moeda}
            onValueChange={(value) => onInputChange('moeda', value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="BRL" id="brl" />
              <Label htmlFor="brl">Real (R$)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="USD" id="usd" />
              <Label htmlFor="usd">Dólar (USD)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Número da DANFE de Empréstimo *</Label>
          <Input
            value={formData.numeroDanfeEmprestimo}
            onChange={(e) => onInputChange('numeroDanfeEmprestimo', e.target.value)}
            placeholder="Número da DANFE"
          />
        </div>

        <div className="space-y-2">
          <Label>Referência do Produto *</Label>
          <Input
            value={formData.referenciaProdutoEmprestado}
            onChange={(e) => onInputChange('referenciaProdutoEmprestado', e.target.value)}
            placeholder="Código/referência do produto"
          />
        </div>

        <div className="space-y-2">
          <Label>Descrição do Produto *</Label>
          <Textarea
            value={formData.descricaoProdutoEmprestado}
            onChange={(e) => onInputChange('descricaoProdutoEmprestado', e.target.value)}
            placeholder="Descrição detalhada do produto emprestado"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Valor de Empréstimo ({getCurrencyLabel()}) *</Label>
          <MoneyInput
            value={formData.valorEmprestimo}
            onChange={(value) => onInputChange('valorEmprestimo', value)}
            currency={formData.moeda}
            placeholder={formData.moeda === 'BRL' ? 'R$ 0,00' : '$0.00'}
          />
          <p className="text-xs text-gray-500">Valor principal para lógica de devolução</p>
        </div>
      </div>
    </div>
  );
};

export default ProdutoEmprestadoTab;
