import { AuditoriaQualidade, PesquisaSatisfacao, RegistroRastreabilidade } from '@/types/qualidade';

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
