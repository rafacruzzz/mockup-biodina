
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DadosFinanceiros } from '@/types/colaborador';

interface DadosFinanceirosReadOnlyProps {
  data: DadosFinanceiros;
}

const DadosFinanceirosReadOnly = ({ data }: DadosFinanceirosReadOnlyProps) => {
  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value);
    return isNaN(numValue) ? 'R$ 0,00' : `R$ ${numValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Salário Base</Label>
          <Input
            value={formatCurrency(data.salarioBase)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Adicional Nível</Label>
          <Input
            value={formatCurrency(data.adicionalNivel)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Insalubridade</Label>
          <Input
            value={formatCurrency(data.insalubridade)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Sobreaviso</Label>
          <Input
            value={formatCurrency(data.sobreaviso)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Salário Bruto</Label>
          <Input
            value={formatCurrency(data.salarioBruto)}
            readOnly
            className="bg-gray-50 font-semibold"
          />
        </div>

        <div className="space-y-2">
          <Label>Valor da Hora Trabalhada</Label>
          <Input
            value={formatCurrency(data.valorHoraTrabalhada)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Piso Salarial</Label>
          <Input
            value={formatCurrency(data.pisoSalarial)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Média Salarial</Label>
          <Input
            value={formatCurrency(data.mediaSalarial)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Dependentes IR</Label>
          <Input
            value={`${data.dependentesIR} dependente${parseInt(data.dependentesIR) !== 1 ? 's' : ''}`}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default DadosFinanceirosReadOnly;
