// Tipos para o módulo de Rastreabilidade de Equipamentos

export type StatusEquipamento = 'ativo' | 'inativo' | 'manutencao' | 'emprestimo';

export interface Equipamento {
  id: string;
  modelo: string;
  numeroSerie: string;
  lote: string;
  clienteAtual: string;
  clienteAtualId?: string;
  setorAlocacao: string;
  responsavelCliente: string;
  contatoTelefone?: string;
  contatoEmail?: string;
  status: StatusEquipamento;
  
  // Dados de origem e venda
  dataFabricacao: Date;
  dataValidade?: Date;
  dataImportacao: Date;
  statusOrigem: 'novo' | 'refurbished';
  
  // Informações técnicas
  versaoSoftware?: string;
  versaoWindows?: string;
  
  // Para busca
  searchableText?: string;
}

export interface MovimentacaoEquipamento {
  id: string;
  equipamentoId: string;
  data: Date;
  tipo: 'instalacao' | 'transferencia' | 'retirada' | 'devolucao';
  origem?: string;
  destino: string;
  responsavel: string;
  observacoes?: string;
}

export interface EstatisticasEquipamento {
  totalOS: number;
  totalTreinamentos: number;
  totalManutencoes: number;
  tempoMedioEntrefalhas?: number; // em dias
  ultimaIntervencao?: Date;
}
