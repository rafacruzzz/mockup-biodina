import { 
  PastaRT, 
  ArquivoRT, 
  Mudanca, 
  Treinamento, 
  LiberacaoProduto,
  DocumentacaoRT 
} from "@/types/rt";

// Mock de arquivos
export const mockArquivos: ArquivoRT[] = [
  {
    id: "arq-1",
    nome: "POP-001-Procedimento-Recebimento.pdf",
    tipo: "application/pdf",
    tamanho: 2048576,
    dataUpload: "2024-01-15",
    url: "/mock/pop-001.pdf"
  },
  {
    id: "arq-2",
    nome: "ESP-001-Especificacao-Equipamento.pdf",
    tipo: "application/pdf",
    tamanho: 1536000,
    dataUpload: "2024-01-20",
    url: "/mock/esp-001.pdf"
  }
];

// Mock de estrutura de pastas para POP
export const mockPastasPOP: PastaRT[] = [
  {
    id: "pop-pasta-1",
    nome: "Procedimentos de Recebimento",
    subtitulo: "POPs relacionados ao recebimento de produtos",
    pastaId: null,
    arquivos: [mockArquivos[0]],
    subPastas: [],
    expandido: false
  },
  {
    id: "pop-pasta-2",
    nome: "Procedimentos de Armazenamento",
    subtitulo: "POPs de gestão de estoque",
    pastaId: null,
    arquivos: [],
    subPastas: [],
    expandido: false
  }
];

// Mock de estrutura de pastas para Especificações
export const mockPastasEspecificacoes: PastaRT[] = [
  {
    id: "esp-pasta-1",
    nome: "Especificações de Equipamentos",
    subtitulo: "Especificações técnicas detalhadas",
    pastaId: null,
    arquivos: [mockArquivos[1]],
    subPastas: [],
    expandido: false
  }
];

// Mock de estrutura de pastas para Legislações
export const mockPastasLegislacoes: PastaRT[] = [
  {
    id: "leg-pasta-1",
    nome: "RDCs ANVISA",
    subtitulo: "Resoluções da Diretoria Colegiada",
    pastaId: null,
    arquivos: [],
    subPastas: [],
    expandido: false
  }
];

// Mock de documentações
export const mockDocumentacoes: DocumentacaoRT[] = [
  {
    tipo: "pop",
    nomeArquivoPrincipal: "Manual de Procedimentos Operacionais Padrão v2.0",
    estruturaPastas: mockPastasPOP
  },
  {
    tipo: "especificacoes",
    nomeArquivoPrincipal: "Especificações Técnicas Gerais v1.5",
    estruturaPastas: mockPastasEspecificacoes
  },
  {
    tipo: "legislacoes",
    nomeArquivoPrincipal: "Compêndio de Legislações Vigentes 2024",
    estruturaPastas: mockPastasLegislacoes
  }
];

// Mock de liberação de produtos
export const mockLiberacaoProdutos: LiberacaoProduto[] = [
  {
    produtoId: "prod-1",
    codigo: "DXH520",
    nome: "DxH 520",
    marca: "Beckman Coulter",
    linha: "Hematologia",
    liberadoRT: true,
    dataLiberacao: "2024-01-10",
    responsavelLiberacao: "Dr. Carlos Silva",
    observacoes: "Produto aprovado para comercialização"
  },
  {
    produtoId: "prod-2",
    codigo: "ABL800",
    nome: "ABL800 FLEX",
    marca: "Radiometer",
    linha: "Gasometria",
    liberadoRT: true,
    dataLiberacao: "2024-01-15",
    responsavelLiberacao: "Dr. Carlos Silva"
  },
  {
    produtoId: "prod-3",
    codigo: "AQT90",
    nome: "AQT90 FLEX",
    marca: "Radiometer",
    linha: "Imunologia",
    liberadoRT: false
  }
];

