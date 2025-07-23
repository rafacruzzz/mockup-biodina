
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DadosPessoais } from "@/types/colaborador";

interface DadosPessoaisTabProps {
  formData: DadosPessoais;
  onInputChange: (field: keyof DadosPessoais, value: string) => void;
}

const DadosPessoaisTab = ({ formData, onInputChange }: DadosPessoaisTabProps) => {
  const sexoOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'outro', label: 'Outro' },
    { value: 'nao-informar', label: 'Não informar' }
  ];

  const generoOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'nao-binario', label: 'Não-binário' },
    { value: 'transgenero', label: 'Transgênero' },
    { value: 'outro', label: 'Outro' },
    { value: 'nao-informar', label: 'Prefiro não informar' }
  ];

  const etniaOptions = [
    { value: 'branca', label: 'Branca' },
    { value: 'preta', label: 'Preta' },
    { value: 'parda', label: 'Parda' },
    { value: 'amarela', label: 'Amarela' },
    { value: 'indigena', label: 'Indígena' },
    { value: 'nao-declarar', label: 'Não declarar' }
  ];

  const ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome *</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => onInputChange('nome', e.target.value)}
            placeholder="Digite o nome completo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={(e) => onInputChange('cpf', e.target.value)}
            placeholder="000.000.000-00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pis">PIS</Label>
          <Input
            id="pis"
            value={formData.pis}
            onChange={(e) => onInputChange('pis', e.target.value)}
            placeholder="Digite o PIS"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="idade">Idade</Label>
          <Input
            id="idade"
            type="number"
            value={formData.idade}
            onChange={(e) => onInputChange('idade', e.target.value)}
            placeholder="Digite a idade"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataNascimento">Data de Nascimento</Label>
          <Input
            id="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={(e) => onInputChange('dataNascimento', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sexo">Sexo</Label>
          <Select value={formData.sexo} onValueChange={(value) => onInputChange('sexo', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o sexo" />
            </SelectTrigger>
            <SelectContent>
              {sexoOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="genero">Gênero</Label>
          <Select value={formData.genero} onValueChange={(value) => onInputChange('genero', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o gênero" />
            </SelectTrigger>
            <SelectContent>
              {generoOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="etnia">Etnia</Label>
          <Select value={formData.etnia} onValueChange={(value) => onInputChange('etnia', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a etnia" />
            </SelectTrigger>
            <SelectContent>
              {etniaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rg">RG</Label>
          <Input
            id="rg"
            value={formData.rg}
            onChange={(e) => onInputChange('rg', e.target.value)}
            placeholder="Digite o RG"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="orgaoExpedidorRg">Órgão Expedidor do RG</Label>
          <Input
            id="orgaoExpedidorRg"
            value={formData.orgaoExpedidorRg}
            onChange={(e) => onInputChange('orgaoExpedidorRg', e.target.value)}
            placeholder="Ex: SSP, PC, PM"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ufEmissorRg">UF Emissor do RG</Label>
          <Select value={formData.ufEmissorRg} onValueChange={(value) => onInputChange('ufEmissorRg', value)}>
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
          <Label htmlFor="dataExpedicaoRg">Data de Expedição do RG</Label>
          <Input
            id="dataExpedicaoRg"
            type="date"
            value={formData.dataExpedicaoRg}
            onChange={(e) => onInputChange('dataExpedicaoRg', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="naturalidade">Naturalidade</Label>
          <Input
            id="naturalidade"
            value={formData.naturalidade}
            onChange={(e) => onInputChange('naturalidade', e.target.value)}
            placeholder="Cidade de nascimento"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nomeMae">Nome da Mãe</Label>
          <Input
            id="nomeMae"
            value={formData.nomeMae}
            onChange={(e) => onInputChange('nomeMae', e.target.value)}
            placeholder="Digite o nome da mãe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nomePai">Nome do Pai</Label>
          <Input
            id="nomePai"
            value={formData.nomePai}
            onChange={(e) => onInputChange('nomePai', e.target.value)}
            placeholder="Digite o nome do pai"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cid">CID</Label>
          <Input
            id="cid"
            value={formData.cid}
            onChange={(e) => onInputChange('cid', e.target.value)}
            placeholder="Digite o CID"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="Digite o email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            value={formData.telefone}
            onChange={(e) => onInputChange('telefone', e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endereco">Endereço</Label>
          <Input
            id="endereco"
            value={formData.endereco}
            onChange={(e) => onInputChange('endereco', e.target.value)}
            placeholder="Digite o endereço"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bairro">Bairro</Label>
          <Input
            id="bairro"
            value={formData.bairro}
            onChange={(e) => onInputChange('bairro', e.target.value)}
            placeholder="Digite o bairro"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          value={formData.observacoes}
          onChange={(e) => onInputChange('observacoes', e.target.value)}
          placeholder="Digite observações gerais sobre o colaborador..."
          rows={4}
        />
      </div>
    </div>
  );
};

export default DadosPessoaisTab;
