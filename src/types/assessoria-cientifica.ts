// Tipos para o módulo de Assessoria Científica

export type StatusOS = 
  | 'ABERTA' 
  | 'EM_ANDAMENTO' 
  | 'CONCLUÍDA' 
  | 'URGENTE' 
  | 'CANCELADA';

export type TipoOS = 
  | 'treinamento_inicial'
  | 'treinamento_avancado'
  | 'suporte_tecnico'
  | 'visita_rotina'
  | 'manutencao_preventiva'
  | 'manutencao_corretiva'
  | 'instalacao'
  | 'analise_tecnica'
  | 'consultoria';

export type DepartamentoOS = 'Assessoria Científica' | 'Departamento Técnico';

export interface OrdemServico {
  id: string;
  numero: string;
  tipo: TipoOS;
  status: StatusOS;
  departamento: DepartamentoOS;
  cliente: string;
  clienteId?: string;
  equipamento?: string;
  equipamentoId?: string;
  projeto?: string;
  projetoId?: string;
  descricao: string;
  dataAgendada: Date;
  dataInicio?: Date;
  dataConclusao?: Date;
  responsavel: string;
  responsavelId?: string;
  local?: string;
  observacoes?: string;
  anexos?: string[];
  criadoPor: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface FiltrosAgenda {
  departamentos: DepartamentoOS[];
  assessores: string[];
  clientes: string[];
  status: StatusOS[];
  dataInicio?: Date;
  dataFim?: Date;
}
