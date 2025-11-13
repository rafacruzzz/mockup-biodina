// Tipos para o módulo de Assessoria Científica

export type StatusOS = 
  | 'ABERTA' 
  | 'EM_ANDAMENTO' 
  | 'CONCLUÍDA' 
  | 'URGENTE' 
  | 'CANCELADA';

export type TipoOS = 
  | 'suporte_operacional'
  | 'acompanhamento_rotina'
  | 'treinamento_inicial'
  | 'treinamento_nova_equipe';

export type DepartamentoOS = 'Assessoria Científica' | 'Departamento Técnico';

export type OpcaoAtendimento = 'presencial' | 'remoto';

export type AbertoPor = 'Comercial' | 'DT' | 'Assessor';

export interface AssinaturaOS {
  nomeCliente: string;
  assinaturaCliente: string; // base64 da assinatura
  nomeAssessor: string;
  assinaturaAssessor: string; // base64 da assinatura
  data: Date;
}

export interface ApontamentoUsoOS {
  osId: string;
  dataApontamento: Date;
  tecnicoId: string;
  itensUtilizados: ItemApontamento[];
  itensNaoUtilizados: ItemApontamento[];
  observacoes?: string;
  statusAprovacao: 'Pendente' | 'Aprovado' | 'Rejeitado';
}

export interface ItemApontamento {
  itemId: string;
  descricao: string;
  quantidadeRemessa: number;
  quantidadeUtilizada: number;
  quantidadeNaoUtilizada: number;
  statusUso: 'Utilizado' | 'Nao Utilizado' | 'Parcial';
  observacoes?: string;
}

export interface VinculoOSRemessa {
  osId: string;
  numeroOS: string;
  dataRemessa: Date;
  itensRemessa: ItemApontamento[];
  statusBaixaFiscal: 'Pendente' | 'Concluida' | 'Vencida';
  prazoLimite: Date;
}

export interface OSPendenteBaixaFiscal {
  osId: string;
  numeroOS: string;
  tecnicoId: string;
  nomeTecnico: string;
  dataRemessa: Date;
  prazoLimite: Date;
  horasVencidas: number;
  statusBloqueio: 'Alerta' | 'Bloqueado' | 'Critico';
}

export interface OrdemServico {
  id: string;
  numero: string;
  tipo: TipoOS[];
  status: StatusOS;
  departamento: DepartamentoOS;
  cliente: string;
  clienteId?: string;
  equipamento?: string;
  equipamentoId?: string;
  numeroSerieLote?: string;
  versaoSoftware?: string;
  versaoWindows?: string;
  setorAlocacao?: string;
  opcaoAtendimento: OpcaoAtendimento;
  projeto?: string;
  projetoId?: string;
  descricaoServico: string;
  servicoRealizado?: string;
  dataAgendada: Date;
  dataInicio?: Date;
  dataConclusao?: Date;
  responsavel: string;
  responsavelId?: string;
  abertoPor: AbertoPor;
  abertoEm: Date;
  observacoes?: string;
  anexos?: string[];
  assinatura?: AssinaturaOS;
  atualizadoEm: Date;
  participantes?: string[]; // Para treinamentos
  
  // Novos campos para integração fiscal
  remessaFiscalId?: string;
  statusBaixaFiscal: 'Pendente' | 'Concluida' | 'Vencida' | 'Nao Aplicavel';
  dataRemessa?: Date;
  prazoLimiteBaixaFiscal?: Date;
  apontamentoUso?: ApontamentoUsoOS;
  nfRemessaId?: string;
  nfDevolucaoId?: string;
  nfAutoConsumoId?: string;
}

export interface FiltrosAgenda {
  departamentos: DepartamentoOS[];
  assessores: string[];
  clientes: string[];
  equipamentos: string[];
  status: StatusOS[];
  dataInicio?: Date;
  dataFim?: Date;
}

export type TipoAlerta = 'prazo' | 'acompanhamento' | 'urgente';

export interface Alerta {
  id: string;
  tipo: TipoAlerta;
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  link?: string;
  osId?: string;
  clienteId?: string;
  dataCriacao: Date;
}
