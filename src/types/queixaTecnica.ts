// Tipos para Queixa Técnica (Notivisa/ANVISA)

export interface QueixaTecnica {
  id: string;
  // Identificação do Notificador
  notificadorNome: string;
  notificadorEmail: string;
  notificadorTelefone?: string;
  notificadorCelular?: string;
  notificadorCategoria: string;
  // Identificação da Notificação
  numeroNotificacao: string;
  dataIdentificacao: Date;
  produtoMotivo: string;
  tipoQueixaEvento: 'Queixa Técnica' | 'Evento Adverso';
  covidRelacionado: boolean;
  vacinaCovidRelacionado: boolean;
  // Tipo de Queixa Técnica (Seção 3)
  voceENotificante?: string;
  razaoSocialNotificante?: string;
  cnpjNotificante?: string;
  telefoneNotificante?: string;
  enderecoNotificante?: string;
  tipoQueixaTecnica: string;
  alteracoesApresentadas?: string;
  // Queixa Técnica (Seção 4)
  descricaoObjetiva: string;
  classificacaoNivel1: string;
  classificacaoNivel2: string;
  localIdentificacao: string;
  setorEspecifico: string;
  tipoProcedimento?: string;
  numeroRegistroAnvisa: string;
  cnpjFabricanteImportador: string;
  nomeComercial: string;
  produto: string;
  dataFabricacao: Date;
  numeroLote: string;
  dataValidade: Date;
  produtoReprocessado: boolean;
  produtoImportado: boolean;
  classeRisco: string;
  nomeTecnico: string;
  razaoSocialFabricante: string;
  enderecoFabricante: string;
  telefoneContato?: string;
  ufFabricante: string;
  municipioFabricante: string;
  nomeFabricante?: string;
  paisFabricante?: string;
  seguiuInstrucoes: boolean;
  localAquisicao: string;
  possuiNotaFiscal: boolean;
  comunicacaoIndustria: string;
  providenciasAdotadas?: string;
  existemAmostras: boolean;
  quantidadeAmostras?: string;
  existemRotulos: boolean;
  observacoes?: string;
  ncGeradaId?: string;
  status: 'Pendente' | 'Em Análise' | 'NC Gerada' | 'Resolvida';
  dataCriacao: Date;
  dataAtualizacao?: Date;
}

export interface DocumentoNotivisa {
  id: string;
  queixaTecnicaId: string;
  nomeArquivo: string;
  dataUpload: Date;
  tamanho: number;
  tipo: string;
}
