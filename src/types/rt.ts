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
  pastaId?: string | null; // ID da pasta pai
  arquivos: ArquivoRT[];
  subPastas?: PastaRT[];
  expandido?: boolean;
}

// Controle de Mudanças
export type ParteInteressada = 'Usuario' | 'TI' | 'CQ' | 'RT' | 'DT' | 'RH' | 'Outros';
export type TipoMudanca = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
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
export type OrigemNCRT = 'Auditoria' | 'Treinamento' | 'Liberação de Produto' | 'Documentação' | 'Outro';
export type TipoNCRT = 'Documentação Desatualizada' | 'Treinamento Inadequado' | 'Falha de Processo' | 'Produto Não Liberado' | 'Não Conformidade Regulatória' | 'Outro';
export type ImpactoNCRT = 'Crítico' | 'Moderado' | 'Baixo';
export type StatusNCRT = 'Aberta' | 'Em Análise' | 'Aguardando Ação' | 'Resolvida' | 'Fechada';
export type StatusCAPART = 'Pendente' | 'Em Andamento' | 'Concluída' | 'Verificada';

export interface AcaoCAPART {
  id: string;
  acaoPreventiva: string;
  acaoCorretiva: string;
  prazoFinal: string;
  status: StatusCAPART;
  responsavel: string;
}

export interface NaoConformidadeRT {
  id: string;
  data: string;
  origem: OrigemNCRT;
  tipo: TipoNCRT;
  impacto: ImpactoNCRT;
  descricao: string;
  acaoImediata: string;
  responsavel: string;
  prazoExecucao: string;
  status: StatusNCRT;
  observacoes?: string;
  capa: AcaoCAPART;
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
