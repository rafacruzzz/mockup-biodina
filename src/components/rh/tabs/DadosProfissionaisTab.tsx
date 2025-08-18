import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DadosProfissionais } from '@/types/colaborador';

interface DadosProfissionaisTabProps {
  formData: DadosProfissionais & {
    planoCarreira?: string;
    sugestaoSalario?: string;
    breakdownSalarial?: string;
  };
  onInputChange: (field: string, value: any) => void;
}

const DadosProfissionaisTab = ({ formData, onInputChange }: DadosProfissionaisTabProps) => {
  return (
    <div className="space-y-6">
      {/* Dados da Empresa */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Dados da Empresa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="empresa">Empresa *</Label>
            <Input
              id="empresa"
              value={formData.empresa}
              onChange={(e) => onInputChange('empresa', e.target.value)}
              placeholder="Nome da empresa"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="uf">UF *</Label>
            <Select value={formData.uf} onValueChange={(value) => onInputChange('uf', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a UF" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DF">DF</SelectItem>
                <SelectItem value="SP">SP</SelectItem>
                <SelectItem value="RJ">RJ</SelectItem>
                <SelectItem value="MG">MG</SelectItem>
                <SelectItem value="GO">GO</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Informações de Contratação */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Informações de Contratação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tipoUsuario">Tipo de Usuário *</Label>
            <Select value={formData.tipoUsuario} onValueChange={(value) => onInputChange('tipoUsuario', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de usuário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diretoria">Diretoria</SelectItem>
                <SelectItem value="funcionario">Funcionário</SelectItem>
                <SelectItem value="autonomo">Autônomo</SelectItem>
                <SelectItem value="pj">PJ</SelectItem>
                <SelectItem value="estagio">Estágio</SelectItem>
                <SelectItem value="jovem-aprendiz">Jovem Aprendiz</SelectItem>
                <SelectItem value="externo">Externo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sindicatoVinculado">Sindicato Vinculado (se aplicável)</Label>
            <Input
              id="sindicatoVinculado"
              value={formData.sindicatoVinculado || ''}
              onChange={(e) => onInputChange('sindicatoVinculado', e.target.value)}
              placeholder="Nome do sindicato"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regimeTrabalho">Regime de Trabalho *</Label>
            <Select value={formData.regimeTrabalho} onValueChange={(value) => onInputChange('regimeTrabalho', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o regime" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="remoto">Remoto</SelectItem>
                <SelectItem value="hibrido">Híbrido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="origemContratacao">Origem da Contratação *</Label>
            <Select value={formData.origemContratacao} onValueChange={(value) => onInputChange('origemContratacao', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agencia">Agência</SelectItem>
                <SelectItem value="site-recrutamento">Site de recrutamento</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="indicacao">Indicação</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="horarioTrabalho">Horário de Trabalho</Label>
            <Input
              id="horarioTrabalho"
              value={formData.horarioTrabalho}
              onChange={(e) => onInputChange('horarioTrabalho', e.target.value)}
              placeholder="Ex: 08:00 às 17:00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargaHorariaSemanal">Carga Horária Semanal (h)</Label>
            <Input
              id="cargaHorariaSemanal"
              type="number"
              value={formData.cargaHorariaSemanal}
              onChange={(e) => onInputChange('cargaHorariaSemanal', e.target.value)}
              placeholder="Ex: 40"
              min="1"
              max="60"
            />
          </div>
        </div>
      </div>

      {/* Informações do Departamento (campos migrados) */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Informações do Departamento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="setor">Setor/Departamento *</Label>
            <Input
              id="setor"
              value={formData.setor}
              onChange={(e) => onInputChange('setor', e.target.value)}
              placeholder="Nome do setor"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nomeDepartamento">Nome Completo do Departamento</Label>
            <Input
              id="nomeDepartamento"
              value={formData.nomeDepartamento || ''}
              onChange={(e) => onInputChange('nomeDepartamento', e.target.value)}
              placeholder="Nome oficial completo do departamento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsavelDepartamento">Responsável do Departamento</Label>
            <Input
              id="responsavelDepartamento"
              value={formData.responsavelDepartamento || ''}
              onChange={(e) => onInputChange('responsavelDepartamento', e.target.value)}
              placeholder="Nome do responsável"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="descricaoDepartamento">Descrição do Departamento</Label>
            <Textarea
              id="descricaoDepartamento"
              value={formData.descricaoDepartamento || ''}
              onChange={(e) => onInputChange('descricaoDepartamento', e.target.value)}
              placeholder="Descrição das atividades e responsabilidades do departamento"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Cargo e Função */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Cargo e Função</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="funcao">Função *</Label>
            <Input
              id="funcao"
              value={formData.funcao}
              onChange={(e) => onInputChange('funcao', e.target.value)}
              placeholder="Função exercida"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo *</Label>
            <Input
              id="cargo"
              value={formData.cargo}
              onChange={(e) => onInputChange('cargo', e.target.value)}
              placeholder="Cargo ocupado"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nivel">Nível</Label>
            <Select value={formData.nivel} onValueChange={(value) => onInputChange('nivel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Nível 1</SelectItem>
                <SelectItem value="2">Nível 2</SelectItem>
                <SelectItem value="3">Nível 3</SelectItem>
                <SelectItem value="4">Nível 4</SelectItem>
                <SelectItem value="5">Nível 5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cbo">CBO (Código Brasileiro de Ocupações)</Label>
            <Input
              id="cbo"
              value={formData.cbo}
              onChange={(e) => onInputChange('cbo', e.target.value)}
              placeholder="Código CBO"
            />
          </div>
        </div>
      </div>

      {/* Compatibilidade e Funções */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Compatibilidade e Funções</h3>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="compativelFuncao"
            checked={formData.compativelFuncao}
            onCheckedChange={(checked) => onInputChange('compativelFuncao', checked)}
          />
          <Label htmlFor="compativelFuncao">Função compatível com o cargo</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="funcoesDesempenhadas">Funções Desempenhadas</Label>
          <Textarea
            id="funcoesDesempenhadas"
            value={formData.funcoesDesempenhadas}
            onChange={(e) => onInputChange('funcoesDesempenhadas', e.target.value)}
            placeholder="Descreva as principais funções e responsabilidades..."
            rows={4}
          />
        </div>
      </div>

      {/* Datas Importantes */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Datas Importantes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dataAdmissao">Data de Admissão *</Label>
            <Input
              id="dataAdmissao"
              type="date"
              value={formData.dataAdmissao}
              onChange={(e) => onInputChange('dataAdmissao', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataCadastro">Data de Cadastro</Label>
            <Input
              id="dataCadastro"
              type="date"
              value={formData.dataCadastro}
              onChange={(e) => onInputChange('dataCadastro', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tempoCasa">Tempo de Casa</Label>
            <Input
              id="tempoCasa"
              value={formData.tempoCasa}
              onChange={(e) => onInputChange('tempoCasa', e.target.value)}
              placeholder="Ex: 2 anos e 6 meses"
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ultimaPromocao">Última Promoção</Label>
            <Input
              id="ultimaPromocao"
              type="date"
              value={formData.ultimaPromocao}
              onChange={(e) => onInputChange('ultimaPromocao', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previsaoFerias">Previsão de Férias</Label>
            <Input
              id="previsaoFerias"
              type="date"
              value={formData.previsaoFerias}
              onChange={(e) => onInputChange('previsaoFerias', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Plano de Carreira e Sugestões</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="planoCarreira">Plano de Carreira</Label>
            <Textarea
              id="planoCarreira"
              value={formData.planoCarreira || ''}
              onChange={(e) => onInputChange('planoCarreira', e.target.value)}
              placeholder="Descreva o plano de carreira do colaborador..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sugestaoSalario">Sugestão de Salário</Label>
            <Input
              id="sugestaoSalario"
              value={formData.sugestaoSalario || ''}
              onChange={(e) => onInputChange('sugestaoSalario', e.target.value)}
              placeholder="Ex: R$ 5.000,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="breakdownSalarial">Breakdown Salarial</Label>
            <Textarea
              id="breakdownSalarial"
              value={formData.breakdownSalarial || ''}
              onChange={(e) => onInputChange('breakdownSalarial', e.target.value)}
              placeholder="Detalhamento da composição salarial..."
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DadosProfissionaisTab;
