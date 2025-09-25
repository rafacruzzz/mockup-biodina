
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

// Novos tipos para expansão do módulo de importação/DI
export interface PagamentoImportacao {
  id: number;
  numero_pi: string;
  processo_importacao_id: number;
  fornecedor: string;
  valor_usd: number;
  valor_brl: number;
  data_vencimento: string;
  status_pagamento: 'pendente' | 'programado' | 'pago' | 'atrasado';
  forma_pagamento: 'antecipado' | 'prazo' | 'parcelado';
  prazo_dias: number;
  data_pagamento?: string;
  comprovantes: DocumentoImportacao[];
  observacoes?: string;
}

export interface ProcessoImportacao {
  id: number;
  numero_processo: string;
  numero_di: string;
  exportador: string;
  importador: string;
  valor_total_usd: number;
  valor_total_brl: number;
  status: 'iniciado' | 'documentos_pendentes' | 'em_transito' | 'desembaraco' | 'finalizado';
  data_inicio: string;
  data_chegada_prevista?: string;
  data_finalizacao?: string;
  documentos: DocumentoImportacao[];
  custos: CustoImportacao[];
  pagamentos: PagamentoImportacao[];
  fechamentos_cambio: FechamentoCambio[];
}

export interface DocumentoImportacao {
  id: number;
  tipo: 'PI' | 'DI' | 'contrato' | 'fatura' | 'swift' | 'contrato_cambio' | 'comprovante_bancario' | 'outros';
  nome: string;
  arquivo_url: string;
  data_upload: string;
  obrigatorio: boolean;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  observacoes?: string;
}

export interface FechamentoCambio {
  id: number;
  processo_importacao_id: number;
  numero_operacao: string;
  mesa_cambio: string;
  data_fechamento: string;
  valor_usd: number;
  taxa_cambio_dia: number;
  taxa_fechamento: number;
  valor_brl_fechado: number;
  status: 'pendente' | 'fechado' | 'liquidado';
  documentos: DocumentoImportacao[];
  observacoes?: string;
}

export interface CustoImportacao {
  id: number;
  processo_importacao_id: number;
  tipo_custo: 'frete_internacional' | 'frete_interno' | 'armazenagem' | 'despachante' | 'impostos' | 'taxas_diversas';
  descricao: string;
  fornecedor_custo: string;
  valor_previsto: number;
  valor_realizado?: number;
  data_previsao: string;
  data_pagamento?: string;
  status: 'previsto' | 'confirmado' | 'pago';
  observacoes?: string;
  vinculo_financeiro?: string; // ID da conta a pagar
}

export interface RelatorioImportacao {
  processo_id: number;
  custo_total_previsto: number;
  custo_total_realizado: number;
  variacao_percentual: number;
  status_geral: string;
  dias_processo: number;
  fornecedores_envolvidos: string[];
}

// Expandir submódulos existentes
export interface SubModuleCompras {
  name: string;
  data: any[];
  subSections?: SubSecaoImportacao[];
}

export interface SubSecaoImportacao {
  key: string;
  name: string;
  icon: any;
  description: string;
  data: any[];
}

export type ComprasModulesConfig = Record<string, ModuleCompras>;
