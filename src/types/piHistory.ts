export interface PIHistoryItem {
  id: string;
  cnpjSelecionado: string;
  dataEnvio: Date;
  status: 'enviado' | 'aceito' | 'rejeitado' | 'em_analise';
  observacoes?: string;
}

export type PIStatus = 'draft' | 'enviado' | 'aceito' | 'rejeitado' | 'em_analise';