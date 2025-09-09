// TI Module Types

// Chamados TI específicos
export enum CategoriaChamadoTI {
  IMPRESSORAS_SCANNERS = 'impressoras_scanners',
  PERIFERICOS = 'perifericos',
  TELEFONIA = 'telefonia',
  SOFTWARES = 'softwares',
  SISTEMAS_OPERACIONAIS = 'sistemas_operacionais',
  REDE = 'rede',
  ACESSOS = 'acessos',
  SEGURANCA = 'seguranca',
  SOLICITACOES_GERAIS = 'solicitacoes_gerais'
}

export enum PrioridadeChamado {
  BAIXA = 'baixa',
  MEDIA = 'media',
  ALTA = 'alta',
  CRITICA = 'critica'
}

export enum StatusChamadoTI {
  ABERTO = 'aberto',
  EM_ATENDIMENTO = 'em_atendimento',
  ENCERRADO = 'encerrado'
}

export interface ChamadoTI {
  id: string;
  solicitante: string;
  departamento: string;
  categoria: CategoriaChamadoTI;
  prioridade: PrioridadeChamado;
  titulo: string;
  descricao: string;
  status: StatusChamadoTI;
  tecnicoResponsavel?: string;
  dataAbertura: string;
  dataAtendimento?: string;
  dataEncerramento?: string;
  anexos?: string[];
  observacoes?: string;
}

// Inventário de Ativos
export enum TipoEquipamento {
  DESKTOP = 'desktop',
  NOTEBOOK = 'notebook',
  SERVIDOR = 'servidor',
  IMPRESSORA = 'impressora',
  SCANNER = 'scanner',
  SWITCH = 'switch',
  ROTEADOR = 'roteador',
  FIREWALL = 'firewall',
  ACCESS_POINT = 'access_point',
  MONITOR = 'monitor',
  TELEFONE = 'telefone'
}

export enum StatusAtivo {
  ATIVO = 'ativo',
  EM_MANUTENCAO = 'em_manutencao',
  DESCARTADO = 'descartado',
  RESERVA = 'reserva'
}

export interface AtivoTI {
  id: string;
  numeroInventario: string;
  equipamento: string;
  tipo: TipoEquipamento;
  status: StatusAtivo;
  responsavelAtual: string;
  localizacao: {
    unidade: string;
    andar: string;
    sala: string;
  };
  dataAquisicao: string;
  fimGarantia: string;
  numeroSerie: string;
  valorContabil: number;
  fornecedor: string;
  observacoes?: string;
}

// Rede
export enum TipoElementoRede {
  INTERNET = 'internet',
  FIREWALL = 'firewall',
  SWITCH = 'switch',
  ACCESS_POINT = 'access_point',
  SERVIDOR = 'servidor'
}

export enum StatusElementoRede {
  ONLINE = 'online',
  OFFLINE = 'offline',
  MANUTENCAO = 'manutencao'
}

export interface ElementoRede {
  id: string;
  idAtivo: string;
  tipo: TipoElementoRede;
  status: StatusElementoRede;
  pontosEmUso?: number;
  pontosTotal?: number;
  ultimaQueda?: string;
  posicao: {
    x: number;
    y: number;
  };
}

// Segurança
export enum TipoIncidenteSeguranca {
  ACESSO_SUSPEITO = 'acesso_suspeito',
  FIREWALL = 'firewall',
  MALWARE = 'malware',
  BACKUP = 'backup',
  PHISHING = 'phishing',
  VIOLACAO_DADOS = 'violacao_dados'
}

export enum StatusIncidenteSeguranca {
  NOVO = 'novo',
  EM_INVESTIGACAO = 'em_investigacao',
  RESOLVIDO = 'resolvido'
}

export interface IncidenteSeguranca {
  id: string;
  tipo: TipoIncidenteSeguranca;
  descricao: string;
  status: StatusIncidenteSeguranca;
  dataDeteccao: string;
  investigador?: string;
  resolucao?: string;
  gravidade: 'baixa' | 'media' | 'alta' | 'critica';
}

