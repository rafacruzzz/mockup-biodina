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

export interface ChecklistVenda {
  id: string;
  pedidoId: string;
  cliente: string;
  vendedor: string;
  valor: number;
  dataConfirmacao: string;
  estoqueValidado: boolean;
  servicosConcluidos: boolean;
  documentacaoCompleta: boolean;
  status: 'Liberado' | 'Validando' | 'Aguardando';
}

export interface ServicoFaturamento {
  id: string;
  descricao: string;
  cliente: string;
  valor: number;
  dataInicio: string;
  dataConclusao?: string;
  responsavel: string;
  status: 'Concluído' | 'Em Andamento' | 'Aprovado';
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
