import { DocumentoFiscal, ChecklistVenda, ServicoFaturamento, ProtocoloSefaz, TituloReceber, PedidoEntradaMercadoria, NotificacaoEntrada } from '@/types/faturamento';

export const mockChecklistVendas: ChecklistVenda[] = [
  {
    id: 'CHK001',
    empresaId: 'master-001',
    numeroPedido: 'PED-2024-001',
    cliente: 'Farmácia Central Ltda',
    cnpjCliente: '12.345.678/0001-90',
    vendedor: 'João Silva',
    dataEmissaoPedido: '2025-01-15',
    dataFaturamento: '2025-01-19',
    valorTotal: 15750.00,
    status: 'Faturado',
    estoqueValidado: true,
    servicosConcluidos: true,
    documentacaoCompleta: true,
    creditoAprovado: true,
    observacoes: 'Cliente prioritário. Equipamento com garantia estendida de 3 anos.',
    
    produtos: [
      {
        id: 1,
        codigo: 'CAT024',
        descricao: 'Analisador Bioquímico XYZ-500',
        referencia: 'REF-XYZ-500-2024',
        unidade: 'UN',
        quantidade: 1,
        precoUnitario: 15000.00,
        desconto: 5,
        precoFinal: 14250.00,
        subtotal: 14250.00,
        observacoes: 'Equipamento com garantia estendida',
        estoqueDisponivel: {
          totalDisponivel: 15,
          totalReservado: 3,
          alertas: [{ tipo: 'validade_proxima', mensagem: 'Validade próxima' }]
        },
        validadeMinima: '2025-06-15',
        descritivoNF: 'Analisador bioquímico automático modelo XYZ-500'
      },
      {
        id: 2,
        codigo: 'REA-001',
        descricao: 'Kit Reagentes Bioquímicos - 200 testes',
        unidade: 'KT',
        quantidade: 10,
        precoUnitario: 150.00,
        desconto: 0,
        precoFinal: 150.00,
        subtotal: 1500.00,
        estoqueDisponivel: {
          totalDisponivel: 650,
          totalReservado: 220,
          alertas: [
            { tipo: 'validade_proxima', mensagem: 'Validade próxima' },
            { tipo: 'multiplos_lotes', mensagem: 'Múltiplos lotes' }
          ]
        },
        validadeMinima: '2025-03-20',
        descritivoNF: 'Kit de reagentes para análises bioquímicas - 200 testes'
      }
    ],
    
    itensUsoConsumo: [
      {
        id: 1,
        codigo: 'USB-001',
        descricao: 'Cabo USB para conexão',
        quantidade: 2,
        categoria: 'Acessórios'
      }
    ],
    
    deveEmitirNF: true,
    naturezaOperacao: 'Venda de Mercadoria',
    descritivoOperacao: 'Venda para fora do estado',
    finalidadeNF: 'Normal',
    formaPagamento: 'Boleto Bancário',
    emailsNF: 'financeiro@farmaciacentral.com.br',
    condicoesPagamento: '30/60/90 dias',
    destacarIR: false,
    informacoesComplementares: 'Equipamento sujeito a substituição tributária. Garantia de 3 anos.',
    contaBancariaRecebimento: 'Banco do Brasil - Ag. 1234-5 / CC 56789-0',
    numeroParcelas: 3,
    instrucoesBoleto: 'Não receber após vencimento',
    documentosNF: ['Certificado de Calibração', 'Manual do Usuário', 'Termo de Garantia'],
    
    destinatario: {
      razaoSocial: 'Farmácia Central Ltda',
      cnpjCpf: '12.345.678/0001-90',
      ieRg: '123.456.789.123',
      endereco: 'Rua das Flores, 123 - Centro - São Paulo/SP - CEP 01000-000',
      telefone: '(11) 3333-4444',
      email: 'contato@farmaciacentral.com.br'
    },
    
    tipoFrete: 'CIF - Pago pelo Remetente',
    prazoEntrega: '10 dias úteis',
    dataEntrega: '2025-02-05',
    fretePagarPor: 'Fornecedor',
    freteRetirarPor: 'DESTINO FINAL',
    entregarRetirarCuidados: 'Equipamento frágil. Manusear com cuidado.',
    nomeCompletoRecebedor: 'Carlos Alberto dos Santos',
    cpfRecebedor: '123.456.789-00',
    telefoneRecebedor: '(11) 98765-4321',
    emailRecebedor: 'carlos.santos@farmaciacentral.com.br',
    horariosPermitidos: '8h às 17h',
    locaisEntrega: 'Recepção - entrada principal',
    enderecoEntrega: 'Rua das Flores, 123 - Centro - São Paulo/SP - CEP 01000-000',
    maisInformacoesEntrega: 'Ligar com 1 dia de antecedência para agendar a entrega',
    
    solicitarUrgencia: true,
    justificativaUrgencia: 'Cliente necessita do equipamento com urgência para atender demanda de fim de mês.',
    urgenciaStatus: 'aprovada',
    autorizadoPor: 'Diretor Comercial - Roberto Fernandes',
    dataAutorizacao: '2025-01-16',
    emailAutorizador: 'roberto.fernandes@empresa.com.br',
    
    condicoesPagamentoFaturamento: '1ª parcela: R$ 5.250,00 (venc. 19/02/2025) | 2ª parcela: R$ 5.250,00 (venc. 21/03/2025) | 3ª parcela: R$ 5.250,00 (venc. 20/04/2025)',
    
    notaFiscal: {
      numeroNF: '000012345',
      serieNF: '001',
      dataEmissao: '2025-01-19',
      valorTotal: 15750.00,
      chaveAcesso: '35250112345678000190550010000123451234567890',
      protocoloSEFAZ: '135250000012345',
      linkXML: '/downloads/nf-12345.xml',
      linkDANFE: '/downloads/danfe-12345.pdf'
    },
    
    boleto: {
      dataVencimento: '2025-02-19',
      valor: 5250.00,
      numeroDocumento: 'BOL-2025-001234',
      linkBoleto: '/downloads/boleto-001234.pdf'
    },
    
    gnre: {
      numeroGuia: 'GNRE-2025-00567',
      dataVencimento: '2025-01-25',
      valor: 850.00,
      linkGNRE: '/downloads/gnre-00567.pdf'
    },
    
    logistica: {
      transportadora: {
        nome: 'Transportadora Rápida Ltda',
        cnpj: '98.765.432/0001-10'
      },
      codigoRastreamento: 'TR123456789BR',
      linkRastreamento: 'https://rastreamento.transportadorarapida.com.br/TR123456789BR',
      statusEntrega: 'entregue',
      prazoEstimado: '5 dias úteis',
      dataSaida: '2025-01-20',
      previsaoEntrega: '2025-01-25',
      dataEntregaEfetiva: '2025-01-24'
    },
    
    transportadora: {
      nome: 'Transportadora Rápida Ltda',
      cnpj: '98.765.432/0001-10',
      telefone: '(11) 3000-4000',
      email: 'operacoes@transportadorarapida.com.br',
      custoFrete: 450.00
    },
    
    cte: {
      numeroCTe: '000045678',
      serieCTe: '001',
      chaveAcesso: '35250198765432000110570010000456781234567890',
      linkRastreamento: 'https://rastreamento.transportadorarapida.com.br/TR123456789BR'
    },
    
    statusEntrega: 'entregue',
    dataSaidaExpedicao: '2025-01-20',
    previsaoEntrega: '2025-01-25',
    dataEntregaEfetiva: '2025-01-24',
    
    comprovanteEntrega: {
      dataEntrega: '2025-01-24',
      horaEntrega: '10:15',
      nomeRecebedor: 'Carlos Alberto dos Santos',
      documentoRecebedor: '123.456.789-00',
      protocoloCliente: 'PROT-FC-2025-0123',
      imagemCanhoto: '/uploads/canhoto-12345.jpg'
    },
    
    recebimentoEstoque: {
      status: 'pronto_faturamento',
      dataRecebimento: '2025-01-17',
      horaRecebimento: '09:30',
      responsavel: 'Pedro Estoquista',
      numeroLote: 'LT-2025-001',
      numeroSerie: 'SN-XYZ500-001234',
      referenciaInterna: 'REF-INT-001',
      itensConferidos: [
        {
          codigoProduto: 'CAT024',
          descricao: 'Analisador Bioquímico XYZ-500',
          quantidadeSolicitada: 1,
          quantidadeConferida: 1,
          divergencia: false
        },
        {
          codigoProduto: 'REA-001',
          descricao: 'Kit Reagentes Bioquímicos - 200 testes',
          quantidadeSolicitada: 10,
          quantidadeConferida: 10,
          divergencia: false
        }
      ],
      dataSaidaPrevista: '2025-01-20',
      dataSaidaEfetiva: '2025-01-20'
    },
    
    timeline: [
      { status: 'Pedido Criado', data: '2025-01-15', hora: '08:30', responsavel: 'João Silva' },
      { status: 'Enviado para Estoque', data: '2025-01-15', hora: '14:00', responsavel: 'Sistema' },
      { status: 'Recebido pelo Estoque', data: '2025-01-17', hora: '09:30', responsavel: 'Pedro Estoquista' },
      { status: 'Em Separação', data: '2025-01-17', hora: '10:00', responsavel: 'Pedro Estoquista' },
      { status: 'Pronto para Faturamento', data: '2025-01-18', hora: '16:00', responsavel: 'Pedro Estoquista' },
      { status: 'Faturado', data: '2025-01-19', hora: '14:30', responsavel: 'Ana Fiscal', observacoes: 'NF-e 000012345 emitida' },
      { status: 'Em Trânsito', data: '2025-01-20', hora: '08:00', responsavel: 'Transportadora Rápida' },
      { status: 'Entregue', data: '2025-01-24', hora: '10:15', responsavel: 'Carlos Alberto dos Santos' }
    ],
    
    feedbackEntrega: {
      statusRecebimento: 'ok',
      observacoesCliente: 'Equipamento recebido em perfeitas condições. Embalagem intacta.',
      responsavelFeedback: 'Carlos Alberto dos Santos',
      dataFeedback: '2025-01-24',
      anexos: [
        { id: 'anexo-001', nome: 'foto_recebimento.jpg' },
        { id: 'anexo-002', nome: 'protocolo_entrega.pdf' }
      ]
    },
    
    alertas: [
      {
        tipo: 'mudanca_status',
        titulo: 'Pedido Liberado',
        mensagem: 'Pedido aprovado e liberado para faturamento.',
        dataAlerta: '2025-01-18',
        horaAlerta: '16:45',
        prioridade: 'normal'
      },
      {
        tipo: 'emissao_nf',
        titulo: 'Nota Fiscal Emitida',
        mensagem: 'NF-e nº 000012345 emitida com sucesso e autorizada pela SEFAZ.',
        dataAlerta: '2025-01-19',
        horaAlerta: '14:30',
        prioridade: 'alta'
      },
      {
        tipo: 'atualizacao_entrega',
        titulo: 'Entrega Realizada',
        mensagem: 'Pedido entregue e assinado por Carlos Alberto dos Santos.',
        dataAlerta: '2025-01-24',
        horaAlerta: '10:15',
        prioridade: 'normal'
      }
    ]
  },
  {
    id: 'CHK002',
    empresaId: 'master-001',
    numeroPedido: 'PED-2024-002',
    cliente: 'Hospital São Lucas',
    cnpjCliente: '98.765.432/0001-10',
    vendedor: 'Maria Santos',
    dataEmissaoPedido: '2025-01-18',
    valorTotal: 32400.00,
    status: 'Validando',
    estoqueValidado: true,
    servicosConcluidos: false,
    documentacaoCompleta: true,
    creditoAprovado: true,
    observacoes: 'Aguardando conclusão do serviço de instalação'
  },
  {
    id: 'CHK003',
    empresaId: 'master-001',
    numeroPedido: 'PED-2024-003',
    cliente: 'Drogaria Moderna',
    cnpjCliente: '11.222.333/0001-44',
    vendedor: 'Carlos Oliveira',
    dataEmissaoPedido: '2025-01-20',
    valorTotal: 8900.00,
    status: 'Aguardando',
    estoqueValidado: false,
    servicosConcluidos: false,
    documentacaoCompleta: false,
    creditoAprovado: true,
    observacoes: 'Estoque em separação, documentação em revisão'
  },
  {
    id: 'CHK004',
    empresaId: 'master-001',
    numeroPedido: 'PED-2024-004',
    cliente: 'Clínica Vida Nova',
    cnpjCliente: '22.333.444/0001-55',
    vendedor: 'Ana Paula',
    dataEmissaoPedido: '2025-01-22',
    dataFaturamento: undefined,
    valorTotal: 45200.00,
    status: 'Liberado',
    estoqueValidado: true,
    servicosConcluidos: true,
    documentacaoCompleta: true,
    creditoAprovado: true,
    observacoes: 'Pedido urgente aprovado pela diretoria. Cliente VIP.',
    
    produtos: [
      {
        id: 1,
        codigo: 'EQP-055',
        descricao: 'Ultrassom Doppler Colorido Premium',
        referencia: 'ULT-DOP-2024-PRO',
        unidade: 'UN',
        quantidade: 1,
        precoUnitario: 42000.00,
        desconto: 0,
        precoFinal: 42000.00,
        subtotal: 42000.00,
        observacoes: 'Modelo top de linha com todos os transdutores',
        estoqueDisponivel: {
          totalDisponivel: 5,
          totalReservado: 2,
          alertas: []
        },
        validadeMinima: '2026-12-31',
        descritivoNF: 'Ultrassom Doppler Colorido Premium com transdutores'
      },
      {
        id: 2,
        codigo: 'TRN-001',
        descricao: 'Transdutor Linear 7.5 MHz',
        unidade: 'UN',
        quantidade: 2,
        precoUnitario: 1600.00,
        desconto: 0,
        precoFinal: 1600.00,
        subtotal: 3200.00,
        estoqueDisponivel: {
          totalDisponivel: 28,
          totalReservado: 8,
          alertas: [{ tipo: 'multiplos_lotes', mensagem: 'Múltiplos lotes' }]
        },
        validadeMinima: '2025-09-15',
        descritivoNF: 'Transdutor linear para ultrassom 7.5 MHz'
      }
    ],
    
    itensUsoConsumo: [
      {
        id: 1,
        codigo: 'GEL-001',
        descricao: 'Gel para ultrassom - 5L',
        quantidade: 10,
        categoria: 'Consumíveis'
      },
      {
        id: 2,
        codigo: 'CAP-001',
        descricao: 'Capa protetora para transdutor',
        quantidade: 5,
        categoria: 'Acessórios'
      }
    ],
    
    deveEmitirNF: true,
    naturezaOperacao: 'Venda de Mercadoria',
    descritivoOperacao: 'Venda dentro do estado',
    finalidadeNF: 'Normal',
    formaPagamento: 'Transferência Bancária',
    emailsNF: 'financeiro@clinicavidanova.com.br; compras@clinicavidanova.com.br',
    condicoesPagamento: 'À vista com 5% de desconto ou 60/90 dias',
    destacarIR: false,
    informacoesComplementares: 'Equipamento importado. Inclui treinamento técnico gratuito de 8 horas.',
    contaBancariaRecebimento: 'Itaú - Ag. 5678 / CC 12345-6',
    numeroParcelas: 2,
    instrucoesBoleto: 'Aceitar até 5 dias após vencimento com multa de 2%',
    documentosNF: ['Manual Técnico', 'Certificado de Importação', 'Termo de Garantia', 'Contrato de Treinamento'],
    
    destinatario: {
      razaoSocial: 'Clínica Vida Nova Ltda',
      cnpjCpf: '22.333.444/0001-55',
      ieRg: '987.654.321.098',
      endereco: 'Av. Paulista, 1500 - Bela Vista - São Paulo/SP - CEP 01310-100',
      telefone: '(11) 2222-3333',
      email: 'contato@clinicavidanova.com.br'
    },
    
    tipoFrete: 'FOB - Pago pelo Destinatário',
    prazoEntrega: '15 dias úteis',
    dataEntrega: '2025-02-15',
    fretePagarPor: 'Cliente',
    entregarRetirarCuidados: 'URGENTE - Equipamento de alto valor. Requer escolta e seguro.',
    nomeCompletoRecebedor: 'Dr. Roberto Mendes Silva',
    cpfRecebedor: '987.654.321-00',
    telefoneRecebedor: '(11) 99999-8888',
    emailRecebedor: 'roberto.mendes@clinicavidanova.com.br',
    horariosPermitidos: '7h às 19h',
    locaisEntrega: 'Centro Cirúrgico - 3º andar - Ala B',
    enderecoEntrega: 'Av. Paulista, 1500 - Bela Vista - São Paulo/SP - CEP 01310-100',
    maisInformacoesEntrega: 'Agendar entrega com 48h de antecedência. Necessário acesso de carga com elevador. Técnico disponível para instalação imediata.',
    
    solicitarUrgencia: true,
    justificativaUrgencia: 'Clínica inaugurando nova ala de diagnóstico por imagem. Equipamento essencial para início das operações programado para 01/03/2025.',
    urgenciaStatus: 'aprovada',
    autorizadoPor: 'Diretor Comercial - Ricardo Almeida',
    dataAutorizacao: '2025-01-22',
    emailAutorizador: 'ricardo.almeida@empresa.com.br',
    
    alertas: [
      {
        tipo: 'mudanca_status',
        titulo: 'Pedido Urgente Aprovado',
        mensagem: 'Solicitação de urgência aprovada pela diretoria comercial.',
        dataAlerta: '2025-01-22',
        horaAlerta: '11:30',
        prioridade: 'urgente'
      },
      {
        tipo: 'mudanca_status',
        titulo: 'Pedido Liberado para Faturamento',
        mensagem: 'Todas as validações concluídas. Pedido pronto para emissão de NF-e.',
        dataAlerta: '2025-01-22',
        horaAlerta: '17:00',
        prioridade: 'alta'
      }
    ]
  }
];

