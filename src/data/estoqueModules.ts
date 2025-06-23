import { Package, BarChart3, ArrowLeftRight, Clipboard, TrendingUp, Building2 } from "lucide-react";
import { EstoqueModulesConfig, StatusSeparacao, StatusItemSeparacao, StatusQualidade } from "@/types/estoque";

export const mockPosicaoEstoque = [
  {
    id: 1,
    produto_codigo: "944-021-U",
    produto_descricao: "Solução de Calibração S7770",
    lote: "LOT001-2024",
    data_validade: "2025-12-31",
    cnpj: "12.345.678/0001-90",
    cnpj_estado: "SP",
    deposito: "Depósito Central",
    localizacao_fisica: "A1-B2-C3",
    numero_serie: "SER123456789",
    quantidade_disponivel: 150,
    quantidade_reservada: 25,
    quantidade_total: 175,
    cmc_unitario: 45.90,
    cmc_total: 8032.50,
    fornecedor: "Fornecedor ABC Ltda",
    tipo_estoque: "Nacional",
    origem_entrada: "Compra Direta",
    status_qualidade: StatusQualidade.APROVADO,
    dias_para_vencimento: 365
  },
  {
    id: 2,
    produto_codigo: "944-132",
    produto_descricao: "Solução de Lavagem",
    lote: "LOT002-2024",
    data_validade: "2024-08-15",
    cnpj: "12.345.678/0001-90",
    cnpj_estado: "SP",
    deposito: "Depósito Central",
    localizacao_fisica: "B1-C2-D1",
    numero_serie: "SER987654321",
    quantidade_disponivel: 80,
    quantidade_reservada: 15,
    quantidade_total: 95,
    cmc_unitario: 12.50,
    cmc_total: 1187.50,
    fornecedor: "Fornecedor XYZ S.A.",
    tipo_estoque: "Nacional",
    origem_entrada: "Compra Direta",
    status_qualidade: StatusQualidade.APROVADO,
    dias_para_vencimento: 45
  },
  {
    id: 3,
    produto_codigo: "944-021-U",
    produto_descricao: "Solução de Calibração S7770",
    lote: "LOT003-2024",
    data_validade: "2025-06-30",
    cnpj: "11.222.333/0001-44",
    cnpj_estado: "RJ",
    deposito: "Depósito RJ - Centro",
    localizacao_fisica: "C1-A3-B2",
    numero_serie: "SER456789123",
    quantidade_disponivel: 200,
    quantidade_reservada: 50,
    quantidade_total: 250,
    cmc_unitario: 47.20,
    cmc_total: 11800.00,
    fornecedor: "Fornecedor ABC Ltda",
    tipo_estoque: "Importação Direta",
    origem_entrada: "Importação",
    status_qualidade: StatusQualidade.LIBERADO,
    dias_para_vencimento: 180
  },
  {
    id: 4,
    produto_codigo: "SER001",
    produto_descricao: "Seringa 3ml BD",
    lote: "LOT004-2024",
    data_validade: "2026-03-15",
    cnpj: "22.333.444/0001-55",
    cnpj_estado: "MG",
    deposito: "Depósito MG - Norte",
    localizacao_fisica: "D1-E2-F3",
    numero_serie: null,
    quantidade_disponivel: 5000,
    quantidade_reservada: 1000,
    quantidade_total: 6000,
    cmc_unitario: 2.30,
    cmc_total: 13800.00,
    fornecedor: "BD Medical Brasil",
    tipo_estoque: "Nacional",
    origem_entrada: "Compra Programada",
    status_qualidade: StatusQualidade.APROVADO,
    dias_para_vencimento: 450
  },
  {
    id: 5,
    produto_codigo: "LAB-500",
    produto_descricao: "Kit Laboratorial Completo",
    lote: "LOT005-2024",
    data_validade: "2024-12-31",
    cnpj: "33.444.555/0001-66",
    cnpj_estado: "PR",
    deposito: "Depósito PR - Sul",
    localizacao_fisica: "E1-F2-G3",
    numero_serie: "KIT789456123",
    quantidade_disponivel: 25,
    quantidade_reservada: 5,
    quantidade_total: 30,
    cmc_unitario: 850.00,
    cmc_total: 25500.00,
    fornecedor: "LabSupply Internacional",
    tipo_estoque: "Importação Direta",
    origem_entrada: "Importação",
    status_qualidade: StatusQualidade.QUARENTENA,
    dias_para_vencimento: 90
  },
  {
    id: 6,
    produto_codigo: "944-132",
    produto_descricao: "Solução de Lavagem",
    lote: "LOT006-2024",
    data_validade: "2024-07-20",
    cnpj: "11.222.333/0001-44",
    cnpj_estado: "RJ",
    deposito: "Depósito RJ - Centro",
    localizacao_fisica: "B2-C3-A1",
    numero_serie: "SER654321987",
    quantidade_disponivel: 0,
    quantidade_reservada: 0,
    quantidade_total: 0,
    cmc_unitario: 12.50,
    cmc_total: 0,
    fornecedor: "Fornecedor XYZ S.A.",
    tipo_estoque: "Nacional",
    origem_entrada: "Compra Direta",
    status_qualidade: StatusQualidade.REJEITADO,
    dias_para_vencimento: -10
  }
];

