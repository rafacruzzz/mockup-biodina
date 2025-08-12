
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import { FiltrosEmprestimo, EmprestimoStatus } from "@/types/emprestimos";

interface FiltrosEmprestimosProps {
  filtros: FiltrosEmprestimo;
  onFiltrosChange: (filtros: FiltrosEmprestimo) => void;
  onLimparFiltros: () => void;
}

export const FiltrosEmprestimos = ({ filtros, onFiltrosChange, onLimparFiltros }: FiltrosEmprestimosProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = (status: string) => {
    const currentStatus = filtros.status || [];
    const statusEnum = status as EmprestimoStatus;
    
    if (currentStatus.includes(statusEnum)) {
      onFiltrosChange({
        ...filtros,
        status: currentStatus.filter(s => s !== statusEnum)
      });
    } else {
      onFiltrosChange({
        ...filtros,
        status: [...currentStatus, statusEnum]
      });
    }
  };

  const getStatusBadgeVariant = (status: EmprestimoStatus) => {
    switch (status) {
      case EmprestimoStatus.ATIVO: return "default";
      case EmprestimoStatus.DEVOLVIDO: return "secondary";
      case EmprestimoStatus.PARCIAL: return "outline";
      case EmprestimoStatus.VENCIDO: return "destructive";
      default: return "default";
    }
  };

  const filtrosAtivos = Object.values(filtros).filter(Boolean).length;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
            {filtrosAtivos > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filtrosAtivos}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Fechar" : "Expandir"}
            </Button>
            {filtrosAtivos > 0 && (
              <Button variant="outline" size="sm" onClick={onLimparFiltros}>
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Cliente</label>
              <Input
                placeholder="Nome ou CNPJ"
                value={filtros.cliente || ""}
                onChange={(e) => onFiltrosChange({ ...filtros, cliente: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Produto</label>
              <Input
                placeholder="Referência ou descrição"
                value={filtros.produto || ""}
                onChange={(e) => onFiltrosChange({ ...filtros, produto: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Data Início</label>
              <Input
                type="date"
                value={filtros.dataInicio || ""}
                onChange={(e) => onFiltrosChange({ ...filtros, dataInicio: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Data Fim</label>
              <Input
                type="date"
                value={filtros.dataFim || ""}
                onChange={(e) => onFiltrosChange({ ...filtros, dataFim: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Valor Mínimo (USD)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={filtros.valorMinimo || ""}
                onChange={(e) => onFiltrosChange({ ...filtros, valorMinimo: parseFloat(e.target.value) })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Valor Máximo (USD)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={filtros.valorMaximo || ""}
                onChange={(e) => onFiltrosChange({ ...filtros, valorMaximo: parseFloat(e.target.value) })}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(EmprestimoStatus).map((status) => (
                <Badge
                  key={status}
                  variant={filtros.status?.includes(status) ? getStatusBadgeVariant(status) : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleStatusChange(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
