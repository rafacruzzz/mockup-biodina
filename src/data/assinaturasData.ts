/**
 * ⚠️ ARQUIVO COMENTADO - NÃO USAR NO MOMENTO ⚠️
 * Este arquivo de dados de Assinaturas Digitais está temporariamente desativado.
 * Para reativá-lo, remova este comentário e descomente os imports e referências no arquivo Comercial.tsx
 */

import { DocumentoAssinatura, ProcessoAssinatura, RelatorioAssinaturas } from "@/types/assinaturasDigitais";

export const documentosAssinatura: DocumentoAssinatura[] = [
  {
    id: 1,
    titulo: "Proposta Comercial - Hospital Einstein",
    tipo_documento: "proposta",
    arquivo_original_url: "/documentos/proposta_einstein_2024.pdf",
    data_criacao: "2024-01-15T10:30:00",
    data_limite: "2024-01-25T23:59:59",
    status: "pendente_assinatura",
    prioridade: "alta",
    observacoes: "Proposta para modernização do laboratório - valor R$ 890.000",
    oportunidade_vinculada: 5,
    valor_documento: 890000,
    signatarios: [
      {
        id: 1,
        documento_id: 1,
        nome: "Dr. Carlos Roberto Silva",
        email: "carlos.silva@einstein.br",
        cargo: "Diretor de Compras",
        empresa: "Hospital Albert Einstein",
        ordem_assinatura: 1,
        tipo_assinatura: "digital",
        status: "notificado",
        tentativas_notificacao: 2,
        data_ultima_notificacao: "2024-01-20T14:30:00"
      },
      {
        id: 2,
        documento_id: 1,
        nome: "Ana Costa",
        email: "ana.costa@biodina.com.br",
        cargo: "Gerente Comercial",
        empresa: "Biodina",
        ordem_assinatura: 2,
        tipo_assinatura: "digital",
        status: "pendente",
        tentativas_notificacao: 0
      }
    ],
    historico: [
      {
        id: 1,
        documento_id: 1,
        acao: "criado",
        data_acao: "2024-01-15T10:30:00",
        usuario_acao: "Ana Costa",
        detalhes: "Documento criado a partir da oportunidade #10682"
      },
      {
        id: 2,
        documento_id: 1,
        signatario_id: 1,
        acao: "notificado",
        data_acao: "2024-01-20T14:30:00",
        usuario_acao: "Sistema",
        detalhes: "Notificação enviada por email para carlos.silva@einstein.br"
      }
    ]
  },
  {
    id: 2,
    titulo: "Contrato de Manutenção - HUOL",
    tipo_documento: "contrato",
    arquivo_original_url: "/documentos/contrato_manutencao_huol.pdf",
    data_criacao: "2024-01-10T09:15:00",
    status: "assinado",
    prioridade: "media",
    arquivo_assinado_url: "/documentos/contrato_manutencao_huol_assinado.pdf",
    oportunidade_vinculada: 2,
    valor_documento: 450000,
    signatarios: [
      {
        id: 3,
        documento_id: 2,
        nome: "Prof. João Santos",
        email: "joao.santos@huol.ufrn.br",
        cargo: "Diretor Técnico",
        empresa: "HUOL - UFRN",
        ordem_assinatura: 1,
        tipo_assinatura: "digital",
        status: "assinado",
        data_assinatura: "2024-01-12T16:45:00",
        tentativas_notificacao: 1
      },
      {
        id: 4,
        documento_id: 2,
        nome: "Maria Santos",
        email: "maria.santos@biodina.com.br",
        cargo: "Gerente Regional",
        empresa: "Biodina",
        ordem_assinatura: 2,
        tipo_assinatura: "digital",
        status: "assinado",
        data_assinatura: "2024-01-13T11:20:00",
        tentativas_notificacao: 1
      }
    ],
    historico: [
      {
        id: 3,
        documento_id: 2,
        acao: "criado",
        data_acao: "2024-01-10T09:15:00",
        usuario_acao: "Maria Santos",
        detalhes: "Contrato criado para oportunidade ganha"
      },
      {
        id: 4,
        documento_id: 2,
        signatario_id: 3,
        acao: "assinado",
        data_acao: "2024-01-12T16:45:00",
        usuario_acao: "Prof. João Santos",
        detalhes: "Documento assinado digitalmente",
        dados_certificado: {
          numero_serie: "12345678901234567890",
          emissor: "AC Serasa",
          titular: "João Santos",
          data_emissao: "2023-06-15",
          data_validade: "2025-06-15",
          algoritmo_hash: "SHA-256",
          status_validacao: "valido"
        }
      }
    ]
  },
  {
    id: 3,
    titulo: "Aditivo Contratual - Sistema WEBMED",
    tipo_documento: "aditivo",
    arquivo_original_url: "/documentos/aditivo_webmed_cema.pdf",
    data_criacao: "2024-01-18T14:20:00",
    status: "rascunho",
    prioridade: "baixa",
    oportunidade_vinculada: 3,
    valor_documento: 50000,
    signatarios: [
      {
        id: 5,
        documento_id: 3,
        nome: "Roberto Mendes",
        email: "roberto.mendes@cema.ce.gov.br",
        cargo: "Coordenador de TI",
        empresa: "CEMA - Ceará",
        ordem_assinatura: 1,
        tipo_assinatura: "digital",
        status: "pendente",
        tentativas_notificacao: 0
      }
    ],
    historico: [
      {
        id: 5,
        documento_id: 3,
        acao: "criado",
        data_acao: "2024-01-18T14:20:00",
        usuario_acao: "João Silva",
        detalhes: "Aditivo para expansão do módulo de relatórios"
      }
    ]
  }
];

export const processosAssinatura: ProcessoAssinatura[] = [
  {
    id: 1,
    nome: "Processo Einstein - Modernização Lab",
    descricao: "Documentos relacionados à modernização do laboratório do Hospital Einstein",
    documentos: [documentosAssinatura[0]],
    status_geral: "em_andamento",
    data_inicio: "2024-01-15T10:30:00",
    responsavel: "Ana Costa",
    progresso_percentual: 50
  },
  {
    id: 2,
    nome: "Processo HUOL - Contrato Completo",
    descricao: "Conjunto completo de documentos para implantação no HUOL",
    documentos: [documentosAssinatura[1]],
    status_geral: "concluido",
    data_inicio: "2024-01-10T09:15:00",
    data_conclusao: "2024-01-13T11:20:00",
    responsavel: "Maria Santos",
    progresso_percentual: 100
  }
];

export const relatorioAssinaturas: RelatorioAssinaturas = {
  periodo: {
    inicio: "2024-01-01",
    fim: "2024-01-31"
  },
  total_documentos: 15,
  documentos_assinados: 8,
  documentos_pendentes: 5,
  documentos_rejeitados: 2,
  tempo_medio_assinatura: 48, // horas
  taxa_conclusao: 73.3, // percentual
  assinaturas_por_tipo: {
    digital: 12,
    eletronica: 3,
    fisica: 0
  },
  documentos_por_status: [
    { status: "Assinado", quantidade: 8, percentual: 53.3 },
    { status: "Pendente", quantidade: 5, percentual: 33.3 },
    { status: "Rejeitado", quantidade: 2, percentual: 13.4 }
  ],
  signatarios_mais_ativos: [
    { nome: "Dr. Carlos Silva", total_assinaturas: 4, tempo_medio_resposta: 24 },
    { nome: "Prof. João Santos", total_assinaturas: 3, tempo_medio_resposta: 36 },
    { nome: "Ana Costa", total_assinaturas: 8, tempo_medio_resposta: 12 }
  ]
};