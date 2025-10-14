import { Comissao, StatusComissao } from '@/types/comissoes';

export const mockComissoes: Comissao[] = [
  {
    id: 'COM-001',
    numeroImportacao: 'DD-2025-001',
    fabricante: 'RADIOMETER MEDICAL ApS',
    formaPagamento: 'Carta de Crédito',
    descricao: 'Equipamentos médicos - Analisadores de gases',
    numeroDI: '25/0123456-7',
    dataDI: '2025-01-15',
    protocoloDI: 'PROT-2025-0001',
    numeroInvoice: 'INV-2025-001',
    valorInvoice: 50000.00,
    dataPagamento: '2025-02-15',
    alertaPagamento: true,
    percentualComissao: 5,
    valorComissao: 2500.00,
    prazoRecebimento: '2025-03-15',
    status: StatusComissao.A_VENCER,
    invoiceServico: {
      numero: 'IS-2025-001',
      data: '2025-01-20',
      empresaEmissora: 'BIOMEDICAL SOLUTIONS LTDA',
      cnpjEmissora: '12.345.678/0001-90',
      enderecoEmissora: 'Av. Paulista, 1000 - São Paulo, SP',
      destinatario: 'RADIOMETER MEDICAL ApS',
      descricaoServico: 'Comissão sobre importação direta de equipamentos médicos',
      valorServico: 2500.00,
      moeda: 'USD'
    },
    faturaRecebimento: {
      numero: 'FR-2025-001',
      data: '2025-02-01',
      beneficiario: 'BIOMEDICAL SOLUTIONS LTDA',
      banco: 'Banco do Brasil',
      agencia: '1234-5',
      conta: '12345-6',
      valorRecebido: 2500.00,
      moeda: 'USD'
    },
    relatorioAgente: {
      nomeAgente: 'BIOMEDICAL SOLUTIONS LTDA',
      periodoInicio: '2025-01-01',
      periodoFim: '2025-01-31',
      totalVendas: 50000.00,
      percentualComissao: 5,
      valorComissaoTotal: 2500.00,
      impostos: 375.00,
      valorLiquido: 2125.00
    },
    nfGerada: false,
    conciliadoBanco: false
  },
  {
    id: 'COM-002',
    numeroImportacao: 'DD-2024-087',
    fabricante: 'ACME MEDICAL INC',
    formaPagamento: 'Transferência Internacional',
    descricao: 'Material cirúrgico descartável',
    numeroDI: '24/0987654-3',
    dataDI: '2024-12-10',
    protocoloDI: 'PROT-2024-0087',
    numeroInvoice: 'INV-2024-087',
    valorInvoice: 32000.00,
    dataPagamento: '2024-12-20',
    percentualComissao: 6,
    valorComissao: 1920.00,
    prazoRecebimento: '2025-01-20',
    status: StatusComissao.PAGO,
    avisoRecebimentoCliente: 'aviso-recebimento-002.pdf',
    swiftFabricaAnexo: 'swift-acme-002.pdf',
    ordemPagamentoAnexo: 'ordem-pagamento-002.pdf',
    swiftCambioAnexo: 'swift-cambio-002.pdf',
    contratoCambioAnexo: 'contrato-cambio-002.pdf',
    detalhamentoRemessaAnexo: 'detalhamento-002.pdf',
    invoiceServico: {
      numero: 'IS-2024-087',
      data: '2024-12-15',
      empresaEmissora: 'BIOMEDICAL SOLUTIONS LTDA',
      cnpjEmissora: '12.345.678/0001-90',
      enderecoEmissora: 'Av. Paulista, 1000 - São Paulo, SP',
      destinatario: 'ACME MEDICAL INC',
      descricaoServico: 'Comissão sobre importação direta de material cirúrgico',
      valorServico: 1920.00,
      moeda: 'USD'
    },
    faturaRecebimento: {
      numero: 'FR-2024-087',
      data: '2024-12-22',
      beneficiario: 'BIOMEDICAL SOLUTIONS LTDA',
      banco: 'Banco do Brasil',
      agencia: '1234-5',
      conta: '12345-6',
      valorRecebido: 1920.00,
      moeda: 'USD'
    },
    relatorioAgente: {
      nomeAgente: 'BIOMEDICAL SOLUTIONS LTDA',
      periodoInicio: '2024-12-01',
      periodoFim: '2024-12-31',
      totalVendas: 32000.00,
      percentualComissao: 6,
      valorComissaoTotal: 1920.00,
      impostos: 288.00,
      valorLiquido: 1632.00
    },
    nfGerada: true,
    numeroNF: 'NF-2025-0045',
    dataNF: '2025-01-05',
    conciliadoBanco: true,
    dataConciliacao: '2025-01-10'
  }
];

export const defaultInvoiceServico = {
  numero: '',
  data: new Date().toISOString().split('T')[0],
  empresaEmissora: 'BIOMEDICAL SOLUTIONS LTDA',
  cnpjEmissora: '12.345.678/0001-90',
  enderecoEmissora: 'Av. Paulista, 1000 - São Paulo, SP',
  destinatario: '',
  descricaoServico: 'Comissão sobre importação direta',
  valorServico: 0,
  moeda: 'USD'
};

export const defaultFaturaRecebimento = {
  numero: '',
  data: new Date().toISOString().split('T')[0],
  beneficiario: 'BIOMEDICAL SOLUTIONS LTDA',
  banco: 'Banco do Brasil',
  agencia: '1234-5',
  conta: '12345-6',
  valorRecebido: 0,
  moeda: 'USD'
};
