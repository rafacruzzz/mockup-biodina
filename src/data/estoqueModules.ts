import { Package, ArrowUpDown, Settings, FileText } from "lucide-react";
import { EstoqueModulesConfig, StatusMovimentacao, TipoMovimentacaoHistorico } from "@/types/estoque";

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
    fornecedor: "ImportMed",
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

export const estoqueModules: EstoqueModulesConfig = {
  posicao_estoque: {
    name: "Posição de Estoque",
    icon: Package,
    subModules: {
      visao_geral: {
        name: "Visão Geral",
        data: mockPosicaoEstoque
      },
      multilotes: {
        name: "Multi-lotes",
        data: mockPosicaoEstoque.filter(item => 
          mockPosicaoEstoque.filter(p => p.produto_codigo === item.produto_codigo).length > 1
        )
      },
      alertas: {
        name: "Alertas",
        data: mockPosicaoEstoque.filter(item => 
          item.data_validade && new Date(item.data_validade) <= new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        )
      }
    }
  },
  movimentacoes: {
    name: "Movimentações",
    icon: ArrowUpDown,
    subModules: {
      historico: {
        name: "Histórico",
        data: mockMovimentacoes
      }
    }
  },
  ajustes: {
    name: "Ajustes",
    icon: Settings,
    subModules: {
      pendentes: {
        name: "Pendentes",
        data: []
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

export { mockMovimentacoes, mockCNPJs, mockDepositos };
