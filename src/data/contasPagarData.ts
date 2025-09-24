import { RequisicaoPagamento, StatusRequisicao, TipoRequisicao, TipoVinculacao, TipoDocumento } from '@/types/financeiro';

export const contasPagarMockData: RequisicaoPagamento[] = [
  {
    id: 'REQ001',
    tipo: TipoRequisicao.SUPRIMENTOS,
    tipoVinculacao: TipoVinculacao.PROJETO_CLIENTE,
    projetoClienteId: 'projeto1',
    solicitante: 'Cinthia Santos',
    
    descricao: 'Compra de medicamentos para projeto Hospital ABC - Lote 5 antibióticos',
    valor: 25000.00,
    vencimento: new Date('2024-12-30'),
    
    cotacoes: [
      {
        id: 'COT001',
        fornecedor: 'Distribuidora Pharma Plus',
        valor: 25000.00,
        prazo: '15 dias úteis',
        observacoes: 'Melhor preço, fornecedor confiável'
      },
      {
        id: 'COT002',
        fornecedor: 'MedSupply Brasil',
        valor: 27500.00,
        prazo: '10 dias úteis',
        observacoes: 'Prazo menor mas preço maior'
      },
      {
        id: 'COT003',
        fornecedor: 'Farmacorp Distribuidora',
        valor: 26200.00,
        prazo: '12 dias úteis',
        observacoes: 'Preço intermediário'
      }
    ],
    fornecedorEscolhido: 'Distribuidora Pharma Plus',
    
    status: StatusRequisicao.AGUARDANDO_GESTOR,
    dataRequisicao: new Date('2024-12-15'),
    
    documentos: [
      {
        id: 'DOC001',
        tipo: TipoDocumento.EMAIL,
        nome: 'email_solicitacao_medicamentos.msg',
        dataUpload: new Date('2024-12-15'),
        obrigatorio: true,
        arquivo: new File([''], 'email_solicitacao_medicamentos.msg')
      },
      {
        id: 'DOC002',
        tipo: TipoDocumento.REQUISICAO,
        nome: 'requisicao_formal_001.pdf',
        dataUpload: new Date('2024-12-15'),
        obrigatorio: true,
        arquivo: new File([''], 'requisicao_formal_001.pdf')
      }
    ]
  },
  
  {
    id: 'REQ002',
    tipo: TipoRequisicao.PASSAGENS,
    tipoVinculacao: TipoVinculacao.PROJETO_CLIENTE,
    projetoClienteId: 'cliente1',
    solicitante: 'Rafael Oliveira',
    
    descricao: 'Passagens aéreas para reunião com cliente Distribuidora Med - São Paulo',
    valor: 1200.00,
    vencimento: new Date('2024-12-28'),
    
    destino: 'São Paulo - SP',
    periodo: {
      inicio: new Date('2025-01-15'),
      fim: new Date('2025-01-17')
    },
    justificativa: 'Reunião estratégica para fechamento de contrato anual no valor de R$ 2.5M',
    
    status: StatusRequisicao.AGUARDANDO_FINANCEIRO,
    dataRequisicao: new Date('2024-12-10'),
    dataAprovacaoGestor: new Date('2024-12-12'),
    gestorAprovador: 'Carlos Silva',
    
    documentos: [
      {
        id: 'DOC003',
        tipo: TipoDocumento.EMAIL,
        nome: 'email_solicitacao_passagem.msg',
        dataUpload: new Date('2024-12-10'),
        obrigatorio: true,
        arquivo: new File([''], 'email_solicitacao_passagem.msg')
      },
      {
        id: 'DOC004',
        tipo: TipoDocumento.REQUISICAO,
        nome: 'requisicao_viagem_002.pdf',
        dataUpload: new Date('2024-12-10'),
        obrigatorio: true,
        arquivo: new File([''], 'requisicao_viagem_002.pdf')
      }
    ]
  },
  
  {
    id: 'REQ003',
    tipo: TipoRequisicao.OUTROS,
    tipoVinculacao: TipoVinculacao.DEPARTAMENTO,
    departamentoId: 'ti',
    solicitante: 'João Santos',
    
    descricao: 'Renovação de licenças de software Microsoft Office 365 para 50 usuários',
    valor: 8500.00,
    vencimento: new Date('2024-12-25'),
    
    status: StatusRequisicao.APROVADA,
    dataRequisicao: new Date('2024-12-05'),
    dataAprovacaoGestor: new Date('2024-12-06'),
    dataAprovacaoFinanceiro: new Date('2024-12-07'),
    gestorAprovador: 'Ana Costa',
    gestorFinanceiroAprovador: 'Roberto Lima',
    
    documentos: [
      {
        id: 'DOC005',
        tipo: TipoDocumento.EMAIL,
        nome: 'email_renovacao_office.msg',
        dataUpload: new Date('2024-12-05'),
        obrigatorio: true,
        arquivo: new File([''], 'email_renovacao_office.msg')
      },
      {
        id: 'DOC006',
        tipo: TipoDocumento.REQUISICAO,
        nome: 'requisicao_licencas_003.pdf',
        dataUpload: new Date('2024-12-05'),
        obrigatorio: true,
        arquivo: new File([''], 'requisicao_licencas_003.pdf')
      },
      {
        id: 'DOC007',
        tipo: TipoDocumento.NOTA_FISCAL,
        nome: 'nf_microsoft_12345.xml',
        dataUpload: new Date('2024-12-07'),
        obrigatorio: false,
        arquivo: new File([''], 'nf_microsoft_12345.xml')
      }
    ]
  },
  
  {
    id: 'REQ004',
    tipo: TipoRequisicao.HOSPEDAGEM,
    tipoVinculacao: TipoVinculacao.PROJETO_CLIENTE,
    projetoClienteId: 'projeto2',
    solicitante: 'Mariana Costa',
    
    descricao: 'Hospedagem para equipe técnica - Projeto Farmácia XYZ em Brasília',
    valor: 1800.00,
    vencimento: new Date('2025-01-05'),
    
    destino: 'Brasília - DF',
    periodo: {
      inicio: new Date('2025-01-20'),
      fim: new Date('2025-01-22')
    },
    justificativa: 'Instalação e treinamento de sistema para novo cliente',
    
    status: StatusRequisicao.PAGA,
    dataRequisicao: new Date('2024-12-01'),
    dataAprovacaoGestor: new Date('2024-12-02'),
    dataAprovacaoFinanceiro: new Date('2024-12-03'),
    dataPagamento: new Date('2024-12-20'),
    gestorAprovador: 'Pedro Alves',
    gestorFinanceiroAprovador: 'Roberto Lima',
    
    documentos: [
      {
        id: 'DOC008',
        tipo: TipoDocumento.EMAIL,
        nome: 'email_hospedagem_brasilia.msg',
        dataUpload: new Date('2024-12-01'),
        obrigatorio: true,
        arquivo: new File([''], 'email_hospedagem_brasilia.msg')
      },
      {
        id: 'DOC009',
        tipo: TipoDocumento.REQUISICAO,
        nome: 'requisicao_hospedagem_004.pdf',
        dataUpload: new Date('2024-12-01'),
        obrigatorio: true,
        arquivo: new File([''], 'requisicao_hospedagem_004.pdf')
      },
      {
        id: 'DOC010',
        tipo: TipoDocumento.COMPROVANTE,
        nome: 'comprovante_pagamento_hotel.pdf',
        dataUpload: new Date('2024-12-20'),
        obrigatorio: false,
        arquivo: new File([''], 'comprovante_pagamento_hotel.pdf')
      }
    ]
  },
  
  {
    id: 'REQ005',
    tipo: TipoRequisicao.SUPRIMENTOS,
    tipoVinculacao: TipoVinculacao.DEPARTAMENTO,
    departamentoId: 'administrativo',
    solicitante: 'Sandra Reis',
    
    descricao: 'Material de escritório - papel A4, toners, materiais de limpeza',
    valor: 3200.00,
    vencimento: new Date('2024-12-20'), // Vencida
    
    justificativa: 'Fornecedor exclusivo para alguns itens específicos, não foi possível obter 3 cotações',
    
    status: StatusRequisicao.REJEITADA,
    dataRequisicao: new Date('2024-11-25'),
    motivoRejeicao: 'Documentação incompleta - falta nota fiscal e justificativa inadequada',
    
    documentos: [
      {
        id: 'DOC011',
        tipo: TipoDocumento.EMAIL,
        nome: 'email_material_escritorio.msg',
        dataUpload: new Date('2024-11-25'),
        obrigatorio: true,
        arquivo: new File([''], 'email_material_escritorio.msg')
      },
      {
        id: 'DOC012',
        tipo: TipoDocumento.REQUISICAO,
        nome: 'requisicao_material_005.pdf',
        dataUpload: new Date('2024-11-25'),
        obrigatorio: true
        // Sem arquivo anexado - documentação incompleta
      }
    ]
  }
];