export type TipoOperacaoFiscal = 
  | 'Venda'
  | 'Remessa'
  | 'Devolucao'
  | 'AutoConsumo'
  | 'Comodato'
  | 'Locacao'
  | 'Perda'
  | 'Servico';

export type StatusRegimeEspecial = 'Com Regime' | 'Sem Regime' | 'Nacional';

export type StatusDocumento = 'Rascunho' | 'Emitido' | 'Autorizado' | 'Cancelado' | 'Rejeitado';

export type StatusImportacao = 
  | 'Aguardando DI'
  | 'DI Registrada'
  | 'Canal Verde'
  | 'Canal Amarelo'
  | 'Canal Vermelho'
  | 'Canal Cinza'
  | 'Desembaraçado'
  | 'N/A';

export interface DocumentoFiscal {
  id: string;
  numero: string;
  serie: string;
  tipo: 'NF-e' | 'NFS-e' | 'CT-e' | 'Fatura';
  cliente: string;
  cnpjCpf: string;
  valor: number;
  impostos: number;
  valorTotal: number;
  emissao: string;
  vencimento?: string;
  status: StatusDocumento;
  protocolo?: string;
  chaveAcesso?: string;
  cfop: string;
  naturezaOperacao: string;
  
  // Novos campos para integração
  tipoOperacao?: TipoOperacaoFiscal;
  osVinculadaId?: string;
  equipamentoId?: string;
  statusRegimeEspecial?: StatusRegimeEspecial;
  requerProcedimentoFiscal?: boolean;
  itemsApontamento?: ItemApontamento[];
}

export interface ParametrosFiscais {
  id: string;
  dataConcessaoRegimeEspecial: Date;
  prazoMaximoBaixaFiscalOS: number; // em horas
  mapeamentosFiscais: MapeamentoFiscal[];
  atualizadoEm: Date;
  atualizadoPor: string;
}

export interface MapeamentoFiscal {
  id: string;
  tipoOperacao: TipoOperacaoFiscal;
  ufDestino: string;
  tipoCliente: 'Contribuinte' | 'Nao Contribuinte' | 'Pessoa Fisica';
  cfopSugerido: string;
  cstSugerido: string;
  naturezaOperacao: string;
  aliquotaICMS?: number;
  observacoes?: string;
}

export interface ItemApontamento {
  itemId: string;
  descricao: string;
  quantidadeRemessa: number;
  quantidadeUtilizada: number;
  quantidadeNaoUtilizada: number;
  statusUso: 'Utilizado' | 'Nao Utilizado' | 'Parcial';
  observacoes?: string;
}

export interface ProdutoPedidoVenda {
  id: number;
  codigo: string;
  descricao: string;
  referencia?: string;
  unidade: string;
  quantidade: number;
  precoUnitario: number;
  desconto: number;
  precoFinal: number;
  subtotal: number;
  observacoes?: string;
}

export interface ItemUsoConsumoPedido {
  id: number;
  codigo: string;
  descricao: string;
  quantidade: number;
  categoria: string;
}

export interface AlertaPedidoVenda {
  tipo: 'mudanca_status' | 'emissao_nf' | 'atualizacao_entrega' | 'divergencia' | 'atraso';
  titulo: string;
  mensagem: string;
  dataAlerta: string;
  horaAlerta: string;
  prioridade: 'normal' | 'alta' | 'urgente';
}

export interface SolicitacaoAcaoFiscal {
  id: string;
  pedidoId: string;
  numeroPedido: string;
  tipo: 'nf_complementar' | 'carta_correcao' | 'devolucao' | 'cancelamento';
  justificativa: string;
  solicitadoPor: string;
  dataSolicitacao: string;
  horaSolicitacao: string;
  status: 'pendente' | 'aprovada' | 'rejeitada';
  aprovadoPor?: string;
  dataAprovacao?: string;
  motivoRejeicao?: string;
  observacoes?: string;
}

