import { 
  ProcessoJuridico, 
  TipoProcesso, 
  StatusProcesso,
  ChamadoJuridico,
  TipoChamadoJuridico,
  UrgenciaChamadoJuridico,
  StatusChamadoJuridico
} from '@/types/juridico';

// Labels para os enums
export const tipoProcessoLabels: Record<TipoProcesso, string> = {
  [TipoProcesso.JUDICIAL]: 'Judicial',
  [TipoProcesso.ADMINISTRATIVO]: 'Administrativo',
  [TipoProcesso.PRECATORIO]: 'Precatório',
  [TipoProcesso.EXECUCAO_FISCAL]: 'Execução Fiscal',
  [TipoProcesso.TRABALHISTA]: 'Trabalhista'
};

export const statusProcessoLabels: Record<StatusProcesso, string> = {
  [StatusProcesso.EM_ANDAMENTO]: 'Em Andamento',
  [StatusProcesso.AGUARDANDO_PRAZO]: 'Aguardando Prazo',
  [StatusProcesso.SUSPENSO]: 'Suspenso',
  [StatusProcesso.ENCERRADO]: 'Encerrado',
  [StatusProcesso.ARQUIVADO]: 'Arquivado'
};

export const tipoChamadoLabels: Record<TipoChamadoJuridico, string> = {
  [TipoChamadoJuridico.ANALISE_DOCUMENTOS]: 'Análise de Documentos',
  [TipoChamadoJuridico.VALIDACAO_CONTRATOS]: 'Validação de Contratos',
  [TipoChamadoJuridico.ELABORACAO_RECURSOS_LICITACAO]: 'Elaboração de Recursos nas Licitações',
  [TipoChamadoJuridico.PARECER_JURIDICO]: 'Parecer Jurídico',
  [TipoChamadoJuridico.CONSULTORIA_TRABALHISTA]: 'Consultoria Trabalhista',
  [TipoChamadoJuridico.OUTROS]: 'Outros'
};

export const urgenciaLabels: Record<UrgenciaChamadoJuridico, string> = {
  [UrgenciaChamadoJuridico.BAIXA]: 'Baixa',
  [UrgenciaChamadoJuridico.MEDIA]: 'Média',
  [UrgenciaChamadoJuridico.ALTA]: 'Alta',
  [UrgenciaChamadoJuridico.CRITICA]: 'Crítica'
};

export const statusChamadoLabels: Record<StatusChamadoJuridico, string> = {
  [StatusChamadoJuridico.ABERTO]: 'Aberto',
  [StatusChamadoJuridico.EM_ANALISE]: 'Em Análise',
  [StatusChamadoJuridico.AGUARDANDO_DOCUMENTOS]: 'Aguardando Documentos',
  [StatusChamadoJuridico.RESPONDIDO]: 'Respondido',
  [StatusChamadoJuridico.FINALIZADO]: 'Finalizado'
};

