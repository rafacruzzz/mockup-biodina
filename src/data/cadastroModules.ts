
import { Package, Users, Settings, Wrench, Building, CreditCard, Tag, Clock, Warehouse } from "lucide-react";
import { ModulesConfig } from "@/types/cadastro";

export const modules: ModulesConfig = {
  entidades: {
    name: "Entidades",
    icon: Users,
    subModules: {
      entidades: {
        name: "Entidades",
        data: [
          { id: 1, nome_razao_social: "Hospital São Lucas", tipo: "Cliente", cnpj_cpf: "11.222.333/0001-44", contato: "Dr. Carlos Lima", telefone: "(11) 7777-6666", email: "carlos@saolucas.com.br", status: "Ativo" },
          { id: 2, nome_razao_social: "Fornecedor Medicamentos ABC Ltda", tipo: "Fornecedor", cnpj_cpf: "12.345.678/0001-90", contato: "João Silva", telefone: "(11) 9999-8888", email: "joao@abc.com.br", status: "Ativo" },
          { id: 3, nome_razao_social: "Hospital Regional Norte", tipo: "Lead", cnpj_cpf: "", contato: "Dr. Pedro Oliveira", telefone: "(85) 5555-4444", email: "pedro@regionalrte.com.br", status: "Novo" }
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
          { id: 1, codigo: "MED001", nome: "Paracetamol 500mg", categoria: "Analgésicos", unidade: "Caixa", fabricante: "EMS", codigo_barras: "7891234567890", estoque: 250, preco_venda: 12.50, preco_custo: 8.50, ativo: true },
          { id: 2, codigo: "MED002", nome: "Amoxicilina 875mg", categoria: "Antibióticos", unidade: "Caixa", fabricante: "Eurofarma", codigo_barras: "7891234567891", estoque: 180, preco_venda: 28.90, preco_custo: 19.50, ativo: true }
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
      },
      estoque: {
        name: "Estoque",
        data: [
          { id: 1, empresa_id: "11.222.333/0001-44", nome_fantasia: "WebMED Rio", deposito_id: "DEP001", local_fisico: "Prateleira A1" },
          { id: 2, empresa_id: "12.345.678/0001-90", nome_fantasia: "Distribuidora SP", deposito_id: "DEP002", local_fisico: "Câmara Fria B" },
          { id: 3, empresa_id: "11.222.333/0001-44", nome_fantasia: "WebMED Rio", deposito_id: "DEP003", local_fisico: "Galpão Externo C" }
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
