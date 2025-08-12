
export interface Emprestimo {
  numeroProcesso: string;
  cnpjCliente: string;
  nomeCliente: string;
  numeroDanfeEmprestimo: string;
  referenciaProdutoEmprestado: string;
  descricaoProdutoEmprestado: string;
  valorEmprestimoDolar: number;
  dataEmprestimo: string;
  dataSaida: string;
  numeroDanfeRetorno?: string;
  referenciaProdutoRecebido?: string;
  descricaoProdutoRecebido?: string;
  dataRetorno?: string;
  dataBaixa?: string;
  valorRetornadoDolar?: number;
  idImportacaoDireta?: string;
  status: 'emprestado' | 'devolvido' | 'vencido' | 'parcial';
}

export const emprestimosMock: Emprestimo[] = [
  // Empréstimos para IMP-2024-001
  {
    numeroProcesso: "EMP-2024-001",
    cnpjCliente: "12.345.678/0001-99",
    nomeCliente: "Hospital Albert Einstein",
    numeroDanfeEmprestimo: "55240112345678000199550010000000011123456789",
    referenciaProdutoEmprestado: "ABL800-FLEX-001",
    descricaoProdutoEmprestado: "Analisador de Gases Sanguíneos ABL800 FLEX",
    valorEmprestimoDolar: 85000.00,
    dataEmprestimo: "2024-01-15",
    dataSaida: "2024-01-16",
    numeroDanfeRetorno: "55240112345678000199550010000000021123456790",
    referenciaProdutoRecebido: "ABL800-FLEX-001",
    descricaoProdutoRecebido: "Analisador de Gases Sanguíneos ABL800 FLEX",
    dataRetorno: "2024-03-15",
    dataBaixa: "2024-03-16",
    valorRetornadoDolar: 85000.00,
    idImportacaoDireta: "IMP-2024-001",
    status: 'devolvido'
  },
  {
    numeroProcesso: "EMP-2024-004",
    cnpjCliente: "33.444.555/0001-66",
    nomeCliente: "Hospital das Clínicas - USP",
    numeroDanfeEmprestimo: "55240133444555000166550010000000051123456793",
    referenciaProdutoEmprestado: "WEBMED-SYS-001",
    descricaoProdutoEmprestado: "Sistema WEBMED Gestão Hospitalar",
    valorEmprestimoDolar: 45000.00,
    dataEmprestimo: "2024-03-01",
    dataSaida: "2024-03-02",
    numeroDanfeRetorno: "55240133444555000166550010000000061123456794",
    referenciaProdutoRecebido: "WEBMED-SYS-001-UPG",
    descricaoProdutoRecebido: "Sistema WEBMED Gestão Hospitalar - Versão Atualizada",
    dataRetorno: "2024-03-20",
    valorRetornadoDolar: 50000.00,
    idImportacaoDireta: "IMP-2024-001",
    status: 'parcial'
  },
  {
    numeroProcesso: "EMP-2024-008",
    cnpjCliente: "12.345.678/0001-99",
    nomeCliente: "Hospital Albert Einstein",
    numeroDanfeEmprestimo: "55240112345678000199550010000000081123456798",
    referenciaProdutoEmprestado: "SENSOR-CO2-001",
    descricaoProdutoEmprestado: "Sensor de CO2 Transcutâneo",
    valorEmprestimoDolar: 15000.00,
    dataEmprestimo: "2024-02-10",
    dataSaida: "2024-02-11",
    idImportacaoDireta: "IMP-2024-001",
    status: 'emprestado'
  },

  // Empréstimos para IMP-2024-002
  {
    numeroProcesso: "EMP-2024-002",
    cnpjCliente: "98.765.432/0001-11",
    nomeCliente: "Hospital Sírio-Libanês",
    numeroDanfeEmprestimo: "55240198765432000111550010000000031123456791",
    referenciaProdutoEmprestado: "NOVA-STAT-002",
    descricaoProdutoEmprestado: "Nova StatProfile Prime Plus",
    valorEmprestimoDolar: 65000.00,
    dataEmprestimo: "2024-02-01",
    dataSaida: "2024-02-02",
    idImportacaoDireta: "IMP-2024-002",
    status: 'emprestado'
  },
  {
    numeroProcesso: "EMP-2024-005",
    cnpjCliente: "44.555.666/0001-77",
    nomeCliente: "Hospital das Clínicas - FMUSP",
    numeroDanfeEmprestimo: "55240144555666000177550010000000071123456795",
    referenciaProdutoEmprestado: "ABL90-FLEX-PLUS",
    descricaoProdutoEmprestado: "Analisador de Gases Sanguíneos ABL90 FLEX PLUS",
    valorEmprestimoDolar: 95000.00,
    dataEmprestimo: "2024-03-10",
    dataSaida: "2024-03-11",
    idImportacaoDireta: "IMP-2024-002",
    status: 'emprestado'
  },
  {
    numeroProcesso: "EMP-2024-009",
    cnpjCliente: "98.765.432/0001-11",
    nomeCliente: "Hospital Sírio-Libanês",
    numeroDanfeEmprestimo: "55240198765432000111550010000000091123456799",
    referenciaProdutoEmprestado: "ELECTRODO-PH-002",
    descricaoProdutoEmprestado: "Eletrodo de pH para ABL90",
    valorEmprestimoDolar: 8500.00,
    dataEmprestimo: "2023-11-15",
    dataSaida: "2023-11-16",
    idImportacaoDireta: "IMP-2024-002",
    status: 'vencido'
  },

  // Empréstimos para IMP-2024-003
  {
    numeroProcesso: "EMP-2024-003",
    cnpjCliente: "11.222.333/0001-44",
    nomeCliente: "INCA - Instituto Nacional de Câncer",
    numeroDanfeEmprestimo: "55240111222333000144550010000000041123456792",
    referenciaProdutoEmprestado: "RADIOMETER-PHO-003",
    descricaoProdutoEmprestado: "Eletrodos pH e Gases Radiometer",
    valorEmprestimoDolar: 12000.00,
    dataEmprestimo: "2023-12-10",
    dataSaida: "2023-12-11",
    idImportacaoDireta: "IMP-2024-003",
    status: 'vencido'
  },
  {
    numeroProcesso: "EMP-2024-006",
    cnpjCliente: "11.222.333/0001-44",
    nomeCliente: "INCA - Instituto Nacional de Câncer",
    numeroDanfeEmprestimo: "55240111222333000144550010000000061123456796",
    referenciaProdutoEmprestado: "CALIBRATOR-GAS",
    descricaoProdutoEmprestado: "Gás Calibrador para Análise Sanguínea",
    valorEmprestimoDolar: 3500.00,
    dataEmprestimo: "2024-01-20",
    dataSaida: "2024-01-21",
    numeroDanfeRetorno: "55240111222333000144550010000000071123456797",
    referenciaProdutoRecebido: "CALIBRATOR-GAS",
    descricaoProdutoRecebido: "Gás Calibrador para Análise Sanguínea",
    dataRetorno: "2024-02-15",
    dataBaixa: "2024-02-16",
    valorRetornadoDolar: 3500.00,
    idImportacaoDireta: "IMP-2024-003",
    status: 'devolvido'
  },

  // Empréstimos sem vinculação (para mostrar na tabela geral)
  {
    numeroProcesso: "EMP-2024-007",
    cnpjCliente: "55.666.777/0001-88",
    nomeCliente: "Hospital São Paulo",
    numeroDanfeEmprestimo: "55240155666777000188550010000000081123456798",
    referenciaProdutoEmprestado: "AQUA-CHECK-001",
    descricaoProdutoEmprestado: "Sistema de Verificação de Qualidade da Água",
    valorEmprestimoDolar: 22000.00,
    dataEmprestimo: "2024-03-05",
    dataSaida: "2024-03-06",
    status: 'emprestado'
  },
  {
    numeroProcesso: "EMP-2024-010",
    cnpjCliente: "66.777.888/0001-99",
    nomeCliente: "Hospital Israelita Albert Einstein",
    numeroDanfeEmprestimo: "55240166777888000199550010000000101123456800",
    referenciaProdutoEmprestado: "MAINTENANCE-KIT",
    descricaoProdutoEmprestado: "Kit de Manutenção Preventiva ABL800",
    valorEmprestimoDolar: 5800.00,
    dataEmprestimo: "2024-02-25",
    dataSaida: "2024-02-26",
    numeroDanfeRetorno: "55240166777888000199550010000000111123456801",
    referenciaProdutoRecebido: "MAINTENANCE-KIT",
    descricaoProdutoRecebido: "Kit de Manutenção Preventiva ABL800",
    dataRetorno: "2024-03-18",
    dataBaixa: "2024-03-19",
    valorRetornadoDolar: 5800.00,
    status: 'devolvido'
  }
];

export const getEmprestimosByImportacaoId = (importacaoId: string): Emprestimo[] => {
  return emprestimosMock.filter(emprestimo => emprestimo.idImportacaoDireta === importacaoId);
};
