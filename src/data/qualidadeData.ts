import { 
  AuditoriaQualidade, 
  PesquisaSatisfacao, 
  RegistroRastreabilidade, 
  NaoConformidade,
  DadosNCMensal,
  DadosRetrabalho,
  DadosEficienciaCAPA,
  IndiceQualidadeFornecedor,
  IntegracaoSensor
} from '@/types/qualidade';

export const auditoresDisponiveis = [
  'Dr. Carlos Silva',
  'Dra. Ana Paula Costa',
  'Eng. Roberto Mendes',
  'Dra. Juliana Santos',
  'Dr. Fernando Lima'
];

export const auditoriasMockadas: AuditoriaQualidade[] = [
  {
    id: '1',
    data: new Date('2024-10-15'),
    auditorResponsavel: 'Dr. Carlos Silva',
    resultadoGeral: 'Aprovado',
    pontosCriticos: [
      {
        id: '1',
        descricao: 'Calibração de balanças',
        status: 'Reaprovado'
      },
      {
        id: '2',
        descricao: 'Controle de temperatura da câmara fria',
        status: 'Aprovado'
      },
      {
        id: '3',
        descricao: 'Documentação de processos',
        status: 'Aprovado'
      }
    ],
    observacoes: 'Auditoria anual conforme ISO 9001'
  },
  {
    id: '2',
    data: new Date('2023-10-20'),
    auditorResponsavel: 'Dra. Ana Paula Costa',
    resultadoGeral: 'Aprovado',
    pontosCriticos: [
      {
        id: '4',
        descricao: 'Controle de estoque',
        status: 'Aprovado'
      },
      {
        id: '5',
        descricao: 'Treinamento de equipe',
        status: 'Aprovado'
      }
    ]
  }
];

export const pesquisaSatisfacaoMockada: PesquisaSatisfacao = {
  percentualSatisfacao: 88,
  percentualLimite: 15,
  alertas: [
    {
      id: '1',
      categoria: 'Tempo de Resposta',
      percentual: 12,
      descricao: '12% dos clientes insatisfeitos com o tempo de resposta'
    },
    {
      id: '2',
      categoria: 'Qualidade do Produto',
      percentual: 8,
      descricao: '8% de questionamentos sobre qualidade do produto'
    },
    {
      id: '3',
      categoria: 'Atendimento',
      percentual: 5,
      descricao: '5% de insatisfação com o atendimento'
    }
  ],
  ultimaAtualizacao: new Date('2024-11-01')
};

export const rastreabilidadeMockada: RegistroRastreabilidade[] = [
  {
    id: '1',
    lote: 'LOTE-20241115',
    ordemServico: 'OS-4521',
    tipoOS: 'Saída',
    material: 'Matéria-Prima X',
    dataHora: new Date('2024-11-15T14:30:00'),
    responsavel: 'João Silva'
  },
  {
    id: '2',
    lote: 'LOTE-20241114',
    ordemServico: 'OS-4520',
    tipoOS: 'Entrada',
    material: 'Reagente Y',
    dataHora: new Date('2024-11-14T09:15:00'),
    responsavel: 'Maria Santos'
  },
  {
    id: '3',
    lote: 'LOTE-20241113',
    ordemServico: 'OS-4519',
    tipoOS: 'Saída',
    material: 'Produto Final Z',
    dataHora: new Date('2024-11-13T16:45:00'),
    responsavel: 'Pedro Costa'
  }
];

export const responsaveisNC = [
  'João Silva',
  'Maria Santos',
  'Pedro Costa',
  'Ana Lima',
  'Carlos Eduardo'
];

