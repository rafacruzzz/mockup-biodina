// Tipos para o módulo de Repositório de Produtos

export type StatusProduto = 'ativo' | 'descontinuado';

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
  aplicacoes: string[];
  palavrasChave: string[];
  status: StatusProduto;
  imagem?: string;
  
  // Ficha técnica
  especificacoesTecnicas?: string;
  peso?: string;
  dimensoes?: string;
  
  // Regulatório
  registroAnvisa?: string;
  linkConsultaAnvisa?: string;
  
  // Mídia
  galeria?: string[];
  videos?: string[];
}

export interface DocumentoProduto {
  id: string;
  produtoId: string;
  tipo: 'catalogo' | 'manual' | 'artigo' | 'outros';
  titulo: string;
  versao: string;
  idioma: string;
  dataUpload: Date;
  uploadPor: string;
  arquivo: string;
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
