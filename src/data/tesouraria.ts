// Mock data for Treasury module

import { 
  Emprestimo, 
  ParcelaEmprestimo, 
  Investimento, 
  Seguro, 
  ReajusteSeguro,
  Consorcio, 
  ReajusteConsorcio,
  ContemplacaoConsorcio,
  ContaBancaria,
  CartaoCredito,
  MovimentacaoCaixa,
  Cheque,
  DocumentoImportante,
  Balanco,
  StatusEmprestimo,
  StatusParcela,
  TipoInvestimento,
  TipoSeguro,
  StatusSeguro,
  StatusConsorcio,
  StatusConta,
  TipoMovimentacao,
  StatusMovimentacao,
  StatusCheque,
  StatusBalanco
} from '@/types/tesouraria';

// Mock Empréstimos
export const mockEmprestimos: Emprestimo[] = [
  {
    id: 'EMP001',
    codigo: 'EMP-2024-001',
    instituicaoFinanceira: 'Banco do Brasil',
    valorTotal: 500000,
    indexador: 'CDI',
    taxaJuros: 12.5,
    multaAtraso: 2.0,
    garantia: 'Garantia Real - Imóvel sede',
    dataInicio: new Date('2024-06-01'),
    dataFim: new Date('2026-06-01'),
    status: StatusEmprestimo.ATIVO,
    cronograma: [],
    saldoDevedor: 425000,
    contratoUrl: '/docs/contratos/emp001.pdf',
    observacoes: 'Empréstimo para expansao da producao',
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2025-01-10')
  },
  {
    id: 'EMP002',
    codigo: 'EMP-2023-002',
    instituicaoFinanceira: 'Caixa Econômica Federal',
    valorTotal: 200000,
    indexador: 'SELIC',
    taxaJuros: 10.8,
    multaAtraso: 1.5,
    dataInicio: new Date('2023-08-01'),
    dataFim: new Date('2025-08-01'),
    status: StatusEmprestimo.ATIVO,
    cronograma: [],
    saldoDevedor: 125000,
    observacoes: 'Capital de giro para operações',
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2025-01-05')
  },
  {
    id: 'EMP003',
    codigo: 'EMP-2022-001',
    instituicaoFinanceira: 'Itaú Unibanco',
    valorTotal: 150000,
    indexador: 'FIXO',
    taxaJuros: 15.2,
    dataInicio: new Date('2022-03-01'),
    dataFim: new Date('2024-03-01'),
    status: StatusEmprestimo.QUITADO,
    cronograma: [],
    saldoDevedor: 0,
    observacoes: 'Quitado antecipadamente',
    createdAt: new Date('2022-02-15'),
    updatedAt: new Date('2024-02-28')
  }
];

// Mock Parcelas de Empréstimos
export const mockParcelasEmprestimo: ParcelaEmprestimo[] = [
  {
    id: 'PARC001',
    emprestimoId: 'EMP001',
    numerosParcela: 1,
    dataVencimento: new Date('2025-02-01'),
    valorPrincipal: 18750,
    valorJuros: 4375,
    valorTotal: 23125,
    status: StatusParcela.PENDENTE
  },
  {
    id: 'PARC002',
    emprestimoId: 'EMP001',
    numerosParcela: 2,
    dataVencimento: new Date('2025-03-01'),
    valorPrincipal: 18900,
    valorJuros: 4225,
    valorTotal: 23125,
    status: StatusParcela.PENDENTE
  },
  {
    id: 'PARC003',
    emprestimoId: 'EMP002',
    numerosParcela: 15,
    dataVencimento: new Date('2025-01-15'),
    valorPrincipal: 7500,
    valorJuros: 1125,
    valorTotal: 8625,
    status: StatusParcela.VENCIDO
  }
];

