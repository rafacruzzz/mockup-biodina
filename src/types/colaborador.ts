export interface DependenteIR {
  id: string;
  nome: string;
  documento: string;
  idade: number;
  grauParentesco: string;
  rg: string;
  dataNascimento: string;
}

export interface DependentePlanoSaude {
  id: string;
  nomeCompleto: string;
  documento: string;
  dataNascimento: string;
}

export interface DadosPessoais {
  nome: string;
  idade: string;
  dataNascimento: string;
  estadoCivil: string;
  nacionalidade: string;
  genero: string;
  etnia: string;
  naturalidade: string;
  nomeMae: string;
  nomePai: string;
  cep: string;
  endereco: string;
  numeroResidencia: string;
  complemento: string;
  bairro: string;
  comprovanteResidencia?: File;
  pcd: string;
  doencaPreExistente: string;
  email: string;
  telefone: string;
  observacoes: string;
}

export interface DadosProfissionais {
  empresa: string;
  uf: string;
  setor: string;
  funcao: string;
  cargo: string;
  nivel: string;
  cbo: string;
  compativelFuncao: boolean;
  funcoesDesempenhadas: string;
  dataAdmissao: string;
  dataCadastro: string;
  tempoCasa: string;
  ultimaPromocao: string;
  previsaoFerias: string;
  planoCarreira?: string;
  sugestaoSalario?: string;
  breakdownSalarial?: string;
  // Campos migrados da aba Departamento do usuário
  nomeDepartamento?: string;
  responsavelDepartamento?: string;
  descricaoDepartamento?: string;
  // Novos campos adicionados
  tipoUsuario: string;
  sindicatoVinculado?: string;
  regimeTrabalho: string;
  horarioTrabalho: string;
  cargaHorariaSemanal: string;
  origemContratacao: string;
}

export interface DadosFinanceiros {
  salarioBase: string;
  adicionalNivel: string;
  insalubridade: string;
  sobreaviso: string;
  salarioBruto: string;
  valorHoraTrabalhada: string;
  pisoSalarial: string;
  mediaSalarial: string;
  dependentesIR: DependenteIR[];
  adiantamentoSalarial: boolean;
  sugestaoSalario?: string;
  breakdownSalarial?: string;
  planoCarreira?: string;
}

export interface DadosBancarios {
  banco: string;
  tipoConta: string;
  agencia: string;
  conta: string;
  contaPF_PJ: string;
  chavePix: string;
  // Dados bancários secundários (opcional)
  bancoSecundario?: string;
  tipoContaSecundario?: string;
  agenciaSecundario?: string;
  contaSecundario?: string;
}

export interface FormacaoEscolaridade {
  escolaridade: string;
  possuiDiploma: boolean;
  curriculo?: DocumentoAnexo;
  comprovantesEscolaridade: DocumentoAnexo[];
}

export interface Beneficios {
  // Campos existentes (compatibilidade)
  tipoPlano: string;
  quantidadeDependentesPlano: string;
  
  // Vale-transporte
  valeTransporte: {
    modalidade: string;
    dataSolicitacaoCartao: string;
    dataPagamento: string;
  };
  
  // Vale-alimentação
  valeAlimentacao: {
    dataSolicitacaoCartao: string;
    dataPagamento: string;
  };
  
  // Plano de Saúde
  planoSaude: {
    operadora: string;
    dataSolicitacao: string;
    vigenciaInicio: string;
    tipoPlano: string;
    possuiDependentes: boolean;
    dependentes: DependentePlanoSaude[];
  };
}

export interface DocumentoAnexo {
  id: string;
  nome: string;
  tipo: string;
  tamanho: number;
  dataUpload: string;
  categoria: string;
  observacoes?: string;
  arquivo: File | null;
  dataValidade?: string;
  validadeIndeterminada: boolean;
}

export interface ExameAdmissional {
  data: string;
  local: string;
  horario: string;
}

export interface Documentacao {
  cpf?: string;
  pis?: string;
  rg?: string;
  orgaoExpedidorRg?: string;
  ufEmissorRg?: string;
  dataExpedicaoRg?: string;
  anexos: DocumentoAnexo[];
  solicitadoParaDPEm?: string;
  solicitadoPor?: string;
  motivoContratacao?: string;
  observacoesGerais?: string;
  exameAdmissional?: ExameAdmissional;
}

export interface ItemDesligamento {
  id: string;
  nome: string;
  necessario: boolean;
  dataEntrega: string;
  entregue: boolean;
  imagemComprovante?: {
    file: File;
    url: string;
    nome: string;
  };
}

export interface DadosDesligamento {
  motivoDesligamento: string;
  dataDesligamento: string;
  processadoPor: string;
  observacoes: string;
  itensDesligamento: ItemDesligamento[];
}

export interface DadosTI {
  servidorAcesso: string;
  permissoesNecessarias: string;
  restricoes: string;
  pastasAcesso: string;
  emailCorporativo: string;
  ramal: string;
}

export interface ItemUso {
  id: string;
  nome: string;
  necessario: boolean;
  dataEntrega?: string;
  entregue: boolean;
}

export interface ColaboradorData {
  dadosPessoais: DadosPessoais;
  dadosProfissionais: DadosProfissionais;
  dadosFinanceiros: DadosFinanceiros;
  dadosBancarios: DadosBancarios;
  formacaoEscolaridade: FormacaoEscolaridade;
  beneficios: Beneficios;
  documentacao: Documentacao;
  dadosTI?: DadosTI;
  desligamento?: DadosDesligamento;
}
