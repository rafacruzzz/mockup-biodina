// Mock data para o sistema de Contas a Pagar

import { 
  Requisicao, 
  ContaRecorrente, 
  StatusRequisicao, 
  TipoRequisicao, 
  VinculacaoRequisicao,
  StatusAprovacao,
  NivelAprovacao,
  Periodicidade,
  CategoriaContaRecorrente,
  TipoDocumento,
  CalendarioItem,
  UrgenciaVencimento
} from '@/types/financeiro';

// Mock de colaboradores
export const mockColaboradores = [
  { id: '1', nome: 'Carlos Silva', email: 'carlos@biodina.com', setor: 'Financeiro', cargo: 'Gestor Financeiro', nivel: 3 },
  { id: '2', nome: 'Cinthia Santos', email: 'cinthia@biodina.com', setor: 'Suprimentos', cargo: 'Coordenadora', nivel: 2 },
  { id: '3', nome: 'João Oliveira', email: 'joao@biodina.com', setor: 'Comercial', cargo: 'Vendedor', nivel: 1 },
  { id: '4', nome: 'Maria Costa', email: 'maria@biodina.com', setor: 'Produção', cargo: 'Supervisora', nivel: 2 },
  { id: '5', nome: 'Pedro Almeida', email: 'pedro@biodina.com', setor: 'TI', cargo: 'Analista', nivel: 1 }
];

// Mock de fornecedores
export const mockFornecedores = [
  { 
    id: '1', 
    nome: 'Distribuidora ABC Ltda', 
    cnpj: '12.345.678/0001-90',
    email: 'contato@abc.com.br',
    telefone: '(11) 99999-9999'
  },
  { 
    id: '2', 
    nome: 'Energia Elétrica S.A', 
    cnpj: '98.765.432/0001-10',
    email: 'atendimento@energia.com.br',
    telefone: '0800-123-456'
  },
  { 
    id: '3', 
    nome: 'Telecomunicações XYZ', 
    cnpj: '11.222.333/0001-44',
    email: 'comercial@xyz.com.br',
    telefone: '(11) 88888-8888'
  },
  { 
    id: '4', 
    nome: 'João da Silva - MEI', 
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    telefone: '(11) 77777-7777'
  }
];

// Mock de projetos
export const mockProjetos = [
  {
    id: '1',
    nome: 'Projeto Alpha',
    cliente: { id: '1', nome: 'Cliente A Ltda', cnpj: '12.345.678/0001-99', email: 'contato@clientea.com' },
    status: 'Ativo',
    valor: 150000
  },
  {
    id: '2', 
    nome: 'Projeto Beta',
    cliente: { id: '2', nome: 'Cliente B S.A', cnpj: '98.765.432/0001-88', email: 'vendas@clienteb.com' },
    status: 'Ativo',
    valor: 280000
  },
  {
    id: '3',
    nome: 'Projeto Gamma',
    cliente: { id: '3', nome: 'Cliente C Corp', cnpj: '55.666.777/0001-33', email: 'procurement@clientec.com' },
    status: 'Em Negociação',
    valor: 95000
  }
];

