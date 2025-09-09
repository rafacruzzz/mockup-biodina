import { LucideIcon } from "lucide-react";

// Base types for TI module structure
export interface TIModuleConfig {
  name: string;
  icon: LucideIcon;
  subModules: {
    [key: string]: TISubModule;
  };
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