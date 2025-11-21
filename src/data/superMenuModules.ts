import { Building2, Users, Package, Settings } from "lucide-react";

export interface SuperSubModule {
  name: string;
}

export interface SuperModule {
  name: string;
  icon: any;
  subModules: Record<string, SuperSubModule>;
}

export type SuperModulesConfig = Record<string, SuperModule>;

export const superModules: SuperModulesConfig = {
  empresas: {
    name: "Empresas",
    icon: Building2,
    subModules: {
      gestao: {
        name: "Gestão de Empresas",
      },
    },
  },
  usuarios: {
    name: "Usuários",
    icon: Users,
    subModules: {
      lista: {
        name: "Lista de Usuários",
      },
    },
  },
  modulos: {
    name: "Módulos",
    icon: Package,
    subModules: {
      disponiveis: {
        name: "Módulos Disponíveis",
      },
    },
  },
  configuracoes: {
    name: "Configurações",
    icon: Settings,
    subModules: {
      sistema: {
        name: "Sistema",
      },
    },
  },
};
