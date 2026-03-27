// Definição completa de todos os módulos e submódulos do sistema

export interface SubModuloDefinicao {
  key: string;
  name: string;
}

export interface ModuloDefinicao {
  key: string;
  name: string;
  icon: string;
  subModulos: SubModuloDefinicao[];
}

export const modulosCompletosSistema: ModuloDefinicao[] = [
  {
    key: 'bi',
    name: 'BI Geral',
    icon: '📈',
    subModulos: [
      { key: 'dashboards', name: 'Dashboards' },
      { key: 'relatorios', name: 'Relatórios' },
      { key: 'indicadores', name: 'Indicadores' }
    ]
  },
  {
    key: 'cadastro',
    name: 'Cadastro',
    icon: '📋',
    subModulos: [
      { key: 'usuarios', name: 'Usuários' },
      { key: 'pessoas', name: 'Pessoas' },
      { key: 'produtos', name: 'Produtos' },
      { key: 'servicos', name: 'Serviços' },
      { key: 'categorias', name: 'Categorias' },
      { key: 'cadastros_financeiros', name: 'Cadastros Financeiros' },
      { key: 'empresas', name: 'Empresas' }
    ]
  },
  {
    key: 'administrativo',
    name: 'Administrativo',
    icon: '🗃️',
    subModulos: [
      { key: 'regulatorio', name: 'Regulatório' },
      { key: 'qualidade', name: 'Qualidade' },
      { key: 'juridico', name: 'Jurídico' },
      { key: 'contratos', name: 'Contratos' },
      { key: 'documentos', name: 'Documentos' }
    ]
  },
  {
    key: 'comercial',
    name: 'Comercial',
    icon: '💼',
    subModulos: [
      { key: 'captacao', name: 'Captação' },
      { key: 'vendas', name: 'Vendas' },
      { key: 'pre_venda', name: 'Pré-Venda' },
      { key: 'pos_venda', name: 'Pós-Venda' }
    ]
  },
  {
    key: 'estoque',
    name: 'Estoque',
    icon: '📊',
    subModulos: [
      { key: 'posicao_estoque', name: 'Posição de Estoque' },
      { key: 'movimentacoes', name: 'Movimentações' },
      { key: 'inventario', name: 'Inventário' },
      { key: 'expedicao', name: 'Expedição' },
      { key: 'administracao', name: 'Administração' }
    ]
  },
  {
    key: 'compras',
    name: 'CPR',
    icon: '📦',
    subModulos: [
      { key: 'pedidos', name: 'Mercadoria para Revenda' },
      { key: 'importacao', name: 'Importação/DI' }
    ]
  },
  {
    key: 'financeiro',
    name: 'Financeiro',
    icon: '💰',
    subModulos: [
      { key: 'contas_pagar', name: 'Contas a Pagar' },
      { key: 'contas_receber', name: 'Contas a Receber' },
      { key: 'tesouraria', name: 'Tesouraria' },
      { key: 'conciliacao', name: 'Conciliação' },
      { key: 'faturamento', name: 'Faturamento' }
    ]
  },
  {
    key: 'contabilidade',
    name: 'Contabilidade',
    icon: '🧮',
    subModulos: [
      { key: 'lancamentos', name: 'Lançamentos' },
      { key: 'plano_contas', name: 'Plano de Contas' },
      { key: 'demonstrativos', name: 'Demonstrativos' },
      { key: 'fiscal', name: 'Fiscal' }
    ]
  },
  {
    key: 'rh',
    name: 'RH',
    icon: '👥',
    subModulos: [
      { key: 'colaboradores', name: 'Colaboradores' },
      { key: 'folha_pagamento', name: 'Folha de Pagamento' },
      { key: 'beneficios', name: 'Benefícios' },
      { key: 'ferias', name: 'Férias' },
      { key: 'ponto', name: 'Ponto' },
      { key: 'recrutamento', name: 'Recrutamento' }
    ]
  },
  {
    key: 'ti',
    name: 'TI',
    icon: '💻',
    subModulos: [
      { key: 'chamados', name: 'Chamados' },
      { key: 'inventario_ti', name: 'Inventário' },
      { key: 'rede', name: 'Rede' },
      { key: 'seguranca', name: 'Segurança' },
      { key: 'compliance', name: 'Compliance' }
    ]
  },
  {
    key: 'solicitacoes',
    name: 'Solicitações',
    icon: '📝',
    subModulos: [
      { key: 'minhas_solicitacoes', name: 'Minhas Solicitações' },
      { key: 'aprovacoes', name: 'Aprovações' },
      { key: 'historico', name: 'Histórico' }
    ]
  },
  {
    key: 'configuracao',
    name: 'Configuração',
    icon: '⚙️',
    subModulos: [
      { key: 'perfil_empresa', name: 'Perfil da Empresa' }
    ]
  },
  {
    key: 'personalizar_navegacao',
    name: 'Personalizar Navegação',
    icon: '🎨',
    subModulos: [
      { key: 'menu', name: 'Menu Principal' },
      { key: 'favoritos', name: 'Favoritos' },
      { key: 'atalhos', name: 'Atalhos' }
    ]
  }
];

// Função helper para obter um módulo pelo key
export const getModuloPorKey = (key: string): ModuloDefinicao | undefined => {
  return modulosCompletosSistema.find(m => m.key === key);
};

// Função helper para obter todos os keys de submódulos de um módulo
export const getSubModulosKeys = (moduloKey: string): string[] => {
  const modulo = getModuloPorKey(moduloKey);
  return modulo ? modulo.subModulos.map(s => s.key) : [];
};
