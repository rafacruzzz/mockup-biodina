
export interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  admin: boolean;
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
}

export interface AccessProfile {
  id: string;
  name: string;
  description: string;
  modules: Record<string, ModuleAccess>;
}
