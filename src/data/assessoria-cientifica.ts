import { 
  OrdemServico, 
  StatusOS, 
  TipoOS, 
  Alerta 
} from "@/types/assessoria-cientifica";

// Mock data para Ordens de Serviço
export const ordensServicoMock: OrdemServico[] = [
  {
    id: "os-001",
    numero: "OS-2025-001",
    tipo: ["treinamento_inicial"],
    status: "ABERTA",
    departamento: "Assessoria Científica",
    cliente: "Hospital Central",
    clienteId: "cli-001",
    equipamento: "Equipamento Alpha XR-200",
    equipamentoId: "eq-001",
    numeroSerieLote: "SN-20250415",
    versaoSoftware: "v3.2.1",
    versaoWindows: "Windows 11 Pro",
    setorAlocacao: "Laboratório de Análises Clínicas",
    opcaoAtendimento: "presencial",
    projeto: "Projeto Hospitalar Central",
    projetoId: "proj-001",
    descricaoServico: "Treinamento inicial da equipe médica para operação do equipamento XR-200",
    servicoRealizado: "Realizado treinamento completo com 8 profissionais",
    dataAgendada: new Date(2025, 9, 5, 9, 0),
    responsavel: "Dr. Carlos Mendes",
    responsavelId: "resp-001",
    abertoPor: "Comercial",
    abertoEm: new Date(2025, 8, 15),
    observacoes: "Treinamento para 8 profissionais. Duração estimada: 4 horas",
    atualizadoEm: new Date(2025, 8, 15)
  },
  {
    id: "os-002",
    numero: "OS-2025-002",
    tipo: ["suporte_operacional"],
    status: "URGENTE",
    departamento: "Departamento Técnico",
    cliente: "Clínica São Lucas",
    clienteId: "cli-002",
    equipamento: "Sistema Beta PRO-150",
    equipamentoId: "eq-002",
    numeroSerieLote: "SN-20240892",
    versaoSoftware: "v2.8.0",
    opcaoAtendimento: "remoto",
    descricaoServico: "Suporte técnico emergencial - falha no sistema de calibração",
    dataAgendada: new Date(2025, 9, 3, 14, 0),
    responsavel: "Eng. Roberto Lima",
    responsavelId: "resp-002",
    abertoPor: "DT",
    abertoEm: new Date(2025, 9, 2),
    observacoes: "URGENTE: Sistema apresentando erros críticos de calibração",
    atualizadoEm: new Date(2025, 9, 2)
  },
  {
    id: "os-003",
    numero: "OS-2025-003",
    tipo: ["acompanhamento_rotina"],
    status: "EM_ANDAMENTO",
    departamento: "Assessoria Científica",
    cliente: "Laboratório Pesquisa Avançada",
    clienteId: "cli-003",
    equipamento: "Multi-Analyzer Gamma-500",
    equipamentoId: "eq-003",
    numeroSerieLote: "SN-20250123",
    versaoSoftware: "v4.1.2",
    setorAlocacao: "Setor de Genômica",
    opcaoAtendimento: "presencial",
    projeto: "Projeto Pesquisa Genômica",
    projetoId: "proj-002",
    descricaoServico: "Visita de rotina para verificação de performance e satisfação",
    dataAgendada: new Date(2025, 9, 8, 10, 0),
    dataInicio: new Date(2025, 9, 8, 10, 15),
    responsavel: "Dra. Maria Santos",
    responsavelId: "resp-003",
    abertoPor: "Assessor",
    abertoEm: new Date(2025, 8, 20),
    observacoes: "Verificar se há necessidade de treinamento adicional",
    atualizadoEm: new Date(2025, 9, 8)
  },
  {
    id: "os-004",
    numero: "OS-2025-004",
    tipo: ["treinamento_nova_equipe"],
    status: "ABERTA",
    departamento: "Assessoria Científica",
    cliente: "Instituto de Biotecnologia",
    clienteId: "cli-004",
    equipamento: "BioReactor Delta-X",
    equipamentoId: "eq-004",
    opcaoAtendimento: "presencial",
    descricaoServico: "Treinamento avançado em técnicas de cultivo celular",
    dataAgendada: new Date(2025, 9, 12, 9, 0),
    responsavel: "Dr. Fernando Souza",
    responsavelId: "resp-004",
    abertoPor: "Assessor",
    abertoEm: new Date(2025, 8, 18),
    observacoes: "Treinamento de 2 dias para equipe de 5 pesquisadores",
    atualizadoEm: new Date(2025, 8, 18)
  },
  {
    id: "os-005",
    numero: "OS-2025-005",
    tipo: ["acompanhamento_rotina"],
    status: "CONCLUÍDA",
    departamento: "Departamento Técnico",
    cliente: "Hospital Universitário",
    clienteId: "cli-005",
    equipamento: "Scanner Epsilon-300",
    equipamentoId: "eq-005",
    opcaoAtendimento: "presencial",
    descricaoServico: "Manutenção preventiva semestral do equipamento",
    servicoRealizado: "Manutenção realizada com sucesso. Todos os sistemas operacionais",
    dataAgendada: new Date(2025, 8, 25, 8, 0),
    dataInicio: new Date(2025, 8, 25, 8, 10),
    dataConclusao: new Date(2025, 8, 25, 12, 30),
    responsavel: "Téc. Rafael Alves",
    responsavelId: "resp-005",
    abertoPor: "DT",
    abertoEm: new Date(2025, 7, 25),
    observacoes: "Todos os sistemas operacionais",
    atualizadoEm: new Date(2025, 8, 25)
  },
  {
    id: "os-006",
    numero: "OS-2025-006",
    tipo: ["suporte_operacional"],
    status: "EM_ANDAMENTO",
    departamento: "Departamento Técnico",
    cliente: "Clínica Diagnóstica Premium",
    clienteId: "cli-006",
    equipamento: "Sistema Integrado Omega-Pro",
    equipamentoId: "eq-006",
    projeto: "Expansão Clínica Premium",
    projetoId: "proj-003",
    opcaoAtendimento: "presencial",
    descricaoServico: "Instalação e configuração inicial do sistema",
    dataAgendada: new Date(2025, 9, 10, 7, 0),
    dataInicio: new Date(2025, 9, 10, 7, 30),
    responsavel: "Eng. Paulo Mendes",
    responsavelId: "resp-006",
    abertoPor: "DT",
    abertoEm: new Date(2025, 8, 10),
    observacoes: "Instalação prevista para 3 dias. Equipe de 4 técnicos",
    atualizadoEm: new Date(2025, 9, 10)
  },
  {
    id: "os-007",
    numero: "OS-2025-007",
    tipo: ["analise_edital"],
    status: "ABERTA",
    departamento: "Assessoria Científica",
    cliente: "Universidade Federal",
    clienteId: "cli-007",
    opcaoAtendimento: "remoto",
    descricaoServico: "Consultoria para desenvolvimento de protocolo experimental",
    dataAgendada: new Date(2025, 9, 15, 14, 0),
    responsavel: "Dr. Carlos Mendes",
    responsavelId: "resp-001",
    abertoPor: "Comercial",
    abertoEm: new Date(2025, 9, 1),
    observacoes: "Reunião com equipe de pesquisadores para definir metodologia",
    atualizadoEm: new Date(2025, 9, 1)
  },
  {
    id: "os-008",
    numero: "OS-2025-008",
    tipo: ["suporte_operacional"],
    status: "CANCELADA",
    departamento: "Departamento Técnico",
    cliente: "Instituto de Pesquisa",
    clienteId: "cli-008",
    equipamento: "Analisador Theta-100",
    equipamentoId: "eq-008",
    opcaoAtendimento: "presencial",
    descricaoServico: "Análise técnica de compatibilidade de reagentes",
    dataAgendada: new Date(2025, 9, 7, 10, 0),
    responsavel: "Téc. Juliana Costa",
    responsavelId: "resp-007",
    abertoPor: "DT",
    abertoEm: new Date(2025, 8, 28),
    observacoes: "Cancelado a pedido do cliente - reagentes não disponíveis",
    atualizadoEm: new Date(2025, 9, 6)
  },
  // OSs da Ana Assessora
  {
    id: "os-009",
    numero: "OS-2025-009",
    tipo: ["treinamento_inicial"],
    status: "CONCLUÍDA",
    departamento: "Assessoria Científica",
    cliente: "Hospital Central",
    clienteId: "cli-001",
    equipamento: "DxH520",
    equipamentoId: "eq-009",
    numeroSerieLote: "SN-20250520",
    versaoSoftware: "v5.2.0",
    setorAlocacao: "Hematologia",
    opcaoAtendimento: "presencial",
    projeto: "Projeto Hospitalar Central",
    projetoId: "proj-001",
    descricaoServico: "Treinamento inicial da equipe de hematologia para operação do DxH520",
    servicoRealizado: "Treinamento completo realizado com 6 profissionais. Todos os participantes demonstraram domínio do equipamento.",
    dataAgendada: new Date(2025, 9, 2, 9, 0),
    dataInicio: new Date(2025, 9, 2, 9, 15),
    dataConclusao: new Date(2025, 9, 2, 13, 30),
    responsavel: "Ana Assessora",
    responsavelId: "resp-008",
    abertoPor: "Comercial",
    abertoEm: new Date(2025, 8, 20),
    observacoes: "Treinamento realizado com sucesso. Certificados emitidos.",
    participantes: ["Dr. João Silva", "Dra. Maria Oliveira", "Téc. Pedro Santos", "Téc. Ana Costa", "Téc. Carlos Souza", "Téc. Juliana Lima"],
    atualizadoEm: new Date(2025, 9, 2)
  },
  {
    id: "os-010",
    numero: "OS-2025-010",
    tipo: ["acompanhamento_rotina"],
    status: "ABERTA",
    departamento: "Assessoria Científica",
    cliente: "Laboratório VidaSaúde",
    clienteId: "cli-009",
    equipamento: "UniCel DxC 700",
    equipamentoId: "eq-010",
    numeroSerieLote: "SN-20241203",
    versaoSoftware: "v7.1.3",
    setorAlocacao: "Bioquímica",
    opcaoAtendimento: "presencial",
    descricaoServico: "Visita de acompanhamento trimestral - verificação de performance e satisfação do cliente",
    dataAgendada: new Date(2025, 9, 16, 10, 0),
    responsavel: "Ana Assessora",
    responsavelId: "resp-008",
    abertoPor: "Assessor",
    abertoEm: new Date(2025, 9, 1),
    observacoes: "Cliente solicitou revisão de procedimentos operacionais padrão",
    atualizadoEm: new Date(2025, 9, 1)
  },
  {
    id: "os-011",
    numero: "OS-2025-011",
    tipo: ["treinamento_nova_equipe"],
    status: "EM_ANDAMENTO",
    departamento: "Assessoria Científica",
    cliente: "Hospital Central",
    clienteId: "cli-001",
    equipamento: "DxH520",
    equipamentoId: "eq-009",
    opcaoAtendimento: "presencial",
    descricaoServico: "Treinamento para novos técnicos contratados - turno noturno",
    dataAgendada: new Date(2025, 9, 11, 14, 0),
    dataInicio: new Date(2025, 9, 11, 14, 15),
    responsavel: "Ana Assessora",
    responsavelId: "resp-008",
    abertoPor: "Assessor",
    abertoEm: new Date(2025, 9, 5),
    observacoes: "Treinamento em andamento para 3 novos técnicos",
    participantes: ["Téc. Ricardo Almeida", "Téc. Fernanda Costa", "Téc. Bruno Lima"],
    atualizadoEm: new Date(2025, 9, 11)
  },
  {
    id: "os-012",
    numero: "OS-2025-012",
    tipo: ["suporte_operacional"],
    status: "URGENTE",
    departamento: "Assessoria Científica",
    cliente: "Clínica Diagnóstica Avançada",
    clienteId: "cli-010",
    equipamento: "AU5800",
    equipamentoId: "eq-011",
    numeroSerieLote: "SN-20250101",
    versaoSoftware: "v6.3.2",
    opcaoAtendimento: "remoto",
    descricaoServico: "Suporte emergencial - erro de calibração após atualização de software",
    dataAgendada: new Date(2025, 9, 9, 16, 0),
    responsavel: "Ana Assessora",
    responsavelId: "resp-008",
    abertoPor: "DT",
    abertoEm: new Date(2025, 9, 9),
    observacoes: "URGENTE: Cliente reportou erro crítico. Atendimento prioritário necessário.",
    atualizadoEm: new Date(2025, 9, 9)
  }
];

