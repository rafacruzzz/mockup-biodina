
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit3, AlertCircle } from 'lucide-react';
import { FormacaoEscolaridade } from '@/types/colaborador';
import SolicitacaoAlteracaoModal from '../SolicitacaoAlteracaoModal';

interface FormacaoEscolaridadeReadOnlyProps {
  data: FormacaoEscolaridade;
}

const FormacaoEscolaridadeReadOnly = ({ data }: FormacaoEscolaridadeReadOnlyProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleSolicitarAlteracao = (campo: string, valor: string) => {
    setSelectedField(campo);
    setSelectedValue(valor);
    setModalOpen(true);
  };

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
          <div className="flex items-center gap-2">
            <Input
              value={getEscolaridadeNome(data.escolaridade)}
              readOnly
              className="bg-gray-50"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Escolaridade', getEscolaridadeNome(data.escolaridade))}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Possui Diploma</Label>
          <div className="flex items-center gap-2">
            <Badge variant={data.possuiDiploma ? "default" : "secondary"}>
              {data.possuiDiploma ? "Sim" : "Não"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Possui Diploma', data.possuiDiploma ? "Sim" : "Não")}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Informações adicionais específicas para Danilo */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-blue-800">Detalhes da Formação</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSolicitarAlteracao('Detalhes da Formação', 'Informações sobre curso e instituição')}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Curso:</strong> Bacharel em Sistemas de Informação</p>
          <p><strong>Instituição:</strong> Universidade de Brasília (UnB)</p>
          <p><strong>Ano de Conclusão:</strong> 2010</p>
          <p><strong>Situação:</strong> Concluído com diploma registrado</p>
        </div>
      </div>

      {/* Aviso sobre formação */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Atualização de Formação</h3>
              <p className="text-sm text-green-700">
                Concluiu novos cursos ou formações? Solicite a atualização dos seus dados acadêmicos.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => handleSolicitarAlteracao('Formação e Escolaridade', 'Atualização de dados acadêmicos')}
            className="text-green-600 hover:text-green-800"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Solicitar Atualização
          </Button>
        </div>
      </div>

      <SolicitacaoAlteracaoModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        campoSelecionado={selectedField}
        valorAtual={selectedValue}
        aba="Formação e Escolaridade"
      />
    </div>
  );
};

export default FormacaoEscolaridadeReadOnly;
