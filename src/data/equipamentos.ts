import { Equipamento, MovimentacaoEquipamento } from "@/types/equipamento";

export const equipamentosMock: Equipamento[] = [
  {
    id: "eq-001",
    modelo: "Equipamento Alpha XR-200",
    numeroSerie: "SN-20250415",
    lote: "LOT-2025-A415",
    clienteAtual: "Hospital Central",
    clienteAtualId: "cli-001",
    setorAlocacao: "Laboratório de Análises Clínicas",
    responsavelCliente: "Dr. João Silva",
    contatoTelefone: "(11) 98765-4321",
    contatoEmail: "joao.silva@hospitalcentral.com.br",
    status: "ativo",
    dataFabricacao: new Date(2024, 10, 15),
    dataValidade: new Date(2029, 10, 15),
    dataImportacao: new Date(2025, 0, 20),
    statusOrigem: "novo",
  },
  {
    id: "eq-002",
    modelo: "Sistema Beta PRO-150",
    numeroSerie: "SN-20240892",
    lote: "LOT-2024-B892",
    clienteAtual: "Clínica São Lucas",
    clienteAtualId: "cli-002",
    setorAlocacao: "Lab 3 - Análises Avançadas",
    responsavelCliente: "Dra. Maria Santos",
    contatoTelefone: "(21) 99876-5432",
    contatoEmail: "maria.santos@clinicasaolucas.com.br",
    status: "manutencao",
    dataFabricacao: new Date(2024, 5, 10),
    dataImportacao: new Date(2024, 7, 15),
    statusOrigem: "novo",
  },
  {
    id: "eq-003",
    modelo: "Multi-Analyzer Gamma-500",
    numeroSerie: "SN-20250123",
    lote: "LOT-2025-G123",
    clienteAtual: "Laboratório Pesquisa Avançada",
    clienteAtualId: "cli-003",
    setorAlocacao: "Setor de Genômica",
    responsavelCliente: "Prof. Carlos Mendes",
    contatoTelefone: "(11) 3456-7890",
    contatoEmail: "carlos.mendes@lpa.edu.br",
    status: "ativo",
    dataFabricacao: new Date(2024, 11, 5),
    dataValidade: new Date(2029, 11, 5),
    dataImportacao: new Date(2025, 0, 8),
    statusOrigem: "novo",
  },
  {
    id: "eq-004",
    modelo: "BioReactor Delta-X",
    numeroSerie: "SN-20231045",
    lote: "LOT-2023-D045",
    clienteAtual: "Instituto de Biotecnologia",
    clienteAtualId: "cli-004",
    setorAlocacao: "Centro de Cultivo Celular",
    responsavelCliente: "Dr. Fernando Souza",
    contatoTelefone: "(19) 98765-1234",
    contatoEmail: "fernando.souza@biotec.br",
    status: "ativo",
    dataFabricacao: new Date(2023, 8, 20),
    dataImportacao: new Date(2023, 10, 15),
    statusOrigem: "refurbished",
  },
  {
    id: "eq-005",
    modelo: "Scanner Epsilon-300",
    numeroSerie: "SN-20240567",
    lote: "LOT-2024-E567",
    clienteAtual: "Hospital Universitário",
    clienteAtualId: "cli-005",
    setorAlocacao: "Centro de Diagnóstico",
    responsavelCliente: "Dra. Paula Costa",
    contatoTelefone: "(31) 99123-4567",
    contatoEmail: "paula.costa@hu.edu.br",
    status: "ativo",
    dataFabricacao: new Date(2024, 3, 10),
    dataValidade: new Date(2029, 3, 10),
    dataImportacao: new Date(2024, 5, 5),
    statusOrigem: "novo",
  },
  {
    id: "eq-006",
    modelo: "Sistema Integrado Omega-Pro",
    numeroSerie: "SN-20250201",
    lote: "LOT-2025-O201",
    clienteAtual: "Clínica Diagnóstica Premium",
    clienteAtualId: "cli-006",
    setorAlocacao: "Unidade 2 - Análises Especializadas",
    responsavelCliente: "Dr. Roberto Lima",
    contatoTelefone: "(41) 98876-5432",
    contatoEmail: "roberto.lima@premium.com.br",
    status: "ativo",
    dataFabricacao: new Date(2025, 0, 15),
    dataValidade: new Date(2030, 0, 15),
    dataImportacao: new Date(2025, 1, 1),
    statusOrigem: "novo",
  },
];

