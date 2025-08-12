
export interface Emprestimo {
  id: number;
  numero_processo: string;
  cnpj_cliente: string;
  nome_cliente: string;
  numero_danfe_emprestimo: string;
  referencia_produto_emprestado: string;
  descricao_produto_emprestado: string;
  valor_emprestimo_dolar: number;
  data_emprestimo: string;
  data_saida: string;
  numero_danfe_retorno?: string;
  referencia_produto_recebido?: string;
  descricao_produto_recebido?: string;
  data_retorno?: string;
  data_baixa?: string;
  valor_retornado_dolar?: number;
  id_importacao_direta?: number;
  status: StatusEmprestimo;
  saldo_devedor?: number;
}

export enum StatusEmprestimo {
  ATIVO = 'ativo',
  PARCIALMENTE_DEVOLVIDO = 'parcialmente_devolvido',
  QUITADO = 'quitado',
  VENCIDO = 'vencido'
}

export interface NovoEmprestimo {
  cnpj_cliente: string;
  nome_cliente: string;
  numero_danfe_emprestimo: string;
  referencia_produto_emprestado: string;
  descricao_produto_emprestado: string;
  valor_emprestimo_dolar: number;
  data_emprestimo: string;
  data_saida: string;
  id_importacao_direta?: number;
}

export interface DevolucaoEmprestimo {
  emprestimo_id: number;
  numero_danfe_retorno: string;
  referencia_produto_recebido: string;
  descricao_produto_recebido: string;
  data_retorno: string;
  valor_retornado_dolar: number;
}
