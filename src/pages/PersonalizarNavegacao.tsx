
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
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Users, BarChart2, FileText, Database, Briefcase, 
  Package, ShoppingCart, DollarSign, Calculator, 
  UserCheck, Cpu, GripVertical, Settings, Pencil, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import SidebarLayout from '@/components/SidebarLayout';

interface Module {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

interface SubModule {
  id: string;
  name: string;
}

const initialModules: Module[] = [
  { id: 'pessoal', name: 'Pessoal', icon: Users },
  { id: 'bi', name: 'BI', icon: BarChart2 },
  { id: 'cadastro', name: 'Cadastro', icon: FileText },
  { id: 'administrativo', name: 'Administrativo', icon: Database },
  { id: 'comercial', name: 'Comercial', icon: Briefcase },
  { id: 'financeiro', name: 'Financeiro', icon: DollarSign },
  { id: 'estoque', name: 'Estoque', icon: Package },
  { id: 'compras', name: 'Compras', icon: ShoppingCart },
  { id: 'contabilidade', name: 'Contabilidade', icon: Calculator },
  { id: 'rh', name: 'RH', icon: UserCheck },
  { id: 'ti', name: 'TI', icon: Cpu },
];

const initialSubModulesByModule: Record<string, SubModule[]> = {
  comercial: [
    { id: 'indicadores-comerciais', name: 'Indicadores Comerciais' },
    { id: 'licitacao', name: 'Licitação' },
    { id: 'contratacao', name: 'Contratação' },
    { id: 'importacao-direta', name: 'Importação Direta' },
  ],
  financeiro: [
    { id: 'contas-pagar', name: 'Contas a Pagar' },
    { id: 'contas-receber', name: 'Contas a Receber' },
    { id: 'fluxo-caixa', name: 'Fluxo de Caixa' },
  ],
  pessoal: [
    { id: 'colaboradores', name: 'Colaboradores' },
    { id: 'folha-pagamento', name: 'Folha de Pagamento' },
  ],
  // Add empty arrays for other modules
  bi: [],
  cadastro: [],
  administrativo: [],
  estoque: [],
  compras: [],
  contabilidade: [],
  rh: [],
  ti: [],
};

const DraggableSubModule = ({ subModule }: { subModule: SubModule }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: subModule.id,
    data: { type: 'submodule' }
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

const SortableModule = ({ 
  module, 
  isSelected, 
  isOver, 
  onClick,
  onEdit,
  isEditing,
  editingName,
  onEditingNameChange,
  onSaveEdit,
  onCancelEdit,
  activeType
}: { 
  module: Module; 
  isSelected: boolean; 
  isOver: boolean; 
  onClick: () => void;
  onEdit: () => void;
  isEditing: boolean;
  editingName: string;
  onEditingNameChange: (name: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  activeType: 'submodule' | 'module' | null;
}) => {
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: module.id,
  });

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: module.id,
    data: { type: 'module' }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = module.icon;
  
  const isDropTarget = activeType === 'submodule' && isOver;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSaveEdit();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <div
      ref={(node) => {
        setDroppableRef(node);
        setSortableRef(node);
      }}
      style={style}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all",
        isSelected && "bg-gradient-to-r from-biodina-blue to-biodina-blue/90 text-white shadow-md",
        !isSelected && "hover:bg-gray-50 text-gray-700",
        isDropTarget && "border-2 border-dashed border-biodina-blue ring-2 ring-biodina-blue/20 bg-blue-50/30",
        isDragging && "opacity-50"
      )}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      <div className={cn(
        "p-2 rounded-lg",
        isSelected ? 'bg-white/20' : 'bg-biodina-gold/10'
      )}>
        <Icon className={cn(
          "h-5 w-5",
          isSelected ? 'text-white' : 'text-biodina-gold'
        )} />
      </div>
      <div className="flex-1">
        {isEditing ? (
          <Input
            value={editingName}
            onChange={(e) => onEditingNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={onSaveEdit}
            autoFocus
            className="h-6 text-sm font-medium bg-white border-biodina-blue focus:ring-biodina-blue"
          />
        ) : (
          <span className="font-medium">{module.name}</span>
        )}
      </div>
      {isEditing ? (
        <Check 
          className="h-4 w-4 text-green-600 cursor-pointer hover:text-green-700"
          onClick={(e) => {
            e.stopPropagation();
            onSaveEdit();
          }}
        />
      ) : (
        <Pencil 
          className={cn(
            "h-4 w-4 transition-opacity cursor-pointer hover:text-biodina-blue",
            "opacity-0 group-hover:opacity-100 text-gray-400"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        />
      )}
    </div>
  );
};

const PersonalizarNavegacaoContent = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [subModulesByModule, setSubModulesByModule] = useState<Record<string, SubModule[]>>(initialSubModulesByModule);
  const [selectedModule, setSelectedModule] = useState('comercial');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<'submodule' | 'module' | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  
  // Editing state
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveType(event.active.data.current?.type || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id as string || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setActiveType(null);
      setOverId(null);
      return;
    }

    if (activeType === 'submodule') {
      // Moving submodule to a different module
      if (over.data.current?.type === 'module' || modules.find(m => m.id === over.id)) {
        const activeSubmoduleId = active.id as string;
        const targetModuleId = over.id as string;
        
        // Find source module
        let sourceModuleId: string | null = null;
        for (const [moduleId, subModules] of Object.entries(subModulesByModule)) {
          if (subModules.find(sm => sm.id === activeSubmoduleId)) {
            sourceModuleId = moduleId;
            break;
          }
        }
        
        if (sourceModuleId && sourceModuleId !== targetModuleId) {
          const subModuleToMove = subModulesByModule[sourceModuleId].find(sm => sm.id === activeSubmoduleId);
          
          if (subModuleToMove) {
            setSubModulesByModule(prev => ({
              ...prev,
              [sourceModuleId]: prev[sourceModuleId].filter(sm => sm.id !== activeSubmoduleId),
              [targetModuleId]: [...(prev[targetModuleId] || []), subModuleToMove]
            }));
            
            // Switch to target module to show the result
            setSelectedModule(targetModuleId);
          }
        }
      }
    } else if (activeType === 'module') {
      // Reordering modules
      const oldIndex = modules.findIndex(m => m.id === active.id);
      const newIndex = modules.findIndex(m => m.id === over.id);
      
      if (oldIndex !== newIndex) {
        setModules(arrayMove(modules, oldIndex, newIndex));
      }
    }
    
    setActiveId(null);
    setActiveType(null);
    setOverId(null);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    console.log('Salvar alterações de navegação');
  };

  const handleEditModule = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      setEditingModuleId(moduleId);
      setEditingName(module.name);
    }
  };

  const handleSaveEdit = () => {
    if (editingModuleId && editingName.trim()) {
      setModules(prev => 
        prev.map(m => 
          m.id === editingModuleId 
            ? { ...m, name: editingName.trim() } 
            : m
        )
      );
    }
    setEditingModuleId(null);
    setEditingName('');
  };

  const handleCancelEdit = () => {
    setEditingModuleId(null);
    setEditingName('');
  };

  const activeSubModule = activeType === 'submodule' ? 
    Object.values(subModulesByModule).flat().find(sub => sub.id === activeId) : null;

  const selectedModuleName = modules.find(m => m.id === selectedModule)?.name || 'Selecionado';
  const currentSubModules = subModulesByModule[selectedModule] || [];

  // Prepare navigation overrides for SidebarLayout
  const navOverrides = {
    order: modules.map(m => m.id),
    labels: modules.reduce((acc, m) => ({ ...acc, [m.id]: m.name }), {} as Record<string, string>)
  };

  return (
    <SidebarLayout navOverrides={navOverrides}>
      <div className="container mx-auto px-6 py-8">
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
                <SortableContext items={modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {modules.map((module) => (
                      <SortableModule
                        key={module.id}
                        module={module}
                        isSelected={selectedModule === module.id}
                        isOver={overId === module.id}
                        onClick={() => setSelectedModule(module.id)}
                        onEdit={() => handleEditModule(module.id)}
                        isEditing={editingModuleId === module.id}
                        editingName={editingName}
                        onEditingNameChange={setEditingName}
                        onSaveEdit={handleSaveEdit}
                        onCancelEdit={handleCancelEdit}
                        activeType={activeType}
                      />
                    ))}
                  </div>
                </SortableContext>
              </CardContent>
            </Card>

            {/* Right Column - Sub-modules */}
            <Card>
              <CardHeader>
                <CardTitle>Abas do Módulo {selectedModuleName}</CardTitle>
              </CardHeader>
              <CardContent>
                {currentSubModules.length > 0 ? (
                  <div className="space-y-3">
                    {currentSubModules.map((subModule) => (
                      <DraggableSubModule
                        key={subModule.id}
                        subModule={subModule}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Settings className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Este módulo não possui abas configuradas.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <DragOverlay>
            {activeId && activeSubModule ? (
              <div className="flex items-center gap-3 p-3 bg-white border rounded-lg shadow-lg ring-2 ring-biodina-blue/50">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-700">{activeSubModule.name}</span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </SidebarLayout>
  );
};

const PersonalizarNavegacao = () => {
  return <PersonalizarNavegacaoContent />;
};

export default PersonalizarNavegacao;