// Mock Investimentos
export const mockInvestimentos: Investimento[] = [
  {
    id: 'INV001',
    instituicaoFinanceira: 'Banco do Brasil',
    produto: 'CDB DI - 110% CDI',
    tipoInvestimento: TipoInvestimento.CDB,
    valorAplicado: 250000,
    dataAplicacao: new Date('2024-09-01'),
    dataVencimento: new Date('2025-09-01'),
    rentabilidadeEsperada: 12.65,
    impostos: 22.5,
    status: 'Ativo',
    rendimentoAtual: 15875.50,
    valorAtual: 265875.50,
    comprovanteUrl: '/docs/investimentos/inv001.pdf',
    observacoes: 'Liquidez diária após carência de 90 dias',
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2025-01-10')
  },
  {
    id: 'INV002',
    instituicaoFinanceira: 'Caixa Econômica Federal',
    produto: 'LCI Habitação',
    tipoInvestimento: TipoInvestimento.LCI,
    valorAplicado: 180000,
    dataAplicacao: new Date('2024-11-15'),
    dataVencimento: new Date('2026-11-15'),
    rentabilidadeEsperada: 10.2,
    impostos: 0, // LCI é isenta
    status: 'Ativo',
    rendimentoAtual: 3825.00,
    valorAtual: 183825.00,
    observacoes: 'Isento de IR - carência de 90 dias',
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2025-01-10')
  },
  {
    id: 'INV003',
    instituicaoFinanceira: 'Tesouro Nacional',
    produto: 'Tesouro Selic 2029',
    tipoInvestimento: TipoInvestimento.TESOURO_DIRETO,
    valorAplicado: 100000,
    dataAplicacao: new Date('2024-07-01'),
    dataVencimento: new Date('2029-03-01'),
    rentabilidadeEsperada: 11.15,
    impostos: 15.0,
    status: 'Ativo',
    rendimentoAtual: 5850.75,
    valorAtual: 105850.75,
    observacoes: 'Liquidez diária - taxa pós-fixada',
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2025-01-10')
  }
];

// Mock Seguros
export const mockSeguros: Seguro[] = [
  {
    id: 'SEG001',
    seguradora: 'Porto Seguro',
    numeroApolice: '12345-678-90',
    tipoSeguro: TipoSeguro.PATRIMONIAL,
    valorSegurado: 2500000,
    premio: 18500,
    periodicidadePagamento: 'Anual',
    dataInicio: new Date('2024-06-01'),
    dataFim: new Date('2025-06-01'),
    status: StatusSeguro.VIGENTE,
    historicoReajustes: [
      {
        id: 'REJ001',
        seguroId: 'SEG001',
        dataReajuste: new Date('2024-06-01'),
        valorAnterior: 16800,
        valorNovo: 18500,
        percentualReajuste: 10.12,
        motivo: 'Reajuste anual - inflação'
      }
    ],
    proximoVencimento: new Date('2025-06-01'),
    apoliceUrl: '/docs/seguros/seg001.pdf',
    observacoes: 'Cobertura: incêndio, roubo, danos elétricos',
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-06-01')
  },
  {
    id: 'SEG002',
    seguradora: 'Allianz Seguros',
    numeroApolice: '98765-432-10',
    tipoSeguro: TipoSeguro.GARANTIA_CONTRATUAL,
    valorSegurado: 500000,
    premio: 12500,
    periodicidadePagamento: 'À Vista',
    dataInicio: new Date('2024-08-01'),
    dataFim: new Date('2026-08-01'),
    status: StatusSeguro.VIGENTE,
    historicoReajustes: [],
    proximoVencimento: new Date('2026-08-01'),
    ressarcimento: {
      aplicavel: true,
      valorEsperado: 12500,
      dataRetorno: new Date('2026-08-01')
    },
    observacoes: 'Garantia para contrato governamental - valor retorna ao fim',
    createdAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'SEG003',
    seguradora: 'Bradesco Seguros',
    numeroApolice: '55555-666-77',
    tipoSeguro: TipoSeguro.VEICULO,
    valorSegurado: 85000,
    premio: 2850,
    periodicidadePagamento: 'Mensal',
    dataInicio: new Date('2024-12-01'),
    dataFim: new Date('2025-12-01'),
    status: StatusSeguro.VIGENTE,
    historicoReajustes: [],
    proximoVencimento: new Date('2025-02-01'),
    observacoes: 'Cobertura completa - veículo da diretoria',
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-12-01')
  }
];

