
export interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface SubModule {
  key: string;
  name: string;
  permissions: Permission;
}

export interface ModuleAccess {
  key: string;
  name: string;
  icon: string;
  enabled: boolean;
  subModules: SubModule[];
}

export interface EmpresaVinculada {
  id: string;
  tipo: 'principal' | 'filial';
  nome: string;
  moduleAccess: ModuloUsuario[]; // Permissões específicas desta empresa
}

export interface AccessProfile {
  id: string;
  name: string;
  description: string;
  modules: Record<string, ModuleAccess>;
}

// ========== Tipos para Sistema Granular de Permissões ==========

// Submódulo habilitado para empresa/filial (sem permissões CRUD)
export interface SubModuloEmpresa {
  key: string;
  name: string;
  habilitado: boolean;
}

// Módulo com submódulos para empresa/filial
export interface ModuloEmpresa {
  key: string;
  name: string;
  icon: string;
  habilitado: boolean;
  subModulos: SubModuloEmpresa[];
}

// Submódulo com permissões CRUD para usuário
export interface SubModuloUsuario {
  key: string;
  name: string;
  habilitado: boolean;
  permissions: Permission;
}

// Módulo com submódulos para usuário
export interface ModuloUsuario {
  key: string;
  name: string;
  icon: string;
  habilitado: boolean;
  subModulos: SubModuloUsuario[];
}
