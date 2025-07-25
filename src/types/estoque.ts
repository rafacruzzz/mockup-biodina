export interface PosicaoEstoque {
  id: number;
  produto_codigo: string;
  produto_descricao: string;
  lote: string;
  data_validade: string | null;
  cnpj: string;
  cnpj_estado: string;
  deposito: string;
  localizacao_fisica: string;
  numero_serie: string | null;
  quantidade_disponivel: number;
  quantidade_reservada: number;
  quantidade_total: number;
  cmc_unitario: number;
  cmc_total: number;
  fornecedor: string;
  tipo_estoque: string;
  origem_entrada: string;
  status_qualidade: StatusQualidade;
  dias_para_vencimento: number | null;
}

export enum StatusQualidade {
  APROVADO = 'aprovado',
  QUARENTENA = 'quarentena',
  REJEITADO = 'rejeitado',
  LIBERADO = 'liberado'
}

export interface HistoricoMovimentacao {
  id: number;
  data: string;
  tipo: string;
  quantidade: number;
  documento: string;
  usuario: string;
  observacoes?: string;
}

export interface PedidoVinculado {
  id: number;
  numero_pedido: string;
  cliente: string;
  quantidade_solicitada: number;
  data_entrega: string;
  status: string;
}

export interface AlertaEstoque {
  tipo: 'vencimento' | 'estoque_baixo' | 'qualidade';
  mensagem: string;
  prioridade: 'alta' | 'media' | 'baixa';
}

export interface MovimentacaoEstoque {
  id: number;
  tipo: 'entrada' | 'saida' | 'transferencia' | 'ajuste';
  tipo_interno: TipoMovimentacaoHistorico;
  produto_codigo: string;
  produto_descricao: string;
  lote: string;
  quantidade: number;
  data_movimentacao: string;
  documento: string;
  cnpj_origem?: string;
  cnpj_destino?: string;
  deposito_origem?: string;
  deposito_destino?: string;
  usuario: string;
  status: StatusMovimentacao;
  nf_vinculada?: string;
  pedido_vinculado?: string;
  produtos_adicionais?: number;
}

export enum StatusMovimentacao {
  PENDENTE = 'pendente',
  CONCLUIDA = 'concluida',
  CANCELADA = 'cancelada'
}

export enum TipoMovimentacaoHistorico {
  INTERNA = 'interna',
  ENTRE_CNPJS = 'entre_cnpjs'
}

export interface CNPJ {
  id: number;
  codigo: string;
  nome: string;
  estado: string;
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

export interface PedidoSeparacao {
  id: number;
  numero_pedido: string;
  nop: string;
  vendedor: string;
  cliente: string;
  endereco_cliente: string;
  cliente_estado: string;
  data_entrega: string;
  status: StatusSeparacao;
  regiao: string;
  transportadora?: string;
  observacoes?: string;
  quantidade_volumes?: number;
  peso_bruto?: number;
  peso_liquido?: number;
  itens: ItemPedidoSeparacao[];
  progresso: {
    separados: number;
    total: number;
  };
}

export interface ItemPedidoSeparacao {
  id: number;
  codigo_produto: string;
  descricao_produto: string;
  quantidade_solicitada: number;
  quantidade_separada: number;
  status: StatusItemSeparacao;
  observacoes_item?: string;
  estoques_disponiveis?: EstoqueDisponivel[];
  lote?: string;
  numero_serie?: string;
  data_validade?: string | null;
}

export interface EstoqueDisponivel {
  id: number;
  cnpj: string;
  cnpj_estado: string;
  deposito: string;
  lote: string;
  data_validade: string | null;
  localizacao_fisica: string;
  quantidade_disponivel: number;
  tipo_estoque: string;
  numero_serie?: string;
  dias_para_vencimento?: number;
}

export interface SolicitacaoReposicao {
  item_id: number;
  motivo: string;
  notificar_vendedor: boolean;
  data_solicitacao: string;
  solicitante: string;
}

export enum StatusSeparacao {
  SEPARADO = 'separado',
  SEPARADO_PARCIAL = 'separado_parcial',
  INDISPONIVEL = 'indisponivel',
  PLANEJADO = 'planejado',
  FINALIZADO = 'finalizado',
  SOLICITADO = 'solicitado'
}

export enum StatusItemSeparacao {
  PENDENTE = 'pendente',
  SEPARADO = 'separado',
  INDISPONIVEL = 'indisponivel',
  PARCIAL = 'parcial'
}

export interface ProdutoEmprestimo {
  id: number;
  produto_codigo: string;
  lote: string;
  quantidade: number;
  cliente_fornecedor: string;
  tipo_vinculo: 'cliente' | 'fornecedor';
  data_emprestimo: string;
  data_devolucao?: string;
  status: StatusEmprestimo;
  motivo: string;
  responsavel: string;
  observacoes?: string;
}

export interface LogAuditoria {
  id: number;
  produto_codigo: string;
  lote: string;
  campo_alterado: string;
  valor_anterior: string;
  valor_novo: string;
  data_alteracao: string;
  usuario: string;
  justificativa: string;
  tipo_operacao: 'manual' | 'automatica' | 'correcao';
}

export interface KitDesmembrado {
  id: number;
  kit_codigo: string;
  kit_descricao: string;
  quantidade_kit: number;
  data_desmembramento: string;
  usuario: string;
  itens_resultantes: ItemDesmembrado[];
  observacoes?: string;
}

export interface ItemDesmembrado {
  codigo: string;
  descricao: string;
  quantidade: number;
  lote_gerado: string;
}

export enum StatusEmprestimo {
  EM_DEBITO = 'em_debito',
  QUITADO = 'quitado',
  PARCIAL = 'parcial',
  VENCIDO = 'vencido'
}

export enum TipoOperacaoAuditoria {
  AJUSTE_MANUAL = 'ajuste_manual',
  CORRECAO_INVENTARIO = 'correcao_inventario',
  TRANSFERENCIA_EMERGENCIAL = 'transferencia_emergencial'
}
