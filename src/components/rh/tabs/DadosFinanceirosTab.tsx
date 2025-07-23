
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DadosFinanceiros } from "@/types/colaborador";
import { AlertCircle } from "lucide-react";

interface DadosFinanceirosTabProps {
  formData: DadosFinanceiros & {
    sugestaoSalario?: string;
    breakdownSalarial?: string;
    planoCarreira?: string;
  };
  onInputChange: (field: keyof DadosFinanceiros, value: string) => void;
}

const DadosFinanceirosTab = ({ formData, onInputChange }: DadosFinanceirosTabProps) => {
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

      {/* Campos Editáveis */}
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

        <div className="space-y-2">
          <Label htmlFor="dependentesIR">Dependentes IR</Label>
          <Input
            id="dependentesIR"
            type="number"
            value={formData.dependentesIR}
            onChange={(e) => onInputChange('dependentesIR', e.target.value)}
            placeholder="Quantidade de dependentes"
          />
        </div>
      </div>
    </div>
  );
};

export default DadosFinanceirosTab;
