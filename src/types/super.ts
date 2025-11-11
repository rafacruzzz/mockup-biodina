export interface Empresa {
  id: string;
  nome: string;
  razaoSocial: string;
  cnpj: string;
  tipo: 'master' | 'filial';
  status: 'ativa' | 'inativa' | 'suspensa';
  dataCriacao: string;
  logoUrl?: string;
  
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
