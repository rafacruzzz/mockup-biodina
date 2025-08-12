
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DndContext, 
  DragOverlay, 
  closestCenter,
  useDraggable,
  useDroppable,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent
} from '@dnd-kit/core';
import {
  Users, BarChart2, FileText, Database, Briefcase, 
  Package, ShoppingCart, DollarSign, Calculator, 
  UserCheck, Cpu, GripVertical, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Module {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

interface SubModule {
  id: string;
  name: string;
}

const modules: Module[] = [
  { id: 'pessoal', name: 'Pessoal', icon: Users },
  { id: 'bi', name: 'BI', icon: BarChart2 },
  { id: 'cadastro', name: 'Cadastro', icon: FileText },
  { id: 'administrativo', name: 'Administrativo', icon: Database },
  { id: 'comercial', name: 'Comercial', icon: Briefcase },
  { id: 'estoque', name: 'Estoque', icon: Package },
  { id: 'compras', name: 'Compras', icon: ShoppingCart },
  { id: 'financeiro', name: 'Financeiro', icon: DollarSign },
  { id: 'contabilidade', name: 'Contabilidade', icon: Calculator },
  { id: 'rh', name: 'RH', icon: UserCheck },
  { id: 'ti', name: 'TI', icon: Cpu },
];

const comercialSubModules: SubModule[] = [
  { id: 'indicadores-comerciais', name: 'Indicadores Comerciais' },
  { id: 'licitacao', name: 'Licitação' },
  { id: 'contratacao', name: 'Contratação' },
  { id: 'importacao-direta', name: 'Importação Direta' },
];

const DraggableSubModule = ({ subModule }: { subModule: SubModule }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: subModule.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm transition-all",
        isDragging && "opacity-50"
      )}
      {...listeners}
      {...attributes}
    >
      <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
      <span className="font-medium text-gray-700">{subModule.name}</span>
    </div>
  );
};

const DroppableModule = ({ 
  module, 
  isSelected, 
  isOver, 
  onClick 
}: { 
  module: Module; 
  isSelected: boolean; 
  isOver: boolean; 
  onClick: () => void; 
}) => {
  const { setNodeRef } = useDroppable({
    id: module.id,
  });

  const Icon = module.icon;

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all",
        isSelected && "bg-gradient-to-r from-biodina-blue to-biodina-blue/90 text-white shadow-md",
        !isSelected && "hover:bg-gray-50 text-gray-700",
        isOver && "border-2 border-dashed border-biodina-gold ring-2 ring-biodina-gold/20"
      )}
    >
      <div className={cn(
        "p-2 rounded-lg",
        isSelected ? 'bg-white/20' : 'bg-biodina-gold/10'
      )}>
        <Icon className={cn(
          "h-5 w-5",
          isSelected ? 'text-white' : 'text-biodina-gold'
        )} />
      </div>
      <span className="font-medium">{module.name}</span>
    </div>
  );
};

const PersonalizarNavegacao = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState('comercial');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id as string || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id === 'contratacao' && over.id === 'financeiro') {
      console.log('Movendo "Contratação" para módulo "Financeiro"');
    }
    
    setActiveId(null);
    setOverId(null);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    console.log('Salvar alterações de navegação');
  };

  const activeSubModule = comercialSubModules.find(sub => sub.id === activeId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Personalizar Navegação
            </h1>
            <p className="text-gray-600">
              Arraste e solte as abas para reorganizar os módulos do sistema.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar Alterações
            </Button>
          </div>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Main Modules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Módulos Principais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {modules.map((module) => (
                    <DroppableModule
                      key={module.id}
                      module={module}
                      isSelected={selectedModule === module.id}
                      isOver={overId === module.id}
                      onClick={() => setSelectedModule(module.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Sub-modules */}
            <Card>
              <CardHeader>
                <CardTitle>Abas do Módulo Selecionado</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedModule === 'comercial' ? (
                  <div className="space-y-3">
                    {comercialSubModules.map((subModule) => (
                      <DraggableSubModule
                        key={subModule.id}
                        subModule={subModule}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Settings className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Selecione um módulo para visualizar as abas.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <DragOverlay>
            {activeId && activeSubModule ? (
              <div className="flex items-center gap-3 p-3 bg-white border rounded-lg shadow-lg">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-700">{activeSubModule.name}</span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default PersonalizarNavegacao;
