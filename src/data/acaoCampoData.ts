import { AcaoCampo, StatusAcaoCampo, TipoDocumentoAcaoCampo, DocumentoAcaoCampo } from "@/types/acaoCampo";

export const tipoDocumentoLabels: Record<TipoDocumentoAcaoCampo, string> = {
  [TipoDocumentoAcaoCampo.CARTA_CLIENTE]: 'Carta ao Cliente',
  [TipoDocumentoAcaoCampo.FAN]: 'FAN',
  [TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS]: 'Field Action Effectiveness Data Sheet',
  [TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS_PREENCHIVEL]: 'Field Action Effectiveness Data Sheet (Preenchível)',
  [TipoDocumentoAcaoCampo.FAC1_CUSTOMER_ADVISORY]: 'FAC1 - Customer Advisory Letter',
  [TipoDocumentoAcaoCampo.FAC2_CUSTOMER_RESPONSE]: 'FAC2 - Customer Response',
  [TipoDocumentoAcaoCampo.FAC3]: 'FAC3',
  [TipoDocumentoAcaoCampo.PROTOCOLO_ABERTURA_ANVISA]: 'Protocolo de Abertura na Anvisa',
  [TipoDocumentoAcaoCampo.PROTOCOLO_ENCERRAMENTO_ANVISA]: 'Protocolo de Encerramento na Anvisa',
  [TipoDocumentoAcaoCampo.ADICIONAL]: 'Documento Adicional'
};

export const statusAcaoCampoLabels: Record<StatusAcaoCampo, string> = {
  [StatusAcaoCampo.EM_ANDAMENTO]: 'Em Andamento',
  [StatusAcaoCampo.AGUARDANDO_ASSINATURAS]: 'Aguardando Assinaturas',
  [StatusAcaoCampo.COMPLETA]: 'Completa',
  [StatusAcaoCampo.ARQUIVADA]: 'Arquivada'
};

// Templates de documentos para cada seção
export const criarDocumentosRecebimentoEmpresa = (baseId: string): { documentos: DocumentoAcaoCampo[], adicionais: DocumentoAcaoCampo[] } => ({
  documentos: [
    {
      id: `${baseId}-rec-1`,
      tipo: TipoDocumentoAcaoCampo.CARTA_CLIENTE,
      nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.CARTA_CLIENTE],
      requerAssinatura: false
    },
    {
      id: `${baseId}-rec-2`,
      tipo: TipoDocumentoAcaoCampo.FAN,
      nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.FAN],
      requerAssinatura: false
    },
    {
      id: `${baseId}-rec-3`,
      tipo: TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS,
      nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS],
      requerAssinatura: false
    },
    {
      id: `${baseId}-rec-4`,
      tipo: TipoDocumentoAcaoCampo.FAC1_CUSTOMER_ADVISORY,
      nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.FAC1_CUSTOMER_ADVISORY],
      requerAssinatura: true
    },
    {
      id: `${baseId}-rec-5`,
      tipo: TipoDocumentoAcaoCampo.FAC2_CUSTOMER_RESPONSE,
      nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.FAC2_CUSTOMER_RESPONSE],
      requerAssinatura: true
    },
    {
      id: `${baseId}-rec-6`,
      tipo: TipoDocumentoAcaoCampo.FAC3,
      nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.FAC3],
      requerAssinatura: true
    }
  ],
  adicionais: [
    {
      id: `${baseId}-rec-add-1`,
      tipo: TipoDocumentoAcaoCampo.ADICIONAL,
      nome: 'Laudo Técnico Complementar',
      requerAssinatura: false
    }
  ]
});

export const criarDocumentosEnvioAnvisa = (baseId: string): { documentos: DocumentoAcaoCampo[], adicionais: DocumentoAcaoCampo[] } => ({
  documentos: [
    {
      id: `${baseId}-anv-1`,
      tipo: TipoDocumentoAcaoCampo.CARTA_CLIENTE,
      nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.CARTA_CLIENTE],
      requerAssinatura: false
    },
    {
      id: `${baseId}-anv-2`,
      tipo: TipoDocumentoAcaoCampo.PROTOCOLO_ABERTURA_ANVISA,
      nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.PROTOCOLO_ABERTURA_ANVISA],
      requerAssinatura: false
    },
    {
      id: `${baseId}-anv-3`,
      tipo: TipoDocumentoAcaoCampo.PROTOCOLO_ENCERRAMENTO_ANVISA,
      nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.PROTOCOLO_ENCERRAMENTO_ANVISA],
      requerAssinatura: false
    }
  ],
  adicionais: [
    {
      id: `${baseId}-anv-add-1`,
      tipo: TipoDocumentoAcaoCampo.ADICIONAL,
      nome: 'Formulário de Notificação de Ação de Campo v2-5',
      nomeOriginal: 'Formulario-de-Notificacao-de-Acao-de-Campo-v2-5.pdf',
      url: '/documents/Formulario-de-Notificacao-de-Acao-de-Campo-v2-5.pdf',
      requerAssinatura: false
    },
    {
      id: `${baseId}-anv-add-2`,
      tipo: TipoDocumentoAcaoCampo.ADICIONAL,
      nome: 'Ação de Campo 915-428 ABL800 pH Distribuição',
      nomeOriginal: 'Acao-de-Campo-915-428-ABL800-pH-Distribuicao.pdf',
      url: '/documents/Acao-de-Campo-915-428-ABL800-pH-Distribuicao.pdf',
      requerAssinatura: false
    },
    {
      id: `${baseId}-anv-add-3`,
      tipo: TipoDocumentoAcaoCampo.ADICIONAL,
      nome: 'Sumário do Alerta - Ação de Campo v2-5',
      nomeOriginal: 'Sumario-do-Alerta-Acao-de-Campo-v2-5.pdf',
      url: '/documents/Sumario-do-Alerta-Acao-de-Campo-v2-5.pdf',
      requerAssinatura: false
    }
  ]
});

export const criarDocumentosEnvioEmpresaRepresentada = (baseId: string): { documentos: DocumentoAcaoCampo[], adicionais: DocumentoAcaoCampo[] } => ({
  documentos: [
    {
      id: `${baseId}-emp-1`,
      tipo: TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS_PREENCHIVEL,
      nome: 'Field Action Effectiveness Data Sheet',
      requerAssinatura: false
    },
    {
      id: `${baseId}-emp-2`,
      tipo: TipoDocumentoAcaoCampo.PROTOCOLO_ENCERRAMENTO_ANVISA,
      nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.PROTOCOLO_ENCERRAMENTO_ANVISA],
      requerAssinatura: false
    }
  ],
  adicionais: []
});

// Lista de ações de campo - começa vazia
export const acoesCampoMock: AcaoCampo[] = [];
