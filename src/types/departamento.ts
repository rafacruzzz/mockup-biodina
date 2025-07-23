
export interface Departamento {
  id?: number;
  nome: string;
  responsavel: string;
  observacoes: string;
  funcoes?: number[]; // IDs das funções vinculadas ao setor
}
