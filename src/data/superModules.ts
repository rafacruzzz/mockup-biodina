import { Empresa, ModuloConfig, ModuloSistema, PerfilAcesso, Plano, Filial, Webform } from "@/types/super";

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
    nome: 'CPR (Compras para Revenda)',
    descricao: 'Gestão de compras para revenda',
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
    id: 'contabilidade',
    nome: 'Contabilidade',
    descricao: 'Gestão contábil e fiscal',
    icon: '🧮',
    cor: 'emerald'
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
    id: 'bi',
    nome: 'BI Geral',
    descricao: 'Business Intelligence e relatórios',
    icon: '📈',
    cor: 'red'
  }
];

export const empresasMock: Empresa[] = [
  {
    id: 'master-001',
    nome: 'iMuv Master',
    razaoSocial: 'iMuv Tecnologia Ltda',
    cnpj: '12.345.678/0001-99',
    tipo: 'master',
    status: 'ativa',
    dataCriacao: '2020-01-01',
    modulosHabilitados: [
      'cadastro', 'comercial', 'compras', 'estoque',
      'financeiro', 'contabilidade', 'faturamento', 'rh', 'ti',
      'administrativo', 'solicitacoes', 'bi'
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
      suporte: 'enterprise',
      quantidadeFiliais: -1
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
    nome: 'iMuv',
    razaoSocial: 'iMuv Farmacêutica S.A.',
    cnpj: '98.765.432/0001-10',
    tipo: 'filial',
    status: 'ativa',
    dataCriacao: '2020-06-15',
    modulosHabilitados: [
      'cadastro', 'comercial', 'estoque',
      'financeiro', 'contabilidade', 'solicitacoes', 'bi'
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
      suporte: 'premium',
      quantidadeFiliais: 10
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
      suporte: 'basico',
      quantidadeFiliais: 3
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

// Perfis de acesso mockados
export const perfisAcessoMock: PerfilAcesso[] = [
  {
    id: 'perfil-master',
    nome: 'Perfil Master',
    modulosHabilitados: [
      'cadastro', 'comercial', 'compras', 'estoque',
      'financeiro', 'contabilidade', 'faturamento', 'rh',
      'ti', 'administrativo', 'solicitacoes', 'bi'
    ],
    dataCriacao: '2024-01-01'
  },
  {
    id: 'perfil-vendedor',
    nome: 'Perfil Vendedor',
    modulosHabilitados: ['cadastro', 'comercial', 'estoque'],
    dataCriacao: '2024-02-15'
  },
  {
    id: 'perfil-financeiro',
    nome: 'Perfil Financeiro',
    modulosHabilitados: ['financeiro', 'contabilidade', 'faturamento'],
    dataCriacao: '2024-03-10'
  }
];

// Planos mockados
export const planosMock: Plano[] = [
  {
    id: 'plano-basico',
    nome: 'Plano Básico',
    valor: 99.90,
    perfilId: 'perfil-vendedor',
    quantidadeFiliais: 3,
    descricao: 'Plano ideal para pequenas empresas',
    beneficios: [
      'Banco de questões',
      'Estatísticas básicas',
      'Criação de listas'
    ],
    dataCriacao: '2024-01-01'
  },
  {
    id: 'plano-premium',
    nome: 'Plano Premium',
    valor: 199.90,
    perfilId: 'perfil-financeiro',
    quantidadeFiliais: 10,
    descricao: 'Plano completo para empresas em crescimento',
    beneficios: [
      'Banco de questões',
      'Estatísticas avançadas',
      'Performance de acertos',
      'Criação de provas',
      'Relatórios customizados'
    ],
    dataCriacao: '2024-01-15'
  },
  {
    id: 'plano-enterprise',
    nome: 'Plano Enterprise',
    valor: 499.90,
    perfilId: 'perfil-master',
    quantidadeFiliais: -1,
    descricao: 'Plano corporativo com todos os recursos',
    beneficios: [
      'Todos os módulos',
      'Suporte prioritário',
      'Backup automático',
      'Armazenamento ilimitado',
      'Usuários ilimitados',
      'API completa'
    ],
    dataCriacao: '2024-02-01'
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

// Filiais mockadas
export const webformsMock: Webform[] = [
  {
    id: 'wf-1',
    titulo: 'Teste evento old',
    status: 'ativo',
    tipo: 'criar_base',
    trial: true,
    diasTrial: 7,
    descricao: 'Webform para evento de lançamento',
    linkUnico: '/register/wf-1',
    dataCriacao: '2024-01-10',
    totalAcessos: 247,
    totalCadastros: 28,
    ultimoAcesso: '2025-11-20'
  },
  {
    id: 'wf-2',
    titulo: 'Site Institucional',
    status: 'inativo',
    tipo: 'criar_base',
    trial: false,
    diasTrial: 0,
    descricao: 'Cadastros vindos do site',
    linkUnico: '/register/wf-2',
    dataCriacao: '2024-02-01',
    totalAcessos: 89,
    totalCadastros: 5,
    ultimoAcesso: '2025-11-15'
  },
  {
    id: 'wf-3',
    titulo: 'Instagram Promo',
    status: 'ativo',
    tipo: 'criar_base',
    trial: true,
    diasTrial: 14,
    descricao: 'Promoção de lançamento no Instagram',
    linkUnico: '/register/wf-3',
    dataCriacao: '2024-03-01',
    totalAcessos: 456,
    totalCadastros: 67,
    ultimoAcesso: '2025-11-21'
  },
];

export const filiaisMock: Filial[] = [
  {
    id: 'filial-sp-001',
    nome: 'iMuv - Filial São Paulo',
    razaoSocial: 'iMuv Farmacêutica SP Ltda',
    cnpj: '98.765.432/0002-01',
    empresaPrincipalId: 'biodina-001',
    modulosHabilitados: ['cadastro', 'comercial', 'financeiro', 'estoque'],
    status: 'ativa',
    dataCriacao: '2023-01-15',
    endereco: {
      cep: '01310-100',
      logradouro: 'Av. Paulista',
      numero: '1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      uf: 'SP'
    }
  },
  {
    id: 'filial-rj-001',
    nome: 'iMuv - Filial Rio de Janeiro',
    razaoSocial: 'iMuv Farmacêutica RJ Ltda',
    cnpj: '98.765.432/0003-92',
    empresaPrincipalId: 'biodina-001',
    modulosHabilitados: ['cadastro', 'comercial', 'financeiro'],
    status: 'ativa',
    dataCriacao: '2023-06-20',
    endereco: {
      cep: '20040-020',
      logradouro: 'Av. Rio Branco',
      numero: '156',
      complemento: 'Sala 801',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      uf: 'RJ'
    }
  },
  {
    id: 'filial-mg-001',
    nome: 'iMuv - Filial Belo Horizonte',
    razaoSocial: 'iMuv Farmacêutica MG Ltda',
    cnpj: '98.765.432/0004-73',
    empresaPrincipalId: 'biodina-001',
    modulosHabilitados: ['cadastro', 'comercial', 'estoque', 'bi'],
    status: 'ativa',
    dataCriacao: '2024-02-10',
    endereco: {
      cep: '30130-100',
      logradouro: 'Av. Afonso Pena',
      numero: '1500',
      bairro: 'Centro',
      cidade: 'Belo Horizonte',
      uf: 'MG'
    }
  }
];
