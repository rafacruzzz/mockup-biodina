import { EventoAgenda } from "@/data/agendaComercial";
import { EventoCard } from "./EventoCard";
import { format, startOfWeek, addDays, isSameDay, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";

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
    <div className="flex flex-col h-full">
      {/* Header dos dias */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-100 sticky top-0 bg-background z-10">
        <div className="p-3 border-r border-gray-100"></div>
        {diasSemana.map((dia, idx) => {
          const ehHoje = isToday(dia);
          return (
            <div
              key={idx}
              className={`p-3 text-center border-r border-gray-100 last:border-r-0 ${
                ehHoje ? 'bg-primary/5' : ''
              }`}
            >
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                {format(dia, 'EEE', { locale: ptBR })}
              </div>
              <div className={`text-xl font-semibold mt-1 ${
                ehHoje ? 'text-primary' : 'text-foreground'
              }`}>
                {format(dia, 'd')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid de horários */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-[80px_repeat(7,1fr)]">
          {HORARIOS.map((hora) => (
            <React.Fragment key={hora}>
              <div className="p-2 border-r border-gray-100 border-t border-gray-100 text-xs text-muted-foreground text-right font-medium h-12 flex items-start justify-end">
                {hora}:00
              </div>
              {diasSemana.map((dia, diaIdx) => {
                const eventosNaHora = getEventosParaDiaEHora(dia, hora);
                const ehHoje = isToday(dia);
                
                return (
                  <div
                    key={`${hora}-${diaIdx}`}
                    className={`border-r border-gray-100 border-t border-gray-100 last:border-r-0 p-1 relative h-12 transition-colors hover:bg-muted/20 ${
                      ehHoje ? 'bg-primary/[0.02]' : ''
                    }`}
                  >
                    {eventosNaHora.map((evento, eventoIdx) => {
                      if (evento.dataInicio.getHours() !== hora) return null;

                      const { top, height } = calcularPosicaoEvento(evento);
                      const totalEventosSimultaneos = eventosNaHora.filter(e => 
                        e.dataInicio.getHours() === evento.dataInicio.getHours()
                      ).length;
                      
                      const width = totalEventosSimultaneos > 1 ? 95 / totalEventosSimultaneos : 100;
                      const left = totalEventosSimultaneos > 1 ? 
                        (eventosNaHora.filter(e => 
                          e.dataInicio.getHours() === evento.dataInicio.getHours()
                        ).indexOf(evento) * (100 / totalEventosSimultaneos)) : 0;

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
                            paddingRight: '2px'
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
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
