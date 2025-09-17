export interface SolicitacaoGenerica {
  id_solicitacao: string;
  id_usuario_solicitante: string;
  nome_solicitante: string;
  assunto: string;
  descricao: string;
  data_criacao: string;
  data_atualizacao: string;
  status: 'aberta' | 'em-andamento' | 'concluida' | 'rejeitada';
  id_setor_destino: string;
  nome_setor_destino: string;
  id_responsavel?: string;
  nome_responsavel?: string;
  expectativa_conclusao?: string;
  anexos: string[];
  tipo_solicitacao: string;
  campos_especificos: Record<string, any>;
  historico_interacoes: InteracaoSolicitacao[];
}

export interface InteracaoSolicitacao {
  id: string;
  data: string;
  usuario: string;
  tipo: 'criacao' | 'atualizacao_status' | 'comentario' | 'anexo';
  descricao: string;
  status_anterior?: string;
  status_novo?: string;
}

export interface Setor {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  descricao: string;
  responsaveis: Responsavel[];
}

export interface Responsavel {
  id: string;
  nome: string;
  email: string;
  cargo: string;
}

export interface TipoSolicitacao {
  id: string;
  nome: string;
  setorId: string;
  descricao: string;
  campos: CampoFormulario[];
  requer_aprovacao: boolean;
  prazo_padrao_dias?: number;
}

export interface CampoFormulario {
  id: string;
  label: string;
  tipo: 'text' | 'textarea' | 'select' | 'date' | 'number' | 'checkbox' | 'radio' | 'file';
  obrigatorio: boolean;
  opcoes?: string[];
  placeholder?: string;
  validacao?: string;
  dependente_de?: string;
}

// Interfaces específicas para tipos de solicitação RH
export interface ProcessoSeletivoFields {
  departamento_solicitante: string;
  cargo_requisitado: string;
  salario: string;
  nivel: string;
  beneficios: string;
  tipo_contratacao: 'CLT' | 'Estágio' | 'Jovem Aprendiz' | 'PJ' | 'Autônomo';
  modelo_trabalho: 'Presencial' | 'Híbrido' | 'Remoto';
  carga_horaria: string;
  justificativa_vaga: 'Substituição' | 'Expansão' | 'Outro';
  quantidade_vagas: number;
  perfil_desejado: string;
  responsavel_vaga: string;
  responsavel_area_entrevista: string;
  data_inicio_prevista: string;
  aprovacao_gestor_diretoria: boolean;
}

export interface AdmissaoFields {
  nome_candidato: string;
  cargo: string;
  salario: string;
  nivel: string;
  beneficios: string;
  tipo_contratacao: 'CLT' | 'Estágio' | 'Jovem Aprendiz' | 'PJ' | 'Autônomo';
  modelo_trabalho: 'Presencial' | 'Híbrido' | 'Remoto';
  carga_horaria: string;
  justificativa_vaga: 'Substituição' | 'Expansão' | 'Outro';
  departamento: string;
  data_admissao: string;
  gestor_responsavel: string;
  anexar_documentos: boolean;
  telefone_contato: string;
  email_contato: string;
  aprovacao_gestor: boolean;
  observacoes: string;
}

export interface FeriasFields {
  nome_colaborador: string;
  periodo_aquisitivo: string;
  data_inicio_ferias: string;
  quantidade_dias: 15 | 20 | 30;
  segunda_parcela_inicio?: string; // Para quando escolher 15 dias
  venda_um_terco: 'Sim' | 'Não';
  observacoes: string;
}

export interface PromocaoFields {
  nome_colaborador: string;
  cargo_atual: string;
  novo_cargo: string;
  departamento_atual: string;
  novo_departamento: string;
  data_efetivacao_desejada: string;
  motivo_promocao: string;
  novo_salario_nivel: string;
  aprovacao_diretoria: boolean;
  observacoes: string;
}

export interface AlteracaoEnderecoFields {
  nome_colaborador: string;
  novo_endereco_completo: string;
  comprovante_residencia_anexo: 'Sim' | 'Não';
}

export interface LicencasFields {
  nome_colaborador: string;
  tipo_licenca: 'Maternidade' | 'Paternidade' | 'Saúde' | 'Outros';
  data_inicio_prevista: string;
  data_termino_estimado?: string;
  atestado_documento_anexo: 'Sim' | 'Não';
  atestado_sistema_ponto: 'Sim' | 'Não';
  observacoes: string;
}

export interface InclusaoDependenteIRFields {
  nome_colaborador: string;
  cpf_colaborador: string;
  nome_dependente: string;
  parentesco: string;
  data_nascimento_dependente: string;
  documentos_enviados: 'Sim' | 'Não';
}

export interface InclusaoDependentePlanoFields {
  nome_colaborador: string;
  plano_atual: string;
  nome_dependente: string;
  grau_parentesco: string;
  data_nascimento_dependente: string;
  documentos_anexados: 'Sim' | 'Não';
  tabela_valores_dependentes?: string;
  observacoes: string;
}

export interface PontoEletronicoFields {
  nome_colaborador: string;
  matricula: string;
  datas_referentes: string;
  tipo_solicitacao: string[]; // Array para múltiplos checkboxes
  descricao_justificativa: string;
  documento_comprobatorio?: 'Sim' | 'Não';
}

export interface SolicitacoesGeraisFields {
  nome_colaborador: string;
  departamento: string;
  tipo_solicitacao: string;
  descricao_detalhada: string;
  data_solicitacao: string;
  anexos_necessarios?: 'Sim' | 'Não';
}

export interface EvolucaoFields {
  nome_colaborador: string;
  departamento_atual: string;
  motivo_solicitacao: string;
  periodo_evolucao: string;
}

export type StatusSolicitacaoAlteracao = 'pendente' | 'em-analise' | 'aprovada' | 'rejeitada';

export interface SolicitacaoAlteracao {
  id: string;
  protocolo: string;
  colaboradorId: string;
  aba: string;
  campo: string;
  tipoSolicitacao: string;
  valorAtual: string;
  valorSolicitado: string;
  motivo: string;
  observacoesRH?: string;
  status: StatusSolicitacaoAlteracao;
  dataSolicitacao: string;
  dataProcessamento?: string;
  processadoPor?: string;
}
