
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DadosProfissionais } from '@/types/colaborador';

interface DadosProfissionaisReadOnlyProps {
  data: DadosProfissionais;
}

const DadosProfissionaisReadOnly = ({ data }: DadosProfissionaisReadOnlyProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Empresa</Label>
          <Input value={data.empresa} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>UF</Label>
          <Input value={data.uf} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>Setor</Label>
          <Input value={data.setor} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>Função</Label>
          <Input value={data.funcao} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>Cargo</Label>
          <Input value={data.cargo} readOnly className="bg-gray-50" />
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
          <Input value={data.cbo} readOnly className="bg-gray-50" />
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
          <Textarea
            value={data.funcoesDesempenhadas}
            readOnly
            className="bg-gray-50 resize-none"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default DadosProfissionaisReadOnly;
