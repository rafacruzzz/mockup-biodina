
import { Users, Calendar, Building2, TrendingUp, FileText } from "lucide-react";
import { ModulesConfig } from "@/types/cadastro";

export const rhModules: ModulesConfig = {
  "processo-seletivo": {
    name: "Processo Seletivo",
    icon: Users,
    subModules: {
      "processos": {
        name: "Processos",
        data: []
      },
      "banco-curriculos": {
        name: "Banco de Currículos",
        data: []
      }
    }
  },
  "departamentos": {
    name: "Departamentos",
    icon: Building2,
    subModules: {
      "departamentos": {
        name: "Departamentos",
        data: []
      }
    }
  },
  "expedientes": {
    name: "Expedientes",
    icon: Calendar,
    subModules: {
      "expedientes": {
        name: "Expedientes",
        data: []
      }
    }
  },
  "planos-carreira": {
    name: "Planos de Carreira",
    icon: TrendingUp,
    subModules: {
      "planos": {
        name: "Planos",
        data: []
      },
      "cargos": {
        name: "Cargos",
        data: []
      },
      "niveis": {
        name: "Níveis de Progressão",
        data: []
      }
    }
  }
};
