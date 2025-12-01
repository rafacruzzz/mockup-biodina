export type CategoriaEvento = 'licitacao' | 'comercialInterno' | 'assessoriaCientifica' | 'departamentoTecnico';

export interface EventoAgenda {
  id: string;
  categoria: CategoriaEvento;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  projeto: string;
  colaborador: string;
  status: string;
  statusColor: string;
}

export const CORES_CATEGORIAS = {
  licitacao: {
    bg: 'bg-blue-500',
    border: 'border-blue-600',
    text: 'text-white',
    light: 'bg-blue-100',
    textDark: 'text-blue-900',
    bgLight: 'bg-blue-50',
    borderLeft: 'border-l-blue-500'
  },
  comercialInterno: {
    bg: 'bg-emerald-500',
    border: 'border-emerald-600',
    text: 'text-white',
    light: 'bg-emerald-100',
    textDark: 'text-emerald-900',
    bgLight: 'bg-emerald-50',
    borderLeft: 'border-l-emerald-500'
  },
  assessoriaCientifica: {
    bg: 'bg-violet-500',
    border: 'border-violet-600',
    text: 'text-white',
    light: 'bg-violet-100',
    textDark: 'text-violet-900',
    bgLight: 'bg-violet-50',
    borderLeft: 'border-l-violet-500'
  },
  departamentoTecnico: {
    bg: 'bg-rose-500',
    border: 'border-rose-600',
    text: 'text-white',
    light: 'bg-rose-100',
    textDark: 'text-rose-900',
    bgLight: 'bg-rose-50',
    borderLeft: 'border-l-rose-500'
  }
};

export const NOME_CATEGORIAS = {
  licitacao: 'Licitação',
  comercialInterno: 'Comercial Interno',
  assessoriaCientifica: 'Assessoria Científica',
  departamentoTecnico: 'Departamento Técnico'
};