export const mockDocumentosFiscais: DocumentoFiscal[] = [
  {
    id: 'DF001',
    numero: '000001234',
    serie: '1',
    tipo: 'NF-e',
    cliente: 'Farmácia Central Ltda',
    cnpjCpf: '12.345.678/0001-90',
    valor: 15000.00,
    impostos: 750.00,
    valorTotal: 15750.00,
    emissao: '2025-01-20',
    vencimento: '2025-02-19',
    status: 'Autorizado',
    protocolo: '135240000123456',
    chaveAcesso: '25250112345678000190550010000012341234567890',
    cfop: '5102',
    naturezaOperacao: 'Venda de mercadorias',
  },
  {
    id: 'DF002',
    numero: '000001235',
    serie: '1', 
    tipo: 'NF-e',
    cliente: 'Hospital São Lucas',
    cnpjCpf: '98.765.432/0001-10',
    valor: 30800.00,
    impostos: 1600.00,
    valorTotal: 32400.00,
    emissao: '2025-01-22',
    vencimento: '2025-02-21',
    status: 'Emitido',
    cfop: '5102',
    naturezaOperacao: 'Venda de mercadorias',
  },
  {
    id: 'DF003',
    numero: '000000156',
    serie: '2',
    tipo: 'NFS-e',
    cliente: 'Clínica Vida Saudável',
    cnpjCpf: '11.222.333/0001-44',
    valor: 2500.00,
    impostos: 125.00,
    valorTotal: 2625.00,
    emissao: '2025-01-23',
    status: 'Autorizado',
    protocolo: 'SP240000789123',
    cfop: '5933',
    naturezaOperacao: 'Prestação de serviços',
  }
];

