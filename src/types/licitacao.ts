export interface Licitacao {
  id: number;
  numeroPregao: string;
  nomeInstituicao: string;
  uf: string;
  municipio: string;
  linkEdital?: string;
  objetoLicitacao: string;
  numeroItem?: string;
  empresaConcorrente?: string;
  palavraChave?: string;
  status: 'triagem' | 'acompanhamento' | 'finalizada' | 'convertida';
  motivoDecisao?: string;
  observacoes?: string;
  dataAbertura: string;
  dataContato?: string;
  createdAt: string;
  
  // Novos campos obrigatórios
  situacaoPregao: 'aberto' | 'suspenso' | 'cancelado' | 'homologado' | 'deserto' | 'fracassado' | 'revogado';
  statusLicitacao: 'aguardando_abertura' | 'em_andamento' | 'fase_habilitacao' | 'fase_proposta' | 'julgamento' | 'recurso' | 'homologacao' | 'adjudicacao' | 'contratacao' | 'finalizado';
  haviaContratoAnterior: boolean;
  resumoEdital: string;
  analiseTecnica: string;
  
  // Campos de estratégia
  estrategiaValorEntrada?: number;
  estrategiaValorFinal?: number;
  estrategiaObjetivo?: string;
  estrategiaRisco?: 'baixo' | 'medio' | 'alto';
  
  // Campos de controle
  inclusao: string;
  ultimaAlteracao: string;
  incluidoPor: string;
  alteradoPor: string;
}

export interface Licitante {
  id: number;
  licitacaoId: number;
  empresa: string;
  cnpj: string;
  marca: string;
  modelo: string;
  valorEntrada: number;
  valorFinal: number;
  unidade: string;
  status: 'habilitado' | 'inabilitado' | 'desclassificado' | 'vencedor';
  ranking: number;
  observacoes?: string;
}

export interface ProdutoLicitacao {
  id: number;
  licitanteId: number;
  codigo: string;
  descricao: string;
  marca: string;
  modelo: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  especificacoes?: string;
}

export interface LicitacaoFormData extends Omit<Licitacao, 'id' | 'createdAt' | 'inclusao' | 'ultimaAlteracao' | 'incluidoPor' | 'alteradoPor'> {
  licitantes?: Licitante[];
  produtos?: ProdutoLicitacao[];
}
