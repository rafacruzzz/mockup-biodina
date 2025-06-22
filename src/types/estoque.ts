
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
