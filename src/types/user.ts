
import { ColaboradorData } from './colaborador';

export interface UserCredentials {
  username: string;
  password: string;
  confirmPassword: string;
  isActive: boolean;
  userType: string;
}

export interface ModuleAccess {
  key: string;
  name: string;
  icon: string;
  enabled: boolean;
  subModules: SubModuleAccess[];
}

export interface SubModuleAccess {
  key: string;
  name: string;
  enabled: boolean;
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

// Unified user type that includes all colaborador data plus credentials
export interface UserData extends ColaboradorData {
  id: string;
  credentials: UserCredentials;
  moduleAccess: ModuleAccess[];
  // Status from colaborador for compatibility
  status: 'Novo' | 'Ativo' | 'Inativo' | 'Desligado';
}