// Processos Mockados
export const processosMock: ProcessoJuridico[] = [
  {
    id: '1',
    numeroProcesso: '0001234-56.2024.8.26.0100',
    tipo: TipoProcesso.JUDICIAL,
    status: StatusProcesso.EM_ANDAMENTO,
    parteContraria: 'ACME Indústria Ltda',
    vara: '1ª Vara Cível',
    comarca: 'São Paulo',
    tribunal: 'TJSP',
    objeto: 'Ação de Cobrança - Fornecimento de equipamentos médicos',
    valorCausa: 250000,
    dataDistribuicao: '15/01/2024',
    responsavelInterno: 'Dr. Carlos Silva',
    advogadoExterno: 'Escritório Advocacia & Consultoria',
    observacoes: 'Processo em fase de produção de provas',
    andamentos: [
      {
        id: '1',
        data: '20/01/2024',
        descricao: 'Juntada de petição inicial',
        responsavel: 'Dr. Carlos Silva',
        documentosAnexados: [
          { id: '1', nome: 'peticao_inicial.pdf', tipo: 'PDF', dataUpload: '20/01/2024', tamanho: '2.5 MB' }
        ]
      },
      {
        id: '2',
        data: '10/02/2024',
        descricao: 'Citação da parte contrária realizada',
        responsavel: 'Oficial de Justiça'
      },
      {
        id: '3',
        data: '25/02/2024',
        descricao: 'Contestação apresentada pela parte ré',
        responsavel: 'Advogado da Parte Contrária',
        documentosAnexados: [
          { id: '2', nome: 'contestacao.pdf', tipo: 'PDF', dataUpload: '25/02/2024', tamanho: '1.8 MB' }
        ]
      }
    ],
    documentos: [
      { id: '1', nome: 'peticao_inicial.pdf', tipo: 'PDF', dataUpload: '20/01/2024', tamanho: '2.5 MB' },
      { id: '2', nome: 'contestacao.pdf', tipo: 'PDF', dataUpload: '25/02/2024', tamanho: '1.8 MB' },
      { id: '3', nome: 'contrato_fornecimento.pdf', tipo: 'PDF', dataUpload: '20/01/2024', tamanho: '500 KB' }
    ]
  },
  {
    id: '2',
    numeroProcesso: '0007890-12.2023.5.02.0001',
    tipo: TipoProcesso.TRABALHISTA,
    status: StatusProcesso.AGUARDANDO_PRAZO,
    parteContraria: 'João da Silva',
    vara: '3ª Vara do Trabalho',
    comarca: 'São Paulo',
    tribunal: 'TRT-2',
    objeto: 'Reclamação Trabalhista - Horas Extras',
    valorCausa: 45000,
    dataDistribuicao: '10/08/2023',
    responsavelInterno: 'Dra. Marina Santos',
    observacoes: 'Aguardando audiência de conciliação',
    andamentos: [
      {
        id: '4',
        data: '15/08/2023',
        descricao: 'Audiência inicial realizada',
        responsavel: 'Juiz do Trabalho'
      },
      {
        id: '5',
        data: '20/09/2023',
        descricao: 'Apresentação de defesa',
        responsavel: 'Dra. Marina Santos',
        documentosAnexados: [
          { id: '4', nome: 'defesa_trabalhista.pdf', tipo: 'PDF', dataUpload: '20/09/2023', tamanho: '3.2 MB' }
        ]
      }
    ],
    documentos: [
      { id: '4', nome: 'defesa_trabalhista.pdf', tipo: 'PDF', dataUpload: '20/09/2023', tamanho: '3.2 MB' },
      { id: '5', nome: 'folhas_ponto.pdf', tipo: 'PDF', dataUpload: '15/08/2023', tamanho: '1.1 MB' }
    ]
  },
  {
    id: '3',
    numeroProcesso: '0003456-78.2023.4.03.6100',
    tipo: TipoProcesso.PRECATORIO,
    status: StatusProcesso.EM_ANDAMENTO,
    parteContraria: 'Estado de São Paulo',
    tribunal: 'TRF-3',
    objeto: 'Precatório - Diferenças de ICMS',
    valorCausa: 1200000,
    dataDistribuicao: '05/03/2023',
    responsavelInterno: 'Dr. Roberto Almeida',
    advogadoExterno: 'Advocacia Tributária Especializada',
    observacoes: 'Precatório em fase de requisição',
    andamentos: [
      {
        id: '6',
        data: '10/03/2023',
        descricao: 'Protocolo de requisição de precatório',
        responsavel: 'Dr. Roberto Almeida'
      }
    ],
    documentos: [
      { id: '6', nome: 'requisicao_precatorio.pdf', tipo: 'PDF', dataUpload: '10/03/2023', tamanho: '800 KB' }
    ]
  },
  {
    id: '4',
    numeroProcesso: 'PA-2024-0156',
    tipo: TipoProcesso.ADMINISTRATIVO,
    status: StatusProcesso.SUSPENSO,
    parteContraria: 'ANVISA',
    objeto: 'Processo Administrativo - Registro de Produto',
    dataDistribuicao: '20/02/2024',
    responsavelInterno: 'Dr. Carlos Silva',
    observacoes: 'Aguardando documentação complementar',
    andamentos: [
      {
        id: '7',
        data: '20/02/2024',
        descricao: 'Abertura de processo administrativo',
        responsavel: 'ANVISA'
      },
      {
        id: '8',
        data: '05/03/2024',
        descricao: 'Solicitação de documentos complementares',
        responsavel: 'ANVISA'
      }
    ],
    documentos: [
      { id: '7', nome: 'notificacao_anvisa.pdf', tipo: 'PDF', dataUpload: '05/03/2024', tamanho: '450 KB' }
    ]
  },
  {
    id: '5',
    numeroProcesso: '0009876-54.2022.8.26.0100',
    tipo: TipoProcesso.EXECUCAO_FISCAL,
    status: StatusProcesso.ENCERRADO,
    parteContraria: 'Fazenda Pública do Estado de SP',
    vara: '2ª Vara de Execuções Fiscais',
    comarca: 'São Paulo',
    tribunal: 'TJSP',
    objeto: 'Execução Fiscal - ICMS',
    valorCausa: 80000,
    dataDistribuicao: '10/05/2022',
    responsavelInterno: 'Dr. Roberto Almeida',
    observacoes: 'Processo encerrado com quitação integral',
    andamentos: [
      {
        id: '9',
        data: '15/05/2022',
        descricao: 'Citação realizada',
        responsavel: 'Oficial de Justiça'
      },
      {
        id: '10',
        data: '20/11/2023',
        descricao: 'Quitação integral do débito',
        responsavel: 'Dr. Roberto Almeida'
      },
      {
        id: '11',
        data: '10/01/2024',
        descricao: 'Extinção do processo',
        responsavel: 'Juiz'
      }
    ],
    documentos: [
      { id: '8', nome: 'comprovante_pagamento.pdf', tipo: 'PDF', dataUpload: '20/11/2023', tamanho: '300 KB' },
      { id: '9', nome: 'sentenca_extincao.pdf', tipo: 'PDF', dataUpload: '10/01/2024', tamanho: '1.2 MB' }
    ]
  }
];

