
import { Licitacao } from "@/types/licitacao";

export const licitacoes: Licitacao[] = [
  {
    id: 1,
    numeroPregao: "PE-001/2024",
    nomeInstituicao: "Universidade Federal de São Paulo",
    uf: "SP",
    municipio: "São Paulo",
    linkEdital: "https://compras.ufsp.br/edital001",
    objetoLicitacao: "Aquisição de drones para pesquisa agrícola e monitoramento de culturas",
    numeroItem: "01",
    empresaConcorrente: "DroneTech Ltda",
    palavraChave: "drone, agricultura, sensoriamento",
    status: "triagem",
    observacoes: "Edital com especificações técnicas detalhadas. Cliente interessado em soluções Biodina.",
    dataAbertura: "2025-01-15",
    createdAt: "2025-01-10"
  },
  {
    id: 2,
    numeroPregao: "CC-045/2024",
    nomeInstituicao: "Instituto de Pesquisas Agronômicas do RS",
    uf: "RS",
    municipio: "Porto Alegre",
    objetoLicitacao: "Sistema RTK para levantamento topográfico de precisão",
    numeroItem: "02",
    palavraChave: "RTK, topografia, GPS",
    status: "acompanhamento",
    observacoes: "Cliente já conhece nossos produtos. Boa chance de conversão.",
    dataAbertura: "2025-02-01",
    dataContato: "2025-02-05",
    createdAt: "2025-01-28"
  },
  {
    id: 3,
    numeroPregao: "TP-012/2024",
    nomeInstituicao: "Empresa de Mineração Vale Verde",
    uf: "MG",
    municipio: "Belo Horizonte",
    objetoLicitacao: "Sensores IoT para monitoramento ambiental em minas",
    numeroItem: "01-05",
    status: "convertida",
    palavraChave: "IoT, sensores, monitoramento",
    observacoes: "Convertido em oportunidade comercial com sucesso",
    dataAbertura: "2025-01-20",
    dataContato: "2025-01-25",
    createdAt: "2025-01-18"
  },
  {
    id: 4,
    numeroPregao: "LP-078/2024",
    nomeInstituicao: "Secretaria de Agricultura - MT",
    uf: "MT",
    municipio: "Cuiabá",
    objetoLicitacao: "Software de mapeamento e análise de dados agrícolas",
    numeroItem: "03",
    status: "finalizada",
    palavraChave: "software, mapeamento, análise",
    motivoDecisao: "Não atendemos todos os requisitos técnicos do edital",
    observacoes: "Edital muito específico para concorrente nacional",
    dataAbertura: "2025-01-05",
    createdAt: "2025-01-02"
  }
];