export const mockMovimentacaoEstoque = [
  {
    id: 1,
    tipo: 'entrada' as const,
    tipo_interno: 'interna' as const,
    produto_codigo: "944-021-U",
    produto_descricao: "Solução de Calibração S7770",
    lote: "LOT001",
    quantidade: 100,
    data_movimentacao: "2024-01-15",
    documento: "NF-12345",
    cnpj_origem: "98.765.432/0001-01",
    deposito_origem: "Fornecedor",
    cnpj_destino: "12.345.678/0001-90",
    deposito_destino: "Depósito Central",
    usuario: "admin",
    status: 'concluida' as const,
    nf_vinculada: "NF-12345",
    produtos_adicionais: 2
  }
];

// Export alias for compatibility with existing imports
export const mockMovimentacoes = mockMovimentacaoEstoque;

export const mockEmprestimos = [
  {
    id: 1,
    produto_codigo: "944-021-U",
    lote: "LOT001-2024",
    quantidade: 2,
    cliente_fornecedor: "Hospital São Francisco",
    tipo_vinculo: 'cliente' as const,
    data_emprestimo: "2024-01-10",
    data_devolucao: undefined,
    status: 'em_debito' as const,
    motivo: "Teste de compatibilidade - Picolés importação direta",
    responsavel: "maria.silva",
    observacoes: "Produtos consumíveis - não retornam ao estoque"
  },
  {
    id: 2,
    produto_codigo: "SER001",
    lote: "LOT004-2024",
    quantidade: 50,
    cliente_fornecedor: "Fornecedor ABC Ltda",
    tipo_vinculo: 'fornecedor' as const,
    data_emprestimo: "2024-01-05",
    data_devolucao: "2024-01-15",
    status: 'quitado' as const,
    motivo: "Empréstimo para testes de qualidade",
    responsavel: "carlos.ferreira",
    observacoes: "Devolvido conforme acordo"
  },
  {
    id: 3,
    produto_codigo: "LAB-500",
    lote: "LOT005-2024",
    quantidade: 1,
    cliente_fornecedor: "Clínica Beta",
    tipo_vinculo: 'cliente' as const,
    data_emprestimo: "2024-01-20",
    data_devolucao: undefined,
    status: 'vencido' as const,
    motivo: "Demonstração técnica",
    responsavel: "ana.costa",
    observacoes: "Empréstimo vencido - necessário cobrança"
  }
];

export const mockLogsAuditoria = [
  {
    id: 1,
    produto_codigo: "944-021-U",
    lote: "LOT001-2024",
    campo_alterado: "quantidade_disponivel",
    valor_anterior: "150",
    valor_novo: "148",
    data_alteracao: "2024-01-22T14:30:00",
    usuario: "admin",
    justificativa: "Ajuste após inventário físico - encontradas 2 unidades a menos",
    tipo_operacao: 'manual' as const
  },
  {
    id: 2,
    produto_codigo: "SER001",
    lote: "LOT004-2024",
    campo_alterado: "localizacao_fisica",
    valor_anterior: "D1-E2-F3",
    valor_novo: "D1-E2-F4",
    data_alteracao: "2024-01-23T09:15:00",
    usuario: "operador1",
    justificativa: "Reorganização do depósito - mudança de prateleira",
    tipo_operacao: 'manual' as const
  },
  {
    id: 3,
    produto_codigo: "LAB-500",
    lote: "LOT005-2024",
    campo_alterado: "status_qualidade",
    valor_anterior: "quarentena",
    valor_novo: "aprovado",
    data_alteracao: "2024-01-24T16:45:00",
    usuario: "qualidade.supervisor",
    justificativa: "Liberação após análise laboratorial - conformidade aprovada",
    tipo_operacao: 'automatica' as const
  }
];

