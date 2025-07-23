
export interface PlanoCarreira {
  id: number;
  nome: string;
  empresa: string;
  uf: string;
  ativo: boolean;
  dataCreacao: string;
}

export interface CargoPlano {
  id: number;
  planoCarreiraId: number;
  cargo: string;
  salarioBase: number;
  cbo: string;
  niveis: NivelProgressao[];
}

export interface NivelProgressao {
  nivel: number;
  valorMinimo: number;
  valorMaximo: number;
  requisitos?: string;
}

export interface SugestaoSalarial {
  planoCarreira: string;
  salarioBase: number;
  adicionalNivel: number;
  salarioTotal: number;
  breakdown: string;
}
