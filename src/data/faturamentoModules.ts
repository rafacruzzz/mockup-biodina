import { DocumentoFiscal, ChecklistVenda, ServicoFaturamento, ProtocoloSefaz, TituloReceber, PedidoEntradaMercadoria, NotificacaoEntrada } from '@/types/faturamento';

export const mockChecklistVendas: ChecklistVenda[] = [
  {
    id: 'CV001',
    pedidoId: 'PED-2024-001',
    cliente: 'Farmácia Central Ltda',
    vendedor: 'João Silva',
    valor: 15750.00,
    dataConfirmacao: '2025-01-20',
    estoqueValidado: true,
    servicosConcluidos: true,
    documentacaoCompleta: true,
    status: 'Liberado',
  },
  {
    id: 'CV002', 
    pedidoId: 'PED-2024-002',
    cliente: 'Hospital São Lucas',
    vendedor: 'Maria Santos',
    valor: 32400.00,
    dataConfirmacao: '2025-01-22',
    estoqueValidado: true,
    servicosConcluidos: false,
    documentacaoCompleta: true,
    status: 'Validando',
  },
  {
    id: 'CV003',
    pedidoId: 'PED-2024-003',
    cliente: 'Drogaria Moderna',
    vendedor: 'Carlos Oliveira',
    valor: 8900.00,
    dataConfirmacao: '2025-01-23',
    estoqueValidado: false,
    servicosConcluidos: true,
    documentacaoCompleta: false,
    status: 'Aguardando',
  }
];

export const mockDocumentosFiscais: DocumentoFiscal[] = [
  {
    id: 'DF001',
    numero: '000001234',
    serie: '1',
    tipo: 'NF-e',
    cliente: 'Farmácia Central Ltda',
    cnpjCpf: '12.345.678/0001-90',
    valor: 15000.00,
    impostos: 750.00,
    valorTotal: 15750.00,
    emissao: '2025-01-20',
    vencimento: '2025-02-19',
    status: 'Autorizado',
    protocolo: '135240000123456',
    chaveAcesso: '25250112345678000190550010000012341234567890',
    cfop: '5102',
    naturezaOperacao: 'Venda de mercadorias',
  },
  {
    id: 'DF002',
    numero: '000001235',
    serie: '1', 
    tipo: 'NF-e',
    cliente: 'Hospital São Lucas',
    cnpjCpf: '98.765.432/0001-10',
    valor: 30800.00,
    impostos: 1600.00,
    valorTotal: 32400.00,
    emissao: '2025-01-22',
    vencimento: '2025-02-21',
    status: 'Emitido',
    cfop: '5102',
    naturezaOperacao: 'Venda de mercadorias',
  },
  {
    id: 'DF003',
    numero: '000000156',
    serie: '2',
    tipo: 'NFS-e',
    cliente: 'Clínica Vida Saudável',
    cnpjCpf: '11.222.333/0001-44',
    valor: 2500.00,
    impostos: 125.00,
    valorTotal: 2625.00,
    emissao: '2025-01-23',
    status: 'Autorizado',
    protocolo: 'SP240000789123',
    cfop: '5933',
    naturezaOperacao: 'Prestação de serviços',
  }
];

export const mockServicosFaturamento: ServicoFaturamento[] = [
  {
    id: 'SF001',
    descricao: 'Consultoria Regulatória ANVISA',
    cliente: 'Laboratório XYZ',
    valor: 12000.00,
    dataInicio: '2025-01-10',
    dataConclusao: '2025-01-25',
    responsavel: 'Dr. Pedro Alvares',
    status: 'Concluído',
  },
  {
    id: 'SF002',
    descricao: 'Assessoria Técnica em Registros',
    cliente: 'Indústria Farmacêutica ABC',
    valor: 8500.00,
    dataInicio: '2025-01-15',
    responsavel: 'Dra. Ana Costa',
    status: 'Em Andamento',
  },
  {
    id: 'SF003',
    descricao: 'Treinamento Boas Práticas',
    cliente: 'Hospital Regional',
    valor: 3200.00,
    dataInicio: '2025-01-22',
    dataConclusao: '2025-01-24',
    responsavel: 'Prof. Ricardo Lima',
    status: 'Aprovado',
  }
];

export const mockProtocolosSefaz: ProtocoloSefaz[] = [
  {
    id: 'PS001',
    documentoId: 'DF001',
    protocolo: '135240000123456',
    dataEnvio: '2025-01-20T14:30:00',
    dataRetorno: '2025-01-20T14:32:15',
    status: 'Autorizado',
    mensagem: 'Autorizado o uso da NF-e',
    tentativas: 1,
  },
  {
    id: 'PS002',
    documentoId: 'DF002', 
    protocolo: '135240000123457',
    dataEnvio: '2025-01-22T09:15:00',
    status: 'Enviando',
    tentativas: 1,
  }
];

export const mockTitulosReceber: TituloReceber[] = [
  {
    id: 'TR001',
    documentoFiscalId: 'DF001',
    numero: 'REC-2025-001',
    cliente: 'Farmácia Central Ltda',
    valor: 15750.00,
    vencimento: '2025-02-19',
    status: 'Aberto',
    formaPagamento: 'Boleto Bancário',
    condicoesPagamento: '30 dias',
  },
  {
    id: 'TR002',
    documentoFiscalId: 'DF002',
    numero: 'REC-2025-002', 
    cliente: 'Hospital São Lucas',
    valor: 32400.00,
    vencimento: '2025-02-21',
    status: 'Aberto',
    formaPagamento: 'Transferência Bancária',
    condicoesPagamento: '30 dias',
  }
];

