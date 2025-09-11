import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { SolicitacaoInterfaceamento } from '@/types/ti';

interface InterfaceamentoKanbanCardProps {
  solicitacao: SolicitacaoInterfaceamento;
  onViewDetails: (solicitacao: SolicitacaoInterfaceamento) => void;
  isDragOverlay?: boolean;
}

const InterfaceamentoKanbanCard: React.FC<InterfaceamentoKanbanCardProps> = ({
  solicitacao,
  onViewDetails,
  isDragOverlay
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(solicitacao.id),
    disabled: isDragOverlay
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusBadge = (status: SolicitacaoInterfaceamento['status']) => {
    const statusConfig = {
      aguardando_aprovacao: { label: "Aguardando Aprovação", className: "bg-yellow-100 text-yellow-800" },
      aprovado: { label: "Aprovado", className: "bg-green-100 text-green-800" },
      em_analise: { label: "Em Análise", className: "bg-blue-100 text-blue-800" },
      em_desenvolvimento: { label: "Em Desenvolvimento", className: "bg-purple-100 text-purple-800" },
      concluido: { label: "Concluído", className: "bg-gray-100 text-gray-800" },
      cancelado: { label: "Cancelado", className: "bg-red-100 text-red-800" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        isDragging ? 'shadow-lg rotate-3' : ''
      } ${isDragOverlay ? 'shadow-xl' : ''}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium truncate">
            {solicitacao.clienteNome}
          </CardTitle>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(solicitacao);
            }}
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-xs text-gray-600">
          <div><strong>OPT:</strong> {solicitacao.oportunidadeId}</div>
          <div><strong>Sistema:</strong> {solicitacao.sistemaCliente}</div>
          <div><strong>Prazo:</strong> {new Date(solicitacao.prazoDesejado).toLocaleDateString()}</div>
          {solicitacao.responsavelExecucao && (
            <div>
              <strong>Execução:</strong> {solicitacao.responsavelExecucao === 'ti_interno' ? 'TI Interno' : 'Fornecedor Externo'}
            </div>
          )}
          {solicitacao.nomeFornecedor && (
            <div><strong>Fornecedor:</strong> {solicitacao.nomeFornecedor}</div>
          )}
        </div>
        <div className="mt-3">
          {getStatusBadge(solicitacao.status)}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterfaceamentoKanbanCard;