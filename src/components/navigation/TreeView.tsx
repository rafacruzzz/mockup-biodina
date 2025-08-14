
import React, { useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { 
  ChevronDown, 
  ChevronRight, 
  Folder, 
  FileText, 
  GripVertical,
  Pencil,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TreeItem } from '@/types/navigation';
import { Input } from '@/components/ui/input';

interface TreeNodeProps {
  item: TreeItem;
  depth: number;
  isOver: boolean;
  canDrop: boolean;
  onEdit: (id: string) => void;
  isEditing: boolean;
  editingItemId: string | null;
  editingName: string;
  onEditingNameChange: (name: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  item,
  depth,
  isOver,
  canDrop,
  onEdit,
  isEditing,
  editingItemId,
  editingName,
  onEditingNameChange,
  onSaveEdit,
  onCancelEdit
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: item.id,
    data: { 
      type: 'tree-item',
      itemType: item.type,
      parentId: item.parentId
    }
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id: `drop-${item.id}`,
    data: { type: 'tree-drop-zone', targetId: item.id }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {};

  const hasChildren = item.children && item.children.length > 0;
  const isGroup = item.type === 'group';
  const Icon = isGroup ? Folder : FileText;
  const isCurrentlyEditing = isEditing && editingItemId === item.id;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSaveEdit();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <div className="relative">
      {/* Connection lines for hierarchy */}
      {depth > 0 && (
        <div 
          className="absolute left-0 top-0 w-6 h-6 border-l-2 border-b-2 border-gray-200 rounded-bl-md"
          style={{ marginLeft: `${(depth - 1) * 24 + 8}px` }}
        />
      )}
      
      {/* Main item */}
      <div
        ref={(node) => {
          setDragRef(node);
          setDropRef(node);
        }}
        style={style}
        className={cn(
          "group flex items-center gap-2 p-2 rounded-lg transition-all relative",
          "hover:bg-gray-50",
          isDragging && "opacity-50 z-50",
          isOver && canDrop && "bg-blue-50 border-2 border-dashed border-biodina-blue",
          // Add left margin for indentation
          depth > 0 && "ml-6"
        )}
        style={{
          ...style,
          marginLeft: `${depth * 24}px`,
        }}
      >
        {/* Drag handle */}
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>

        {/* Expand/collapse button for groups */}
        {isGroup ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>
        ) : (
          <div className="w-6" /> // Spacer for alignment
        )}

        {/* Icon */}
        <div className={cn(
          "p-1 rounded",
          isGroup ? 'text-yellow-600' : 'text-blue-600'
        )}>
          <Icon className="h-4 w-4" />
        </div>

        {/* Name */}
        <div className="flex-1">
          {isCurrentlyEditing ? (
            <Input
              value={editingName}
              onChange={(e) => onEditingNameChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={onSaveEdit}
              autoFocus
              className="h-6 text-sm border-biodina-blue focus:ring-biodina-blue"
            />
          ) : (
            <span className="text-sm font-medium text-gray-700">{item.name}</span>
          )}
        </div>

        {/* Edit button */}
        {isCurrentlyEditing ? (
          <Check 
            className="h-4 w-4 text-green-600 cursor-pointer hover:text-green-700"
            onClick={(e) => {
              e.stopPropagation();
              onSaveEdit();
            }}
          />
        ) : (
          <Pencil 
            className="h-4 w-4 opacity-0 group-hover:opacity-100 text-gray-400 cursor-pointer hover:text-biodina-blue transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item.id);
            }}
          />
        )}
      </div>

      {/* Children */}
      {isGroup && hasChildren && isExpanded && (
        <div className="relative">
          {/* Vertical line for children */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"
            style={{ marginLeft: `${depth * 24 + 20}px` }}
          />
          
          <div>
            {item.children!.map((child, index) => (
              <TreeNode
                key={child.id}
                item={child}
                depth={depth + 1}
                isOver={false}
                canDrop={false}
                onEdit={onEdit}
                isEditing={isEditing}
                editingItemId={editingItemId}
                editingName={editingName}
                onEditingNameChange={onEditingNameChange}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
              />
            ))}
          </div>
        </div>
      )}

      {/* Drop zone indicator for moving items into groups */}
      {isGroup && isOver && canDrop && (
        <div className="ml-8 mt-1 p-2 border-2 border-dashed border-biodina-blue rounded bg-blue-50/30">
          <div className="text-xs text-biodina-blue font-medium">
            Soltar aqui para mover para dentro de "{item.name}"
          </div>
        </div>
      )}
    </div>
  );
};

interface TreeViewProps {
  items: TreeItem[];
  onEdit: (id: string) => void;
  isEditing: boolean;
  editingItemId: string | null;
  editingName: string;
  onEditingNameChange: (name: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  overId: string | null;
}

const TreeView: React.FC<TreeViewProps> = ({
  items,
  onEdit,
  isEditing,
  editingItemId,
  editingName,
  onEditingNameChange,
  onSaveEdit,
  onCancelEdit,
  overId
}) => {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <TreeNode
          key={item.id}
          item={item}
          depth={0}
          isOver={overId === `drop-${item.id}`}
          canDrop={true}
          onEdit={onEdit}
          isEditing={isEditing}
          editingItemId={editingItemId}
          editingName={editingName}
          onEditingNameChange={onEditingNameChange}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </div>
  );
};

export default TreeView;