export const mockServicosFaturamento: ServicoFaturamento[] = [
  {
    id: 'SF001',
    empresaId: 'master-001',
    descricao: 'Consultoria Regulatória ANVISA',
    descricaoDetalhada: 'Consultoria completa para adequação de processos às normas da ANVISA, incluindo análise documental e plano de ação.',
    cliente: 'Laboratório XYZ',
    cnpjCliente: '12.345.678/0001-90',
    valor: 12000.00,
    dataInicio: '2025-01-10',
    dataConclusao: '2025-01-25',
    responsavel: 'Dr. Pedro Alvares',
    emailResponsavel: 'pedro.alvares@empresa.com',
    status: 'Faturado',
    
    escopo: 'Análise completa da documentação atual, identificação de não conformidades, elaboração de plano de ação corretivo e acompanhamento da implementação das melhorias.',
    
    deliverables: [
      'Relatório de Análise Documental',
      'Plano de Ação Corretivo',
      'Manual de Procedimentos Atualizado',
      'Certificado de Conformidade'
    ],
    
    observacoes: 'Cliente prioritário. Serviço executado com excelência.',
    
    numeroNFSe: '12345',
    serieNFSe: 'A1',
    dataEmissaoNFSe: '2025-01-25',
    chaveVerificacao: 'A1B2C3D4',
    codigoVerificacao: '9876',
    linkPrefeitura: 'https://nfse.prefeitura.sp.gov.br/consulta',
    
    valorISS: 600.00,
    aliquotaISS: 5,
    valorPIS: 78.00,
    valorCOFINS: 360.00,
    valorIR: 180.00,
    valorLiquido: 10782.00,
    
    arquivos: [
      {
        id: 'ARQ001',
        tipo: 'XML',
        nomeArquivo: 'nfse_12345.xml',
        tamanho: 15360,
        dataUpload: '2025-01-25T14:30:00',
        uploadPor: 'João Silva',
        url: '/downloads/nfse_12345.xml'
      },
      {
        id: 'ARQ002',
        tipo: 'PDF',
        nomeArquivo: 'danfse_12345.pdf',
        tamanho: 250880,
        dataUpload: '2025-01-25T14:32:00',
        uploadPor: 'João Silva',
        url: '/downloads/danfse_12345.pdf'
      }
    ],
    
    solicitacoesAlteracao: [
      {
        id: 'SOL001',
        servicoId: 'SF001',
        solicitadoPor: 'Carlos Silva',
        emailSolicitante: 'carlos@laboratorioxyz.com',
        dataSolicitacao: '2025-01-20',
        horaSolicitacao: '15:45',
        motivoAlteracao: 'Revisão de Escopo',
        detalhesAlteracao: 'Necessário incluir análise adicional de processos de validação conforme solicitado pelo time técnico.',
        status: 'aceita',
        respostaDo: 'Dr. Pedro Alvares',
        dataResposta: '2025-01-21',
        justificativaResposta: 'Alteração aceita. Prazo adicional de 3 dias será necessário para conclusão da análise complementar.'
      }
    ]
  },
  {
    id: 'SF002',
    empresaId: 'master-001',
    descricao: 'Assessoria Técnica em Registros',
    descricaoDetalhada: 'Assessoria especializada para registro de produtos na ANVISA.',
    cliente: 'Indústria Farmacêutica ABC',
    cnpjCliente: '98.765.432/0001-10',
    valor: 8500.00,
    dataInicio: '2025-01-15',
    responsavel: 'Dra. Ana Costa',
    emailResponsavel: 'ana.costa@empresa.com',
    status: 'Em Andamento',
    escopo: 'Preparação e submissão de documentação para registro de novos produtos.',
    deliverables: [
      'Dossiê Técnico Completo',
      'Protocolo de Registro'
    ],
    observacoes: 'Em andamento conforme cronograma.',
    solicitacoesAlteracao: []
  },
  {
    id: 'SF003',
    empresaId: 'master-001',
    descricao: 'Treinamento Boas Práticas',
    descricaoDetalhada: 'Treinamento completo sobre Boas Práticas de Fabricação (BPF).',
    cliente: 'Hospital Regional',
    cnpjCliente: '11.222.333/0001-44',
    valor: 3200.00,
    dataInicio: '2025-01-22',
    dataConclusao: '2025-01-24',
    responsavel: 'Prof. Ricardo Lima',
    emailResponsavel: 'ricardo.lima@empresa.com',
    status: 'Faturado',
    escopo: 'Treinamento presencial de 16 horas sobre BPF para equipe técnica.',
    deliverables: [
      'Material Didático',
      'Certificados de Participação',
      'Relatório de Avaliação'
    ],
    numeroNFSe: '12346',
    serieNFSe: 'A1',
    dataEmissaoNFSe: '2025-01-24',
    chaveVerificacao: 'E5F6G7H8',
    codigoVerificacao: '5432',
    linkPrefeitura: 'https://nfse.prefeitura.sp.gov.br/consulta',
    valorISS: 160.00,
    aliquotaISS: 5,
    valorPIS: 20.80,
    valorCOFINS: 96.00,
    valorLiquido: 2923.20,
    arquivos: [
      {
        id: 'ARQ003',
        tipo: 'PDF',
        nomeArquivo: 'danfse_12346.pdf',
        tamanho: 180000,
        dataUpload: '2025-01-24T16:00:00',
        uploadPor: 'Ana Silva',
        url: '/downloads/danfse_12346.pdf'
      }
    ],
    solicitacoesAlteracao: []
  }
];

