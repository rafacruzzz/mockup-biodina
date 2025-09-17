import { SolicitacaoGenerica, Setor, TipoSolicitacao, Responsavel, SolicitacaoAlteracao } from '@/types/solicitacao';

export const responsaveis: Responsavel[] = [
  { id: '1', nome: 'Maria Silva', email: 'maria.silva@biodina.com', cargo: 'Gerente de RH' },
  { id: '2', nome: 'João Santos', email: 'joao.santos@biodina.com', cargo: 'Analista de RH' },
  { id: '3', nome: 'Carlos Lima', email: 'carlos.lima@biodina.com', cargo: 'Gerente de TI' },
  { id: '4', nome: 'Ana Costa', email: 'ana.costa@biodina.com', cargo: 'Analista de TI' },
  { id: '5', nome: 'Pedro Oliveira', email: 'pedro.oliveira@biodina.com', cargo: 'Controller' },
  { id: '6', nome: 'Julia Ferreira', email: 'julia.ferreira@biodina.com', cargo: 'Gerente de Compras' },
  { id: '7', nome: 'Roberto Alves', email: 'roberto.alves@biodina.com', cargo: 'Supervisor Administrativo' }
];

export const setores: Setor[] = [
  {
    id: 'rh',
    nome: 'Recursos Humanos',
    icone: 'Users',
    cor: 'bg-blue-500',
    descricao: 'Solicitações relacionadas a pessoal, processos seletivos, férias e benefícios',
    responsaveis: responsaveis.filter(r => r.cargo.includes('RH'))
  },
  {
    id: 'ti',
    nome: 'Tecnologia da Informação',
    icone: 'Monitor',
    cor: 'bg-purple-500',
    descricao: 'Solicitações de acesso a sistemas, suporte técnico e instalações',
    responsaveis: responsaveis.filter(r => r.cargo.includes('TI'))
  },
  {
    id: 'financeiro',
    nome: 'Financeiro',
    icone: 'DollarSign',
    cor: 'bg-green-500',
    descricao: 'Solicitações de reembolsos, pagamentos e relatórios financeiros',
    responsaveis: [responsaveis.find(r => r.nome === 'Pedro Oliveira')!]
  },
  {
    id: 'compras',
    nome: 'Compras',
    icone: 'ShoppingCart',
    cor: 'bg-orange-500',
    descricao: 'Solicitações de compras, cotações e cadastro de fornecedores',
    responsaveis: [responsaveis.find(r => r.nome === 'Julia Ferreira')!]
  },
  {
    id: 'administrativo',
    nome: 'Administrativo',
    icone: 'Building2',
    cor: 'bg-gray-500',
    descricao: 'Solicitações de material de escritório, reservas e manutenção',
    responsaveis: [responsaveis.find(r => r.nome === 'Roberto Alves')!]
  }
];