// Função helper para obter o nome amigável do tipo de OS
export const getTipoOSLabel = (tipo: TipoOS): string => {
  const labels: Record<TipoOS, string> = {
    suporte_operacional: "Suporte Operacional",
    acompanhamento_rotina: "Acompanhamento de Rotina",
    treinamento_inicial: "Treinamento Inicial",
    treinamento_nova_equipe: "Treinamento de Nova Equipe",
    analise_edital: "Análise de Edital"
  };
  return labels[tipo];
};

// Função helper para obter o ícone do tipo de OS
export const getTipoOSIcon = (tipo: TipoOS): string => {
  const icons: Record<TipoOS, string> = {
    suporte_operacional: "🔧",
    acompanhamento_rotina: "👁️",
    treinamento_inicial: "🎓",
    treinamento_nova_equipe: "📚",
    analise_edital: "📋"
  };
  return icons[tipo];
};

// Função helper para obter a cor do status
export const getStatusColor = (status: StatusOS): { bg: string; border: string; text: string } => {
  const colors: Record<StatusOS, { bg: string; border: string; text: string }> = {
    ABERTA: {
      bg: "hsl(var(--chart-1) / 0.1)",
      border: "hsl(var(--chart-1) / 0.3)",
      text: "hsl(var(--chart-1))"
    },
    EM_ANDAMENTO: {
      bg: "hsl(var(--chart-3) / 0.1)",
      border: "hsl(var(--chart-3) / 0.3)",
      text: "hsl(var(--chart-3))"
    },
    CONCLUÍDA: {
      bg: "hsl(var(--chart-2) / 0.1)",
      border: "hsl(var(--chart-2) / 0.3)",
      text: "hsl(var(--chart-2))"
    },
    URGENTE: {
      bg: "hsl(var(--destructive) / 0.1)",
      border: "hsl(var(--destructive) / 0.3)",
      text: "hsl(var(--destructive))"
    },
    CANCELADA: {
      bg: "hsl(var(--muted) / 0.3)",
      border: "hsl(var(--muted) / 0.5)",
      text: "hsl(var(--muted-foreground))"
    }
  };
  return colors[status];
};

