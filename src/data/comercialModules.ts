
export const comercialModules = [
  {
    id: 'vendas',
    name: 'Vendas',
    path: '/comercial/vendas',
    description: 'Gestão do processo comercial e oportunidades',
    icon: 'TrendingUp'
  },
  {
    id: 'pos-vendas',
    name: 'Pós-Vendas',
    description: 'Suporte científico e técnico pós-venda',
    icon: 'Headphones',
    subModules: [
      {
        id: 'assessoria-cientifica',
        name: 'Assessoria Científica',
        path: '/comercial/pos-vendas/assessoria-cientifica',
        description: 'Gestão de suporte científico aos clientes',
        icon: 'Users'
      },
      {
        id: 'departamento-tecnico',
        name: 'Departamento Técnico',
        path: '/comercial/pos-vendas/departamento-tecnico',
        description: 'Gestão de suporte técnico e manutenção',
        icon: 'Wrench'
      }
    ]
  }
];