export const mockProtocolosSefaz: ProtocoloSefaz[] = [
  {
    id: 'PS001',
    documentoId: 'DF001',
    protocolo: '135240000123456',
    dataEnvio: '2025-01-20T14:30:00',
    dataRetorno: '2025-01-20T14:32:15',
    status: 'Autorizado',
    mensagem: 'Autorizado o uso da NF-e',
    tentativas: 1,
  },
  {
    id: 'PS002',
    documentoId: 'DF002', 
    protocolo: '135240000123457',
    dataEnvio: '2025-01-22T09:15:00',
    status: 'Enviando',
    tentativas: 1,
  }
];

export const mockTitulosReceber: TituloReceber[] = [
  {
    id: 'TR001',
    documentoFiscalId: 'DF001',
    numero: 'REC-2025-001',
    cliente: 'Farmácia Central Ltda',
    valor: 15750.00,
    vencimento: '2025-02-19',
    status: 'Aberto',
    formaPagamento: 'Boleto Bancário',
    condicoesPagamento: '30 dias',
  },
  {
    id: 'TR002',
    documentoFiscalId: 'DF002',
    numero: 'REC-2025-002', 
    cliente: 'Hospital São Lucas',
    valor: 32400.00,
    vencimento: '2025-02-21',
    status: 'Aberto',
    formaPagamento: 'Transferência Bancária',
    condicoesPagamento: '30 dias',
  }
];

