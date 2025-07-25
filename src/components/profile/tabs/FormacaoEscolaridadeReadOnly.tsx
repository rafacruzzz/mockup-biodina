
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FormacaoEscolaridade } from '@/types/colaborador';

interface FormacaoEscolaridadeReadOnlyProps {
  data: FormacaoEscolaridade;
}

const FormacaoEscolaridadeReadOnly = ({ data }: FormacaoEscolaridadeReadOnlyProps) => {
  const getEscolaridadeNome = (valor: string) => {
    const escolaridades: { [key: string]: string } = {
      'fundamental-incompleto': 'Ensino Fundamental Incompleto',
      'fundamental-completo': 'Ensino Fundamental Completo',
      'medio-incompleto': 'Ensino Médio Incompleto',
      'medio-completo': 'Ensino Médio Completo',
      'tecnico': 'Ensino Técnico',
      'superior-incompleto': 'Ensino Superior Incompleto',
      'superior-completo': 'Ensino Superior Completo',
      'pos-graduacao': 'Pós-graduação',
      'mestrado': 'Mestrado',
      'doutorado': 'Doutorado'
    };
    return escolaridades[valor] || valor;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Escolaridade</Label>
          <Input
            value={getEscolaridadeNome(data.escolaridade)}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Possui Diploma</Label>
          <div className="flex items-center gap-2">
            <Badge variant={data.possuiDiploma ? "default" : "secondary"}>
              {data.possuiDiploma ? "Sim" : "Não"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Informações adicionais específicas para Danilo */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Detalhes da Formação</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Curso:</strong> Bacharel em Sistemas de Informação</p>
          <p><strong>Instituição:</strong> Universidade de Brasília (UnB)</p>
          <p><strong>Ano de Conclusão:</strong> 2010</p>
          <p><strong>Situação:</strong> Concluído com diploma registrado</p>
        </div>
      </div>
    </div>
  );
};

export default FormacaoEscolaridadeReadOnly;