export const mockKitsDesmembrados = [
  {
    id: 1,
    kit_codigo: "KIT-CERV-12",
    kit_descricao: "Caixa Cerveja 12 Unidades",
    quantidade_kit: 5,
    data_desmembramento: "2024-01-18T11:20:00",
    usuario: "operador2",
    itens_resultantes: [
      {
        codigo: "CERV-UNIT-001",
        descricao: "Cerveja Unidade Individual",
        quantidade: 60,
        lote_gerado: "DESM-001-2024"
      }
    ],
    observacoes: "Desmembramento para venda unitária"
  },
  {
    id: 2,
    kit_codigo: "KIT-MED-EMER",
    kit_descricao: "Kit Médico Emergência",
    quantidade_kit: 2,
    data_desmembramento: "2024-01-19T15:30:00",
    usuario: "admin",
    itens_resultantes: [
      {
        codigo: "SER-10ML",
        descricao: "Seringa 10ml",
        quantidade: 20,
        lote_gerado: "DESM-002-2024"
      },
      {
        codigo: "BAND-CIR",
        descricao: "Bandagem Cirúrgica",
        quantidade: 10,
        lote_gerado: "DESM-002-2024"
      },
      {
        codigo: "LUVA-DESC",
        descricao: "Luva Descartável",
        quantidade: 40,
        lote_gerado: "DESM-002-2024"
      }
    ],
    observacoes: "Desmembramento para uso hospitalar específico"
  }
];

export const mockCNPJs = [
  {
    id: 1,
    codigo: "12.345.678/0001-90",
    nome: "Biodina Matriz",
    estado: "SP"
  },
  {
    id: 2,
    codigo: "98.765.432/0001-01", 
    nome: "Biodina Filial SP",
    estado: "SP"
  },
  {
    id: 3,
    codigo: "11.222.333/0001-44",
    nome: "Biodina Filial RJ",
    estado: "RJ"
  },
  {
    id: 4,
    codigo: "22.333.444/0001-55",
    nome: "Biodina Filial MG",
    estado: "MG"
  },
  {
    id: 5,
    codigo: "33.444.555/0001-66",
    nome: "Biodina Filial PR",
    estado: "PR"
  }
];

export const mockDepositos = [
  {
    id: 1,
    nome: "Depósito Central",
    cnpj_id: 1
  },
  {
    id: 2,
    nome: "Depósito Filial",
    cnpj_id: 1
  },
  {
    id: 3,
    nome: "Depósito SP - Principal",
    cnpj_id: 2
  },
  {
    id: 4,
    nome: "Depósito SP - Secundário",
    cnpj_id: 2
  },
  {
    id: 5,
    nome: "Depósito RJ - Centro",
    cnpj_id: 3
  }
];

export const mockSeparacaoEstoque = [
  {
    id: 1,
    numero_pedido: "85696",
    nop: "6.108 WM",
    vendedor: "gustavo.brito",
    cliente: "Bronstein Filial",
    endereco_cliente: "Rua das Palmeiras, 123 - Centro, Rio de Janeiro - RJ",
    cliente_estado: "RJ",
    data_entrega: "2025-05-18",
    status: StatusSeparacao.SEPARADO_PARCIAL,
    regiao: "RJ",
    transportadora: "Transportadora ABC",
    observacoes: "Cliente exige validade mínima de 6 meses",
    quantidade_volumes: 3,
    peso_bruto: 15.5,
    peso_liquido: 14.2,
    progresso: {
      separados: 2,
      total: 3
    },
    itens: [
      {
        id: 1,
        codigo_produto: "944-021-U",
        descricao_produto: "Solução de Calibração S7770",
        quantidade_solicitada: 2,
        quantidade_separada: 2,
        status: StatusItemSeparacao.SEPARADO,
        lote: "LOT001-2024",
        numero_serie: "SER123456",
        data_validade: "2025-12-31"
      },
      {
        id: 2,
        codigo_produto: "944-132",
        descricao_produto: "Solução de Lavagem",
        quantidade_solicitada: 1,
        quantidade_separada: 0,
        status: StatusItemSeparacao.INDISPONIVEL,
        lote: null,
        numero_serie: null,
        data_validade: null
      },
      {
        id: 3,
        codigo_produto: "SER001",
        descricao_produto: "Seringa 3ml BD",
        quantidade_solicitada: 100,
        quantidade_separada: 0,
        status: StatusItemSeparacao.PENDENTE,
        lote: null,
        numero_serie: null,
        data_validade: null
      }
    ]
  },
  {
    id: 2,
    numero_pedido: "85697",
    nop: "6.109 SP",
    vendedor: "maria.silva",
    cliente: "Hospital São Paulo",
    endereco_cliente: "Av. Paulista, 500 - Bela Vista, São Paulo - SP",
    cliente_estado: "SP",
    data_entrega: "2025-05-20",
    status: StatusSeparacao.PLANEJADO,
    regiao: "SP",
    transportadora: "Transportadora XYZ",
    observacoes: "Entrega urgente - prioridade alta",
    quantidade_volumes: 5,
    peso_bruto: 25.8,
    peso_liquido: 23.1,
    progresso: {
      separados: 0,
      total: 2
    },
    itens: [
      {
        id: 4,
        codigo_produto: "944-021-U",
        descricao_produto: "Solução de Calibração S7770",
        quantidade_solicitada: 5,
        quantidade_separada: 0,
        status: StatusItemSeparacao.PENDENTE,
        lote: null,
        numero_serie: null,
        data_validade: null
      },
      {
        id: 5,
        codigo_produto: "LAB-500",
        descricao_produto: "Kit Laboratorial Completo",
        quantidade_solicitada: 2,
        quantidade_separada: 0,
        status: StatusItemSeparacao.PENDENTE,
        lote: null,
        numero_serie: null,
        data_validade: null
      }
    ]
  },
  {
    id: 3,
    numero_pedido: "85698",
    nop: "6.110 MG",
    vendedor: "carlos.ferreira",
    cliente: "Laboratório Minas",
    endereco_cliente: "Rua dos Inconfidentes, 200 - Centro, Belo Horizonte - MG",
    cliente_estado: "MG",
    data_entrega: "2025-05-22",
    status: StatusSeparacao.SEPARADO,
    regiao: "MG",
    transportadora: "Transportadora Sul",
    observacoes: "Produtos frágeis - cuidado no manuseio",
    quantidade_volumes: 2,
    peso_bruto: 8.5,
    peso_liquido: 7.8,
    progresso: {
      separados: 2,
      total: 2
    },
    itens: [
      {
        id: 6,
        codigo_produto: "944-200",
        descricao_produto: "Reagente Especial",
        quantidade_solicitada: 3,
        quantidade_separada: 3,
        status: StatusItemSeparacao.SEPARADO,
        lote: "LOT003-2024",
        numero_serie: "SER789012",
        data_validade: "2025-10-15"
      },
      {
        id: 7,
        codigo_produto: "944-150",
        descricao_produto: "Controle de Qualidade",
        quantidade_solicitada: 1,
        quantidade_separada: 1,
        status: StatusItemSeparacao.SEPARADO,
        lote: "LOT004-2024",
        numero_serie: "SER345678",
        data_validade: "2025-08-30"
      }
    ]
  },
  {
    id: 4,
    numero_pedido: "85699",
    nop: "6.111 PR",
    vendedor: "ana.costa",
    cliente: "Clínica Paraná",
    endereco_cliente: "Av. Brasil, 150 - Centro, Curitiba - PR",
    cliente_estado: "PR",
    data_entrega: "2025-05-25",
    status: StatusSeparacao.INDISPONIVEL,
    regiao: "PR",
    transportadora: "Transportadora Norte",
    observacoes: "Aguardando reposição de estoque",
    quantidade_volumes: 1,
    peso_bruto: 3.2,
    peso_liquido: 2.9,
    progresso: {
      separados: 0,
      total: 1
    },
    itens: [
      {
        id: 8,
        codigo_produto: "944-300",
        descricao_produto: "Kit Diagnóstico Rápido",
        quantidade_solicitada: 10,
        quantidade_separada: 0,
        status: StatusItemSeparacao.INDISPONIVEL,
        lote: null,
        numero_serie: null,
        data_validade: null
      }
    ]
  },
  {
    id: 5,
    numero_pedido: "85700",
    nop: "6.112 BA",
    vendedor: "roberto.santos",
    cliente: "Hospital Salvador",
    endereco_cliente: "Rua da Bahia, 80 - Pelourinho, Salvador - BA",
    cliente_estado: "BA",
    data_entrega: "2025-05-28",
    status: StatusSeparacao.FINALIZADO,
    regiao: "BA",
    transportadora: "Transportadora Nordeste",
    observacoes: "Pedido completo e expedido",
    quantidade_volumes: 4,
    peso_bruto: 18.7,
    peso_liquido: 17.2,
    progresso: {
      separados: 3,
      total: 3
    },
    itens: [
      {
        id: 9,
        codigo_produto: "944-021-U",
        descricao_produto: "Solução de Calibração S7770",
        quantidade_solicitada: 4,
        quantidade_separada: 4,
        status: StatusItemSeparacao.SEPARADO,
        lote: "LOT005-2024",
        numero_serie: "SER901234",
        data_validade: "2025-11-20"
      },
      {
        id: 10,
        codigo_produto: "944-132",
        descricao_produto: "Solução de Lavagem",
        quantidade_solicitada: 2,
        quantidade_separada: 2,
        status: StatusItemSeparacao.SEPARADO,
        lote: "LOT006-2024",
        numero_serie: "SER567890",
        data_validade: "2025-09-10"
      },
      {
        id: 11,
        codigo_produto: "LAB-600",
        descricao_produto: "Material Descartável Kit",
        quantidade_solicitada: 50,
        quantidade_separada: 50,
        status: StatusItemSeparacao.SEPARADO,
        lote: "LOT007-2024",
        numero_serie: "SER123890",
        data_validade: "2026-01-15"
      }
    ]
  }
];

