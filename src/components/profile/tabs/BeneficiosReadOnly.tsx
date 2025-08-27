
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Beneficios } from '@/types/colaborador';

interface BeneficiosReadOnlyProps {
  data: Beneficios;
}

const BeneficiosReadOnly = ({ data }: BeneficiosReadOnlyProps) => {
  const getTipoPlanoNome = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      'basico': 'Plano Básico',
      'intermediario': 'Plano Intermediário',
      'premium': 'Plano Premium',
      'executivo': 'Plano Executivo',
      'familiar': 'Plano Familiar',
      'individual': 'Plano Individual',
      'nao-possui': 'Não possui plano'
    };
    return tipos[tipo] || tipo;
  };

  const getTipoPlanoColor = (tipo: string) => {
    const colors: { [key: string]: string } = {
      'basico': 'secondary',
      'intermediario': 'default',
      'premium': 'destructive',
      'executivo': 'destructive',
      'familiar': 'default',
      'individual': 'default',
      'nao-possui': 'secondary'
    };
    return colors[tipo] || 'default';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tipo de Plano</Label>
          <div className="flex items-center gap-2">
            <Input
              value={getTipoPlanoNome(data.tipoPlano)}
              readOnly
              className="bg-gray-50"
            />
            <Badge variant={getTipoPlanoColor(data.tipoPlano) as any}>
              {getTipoPlanoNome(data.tipoPlano)}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Dependentes no Plano</Label>
          <Input
            value={`${data.quantidadeDependentesPlano} dependente${parseInt(data.quantidadeDependentesPlano) !== 1 ? 's' : ''}`}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>

      {/* Informações adicionais dos benefícios */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-800 mb-2">Detalhes dos Benefícios</h3>
        <div className="space-y-2 text-sm text-green-700">
          <p><strong>Plano de Saúde:</strong> {getTipoPlanoNome(data.tipoPlano)}</p>
          <p><strong>Operadora:</strong> Unimed Brasília</p>
          <p><strong>Abrangência:</strong> Nacional</p>
          <p><strong>Dependentes Inclusos:</strong> {data.quantidadeDependentesPlano} (cônjuge e filhos)</p>
          <p><strong>Valor Mensal:</strong> R$ 280,00 (desconto em folha)</p>
          <p><strong>Cobertura:</strong> Consultas, exames, internações, cirurgias</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Outros Benefícios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <p><strong>Vale Refeição:</strong> R$ 35,00/dia</p>
            <p><strong>Vale Transporte:</strong> Conforme necessidade</p>
            <p><strong>Seguro de Vida:</strong> Incluso</p>
          </div>
          <div>
            <p><strong>Auxílio Creche:</strong> R$ 400,00/mês</p>
            <p><strong>Plano Odontológico:</strong> Incluso</p>
            <p><strong>Participação nos Lucros:</strong> Anual</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiosReadOnly;
