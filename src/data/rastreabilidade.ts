import { Equipamento, HistoricoIntervencao, ResultadoBusca } from "@/types/rastreabilidade";

// Mock de equipamentos
export const equipamentosMock: Equipamento[] = [
  {
    id: "eq-001",
    numeroSerie: "SN-ABL800-123",
    modelo: "ABL800",
    marca: "Radiometer",
    cliente: "Hospital Central",
    clienteId: "cli-001",
    localizacao: "São Paulo, SP",
    setor: "UTI",
    dataInstalacao: new Date(2023, 0, 15),
    status: "ativo",
    ultimaManutencao: new Date(2025, 0, 10),
    proximaManutencao: new Date(2025, 3, 10),
    versaoSoftware: "v4.2.1",
    versaoWindows: "Windows 10 Pro",
  },
  {
    id: "eq-002",
    numeroSerie: "SN-ABL800-456",
    modelo: "ABL800",
    marca: "Radiometer",
    cliente: "Hospital Albert Einstein",
    clienteId: "cli-002",
    localizacao: "São Paulo, SP",
    setor: "Laboratório Central",
    dataInstalacao: new Date(2023, 2, 20),
    status: "ativo",
    ultimaManutencao: new Date(2024, 11, 5),
    proximaManutencao: new Date(2025, 2, 5),
    versaoSoftware: "v4.2.1",
    versaoWindows: "Windows 10 Pro",
  },
  {
    id: "eq-003",
    numeroSerie: "SN-DXH520-789",
    modelo: "DxH520",
    marca: "Beckman Coulter",
    cliente: "Hospital Sírio-Libanês",
    clienteId: "cli-003",
    localizacao: "São Paulo, SP",
    setor: "Hematologia",
    dataInstalacao: new Date(2023, 5, 10),
    status: "ativo",
    ultimaManutencao: new Date(2025, 0, 20),
    versaoSoftware: "v2.1.0",
  },
  {
    id: "eq-004",
    numeroSerie: "SN-ABL90-321",
    modelo: "ABL90 FLEX",
    marca: "Radiometer",
    cliente: "Hospital Central",
    clienteId: "cli-001",
    localizacao: "São Paulo, SP",
    setor: "Pronto Socorro",
    dataInstalacao: new Date(2022, 8, 5),
    status: "ativo",
    ultimaManutencao: new Date(2024, 11, 15),
    proximaManutencao: new Date(2025, 2, 15),
    versaoSoftware: "v3.1.2",
  },
  {
    id: "eq-005",
    numeroSerie: "SN-AQURE-555",
    modelo: "AQURE",
    marca: "Radiometer",
    cliente: "Laboratório Fleury",
    clienteId: "cli-004",
    localizacao: "São Paulo, SP",
    setor: "Processamento Central",
    dataInstalacao: new Date(2023, 10, 1),
    status: "ativo",
    ultimaManutencao: new Date(2025, 0, 5),
  },
];

