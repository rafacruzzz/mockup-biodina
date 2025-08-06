export interface Curriculo {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  departamento: string;
  cargoDesejado: string;
  experiencia: string;
  escolaridade: string;
  habilidades: string[];
  arquivoCurriculo?: string;
  dataEnvio: string;
  status: 'novo' | 'em-analise' | 'aprovado' | 'reprovado' | 'contratado';
  observacoes?: string;
  fonte: 'site' | 'indicacao' | 'linkedin' | 'manual';
}

export interface ProcessoSeletivo {
  id: string;
  titulo: string;
  departamento: string;
  cargo: string;
  descricao: string;
  vagas: number;
  salario?: string;
  etapas: EtapaSelecao[];
  candidatos: CandidatoProcesso[];
  status: 'ativo' | 'pausado' | 'finalizado';
  responsavel: string;
  dataInicio: string;
  dataFim?: string;
  linkPublico?: string;
}

export interface EtapaSelecao {
  id: string;
  nome: string;
  descricao: string;
  ordem: number;
  tipo: 'triagem' | 'entrevista' | 'teste' | 'dinamica' | 'aprovacao';
  responsavel?: string;
  duracao?: string;
  obrigatoria: boolean;
}

export interface CandidatoProcesso {
  id: string;
  curriculoId: string;
  processoSeletivoId: string;
  etapaAtual: string;
  status: 'em-andamento' | 'aprovado' | 'reprovado' | 'aguardando';
  feedback: CandidatoFeedback[];
  dataInicio: string;
  dataUltimaAtualizacao: string;
}

export interface CandidatoFeedback {
  etapaId: string;
  avaliador: string;
  comentario: string;
  nota?: number;
  dataAvaliacao: string;
  aprovado: boolean;
}

export interface Admissao {
  id: string;
  candidatoId: string;
  processoSeletivoId: string;
  documentos: DocumentoAdmissao[];
  status: 'documentos-pendentes' | 'documentos-completos' | 'aguardando-assinatura' | 'admitido';
  dataAprovacao: string;
  dataAdmissao?: string;
  salarioDefinitivo?: string;
  cargoDefinitivo?: string;
  observacoes?: string;
}

export interface DocumentoAdmissao {
  id: string;
  nome: string;
  tipo: string;
  obrigatorio: boolean;
  recebido: boolean;
  arquivo?: string;
  dataRecebimento?: string;
  observacoes?: string;
}

export interface FormularioPublico {
  id: string;
  processoSeletivoId: string;
  linkId: string;
  ativo: boolean;
  campos: CampoFormulario[];
  dataExpiracao?: string;
  acessos: number;
}

export interface CampoFormulario {
  nome: string;
  tipo: 'texto' | 'email' | 'telefone' | 'arquivo' | 'select' | 'textarea';
  obrigatorio: boolean;
  opcoes?: string[];
  placeholder?: string;
  ordem: number;
}

export interface TemplateEtapas {
  id: string;
  nome: string;
  cargo: string;
  etapas: Omit<EtapaSelecao, 'id'>[];
}

export interface HistoricoStatus {
  id: string;
  candidatoId: string;
  statusAnterior: CandidatoProcesso['status'];
  statusNovo: CandidatoProcesso['status'];
  dataAlteracao: string;
  usuario: string;
  motivo?: string;
  observacoes?: string;
}

export interface NotificacaoProcesso {
  id: string;
  tipo: 'mudanca-status' | 'nova-etapa' | 'aprovacao' | 'reprovacao';
  candidatoId: string;
  processoSeletivoId: string;
  titulo: string;
  mensagem: string;
  lida: boolean;
  dataEnvio: string;
  destinatarios: string[];
}

export interface ConfiguracaoStatus {
  id: string;
  nome: string;
  cor: string;
  ativo: boolean;
  ordem: number;
  descricao?: string;
}

export interface MotivoReprovacao {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
}
