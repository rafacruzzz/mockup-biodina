import { Package, Tag, Building2 } from "lucide-react";
import { ResultadoBusca, Equipamento } from "@/types/rastreabilidade";
import { getEquipamentoPorNumeroSerie, getEquipamentosPorModelo, getEquipamentosPorCliente } from "@/data/rastreabilidade";
import { useEffect, useRef } from "react";

interface BuscaPreditivaProps {
  resultados: ResultadoBusca;
  onSelectEquipamento: (equipamento: Equipamento) => void;
  onClose: () => void;
}

export function BuscaPreditiva({ resultados, onSelectEquipamento, onClose }: BuscaPreditivaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const hasResults = 
    resultados.equipamentos.length > 0 || 
    resultados.modelos.length > 0 || 
    resultados.clientes.length > 0;

  if (!hasResults) {
    return (
      <div 
        ref={containerRef}
        className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg p-4 z-50 animate-fade-in"
      >
        <p className="text-sm text-muted-foreground text-center">
          Nenhum resultado encontrado
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 animate-fade-in"
    >
      {/* Equipamentos por Número de Série */}
      {resultados.equipamentos.length > 0 && (
        <div className="p-2">
          <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
            <Package className="h-4 w-4" />
            Equipamentos (Nº Série)
          </div>
          {resultados.equipamentos.map((eq) => (
            <button
              key={eq.id}
              onClick={() => onSelectEquipamento(eq)}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <div className="font-medium">{eq.numeroSerie}</div>
              <div className="text-sm text-muted-foreground">
                {eq.modelo} • {eq.cliente}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Modelos */}
      {resultados.modelos.length > 0 && (
        <div className="p-2 border-t">
          <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
            <Tag className="h-4 w-4" />
            Modelos
          </div>
          {resultados.modelos.map((modelo) => {
            const equipamentos = getEquipamentosPorModelo(modelo);
            const primeiroEq = equipamentos[0];
            return (
              <button
                key={modelo}
                onClick={() => primeiroEq && onSelectEquipamento(primeiroEq)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors"
              >
                <div className="font-medium">{modelo}</div>
                <div className="text-sm text-muted-foreground">
                  {equipamentos.length} equipamento(s) instalado(s)
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Clientes */}
      {resultados.clientes.length > 0 && (
        <div className="p-2 border-t">
          <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
            <Building2 className="h-4 w-4" />
            Clientes
          </div>
          {resultados.clientes.map((cliente) => {
            const equipamentos = getEquipamentosPorCliente(cliente.id);
            const primeiroEq = equipamentos[0];
            return (
              <button
                key={cliente.id}
                onClick={() => primeiroEq && onSelectEquipamento(primeiroEq)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors"
              >
                <div className="font-medium">{cliente.nome}</div>
                <div className="text-sm text-muted-foreground">
                  {equipamentos.length} equipamento(s)
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
