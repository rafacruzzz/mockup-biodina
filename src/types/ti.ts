import { LucideIcon } from "lucide-react";

// Base types for TI module structure
export interface TIModuleConfig {
  name: string;
  icon: LucideIcon;
  subModules?: {
    [key: string]: TISubModule;
  };
  data?: any[];
}

export interface TISubModule {
  name: string;
  data?: any[];
}

export interface TIModulesConfig {
  [key: string]: TIModuleConfig;
}

// Chamados TI types
export interface ChamadoTI {
  id: number;
  titulo: string;
  categoria: 'impressoras' | 'perifericos' | 'telefonia' | 'softwares' | 'sistema_operacional' | 'rede' | 'acessos' | 'seguranca' | 'geral';
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  status: 'aberto' | 'em_andamento' | 'aguardando' | 'resolvido' | 'fechado';
  solicitante: string;
  departamento: string;
  tecnicoResponsavel?: string;
  dataAbertura: string;
  descricao: string;
  anexos?: string[];
  observacoes?: string;
}

// Rede types
export interface ElementoRede {
  id: string;
  tipo: 'internet' | 'firewall' | 'switch' | 'access_point' | 'servidor';
  nome: string;
  status: 'online' | 'offline' | 'alerta';
  ip?: string;
  pontosEmUso?: number;
  pontosTotal?: number;
  ultimaQueda?: string;
  localizacao: string;
  x: number; // posição no diagrama
  y: number; // posição no diagrama
}

export interface ConexaoRede {
  origem: string;
  destino: string;
}

// Inventário types
export interface AtivoTI {
  id: number;
  numeroInventario: string;
  equipamento: string;
  tipo: 'notebook' | 'desktop' | 'impressora' | 'servidor' | 'switch' | 'roteador' | 'outro';
  marca: string;
  modelo: string;
  numeroSerie: string;
  status: 'ativo' | 'inativo' | 'manutencao' | 'descartado';
  responsavel: string;
  departamento: string;
  localizacao: string;
  dataAquisicao: string;
  dataGarantia: string;
  valorAquisicao?: number;
  fornecedor?: string;
  observacoes?: string;
}

// Políticas types
export interface PoliticaTI {
  id: number;
  nome: string;
  categoria: 'seguranca' | 'backup' | 'equipamentos' | 'boas_praticas';
  versao: string;
  dataUltimaRevisao: string;
  responsavel: string;
  status: 'ativo' | 'revisao' | 'obsoleto';
  arquivo: string;
  descricao: string;
}

export interface PastaPolítica {
  id: string;
  nome: string;
  icone: string;
  politicas: PoliticaTI[];
}

// Segurança types
export interface IncidenteSeguranca {
  id: number;
  dataHora: string;
  tipo: 'acesso_suspeito' | 'firewall' | 'malware' | 'phishing' | 'outro';
  detalhes: string;
  status: 'novo' | 'investigando' | 'resolvido';
  criticidade: 'baixa' | 'media' | 'alta' | 'critica';
  responsavel?: string;
  acoes?: string;
}

export interface LogAcesso {
  id: number;
  usuario: string;
  sistema: string;
  dataHora: string;
  ip: string;
  status: 'sucesso' | 'falha';
  detalhes?: string;
}

export interface StatusAntivirus {
  id: number;
  estacaoTrabalho: string;
  usuario: string;
  status: 'atualizado' | 'desatualizado' | 'inativo';
  versaoAntivirus: string;
  ultimaVerificacao: string;
  ameacasDetectadas: number;
  observacoes?: string;
}

// Conformidade types
export interface ControleConformidade {
  id: string;
  idControle: string;
  descricao: string;
  norma: 'iso27001' | 'lgpd' | 'gdpr' | 'pci_dss';
  status: 'implementado' | 'nao_implementado' | 'em_andamento' | 'nao_aplicavel';
  responsavel?: string;
  dataUltimaRevisao?: string;
  evidencias: string[];
  observacoes?: string;
}

export interface NormaConformidade {
  id: string;
  nome: string;
  descricao: string;
  controles: ControleConformidade[];
  progressoImplementacao: number;
}

// Gestão de E-mails types
export interface ContaEmail {
  id: number;
  endereco: string;
  nomeUsuario: string;
  departamento: string;
  status: 'ativo' | 'bloqueado' | 'redirecionado';
  redirecionadoPara?: string;
  aliases?: string[];
  dataUltimaAlteracao: string;
  responsavel: string;
}

// Gestão de Usuários de Rede types
export interface UsuarioRede {
  id: number;
  nomeUsuario: string;
  nomeCompleto: string;
  departamento: string;
  gruposPermissao: string[];
  status: 'ativo' | 'inativo';
  dataUltimoLogin?: string;
  dataUltimaAlteracaoSenha: string;
  dataExpiracao?: string;
  responsavel: string;
}

export interface GrupoPermissao {
  id: string;
  nome: string;
  descricao: string;
  permissoes: string[];
  membros: number;
}

// Gestão de Telefonia types
export interface RamalTelefone {
  id: number;
  numeroRamal: string;
  usuarioAssociado?: string;
  setor: string;
  modeloAparelho: string;
  status: 'operacional' | 'com_defeito' | 'em_manutencao';
  localizacao: string;
  dataInstalacao: string;
  observacoes?: string;
}

// Interfaceamento types
export interface SolicitacaoInterfaceamento {
  id: number;
  clienteNome: string;
  oportunidadeId: string;
  descricaoNecessidade: string;
  sistemaCliente: string;
  prazoDesejado: string;
  status: 'aguardando_aprovacao' | 'aprovado' | 'em_analise' | 'em_desenvolvimento' | 'concluido' | 'cancelado';
  responsavelExecucao?: 'ti_interno' | 'fornecedor_externo';
  nomeFornecedor?: string;
  solicitante: string;
  departamentoSolicitante: string;
  dataSolicitacao: string;
  dataUltimaAtualizacao: string;
  notasTecnicas?: string;
  anexos?: string[];
  histomicoStatus: {
    status: string;
    data: string;
    responsavel: string;
    observacoes?: string;
  }[];
}