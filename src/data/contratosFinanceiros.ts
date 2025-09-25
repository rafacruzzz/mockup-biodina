import { PedidoFinanceiro } from '@/types/financeiro';

export const mockPedidosFinanceiros: PedidoFinanceiro[] = [
  {
    id: '1',
    numeroPedido: 'PED-2024-001',
    origem: 'licitacao',
    cliente: 'Universidade Federal de São Paulo',
    vendedor: 'Carlos Silva',
    valor: 450000,
    dataVenda: '2024-01-15',
    dataPrevistaPagamento: '2024-02-15',
    status: 'pendente_aprovacao',
    prioridade: 'alta',
    descricao: 'Pregão 123/2024 - Equipamentos Médicos Hospitalares',
    numeroOportunidade: 'OPP-2024-045',
    numeroLicitacao: 'PREGAO-123/2024',
    responsavelComercial: 'Carlos Silva',
    documentos: ['contrato.pdf', 'proposta_tecnica.pdf', 'ata_preco.pdf'],
    historico: [
      {
        id: '1',
        pedidoId: '1',
        data: '2024-01-15',
        acao: 'Pedido criado',
        observacao: 'Licitação ganha, aguardando processamento financeiro',
        usuario: 'Carlos Silva'
      },
      {
        id: '2',
        pedidoId: '1',
        data: '2024-01-18',
        acao: 'Documentação enviada',
        observacao: 'Todos os documentos necessários foram anexados',
        usuario: 'Ana Costa'
      }
    ],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-18T14:20:00Z'
  },
  {
    id: '2',
    numeroPedido: 'PED-2024-002',
    origem: 'contratacao_direta',
    cliente: 'Hospital Santa Maria',
    vendedor: 'Maria Santos',
    valor: 280000,
    dataVenda: '2024-01-20',
    dataPrevistaPagamento: '2024-02-20',
    status: 'aprovado',
    prioridade: 'media',
    descricao: 'Contrato Anual - Materiais Cirúrgicos e Hospitalares',
    numeroOportunidade: 'OPP-2024-078',
    tipoContrato: 'Contrato Anual',
    responsavelComercial: 'Maria Santos',
    documentos: ['contrato_anual.pdf', 'lista_produtos.pdf'],
    historico: [
      {
        id: '3',
        pedidoId: '2',
        data: '2024-01-20',
        acao: 'Pedido criado',
        observacao: 'Contratação direta aprovada pelo cliente',
        usuario: 'Maria Santos'
      },
      {
        id: '4',
        pedidoId: '2',
        data: '2024-01-22',
        acao: 'Aprovado pelo financeiro',
        observacao: 'Documentação completa e valores aprovados',
        usuario: 'João Financeiro'
      }
    ],
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-01-22T16:45:00Z'
  },
  {
    id: '3',
    numeroPedido: 'PED-2024-003',
    origem: 'importacao_direta',
    cliente: 'TechMed Distribuição',
    vendedor: 'Roberto Lima',
    valor: 180000,
    dataVenda: '2024-01-25',
    dataPrevistaPagamento: '2024-03-10',
    status: 'em_pagamento',
    prioridade: 'urgente',
    descricao: 'Importação Direta China - Componentes Eletrônicos',
    numeroOportunidade: 'OPP-2024-091',
    tipoContrato: 'Importação Direta',
    responsavelComercial: 'Roberto Lima',
    documentos: ['invoice_china.pdf', 'bl_conhecimento.pdf', 'licenca_importacao.pdf'],
    historico: [
      {
        id: '5',
        pedidoId: '3',
        data: '2024-01-25',
        acao: 'Pedido criado',
        observacao: 'Importação aprovada, produtos em trânsito',
        usuario: 'Roberto Lima'
      },
      {
        id: '6',
        pedidoId: '3',
        data: '2024-02-01',
        acao: 'Pagamento iniciado',
        observacao: 'Transferência internacional em processamento',
        usuario: 'Ana Financeiro'
      }
    ],
    createdAt: '2024-01-25T11:00:00Z',
    updatedAt: '2024-02-01T08:30:00Z'
  },
  {
    id: '4',
    numeroPedido: 'PED-2024-004',
    origem: 'licitacao',
    cliente: 'Prefeitura Municipal de Campinas',
    vendedor: 'Patricia Alves',
    valor: 320000,
    dataVenda: '2024-02-01',
    dataPrevistaPagamento: '2024-03-01',
    status: 'pago',
    prioridade: 'media',
    descricao: 'Pregão 045/2024 - Material de Escritório e Informática',
    numeroOportunidade: 'OPP-2024-112',
    numeroLicitacao: 'PREGAO-045/2024',
    responsavelComercial: 'Patricia Alves',
    documentos: ['contrato_municipio.pdf', 'nota_empenho.pdf'],
    historico: [
      {
        id: '7',
        pedidoId: '4',
        data: '2024-02-01',
        acao: 'Pedido criado',
        observacao: 'Licitação municipal ganha',
        usuario: 'Patricia Alves'
      },
      {
        id: '8',
        pedidoId: '4',
        data: '2024-02-15',
        acao: 'Pagamento concluído',
        observacao: 'Valores transferidos conforme cronograma',
        usuario: 'João Financeiro'
      }
    ],
    createdAt: '2024-02-01T14:20:00Z',
    updatedAt: '2024-02-15T10:15:00Z'
  },
  {
    id: '5',
    numeroPedido: 'PED-2024-005',
    origem: 'contratacao_direta',
    cliente: 'Clínica Ortopédica Especializada',
    vendedor: 'Fernando Costa',
    valor: 95000,
    dataVenda: '2024-02-05',
    dataPrevistaPagamento: '2024-01-25', // Atrasado
    status: 'atrasado',
    prioridade: 'urgente',
    descricao: 'Equipamentos Ortopédicos - Contrato Emergencial',
    numeroOportunidade: 'OPP-2024-134',
    tipoContrato: 'Contrato Emergencial',
    responsavelComercial: 'Fernando Costa',
    documentos: ['contrato_emergencial.pdf', 'justificativa_urgencia.pdf'],
    historico: [
      {
        id: '9',
        pedidoId: '5',
        data: '2024-02-05',
        acao: 'Pedido criado',
        observacao: 'Contrato emergencial devido à urgência médica',
        usuario: 'Fernando Costa'
      },
      {
        id: '10',
        pedidoId: '5',
        data: '2024-01-26',
        acao: 'Marcado como atrasado',
        observacao: 'Prazo de pagamento excedido',
        usuario: 'Sistema'
      }
    ],
    createdAt: '2024-02-05T16:45:00Z',
    updatedAt: '2024-01-26T12:00:00Z'
  },
  {
    id: '6',
    numeroPedido: 'PED-2024-006',
    origem: 'importacao_direta',
    cliente: 'BioMed Laboratórios',
    vendedor: 'Luciana Torres',
    valor: 520000,
    dataVenda: '2024-02-10',
    dataPrevistaPagamento: '2024-04-15',
    status: 'pendente_aprovacao',
    prioridade: 'alta',
    descricao: 'Importação Alemanha - Equipamentos de Análise Clínica',
    numeroOportunidade: 'OPP-2024-156',
    tipoContrato: 'Importação Direta',
    responsavelComercial: 'Luciana Torres',
    documentos: ['proforma_alemanha.pdf', 'especificacoes_tecnicas.pdf'],
    historico: [
      {
        id: '11',
        pedidoId: '6',
        data: '2024-02-10',
        acao: 'Pedido criado',
        observacao: 'Importação de equipamentos de alta precisão',
        usuario: 'Luciana Torres'
      }
    ],
    createdAt: '2024-02-10T13:30:00Z',
    updatedAt: '2024-02-10T13:30:00Z'
  },
  {
    id: '7',
    numeroPedido: 'PED-2024-007',
    origem: 'licitacao',
    cliente: 'Hospital Público Regional',
    vendedor: 'Diego Mendes',
    valor: 680000,
    dataVenda: '2024-02-12',
    dataPrevistaPagamento: '2024-03-12',
    status: 'aprovado',
    prioridade: 'alta',
    descricao: 'Pregão 078/2024 - UTI Completa para Emergência',
    numeroOportunidade: 'OPP-2024-167',
    numeroLicitacao: 'PREGAO-078/2024',
    responsavelComercial: 'Diego Mendes',
    documentos: ['ata_preco_uti.pdf', 'cronograma_entrega.pdf', 'garantias.pdf'],
    historico: [
      {
        id: '12',
        pedidoId: '7',
        data: '2024-02-12',
        acao: 'Pedido criado',
        observacao: 'Licitação para equipar nova UTI do hospital',
        usuario: 'Diego Mendes'
      },
      {
        id: '13',
        pedidoId: '7',
        data: '2024-02-14',
        acao: 'Aprovado pelo financeiro',
        observacao: 'Verba aprovada conforme orçamento anual',
        usuario: 'Maria Financeiro'
      }
    ],
    createdAt: '2024-02-12T10:45:00Z',
    updatedAt: '2024-02-14T15:20:00Z'
  },
  {
    id: '8',
    numeroPedido: 'PED-2024-008',
    origem: 'contratacao_direta',
    cliente: 'Rede de Farmácias MedPlus',
    vendedor: 'Sandra Oliveira',
    valor: 150000,
    dataVenda: '2024-02-15',
    dataPrevistaPagamento: '2024-03-15',
    status: 'pendente_aprovacao',
    prioridade: 'baixa',
    descricao: 'Contrato Trimestral - Medicamentos e Suplementos',
    numeroOportunidade: 'OPP-2024-189',
    tipoContrato: 'Contrato Trimestral',
    responsavelComercial: 'Sandra Oliveira',
    documentos: ['contrato_farmacia.pdf', 'lista_medicamentos.pdf'],
    observacoes: 'Cliente solicitou prazo estendido para pagamento devido ao fluxo de caixa',
    historico: [
      {
        id: '14',
        pedidoId: '8',
        data: '2024-02-15',
        acao: 'Pedido criado',
        observacao: 'Renovação de contrato trimestral com a rede',
        usuario: 'Sandra Oliveira'
      }
    ],
    createdAt: '2024-02-15T09:30:00Z',
    updatedAt: '2024-02-15T09:30:00Z'
  }
];