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
  status: 'Rascunho' | 'Emitido' | 'Autorizado' | 'Cancelado' | 'Rejeitado';
  protocolo?: string;
  chaveAcesso?: string;
  cfop: string;
  naturezaOperacao: string;
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
  status: 'Aguardando' | 'Validando' | 'Liberado' | 'Rejeitado';
  observacoes?: string;
}

export interface ValidacaoFiscal {
  cfop: string;
  cst: string;
  aliquotaIcms: number;
  aliquotaIpi: number;
  aliquotaPis: number;
  aliquotaCofins: number;
  retencaoIss: number;
  retencaoIr: number;
  retencaoPis: number;
  retencaoCofins: number;
  regimeTributario: 'Simples' | 'Presumido' | 'Real';
  estado: string;
  municipio: string;
}

export interface ProtocoloSefaz {
  id: string;
  documentoId: string;
  protocolo: string;
  dataEnvio: string;
  dataRetorno?: string;
  status: 'Enviando' | 'Processando' | 'Autorizado' | 'Rejeitado' | 'Erro';
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

export interface ServicoFaturamento {
  id: string;
  descricao: string;
  cliente: string;
  valor: number;
  dataInicio: string;
  dataConclusao?: string;
  responsavel: string;
  status: 'Iniciado' | 'Em Andamento' | 'Concluído' | 'Aprovado' | 'Faturado';
  observacoes?: string;
}

export interface RelatorioFaturamento {
  periodo: string;
  totalFaturado: number;
  totalCancelado: number;
  totalImpostos: number;
  documentosEmitidos: number;
  documentosCancelados: number;
  tempoMedioEmissao: number;
  faturamentoPorCliente: Array<{
    cliente: string;
    valor: number;
    documentos: number;
  }>;
  faturamentoPorProduto: Array<{
    produto: string;
    valor: number;
    quantidade: number;
  }>;
}