
import { 
  Users, Package, Settings, Building, Tag, Clock, CreditCard, Mail, FileText
} from "lucide-react";
import { ModulesConfig } from "@/types/cadastro";

export const modules: ModulesConfig = {
  leads: {
    name: 'Leads',
    icon: Users,
    subModules: {
      fontes: { 
        name: 'Fontes dos Leads', 
        data: [
          { id: 1, nome: 'Website Corporativo', tipo: 'Digital', conversao: '3.2%', leads: 156, custo: 'R$ 2.450', ativo: true },
          { id: 2, nome: 'Facebook Ads', tipo: 'Redes Sociais', conversao: '2.8%', leads: 89, custo: 'R$ 3.200', ativo: true },
          { id: 3, nome: 'Google Ads', tipo: 'Search', conversao: '4.1%', leads: 203, custo: 'R$ 5.800', ativo: true },
          { id: 4, nome: 'Indicação de Clientes', tipo: 'Orgânico', conversao: '8.5%', leads: 45, custo: 'R$ 0', ativo: true },
        ]
      },
      segmentos: { 
        name: 'Segmentos dos Leads', 
        data: [
          { id: 1, segmento: 'Empresas de Grande Porte', descricao: 'Acima de 500 funcionários', leads: 67, ticketMedio: 'R$ 45.000', conversao: '12%' },
          { id: 2, segmento: 'Médias Empresas', descricao: 'Entre 100-500 funcionários', leads: 134, ticketMedio: 'R$ 18.500', conversao: '8%' },
          { id: 3, segmento: 'Pequenas Empresas', descricao: 'Entre 20-100 funcionários', leads: 298, ticketMedio: 'R$ 8.200', conversao: '5%' },
          { id: 4, segmento: 'Startups', descricao: 'Até 20 funcionários', leads: 156, ticketMedio: 'R$ 3.500', conversao: '6%' },
        ]
      }
    }
  },
  produtos: {
    name: 'Produtos',
    icon: Package,
    subModules: {
      produtos: { 
        name: 'Produtos', 
        data: [
          { 
            id: 1, 
            nome: 'Sistema de Gestão ERP Pro', 
            codigo: 'ERP001', 
            valorVenda: 2500.00, 
            precoCusto: 1200.00, 
            estoque: 150, 
            estoqueDisponivel: 142,
            marca: 'Biodina Tech',
            categoria: 'Software',
            ativo: true 
          },
          { 
            id: 2, 
            nome: 'Módulo CRM Advanced', 
            codigo: 'CRM002', 
            valorVenda: 1800.00, 
            precoCusto: 850.00, 
            estoque: 89, 
            estoqueDisponivel: 85,
            marca: 'Biodina Tech',
            categoria: 'Software',
            ativo: true 
          },
          { 
            id: 3, 
            nome: 'Dashboard Analytics', 
            codigo: 'DAS003', 
            valorVenda: 950.00, 
            precoCusto: 450.00, 
            estoque: 67, 
            estoqueDisponivel: 67,
            marca: 'Biodina Analytics',
            categoria: 'Software',
            ativo: false 
          },
        ]
      },
      kits: { 
        name: 'Kits', 
        data: [
          { id: 1, nome: 'Kit Empresarial Básico', codigo: 'KIT001', produtos: 3, valorTotal: 4200.00, margem: '45%', ativo: true },
          { id: 2, nome: 'Kit Premium Completo', codigo: 'KIT002', produtos: 7, valorTotal: 8900.00, margem: '52%', ativo: true },
          { id: 3, nome: 'Kit Startup', codigo: 'KIT003', produtos: 2, valorTotal: 1800.00, margem: '38%', ativo: true },
        ]
      },
      precos: { 
        name: 'Tabela de Preços', 
        data: [
          { id: 1, nome: 'Tabela Varejo Nacional', tipo: 'Padrão', desconto: '0%', produtos: 245, vigencia: '01/01/2024 - 31/12/2024', ativa: true },
          { id: 2, nome: 'Tabela Atacado', tipo: 'Desconto 15%', desconto: '15%', produtos: 198, vigencia: '01/01/2024 - 31/12/2024', ativa: true },
          { id: 3, nome: 'Tabela Parceiros', tipo: 'Desconto 25%', desconto: '25%', produtos: 156, vigencia: '01/01/2024 - 31/12/2024', ativa: true },
        ]
      },
      locais: { 
        name: 'Locais de Estoque', 
        data: [
          { id: 1, codigo: 'EST001', descricao: 'Estoque Principal - Matriz', tipo: 'Físico', endereco: 'Galpão A - Setor Industrial', responsavel: 'João Silva', ativo: true },
          { id: 2, codigo: 'EST002', descricao: 'Estoque Filial SP', tipo: 'Físico', endereco: 'Galpão B - Vila Olimpia', responsavel: 'Maria Santos', ativo: true },
          { id: 3, codigo: 'EST003', descricao: 'Estoque Virtual - Produtos Digitais', tipo: 'Virtual', endereco: 'Cloud Storage', responsavel: 'Sistema Automático', ativo: true },
        ]
      },
      movimentacao: { 
        name: 'Movimentação de Estoque', 
        data: [
          { id: 1, codigo: 'MOV001', tipo: 'Entrada', produto: 'Sistema ERP Pro', quantidade: 25, data: '15/01/2024', origem: 'Fornecedor Tech', destino: 'EST001' },
          { id: 2, codigo: 'MOV002', tipo: 'Saída', produto: 'Módulo CRM', quantidade: 8, data: '14/01/2024', origem: 'EST001', destino: 'Cliente ABC' },
          { id: 3, codigo: 'MOV003', tipo: 'Transferência', produto: 'Dashboard Analytics', quantidade: 12, data: '13/01/2024', origem: 'EST001', destino: 'EST002' },
        ]
      },
      rastreio: { 
        name: 'Rastreio de Lotes/Séries', 
        data: [
          { id: 1, codigo: 'LT001', produto: 'Sistema ERP Pro', lote: 'LT20240115', quantidade: 25, validade: '15/01/2026', nfe: 'NFe 12345', status: 'Ativo' },
          { id: 2, codigo: 'LT002', produto: 'Módulo CRM', lote: 'LT20240110', quantidade: 30, validade: '10/01/2026', nfe: 'NFe 12346', status: 'Ativo' },
          { id: 3, codigo: 'LT003', produto: 'Dashboard Analytics', lote: 'LT20240105', quantidade: 15, validade: '05/01/2026', nfe: 'NFe 12347', status: 'Vencido' },
        ]
      },
      marcas: { 
        name: 'Marcas', 
        data: [
          { id: 1, nome: 'Biodina Tech', produtos: 156, categoria: 'Software', pais: 'Brasil', ativa: true },
          { id: 2, nome: 'Biodina Analytics', produtos: 89, categoria: 'Business Intelligence', pais: 'Brasil', ativa: true },
          { id: 3, nome: 'Biodina Cloud', produtos: 67, categoria: 'Cloud Computing', pais: 'Brasil', ativa: true },
        ]
      },
      familias: { 
        name: 'Famílias de Produtos', 
        data: [
          { id: 1, nome: 'Sistemas de Gestão', descricao: 'ERPs e sistemas administrativos', produtos: 45, categoria: 'Software', ativa: true },
          { id: 2, nome: 'Business Intelligence', descricao: 'Dashboards e relatórios', produtos: 28, categoria: 'Analytics', ativa: true },
          { id: 3, nome: 'CRM e Vendas', descricao: 'Gestão de relacionamento', produtos: 34, categoria: 'Software', ativa: true },
        ]
      },
      grupos: { 
        name: 'Grupos de Produtos', 
        data: [
          { id: 1, nome: 'ERP Empresarial', familia: 'Sistemas de Gestão', produtos: 23, descricao: 'ERPs para grandes empresas' },
          { id: 2, nome: 'ERP PME', familia: 'Sistemas de Gestão', produtos: 22, descricao: 'ERPs para pequenas e médias empresas' },
          { id: 3, nome: 'Dashboards Executivos', familia: 'Business Intelligence', produtos: 15, descricao: 'Painéis para alta gestão' },
        ]
      },
      subgrupos: { 
        name: 'Subgrupos de Produtos', 
        data: [
          { id: 1, nome: 'ERP Financeiro', grupo: 'ERP Empresarial', produtos: 12, descricao: 'Módulos financeiros avançados' },
          { id: 2, nome: 'ERP Comercial', grupo: 'ERP Empresarial', produtos: 11, descricao: 'Módulos de vendas e CRM' },
          { id: 3, nome: 'ERP Estoque', grupo: 'ERP PME', produtos: 9, descricao: 'Controle de estoque simplificado' },
        ]
      }
    }
  },
  servicos: {
    name: 'Serviços',
    icon: Settings,
    subModules: {
      categorias: { 
        name: 'Categorias de Serviços', 
        data: [
          { id: 1, categoria: 'Consultoria Estratégica', descricao: 'Consultoria em gestão e processos', servicos: 15, valorMedio: 'R$ 2.500/dia', ativa: true },
          { id: 2, categoria: 'Suporte Técnico', descricao: 'Suporte e manutenção de sistemas', servicos: 23, valorMedio: 'R$ 150/hora', ativa: true },
          { id: 3, categoria: 'Treinamento', descricao: 'Capacitação de usuários', servicos: 12, valorMedio: 'R$ 800/dia', ativa: true },
        ]
      },
      unidades: { 
        name: 'Unidades de Serviços', 
        data: [
          { id: 1, codigo: 'HORA', nome: 'Hora', descricao: 'Cobrança por hora trabalhada', sigla: 'h', ativa: true },
          { id: 2, codigo: 'DIA', nome: 'Dia', descricao: 'Cobrança por dia de trabalho', sigla: 'd', ativa: true },
          { id: 3, codigo: 'PROJ', nome: 'Projeto', descricao: 'Cobrança por projeto completo', sigla: 'proj', ativa: true },
        ]
      }
    }
  },
  usuarios: {
    name: 'Usuários',
    icon: Users,
    subModules: {
      lista: { 
        name: 'Lista de Usuários', 
        data: [
          { 
            id: 1, 
            nomeUsuario: 'admin.silva', 
            email: 'joao.silva@biodina.com.br', 
            perfil: 'Administrador', 
            departamento: 'TI',
            ultimoAcesso: '15/01/2024 14:30',
            ipUltimoAcesso: '192.168.1.10',
            idadeSenha: '45 dias',
            status: 'Ativo',
            ativo: true 
          },
          { 
            id: 2, 
            nomeUsuario: 'maria.santos', 
            email: 'maria.santos@biodina.com.br', 
            perfil: 'Gerente Comercial', 
            departamento: 'Comercial',
            ultimoAcesso: '15/01/2024 09:15',
            ipUltimoAcesso: '192.168.1.25',
            idadeSenha: '23 dias',
            status: 'Ativo',
            ativo: true 
          },
          { 
            id: 3, 
            nomeUsuario: 'carlos.lima', 
            email: 'carlos.lima@biodina.com.br', 
            perfil: 'Analista Financeiro', 
            departamento: 'Financeiro',
            ultimoAcesso: '12/01/2024 16:45',
            ipUltimoAcesso: '192.168.1.33',
            idadeSenha: '89 dias',
            status: 'Bloqueado',
            ativo: false 
          },
        ]
      }
    }
  },
  camposPersonalizados: {
    name: 'Campos Personalizados',
    icon: Tag,
    subModules: {
      lista: { name: 'Campos Personalizados', data: [
        { id: 1, nome: 'Observações', tipo: 'Texto', obrigatorio: false, ativo: true },
        { id: 2, nome: 'Prioridade', tipo: 'Lista', obrigatorio: true, ativo: true },
      ]}
    }
  },
  camposObrigatorios: {
    name: 'Campos Obrigatórios',
    icon: FileText,
    subModules: {
      lista: { name: 'Campos Obrigatórios', data: [
        { id: 1, campo: 'Nome', modulo: 'Clientes', obrigatorio: true },
        { id: 2, campo: 'E-mail', modulo: 'Leads', obrigatorio: true },
      ]}
    }
  },
  departamentos: {
    name: 'Departamentos',
    icon: Building,
    subModules: {
      lista: { name: 'Departamentos', data: [
        { id: 1, nome: 'Vendas', responsavel: 'João Silva', funcionarios: 12 },
        { id: 2, nome: 'Financeiro', responsavel: 'Maria Santos', funcionarios: 8 },
      ]}
    }
  },
  caracteristicas: {
    name: 'Características',
    icon: Tag,
    subModules: {
      lista: { name: 'Características', data: [
        { id: 1, nome: 'Cor', tipo: 'Lista', valores: 'Azul,Verde,Vermelho' },
        { id: 2, nome: 'Tamanho', tipo: 'Lista', valores: 'P,M,G,GG' },
      ]}
    }
  },
  recorrencia: {
    name: 'Recorrência',
    icon: Clock,
    subModules: {
      lista: { name: 'Recorrência', data: [
        { id: 1, nome: 'Mensal', dias: 30, ativo: true },
        { id: 2, nome: 'Semanal', dias: 7, ativo: true },
      ]}
    }
  },
  contasBancarias: {
    name: 'Contas Bancárias',
    icon: CreditCard,
    subModules: {
      lista: { name: 'Contas Bancárias', data: [
        { id: 1, banco: 'Banco do Brasil', agencia: '1234-5', conta: '67890-1', tipo: 'Corrente' },
        { id: 2, banco: 'Caixa Econômica', agencia: '9876-5', conta: '54321-0', tipo: 'Poupança' },
      ]}
    }
  },
  categorias: {
    name: 'Categorias',
    icon: Tag,
    subModules: {
      lista: { name: 'Categorias', data: [
        { id: 1, nome: 'Receita', tipo: 'Financeira', ativa: true },
        { id: 2, nome: 'Despesa', tipo: 'Financeira', ativa: true },
      ]}
    }
  },
  prazosPagamento: {
    name: 'Prazos de Pagamento',
    icon: Clock,
    subModules: {
      lista: { name: 'Prazos de Pagamento', data: [
        { id: 1, nome: 'À Vista', dias: 0, desconto: 5 },
        { id: 2, nome: '30 dias', dias: 30, desconto: 0 },
      ]}
    }
  },
  modelosEmails: {
    name: 'Modelos de E-mails',
    icon: Mail,
    subModules: {
      lista: { name: 'Modelos de E-mails', data: [
        { id: 1, nome: 'Boas-vindas', assunto: 'Bem-vindo!', ativo: true },
        { id: 2, nome: 'Cobrança', assunto: 'Fatura em atraso', ativo: true },
      ]}
    }
  },
  modelosFormularios: {
    name: 'Modelos de Formulários',
    icon: FileText,
    subModules: {
      lista: { name: 'Modelos de Formulários', data: [
        { id: 1, nome: 'Cadastro Cliente', campos: 8, ativo: true },
        { id: 2, nome: 'Pesquisa Satisfação', campos: 12, ativo: true },
      ]}
    }
  }
};
