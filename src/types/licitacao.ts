
export interface Licitacao {
  id: number;
  numeroPregao: string;
  nomeInstituicao: string;
  uf: string;
  municipio: string;
  linkEdital?: string;
  objetoLicitacao: string;
  numeroItem: string;
  empresaConcorrente?: string;
  palavraChave: string;
  anexoEdital?: string;
  status: 'triagem' | 'acompanhamento' | 'finalizada' | 'convertida';
  motivoDecisao?: string;
  observacoes?: string;
  dataAbertura: string;
  dataContato?: string;
  createdAt: string;
}

export interface AnaliseTecnica {
  id: number;
  licitacaoId: number;
  analiseAssessoria: string;
  avaliacaoTecnica: string;
  historicoEdital?: string;
}

export interface Concorrente {
  id: number;
  licitacaoId: number;
  nome: string;
  produto: string;
  preco: number;
  historico?: string;
}

export interface Pedido {
  id: number;
  licitacaoId: number;
  numeroPedido: string;
  cliente: string;
  tipo: 'produto' | 'servico' | 'importacao_direta';
  status: 'aguardando_liberacao' | 'entregue' | 'faturado' | 'cancelado';
  valor: number;
  formaPagamento: string;
  observacoes?: string;
  createdAt: string;
}

export interface ItemPedido {
  id: number;
  pedidoId: number;
  codigoProduto: string;
  descricao: string;
  cfop: string;
  unidade: string;
  quantidade: number;
  cstIcms: string;
  precoUnitario: number;
  faturarAntesEntrega: boolean;
  soFaturar: boolean;
}

export interface ImportacaoDireta {
  id: number;
  licitacaoId: number;
  fornecedorInternacional: string;
  moeda: 'USD' | 'EUR' | 'GBP' | 'JPY';
  valorMoedaOriginal: number;
  valorReais: number;
  incoterm: string;
  tipoFrete: string;
  numeroInvoice?: string;
  numeroDI?: string;
  dataPrevistaChegada?: string;
  dadosRastreabilidade?: string;
  observacoesImportacao?: string;
}

export interface OportunidadeComercial {
  id: number;
  licitacaoId: number;
  cliente: string;
  contato: string;
  telefone?: string;
  representanteComercial: string;
  familiaComercial: string;
  fornecedor: string;
  tipoAplicacao: 'venda' | 'locacao' | 'servico';
  tipoOportunidade: 'pontual' | 'periodica';
  situacao: 'aberta' | 'ganha' | 'perdida';
  dataAbertura: string;
  dataContato: string;
  descricao: string;
  documentos?: string[];
  observacoes?: string;
}
