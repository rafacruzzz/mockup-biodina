
export type EmprestimoStatus = 'ATIVO' | 'PARCIAL' | 'QUITADO' | 'EM_DEBITO' | 'EM_SUPERAVIT';

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
  updated_at?: string;
}

export interface DevolucaoEmprestimo {
  id: string;
  emprestimo_id: string;
  danfe_retorno?: string;
  ref_produto_recebido: string;
  desc_produto_recebido?: string;
  data_retorno: string;
  data_baixa?: string;
  valor_retornado_dolar: number;
  observacoes?: string;
  created_at: string;
}

export interface EmprestimoResumo extends Emprestimo {
  total_retornado: number;
  saldo: number;
  status: EmprestimoStatus;
  devolucoes?: DevolucaoEmprestimo[];
}

export interface NovoEmprestimoData {
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
}

export interface NovaDevolucaoData {
  emprestimo_id: string;
  danfe_retorno?: string;
  ref_produto_recebido: string;
  desc_produto_recebido?: string;
  data_retorno: string;
  data_baixa?: string;
  valor_retornado_dolar: number;
  observacoes?: string;
}
