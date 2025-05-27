
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
      // kits: {
      //   name: "Kits",
      //   data: [
      //     { id: 1, nome: "Kit Completo Agricultura de Precisão", codigo: "KIT-AGR-PREC", produtos_inclusos: 4, valor_total: 42890.00 },
      //     { id: 2, nome: "Kit Mapeamento Básico", codigo: "KIT-MAP-BAS", produtos_inclusos: 2, valor_total: 28500.00 },
      //     { id: 3, nome: "Kit Inspeção Industrial", codigo: "KIT-INSP-IND", produtos_inclusos: 3, valor_total: 35600.00 }
      //   ]
      // },
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
      // locais_estoque: {
      //   name: "Locais de Estoque",
      //   data: [
      //     { id: 1, codigo: "EST-SP-01", descricao: "Estoque Principal São Paulo", tipo: "Principal", padrao: true, responsavel_separacao: "João Silva", responsavel_despacho: "Maria Santos", ativo: true },
      //     { id: 2, codigo: "EST-RS-02", descricao: "Estoque Filial Rio Grande do Sul", tipo: "Filial", padrao: false, responsavel_separacao: "Carlos Lima", responsavel_despacho: "Ana Costa", ativo: true },
      //     { id: 3, codigo: "EST-GO-03", descricao: "Estoque Regional Goiás", tipo: "Regional", padrao: false, responsavel_separacao: "Pedro Oliveira", responsavel_despacho: "Lucia Ferreira", ativo: true }
      //   ]
      // },
      // movimentacao_estoque: {
      //   name: "Movimentação de Estoque",
      //   data: [
      //     { id: 1, codigo: "MOV-001", tipo_movimento: "Entrada", data: "2024-01-15", motivo: "Compra de fornecedor", estoque_origem: "", estoque_destino: "EST-SP-01", observacao: "Recebimento nota fiscal 12345" },
      //     { id: 2, codigo: "MOV-002", tipo_movimento: "Saída", data: "2024-01-16", motivo: "Venda", estoque_origem: "EST-SP-01", estoque_destino: "", observacao: "Venda para cliente ABC Ltda" },
      //     { id: 3, codigo: "MOV-003", tipo_movimento: "Transferência", data: "2024-01-17", motivo: "Reposição estoque", estoque_origem: "EST-SP-01", estoque_destino: "EST-RS-02", observacao: "Transferência inter-filial" }
      //   ]
      // },
      // rastreio_lotes: {
      //   name: "Rastreio de Lotes ou Séries",
      //   data: [
      //     { id: 1, codigo: "LOTE-001", produto: "Drone Mavic 3 Enterprise", lote_serie: "DJI2024001", quantidade: 1, nfe: "000123456", ativo: true, criado_por: "Sistema", criado_em: "2024-01-15" },
      //     { id: 2, codigo: "LOTE-002", produto: "Sensor RedEdge-MX", lote_serie: "MICA2024002", quantidade: 2, nfe: "000123457", ativo: true, criado_por: "João Silva", criado_em: "2024-01-16" }
      //   ]
      // },
      // marcas: {
      //   name: "Marcas",
      //   data: [
      //     { id: 1, nome: "DJI", descricao: "Líder mundial em drones", pais_origem: "China", ativo: true },
      //     { id: 2, nome: "MicaSense", descricao: "Sensores multiespectrais avançados", pais_origem: "EUA", ativo: true },
      //     { id: 3, nome: "Biodina Systems", descricao: "Soluções próprias Biodina", pais_origem: "Brasil", ativo: true }
      //   ]
      // },
      // familias_produtos: {
      //   name: "Famílias de Produtos",
      //   data: [
      //     { id: 1, nome: "Drones Profissionais", descricao: "Drones para uso comercial e industrial", ativo: true },
      //     { id: 2, nome: "Sensores Multiespectrais", descricao: "Sensores para agricultura de precisão", ativo: true },
      //     { id: 3, nome: "Software de Processamento", descricao: "Softwares para análise de dados", ativo: true }
      //   ]
      // },
      // grupos_produtos: {
      //   name: "Grupo de Produtos",
      //   data: [
      //     { id: 1, nome: "Equipamentos de Voo", descricao: "Todos os equipamentos aéreos", familia: "Drones Profissionais", ativo: true },
      //     { id: 2, nome: "Sensores Avançados", descricao: "Sensores de alta tecnologia", familia: "Sensores Multiespectrais", ativo: true },
      //     { id: 3, nome: "Mapeamento", descricao: "Ferramentas de mapeamento", familia: "Software de Processamento", ativo: true }
      //   ]
      // },
      // subgrupos_produtos: {
      //   name: "Subgrupos de Produtos",
      //   data: [
      //     { id: 1, nome: "Drones Enterprise", descricao: "Drones para uso empresarial", grupo: "Equipamentos de Voo", ativo: true },
      //     { id: 2, nome: "Agricultura de Precisão", descricao: "Equipamentos para agricultura", grupo: "Sensores Avançados", ativo: true },
      //     { id: 3, nome: "Processamento de Imagens", descricao: "Software para imagens aéreas", grupo: "Mapeamento", ativo: true }
      //   ]
      // }
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
  // campos_personalizados: {
  //   name: "Campos Personalizados",
  //   icon: Settings,
  //   subModules: {
  //     campos_personalizados: {
  //       name: "Campos Personalizados",
  //       data: [
  //         { id: 1, nome: "Altitude Máxima", tipo: "Número", modulo: "Produtos", obrigatorio: false, ativo: true },
  //         { id: 2, nome: "Certificação ANATEL", tipo: "Sim/Não", modulo: "Produtos", obrigatorio: true, ativo: true }
  //       ]
  //     }
  //   }
  // },
  // campos_obrigatorios: {
  //   name: "Campos Obrigatórios",
  //   icon: Settings,
  //   subModules: {
  //     campos_obrigatorios: {
  //       name: "Campos Obrigatórios",
  //       data: [
  //         { id: 1, campo: "NCM", modulo: "Produtos", obrigatorio: true, ativo: true },
  //         { id: 2, campo: "Peso", modulo: "Produtos", obrigatorio: false, ativo: true }
  //       ]
  //     }
  //   }
  // },
  // caracteristicas: {
  //   name: "Características",
  //   icon: Tag,
  //   subModules: {
  //     caracteristicas: {
  //       name: "Características",
  //       data: [
  //         { id: 1, nome: "Resistência à Água", tipo: "IP Rating", valores_possiveis: "IP44, IP54, IP65", ativo: true },
  //         { id: 2, nome: "Autonomia de Voo", tipo: "Tempo", valores_possiveis: "15min, 30min, 45min", ativo: true }
  //       ]
  //     }
  //   }
  // },
  // recorrencia: {
  //   name: "Recorrência",
  //   icon: Clock,
  //   subModules: {
  //     recorrencia: {
  //       name: "Recorrência",
  //       data: [
  //         { id: 1, nome: "Mensal", periodo: "30 dias", descricao: "Cobrança mensal", ativo: true },
  //         { id: 2, nome: "Anual", periodo: "365 dias", descricao: "Cobrança anual", ativo: true }
  //       ]
  //     }
  //   }
  // },
  // modelos_emails: {
  //   name: "Modelos de E-mails",
  //   icon: Mail,
  //   subModules: {
  //     modelos_emails: {
  //       name: "Modelos de E-mails",
  //       data: [
  //         { id: 1, nome: "Boas Vindas", assunto: "Bem-vindo à Biodina!", tipo: "Cliente", ativo: true },
  //         { id: 2, nome: "Confirmação Pedido", assunto: "Pedido Confirmado", tipo: "Vendas", ativo: true }
  //       ]
  //     }
  //   }
  // },
  // modelos_formularios: {
  //   name: "Modelos de Formulários",
  //   icon: FileText,
  //   subModules: {
  //     modelos_formularios: {
  //       name: "Modelos de Formulários",
  //       data: [
  //         { id: 1, nome: "Cadastro de Cliente", descricao: "Formulário para novos clientes", campos: 8, ativo: true },
  //         { id: 2, nome: "Solicitação de Orçamento", descricao: "Formulário para orçamentos", campos: 12, ativo: true }
  //       ]
  //     }
  //   }
  // }
};
