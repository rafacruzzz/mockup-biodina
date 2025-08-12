
export const concorrentes = [
  { id: 1, nome: 'Empresa A', valor: 150000 },
  { id: 2, nome: 'Empresa B', valor: 145000 },
  { id: 3, nome: 'Empresa C', valor: 155000 }
];

export const licitantes = [
  {
    id: 1,
    empresa: 'EMPRESA ALPHA LTDA',
    marca: 'Siemens',
    modelo: 'RAPIDPoint 500',
    valorEntrada: 150000.00,
    valorFinal: 145000.00,
    unidade: 'un',
    ranking: 1
  },
  {
    id: 2,
    empresa: 'BETA SOLUÇÕES EMPRESARIAIS',  
    marca: 'Abbott',
    modelo: 'i-STAT Alinity',
    valorEntrada: 160000.00,
    valorFinal: 148000.00,
    unidade: 'un',
    ranking: 2
  },
  {
    id: 3,
    empresa: 'GAMMA TECNOLOGIA E SERVIÇOS',
    marca: 'Roche',
    modelo: 'cobas b 123',
    valorEntrada: 170000.00,
    valorFinal: 155000.00,
    unidade: 'un', 
    ranking: 3
  },
  {
    id: 4,
    empresa: 'DELTA COMERCIAL LTDA',
    marca: 'Nova Biomedical',
    modelo: 'StatSensor',
    valorEntrada: 180000.00,
    valorFinal: 160000.00,
    unidade: 'un',
    ranking: 4
  }
];

export const pedidos = [
  {
    id: 1,
    numero: 'PED-2024-001',
    cliente: 'PREFEITURA MUNICIPAL',
    valor: 145000.00,
    status: 'aprovado',
    dataVencimento: '2024-12-30'
  },
  {
    id: 2,
    numero: 'PED-2024-002',
    cliente: 'SECRETARIA DE SAÚDE',
    valor: 89000.00,
    status: 'pendente',
    dataVencimento: '2024-11-15'
  }
];

