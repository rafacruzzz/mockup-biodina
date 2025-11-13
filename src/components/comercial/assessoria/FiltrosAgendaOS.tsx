import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FiltrosAgenda, StatusOS, DepartamentoOS } from "@/types/assessoria-cientifica";
import { assessoresTecnicos, ordensServicoMock } from "@/data/assessoria-cientifica";
import { Filter, ChevronRight } from "lucide-react";

interface FiltrosAgendaOSProps {
  filtros: FiltrosAgenda;
  onFiltrosChange: (filtros: FiltrosAgenda) => void;
  labelAssessor?: string; // "Assessor" ou "Técnico"
  departamento?: DepartamentoOS; // Departamento fixo para filtrar
}

export const FiltrosAgendaOS = ({ filtros, onFiltrosChange, labelAssessor = "Assessor/Técnico", departamento }: FiltrosAgendaOSProps) => {
  const statusOptions: StatusOS[] = ['ABERTA', 'EM_ANDAMENTO', 'CONCLUÍDA', 'URGENTE', 'CANCELADA'];
  
  // Criar estrutura de dados para clientes e seus equipamentos
  const clientesComEquipamentos = React.useMemo(() => {
    const clientesMap = new Map();
    
    ordensServicoMock
      .filter(os => !departamento || os.departamento === departamento)
      .forEach(os => {
        if (!clientesMap.has(os.clienteId)) {
          clientesMap.set(os.clienteId, {
            id: os.clienteId,
            nome: os.cliente,
            equipamentos: []
          });
        }
        
        const cliente = clientesMap.get(os.clienteId);
        const equipamentoExiste = cliente.equipamentos.some(
          (eq: any) => eq.id === os.equipamentoId
        );
        
        if (!equipamentoExiste && os.equipamento) {
          cliente.equipamentos.push({
            id: os.equipamentoId,
            modelo: os.equipamento,
            numeroSerie: os.numeroSerieLote || 'N/A',
            setor: os.setorAlocacao || 'Não especificado'
          });
        }
      });
    
    return Array.from(clientesMap.values()).sort((a, b) => a.nome.localeCompare(b.nome));
  }, [departamento]);

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

  const toggleEquipamento = (equipamentoId: string) => {
    const newEquipamentos = filtros.equipamentos.includes(equipamentoId)
      ? filtros.equipamentos.filter(e => e !== equipamentoId)
      : [...filtros.equipamentos, equipamentoId];
    onFiltrosChange({ ...filtros, equipamentos: newEquipamentos });
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Filtro Assessor/Técnico */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold">{labelAssessor}</Label>
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

        {/* Filtro Cliente/Equipamento */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold">Cliente/Equipamento</Label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {clientesComEquipamentos.map((cliente: any) => (
              <Collapsible key={cliente.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`cliente-${cliente.id}`}
                    checked={filtros.clientes.includes(cliente.nome)}
                    onCheckedChange={() => toggleCliente(cliente.nome)}
                  />
                  <CollapsibleTrigger className="flex items-center justify-between w-full hover:bg-accent/50 rounded px-1 transition-colors">
                    <label 
                      htmlFor={`cliente-${cliente.id}`}
                      className="text-xs font-medium cursor-pointer flex-1"
                    >
                      {cliente.nome}
                    </label>
                    <ChevronRight className="h-3 w-3 transition-transform data-[state=open]:rotate-90" />
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="ml-6 space-y-1">
                  {cliente.equipamentos.map((eq: any) => (
                    <div key={eq.id} className="flex items-start space-x-2 py-1 pl-2 border-l-2 border-muted">
                      <Checkbox
                        id={`equipamento-${eq.id}`}
                        checked={filtros.equipamentos.includes(eq.id)}
                        onCheckedChange={() => toggleEquipamento(eq.id)}
                      />
                      <label 
                        htmlFor={`equipamento-${eq.id}`}
                        className="text-xs cursor-pointer flex flex-col"
                      >
                        <span className="font-medium">{eq.modelo}</span>
                        <span className="text-muted-foreground">S/N: {eq.numeroSerie}</span>
                        <span className="text-muted-foreground">Setor: {eq.setor}</span>
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
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