export const mockEstoquesDisponiveis = [
  {
    id: 1,
    cnpj: "12.345.678/0001-90",
    cnpj_estado: "SP",
    deposito: "Depósito Central",
    lote: "LOT001-2024",
    data_validade: "2025-12-31",
    localizacao_fisica: "A1-B2-C3",
    quantidade_disponivel: 50,
    tipo_estoque: "Normal",
    numero_serie: "SER123456",
    dias_para_vencimento: 365
  },
  {
    id: 2,
    cnpj: "11.222.333/0001-44",
    cnpj_estado: "RJ",
    deposito: "Depósito Filial RJ",
    lote: "LOT002-2024",
    data_validade: "2025-06-30",
    localizacao_fisica: "B1-A2-D1",
    quantidade_disponivel: 25,
    tipo_estoque: "Normal",
    numero_serie: "SER789012",
    dias_para_vencimento: 180
  }
];

export const estoqueModules: EstoqueModulesConfig = {
  posicao_estoque: {
    name: "Posição de Estoque",
    icon: Package,
    subModules: {
      posicao_atual: {
        name: "Posição Atual",
        data: mockPosicaoEstoque
      },
      separacao_estoque: {
        name: "Separação",
        data: mockSeparacaoEstoque
      }
    }
  },
  movimentacoes: {
    name: "Movimentações",
    icon: ArrowLeftRight,
    subModules: {
      movimentacao_estoque: {
        name: "Movimentação de Estoque",
        data: mockMovimentacaoEstoque
      },
      historico_movimentacoes: {
        name: "Histórico de Movimentações",
        data: mockMovimentacaoEstoque
      }
    }
  },
  relatorios: {
    name: "Relatórios",
    icon: BarChart3,
    subModules: {
      giro_estoque: {
        name: "Giro de Estoque",
        data: []
      },
      validade_produtos: {
        name: "Validade de Produtos",
        data: []
      },
      ruptura_estoque: {
        name: "Ruptura de Estoque",
        data: []
      }
    }
  },
  auditoria: {
    name: "Auditoria",
    icon: Clipboard,
    subModules: {
      inventario_fisico: {
        name: "Inventário Físico",
        data: []
      },
      divergencias: {
        name: "Divergências",
        data: []
      }
    }
  },
  analises: {
    name: "Análises",
    icon: TrendingUp,
    subModules: {
      abc_xyz: {
        name: "Análise ABC/XYZ",
        data: []
      },
      sazonalidade: {
        name: "Sazonalidade",
        data: []
      }
    }
  },
  configuracoes: {
    name: "Configurações",
    icon: Building2,
    subModules: {
      cnpjs: {
        name: "CNPJs",
        data: []
      },
      depositos: {
        name: "Depósitos",
        data: []
      },
      localizacoes: {
        name: "Localizações",
        data: []
      }
    }
  }
};
