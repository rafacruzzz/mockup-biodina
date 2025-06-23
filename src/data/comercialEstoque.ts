
import { EstoqueVendivel, UnidadeVenda, ProdutoPedido } from '@/types/comercial';

export const mockProdutosEstoque: Record<string, EstoqueVendivel> = {
  'CAT024': {
    totalDisponivel: 650,
    totalReservado: 220,
    estoquesPorCnpj: [
      { cnpj: '12.345.678/0001-90', nomeEmpresa: 'WebMED RJ', quantidade: 500 },
      { cnpj: '98.765.432/0001-10', nomeEmpresa: 'Distrib. SP', quantidade: 150 }
    ],
    lotes: [
      { 
        lote: 'CT2481', 
        quantidade: 150, 
        dataValidade: '2024-03-15', 
        diasParaVencimento: 45,
        alertaValidade: true 
      },
      { 
        lote: 'CT2485', 
        quantidade: 500, 
        dataValidade: '2025-12-01', 
        diasParaVencimento: 358,
        alertaValidade: false 
      }
    ],
    tiposEstoque: [
      { tipo: 'Nacional', quantidade: 500 },
      { tipo: 'Importação Direta', quantidade: 150 }
    ],
    reservasAtivas: [
      { pedidoId: 'PED-001', quantidade: 120, dataReserva: '2025-06-20' },
      { pedidoId: 'PED-002', quantidade: 100, dataReserva: '2025-06-21' }
    ],
    historicoVendas: [
      { data: '2025-06-01', cliente: 'Hospital X', quantidade: 50, precoVenda: 9.50 },
      { data: '2025-05-17', cliente: 'Clínica Y', quantidade: 100, precoVenda: 9.80 },
      { data: '2025-05-03', cliente: 'Lab Z', quantidade: 75, precoVenda: 9.60 }
    ],
    precoSugerido: 9.80,
    alertas: [
      { tipo: 'validade_proxima', mensagem: 'Lote CT2481 vence em 45 dias', severidade: 'alta' },
      { tipo: 'multiplos_lotes', mensagem: 'Produto disponível em 2 lotes distintos', severidade: 'media' }
    ],
    localizacaoFisica: 'Refrigerado A1 - Prateleira 3',
    exigeNumeroSerie: false,
    unidadesDisponiveis: [
      { unidade: UnidadeVenda.UNIDADE, quantidade: 650, fatorConversao: 1 },
      { unidade: UnidadeVenda.CAIXA, quantidade: 32, fatorConversao: 20 }
    ]
  },
  'SER001': {
    totalDisponivel: 1700,
    totalReservado: 250,
    estoquesPorCnpj: [
      { cnpj: '12.345.678/0001-90', nomeEmpresa: 'WebMED RJ', quantidade: 1200 },
      { cnpj: '98.765.432/0001-10', nomeEmpresa: 'Distrib. SP', quantidade: 500 }
    ],
    lotes: [
      { 
        lote: 'L2305', 
        quantidade: 1200, 
        dataValidade: '2025-12-10', 
        diasParaVencimento: 198,
        alertaValidade: false 
      },
      { 
        lote: 'L2308', 
        quantidade: 500, 
        dataValidade: '2026-01-12', 
        diasParaVencimento: 231,
        alertaValidade: false 
      }
    ],
    tiposEstoque: [
      { tipo: 'Importação Direta', quantidade: 1200 },
      { tipo: 'Consignado', quantidade: 500 }
    ],
    reservasAtivas: [
      { pedidoId: 'PED-003', quantidade: 250, dataReserva: '2025-06-19' }
    ],
    historicoVendas: [
      { data: '2025-06-10', cliente: 'Hospital ABC', quantidade: 500, precoVenda: 0.85 },
      { data: '2025-05-28', cliente: 'Clínica DEF', quantidade: 300, precoVenda: 0.82 },
      { data: '2025-05-15', cliente: 'Lab GHI', quantidade: 200, precoVenda: 0.88 }
    ],
    precoSugerido: 0.85,
    alertas: [],
    localizacaoFisica: 'Prateleira A2 - Setor Central',
    exigeNumeroSerie: false,
    unidadesDisponiveis: [
      { unidade: UnidadeVenda.UNIDADE, quantidade: 1700, fatorConversao: 1 },
      { unidade: UnidadeVenda.CAIXA, quantidade: 170, fatorConversao: 10 }
    ]
  },
  'NOB200': {
    totalDisponivel: 5,
    totalReservado: 2,
    estoquesPorCnpj: [
      { cnpj: '98.765.432/0001-10', nomeEmpresa: 'WebMED JF', quantidade: 5 }
    ],
    lotes: [
      { 
        lote: 'S349001', 
        quantidade: 5, 
        dataValidade: null, 
        diasParaVencimento: undefined,
        alertaValidade: false 
      }
    ],
    tiposEstoque: [
      { tipo: 'Nacional', quantidade: 5 }
    ],
    reservasAtivas: [
      { pedidoId: 'PED-004', quantidade: 2, dataReserva: '2025-06-22' }
    ],
    historicoVendas: [
      { data: '2025-05-20', cliente: 'Empresa Tech', quantidade: 1, precoVenda: 450.00 },
      { data: '2025-04-15', cliente: 'Hospital XYZ', quantidade: 2, precoVenda: 445.00 }
    ],
    precoSugerido: 450.00,
    alertas: [
      { tipo: 'estoque_baixo', mensagem: 'Estoque baixo - apenas 5 unidades disponíveis', severidade: 'alta' },
      { tipo: 'numero_serie', mensagem: 'Produto exige controle por número de série', severidade: 'media' }
    ],
    localizacaoFisica: 'Galpão - Setor B1',
    exigeNumeroSerie: true,
    unidadesDisponiveis: [
      { unidade: UnidadeVenda.UNIDADE, quantidade: 5, fatorConversao: 1 }
    ]
  },
  'MED150': {
    totalDisponivel: 89,
    totalReservado: 30,
    estoquesPorCnpj: [
      { cnpj: '12.345.678/0001-90', nomeEmpresa: 'WebMED RJ', quantidade: 89 }
    ],
    lotes: [
      { 
        lote: 'MD15001', 
        quantidade: 89, 
        dataValidade: '2024-09-30', 
        diasParaVencimento: 99,
        alertaValidade: true 
      }
    ],
    tiposEstoque: [
      { tipo: 'Nacional', quantidade: 89 }
    ],
    reservasAtivas: [
      { pedidoId: 'PED-005', quantidade: 30, dataReserva: '2025-06-21' }
    ],
    historicoVendas: [
      { data: '2025-06-05', cliente: 'Lab Central', quantidade: 15, precoVenda: 45.50 },
      { data: '2025-05-22', cliente: 'Hospital Municipal', quantidade: 25, precoVenda: 44.80 }
    ],
    precoSugerido: 45.00,
    alertas: [
      { tipo: 'validade_proxima', mensagem: 'Lote MD15001 vence em 99 dias', severidade: 'media' }
    ],
    localizacaoFisica: 'Refrigerado B2 - Gaveta 1',
    exigeNumeroSerie: false,
    unidadesDisponiveis: [
      { unidade: UnidadeVenda.KIT, quantidade: 89, fatorConversao: 1 }
    ]
  },
  'LAB300': {
    totalDisponivel: 0,
    totalReservado: 0,
    estoquesPorCnpj: [
      { cnpj: '12.345.678/0001-90', nomeEmpresa: 'WebMED RJ', quantidade: 0 },
      { cnpj: '98.765.432/0001-10', nomeEmpresa: 'Distrib. SP', quantidade: 0 }
    ],
    lotes: [],
    tiposEstoque: [
      { tipo: 'Nacional', quantidade: 0 }
    ],
    reservasAtivas: [],
    historicoVendas: [
      { data: '2025-05-30', cliente: 'Lab Análises', quantidade: 50, precoVenda: 25.80 },
      { data: '2025-05-10', cliente: 'Hospital Regional', quantidade: 100, precoVenda: 24.90 }
    ],
    precoSugerido: 25.50,
    alertas: [
      { tipo: 'estoque_baixo', mensagem: 'Produto em falta - estoque zerado', severidade: 'alta' },
      { tipo: 'transferencia_disponivel', mensagem: 'Transferência disponível de outras filiais', severidade: 'baixa' }
    ],
    localizacaoFisica: 'Prateleira C1 - Vazio',
    exigeNumeroSerie: false,
    unidadesDisponiveis: [
      { unidade: UnidadeVenda.FRASCO, quantidade: 0, fatorConversao: 1 }
    ]
  },
  'EQU500': {
    totalDisponivel: 12,
    totalReservado: 5,
    estoquesPorCnpj: [
      { cnpj: '11.222.333/0001-44', nomeEmpresa: 'WebMED JF', quantidade: 12 }
    ],
    lotes: [
      { 
        lote: 'EQ500A', 
        quantidade: 7, 
        dataValidade: null, 
        diasParaVencimento: undefined,
        alertaValidade: false 
      },
      { 
        lote: 'EQ500B', 
        quantidade: 5, 
        dataValidade: null, 
        diasParaVencimento: undefined,
        alertaValidade: false 
      }
    ],
    tiposEstoque: [
      { tipo: 'Importação Direta', quantidade: 12 }
    ],
    reservasAtivas: [
      { pedidoId: 'PED-006', quantidade: 5, dataReserva: '2025-06-20' }
    ],
    historicoVendas: [
      { data: '2025-04-25', cliente: 'Clínica Premium', quantidade: 2, precoVenda: 1250.00 },
      { data: '2025-03-15', cliente: 'Hospital Privado', quantidade: 1, precoVenda: 1280.00 }
    ],
    precoSugerido: 1250.00,
    alertas: [
      { tipo: 'numero_serie', mensagem: 'Equipamento com número de série obrigatório', severidade: 'media' },
      { tipo: 'multiplos_lotes', mensagem: 'Disponível em 2 lotes diferentes', severidade: 'baixa' }
    ],
    localizacaoFisica: 'Galpão - Área Especial E1',
    exigeNumeroSerie: true,
    unidadesDisponiveis: [
      { unidade: UnidadeVenda.UNIDADE, quantidade: 12, fatorConversao: 1 }
    ]
  },
  'DES400': {
    totalDisponivel: 2400,
    totalReservado: 800,
    estoquesPorCnpj: [
      { cnpj: '12.345.678/0001-90', nomeEmpresa: 'WebMED RJ', quantidade: 1500 },
      { cnpj: '98.765.432/0001-10', nomeEmpresa: 'Distrib. SP', quantidade: 900 }
    ],
    lotes: [
      { 
        lote: 'DS400L1', 
        quantidade: 1500, 
        dataValidade: '2026-08-15', 
        diasParaVencimento: 418,
        alertaValidade: false 
      },
      { 
        lote: 'DS400L2', 
        quantidade: 900, 
        dataValidade: '2026-11-20', 
        diasParaVencimento: 515,
        alertaValidade: false 
      }
    ],
    tiposEstoque: [
      { tipo: 'Nacional', quantidade: 1500 },
      { tipo: 'Consignado', quantidade: 900 }
    ],
    reservasAtivas: [
      { pedidoId: 'PED-007', quantidade: 500, dataReserva: '2025-06-22' },
      { pedidoId: 'PED-008', quantidade: 300, dataReserva: '2025-06-23' }
    ],
    historicoVendas: [
      { data: '2025-06-15', cliente: 'Rede Hospitalar', quantidade: 1000, precoVenda: 2.15 },
      { data: '2025-06-01', cliente: 'Clínica Geral', quantidade: 500, precoVenda: 2.20 },
      { data: '2025-05-20', cliente: 'Lab Diagnóstico', quantidade: 800, precoVenda: 2.10 }
    ],
    precoSugerido: 2.15,
    alertas: [],
    localizacaoFisica: 'Prateleira D1-D3 - Alto Giro',
    exigeNumeroSerie: false,
    unidadesDisponiveis: [
      { unidade: UnidadeVenda.UNIDADE, quantidade: 2400, fatorConversao: 1 },
      { unidade: UnidadeVenda.CAIXA, quantidade: 120, fatorConversao: 20 }
    ]
  },
  'REA100': {
    totalDisponivel: 45,
    totalReservado: 15,
    estoquesPorCnpj: [
      { cnpj: '12.345.678/0001-90', nomeEmpresa: 'WebMED RJ', quantidade: 25 },
      { cnpj: '11.222.333/0001-44', nomeEmpresa: 'WebMED JF', quantidade: 20 }
    ],
    lotes: [
      { 
        lote: 'RE100A', 
        quantidade: 25, 
        dataValidade: '2024-12-31', 
        diasParaVencimento: 191,
        alertaValidade: false 
      },
      { 
        lote: 'RE100B', 
        quantidade: 20, 
        dataValidade: '2025-02-28', 
        diasParaVencimento: 250,
        alertaValidade: false 
      }
    ],
    tiposEstoque: [
      { tipo: 'Importação Direta', quantidade: 45 }
    ],
    reservasAtivas: [
      { pedidoId: 'PED-009', quantidade: 15, dataReserva: '2025-06-23' }
    ],
    historicoVendas: [
      { data: '2025-06-10', cliente: 'Lab Especializado', quantidade: 10, precoVenda: 85.50 },
      { data: '2025-05-25', cliente: 'Hospital Referência', quantidade: 20, precoVenda: 84.80 }
    ],
    precoSugerido: 85.00,
    alertas: [
      { tipo: 'estoque_baixo', mensagem: 'Estoque baixo - considere reposição', severidade: 'media' },
      { tipo: 'multiplos_lotes', mensagem: 'Reagente em 2 lotes com validades diferentes', severidade: 'baixa' }
    ],
    localizacaoFisica: 'Refrigerado C1 - Controlado',
    exigeNumeroSerie: false,
    unidadesDisponiveis: [
      { unidade: UnidadeVenda.FRASCO, quantidade: 45, fatorConversao: 1 }
    ]
  }
};

