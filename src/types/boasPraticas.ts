export interface DocumentoBoasPraticas {
  id: number;
  subtitulo: string;
  arquivo?: File | string;
  nomeArquivo?: string;
  dataCriacao: string;
}

export interface CertificadoBoasPraticas {
  id: string;
  
  // Documentação
  nomeArquivoPrincipal: string;
  fabricanteLegal?: string;
  unidadeFabril?: string;
  documentos: DocumentoBoasPraticas[];
  protocoloPeticionamento?: File | string;
  nomeProtocolo?: string;
  
  // Informações Regulatórias ANVISA
  numeroProcessoAnvisa: string;
  transacao: string;
  expediente: string;
  assunto: string;
  dataEnvio: string;
  dataPublicacaoDOU?: string;
  numeroPublicacaoDOU?: string;
  observacaoGeral?: string;
  
  // Arquivos anexados
  arquivoPublicacaoDOU?: File | string;
  nomePublicacaoDOU?: string;
  arquivoCertificadoBoasPraticas?: File | string;
  nomeCertificado?: string;
  
  // Validade (extraída do certificado)
  validade?: string;
  
  // Status e controle
  status: 'em_preparacao' | 'enviado' | 'publicado' | 'vigente' | 'vencido';
  dataCriacao: Date;
  dataAtualizacao?: Date;
}

export interface AlertaBoasPraticas {
  id: string;
  certificadoId: string;
  tipo: 'vencimento_270_dias' | 'vencimento_180_dias' | 'vencido';
  mensagem: string;
  dataCriacao: Date;
  lido: boolean;
}

export const getStatusLabel = (status: CertificadoBoasPraticas['status']): string => {
  const labels: Record<CertificadoBoasPraticas['status'], string> = {
    em_preparacao: 'Em Preparação',
    enviado: 'Enviado',
    publicado: 'Publicado',
    vigente: 'Vigente',
    vencido: 'Vencido'
  };
  return labels[status];
};

export const getStatusColor = (status: CertificadoBoasPraticas['status']): string => {
  const colors: Record<CertificadoBoasPraticas['status'], string> = {
    em_preparacao: 'bg-gray-100 text-gray-700',
    enviado: 'bg-blue-100 text-blue-700',
    publicado: 'bg-purple-100 text-purple-700',
    vigente: 'bg-green-100 text-green-700',
    vencido: 'bg-red-100 text-red-700'
  };
  return colors[status];
};

export const calcularDiasParaVencimento = (validade: string): number => {
  const dataValidade = new Date(validade);
  const hoje = new Date();
  const diff = dataValidade.getTime() - hoje.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const getAlertaVencimento = (validade?: string): { tipo: 'warning' | 'danger' | null; mensagem: string } => {
  if (!validade) return { tipo: null, mensagem: '' };
  
  const dias = calcularDiasParaVencimento(validade);
  
  if (dias < 0) {
    return { tipo: 'danger', mensagem: 'Certificado vencido!' };
  } else if (dias <= 180) {
    return { tipo: 'danger', mensagem: `Vence em ${dias} dias!` };
  } else if (dias <= 270) {
    return { tipo: 'warning', mensagem: `Vence em ${dias} dias` };
  }
  
  return { tipo: null, mensagem: '' };
};
