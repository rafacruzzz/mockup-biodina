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
      invoiceTo: 'RADIOMETER MEDICAL ApS',
      page: '1/1',
      preparedBy: 'BIOMEDICAL SOLUTIONS LTDA',
      phoneNumber: '55 (21) 2719-2419',
      email: 'contato@biomedicalsolutions.com.br',
      contactPersonName: 'John Smith',
      contactPersonEmail: 'john.smith@radiometer.com',
      items: [
        {
          id: '1',
          item: '1',
          qty: 1,
          code: 'COM',
          description: 'Commission on direct importation of medical equipment',
          unitPrice: 2500.00,
          totalPrice: 2500.00
        }
      ],
      totalInvoice: 2500.00,
      moeda: 'USD',
      paymentTerms: 'Carta de Crédito',
      dadosBancarios: {
        bancoId: 'CB001',
        bancoNome: 'Banco do Brasil',
        address: 'SBS Quadra 1, Bloco A, Brasília - DF',
        zipCode: '70070-010',
        agencia: '1234-5',
        accountNumber: '12345-6',
        swift: 'BRASBRRJXXX',
        iban: 'BR1234567890123456789012345'
      },
      rodape: 'RUA SAO PEDRO, 154 SALA 409 - CENTRO, Niteroi - RJ/ Brasil - ZIP CODE: 24020-058\nPhone: 55 (21) 2719-2419'
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
      invoiceTo: 'ACME MEDICAL INC',
      page: '1/1',
      preparedBy: 'BIOMEDICAL SOLUTIONS LTDA',
      phoneNumber: '55 (21) 2719-2419',
      email: 'contato@biomedicalsolutions.com.br',
      contactPersonName: 'Mary Johnson',
      contactPersonEmail: 'mary.johnson@acmemedical.com',
      items: [
        {
          id: '1',
          item: '1',
          qty: 1,
          code: 'COM',
          description: 'Commission on direct importation of surgical materials',
          unitPrice: 1920.00,
          totalPrice: 1920.00
        }
      ],
      totalInvoice: 1920.00,
      moeda: 'USD',
      paymentTerms: 'Transferência Internacional',
      dadosBancarios: {
        bancoId: 'CB003',
        bancoNome: 'Itaú',
        address: 'Praça Alfredo Egydio de Souza Aranha, 100 - São Paulo, SP',
        zipCode: '04344-902',
        agencia: '5678-9',
        accountNumber: '98765-4',
        swift: 'ITAUBRSPXXX',
        iban: 'BR5555555555555555555555555'
      },
      rodape: 'RUA SAO PEDRO, 154 SALA 409 - CENTRO, Niteroi - RJ/ Brasil - ZIP CODE: 24020-058\nPhone: 55 (21) 2719-2419'
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
  invoiceTo: 'Radiometer Medical ApS\nAkandevej 21 - DK-2700 -\nBronshoj - Denmark',
  page: '1/1',
  preparedBy: 'Thaís Tolentino',
  phoneNumber: '55 21 2435-9806',
  email: 'thais.tolentino@biodina.com.br',
  contactPersonName: 'Andre Borges',
  contactPersonEmail: 'andre.borges-hansen@radiometer.dk',
  items: [
    {
      id: '1',
      item: '1',
      qty: 1,
      code: 'COM',
      description: 'Commission on direct importation',
      unitPrice: 0,
      totalPrice: 0
    }
  ],
  totalInvoice: 0,
  moeda: 'USD',
  paymentTerms: '',
  dadosBancarios: {
    bancoId: '',
    bancoNome: '',
    address: '',
    zipCode: '',
    agencia: '',
    accountNumber: '',
    swift: '',
    iban: ''
  },
  rodape: 'RUA SAO PEDRO, 154 SALA 409 - CENTRO, Niteroi - RJ/ Brasil - ZIP CODE: 24020-058\nPhone: 55 (21) 2719-2419'
};

export const mockDadosBancariosInternacionais: Record<string, { address: string; zipCode: string; swift: string; iban: string }> = {
  'CB001': {
    address: 'SBS Quadra 1, Bloco A, Brasília - DF',
    zipCode: '70070-010',
    swift: 'BRASBRRJXXX',
    iban: 'BR1234567890123456789012345'
  },
  'CB002': {
    address: 'SBS Quadra 4, Lote 3/4, Brasília - DF',
    zipCode: '70092-900',
    swift: 'CEFXBRSPCOR',
    iban: 'BR9876543210987654321098765'
  },
  'CB003': {
    address: 'Praça Alfredo Egydio de Souza Aranha, 100 - São Paulo, SP',
    zipCode: '04344-902',
    swift: 'ITAUBRSPXXX',
    iban: 'BR5555555555555555555555555'
  }
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
