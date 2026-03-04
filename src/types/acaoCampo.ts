// Tipos de Documentos Fixos
export enum TipoDocumentoAcaoCampo {
  CARTA_CLIENTE = 'carta_cliente',
  FAN = 'fan',
  FIELD_ACTION_EFFECTIVENESS = 'field_action_effectiveness',
  FIELD_ACTION_EFFECTIVENESS_PREENCHIVEL = 'field_action_effectiveness_preenchivel',
  FAC1_CUSTOMER_ADVISORY = 'fac1_customer_advisory',
  FAC2_CUSTOMER_RESPONSE = 'fac2_customer_response',
  FAC3 = 'fac3',
  PROTOCOLO_ABERTURA_ANVISA = 'protocolo_abertura_anvisa',
  PROTOCOLO_ENCERRAMENTO_ANVISA = 'protocolo_encerramento_anvisa',
  ADICIONAL = 'adicional',
  NOTIFICACAO_ACAO_CAMPO_PREENCHIVEL = 'notificacao_acao_campo_preenchivel',
  PLANILHA_ACAO_CAMPO_PREENCHIVEL = 'planilha_acao_campo_preenchivel',
  SUMARIO_ALERTA_PREENCHIVEL = 'sumario_alerta_preenchivel'
}

// Dados do Formulário Field Action Effectiveness
export interface FieldActionEffectivenessData {
  product: string;
  accountNumberOrName: string;
  submissionDate: string;
  reminder1SentDate: string;
  reminder2SentDate: string;
  recallResponseFormReceived: boolean;
  newOsVersionInstalled: boolean;
  stateVersion: string;
  remarks: string;
  pdfGerado?: boolean;
  dataPdfGerado?: string;
}

// Assinatura do Documento
export interface AssinaturaDocumento {
  nomeAssinante: string;
  assinaturaBase64: string;
  dataAssinatura: string;
  cargo?: string;
}

// Produto da Notificação
export interface ProdutoNotificacao {
  nomeComercial: string;
  nomeTecnico: string;
  registroNotificacao: string;
  classeRisco: string;
  codigoReferencia: string;
  modelo: string;
  loteSerie: string;
}

// Distribuição para outros países
export interface DistribuicaoPais {
  pais: string;
  loteSerie: string;
  quantidade: string;
}

// Plano de Ação
export interface PlanoAcaoItem {
  numero: number;
  descricao: string;
  inicio: string;
  fim: string;
  situacao: string;
  observacoes: string;
}

// Dados do Formulário Notificação de Ação de Campo
export interface NotificacaoAcaoCampoData {
  // Aba 1 - Informações Gerais
  cnpj: string;
  razaoSocial: string;
  endereco: string;
  uf: string;
  municipio: string;
  responsavelNome: string;
  responsavelCargo: string;
  responsavelTelefone: string;
  responsavelEmail: string;
  dataInicioAcao: string;
  codigoAcao: string;

  // Aba 2 - Produto
  tipoProduto: string;
  produtos: ProdutoNotificacao[];
  fabricanteNome: string;
  fabricantePais: string;
  fabricanteEndereco: string;
  quantidadeTotalEnvolvidos: string;
  quantidadeTotalComercializada: string;
  quantidadeEstoque: string;
  quantidadeImplantada: string;
  tipoUnidadeInformada: string;
  distribuicaoUsoResidencial: boolean;
  distribuicaoImplantados: boolean;
  distribuicaoServicoseSaude: boolean;
  distribuicaoEstoqueFabricante: boolean;
  distribuicaoUFs: string[];
  distribuicaoPaises: DistribuicaoPais[];

  // Aba 3 - Ação de Campo
  classificacaoRisco: string;
  classificacaoAcao: string[];
  classificacaoAcaoOutraEspecificar: string;
  destinacaoFinal: string;
  destinacaoFinalOutraEspecificar: string;
  enquadramento: string[];
  enquadramentoOutraEspecificar: string;

  // Aba 4 - Descrição do Problema
  dataIdentificacaoProblema: string;
  descricaoProblema: string;
  avaliacaoRisco: string;
  possiveisConsequencias: string;
  recomendacaoUsuarios: string;
  notificacoesNotivisa: boolean;
  numerosNotificacoes: string[];

  // Aba 5 - Plano de Ação
  planosAcao: PlanoAcaoItem[];
  previsaoEncerramento: string;

  // Aba 6 - Observações
  observacoes: string;
  local: string;
  data: string;
  nomeLegivel: string;
  assinaturaDigitalBase64?: string;

  // Metadata
  pdfGerado?: boolean;
  dataPdfGerado?: string;
}

// Dados do Formulário Planilha de Ação de Campo
export interface PlanilhaAcaoCampoData {
  numeroAcaoCampo: string;
  clienteId: string;
  clienteNome: string;
  uf: string;
  modelo: string;
  nsLote: string;
  setor: string;
  email: string;
  telefone: string;
  produtoId: string;
  produtoNome: string;
  versaoWindows: string;
  versaoSoftware: string;
  pdfGerado?: boolean;
  dataPdfGerado?: string;
}

// Dados do Formulário Sumário de Alerta
export interface SumarioAlertaData {
  titulo: string;
  identificacaoProduto: string;
  localDistribuicao: string;
  nomeComercial: string;
  nomeTecnico: string;
  registroAnvisa: string;
  tipoProduto: string;
  classeRisco: string;
  modeloAfetado: string;
  numerosSerieOuVersao: string;
  problema: string;
  dataIdentificacaoProblema: string;
  acao: string;
  historico: string;
  empresaDetentoraRegistro: string;
  fabricanteProduto: string;
  recomendacoesPublico: string;
  anexosAlerta: string;
  linkSistec: string;
  linkPaineisTecnovigilancia: string;
  informacoesComplementares: string;
  tagDescritores: string;
  pdfGerado?: boolean;
  dataPdfGerado?: string;
}

// Documento de Ação de Campo
export interface DocumentoAcaoCampo {
  id: string;
  tipo: TipoDocumentoAcaoCampo;
  nome: string;
  nomeOriginal?: string;
  arquivo?: File;
  url?: string;
  dataUpload?: string;
  tamanho?: number;
  requerAssinatura: boolean;
  assinatura?: AssinaturaDocumento;
  dadosFormulario?: FieldActionEffectivenessData;
  dadosNotificacao?: NotificacaoAcaoCampoData;
  dadosPlanilha?: PlanilhaAcaoCampoData;
  dadosSumarioAlerta?: SumarioAlertaData;
}

// Seção de Ação de Campo (NOVA)
export interface SecaoAcaoCampo {
  id: string;
  titulo: string;
  documentos: DocumentoAcaoCampo[];
  documentosAdicionais: DocumentoAcaoCampo[];
}

// Status da Ação de Campo
export enum StatusAcaoCampo {
  EM_ANDAMENTO = 'em_andamento',
  AGUARDANDO_ASSINATURAS = 'aguardando_assinaturas',
  COMPLETA = 'completa',
  ARQUIVADA = 'arquivada'
}

// Ação de Campo Completa
export interface AcaoCampo {
  id: string;
  titulo: string;
  empresaRepresentada: string;
  dataCriacao: string;
  dataAtualizacao?: string;
  status: StatusAcaoCampo;
  secoes: SecaoAcaoCampo[];
  documentosExtras: DocumentoAcaoCampo[];
}
