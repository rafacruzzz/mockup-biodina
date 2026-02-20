import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { diasSemana, ExpedienteHorario } from "@/types/expediente";

interface ExpedienteHorarioTabProps {
  formData: ExpedienteHorario[];
  onInputChange: (diaIndex: number, field: string, value: any) => void;
  onAplicarTodos: () => void;
}

const ExpedienteHorarioTab = ({ formData, onInputChange, onAplicarTodos }: ExpedienteHorarioTabProps) => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-imuv-blue">Configuração de Horários</h3>
        <Button variant="outline" size="sm" onClick={onAplicarTodos} className="flex items-center gap-2">
          <Copy className="h-4 w-4" />
          Aplicar a Todos
        </Button>
      </div>

      <div className="space-y-4">
        {diasSemana.map((dia, index) => {
          const horario = formData[index];
          return (
            <div key={dia} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">{dia}</Label>
                <Switch checked={horario.ativo} onCheckedChange={(checked) => onInputChange(index, 'ativo', checked)} />
              </div>
              {horario.ativo && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-xs font-medium text-gray-600 uppercase">Primeiro Turno</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1"><Label className="text-xs text-gray-500">Início</Label><Input type="time" value={horario.primeiroTurno.inicio} onChange={(e) => onInputChange(index, 'primeiroTurno.inicio', e.target.value)} className="text-sm" /></div>
                      <div className="flex-1"><Label className="text-xs text-gray-500">Fim</Label><Input type="time" value={horario.primeiroTurno.fim} onChange={(e) => onInputChange(index, 'primeiroTurno.fim', e.target.value)} className="text-sm" /></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-medium text-gray-600 uppercase">Segundo Turno</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1"><Label className="text-xs text-gray-500">Início</Label><Input type="time" value={horario.segundoTurno.inicio} onChange={(e) => onInputChange(index, 'segundoTurno.inicio', e.target.value)} className="text-sm" /></div>
                      <div className="flex-1"><Label className="text-xs text-gray-500">Fim</Label><Input type="time" value={horario.segundoTurno.fim} onChange={(e) => onInputChange(index, 'segundoTurno.fim', e.target.value)} className="text-sm" /></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpedienteHorarioTab;
