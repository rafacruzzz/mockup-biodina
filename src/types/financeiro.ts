// Tipos para o módulo Financeiro - Sistema de Contas a Pagar

// Interface unificada para pedidos vindos do comercial
export interface PedidoFinanceiro {
  id: string;
  numeroPedido: string;
  origem: 'licitacao' | 'contratacao_direta' | 'importacao_direta';
  cliente: string;
  vendedor: string;
  valor: number;
  dataVenda: string;
  dataPrevistaPagamento: string;
  status: 'pendente_aprovacao' | 'aprovado' | 'em_pagamento' | 'pago' | 'atrasado';
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  descricao: string;
  observacoes?: string;
  numeroOportunidade?: string;
  numeroLicitacao?: string;
  tipoContrato?: string;
  responsavelComercial: string;
  documentos: string[];
  historico: HistoricoPedido[];
  createdAt: string;
  updatedAt: string;
  
  // Dados jurídicos herdados da licitação
  empresaContratanteId?: string;
  empresaContratanteNome?: string;
  empresaContratanteCNPJ?: string;
  origemLicitacao?: {
    id: number;
    numeroPregao: string;
    dataAprovacao?: string;
    aprovadoPor?: string;
    observacaoAprovacao?: string;
  };
  aditivos?: AditivoContratualFinanceiro[];
}

// Interface para aditivos contratuais no financeiro
export interface AditivoContratualFinanceiro {
  id: string;
  tipo: 'alteracao_cnpj' | 'aditivo_valor' | 'aditivo_prazo' | 'outros';
  dataRegistro: string;
  cnpjAnterior?: string;
  cnpjNovo?: string;
  empresaAnteriorNome?: string;
  empresaNovoNome?: string;
  justificativa: string;
  documentoUrl: string;
  validadoPor: string;
  validadoEm: string;
}

export interface HistoricoPedido {
  id: string;
  pedidoId: string;
  data: string;
  acao: string;
  observacao?: string;
  usuario: string;
}

export interface Requisicao {
  id: string;
  numeroRequisicao: string;
  dataCreacao: Date;
  dataVencimento: Date;
  valor: number;
  status: StatusRequisicao;
  tipo: TipoRequisicao;
  vinculacao: VinculacaoRequisicao;
  solicitante: Colaborador;
  setor: string;
  departamento?: string;
  projeto?: Projeto;
  cliente?: Cliente;
  descricao: string;
  observacoes?: string;
  fornecedor?: Fornecedor;
  
  // Fluxo de aprovação
  aprovacoes: Aprovacao[];
  statusAprovacao: StatusAprovacao;
  
  // Documentos
  documentos: DocumentoAnexo[];
  documentosCompletos: boolean;
  
  // Pagamentos recorrentes
  recorrente: boolean;
  periodicidade?: Periodicidade;
  proximoVencimento?: Date;
  
  // Suprimentos específicos
  cotacoes?: Cotacao[];
  fornecedorEscolhido?: Fornecedor;
  valorAprovado?: number;
  justificativaCotacao?: string;
  
