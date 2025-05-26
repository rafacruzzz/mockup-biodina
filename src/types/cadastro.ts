
export interface ModuleData {
  id: number;
  [key: string]: any;
}

export interface SubModule {
  name: string;
  data: ModuleData[];
}

export interface Module {
  name: string;
  icon: any;
  subModules: Record<string, SubModule>;
}

export type ModulesConfig = Record<string, Module>;
