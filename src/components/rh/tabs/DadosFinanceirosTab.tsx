
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DadosFinanceiros, DependenteIR } from "@/types/colaborador";
import { AlertCircle, Plus, Trash2 } from "lucide-react";

interface DadosFinanceirosTabProps {
  formData: DadosFinanceiros & {
    sugestaoSalario?: string;
    breakdownSalarial?: string;
    planoCarreira?: string;
  };
  onInputChange: (field: keyof DadosFinanceiros, value: string | boolean | DependenteIR[]) => void;
}

const DadosFinanceirosTab = ({ formData, onInputChange }: DadosFinanceirosTabProps) => {
  const handleAddDependente = () => {
    const novoDependente: DependenteIR = {
      id: Date.now().toString(),
      nome: '',
      documento: '',
      idade: 0,
      grauParentesco: '',
      rg: '',
      dataNascimento: ''
    };
    const novosDependentes = [...formData.dependentesIR, novoDependente];
    onInputChange('dependentesIR', novosDependentes);
  };

  const handleRemoveDependente = (id: string) => {
    const dependentesFiltrados = formData.dependentesIR.filter(dep => dep.id !== id);
    onInputChange('dependentesIR', dependentesFiltrados);
  };

  const handleDependenteChange = (id: string, field: keyof DependenteIR, value: string | number) => {
    const dependentesAtualizados = formData.dependentesIR.map(dep => 
      dep.id === id ? { ...dep, [field]: value } : dep
    );
    onInputChange('dependentesIR', dependentesAtualizados);
  };

  return (
    <div className="space-y-6">
      {/* Seção de Sugestão Salarial */}
      {formData.sugestaoSalario && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Sugestão Salarial do Sistema</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Valor Sugerido:</span>
              <span className="font-bold text-lg text-green-800">{formData.sugestaoSalario}</span>
            </div>
            
            {formData.breakdownSalarial && (
              <p className="text-xs text-green-600">
                {formData.breakdownSalarial}
              </p>
            )}
            
            {formData.planoCarreira && (
              <p className="text-xs text-green-600">
                Baseado no: {formData.planoCarreira}
              </p>
            )}
          </div>
          
          <div className="mt-3 p-3 bg-green-100 rounded-md">
            <p className="text-xs text-green-700">
              💡 Esta é uma sugestão baseada no plano de carreira. Você pode aceitar este valor ou definir um valor personalizado nos campos abaixo.
            </p>
          </div>
        </div>
      )}

      {/* Valores Salariais */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Valores Salariais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salarioBase">Salário Base</Label>
            <Input
              id="salarioBase"
              type="number"
              step="0.01"
              value={formData.salarioBase}
              onChange={(e) => onInputChange('salarioBase', e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adicionalNivel">Adicional Nível</Label>
            <Input
              id="adicionalNivel"
              type="number"
              step="0.01"
              value={formData.adicionalNivel}
              onChange={(e) => onInputChange('adicionalNivel', e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insalubridade">Insalubridade</Label>
            <Input
              id="insalubridade"
              type="number"
              step="0.01"
              value={formData.insalubridade}
              onChange={(e) => onInputChange('insalubridade', e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sobreaviso">Sobreaviso</Label>
            <Input
              id="sobreaviso"
              type="number"
              step="0.01"
              value={formData.sobreaviso}
              onChange={(e) => onInputChange('sobreaviso', e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salarioBruto">Salário Bruto</Label>
            <Input
              id="salarioBruto"
              type="number"
              step="0.01"
              value={formData.salarioBruto}
              onChange={(e) => onInputChange('salarioBruto', e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valorHoraTrabalhada">Valor da Hora Trabalhada</Label>
            <Input
              id="valorHoraTrabalhada"
              type="number"
              step="0.01"
              value={formData.valorHoraTrabalhada}
              onChange={(e) => onInputChange('valorHoraTrabalhada', e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pisoSalarial">Piso Salarial</Label>
            <Input
              id="pisoSalarial"
              type="number"
              step="0.01"
              value={formData.pisoSalarial}
              onChange={(e) => onInputChange('pisoSalarial', e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mediaSalarial">Média Salarial</Label>
            <Input
              id="mediaSalarial"
              type="number"
              step="0.01"
              value={formData.mediaSalarial}
              onChange={(e) => onInputChange('mediaSalarial', e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>
        </div>
      </div>

      {/* Configurações Especiais */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Configurações Especiais</h3>
        
        {/* Adiantamento Salarial */}
        <div className="space-y-4 mb-6">
          <div className="space-y-3">
            <Label>Deseja receber adiantamento de salário dia 20?</Label>
            <RadioGroup 
              value={formData.adiantamentoSalarial ? "sim" : "nao"}
              onValueChange={(value) => onInputChange('adiantamentoSalarial', value === "sim")}
              className="flex flex-row space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="adiantamento-sim" />
                <Label htmlFor="adiantamento-sim">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="adiantamento-nao" />
                <Label htmlFor="adiantamento-nao">Não</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Dependentes para IR */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Dependentes para IR</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddDependente}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar Dependente
            </Button>
          </div>

          {formData.dependentesIR.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum dependente cadastrado.</p>
              <p className="text-sm">Clique em "Adicionar Dependente" para começar.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.dependentesIR.map((dependente) => (
                <Card key={dependente.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-sm font-medium">Dependente</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDependente(dependente.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor={`nome-${dependente.id}`}>Nome Completo</Label>
                      <Input
                        id={`nome-${dependente.id}`}
                        value={dependente.nome}
                        onChange={(e) => handleDependenteChange(dependente.id, 'nome', e.target.value)}
                        placeholder="Nome do dependente"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`grauParentesco-${dependente.id}`}>Grau de Parentesco</Label>
                      <Input
                        id={`grauParentesco-${dependente.id}`}
                        value={dependente.grauParentesco}
                        onChange={(e) => handleDependenteChange(dependente.id, 'grauParentesco', e.target.value)}
                        placeholder="Ex: Filho(a), Cônjuge"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`documento-${dependente.id}`}>CPF</Label>
                      <Input
                        id={`documento-${dependente.id}`}
                        value={dependente.documento}
                        onChange={(e) => handleDependenteChange(dependente.id, 'documento', e.target.value)}
                        placeholder="000.000.000-00"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`rg-${dependente.id}`}>RG</Label>
                      <Input
                        id={`rg-${dependente.id}`}
                        value={dependente.rg}
                        onChange={(e) => handleDependenteChange(dependente.id, 'rg', e.target.value)}
                        placeholder="00.000.000-0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`dataNascimento-${dependente.id}`}>Data de Nascimento</Label>
                      <Input
                        id={`dataNascimento-${dependente.id}`}
                        type="date"
                        value={dependente.dataNascimento}
                        onChange={(e) => handleDependenteChange(dependente.id, 'dataNascimento', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`idade-${dependente.id}`}>Idade</Label>
                      <Input
                        id={`idade-${dependente.id}`}
                        type="number"
                        min="0"
                        max="100"
                        value={dependente.idade || ''}
                        onChange={(e) => handleDependenteChange(dependente.id, 'idade', parseInt(e.target.value) || 0)}
                        placeholder="Idade"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DadosFinanceirosTab;
