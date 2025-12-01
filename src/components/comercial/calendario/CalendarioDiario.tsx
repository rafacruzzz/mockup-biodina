import { EventoAgenda } from "@/data/agendaComercial";
import { EventoCard } from "./EventoCard";
import { format, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CalendarioDiarioProps {
  dataAtual: Date;
  eventos: EventoAgenda[];
  onEventoClick: (evento: EventoAgenda) => void;
}

const HORARIOS = Array.from({ length: 12 }, (_, i) => i + 7); // 7h às 18h

export const CalendarioDiario = ({ dataAtual, eventos, onEventoClick }: CalendarioDiarioProps) => {
  const eventosDoDia = eventos.filter(evento => isSameDay(evento.dataInicio, dataAtual));

  const getEventosParaHora = (hora: number) => {
    return eventosDoDia.filter(evento => {
      const horaInicio = evento.dataInicio.getHours();
      const horaFim = evento.dataFim.getHours();
      const minutosFim = evento.dataFim.getMinutes();
      
      return horaInicio <= hora && (horaFim > hora || (horaFim === hora && minutosFim > 0));
    });
  };

  const calcularPosicaoEvento = (evento: EventoAgenda) => {
    const horaInicio = evento.dataInicio.getHours();
    const minutosInicio = evento.dataInicio.getMinutes();
    const horaFim = evento.dataFim.getHours();
    const minutosFim = evento.dataFim.getMinutes();

    const top = ((horaInicio - 7) * 60 + minutosInicio);
    const duracao = ((horaFim - horaInicio) * 60 + (minutosFim - minutosInicio));
    const height = Math.max(duracao, 30);

    return { top, height };
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-100 p-4 bg-background">
        <h3 className="text-lg font-semibold text-foreground">
          {format(dataAtual, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </h3>
      </div>

      {/* Grid de horários */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-[80px_1fr]">
          {HORARIOS.map((hora) => {
            const eventosNaHora = getEventosParaHora(hora);
            
            return (
              <div key={hora} className="contents">
                <div className="p-2 border-r border-gray-100 border-t border-gray-100 text-xs text-muted-foreground text-right font-medium h-12 flex items-start justify-end">
                  {hora}:00
                </div>
                <div className="border-r border-gray-100 border-t border-gray-100 p-1 relative h-12 transition-colors hover:bg-muted/20">
                  {eventosNaHora.map((evento, eventoIdx) => {
                    if (evento.dataInicio.getHours() !== hora) return null;

                    const { top, height } = calcularPosicaoEvento(evento);
                    const totalEventosSimultaneos = eventosNaHora.filter(e => 
                      e.dataInicio.getHours() === evento.dataInicio.getHours()
                    ).length;
                    
                    const width = totalEventosSimultaneos > 1 ? 95 / totalEventosSimultaneos : 100;
                    const left = eventoIdx * (100 / totalEventosSimultaneos);

                    return (
                      <div
                        key={evento.id}
                        style={{
                          position: 'absolute',
                          top: `${top - ((hora - 7) * 60)}px`,
                          left: `${left}%`,
                          width: `${width}%`,
                          height: `${height}px`,
                          zIndex: eventoIdx + 1,
                          paddingRight: totalEventosSimultaneos > 1 ? '2px' : '0'
                        }}
                      >
                        <EventoCard
                          evento={evento}
                          onClick={() => onEventoClick(evento)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