// Mock de mudanças
export const mockMudancas: Mudanca[] = [
  {
    id: "mud-1",
    data: "2024-01-10",
    parteInteressada: "RT",
    responsavel: "Dr. Carlos Silva",
    tipoMudanca: "A",
    descricao: "Alteração de endereço da matriz - Nova localização da sede",
    status: "Aprovado",
    observacoes: "Mudança de endereço concluída e documentada"
  },
  {
    id: "mud-2",
    data: "2024-01-15",
    parteInteressada: "CQ",
    responsavel: "Ana Santos",
    tipoMudanca: "B",
    descricao: "Atualização do número de registro ANVISA do produto DxH 520",
    status: "Em Análise",
    observacoes: "Aguardando aprovação da ANVISA"
  },
  {
    id: "mud-3",
    data: "2024-01-20",
    parteInteressada: "TI",
    responsavel: "João Oliveira",
    tipoMudanca: "C",
    descricao: "Implementação de novo fluxo de rastreabilidade de lotes",
    status: "Pendente"
  },
  {
    id: "mud-4",
    data: "2024-01-25",
    parteInteressada: "RT",
    responsavel: "Dr. Carlos Silva",
    tipoMudanca: "D",
    descricao: "Adequação à nova RDC 665/2022 - Boas Práticas de Distribuição",
    status: "Aprovado"
  }
];

// Mock de treinamentos realizados
export const mockTreinamentosRealizados: Treinamento[] = [
  {
    id: "trei-1",
    data: "2024-01-10",
    conteudo: "Boas Práticas de Armazenamento e Distribuição",
    local: "Sala de Treinamento - Sede",
    ministrante: "Dr. Carlos Silva",
    participantes: ["João Silva", "Maria Santos", "Pedro Costa"],
    objetivo: "Capacitar equipe em procedimentos de armazenamento conforme RDC 430/2020",
    anexos: [
      {
        id: "anexo-1",
        nome: "Lista_Presenca_10-01-2024.pdf",
        tipo: "application/pdf",
        tamanho: 512000,
        dataUpload: "2024-01-10"
      },
      {
        id: "anexo-2",
        nome: "Material_Treinamento_BP.pdf",
        tipo: "application/pdf",
        tamanho: 2048000,
        dataUpload: "2024-01-10"
      }
    ],
    tipo: "realizado",
    status: "Realizado"
  },
  {
    id: "trei-2",
    data: "2024-01-20",
    conteudo: "Procedimentos de Recebimento e Inspeção",
    local: "Área de Recebimento",
    ministrante: "Ana Santos",
    participantes: ["Carlos Mendes", "Paula Oliveira"],
    objetivo: "Treinar novos colaboradores em procedimentos de recebimento",
    anexos: [],
    tipo: "realizado",
    status: "Realizado"
  }
];

// Mock de treinamentos futuros
export const mockTreinamentosFuturos: Treinamento[] = [
  {
    id: "trei-3",
    data: "2024-02-15",
    conteudo: "Atualização Regulatória - Nova RDC 2024",
    local: "Auditório Principal",
    ministrante: "Dr. Carlos Silva",
    participantes: ["Equipe Completa"],
    objetivo: "Apresentar mudanças regulatórias e impactos nas operações",
    anexos: [],
    tipo: "futuro",
    status: "Agendado"
  },
  {
    id: "trei-4",
    data: "2024-03-10",
    conteudo: "Sistema de Gestão da Qualidade ISO 13485",
    local: "Sala de Treinamento - Sede",
    ministrante: "Consultor Externo",
    participantes: ["Gestores", "Líderes de Área"],
    objetivo: "Preparação para auditoria de certificação ISO 13485",
    anexos: [],
    tipo: "futuro",
    status: "Confirmado"
  }
];

// Lista de participantes disponíveis para treinamentos
export const participantesDisponiveis = [
  "João Silva",
  "Maria Santos",
  "Pedro Costa",
  "Carlos Mendes",
  "Paula Oliveira",
  "Ana Santos",
  "Roberto Alves",
  "Fernanda Lima",
  "Dr. Carlos Silva"
];

// Descrições dos tipos de mudança
export const descricoesTipoMudanca = {
  A: "Alterações de Dados Empresariais - Alterações de endereço, sócios, vigilâncias sanitárias, etc.",
  B: "Dados Mestres de Produtos - Modificações de registro ANVISA, classe de risco, especificações técnicas, validade, armazenamento",
  C: "Alterações em Processos de Negócio - Mudanças na lógica de recebimento, inspeção, armazenamento, expedição, não conformidades",
  D: "Atualizações Regulatórias (ANVISA) - Implementação de novas RDCs, guias ou requisitos",
  E: "Melhorias de Performance - Alterações no escopo físico, ambiental e melhoria logística",
  F: "Outros - Demais alterações"
};

// Dados mockados para Gestão de Não Conformidades RT
export const responsaveisNCRT = [
  "Dr. Carlos Silva",
  "Dra. Ana Paula",
  "Eng. Roberto Santos",
  "João Silva",
  "Maria Santos"
];

