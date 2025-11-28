import { QueixaTecnica } from '@/types/queixaTecnica';

export const queixaTecnicaMockada: QueixaTecnica = {
  id: 'qt-001',
  // Identificação do Notificador
  notificadorNome: 'Maria Silva Santos',
  notificadorEmail: 'maria.santos@hospital.com.br',
  notificadorTelefone: '(11) 3456-7890',
  notificadorCelular: '(11) 98765-4321',
  notificadorCategoria: 'Profissional de Saúde',
  // Identificação da Notificação
  numeroNotificacao: '2024.04.004335',
  dataIdentificacao: new Date('2024-04-04'),
  produtoMotivo: 'Kit para diagnóstico in vitro',
  tipoQueixaEvento: 'Queixa Técnica',
  covidRelacionado: false,
  vacinaCovidRelacionado: false,
  // Tipo de Queixa Técnica (Seção 3)
  voceENotificante: 'Confidencial',
  razaoSocialNotificante: 'Confidencial',
  cnpjNotificante: 'Confidencial',
  telefoneNotificante: 'Confidencial',
  enderecoNotificante: 'Confidencial',
  tipoQueixaTecnica: 'Produto com suspeita de desvio da qualidade',
  alteracoesApresentadas: '',
  // Queixa Técnica (Seção 4)
  descricaoObjetiva: 'Lactato não estava calibrando após várias tentativas precisei fazer a troca do sensor cassete pack por um novo.',
  classificacaoNivel1: '1000 - Implante, ativação',
  classificacaoNivel2: '1002 - Falha para ativar',
  localIdentificacao: 'Confidencial',
  setorEspecifico: 'Laboratório',
  tipoProcedimento: '',
  numeroRegistroAnvisa: '10301160203',
  cnpjFabricanteImportador: '29.375.441/0001-50',
  nomeComercial: 'ANALISADOR ABL90 FLEX',
  produto: 'Cassete de gasometria',
  dataFabricacao: new Date('2023-12-28'),
  numeroLote: 'R2842',
  dataValidade: new Date('2024-04-26'),
  produtoReprocessado: false,
  produtoImportado: true,
  classeRisco: 'II - Classe II: produtos de médio risco ao indivíduo e ou baixo risco à saúde pública',
  nomeTecnico: '42948 - Instrumento para análise de gases sanguíneos, íons ou pH',
  razaoSocialFabricante: 'BIODINA INSTRUMENTOS CIENTIFICOS LTDA',
  enderecoFabricante: 'R SAO PEDRO 154 SALA 409',
  telefoneContato: '',
  ufFabricante: 'RIO DE JANEIRO',
  municipioFabricante: 'NITERÓI',
  nomeFabricante: '',
  paisFabricante: '',
  seguiuInstrucoes: true,
  localAquisicao: 'Importadora',
  possuiNotaFiscal: true,
  comunicacaoIndustria: 'Sim - Por e-Mail',
  providenciasAdotadas: 'Segregação do produto e notificado ao representante',
  existemAmostras: true,
  quantidadeAmostras: '200 testes',
  existemRotulos: true,
  observacoes: '',
  ncGeradaId: 'NC-2024-008',
  status: 'NC Gerada',
  dataCriacao: new Date('2024-04-04'),
  dataAtualizacao: new Date('2024-04-05')
};

export const queixasTecnicasMockadas: QueixaTecnica[] = [
  queixaTecnicaMockada
];