// Mock de requisições
export const mockRequisicoes: Requisicao[] = [
  {
    id: 'REQ001',
    empresaId: 'biodina-001',
    numeroRequisicao: '2025-001',
    dataCreacao: new Date('2025-01-10'),
    dataVencimento: new Date('2025-01-25'),
    valor: 15000,
    status: StatusRequisicao.AGUARDANDO_APROVACAO_SETOR,
    tipo: TipoRequisicao.SUPRIMENTOS,
    vinculacao: VinculacaoRequisicao.PROJETO_CLIENTE,
    solicitante: mockColaboradores[1], // Cinthia
    setor: 'Suprimentos',
    projeto: mockProjetos[0],
    descricao: 'Aquisição de materiais para produção - Projeto Alpha',
    observacoes: 'Urgente para não atrasar cronograma',
    aprovacoes: [
      {
        id: 'APR001',
        requisicaoId: 'REQ001',
        nivel: NivelAprovacao.GESTOR_SETOR,
        aprovador: mockColaboradores[1],
        status: StatusAprovacao.PENDENTE,
        ordem: 1
      }
    ],
    statusAprovacao: StatusAprovacao.PENDENTE,
    documentos: [],
    documentosCompletos: false,
    recorrente: false,
    cotacoes: [
      {
        id: 'COT001',
        fornecedor: mockFornecedores[0],
        valor: 15000,
        prazoEntrega: 5,
        condicoesPagamento: '30 dias',
        dataValidade: new Date('2025-01-20')
      },
      {
        id: 'COT002', 
        fornecedor: mockFornecedores[3],
        valor: 16500,
        prazoEntrega: 7,
        condicoesPagamento: '15 dias',
        dataValidade: new Date('2025-01-18')
      }
    ],
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
    createdBy: '2',
    updatedBy: '2'
  },
  {
    id: 'REQ002',
    empresaId: 'biodina-001',
    numeroRequisicao: '2025-002', 
    dataCreacao: new Date('2025-01-12'),
    dataVencimento: new Date('2025-01-30'),
    valor: 2800,
    status: StatusRequisicao.APROVADA,
    tipo: TipoRequisicao.PASSAGEM,
    vinculacao: VinculacaoRequisicao.PROJETO_CLIENTE,
    solicitante: mockColaboradores[2], // João
    setor: 'Comercial',
    projeto: mockProjetos[1],
    descricao: 'Passagem aérea para reunião com cliente - Projeto Beta',
    observacoes: 'Viagem para São Paulo - reunião estratégica',
    aprovacoes: [
      {
        id: 'APR002',
        requisicaoId: 'REQ002',
        nivel: NivelAprovacao.GESTOR_SETOR,
        aprovador: mockColaboradores[2],
        status: StatusAprovacao.APROVADA,
        comentario: 'Aprovado - viagem essencial para fechamento do contrato',
        dataAprovacao: new Date('2025-01-13'),
        ordem: 1
      },
      {
        id: 'APR003',
        requisicaoId: 'REQ002', 
        nivel: NivelAprovacao.GESTOR_FINANCEIRO,
        aprovador: mockColaboradores[0], // Carlos
        status: StatusAprovacao.APROVADA,
        comentario: 'Aprovado financeiramente',
        dataAprovacao: new Date('2025-01-14'),
        ordem: 2
      }
    ],
    statusAprovacao: StatusAprovacao.APROVADA,
    documentos: [
      {
        id: 'DOC001',
        requisicaoId: 'REQ002',
        tipo: TipoDocumento.EMAIL_PEDIDO,
        nome: 'Email-Solicitacao-Passagem.pdf',
        url: '/docs/email-001.pdf',
        tamanho: 245000,
        mimeType: 'application/pdf',
        obrigatorio: true,
        dataUpload: new Date('2025-01-12'),
        uploadedBy: '2'
      }
    ],
    documentosCompletos: false,
    recorrente: false,
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-14'),
    createdBy: '2',
    updatedBy: '1'
  },
  {
    id: 'REQ003',
    empresaId: 'biodina-001',
    numeroRequisicao: '2025-003',
    dataCreacao: new Date('2025-01-08'),
    dataVencimento: new Date('2025-01-15'),
    valor: 850,
    status: StatusRequisicao.PAGA,
    tipo: TipoRequisicao.OUTROS,
    vinculacao: VinculacaoRequisicao.CENTRO_CUSTO_INTERNO,
    solicitante: mockColaboradores[4], // Pedro
    setor: 'TI',
    departamento: 'Tecnologia da Informação',
    descricao: 'Licença de software para desenvolvimento',
    aprovacoes: [
      {
        id: 'APR004',
        requisicaoId: 'REQ003',
        nivel: NivelAprovacao.GESTOR_SETOR,
        aprovador: mockColaboradores[4],
        status: StatusAprovacao.APROVADA,
        dataAprovacao: new Date('2025-01-09'),
        ordem: 1
      },
      {
        id: 'APR005',
        requisicaoId: 'REQ003',
        nivel: NivelAprovacao.GESTOR_FINANCEIRO,
        aprovador: mockColaboradores[0],
        status: StatusAprovacao.APROVADA,
        dataAprovacao: new Date('2025-01-10'),
        ordem: 2
      }
    ],
    statusAprovacao: StatusAprovacao.APROVADA,
    documentos: [
      {
        id: 'DOC002',
        requisicaoId: 'REQ003',
        tipo: TipoDocumento.REQUISICAO_FORMAL,
        nome: 'Requisicao-Formal-003.pdf',
        url: '/docs/req-003.pdf',
        tamanho: 180000,
        mimeType: 'application/pdf',
        obrigatorio: true,
        dataUpload: new Date('2025-01-08'),
        uploadedBy: '4'
      },
      {
        id: 'DOC003',
        requisicaoId: 'REQ003',
        tipo: TipoDocumento.COMPROVANTE_PAGAMENTO,
        nome: 'Comprovante-Pagamento-003.pdf',
        url: '/docs/comp-003.pdf',
        tamanho: 95000,
        mimeType: 'application/pdf',
        obrigatorio: true,
        dataUpload: new Date('2025-01-15'),
        uploadedBy: '1'
      }
    ],
    documentosCompletos: true,
    recorrente: false,
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-15'),
    createdBy: '4',
    updatedBy: '1'
  }
];

