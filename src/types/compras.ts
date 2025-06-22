
export interface ItemPedido {
  id: number;
  codigo: string;
  descricao: string;
  lote: string;
  data_validade: string;
  numero_serie: string;
  deposito: string;
  localizacao: string;
  quantidade: number;
}

export interface Pedido {
  id: number;
  numero_pedido: string;
  hop: string;
  vendedor: string;
  cliente: string;
  data_entrega: string;
  transportadora: string;
  regiao: string;
  status: string;
  // Campos de detalhes
  bairro?: string;
  cidade?: string;
  cep?: string;
  peso_bruto?: number;
  peso_liquido?: number;
  itens?: ItemPedido[];
}

export interface CompraFiscal {
  id: number;
  numero_nf: string;
  fornecedor: string;
  data_emissao: string;
  valor_nf: number;
  impostos: number;
  cfop: string;
  status_fiscal: string;
}

export interface DI {
  id: number;
  numero_di: string;
  data_registro: string;
  exportador: string;
  valor_usd: number;
  taxa_cambio: number;
  impostos_importacao: number;
  status: string;
}

export interface SubModuleCompras {
  name: string;
  data: any[];
}

export interface ModuleCompras {
  name: string;
  icon: any;
  subModules: Record<string, SubModuleCompras>;
}

export type ComprasModulesConfig = Record<string, ModuleCompras>;
