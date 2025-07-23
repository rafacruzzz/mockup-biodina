
export interface Expediente {
  id?: number;
  nome: string;
  observacoes: string;
  horarios: ExpedienteHorario[];
}

export interface ExpedienteHorario {
  dia: string;
  ativo: boolean;
  primeiroTurno: {
    inicio: string;
    fim: string;
  };
  segundoTurno: {
    inicio: string;
    fim: string;
  };
}

export const diasSemana = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
];
