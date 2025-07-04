
export interface Licitacao {
  id: number;
  numeroPregao: string;
  nomeInstituicao: string;
  uf: string;
  objetoLicitacao: string;
  valorMaximo: number;
  dataAbertura: string;
  dataVisita?: string;
  dataNegociacao?: string;
  status: 'rascunho' | 'ativo' | 'concluido';
  criadaPor: string;
  criadaEm: string;
  atualizadaEm?: string;
  observacoes?: string;
  // Campos para análise
  analiseDetalhada: string;
  estrategiaValorInicial: number;
  estrategiaValorFinal: number;
  probabilidadeGanho: number;
  riscosIdentificados: string;
  pontosFortes: string;
  pontosFracos: string;
  // Campos para negociação
  situacaoLicitacao: 'aberta' | 'em_negociacao' | 'finalizada' | 'cancelada';
  resultadoNegociacao?: 'ganha' | 'perdida' | 'empate_tecnico' | 'desclassificada';
  valorFinalNegociado?: number;
  motivoResultado?: string;
  proximosPassos?: string;
  documentos?: {
    id: string;
    nome: string;
    tipo: string;
    url: string;
    uploadEm: string;
  }[];
  chat?: {
    id: string;
    usuario: string;
    mensagem: string;
    timestamp: string;
    tipo: 'comentario' | 'atualizacao' | 'alerta';
  }[];
}

export interface Licitante {
  id: number;
  empresa: string;
  cnpj: string;
  produto: string;
  valor: number;
  status: 'ativo' | 'desclassificado' | 'pendente';
}

export interface NovaLicitacao {
  numeroPregao: string;
  nomeInstituicao: string;
  uf: string;
  objetoLicitacao: string;
  valorMaximo: number;
  dataAbertura: string;
  dataVisita?: string;
  dataNegociacao?: string;
  observacoes?: string;
}
