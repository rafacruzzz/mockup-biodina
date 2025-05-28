
import { Package, Users, Settings, Wrench, Building, CreditCard, Tag, Clock, Mail, FileText, ShoppingCart, Calculator } from "lucide-react";
import { ModulesConfig } from "@/types/cadastro";

export const modules: ModulesConfig = {
  entidades: {
    name: "Entidades",
    icon: Users,
    subModules: {
      fornecedores: {
        name: "Fornecedores",
        data: [
          { id: 1, razao_social: "Fornecedor Medicamentos ABC Ltda", cnpj: "12.345.678/0001-90", contato: "João Silva", telefone: "(11) 9999-8888", email: "joao@abc.com.br", status: "Ativo" },
          { id: 2, razao_social: "Distribuidora Pharma Solutions", cnpj: "98.765.432/0001-10", contato: "Maria Santos", telefone: "(21) 8888-7777", email: "maria@pharma.com.br", status: "Ativo" }
        ]
      },
      clientes: {
        name: "Clientes",
        data: [
          { id: 1, razao_social: "Hospital São Lucas", cnpj: "11.222.333/0001-44", contato: "Dr. Carlos Lima", telefone: "(11) 7777-6666", email: "carlos@saolucas.com.br", tipo: "Pessoa Jurídica", status: "Ativo" },
          { id: 2, razao_social: "Clínica Vida Saudável", cnpj: "44.555.666/0001-77", contato: "Dra. Ana Costa", telefone: "(21) 6666-5555", email: "ana@vidasaudavel.com.br", tipo: "Pessoa Jurídica", status: "Ativo" }
        ]
      },
      leads: {
        name: "Leads",
        data: [
          { id: 1, nome: "Hospital Regional Norte", contato: "Dr. Pedro Oliveira", telefone: "(85) 5555-4444", email: "pedro@regionalrte.com.br", origem: "Website", status: "Novo", interesse: "Medicamentos Oncológicos" },
          { id: 2, nome: "Farmácia Central", contato: "Lucia Ferreira", telefone: "(31) 4444-3333", email: "lucia@farmaciacentral.com.br", origem: "Indicação", status: "Qualificado", interesse: "Antibióticos" }
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
          { id: 1, codigo: "MED001", nome: "Paracetamol 500mg", marca: "Genérico", categoria: "Analgésicos", estoque: 250, preco_venda: 12.50, status: "Ativo" },
          { id: 2, codigo: "MED002", nome: "Amoxicilina 875mg", marca: "EMS", categoria: "Antibióticos", estoque: 180, preco_venda: 28.90, status: "Ativo" }
        ]
      },
      tabela_preco: {
        name: "Tabela de Preço",
        data: [
          { id: 1, nome: "Padrão Varejo", descricao: "Preços para venda direta", margem: "40%", ativa: true },
          { id: 2, nome: "Distribuidores", descricao: "Preços para revendas", margem: "25%", ativa: true },
          { id: 3, nome: "Cooperativas", descricao: "Preços especiais cooperativas", margem: "30%", ativa: true }
        ]
      },
      kits: {
        name: "Kits",
        data: [
          { id: 1, nome: "Kit Antibiótico Completo", codigo: "KIT-ANTI-001", produtos_inclusos: 5, valor_total: 285.50 },
          { id: 2, nome: "Kit Analgésicos Básico", codigo: "KIT-ANAL-002", produtos_inclusos: 3, valor_total: 125.90 }
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
          { id: 1, codigo: "SERV-001", nome: "Consultoria Farmacêutica", valor: 150.00, unidade_medida: "HORA", categoria: "Consultoria", ativo: true, descricao: "Consultoria especializada em medicamentos" },
          { id: 2, codigo: "SERV-002", nome: "Treinamento em Boas Práticas", valor: 800.00, unidade_medida: "TREINAMENTO", categoria: "Educação", ativo: true, descricao: "Treinamento para equipes" }
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
          { id: 1, nome: "João Silva", email: "joao.silva@biodina.com.br", nivel_acesso: "Administrador", acessos: "Todos os módulos", alertas: "Ativo", status: "Ativo" },
          { id: 2, nome: "Maria Santos", email: "maria.santos@biodina.com.br", nivel_acesso: "Vendedor", acessos: "Comercial, Cadastros", alertas: "Ativo", status: "Ativo" }
        ]
      }
    }
  },
  departamentos: {
    name: "Departamentos",
    icon: Building,
    subModules: {
      departamentos: {
        name: "Departamentos",
        data: [
          { id: 1, nome: "Comercial", descricao: "Vendas e relacionamento com clientes", responsavel: "Maria Santos", ativo: true },
          { id: 2, nome: "Técnico", descricao: "Suporte técnico e desenvolvimento", responsavel: "Carlos Lima", ativo: true },
          { id: 3, nome: "Administrativo", descricao: "Gestão administrativa", responsavel: "Ana Costa", ativo: true }
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
          { id: 1, banco: "Banco do Brasil", agencia: "1234-5", conta: "12345-6", tipo: "Conta Corrente", ativo: true },
          { id: 2, banco: "Itaú", agencia: "5678-9", conta: "98765-4", tipo: "Conta Corrente", ativo: true }
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
          { id: 1, nome: "Medicamentos", descricao: "Categoria para medicamentos", tipo: "Produtos", ativo: true },
          { id: 2, nome: "Equipamentos Médicos", descricao: "Categoria para equipamentos médicos", tipo: "Produtos", ativo: true },
          { id: 3, nome: "Serviços Médicos", descricao: "Categoria para prestação de serviços médicos", tipo: "Serviços", ativo: true }
        ]
      }
    }
  },
  prazos_pagamento: {
    name: "Prazos de Pagamento",
    icon: Clock,
    subModules: {
      prazos_pagamento: {
        name: "Prazos de Pagamento",
        data: [
          { id: 1, nome: "À Vista", dias: 0, descricao: "Pagamento imediato", ativo: true },
          { id: 2, nome: "30 dias", dias: 30, descricao: "Pagamento em 30 dias", ativo: true },
          { id: 3, nome: "60 dias", dias: 60, descricao: "Pagamento em 60 dias", ativo: true }
        ]
      }
    }
  }
};
