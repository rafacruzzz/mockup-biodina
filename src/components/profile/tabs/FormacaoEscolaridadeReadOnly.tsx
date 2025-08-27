
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
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
          <Badge variant={data.possuiDiploma ? "default" : "secondary"}>
            {data.possuiDiploma ? "Sim" : "Não"}
          </Badge>
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

      {/* Aviso sobre formação */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-green-600" />
          <div>
            <h3 className="font-semibold text-green-800">Atualização de Formação</h3>
            <p className="text-sm text-green-700">
              Concluiu novos cursos ou formações? Para solicitar a atualização dos seus dados acadêmicos, utilize o módulo de Solicitações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormacaoEscolaridadeReadOnly;
