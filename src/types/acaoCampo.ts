// Tipos de Documentos Fixos
export enum TipoDocumentoAcaoCampo {
  CARTA_CLIENTE = 'carta_cliente',
  FAN = 'fan',
  FIELD_ACTION_EFFECTIVENESS = 'field_action_effectiveness',
  FAC1_CUSTOMER_ADVISORY = 'fac1_customer_advisory',
  FAC2_CUSTOMER_RESPONSE = 'fac2_customer_response',
  FAC3 = 'fac3',
  ADICIONAL = 'adicional'
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
  documentos: DocumentoAcaoCampo[];
  documentosAdicionais: DocumentoAcaoCampo[];
}
