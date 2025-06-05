
export interface Licitacao {
  id?: number;
  numeroPregao: string;
  nomeInstituicao: string;
  uf: string;
  municipio: string;
  linkEdital: string;
  objetoLicitacao: string;
  numeroItem: string;
  empresaConcorrente: string;
  palavraChave: string;
  status: 'triagem' | 'acompanhamento' | 'finalizada' | 'convertida';
  motivoDecisao: string;
  observacoes: string;
  dataAbertura: string;
  dataContato: string;
  naturezaOperacao: string;
  segmentoLead: string;
  fluxoTrabalho: string;
  permiteAdesao: boolean;
}

export interface LicitacaoFormData extends Licitacao {
  // Propriedades específicas do formulário, se necessário
}
