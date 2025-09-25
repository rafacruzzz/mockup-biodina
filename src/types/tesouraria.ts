// Types and interfaces for the Treasury module

export interface Emprestimo {
  id: string;
  codigo: string;
  instituicaoFinanceira: string;
  valorTotal: number;
  indexador: 'CDI' | 'SELIC' | 'IPCA' | 'FIXO' | 'TJLP';
  taxaJuros: number;
  multaAtraso?: number;
  garantia?: string;
  dataInicio: Date;
  dataFim: Date;
  status: 'Ativo' | 'Quitado' | 'Em Atraso' | 'Cancelado';
  cronograma: ParcelaEmprestimo[];
  saldoDevedor: number;
  contratoUrl?: string;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParcelaEmprestimo {
  id: string;
  emprestimoId: string;
  numerosParcela: number;
  dataVencimento: Date;
  valorPrincipal: number;
  valorJuros: number;
  valorTotal: number;
  status: 'Pendente' | 'Pago' | 'Vencido';
  dataPagamento?: Date;
  valorPago?: number;
}

export interface Investimento {
  id: string;
  instituicaoFinanceira: string;
  produto: string;
  tipoInvestimento: 'CDB' | 'LCI' | 'LCA' | 'Tesouro Direto' | 'Fundo DI' | 'Poupança' | 'Outros';
  valorAplicado: number;
  dataAplicacao: Date;
  dataVencimento?: Date;
  rentabilidadeEsperada: number;
  impostos?: number;
  status: 'Ativo' | 'Resgatado' | 'Vencido';
  rendimentoAtual: number;
  valorAtual: number;
  comprovanteUrl?: string;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Seguro {
  id: string;
  seguradora: string;
  numeroApolice: string;
  tipoSeguro: 'Patrimonial' | 'Veículo' | 'Vida' | 'Garantia Contratual' | 'Responsabilidade Civil' | 'Outros';
  valorSegurado: number;
  premio: number;
  periodicidadePagamento: 'Mensal' | 'Trimestral' | 'Semestral' | 'Anual' | 'À Vista';
  dataInicio: Date;
  dataFim: Date;
  status: 'Vigente' | 'Vencido' | 'Cancelado' | 'Sinistro';
  historicoReajustes: ReajusteSeguro[];
  proximoVencimento: Date;
  ressarcimento?: {
    aplicavel: boolean;
    valorEsperado?: number;
    dataRetorno?: Date;
  };
  apoliceUrl?: string;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReajusteSeguro {
  id: string;
  seguroId: string;
  dataReajuste: Date;
  valorAnterior: number;
  valorNovo: number;
  percentualReajuste: number;
  motivo: string;
}

export interface Consorcio {
  id: string;
  administradora: string;
  numeroCota: string;
  bemReferenciado: string;
  valorBem: number;
  prazoTotal: number;
  numeroParcelas: number;
  valorParcela: number;
  taxaAdministracao: number;
  dataContrato: Date;
  status: 'Ativo' | 'Contemplado' | 'Quitado' | 'Cancelado';
  parcelasPagas: number;
  historicoReajustes: ReajusteConsorcio[];
  contemplacoes: ContemplacaoConsorcio[];
  contratoUrl?: string;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReajusteConsorcio {
  id: string;
  consorcioId: string;
  dataReajuste: Date;
  valorAnterior: number;
  valorNovo: number;
  percentualReajuste: number;
}

export interface ContemplacaoConsorcio {
  id: string;
  consorcioId: string;
  dataContemplacao: Date;
  tipoContemplacao: 'Sorteio' | 'Lance';
  valorLance?: number;
  valorContemplado: number;
  situacao: 'Pendente' | 'Utilizada' | 'Expirada';
}

export interface ContaBancaria {
  id: string;
  banco: string;
  agencia: string;
  conta: string;
  tipo: 'Corrente' | 'Poupança' | 'Aplicação';
  saldo: number;
  status: 'Ativa' | 'Inativa' | 'Bloqueada';
  gerente?: string;
  telefoneGerente?: string;
  observacoes?: string;
  integracaoOFX: boolean;
  ultimaConciliacao?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartaoCredito {
  id: string;
  banco: string;
  numeroCartao: string; // últimos 4 dígitos
  limite: number;
  vencimentoFatura: number; // dia do mês
  responsavel: string;
  status: 'Ativo' | 'Bloqueado' | 'Cancelado';
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Enums
export enum StatusEmprestimo {
  ATIVO = 'Ativo',
  QUITADO = 'Quitado',
  EM_ATRASO = 'Em Atraso',
  CANCELADO = 'Cancelado'
}

export enum StatusParcela {
  PENDENTE = 'Pendente',
  PAGO = 'Pago',
  VENCIDO = 'Vencido'
}

export enum TipoInvestimento {
  CDB = 'CDB',
  LCI = 'LCI',
  LCA = 'LCA',
  TESOURO_DIRETO = 'Tesouro Direto',
  FUNDO_DI = 'Fundo DI',
  POUPANCA = 'Poupança',
  OUTROS = 'Outros'
}

export enum TipoSeguro {
  PATRIMONIAL = 'Patrimonial',
  VEICULO = 'Veículo',
  VIDA = 'Vida',
  GARANTIA_CONTRATUAL = 'Garantia Contratual',
  RESPONSABILIDADE_CIVIL = 'Responsabilidade Civil',
  OUTROS = 'Outros'
}

export enum StatusSeguro {
  VIGENTE = 'Vigente',
  VENCIDO = 'Vencido',
  CANCELADO = 'Cancelado',
  SINISTRO = 'Sinistro'
}

export enum StatusConsorcio {
  ATIVO = 'Ativo',
  CONTEMPLADO = 'Contemplado',
  QUITADO = 'Quitado',
  CANCELADO = 'Cancelado'
}

export enum StatusConta {
  ATIVA = 'Ativa',
  INATIVA = 'Inativa',
  BLOQUEADA = 'Bloqueada'
}

// Constants for colors
export const STATUS_COLORS_TESOURARIA = {
  // Empréstimos
  'Ativo': 'bg-blue-500',
  'Quitado': 'bg-green-500', 
  'Em Atraso': 'bg-red-500',
  'Cancelado': 'bg-gray-500',
  
  // Parcelas
  'Pendente': 'bg-yellow-500',
  'Pago': 'bg-green-500',
  'Vencido': 'bg-red-500',
  
  // Seguros
  'Vigente': 'bg-green-500',
  'Vencido_Seguro': 'bg-red-500',
  'Cancelado_Seguro': 'bg-gray-500',
  'Sinistro': 'bg-orange-500',
  
  // Consórcios
  'Ativo_Consorcio': 'bg-blue-500',
  'Contemplado': 'bg-green-500',
  'Quitado_Consorcio': 'bg-gray-500',
  'Cancelado_Consorcio': 'bg-red-500',
  
  // Contas
  'Ativa': 'bg-green-500',
  'Inativa': 'bg-gray-500',
  'Bloqueada': 'bg-red-500'
};