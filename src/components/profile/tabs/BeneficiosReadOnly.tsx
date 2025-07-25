
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit3, AlertCircle } from 'lucide-react';
import { Beneficios } from '@/types/colaborador';
import SolicitacaoAlteracaoModal from '../SolicitacaoAlteracaoModal';

interface BeneficiosReadOnlyProps {
  data: Beneficios;
}

const BeneficiosReadOnly = ({ data }: BeneficiosReadOnlyProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleSolicitarAlteracao = (campo: string, valor: string) => {
    setSelectedField(campo);
    setSelectedValue(valor);
    setModalOpen(true);
  };

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
          <div className="flex items-center gap-2">
            <Input
              value={`${data.quantidadeDependentesPlano} dependente${parseInt(data.quantidadeDependentesPlano) !== 1 ? 's' : ''}`}
              readOnly
              className="bg-gray-50"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Dependentes no Plano', data.quantidadeDependentesPlano)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Informações adicionais dos benefícios */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-green-800">Detalhes dos Benefícios</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSolicitarAlteracao('Detalhes dos Benefícios', 'Informações sobre plano de saúde')}
            className="text-green-600 hover:text-green-800"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
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
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-blue-800">Outros Benefícios</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSolicitarAlteracao('Outros Benefícios', 'Benefícios adicionais')}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
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

      {/* Aviso sobre alterações de benefícios */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-800">Alterações nos Benefícios</h3>
              <p className="text-sm text-orange-700">
                Mudanças nos benefícios estão sujeitas a aprovação e podem impactar seu desconto em folha.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => handleSolicitarAlteracao('Benefícios', 'Solicitação de alteração nos benefícios')}
            className="text-orange-600 hover:text-orange-800"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Solicitar Alteração
          </Button>
        </div>
      </div>

      <SolicitacaoAlteracaoModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        campoSelecionado={selectedField}
        valorAtual={selectedValue}
        aba="Benefícios"
      />
    </div>
  );
};

export default BeneficiosReadOnly;
