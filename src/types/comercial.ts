
export interface Projeto {
  id: string;
  nome: string;
  cliente: string;
  valor: string;
  status: string;
  dataInicio: string;
  responsavel: string;
  descricao?: string;
  tipo?: string;
}

export interface OportunidadeComercial {
  id: string;
  cliente: string;
  projeto: string;
  valor: number;
  probabilidade: number;
  dataFechamento: string;
  status: 'prospeccao' | 'qualificacao' | 'proposta' | 'negociacao' | 'fechamento' | 'perdida';
  responsavel: string;
  origem: string;
  observacoes?: string;
  historico?: {
    data: string;
    acao: string;
    usuario: string;
    observacao?: string;
  }[];
}

export interface PedidoComercial {
  id: string;
  numero: string;
  cliente: string;
  valorTotal: number;
  status: 'rascunho' | 'pendente' | 'aprovado' | 'rejeitado' | 'enviado' | 'cancelado';
  dataEmissao: string;
  dataPrevista?: string;
  vendedor: string;
  observacoes?: string;
  itens: PedidoItem[];
}

export interface PedidoItem {
  id: string;
  produto: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacoes?: string;
}

export interface Chamado {
  id: string;
  titulo: string;
  cliente: string;
  tipo: 'suporte' | 'comercial' | 'tecnico' | 'financeiro';
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  status: 'aberto' | 'em_andamento' | 'aguardando' | 'resolvido' | 'fechado';
  dataAbertura: string;
  dataUltimaAtualizacao: string;
  responsavel?: string;
  descricao: string;
  solucao?: string;
}
