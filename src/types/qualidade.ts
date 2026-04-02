// Tipos para o módulo de Qualidade

export interface PontoCritico {
  id: string;
  descricao: string;
  status?: 'Aprovado' | 'Reaprovado';
}

export interface AuditoriaQualidade {
  id: string;
  data: Date;
  auditorResponsavel: string;
  resultadoGeral: 'Aprovado' | 'Reprovado';
  pontosCriticos: PontoCritico[];
  oportunidadesMelhorias?: string;
  arquivo?: string;
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

export type OrigemNC = string;
export type TipoNC = string;
export type TipoNCEnum = 'Legal/Regulatória' | 'Processo/Operacional' | 'Produto' | 'Gestão' | 'Fornecedor' | 'Segurança/Meio Ambiente';
export type ImpactoNC = 'Crítico' | 'Moderado' | 'Leve';
export type StatusNC = 'Aberta' | 'Em Análise' | 'Aguardando CAPA' | 'Resolvida' | 'Fechada';
export type StatusCAPA = 'Pendente' | 'Em Andamento' | 'Concluída';

export interface ProdutoLiberacaoNC {
  id: string;
  codigo: string;
  referencia: string;
  nome: string;
  modelo: string;
  fabricante: string;
  marca: string;
  linhaProduto: string;
  apresentacao: ('primaria' | 'secundaria' | 'terciaria')[];
  numeroSerieLote: string;
  status: string;
  liberadoRT: boolean;
  dataLiberacao?: string;
}

export interface EquipamentoCAPADT {
  equipamentoId: string;
  numeroSerie: string;
  modelo: string;
  marca: string;
  dataAcaoPreventiva: string;
  dataAcaoCorretiva: string;
  descricaoCorretiva: string;
  prazoFinal: string;
  solucionado: 'Sim' | 'Não' | '';
  responsavel: string;
}

export interface CAPADT {
  clienteNome: string;
  tipoCliente: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpjCpf: string;
  cinRg: string;
  nomeMantenedor: string;
  cnpjMantenedor: string;
  equipamentos: EquipamentoCAPADT[];
}

export interface AcaoCAPA {
  id: string;
  acaoPreventiva: string;
  acaoCorretiva: string;
  gerenciamentoTarefas?: string;
  prazoFinal: Date;
  status: StatusCAPA;
  responsavel: string;
  capaDT?: CAPADT;
}

export interface NaoConformidade {
  id: string;
  numeroNC: string;
  origem: OrigemNC;
  tipo: TipoNC;
  tipos?: TipoNCEnum[];
  impacto: ImpactoNC;
  responsavel: string;
  responsaveis?: string[];
  prazo: Date;
  status: StatusNC;
  descricao: string;
  acaoImediata?: string;
  acaoImediataValidada?: boolean;
  acaoImediataValidadaPor?: string;
  acaoImediataValidadaEm?: string;
  acoesComplementares?: string;
  responsavelComplementar?: string;
  evidenciasTexto?: string;
  evidenciasArquivos?: File[];
  observacoesArquivos?: File[];
  acaoFinal?: string;
  acaoFinalValidada?: boolean;
  acaoFinalValidadaPor?: string;
  acaoFinalValidadaEm?: string;
  ncSolucionada?: string;
  dataEncerramento?: string;
  dataAcao?: string;
  observacoes?: string;
  capa?: AcaoCAPA;
  dataCriacao: Date;
  dataAtualizacao?: Date;
  // Campos condicionais Produto
  produtoCodigo?: string;
  produtoMarca?: string;
  produtoModelo?: string;
  produtoNomeFabricante?: string;
  // Campos condicionais Fornecedor
  fornecedorNomeFabricanteLegal?: string;
  fornecedorUnidadeFabril?: string;
  // Tabela de liberação
  produtosLiberacao?: ProdutoLiberacaoNC[];
}

// Tipos para Análise de Dados e Indicadores
export interface DadosNCMensal {
  mes: string;
  quantidade: number;
}

export interface DadosRetrabalho {
  tipo: string;
  valor: number;
  percentual: number;
}

export interface DadosEficienciaCAPA {
  tipo: string;
  quantidade: number;
}

export interface IndiceQualidadeFornecedor {
  id: string;
  nome: string;
  indiceQualidade: number;
  materiaisNaoConformes: number;
  totalMateriais: number;
}

export type StatusIntegracao = 'OK' | 'Alerta' | 'Erro' | 'Desativado';

export interface IntegracaoSensor {
  id: string;
  nome: string;
  tipo: string;
  status: StatusIntegracao;
  valor?: string;
  unidade?: string;
  limiteMin?: number;
  limiteMax?: number;
  ultimaAtualizacao: Date;
}
