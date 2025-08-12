
import { Emprestimo, StatusEmprestimo } from "@/types/emprestimos";

export const mockEmprestimos: Emprestimo[] = [
  {
    id: 1,
    numero_processo: "EMP001-2024",
    cnpj_cliente: "12.345.678/0001-90",
    nome_cliente: "Farmácia Central LTDA",
    numero_danfe_emprestimo: "000123456",
    referencia_produto_emprestado: "BIO001",
    descricao_produto_emprestado: "Suplemento Vitamínico A",
    valor_emprestimo_dolar: 1500.00,
    data_emprestimo: "2024-01-15",
    data_saida: "2024-01-16",
    status: StatusEmprestimo.ATIVO,
    saldo_devedor: 1500.00
  },
  {
    id: 2,
    numero_processo: "EMP002-2024",
    cnpj_cliente: "98.765.432/0001-10",
    nome_cliente: "Distribuidora Health Plus",
    numero_danfe_emprestimo: "000123457",
    referencia_produto_emprestado: "BIO002",
    descricao_produto_emprestado: "Complexo B Premium",
    valor_emprestimo_dolar: 2300.00,
    data_emprestimo: "2024-01-20",
    data_saida: "2024-01-21",
    numero_danfe_retorno: "000123458",
    referencia_produto_recebido: "BIO003",
    descricao_produto_recebido: "Vitamina C 1000mg",
    data_retorno: "2024-02-15",
    valor_retornado_dolar: 1200.00,
    status: StatusEmprestimo.PARCIALMENTE_DEVOLVIDO,
    saldo_devedor: 1100.00
  },
  {
    id: 3,
    numero_processo: "EMP003-2024",
    cnpj_cliente: "11.222.333/0001-44",
    nome_cliente: "MegaFarma Rede",
    numero_danfe_emprestimo: "000123459",
    referencia_produto_emprestado: "BIO004",
    descricao_produto_emprestado: "Ômega 3 Premium",
    valor_emprestimo_dolar: 1800.00,
    data_emprestimo: "2024-02-01",
    data_saida: "2024-02-02",
    numero_danfe_retorno: "000123460",
    referencia_produto_recebido: "BIO004",
    descricao_produto_recebido: "Ômega 3 Premium",
    data_retorno: "2024-02-28",
    data_baixa: "2024-03-01",
    valor_retornado_dolar: 1800.00,
    status: StatusEmprestimo.QUITADO,
    saldo_devedor: 0
  }
];

export const getEmprestimosPorStatus = (status: StatusEmprestimo) => {
  return mockEmprestimos.filter(emp => emp.status === status);
};

export const getEmprestimosAtivos = () => {
  return mockEmprestimos.filter(emp => 
    emp.status === StatusEmprestimo.ATIVO || 
    emp.status === StatusEmprestimo.PARCIALMENTE_DEVOLVIDO
  );
};

export const getTotalSaldoDevedor = () => {
  return mockEmprestimos
    .filter(emp => emp.saldo_devedor && emp.saldo_devedor > 0)
    .reduce((total, emp) => total + (emp.saldo_devedor || 0), 0);
};
