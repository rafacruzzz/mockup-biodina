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
  valorUnitario?: number;
  unidade: string;
  observacoes: string;
  categoria: string;
}

// ============= INDICADORES E ALERTAS =============

export interface IndicadorPedido {
  tipo: 'atraso_separacao' | 'prazo_excedido' | 'nf_pendente' | 'divergencia_quantidade';
  severidade: 'baixa' | 'media' | 'alta' | 'critica';
  mensagem: string;
  dataDeteccao: string;
  pedidoId: number;
  detalhes?: string;
}

export interface AlertaPedido {
  tipo: 'mudanca_status' | 'atualizacao_entrega' | 'emissao_nf' | 'divergencia' | 'atraso';
  titulo: string;
  mensagem: string;
  dataAlerta: string;
  horaAlerta: string;
  lido: boolean;
  pedidoId: number;
  statusRelacionado?: StatusPedido;
  prioridade: 'normal' | 'alta' | 'urgente';
}

export interface PedidoCompleto {
  id: number;
  numeroOportunidade: string;
  numeroCliente: string;
  nomeCliente: string;
  cnpjCliente: string;
  vendedor: string;
  dataEmissao: string;
  valorTotal: number;
  produtos: ProdutoPedido[];
  
  // Informações de pagamento e entrega
  dataPrevista?: string;
  urgente?: boolean;
  operacao?: string;
  descritivo?: string;
  vendedorExterno?: string;
  
  // Campos adicionais para compatibilidade com outros modais
  dataVenda?: string;
  status?: string;
  cliente?: string;
  observacoesGerais?: string;
  informacoesComplementares?: string;
  condicoesPagamento?: string;
  contaBancariaRecebimento?: string;
  numeroParcelas?: number;
  instrucoesBoleto?: string;
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
  solicitarUrgencia?: boolean;
  justificativaUrgencia?: string;
  urgenciaStatus?: 'pendente' | 'aprovada' | 'rejeitada';
  autorizadoPor?: string;
  dataAutorizacao?: string;
  emailAutorizador?: string;
  pedidoOrigem?: string;
  projetoOrigem?: string;
  emprestimoId?: string;
  temValidadeMinima?: boolean;
  validadeMinimaGlobal?: string;
  temPrevisaoConsumo?: boolean;
  previsaoConsumoMensal?: number;
  materiaisComplementares?: {
    cabo?: boolean;
    nobreak?: boolean;
    manuais?: boolean;
    gelox?: boolean;
    geloSeco?: boolean;
    outrosAcessorios?: boolean;
    especificacaoOutros?: string;
  };
  descritivoNaturezaOperacao?: string;
  formaPagamentoNF?: string;
  documentosNF?: string[];
  
  // Configuração de Estoque
  estoque?: {
    controlaEstoque: boolean;
    compraFornecedor: boolean;
    filial?: string;
  };
  
  // NF
  deveEmitirNF?: boolean;
  naturezaOperacao?: string;
  finalidadeNF?: string;
  emailsNF?: string;
  formaPagamento?: string;
  destinatario?: {
    razaoSocial?: string;
    cnpj?: string;
    inscricaoEstadual?: string;
    endereco?: {
      logradouro?: string;
      numero?: string;
      complemento?: string;
      bairro?: string;
      cidade?: string;
      uf?: string;
      cep?: string;
    };
  };
  transportadora?: {
    nome?: string;
    cnpj?: string;
    modalidadeFrete?: 'CIF' | 'FOB' | 'Terceiros' | 'Proprio' | 'Sem Frete';
    pesoLiquido?: number;
    pesoBruto?: number;
    volumes?: number;
    especie?: string;
  };
  
  // Documentação
  documentosAnexados?: string[];
  observacoesDocumentacao?: string;
  destacarIR?: boolean;
  percentualIR?: number;
  
  // Itens de Uso e Consumo
  itensUsoConsumo?: ItemUsoConsumoPedido[];
  
  // Acompanhamento
  statusAtual?: StatusPedido;
  timeline?: EventoTimeline[];
  recebimentoEstoque?: RecebimentoEstoque;
  faturamento?: FaturamentoPedido;
  logistica?: LogisticaPedido;
  feedbackEntrega?: FeedbackEntrega;
  canhotoNota?: string;
  indicadores?: IndicadorPedido[];
  alertas?: AlertaPedido[];
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
  numeroSerie?: string;
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
  condicoesPagamento?: string;
  documentacaoEnviada?: string;
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
