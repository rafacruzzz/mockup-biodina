import { 
  Users, 
  Package, 
  Building2, 
  Warehouse,
  Wrench,
  CreditCard,
  Tag,
  Calendar,
  FileText
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
  },
  prazos_pagamento: {
    name: "Prazos de Pagamento",
    icon: Calendar,
    subModules: {
      prazos: {
        name: "Prazos",
        data: [
          {
            id: 1,
            nome: "À Vista",
            dias: 0
          }
        ]
      }
    }
  },
  // Nova seção: Atualizações de Produto ANVISA
  atualizacoes_anvisa: {
    name: "Atualizações ANVISA", 
    icon: FileText,
    subModules: {
      atualizacoes: {
        name: "Atualizações",
        data: [
          {
            id: 1,
            produtoId: 1,
            nomeProduto: "Analisador Bioquímico ABC-2000",
            numeroRegistroAnvisa: "10117770145", 
            tipoAtualizacao: "Alteração de Instrução de Uso",
            processo: "25351.999888/2024-25",
            status: "concluido",
            dataInicioProcesso: "2024-04-10",
            areaAnvisa: "produtos_saude",
            fabricante: "ABC Medical Inc."
          },
          {
            id: 2,
            produtoId: 2,
            nomeProduto: "Ventilador Pulmonar DEF-300",
            numeroRegistroAnvisa: "10117770146",
            tipoAtualizacao: "Alteração de Especificações Técnicas",
            processo: "25351.999889/2024-26",
            status: "em_andamento",
            dataInicioProcesso: "2024-06-01",
            areaAnvisa: "produtos_saude",
            fabricante: "DEF Healthcare Solutions"
          },
          {
            id: 3,
            produtoId: 5,
            nomeProduto: "Kit COVID-19 Pro",
            numeroRegistroAnvisa: "25351999888201985",
            tipoAtualizacao: "Alteração de Validade",
            processo: "25351.999891/2024-28",
            status: "pendente_anvisa",
            dataInicioProcesso: "2024-08-01",
            areaAnvisa: "diagnostico_in_vitro",
            fabricante: "GHI Diagnostics Ltd."
          }
        ]
      }
    }
  },
  registros_anvisa: {
    name: "Registros ANVISA",
    icon: FileText,
    subModules: {
      registros: {
        name: "Registros",
        data: [
          { 
            id: 1, 
            nomeProduto: "Analisador Bioquímico ABC-2000",
            processo: "25351.123456/2024-15",
            areaAnvisa: "produtos_saude",
            status: "aprovado",
            fabricante: "ABC Medical Inc.",
            nomeArquivoPrincipal: "Dossiê_ABC-2000.pdf"
          },
          { 
            id: 2, 
            nomeProduto: "Ventilador Pulmonar DEF-300",
            processo: "25351.654321/2024-16",
            areaAnvisa: "produtos_saude",
            status: "em_andamento",
            dataEnvio: "2024-02-15",
            fabricante: "DEF Healthcare Solutions",
            nomeArquivoPrincipal: "Dossiê_DEF-300.pdf"
          }
        ]
      }
    }
  }
};