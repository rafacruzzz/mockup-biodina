
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
            codigo: "MED001",
            referencia: "TER-DIG-001",
            nome: "Termômetro Digital",
            descricao: "Termômetro digital clínico com display LCD",
            familiaProduto: "Termômetros",
            marca: "MedTech",
            modelo: "MT-100",
            categoria: "Equipamentos",
            fabricante: "MedTech",
            areaAnvisa: "produtos_saude",
            preco: 89.90,
            estoque: 150
          },
          {
            id: 2,
            codigo: "MED002",
            referencia: "EST-CAR-002", 
            nome: "Estetoscópio",
            descricao: "Estetoscópio cardiológico duplo tubo",
            familiaProduto: "Estetoscópios",
            marca: "HealthCorp",
            modelo: "HC-200",
            categoria: "Instrumentos",
            fabricante: "HealthCorp",
            areaAnvisa: "produtos_saude",
            preco: 245.00,
            estoque: 75
          },
          {
            id: 3,
            codigo: "LAB001",
            referencia: "GLI-TEST-003",
            nome: "Kit Teste Glicemia",
            descricao: "Kit completo para teste de glicemia capilar",
            familiaProduto: "Testes Diagnósticos",
            marca: "DiagnostiCorp",
            modelo: "DC-GLI-50",
            categoria: "Diagnóstico",
            fabricante: "DiagnostiCorp",
            areaAnvisa: "diagnostico_in_vitro",
            preco: 125.50,
            estoque: 200
          },
          {
            id: 4,
            codigo: "SUR001",
            referencia: "LUV-CIR-004",
            nome: "Luvas Cirúrgicas Estéreis",
            descricao: "Luvas cirúrgicas de látex estéreis - Par",
            familiaProduto: "Materiais Cirúrgicos",
            marca: "SurgiSafe",
            modelo: "SS-LAT-7.5",
            categoria: "Materiais",
            fabricante: "SurgiSafe Medical",
            areaAnvisa: "produtos_saude",
            preco: 12.75,
            estoque: 1500
          },
          {
            id: 5,
            codigo: "RAD001",
            referencia: "RX-FILM-005",
            nome: "Filme Radiográfico",
            descricao: "Filme radiográfico 18x24cm alta sensibilidade",
            familiaProduto: "Radiologia",
            marca: "RadioMax",
            modelo: "RM-1824-HS",
            categoria: "Radiologia",
            fabricante: "RadioMax Solutions",
            areaAnvisa: "produtos_saude",
            preco: 45.30,
            estoque: 500
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
            produto: "Termômetro Digital",
            codigo: "MED001",
            quantidade: 150,
            localizacao: "A-01-15",
            lote: "LT2024001",
            validade: "2025-12-31"
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
            categoria: "Manutenção",
            preco: 150.00,
            duracao: "2 horas",
            descricao: "Serviço de manutenção preventiva em equipamentos médicos"
          },
          {
            id: 2,
            nome: "Calibração",
            categoria: "Técnico",
            preco: 200.00,
            duracao: "1 hora",
            descricao: "Calibração de equipamentos de precisão"
          }
        ]
      }
    }
  },
  usuarios: {
    name: "Usuários",
    icon: Users,
    subModules: {
      // usuarios: {
      //   name: "Usuários",
      //   data: [
      //     {
      //       id: 1,
      //       nome: "João Silva",
      //       email: "joao.silva@biodina.com.br",
      //       perfil: "Administrador",
      //       status: "Ativo",
      //       ultimoAcesso: "2024-01-15"
      //     },
      //     {
      //       id: 2,
      //       nome: "Maria Santos",
      //       email: "maria.santos@biodina.com.br", 
      //       perfil: "Usuário",
      //       status: "Ativo",
      //       ultimoAcesso: "2024-01-14"
      //     }
      //   ]
      // },
      colaboradores: {
        name: "Usuários",
        data: [
          {
            id: 1,
            nome: "Carlos Oliveira",
            cpf: "123.456.789-00",
            empresa: "Biodina Sistemas",
            setor: "Comercial",
            cargo: "Vendedor",
            dataAdmissao: "2023-06-15",
            telefone: "(11) 98765-4321",
            email: "carlos.oliveira@biodina.com.br"
          },
          {
            id: 2,
            nome: "Ana Costa",
            cpf: "987.654.321-00",
            empresa: "Biodina Sistemas",
            setor: "RH",
            cargo: "Analista de RH",
            dataAdmissao: "2023-03-10",
            telefone: "(11) 91234-5678",
            email: "ana.costa@biodina.com.br"
          }
        ]
      }
    }
  },
  contas_bancarias: {
    name: "Contas Bancárias",
    icon: CreditCard,
    subModules: {
      contas_bancarias: {
        name: "Contas Bancárias",
        data: [
          {
            id: 1,
            banco: "Banco do Brasil",
            agencia: "1234-5",
            conta: "12345-6",
            tipo: "Conta Corrente",
            titular: "Biodina Sistemas Ltda",
            saldo: 125000.50
          },
          {
            id: 2,
            banco: "Itaú",
            agencia: "9876-1",
            conta: "98765-4",
            tipo: "Conta Poupança",
            titular: "Biodina Sistemas Ltda",
            saldo: 75000.00
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
            descricao: "Equipamentos para uso hospitalar",
            ativo: true
          },
          {
            id: 2,
            nome: "Descartáveis",
            descricao: "Materiais de uso único",
            ativo: true
          }
        ]
      }
    }
  },
  prazos_pagamento: {
    name: "Prazos de Pagamento",
    icon: Calendar,
    subModules: {
      prazos_pagamento: {
        name: "Prazos de Pagamento",
        data: [
          {
            id: 1,
            nome: "À Vista",
            dias: 0,
            descricao: "Pagamento à vista",
            ativo: true
          },
          {
            id: 2,
            nome: "30 dias",
            dias: 30,
            descricao: "Pagamento em 30 dias",
            ativo: true
          },
          {
            id: 3,
            nome: "60 dias",
            dias: 60,
            descricao: "Pagamento em 60 dias",
            ativo: true
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
        name: "Controle de Registros",
        data: [
          { 
            id: 1, 
            nomeProduto: "Analisador Bioquímico ABC-2000",
            processo: "25351.123456/2024-12",
            areaAnvisa: "produtos_saude",
            status: "aprovado",
            dataEnvio: "2024-01-15",
            dataPublicacaoDOU: "2024-03-10",
            fabricante: "Abbott Laboratories",
            nomeArquivoPrincipal: "Dossiê_ABC-2000.pdf"
          },
          { 
            id: 2, 
            nomeProduto: "Kit Teste Glicemia Pro",
            processo: "25351.654321/2024-13",
            areaAnvisa: "diagnostico_in_vitro",
            status: "publicado",
            dataEnvio: "2024-02-10",
            dataPublicacaoDOU: "2024-03-01",
            fabricante: "DiagnostiCorp",
            nomeArquivoPrincipal: "Dossiê_Glicemia_Pro.pdf"
          },
          { 
            id: 3, 
            nomeProduto: "Monitor Cardíaco MC-500",
            processo: "25351.789012/2024-14",
            areaAnvisa: "produtos_saude",
            status: "enviado",
            dataEnvio: "2024-03-05",
            fabricante: "CardioTech Medical",
            nomeArquivoPrincipal: "Dossiê_MC-500.pdf"
          },
          { 
            id: 4, 
            nomeProduto: "Reagente Enzimático REZ-100",
            processo: "25351.345678/2024-15",
            areaAnvisa: "diagnostico_in_vitro",
            status: "em_preparacao",
            fabricante: "BioReagentes SA",
            nomeArquivoPrincipal: "Dossiê_REZ-100.pdf"
          },
          { 
            id: 5, 
            nomeProduto: "Ventilador Pulmonar VP-2024",
            processo: "25351.901234/2024-16",
            areaAnvisa: "produtos_saude",
            status: "rejeitado",
            dataEnvio: "2024-01-20",
            fabricante: "RespiraTech",
            nomeArquivoPrincipal: "Dossiê_VP-2024.pdf"
          },
          { 
            id: 6, 
            nomeProduto: "Sistema de Imagem SI-X1",
            processo: "25351.567890/2024-17",
            areaAnvisa: "produtos_saude",
            status: "aprovado",
            dataEnvio: "2023-11-15",
            dataPublicacaoDOU: "2024-02-05",
            fabricante: "ImageMed Technologies",
            nomeArquivoPrincipal: "Dossiê_SI-X1.pdf"
          },
          { 
            id: 7, 
            nomeProduto: "Kit Diagnóstico COVID-19",
            processo: "25351.234567/2024-18",
            areaAnvisa: "diagnostico_in_vitro",
            status: "publicado",
            dataEnvio: "2024-02-28",
            dataPublicacaoDOU: "2024-04-15",
            fabricante: "VirusDiag Corp",
            nomeArquivoPrincipal: "Dossiê_COVID-19.pdf"
          },
          { 
            id: 8, 
            nomeProduto: "Desfibrilador Automático DEA-Pro",
            processo: "25351.876543/2024-19",
            areaAnvisa: "produtos_saude",
            status: "enviado",
            dataEnvio: "2024-03-12",
            fabricante: "EmergencyMed Inc",
            nomeArquivoPrincipal: "Dossiê_DEA-Pro.pdf"
          },
          { 
            id: 9, 
            nomeProduto: "Analisador Hematológico AH-3000",
            processo: "25351.456789/2024-20",
            areaAnvisa: "diagnostico_in_vitro",
            status: "em_preparacao",
            fabricante: "HematoLab Solutions",
            nomeArquivoPrincipal: "Dossiê_AH-3000.pdf"
          },
          { 
            id: 10, 
            nomeProduto: "Mesa Cirúrgica Eletrônica MCE-2024",
            processo: "25351.678901/2024-21",
            areaAnvisa: "produtos_saude",
            status: "aprovado",
            dataEnvio: "2023-12-10",
            dataPublicacaoDOU: "2024-01-25",
            fabricante: "SurgiEquip Medical",
            nomeArquivoPrincipal: "Dossiê_MCE-2024.pdf"
          }
        ]
      }
    }
  }
};
