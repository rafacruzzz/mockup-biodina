
export interface SolicitacaoAlteracao {
  id: string;
  colaboradorId: string;
  protocolo: string;
  campo: string;
  aba: string;
  valorAtual: string;
  valorSolicitado: string;
  motivo: string;
  tipoSolicitacao: 'correcao' | 'atualizacao' | 'inclusao' | 'exclusao';
  dataSolicitacao: string;
  status: 'pendente' | 'em-analise' | 'aprovada' | 'rejeitada';
  observacoesRH?: string;
  dataProcessamento?: string;
  processadoPor?: string;
}