export const mockPedidosEntrada: PedidoEntradaMercadoria[] = [
  {
    id: 'ENT001',
    numeroPedido: 'IMP-2025-001',
    tipo: 'Importacao',
    fornecedor: 'MedTech USA Inc.',
    cnpjFornecedor: '00.000.000/0001-00',
    numeroNF: 'INV-US-2025-456',
    dataEmissao: '2025-01-10',
    dataEntrada: '2025-01-25',
    valorTotal: 85000.00,
    valorImpostos: 15300.00,
    categoria: 'Produto',
    status: 'Aguardando Entrada',
    itens: [
      {
        id: 'ITEM001',
        codigo: 'AN-X1-2023',
        descricao: 'Analisador Bioquímico X1',
        quantidade: 1,
        valorUnitario: 85000.00,
        valorTotal: 85000.00,
        ncm: '90278099',
        cfop: '3102'
      }
    ],
    observacoes: 'Equipamento com regime especial de ICMS'
  },
  {
    id: 'ENT002',
    numeroPedido: 'PED-2025-045',
    tipo: 'Compra Revenda',
    fornecedor: 'Distribuidora Pharma Brasil',
    cnpjFornecedor: '12.345.678/0001-90',
    numeroNF: '000123456',
    chaveAcesso: '35250112345678000190550010001234561234567890',
    dataEmissao: '2025-01-20',
    dataEntrada: '2025-01-22',
    valorTotal: 32500.00,
    valorImpostos: 5850.00,
    categoria: 'Produto',
    status: 'NF Recebida',
    itens: [
      {
        id: 'ITEM002',
        codigo: 'MED-001',
        descricao: 'Kit Reagente Tipo A - cx 100un',
        quantidade: 50,
        valorUnitario: 650.00,
        valorTotal: 32500.00,
        ncm: '38220000',
        cfop: '1102'
      }
    ]
  },
  {
    id: 'ENT003',
    numeroPedido: 'SERV-2025-012',
    tipo: 'Compra Revenda',
    fornecedor: 'Tech Solutions Ltda',
    cnpjFornecedor: '98.765.432/0001-10',
    numeroNF: '000000789',
    dataEmissao: '2025-01-18',
    dataEntrada: '2025-01-20',
    valorTotal: 8500.00,
    valorImpostos: 850.00,
    categoria: 'Servico',
    status: 'Entrada Confirmada',
    itens: [
      {
        id: 'ITEM003',
        codigo: 'SERV-TI-001',
        descricao: 'Consultoria em TI - 40h',
        quantidade: 1,
        valorUnitario: 8500.00,
        valorTotal: 8500.00,
        cfop: '1933'
      }
    ]
  },
  {
    id: 'ENT004',
    numeroPedido: 'IMP-2025-002',
    tipo: 'Importacao',
    fornecedor: 'Global Instruments Ltd',
    cnpjFornecedor: '11.111.111/0001-11',
    numeroNF: 'INV-GL-2025-789',
    dataEmissao: '2025-01-22',
    dataEntrada: '2025-01-28',
    valorTotal: 125000.00,
    valorImpostos: 22500.00,
    categoria: 'Produto',
    status: 'Aguardando Entrada',
    itens: [
      {
        id: 'ITEM004',
        codigo: 'SP-2024',
        descricao: 'Espectrofotômetro UV-VIS',
        quantidade: 2,
        valorUnitario: 62500.00,
        valorTotal: 125000.00,
        ncm: '90278099',
        cfop: '3102'
      }
    ]
  }
];

export const mockNotificacoesEntrada: NotificacaoEntrada[] = [
  {
    id: 'NOT001',
    pedidoId: 'ENT001',
    tipo: 'Produto',
    prioridade: 'Alta',
    mensagem: 'NF de Importação IMP-2025-001 aguardando entrada no sistema',
    dataNotificacao: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lida: false
  },
  {
    id: 'NOT002',
    pedidoId: 'ENT002',
    tipo: 'Produto',
    prioridade: 'Media',
    mensagem: 'NF PED-2025-045 recebida, aguardando confirmação de entrada',
    dataNotificacao: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    lida: false
  },
  {
    id: 'NOT003',
    pedidoId: 'ENT003',
    tipo: 'Servico',
    prioridade: 'Baixa',
    mensagem: 'Entrada de serviço SERV-2025-012 confirmada com sucesso',
    dataNotificacao: new Date(Date.now() - 5 * 60 * 60 * 1000),
    lida: true
  },
  {
    id: 'NOT004',
    pedidoId: 'ENT004',
    tipo: 'Produto',
    prioridade: 'Alta',
    mensagem: 'Importação IMP-2025-002 com prazo de entrada próximo',
    dataNotificacao: new Date(Date.now() - 3 * 60 * 60 * 1000),
    lida: false
  }
];

export const faturamentoModules = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Visão geral do faturamento',
    icon: 'BarChart3'
  },
  {
    id: 'entrada',
    title: 'Entrada de Mercadorias',
    description: 'Gestão de NF de Importação e Compras para Revenda',
    icon: 'PackageCheck'
  },
  {
    id: 'saida',
    title: 'Saída',
    description: 'Emissão de documentos fiscais',
    icon: 'ArrowUpCircle'
  },
  {
    id: 'devolucao',
    title: 'Devolução',
    description: 'Gestão de devoluções e estornos',
    icon: 'RotateCcw'
  },
  {
    id: 'cancelamento',
    title: 'Cancelamento',
    description: 'Cancelamento de documentos fiscais',
    icon: 'XCircle'
  },
  {
    id: 'servicos',
    title: 'Serviços',
    description: 'Faturamento de serviços (NFS-e)',
    icon: 'Settings'
  },
  {
    id: 'relatorios',
    title: 'Relatórios',
    description: 'Relatórios e indicadores',
    icon: 'FileText'
  }
];