  // Auditoria
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface Aprovacao {
  id: string;
  requisicaoId: string;
  nivel: NivelAprovacao;
  aprovador: Colaborador;
  status: StatusAprovacao;
  comentario?: string;
  dataAprovacao?: Date;
  ordem: number;
}

export interface DocumentoAnexo {
  id: string;
  requisicaoId: string;
  tipo: TipoDocumento;
  nome: string;
  url: string;
  tamanho: number;
  mimeType: string;
  obrigatorio: boolean;
  dataUpload: Date;
  uploadedBy: string;
}

export interface Cotacao {
  id: string;
  fornecedor: Fornecedor;
  valor: number;
  prazoEntrega: number;
  condicoesPagamento: string;
  observacoes?: string;
  anexo?: string;
  dataValidade: Date;
}

export interface Fornecedor {
  id: string;
  nome: string;
  cnpj?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  endereco?: Endereco;
  dadosBancarios?: DadosBancarios;
}

export interface Colaborador {
  id: string;
  nome: string;
  email: string;
  setor: string;
  cargo: string;
  nivel: number;
}

export interface Projeto {
  id: string;
  nome: string;
  cliente: Cliente;
  status: string;
  valor?: number;
}

export interface Cliente {
  id: string;
  nome: string;
  cnpj?: string;
  email?: string;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface DadosBancarios {
  banco: string;
  agencia: string;
  conta: string;
  tipoConta: string;
  pix?: string;
}

export interface ContaRecorrente {
  id: string;
  nome: string;
  fornecedor: Fornecedor;
  valor: number;
  periodicidade: Periodicidade;
  diaVencimento: number;
  ativa: boolean;
  categoria: CategoriaContaRecorrente;
  centroCusto?: string;
  observacoes?: string;
  proximoVencimento: Date;
  ultimoPagamento?: Date;
}

export interface CalendarioItem {
  data: Date;
  contas: ContaCalendario[];
  totalValor: number;
}

export interface ContaCalendario {
  id: string;
  tipo: 'requisicao' | 'recorrente';
  nome: string;
  fornecedor: string;
  valor: number;
  status: StatusRequisicao;
  urgencia: UrgenciaVencimento;
}

// Enums
export enum StatusRequisicao {
  RASCUNHO = 'rascunho',
  AGUARDANDO_APROVACAO_SETOR = 'aguardando_aprovacao_setor', 
  AGUARDANDO_APROVACAO_FINANCEIRO = 'aguardando_aprovacao_financeiro',
  APROVADA = 'aprovada',
  REJEITADA = 'rejeitada',
  PAGAMENTO_PROGRAMADO = 'pagamento_programado',
  PAGA = 'paga',
  CANCELADA = 'cancelada'
}

export enum TipoRequisicao {
  SUPRIMENTOS = 'suprimentos',
  PASSAGEM = 'passagem',
  HOSPEDAGEM = 'hospedagem',
  SERVICOS = 'servicos',
  COMBUSTIVEL = 'combustivel',
  MANUTENCAO = 'manutencao',
  MARKETING = 'marketing',
  JURIDICO = 'juridico',
  OUTROS = 'outros'
}

export enum VinculacaoRequisicao {
  PROJETO_CLIENTE = 'projeto_cliente',
  CENTRO_CUSTO_INTERNO = 'centro_custo_interno'
}

export enum StatusAprovacao {
  PENDENTE = 'pendente',
  APROVADA = 'aprovada', 
  REJEITADA = 'rejeitada'
}

export enum NivelAprovacao {
  GESTOR_SETOR = 'gestor_setor',
  GESTOR_FINANCEIRO = 'gestor_financeiro'
}

export enum TipoDocumento {
  EMAIL_PEDIDO = 'email_pedido',
  REQUISICAO_FORMAL = 'requisicao_formal',
  NOTA_FISCAL = 'nota_fiscal',
  BOLETO_DUPLICATA = 'boleto_duplicata',
  COMPROVANTE_PAGAMENTO = 'comprovante_pagamento',
  COTACAO = 'cotacao',
  OUTROS = 'outros'
}

export enum Periodicidade {
  MENSAL = 'mensal',
  BIMESTRAL = 'bimestral',
  TRIMESTRAL = 'trimestral',
  SEMESTRAL = 'semestral',
  ANUAL = 'anual'
}

export enum CategoriaContaRecorrente {
  AGUA = 'agua',
  LUZ = 'luz',
  TELEFONIA = 'telefonia',
  INTERNET = 'internet',
  ALUGUEL = 'aluguel',
  CONDOMINIO = 'condominio',
  SEGUROS = 'seguros',
  SOFTWARE = 'software',
  OUTROS = 'outros'
}

export enum UrgenciaVencimento {
  NORMAL = 'normal',
  PROXIMO = 'proximo', // 3 dias ou menos
  VENCIDO = 'vencido',
  CRITICA = 'critica' // mais de 5 dias vencido
}

// Tipos para filtros e relatórios
export interface FiltrosRequisicao {
  status?: StatusRequisicao[];
  tipo?: TipoRequisicao[];
  vinculacao?: VinculacaoRequisicao[];
  dataInicio?: Date;
  dataFim?: Date;
  valorMin?: number;
  valorMax?: number;
  setor?: string[];
  projeto?: string[];
  fornecedor?: string[];
}

export interface ResumoFinanceiro {
  totalPendente: number;
  totalVencido: number;
  totalMes: number;
  quantidadePendente: number;
  quantidadeVencida: number;
  mediaValor: number;
}

// Constantes
export const DOCUMENTOS_OBRIGATORIOS: Record<TipoRequisicao, TipoDocumento[]> = {
  [TipoRequisicao.SUPRIMENTOS]: [
    TipoDocumento.EMAIL_PEDIDO,
    TipoDocumento.REQUISICAO_FORMAL,
    TipoDocumento.COTACAO
  ],
  [TipoRequisicao.PASSAGEM]: [
    TipoDocumento.EMAIL_PEDIDO,
    TipoDocumento.REQUISICAO_FORMAL
  ],
  [TipoRequisicao.HOSPEDAGEM]: [
    TipoDocumento.EMAIL_PEDIDO,
    TipoDocumento.REQUISICAO_FORMAL
  ],
  [TipoRequisicao.SERVICOS]: [
    TipoDocumento.EMAIL_PEDIDO,
    TipoDocumento.REQUISICAO_FORMAL,
    TipoDocumento.NOTA_FISCAL
  ],
  [TipoRequisicao.COMBUSTIVEL]: [
    TipoDocumento.REQUISICAO_FORMAL,
    TipoDocumento.NOTA_FISCAL
  ],
  [TipoRequisicao.MANUTENCAO]: [
    TipoDocumento.EMAIL_PEDIDO,
    TipoDocumento.REQUISICAO_FORMAL,
    TipoDocumento.NOTA_FISCAL
  ],
  [TipoRequisicao.MARKETING]: [
    TipoDocumento.EMAIL_PEDIDO,
    TipoDocumento.REQUISICAO_FORMAL
  ],
  [TipoRequisicao.JURIDICO]: [
    TipoDocumento.EMAIL_PEDIDO,
    TipoDocumento.REQUISICAO_FORMAL
  ],
  [TipoRequisicao.OUTROS]: [
    TipoDocumento.EMAIL_PEDIDO,
    TipoDocumento.REQUISICAO_FORMAL
  ]
};

export const STATUS_COLORS: Record<StatusRequisicao, string> = {
  [StatusRequisicao.RASCUNHO]: 'bg-gray-500',
  [StatusRequisicao.AGUARDANDO_APROVACAO_SETOR]: 'bg-yellow-500',
  [StatusRequisicao.AGUARDANDO_APROVACAO_FINANCEIRO]: 'bg-orange-500',
  [StatusRequisicao.APROVADA]: 'bg-blue-500',
  [StatusRequisicao.REJEITADA]: 'bg-red-500',
  [StatusRequisicao.PAGAMENTO_PROGRAMADO]: 'bg-purple-500',
  [StatusRequisicao.PAGA]: 'bg-green-500',
  [StatusRequisicao.CANCELADA]: 'bg-gray-700'
};

export const URGENCIA_COLORS: Record<UrgenciaVencimento, string> = {
  [UrgenciaVencimento.NORMAL]: 'bg-green-100 text-green-800',
  [UrgenciaVencimento.PROXIMO]: 'bg-yellow-100 text-yellow-800',
  [UrgenciaVencimento.VENCIDO]: 'bg-red-100 text-red-800',
  [UrgenciaVencimento.CRITICA]: 'bg-red-600 text-white'
};

// Simplified ContaPagar interface for the modals
export interface ContaPagar {
  id: string;
  numero: string;
  tipo: TipoRequisicaoSimples;
  departamentoSolicitante: string;
  vincularA: 'projeto' | 'departamento';
  projetoCliente?: string;
  departamento?: string;
  fornecedor: string;
  descricao: string;
  valor: number;
  dataVencimento: Date;
  formaPagamentoSugerida: FormaPagamento;
  status: StatusConta;
  anexos?: string[];
  dataPagamento?: Date;
  contaBancariaSaida?: string;
  comprovantePagamento?: string;
  createdAt: Date;
}

// Simplified enums for the new modals
export enum TipoRequisicaoSimples {
  PAGAMENTO = 'pagamento',
  COMPRA = 'compra',
  HOSPEDAGEM = 'hospedagem',
  PASSAGEM = 'passagem',
  OUTROS = 'outros'
}

export enum StatusConta {
  PROGRAMADO = 'programado',
  PENDENTE = 'pendente',
  VENCIDO = 'vencido',
  PAGO = 'pago'
}

export enum FormaPagamento {
  BOLETO = 'boleto',
  PIX = 'pix',
  DEBITO_AUTOMATICO = 'debito_automatico',
  CARTAO_CREDITO = 'cartao_credito',
  OUTROS = 'outros'
}

// Enhanced ContaRecorrente with missing fields
export interface ContaRecorrenteEnhanced extends Omit<ContaRecorrente, 'fornecedor'> {
  fornecedor: string;
  dataPrimeiroVencimento: Date;
  formaPagamento: FormaPagamento;
  anexos?: string[];
  status: StatusConta;
}

// Interface para alíquotas por estado
export interface AliquotaEstado {
  estado: string;
  aliquotaInterestadual: string;
  aliquotaICMSInterna: string;
  aliquotaFundoCombate: string;
  isEditing: boolean;
}