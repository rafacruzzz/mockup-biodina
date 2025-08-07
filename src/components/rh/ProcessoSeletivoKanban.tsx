
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Clock, Plus, ArrowLeft, UserPlus, Square } from 'lucide-react';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { ProcessoSeletivo, CandidatoProcesso, Curriculo } from '@/types/processoSeletivo';
import ConfigurarEtapasModal from './ConfigurarEtapasModal';
import CandidatoDetailsModal from './CandidatoDetailsModal';
import CandidatoContextMenu from './CandidatoContextMenu';
import DroppableColumn from './DroppableColumn';
import AdicionarCurriculoBancoModal from './AdicionarCurriculoBancoModal';
import FinalizarProcessoModal from './FinalizarProcessoModal';
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

interface ProcessoSeletivoKanbanProps {
  processoId?: string;
  onVoltar?: () => void;
}

interface KanbanCardProps {
  candidato: CandidatoProcesso;
  curriculo: Curriculo;
  onMoverEtapa: (candidatoId: string, etapaId: string) => void;
  onStatusChange: (candidatoId: string, status: CandidatoProcesso['status']) => void;
  isDragOverlay?: boolean;
  etapas?: Array<{ id: string; nome: string }>;
  isProcessoFinalizado?: boolean;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ 
  candidato, 
  curriculo, 
  onMoverEtapa, 
  onStatusChange, 
  isDragOverlay,
  etapas = [],
  isProcessoFinalizado = false
}) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: candidato.id,
    disabled: isProcessoFinalizado
  });

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

  const handleViewDetails = () => {
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <Card 
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...(!isProcessoFinalizado ? listeners : {})}
        className={`mb-3 shadow-sm hover:shadow-md transition-shadow bg-white border border-gray-200 ${
          !isProcessoFinalizado ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        } ${isDragging ? 'opacity-50' : ''} ${isDragOverlay ? 'rotate-3 scale-105 shadow-lg' : ''} ${
          isProcessoFinalizado ? 'opacity-75' : ''
        }`}
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
            {!isProcessoFinalizado && (
              <CandidatoContextMenu
                candidato={candidato}
                etapas={etapas}
                onViewDetails={handleViewDetails}
              />
            )}
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

      <CandidatoDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        candidato={candidato}
        curriculo={curriculo}
      />
    </>
  );
};

const ProcessoSeletivoKanban: React.FC<ProcessoSeletivoKanbanProps> = ({ 
  processoId, 
  onVoltar 
}) => {
  const { processosSeletivos, curriculos, moverCandidatoEtapa, atualizarStatusCandidato } = useProcessoSeletivo();
  const [configurarEtapasModal, setConfigurarEtapasModal] = useState(false);
  const [adicionarCurriculoModal, setAdicionarCurriculoModal] = useState(false);
  const [finalizarProcessoModal, setFinalizarProcessoModal] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const processoAtual = useMemo(() => {
    if (processoId) {
      return processosSeletivos.find(p => p.id === processoId);
    }
    return processosSeletivos[0] || null;
  }, [processosSeletivos, processoId]);

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
    if (processoAtual?.status === 'finalizado') return;
    moverCandidatoEtapa(candidatoId, etapaId);
  };

  const handleStatusChange = (candidatoId: string, status: CandidatoProcesso['status']) => {
    if (processoAtual?.status === 'finalizado') return;
    atualizarStatusCandidato(candidatoId, status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (processoAtual?.status === 'finalizado') return;
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || processoAtual?.status === 'finalizado') {
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

  if (!processoAtual) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Square className="h-12 w-12 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Processo não encontrado</h3>
        <p className="text-sm text-center mb-4">O processo seletivo solicitado não foi encontrado</p>
        {onVoltar && (
          <Button onClick={onVoltar} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Lista
          </Button>
        )}
      </div>
    );
  }

  const etapasSimplificadas = processoAtual.etapas.map(etapa => ({
    id: etapa.id,
    nome: etapa.nome
  }));

  const isProcessoFinalizado = processoAtual.status === 'finalizado';

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onVoltar && (
              <Button variant="outline" onClick={onVoltar}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {processoAtual.titulo}
                {isProcessoFinalizado && (
                  <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                    Finalizado
                  </Badge>
                )}
              </h2>
              <p className="text-gray-600">
                Acompanhe os candidatos através das etapas de seleção
                {isProcessoFinalizado && ' (Processo finalizado - somente leitura)'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isProcessoFinalizado && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setAdicionarCurriculoModal(true)}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Adicionar Currículo do Banco
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setConfigurarEtapasModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Configurar Etapas
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => setFinalizarProcessoModal(true)}
                >
                  <Square className="h-4 w-4 mr-2" />
                  Finalizar Processo
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="mb-4">
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span><strong>Departamento:</strong> {processoAtual.departamento}</span>
              <span><strong>Cargo:</strong> {processoAtual.cargo}</span>
              <span><strong>Vagas:</strong> {processoAtual.vagas}</span>
              <span><strong>Responsável:</strong> {processoAtual.responsavel}</span>
              {processoAtual.dataFim && (
                <span><strong>Finalizado em:</strong> {new Date(processoAtual.dataFim).toLocaleDateString('pt-BR')}</span>
              )}
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
                disabled={isProcessoFinalizado}
                KanbanCard={(props) => (
                  <KanbanCard 
                    {...props} 
                    etapas={etapasSimplificadas}
                    isProcessoFinalizado={isProcessoFinalizado}
                  />
                )}
              />
            ))}
          </div>
        </div>

        {/* Modais */}
        <ConfigurarEtapasModal
          isOpen={configurarEtapasModal}
          onClose={() => setConfigurarEtapasModal(false)}
          processo={processoAtual}
        />

        <AdicionarCurriculoBancoModal
          isOpen={adicionarCurriculoModal}
          onClose={() => setAdicionarCurriculoModal(false)}
          processoSeletivoId={processoAtual.id}
        />

        <FinalizarProcessoModal
          isOpen={finalizarProcessoModal}
          onClose={() => setFinalizarProcessoModal(false)}
          processo={processoAtual}
        />
      </div>

      <DragOverlay>
        {activeId && activeCandidato ? (
          <KanbanCard
            candidato={activeCandidato.candidato}
            curriculo={activeCandidato.curriculo}
            onMoverEtapa={handleMoverEtapa}
            onStatusChange={handleStatusChange}
            etapas={etapasSimplificadas}
            isProcessoFinalizado={isProcessoFinalizado}
            isDragOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ProcessoSeletivoKanban;
