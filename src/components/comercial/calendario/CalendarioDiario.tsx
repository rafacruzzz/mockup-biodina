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
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="border-b sticky top-0 bg-background z-10 p-4">
        <div className="text-center">
          <div className="text-sm text-muted-foreground uppercase">
            {format(dataAtual, 'EEEE', { locale: ptBR })}
          </div>
          <div className="text-2xl font-bold">
            {format(dataAtual, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </div>
        </div>
      </div>

      {/* Grid de horários */}
      <div className="relative flex-1">
        <div className="grid grid-cols-[80px_1fr]">
          {HORARIOS.map((hora) => {
            const eventosNaHora = getEventosParaHora(hora);
            
            return (
              <div key={hora} className="contents">
                {/* Coluna de horário */}
                <div className="p-3 text-sm text-muted-foreground border-t text-right pr-4">
                  {hora.toString().padStart(2, '0')}:00
                </div>

                {/* Coluna de eventos */}
                <div
                  className="border-l border-t relative"
                  style={{ minHeight: '60px' }}
                >
                  {eventosNaHora.map((evento, eventoIdx) => {
                    // Só renderizar se o evento começa nesta hora
                    if (evento.dataInicio.getHours() !== hora) return null;

                    const { top, height } = calcularPosicaoEvento(evento);
                    const totalEventosSimultaneos = eventosNaHora.filter(e => 
                      e.dataInicio.getHours() === evento.dataInicio.getHours()
                    ).length;
                    
                    const width = totalEventosSimultaneos > 1 ? 100 / totalEventosSimultaneos : 100;
                    const left = totalEventosSimultaneos > 1 ? 
                      (eventosNaHora.filter(e => 
                        e.dataInicio.getHours() === evento.dataInicio.getHours()
                      ).indexOf(evento) * width) : 0;

                    return (
                      <div
                        key={evento.id}
                        style={{
                          position: 'absolute',
                          top: `${top - ((hora - 7) * 60)}px`,
                          left: `${left}%`,
                          width: `${width}%`,
                          height: `${height}px`,
                          zIndex: 1,
                          padding: '4px'
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
