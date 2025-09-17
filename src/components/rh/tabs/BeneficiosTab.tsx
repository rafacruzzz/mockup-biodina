
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Heart, Bus, UtensilsCrossed, Calendar, AlertCircle } from "lucide-react";
import { Beneficios, DependentePlanoSaude } from "@/types/colaborador";
import DependentePlanoSaudeManager from "../DependentePlanoSaudeManager";

interface BeneficiosTabProps {
  formData: Beneficios;
  onInputChange: (field: keyof Beneficios, value: string) => void;
}

const BeneficiosTab = ({ formData, onInputChange }: BeneficiosTabProps) => {
  const modalidadesValeTransporte = [
    { value: 'rio-card', label: 'Rio Card' },
    { value: 'jae', label: 'Jaé' },
    { value: 'banco', label: 'Banco' },
    { value: 'sptrans', label: 'SPTrans' },
    { value: 'top', label: 'TOP' },
    { value: 'vale-combustivel', label: 'Vale Combustível' },
    { value: 'outros', label: 'Outros' }
  ];

  const operadorasPlanoSaude = [
    { value: 'porto-seguro', label: 'Porto Seguro' },
    { value: 'sul-america', label: 'Sul América' },
    { value: 'bradesco', label: 'Bradesco Saúde' },
    { value: 'amil', label: 'Amil' }
  ];

  const handleValeTransporteChange = (field: string, value: string) => {
    onInputChange('valeTransporte' as keyof Beneficios, JSON.stringify({
      ...formData.valeTransporte,
      [field]: value
    }));
  };

  const handleValeAlimentacaoChange = (field: string, value: string) => {
    onInputChange('valeAlimentacao' as keyof Beneficios, JSON.stringify({
      ...formData.valeAlimentacao,
      [field]: value
    }));
  };

  const handlePlanoSaudeChange = (field: string, value: string | boolean) => {
    onInputChange('planoSaude' as keyof Beneficios, JSON.stringify({
      ...formData.planoSaude,
      [field]: value
    }));
  };

  const handleAddDependentePlano = () => {
    const novoDependente: DependentePlanoSaude = {
      id: Date.now().toString(),
      nomeCompleto: '',
      documento: '',
      dataNascimento: ''
    };

    onInputChange('planoSaude' as keyof Beneficios, JSON.stringify({
      ...formData.planoSaude,
      dependentes: [...formData.planoSaude.dependentes, novoDependente]
    }));
  };

  const handleRemoveDependentePlano = (id: string) => {
    onInputChange('planoSaude' as keyof Beneficios, JSON.stringify({
      ...formData.planoSaude,
      dependentes: formData.planoSaude.dependentes.filter(dep => dep.id !== id)
    }));
  };

  const handleDependentePlanoChange = (id: string, field: keyof DependentePlanoSaude, value: string) => {
    const dependentesAtualizados = formData.planoSaude.dependentes.map(dep =>
      dep.id === id ? { ...dep, [field]: value } : dep
    );

    onInputChange('planoSaude' as keyof Beneficios, JSON.stringify({
      ...formData.planoSaude,
      dependentes: dependentesAtualizados
    }));
  };

  return (
    <div className="space-y-6">
      {/* Vale-Transporte */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Bus className="h-5 w-5" />
            Vale-Transporte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modalidade">Modalidade</Label>
              <Select 
                value={formData.valeTransporte?.modalidade || ''} 
                onValueChange={(value) => handleValeTransporteChange('modalidade', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a modalidade" />
                </SelectTrigger>
                <SelectContent>
                  {modalidadesValeTransporte.map((modalidade) => (
                    <SelectItem key={modalidade.value} value={modalidade.value}>
                      {modalidade.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataSolicitacaoCartaoVT">Data da Solicitação do Cartão</Label>
              <Input
                id="dataSolicitacaoCartaoVT"
                type="date"
                value={formData.valeTransporte?.dataSolicitacaoCartao || ''}
                onChange={(e) => handleValeTransporteChange('dataSolicitacaoCartao', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataPagamentoVT">Data de Pagamento</Label>
              <div className="relative">
                <Input
                  id="dataPagamentoVT"
                  type="date"
                  value={formData.valeTransporte?.dataPagamento || ''}
                  onChange={(e) => handleValeTransporteChange('dataPagamento', e.target.value)}
                />
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                  <Calendar className="h-3 w-3" />
                  <span>Último dia útil do mês</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vale-Alimentação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <UtensilsCrossed className="h-5 w-5" />
            Vale-Alimentação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataSolicitacaoCartaoVA">Data da Solicitação do Cartão</Label>
              <Input
                id="dataSolicitacaoCartaoVA"
                type="date"
                value={formData.valeAlimentacao?.dataSolicitacaoCartao || ''}
                onChange={(e) => handleValeAlimentacaoChange('dataSolicitacaoCartao', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataPagamentoVA">Data de Pagamento</Label>
              <div className="relative">
                <Input
                  id="dataPagamentoVA"
                  type="date"
                  value={formData.valeAlimentacao?.dataPagamento || ''}
                  onChange={(e) => handleValeAlimentacaoChange('dataPagamento', e.target.value)}
                />
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                  <Calendar className="h-3 w-3" />
                  <span>Última sexta-feira do mês</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plano de Saúde */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Heart className="h-5 w-5" />
            Plano de Saúde
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="operadora">Operadora</Label>
              <Select 
                value={formData.planoSaude?.operadora || ''} 
                onValueChange={(value) => handlePlanoSaudeChange('operadora', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a operadora" />
                </SelectTrigger>
                <SelectContent>
                  {operadorasPlanoSaude.map((operadora) => (
                    <SelectItem key={operadora.value} value={operadora.value}>
                      {operadora.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataSolicitacaoPS">Data da Solicitação do Plano</Label>
              <Input
                id="dataSolicitacaoPS"
                type="date"
                value={formData.planoSaude?.dataSolicitacao || ''}
                onChange={(e) => handlePlanoSaudeChange('dataSolicitacao', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vigenciaInicio">Vigência (Início)</Label>
              <Input
                id="vigenciaInicio"
                type="date"
                value={formData.planoSaude?.vigenciaInicio || ''}
                onChange={(e) => handlePlanoSaudeChange('vigenciaInicio', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoPlanoPS">Tipo de Plano</Label>
              <Input
                id="tipoPlanoPS"
                value={formData.planoSaude?.tipoPlano || ''}
                onChange={(e) => handlePlanoSaudeChange('tipoPlano', e.target.value)}
                placeholder="Descreva o tipo de plano"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Possui dependentes no plano?</Label>
              <RadioGroup
                value={formData.planoSaude?.possuiDependentes ? 'sim' : 'nao'}
                onValueChange={(value) => handlePlanoSaudeChange('possuiDependentes', value === 'sim')}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="dependentes-sim" />
                  <Label htmlFor="dependentes-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="dependentes-nao" />
                  <Label htmlFor="dependentes-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.planoSaude?.possuiDependentes && (
              <DependentePlanoSaudeManager
                dependentes={formData.planoSaude.dependentes}
                onAddDependente={handleAddDependentePlano}
                onRemoveDependente={handleRemoveDependentePlano}
                onDependenteChange={handleDependentePlanoChange}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Campos de compatibilidade (mantidos para não quebrar dados existentes) */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            Dados de Compatibilidade (Sistema Anterior)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipoPlano">Tipo de Plano (Legado)</Label>
              <Input
                id="tipoPlano"
                value={formData.tipoPlano}
                onChange={(e) => onInputChange('tipoPlano', e.target.value)}
                placeholder="Plano básico, intermediário, etc."
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantidadeDependentesPlano">Quantidade de Dependentes (Legado)</Label>
              <Input
                id="quantidadeDependentesPlano"
                type="number"
                value={formData.quantidadeDependentesPlano}
                onChange={(e) => onInputChange('quantidadeDependentesPlano', e.target.value)}
                placeholder="Número de dependentes"
                min="0"
                className="bg-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BeneficiosTab;
