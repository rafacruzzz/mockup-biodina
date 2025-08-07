
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EtapaSelecao, CandidatoProcesso, Curriculo } from '@/types/processoSeletivo';
import { useDroppable } from '@dnd-kit/core';

interface DroppableColumnProps {
  etapa: EtapaSelecao;
  candidatos: Array<{ candidato: CandidatoProcesso; curriculo: Curriculo }>;
  onMoverEtapa: (candidatoId: string, etapaId: string) => void;
  onStatusChange: (candidatoId: string, status: CandidatoProcesso['status']) => void;
  disabled?: boolean;
  KanbanCard: React.ComponentType<{
    candidato: CandidatoProcesso;
    curriculo: Curriculo;
    onMoverEtapa: (candidatoId: string, etapaId: string) => void;
    onStatusChange: (candidatoId: string, status: CandidatoProcesso['status']) => void;
  }>;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  etapa,
  candidatos,
  onMoverEtapa,
  onStatusChange,
  disabled = false,
  KanbanCard
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: etapa.id,
    disabled
  });

  const getColumnColor = (tipo: EtapaSelecao['tipo']) => {
    switch (tipo) {
      case 'triagem':
        return 'border-t-blue-500 bg-blue-50/30';
      case 'entrevista':
        return 'border-t-green-500 bg-green-50/30';
      case 'teste':
        return 'border-t-purple-500 bg-purple-50/30';
      case 'dinamica':
        return 'border-t-orange-500 bg-orange-50/30';
      case 'aprovacao':
        return 'border-t-emerald-500 bg-emerald-50/30';
      default:
        return 'border-t-gray-500 bg-gray-50/30';
    }
  };

  const getTipoText = (tipo: EtapaSelecao['tipo']) => {
    switch (tipo) {
      case 'triagem': return 'Triagem';
      case 'entrevista': return 'Entrevista';
      case 'teste': return 'Teste';
      case 'dinamica': return 'Dinâmica';
      case 'aprovacao': return 'Aprovação';
      default: return tipo;
    }
  };

  return (
    <Card 
      ref={setNodeRef}
      className={`h-full border-t-4 ${getColumnColor(etapa.tipo)} ${
        isOver ? 'ring-2 ring-biodina-blue ring-opacity-50' : ''
      } ${disabled ? 'opacity-75' : ''}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-900">
            {etapa.nome}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {candidatos.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {getTipoText(etapa.tipo)}
          </Badge>
          {etapa.duracao && (
            <Badge variant="outline" className="text-xs">
              {etapa.duracao}
            </Badge>
          )}
        </div>
        {etapa.responsavel && (
          <p className="text-xs text-gray-600">
            <strong>Resp:</strong> {etapa.responsavel}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3 max-h-96 overflow-y-auto">
        {candidatos.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            Nenhum candidato nesta etapa
          </div>
        ) : (
          candidatos.map(({ candidato, curriculo }) => (
            <KanbanCard
              key={candidato.id}
              candidato={candidato}
              curriculo={curriculo}
              onMoverEtapa={onMoverEtapa}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default DroppableColumn;