export const tiposSolicitacao: TipoSolicitacao[] = [
  // RH
  {
    id: 'processo-seletivo',
    nome: 'Requisição de Processo Seletivo',
    setorId: 'rh',
    descricao: 'Solicitar abertura de processo seletivo para nova vaga',
    requer_aprovacao: true,
    prazo_padrao_dias: 15,
    campos: [
      { id: 'departamento_solicitante', label: 'Departamento Solicitante', tipo: 'select', obrigatorio: true, opcoes: ['TI', 'Comercial', 'Financeiro', 'Administrativo'] },
      { id: 'cargo_requisitado', label: 'Cargo Requisitado', tipo: 'text', obrigatorio: true },
      { id: 'salario', label: 'Salário', tipo: 'text', obrigatorio: true },
      { id: 'nivel', label: 'Nível', tipo: 'select', obrigatorio: true, opcoes: ['Júnior', 'Pleno', 'Sênior', 'Especialista'] },
      { id: 'beneficios', label: 'Benefícios', tipo: 'textarea', obrigatorio: true },
      { id: 'tipo_contratacao', label: 'Tipo de Contratação', tipo: 'select', obrigatorio: true, opcoes: ['CLT', 'Estágio', 'Jovem Aprendiz', 'PJ', 'Autônomo'] },
      { id: 'modelo_trabalho', label: 'Modelo de Trabalho', tipo: 'select', obrigatorio: true, opcoes: ['Presencial', 'Híbrido', 'Remoto'] },
      { id: 'carga_horaria', label: 'Carga Horária', tipo: 'text', obrigatorio: true },
      { id: 'justificativa_vaga', label: 'Justificativa da Vaga', tipo: 'select', obrigatorio: true, opcoes: ['Substituição', 'Expansão', 'Outro'] },
      { id: 'quantidade_vagas', label: 'Quantidade de Vagas', tipo: 'number', obrigatorio: true },
      { id: 'perfil_desejado', label: 'Perfil Desejado', tipo: 'textarea', obrigatorio: true },
      { id: 'responsavel_vaga', label: 'Responsável pela Vaga', tipo: 'text', obrigatorio: true },
      { id: 'responsavel_area_entrevista', label: 'Responsável da Área pela Entrevista', tipo: 'text', obrigatorio: true },
      { id: 'data_inicio_prevista', label: 'Data Prevista de Início', tipo: 'date', obrigatorio: true },
      { id: 'aprovacao_gestor_diretoria', label: 'Aprovação (Gestor/Diretoria)', tipo: 'checkbox', obrigatorio: true }
    ]
  },
  {
    id: 'admissao',
    nome: 'Requisição de Admissão',
    setorId: 'rh',
    descricao: 'Solicitar admissão de candidato já selecionado',
    requer_aprovacao: true,
    prazo_padrao_dias: 7,
    campos: [
      { id: 'nome_candidato', label: 'Nome do Candidato', tipo: 'text', obrigatorio: true },
      { id: 'cargo', label: 'Cargo', tipo: 'text', obrigatorio: true },
      { id: 'salario', label: 'Salário', tipo: 'text', obrigatorio: true },
      { id: 'departamento', label: 'Departamento', tipo: 'select', obrigatorio: true, opcoes: ['TI', 'Comercial', 'Financeiro', 'Administrativo'] },
      { id: 'data_admissao', label: 'Data de Admissão', tipo: 'date', obrigatorio: true },
      { id: 'telefone_contato', label: 'Telefone para Contato', tipo: 'text', obrigatorio: true },
      { id: 'email_contato', label: 'Email para Contato', tipo: 'text', obrigatorio: true }
    ]
  },
  {
    id: 'ferias',
    nome: 'Requisição de Férias',
    setorId: 'rh',
    descricao: 'Solicitar programação de férias',
    requer_aprovacao: true,
    prazo_padrao_dias: 30,
    campos: [
      { id: 'nome_colaborador', label: 'Nome do Colaborador', tipo: 'text', obrigatorio: true },
      { id: 'periodo_aquisitivo', label: 'Período Aquisitivo', tipo: 'text', obrigatorio: true },
      { id: 'data_inicio_ferias', label: 'Data de Início das Férias', tipo: 'date', obrigatorio: true },
      { id: 'quantidade_dias', label: 'Quantidade de Dias', tipo: 'select', obrigatorio: true, opcoes: ['15', '20', '30'] },
      { id: 'venda_um_terco', label: 'Venda de 1/3 (Abono Pecuniário)', tipo: 'checkbox', obrigatorio: false }
    ]
  },
  // TI
  {
    id: 'acesso-sistema',
    nome: 'Solicitação de Acesso a Sistema',
    setorId: 'ti',
    descricao: 'Solicitar acesso a sistemas ou recursos de TI',
    requer_aprovacao: false,
    prazo_padrao_dias: 3,
    campos: [
      { id: 'sistema_solicitado', label: 'Sistema/Recurso Solicitado', tipo: 'text', obrigatorio: true },
      { id: 'tipo_acesso', label: 'Tipo de Acesso', tipo: 'select', obrigatorio: true, opcoes: ['Leitura', 'Escrita', 'Administrador'] },
      { id: 'justificativa', label: 'Justificativa', tipo: 'textarea', obrigatorio: true },
      { id: 'usuario_solicitado', label: 'Usuário que Necessita Acesso', tipo: 'text', obrigatorio: true }
    ]
  },
  {
    id: 'suporte-tecnico',
    nome: 'Solicitação de Suporte Técnico',
    setorId: 'ti',
    descricao: 'Solicitar suporte para problemas técnicos',
    requer_aprovacao: false,
    prazo_padrao_dias: 2,
    campos: [
      { id: 'tipo_problema', label: 'Tipo de Problema', tipo: 'select', obrigatorio: true, opcoes: ['Hardware', 'Software', 'Rede', 'Email', 'Outro'] },
      { id: 'urgencia', label: 'Nível de Urgência', tipo: 'select', obrigatorio: true, opcoes: ['Baixa', 'Média', 'Alta', 'Crítica'] },
      { id: 'equipamento_afetado', label: 'Equipamento/Sistema Afetado', tipo: 'text', obrigatorio: false },
      { id: 'descricao_problema', label: 'Descrição Detalhada do Problema', tipo: 'textarea', obrigatorio: true }
    ]
  },
  // Financeiro
  {
    id: 'reembolso',
    nome: 'Solicitação de Reembolso',
    setorId: 'financeiro',
    descricao: 'Solicitar reembolso de despesas',
    requer_aprovacao: true,
    prazo_padrao_dias: 10,
    campos: [
      { id: 'tipo_despesa', label: 'Tipo de Despesa', tipo: 'select', obrigatorio: true, opcoes: ['Viagem', 'Alimentação', 'Transporte', 'Material', 'Outro'] },
      { id: 'valor_total', label: 'Valor Total', tipo: 'text', obrigatorio: true },
      { id: 'data_despesa', label: 'Data da Despesa', tipo: 'date', obrigatorio: true },
      { id: 'centro_custo', label: 'Centro de Custo', tipo: 'select', obrigatorio: true, opcoes: ['Administrativo', 'Comercial', 'TI', 'RH'] },
      { id: 'comprovantes', label: 'Comprovantes Anexados', tipo: 'file', obrigatorio: true }
    ]
  }
];