// Mock Consórcios
export const mockConsorcios: Consorcio[] = [
  {
    id: 'CONS001',
    administradora: 'Consórcio Nacional Honda',
    numeroCota: '12345-67',
    bemReferenciado: 'Honda Civic EXL 2024',
    valorBem: 185000,
    prazoTotal: 80,
    numeroParcelas: 80,
    valorParcela: 2850,
    taxaAdministracao: 18.5,
    dataContrato: new Date('2024-03-01'),
    status: StatusConsorcio.ATIVO,
    parcelasPagas: 10,
    historicoReajustes: [
      {
        id: 'REJ_CONS001',
        consorcioId: 'CONS001',
        dataReajuste: new Date('2024-09-01'),
        valorAnterior: 2650,
        valorNovo: 2850,
        percentualReajuste: 7.55
      }
    ],
    contemplacoes: [],
    contratoUrl: '/docs/consorcios/cons001.pdf',
    observacoes: 'Grupo 15 - Cota 67 - Sem contemplação ainda',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2025-01-10')
  },
  {
    id: 'CONS002',
    administradora: 'Porto Seguro Consórcios',
    numeroCota: '98765-43',
    bemReferenciado: 'Imóvel Residencial - R$ 450.000',
    valorBem: 450000,
    prazoTotal: 120,
    numeroParcelas: 120,
    valorParcela: 5250,
    taxaAdministracao: 22.0,
    dataContrato: new Date('2023-06-01'),
    status: StatusConsorcio.CONTEMPLADO,
    parcelasPagas: 20,
    historicoReajustes: [
      {
        id: 'REJ_CONS002',
        consorcioId: 'CONS002',
        dataReajuste: new Date('2024-06-01'),
        valorAnterior: 4850,
        valorNovo: 5250,
        percentualReajuste: 8.25
      }
    ],
    contemplacoes: [
      {
        id: 'CONT001',
        consorcioId: 'CONS002',
        dataContemplacao: new Date('2024-11-15'),
        tipoContemplacao: 'Lance',
        valorLance: 75000,
        valorContemplado: 450000,
        situacao: 'Utilizada'
      }
    ],
    observacoes: 'Contemplado em nov/2024 - Carta de crédito utilizada',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-11-20')
  }
];

