// Tipos de Documentos Fixos
export enum TipoDocumentoAcaoCampo {
  CARTA_CLIENTE = 'carta_cliente',
  FAN = 'fan',
  FIELD_ACTION_EFFECTIVENESS = 'field_action_effectiveness',
  FIELD_ACTION_EFFECTIVENESS_PREENCHIVEL = 'field_action_effectiveness_preenchivel',
  FAC1_CUSTOMER_ADVISORY = 'fac1_customer_advisory',
  FAC2_CUSTOMER_RESPONSE = 'fac2_customer_response',
  FAC3 = 'fac3',
  PROTOCOLO_ABERTURA_ANVISA = 'protocolo_abertura_anvisa',
  PROTOCOLO_ENCERRAMENTO_ANVISA = 'protocolo_encerramento_anvisa',
  ADICIONAL = 'adicional'
}

// Dados do Formulário Field Action Effectiveness
export interface FieldActionEffectivenessData {
  productName: string;
  productModel: string;
  serialNumber: string;
  lotNumber: string;
  customerName: string;
  customerCity: string;
  fieldActionDescription: string;
  actionDate: string;
  effectivenessResult: 'effective' | 'partially_effective' | 'not_effective';
  observations: string;
  pdfGerado?: boolean;
  dataPdfGerado?: string;
}

// Assinatura do Documento
export interface AssinaturaDocumento {
  nomeAssinante: string;
  assinaturaBase64: string;
  dataAssinatura: string;
  cargo?: string;
}

// Documento de Ação de Campo
export interface DocumentoAcaoCampo {
  id: string;
  tipo: TipoDocumentoAcaoCampo;
  nome: string;
  nomeOriginal?: string;
  arquivo?: File;
  url?: string;
  dataUpload?: string;
  tamanho?: number;
  requerAssinatura: boolean;
  assinatura?: AssinaturaDocumento;
  dadosFormulario?: FieldActionEffectivenessData;
}

// Seção de Ação de Campo (NOVA)
export interface SecaoAcaoCampo {
  id: string;
  titulo: string;
  documentos: DocumentoAcaoCampo[];
  documentosAdicionais: DocumentoAcaoCampo[];
}

// Status da Ação de Campo
export enum StatusAcaoCampo {
  EM_ANDAMENTO = 'em_andamento',
  AGUARDANDO_ASSINATURAS = 'aguardando_assinaturas',
  COMPLETA = 'completa',
  ARQUIVADA = 'arquivada'
}

// Ação de Campo Completa
export interface AcaoCampo {
  id: string;
  titulo: string;
  empresaRepresentada: string;
  dataCriacao: string;
  dataAtualizacao?: string;
  status: StatusAcaoCampo;
  secoes: SecaoAcaoCampo[];
  documentosExtras: DocumentoAcaoCampo[];
}
