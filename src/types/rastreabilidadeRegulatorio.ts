// Tipos para o módulo de Rastreabilidade Regulatório

export interface EquipamentoRegulatorio {
  id: string;
  
  // CADASTRO
  codigo: string;
  linhaProduto: string;
  marca: string;
  modelo: string;
  nomeProduto: string;
  
  // COMEX
  numeroSerie: string;
  novoOuRefurbished: 'novo' | 'refurbished';
  dataImportacao: Date;
  compradoComRegimeEspecial: boolean; // A partir de 14/04/2021
  lote: string;
  quantidadeImportadaLote: number;
  dataFabricacao: Date;
  dataValidade?: Date;
  
  // VENDAS
  quantidadeVendida: number;
  localizacao: string;
  mantenedora: string;
  cliente: string;
  clienteId: string;
  uf: string;
  
  // DT (Departamento Técnico)
  dataInstalacao: Date;
  versaoSoftware: string;
  dataAtualizacaoSoftware?: Date;
  versaoWindows: string;
  
  // VENDAS / DT / Assessoria Científica
  setorAlocacao: string;
  pessoaResponsavelSetor: string;
  telefoneResponsavel?: string;
  emailResponsavel: string;
  
  // Status
  status: 'ativo' | 'inativo' | 'manutencao' | 'emprestimo';
}

export interface MovimentacaoRegulatorio {
  id: string;
  equipamentoId: string;
  data: Date;
  tipo: 'importacao' | 'venda' | 'instalacao' | 'transferencia' | 'devolucao' | 'manutencao' | 'atualizacao_software';
  origem?: string;
  destino?: string;
  responsavel: string;
  observacoes?: string;
}

export interface AlertaRegulatorio {
  id: string;
  equipamentoId: string;
  tipo: 'vencimento' | 'manutencao' | 'software_desatualizado' | 'regime_especial';
  mensagem: string;
  dataCriacao: Date;
  prioridade: 'alta' | 'media' | 'baixa';
  lido: boolean;
}

export interface ResultadoBuscaRegulatorio {
  equipamentos: EquipamentoRegulatorio[];
  modelos: string[];
  clientes: { id: string; nome: string }[];
  lotes: string[];
}
