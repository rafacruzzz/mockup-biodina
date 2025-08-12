
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
  }
];

export const getEmprestimosByImportacaoId = (importacaoId: string): Emprestimo[] => {
  return emprestimosMock.filter(emprestimo => emprestimo.idImportacaoDireta === importacaoId);
};
