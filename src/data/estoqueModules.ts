import { Package, ArrowUpDown, FileText } from "lucide-react";
import { EstoqueModulesConfig, StatusMovimentacao, TipoMovimentacaoHistorico, PedidoSeparacao, StatusSeparacao, StatusItemSeparacao } from "@/types/estoque";

const mockPosicaoEstoque = [
  {
    id: 1,
    produto_codigo: "SER001",
    produto_descricao: "Seringa 3ml BD",
    lote: "L2305",
    data_validade: "2025-12-10",
    cnpj: "WebMED RJ",
    deposito: "Prateleira A2",
    quantidade_disponivel: 1200,
    quantidade_reservada: 250,
    quantidade_total: 1450,
    cmc_unitario: 0.85,
    cmc_total: 1020.00,
    fornecedor: "ImportMed",
    tipo_estoque: "Importação Direta",
    origem_entrada: "DI #4928"
  },
  {
    id: 2,
    produto_codigo: "SER001",
    produto_descricao: "Seringa 3ml BD",
    lote: "L2308",
    data_validade: "2026-01-12",
    cnpj: "Distrib. SP",
    deposito: "Câmara 3",
    quantidade_disponivel: 500,
    quantidade_reservada: 0,
    quantidade_total: 500,
    cmc_unitario: 0.82,
    cmc_total: 410.00,
    fornecedor: "ImportM ed",
    tipo_estoque: "Consignado",
    origem_entrada: "Nota 789"
  },
  {
    id: 3,
    produto_codigo: "NOB200",
    produto_descricao: "Nobreak 600VA PowerTech",
    lote: "S349001",
    data_validade: null,
    cnpj: "WebMED JF",
    deposito: "Galpão",
    quantidade_disponivel: 5,
    quantidade_reservada: 2,
    quantidade_total: 7,
    cmc_unitario: 450.00,
    cmc_total: 2025.00,
    fornecedor: "PowerTech",
    tipo_estoque: "Nacional",
    origem_entrada: "Nota 223"
  },
  {
    id: 4,
    produto_codigo: "CAT024",
    produto_descricao: "Cateter Venoso 24G",
    lote: "CT2401",
    data_validade: "2024-03-15",
    cnpj: "WebMED RJ",
    deposito: "Refrigerado A1",
    quantidade_disponivel: 150,
    quantidade_reservada: 0,
    quantidade_total: 150,
    cmc_unitario: 2.30,
    cmc_total: 345.00,
    fornecedor: "MedTech",
    tipo_estoque: "Nacional",
    origem_entrada: "Nota 445"
  }
];

const mockMovimentacoes = [
  {
    id: 1,
    tipo: "transferencia",
    tipo_interno: TipoMovimentacaoHistorico.ENTRE_CNPJS,
    produto_codigo: "SER001",
    produto_descricao: "Seringa 3ml BD",
    lote: "L2305",
    quantidade: 1200,
    data_movimentacao: "2025-06-21",
    documento: "MOV-001478",
    cnpj_origem: "WebMED RJ",
    cnpj_destino: "Distrib. SP",
    deposito_origem: "Prateleira A2",
    deposito_destino: "Estoque Central",
    usuario: "Thaís Silva",
    status: StatusMovimentacao.CONCLUIDA,
    nf_vinculada: "NF 001478",
    pedido_vinculado: "PED-12345"
  },
  {
    id: 2,
    tipo: "transferencia",
    tipo_interno: TipoMovimentacaoHistorico.INTERNA,
    produto_codigo: "NOB200",
    produto_descricao: "Nobreak 600VA PowerTech",
    lote: "S349001",
    quantidade: 1,
    data_movimentacao: "2025-06-20",
    documento: "MOV-001479",
    cnpj_origem: "WebMED JF",
    cnpj_destino: "WebMED JF",
    deposito_origem: "Galpão",
    deposito_destino: "Câmara 1",
    usuario: "Janaína Santos",
    status: StatusMovimentacao.PENDENTE
  },
  {
    id: 3,
    tipo: "transferencia",
    tipo_interno: TipoMovimentacaoHistorico.ENTRE_CNPJS,
    produto_codigo: "CAT024",
    produto_descricao: "Cateter Venoso 24G",
    lote: "CT2401",
    quantidade: 150,
    data_movimentacao: "2025-06-19",
    documento: "MOV-001480",
    cnpj_origem: "WebMED RJ",
    cnpj_destino: "WebMED Matriz",
    deposito_origem: "Refrigerado A1",
    deposito_destino: "Almoxarifado",
    usuario: "Carlos Mendes",
    status: StatusMovimentacao.CONCLUIDA,
    nf_vinculada: "NF 001480",
    produtos_adicionais: 2
  },
  {
    id: 4,
    tipo: "transferencia",
    tipo_interno: TipoMovimentacaoHistorico.INTERNA,
    produto_codigo: "SER001",
    produto_descricao: "Seringa 3ml BD",
    lote: "L2308",
    quantidade: 500,
    data_movimentacao: "2025-06-18",
    documento: "MOV-001481",
    cnpj_origem: "Distrib. SP",
    cnpj_destino: "Distrib. SP",
    deposito_origem: "Câmara 3",
    deposito_destino: "Estoque Central",
    usuario: "Ana Costa",
    status: StatusMovimentacao.CANCELADA
  }
];