export const solicitacoesMock: SolicitacaoGenerica[] = [
  {
    id_solicitacao: '1',
    id_usuario_solicitante: '1',
    nome_solicitante: 'João Silva',
    assunto: 'Processo Seletivo - Analista de Sistemas',
    descricao: 'Necessário abrir processo seletivo para vaga de Analista de Sistemas no departamento de TI',
    data_criacao: '2024-01-15T09:00:00Z',
    data_atualizacao: '2024-01-16T14:30:00Z',
    status: 'em-andamento',
    id_setor_destino: 'rh',
    nome_setor_destino: 'Recursos Humanos',
    id_responsavel: '1',
    nome_responsavel: 'Maria Silva',
    expectativa_conclusao: '2024-01-30',
    anexos: [],
    tipo_solicitacao: 'processo-seletivo',
    campos_especificos: {
      departamento_solicitante: 'TI',
      cargo_requisitado: 'Analista de Sistemas',
      salario: 'R$ 8.000,00',
      tipo_contratacao: 'CLT',
      modelo_trabalho: 'Híbrido',
      quantidade_vagas: 1,
      perfil_desejado: 'Graduação em TI, experiência com React e Node.js',
      data_inicio_prevista: '2024-02-01'
    },
    historico_interacoes: [
      {
        id: '1',
        data: '2024-01-15T09:00:00Z',
        usuario: 'João Silva',
        tipo: 'criacao',
        descricao: 'Solicitação criada'
      },
      {
        id: '2',
        data: '2024-01-16T14:30:00Z',
        usuario: 'Maria Silva',
        tipo: 'atualizacao_status',
        descricao: 'Solicitação em análise. Aguardando aprovação da diretoria.',
        status_anterior: 'aberta',
        status_novo: 'em-andamento'
      }
    ]
  },
  {
    id_solicitacao: '2',
    id_usuario_solicitante: '2',
    nome_solicitante: 'Ana Costa',
    assunto: 'Solicitação de Férias - Janeiro 2024',
    descricao: 'Gostaria de solicitar 30 dias de férias para o período de janeiro/2024',
    data_criacao: '2024-01-10T10:15:00Z',
    data_atualizacao: '2024-01-12T16:20:00Z',
    status: 'concluida',
    id_setor_destino: 'rh',
    nome_setor_destino: 'Recursos Humanos',
    id_responsavel: '2',
    nome_responsavel: 'João Santos',
    expectativa_conclusao: '2024-01-20',
    anexos: [],
    tipo_solicitacao: 'ferias',
    campos_especificos: {
      nome_colaborador: 'Ana Costa',
      periodo_aquisitivo: '2023/2024',
      data_inicio_ferias: '2024-01-22',
      quantidade_dias: '30',
      venda_um_terco: false
    },
    historico_interacoes: [
      {
        id: '3',
        data: '2024-01-10T10:15:00Z',
        usuario: 'Ana Costa',
        tipo: 'criacao',
        descricao: 'Solicitação de férias criada'
      },
      {
        id: '4',
        data: '2024-01-12T16:20:00Z',
        usuario: 'João Santos',
        tipo: 'atualizacao_status',
        descricao: 'Férias aprovadas. Programação incluída no sistema.',
        status_anterior: 'aberta',
        status_novo: 'concluida'
      }
    ]
  }
];

