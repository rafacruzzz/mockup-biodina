export enum TipoRequisicao {
  SUPRIMENTOS = 'suprimentos',
  PASSAGENS = 'passagens',
  HOSPEDAGEM = 'hospedagem',
  RECORRENTE = 'recorrente',
  OUTROS = 'outros'
}

export enum StatusRequisicao {
  RASCUNHO = 'rascunho',
  AGUARDANDO_GESTOR = 'aguardando_gestor',
  AGUARDANDO_FINANCEIRO = 'aguardando_financeiro',
  APROVADA = 'aprovada',
  PAGA = 'paga',
  CONCILIADA = 'conciliada',
  REJEITADA = 'rejeitada'
}

export enum TipoVinculacao {
  PROJETO_CLIENTE = 'projeto_cliente',
  DEPARTAMENTO = 'departamento'
}

export enum TipoDocumento {
  EMAIL = 'email',
  REQUISICAO = 'requisicao',
  NOTA_FISCAL = 'nota_fiscal',
  BOLETO = 'boleto',
  COMPROVANTE = 'comprovante'
}

export interface Cotacao {
  id: string;
  fornecedor: string;
  valor: number;
  prazo: string;
  observacoes?: string;
  arquivo?: File;
}

export interface Documento {
  id: string;
  tipo: TipoDocumento;
  nome: string;
  arquivo?: File;
  dataUpload: Date;
  obrigatorio: boolean;
}

export interface RequisicaoPagamento {
  id: string;
  tipo: TipoRequisicao;
  tipoVinculacao: TipoVinculacao;
  projetoClienteId?: string;
  departamentoId?: string;
  solicitante: string;
  gestorAprovador?: string;
  gestorFinanceiroAprovador?: string;
  
  // Dados básicos
  descricao: string;
  valor: number;
  valorAprovado?: number;
  vencimento: Date;
  
  // Dados específicos por tipo
  cotacoes?: Cotacao[];
  fornecedorEscolhido?: string;
  destino?: string; // Para passagens/hospedagem
  periodo?: { inicio: Date; fim: Date };
  justificativa?: string;
  
  // Controle de status
  status: StatusRequisicao;
  dataRequisicao: Date;
  dataAprovacaoGestor?: Date;
  dataAprovacaoFinanceiro?: Date;
  dataPagamento?: Date;
  dataConciliacao?: Date;
  
  // Documentos
  documentos: Documento[];
  
  // Comentários e observações
  comentarios?: string;
  motivoRejeicao?: string;
  
  // Recorrente
  recorrencia?: {
    frequencia: 'mensal' | 'bimestral' | 'trimestral' | 'semestral' | 'anual';
    diaVencimento: number;
    proximoVencimento: Date;
  };
}

export interface PagamentoRecorrente {
  id: string;
  nome: string;
  tipo: 'agua' | 'luz' | 'aluguel' | 'telefonia' | 'internet' | 'outros';
  fornecedor: string;
  valor: number;
  diaVencimento: number;
  departamentoId: string;
  ativo: boolean;
  dataInicio: Date;
  dataFim?: Date;
  observacoes?: string;
}

export interface Dashboard {
  totalPendente: number;
  totalVencidas: number;
  totalConciliadas: number;
  documentacaoIncompleta: number;
  requisicoesPorStatus: Record<StatusRequisicao, number>;
  gastosPorDepartamento: Array<{ departamento: string; valor: number }>;
  gastosPorTipo: Array<{ tipo: TipoRequisicao; valor: number }>;
}