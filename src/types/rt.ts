// Tipos para o módulo de Responsabilidade Técnica (RT)

// Estrutura de pastas e arquivos para documentação
export interface ArquivoRT {
  id: string;
  nome: string;
  tipo: string;
  tamanho: number;
  dataUpload: string;
  url?: string;
}

export interface PastaRT {
  id: string;
  nome: string;
  subtitulo?: string;
  codigo?: string;
  data?: string;
  pastaId?: string | null; // ID da pasta pai
  arquivos: ArquivoRT[];
  subPastas?: PastaRT[];
  expandido?: boolean;
}

// Controle de Mudanças
export type ParteInteressada = 'Usuario' | 'TI' | 'CQ' | 'RT' | 'DT' | 'RH' | 'Outros';
export type TipoMudanca = 'A' | 'B' | 'C' | 'D';
export type StatusMudanca = 'Pendente' | 'Em Análise' | 'Aprovado' | 'Rejeitado';

export interface Mudanca {
  id: string;
  data: string;
  parteInteressada: ParteInteressada;
  responsavel: string;
  tipoMudanca: TipoMudanca;
  descricao: string;
  status: StatusMudanca;
  observacoes?: string;
  anexos?: ArquivoRT[];
}

// Treinamentos
export interface Treinamento {
  id: string;
  data: string;
  conteudo: string;
  local: string;
  ministrante: string;
  participantes: string[];
  objetivo: string;
  anexos: ArquivoRT[];
  tipo: 'realizado' | 'futuro';
  status?: 'Agendado' | 'Confirmado' | 'Realizado' | 'Cancelado';
}

// Liberação de Produtos
export interface LiberacaoProduto {
  produtoId: string;
  codigo: string;
  nome: string;
  referencia: string;
  modelo: string;
  fabricante: string;
  marca: string;
  linhaProduto: string;
  apresentacaoPrimaria: string;
  apresentacaoSecundaria: string;
  apresentacaoTerciaria: string;
  referenciasComercializadas: string;
  liberadoRT: boolean;
  dataLiberacao?: string;
  responsavelLiberacao?: string;
  observacoes?: string;
}

// Tipos de documentação
export type TipoDocumentacaoRT = 'pop' | 'especificacoes' | 'legislacoes';

export interface DocumentacaoRT {
  tipo: TipoDocumentacaoRT;
  nomeArquivoPrincipal: string;
  estruturaPastas: PastaRT[];
}

// Gestão de Não Conformidades RT
export type OrigemNCRT = string;
export type TipoNCRT = string;
export type TipoNCEnumRT = 'Legal/Regulatória' | 'Processo/Operacional' | 'Produto' | 'Gestão' | 'Fornecedor' | 'Segurança/Meio Ambiente';
export type ImpactoNCRT = 'Crítico' | 'Moderado' | 'Leve';
export type StatusNCRT = 'Aberta' | 'Em Análise' | 'Aguardando Ação' | 'Resolvida' | 'Fechada';
export type StatusCAPART = 'Pendente' | 'Em Andamento' | 'Concluída' | 'Verificada';

export interface ProdutoLiberacaoNCRT {
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

export interface EquipamentoCAPADTRT {
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

export interface CAPADTRT {
  clienteNome: string;
  tipoCliente: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpjCpf: string;
  cinRg: string;
  nomeMantenedor: string;
  cnpjMantenedor: string;
  equipamentos: EquipamentoCAPADTRT[];
}

export interface AcaoCAPART {
  id: string;
  acaoPreventiva: string;
  acaoCorretiva: string;
  gerenciamentoTarefas?: string;
  prazoFinal: Date;
  status: StatusCAPART;
  responsavel: string;
  capaDT?: CAPADTRT;
}

export interface NaoConformidadeRT {
  id: string;
  data: string;
  origem: OrigemNCRT;
  tipo: TipoNCRT;
  tipos?: TipoNCEnumRT[];
  impacto: ImpactoNCRT;
  descricao: string;
  acaoImediata: string;
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
  responsavel: string;
  responsaveis?: string[];
  prazoExecucao: string;
  status: StatusNCRT;
  observacoes?: string;
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
  produtosLiberacao?: ProdutoLiberacaoNCRT[];
  capa?: AcaoCAPART;
}

// Monitoramento e Auditoria
export type TipoAlertaRT = 'nc_critica' | 'limite_nc_mensal' | 'insatisfacao_cliente' | 'capa_atrasado';
export type PrioridadeAlerta = 'critica' | 'alta' | 'media';

export interface AlertaRT {
  id: string;
  tipo: TipoAlertaRT;
  titulo: string;
  mensagem: string;
  prioridade: PrioridadeAlerta;
  dataCriacao: string;
  lido: boolean;
  origem?: string;
}

export interface KPIRT {
  capasAbertos: number;
  capasAtrasados: number;
  indiceQualidadePerformance: number;
  manutencoesPreventivasPendentes: number;
  manutencoesCorretivasPendentes: number;
}

export type TipoAcaoAuditoria = 
  | 'visualizacao' | 'criacao' | 'edicao' | 'exclusao' 
  | 'aprovacao' | 'rejeicao' | 'download' | 'upload';

export interface RegistroAuditoria {
  id: string;
  dataHora: string;
  usuario: string;
  acao: TipoAcaoAuditoria;
  modulo: string;
  recurso: string;
  detalhes?: string;
  ipAddress?: string;
}

// Lista Mestra
export interface ItemListaMestra {
  id: string;
  titulo: string;
  estruturaPastas: PastaRT[];
  codigo?: string;
  data?: string;
}

export interface ListaMestra {
  arquivoGeral?: ArquivoRT;
  itens: ItemListaMestra[];
}