// Mock de histórico de intervenções
export const historicoIntervencoesMock: HistoricoIntervencao[] = [
  {
    id: "hist-001",
    equipamentoId: "eq-001",
    osId: "os-001",
    osNumero: "2025-001",
    tipo: "instalacao",
    departamento: "Assessoria Científica",
    data: new Date(2023, 0, 15),
    responsavel: "Dr. João Silva",
    descricao: "Instalação e configuração inicial do equipamento",
  },
  {
    id: "hist-002",
    equipamentoId: "eq-001",
    osId: "os-002",
    osNumero: "2025-002",
    tipo: "treinamento",
    departamento: "Assessoria Científica",
    data: new Date(2023, 0, 16),
    responsavel: "Dr. João Silva",
    descricao: "Treinamento inicial da equipe de enfermagem",
  },
  {
    id: "hist-003",
    equipamentoId: "eq-001",
    osId: "os-003",
    osNumero: "2024-156",
    tipo: "manutencao_preventiva",
    departamento: "Departamento Técnico",
    data: new Date(2024, 6, 10),
    responsavel: "Téc. Carlos Santos",
    descricao: "Manutenção preventiva trimestral",
    observacoes: "Todas as verificações dentro dos parâmetros. Substituída solução de limpeza.",
  },
  {
    id: "hist-004",
    equipamentoId: "eq-001",
    osId: "os-004",
    osNumero: "2024-203",
    tipo: "manutencao_corretiva",
    departamento: "Departamento Técnico",
    data: new Date(2024, 9, 5),
    responsavel: "Téc. Maria Oliveira",
    descricao: "Correção de erro de leitura do sensor de pH",
    observacoes: "Substituído sensor de pH. Equipamento testado e aprovado. Peças: SEN-PH-001.",
  },
  {
    id: "hist-005",
    equipamentoId: "eq-001",
    osId: "os-005",
    osNumero: "2025-010",
    tipo: "atualizacao",
    departamento: "Assessoria Científica",
    data: new Date(2025, 0, 10),
    responsavel: "Dr. João Silva",
    descricao: "Atualização de software para v4.2.1",
    observacoes: "Atualização realizada com sucesso. Sistema testado e operacional.",
  },
  {
    id: "hist-006",
    equipamentoId: "eq-002",
    osId: "os-006",
    osNumero: "2025-006",
    tipo: "instalacao",
    departamento: "Assessoria Científica",
    data: new Date(2023, 2, 20),
    responsavel: "Dra. Maria Costa",
    descricao: "Instalação e configuração inicial",
  },
  {
    id: "hist-007",
    equipamentoId: "eq-003",
    osId: "os-007",
    osNumero: "2025-007",
    tipo: "instalacao",
    departamento: "Assessoria Científica",
    data: new Date(2023, 5, 10),
    responsavel: "Dr. Pedro Alves",
    descricao: "Instalação e setup inicial",
  },
  {
    id: "hist-008",
    equipamentoId: "eq-003",
    osId: "os-008",
    osNumero: "2025-008",
    tipo: "treinamento",
    departamento: "Assessoria Científica",
    data: new Date(2023, 5, 11),
    responsavel: "Dr. Pedro Alves",
    descricao: "Treinamento da equipe do laboratório",
  },
];

// Funções auxiliares
export const buscarEquipamentos = (termo: string): ResultadoBusca => {
  const termoLower = termo.toLowerCase();
  
  // Buscar equipamentos por número de série
  const equipamentosPorSerie = equipamentosMock.filter(eq =>
    eq.numeroSerie.toLowerCase().includes(termoLower)
  );
  
  // Buscar modelos únicos
  const modelosUnicos = [...new Set(
    equipamentosMock
      .filter(eq => eq.modelo.toLowerCase().includes(termoLower))
      .map(eq => eq.modelo)
  )];
  
  // Buscar clientes únicos
  const clientesMap = new Map<string, { id: string; nome: string }>();
  equipamentosMock
    .filter(eq => eq.cliente.toLowerCase().includes(termoLower))
    .forEach(eq => {
      if (!clientesMap.has(eq.clienteId)) {
        clientesMap.set(eq.clienteId, { id: eq.clienteId, nome: eq.cliente });
      }
    });
  
  return {
    equipamentos: equipamentosPorSerie,
    modelos: modelosUnicos,
    clientes: Array.from(clientesMap.values()),
  };
};

export const getEquipamentoPorId = (id: string): Equipamento | undefined => {
  return equipamentosMock.find(eq => eq.id === id);
};

export const getEquipamentoPorNumeroSerie = (numeroSerie: string): Equipamento | undefined => {
  return equipamentosMock.find(eq => eq.numeroSerie === numeroSerie);
};

export const getHistoricoEquipamento = (equipamentoId: string): HistoricoIntervencao[] => {
  return historicoIntervencoesMock
    .filter(hist => hist.equipamentoId === equipamentoId)
    .sort((a, b) => b.data.getTime() - a.data.getTime());
};

export const getEquipamentosPorModelo = (modelo: string): Equipamento[] => {
  return equipamentosMock.filter(eq => eq.modelo === modelo);
};

export const getEquipamentosPorCliente = (clienteId: string): Equipamento[] => {
  return equipamentosMock.filter(eq => eq.clienteId === clienteId);
};

export const getTipoIntervencaoLabel = (tipo: HistoricoIntervencao["tipo"]): string => {
  const labels = {
    instalacao: "Instalação",
    treinamento: "Treinamento",
    manutencao_preventiva: "Manutenção Preventiva",
    manutencao_corretiva: "Manutenção Corretiva",
    atualizacao: "Atualização",
    desinstalacao: "Desinstalação",
  };
  return labels[tipo];
};

export const getStatusEquipamentoColor = (status: Equipamento["status"]) => {
  const colors = {
    ativo: { bg: "#dcfce7", border: "#16a34a", text: "#15803d" },
    inativo: { bg: "#f3f4f6", border: "#6b7280", text: "#374151" },
    manutencao: { bg: "#fef3c7", border: "#f59e0b", text: "#d97706" },
  };
  return colors[status];
};