// Chamados Mockados
export const chamadosMock: ChamadoJuridico[] = [
  {
    id: '1',
    tipo: TipoChamadoJuridico.VALIDACAO_CONTRATOS,
    urgencia: UrgenciaChamadoJuridico.ALTA,
    status: StatusChamadoJuridico.EM_ANALISE,
    titulo: 'Validação de Contrato de Prestação de Serviços',
    descricao: 'Necessário análise e validação de contrato de prestação de serviços de manutenção de equipamentos médicos. Valor anual de R$ 500.000,00.',
    solicitante: 'Maria Fernanda Costa',
    departamento: 'Compras',
    dataAbertura: '15/03/2024',
    prazoResposta: '20/03/2024',
    responsavelJuridico: 'Dr. Carlos Silva',
    documentosAnexados: [
      { id: '10', nome: 'minuta_contrato.pdf', tipo: 'PDF', dataUpload: '15/03/2024', tamanho: '1.5 MB' }
    ]
  },
  {
    id: '2',
    tipo: TipoChamadoJuridico.ELABORACAO_RECURSOS_LICITACAO,
    urgencia: UrgenciaChamadoJuridico.CRITICA,
    status: StatusChamadoJuridico.ABERTO,
    titulo: 'Recurso Administrativo - Pregão Eletrônico 045/2024',
    descricao: 'Elaborar recurso administrativo contra resultado de licitação. Nossa proposta foi desclassificada por alegado descumprimento de requisito técnico.',
    solicitante: 'Ricardo Mendes',
    departamento: 'Comercial',
    dataAbertura: '18/03/2024',
    prazoResposta: '19/03/2024',
    licitacaoRelacionada: 'PE-045/2024 - Hospital Municipal São José',
    documentosAnexados: [
      { id: '11', nome: 'edital.pdf', tipo: 'PDF', dataUpload: '18/03/2024', tamanho: '5.2 MB' },
      { id: '12', nome: 'ata_julgamento.pdf', tipo: 'PDF', dataUpload: '18/03/2024', tamanho: '800 KB' }
    ]
  },
  {
    id: '3',
    tipo: TipoChamadoJuridico.PARECER_JURIDICO,
    urgencia: UrgenciaChamadoJuridico.MEDIA,
    status: StatusChamadoJuridico.RESPONDIDO,
    titulo: 'Parecer sobre implantação de novo regime de trabalho',
    descricao: 'Solicitamos parecer jurídico sobre a viabilidade de implantação de regime de trabalho híbrido para o setor administrativo.',
    solicitante: 'Ana Paula Rodrigues',
    departamento: 'Recursos Humanos',
    dataAbertura: '10/03/2024',
    prazoResposta: '17/03/2024',
    dataResposta: '16/03/2024',
    responsavelJuridico: 'Dra. Marina Santos',
    parecer: 'Após análise da legislação trabalhista vigente e precedentes jurisprudenciais, opina-se pela viabilidade legal da implantação do regime híbrido, desde que observados os seguintes requisitos: 1) Formalização mediante aditivo contratual; 2) Definição clara de dias presenciais e remotos; 3) Fornecimento de equipamentos adequados; 4) Controle de jornada conforme CLT. Recomenda-se elaboração de política interna específica.',
    documentosAnexados: [
      { id: '13', nome: 'proposta_regime_hibrido.pdf', tipo: 'PDF', dataUpload: '10/03/2024', tamanho: '600 KB' }
    ]
  },
  {
    id: '4',
    tipo: TipoChamadoJuridico.ANALISE_DOCUMENTOS,
    urgencia: UrgenciaChamadoJuridico.BAIXA,
    status: StatusChamadoJuridico.FINALIZADO,
    titulo: 'Análise de documentação para registro ANVISA',
    descricao: 'Análise de documentação preparada para processo de registro de novo produto junto à ANVISA.',
    solicitante: 'Paulo Henrique Lima',
    departamento: 'Regulatório',
    dataAbertura: '01/03/2024',
    prazoResposta: '08/03/2024',
    dataResposta: '07/03/2024',
    responsavelJuridico: 'Dr. Roberto Almeida',
    parecer: 'Documentação analisada e aprovada. Todos os requisitos legais foram atendidos. Documentos estão em conformidade com RDC 185/2001 e suas atualizações.',
    documentosAnexados: [
      { id: '14', nome: 'documentacao_anvisa.zip', tipo: 'ZIP', dataUpload: '01/03/2024', tamanho: '8.5 MB' }
    ]
  }
];
