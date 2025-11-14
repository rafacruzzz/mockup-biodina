// Tipos para o módulo de Qualidade

export interface PontoCritico {
  id: string;
  descricao: string;
  status: 'Aprovado' | 'Reaprovado';
}

export interface AuditoriaQualidade {
  id: string;
  data: Date;
  auditorResponsavel: string;
  resultadoGeral: 'Aprovado' | 'Reprovado';
  pontosCriticos: PontoCritico[];
  observacoes?: string;
}

export interface AlertaSatisfacao {
  id: string;
  categoria: string;
  percentual: number;
  descricao: string;
}

export interface PesquisaSatisfacao {
  percentualSatisfacao: number;
  percentualLimite: number;
  alertas: AlertaSatisfacao[];
  ultimaAtualizacao: Date;
}

export interface RegistroRastreabilidade {
  id: string;
  lote: string;
  ordemServico: string;
  tipoOS: 'Entrada' | 'Saída';
  material: string;
  dataHora: Date;
  responsavel: string;
  observacoes?: string;
}

export type OrigemNC = 'Pesquisa' | 'Auditoria' | 'Outro';
export type TipoNC = 'Material Não Conforme' | 'Atendimento' | 'Treinamento Falho';
export type ImpactoNC = 'Crítico' | 'Moderado' | 'Baixo';
export type StatusNC = 'Aberta' | 'Em Análise' | 'Aguardando CAPA' | 'Resolvida' | 'Fechada';
export type StatusCAPA = 'Pendente' | 'Em Andamento' | 'Concluída';

export interface AcaoCAPA {
  id: string;
  acaoPreventiva: string;
  acaoCorretiva: string;
  prazoFinal: Date;
  status: StatusCAPA;
  responsavel: string;
}

export interface NaoConformidade {
  id: string;
  numeroNC: string;
  origem: OrigemNC;
  tipo: TipoNC;
  impacto: ImpactoNC;
  responsavel: string;
  prazo: Date;
  status: StatusNC;
  descricao: string;
  acaoImediata?: string;
  capa?: AcaoCAPA;
  dataCriacao: Date;
  dataAtualizacao?: Date;
}
