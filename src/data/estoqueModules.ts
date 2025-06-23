
import { Package, BarChart3, ArrowLeftRight, Clipboard, TrendingUp, Building2 } from "lucide-react";
import { EstoqueModulesConfig, StatusSeparacao, StatusItemSeparacao } from "@/types/estoque";

export const mockPosicaoEstoque = [
  {
    id: 1,
    produto_codigo: "944-021-U",
    produto_descricao: "Solução de Calibração S7770",
    lote: "LOT001",
    data_validade: "2025-12-31",
    cnpj: "12.345.678/0001-90",
    deposito: "Depósito Central",
    quantidade_disponivel: 150,
    quantidade_reservada: 25,
    quantidade_total: 175,
    cmc_unitario: 45.90,
    cmc_total: 8032.50,
    fornecedor: "Fornecedor ABC",
    tipo_estoque: "Normal",
    origem_entrada: "Compra"
  },
  {
    id: 2,
    produto_codigo: "944-132",
    produto_descricao: "Solução de Lavagem",
    lote: "LOT002",
    data_validade: "2024-08-15",
    cnpj: "12.345.678/0001-90",
    deposito: "Depósito Central",
    quantidade_disponivel: 80,
    quantidade_reservada: 15,
    quantidade_total: 95,
    cmc_unitario: 12.50,
    cmc_total: 1187.50,
    fornecedor: "Fornecedor XYZ",
    tipo_estoque: "Normal",
    origem_entrada: "Compra"
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

export const mockCNPJs = [
  {
    id: 1,
    codigo: "12.345.678/0001-90",
    nome: "Biodina Matriz"
  },
  {
    id: 2,
    codigo: "98.765.432/0001-01", 
    nome: "Biodina Filial SP"
  },
  {
    id: 3,
    codigo: "11.222.333/0001-44",
    nome: "Biodina Filial RJ"
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
  }
];

export const mockEstoquesDisponiveis = [
  {
    id: 1,
    cnpj: "12.345.678/0001-90",
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
    cnpj: "12.345.678/0001-90",
    deposito: "Depósito Filial",
    lote: "LOT002-2024",
    data_validade: "2025-06-30",
    localizacao_fisica: "B1-A2-D1",
    quantidade_disponivel: 25,
    tipo_estoque: "Consignado",
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
        name: "Separação de Estoque",
        data: mockSeparacaoEstoque
      },
      visao_geral: {
        name: "Visão Geral",
        data: mockPosicaoEstoque
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
