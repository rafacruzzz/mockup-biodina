
import { Users, Building2, Package, Wrench } from "lucide-react";
import { ModulesConfig } from "@/types/cadastro";

export const cadastroModules: ModulesConfig = {
  "usuarios": {
    name: "Usuários",
    icon: Users,
    subModules: {
      "usuarios": {
        name: "Usuários",
        data: []
      }
    }
  },
  "entidades": {
    name: "Entidades",
    icon: Building2,
    subModules: {
      "clientes": {
        name: "Clientes",
        data: []
      },
      "fornecedores": {
        name: "Fornecedores", 
        data: []
      },
      "transportadoras": {
        name: "Transportadoras",
        data: []
      }
    }
  },
  "produtos": {
    name: "Produtos",
    icon: Package,
    subModules: {
      "produtos": {
        name: "Produtos",
        data: []
      }
    }
  },
  "servicos": {
    name: "Serviços",
    icon: Wrench,
    subModules: {
      "servicos": {
        name: "Serviços",
        data: []
      }
    }
  }
};
