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

// ========== TIPOS PARA CHAMADOS ==========

export type StatusChamado = 
  | 'ABERTO'
  | 'EM_ANALISE'
  | 'EM_EXECUCAO'
  | 'AGUARDANDO_CLIENTE'
  | 'AGUARDANDO_AREA'
  | 'RESOLVIDO'
  | 'FECHADO'
  | 'ENCERRADO';

export type OrigemChamado = 'Vendas' | 'Assessoria Científica' | 'Departamento Técnico';
export type DestinoChamado = 'Vendas' | 'Assessoria Científica' | 'Departamento Técnico';

export type TipoChamado =
  | 'tecnico'
  | 'cientifico'
  | 'comercial'
  | 'treinamento_inicial'
  | 'treinamento_reciclagem'
  | 'calibracao'
  | 'manutencao'
  | 'software'
  | 'contratual'
  | 'movimentacao_material'
  | 'outro';

export type UrgenciaChamado = 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export interface EvidenciaChamado {
  id: string;
  tipo: 'foto' | 'video' | 'log' | 'documento';
  url: string;
  nomeArquivo: string;
  descricao?: string;
  dataUpload: Date;
  uploadPorNome: string;
}

export interface InteracaoChamado {
  id: string;
  autorNome: string;
  autorId: string;
  autorDepartamento: OrigemChamado;
  acao: string;
  mensagem: string;
  data: Date;
  statusAnterior?: StatusChamado;
  statusNovo?: StatusChamado;
  evidencias?: EvidenciaChamado[];
}

export interface ChamadoAssessoria {
  id: string;
  numeroChamado: string;
  numeroOS: string;
  
  projetoId: string;
  projetoMaeNumero: string;
  clienteId: string;
  clienteNome: string;
  equipamentoId?: string;
  equipamentoModelo?: string;
  numeroSerieLote?: string;
  
  origem: OrigemChamado;
  destino: DestinoChamado;
  abertoPorNome: string;
  abertoPorId: string;
  abertoPorDepartamento: OrigemChamado;
  responsavelAtualNome?: string;
  responsavelAtualId?: string;
  assessorVinculadoId?: string;
  assessorVinculadoNome?: string;
  
  tipo: TipoChamado;
  motivoDescricao: string;
  urgencia: UrgenciaChamado;
  estrategiaResolucao?: string;
  resultadoFinal?: string;
  
  status: StatusChamado;
  dataAbertura: Date;
  dataAtribuicao?: Date;
  dataResolucao?: Date;
  dataEncerramento?: Date;
  prazoEstimado?: Date;
  
  interacoes: InteracaoChamado[];
  evidencias?: EvidenciaChamado[];
  
  assinaturaCliente?: string;
  assinaturaAssessor?: string;
  dataAssinaturaCliente?: Date;
  dataAssinaturaAssessor?: Date;
  
  criadoEm: Date;
  atualizadoEm: Date;
}

export const TIPO_CHAMADO_LABELS: Record<TipoChamado, string> = {
  tecnico: 'Técnico',
  cientifico: 'Científico',
  comercial: 'Comercial',
  treinamento_inicial: 'Treinamento Inicial',
  treinamento_reciclagem: 'Treinamento Reciclagem',
  calibracao: 'Calibração',
  manutencao: 'Manutenção',
  software: 'Software',
  contratual: 'Contratual',
  movimentacao_material: 'Movimentação de Material',
  outro: 'Outro'
};

export const STATUS_CHAMADO_LABELS: Record<StatusChamado, string> = {
  ABERTO: 'Aberto',
  EM_ANALISE: 'Em Análise',
  EM_EXECUCAO: 'Em Execução',
  AGUARDANDO_CLIENTE: 'Aguardando Cliente',
  AGUARDANDO_AREA: 'Aguardando Área',
  RESOLVIDO: 'Resolvido',
  FECHADO: 'Fechado',
  ENCERRADO: 'Encerrado'
};

export const URGENCIA_CHAMADO_LABELS: Record<UrgenciaChamado, string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
  URGENTE: 'Urgente'
};

export const isStatusAtivo = (status: StatusChamado): boolean => {
  return status !== 'FECHADO' && status !== 'ENCERRADO';
};
