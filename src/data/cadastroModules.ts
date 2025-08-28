
import { 
  Users, 
  Package, 
  Building2, 
  Warehouse,
  Wrench,
  CreditCard,
  Tag,
  Calendar
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
            nome: "Termômetro Digital",
            categoria: "Equipamentos",
            fabricante: "MedTech",
            preco: 89.90,
            estoque: 150
          },
          {
            id: 2,
            codigo: "MED002", 
            nome: "Estetoscópio",
            categoria: "Instrumentos",
            fabricante: "HealthCorp",
            preco: 245.00,
            estoque: 75
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
  }
};
