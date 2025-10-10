export interface ProdutoPedido {
  id: number;
  codigo: string;
  referencia?: string; // Referência/código adicional do produto
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
  emprestimoId?: string; // NOVO - ID do empréstimo quando aplicável
  cliente: string;
  vendedor: string;
  dataVenda: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'cancelado';
  produtos: ProdutoPedido[];
  valorTotal: number;
  observacoesGerais?: string;
  informacoesComplementares?: string;
  condicoesPagamento?: string;
  tipoFrete?: string;
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
  // Urgência
  solicitarUrgencia?: boolean;
  justificativaUrgencia?: string;
  urgenciaStatus?: 'pendente' | 'aprovada' | 'rejeitada' | null;
  // Campos preenchidos automaticamente pelo sistema após aprovação
  autorizadoPor?: string;
  dataAutorizacao?: string;
  emailAutorizador?: string;
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
  descritivoNaturezaOperacao?: string;
  emailsNF?: string;
  formaPagamentoNF?: string;
  contaBancariaRecebimento?: string;
  numeroParcelas?: number;
  instrucoesBoleto?: string;
  documentosNF?: string[];
  observacoesDocumentacao?: string;
  destacarIR?: boolean;
  percentualIR?: number;
  
  // Itens de Uso e Consumo
  itensUsoConsumo?: ItemUsoConsumoPedido[];
  
  // Acompanhamento do Pedido
  statusAtual?: StatusPedido;
  timeline?: EventoTimeline[];
  recebimentoEstoque?: RecebimentoEstoque;
  faturamento?: FaturamentoPedido;
  logistica?: LogisticaPedido;
  feedbackEntrega?: FeedbackEntrega;
}

// ============= TIPOS PARA ACOMPANHAMENTO DO PEDIDO =============

export type StatusPedido = 
  | 'rascunho'
  | 'enviado' 
  | 'recebido_estoque'
  | 'em_separacao'
  | 'pronto_faturamento'
  | 'faturado'
  | 'em_transito'
  | 'entregue'
  | 'cancelado'
  | 'devolvido';

export interface EventoTimeline {
  status: StatusPedido;
  data: string;
  hora: string;
  responsavel?: string;
  observacoes?: string;
}

export interface RecebimentoEstoque {
  status: 'recebido' | 'em_separacao' | 'pronto_faturamento';
  dataRecebimento: string;
  horaRecebimento: string;
  responsavel: string;
  numeroLote?: string;
  referenciaInterna?: string;
  itensConferidos: ItemConferido[];
  observacoesDivergencia?: string;
  dataSaidaPrevista?: string;
  dataSaidaEfetiva?: string;
}

export interface ItemConferido {
  produtoId: number;
  codigoProduto: string;
  descricao: string;
  quantidadeSolicitada: number;
  quantidadeConferida: number;
  divergencia: boolean;
  tipoDivergencia?: 'falta' | 'dano' | 'substituicao';
  observacoes?: string;
}

export interface FaturamentoPedido {
  numeroNF: string;
  serieNF: string;
  dataEmissao: string;
  valorTotal: number;
  chaveAcesso: string;
  statusSefaz: 'autorizada' | 'cancelada' | 'rejeitada' | 'processando';
  protocolo?: string;
  linkXML?: string;
  linkDANFE?: string;
  boleto?: BoletoPedido;
  gnre?: GNREPedido;
  documentosAnexos?: DocumentoAnexo[];
}

export interface BoletoPedido {
  numeroDocumento: string;
  dataVencimento: string;
  valor: number;
  linkBoleto?: string;
  codigoBarras?: string;
  linhaDigitavel?: string;
}

export interface GNREPedido {
  numeroGuia: string;
  dataVencimento: string;
  valor: number;
  linkGNRE?: string;
}

export interface DocumentoAnexo {
  id: string;
  tipo: string;
  nome: string;
  url: string;
  dataUpload: string;
}

export interface LogisticaPedido {
  transportadora: DadosTransportadora;
  conhecimentoTransporte: ConhecimentoTransporte;
  statusEntrega: 'aguardando_coleta' | 'em_transito' | 'em_rota_entrega' | 'entregue' | 'devolvido';
  prazoEstimado: string;
  dataSaida?: string;
  previsaoEntrega?: string;
  dataEntregaEfetiva?: string;
  comprovanteEntrega?: ComprovanteEntrega;
}

export interface DadosTransportadora {
  nome: string;
  cnpj: string;
  telefone?: string;
  email?: string;
  custoFrete: number;
}

export interface ConhecimentoTransporte {
  numeroCTe: string;
  serieCTe: string;
  chaveAcesso: string;
  linkRastreamento?: string;
  protocolo?: string;
}

export interface ComprovanteEntrega {
  tipo: 'canhoto' | 'protocolo' | 'assinatura_digital';
  dataEntrega: string;
  horaEntrega: string;
  nomeRecebedor: string;
  documentoRecebedor?: string;
  imagemCanhoto?: string;
  protocoloCliente?: string;
}

export interface FeedbackEntrega {
  statusRecebimento: 'ok' | 'com_avarias' | 'temperatura_errada' | 'incompleto' | 'produto_errado' | 'devolucao';
  observacoesCliente?: string;
  acoesTomadas?: string;
  responsavelFeedback: string;
  dataFeedback: string;
  anexos?: AnexoFeedback[];
}

export interface AnexoFeedback {
  id: string;
  tipo: 'foto' | 'documento' | 'protocolo';
  nome: string;
  url: string;
  dataUpload: string;
}

// Pedido específico para empréstimo (reutiliza PedidoCompleto)
export type PedidoEmprestimo = PedidoCompleto;