export const naoConformidadesMockadas: NaoConformidade[] = [
  {
    id: '1',
    numeroNC: 'NC-2024-001',
    origem: 'Auditoria',
    tipo: 'Material Não Conforme',
    impacto: 'Crítico',
    responsavel: 'João Silva',
    prazo: new Date('2024-11-20'),
    status: 'Em Análise',
    descricao: 'Material fora das especificações detectado no recebimento',
    acaoImediata: 'Bloqueio imediato do lote LOTE-20241115',
    dataCriacao: new Date('2024-11-15'),
    capa: {
      id: 'capa-1',
      acaoPreventiva: 'Revisão do POP de Inspeção de Recebimento',
      acaoCorretiva: 'Treinamento de recebimento para equipe de estoque',
      prazoFinal: new Date('2024-12-15'),
      status: 'Em Andamento',
      responsavel: 'Maria Santos'
    }
  },
  {
    id: '2',
    numeroNC: 'NC-2024-002',
    origem: 'Pesquisa',
    tipo: 'Atendimento',
    impacto: 'Moderado',
    responsavel: 'Maria Santos',
    prazo: new Date('2024-11-25'),
    status: 'Aguardando CAPA',
    descricao: 'Reclamação de cliente sobre tempo de resposta',
    acaoImediata: 'Contato imediato com cliente para esclarecimentos',
    dataCriacao: new Date('2024-11-10'),
    capa: {
      id: 'capa-2',
      acaoPreventiva: 'Implementar sistema de SLA automatizado',
      acaoCorretiva: 'Treinamento de equipe de atendimento',
      prazoFinal: new Date('2024-12-20'),
      status: 'Pendente',
      responsavel: 'Pedro Costa'
    }
  },
  {
    id: '3',
    numeroNC: 'NC-2024-003',
    origem: 'Outro',
    tipo: 'Treinamento Falho',
    impacto: 'Moderado',
    responsavel: 'Pedro Costa',
    prazo: new Date('2024-11-30'),
    status: 'Aberta',
    descricao: 'Colaborador executou procedimento sem seguir POP atualizado',
    acaoImediata: 'Reforço imediato do treinamento com colaborador',
    dataCriacao: new Date('2024-11-12')
  },
  {
    id: '4',
    numeroNC: 'NC-2024-004',
    origem: 'Auditoria',
    tipo: 'Material Não Conforme',
    impacto: 'Baixo',
    responsavel: 'Ana Lima',
    prazo: new Date('2024-12-05'),
    status: 'Aberta',
    descricao: 'Identificação de lote com etiqueta ilegível',
    acaoImediata: 'Reidentificação imediata do lote',
    dataCriacao: new Date('2024-11-14')
  },
  {
    id: '5',
    numeroNC: 'NC-2024-005',
    origem: 'Pesquisa',
    tipo: 'Atendimento',
    impacto: 'Baixo',
    responsavel: 'Carlos Eduardo',
    prazo: new Date('2024-12-10'),
    status: 'Aberta',
    descricao: 'Cliente relatou documentação incompleta na entrega',
    acaoImediata: 'Envio imediato da documentação faltante',
    dataCriacao: new Date('2024-11-13')
  }
];

// Dados para Análise de Dados e Indicadores

export const dadosNCMensal: DadosNCMensal[] = [
  { mes: 'Jun/24', quantidade: 8 },
  { mes: 'Jul/24', quantidade: 7 },
  { mes: 'Ago/24', quantidade: 6 },
  { mes: 'Set/24', quantidade: 5 },
  { mes: 'Out/24', quantidade: 4 },
  { mes: 'Nov/24', quantidade: 3 }
];

export const dadosRetrabalho: DadosRetrabalho[] = [
  { tipo: 'Reenvio de Material', valor: 60, percentual: 60 },
  { tipo: 'Retreinamento de Equipes', valor: 40, percentual: 40 }
];

export const dadosEficienciaCAPA: DadosEficienciaCAPA[] = [
  { tipo: 'Ações Preventivas', quantidade: 70 },
  { tipo: 'Ações Corretivas', quantidade: 30 }
];

export const indicesQualidadeFornecedores: IndiceQualidadeFornecedor[] = [
  {
    id: '1',
    nome: 'Fornecedor A',
    indiceQualidade: 98,
    materiaisNaoConformes: 2,
    totalMateriais: 100
  },
  {
    id: '2',
    nome: 'Fornecedor B',
    indiceQualidade: 92,
    materiaisNaoConformes: 8,
    totalMateriais: 100
  },
  {
    id: '3',
    nome: 'Fornecedor C',
    indiceQualidade: 85,
    materiaisNaoConformes: 15,
    totalMateriais: 100
  },
  {
    id: '4',
    nome: 'Fornecedor D',
    indiceQualidade: 95,
    materiaisNaoConformes: 5,
    totalMateriais: 100
  }
];

export const integracoesSensores: IntegracaoSensor[] = [
  {
    id: '1',
    nome: 'Câmara Fria',
    tipo: 'Temperatura',
    status: 'OK',
    valor: '-18',
    unidade: '°C',
    limiteMin: -20,
    limiteMax: -15,
    ultimaAtualizacao: new Date()
  },
  {
    id: '2',
    nome: 'Controle de Umidade',
    tipo: 'Umidade',
    status: 'Alerta',
    valor: '75',
    unidade: '%',
    limiteMin: 40,
    limiteMax: 70,
    ultimaAtualizacao: new Date()
  },
  {
    id: '3',
    nome: 'Sistema de Logística',
    tipo: 'Sistema',
    status: 'OK',
    ultimaAtualizacao: new Date()
  },
  {
    id: '4',
    nome: 'Alarme de Segurança',
    tipo: 'Alarme',
    status: 'Desativado',
    ultimaAtualizacao: new Date()
  }
];
