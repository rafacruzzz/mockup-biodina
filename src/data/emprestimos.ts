export interface Emprestimo {
  numeroProcesso: string;
  cnpjCliente: string;
  nomeCliente: string;
  numeroDanfeEmprestimo: string;
  referenciaProdutoEmprestado: string;
  descricaoProdutoEmprestado: string;
  valorEmprestimo: number;
  moeda: 'BRL' | 'USD';
  dataEmprestimo: string;
  dataSaida: string;
  numeroDanfeRetorno?: string;
  referenciaProdutoRecebido?: string;
  descricaoProdutoRecebido?: string;
  dataRetorno?: string;
  dataBaixa?: string;
  valorRetornado?: number;
  idImportacaoDireta?: string;
  status: 'emprestado' | 'devolvido' | 'vencido' | 'parcial' | 'devolvido_nf' | 'retorno_efetivado' | 'retorno_parcial';
  // Novos campos para integração com estoque
  id_movimentacao_retorno?: string;
  data_entrada_fisica?: string;
  observacoes_retorno?: string;
  usuario_retorno?: string;
  // Campo para separar empréstimos por contexto
  origem: 'vendas' | 'departamento-tecnico';
}

export const emprestimosMock: Emprestimo[] = [
  // Empréstimos para IMP-2024-001 - VENDAS
  {
    numeroProcesso: "EMP-2024-001",
    cnpjCliente: "12.345.678/0001-99",
    nomeCliente: "Hospital Albert Einstein",
    numeroDanfeEmprestimo: "55240112345678000199550010000000011123456789",
    referenciaProdutoEmprestado: "ABL800-FLEX-001",
    descricaoProdutoEmprestado: "Analisador de Gases Sanguíneos ABL800 FLEX",
    valorEmprestimo: 85000.00,
    moeda: 'USD',
    dataEmprestimo: "2024-01-15",
    dataSaida: "2024-01-16",
    numeroDanfeRetorno: "55240112345678000199550010000000021123456790",
    referenciaProdutoRecebido: "ABL800-FLEX-001",
    descricaoProdutoRecebido: "Analisador de Gases Sanguíneos ABL800 FLEX",
    dataRetorno: "2024-03-15",
    dataBaixa: "2024-03-16",
    valorRetornado: 85000.00,
    idImportacaoDireta: "IMP-2024-001",
    status: 'retorno_efetivado',
    id_movimentacao_retorno: "MOV-2024-0156",
    data_entrada_fisica: "2024-03-16",
    observacoes_retorno: "Material recebido em perfeitas condições",
    usuario_retorno: "João Silva",
    origem: 'vendas'
  },
  {
    numeroProcesso: "EMP-2024-004",
    cnpjCliente: "33.444.555/0001-66",
    nomeCliente: "Hospital das Clínicas - USP",
    numeroDanfeEmprestimo: "55240133444555000166550010000000051123456793",
    referenciaProdutoEmprestado: "WEBMED-SYS-001",
    descricaoProdutoEmprestado: "Sistema WEBMED Gestão Hospitalar",
    valorEmprestimo: 45000.00,
    moeda: 'USD',
    dataEmprestimo: "2024-03-01",
    dataSaida: "2024-03-02",
    numeroDanfeRetorno: "55240133444555000166550010000000061123456794",
    referenciaProdutoRecebido: "WEBMED-SYS-001-UPG",
    descricaoProdutoRecebido: "Sistema WEBMED Gestão Hospitalar - Versão Atualizada",
    dataRetorno: "2024-03-20",
    valorRetornado: 50000.00,
    idImportacaoDireta: "IMP-2024-001",
    status: 'devolvido_nf',
    observacoes_retorno: "Aguardando recebimento físico da versão atualizada",
    usuario_retorno: "Maria Santos",
    origem: 'vendas'
  },
  {
    numeroProcesso: "EMP-2024-008",
    cnpjCliente: "12.345.678/0001-99",
    nomeCliente: "Hospital Albert Einstein",
    numeroDanfeEmprestimo: "55240112345678000199550010000000081123456798",
    referenciaProdutoEmprestado: "SENSOR-CO2-001",
    descricaoProdutoEmprestado: "Sensor de CO2 Transcutâneo",
    valorEmprestimo: 15000.00,
    moeda: 'USD',
    dataEmprestimo: "2024-02-10",
    dataSaida: "2024-02-11",
    idImportacaoDireta: "IMP-2024-001",
    status: 'emprestado',
    origem: 'vendas'
  },

  // Empréstimos para IMP-2024-002 - VENDAS
  {
    numeroProcesso: "EMP-2024-002",
    cnpjCliente: "98.765.432/0001-11",
    nomeCliente: "Hospital Sírio-Libanês",
    numeroDanfeEmprestimo: "55240198765432000111550010000000031123456791",
    referenciaProdutoEmprestado: "NOVA-STAT-002",
    descricaoProdutoEmprestado: "Nova StatProfile Prime Plus",
    valorEmprestimo: 65000.00,
    moeda: 'USD',
    dataEmprestimo: "2024-02-01",
    dataSaida: "2024-02-02",
    idImportacaoDireta: "IMP-2024-002",
    status: 'emprestado',
    origem: 'vendas'
  },
  {
    numeroProcesso: "EMP-2024-005",
    cnpjCliente: "44.555.666/0001-77",
    nomeCliente: "Hospital das Clínicas - FMUSP",
    numeroDanfeEmprestimo: "55240144555666000177550010000000071123456795",
    referenciaProdutoEmprestado: "ABL90-FLEX-PLUS",
    descricaoProdutoEmprestado: "Analisador de Gases Sanguíneos ABL90 FLEX PLUS",
    valorEmprestimo: 95000.00,
    moeda: 'USD',
    dataEmprestimo: "2024-03-10",
    dataSaida: "2024-03-11",
    idImportacaoDireta: "IMP-2024-002",
    status: 'emprestado',
    origem: 'vendas'
  },
  {
    numeroProcesso: "EMP-2024-009",
    cnpjCliente: "98.765.432/0001-11",
    nomeCliente: "Hospital Sírio-Libanês",
    numeroDanfeEmprestimo: "55240198765432000111550010000000091123456799",
    referenciaProdutoEmprestado: "ELECTRODO-PH-002",
    descricaoProdutoEmprestado: "Eletrodo de pH para ABL90",
    valorEmprestimo: 8500.00,
    moeda: 'USD',
    dataEmprestimo: "2023-11-15",
    dataSaida: "2023-11-16",
    idImportacaoDireta: "IMP-2024-002",
    status: 'vencido',
    origem: 'vendas'
  },

  // Empréstimos para IMP-2024-003 - VENDAS
  {
    numeroProcesso: "EMP-2024-003",
    cnpjCliente: "11.222.333/0001-44",
    nomeCliente: "INCA - Instituto Nacional de Câncer",
    numeroDanfeEmprestimo: "55240111222333000144550010000000041123456792",
    referenciaProdutoEmprestado: "RADIOMETER-PHO-003",
    descricaoProdutoEmprestado: "Eletrodos pH e Gases Radiometer",
    valorEmprestimo: 12000.00,
    moeda: 'USD',
    dataEmprestimo: "2023-12-10",
    dataSaida: "2023-12-11",
    idImportacaoDireta: "IMP-2024-003",
    status: 'vencido',
    origem: 'vendas'
  },
  {
    numeroProcesso: "EMP-2024-006",
    cnpjCliente: "11.222.333/0001-44",
    nomeCliente: "INCA - Instituto Nacional de Câncer",
    numeroDanfeEmprestimo: "55240111222333000144550010000000061123456796",
    referenciaProdutoEmprestado: "CALIBRATOR-GAS",
    descricaoProdutoEmprestado: "Gás Calibrador para Análise Sanguínea",
    valorEmprestimo: 3500.00,
    moeda: 'USD',
    dataEmprestimo: "2024-01-20",
    dataSaida: "2024-01-21",
    numeroDanfeRetorno: "55240111222333000144550010000000071123456797",
    referenciaProdutoRecebido: "CALIBRATOR-GAS",
    descricaoProdutoRecebido: "Gás Calibrador para Análise Sanguínea",
    dataRetorno: "2024-02-15",
    dataBaixa: "2024-02-16",
    valorRetornado: 3500.00,
    idImportacaoDireta: "IMP-2024-003",
    status: 'retorno_efetivado',
    id_movimentacao_retorno: "MOV-2024-0089",
    data_entrada_fisica: "2024-02-16",
    observacoes_retorno: "Material recebido conforme especificado",
    usuario_retorno: "Carlos Oliveira",
    origem: 'vendas'
  },

  // Empréstimos pontuais BRL - VENDAS
  {
    numeroProcesso: "EMP-2024-011",
    cnpjCliente: "77.888.999/0001-22",
    nomeCliente: "Hospital Santa Casa",
    numeroDanfeEmprestimo: "55240177888999000122550010000000111123456802",
    referenciaProdutoEmprestado: "REAGENTE-LAB-001",
    descricaoProdutoEmprestado: "Kit Reagentes Laboratoriais Básicos",
    valorEmprestimo: 45000.00,
    moeda: 'BRL',
    dataEmprestimo: "2024-03-20",
    dataSaida: "2024-03-21",
    status: 'emprestado',
    origem: 'vendas'
  },
  {
    numeroProcesso: "EMP-2024-012",
    cnpjCliente: "88.999.111/0001-33",
    nomeCliente: "Clínica São José",
    numeroDanfeEmprestimo: "55240188999111000133550010000000121123456803",
    referenciaProdutoEmprestado: "EQUIPAMENTO-PORT-001",
    descricaoProdutoEmprestado: "Equipamento Portátil de Diagnóstico",
    valorEmprestimo: 78500.00,
    moeda: 'BRL',
    dataEmprestimo: "2024-02-28",
    dataSaida: "2024-03-01",
    numeroDanfeRetorno: "55240188999111000133550010000000131123456804",
    referenciaProdutoRecebido: "EQUIPAMENTO-PORT-001",
    descricaoProdutoRecebido: "Equipamento Portátil de Diagnóstico",
    dataRetorno: "2024-03-25",
    dataBaixa: "2024-03-26",
    valorRetornado: 78500.00,
    status: 'retorno_efetivado',
    id_movimentacao_retorno: "MOV-2024-0201",
    data_entrada_fisica: "2024-03-26",
    observacoes_retorno: "Equipamento recebido em ótimo estado de conservação",
    usuario_retorno: "Ana Paula Costa",
    origem: 'vendas'
  },

  // Empréstimos DEPARTAMENTO TÉCNICO
  {
    numeroProcesso: "DT-EMP-2024-001",
    cnpjCliente: "55.666.777/0001-88",
    nomeCliente: "Hospital São Paulo",
    numeroDanfeEmprestimo: "55240155666777000188550010000000081123456798",
    referenciaProdutoEmprestado: "AQUA-CHECK-001",
    descricaoProdutoEmprestado: "Sistema de Verificação de Qualidade da Água",
    valorEmprestimo: 22000.00,
    moeda: 'USD',
    dataEmprestimo: "2024-03-05",
    dataSaida: "2024-03-06",
    status: 'emprestado',
    origem: 'departamento-tecnico'
  },
  {
    numeroProcesso: "DT-EMP-2024-002",
    cnpjCliente: "66.777.888/0001-99",
    nomeCliente: "Hospital Israelita Albert Einstein",
    numeroDanfeEmprestimo: "55240166777888000199550010000000101123456800",
    referenciaProdutoEmprestado: "MAINTENANCE-KIT",
    descricaoProdutoEmprestado: "Kit de Manutenção Preventiva ABL800",
    valorEmprestimo: 5800.00,
    moeda: 'USD',
    dataEmprestimo: "2024-02-25",
    dataSaida: "2024-02-26",
    numeroDanfeRetorno: "55240166777888000199550010000000111123456801",
    referenciaProdutoRecebido: "MAINTENANCE-KIT",
    descricaoProdutoRecebido: "Kit de Manutenção Preventiva ABL800",
    dataRetorno: "2024-03-18",
    dataBaixa: "2024-03-19",
    valorRetornado: 5800.00,
    status: 'devolvido_nf',
    observacoes_retorno: "DANFE registrada, aguardando chegada física no estoque",
    usuario_retorno: "Pedro Henrique",
    origem: 'departamento-tecnico'
  },
  {
    numeroProcesso: "DT-EMP-2024-003",
    cnpjCliente: "12.345.678/0001-99",
    nomeCliente: "Hospital Albert Einstein",
    numeroDanfeEmprestimo: "55240112345678000199550010000000131123456805",
    referenciaProdutoEmprestado: "ANALYZER-PORTABLE",
    descricaoProdutoEmprestado: "Analisador Portátil de Laboratório",
    valorEmprestimo: 32000.00,
    moeda: 'USD',
    dataEmprestimo: "2024-01-10",
    dataSaida: "2024-01-12",
    numeroDanfeRetorno: "55240112345678000199550010000000141123456806",
    referenciaProdutoRecebido: "ANALYZER-PORTABLE-USED",
    descricaoProdutoRecebido: "Analisador Portátil - Usado (avariado)",
    dataRetorno: "2024-03-20",
    dataBaixa: "2024-03-20",
    valorRetornado: 18000.00,
    status: 'retorno_parcial',
    id_movimentacao_retorno: "MOV-2024-0287",
    data_entrada_fisica: "2024-03-25",
    observacoes_retorno: "Material recebido com avarias. Valor reduzido devido ao estado.",
    usuario_retorno: "Juliana Fernandes",
    origem: 'departamento-tecnico'
  },
  {
    numeroProcesso: "DT-EMP-2024-004",
    cnpjCliente: "33.444.555/0001-66",
    nomeCliente: "Hospital das Clínicas - USP",
    numeroDanfeEmprestimo: "55240133444555000166550010000000151123456807",
    referenciaProdutoEmprestado: "CALIBRADOR-TECNICO",
    descricaoProdutoEmprestado: "Kit Calibrador Técnico para ABL90",
    valorEmprestimo: 18500.00,
    moeda: 'BRL',
    dataEmprestimo: "2024-04-01",
    dataSaida: "2024-04-02",
    status: 'emprestado',
    origem: 'departamento-tecnico'
  }
];

export const getEmprestimosByImportacaoId = (importacaoId: string): Emprestimo[] => {
  return emprestimosMock.filter(emprestimo => emprestimo.idImportacaoDireta === importacaoId);
};

// Nova função para buscar empréstimos por status de retorno
export const getEmprestimosPendentesRetorno = (): Emprestimo[] => {
  return emprestimosMock.filter(emprestimo => 
    emprestimo.status === 'devolvido_nf' || 
    (emprestimo.status === 'devolvido' && !emprestimo.data_entrada_fisica)
  );
};

// Nova função para calcular dias desde a devolução sem recebimento físico
export const calcularDiasRetornoPendente = (emprestimo: Emprestimo): number => {
  if (!emprestimo.dataRetorno) return 0;
  
  const dataRetorno = new Date(emprestimo.dataRetorno);
  const hoje = new Date();
  const diffTime = Math.abs(hoje.getTime() - dataRetorno.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};
