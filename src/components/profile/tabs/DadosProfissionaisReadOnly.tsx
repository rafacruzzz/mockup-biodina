
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit3, AlertCircle } from 'lucide-react';
import { DadosProfissionais } from '@/types/colaborador';
import SolicitacaoAlteracaoModal from '../SolicitacaoAlteracaoModal';

interface DadosProfissionaisReadOnlyProps {
  data: DadosProfissionais;
}

const DadosProfissionaisReadOnly = ({ data }: DadosProfissionaisReadOnlyProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleSolicitarAlteracao = (campo: string, valor: string) => {
    setSelectedField(campo);
    setSelectedValue(valor);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Empresa</Label>
          <div className="flex items-center gap-2">
            <Input value={data.empresa} readOnly className="bg-gray-50" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Empresa', data.empresa)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>UF</Label>
          <div className="flex items-center gap-2">
            <Input value={data.uf} readOnly className="bg-gray-50" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('UF', data.uf)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Setor</Label>
          <div className="flex items-center gap-2">
            <Input value={data.setor} readOnly className="bg-gray-50" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Setor', data.setor)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Função</Label>
          <div className="flex items-center gap-2">
            <Input value={data.funcao} readOnly className="bg-gray-50" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Função', data.funcao)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Cargo</Label>
          <div className="flex items-center gap-2">
            <Input value={data.cargo} readOnly className="bg-gray-50" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Cargo', data.cargo)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Nível de Progressão</Label>
          <div className="flex items-center gap-2">
            <Input value={`Nível ${data.nivel}`} readOnly className="bg-gray-50" />
            <Badge variant="secondary">Nível {data.nivel}</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <Label>CBO</Label>
          <div className="flex items-center gap-2">
            <Input value={data.cbo} readOnly className="bg-gray-50" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSolicitarAlteracao('CBO', data.cbo)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Data de Admissão</Label>
          <Input 
            value={data.dataAdmissao ? new Date(data.dataAdmissao).toLocaleDateString('pt-BR') : ''} 
            readOnly 
            className="bg-gray-50" 
          />
        </div>

        <div className="space-y-2">
          <Label>Data de Cadastro</Label>
          <Input 
            value={data.dataCadastro ? new Date(data.dataCadastro).toLocaleDateString('pt-BR') : ''} 
            readOnly 
            className="bg-gray-50" 
          />
        </div>

        <div className="space-y-2">
          <Label>Tempo de Casa</Label>
          <Input value={data.tempoCasa} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>Última Promoção</Label>
          <Input 
            value={data.ultimaPromocao ? new Date(data.ultimaPromocao).toLocaleDateString('pt-BR') : 'Não informado'} 
            readOnly 
            className="bg-gray-50" 
          />
        </div>

        <div className="space-y-2">
          <Label>Previsão de Férias</Label>
          <Input 
            value={data.previsaoFerias ? new Date(data.previsaoFerias).toLocaleDateString('pt-BR') : 'Não informado'} 
            readOnly 
            className="bg-gray-50" 
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Compatível com a função</Label>
          <div className="flex items-center gap-2">
            <Badge variant={data.compativelFuncao ? "default" : "secondary"}>
              {data.compativelFuncao ? "Sim" : "Não"}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Funções Desempenhadas</Label>
          <div className="space-y-2">
            <Textarea
              value={data.funcoesDesempenhadas}
              readOnly
              className="bg-gray-50 resize-none"
              rows={4}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Funções Desempenhadas', data.funcoesDesempenhadas)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Solicitar Alteração
            </Button>
          </div>
        </div>
      </div>

      {/* Botão geral para solicitação */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-800">Dados Incorretos?</h3>
              <p className="text-sm text-blue-700">
                Encontrou algum erro nos seus dados profissionais? Solicite uma correção ao RH.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => handleSolicitarAlteracao('Dados Profissionais', 'Dados gerais')}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Solicitar Correção
          </Button>
        </div>
      </div>

      <SolicitacaoAlteracaoModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        campoSelecionado={selectedField}
        valorAtual={selectedValue}
        aba="Dados Profissionais"
      />
    </div>
  );
};

export default DadosProfissionaisReadOnly;
