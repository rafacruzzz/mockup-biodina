import { RegistroHistoricoRT } from '@/types/rtHistorico';

export const mockHistoricoRT: RegistroHistoricoRT[] = [
  {
    id: 'hist-001',
    dataHora: '2024-03-20 14:30:25',
    usuario: 'Carlos Oliveira',
    modulo: 'lista_mestra',
    acao: 'upload',
    recurso: 'Roteiro de Auditoria da Qualidade',
    descricao: 'Upload do arquivo de auditoria',
    valorNovo: 'roteiro_auditoria_v1.pdf'
  },
  {
    id: 'hist-002',
    dataHora: '2024-03-19 10:15:42',
    usuario: 'Ana Costa',
    modulo: 'liberacao_produtos',
    acao: 'liberacao',
    recurso: 'ABL800 FLEX',
    descricao: 'Produto liberado para comercialização',
    valorAnterior: 'Não liberado',
    valorNovo: 'Liberado'
  },
  {
    id: 'hist-003',
    dataHora: '2024-03-18 16:45:18',
    usuario: 'Maria Santos',
    modulo: 'documentacao_pop',
    acao: 'upload',
    recurso: 'POP-001',
    descricao: 'Novo procedimento operacional adicionado',
    valorNovo: 'POP_limpeza_equipamentos.pdf'
  },
  {
    id: 'hist-004',
    dataHora: '2024-03-17 09:22:35',
    usuario: 'João Silva',
    modulo: 'controle_mudancas',
    acao: 'criacao',
    recurso: 'MUD-2024-001',
    descricao: 'Nova solicitação de mudança registrada',
    detalhes: 'Alteração no processo de calibração de equipamentos'
  },
  {
    id: 'hist-005',
    dataHora: '2024-03-16 11:30:00',
    usuario: 'Carlos Oliveira',
    modulo: 'treinamentos',
    acao: 'criacao',
    recurso: 'TRE-2024-003',
    descricao: 'Treinamento de Boas Práticas agendado',
    valorNovo: '25/03/2024'
  },
  {
    id: 'hist-006',
    dataHora: '2024-03-15 14:00:12',
    usuario: 'Ana Costa',
    modulo: 'documentacao_especificacoes',
    acao: 'edicao',
    recurso: 'ESP-REAGENTES-001',
    descricao: 'Especificação de reagentes atualizada',
    valorAnterior: 'Versão 1.0',
    valorNovo: 'Versão 1.1'
  },
  {
    id: 'hist-007',
    dataHora: '2024-03-14 08:45:33',
    usuario: 'Maria Santos',
    modulo: 'liberacao_produtos',
    acao: 'revogacao',
    recurso: 'DxH 520',
    descricao: 'Liberação revogada para revisão',
    valorAnterior: 'Liberado',
    valorNovo: 'Não liberado'
  },
  {
    id: 'hist-008',
    dataHora: '2024-03-13 15:20:45',
    usuario: 'João Silva',
    modulo: 'controle_mudancas',
    acao: 'aprovacao',
    recurso: 'MUD-2024-001',
    descricao: 'Mudança aprovada pela gestão',
    valorAnterior: 'Pendente',
    valorNovo: 'Aprovado'
  },
  {
    id: 'hist-009',
    dataHora: '2024-03-12 10:10:10',
    usuario: 'Carlos Oliveira',
    modulo: 'lista_mestra',
    acao: 'edicao',
    recurso: 'Certificado de ART',
    descricao: 'Código atualizado',
    valorAnterior: 'ART-001',
    valorNovo: 'ART-2024-001'
  },
  {
    id: 'hist-010',
    dataHora: '2024-03-11 13:55:22',
    usuario: 'Ana Costa',
    modulo: 'documentacao_legislacoes',
    acao: 'upload',
    recurso: 'RDC 665/2022',
    descricao: 'Nova legislação adicionada',
    valorNovo: 'RDC_665_2022.pdf'
  },
  {
    id: 'hist-011',
    dataHora: '2024-03-10 09:30:00',
    usuario: 'Maria Santos',
    modulo: 'treinamentos',
    acao: 'edicao',
    recurso: 'TRE-2024-002',
    descricao: 'Local do treinamento alterado',
    valorAnterior: 'Sala 101',
    valorNovo: 'Auditório Principal'
  },
  {
    id: 'hist-012',
    dataHora: '2024-03-09 16:40:15',
    usuario: 'João Silva',
    modulo: 'lista_mestra',
    acao: 'exclusao',
    recurso: 'Documento obsoleto',
    descricao: 'Documento removido por obsolescência',
    valorAnterior: 'manual_antigo.pdf'
  }
];
