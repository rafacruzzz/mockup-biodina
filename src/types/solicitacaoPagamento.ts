export interface SolicitacaoPagamento {
  id: string;
  departamentoSolicitante: string;
  solicitadoPor: string;
  autorizadoPor: string;
  fornecedor: string;
  descricao: string;
  valor: number;
  dataVencimento: Date;
  status: 'pendente_analise' | 'aceita' | 'rejeitada';
  notaFiscalUrl?: string;
  emailsTrocados: string[];
  anexos: string[];
  urgente: boolean; // calculado automaticamente: dataVencimento <= hoje
  createdAt: Date;
}