// Dados mockados - Dezembro 2025
export const eventosAgenda: EventoAgenda[] = [
  {
    id: '1',
    categoria: 'licitacao',
    titulo: 'Pregão Eletrônico 001/2025',
    descricao: 'Pregão Eletrônico 001/2025',
    dataInicio: new Date(2025, 11, 2, 9, 0),
    dataFim: new Date(2025, 11, 2, 11, 0),
    projeto: 'Equipamentos Laboratoriais - Hospital Regional',
    colaborador: 'Carlos Oliveira',
    status: 'Em Operação',
    statusColor: 'bg-blue-500'
  },
  {
    id: '2',
    categoria: 'licitacao',
    titulo: 'Pregão Eletrônico 002/2025',
    descricao: 'Pregão Eletrônico 002/2025',
    dataInicio: new Date(2025, 11, 3, 14, 30),
    dataFim: new Date(2025, 11, 3, 16, 0),
    projeto: 'Sistema de Gestão WEBMED - Prefeitura SP',
    colaborador: 'Ana Costa',
    status: 'Etapa de Lances',
    statusColor: 'bg-orange-500'
  },
  {
    id: '3',
    categoria: 'licitacao',
    titulo: 'Pregão Eletrônico 003/2025',
    descricao: 'Pregão Eletrônico 003/2025',
    dataInicio: new Date(2025, 11, 4, 10, 15),
    dataFim: new Date(2025, 11, 4, 12, 0),
    projeto: 'Gasômetros - Rede Municipal de Saúde',
    colaborador: 'João Silva',
    status: 'Aceitação',
    statusColor: 'bg-green-500'
  },
  {
    id: '4',
    categoria: 'comercialInterno',
    titulo: 'Reunião Comercial Semanal',
    descricao: 'Reunião Comercial Semanal',
    dataInicio: new Date(2025, 11, 2, 11, 0),
    dataFim: new Date(2025, 11, 2, 12, 30),
    projeto: 'Revisão de Pipeline Q1',
    colaborador: 'Equipe Comercial',
    status: 'Agendado',
    statusColor: 'bg-gray-500'
  },
  {
    id: '5',
    categoria: 'comercialInterno',
    titulo: 'Apresentação Proposta',
    descricao: 'Apresentação Proposta',
    dataInicio: new Date(2025, 11, 3, 16, 0),
    dataFim: new Date(2025, 11, 3, 17, 30),
    projeto: 'Hospital Albert Einstein - ABL800',
    colaborador: 'Maria Santos',
    status: 'Confirmado',
    statusColor: 'bg-blue-500'
  },
  {
    id: '6',
    categoria: 'assessoriaCientifica',
    titulo: 'Consultoria Técnica',
    descricao: 'Consultoria Técnica',
    dataInicio: new Date(2025, 11, 2, 8, 30),
    dataFim: new Date(2025, 11, 2, 10, 30),
    projeto: 'Implementação Sistema HUOL',
    colaborador: 'Dr. Roberto Silva',
    status: 'Em Andamento',
    statusColor: 'bg-purple-500'
  },
  {
    id: '7',
    categoria: 'assessoriaCientifica',
    titulo: 'Treinamento Técnico',
    descricao: 'Treinamento Técnico',
    dataInicio: new Date(2025, 11, 4, 13, 45),
    dataFim: new Date(2025, 11, 4, 16, 0),
    projeto: 'Capacitação Radiometer ABL',
    colaborador: 'Dra. Fernanda Costa',
    status: 'Agendado',
    statusColor: 'bg-gray-500'
  },
  {
    id: '8',
    categoria: 'departamentoTecnico',
    titulo: 'Manutenção Preventiva',
    descricao: 'Manutenção Preventiva',
    dataInicio: new Date(2025, 11, 2, 15, 30),
    dataFim: new Date(2025, 11, 2, 17, 0),
    projeto: 'Equipamentos Hospital São Paulo',
    colaborador: 'Técnico José Lima',
    status: 'Em Execução',
    statusColor: 'bg-red-500'
  },
  {
    id: '9',
    categoria: 'departamentoTecnico',
    titulo: 'Instalação Equipamento',
    descricao: 'Instalação Equipamento',
    dataInicio: new Date(2025, 11, 5, 9, 0),
    dataFim: new Date(2025, 11, 5, 12, 0),
    projeto: 'ABL800 Basic - Hospital Einstein',
    colaborador: 'Técnico Paulo Santos',
    status: 'Programado',
    statusColor: 'bg-yellow-500'
  },
  // Eventos adicionais para demonstrar sobreposição
  {
    id: '10',
    categoria: 'comercialInterno',
    titulo: 'Follow-up Cliente',
    descricao: 'Acompanhamento de proposta',
    dataInicio: new Date(2025, 11, 2, 9, 30),
    dataFim: new Date(2025, 11, 2, 10, 30),
    projeto: 'Hospital Sírio-Libanês',
    colaborador: 'Pedro Alves',
    status: 'Agendado',
    statusColor: 'bg-gray-500'
  },
  {
    id: '11',
    categoria: 'licitacao',
    titulo: 'Análise de Edital',
    descricao: 'Revisão de documentos',
    dataInicio: new Date(2025, 11, 3, 9, 0),
    dataFim: new Date(2025, 11, 3, 11, 0),
    projeto: 'Prefeitura Municipal de Campinas',
    colaborador: 'Juliana Mendes',
    status: 'Em Análise',
    statusColor: 'bg-yellow-500'
  },
  {
    id: '12',
    categoria: 'assessoriaCientifica',
    titulo: 'Demo de Produto',
    descricao: 'Demonstração técnica',
    dataInicio: new Date(2025, 11, 1, 10, 0),
    dataFim: new Date(2025, 11, 1, 12, 0),
    projeto: 'Hospital das Clínicas - DxH 520',
    colaborador: 'Dr. Marcos Silva',
    status: 'Confirmado',
    statusColor: 'bg-blue-500'
  },
  {
    id: '13',
    categoria: 'departamentoTecnico',
    titulo: 'Calibração de Equipamento',
    descricao: 'Calibração preventiva',
    dataInicio: new Date(2025, 11, 1, 14, 0),
    dataFim: new Date(2025, 11, 1, 16, 30),
    projeto: 'Hospital Santa Casa - ABL90',
    colaborador: 'Técnico Roberto Lima',
    status: 'Em Execução',
    statusColor: 'bg-red-500'
  },
  {
    id: '14',
    categoria: 'licitacao',
    titulo: 'Pregão Eletrônico 004/2025',
    descricao: 'Pregão Eletrônico 004/2025',
    dataInicio: new Date(2025, 11, 8, 10, 0),
    dataFim: new Date(2025, 11, 8, 13, 0),
    projeto: 'Reagentes Laboratoriais - Rede Municipal RJ',
    colaborador: 'Ana Costa',
    status: 'Habilitação',
    statusColor: 'bg-purple-500'
  },
  {
    id: '15',
    categoria: 'comercialInterno',
    titulo: 'Reunião de Planejamento',
    descricao: 'Planejamento trimestral',
    dataInicio: new Date(2025, 11, 1, 14, 0),
    dataFim: new Date(2025, 11, 1, 16, 0),
    projeto: 'Planejamento Q1 2026',
    colaborador: 'Equipe Comercial',
    status: 'Agendado',
    statusColor: 'bg-gray-500'
  },
  {
    id: '16',
    categoria: 'assessoriaCientifica',
    titulo: 'Treinamento ABL800',
    descricao: 'Treinamento de operação',
    dataInicio: new Date(2025, 11, 3, 8, 0),
    dataFim: new Date(2025, 11, 3, 12, 0),
    projeto: 'Hospital Israelita - Novo Equipamento',
    colaborador: 'Dra. Patricia Moraes',
    status: 'Confirmado',
    statusColor: 'bg-blue-500'
  },
  {
    id: '17',
    categoria: 'departamentoTecnico',
    titulo: 'Manutenção Corretiva',
    descricao: 'Reparo de falha técnica',
    dataInicio: new Date(2025, 11, 4, 8, 0),
    dataFim: new Date(2025, 11, 4, 10, 0),
    projeto: 'Hospital Moinhos de Vento - AQT 90',
    colaborador: 'Técnico Carlos Souza',
    status: 'Urgente',
    statusColor: 'bg-red-500'
  },
  {
    id: '18',
    categoria: 'comercialInterno',
    titulo: 'Negociação de Contrato',
    descricao: 'Ajustes contratuais',
    dataInicio: new Date(2025, 11, 1, 15, 0),
    dataFim: new Date(2025, 11, 1, 17, 0),
    projeto: 'Rede D\'Or - Contrato Anual',
    colaborador: 'Maria Santos',
    status: 'Em Negociação',
    statusColor: 'bg-orange-500'
  },
  {
    id: '19',
    categoria: 'licitacao',
    titulo: 'Envio de Documentação',
    descricao: 'Submissão de proposta',
    dataInicio: new Date(2025, 11, 1, 9, 0),
    dataFim: new Date(2025, 11, 1, 11, 0),
    projeto: 'Prefeitura de Curitiba - Equipamentos',
    colaborador: 'João Silva',
    status: 'Em Preparação',
    statusColor: 'bg-yellow-500'
  },
  {
    id: '20',
    categoria: 'assessoriaCientifica',
    titulo: 'Consultoria Técnica',
    descricao: 'Suporte técnico especializado',
    dataInicio: new Date(2025, 11, 9, 14, 0),
    dataFim: new Date(2025, 11, 9, 16, 0),
    projeto: 'Hospital Samaritano - Implementação',
    colaborador: 'Dr. Fernando Costa',
    status: 'Agendado',
    statusColor: 'bg-gray-500'
  },
  {
    id: '21',
    categoria: 'departamentoTecnico',
    titulo: 'Validação de Sistema',
    descricao: 'Testes de validação',
    dataInicio: new Date(2025, 11, 10, 9, 0),
    dataFim: new Date(2025, 11, 10, 12, 0),
    projeto: 'Laboratório Fleury - Sistema Integrado',
    colaborador: 'Técnico André Lima',
    status: 'Programado',
    statusColor: 'bg-blue-500'
  },
  {
    id: '22',
    categoria: 'comercialInterno',
    titulo: 'Workshop Produtos',
    descricao: 'Apresentação de novos produtos',
    dataInicio: new Date(2025, 11, 4, 14, 0),
    dataFim: new Date(2025, 11, 4, 17, 0),
    projeto: 'Lançamento Linha 2026',
    colaborador: 'Equipe Comercial',
    status: 'Confirmado',
    statusColor: 'bg-blue-500'
  },
  {
    id: '23',
    categoria: 'licitacao',
    titulo: 'Pregão Eletrônico 005/2025',
    descricao: 'Abertura de pregão',
    dataInicio: new Date(2025, 11, 11, 15, 0),
    dataFim: new Date(2025, 11, 11, 18, 0),
    projeto: 'Equipamentos Diagnóstico - Hospital Municipal',
    colaborador: 'Carlos Oliveira',
    status: 'Agendado',
    statusColor: 'bg-gray-500'
  },
  {
    id: '24',
    categoria: 'assessoriaCientifica',
    titulo: 'Treinamento Avançado',
    descricao: 'Capacitação avançada',
    dataInicio: new Date(2025, 11, 10, 13, 0),
    dataFim: new Date(2025, 11, 10, 17, 0),
    projeto: 'Hospital Beneficência - DxH 520',
    colaborador: 'Dra. Fernanda Costa',
    status: 'Confirmado',
    statusColor: 'bg-blue-500'
  },
  {
    id: '25',
    categoria: 'departamentoTecnico',
    titulo: 'Atualização de Software',
    descricao: 'Update de sistema',
    dataInicio: new Date(2025, 11, 3, 13, 0),
    dataFim: new Date(2025, 11, 3, 15, 0),
    projeto: 'Hospital Alemão Oswaldo Cruz - ABL800',
    colaborador: 'Técnico Paulo Santos',
    status: 'Programado',
    statusColor: 'bg-yellow-500'
  }
];
