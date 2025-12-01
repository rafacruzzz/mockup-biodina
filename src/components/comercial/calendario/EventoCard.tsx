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
        ${cores.bgLight} ${cores.borderLeft} ${cores.textDark}
        border-l-4 px-2 py-1 rounded-md cursor-pointer
        hover:shadow-md hover:z-10 transition-all
        overflow-hidden h-full
      `}
    >
      <div className="font-medium text-xs truncate leading-tight">{evento.titulo}</div>
      <div className="flex items-center gap-1 mt-0.5 text-[10px] opacity-70">
        <Clock className="h-2.5 w-2.5" />
        <span className="truncate">{horaInicio} - {horaFim}</span>
      </div>
      {evento.projeto && (
        <div className="truncate mt-0.5 text-[9px] opacity-60">
          {evento.projeto}
        </div>
      )}
    </div>
  );
};
