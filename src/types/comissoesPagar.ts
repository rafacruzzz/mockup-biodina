export interface ComissaoPagar {
  id: string;
  vendedor: string;
  vendaId: string;
  cliente: string;
  valorVenda: number;
  percentualComissao: number;
  valorComissao: number;
  observacoes: string;
  status: 'Calculado' | 'Pago' | 'Pendente Aprovação' | 'Pendente Pagamento';
  periodoCalculo: string;
  dataVenda: string;
  // Pagamento
  dataPagamento?: string;
  bancoPagamento?: string;
  agenciaPagamento?: string;
  contaPagamento?: string;
  multa?: number;
  juros?: number;
  desconto?: number;
  // Origem
  origemContasReceber: boolean;
}
