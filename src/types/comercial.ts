export interface ProdutoPedido {
  id: number;
  codigo: string;
  descricao: string;
  quantidade: number;
  unidade: UnidadeVenda;
  precoUnitario: number;
  desconto: number;
  precoFinal: number;
  observacoes?: string;
  estoqueDisponivel: EstoqueVendivel;
  validadeMinima?: string;
  descritivoNF?: string;
}

export interface EstoqueVendivel {
  totalDisponivel: number;
  totalReservado: number;
  estoquesPorCnpj: EstoquePorCnpj[];
  lotes: LoteEstoque[];
  tiposEstoque: TipoEstoqueInfo[];
  reservasAtivas: ReservaAtiva[];
  historicoVendas: HistoricoVenda[];
  precoSugerido: number;
  alertas: AlertaEstoque[];
  localizacaoFisica: string;
  exigeNumeroSerie: boolean;
  unidadesDisponiveis: UnidadeDisponivel[];
}

export interface EstoquePorCnpj {
  cnpj: string;
  nomeEmpresa: string;
  quantidade: number;
}

export interface LoteEstoque {
  lote: string;
  quantidade: number;
  dataValidade: string | null;
  diasParaVencimento?: number;
  alertaValidade: boolean;
}

export interface TipoEstoqueInfo {
  tipo: 'Nacional' | 'Importação Direta' | 'Consignado';
  quantidade: number;
}

export interface ReservaAtiva {
  pedidoId: string;
  quantidade: number;
  dataReserva: string;
}

export interface HistoricoVenda {
  data: string;
  cliente: string;
  quantidade: number;
  precoVenda: number;
}

export interface AlertaEstoque {
  tipo: 'validade_proxima' | 'multiplos_lotes' | 'estoque_baixo' | 'numero_serie' | 'transferencia_disponivel';
  mensagem: string;
  severidade: 'baixa' | 'media' | 'alta';
}

export interface UnidadeDisponivel {
  unidade: UnidadeVenda;
  quantidade: number;
  fatorConversao: number;
}

export enum UnidadeVenda {
  UNIDADE = 'unidade',
  CAIXA = 'caixa',
  FRASCO = 'frasco',
  KIT = 'kit'
}

export interface ItemUsoConsumoPedido {
  id: number;
  itemId: string;
  codigo: string;
  descricao: string;
  quantidade: number;
  unidade: string;
  observacoes: string;
  categoria: string;
}

export interface PedidoCompleto {
  id: number;
  numeroOportunidade: string;
  projetoOrigem?: string;
  cliente: string;
  vendedor: string;
  dataVenda: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'cancelado';
  produtos: ProdutoPedido[];
  valorTotal: number;
  observacoesGerais?: string;
  informacoesComplementares?: string;
  condicoesPagamento?: string;
  valorFrete?: number;
  tipoFrete?: string;
  transportadora?: string;
  prazoEntrega?: string;
  dataEntrega?: string;
  fretePagarPor?: string;
  freteRetirarPor?: string;
  entregarRetirarCuidados?: string;
  nomeCompletoRecebedor?: string;
  cpfRecebedor?: string;
  telefoneRecebedor?: string;
  emailRecebedor?: string;
  horariosPermitidos?: string;
  locaisEntrega?: string;
  enderecoEntrega?: string;
  maisInformacoesEntrega?: string;
  observacoesFrete?: string;
  conhecimento?: string;
  urgente?: boolean;
  justificativaUrgencia?: string;
  autorizadoPor?: string;
  dataAutorizacao?: string;
  emailAutorizador?: string;
  observacoesAutorizacao?: string;
  // Configurações de Estoque
  temValidadeMinima?: boolean;
  validadeMinimaGlobal?: string;
  temPrevisaoConsumo?: boolean;
  previsaoConsumoMensal?: number;
  materiaisComplementares?: {
    cabo: boolean;
    nobreak: boolean;
    manuais: boolean;
    gelox: boolean;
    geloSeco: boolean;
    outrosAcessorios: boolean;
    especificacaoOutros: string;
  };
  
  // Faturamento
  pedidoOrigem?: string;
  naturezaOperacao?: string;
  tipoContrato?: string;
  emailsNF?: string;
  formaPagamentoNF?: string;
  contaBancariaRecebimento?: string;
  numeroParcelas?: number;
  instrucoesBoleto?: string;
  documentacaoNF?: {
    certificadoQualidade: boolean;
    certificadoAnalise: boolean;
    manual: boolean;
    fichaTecnica: boolean;
    laudoTecnico: boolean;
    nfOrigem: boolean;
    outros: boolean;
    especificacaoOutros: string;
  };
  observacoesDocumentacao?: string;
  destacarIR?: boolean;
  percentualIR?: number;
  
  // Controle de Canhoto
  exigeCanhoto?: boolean;
  observacoesCanhoto?: string;
  
  // Itens de Uso e Consumo
  itensUsoConsumo?: ItemUsoConsumoPedido[];
}