const mockCNPJs = [
  { id: 1, codigo: "12.345.678/0001-90", nome: "WebMED RJ" },
  { id: 2, codigo: "98.765.432/0001-10", nome: "WebMED JF" },
  { id: 3, codigo: "11.222.333/0001-44", nome: "Distrib. SP" },
  { id: 4, codigo: "55.666.777/0001-88", nome: "WebMED Matriz" }
];

const mockDepositos = [
  { id: 1, nome: "Prateleira A1", cnpj_id: 1 },
  { id: 2, nome: "Prateleira A2", cnpj_id: 1 },
  { id: 3, nome: "Câmara Fria 1", cnpj_id: 1 },
  { id: 4, nome: "Refrigerado A1", cnpj_id: 1 },
  { id: 5, nome: "Câmara 3", cnpj_id: 2 },
  { id: 6, nome: "Galpão", cnpj_id: 2 },
  { id: 7, nome: "Estoque Central", cnpj_id: 3 },
  { id: 8, nome: "Almoxarifado", cnpj_id: 4 }
];

const mockPedidosSeparacao: PedidoSeparacao[] = [
  {
    id: 1,
    numero_pedido: "85696",
    nop: "6.108 WM",
    vendedor: "gustavo.brito",
    cliente: "Bronstein Filial",
    endereco_cliente: "Rua das Palmeiras, 123 - Centro, Rio de Janeiro - RJ",
    data_entrega: "2025-05-19",
    status: StatusSeparacao.SEPARADO_PARCIAL,
    regiao: "RJ",
    transportadora: "",
    observacoes: "Cliente exige validade mínima de 6 meses",
    quantidade_volumes: 3,
    peso_bruto: 15.5,
    peso_liquido: 12.3,
    progresso: { separados: 2, total: 3 },
    itens: [
      {
        id: 1,
        codigo_produto: "944-021-U",
        descricao_produto: "Solução de Calibração S7770",
        quantidade_solicitada: 2,
        quantidade_separada: 2,
        status: StatusItemSeparacao.SEPARADO
      },
      {
        id: 2,
        codigo_produto: "944-132",
        descricao_produto: "Solução de Lavagem",
        quantidade_solicitada: 1,
        quantidade_separada: 0,
        status: StatusItemSeparacao.INDISPONIVEL
      },
      {
        id: 3,
        codigo_produto: "SER001",
        descricao_produto: "Seringa 3ml BD",
        quantidade_solicitada: 100,
        quantidade_separada: 0,
        status: StatusItemSeparacao.PENDENTE
      }
    ]
  },
  {
    id: 2,
    numero_pedido: "85779",
    nop: "6.949-RES.ICMS",
    vendedor: "thais.rodrigues",
    cliente: "IDEAS",
    endereco_cliente: "Av. Presidente Vargas, 456 - Centro, Rio de Janeiro - RJ",
    data_entrega: "2025-05-20",
    status: StatusSeparacao.SOLICITADO,
    regiao: "RJ",
    transportadora: "",
    quantidade_volumes: 2,
    peso_bruto: 8.2,
    peso_liquido: 6.8,
    progresso: { separados: 0, total: 2 },
    itens: [
      {
        id: 4,
        codigo_produto: "CAT024",
        descricao_produto: "Cateter Venoso 24G",
        quantidade_solicitada: 50,
        quantidade_separada: 0,
        status: StatusItemSeparacao.PENDENTE
      },
      {
        id: 5,
        codigo_produto: "NOB200",
        descricao_produto: "Nobreak 600VA PowerTech",
        quantidade_solicitada: 1,
        quantidade_separada: 0,
        status: StatusItemSeparacao.PENDENTE
      }
    ]
  },
  {
    id: 3,
    numero_pedido: "85821",
    nop: "6.234 SP",
    vendedor: "carlos.santos",
    cliente: "Hospital Santa Maria",
    endereco_cliente: "Rua das Flores, 789 - Vila Madalena, São Paulo - SP",
    data_entrega: "2025-05-21",
    status: StatusSeparacao.SEPARADO,
    regiao: "SP",
    transportadora: "Transportes Express",
    quantidade_volumes: 5,
    peso_bruto: 22.8,
    peso_liquido: 18.5,
    progresso: { separados: 4, total: 4 },
    itens: [
      {
        id: 6,
        codigo_produto: "MED150",
        descricao_produto: "Kit Diagnóstico Rápido",
        quantidade_solicitada: 20,
        quantidade_separada: 20,
        status: StatusItemSeparacao.SEPARADO
      },
      {
        id: 7,
        codigo_produto: "LAB300",
        descricao_produto: "Reagente para Análise",
        quantidade_solicitada: 5,
        quantidade_separada: 5,
        status: StatusItemSeparacao.SEPARADO
      }
    ]
  },
  {
    id: 4,
    numero_pedido: "85934",
    nop: "6.445 RJ",
    vendedor: "ana.costa",
    cliente: "Clínica Renovar",
    endereco_cliente: "Av. Atlântica, 1200 - Copacabana, Rio de Janeiro - RJ",
    data_entrega: "2025-05-18",
    status: StatusSeparacao.FINALIZADO,
    regiao: "RJ",
    transportadora: "LogFast",
    observacoes: "Entrega urgente - cliente preferencial",
    quantidade_volumes: 2,
    peso_bruto: 12.3,
    peso_liquido: 9.8,
    progresso: { separados: 3, total: 3 },
    itens: [
      {
        id: 8,
        codigo_produto: "EQP400",
        descricao_produto: "Monitor Multiparâmetro",
        quantidade_solicitada: 1,
        quantidade_separada: 1,
        status: StatusItemSeparacao.SEPARADO
      },
      {
        id: 9,
        codigo_produto: "ACC200",
        descricao_produto: "Cabo de ECG 12 derivações",
        quantidade_solicitada: 3,
        quantidade_separada: 3,
        status: StatusItemSeparacao.SEPARADO
      }
    ]
  },
  {
    id: 5,
    numero_pedido: "86102",
    nop: "6.678 SP",
    vendedor: "rafael.oliveira",
    cliente: "Lab Excelência",
    endereco_cliente: "Rua Augusta, 2500 - Cerqueira César, São Paulo - SP",
    data_entrega: "2025-05-22",
    status: StatusSeparacao.PLANEJADO,
    regiao: "SP",
    transportadora: "",
    quantidade_volumes: 1,
    peso_bruto: 5.2,
    peso_liquido: 4.1,
    progresso: { separados: 0, total: 2 },
    itens: [
      {
        id: 10,
        codigo_produto: "BIO500",
        descricao_produto: "Kit Bioquímica Completo",
        quantidade_solicitada: 1,
        quantidade_separada: 0,
        status: StatusItemSeparacao.PENDENTE
      },
      {
        id: 11,
        codigo_produto: "CTR100",
        descricao_produto: "Controle de Qualidade",
        quantidade_solicitada: 2,
        quantidade_separada: 0,
        status: StatusItemSeparacao.PENDENTE
      }
    ]
  }
];