export const naoConformidadesRTMockadas: import('@/types/rt').NaoConformidadeRT[] = [
  {
    id: "NC-RT-001",
    data: "2024-11-10",
    origem: "Auditoria",
    tipo: "Documentação Desatualizada",
    impacto: "Crítico",
    descricao: "POPs de treinamento desatualizados desde última revisão regulatória",
    acaoImediata: "Suspensão temporária de novos treinamentos até atualização completa dos POPs",
    responsavel: "Dr. Carlos Silva",
    prazoExecucao: "2024-11-20",
    status: "Em Análise",
    observacoes: "Impacta certificações de novos colaboradores",
    capa: {
      id: "CAPA-RT-001",
      acaoPreventiva: "Implementar sistema de revisão automática de documentação a cada 6 meses",
      acaoCorretiva: "Revisar e atualizar todos os POPs de treinamento conforme novas diretrizes ANVISA",
      prazoFinal: "2024-12-15",
      status: "Em Andamento",
      responsavel: "Dr. Carlos Silva"
    }
  },
  {
    id: "NC-RT-002",
    data: "2024-11-08",
    origem: "Treinamento",
    tipo: "Treinamento Inadequado",
    impacto: "Moderado",
    descricao: "Colaboradores apresentaram baixo desempenho em avaliação prática de manuseio de produtos controlados",
    acaoImediata: "Retreinamento imediato da equipe antes de retornar às atividades",
    responsavel: "Dra. Ana Paula",
    prazoExecucao: "2024-11-18",
    status: "Aguardando Ação",
    observacoes: "Identificada necessidade de material didático mais prático",
    capa: {
      id: "CAPA-RT-002",
      acaoPreventiva: "Criar módulo prático adicional com simulações de situações reais",
      acaoCorretiva: "Realizar treinamento complementar focado em práticas de manuseio",
      prazoFinal: "2024-11-25",
      status: "Pendente",
      responsavel: "Dra. Ana Paula"
    }
  },
  {
    id: "NC-RT-003",
    data: "2024-11-05",
    origem: "Liberação de Produto",
    tipo: "Produto Não Liberado",
    impacto: "Crítico",
    descricao: "Lote LOTE-20241105 expedido sem liberação formal do RT",
    acaoImediata: "Recall imediato do lote e bloqueio do sistema de expedição até aprovação RT",
    responsavel: "Eng. Roberto Santos",
    prazoExecucao: "2024-11-12",
    status: "Aberta",
    observacoes: "Falha no sistema de controle de liberação",
    capa: {
      id: "CAPA-RT-003",
      acaoPreventiva: "Implementar dupla verificação automatizada no sistema de expedição",
      acaoCorretiva: "Revisar e fortalecer processo de liberação de produtos",
      prazoFinal: "2024-12-01",
      status: "Pendente",
      responsavel: "Eng. Roberto Santos"
    }
  },
  {
    id: "NC-RT-004",
    data: "2024-11-03",
    origem: "Documentação",
    tipo: "Falha de Processo",
    impacto: "Baixo",
    descricao: "Formulários de controle de mudanças não preenchidos corretamente em 3 ocasiões",
    acaoImediata: "Orientação imediata aos responsáveis sobre preenchimento correto",
    responsavel: "João Silva",
    prazoExecucao: "2024-11-15",
    status: "Resolvida",
    observacoes: "Erro de interpretação do formulário",
    capa: {
      id: "CAPA-RT-004",
      acaoPreventiva: "Criar guia visual de preenchimento de formulários",
      acaoCorretiva: "Realizar sessão de orientação sobre preenchimento de documentos",
      prazoFinal: "2024-11-20",
      status: "Concluída",
      responsavel: "João Silva"
    }
  },
  {
    id: "NC-RT-005",
    data: "2024-11-01",
    origem: "Outro",
    tipo: "Não Conformidade Regulatória",
    impacto: "Moderado",
    descricao: "Identificada divergência entre procedimento interno e nova RDC publicada",
    acaoImediata: "Ajuste imediato do procedimento para conformidade regulatória",
    responsavel: "Maria Santos",
    prazoExecucao: "2024-11-14",
    status: "Em Análise",
    observacoes: "Nova RDC publicada em outubro/2024",
    capa: {
      id: "CAPA-RT-005",
      acaoPreventiva: "Estabelecer monitoramento semanal de publicações ANVISA",
      acaoCorretiva: "Atualizar procedimentos conforme nova RDC e comunicar equipe",
      prazoFinal: "2024-11-30",
      status: "Em Andamento",
      responsavel: "Maria Santos"
    }
  }
];