export interface ChecklistVenda {
  id: string;
  numeroPedido: string;
  cliente: string;
  cnpjCliente: string;
  vendedor: string;
  dataEmissaoPedido: string;
  dataFaturamento?: string;
  valorTotal: number;
  status: 'Aguardando' | 'Validando' | 'Liberado' | 'Faturado';
  
  estoqueValidado: boolean;
  servicosConcluidos: boolean;
  documentacaoCompleta: boolean;
  creditoAprovado: boolean;
  
  observacoes?: string;
  
  // Dados expandidos para visualização
  produtos?: ProdutoPedidoVenda[];
  itensUsoConsumo?: ItemUsoConsumoPedido[];
  
  // Informações NF
  deveEmitirNF?: boolean;
  naturezaOperacao?: string;
  descritivoOperacao?: string;
  finalidadeNF?: string;
  formaPagamento?: string;
  emailsNF?: string;
  condicoesPagamento?: string;
  destacarIR?: boolean;
  percentualIR?: number;
  informacoesComplementares?: string;
  contaBancariaRecebimento?: string;
  numeroParcelas?: number;
  instrucoesBoleto?: string;
  documentosNF?: string[];
  
  // Destinatário
  destinatario?: {
    razaoSocial: string;
    cnpjCpf: string;
    ieRg?: string;
    endereco: string;
    telefone: string;
    email: string;
  };
  
  // Frete
  tipoFrete?: string;
  prazoEntrega?: string;
  dataEntrega?: string;
  fretePagarPor?: string;
  freteRetirarPor?: string;
  entregarRetirarCuidados?: string;
  nomeCompletoRecebedor?: string;
  cpfRecebedor?: string;
  telefoneRecebedor?: string;
  emailRecebedor?: string;
  horariosPermitidos?: string;
  locaisEntrega?: string;
  enderecoEntrega?: string;
  maisInformacoesEntrega?: string;
  
  // Urgência
  solicitarUrgencia?: boolean;
  justificativaUrgencia?: string;
  urgenciaStatus?: 'pendente' | 'aprovada' | 'rejeitada';
  autorizadoPor?: string;
  dataAutorizacao?: string;
  emailAutorizador?: string;
  
  // Nota Fiscal (se já emitida)
  notaFiscal?: {
    numeroNF: string;
    serieNF: string;
    dataEmissao: string;
    valorTotal: number;
    chaveAcesso: string;
    protocoloSEFAZ: string;
    linkXML?: string;
    linkDANFE?: string;
  };
  
  // Logística
  logistica?: {
    transportadora: {
      nome: string;
      cnpj: string;
    };
    codigoRastreamento?: string;
    linkRastreamento?: string;
    statusEntrega: 'aguardando_coleta' | 'em_transito' | 'em_rota_entrega' | 'entregue' | 'devolvido';
    prazoEstimado: string;
    dataSaida?: string;
    previsaoEntrega?: string;
    dataEntregaEfetiva?: string;
  };
  
  // Alertas
  alertas?: AlertaPedidoVenda[];
}

export interface ServicoFaturamento {
  id: string;
  descricao: string;
  cliente: string;
  cnpjCliente?: string;
  valor: number;
  dataInicio: string;
  dataConclusao?: string;
  responsavel: string;
  emailResponsavel?: string;
  status: 'Iniciado' | 'Concluído' | 'Em Andamento' | 'Aprovado' | 'Faturado';
  
  // Detalhes do Serviço
  descricaoDetalhada?: string;
  escopo?: string;
  deliverables?: string[];
  observacoes?: string;
  
  // NFS-e
  numeroNFSe?: string;
  serieNFSe?: string;
  dataEmissaoNFSe?: string;
  chaveVerificacao?: string;
  codigoVerificacao?: string;
  linkPrefeitura?: string;
  
  // Arquivos da NFS-e
  arquivos?: ArquivoNFSe[];
  
  // Retenções
  valorISS?: number;
  aliquotaISS?: number;
  valorPIS?: number;
  valorCOFINS?: number;
  valorIR?: number;
  valorLiquido?: number;
  