export const mockPedidosEntrada: PedidoEntradaMercadoria[] = [
  {
    id: 'ENT001',
    empresaId: 'master-001',
    numeroPedido: 'IMP-2025-001',
    tipo: 'Importacao',
    fornecedor: 'MedTech USA Inc.',
    cnpjFornecedor: '00.000.000/0001-00',
    numeroNF: 'INV-US-2025-456',
    dataEmissao: '2025-01-10',
    dataEntrada: '2025-01-25',
    
    statusImportacao: 'Canal Verde',
    numeroDI: '25/0012345-6',
    dataRegistroDI: '2025-01-20',
    canalParametrizacao: 'Verde',
    dataDesembaraco: '2025-01-21',
    
    valorTotal: 85000.00,
    valorImpostos: 15300.00,
    categoria: 'Produto',
    status: 'Desembaraçado - pronto para retirar',
    itens: [
      {
        id: 'ITEM001',
        codigo: 'AN-X1-2023',
        descricao: 'Analisador Bioquímico X1',
        quantidade: 1,
        valorUnitario: 85000.00,
        valorTotal: 85000.00,
        ncm: '90278099',
        cfop: '3102'
      }
    ],
    observacoes: 'Equipamento com regime especial de ICMS. Desembaraço rápido.'
  },
  {
    id: 'ENT002',
    empresaId: 'master-001',
    numeroPedido: 'IMP-2025-002',
    tipo: 'Importacao',
    fornecedor: 'BioLab Germany GmbH',
    cnpjFornecedor: '11.222.333/0001-44',
    numeroNF: 'INV-DE-2025-789',
    dataEmissao: '2025-01-15',
    dataEntrada: '2025-02-10',
    
    statusImportacao: 'Aguardando DI',
    
    valorTotal: 125000.00,
    valorImpostos: 22500.00,
    categoria: 'Produto',
    status: 'Mercadoria enviada – marítimo',
    itens: [
      {
        id: 'ITEM002',
        codigo: 'REA-BIO-500',
        descricao: 'Kit Reagentes Bioquímicos - 500 testes',
        quantidade: 10,
        valorUnitario: 12500.00,
        valorTotal: 125000.00,
        ncm: '38220000',
        cfop: '3102'
      }
    ],
    observacoes: 'Aguardando chegada da mercadoria para registrar DI'
  },
  {
    id: 'ENT003',
    empresaId: 'master-001',
    numeroPedido: 'NAC-2025-010',
    tipo: 'Compra Nacional',
    fornecedor: 'Distribuidora Nacional Ltda',
    cnpjFornecedor: '55.666.777/0001-88',
    numeroNF: '000456789',
    chaveAcesso: '35250155666777000188550010004567891234567890',
    xmlNF: '/uploads/nf/35250155666777000188550010004567891234567890.xml',
    dataEmissao: '2025-01-22',
    dataEntrada: '2025-01-24',
    
    statusImportacao: 'N/A',
    
    valorTotal: 15000.00,
    valorImpostos: 2700.00,
    categoria: 'Produto',
    status: 'Faturado',
    itens: [
      {
        id: 'ITEM003',
        codigo: 'KIT-001',
        descricao: 'Kit Diagnóstico Rápido',
        quantidade: 100,
        valorUnitario: 150.00,
        valorTotal: 15000.00,
        ncm: '30021000',
        cfop: '1102'
      }
    ]
  },
  {
    id: 'ENT004',
    empresaId: 'master-001',
    numeroPedido: 'IMP-2025-003',
    tipo: 'Importacao',
    fornecedor: 'Global Instruments Ltd',
    cnpjFornecedor: '11.111.111/0001-11',
    numeroNF: 'INV-GL-2025-990',
    dataEmissao: '2025-01-18',
    dataEntrada: '2025-01-28',
    
    statusImportacao: 'Canal Amarelo',
    numeroDI: '25/0012346-7',
    dataRegistroDI: '2025-01-24',
    canalParametrizacao: 'Amarelo',
    
    valorTotal: 145000.00,
    valorImpostos: 26100.00,
    categoria: 'Produto',
    status: 'Aguardando desembaraço - canal amarelo',
    itens: [
      {
        id: 'ITEM004',
        codigo: 'SP-2024',
        descricao: 'Espectrofotômetro UV-VIS',
        quantidade: 2,
        valorUnitario: 72500.00,
        valorTotal: 145000.00,
        ncm: '90278099',
        cfop: '3102'
      }
    ],
    observacoes: 'Canal Amarelo - Aguardando conferência documental'
  },
  {
    id: 'ENT005',
    empresaId: 'master-001',
    numeroPedido: 'IMP-2025-004',
    tipo: 'Importacao',
    fornecedor: 'Japan MedEquip Corp.',
    cnpjFornecedor: '22.333.444/0001-55',
    numeroNF: 'INV-JP-2025-112',
    dataEmissao: '2025-01-12',
    dataEntrada: '2025-01-26',
    
    statusImportacao: 'Desembaraçado',
    numeroDI: '25/0012344-5',
    dataRegistroDI: '2025-01-19',
    canalParametrizacao: 'Verde',
    dataDesembaraco: '2025-01-20',
    
    valorTotal: 98000.00,
    valorImpostos: 17640.00,
    categoria: 'Produto',
    status: 'Chegada no estoque – pronto para conferência',
    itens: [
      {
        id: 'ITEM005',
        codigo: 'MICRO-JP-01',
        descricao: 'Microscópio Digital Avançado',
        quantidade: 3,
        valorUnitario: 32666.67,
        valorTotal: 98000.00,
        ncm: '90118000',
        cfop: '3102'
      }
    ],
    observacoes: 'Desembaraçado. Mercadoria pronta para entrada no estoque.'
  }
];

