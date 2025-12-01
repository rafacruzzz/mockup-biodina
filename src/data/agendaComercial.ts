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
  }
];
