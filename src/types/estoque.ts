
export interface MovimentacaoEstoque {
  id: number;
  tipo: 'entrada' | 'saida' | 'transferencia' | 'ajuste';
  produto_codigo: string;
  produto_descricao: string;
  lote: string;
  quantidade: number;
  data_movimentacao: string;
  documento: string;
  deposito_origem?: string;
  deposito_destino?: string;
  motivo?: string;
  usuario: string;
}

export interface PosicaoEstoque {
  id: number;
  produto_codigo: string;
  produto_descricao: string;
  lote: string;
  data_validade: string;
  deposito: string;
  localizacao: string;
  quantidade_disponivel: number;
  quantidade_reservada: number;
  quantidade_total: number;
  cmc_unitario: number;
  cmc_total: number;
  estoque_minimo: number;
  estoque_maximo: number;
}

export interface AjusteEstoque {
  id: number;
  produto_codigo: string;
  produto_descricao: string;
  lote: string;
  deposito: string;
  quantidade_sistema: number;
  quantidade_fisica: number;
  diferenca: number;
  motivo: string;
  data_ajuste: string;
  usuario: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
}

export interface TransferenciaEstoque {
  id: number;
  numero_transferencia: string;
  data_transferencia: string;
  deposito_origem: string;
  deposito_destino: string;
  usuario_solicitante: string;
  status: 'pendente' | 'em_transito' | 'concluida' | 'cancelada';
  observacoes?: string;
  itens: ItemTransferencia[];
}

export interface ItemTransferencia {
  id: number;
  produto_codigo: string;
  produto_descricao: string;
  lote: string;
  quantidade_solicitada: number;
  quantidade_transferida: number;
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
