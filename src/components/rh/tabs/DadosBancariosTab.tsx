
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
    { value: '336', label: 'C6 Bank' },
    { value: '999', label: 'Outros' }
  ];

  const tiposConta = [
    { value: 'corrente', label: 'Conta Corrente' },
    { value: 'poupanca', label: 'Conta Poupança' },
    { value: 'salario', label: 'Conta Salário' }
  ];

  const tiposContaPessoa = [
    { value: 'pf', label: 'Pessoa Física (PF)' },
    { value: 'pj', label: 'Pessoa Jurídica (PJ)' }
  ];

  return (
    <div className="space-y-6">
      {/* Dados Bancários Principais */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Dados Bancários Principais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contaPF_PJ">Conta PF ou PJ *</Label>
            <Select value={formData.contaPF_PJ} onValueChange={(value) => onInputChange('contaPF_PJ', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de pessoa" />
              </SelectTrigger>
              <SelectContent>
                {tiposContaPessoa.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="chavePix">Chave PIX</Label>
            <Input
              id="chavePix"
              value={formData.chavePix}
              onChange={(e) => onInputChange('chavePix', e.target.value)}
              placeholder="Digite a chave PIX (CPF, email, telefone ou aleatória)"
            />
          </div>
        </div>
      </div>

      {/* Dados Bancários Secundários */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Dados Bancários Secundários (Opcional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bancoSecundario">Banco Secundário</Label>
            <Select value={formData.bancoSecundario || ''} onValueChange={(value) => onInputChange('bancoSecundario', value)}>
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
            <Label htmlFor="tipoContaSecundario">Tipo de Conta Secundária</Label>
            <Select value={formData.tipoContaSecundario || ''} onValueChange={(value) => onInputChange('tipoContaSecundario', value)}>
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
            <Label htmlFor="agenciaSecundario">Agência Secundária</Label>
            <Input
              id="agenciaSecundario"
              value={formData.agenciaSecundario || ''}
              onChange={(e) => onInputChange('agenciaSecundario', e.target.value)}
              placeholder="Digite o número da agência"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contaSecundario">Conta Secundária</Label>
            <Input
              id="contaSecundario"
              value={formData.contaSecundario || ''}
              onChange={(e) => onInputChange('contaSecundario', e.target.value)}
              placeholder="Digite o número da conta"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DadosBancariosTab;