  // Histórico de Solicitações
  solicitacoesAlteracao?: SolicitacaoAlteracaoServico[];
}

export interface ArquivoNFSe {
  id: string;
  tipo: 'XML' | 'PDF' | 'DANFSE';
  nomeArquivo: string;
  tamanho: number;
  dataUpload: string;
  uploadPor: string;
  url?: string;
}

export interface SolicitacaoAlteracaoServico {
  id: string;
  servicoId: string;
  solicitadoPor: string;
  emailSolicitante: string;
  dataSolicitacao: string;
  horaSolicitacao: string;
  motivoAlteracao: string;
  detalhesAlteracao: string;
  status: 'pendente' | 'em_analise' | 'aceita' | 'recusada';
  respostaDo?: string;
  dataResposta?: string;
  justificativaResposta?: string;
}

// Dashboard e Relatórios
export interface DashboardData {
  // Totalizadores
  faturamentoTotal: number;
  faturamentoProdutos: number;
  faturamentoServicos: number;
  totalNotas: number;
  pendenciasFiscais: number;
  
  // Comparativos
  variacaoMensal: number;
  variacaoAnual: number;
  
  // Por período
  faturamentoPorMes: FaturamentoMensal[];
  faturamentoPorAno: FaturamentoAnual[];
  
  // Análise de documentos
  notasEmitidas: NotaFiscalResumo;
  notasCanceladas: NotaCancelada[];
  notasDevolvidas: NotaDevolvida[];
  cartasCorrecao: CartaCorrecao[];
  
  // Detalhamentos
  faturamentoPorCliente: FaturamentoCliente[];
  faturamentoPorProduto: FaturamentoProduto[];
  faturamentoPorRegiao: FaturamentoRegiao[];
  
  // Impostos
  impostos: ImpostoDetalhado[];
  
  // Performance
  tempoMedioEmissao: TempoEmissao[];
  taxaAprovacao: number;
}

export interface NotaFiscalResumo {
  total: number;
  nfe: number;
  nfse: number;
  autorizadas: number;
  pendentes: number;
  rejeitadas: number;
  canceladas: number;
}

export interface NotaCancelada {
  numero: string;
  tipo: 'NF-e' | 'NFS-e';
  cliente: string;
  valor: number;
  dataCancelamento: string;
  motivoCancelamento: string;
  justificativa: string;
}

export interface NotaDevolvida {
  numero: string;
  tipo: 'NF-e' | 'NFS-e';
  cliente: string;
  valor: number;
  dataDevolucao: string;
  motivoDevolucao: string;
  statusProcessamento: 'processada' | 'em_processamento';
}

export interface CartaCorrecao {
  id: string;
  numeroNFe: string;
  cliente: string;
  valor: number;
  motivoCorrecao: string;
  dataCorrecao: string;
  numeroProtocolo: string;
}

export interface FaturamentoMensal {
  mes: string;
  ano: number;
  faturamento: number;
  quantidadeNotas: number;
  tempoMedio: number;
}

export interface FaturamentoAnual {
  ano: number;
  faturamento: number;
  quantidadeNotas: number;
  crescimento: number;
}

export interface FaturamentoCliente {
  cliente: string;
  cnpj: string;
  valorTotal: number;
  quantidadeNotas: number;
  ticketMedio: number;
  percentualTotal: number;
}

export interface FaturamentoProduto {
  descricao: string;
  codigo: string;
  quantidade: number;
  valorTotal: number;
  margem: number;
  percentualTotal: number;
}

export interface FaturamentoRegiao {
  regiao: string;
  quantidadeNotas: number;
  valorTotal: number;
  percentualTotal: number;
}

export interface ImpostoDetalhado {
  tipo: string;
  aliquotaMedia: number;
  valor: number;
  percentualTotal: number;
}

export interface TempoEmissao {
  mes: string;
  tempoMedio: number;
  meta: number;
}

