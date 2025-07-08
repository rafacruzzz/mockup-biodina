
export const concorrentes = [
  { id: 1, nome: 'Empresa A', valor: 150000 },
  { id: 2, nome: 'Empresa B', valor: 145000 },
  { id: 3, nome: 'Empresa C', valor: 155000 }
];

export const licitantes = [
  {
    id: 1,
    empresa: 'EMPRESA ALPHA LTDA',
    marca: 'Siemens',
    modelo: 'RAPIDPoint 500',
    valorEntrada: 150000.00,
    valorFinal: 145000.00,
    unidade: 'un',
    ranking: 1
  },
  {
    id: 2,
    empresa: 'BETA SOLUÇÕES EMPRESARIAIS',  
    marca: 'Abbott',
    modelo: 'i-STAT Alinity',
    valorEntrada: 160000.00,
    valorFinal: 148000.00,
    unidade: 'un',
    ranking: 2
  },
  {
    id: 3,
    empresa: 'GAMMA TECNOLOGIA E SERVIÇOS',
    marca: 'Roche',
    modelo: 'cobas b 123',
    valorEntrada: 170000.00,
    valorFinal: 155000.00,
    unidade: 'un', 
    ranking: 3
  },
  {
    id: 4,
    empresa: 'DELTA COMERCIAL LTDA',
    marca: 'Nova Biomedical',
    modelo: 'StatSensor',
    valorEntrada: 180000.00,
    valorFinal: 160000.00,
    unidade: 'un',
    ranking: 4
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
