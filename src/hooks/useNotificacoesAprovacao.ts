import { useState, useEffect } from 'react';

export interface NotificacaoAprovacao {
  id: string;
  tipo: 'aprovacao_empresa' | 'alteracao_cnpj' | 'aditivo';
  titulo: string;
  descricao: string;
  licitacaoId?: number;
  contratoId?: string;
  solicitadoPor: string;
  solicitadoEm: string;
  urgencia: 'baixa' | 'media' | 'alta';
  lida: boolean;
}

interface UseNotificacoesAprovacaoReturn {
  notificacoes: NotificacaoAprovacao[];
  notificacoesNaoLidas: number;
  marcarComoLida: (id: string) => void;
  marcarTodasComoLidas: () => void;
  adicionarNotificacao: (notificacao: Omit<NotificacaoAprovacao, 'id' | 'lida'>) => void;
  removerNotificacao: (id: string) => void;
  filtrarPorTipo: (tipo: NotificacaoAprovacao['tipo'] | 'todas') => NotificacaoAprovacao[];
  isLoading: boolean;
}

// Mock data para demonstração
const mockNotificacoes: NotificacaoAprovacao[] = [
  {
    id: 'notif-001',
    tipo: 'aprovacao_empresa',
    titulo: 'Aprovação de Empresa Pendente',
    descricao: 'Licitação PE 123/2024 - Hospital Regional aguarda aprovação da empresa participante BIODINA LTDA',
    licitacaoId: 1,
    solicitadoPor: 'João Silva',
    solicitadoEm: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
    urgencia: 'alta',
    lida: false
  },
  {
    id: 'notif-002',
    tipo: 'alteracao_cnpj',
    titulo: 'Solicitação de Alteração de CNPJ',
    descricao: 'Contrato PED-2024-089 - Solicitação de alteração de CNPJ de BIODINA LTDA para BIODINA FILIAL SP',
    contratoId: 'ped-089',
    solicitadoPor: 'Maria Santos',
    solicitadoEm: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
    urgencia: 'media',
    lida: false
  },
  {
    id: 'notif-003',
    tipo: 'aditivo',
    titulo: 'Novo Aditivo Contratual',
    descricao: 'Contrato PED-2024-078 - Aditivo de prazo registrado, aguardando validação',
    contratoId: 'ped-078',
    solicitadoPor: 'Carlos Oliveira',
    solicitadoEm: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias atrás
    urgencia: 'baixa',
    lida: true
  }
];

export function useNotificacoesAprovacao(): UseNotificacoesAprovacaoReturn {
  const [notificacoes, setNotificacoes] = useState<NotificacaoAprovacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de notificações
    const loadNotificacoes = async () => {
      setIsLoading(true);
      // Em produção, buscar do backend
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotificacoes(mockNotificacoes);
      setIsLoading(false);
    };
    
    loadNotificacoes();
  }, []);

  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length;

  const marcarComoLida = (id: string) => {
    setNotificacoes(prev => 
      prev.map(n => n.id === id ? { ...n, lida: true } : n)
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })));
  };

  const adicionarNotificacao = (notificacao: Omit<NotificacaoAprovacao, 'id' | 'lida'>) => {
    const novaNotificacao: NotificacaoAprovacao = {
      ...notificacao,
      id: `notif-${Date.now()}`,
      lida: false
    };
    setNotificacoes(prev => [novaNotificacao, ...prev]);
  };

  const removerNotificacao = (id: string) => {
    setNotificacoes(prev => prev.filter(n => n.id !== id));
  };

  const filtrarPorTipo = (tipo: NotificacaoAprovacao['tipo'] | 'todas') => {
    if (tipo === 'todas') return notificacoes;
    return notificacoes.filter(n => n.tipo === tipo);
  };

  return {
    notificacoes,
    notificacoesNaoLidas,
    marcarComoLida,
    marcarTodasComoLidas,
    adicionarNotificacao,
    removerNotificacao,
    filtrarPorTipo,
    isLoading
  };
}
