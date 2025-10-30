// Tipos para o módulo de Rastreabilidade

export type StatusEquipamento = 'ativo' | 'inativo' | 'manutencao';

export interface Equipamento {
  id: string;
  numeroSerie: string;
  modelo: string;
  marca: string;
  cliente: string;
  clienteId: string;
  localizacao: string;
  setor: string;
  dataInstalacao: Date;
  status: StatusEquipamento;
  ultimaManutencao?: Date;
  proximaManutencao?: Date;
  versaoSoftware?: string;
  versaoWindows?: string;
  observacoes?: string;
}

export interface HistoricoIntervencao {
  id: string;
  equipamentoId: string;
  osId: string;
  osNumero: string;
  tipo: 'instalacao' | 'treinamento' | 'manutencao_preventiva' | 'manutencao_corretiva' | 'atualizacao' | 'desinstalacao';
  departamento: 'Assessoria Científica' | 'Departamento Técnico';
  data: Date;
  responsavel: string;
  descricao: string;
  observacoes?: string;
}

export interface ResultadoBusca {
  equipamentos: Equipamento[];
  modelos: string[];
  clientes: { id: string; nome: string }[];
}
