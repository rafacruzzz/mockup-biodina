
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DadosProfissionais } from "@/types/colaborador";

interface DadosProfissionaisTabProps {
  formData: DadosProfissionais;
  onInputChange: (field: keyof DadosProfissionais, value: string | boolean) => void;
}

const DadosProfissionaisTab = ({ formData, onInputChange }: DadosProfissionaisTabProps) => {
  const ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const niveis = [
    { value: 'junior', label: 'Júnior' },
    { value: 'pleno', label: 'Pleno' },
    { value: 'senior', label: 'Sênior' },
    { value: 'especialista', label: 'Especialista' },
    { value: 'coordenador', label: 'Coordenador' },
    { value: 'gerente', label: 'Gerente' },
    { value: 'diretor', label: 'Diretor' }
  ];

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
          <Input
            id="setor"
            value={formData.setor}
            onChange={(e) => onInputChange('setor', e.target.value)}
            placeholder="Digite o setor"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="funcao">Função *</Label>
          <Input
            id="funcao"
            value={formData.funcao}
            onChange={(e) => onInputChange('funcao', e.target.value)}
            placeholder="Digite a função"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cargo">Cargo *</Label>
          <Input
            id="cargo"
            value={formData.cargo}
            onChange={(e) => onInputChange('cargo', e.target.value)}
            placeholder="Digite o cargo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nivel">Nível</Label>
          <Select value={formData.nivel} onValueChange={(value) => onInputChange('nivel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o nível" />
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