// Lista de assessores/técnicos disponíveis
export const assessoresTecnicos = [
  { id: "resp-001", nome: "Dr. Carlos Mendes", departamento: "Assessoria Científica" },
  { id: "resp-002", nome: "Eng. Roberto Lima", departamento: "Departamento Técnico" },
  { id: "resp-003", nome: "Dra. Maria Santos", departamento: "Assessoria Científica" },
  { id: "resp-004", nome: "Dr. Fernando Souza", departamento: "Assessoria Científica" },
  { id: "resp-005", nome: "Téc. Rafael Alves", departamento: "Departamento Técnico" },
  { id: "resp-006", nome: "Eng. Paulo Mendes", departamento: "Departamento Técnico" },
  { id: "resp-007", nome: "Téc. Juliana Costa", departamento: "Departamento Técnico" },
  { id: "resp-008", nome: "Ana Assessora", departamento: "Assessoria Científica" }
];

// Alertas do sistema
export const alertasMock: Alerta[] = [
  {
    id: "alerta-001",
    tipo: "prazo",
    titulo: "3 OS próximas do prazo de fechamento",
    descricao: "OS #1234, #1235 e #1236 vencem nos próximos 3 dias",
    prioridade: "alta",
    dataCriacao: new Date(),
  },
  {
    id: "alerta-002",
    tipo: "acompanhamento",
    titulo: "Cliente sem visita de acompanhamento há 90 dias",
    descricao: "Hospital Santa Maria - Última visita em 15/10/2024",
    prioridade: "media",
    clienteId: "cliente-001",
    dataCriacao: new Date(),
  },
  {
    id: "alerta-003",
    tipo: "urgente",
    titulo: "2 OS urgentes aguardando atendimento",
    descricao: "Hospital São José e Clínica Vida requerem atendimento imediato",
    prioridade: "alta",
    dataCriacao: new Date(),
  },
  {
    id: "alerta-004",
    tipo: "prazo",
    titulo: "Certificados de treinamento pendentes",
    descricao: "5 treinamentos concluídos sem certificado emitido",
    prioridade: "baixa",
    dataCriacao: new Date(),
  },
];