// Mock de contas recorrentes
export const mockContasRecorrentes: ContaRecorrente[] = [
  {
    id: 'REC001',
    empresaId: 'biodina-001',
    nome: 'Energia Elétrica - Sede',
    fornecedor: mockFornecedores[1],
    valor: 4800,
    periodicidade: Periodicidade.MENSAL,
    diaVencimento: 15,
    ativa: true,
    categoria: CategoriaContaRecorrente.LUZ,
    centroCusto: 'Administração',
    observacoes: 'Conta principal da sede',
    proximoVencimento: new Date('2025-02-15'),
    ultimoPagamento: new Date('2025-01-15')
  },
  {
    id: 'REC002',
    empresaId: 'biodina-001',
    nome: 'Telecomunicações - Pacote Completo',
    fornecedor: mockFornecedores[2],
    valor: 1200,
    periodicidade: Periodicidade.MENSAL,
    diaVencimento: 10,
    ativa: true,
    categoria: CategoriaContaRecorrente.TELEFONIA,
    centroCusto: 'Geral',
    proximoVencimento: new Date('2025-02-10'),
    ultimoPagamento: new Date('2025-01-10')
  },
  {
    id: 'REC003',
    empresaId: 'biodina-001',
    nome: 'Aluguel - Galpão Produção',
    fornecedor: { id: '5', nome: 'Imobiliária XYZ Ltda', cnpj: '22.333.444/0001-55', email: 'contratos@xyz.com.br' },
    valor: 12000,
    periodicidade: Periodicidade.MENSAL, 
    diaVencimento: 5,
    ativa: true,
    categoria: CategoriaContaRecorrente.ALUGUEL,
    centroCusto: 'Produção',
    proximoVencimento: new Date('2025-02-05')
  },
  {
    id: 'REC004',
    empresaId: 'biodina-001',
    nome: 'Software ERP - Licença Anual',
    fornecedor: { id: '6', nome: 'TechSoft Solutions', cnpj: '33.444.555/0001-66', email: 'suporte@techsoft.com' },
    valor: 8500,
    periodicidade: Periodicidade.ANUAL,
    diaVencimento: 1,
    ativa: true,
    categoria: CategoriaContaRecorrente.SOFTWARE,
    centroCusto: 'TI',
    proximoVencimento: new Date('2026-01-01'),
    ultimoPagamento: new Date('2025-01-01')
  }
];

// Mock de itens do calendário (próximos 30 dias)
export const mockCalendarioItens: CalendarioItem[] = [
  {
    empresaId: 'biodina-001',
    data: new Date('2025-01-25'),
    contas: [
      {
        id: 'REQ001',
        tipo: 'requisicao',
        nome: 'Aquisição de materiais - Projeto Alpha',
        fornecedor: 'Distribuidora ABC Ltda',
        valor: 15000,
        status: StatusRequisicao.AGUARDANDO_APROVACAO_SETOR,
        urgencia: UrgenciaVencimento.NORMAL
      }
    ],
    totalValor: 15000
  },
  {
    empresaId: 'biodina-001',
    data: new Date('2025-01-30'),
    contas: [
      {
        id: 'REQ002',
        tipo: 'requisicao',
        nome: 'Passagem aérea - Projeto Beta',
        fornecedor: 'Agência de Viagens',
        valor: 2800,
        status: StatusRequisicao.APROVADA,
        urgencia: UrgenciaVencimento.NORMAL
      }
    ],
    totalValor: 2800
  },
  {
    empresaId: 'biodina-001',
    data: new Date('2025-02-05'),
    contas: [
      {
        id: 'REC003',
        tipo: 'recorrente',
        nome: 'Aluguel - Galpão Produção',
        fornecedor: 'Imobiliária XYZ Ltda',
        valor: 12000,
        status: StatusRequisicao.PAGAMENTO_PROGRAMADO,
        urgencia: UrgenciaVencimento.NORMAL
      }
    ],
    totalValor: 12000
  },
  {
    empresaId: 'biodina-001',
    data: new Date('2025-02-10'),
    contas: [
      {
        id: 'REC002',
        tipo: 'recorrente',
        nome: 'Telecomunicações - Pacote Completo',
        fornecedor: 'Telecomunicações XYZ',
        valor: 1200,
        status: StatusRequisicao.PAGAMENTO_PROGRAMADO,
        urgencia: UrgenciaVencimento.NORMAL
      }
    ],
    totalValor: 1200
  },
  {
    empresaId: 'biodina-001',
    data: new Date('2025-02-15'),
    contas: [
      {
        id: 'REC001',
        tipo: 'recorrente',
        nome: 'Energia Elétrica - Sede',
        fornecedor: 'Energia Elétrica S.A',
        valor: 4800,
        status: StatusRequisicao.PAGAMENTO_PROGRAMADO,
        urgencia: UrgenciaVencimento.NORMAL
      }
    ],
    totalValor: 4800
  }
];

