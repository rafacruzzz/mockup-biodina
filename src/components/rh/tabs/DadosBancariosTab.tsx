
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DadosBancarios } from "@/types/colaborador";

interface DadosBancariosTabProps {
  formData: DadosBancarios;
  onInputChange: (field: keyof DadosBancarios, value: string) => void;
}

const DadosBancariosTab = ({ formData, onInputChange }: DadosBancariosTabProps) => {
  const bancos = [
    { value: '001', label: 'Banco do Brasil' },
    { value: '104', label: 'Caixa Econômica Federal' },
    { value: '237', label: 'Bradesco' },
    { value: '341', label: 'Itaú' },
    { value: '033', label: 'Santander' },
    { value: '260', label: 'Nu Pagamentos' },
    { value: '077', label: 'Banco Inter' },
    { value: '290', label: 'PagSeguro' },
    { value: '323', label: 'Mercado Pago' },
    { value: '336', label: 'C6 Bank' }
  ];

  const tiposConta = [
    { value: 'corrente', label: 'Conta Corrente' },
    { value: 'poupanca', label: 'Conta Poupança' },
    { value: 'salario', label: 'Conta Salário' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="banco">Banco *</Label>
        <Select value={formData.banco} onValueChange={(value) => onInputChange('banco', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o banco" />
          </SelectTrigger>
          <SelectContent>
            {bancos.map((banco) => (
              <SelectItem key={banco.value} value={banco.value}>
                {banco.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipoConta">Tipo de Conta *</Label>
        <Select value={formData.tipoConta} onValueChange={(value) => onInputChange('tipoConta', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de conta" />
          </SelectTrigger>
          <SelectContent>
            {tiposConta.map((tipo) => (
              <SelectItem key={tipo.value} value={tipo.value}>
                {tipo.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="agencia">Agência *</Label>
        <Input
          id="agencia"
          value={formData.agencia}
          onChange={(e) => onInputChange('agencia', e.target.value)}
          placeholder="Digite o número da agência"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="conta">Conta *</Label>
        <Input
          id="conta"
          value={formData.conta}
          onChange={(e) => onInputChange('conta', e.target.value)}
          placeholder="Digite o número da conta"
        />
      </div>
    </div>
  );
};

export default DadosBancariosTab;