export const movimentacoesEquipamentoMock: MovimentacaoEquipamento[] = [
  {
    id: "mov-001",
    equipamentoId: "eq-001",
    data: new Date(2025, 0, 25),
    tipo: "instalacao",
    destino: "Hospital Central - Ala Norte",
    responsavel: "Equipe Técnica Biodina",
    observacoes: "Instalação inicial completa com treinamento",
  },
  {
    id: "mov-002",
    equipamentoId: "eq-002",
    data: new Date(2024, 7, 20),
    tipo: "instalacao",
    destino: "Clínica São Lucas - Lab 3",
    responsavel: "Eng. Paulo Mendes",
    observacoes: "Instalação em novo laboratório",
  },
  {
    id: "mov-003",
    equipamentoId: "eq-003",
    data: new Date(2025, 0, 12),
    tipo: "instalacao",
    destino: "Laboratório Pesquisa Avançada - Setor B",
    responsavel: "Dra. Maria Santos",
  },
  {
    id: "mov-004",
    equipamentoId: "eq-004",
    data: new Date(2023, 11, 1),
    tipo: "instalacao",
    destino: "Instituto de Biotecnologia",
    responsavel: "Equipe Técnica Biodina",
  },
  {
    id: "mov-005",
    equipamentoId: "eq-004",
    data: new Date(2024, 5, 15),
    tipo: "transferencia",
    origem: "Instituto de Biotecnologia - Prédio A",
    destino: "Instituto de Biotecnologia - Centro de Cultivo Celular",
    responsavel: "Dr. Fernando Souza",
    observacoes: "Transferência interna para novo setor",
  },
  {
    id: "mov-006",
    equipamentoId: "eq-005",
    data: new Date(2024, 5, 10),
    tipo: "instalacao",
    destino: "Hospital Universitário - Centro de Diagnóstico",
    responsavel: "Téc. Rafael Alves",
  },
  {
    id: "mov-007",
    equipamentoId: "eq-006",
    data: new Date(2025, 1, 5),
    tipo: "instalacao",
    destino: "Clínica Diagnóstica Premium - Unidade 2",
    responsavel: "Eng. Paulo Mendes",
    observacoes: "Instalação em andamento",
  },
];

// Helper para buscar equipamentos
export const buscarEquipamentos = (termo: string): Equipamento[] => {
  if (!termo || termo.trim() === "") return equipamentosMock;

  const termoLower = termo.toLowerCase().trim();

  return equipamentosMock.filter((eq) => {
    return (
      eq.modelo.toLowerCase().includes(termoLower) ||
      eq.numeroSerie.toLowerCase().includes(termoLower) ||
      eq.lote.toLowerCase().includes(termoLower) ||
      eq.clienteAtual.toLowerCase().includes(termoLower) ||
      eq.setorAlocacao.toLowerCase().includes(termoLower)
    );
  });
};

// Helper para obter movimentações de um equipamento
export const getMovimentacoesEquipamento = (
  equipamentoId: string
): MovimentacaoEquipamento[] => {
  return movimentacoesEquipamentoMock
    .filter((mov) => mov.equipamentoId === equipamentoId)
    .sort((a, b) => b.data.getTime() - a.data.getTime());
};

// Helper para obter cor do status
export const getStatusEquipamentoColor = (status: Equipamento["status"]) => {
  const colors = {
    ativo: { bg: "hsl(var(--chart-2) / 0.1)", border: "hsl(var(--chart-2) / 0.3)", text: "hsl(var(--chart-2))" },
    inativo: { bg: "hsl(var(--muted) / 0.3)", border: "hsl(var(--muted) / 0.5)", text: "hsl(var(--muted-foreground))" },
    manutencao: { bg: "hsl(var(--chart-3) / 0.1)", border: "hsl(var(--chart-3) / 0.3)", text: "hsl(var(--chart-3))" },
    emprestimo: { bg: "hsl(var(--chart-1) / 0.1)", border: "hsl(var(--chart-1) / 0.3)", text: "hsl(var(--chart-1))" },
  };
  return colors[status];
};

// Helper para obter label do status
export const getStatusEquipamentoLabel = (status: Equipamento["status"]) => {
  const labels = {
    ativo: "Ativo",
    inativo: "Inativo",
    manutencao: "Em Manutenção",
    emprestimo: "Empréstimo",
  };
  return labels[status];
};

// Helper para obter label do tipo de movimentação
export const getTipoMovimentacaoLabel = (tipo: MovimentacaoEquipamento["tipo"]) => {
  const labels = {
    instalacao: "Instalação",
    transferencia: "Transferência",
    retirada: "Retirada",
    devolucao: "Devolução",
  };
  return labels[tipo];
};
