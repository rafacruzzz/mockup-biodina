export interface Empresa {
  id: string;
  nome: string;
  razaoSocial: string;
  cnpj: string;
  tipo: 'master' | 'filial';
  status: 'ativa' | 'inativa' | 'suspensa';
  dataCriacao: string;
  logoUrl?: string;
  planoId?: string;
  
  // Rastreamento de origem
  origem?: {
    tipo: 'manual' | 'webform' | 'landpage';
    webformId?: string;
    webformNome?: string;
    dataRegistro: string;
  };
  
  // Módulos habilitados
  modulosHabilitados: ModuloSistema[];
  
  // Usuário master da empresa
  usuarioMaster: {
    id: string;
    nome: string;
    email: string;
    username: string;
    dataCriacao: string;
  };
  
  // Configurações
  configuracoes: {
    limiteUsuarios: number; // -1 = ilimitado
    espacoArmazenamento: string; // "10GB", "50GB", "ilimitado"
    backup: boolean;
    suporte: 'basico' | 'premium' | 'enterprise';
    quantidadeFiliais: number; // -1 = ilimitado
  };
  
  // Estatísticas mockadas
  estatisticas: {
    totalUsuarios: number;
    totalProdutos: number;
    totalClientes: number;
    totalVendas: number;
    espacoUtilizado: string;
  };
}

export interface Filial {
  id: string;
  nome: string;
  razaoSocial: string;
  cnpj: string;
  empresaPrincipalId: string;
  modulosHabilitados: ModuloSistema[];
  status: 'ativa' | 'inativa' | 'suspensa';
  dataCriacao: string;
  endereco?: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
}

export type ModuloSistema = 
  | 'cadastro'
  | 'comercial'
  | 'compras'
  | 'estoque'
  | 'financeiro'
  | 'contabilidade'
  | 'faturamento'
  | 'rh'
  | 'ti'
  | 'administrativo'
  | 'solicitacoes'
  | 'bi';

export interface ModuloConfig {
  id: ModuloSistema;
  nome: string;
  descricao: string;
  icon: string;
  cor: string;
}

export interface PerfilAcesso {
  id: string;
  nome: string;
  modulosHabilitados: ModuloSistema[];
  dataCriacao: string;
  dataAtualizacao?: string;
}

export interface Plano {
  id: string;
  nome: string;
  valor: number;
  perfilId: string;
  quantidadeFiliais: number;
  diasTrialGratuito: number;
  descricao?: string;
  beneficios: string[];
  dataCriacao: string;
  dataAtualizacao?: string;
}

export interface Webform {
  id: string;
  titulo: string;
  status: 'ativo' | 'inativo';
  tipo: 'criar_base';
  planoId?: string;
  trial: boolean;
  diasTrial: number;
  descricao: string;
  linkUnico: string;
  dataCriacao: string;
  dataAtualizacao?: string;
  totalAcessos: number;
  totalCadastros: number;
  ultimoAcesso?: string;
}
