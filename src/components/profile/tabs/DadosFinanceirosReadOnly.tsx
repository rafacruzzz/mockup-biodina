
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';
import { DadosFinanceiros } from '@/types/colaborador';

interface DadosFinanceirosReadOnlyProps {
  data: DadosFinanceiros & {
    sugestaoSalario?: string;
    breakdownSalarial?: string;
    planoCarreira?: string;
  };
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
      {/* Seção de Sugestão Salarial */}
      {data.sugestaoSalario && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Sugestão Salarial do Sistema</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Valor Atual:</span>
              <span className="font-bold text-lg text-green-800">{data.sugestaoSalario}</span>
            </div>
            
            {data.breakdownSalarial && (
              <p className="text-xs text-green-600">
                {data.breakdownSalarial}
              </p>
            )}
            
            {data.planoCarreira && (
              <p className="text-xs text-green-600">
                Baseado no: {data.planoCarreira}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Campos Financeiros */}
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
