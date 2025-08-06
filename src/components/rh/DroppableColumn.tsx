
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Badge } from '@/components/ui/badge';
import { CandidatoProcesso, Curriculo } from '@/types/processoSeletivo';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface KanbanCardProps {
  candidato: CandidatoProcesso;
  curriculo: Curriculo;
  onMoverEtapa: (candidatoId: string, etapaId: string) => void;
  onStatusChange: (candidatoId: string, status: CandidatoProcesso['status']) => void;
  isDragOverlay?: boolean;
}

interface DroppableColumnProps {
  etapa: any;
  candidatos: Array<{ candidato: CandidatoProcesso; curriculo: Curriculo }>;
  onMoverEtapa: (candidatoId: string, etapaId: string) => void;
  onStatusChange: (candidatoId: string, status: CandidatoProcesso['status']) => void;
  KanbanCard: React.ComponentType<KanbanCardProps>;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ 
  etapa, 
  candidatos, 
  onMoverEtapa, 
  onStatusChange, 
  KanbanCard 
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: etapa.id,
  });

  const style = {
    backgroundColor: isOver ? 'rgba(59, 130, 246, 0.1)' : undefined,
    transition: 'background-color 200ms ease',
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`space-y-3 p-2 rounded-lg min-h-[400px] ${
        isOver ? 'ring-2 ring-blue-300 ring-opacity-50' : ''
      }`}
    >
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900">{etapa.nome}</h4>
          <Badge variant="outline" className="text-xs">
            {candidatos.length}
          </Badge>
        </div>
        <p className="text-xs text-gray-600 line-clamp-2">{etapa.descricao}</p>
        {etapa.responsavel && (
          <p className="text-xs text-gray-500 mt-1">
            <strong>Responsável:</strong> {etapa.responsavel}
          </p>
        )}
      </div>

      <SortableContext items={candidatos.map(c => c.candidato.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {candidatos.map(({ candidato, curriculo }) => (
            <KanbanCard
              key={candidato.id}
              candidato={candidato}
              curriculo={curriculo}
              onMoverEtapa={onMoverEtapa}
              onStatusChange={onStatusChange}
            />
          ))}
          
          {candidatos.length === 0 && (
            <div className="h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Nenhum candidato
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default DroppableColumn;
