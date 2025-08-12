
export interface Emprestimo {
  id: string;
  numero_processo: string;
  cliente_cnpj: string;
  cliente_nome: string;
  danfe_emprestimo?: string;
  ref_produto_emprestado: string;
  desc_produto_emprestado?: string;
  valor_emprestimo_dolar: number;
  data_emprestimo: string;
  data_saida?: string;
  id_importacao_direta?: string;
  observacoes?: string;
  created_at: string;
  updated_at: string;
}

export interface EmprestimoResumo extends Emprestimo {
  total_retornado: number;
  saldo: number;
  status: 'Ativo' | 'Quitado' | 'Vencido';
}

export interface EmprestimoDevolucao {
  id: string;
  emprestimo_id: string;
  danfe_retorno?: string;
  ref_produto_recebido: string;
  desc_produto_recebido?: string;
  valor_retornado_dolar: number;
  data_retorno: string;
  data_baixa?: string;
  observacoes?: string;
  created_at: string;
  updated_at: string;
}
