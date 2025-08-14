
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
    marginLeft: `${depth * 24}px`,
  } : {
    marginLeft: `${depth * 24}px`,
  };

  const hasChildren = item.children && item.children.length > 0;
  const isGroup = item.type === 'group';
  const Icon = isGroup ? Folder : FileText;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSaveEdit();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <div>
      {/* Main item */}
      <div
        ref={(node) => {
          setDragRef(node);
          setDropRef(node);
        }}
        style={style}
        className={cn(
          "group flex items-center gap-2 p-2 rounded-lg transition-all",
          "hover:bg-gray-50",
          isDragging && "opacity-50",
          isOver && canDrop && "bg-blue-50 border-2 border-dashed border-biodina-blue",
          depth > 0 && "border-l-2 border-gray-200"
        )}
      >
        {/* Drag handle */}
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>

        {/* Expand/collapse button */}
        {isGroup && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>
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
          {isEditing ? (
            <Input
              value={editingName}
              onChange={(e) => onEditingNameChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={onSaveEdit}
              autoFocus
              className="h-6 text-sm"
            />
          ) : (
            <span className="text-sm font-medium text-gray-700">{item.name}</span>
          )}
        </div>

        {/* Edit button */}
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
        <div className="ml-4">
          {item.children!.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              depth={depth + 1}
              isOver={false}
              canDrop={false}
              onEdit={onEdit}
              isEditing={isEditing && editingName === child.name}
              editingName={editingName}
              onEditingNameChange={onEditingNameChange}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TreeViewProps {
  items: TreeItem[];
  onEdit: (id: string) => void;
  isEditing: boolean;
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
