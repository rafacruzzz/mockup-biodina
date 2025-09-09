export interface ProcessoRescisao {
  id: string;
  colaboradorId: string;
  etapaAtual: number;
  dataInicio: string;
  status: 'em_andamento' | 'concluido' | 'arquivado';
  etapas: {
    etapa1: Etapa1NotificacaoDispensa;
    etapa2: Etapa2AcoesImediatas;
    etapa3: Etapa3DevolucaoVerbas;
    etapa4: Etapa4Agendamentos;
    etapa5: Etapa5Homologacao;
    etapa6: Etapa6Encerramento;
    etapa7: Etapa7Conclusao;
  };
}

export interface Etapa1NotificacaoDispensa {
  solicitacaoPreviaCalculos: boolean;
  previaRescisao: boolean;
  arquivoPrevia?: File;
  desligamentoSolicitadoPor: string;
  dataDesligamento: string;
  avisoPrevia: 'indenizado' | 'trabalhado';
  dataInicioAviso?: string;
  dataFimAviso?: string;
  tipoDesligamento: 'iniciativa_empresa' | 'iniciativa_colaborador';
  motivoDesligamento: string;
  exameDemissional: {
    data: string;
    local: string;
    horario: string;
  };
  contatosPosEmpresa: {
    telefone: string;
    email: string;
  };
  dadosBancarios: {
    banco: string;
    agencia: string;
    conta: string;
    chavePix: string;
  };
  concluida: boolean;
}

export interface Etapa2AcoesImediatas {
  checklist: Array<{
    item: string;
    concluido: boolean;
    dataConclusao?: string;
    responsavel?: string;
  }>;
  observacoes: string;
  concluida: boolean;
}

export interface ItemDevolucao {
  item: string;
  dataDevolucao?: string;
  estadoItem?: string;
  assinaturaConferencia?: string;
  subcampos?: { [key: string]: string };
}

export interface VerbaAdicional {
  descricao: string;
  valor: number;
}

export interface Desconto {
  descricao: string;
  valor: number;
}

export interface Etapa3DevolucaoVerbas {
  itensParaDevolucao: ItemDevolucao[];
  verbasAdicionais: VerbaAdicional[];
  descontos: Desconto[];
  solicitacaoDP: string;
  conclusaoDP: string;
  dataLimitePagamento: string;
  comprovantesAnexados: File[];
  termoGerado: boolean;
  concluida: boolean;
}

export interface Etapa4Agendamentos {
  dataPagamentoRescisao: string;
  dataPagamentoFGTS: string;
  homologacao: {
    data: string;
    local: string;
    horario: string;
  };
  concluida: boolean;
}

export interface DocumentoHomologacao {
  nome: string;
  anexado: boolean;
  arquivo?: File;
}

export interface Etapa5Homologacao {
  documentos: DocumentoHomologacao[];
  assinaturaColaborador?: string;
  assinaturaPreposto?: string;
  ctpsAnexada?: File;
  concluida: boolean;
}

export interface Etapa6Encerramento {
  cancelamentos: {
    dataVT?: string;
    dataVA?: string;
    dataSeguroVida?: string;
  };
  planoSaude: {
    direitoManutencao: boolean;
    prazosCondicoes?: string;
    dataSolicitacaoCorretor?: string;
    dataConclusaoCorretor?: string;
    vigenciaEmpresaAte?: string;
    vigenciaIndividualAPartir?: string;
    titularDependentes: number;
  };
  outrasAcoes: {
    comunicacaoSindicato?: string;
    cancelamentoConvenios?: string;
  };
  confirmacaoFinal: boolean;
  concluida: boolean;
}

export interface Etapa7Conclusao {
  redistribuicaoTarefas: string;
  assinaturaGestor?: string;
  arquivado: boolean;
  concluida: boolean;
}

export const MOTIVOS_INICIATIVA_EMPRESA = [
  'Término de contrato de experiência',
  'Término de contrato temporário',
  'Corte de custos / redução de quadro',
  'Reestruturação organizacional',
  'Desempenho insatisfatório',
  'Quebra de regras internas / políticas da empresa',
  'Conduta inadequada (advertências/reincidências)',
  'Falta grave (justa causa, conforme CLT)'
];

export const MOTIVOS_INICIATIVA_COLABORADOR = [
  'Pedido de demissão (iniciativa própria)',
  'Nova oportunidade de trabalho',
  'Mudança de carreira/área',
  'Questões pessoais ou familiares',
  'Continuidade nos estudos',
  'Insatisfação com o cargo ou empresa',
  'Mudança de cidade/país'
];

export const CHECKLIST_ACOES_IMEDIATAS = [
  'Cancelamento dos acessos de TI (sistemas, e-mail, VPN etc.) → Informar ao TI',
  'Exclusão de cadastro no Uber Empresas → RH',
  'Encerramento do ponto eletrônico → RH',
  'Bloqueio de cartão corporativo → Informar ao Financeiro',
  'Comunicação ao Contas a Pagar sobre adiantamento de despesas pendentes → Informar ao Financeiro',
  'Comunicação ao Depto. de Veículos sobre prestação de contas do cartão combustível → Informar ao Depto. Veículos'
];

export const ITENS_DEVOLUCAO_PADRAO = [
  { item: 'Crachá hospital', subcampos: {} },
  { item: 'Crachá empresa', subcampos: {} },
  { item: 'Cartão de estacionamento', subcampos: {} },
  { item: 'Controle de estacionamento', subcampos: {} },
  { item: 'Chaves', subcampos: { locais: '' } },
  { item: 'Jaleco', subcampos: {} },
  { item: 'EPIs', subcampos: {} },
  { item: 'Veículo da frota', subcampos: { modelo: '', placa: '' } },
  { item: 'Pasta do veículo', subcampos: { documentos: '' } },
  { item: 'Cartão combustível', subcampos: { matricula: '' } },
  { item: 'Notebook / equipamentos de TI', subcampos: {} },
  { item: 'Celular corporativo', subcampos: {} },
  { item: 'Tablet', subcampos: {} },
  { item: 'Chip corporativo', subcampos: {} },
  { item: 'Cartão corporativo', subcampos: { banco: '', numero: '' } }
];

export const DOCUMENTOS_HOMOLOGACAO = [
  'Comprovantes de devolução',
  'Notificação de dispensa',
  'TRCT + comprovante',
  'Guia FGTS + comprovante',
  'Ficha de atualização da CTPS',
  'Seguro-desemprego',
  'Extrato FGTS',
  'Folhas de ponto',
  'Carta de referência',
  'Formulário plano de saúde',
  'Exame demissional',
  'Outros'
];