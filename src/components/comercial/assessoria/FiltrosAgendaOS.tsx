import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FiltrosAgenda, StatusOS, DepartamentoOS } from "@/types/assessoria-cientifica";
import { assessoresTecnicos, ordensServicoMock } from "@/data/assessoria-cientifica";
import { Filter } from "lucide-react";

interface FiltrosAgendaOSProps {
  filtros: FiltrosAgenda;
  onFiltrosChange: (filtros: FiltrosAgenda) => void;
}

export const FiltrosAgendaOS = ({ filtros, onFiltrosChange }: FiltrosAgendaOSProps) => {
  const statusOptions: StatusOS[] = ['ABERTA', 'EM_ANDAMENTO', 'CONCLUÍDA', 'URGENTE', 'CANCELADA'];
  const departamentoOptions: DepartamentoOS[] = ['Assessoria Científica', 'Departamento Técnico'];
  
  // Obter lista única de clientes
  const clientes = Array.from(new Set(ordensServicoMock.map(os => os.cliente))).sort();

  const toggleDepartamento = (dept: DepartamentoOS) => {
    const newDepts = filtros.departamentos.includes(dept)
      ? filtros.departamentos.filter(d => d !== dept)
      : [...filtros.departamentos, dept];
    onFiltrosChange({ ...filtros, departamentos: newDepts });
  };

  const toggleAssessor = (assessor: string) => {
    const newAssessores = filtros.assessores.includes(assessor)
      ? filtros.assessores.filter(a => a !== assessor)
      : [...filtros.assessores, assessor];
    onFiltrosChange({ ...filtros, assessores: newAssessores });
  };

  const toggleCliente = (cliente: string) => {
    const newClientes = filtros.clientes.includes(cliente)
      ? filtros.clientes.filter(c => c !== cliente)
      : [...filtros.clientes, cliente];
    onFiltrosChange({ ...filtros, clientes: newClientes });
  };

  const toggleStatus = (status: StatusOS) => {
    const newStatus = filtros.status.includes(status)
      ? filtros.status.filter(s => s !== status)
      : [...filtros.status, status];
    onFiltrosChange({ ...filtros, status: newStatus });
  };

  return (
    <Card className="p-4 bg-muted/30">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold text-sm">Filtros da Agenda</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtro Departamento */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold">Departamento</Label>
          <div className="space-y-2">
            {departamentoOptions.map((dept) => (
              <div key={dept} className="flex items-center space-x-2">
                <Checkbox
                  id={`dept-${dept}`}
                  checked={filtros.departamentos.includes(dept)}
                  onCheckedChange={() => toggleDepartamento(dept)}
                />
                <label
                  htmlFor={`dept-${dept}`}
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {dept}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Filtro Assessor/Técnico */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold">Assessor/Técnico</Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {assessoresTecnicos.map((assessor) => (
              <div key={assessor.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`assessor-${assessor.id}`}
                  checked={filtros.assessores.includes(assessor.nome)}
                  onCheckedChange={() => toggleAssessor(assessor.nome)}
                />
                <label
                  htmlFor={`assessor-${assessor.id}`}
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {assessor.nome}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Filtro Cliente */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold">Cliente</Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {clientes.map((cliente) => (
              <div key={cliente} className="flex items-center space-x-2">
                <Checkbox
                  id={`cliente-${cliente}`}
                  checked={filtros.clientes.includes(cliente)}
                  onCheckedChange={() => toggleCliente(cliente)}
                />
                <label
                  htmlFor={`cliente-${cliente}`}
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {cliente}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Filtro Status */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold">Status da OS</Label>
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filtros.status.includes(status)}
                  onCheckedChange={() => toggleStatus(status)}
                />
                <label
                  htmlFor={`status-${status}`}
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {status === 'EM_ANDAMENTO' ? 'EM ANDAMENTO' : status}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