export const mockNotificacoesEntrada: NotificacaoEntrada[] = [
  {
    id: 'NOT001',
    pedidoId: 'ENT001',
    tipo: 'Produto',
    prioridade: 'Alta',
    mensagem: 'NF de Importação IMP-2025-001 aguardando entrada no sistema',
    dataNotificacao: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lida: false
  },
  {
    id: 'NOT002',
    pedidoId: 'ENT002',
    tipo: 'Produto',
    prioridade: 'Media',
    mensagem: 'NF PED-2025-045 recebida, aguardando confirmação de entrada',
    dataNotificacao: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    lida: false
  },
  {
    id: 'NOT003',
    pedidoId: 'ENT003',
    tipo: 'Servico',
    prioridade: 'Baixa',
    mensagem: 'Entrada de serviço SERV-2025-012 confirmada com sucesso',
    dataNotificacao: new Date(Date.now() - 5 * 60 * 60 * 1000),
    lida: true
  },
  {
    id: 'NOT004',
    pedidoId: 'ENT004',
    tipo: 'Produto',
    prioridade: 'Alta',
    mensagem: 'Importação IMP-2025-002 com prazo de entrada próximo',
    dataNotificacao: new Date(Date.now() - 3 * 60 * 60 * 1000),
    lida: false
  }
];

export const faturamentoModules = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Visão geral do faturamento',
    icon: 'BarChart3'
  },
  {
    id: 'entrada',
    title: 'Entrada',
    description: 'Gestão de compras para revenda (nacional e internacional) com controle de DI e desembaraço',
    icon: 'PackageCheck'
  },
  {
    id: 'saida',
    title: 'Saída',
    description: 'Emissão de documentos fiscais',
    icon: 'ArrowUpCircle'
  },
  {
    id: 'devolucao',
    title: 'Devolução',
    description: 'Gestão de devoluções e estornos',
    icon: 'RotateCcw'
  },
  {
    id: 'cancelamento',
    title: 'Cancelamento',
    description: 'Cancelamento de documentos fiscais',
    icon: 'XCircle'
  },
  {
    id: 'servicos',
    title: 'Serviços',
    description: 'Faturamento de serviços (NFS-e)',
    icon: 'Settings'
  },
  {
    id: 'relatorios',
    title: 'Relatórios',
    description: 'Relatórios e indicadores',
    icon: 'FileText'
  }
];