export interface ProtocoloSefaz {
  id: string;
  documentoId: string;
  protocolo: string;
  dataEnvio: string;
  dataRetorno?: string;
  status: 'Autorizado' | 'Enviando' | 'Rejeitado';
  mensagem?: string;
  tentativas: number;
}

export interface TituloReceber {
  id: string;
  documentoFiscalId: string;
  numero: string;
  cliente: string;
  valor: number;
  vencimento: string;
  status: 'Aberto' | 'Pago' | 'Vencido';
  formaPagamento: string;
  condicoesPagamento: string;
}

export interface PedidoEntradaMercadoria {
  id: string;
  numeroPedido: string;
  tipo: 'Importacao' | 'Compra Nacional';
  fornecedor: string;
  cnpjFornecedor: string;
  
  // Campos de NF
  numeroNF?: string;
  chaveAcesso?: string;
  xmlNF?: string;
  dataEmissao: string;
  dataEntrada: string;
  
  // Campos específicos de importação
  statusImportacao?: StatusImportacao;
  numeroDI?: string;
  dataRegistroDI?: string;
  canalParametrizacao?: string;
  dataDesembaraco?: string;
  
  // Valores
  valorTotal: number;
  valorImpostos: number;
  categoria: 'Produto' | 'Servico';
  
  // Status do processo
  status: 'Aguardando Entrada' | 'NF Recebida' | 'Entrada Confirmada' | 'Cancelado';
  
  itens: ItemEntradaMercadoria[];
  observacoes?: string;
  
  // Campos de NF Complementar e Carta de Correção
  nfComplementar?: NFComplementar[];
  cartaCorrecao?: CartaCorrecaoEntrada[];
}

export interface ItemEntradaMercadoria {
  id: string;
  codigo: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  ncm?: string;
  cfop: string;
}

export interface NotificacaoEntrada {
  id: string;
  pedidoId: string;
  tipo: 'Produto' | 'Servico';
  prioridade: 'Alta' | 'Media' | 'Baixa';
  mensagem: string;
  dataNotificacao: Date;
  lida: boolean;
}

export interface NFComplementar {
  id: string;
  numeroNF: string;
  chaveAcesso: string;
  dataEmissao: string;
  motivo: string;
  valorComplementar: number;
  solicitadoPor: string;
  dataSolicitacao: string;
  aprovadoPor?: string;
  dataAprovacao?: string;
  status: 'Pendente Aprovacao' | 'Aprovado' | 'Rejeitado' | 'Emitido';
}

export interface CartaCorrecaoEntrada {
  id: string;
  numeroCC: string;
  dataEmissao: string;
  justificativa: string;
  correcao: string;
  solicitadoPor: string;
  dataSolicitacao: string;
  aprovadoPor?: string;
  dataAprovacao?: string;
  status: 'Pendente Aprovacao' | 'Aprovado' | 'Rejeitado' | 'Emitido';
  protocolo?: string;
}

export interface RelatorioFaturamentoDetalhado {
  periodo: { inicio: Date; fim: Date };
  totalFaturadoBruto: number;
  totalDevolucoes: number;
  totalFaturadoLiquido: number;
  totalImpostos: number;
  
  porTipoOperacao: {
    venda: { quantidade: number; valor: number };
    servico: { quantidade: number; valor: number };
    locacao: { quantidade: number; valor: number };
    outros: { quantidade: number; valor: number };
  };
  
  devolucoes: {
    quantidade: number;
    valorTotal: number;
    porMotivo: Array<{ motivo: string; quantidade: number; valor: number }>;
  };
  
  rejeicoesReincidentes: Array<{
    cfop: string;
    motivoRejeicao: string;
    ocorrencias: number;
    ultimaOcorrencia: Date;
  }>;
  
  complianceFiscal: {
    osTotais: number;
    osEmDia: number;
    osAtrasadas: number;
    equipamentosComRegime: number;
    equipamentosSemRegime: number;
  };
}
