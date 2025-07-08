
export const concorrentes = [
  { id: 1, nome: 'Empresa A', valor: 150000 },
  { id: 2, nome: 'Empresa B', valor: 145000 },
  { id: 3, nome: 'Empresa C', valor: 155000 }
];

export const licitantes = [
  {
    id: 1,
    nome: 'EMPRESA ALPHA LTDA',
    cnpj: '12.345.678/0001-90',
    valorProposta: 150000.00,
    classificacao: 1,
    situacao: 'habilitado',
    observacoes: 'Proposta dentro do esperado'
  },
  {
    id: 2,
    nome: 'BETA SOLUÇÕES EMPRESARIAIS',
    cnpj: '98.765.432/0001-10',
    valorProposta: 145000.00,
    classificacao: 2,
    situacao: 'habilitado',
    observacoes: 'Melhor proposta financeira'
  },
  {
    id: 3,
    nome: 'GAMMA TECNOLOGIA E SERVIÇOS',
    cnpj: '11.222.333/0001-44',
    valorProposta: 155000.00,
    classificacao: 3,
    situacao: 'desabilitado',
    observacoes: 'Não atendeu requisitos técnicos'
  },
  {
    id: 4,
    nome: 'DELTA COMERCIAL LTDA',
    cnpj: '55.666.777/0001-88',
    valorProposta: 160000.00,
    classificacao: 4,
    situacao: 'habilitado',
    observacoes: 'Proposta acima do orçamento'
  }
];

export const pedidos = [
  {
    id: 1,
    numero: 'PED-2024-001',
    cliente: 'PREFEITURA MUNICIPAL',
    valor: 145000.00,
    status: 'aprovado',
    dataVencimento: '2024-12-30'
  },
  {
    id: 2,
    numero: 'PED-2024-002',
    cliente: 'SECRETARIA DE SAÚDE',
    valor: 89000.00,
    status: 'pendente',
    dataVencimento: '2024-11-15'
  }
];
