
export interface Emprestimo {
  id: number;
  numeroProcesso: string;
  cnpjCliente: string;
  nomeCliente: string;
  numeroDanfeEmprestimo: string;
  referenciaProdutoEmprestado: string;
  descricaoProdutoEmprestado: string;
  valorEmprestimoDolar: number;
  dataEmprestimo: string;
  dataSaida: string;
  numeroDanfeRetorno?: string;
  referenciaProdutoRecebido?: string;
  descricaoProdutoRecebido?: string;
  dataRetorno?: string;
  dataBaixa?: string;
  valorRetornadoDolar?: number;
  idImportacaoDireta?: string;
  status: EmprestimoStatus;
}

export enum EmprestimoStatus {
  ATIVO = 'ativo',
  DEVOLVIDO = 'devolvido',
  PARCIAL = 'parcial',
  VENCIDO = 'vencido'
}

export interface FiltrosEmprestimo {
  status?: EmprestimoStatus[];
  cliente?: string;
  dataInicio?: string;
  dataFim?: string;
  valorMinimo?: number;
  valorMaximo?: number;
  produto?: string;
}

export interface EstatisticasEmprestimo {
  totalEmprestimos: number;
  valorTotalEmprestado: number;
  valorTotalDevolvido: number;
  emprestimosAtivos: number;
  emprestimosVencidos: number;
}
