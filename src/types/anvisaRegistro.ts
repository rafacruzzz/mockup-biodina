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
  // Etapa 1: Produto Selecionado
  produtoSelecionado: any;
  
  // Etapa 2: Organização de Documentos
  nomeArquivoPrincipal: string;
  estruturaArquivos: PastaAnvisa[];
  protocoloPeticionamento?: ArquivoAnvisa;
  
  // Etapa 3: Informações Regulatórias
  areaAnvisa: string;
  numeroProcessoAnvisa: string;
  assunto: string;
  motivoPeticionamento: string;
  transacao: string;
  expediente: string;
  dataEnvio: string;
  dataPublicacaoDOU: string;
  numeroPublicacaoDOU: string;
  numeroNotificacaoRegistro: string;
  dataAlertaDisponibilizacao: string;
  observacaoGeral: string;
  
  // Informações do Fabricante/Produto
  fabricante: string;
  codigoProdutoFabricante: string;
  nomeProdutoFabricante: string;
  nomeDetentorNotificacao: string;
  cnpjDetentor: string;
  nomeProdutoBrasil: string;
  nomeTecnicoAnvisa: string;
  numeroRegistroAnvisa: string;
  situacaoRegistro: string;
  classificacaoRisco: string;
  marca: string;
  modelo: string;
  linha: string;
  apresentacaoPrimaria: string;
  apresentacaoSecundaria: string;
  apresentacaoTerciaria: string;
  referenciasComercializadas: string;
  nomeMarketing: string;
  breveDescritivo: string;
  descritivoCompleto: string;
  tags: string;
  linkConsultaAnvisa: string;
  linkAnaliseConcorrencia: string;
  linkFichaTecnica: string;
  linkBancoImagens: string;
  linkTreinamentoApresentacao: string;
  linkTreinamentoCientifico: string;
  linkTreinamentoManutencao: string;
  
  // Etapa 4: Disponibilização de Instrução de Uso
  disponibilizacaoInstrucaoUso: string;
  transacaoInstrucao: string;
  expedienteInstrucao: string;
  dataEnvioInstrucao: string;
  arquivoInstrucaoUso?: ArquivoAnvisa;
}

export type EtapaRegistro = 'selecao_produto' | 'organizacao_documentos' | 'informacoes_regulatorias' | 'disponibilizacao_instrucao';

export interface RegistroAnvisaCompleto extends RegistroAnvisaData {
  id: string;
  status: 'em_preparacao' | 'enviado' | 'publicado' | 'aprovado' | 'rejeitado';
  dataCriacao: Date;
  dataAtualizacao: Date;
}