// Mocks para Solicitações de Alteração (usadas no RH > SolicitaçõesTab)
export const solicitacoesAlteracaoMock: SolicitacaoAlteracao[] = [
  {
    id: 'alt-1',
    protocolo: '2025-0001',
    colaboradorId: '1',
    aba: 'Informações Pessoais',
    campo: 'Endereço',
    tipoSolicitacao: 'Alteração de Endereço',
    valorAtual: 'Rua A, 123 - Centro',
    valorSolicitado: 'Rua B, 456 - Jardim',
    motivo: 'Mudança de residência',
    status: 'pendente',
    dataSolicitacao: new Date().toISOString(),
  },
  {
    id: 'alt-2',
    protocolo: '2025-0002',
    colaboradorId: '1',
    aba: 'Dados Profissionais',
    campo: 'Cargo',
    tipoSolicitacao: 'Promoção',
    valorAtual: 'Analista Pleno',
    valorSolicitado: 'Analista Sênior',
    motivo: 'Desempenho acima do esperado',
    observacoesRH: 'Em avaliação pelo gestor',
    status: 'em-analise',
    dataSolicitacao: new Date().toISOString(),
  },
  {
    id: 'alt-3',
    protocolo: '2025-0003',
    colaboradorId: '2',
    aba: 'Benefícios',
    campo: 'Plano de Saúde',
    tipoSolicitacao: 'Inclusão de Dependente — Plano de Saúde',
    valorAtual: 'Sem dependentes',
    valorSolicitado: 'Incluir 1 dependente',
    motivo: 'Nascimento de filho',
    status: 'aprovada',
    dataSolicitacao: new Date().toISOString(),
    dataProcessamento: new Date().toISOString().split('T')[0],
    processadoPor: 'Sistema RH',
    observacoesRH: 'Aprovado. Enviar documentos comprobatórios.',
  },
];

// Função para buscar solicitações de alteração por colaborador
export const getSolicitacoesByColaborador = (colaboradorId: string): SolicitacaoAlteracao[] => {
  console.log('[solicitacoes] getSolicitacoesByColaborador', { colaboradorId });
  return solicitacoesAlteracaoMock.filter((s) => s.colaboradorId === colaboradorId);
};

// Ampliar mapeamento de status para suportar ambos os domínios: genérico e alteração
type StatusGenericoOuAlteracao =
  | SolicitacaoGenerica['status']
  | 'pendente'
  | 'em-analise'
  | 'aprovada';

// Ajuste: aceitar também os status de alteração
export const getStatusColor = (status: StatusGenericoOuAlteracao) => {
  switch (status) {
    // Status genéricos
    case 'aberta':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'em-andamento':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'concluida':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'rejeitada':
      return 'bg-red-100 text-red-700 border-red-200';
    // Status de alteração (RH)
    case 'pendente':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'em-analise':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'aprovada':
      return 'bg-green-100 text-green-700 border-green-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

// Ajuste: aceitar também os status de alteração
export const getStatusText = (status: StatusGenericoOuAlteracao) => {
  switch (status) {
    // Status genéricos
    case 'aberta':
      return 'Aberta';
    case 'em-andamento':
      return 'Em Andamento';
    case 'concluida':
      return 'Concluída';
    case 'rejeitada':
      return 'Rejeitada';
    // Status de alteração (RH)
    case 'pendente':
      return 'Pendente';
    case 'em-analise':
      return 'Em Análise';
    case 'aprovada':
      return 'Aprovada';
    default:
      return 'Desconhecido';
  }
};
