import { EventoAgenda } from "@/data/agendaComercial";
import { EventoCard } from "./EventoCard";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CalendarioSemanalProps {
  dataAtual: Date;
  eventos: EventoAgenda[];
  onEventoClick: (evento: EventoAgenda) => void;
}

const HORARIOS = Array.from({ length: 12 }, (_, i) => i + 7); // 7h às 18h

export const CalendarioSemanal = ({ dataAtual, eventos, onEventoClick }: CalendarioSemanalProps) => {
  const inicioSemana = startOfWeek(dataAtual, { weekStartsOn: 0 });
  const diasSemana = Array.from({ length: 7 }, (_, i) => addDays(inicioSemana, i));

  const getEventosParaDiaEHora = (dia: Date, hora: number) => {
    return eventos.filter(evento => {
      const horaInicio = evento.dataInicio.getHours();
      const horaFim = evento.dataFim.getHours();
      const minutosFim = evento.dataFim.getMinutes();
      
      return isSameDay(evento.dataInicio, dia) && 
             horaInicio <= hora && 
             (horaFim > hora || (horaFim === hora && minutosFim > 0));
    });
  };

  const calcularPosicaoEvento = (evento: EventoAgenda) => {
    const horaInicio = evento.dataInicio.getHours();
    const minutosInicio = evento.dataInicio.getMinutes();
    const horaFim = evento.dataFim.getHours();
    const minutosFim = evento.dataFim.getMinutes();

    const top = ((horaInicio - 7) * 60 + minutosInicio);
    const duracao = ((horaFim - horaInicio) * 60 + (minutosFim - minutosInicio));
    const height = Math.max(duracao, 30); // Altura mínima de 30px

    return { top, height };
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header dos dias */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b sticky top-0 bg-background z-10">
        <div className="p-2 text-xs font-medium text-muted-foreground">Hora</div>
        {diasSemana.map((dia, idx) => (
          <div key={idx} className="p-2 text-center border-l">
            <div className="text-xs font-medium text-muted-foreground uppercase">
              {format(dia, 'EEE', { locale: ptBR })}
            </div>
            <div className={`text-lg font-bold ${isSameDay(dia, new Date()) ? 'text-primary' : ''}`}>
              {format(dia, 'd')}
            </div>
          </div>
        ))}
      </div>

      {/* Grid de horários */}
      <div className="relative flex-1">
        <div className="grid grid-cols-[60px_repeat(7,1fr)]">
          {HORARIOS.map((hora) => (
            <div key={hora} className="contents">
              {/* Coluna de horário */}
              <div className="p-2 text-xs text-muted-foreground border-t">
                {hora.toString().padStart(2, '0')}:00
              </div>

              {/* Células de cada dia */}
              {diasSemana.map((dia, diaIdx) => {
                const eventosNaHora = getEventosParaDiaEHora(dia, hora);
                
                return (
                  <div
                    key={`${hora}-${diaIdx}`}
                    className="border-l border-t relative"
                    style={{ minHeight: '60px' }}
                  >
                    {/* Renderizar eventos que começam nesta hora */}
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
                            padding: '2px'
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
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
