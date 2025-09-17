export interface ArquivoAnvisa {
  id: string;
  nome: string;
  nomeOriginal: string;
  arquivo: File;
  tipo: string;
  tamanho: number;
  dataUpload: Date;
  isProtocoloPeticionamento?: boolean;
}

export interface PastaAnvisa {
  id: string;
  nome: string;
  subtitulo?: string;
  arquivos: ArquivoAnvisa[];
  subpastas: PastaAnvisa[];
  parentId?: string;
  isExpanded?: boolean;
}

export interface RegistroAnvisaData {
  produtoSelecionado: any;
  nomeArquivoPrincipal: string;
  estruturaArquivos: PastaAnvisa[];
  protocoloPeticionamento?: ArquivoAnvisa;
}

export type EtapaRegistro = 'selecao_produto' | 'organizacao_documentos';