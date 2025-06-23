
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
  }
];
