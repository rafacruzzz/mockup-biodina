
import { Package, Users, Settings, Wrench, Building, CreditCard, Tag, Clock, Mail, FileText, ShoppingCart, Calculator } from "lucide-react";
import { ModulesConfig } from "@/types/cadastro";

export const modules: ModulesConfig = {
  leads: {
    name: "Leads",
    icon: Users,
    subModules: {
      fontes: {
        name: "Fontes dos Leads",
        data: [
          { id: 1, nome: "Website Biodina", origem: "Site Corporativo", conversao: "15%", leads_mes: 45, status: "Ativo" },
          { id: 2, nome: "Google Ads", origem: "Publicidade Paga", conversao: "8%", leads_mes: 120, status: "Ativo" },
          { id: 3, nome: "LinkedIn", origem: "Rede Social", conversao: "12%", leads_mes: 30, status: "Ativo" },
          { id: 4, nome: "Indicação", origem: "Networking", conversao: "35%", leads_mes: 15, status: "Ativo" }
        ]
      },
      segmentos: {
        name: "Segmentos dos Leads",
        data: [
          { id: 1, segmento: "Agricultura de Precisão", descricao: "Produtores rurais tecnológicos", leads_total: 150, conversao: "18%" },
          { id: 2, segmento: "Cooperativas Agrícolas", descricao: "Cooperativas e associações", leads_total: 85, conversao: "25%" },
          { id: 3, segmento: "Consultoria Rural", descricao: "Consultores e agrônomos", leads_total: 60, conversao: "20%" },
          { id: 4, segmento: "Empresas Agro", descricao: "Empresas do agronegócio", leads_total: 45, conversao: "30%" }
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
            nome: "Drone Mavic 3 Enterprise Advanced", 
            codigo: "DJI-M3E-ADV", 
            valor_venda: 25890.00, 
            estoque: 8, 
            estoque_disponivel: 6,
            unidade_medida: "UN",
            peso: 0.895,
            ncm: "88062090",
            ean: "6941565929853",
            marca: "DJI",
            tipo_produto: "Drone",
            familia_produto: "Drones Profissionais",
            grupo_produto: "Equipamentos de Voo",
            subgrupo_produto: "Drones Enterprise",
            preco_custo: 18500.00,
            ativo: true,
            tags: "drone, mapeamento, inspeção, agricultura"
          },
          { 
            id: 2, 
            nome: "Sensor Multiespectral MicaSense RedEdge-MX", 
            codigo: "MICA-RE-MX", 
            valor_venda: 8750.00, 
            estoque: 12, 
            estoque_disponivel: 10,
            unidade_medida: "UN",
            peso: 0.232,
            ncm: "90069090",
            marca: "MicaSense",
            tipo_produto: "Sensor",
            familia_produto: "Sensores Multiespectrais",
            grupo_produto: "Sensores Avançados",
            subgrupo_produto: "Agricultura de Precisão",
            preco_custo: 6200.00,
            ativo: true,
            tags: "sensor, multiespectral, agricultura, ndvi"
          },
          { 
            id: 3, 
            nome: "Sistema de Navegação RTK Base + Rover", 
            codigo: "RTK-BASE-ROV", 
            valor_venda: 15650.00, 
            estoque: 5, 
            estoque_disponivel: 4,
            unidade_medida: "KIT",
            peso: 2.5,
            ncm: "85171100",
            marca: "Biodina Systems",
            tipo_produto: "Sistema RTK",
            familia_produto: "Navegação e Posicionamento",
            grupo_produto: "GPS/GNSS",
            subgrupo_produto: "RTK",
            preco_custo: 11200.00,
            ativo: true,
            tags: "rtk, gps, navegação, precisão"
          },
          { 
            id: 4, 
            nome: "Software PIX4Dmapper - Licença Anual", 
            codigo: "PIX4D-MAP-1Y", 
            valor_venda: 4200.00, 
            estoque: 999, 
            estoque_disponivel: 999,
            unidade_medida: "LIC",
            peso: 0,
            tipo_produto: "Software",
            familia_produto: "Software de Processamento",
            grupo_produto: "Mapeamento",
            subgrupo_produto: "Processamento de Imagens",
            preco_custo: 3150.00,
            ativo: true,
            tags: "software, mapeamento, processamento, pix4d"
          }
        ]
      },
      kits: {
        name: "Kits",
        data: [
          { id: 1, nome: "Kit Completo Agricultura de Precisão", codigo: "KIT-AGR-PREC", produtos_inclusos: 4, valor_total: 42890.00 },
          { id: 2, nome: "Kit Mapeamento Básico", codigo: "KIT-MAP-BAS", produtos_inclusos: 2, valor_total: 28500.00 },
          { id: 3, nome: "Kit Inspeção Industrial", codigo: "KIT-INSP-IND", produtos_inclusos: 3, valor_total: 35600.00 }
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
      locais_estoque: {
        name: "Locais de Estoque",
        data: [
          { id: 1, codigo: "EST-SP-01", descricao: "Estoque Principal São Paulo", tipo: "Principal", padrao: true, responsavel_separacao: "João Silva", responsavel_despacho: "Maria Santos", ativo: true },
          { id: 2, codigo: "EST-RS-02", descricao: "Estoque Filial Rio Grande do Sul", tipo: "Filial", padrao: false, responsavel_separacao: "Carlos Lima", responsavel_despacho: "Ana Costa", ativo: true },
          { id: 3, codigo: "EST-GO-03", descricao: "Estoque Regional Goiás", tipo: "Regional", padrao: false, responsavel_separacao: "Pedro Oliveira", responsavel_despacho: "Lucia Ferreira", ativo: true }
        ]
      },
      movimentacao_estoque: {
        name: "Movimentação de Estoque",
        data: [
          { id: 1, codigo: "MOV-001", tipo_movimento: "Entrada", data: "2024-01-15", motivo: "Compra de fornecedor", estoque_origem: "", estoque_destino: "EST-SP-01", observacao: "Recebimento nota fiscal 12345" },
          { id: 2, codigo: "MOV-002", tipo_movimento: "Saída", data: "2024-01-16", motivo: "Venda", estoque_origem: "EST-SP-01", estoque_destino: "", observacao: "Venda para cliente ABC Ltda" },
          { id: 3, codigo: "MOV-003", tipo_movimento: "Transferência", data: "2024-01-17", motivo: "Reposição estoque", estoque_origem: "EST-SP-01", estoque_destino: "EST-RS-02", observacao: "Transferência inter-filial" }
        ]
      },
      rastreio_lotes: {
        name: "Rastreio de Lotes ou Séries",
        data: [
          { id: 1, codigo: "LOTE-001", produto: "Drone Mavic 3 Enterprise", lote_serie: "DJI2024001", quantidade: 1, nfe: "000123456", ativo: true, criado_por: "Sistema", criado_em: "2024-01-15" },
          { id: 2, codigo: "LOTE-002", produto: "Sensor RedEdge-MX", lote_serie: "MICA2024002", quantidade: 2, nfe: "000123457", ativo: true, criado_por: "João Silva", criado_em: "2024-01-16" }
        ]
      },
      marcas: {
        name: "Marcas",
        data: [
          { id: 1, nome: "DJI", descricao: "Líder mundial em drones", pais_origem: "China", ativo: true },
          { id: 2, nome: "MicaSense", descricao: "Sensores multiespectrais avançados", pais_origem: "EUA", ativo: true },
          { id: 3, nome: "Biodina Systems", descricao: "Soluções próprias Biodina", pais_origem: "Brasil", ativo: true }
        ]
      },
      familias_produtos: {
        name: "Famílias de Produtos",
        data: [
          { id: 1, nome: "Drones Profissionais", descricao: "Drones para uso comercial e industrial", ativo: true },
          { id: 2, nome: "Sensores Multiespectrais", descricao: "Sensores para agricultura de precisão", ativo: true },
          { id: 3, nome: "Software de Processamento", descricao: "Softwares para análise de dados", ativo: true }
        ]
      },
      grupos_produtos: {
        name: "Grupo de Produtos",
        data: [
          { id: 1, nome: "Equipamentos de Voo", descricao: "Todos os equipamentos aéreos", familia: "Drones Profissionais", ativo: true },
          { id: 2, nome: "Sensores Avançados", descricao: "Sensores de alta tecnologia", familia: "Sensores Multiespectrais", ativo: true },
          { id: 3, nome: "Mapeamento", descricao: "Ferramentas de mapeamento", familia: "Software de Processamento", ativo: true }
        ]
      },
      subgrupos_produtos: {
        name: "Subgrupos de Produtos",
        data: [
          { id: 1, nome: "Drones Enterprise", descricao: "Drones para uso empresarial", grupo: "Equipamentos de Voo", ativo: true },
          { id: 2, nome: "Agricultura de Precisão", descricao: "Equipamentos para agricultura", grupo: "Sensores Avançados", ativo: true },
          { id: 3, nome: "Processamento de Imagens", descricao: "Software para imagens aéreas", grupo: "Mapeamento", ativo: true }
        ]
      }
    }
  },
  servicos: {
    name: "Serviços",
    icon: Wrench,
    subModules: {
      categoria_servicos: {
        name: "Categoria de Serviços",
        data: [
          { id: 1, nome: "Mapeamento Aéreo", descricao: "Serviços de mapeamento com drones", ativo: true },
          { id: 2, nome: "Consultoria Técnica", descricao: "Consultoria em agricultura de precisão", ativo: true },
          { id: 3, nome: "Treinamento", descricao: "Capacitação em tecnologias", ativo: true }
        ]
      },
      unidade_servicos: {
        name: "Unidade de Serviços",
        data: [
          { id: 1, codigo: "SERV-001", nome: "Mapeamento por Hectare", valor: 25.00, codigo_servico: "MAP-HA", unidade_medida: "HA", categoria: "Mapeamento Aéreo", ativo: true },
          { id: 2, codigo: "SERV-002", nome: "Consultoria por Hora", valor: 150.00, codigo_servico: "CONS-HR", unidade_medida: "HR", categoria: "Consultoria Técnica", ativo: true },
          { id: 3, codigo: "SERV-003", nome: "Treinamento por Pessoa", valor: 800.00, codigo_servico: "TREI-PESS", unidade_medida: "PESS", categoria: "Treinamento", ativo: true }
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
          { id: 1, nome_usuario: "admin", email: "admin@biodina.com.br", ip_registro: "192.168.1.100", criado_em: "2024-01-01", ultimo_acesso: "2024-01-20", ip_ultimo_acesso: "192.168.1.105" },
          { id: 2, nome_usuario: "joao.silva", email: "joao.silva@biodina.com.br", ip_registro: "192.168.1.101", criado_em: "2024-01-02", ultimo_acesso: "2024-01-19", ip_ultimo_acesso: "192.168.1.110" }
        ]
      }
    }
  },
  campos_personalizados: {
    name: "Campos Personalizados",
    icon: Settings,
    subModules: {
      campos_personalizados: {
        name: "Campos Personalizados",
        data: [
          { id: 1, nome: "Altitude Máxima", tipo: "Número", modulo: "Produtos", obrigatorio: false, ativo: true },
          { id: 2, nome: "Certificação ANATEL", tipo: "Sim/Não", modulo: "Produtos", obrigatorio: true, ativo: true }
        ]
      }
    }
  },
  campos_obrigatorios: {
    name: "Campos Obrigatórios",
    icon: Settings,
    subModules: {
      campos_obrigatorios: {
        name: "Campos Obrigatórios",
        data: [
          { id: 1, campo: "NCM", modulo: "Produtos", obrigatorio: true, ativo: true },
          { id: 2, campo: "Peso", modulo: "Produtos", obrigatorio: false, ativo: true }
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
  caracteristicas: {
    name: "Características",
    icon: Tag,
    subModules: {
      caracteristicas: {
        name: "Características",
        data: [
          { id: 1, nome: "Resistência à Água", tipo: "IP Rating", valores_possiveis: "IP44, IP54, IP65", ativo: true },
          { id: 2, nome: "Autonomia de Voo", tipo: "Tempo", valores_possiveis: "15min, 30min, 45min", ativo: true }
        ]
      }
    }
  },
  recorrencia: {
    name: "Recorrência",
    icon: Clock,
    subModules: {
      recorrencia: {
        name: "Recorrência",
        data: [
          { id: 1, nome: "Mensal", periodo: "30 dias", descricao: "Cobrança mensal", ativo: true },
          { id: 2, nome: "Anual", periodo: "365 dias", descricao: "Cobrança anual", ativo: true }
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
          { id: 1, nome: "Equipamentos", descricao: "Categoria para equipamentos físicos", tipo: "Produtos", ativo: true },
          { id: 2, nome: "Software", descricao: "Categoria para softwares e licenças", tipo: "Produtos", ativo: true },
          { id: 3, nome: "Serviços", descricao: "Categoria para prestação de serviços", tipo: "Serviços", ativo: true }
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
  },
  modelos_emails: {
    name: "Modelos de E-mails",
    icon: Mail,
    subModules: {
      modelos_emails: {
        name: "Modelos de E-mails",
        data: [
          { id: 1, nome: "Boas Vindas", assunto: "Bem-vindo à Biodina!", tipo: "Cliente", ativo: true },
          { id: 2, nome: "Confirmação Pedido", assunto: "Pedido Confirmado", tipo: "Vendas", ativo: true }
        ]
      }
    }
  },
  modelos_formularios: {
    name: "Modelos de Formulários",
    icon: FileText,
    subModules: {
      modelos_formularios: {
        name: "Modelos de Formulários",
        data: [
          { id: 1, nome: "Cadastro de Cliente", descricao: "Formulário para novos clientes", campos: 8, ativo: true },
          { id: 2, nome: "Solicitação de Orçamento", descricao: "Formulário para orçamentos", campos: 12, ativo: true }
        ]
      }
    }
  }
};
