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
  UserCheck, Cpu, GripVertical, Settings, Pencil, Check,
  Plus, Folder, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import SidebarLayout from '@/components/SidebarLayout';
import TreeView from '@/components/navigation/TreeView';
import { TreeItem, NavigationModule } from '@/types/navigation';

interface Module {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  isFixed?: boolean; // For Personalizar Navegação
}

const initialModules: Module[] = [
  // { id: 'aplicativos', name: 'Aplicativos', icon: Home, isFixed: true }, // Escondido temporariamente
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
  { id: 'personalizar-navegacao', name: 'Personalizar Navegação', icon: Settings, isFixed: true },
];

const initialTreeStructure: Record<string, TreeItem[]> = {
  // aplicativos: [], // Escondido temporariamente
  cadastro: [
    {
      id: 'usuarios-group',
      name: 'Usuários',
      type: 'group',
      children: [
        {
          id: 'usuarios-item',
          name: 'Usuários',
          type: 'item',
          parentId: 'usuarios-group'
        }
      ]
    },
    {
      id: 'entidades-group',
      name: 'Entidades',
      type: 'group',
      children: [
        {
          id: 'entidades-item',
          name: 'Entidades',
          type: 'item',
          parentId: 'entidades-group'
        }
      ]
    },
    {
      id: 'produtos-group',
      name: 'Produtos',
      type: 'group',
      children: [
        {
          id: 'produtos-item',
          name: 'Produtos',
          type: 'item',
          parentId: 'produtos-group'
        }
      ]
    },
    {
      id: 'servicos-group',
      name: 'Serviços',
      type: 'group',
      children: [
        {
          id: 'servicos-item',
          name: 'Serviços',
          type: 'item',
          parentId: 'servicos-group'
        }
      ]
    },
    {
      id: 'categorias-group',
      name: 'Categorias',
      type: 'group',
      children: [
        {
          id: 'categorias-item',
          name: 'Categorias',
          type: 'item',
          parentId: 'categorias-group'
        }
      ]
    },
    {
      id: 'cadastros-financeiros-group',
      name: 'Cadastros Financeiros',
      type: 'group',
      children: [
        {
          id: 'contas-bancarias-item',
          name: 'Contas Bancárias',
          type: 'item',
          parentId: 'cadastros-financeiros-group'
        },
        {
          id: 'prazos-pagamento-item',
          name: 'Prazos de Pagamento',
          type: 'item',
          parentId: 'cadastros-financeiros-group'
        }
      ]
    }
  ],
  comercial: [
    {
      id: 'indicadores-comerciais',
      name: 'Indicadores Comerciais',
      type: 'item'
    },
    {
      id: 'licitacao',
      name: 'Licitação',
      type: 'item'
    },
    {
      id: 'contratacao',
      name: 'Contratação',
      type: 'item'
    },
    {
      id: 'importacao-direta',
      name: 'Importação Direta',
      type: 'item'
    }
  ],
  financeiro: [
    {
      id: 'contas-pagar',
      name: 'Contas a Pagar',
      type: 'item'
    },
    {
      id: 'contas-receber',
      name: 'Contas a Receber',
      type: 'item'
    },
    {
      id: 'fluxo-caixa',
      name: 'Fluxo de Caixa',
      type: 'item'
    }
  ],
  pessoal: [
    {
      id: 'colaboradores',
      name: 'Colaboradores',
      type: 'item'
    },
    {
      id: 'folha-pagamento',
      name: 'Folha de Pagamento',
      type: 'item'
    }
  ],
  // Empty arrays for other modules
  bi: [],
  administrativo: [],
  estoque: [],
  compras: [],
  contabilidade: [],
  rh: [],
  ti: [],
  'personalizar-navegacao': [],
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
  activeType,
  isDragPreview = false
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
  activeType: 'tree-item' | 'module' | null;
  isDragPreview?: boolean;
}) => {
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: module.id,
    disabled: module.isFixed || isDragPreview,
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
    data: { type: 'module' },
    disabled: module.isFixed || isDragPreview
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = module.icon;
  
  const isDropTarget = activeType === 'tree-item' && isOver && !module.isFixed;

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
        if (!isDragPreview) {
          setDroppableRef(node);
          setSortableRef(node);
        }
      }}
      style={style}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all",
        isSelected && "bg-gradient-to-r from-biodina-blue to-biodina-blue/90 text-white shadow-md",
        !isSelected && "hover:bg-gray-50 text-gray-700",
        isDropTarget && "border-2 border-dashed border-biodina-blue ring-2 ring-biodina-blue/20 bg-blue-50/30",
        isDragging && "opacity-50",
        isDragPreview && "shadow-2xl ring-2 ring-biodina-blue/50 bg-white"
      )}
    >
      {!module.isFixed && (
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
      )}
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
        {isEditing && !module.isFixed ? (
          <Input
            value={editingName}
            onChange={(e) => onEditingNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={onSaveEdit}
            autoFocus
            className={cn(
              "h-8 text-sm font-medium border-2",
              isSelected 
                ? "bg-white text-gray-900 border-white focus:ring-white focus:border-white" 
                : "bg-white text-gray-900 border-biodina-blue focus:ring-biodina-blue focus:border-biodina-blue"
            )}
          />
        ) : (
          <span className="font-medium">{module.name}</span>
        )}
      </div>
      {!module.isFixed && (
        <>
          {isEditing ? (
            <Check 
              className={cn(
                "h-4 w-4 cursor-pointer hover:opacity-80",
                isSelected ? "text-white" : "text-green-600"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onSaveEdit();
              }}
            />
          ) : (
            <Pencil 
              className={cn(
                "h-4 w-4 transition-opacity cursor-pointer hover:opacity-80",
                "opacity-0 group-hover:opacity-100",
                isSelected ? "text-white" : "text-gray-400 hover:text-biodina-blue"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

const PersonalizarNavegacaoContent = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [treeStructure, setTreeStructure] = useState<Record<string, TreeItem[]>>(initialTreeStructure);
  const [selectedModule, setSelectedModule] = useState('cadastro');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<'tree-item' | 'module' | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  
  // Editing state
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingTreeItemId, setEditingTreeItemId] = useState<string | null>(null);
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

    if (activeType === 'tree-item') {
      // Handle tree item movement logic here
      console.log('Tree item drag end:', { active: active.id, over: over.id });
    } else if (activeType === 'module') {
      // Reordering modules (excluding fixed ones)
      const oldIndex = modules.findIndex(m => m.id === active.id);
      const newIndex = modules.findIndex(m => m.id === over.id);
      
      if (oldIndex !== newIndex && !modules[oldIndex].isFixed && !modules[newIndex].isFixed) {
        // Keep fixed modules in place
        const reorderableModules = modules.filter(m => !m.isFixed);
        const fixedModules = modules.filter(m => m.isFixed);
        
        const oldReorderableIndex = reorderableModules.findIndex(m => m.id === active.id);
        const newReorderableIndex = reorderableModules.findIndex(m => m.id === over.id);
        
        if (oldReorderableIndex !== -1 && newReorderableIndex !== -1) {
          const reorderedModules = arrayMove(reorderableModules, oldReorderableIndex, newReorderableIndex);
          
          // Reconstruct the full list with fixed modules in correct positions
          const personalizar = fixedModules.find(m => m.id === 'personalizar-navegacao');
          
          setModules([...reorderedModules, personalizar!]);
        }
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
    if (module && !module.isFixed) {
      setEditingModuleId(moduleId);
      setEditingName(module.name);
    }
  };

  const handleSaveModuleEdit = () => {
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

  const handleCancelModuleEdit = () => {
    setEditingModuleId(null);
    setEditingName('');
  };

  const handleEditTreeItem = (itemId: string) => {
    // Find the item in the tree structure to get its current name
    const findItemName = (items: TreeItem[]): string => {
      for (const item of items) {
        if (item.id === itemId) return item.name;
        if (item.children) {
          const found = findItemName(item.children);
          if (found) return found;
        }
      }
      return '';
    };

    const currentItems = treeStructure[selectedModule] || [];
    const itemName = findItemName(currentItems);
    
    setEditingTreeItemId(itemId);
    setEditingName(itemName);
  };

  const handleSaveTreeItemEdit = () => {
    if (editingTreeItemId && editingName.trim()) {
      // Update the tree structure with the new name
      const updateItemName = (items: TreeItem[]): TreeItem[] => {
        return items.map(item => {
          if (item.id === editingTreeItemId) {
            return { ...item, name: editingName.trim() };
          }
          if (item.children) {
            return { ...item, children: updateItemName(item.children) };
          }
          return item;
        });
      };

      setTreeStructure(prev => ({
        ...prev,
        [selectedModule]: updateItemName(prev[selectedModule] || [])
      }));
    }
    setEditingTreeItemId(null);
    setEditingName('');
  };

  const handleCancelTreeItemEdit = () => {
    setEditingTreeItemId(null);
    setEditingName('');
  };

  const handleNewGroup = () => {
    const newGroup: TreeItem = {
      id: `group-${Date.now()}`,
      name: 'Novo Grupo',
      type: 'group',
      children: []
    };

    setTreeStructure(prev => ({
      ...prev,
      [selectedModule]: [...(prev[selectedModule] || []), newGroup]
    }));
  };

  const selectedModuleName = modules.find(m => m.id === selectedModule)?.name || 'Selecionado';
  const currentTreeItems = treeStructure[selectedModule] || [];

  // Get dragged item for overlay
  const draggedModule = activeType === 'module' ? modules.find(m => m.id === activeId) : null;

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
              Arraste e solte as abas para reorganizar os módulos do sistema e criar estruturas hierárquicas.
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
                        onSaveEdit={handleSaveModuleEdit}
                        onCancelEdit={handleCancelModuleEdit}
                        activeType={activeType}
                      />
                    ))}
                  </div>
                </SortableContext>
              </CardContent>
            </Card>

            {/* Right Column - Tree Structure */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Estrutura do Módulo {selectedModuleName}</CardTitle>
                  <Button
                    onClick={handleNewGroup}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Novo Grupo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {currentTreeItems.length > 0 ? (
                  <TreeView
                    items={currentTreeItems}
                    onEdit={handleEditTreeItem}
                    isEditing={editingTreeItemId !== null}
                    editingItemId={editingTreeItemId}
                    editingName={editingName}
                    onEditingNameChange={setEditingName}
                    onSaveEdit={handleSaveTreeItemEdit}
                    onCancelEdit={handleCancelTreeItemEdit}
                    overId={overId}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Folder className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Este módulo não possui estrutura configurada.</p>
                    <p className="text-sm mt-2">Clique em "Novo Grupo" para começar.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <DragOverlay>
            {activeId && activeType === 'module' && draggedModule ? (
              <SortableModule
                module={draggedModule}
                isSelected={false}
                isOver={false}
                onClick={() => {}}
                onEdit={() => {}}
                isEditing={false}
                editingName=""
                onEditingNameChange={() => {}}
                onSaveEdit={() => {}}
                onCancelEdit={() => {}}
                activeType={null}
                isDragPreview={true}
              />
            ) : activeId && activeType === 'tree-item' ? (
              <div className="flex items-center gap-2 p-3 bg-white border rounded-lg shadow-lg ring-2 ring-biodina-blue/50">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <Folder className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-gray-700">Item sendo arrastado</span>
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
