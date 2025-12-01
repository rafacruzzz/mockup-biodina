import { EventoAgenda, CORES_CATEGORIAS } from "@/data/agendaComercial";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CalendarioMensalProps {
  dataAtual: Date;
  eventos: EventoAgenda[];
  onEventoClick: (evento: EventoAgenda) => void;
}

export const CalendarioMensal = ({ dataAtual, eventos, onEventoClick }: CalendarioMensalProps) => {
  const inicioMes = startOfMonth(dataAtual);
  const fimMes = endOfMonth(dataAtual);
  const inicioCalendario = startOfWeek(inicioMes, { weekStartsOn: 0 });
  const fimCalendario = endOfWeek(fimMes, { weekStartsOn: 0 });

  const dias: Date[] = [];
  let dia = inicioCalendario;
  while (dia <= fimCalendario) {
    dias.push(dia);
    dia = addDays(dia, 1);
  }

  const getEventosParaDia = (dia: Date) => {
    return eventos.filter(evento => isSameDay(evento.dataInicio, dia));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header dos dias da semana */}
      <div className="grid grid-cols-7 border-b">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
          <div key={dia} className="p-2 text-center text-xs font-medium text-muted-foreground uppercase border-r last:border-r-0">
            {dia}
          </div>
        ))}
      </div>

      {/* Grid de dias */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr">
        {dias.map((dia, idx) => {
          const eventosDoDia = getEventosParaDia(dia);
          const dentroDoMes = isSameMonth(dia, dataAtual);
          const ehHoje = isToday(dia);

          return (
            <div
              key={idx}
              className={`
                border-r border-b last:border-r-0 p-2 overflow-hidden
                ${!dentroDoMes ? 'bg-muted/30' : ''}
                ${ehHoje ? 'bg-primary/5' : ''}
              `}
            >
              <div className={`
                text-sm font-medium mb-1
                ${!dentroDoMes ? 'text-muted-foreground' : ''}
                ${ehHoje ? 'text-primary font-bold' : ''}
              `}>
                {format(dia, 'd')}
              </div>

              <div className="space-y-1">
                {eventosDoDia.slice(0, 3).map((evento) => {
                  const cores = CORES_CATEGORIAS[evento.categoria];
                  return (
                    <div
                      key={evento.id}
                      onClick={() => onEventoClick(evento)}
                      className={`
                        ${cores.light} ${cores.textDark}
                        text-[10px] p-1 rounded cursor-pointer
                        hover:opacity-80 transition-opacity
                        truncate border-l-2 ${cores.border}
                      `}
                    >
                      {format(evento.dataInicio, 'HH:mm')} {evento.titulo}
                    </div>
                  );
                })}
                {eventosDoDia.length > 3 && (
                  <div className="text-[10px] text-muted-foreground pl-1">
                    +{eventosDoDia.length - 3} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
