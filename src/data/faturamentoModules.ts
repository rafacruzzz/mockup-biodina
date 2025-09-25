import { DocumentoFiscal, ChecklistVenda, ServicoFaturamento, ProtocoloSefaz, TituloReceber } from '@/types/faturamento';

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

export const faturamentoModules = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Visão geral do faturamento',
    icon: 'BarChart3'
  },
  {
    id: 'entrada',
    title: 'Entrada',
    description: 'Checklist de vendas e validações',
    icon: 'ArrowDownCircle'
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