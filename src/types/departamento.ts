
export interface Departamento {
  id?: number;
  nome: string;
  responsavel: string;
  observacoes: string;
  cargos?: number[]; // IDs dos cargos vinculados ao setor
}
