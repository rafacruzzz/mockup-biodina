
export enum TipoChamado {
  ASSESSORIA_CIENTIFICA = 'assessoria_cientifica',
  DEPARTAMENTO_TECNICO = 'departamento_tecnico',
  INTERFACE_TI = 'interface_ti',
  FINANCEIRO = 'financeiro',
  ESTOQUE = 'estoque'
}

export enum SubtipoChamadoFinanceiro {
  REQUISICAO_COMPRAS = 'requisicao_compras',
  REQUISICAO_SERVICOS = 'requisicao_servicos',
  POSICAO_COBRANCA = 'posicao_cobranca'
}

export enum StatusChamado {
  ABERTO = 'aberto',
  RESPONDIDO = 'respondido',
  FINALIZADO = 'finalizado'
}

export interface Chamado {
  id: string;
  tipo: TipoChamado;
  subtipo?: SubtipoChamadoFinanceiro;
  descricao: string;
  status: StatusChamado;
  dataAbertura: string;
  dataResposta?: string;
  dataFinalizacao?: string;
  responsavel?: string;
  observacoes?: string;
}

export const TIPOS_CHAMADO_LABELS = {
  [TipoChamado.ASSESSORIA_CIENTIFICA]: 'Assessoria Científica',
  [TipoChamado.DEPARTAMENTO_TECNICO]: 'Departamento Técnico',
  [TipoChamado.INTERFACE_TI]: 'Interface (TI)',
  [TipoChamado.FINANCEIRO]: 'Financeiro',
  [TipoChamado.ESTOQUE]: 'Estoque'
};

export const SUBTIPOS_FINANCEIRO_LABELS = {
  [SubtipoChamadoFinanceiro.REQUISICAO_COMPRAS]: 'Requisição de Compras (contas a pagar)',
  [SubtipoChamadoFinanceiro.REQUISICAO_SERVICOS]: 'Requisição Serviços (contas a pagar)',
  [SubtipoChamadoFinanceiro.POSICAO_COBRANCA]: 'Posição Cobrança (contas a receber)'
};

export const STATUS_CHAMADO_LABELS = {
  [StatusChamado.ABERTO]: 'Aberto',
  [StatusChamado.RESPONDIDO]: 'Respondido',
  [StatusChamado.FINALIZADO]: 'Finalizado'
};
