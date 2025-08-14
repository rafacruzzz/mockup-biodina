
export interface TreeItem {
  id: string;
  name: string;
  type: 'group' | 'item';
  icon?: React.ComponentType<any>;
  children?: TreeItem[];
  parentId?: string;
}

export interface NavigationModule {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  structure: TreeItem[];
}

export interface DragItem {
  id: string;
  type: 'tree-item';
  itemType: 'group' | 'item';
  parentId?: string;
}
