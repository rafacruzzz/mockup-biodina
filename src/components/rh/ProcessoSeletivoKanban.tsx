import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, Clock, MoreHorizontal, Plus, Users } from 'lucide-react';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { ProcessoSeletivo, CandidatoProcesso, Curriculo } from '@/types/processoSeletivo';
import ConfigurarEtapasModal from './ConfigurarEtapasModal';
import DroppableColumn from './DroppableColumn';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface KanbanCardProps {
  candidato: CandidatoProcesso;
  curriculo: Curriculo;
  onMoverEtapa: (candidatoId: string, etapaId: string) => void;
  onStatusChange: (candidatoId: string, status: CandidatoProcesso['status']) => void;
  isDragOverlay?: boolean;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ candidato, curriculo, onMoverEtapa, onStatusChange, isDragOverlay }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: candidato.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusColor = (status: CandidatoProcesso['status']) => {
    switch (status) {
      case 'em-andamento': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'aprovado': return 'bg-green-100 text-green-700 border-green-200';
      case 'reprovado': return 'bg-red-100 text-red-700 border-red-200';
      case 'aguardando': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`mb-3 shadow-sm hover:shadow-md transition-shadow bg-white border border-gray-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : ''
      } ${isDragOverlay ? 'rotate-3 scale-105 shadow-lg' : ''}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-biodina-blue/10">
              <User className="h-4 w-4 text-biodina-blue" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">{curriculo.nome}</h4>
              <p className="text-xs text-gray-600">{curriculo.cargoDesejado}</p>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <Badge className={`text-xs w-fit ${getStatusColor(candidato.status)}`}>
          {candidato.status}
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="h-3 w-3" />
            <span className="truncate">{curriculo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3" />
            <span>{curriculo.telefone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>Há {Math.floor((new Date().getTime() - new Date(candidato.dataUltimaAtualizacao).getTime()) / (1000 * 60 * 60 * 24))} dias</span>
          </div>
        </div>
        
        {curriculo.habilidades.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {curriculo.habilidades.slice(0, 3).map((habilidade, index) => (
              <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                {habilidade}
              </Badge>
            ))}
            {curriculo.habilidades.length > 3 && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                +{curriculo.habilidades.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ProcessoSeletivoKanban: React.FC = () => {
  const { processosSeletivos, curriculos, moverCandidatoEtapa, atualizarStatusCandidato } = useProcessoSeletivo();
  const [processoSelecionado, setProcessoSelecionado] = useState<string>('');
  const [configurarEtapasModal, setConfigurarEtapasModal] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const processoAtual = useMemo(() => {
    if (processoSelecionado && processosSeletivos.find(p => p.id === processoSelecionado)) {
      return processosSeletivos.find(p => p.id === processoSelecionado);
    }
    return processosSeletivos[0] || null;
  }, [processosSeletivos, processoSelecionado]);

  // Set initial selection when processes are loaded
  React.useEffect(() => {
    if (!processoSelecionado && processosSeletivos.length > 0) {
      setProcessoSelecionado(processosSeletivos[0].id);
    }
  }, [processosSeletivos, processoSelecionado]);

  const candidatosPorEtapa = useMemo(() => {
    if (!processoAtual) return {};
    
    const candidatosComCurriculos = processoAtual.candidatos.map(candidato => ({
      candidato,
      curriculo: curriculos.find(c => c.id === candidato.curriculoId)
    })).filter(item => item.curriculo);

    const etapasMap: Record<string, Array<{ candidato: CandidatoProcesso; curriculo: Curriculo }>> = {};
    
    processoAtual.etapas.forEach(etapa => {
      etapasMap[etapa.id] = candidatosComCurriculos.filter(item => 
        item.candidato.etapaAtual === etapa.id
      ) as Array<{ candidato: CandidatoProcesso; curriculo: Curriculo }>;
    });

    return etapasMap;
  }, [processoAtual, curriculos]);

  const handleMoverEtapa = (candidatoId: string, etapaId: string) => {
    moverCandidatoEtapa(candidatoId, etapaId);
  };

  const handleStatusChange = (candidatoId: string, status: CandidatoProcesso['status']) => {
    atualizarStatusCandidato(candidatoId, status);
  };

  const handleNovoProcesso = () => {
    setConfigurarEtapasModal(true);
  };

  const handleCloseModal = () => {
    setConfigurarEtapasModal(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const candidatoId = active.id as string;
    const overEtapaId = over.id as string;
    
    const activeItem = Object.values(candidatosPorEtapa)
      .flat()
      .find(item => item.candidato.id === candidatoId);

    if (activeItem && processoAtual?.etapas.some(etapa => etapa.id === overEtapaId)) {
      if (activeItem.candidato.etapaAtual !== overEtapaId) {
        handleMoverEtapa(candidatoId, overEtapaId);
      }
    }

    setActiveId(null);
  };

  // Get the active candidato for drag overlay
  const activeCandidato = activeId ? 
    Object.values(candidatosPorEtapa)
      .flat()
      .find(item => item.candidato.id === activeId) : null;

  if (processosSeletivos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Users className="h-12 w-12 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Nenhum processo seletivo encontrado</h3>
        <p className="text-sm text-center mb-4">Crie um novo processo seletivo para começar</p>
        <Button onClick={handleNovoProcesso}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Processo Seletivo
        </Button>
        <ConfigurarEtapasModal
          isOpen={configurarEtapasModal}
          onClose={handleCloseModal}
          processo={null}
        />
      </div>
    );
  }

  if (!processoAtual) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Users className="h-12 w-12 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Carregando processo seletivo...</h3>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Processo Seletivo</h2>
            <p className="text-gray-600">Acompanhe os candidatos através das etapas de seleção</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select
              value={processoSelecionado}
              onValueChange={setProcessoSelecionado}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Selecionar processo" />
              </SelectTrigger>
              <SelectContent>
                {processosSeletivos.map((processo) => (
                  <SelectItem key={processo.id} value={processo.id}>
                    {processo.titulo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={handleNovoProcesso}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Processo
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-gray-900">{processoAtual.titulo}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span><strong>Departamento:</strong> {processoAtual.departamento}</span>
              <span><strong>Cargo:</strong> {processoAtual.cargo}</span>
              <span><strong>Vagas:</strong> {processoAtual.vagas}</span>
              <span><strong>Responsável:</strong> {processoAtual.responsavel}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[500px]">
            {processoAtual.etapas.map((etapa) => (
              <DroppableColumn
                key={etapa.id}
                etapa={etapa}
                candidatos={candidatosPorEtapa[etapa.id] || []}
                onMoverEtapa={handleMoverEtapa}
                onStatusChange={handleStatusChange}
                KanbanCard={KanbanCard}
              />
            ))}
          </div>
        </div>

        <ConfigurarEtapasModal
          isOpen={configurarEtapasModal}
          onClose={handleCloseModal}
          processo={null}
        />
      </div>

      <DragOverlay>
        {activeId && activeCandidato ? (
          <KanbanCard
            candidato={activeCandidato.candidato}
            curriculo={activeCandidato.curriculo}
            onMoverEtapa={handleMoverEtapa}
            onStatusChange={handleStatusChange}
            isDragOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ProcessoSeletivoKanban;
