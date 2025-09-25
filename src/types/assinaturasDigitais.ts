export interface DocumentoAssinatura {
  id: number;
  titulo: string;
  tipo_documento: 'proposta' | 'contrato' | 'aditivo' | 'termo' | 'outros';
  arquivo_original_url: string;
  arquivo_assinado_url?: string;
  data_criacao: string;
  data_limite?: string;
  status: 'rascunho' | 'pendente_assinatura' | 'parcialmente_assinado' | 'assinado' | 'rejeitado' | 'vencido';
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  observacoes?: string;
  signatarios: Signatario[];
  historico: HistoricoAssinatura[];
  oportunidade_vinculada?: number;
  valor_documento?: number;
}

export interface Signatario {
  id: number;
  documento_id: number;
  nome: string;
  email: string;
  cargo: string;
  empresa: string;
  ordem_assinatura: number;
  tipo_assinatura: 'digital' | 'eletronica' | 'fisica';
  certificado_digital?: string;
  status: 'pendente' | 'notificado' | 'visualizado' | 'assinado' | 'rejeitado';
  data_assinatura?: string;
  ip_assinatura?: string;
  observacoes_assinatura?: string;
  tentativas_notificacao: number;
  data_ultima_notificacao?: string;
}

export interface ProcessoAssinatura {
  id: number;
  nome: string;
  descricao: string;
  documentos: DocumentoAssinatura[];
  status_geral: 'iniciado' | 'em_andamento' | 'concluido' | 'cancelado';
  data_inicio: string;
  data_conclusao?: string;
  responsavel: string;
  progresso_percentual: number;
}

export interface HistoricoAssinatura {
  id: number;
  documento_id: number;
  signatario_id?: number;
  acao: 'criado' | 'enviado' | 'visualizado' | 'assinado' | 'rejeitado' | 'notificado' | 'modificado' | 'cancelado';
  data_acao: string;
  usuario_acao: string;
  detalhes: string;
  ip_origem?: string;
  dados_certificado?: CertificadoDigital;
}

export interface CertificadoDigital {
  numero_serie: string;
  emissor: string;
  titular: string;
  data_emissao: string;
  data_validade: string;
  algoritmo_hash: string;
  status_validacao: 'valido' | 'expirado' | 'revogado' | 'invalido';
}

export interface ModeloDocumento {
  id: number;
  nome: string;
  tipo: string;
  template_url: string;
  variaveis: VariavelModelo[];
  signatarios_padrao: SignatarioPadrao[];
  ativo: boolean;
}

export interface VariavelModelo {
  nome: string;
  tipo: 'texto' | 'numero' | 'data' | 'moeda';
  obrigatorio: boolean;
  descricao: string;
}

export interface SignatarioPadrao {
  cargo: string;
  tipo_assinatura: 'digital' | 'eletronica';
  ordem: number;
}

export interface RelatorioAssinaturas {
  periodo: {
    inicio: string;
    fim: string;
  };
  total_documentos: number;
  documentos_assinados: number;
  documentos_pendentes: number;
  documentos_rejeitados: number;
  tempo_medio_assinatura: number; // em horas
  taxa_conclusao: number; // percentual
  assinaturas_por_tipo: {
    digital: number;
    eletronica: number;
    fisica: number;
  };
  documentos_por_status: StatusDocumento[];
  signatarios_mais_ativos: SignatarioAtivo[];
}

export interface StatusDocumento {
  status: string;
  quantidade: number;
  percentual: number;
}

export interface SignatarioAtivo {
  nome: string;
  total_assinaturas: number;
  tempo_medio_resposta: number;
}

// Tipos para integração com outros módulos
export interface VinculoOportunidade {
  oportunidade_id: number;
  documento_id: number;
  tipo_vinculo: 'proposta_inicial' | 'contrato_principal' | 'aditivo' | 'termo_complementar';
  automatico: boolean;
}

export interface NotificacaoAssinatura {
  id: number;
  documento_id: number;
  signatario_id: number;
  tipo: 'primeira_notificacao' | 'lembrete' | 'urgencia' | 'vencimento';
  data_envio: string;
  metodo: 'email' | 'sms' | 'whatsapp';
  status_entrega: 'enviado' | 'entregue' | 'visualizado' | 'falha';
  template_utilizado: string;
}