
import { Emprestimo, EmprestimoStatus } from "@/types/emprestimos";

export const emprestimosData: Emprestimo[] = [
  {
    id: 1,
    numeroProcesso: "EMP-2024-001",
    cnpjCliente: "12.345.678/0001-90",
    nomeCliente: "Farmácia Central Ltda",
    numeroDanfeEmprestimo: "DANFE-001-2024",
    referenciaProdutoEmprestado: "PROD-12345",
    descricaoProdutoEmprestado: "Equipamento de Análise Clínica - Modelo X1",
    valorEmprestimoDolar: 15000.00,
    dataEmprestimo: "2024-01-15",
    dataSaida: "2024-01-16",
    numeroDanfeRetorno: "DANFE-RET-001",
    referenciaProdutoRecebido: "PROD-12345",
    descricaoProdutoRecebido: "Equipamento de Análise Clínica - Modelo X1",
    dataRetorno: "2024-03-15",
    dataBaixa: "2024-03-16",
    valorRetornadoDolar: 15000.00,
    idImportacaoDireta: "IMP-2024-001",
    status: EmprestimoStatus.DEVOLVIDO
  },
  {
    id: 2,
    numeroProcesso: "EMP-2024-002",
    cnpjCliente: "98.765.432/0001-10",
    nomeCliente: "Hospital São José",
    numeroDanfeEmprestimo: "DANFE-002-2024",
    referenciaProdutoEmprestado: "PROD-67890",
    descricaoProdutoEmprestado: "Monitor Multiparâmetros Profissional",
    valorEmprestimoDolar: 8500.00,
    dataEmprestimo: "2024-02-10",
    dataSaida: "2024-02-11",
    status: EmprestimoStatus.ATIVO
  },
  {
    id: 3,
    numeroProcesso: "EMP-2024-003",
    cnpjCliente: "11.222.333/0001-44",
    nomeCliente: "Clínica Medical Center",
    numeroDanfeEmprestimo: "DANFE-003-2024",
    referenciaProdutoEmprestado: "PROD-11111",
    descricaoProdutoEmprestado: "Ultrassom Portátil Premium",
    valorEmprestimoDolar: 25000.00,
    dataEmprestimo: "2024-01-05",
    dataSaida: "2024-01-06",
    numeroDanfeRetorno: "DANFE-RET-003",
    referenciaProdutoRecebido: "PROD-22222",
    descricaoProdutoRecebido: "Ultrassom Portátil Standard",
    dataRetorno: "2024-03-05",
    valorRetornadoDolar: 18000.00,
    status: EmprestimoStatus.PARCIAL
  },
  {
    id: 4,
    numeroProcesso: "EMP-2024-004",
    cnpjCliente: "55.666.777/0001-88",
    nomeCliente: "Laboratório Vida Saudável",
    numeroDanfeEmprestimo: "DANFE-004-2024",
    referenciaProdutoEmprestado: "PROD-33333",
    descricaoProdutoEmprestado: "Centrífuga de Alta Velocidade",
    valorEmprestimoDolar: 12000.00,
    dataEmprestimo: "2023-11-20",
    dataSaida: "2023-11-21",
    status: EmprestimoStatus.VENCIDO
  },
  {
    id: 5,
    numeroProcesso: "EMP-2024-005",
    cnpjCliente: "99.888.777/0001-66",
    nomeCliente: "Farmácia Popular",
    numeroDanfeEmprestimo: "DANFE-005-2024",
    referenciaProdutoEmprestado: "PROD-44444",
    descricaoProdutoEmprestado: "Sistema de Automação Laboratorial",
    valorEmprestimoDolar: 35000.00,
    dataEmprestimo: "2024-03-01",
    dataSaida: "2024-03-02",
    idImportacaoDireta: "IMP-2024-005",
    status: EmprestimoStatus.ATIVO
  }
];

export const getEstatisticasEmprestimos = (emprestimos: Emprestimo[]) => {
  return {
    totalEmprestimos: emprestimos.length,
    valorTotalEmprestado: emprestimos.reduce((sum, emp) => sum + emp.valorEmprestimoDolar, 0),
    valorTotalDevolvido: emprestimos.reduce((sum, emp) => sum + (emp.valorRetornadoDolar || 0), 0),
    emprestimosAtivos: emprestimos.filter(emp => emp.status === EmprestimoStatus.ATIVO).length,
    emprestimosVencidos: emprestimos.filter(emp => emp.status === EmprestimoStatus.VENCIDO).length
  };
};