export const mockProdutosCatalogo = [
  {
    codigo: 'CAT024',
    descricao: 'Cateter Venoso 24G',
    categoria: 'Dispositivos Médicos',
    fabricante: 'MedTech'
  },
  {
    codigo: 'SER001',
    descricao: 'Seringa 3ml BD',
    categoria: 'Descartáveis',
    fabricante: 'ImportMed'
  },
  {
    codigo: 'NOB200',
    descricao: 'Nobreak 600VA PowerTech',
    categoria: 'Equipamentos',
    fabricante: 'PowerTech'
  },
  {
    codigo: 'MED150',
    descricao: 'Kit Diagnóstico Rápido',
    categoria: 'Diagnóstico',
    fabricante: 'DiagMed'
  },
  {
    codigo: 'LAB300',
    descricao: 'Reagente para Análise',
    categoria: 'Reagentes',
    fabricante: 'LabCorp'
  },
  {
    codigo: 'EQU500',
    descricao: 'Monitor Multiparâmetros',
    categoria: 'Equipamentos',
    fabricante: 'MedEquip'
  },
  {
    codigo: 'DES400',
    descricao: 'Luva Procedimento Nitrílica',
    categoria: 'Descartáveis',
    fabricante: 'SafeHands'
  },
  {
    codigo: 'REA100',
    descricao: 'Reagente Bioquímico Premium',
    categoria: 'Reagentes',
    fabricante: 'BioLab'
  }
];
