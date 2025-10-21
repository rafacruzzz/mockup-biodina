import { 
  Users, 
  Package, 
  Building2, 
  Warehouse,
  Wrench,
  CreditCard,
  Tag
} from "lucide-react";
import type { ModulesConfig } from "@/types/cadastro";

export const modules: ModulesConfig = {
  entidades: {
    name: "Entidades",
    icon: Building2,
    subModules: {
      entidades: {
        name: "Entidades",
        data: [
          {
            id: 1,
            nome: "Hospital São Lucas",
            cnpj: "12.345.678/0001-90",
            tipo: "Cliente",
            cidade: "São Paulo",
            uf: "SP",
            telefone: "(11) 3456-7890",
            email: "contato@saolucas.com.br"
          },
          {
            id: 2,
            nome: "Clínica Vida",
            cnpj: "98.765.432/0001-10",
            tipo: "Fornecedor",
            cidade: "Rio de Janeiro",
            uf: "RJ",
            telefone: "(21) 2345-6789",
            email: "comercial@clinicavida.com.br"
          }
        ]
      }
    }
  },
  produtos: {
    name: "Produtos",
    icon: Package,
    subModules: {
      produtos: {
        name: "Produtos",
        data: [
          {
            id: 1,
            codigo: "ABC-2000",
            referencia: "MED-ABC-2000",
            nome: "Analisador Bioquímico ABC-2000",
            descricao: "Analisador bioquímico automatizado de alta precisão para análises clínicas",
            modelo: "ABC-2000",
            fabricante: "ABC Medical Inc.",
            familiaProduto: "Equipamentos de Análise",
            marca: "ABC Medical",
            areaAnvisa: "produtos_saude"
          },
          {
            id: 2,
            codigo: "DEF-300",
            referencia: "VENT-DEF-300",
            nome: "Ventilador Pulmonar DEF-300",
            descricao: "Ventilador pulmonar mecânico com controles avançados para UTI",
            modelo: "DEF-300",
            fabricante: "DEF Healthcare Solutions",
            familiaProduto: "Equipamentos de Ventilação",
            marca: "DEF Healthcare",
            areaAnvisa: "produtos_saude"
          },
          {
            id: 3,
            codigo: "XYZ-Pro",
            referencia: "MON-XYZ-Pro",
            nome: "Monitor Multiparâmetros XYZ-Pro",
            descricao: "Monitor multiparâmetros para monitoramento contínuo de sinais vitais",
            modelo: "XYZ-Pro",
            fabricante: "XYZ Medical Corp.",
            familiaProduto: "Equipamentos de Monitoramento",
            marca: "XYZ Medical",
            areaAnvisa: "produtos_saude"
          },
          {
            id: 4,
            codigo: "ECG-Elite",
            referencia: "CARD-ECG-Elite",
            nome: "Eletrocardiógrafo Elite",
            descricao: "Eletrocardiógrafo digital de 12 derivações com interpretação automática",
            modelo: "Elite-12",
            fabricante: "CardioTech Solutions",
            familiaProduto: "Equipamentos Cardiológicos",
            marca: "CardioTech",
            areaAnvisa: "produtos_saude"
          },
          {
            id: 5,
            codigo: "COVID-Kit-Pro",
            referencia: "DIAG-COVID-Pro",
            nome: "Kit COVID-19 Pro",
            descricao: "Kit de teste PCR para detecção rápida de COVID-19",
            modelo: "GH-2024",
            fabricante: "GHI Diagnostics Ltd.",
            familiaProduto: "Kits de Diagnóstico",
            marca: "GHI Diagnostics",
            areaAnvisa: "diagnostico_in_vitro"
          }
        ]
      }
    }
  },
  estoque: {
    name: "Estoque",
    icon: Warehouse,
    subModules: {
      estoque: {
        name: "Estoque",
        data: [
          {
            id: 1,
            nome: "Produto A",
            quantidade: 150,
            minimo: 50,
            localizacao: "A-01-15"
          }
        ]
      }
    }
  },
  servicos: {
    name: "Serviços",
    icon: Wrench,
    subModules: {
      servicos: {
        name: "Serviços",
        data: [
          {
            id: 1,
            nome: "Manutenção Preventiva",
            descricao: "Manutenção preventiva de equipamentos médicos",
            valor: 500.00
          }
        ]
      }
    }
  },
  usuarios: {
    name: "Usuários",
    icon: Users,
    subModules: {
      usuarios: {
        name: "Usuários",
        data: [
          {
            id: 1,
            nome: "João Silva",
            email: "joao@email.com",
            perfil: "Administrador"
          }
        ]
      }
    }
  },
  contas_bancarias: {
    name: "Contas Bancárias",
    icon: CreditCard,
    subModules: {
      contas: {
        name: "Contas",
        data: [
          {
            id: 1,
            banco: "Banco do Brasil",
            agencia: "1234-5",
            conta: "12345-6",
            tipo: "Corrente"
          }
        ]
      }
    }
  },
  categorias: {
    name: "Categorias",
    icon: Tag,
    subModules: {
      categorias: {
        name: "Categorias",
        data: [
          {
            id: 1,
            nome: "Equipamentos Médicos",
            descricao: "Categoria para equipamentos médicos"
          }
        ]
      }
    }
  }
};