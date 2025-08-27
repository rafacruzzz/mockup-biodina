

export interface ProdutoPedido {
  id: number;
  codigo: string;
  descricao: string;
  quantidade: number;
  unidade: UnidadeVenda;
  preco: number; // Alterado de precoUnitario para preco com 4 casas decimais
  precoFinal: number;
  descritivoItem?: string; // Novo campo - vai para NF abaixo da descrição oficial
  validadeMinimaExigida?: string; // Novo campo - validade mínima por item
  estoqueDisponivel: EstoqueVendivel;
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

export interface PedidoCompleto {
  id: number;
  numeroOportunidade: string;
  cliente: string;
  vendedor: string;
  dataVenda: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'cancelado';
  produtos: ProdutoPedido[];
  valorTotal: number;
  observacoesGerais?: string;
  
  // Novos campos
  informacoesComplementaresNF?: string;
  condicoesPagamento?: string;
  informacoesFreteConhecimento?: string;
  
  // Informações de frete expandidas
  freteAPagarPor?: 'cliente' | 'representante' | 'empresa';
  freteARetirarPor?: 'cliente' | 'representante' | 'portador_interno' | 'destino_final';
  prazoEntrega?: number;
  entregarRetirarAosCuidadosDe?: string;
  dadosRecebedorNome?: string;
  dadosRecebedorCpf?: string;
  dadosRecebedorTelefone?: string;
  dadosRecebedorEmail?: string;
  horariosPermitidosEntrega?: string;
  locaisEntrega?: string;
  maisInformacoesEntrega?: string;
  eUrgente?: boolean;
  justificativaUrgencia?: string;
  autorizadoPor?: string;
  dataAutorizacao?: string;
}

