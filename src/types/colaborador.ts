
export interface DadosPessoais {
  nome: string;
  cpf: string;
  pis: string;
  idade: string;
  dataNascimento: string;
  genero: string;
  etnia: string;
  rg: string;
  orgaoExpedidorRg: string;
  ufEmissorRg: string;
  dataExpedicaoRg: string;
  naturalidade: string;
  nomeMae: string;
  nomePai: string;
  cid: string;
  email: string;
  telefone: string;
  endereco: string;
  bairro: string;
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
  dependentesIR: string;
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
}

export interface Beneficios {
  tipoPlano: string;
  quantidadeDependentesPlano: string;
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
}

export interface Documentacao {
  anexos: DocumentoAnexo[];
}

export interface ColaboradorData {
  dadosPessoais: DadosPessoais;
  dadosProfissionais: DadosProfissionais;
  dadosFinanceiros: DadosFinanceiros;
  dadosBancarios: DadosBancarios;
  formacaoEscolaridade: FormacaoEscolaridade;
  beneficios: Beneficios;
  documentacao: Documentacao;
}
