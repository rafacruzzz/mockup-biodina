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
