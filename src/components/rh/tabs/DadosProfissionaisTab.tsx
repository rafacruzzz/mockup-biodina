
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DadosProfissionais } from "@/types/colaborador";
import { modules } from "@/data/rhModules";
import { calcularSugestaoSalarial, obterCargosDisponiveis } from "@/utils/planoCarreiraUtils";
import { useEffect, useState } from "react";
import { AlertCircle, TrendingUp } from "lucide-react";

interface DadosProfissionaisTabProps {
  formData: DadosProfissionais & {
    planoCarreira?: string;
    sugestaoSalario?: string;
    breakdownSalarial?: string;
  };
  onInputChange: (field: string, value: string | boolean) => void;
}

const DadosProfissionaisTab = ({ formData, onInputChange }: DadosProfissionaisTabProps) => {
  const [cargosDisponiveis, setCargosDisponiveis] = useState<string[]>([]);
  
  const ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const niveis = [
    { value: '1', label: 'Nível 1' },
    { value: '2', label: 'Nível 2' },
    { value: '3', label: 'Nível 3' },
    { value: '4', label: 'Nível 4' },
    { value: '5', label: 'Nível 5' }
  ];

  const setoresList = modules.departamentos.subModules.setores.data;
  const funcoesList = modules.departamentos.subModules.funcoes.data;

  // Buscar o setor selecionado
  const setorSelecionado = setoresList.find(setor => setor.nome === formData.setor);

  // Filtrar funções baseadas no setor selecionado
  const funcoesDisponiveis = setorSelecionado 
    ? funcoesList.filter(funcao => setorSelecionado.funcoes?.includes(funcao.id!))
    : [];

  // Atualizar cargos disponíveis quando empresa/UF mudar
  useEffect(() => {
    if (formData.empresa && formData.uf) {
      const cargos = obterCargosDisponiveis(formData.empresa, formData.uf);
      setCargosDisponiveis(cargos);
    } else {
      setCargosDisponiveis([]);
    }
  }, [formData.empresa, formData.uf]);

  // Calcular sugestão salarial quando cargo e nível mudarem
  useEffect(() => {
    if (formData.empresa && formData.uf && formData.cargo && formData.nivel) {
      const sugestao = calcularSugestaoSalarial(
        formData.empresa,
        formData.uf,
        formData.cargo,
        formData.nivel
      );

      if (sugestao) {
        onInputChange('planoCarreira', sugestao.planoCarreira);
        onInputChange('sugestaoSalario', `R$ ${sugestao.salarioTotal.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`);
        onInputChange('breakdownSalarial', sugestao.breakdown);
      } else {
        onInputChange('planoCarreira', '');
        onInputChange('sugestaoSalario', '');
        onInputChange('breakdownSalarial', '');
      }
    }
  }, [formData.empresa, formData.uf, formData.cargo, formData.nivel, onInputChange]);

  const handleSetorChange = (value: string) => {
    onInputChange('setor', value);
    // Limpar função quando setor mudar
    onInputChange('funcao', '');
  };

  const handleCargoChange = (value: string) => {
    onInputChange('cargo', value);
    // Limpar nível quando cargo mudar
    onInputChange('nivel', '');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="empresa">Empresa *</Label>
          <Input
            id="empresa"
            value={formData.empresa}
            onChange={(e) => onInputChange('empresa', e.target.value)}
            placeholder="Digite o nome da empresa"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="uf">UF *</Label>
          <Select value={formData.uf} onValueChange={(value) => onInputChange('uf', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a UF" />
            </SelectTrigger>
            <SelectContent>
              {ufs.map((uf) => (
                <SelectItem key={uf} value={uf}>
                  {uf}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="setor">Setor *</Label>
          <Select value={formData.setor} onValueChange={handleSetorChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o setor" />
            </SelectTrigger>
            <SelectContent>
              {setoresList.map((setor) => (
                <SelectItem key={setor.id} value={setor.nome}>
                  {setor.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="funcao">Função *</Label>
          <Select 
            value={formData.funcao} 
            onValueChange={(value) => onInputChange('funcao', value)}
            disabled={!formData.setor}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.setor ? "Selecione a função" : "Selecione primeiro o setor"} />
            </SelectTrigger>
            <SelectContent>
              {funcoesDisponiveis.map((funcao) => (
                <SelectItem key={funcao.id} value={funcao.nome}>
                  {funcao.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cargo">Cargo *</Label>
          <Select 
            value={formData.cargo} 
            onValueChange={handleCargoChange}
            disabled={!formData.empresa || !formData.uf}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.empresa && formData.uf ? "Selecione o cargo" : "Selecione empresa e UF primeiro"} />
            </SelectTrigger>
            <SelectContent>
              {cargosDisponiveis.map((cargo) => (
                <SelectItem key={cargo} value={cargo}>
                  {cargo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nivel">Nível de Progressão</Label>
          <Select 
            value={formData.nivel} 
            onValueChange={(value) => onInputChange('nivel', value)}
            disabled={!formData.cargo}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.cargo ? "Selecione o nível" : "Selecione o cargo primeiro"} />
            </SelectTrigger>
            <SelectContent>
              {niveis.map((nivel) => (
                <SelectItem key={nivel.value} value={nivel.value}>
                  {nivel.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cbo">CBO</Label>
          <Input
            id="cbo"
            value={formData.cbo}
            onChange={(e) => onInputChange('cbo', e.target.value)}
            placeholder="Digite o CBO"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataAdmissao">Data de Admissão *</Label>
          <Input
            id="dataAdmissao"
            type="date"
            value={formData.dataAdmissao}
            onChange={(e) => onInputChange('dataAdmissao', e.target.value)}
          />
        </div>

        {/* Campos informativos do plano de carreira */}
        {formData.planoCarreira && (
          <>
            <div className="space-y-2">
              <Label htmlFor="planoCarreira" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                Plano de Carreira Identificado
              </Label>
              <Input
                id="planoCarreira"
                value={formData.planoCarreira}
                readOnly
                className="bg-blue-50 border-blue-200 text-blue-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sugestaoSalario" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-green-600" />
                Sugestão Salarial
              </Label>
              <Input
                id="sugestaoSalario"
                value={formData.sugestaoSalario}
                readOnly
                className="bg-green-50 border-green-200 text-green-800 font-semibold"
              />
              {formData.breakdownSalarial && (
                <p className="text-xs text-gray-600 mt-1">
                  {formData.breakdownSalarial}
                </p>
              )}
            </div>
          </>
        )}

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
            placeholder="Ex: 2 anos e 3 meses"
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

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="compativelFuncao"
            checked={formData.compativelFuncao}
            onCheckedChange={(checked) => onInputChange('compativelFuncao', checked)}
          />
          <Label htmlFor="compativelFuncao">Compatível com a função?</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="funcoesDesempenhadas">Funções Desempenhadas</Label>
          <Textarea
            id="funcoesDesempenhadas"
            value={formData.funcoesDesempenhadas}
            onChange={(e) => onInputChange('funcoesDesempenhadas', e.target.value)}
            placeholder="Descreva as principais funções desempenhadas..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default DadosProfissionaisTab;
