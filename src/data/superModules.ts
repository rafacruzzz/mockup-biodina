import { Empresa, ModuloConfig, ModuloSistema } from "@/types/super";

export const modulosDisponiveis: ModuloConfig[] = [
  {
    id: 'cadastro',
    nome: 'Cadastro',
    descricao: 'Gestão de cadastros gerais do sistema',
    icon: '📋',
    cor: 'blue'
  },
  {
    id: 'comercial',
    nome: 'Comercial',
    descricao: 'Gestão comercial e vendas',
    icon: '💼',
    cor: 'green'
  },
  {
    id: 'compras',
    nome: 'Compras',
    descricao: 'Gestão de compras e fornecedores',
    icon: '📦',
    cor: 'purple'
  },
  {
    id: 'estoque',
    nome: 'Estoque',
    descricao: 'Controle de estoque e inventário',
    icon: '📊',
    cor: 'orange'
  },
  {
    id: 'financeiro',
    nome: 'Financeiro',
    descricao: 'Gestão financeira e contas',
    icon: '💰',
    cor: 'yellow'
  },
  {
    id: 'faturamento',
    nome: 'Faturamento',
    descricao: 'Emissão de notas e faturamento',
    icon: '📄',
    cor: 'indigo'
  },
  {
    id: 'rh',
    nome: 'RH',
    descricao: 'Recursos humanos e folha',
    icon: '👥',
    cor: 'pink'
  },
  {
    id: 'ti',
    nome: 'TI',
    descricao: 'Tecnologia da informação',
    icon: '💻',
    cor: 'cyan'
  },
  {
    id: 'administrativo',
    nome: 'Administrativo',
    descricao: 'Gestão administrativa e regulatória',
    icon: '🗃️',
    cor: 'gray'
  },
  {
    id: 'solicitacoes',
    nome: 'Solicitações',
    descricao: 'Sistema de solicitações internas',
    icon: '📝',
    cor: 'teal'
  },
  {
    id: 'bi-geral',
    nome: 'BI Geral',
    descricao: 'Business Intelligence e relatórios',
    icon: '📈',
    cor: 'red'
  }
];

export const empresasMock: Empresa[] = [
  {
    id: 'master-001',
    nome: 'Biodina Master',
    razaoSocial: 'Biodina Tecnologia Ltda',
    cnpj: '12.345.678/0001-99',
    tipo: 'master',
    status: 'ativa',
    dataCriacao: '2020-01-01',
    modulosHabilitados: [
      'cadastro', 'comercial', 'compras', 'estoque',
      'financeiro', 'faturamento', 'rh', 'ti',
      'administrativo', 'solicitacoes', 'bi-geral'
    ],
    usuarioMaster: {
      id: 'user-master',
      nome: 'Admin Master',
      email: 'admin@biodina.com.br',
      username: 'admin.master',
      dataCriacao: '2020-01-01'
    },
    configuracoes: {
      limiteUsuarios: -1,
      espacoArmazenamento: 'ilimitado',
      backup: true,
      suporte: 'enterprise'
    },
    estatisticas: {
      totalUsuarios: 150,
      totalProdutos: 5420,
      totalClientes: 892,
      totalVendas: 15780,
      espacoUtilizado: '89.2 GB'
    }
  },
  {
    id: 'biodina-001',
    nome: 'Biodina',
    razaoSocial: 'Biodina Farmacêutica S.A.',
    cnpj: '98.765.432/0001-10',
    tipo: 'filial',
    status: 'ativa',
    dataCriacao: '2020-06-15',
    modulosHabilitados: [
      'cadastro', 'comercial', 'estoque',
      'financeiro', 'solicitacoes', 'bi-geral'
    ],
    usuarioMaster: {
      id: 'user-biodina',
      nome: 'Danilo Silva',
      email: 'danilo@tecnologiadc.com.br',
      username: 'danilo.silva',
      dataCriacao: '2020-06-15'
    },
    configuracoes: {
      limiteUsuarios: 100,
      espacoArmazenamento: '100GB',
      backup: true,
      suporte: 'premium'
    },
    estatisticas: {
      totalUsuarios: 45,
      totalProdutos: 1250,
      totalClientes: 320,
      totalVendas: 4580,
      espacoUtilizado: '34.5 GB'
    }
  },
  {
    id: 'empresa-abc-002',
    nome: 'Empresa ABC Ltda',
    razaoSocial: 'ABC Comércio e Serviços Ltda',
    cnpj: '11.222.333/0001-44',
    tipo: 'filial',
    status: 'ativa',
    dataCriacao: '2023-01-10',
    modulosHabilitados: [
      'cadastro', 'comercial', 'compras', 'estoque', 'solicitacoes'
    ],
    usuarioMaster: {
      id: 'user-abc',
      nome: 'Carlos Oliveira',
      email: 'carlos@empresaabc.com.br',
      username: 'carlos.oliveira',
      dataCriacao: '2023-01-10'
    },
    configuracoes: {
      limiteUsuarios: 25,
      espacoArmazenamento: '50GB',
      backup: true,
      suporte: 'basico'
    },
    estatisticas: {
      totalUsuarios: 18,
      totalProdutos: 450,
      totalClientes: 120,
      totalVendas: 890,
      espacoUtilizado: '12.8 GB'
    }
  }
];

// Dados isolados por empresa (simulação de banco de dados separado)
export const dadosEmpresasMock: Record<string, any> = {
  'biodina-001': {
    // Aqui viriam os dados atuais mockados do sistema
    usuarios: [],
    produtos: [],
    clientes: []
  },
  'empresa-abc-002': {
    usuarios: [
      { id: '1', nome: 'Carlos Oliveira', cargo: 'Gerente', email: 'carlos@empresaabc.com.br' },
      { id: '2', nome: 'Ana Santos', cargo: 'Vendedora', email: 'ana@empresaabc.com.br' }
    ],
    produtos: [
      { id: '1', nome: 'Produto ABC 1', preco: 150.00, estoque: 100 },
      { id: '2', nome: 'Produto ABC 2', preco: 250.00, estoque: 50 }
    ],
    clientes: [
      { id: '1', nome: 'Cliente XYZ', cnpj: '22.333.444/0001-55' }
    ]
  }
};
