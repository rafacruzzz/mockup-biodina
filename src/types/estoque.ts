
export interface PosicaoEstoque {
  id: number;
  produto_codigo: string;
  produto_descricao: string;
  lote: string;
  data_validade: string | null;
  cnpj: string;
  deposito: string;
  quantidade_disponivel: number;
  quantidade_reservada: number;
  quantidade_total: number;
  cmc_unitario: number;
  cmc_total: number;
  fornecedor: string;
  tipo_estoque: string;
  origem_entrada: string;
}

export interface MovimentacaoEstoque {
  id: number;
  tipo: 'entrada' | 'saida' | 'transferencia' | 'ajuste';
  produto_codigo: string;
  produto_descricao: string;
  lote: string;
  quantidade: number;
  data_movimentacao: string;
  documento: string;
  cnpj_origem?: string;
  cnpj_destino?: string;
  usuario: string;
}

export interface CNPJ {
  id: number;
  codigo: string;
  nome: string;
}

export interface Deposito {
  id: number;
  nome: string;
  cnpj_id: number;
}

export interface ItemMovimentacao {
  produto_codigo: string;
  produto_descricao: string;
  lote: string;
  data_validade: string | null;
  quantidade_disponivel: number;
  quantidade_movimentar: number;
  motivo_item?: string;
}

export interface FormMovimentacao {
  data_movimentacao: string;
  tipo_movimentacao: TipoMovimentacao;
  cnpj_origem: string;
  deposito_origem: string;
  cnpj_destino: string;
  deposito_destino: string;
  motivo_movimentacao: string;
  nf_vinculada?: string;
  pedido_vinculado?: string;
  responsavel: string;
  itens: ItemMovimentacao[];
}

export enum TipoMovimentacao {
  ENTRE_DEPOSITOS = 'entre_depositos',
  ENTRE_CNPJS = 'entre_cnpjs'
}

export interface SubModuleEstoque {
  name: string;
  data: any[];
}

export interface ModuleEstoque {
  name: string;
  icon: any;
  subModules: Record<string, SubModuleEstoque>;
}

export type EstoqueModulesConfig = Record<string, ModuleEstoque>;
