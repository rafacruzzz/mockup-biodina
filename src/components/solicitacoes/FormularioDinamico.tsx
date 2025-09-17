
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TipoSolicitacao } from '@/types/solicitacao';
import { useUser } from '@/contexts/UserContext';

interface FormularioDinamicoProps {
  tipoSolicitacao: TipoSolicitacao;
  onSubmit: (dados: Record<string, any>) => void;
}

const FormularioDinamico = ({ tipoSolicitacao, onSubmit }: FormularioDinamicoProps) => {
  const { user } = useUser();
  const [dadosFormulario, setDadosFormulario] = useState<Record<string, any>>({
    // Campo comum
    expectativa_conclusao: ''
  });

  const handleInputChange = (fieldId: string, value: any) => {
    setDadosFormulario(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    const camposObrigatorios = tipoSolicitacao.campos.filter(c => c.obrigatorio);
    const camposFaltando = camposObrigatorios.filter(c => !dadosFormulario[c.id]);
    
    if (camposFaltando.length > 0) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    onSubmit(dadosFormulario);
  };

  const renderField = (campo: any) => {
    const value = dadosFormulario[campo.id] || '';

    switch (campo.tipo) {
      case 'text':
      case 'number':
        return (
          <Input
            type={campo.tipo}
            value={value}
            onChange={(e) => handleInputChange(campo.id, e.target.value)}
            placeholder={campo.placeholder}
            required={campo.obrigatorio}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(campo.id, e.target.value)}
            placeholder={campo.placeholder}
            required={campo.obrigatorio}
            rows={3}
          />
        );

      case 'select':
        return (
          <Select 
            value={value} 
            onValueChange={(newValue) => handleInputChange(campo.id, newValue)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              {campo.opcoes?.map((opcao: string) => (
                <SelectItem key={opcao} value={opcao}>
                  {opcao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(campo.id, e.target.value)}
            required={campo.obrigatorio}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={campo.id}
              checked={value || false}
              onCheckedChange={(checked) => handleInputChange(campo.id, checked)}
            />
            <Label htmlFor={campo.id} className="text-sm font-normal">
              Sim
            </Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup
            value={value}
            onValueChange={(newValue) => handleInputChange(campo.id, newValue)}
          >
            {campo.opcoes?.map((opcao: string) => (
              <div key={opcao} className="flex items-center space-x-2">
                <RadioGroupItem value={opcao} id={`${campo.id}-${opcao}`} />
                <Label htmlFor={`${campo.id}-${opcao}`} className="text-sm font-normal">
                  {opcao}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'file':
        return (
          <Input
            type="file"
            onChange={(e) => handleInputChange(campo.id, e.target.files?.[0])}
            required={campo.obrigatorio}
            multiple
          />
        );

      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleInputChange(campo.id, e.target.value)}
            placeholder={campo.placeholder}
            required={campo.obrigatorio}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Campos Comuns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações Gerais</CardTitle>
          <CardDescription>
            Campos obrigatórios para todas as solicitações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome-solicitante">Nome do Solicitante</Label>
            <Input
              id="nome-solicitante"
              value={user?.name || ''}
              disabled
              className="bg-gray-50"
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="expectativa">Expectativa de Conclusão</Label>
            <Input
              id="expectativa"
              type="date"
              value={dadosFormulario.expectativa_conclusao}
              onChange={(e) => handleInputChange('expectativa_conclusao', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Campos Específicos */}
      {tipoSolicitacao.campos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações Específicas</CardTitle>
            <CardDescription>
              Campos específicos para {tipoSolicitacao.nome}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tipoSolicitacao.campos.map((campo) => {
              // Verifica se o campo é dependente de outro
              if (campo.dependente_de) {
                const campoMestre = tipoSolicitacao.campos.find(c => c.id === campo.dependente_de);
                const valorMestre = dadosFormulario[campo.dependente_de];
                
                // Para o caso específico da segunda parcela de férias
                if (campo.id === 'segunda_parcela_inicio' && valorMestre !== '15') {
                  return null; // Não renderiza se não for 15 dias
                }
              }

              return (
                <div key={campo.id} className="space-y-2">
                  <Label htmlFor={campo.id}>
                    {campo.label}
                    {campo.obrigatorio && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {renderField(campo)}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Botões */}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline">
          Salvar Rascunho
        </Button>
        <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
          <Send className="h-4 w-4 mr-2" />
          Enviar Solicitação
        </Button>
      </div>
    </form>
  );
};

export default FormularioDinamico;
