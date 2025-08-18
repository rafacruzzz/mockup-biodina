
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { DadosPessoais } from "@/types/colaborador";
import { useCepLookup } from "@/hooks/useCepLookup";
import { calculateAge } from "@/utils/ageCalculator";
import { useEffect } from "react";

interface DadosPessoaisTabProps {
  formData: DadosPessoais;
  onInputChange: (field: keyof DadosPessoais, value: string | File) => void;
}

const DadosPessoaisTab = ({ formData, onInputChange }: DadosPessoaisTabProps) => {
  const { lookupCep, loading: cepLoading, error: cepError } = useCepLookup();

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

  const estadoCivilOptions = [
    { value: 'solteiro', label: 'Solteiro(a)' },
    { value: 'casado', label: 'Casado(a)' },
    { value: 'divorciado', label: 'Divorciado(a)' },
    { value: 'viuvo', label: 'Viúvo(a)' },
    { value: 'uniao-estavel', label: 'União Estável' }
  ];

  const simNaoNaoInformadoOptions = [
    { value: 'sim', label: 'Sim' },
    { value: 'nao', label: 'Não' },
    { value: 'nao-informado', label: 'Não informado' }
  ];

  const ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Calculate age automatically when date of birth changes
  useEffect(() => {
    if (formData.dataNascimento) {
      const calculatedAge = calculateAge(formData.dataNascimento);
      if (calculatedAge !== formData.idade) {
        onInputChange('idade', calculatedAge);
      }
    }
  }, [formData.dataNascimento, formData.idade, onInputChange]);

  const handleCepChange = async (cep: string) => {
    onInputChange('cep', cep);
    
    // Remove non-numeric characters and check if CEP is complete
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      const cepData = await lookupCep(cleanCep);
      if (cepData) {
        onInputChange('endereco', cepData.logradouro);
        onInputChange('bairro', cepData.bairro);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onInputChange('comprovanteResidencia', file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dados Básicos */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Dados Básicos</h3>
        
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
            <Label htmlFor="estadoCivil">Estado Civil</Label>
            <Select value={formData.estadoCivil} onValueChange={(value) => onInputChange('estadoCivil', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estado civil" />
              </SelectTrigger>
              <SelectContent>
                {estadoCivilOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nacionalidade">Nacionalidade</Label>
            <Input
              id="nacionalidade"
              value={formData.nacionalidade}
              onChange={(e) => onInputChange('nacionalidade', e.target.value)}
              placeholder="Ex: Brasileira"
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
            <Label htmlFor="idade">Idade</Label>
            <Input
              id="idade"
              type="number"
              value={formData.idade}
              onChange={(e) => onInputChange('idade', e.target.value)}
              placeholder="Calculado automaticamente"
              className="bg-gray-50"
              readOnly
            />
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
        </div>
      </div>

      {/* Documentação */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Documentação</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Endereço */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Endereço</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <div className="relative">
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => handleCepChange(e.target.value)}
                placeholder="00000-000"
                maxLength={9}
              />
              {cepLoading && <span className="text-sm text-blue-600">Buscando...</span>}
              {cepError && <span className="text-sm text-red-600">{cepError}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => onInputChange('endereco', e.target.value)}
              placeholder="Rua/Avenida (preenchido automaticamente)"
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numeroResidencia">Número da Residência</Label>
            <Input
              id="numeroResidencia"
              value={formData.numeroResidencia}
              onChange={(e) => onInputChange('numeroResidencia', e.target.value)}
              placeholder="Digite o número"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="complemento">Complemento</Label>
            <Input
              id="complemento"
              value={formData.complemento}
              onChange={(e) => onInputChange('complemento', e.target.value)}
              placeholder="Apto, Bloco, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bairro">Bairro</Label>
            <Input
              id="bairro"
              value={formData.bairro}
              onChange={(e) => onInputChange('bairro', e.target.value)}
              placeholder="Bairro (preenchido automaticamente)"
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comprovanteResidencia">Comprovante de Residência</Label>
            <div className="flex items-center gap-2">
              <Input
                id="comprovanteResidencia"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('comprovanteResidencia')?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {formData.comprovanteResidencia ? 'Alterar arquivo' : 'Selecionar arquivo'}
              </Button>
              {formData.comprovanteResidencia && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  {formData.comprovanteResidencia.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Informações Familiares */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Informações Familiares</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Informações de Saúde */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Informações de Saúde</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pcd">PCD?</Label>
            <Select value={formData.pcd} onValueChange={(value) => onInputChange('pcd', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                {simNaoNaoInformadoOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doencaPreExistente">Há doença pré-existente?</Label>
            <Select value={formData.doencaPreExistente} onValueChange={(value) => onInputChange('doencaPreExistente', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                {simNaoNaoInformadoOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contato */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Contato</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Observações */}
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
