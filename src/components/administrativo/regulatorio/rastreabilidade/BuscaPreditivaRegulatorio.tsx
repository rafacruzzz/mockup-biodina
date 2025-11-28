import { useEffect, useRef } from 'react';
import { Package, Box, Building2, Hash } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResultadoBuscaRegulatorio, EquipamentoRegulatorio } from '@/types/rastreabilidadeRegulatorio';

interface BuscaPreditivaRegulatorioProps {
  resultados: ResultadoBuscaRegulatorio;
  onSelectEquipamento: (equipamento: EquipamentoRegulatorio) => void;
  onClose: () => void;
}

export function BuscaPreditivaRegulatorio({ 
  resultados, 
  onSelectEquipamento, 
  onClose 
}: BuscaPreditivaRegulatorioProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const hasResults = 
    resultados.equipamentos.length > 0 || 
    resultados.modelos.length > 0 || 
    resultados.clientes.length > 0 ||
    resultados.lotes.length > 0;

  if (!hasResults) {
    return (
      <div 
        ref={containerRef}
        className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 p-6 text-center"
      >
        <p className="text-muted-foreground">Nenhum resultado encontrado</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50"
    >
      <ScrollArea className="max-h-[500px]">
        <div className="p-4 space-y-4">
          {/* Equipamentos por Número de Série */}
          {resultados.equipamentos.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">
                  Equipamentos ({resultados.equipamentos.length})
                </h3>
              </div>
              <div className="space-y-2">
                {resultados.equipamentos.map((equipamento) => (
                  <button
                    key={equipamento.id}
                    onClick={() => {
                      onSelectEquipamento(equipamento);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors border border-border"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground truncate">
                            {equipamento.numeroSerie}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            • {equipamento.codigo}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {equipamento.modelo} - {equipamento.marca}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Cliente: {equipamento.cliente}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modelos */}
          {resultados.modelos.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Box className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">
                  Modelos ({resultados.modelos.length})
                </h3>
              </div>
              <div className="space-y-2">
                {resultados.modelos.map((modelo, index) => {
                  const equipamentosDoModelo = resultados.equipamentos.filter(
                    eq => eq.modelo === modelo
                  );
                  const primeiroEquipamento = equipamentosDoModelo[0];
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (primeiroEquipamento) {
                          onSelectEquipamento(primeiroEquipamento);
                          onClose();
                        }
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors border border-border"
                    >
                      <div className="font-medium text-foreground">{modelo}</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {equipamentosDoModelo.length} equipamento(s) encontrado(s)
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Clientes */}
          {resultados.clientes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">
                  Clientes ({resultados.clientes.length})
                </h3>
              </div>
              <div className="space-y-2">
                {resultados.clientes.map((cliente) => {
                  const equipamentosDoCliente = resultados.equipamentos.filter(
                    eq => eq.clienteId === cliente.id
                  );
                  const primeiroEquipamento = equipamentosDoCliente[0];
                  
                  return (
                    <button
                      key={cliente.id}
                      onClick={() => {
                        if (primeiroEquipamento) {
                          onSelectEquipamento(primeiroEquipamento);
                          onClose();
                        }
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors border border-border"
                    >
                      <div className="font-medium text-foreground">{cliente.nome}</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {equipamentosDoCliente.length} equipamento(s)
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Lotes */}
          {resultados.lotes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Hash className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">
                  Lotes ({resultados.lotes.length})
                </h3>
              </div>
              <div className="space-y-2">
                {resultados.lotes.map((lote, index) => {
                  const equipamentosDoLote = resultados.equipamentos.filter(
                    eq => eq.lote === lote
                  );
                  const primeiroEquipamento = equipamentosDoLote[0];
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (primeiroEquipamento) {
                          onSelectEquipamento(primeiroEquipamento);
                          onClose();
                        }
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors border border-border"
                    >
                      <div className="font-medium text-foreground">{lote}</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {equipamentosDoLote.length} equipamento(s) no lote
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
