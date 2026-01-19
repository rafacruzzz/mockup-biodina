
// Interface para aditivos contratuais
export interface AditivoContratual {
  id: string;
  tipo: 'alteracao_cnpj' | 'acrescimo_valor' | 'prorrogacao' | 'outros';
  cnpjAnterior?: string;
  cnpjNovo?: string;
  justificativa: string;
  arquivoUrl: string;
  alteradoPor: string;
  alteradoEm: string;
  validadoPorMaster: boolean;
  senhaMasterValidada: boolean;
}

// Interface para aprovação de empresa
export interface AprovacaoEmpresa {
  status: 'pendente' | 'aprovado' | 'rejeitado';
  aprovadoPor?: string;
  aprovadoEm?: string;
  observacao?: string;
}

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
  situacaoPregao: 'cadastro_proposta' | 'em_analise' | 'etapa_lances' | 'visualizacao_propostas' | 'aceitacao_propostas' | 'habilitacao_fornecedores' | 'negociacao_preco' | 'recursos' | 'suspenso' | 'adjudicacao' | 'homologacao' | 'ata_contrato' | 'empenho';
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
  
  // Campos de identificação empresarial (obrigatórios na estratégia)
  empresaParticipanteId?: string;
  empresaParticipanteNome?: string;
  empresaParticipanteCNPJ?: string;
  aprovacaoEmpresa?: AprovacaoEmpresa;
  
  // Rastreabilidade de aditivos
  aditivos?: AditivoContratual[];
}

export interface Licitante {
  id: number;
  licitacaoId: number;
  empresa: string;
  cnpj: string;
  marca: string;
  modelo: string;
  valorUnitario: number;
  valorFinal: number;
  ranking: number;
  status: 'habilitado' | 'inabilitado' | 'desclassificado' | 'vencedor' | 'adjudicada' | 'aceita_habilitada' | 'homologada';
  observacoes?: string;
  atendeEdital: boolean;
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
