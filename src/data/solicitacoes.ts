
import { SolicitacaoAlteracao } from '@/types/solicitacao';

export const solicitacoes: SolicitacaoAlteracao[] = [
  {
    id: '1',
    colaboradorId: '1', // Danilo Silva
    protocolo: '20241001',
    campo: 'Telefone',
    aba: 'Dados Pessoais',
    valorAtual: '(61) 99999-9999',
    valorSolicitado: '(61) 98888-8888',
    motivo: 'Mudança de operadora, novo número de telefone',
    tipoSolicitacao: 'atualizacao',
    dataSolicitacao: '2024-01-20',
    status: 'pendente'
  },
  {
    id: '2',
    colaboradorId: '1', // Danilo Silva
    protocolo: '20241002',
    campo: 'Endereço',
    aba: 'Dados Pessoais',
    valorAtual: 'SQN 410 Bloco A Apt 101, Asa Norte',
    valorSolicitado: 'SQN 412 Bloco B Apt 205, Asa Norte',
    motivo: 'Mudança de apartamento no mesmo prédio',
    tipoSolicitacao: 'atualizacao',
    dataSolicitacao: '2024-01-18',
    status: 'aprovada',
    observacoesRH: 'Solicitação aprovada após verificação dos documentos',
    dataProcessamento: '2024-01-19',
    processadoPor: 'Maria Silva - RH'
  },
  {
    id: '3',
    colaboradorId: '2', // João Santos (exemplo)
    protocolo: '20241003',
    campo: 'Conta Bancária',
    aba: 'Dados Bancários',
    valorAtual: '12345-6',
    valorSolicitado: '98765-4',
    motivo: 'Abertura de nova conta corrente no mesmo banco',
    tipoSolicitacao: 'atualizacao',
    dataSolicitacao: '2024-01-22',
    status: 'em-analise',
    observacoesRH: 'Aguardando comprovante da nova conta'
  },
  {
    id: '4',
    colaboradorId: '3', // Maria Oliveira (exemplo)
    protocolo: '20241004',
    campo: 'Dependentes IR',
    aba: 'Dados Financeiros',
    valorAtual: '1',
    valorSolicitado: '2',
    motivo: 'Nascimento do segundo filho',
    tipoSolicitacao: 'atualizacao',
    dataSolicitacao: '2024-01-25',
    status: 'pendente'
  },
  {
    id: '5',
    colaboradorId: '1', // Danilo Silva
    protocolo: '20241005',
    campo: 'Tipo de Plano',
    aba: 'Benefícios',
    valorAtual: 'premium',
    valorSolicitado: 'familiar',
    motivo: 'Incluir dependente no plano de saúde',
    tipoSolicitacao: 'atualizacao',
    dataSolicitacao: '2024-01-26',
    status: 'rejeitada',
    observacoesRH: 'Plano familiar não disponível para o cargo atual',
    dataProcessamento: '2024-01-27',
    processadoPor: 'Carlos Lima - RH'
  }
];

export const getSolicitacoesByColaborador = (colaboradorId: string): SolicitacaoAlteracao[] => {
  return solicitacoes.filter(sol => sol.colaboradorId === colaboradorId);
};

export const getSolicitacoesPendentes = (): SolicitacaoAlteracao[] => {
  return solicitacoes.filter(sol => sol.status === 'pendente');
};

export const getStatusColor = (status: SolicitacaoAlteracao['status']) => {
  switch (status) {
    case 'pendente':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'em-analise':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'aprovada':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'rejeitada':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getStatusText = (status: SolicitacaoAlteracao['status']) => {
  switch (status) {
    case 'pendente':
      return 'Pendente';
    case 'em-analise':
      return 'Em Análise';
    case 'aprovada':
      return 'Aprovada';
    case 'rejeitada':
      return 'Rejeitada';
    default:
      return 'Desconhecido';
  }
};
