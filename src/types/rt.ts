// Tipos para o módulo de Responsabilidade Técnica (RT)

// Estrutura de pastas e arquivos para documentação
export interface ArquivoRT {
  id: string;
  nome: string;
  tipo: string;
  tamanho: number;
  dataUpload: string;
  url?: string;
}

export interface PastaRT {
  id: string;
  nome: string;
  subtitulo?: string;
  pastaId?: string | null; // ID da pasta pai
  arquivos: ArquivoRT[];
  subPastas?: PastaRT[];
  expandido?: boolean;
}

// Controle de Mudanças
export type ParteInteressada = 'Usuario' | 'TI' | 'CQ' | 'RT' | 'DT' | 'RH' | 'Outros';
export type TipoMudanca = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type StatusMudanca = 'Pendente' | 'Em Análise' | 'Aprovado' | 'Rejeitado';

export interface Mudanca {
  id: string;
  data: string;
  parteInteressada: ParteInteressada;
  responsavel: string;
  tipoMudanca: TipoMudanca;
  descricao: string;
  status: StatusMudanca;
  observacoes?: string;
  anexos?: ArquivoRT[];
}

// Treinamentos
export interface Treinamento {
  id: string;
  data: string;
  conteudo: string;
  local: string;
  ministrante: string;
  participantes: string[];
  objetivo: string;
  anexos: ArquivoRT[];
  tipo: 'realizado' | 'futuro';
  status?: 'Agendado' | 'Confirmado' | 'Realizado' | 'Cancelado';
}

// Liberação de Produtos
export interface LiberacaoProduto {
  produtoId: string;
  codigo: string;
  nome: string;
  marca: string;
  linha: string;
  liberadoRT: boolean;
  dataLiberacao?: string;
  responsavelLiberacao?: string;
  observacoes?: string;
}

// Tipos de documentação
export type TipoDocumentacaoRT = 'pop' | 'especificacoes' | 'legislacoes';

export interface DocumentacaoRT {
  tipo: TipoDocumentacaoRT;
  nomeArquivoPrincipal: string;
  estruturaPastas: PastaRT[];
}