// Mock Contas Bancárias
export const mockContasBancarias: ContaBancaria[] = [
  {
    id: 'CB001',
    banco: 'Banco do Brasil',
    agencia: '1234-5',
    conta: '67890-1',
    tipo: 'Corrente',
    saldo: 285000,
    status: StatusConta.ATIVA,
    gerente: 'Carlos Rodrigues',
    telefoneGerente: '(11) 99999-1234',
    observacoes: 'Conta principal para operações',
    integracaoOFX: true,
    ultimaConciliacao: new Date('2025-01-20'),
    createdAt: new Date('2020-01-15'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: 'CB002',
    banco: 'Caixa Econômica Federal',
    agencia: '9876-5',
    conta: '54321-0',
    tipo: 'Poupança',
    saldo: 125000,
    status: StatusConta.ATIVA,
    observacoes: 'Reserva de emergência',
    integracaoOFX: true,
    ultimaConciliacao: new Date('2025-01-18'),
    createdAt: new Date('2020-05-20'),
    updatedAt: new Date('2025-01-18')
  },
  {
    id: 'CB003',
    banco: 'Itaú Unibanco',
    agencia: '5555-5',
    conta: '11111-1',
    tipo: 'Corrente',
    saldo: 95000,
    status: StatusConta.ATIVA,
    gerente: 'Maria Silva',
    telefoneGerente: '(11) 88888-5678',
    observacoes: 'Conta para operações internacionais',
    integracaoOFX: false,
    createdAt: new Date('2021-03-10'),
    updatedAt: new Date('2025-01-15')
  }
];

// Mock Cartões de Crédito
export const mockCartoesCredito: CartaoCredito[] = [
  {
    id: 'CC001',
    banco: 'Banco do Brasil',
    numeroCartao: '**** 1234',
    limite: 50000,
    vencimentoFatura: 15,
    responsavel: 'Carlos Silva - Diretor Financeiro',
    status: 'Ativo',
    observacoes: 'Cartão corporativo principal',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2025-01-10')
  },
  {
    id: 'CC002',
    banco: 'Itaú Unibanco',
    numeroCartao: '**** 5678',
    limite: 25000,
    vencimentoFatura: 10,
    responsavel: 'João Silva - Gerente Comercial',
    status: 'Ativo',
    observacoes: 'Cartão para despesas comerciais',
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2025-01-08')
  },
  {
    id: 'CC003',
    banco: 'Caixa Econômica Federal',
    numeroCartao: '**** 9012',
    limite: 15000,
    vencimentoFatura: 5,
    responsavel: 'Maria Santos - Supervisora',
    status: 'Bloqueado',
    observacoes: 'Bloqueado temporariamente - suspeita de fraude',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2025-01-12')
  }
];

// Mock Movimentações de Caixa
export const mockMovimentacoesCaixa: MovimentacaoCaixa[] = [
  {
    id: 'MOV001',
    tipo: TipoMovimentacao.ENTRADA,
    categoria: 'Receita Operacional',
    descricao: 'Recebimento de vendas - Cliente ABC Ltda',
    valor: 45000,
    dataMovimentacao: new Date('2025-01-20'),
    contaBancaria: 'CB001',
    formaPagamento: 'Transferência',
    numeroDocumento: 'TED-12345',
    responsavel: 'Carlos Silva',
    status: StatusMovimentacao.CONFIRMADO,
    observacoes: 'Pagamento via TED - fatura vencida em 15/01',
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: 'MOV002',
    tipo: TipoMovimentacao.SAIDA,
    categoria: 'Despesa Operacional',
    descricao: 'Pagamento fornecedor - Material escritório',
    valor: 2850,
    dataMovimentacao: new Date('2025-01-22'),
    contaBancaria: 'CB001',
    formaPagamento: 'PIX',
    numeroDocumento: 'PIX-98765',
    responsavel: 'Maria Santos',
    status: StatusMovimentacao.PENDENTE,
    observacoes: 'Aguardando confirmação do fornecedor',
    createdAt: new Date('2025-01-22'),
    updatedAt: new Date('2025-01-22')
  },
  {
    id: 'MOV003',
    tipo: TipoMovimentacao.ENTRADA,
    categoria: 'Financiamento',
    descricao: 'Liberação empréstimo Banco do Brasil',
    valor: 100000,
    dataMovimentacao: new Date('2025-01-18'),
    contaBancaria: 'CB001',
    formaPagamento: 'Transferência',
    numeroDocumento: 'EMP-2025-001',
    responsavel: 'João Silva',
    status: StatusMovimentacao.CONFIRMADO,
    observacoes: 'Segunda liberação do contrato EMP-2024-001',
    createdAt: new Date('2025-01-18'),
    updatedAt: new Date('2025-01-18')
  }
];

// Mock Cheques
export const mockCheques: Cheque[] = [
  {
    id: 'CHQ001',
    banco: 'Banco do Brasil',
    agencia: '1234-5',
    conta: '67890-1',
    numeroCheque: '000001',
    valor: 15000,
    dataEmissao: new Date('2025-01-15'),
    dataVencimento: new Date('2025-01-30'),
    beneficiario: 'Fornecedor XYZ Ltda',
    finalidade: 'Pagamento de mercadorias',
    status: StatusCheque.EMITIDO,
    observacoes: 'Cheque pré-datado conforme acordo',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: 'CHQ002',
    banco: 'Itaú Unibanco',
    agencia: '5555-5',
    conta: '11111-1',
    numeroCheque: '000025',
    valor: 8500,
    dataEmissao: new Date('2025-01-10'),
    dataVencimento: new Date('2025-01-10'),
    beneficiario: 'Serviços Contábeis Silva & Associados',
    finalidade: 'Honorários contábeis - dezembro/2024',
    status: StatusCheque.COMPENSADO,
    dataCompensacao: new Date('2025-01-11'),
    observacoes: 'Compensado no prazo',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-11')
  },
  {
    id: 'CHQ003',
    banco: 'Caixa Econômica Federal',
    agencia: '9876-5',
    conta: '54321-0',
    numeroCheque: '000012',
    valor: 3200,
    dataEmissao: new Date('2025-01-08'),
    dataVencimento: new Date('2025-01-08'),
    beneficiario: 'Posto de Combustível ABC',
    finalidade: 'Abastecimento veículos da empresa',
    status: StatusCheque.DEVOLVIDO,
    motivoDevolucao: 'Insuficiência de fundos',
    observacoes: 'Foi reapresentado e compensado posteriormente',
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-12')
  }
];

// Mock Documentos Importantes
export const mockDocumentosImportantes: DocumentoImportante[] = [
  {
    id: 'DOC001',
    titulo: 'Contrato Social Consolidado',
    categoria: 'Contrato',
    descricao: 'Contrato social da empresa com última consolidação',
    arquivo: '/docs/importantes/contrato-social-2024.pdf',
    versao: '3.1',
    dataDocumento: new Date('2024-06-15'),
    dataUpload: new Date('2024-06-20'),
    responsavelUpload: 'Departamento Jurídico',
    niveisAcesso: ['Diretoria', 'Jurídico'],
    tags: ['contrato social', 'jurídico', 'consolidação'],
    observacoes: 'Versão consolidada após alteração de capital social',
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-06-20')
  },
  {
    id: 'DOC002',
    titulo: 'Certidão Negativa Federal',
    categoria: 'Certidão',
    descricao: 'Certidão negativa de débitos federais',
    arquivo: '/docs/importantes/certidao-federal-2025.pdf',
    versao: '1.0',
    dataDocumento: new Date('2025-01-10'),
    dataUpload: new Date('2025-01-12'),
    dataValidade: new Date('2025-07-10'),
    responsavelUpload: 'Departamento Financeiro',
    niveisAcesso: ['Diretoria', 'Financeiro', 'Contabilidade'],
    tags: ['certidão', 'federal', 'regularidade fiscal'],
    observacoes: 'Válida por 180 dias',
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-12')
  },
  {
    id: 'DOC003',
    titulo: 'Procuração - Representação Bancária',
    categoria: 'Procuração',
    descricao: 'Procuração para representação em bancos',
    arquivo: '/docs/importantes/procuracao-bancaria-2024.pdf',
    versao: '2.0',
    dataDocumento: new Date('2024-11-30'),
    dataUpload: new Date('2024-12-02'),
    dataValidade: new Date('2025-11-30'),
    responsavelUpload: 'Departamento Jurídico',
    niveisAcesso: ['Diretoria', 'Financeiro', 'Jurídico'],
    tags: ['procuração', 'bancária', 'representação legal'],
    observacoes: 'Outorga poderes para Carlos Silva e Maria Santos',
    createdAt: new Date('2024-12-02'),
    updatedAt: new Date('2024-12-02')
  }
];

// Mock Balanços
export const mockBalancos: Balanco[] = [
  {
    id: 'BAL001',
    periodo: 'Dezembro/2024',
    anoExercicio: 2024,
    tipoBalanco: 'Mensal',
    dataRecebimento: new Date('2025-01-15'),
    escritorioContabil: 'Silva & Associados Contabilidade',
    ativo: 2850000,
    passivo: 1650000,
    patrimonio: 1200000,
    receitas: 850000,
    despesas: 650000,
    resultado: 200000,
    arquivo: '/docs/balancos/balanco-dez-2024.pdf',
    status: StatusBalanco.APROVADO,
    observacoes: 'Resultado positivo no encerramento do ano',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-18')
  },
  {
    id: 'BAL002',
    periodo: 'Novembro/2024',
    anoExercicio: 2024,
    tipoBalanco: 'Mensal',
    dataRecebimento: new Date('2024-12-10'),
    escritorioContabil: 'Silva & Associados Contabilidade',
    ativo: 2780000,
    passivo: 1680000,
    patrimonio: 1100000,
    receitas: 780000,
    despesas: 720000,
    resultado: 60000,
    arquivo: '/docs/balancos/balanco-nov-2024.pdf',
    status: StatusBalanco.APROVADO,
    observacoes: 'Margem menor devido a investimentos em equipamentos',
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-12')
  },
  {
    id: 'BAL003',
    periodo: '3º Trimestre/2024',
    anoExercicio: 2024,
    tipoBalanco: 'Trimestral',
    dataRecebimento: new Date('2024-10-20'),
    escritorioContabil: 'Silva & Associados Contabilidade',
    ativo: 2650000,
    passivo: 1580000,
    patrimonio: 1070000,
    receitas: 2150000,
    despesas: 1980000,
    resultado: 170000,
    arquivo: '/docs/balancos/balanco-3tri-2024.pdf',
    status: StatusBalanco.EM_ANALISE,
    observacoes: 'Em análise pela diretoria - questionamentos sobre depreciação',
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-10-25')
  }
];

// Utility functions
export const calcularRendimentoInvestimento = (investimento: Investimento): number => {
  const diasInvestidos = Math.floor((Date.now() - investimento.dataAplicacao.getTime()) / (1000 * 60 * 60 * 24));
  const rendimentoAnual = investimento.valorAplicado * (investimento.rentabilidadeEsperada / 100);
  return (rendimentoAnual / 365) * diasInvestidos;
};

export const calcularJurosEmprestimo = (emprestimo: Emprestimo, dataVencimento: Date): number => {
  const diasVencidos = Math.floor((Date.now() - dataVencimento.getTime()) / (1000 * 60 * 60 * 24));
  if (diasVencidos <= 0) return 0;
  
  const jurosDiarios = (emprestimo.taxaJuros / 100) / 30;
  return emprestimo.saldoDevedor * jurosDiarios * diasVencidos;
};

export const gerarCronogramaEmprestimo = (emprestimo: Emprestimo): ParcelaEmprestimo[] => {
  const parcelas: ParcelaEmprestimo[] = [];
  const valorParcela = emprestimo.valorTotal / 24; // 24 parcelas
  const jurosMensal = emprestimo.taxaJuros / 100 / 12;
  
  for (let i = 1; i <= 24; i++) {
    const dataVencimento = new Date(emprestimo.dataInicio);
    dataVencimento.setMonth(dataVencimento.getMonth() + i);
    
    const valorJuros = emprestimo.saldoDevedor * jurosMensal;
    const valorPrincipal = valorParcela - valorJuros;
    
    parcelas.push({
      id: `PARC_${emprestimo.id}_${i}`,
      emprestimoId: emprestimo.id,
      numerosParcela: i,
      dataVencimento,
      valorPrincipal,
      valorJuros,
      valorTotal: valorParcela,
      status: StatusParcela.PENDENTE
    });
  }
  
  return parcelas;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

export const getProximosVencimentos = (dias: number = 30) => {
  const hoje = new Date();
  const limite = new Date();
  limite.setDate(hoje.getDate() + dias);
  
  const vencimentos = [];
  
  // Adicionar parcelas de empréstimos
  mockParcelasEmprestimo
    .filter(p => p.status === StatusParcela.PENDENTE && p.dataVencimento <= limite)
    .forEach(p => {
      const emprestimo = mockEmprestimos.find(e => e.id === p.emprestimoId);
      vencimentos.push({
        tipo: 'Empréstimo',
        descricao: `${emprestimo?.instituicaoFinanceira} - Parcela ${p.numerosParcela}`,
        valor: p.valorTotal,
        vencimento: p.dataVencimento,
        urgencia: p.dataVencimento < hoje ? 'Vencido' : p.dataVencimento <= new Date(hoje.getTime() + 3*24*60*60*1000) ? 'Urgente' : 'Normal'
      });
    });
    
  // Adicionar seguros próximos ao vencimento
  mockSeguros
    .filter(s => s.status === StatusSeguro.VIGENTE && s.proximoVencimento <= limite)
    .forEach(s => {
      vencimentos.push({
        tipo: 'Seguro',
        descricao: `${s.seguradora} - ${s.tipoSeguro}`,
        valor: s.premio,
        vencimento: s.proximoVencimento,
        urgencia: s.proximoVencimento < hoje ? 'Vencido' : s.proximoVencimento <= new Date(hoje.getTime() + 7*24*60*60*1000) ? 'Urgente' : 'Normal'
      });
    });
  
  return vencimentos.sort((a, b) => a.vencimento.getTime() - b.vencimento.getTime());
};