import { EventoAgenda, CORES_CATEGORIAS } from "@/data/agendaComercial";
import { Clock } from "lucide-react";
import { format } from "date-fns";

interface EventoCardProps {
  evento: EventoAgenda;
  onClick: () => void;
  style?: React.CSSProperties;
}

export const EventoCard = ({ evento, onClick, style }: EventoCardProps) => {
  const cores = CORES_CATEGORIAS[evento.categoria];
  
  const horaInicio = format(evento.dataInicio, 'HH:mm');
  const horaFim = format(evento.dataFim, 'HH:mm');

  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        ${cores.bg} ${cores.border} ${cores.text}
        border-l-4 p-2 rounded cursor-pointer
        hover:opacity-90 transition-opacity
        overflow-hidden text-xs
      `}
    >
      <div className="font-semibold truncate">{evento.titulo}</div>
      <div className="flex items-center gap-1 mt-1 opacity-90">
        <Clock className="h-3 w-3" />
        <span>{horaInicio} - {horaFim}</span>
      </div>
      <div className="truncate mt-1 text-[10px] opacity-80">
        {evento.projeto}
      </div>
    </div>
  );
};
