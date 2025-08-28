
import { ColaboradorData } from './colaborador';

export interface UserCredentials {
  username?: string;
  password?: string;
  confirmPassword?: string;
  isActive: boolean;
  userType?: string;
  moduleAccess: ModuleAccess[];
}

export interface ModuleAccess {
  moduleId: string;
  moduleName: string;
  hasAccess: boolean;
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    admin: boolean;
  };
}

export interface UserData extends ColaboradorData {
  // User identification - these are required
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: 'Novo' | 'Ativo' | 'Inativo' | 'Desligado';
  
  // Optional credentials (not all users need login access)
  credentials?: UserCredentials;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  status: 'Novo' | 'Ativo' | 'Inativo' | 'Desligado';
  dados: UserData;
}
