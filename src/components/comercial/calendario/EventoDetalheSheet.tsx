import { EventoAgenda, CORES_CATEGORIAS, NOME_CATEGORIAS } from "@/data/agendaComercial";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Target, Tag } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EventoDetalheSheetProps {
  evento: EventoAgenda | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EventoDetalheSheet = ({ evento, open, onOpenChange }: EventoDetalheSheetProps) => {
  if (!evento) return null;

  const cores = CORES_CATEGORIAS[evento.categoria];
  const nomeCategoria = NOME_CATEGORIAS[evento.categoria];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${cores.bg}`} />
            {evento.titulo}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {/* Categoria */}
          <div className="flex items-start gap-3">
            <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Categoria
              </div>
              <Badge className={`${cores.bg} ${cores.text}`}>
                {nomeCategoria}
              </Badge>
            </div>
          </div>

          {/* Data */}
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Data
              </div>
              <div className="text-sm">
                {format(evento.dataInicio, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </div>
            </div>
          </div>

          {/* Horário */}
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Horário
              </div>
              <div className="text-sm">
                {format(evento.dataInicio, 'HH:mm')} - {format(evento.dataFim, 'HH:mm')}
              </div>
            </div>
          </div>

          {/* Projeto */}
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Projeto/Objeto
              </div>
              <div className="text-sm">
                {evento.projeto}
              </div>
            </div>
          </div>

          {/* Colaborador */}
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Colaborador Responsável
              </div>
              <div className="text-sm">
                {evento.colaborador}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 mt-0.5" /> {/* Spacer */}
            <div className="flex-1">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Status
              </div>
              <Badge className={`${evento.statusColor} text-white`}>
                {evento.status}
              </Badge>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
