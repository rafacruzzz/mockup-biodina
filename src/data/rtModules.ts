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
