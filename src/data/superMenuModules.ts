import { Building2 } from "lucide-react";

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
};
