// Tipos de Processo
export enum TipoProcesso {
  JUDICIAL = 'judicial',
  ADMINISTRATIVO = 'administrativo',
  PRECATORIO = 'precatorio',
  EXECUCAO_FISCAL = 'execucao_fiscal',
  TRABALHISTA = 'trabalhista'
}

// Status do Processo
export enum StatusProcesso {
  EM_ANDAMENTO = 'em_andamento',
  AGUARDANDO_PRAZO = 'aguardando_prazo',
  SUSPENSO = 'suspenso',
  ENCERRADO = 'encerrado',
  ARQUIVADO = 'arquivado'
}

// Andamento do Processo
export interface AndamentoProcesso {
  id: string;
  data: string;
  descricao: string;
  responsavel: string;
  documentosAnexados?: DocumentoProcesso[];
}

// Documento do Processo
export interface DocumentoProcesso {
  id: string;
  nome: string;
  tipo: string;
  dataUpload: string;
  tamanho: string;
  url?: string;
}

// Processo Principal
export interface ProcessoJuridico {
  id: string;
  numeroProcesso: string;
  tipo: TipoProcesso;
  status: StatusProcesso;
  parteContraria: string;
  vara?: string;
  comarca?: string;
  tribunal?: string;
  objeto: string;
  valorCausa?: number;
  dataDistribuicao: string;
  responsavelInterno: string;
  advogadoExterno?: string;
  observacoes?: string;
  andamentos: AndamentoProcesso[];
  documentos: DocumentoProcesso[];
}

// Tipos de Chamado Jurídico
export enum TipoChamadoJuridico {
  ANALISE_DOCUMENTOS = 'analise_documentos',
  VALIDACAO_CONTRATOS = 'validacao_contratos',
  ELABORACAO_RECURSOS_LICITACAO = 'elaboracao_recursos_licitacao',
  PARECER_JURIDICO = 'parecer_juridico',
  CONSULTORIA_TRABALHISTA = 'consultoria_trabalhista',
  OUTROS = 'outros'
}

// Urgência do Chamado
export enum UrgenciaChamadoJuridico {
  BAIXA = 'baixa',
  MEDIA = 'media',
  ALTA = 'alta',
  CRITICA = 'critica'
}

// Status Chamado Jurídico
export enum StatusChamadoJuridico {
  ABERTO = 'aberto',
  EM_ANALISE = 'em_analise',
  AGUARDANDO_DOCUMENTOS = 'aguardando_documentos',
  RESPONDIDO = 'respondido',
  FINALIZADO = 'finalizado'
}

// Chamado Jurídico
export interface ChamadoJuridico {
  id: string;
  tipo: TipoChamadoJuridico;
  urgencia: UrgenciaChamadoJuridico;
  status: StatusChamadoJuridico;
  titulo: string;
  descricao: string;
  solicitante: string;
  departamento: string;
  dataAbertura: string;
  prazoResposta?: string;
  dataResposta?: string;
  responsavelJuridico?: string;
  parecer?: string;
  documentosAnexados?: DocumentoProcesso[];
  licitacaoRelacionada?: string;
}
