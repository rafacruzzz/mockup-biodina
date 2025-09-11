import { useState } from "react";
import { Search, Filter, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tiModules } from "@/data/tiModules";
import DetalhesInterfaceamentoModal from "./DetalhesInterfaceamentoModal";
import InterfaceamentoDroppableColumn from "./InterfaceamentoDroppableColumn";
import InterfaceamentoKanbanCard from "./InterfaceamentoKanbanCard";
import type { SolicitacaoInterfaceamento } from "@/types/ti";
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

const PainelInterfaceamento = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<SolicitacaoInterfaceamento | null>(null);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [activeSolicitacao, setActiveSolicitacao] = useState<SolicitacaoInterfaceamento | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const solicitacoes = tiModules.interfaceamento.subModules.solicitacoes.data as SolicitacaoInterfaceamento[];

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

  const handleViewDetails = (solicitacao: SolicitacaoInterfaceamento) => {
    setSelectedSolicitacao(solicitacao);
    setShowDetalhesModal(true);
  };

  const handleSaveSolicitacao = (updatedSolicitacao: SolicitacaoInterfaceamento) => {
    // This would normally update the backend/context
    console.log('Solicitação atualizada:', updatedSolicitacao);
    setShowDetalhesModal(false);
    setSelectedSolicitacao(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const solicitacao = solicitacoes.find(s => String(s.id) === String(event.active.id));
    setActiveSolicitacao(solicitacao || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveSolicitacao(null);

    if (!over) return;

    const solicitacaoId = String(active.id);
    const newStatus = over.id as SolicitacaoInterfaceamento['status'];
    
    // Find the solicitacao and update its status
    const solicitacao = solicitacoes.find(s => String(s.id) === solicitacaoId);
    if (solicitacao && solicitacao.status !== newStatus) {
      // This would normally update the backend/context
      console.log(`Moving solicitacao ${solicitacaoId} from ${solicitacao.status} to ${newStatus}`);
      
      // Here you would update the actual data source
      // For now, we'll just log the change
      solicitacao.status = newStatus;
    }
  };

  const filteredSolicitacoes = solicitacoes.filter(solicitacao => {
    const matchesSearch = solicitacao.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solicitacao.oportunidadeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || solicitacao.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColumns: Array<{key: SolicitacaoInterfaceamento['status'], title: string, color: string}> = [
    { key: 'aprovado', title: 'Aprovados', color: 'green' },
    { key: 'em_analise', title: 'Em Análise', color: 'blue' },
    { key: 'em_desenvolvimento', title: 'Em Desenvolvimento', color: 'purple' },
    { key: 'concluido', title: 'Concluído', color: 'gray' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel de Controle de Interfaceamentos</h1>
          <p className="text-gray-600">Gerencie todas as solicitações de integração entre sistemas</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-lg border">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar por cliente ou oportunidade"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            <SelectItem value="aprovado">Aprovados</SelectItem>
            <SelectItem value="em_analise">Em Análise</SelectItem>
            <SelectItem value="em_desenvolvimento">Em Desenvolvimento</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Drag and Drop Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {statusColumns.map(column => {
            const columnSolicitacoes = filteredSolicitacoes.filter(s => s.status === column.key);
            
            return (
              <InterfaceamentoDroppableColumn
                key={column.key}
                column={column}
                solicitacoes={columnSolicitacoes}
                onViewDetails={handleViewDetails}
              />
            );
          })}
        </div>
        
        <DragOverlay>
          {activeSolicitacao && (
            <InterfaceamentoKanbanCard
              solicitacao={activeSolicitacao}
              onViewDetails={handleViewDetails}
              isDragOverlay
            />
          )}
        </DragOverlay>
      </DndContext>

      {/* Modal de Detalhes */}
      {selectedSolicitacao && (
        <DetalhesInterfaceamentoModal
          isOpen={showDetalhesModal}
          onClose={() => {
            setShowDetalhesModal(false);
            setSelectedSolicitacao(null);
          }}
          onSave={handleSaveSolicitacao}
          solicitacao={selectedSolicitacao}
        />
      )}
    </div>
  );
};

export default PainelInterfaceamento;