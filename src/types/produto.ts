// Tipos para o módulo de Repositório de Produtos

export type StatusProduto = 'ativo' | 'descontinuado';
export type StatusCadastro = 'completo' | 'incompleto';

export interface Marca {
  id: string;
  nome: string;
  logo: string;
  descricao?: string;
}

export interface Linha {
  id: string;
  nome: string;
  marcaId: string;
  descricao?: string;
  imagem?: string;
}

export interface Produto {
  id: string;
  codigo: string;
  nome: string;
  linhaId: string;
  marcaId: string;
  descricao: string;
  descritivoBreve?: string;
  descritivoCompleto?: string;
  apresentacaoComercial?: string;
  modeloProdutoMedico?: string;
  aplicacoes: string;
  tagsProduto?: string[];
  palavrasChave: string[]; // Deprecated - use tagsProduto
  status: StatusProduto;
  statusCadastro?: StatusCadastro;
  imagem?: string;
  
  // Ficha técnica
  especificacoesTecnicas?: string; // Deprecated - use campos estruturados abaixo
  parametrosChave?: string;
  compatibilidades?: string;
  requisitosInfraestrutura?: string;
  condicoesAmbientais?: string;
  conformidadesNormas?: string;
  peso?: string; // Deprecated - use campos específicos
  dimensoes?: string; // Deprecated - use campos específicos
  pesoLiquido?: number;
  pesoBruto?: number;
  altura?: number;
  largura?: number;
  profundidade?: number;
  
  // Regulatório
  registroAnvisa?: string;
  linkConsultaAnvisa?: string;
  classeProduto?: string;
  
  // Mídia
  galeria?: string[];
  videos?: string[];
}

export interface VersaoDocumento {
  versao: string;
  dataAprovacao: Date;
  aprovadoPor: string;
  arquivo: string;
}

export interface DocumentoProduto {
  id: string;
  produtoId: string;
  tipo: 'catalogo' | 'manual' | 'artigo' | 'ficha_tecnica' | 'outros';
  titulo: string;
  versao: string;
  idioma: string;
  dataUpload: Date;
  uploadPor: string;
  arquivo: string;
  historicoVersoes?: VersaoDocumento[];
}

export interface ComparativoProduto {
  id: string;
  produtoId: string;
  titulo: string;
  criadoPor: string;
  criadoEm: Date;
  conteudo: {
    nosso: { [campo: string]: string };
    concorrente: { [campo: string]: string };
  };
}

export interface JustificativaProduto {
  id: string;
  produtoId: string;
  titulo: string;
  conteudo: string;
  criadoPor: string;
  criadoEm: Date;
}

export interface TermoReferenciaProduto {
  id: string;
  produtoId: string;
  titulo: string;
  conteudo: string;
  criadoPor: string;
  criadoEm: Date;
}

export interface HistoricoVersaoProduto {
  id: string;
  produtoId: string;
  tipo: 'documento' | 'ficha_tecnica' | 'regulatorio' | 'midia';
  descricaoAlteracao: string;
  alteradoPor: string;
  alteradoEm: Date;
}
