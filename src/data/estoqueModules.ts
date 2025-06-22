
import { Package, ArrowUpDown, Settings, FileText, TrendingUp } from "lucide-react";
import { EstoqueModulesConfig } from "@/types/estoque";

const mockPosicaoEstoque = [
  {
    id: 1,
    produto_codigo: "PROD001",
    produto_descricao: "Produto A",
    lote: "LT001",
    data_validade: "2024-12-31",
    deposito: "Depósito Principal",
    localizacao: "A1-01",
    quantidade_disponivel: 150,
    quantidade_reservada: 20,
    quantidade_total: 170,
    cmc_unitario: 25.50,
    cmc_total: 3825.00,
    estoque_minimo: 10,
    estoque_maximo: 200
  },
  {
    id: 2,
    produto_codigo: "PROD002",
    produto_descricao: "Produto B",
    lote: "LT002",
    data_validade: "2024-11-30",
    deposito: "Depósito Filial",
    localizacao: "B2-03",
    quantidade_disponivel: 75,
    quantidade_reservada: 5,
    quantidade_total: 80,
    cmc_unitario: 18.75,
    cmc_total: 1500.00,
    estoque_minimo: 15,
    estoque_maximo: 100
  }
];

const mockMovimentacoes = [
  {
    id: 1,
    tipo: "entrada",
    produto_codigo: "PROD001",
    produto_descricao: "Produto A",
    lote: "LT001",
    quantidade: 50,
    data_movimentacao: "2024-01-15",
    documento: "NF-12345",
    deposito_destino: "Depósito Principal",
    usuario: "João Silva"
  },
  {
    id: 2,
    tipo: "saida",
    produto_codigo: "PROD002",
    produto_descricao: "Produto B",
    lote: "LT002",
    quantidade: 25,
    data_movimentacao: "2024-01-14",
    documento: "PED-67890",
    deposito_origem: "Depósito Principal",
    usuario: "Maria Santos"
  }
];

const mockAjustes = [
  {
    id: 1,
    produto_codigo: "PROD001",
    produto_descricao: "Produto A",
    lote: "LT001",
    deposito: "Depósito Principal",
    quantidade_sistema: 150,
    quantidade_fisica: 148,
    diferenca: -2,
    motivo: "Perda por avaria",
    data_ajuste: "2024-01-16",
    usuario: "Carlos Lima",
    status: "pendente"
  }
];

const mockTransferencias = [
  {
    id: 1,
    numero_transferencia: "TRANS-001",
    data_transferencia: "2024-01-17",
    deposito_origem: "Depósito Principal",
    deposito_destino: "Depósito Filial",
    usuario_solicitante: "Ana Costa",
    status: "pendente",
    observacoes: "Transferência para reposição",
    itens: [
      {
        id: 1,
        produto_codigo: "PROD001",
        produto_descricao: "Produto A",
        lote: "LT001",
        quantidade_solicitada: 30,
        quantidade_transferida: 0
      }
    ]
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
      estoque_minimo: {
        name: "Estoque Mínimo",
        data: mockPosicaoEstoque.filter(item => item.quantidade_disponivel <= item.estoque_minimo)
      },
      produtos_vencendo: {
        name: "Produtos Vencendo",
        data: mockPosicaoEstoque.filter(item => new Date(item.data_validade) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
      }
    }
  },
  movimentacoes: {
    name: "Movimentações",
    icon: ArrowUpDown,
    subModules: {
      todas_movimentacoes: {
        name: "Todas as Movimentações",
        data: mockMovimentacoes
      },
      entradas: {
        name: "Entradas",
        data: mockMovimentacoes.filter(mov => mov.tipo === "entrada")
      },
      saidas: {
        name: "Saídas",
        data: mockMovimentacoes.filter(mov => mov.tipo === "saida")
      }
    }
  },
  ajustes: {
    name: "Ajustes de Estoque",
    icon: Settings,
    subModules: {
      ajustes_pendentes: {
        name: "Ajustes Pendentes",
        data: mockAjustes.filter(aj => aj.status === "pendente")
      },
      historico_ajustes: {
        name: "Histórico de Ajustes",
        data: mockAjustes
      }
    }
  },
  transferencias: {
    name: "Transferências",
    icon: ArrowUpDown,
    subModules: {
      transferencias_pendentes: {
        name: "Transferências Pendentes",
        data: mockTransferencias.filter(trans => trans.status === "pendente")
      },
      historico_transferencias: {
        name: "Histórico de Transferências",
        data: mockTransferencias
      }
    }
  },
  relatorios: {
    name: "Relatórios",
    icon: FileText,
    subModules: {
      relatorio_posicao: {
        name: "Relatório de Posição",
        data: []
      },
      relatorio_movimentacao: {
        name: "Relatório de Movimentação",
        data: []
      },
      relatorio_validade: {
        name: "Relatório de Validade",
        data: []
      }
    }
  }
};