// Departamentos disponíveis para vinculação
export const mockDepartamentos = [
  'Administração',
  'Comercial',
  'Produção',
  'Suprimentos',
  'Tecnologia da Informação',
  'Recursos Humanos',
  'Financeiro',
  'Qualidade',
  'Logística'
];

// Centros de custo
export const mockCentrosCusto = [
  { id: '1', nome: 'Administração', descricao: 'Custos administrativos gerais' },
  { id: '2', nome: 'Produção', descricao: 'Custos diretos de produção' },
  { id: '3', nome: 'Comercial', descricao: 'Custos comerciais e vendas' },
  { id: '4', nome: 'TI', descricao: 'Tecnologia da Informação' },
  { id: '5', nome: 'RH', descricao: 'Recursos Humanos' },
  { id: '6', nome: 'Qualidade', descricao: 'Controle de qualidade' },
  { id: '7', nome: 'Logística', descricao: 'Logística e distribuição' }
];

// Função para calcular urgência baseada na data de vencimento
export const calcularUrgencia = (dataVencimento: Date): UrgenciaVencimento => {
  const hoje = new Date();
  const diasDiferenca = Math.ceil((dataVencimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
  
  if (diasDiferenca < -5) return UrgenciaVencimento.CRITICA;
  if (diasDiferenca < 0) return UrgenciaVencimento.VENCIDO;
  if (diasDiferenca <= 3) return UrgenciaVencimento.PROXIMO;
  return UrgenciaVencimento.NORMAL;
};

// Função para gerar próximo número de requisição
export const gerarProximoNumeroRequisicao = (): string => {
  const ano = new Date().getFullYear();
  const ultimoNumero = mockRequisicoes.length;
  return `${ano}-${String(ultimoNumero + 1).padStart(3, '0')}`;
};

// Mock simplified for modal forms
export const mockDepartamentosSimples = [
  { id: '1', nome: 'Administração' },
  { id: '2', nome: 'Comercial' },
  { id: '3', nome: 'Produção' },
  { id: '4', nome: 'Suprimentos' },
  { id: '5', nome: 'Tecnologia da Informação' },
  { id: '6', nome: 'Recursos Humanos' },
  { id: '7', nome: 'Financeiro' },
  { id: '8', nome: 'Qualidade' },
  { id: '9', nome: 'Logística' }
];

export const mockProjetosSimples = [
  { id: '1', nome: 'Projeto Alpha' },
  { id: '2', nome: 'Projeto Beta' },
  { id: '3', nome: 'Projeto Gamma' }  
];

export const mockFornecedoresSimples = [
  { id: '1', nome: 'Distribuidora ABC Ltda' },
  { id: '2', nome: 'Energia Elétrica S.A' },
  { id: '3', nome: 'Telecomunicações XYZ' },
  { id: '4', nome: 'João da Silva - MEI' }
];

// Required documents list for new modals
export const DOCUMENTOS_OBRIGATORIOS_MODAL = [
  'E-mail do pedido/requisição',
  'Requisição formal (formulário)',
  'Nota Fiscal',
  'Boleto/Duplicata',
  'Comprovante de pagamento (após pagamento)'
];