export const licitacoesGanhasDetalhadas = [
  {
    id: 1,
    numeroPregao: 'PE-2024-001',
    nomeInstituicao: 'PREFEITURA MUNICIPAL DE SÃO PAULO',
    cnpj: '46.395.000/0001-39',
    uf: 'SP',
    municipio: 'São Paulo',
    linkEdital: 'https://portal.prefeitura.sp.gov.br/editais/pe-2024-001',
    objetoLicitacao: 'Aquisição de equipamentos médicos para análise clínica',
    resumoEdital: 'Pregão eletrônico para fornecimento de analisadores bioquímicos automáticos para laboratórios da rede municipal de saúde.',
    analiseTecnica: 'Equipamento deve atender especificações técnicas rigorosas incluindo: throughput mínimo de 400 testes/hora, tecnologia fotométrica, interface LIS compatível, controle de qualidade interno automático. Análise de viabilidade comercial positiva considerando margem de 15% e prazo de entrega de 60 dias.',
    palavraChave: 'equipamentos médicos, análise clínica, laboratório',
    estrategiaValorFinal: 145000.00,
    dataAbertura: '2024-03-15',
    status: 'ganha',
    documentos: [
      {
        nome: 'Edital PE-2024-001.pdf',
        tipo: 'Edital',
        data: '2024-03-01',
        url: '/docs/edital-pe-2024-001.pdf'
      },
      {
        nome: 'Proposta Técnica.pdf',
        tipo: 'Proposta',
        data: '2024-03-10',
        url: '/docs/proposta-tecnica-pe-001.pdf'
      },
      {
        nome: 'Certidões.zip',
        tipo: 'Documentação',
        data: '2024-03-09',
        url: '/docs/certidoes-pe-001.zip'
      }
    ],
    historico: [
      {
        usuario: 'Carlos Silva',
        departamento: 'Comercial',
        timestamp: '2024-03-01T09:00:00Z',
        texto: 'Licitação identificada no portal. Iniciando análise de viabilidade técnica e comercial.',
        anexos: []
      },
      {
        usuario: 'Ana Santos',
        departamento: 'Técnico',
        timestamp: '2024-03-05T14:30:00Z',
        texto: 'Análise técnica concluída. Equipamento Siemens RAPIDPoint 500 atende todos os requisitos do edital. Recomendado prosseguir.',
        anexos: ['analise-tecnica-pe001.pdf']
      },
      {
        usuario: 'Roberto Costa',
        departamento: 'Financeiro',
        timestamp: '2024-03-08T11:15:00Z',
        texto: 'Proposta financeira elaborada com margem de 15%. Valor final: R$ 145.000,00. Dentro da expectativa de mercado.',
        anexos: []
      },
      {
        usuario: 'Carlos Silva',
        departamento: 'Comercial',
        timestamp: '2024-03-15T16:45:00Z',
        texto: 'LICITAÇÃO GANHA! Classificados em 1º lugar. Aguardando emissão da ata de registro de preços.',
        anexos: ['resultado-licitacao.pdf']
      }
    ],
    pedidos: [
      {
        id: 101,
        numeroOportunidade: 'OPO-2024-001',
        cliente: 'PREFEITURA MUNICIPAL DE SÃO PAULO',
        vendedor: 'Carlos Silva',
        dataVenda: '2024-03-16',
        status: 'aprovado' as const,
        produtos: [
          {
            id: 1,
            codigo: 'SIE-RP500',
            descricao: 'Analisador Bioquímico Siemens RAPIDPoint 500',
            quantidade: 1,
            unidade: 'UNIDADE' as const,
            precoUnitario: 145000.00,
            desconto: 0,
            precoFinal: 145000.00,
            observacoes: 'Inclui instalação e treinamento',
            estoqueDisponivel: {
              totalDisponivel: 2,
              totalReservado: 0,
              estoquesPorCnpj: [],
              lotes: [],
              tiposEstoque: [],
              reservasAtivas: [],
              historicoVendas: [],
              precoSugerido: 145000.00,
              alertas: [],
              localizacaoFisica: 'Estoque Principal',
              exigeNumeroSerie: true,
              unidadesDisponiveis: []
            }
          }
        ],
        valorTotal: 145000.00,
        observacoesGerais: 'Pedido oriundo de licitação ganha PE-2024-001'
      }
    ]
  },
  {
    id: 2,
    numeroPregao: 'PP-2024-015',
    nomeInstituicao: 'HOSPITAL UNIVERSITÁRIO FEDERAL',
    cnpj: '25.123.456/0001-78',
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    linkEdital: 'https://compras.gov.br/pregoes/pp-2024-015',
    objetoLicitacao: 'Fornecimento de kits para diagnóstico laboratorial',
    resumoEdital: 'Processo licitatório para aquisição de kits diagnósticos para exames de rotina laboratorial, incluindo bioquímica e hematologia.',
    analiseTecnica: 'Kits devem ter registro ANVISA vigente, prazo de validade mínimo de 18 meses, compatibilidade com equipamentos existentes (Abbott i-STAT). Margem comercial estimada em 20% com prazo de entrega de 30 dias.',
    palavraChave: 'kits diagnóstico, laboratório, bioquímica',
    estrategiaValorFinal: 89000.00,
    dataAbertura: '2024-04-20',
    status: 'ganha',
    documentos: [
      {
        nome: 'Edital PP-2024-015.pdf',
        tipo: 'Edital',
        data: '2024-04-01',
        url: '/docs/edital-pp-2024-015.pdf'
      },
      {
        nome: 'Catálogo Produtos.pdf',
        tipo: 'Técnico',
        data: '2024-04-10',
        url: '/docs/catalogo-pp-015.pdf'
      }
    ],
    historico: [
      {
        usuario: 'Maria Oliveira',
        departamento: 'Comercial',
        timestamp: '2024-04-01T10:00:00Z',
        texto: 'Nova licitação federal identificada. Valores compatíveis com nosso portfólio.',
        anexos: []
      },
      {
        usuario: 'José Santos',
        departamento: 'Técnico',
        timestamp: '2024-04-15T09:20:00Z',
        texto: 'Kits Abbott i-STAT disponíveis em estoque. Registros ANVISA válidos. Aprovado para participação.',
        anexos: ['registros-anvisa.pdf']
      },
      {
        usuario: 'Maria Oliveira',
        departamento: 'Comercial',
        timestamp: '2024-04-20T15:30:00Z',
        texto: 'Resultado: 1º lugar! Valor arrematado: R$ 89.000,00. Iniciando processo de contratação.',
        anexos: ['ata-resultado.pdf']
      }
    ],
    pedidos: [
      {
        id: 102,
        numeroOportunidade: 'OPO-2024-002',
        cliente: 'HOSPITAL UNIVERSITÁRIO FEDERAL',
        vendedor: 'Maria Oliveira',
        dataVenda: '2024-04-21',
        status: 'enviado' as const,
        produtos: [
          {
            id: 2,
            codigo: 'ABT-KIT-001',
            descricao: 'Kit Diagnóstico Abbott i-STAT - Painel Básico',
            quantidade: 50,
            unidade: 'KIT' as const,
            precoUnitario: 1780.00,
            desconto: 0,
            precoFinal: 1780.00,
            observacoes: 'Entrega parcelada conforme cronograma',
            estoqueDisponivel: {
              totalDisponivel: 200,
              totalReservado: 50,
              estoquesPorCnpj: [],
              lotes: [],
              tiposEstoque: [],
              reservasAtivas: [],
              historicoVendas: [],
              precoSugerido: 1780.00,
              alertas: [],
              localizacaoFisica: 'Estoque Refrigerado',
              exigeNumeroSerie: false,
              unidadesDisponiveis: []
            }
          }
        ],
        valorTotal: 89000.00,
        observacoesGerais: 'Pedido derivado da licitação PP-2024-015'
      }
    ]
  }
];
