// Tipos para o histórico de INTEGRAÇÃO RT/CONTROLE DE QUALIDADE

export type ModuloRTHistorico = 
  | 'lista_mestra' 
  | 'documentacao_pop' 
  | 'documentacao_especificacoes' 
  | 'documentacao_legislacoes'
  | 'liberacao_produtos'
  | 'controle_mudancas'
  | 'treinamentos';

export type TipoAcaoRTHistorico = 
  | 'criacao'
  | 'edicao'
  | 'exclusao'
  | 'upload'
  | 'download'
  | 'aprovacao'
  | 'liberacao'
  | 'revogacao';

export interface RegistroHistoricoRT {
  id: string;
  dataHora: string;
  usuario: string;
  modulo: ModuloRTHistorico;
  acao: TipoAcaoRTHistorico;
  recurso: string;
  descricao: string;
  valorAnterior?: string;
  valorNovo?: string;
  detalhes?: string;
}

export const moduloLabels: Record<ModuloRTHistorico, string> = {
  lista_mestra: 'Lista Mestra',
  documentacao_pop: 'Documentação - POP',
  documentacao_especificacoes: 'Documentação - Especificações',
  documentacao_legislacoes: 'Documentação - Legislações',
  liberacao_produtos: 'Liberação de Produtos',
  controle_mudancas: 'Controle de Mudanças',
  treinamentos: 'Treinamentos'
};

export const acaoLabels: Record<TipoAcaoRTHistorico, string> = {
  criacao: 'Criação',
  edicao: 'Edição',
  exclusao: 'Exclusão',
  upload: 'Upload',
  download: 'Download',
  aprovacao: 'Aprovação',
  liberacao: 'Liberação',
  revogacao: 'Revogação'
};
