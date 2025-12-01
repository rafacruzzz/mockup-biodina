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
    textDark: 'text-blue-900'
  },
  comercialInterno: {
    bg: 'bg-green-500',
    border: 'border-green-600',
    text: 'text-white',
    light: 'bg-green-100',
    textDark: 'text-green-900'
  },
  assessoriaCientifica: {
    bg: 'bg-purple-500',
    border: 'border-purple-600',
    text: 'text-white',
    light: 'bg-purple-100',
    textDark: 'text-purple-900'
  },
  departamentoTecnico: {
    bg: 'bg-red-500',
    border: 'border-red-600',
    text: 'text-white',
    light: 'bg-red-100',
    textDark: 'text-red-900'
  }
};

export const NOME_CATEGORIAS = {
  licitacao: 'Licitação',
  comercialInterno: 'Comercial Interno',
  assessoriaCientifica: 'Assessoria Científica',
  departamentoTecnico: 'Departamento Técnico'
};

// Dados mockados
export const eventosAgenda: EventoAgenda[] = [
  {
    id: '1',
    categoria: 'licitacao',
    titulo: 'Pregão Eletrônico 001/2025',
    descricao: 'Pregão Eletrônico 001/2025',
    dataInicio: new Date(2025, 0, 22, 9, 0),
    dataFim: new Date(2025, 0, 22, 11, 0),
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
    dataInicio: new Date(2025, 0, 23, 14, 30),
    dataFim: new Date(2025, 0, 23, 16, 0),
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
    dataInicio: new Date(2025, 0, 24, 10, 15),
    dataFim: new Date(2025, 0, 24, 12, 0),
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
    dataInicio: new Date(2025, 0, 22, 11, 0),
    dataFim: new Date(2025, 0, 22, 12, 30),
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
    dataInicio: new Date(2025, 0, 23, 16, 0),
    dataFim: new Date(2025, 0, 23, 17, 30),
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
    dataInicio: new Date(2025, 0, 22, 8, 30),
    dataFim: new Date(2025, 0, 22, 10, 30),
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
    dataInicio: new Date(2025, 0, 24, 13, 45),
    dataFim: new Date(2025, 0, 24, 16, 0),
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
    dataInicio: new Date(2025, 0, 22, 15, 30),
    dataFim: new Date(2025, 0, 22, 17, 0),
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
    dataInicio: new Date(2025, 0, 25, 9, 0),
    dataFim: new Date(2025, 0, 25, 12, 0),
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
    dataInicio: new Date(2025, 0, 22, 9, 30),
    dataFim: new Date(2025, 0, 22, 10, 30),
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
    dataInicio: new Date(2025, 0, 23, 9, 0),
    dataFim: new Date(2025, 0, 23, 11, 0),
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
    dataInicio: new Date(2025, 0, 21, 10, 0),
    dataFim: new Date(2025, 0, 21, 12, 0),
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
    dataInicio: new Date(2025, 0, 21, 14, 0),
    dataFim: new Date(2025, 0, 21, 16, 30),
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
    dataInicio: new Date(2025, 0, 27, 10, 0),
    dataFim: new Date(2025, 0, 27, 13, 0),
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
    dataInicio: new Date(2025, 0, 20, 14, 0),
    dataFim: new Date(2025, 0, 20, 16, 0),
    projeto: 'Planejamento Q1 2025',
    colaborador: 'Equipe Comercial',
    status: 'Agendado',
    statusColor: 'bg-gray-500'
  },
  {
    id: '16',
    categoria: 'assessoriaCientifica',
    titulo: 'Treinamento ABL800',
    descricao: 'Treinamento de operação',
    dataInicio: new Date(2025, 0, 23, 8, 0),
    dataFim: new Date(2025, 0, 23, 12, 0),
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
    dataInicio: new Date(2025, 0, 24, 8, 0),
    dataFim: new Date(2025, 0, 24, 10, 0),
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
    dataInicio: new Date(2025, 0, 21, 15, 0),
    dataFim: new Date(2025, 0, 21, 17, 0),
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
    dataInicio: new Date(2025, 0, 20, 9, 0),
    dataFim: new Date(2025, 0, 20, 11, 0),
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
    dataInicio: new Date(2025, 0, 27, 14, 0),
    dataFim: new Date(2025, 0, 27, 16, 0),
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
    dataInicio: new Date(2025, 0, 26, 9, 0),
    dataFim: new Date(2025, 0, 26, 12, 0),
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
    dataInicio: new Date(2025, 0, 24, 14, 0),
    dataFim: new Date(2025, 0, 24, 17, 0),
    projeto: 'Lançamento Linha 2025',
    colaborador: 'Equipe Comercial',
    status: 'Confirmado',
    statusColor: 'bg-blue-500'
  },
  {
    id: '23',
    categoria: 'licitacao',
    titulo: 'Pregão Eletrônico 005/2025',
    descricao: 'Abertura de pregão',
    dataInicio: new Date(2025, 0, 28, 15, 0),
    dataFim: new Date(2025, 0, 28, 18, 0),
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
    dataInicio: new Date(2025, 0, 26, 13, 0),
    dataFim: new Date(2025, 0, 26, 17, 0),
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
    dataInicio: new Date(2025, 0, 23, 13, 0),
    dataFim: new Date(2025, 0, 23, 15, 0),
    projeto: 'Hospital Alemão Oswaldo Cruz - ABL800',
    colaborador: 'Técnico Paulo Santos',
    status: 'Programado',
    statusColor: 'bg-yellow-500'
  }
];