const mockEstoquesDisponiveis = [
  {
    id: 1,
    cnpj: "WebMED RJ",
    deposito: "Prateleira A2",
    lote: "L2305",
    data_validade: "2025-12-10",
    localizacao_fisica: "A2-15-C",
    quantidade_disponivel: 1200,
    tipo_estoque: "Importação Direta",
    dias_para_vencimento: 198
  },
  {
    id: 2,
    cnpj: "Distrib. SP",
    deposito: "Câmara 3",
    lote: "L2308",
    data_validade: "2026-01-12",
    localizacao_fisica: "C3-08-A",
    quantidade_disponivel: 500,
    tipo_estoque: "Consignado",
    dias_para_vencimento: 231
  }
];

export const estoqueModules: EstoqueModulesConfig = {
  posicao_estoque: {
    name: "Posição de Estoque",
    icon: Package,
    subModules: {
      visao_geral: {
        name: "Visão Geral",
        data: mockPosicaoEstoque
      },
      separacao_estoque: {
        name: "Separação",
        data: mockPedidosSeparacao
      }
    }
  },
  movimentacoes: {
    name: "Movimentações",
    icon: ArrowUpDown,
    subModules: {
      movimentacao_estoque: {
        name: "Movimentação de Estoque",
        data: mockMovimentacoes
      }
    }
  },
  relatorios: {
    name: "Relatórios",
    icon: FileText,
    subModules: {
      gerenciais: {
        name: "Gerenciais",
        data: []
      }
    }
  }
};

export { mockMovimentacoes, mockCNPJs, mockDepositos, mockPedidosSeparacao, mockEstoquesDisponiveis };
