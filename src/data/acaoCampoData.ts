import { AcaoCampo, StatusAcaoCampo, TipoDocumentoAcaoCampo } from "@/types/acaoCampo";

export const tipoDocumentoLabels: Record<TipoDocumentoAcaoCampo, string> = {
  [TipoDocumentoAcaoCampo.CARTA_CLIENTE]: 'Carta ao Cliente',
  [TipoDocumentoAcaoCampo.FAN]: 'FAN',
  [TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS]: 'Field Action Effectiveness Data Sheet',
  [TipoDocumentoAcaoCampo.FAC1_CUSTOMER_ADVISORY]: 'FAC1 - Customer Advisory Letter',
  [TipoDocumentoAcaoCampo.FAC2_CUSTOMER_RESPONSE]: 'FAC2 - Customer Response',
  [TipoDocumentoAcaoCampo.FAC3]: 'FAC3',
  [TipoDocumentoAcaoCampo.ADICIONAL]: 'Documento Adicional'
};

export const statusAcaoCampoLabels: Record<StatusAcaoCampo, string> = {
  [StatusAcaoCampo.EM_ANDAMENTO]: 'Em Andamento',
  [StatusAcaoCampo.AGUARDANDO_ASSINATURAS]: 'Aguardando Assinaturas',
  [StatusAcaoCampo.COMPLETA]: 'Completa',
  [StatusAcaoCampo.ARQUIVADA]: 'Arquivada'
};

export const acoesCampoMock: AcaoCampo[] = [
  {
    id: '1',
    titulo: 'Recebimento dos documentos da empresa',
    empresaRepresentada: 'Fabricante XYZ Ltda',
    dataCriacao: '2024-01-15',
    dataAtualizacao: '2024-01-20',
    status: StatusAcaoCampo.AGUARDANDO_ASSINATURAS,
    documentos: [
      {
        id: 'doc1',
        tipo: TipoDocumentoAcaoCampo.CARTA_CLIENTE,
        nome: 'Carta ao Cliente',
        requerAssinatura: false
      },
      {
        id: 'doc2',
        tipo: TipoDocumentoAcaoCampo.FAN,
        nome: 'FAN',
        requerAssinatura: false
      },
      {
        id: 'doc3',
        tipo: TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS,
        nome: 'Field Action Effectiveness Data Sheet',
        requerAssinatura: false
      },
      {
        id: 'doc4',
        tipo: TipoDocumentoAcaoCampo.FAC1_CUSTOMER_ADVISORY,
        nome: 'FAC1 - Customer Advisory Letter',
        nomeOriginal: 'fac1_advisory.pdf',
        url: 'https://example.com/doc.pdf',
        dataUpload: '2024-01-15',
        tamanho: 245000,
        requerAssinatura: true
      },
      {
        id: 'doc5',
        tipo: TipoDocumentoAcaoCampo.FAC2_CUSTOMER_RESPONSE,
        nome: 'FAC2 - Customer Response',
        requerAssinatura: true
      },
      {
        id: 'doc6',
        tipo: TipoDocumentoAcaoCampo.FAC3,
        nome: 'FAC3',
        requerAssinatura: true
      }
    ],
    documentosAdicionais: [
      {
        id: 'add1',
        tipo: TipoDocumentoAcaoCampo.ADICIONAL,
        nome: 'Laudo Técnico Complementar',
        nomeOriginal: 'laudo_tecnico.pdf',
        url: 'https://example.com/laudo.pdf',
        dataUpload: '2024-01-18',
        tamanho: 180000,
        requerAssinatura: false
      }
    ]
  },
  {
    id: '2',
    titulo: 'Ação de Campo - Recall Produto DEF456',
    empresaRepresentada: 'MediTech Solutions',
    dataCriacao: '2024-02-10',
    status: StatusAcaoCampo.EM_ANDAMENTO,
    documentos: [
      {
        id: 'doc7',
        tipo: TipoDocumentoAcaoCampo.CARTA_CLIENTE,
        nome: 'Carta ao Cliente',
        requerAssinatura: false
      },
      {
        id: 'doc8',
        tipo: TipoDocumentoAcaoCampo.FAN,
        nome: 'FAN',
        requerAssinatura: false
      },
      {
        id: 'doc9',
        tipo: TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS,
        nome: 'Field Action Effectiveness Data Sheet',
        requerAssinatura: false
      },
      {
        id: 'doc10',
        tipo: TipoDocumentoAcaoCampo.FAC1_CUSTOMER_ADVISORY,
        nome: 'FAC1 - Customer Advisory Letter',
        requerAssinatura: true
      },
      {
        id: 'doc11',
        tipo: TipoDocumentoAcaoCampo.FAC2_CUSTOMER_RESPONSE,
        nome: 'FAC2 - Customer Response',
        requerAssinatura: true
      },
      {
        id: 'doc12',
        tipo: TipoDocumentoAcaoCampo.FAC3,
        nome: 'FAC3',
        requerAssinatura: true
      }
    ],
    documentosAdicionais: []
  }
];
