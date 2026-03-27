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
  },
  {
    id: 'configuracao',
    nome: 'Configuração',
    descricao: 'Configurações da empresa',
    icon: '⚙️',
    cor: 'slate'
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
    origem: {
      tipo: 'manual',
      dataRegistro: '2020-01-01'
    },
    modulosHabilitados: [
      'cadastro', 'comercial', 'compras', 'estoque',
      'financeiro', 'contabilidade', 'faturamento', 'rh', 'ti',
      'administrativo', 'bi'
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
    planoId: 'plano-1',
    origem: {
      tipo: 'manual',
      dataRegistro: '2020-06-15'
    },
    modulosHabilitados: [
      'cadastro', 'comercial', 'compras', 'estoque',
      'financeiro', 'contabilidade', 'faturamento', 'rh', 'ti',
      'administrativo', 'bi'
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
    planoId: 'plano-2',
    origem: {
      tipo: 'webform',
      webformId: 'wf-evento-2025',
      webformNome: 'Evento 2025',
      dataRegistro: '2023-01-10'
    },
    modulosHabilitados: [
      'cadastro', 'comercial', 'compras', 'estoque'
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
  },
  {
    id: 'empresa-xyz-003',
    nome: 'TechSolutions',
    razaoSocial: 'TechSolutions Tecnologia Ltda',
    cnpj: '22.333.444/0001-55',
    tipo: 'filial',
    status: 'ativa',
    dataCriacao: '2024-03-15',
    planoId: 'plano-1',
    origem: {
      tipo: 'landpage',
      webformNome: 'Land Page',
      dataRegistro: '2024-03-15'
    },
    modulosHabilitados: [
      'cadastro', 'comercial', 'estoque', 'financeiro'
    ],
    usuarioMaster: {
      id: 'user-tech',
      nome: 'Ana Paula Santos',
      email: 'ana@techsolutions.com.br',
      username: 'ana.santos',
      dataCriacao: '2024-03-15'
    },
    configuracoes: {
      limiteUsuarios: 15,
      espacoArmazenamento: '30GB',
      backup: true,
      suporte: 'basico',
      quantidadeFiliais: 2
    },
    estatisticas: {
      totalUsuarios: 8,
      totalProdutos: 180,
      totalClientes: 45,
      totalVendas: 320,
      espacoUtilizado: '8.5 GB'
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
      'ti', 'administrativo', 'bi'
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
    id: 'plano-1',
    nome: 'Básico',
    valor: 179.00,
    perfilId: 'perfil-vendedor',
    quantidadeFiliais: 5,
    diasTrialGratuito: 7,
    descricao: 'Ideal para pequenas empresas',
    beneficios: [
      'Diagnóstico psicossocial automático',
      'PGR Psicossocial e Plano de Ação',
      'Dashboard em tempo real',
      'Laudo técnico assinado por psicólogo'
    ],
    dataCriacao: '2024-01-15'
  },
  {
    id: 'plano-2',
    nome: 'Intermediário',
    valor: 249.00,
    perfilId: 'perfil-financeiro',
    quantidadeFiliais: 10,
    diasTrialGratuito: 14,
    descricao: 'Plano completo para empresas em crescimento',
    beneficios: [
      'Todos os recursos do Básico',
      'Análise de tendências',
      'Relatórios personalizados',
      'Suporte prioritário',
      'API de integração'
    ],
    dataCriacao: '2024-01-15'
  },
  {
    id: 'plano-3',
    nome: 'Avançado',
    valor: 329.00,
    perfilId: 'perfil-financeiro',
    quantidadeFiliais: 15,
    diasTrialGratuito: 14,
    descricao: 'Para empresas com necessidades avançadas',
    beneficios: [
      'Todos os recursos do Intermediário',
      'Consultoria especializada mensal',
      'White label',
      'Múltiplas filiais',
      'Backup automático diário'
    ],
    dataCriacao: '2024-02-01'
  },
  {
    id: 'plano-4',
    nome: 'Premium',
    valor: 399.00,
    perfilId: 'perfil-master',
    quantidadeFiliais: 20,
    diasTrialGratuito: 30,
    descricao: 'Plano corporativo com todos os recursos',
    beneficios: [
      'Todos os recursos do Avançado',
      'Consultoria ilimitada',
      'Treinamento da equipe',
      'Customizações sob demanda',
      'Gerente de conta dedicado',
      'SLA de 99.9%'
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

// Webforms mockados
export const webformsMock: Webform[] = [
  {
    id: 'wf-1',
    titulo: 'Teste evento old',
    status: 'ativo',
    tipo: 'criar_base',
    planoId: undefined,
    trial: true,
    diasTrial: 7,
    descricao: 'Webform para evento de lançamento - usuário escolhe plano',
    linkUnico: '/register/wf-1',
    dataCriacao: '2024-01-10',
    totalAcessos: 247,
    totalCadastros: 28,
    ultimoAcesso: '2025-11-20'
  },
  {
    id: 'wf-2',
    titulo: 'Site Institucional',
    status: 'ativo',
    tipo: 'criar_base',
    planoId: 'plano-2',
    trial: false,
    diasTrial: 0,
    descricao: 'Cadastros vindos do site - Plano Intermediário pré-selecionado',
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
    planoId: undefined,
    trial: true,
    diasTrial: 14,
    descricao: 'Promoção de lançamento no Instagram - usuário escolhe plano',
    linkUnico: '/register/wf-3',
    dataCriacao: '2024-03-01',
    totalAcessos: 456,
    totalCadastros: 67,
    ultimoAcesso: '2025-11-21'
  },
  {
    id: 'wf-4',
    titulo: 'Evento Corporativo Premium',
    status: 'ativo',
    tipo: 'criar_base',
    planoId: 'plano-4',
    trial: false,
    diasTrial: 0,
    descricao: 'Evento corporativo - Plano Premium com 30 dias de trial',
    linkUnico: '/register/wf-4',
    dataCriacao: '2024-03-15',
    totalAcessos: 123,
    totalCadastros: 15,
    ultimoAcesso: '2025-11-21'
  },
];

export const filiaisMock: Filial[] = [
  {
    id: 'filial-sp-001',
    nome: 'iMuv - Filial São Paulo',
    razaoSocial: 'iMuv Farmacêutica SP Ltda',
    cnpj: '98.765.432/0002-01',
    empresaPrincipalId: 'master-001',
    modulosHabilitados: ['cadastro', 'comercial', 'financeiro', 'estoque'],
    status: 'ativa',
    dataCriacao: '2023-01-15',
    inscricaoEstadual: '123.456.789.012',
    inscricaoMunicipal: '987654321',
    regimeTributario: '3',
    email: 'sp@imuv.com.br',
    telefone: '(11) 3456-7890',
    discriminaImpostos: true,
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
    empresaPrincipalId: 'master-001',
    modulosHabilitados: ['cadastro', 'comercial', 'financeiro'],
    status: 'ativa',
    dataCriacao: '2023-06-20',
    inscricaoEstadual: '234.567.890.123',
    inscricaoMunicipal: '876543210',
    regimeTributario: '1',
    email: 'rj@imuv.com.br',
    telefone: '(21) 2345-6789',
    discriminaImpostos: false,
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
    empresaPrincipalId: 'master-001',
    modulosHabilitados: ['cadastro', 'comercial', 'estoque', 'bi'],
    status: 'ativa',
    dataCriacao: '2024-02-10',
    inscricaoEstadual: '345.678.901.234',
    inscricaoMunicipal: '765432109',
    regimeTributario: '3',
    email: 'bh@imuv.com.br',
    telefone: '(31) 3234-5678',
    discriminaImpostos: true,
    endereco: {
      cep: '30130-100',
      logradouro: 'Av. Afonso Pena',
      numero: '1500',
      bairro: 'Centro',
      cidade: 'Belo Horizonte',
      uf: 'MG'
    }
  },
  {
    id: 'filial-pr-001',
    nome: 'iMuv - Filial Curitiba',
    razaoSocial: 'iMuv Farmacêutica PR Ltda',
    cnpj: '98.765.432/0005-54',
    empresaPrincipalId: 'master-001',
    modulosHabilitados: ['cadastro', 'comercial', 'compras', 'estoque', 'financeiro', 'contabilidade'],
    status: 'ativa',
    dataCriacao: '2024-11-01',
    inscricaoEstadual: '456.789.012.345',
    inscricaoMunicipal: '654321098',
    regimeTributario: '2',
    email: 'curitiba@imuv.com.br',
    telefone: '(41) 3123-4567',
    discriminaImpostos: true,
    endereco: {
      cep: '80010-000',
      logradouro: 'Rua XV de Novembro',
      numero: '2500',
      complemento: 'Sala 1201',
      bairro: 'Centro',
      cidade: 'Curitiba',
      uf: 'PR'
    }
  }
];

export const historicoPagamentosMock = [
  {
    id: 'pag-001',
    data: '2025-11-01',
    valor: 179.00,
    planoNome: 'Plano Básico',
    status: 'pago' as const,
    metodoPagamento: 'cartao' as const,
    numeroFatura: 'NF-2025-11-001'
  },
  {
    id: 'pag-002',
    data: '2025-10-01',
    valor: 179.00,
    planoNome: 'Plano Básico',
    status: 'pago' as const,
    metodoPagamento: 'cartao' as const,
    numeroFatura: 'NF-2025-10-001'
  },
  {
    id: 'pag-003',
    data: '2025-09-01',
    valor: 179.00,
    planoNome: 'Plano Básico',
    status: 'pago' as const,
    metodoPagamento: 'pix' as const,
    numeroFatura: 'NF-2025-09-001'
  },
  {
    id: 'pag-004',
    data: '2025-08-01',
    valor: 0.00,
    planoNome: 'Plano Básico (Trial)',
    status: 'pago' as const,
    metodoPagamento: 'cartao' as const,
    numeroFatura: 'NF-2025-08-001'
  }
];

export const informacaoPagamentoMock = {
  metodoPagamento: 'cartao' as const,
  cartao: {
    numero: '•••• 4532',
    bandeira: 'Visa',
    validade: '12/2027'
  },
  proximaCobranca: '2025-12-01',
  diaVencimento: 1
};
