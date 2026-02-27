import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { bancosCadastrados } from '@/data/bancosCadastrados';

interface BancoSelectProps {
  value: string;
  agencia: string;
  conta: string;
  onBancoSelect: (banco: string, agencia: string, conta: string) => void;
  compact?: boolean;
  className?: string;
}

const BancoSelect = ({ value, agencia, conta, onBancoSelect, compact = false, className }: BancoSelectProps) => {
  const handleBancoChange = (bancoNome: string) => {
    const banco = bancosCadastrados.find(b => `${b.codigo} - ${b.nome}` === bancoNome);
    if (banco) {
      onBancoSelect(`${banco.codigo} - ${banco.nome}`, banco.agencia, banco.conta);
    }
  };

  const sizeClass = compact ? 'h-7 text-xs' : '';
  const labelClass = compact ? 'text-xs' : 'text-sm';

  return (
    <div className={`grid ${compact ? 'grid-cols-1 gap-2' : 'grid-cols-1 md:grid-cols-3 gap-4'} ${className || ''}`}>
      <div className="space-y-2">
        <Label className={labelClass}>Banco</Label>
        <Select value={value} onValueChange={handleBancoChange}>
          <SelectTrigger className={sizeClass}>
            <SelectValue placeholder="Selecione o banco" />
          </SelectTrigger>
          <SelectContent>
            {bancosCadastrados.map(banco => (
              <SelectItem key={banco.id} value={`${banco.codigo} - ${banco.nome}`}>
                {banco.codigo} - {banco.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className={labelClass}>Agência</Label>
        <Input
          className={sizeClass}
          value={agencia}
          readOnly
          placeholder="Agência"
        />
      </div>
      <div className="space-y-2">
        <Label className={labelClass}>Conta</Label>
        <Input
          className={sizeClass}
          value={conta}
          readOnly
          placeholder="Conta"
        />
      </div>
    </div>
  );
};

export default BancoSelect;
