
export interface DependenteIR {
  id: string;
  nome: string;
  documento: string;
  idade: number;
}

export interface DependentePlanoSaude {
  id: string;
  nomeCompleto: string;
  documento: string;
  dataNascimento: string;
}

export interface DadosPessoais {
  nome: string;
  cpf: string;
  pis: string;
  idade: string;
  dataNascimento: string;
  estadoCivil: string;
  nacionalidade: string;
  genero: string;
  etnia: string;
  rg: string;
  orgaoExpedidorRg: string;
  ufEmissorRg: string;
  dataExpedicaoRg: string;
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

export interface ColaboradorData {
  dadosPessoais: DadosPessoais;
  dadosProfissionais: DadosProfissionais;
  dadosFinanceiros: DadosFinanceiros;
  dadosBancarios: DadosBancarios;
  formacaoEscolaridade: FormacaoEscolaridade;
  beneficios: Beneficios;
  documentacao: Documentacao;
  desligamento?: DadosDesligamento;
}