export interface AuditoriaAcesso {
  id: string;
  usuario: string;
  sistema: string;
  dataHora: string;
  enderecoIP: string;
  status: 'sucesso' | 'falha';
  tentativas?: number;
}

export interface StatusAntivirus {
  id: string;
  estacaoTrabalho: string;
  usuario: string;
  status: 'atualizado' | 'desatualizado' | 'inativo';
  ultimaVerificacao: string;
  versaoDefinicoes: string;
  ameacasDetectadas?: number;
}

// Conformidade
export enum TipoNorma {
  ISO_27001 = 'iso_27001',
  LGPD = 'lgpd',
  GDPR = 'gdpr',
  PCI_DSS = 'pci_dss'
}

export enum StatusControle {
  IMPLEMENTADO = 'implementado',
  NAO_IMPLEMENTADO = 'nao_implementado',
  EM_ANDAMENTO = 'em_andamento',
  NAO_APLICAVEL = 'nao_aplicavel'
}

export interface ControleConformidade {
  id: string;
  norma: TipoNorma;
  idControle: string;
  descricao: string;
  status: StatusControle;
  responsavel?: string;
  dataUltimaRevisao?: string;
  evidencias: string[];
  observacoes?: string;
}

// Políticas e Procedimentos
export interface Politica {
  id: string;
  titulo: string;
  categoria: string;
  versao: string;
  dataPublicacao: string;
  dataRevisao?: string;
  arquivo: string;
  responsavel: string;
  status: 'ativo' | 'revisao' | 'obsoleto';
}

// Labels para exibição
export const CATEGORIA_CHAMADO_TI_LABELS = {
  [CategoriaChamadoTI.IMPRESSORAS_SCANNERS]: 'Impressoras e Scanners',
  [CategoriaChamadoTI.PERIFERICOS]: 'Periféricos',
  [CategoriaChamadoTI.TELEFONIA]: 'Telefonia',
  [CategoriaChamadoTI.SOFTWARES]: 'Softwares',
  [CategoriaChamadoTI.SISTEMAS_OPERACIONAIS]: 'Sistemas Operacionais',
  [CategoriaChamadoTI.REDE]: 'Rede',
  [CategoriaChamadoTI.ACESSOS]: 'Acessos',
  [CategoriaChamadoTI.SEGURANCA]: 'Segurança',
  [CategoriaChamadoTI.SOLICITACOES_GERAIS]: 'Solicitações Gerais'
};

export const PRIORIDADE_CHAMADO_LABELS = {
  [PrioridadeChamado.BAIXA]: 'Baixa',
  [PrioridadeChamado.MEDIA]: 'Média',
  [PrioridadeChamado.ALTA]: 'Alta',
  [PrioridadeChamado.CRITICA]: 'Crítica'
};

export const STATUS_CHAMADO_TI_LABELS = {
  [StatusChamadoTI.ABERTO]: 'Aberto',
  [StatusChamadoTI.EM_ATENDIMENTO]: 'Em Atendimento',
  [StatusChamadoTI.ENCERRADO]: 'Encerrado'
};

export const TIPO_EQUIPAMENTO_LABELS = {
  [TipoEquipamento.DESKTOP]: 'Desktop',
  [TipoEquipamento.NOTEBOOK]: 'Notebook',
  [TipoEquipamento.SERVIDOR]: 'Servidor',
  [TipoEquipamento.IMPRESSORA]: 'Impressora',
  [TipoEquipamento.SCANNER]: 'Scanner',
  [TipoEquipamento.SWITCH]: 'Switch',
  [TipoEquipamento.ROTEADOR]: 'Roteador',
  [TipoEquipamento.FIREWALL]: 'Firewall',
  [TipoEquipamento.ACCESS_POINT]: 'Access Point',
  [TipoEquipamento.MONITOR]: 'Monitor',
  [TipoEquipamento.TELEFONE]: 'Telefone'
};

export const STATUS_ATIVO_LABELS = {
  [StatusAtivo.ATIVO]: 'Ativo',
  [StatusAtivo.EM_MANUTENCAO]: 'Em Manutenção',
  [StatusAtivo.DESCARTADO]: 'Descartado',
  [StatusAtivo.RESERVA]: 'Reserva'
};