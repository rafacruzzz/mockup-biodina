import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDroppable } from '@dnd-kit/core';
import type { SolicitacaoInterfaceamento } from '@/types/ti';
import InterfaceamentoKanbanCard from './InterfaceamentoKanbanCard';

interface StatusColumn {
  key: SolicitacaoInterfaceamento['status'];
  title: string;
  color: string;
}

interface InterfaceamentoDroppableColumnProps {
  column: StatusColumn;
  solicitacoes: SolicitacaoInterfaceamento[];
  onViewDetails: (solicitacao: SolicitacaoInterfaceamento) => void;
  disabled?: boolean;
}

const InterfaceamentoDroppableColumn: React.FC<InterfaceamentoDroppableColumnProps> = ({
  column,
  solicitacoes,
  onViewDetails,
  disabled = false
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: column.key,
    disabled
  });

  const getColumnColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'border-t-green-500 bg-green-50/30';
      case 'blue':
        return 'border-t-blue-500 bg-blue-50/30';
      case 'purple':
        return 'border-t-purple-500 bg-purple-50/30';
      case 'gray':
        return 'border-t-gray-500 bg-gray-50/30';
      default:
        return 'border-t-gray-500 bg-gray-50/30';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{column.title}</h3>
        <Badge variant="secondary">{solicitacoes.length}</Badge>
      </div>
      
      <Card 
        ref={setNodeRef}
        className={`min-h-[400px] border-t-4 ${getColumnColor(column.color)} ${
          isOver ? 'ring-2 ring-primary ring-opacity-50 bg-primary/5' : ''
        } ${disabled ? 'opacity-75' : ''}`}
      >
        <CardContent className="p-3 space-y-3 max-h-[500px] overflow-y-auto">
          {solicitacoes.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              Nenhuma solicitação nesta etapa
            </div>
          ) : (
            solicitacoes.map(solicitacao => (
              <InterfaceamentoKanbanCard
                key={solicitacao.id}
                solicitacao={solicitacao}
                onViewDetails={onViewDetails}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterfaceamentoDroppableColumn;