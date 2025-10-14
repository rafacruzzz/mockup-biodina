export enum StatusComissao {
  EM_NEGOCIACAO = 'Em negociação',
  PRESCRITO = 'Prescrito',
  PERDIDO = 'Perdido',
  JURIDICO = 'Jurídico',
  VENCIDO = 'Vencido',
  A_VENCER = 'a Vencer',
  PAGO = 'Pago',
  CANCELADA = 'Cancelada'
}

export interface ItemInvoice {
  id: string;
  item: string;
  qty: number;
  code: string;
  description: string;
  unitPrice: number;
  totalPrice: number;
}

export interface DadosBancarioInvoice {
  bancoId: string;
  bancoNome: string;
  address: string;
  zipCode: string;
  agencia: string;
  accountNumber: string;
  swift: string;
  iban: string;
}

export interface InvoiceServico {
  numero: string;
  data: string;
  
  // Cabeçalho
  invoiceTo: string;
  
  // PAGE / SALES REPRES
  page: string;
  preparedBy: string;
  phoneNumber: string;
  email: string;
  
  // CONTACT PERSON
  contactPersonName: string;
  contactPersonEmail: string;
  
  // Itens de serviço
  items: ItemInvoice[];
  
  // Total
  totalInvoice: number;
  moeda: string;
  
  // Dados bancários
  paymentTerms: string;
  dadosBancarios: DadosBancarioInvoice;
  
  // Rodapé editável
  rodape: string;
}

export interface FaturaRecebimento {
  numero: string;
  data: string;
  beneficiario: string;
  banco: string;
  agencia: string;
  conta: string;
  valorRecebido: number;
  moeda: string;
}

export interface RelatorioAgente {
  nomeAgente: string;
  periodoInicio: string;
  periodoFim: string;
  totalVendas: number;
  percentualComissao: number;
  valorComissaoTotal: number;
  impostos: number;
  valorLiquido: number;
}

export interface Comissao {
  id: string;
  numeroImportacao: string;
  
  // COBRANÇA AO CLIENTE
  fabricante: string;
  formaPagamento: string;
  descricao: string;
  numeroDI: string;
  dataDI: string;
  protocoloDI: string;
  numeroInvoice: string;
  valorInvoice: number;
  dataPagamento: string;
  alertaPagamento?: boolean;
  
  // IDENTIFICAÇÃO DA COMISSÃO DEVIDA
  avisoRecebimentoCliente?: string;
  percentualComissao: number;
  valorComissao: number;
  prazoRecebimento: string;
  status: StatusComissao;
  
  // DOCUMENTAÇÃO
  swiftFabricaAnexo?: string;
  ordemPagamentoAnexo?: string;
  
  // FECHAMENTO CÂMBIO
  swiftCambioAnexo?: string;
  contratoCambioAnexo?: string;
  detalhamentoRemessaAnexo?: string;
  
  // INVOICE DE SERVIÇO (dados extraídos/editáveis)
  invoiceServico: InvoiceServico;
  
  // FATURA DE RECEBIMENTO (dados extraídos/editáveis)
  faturaRecebimento: FaturaRecebimento;
  
  // RELATÓRIO COMISSÃO DE AGENTE (extraído dos documentos)
  relatorioAgente: RelatorioAgente;
  
  // INTEGRAÇÃO COM FATURAMENTO
  nfGerada?: boolean;
  numeroNF?: string;
  dataNF?: string;
  
  // CONCILIAÇÃO BANCÁRIA
  conciliadoBanco?: boolean;
  dataConciliacao?: string;
}
