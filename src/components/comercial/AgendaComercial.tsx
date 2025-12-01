import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { eventosAgenda, EventoAgenda, CORES_CATEGORIAS, NOME_CATEGORIAS, CategoriaEvento } from "@/data/agendaComercial";
import { CalendarioSemanal } from "./calendario/CalendarioSemanal";
import { CalendarioDiario } from "./calendario/CalendarioDiario";
import { CalendarioMensal } from "./calendario/CalendarioMensal";
import { EventoDetalheSheet } from "./calendario/EventoDetalheSheet";
import { Checkbox } from "@/components/ui/checkbox";

type TipoVisualizacao = 'dia' | 'semana' | 'mes';

const AgendaComercial = () => {
  const [dataAtual, setDataAtual] = useState<Date>(startOfToday());
  const [visualizacao, setVisualizacao] = useState<TipoVisualizacao>('semana');
  const [eventoSelecionado, setEventoSelecionado] = useState<EventoAgenda | null>(null);
  const [sheetAberto, setSheetAberto] = useState(false);
  const [categoriasFiltro, setCategoriasFiltro] = useState<Set<CategoriaEvento>>(
    new Set(['licitacao', 'comercialInterno', 'assessoriaCientifica', 'departamentoTecnico'])
  );

  const navegarAnterior = () => {
    if (visualizacao === 'mes') {
      setDataAtual(subMonths(dataAtual, 1));
    } else if (visualizacao === 'semana') {
      setDataAtual(subWeeks(dataAtual, 1));
    } else {
      setDataAtual(subDays(dataAtual, 1));
    }
  };

  const navegarProximo = () => {
    if (visualizacao === 'mes') {
      setDataAtual(addMonths(dataAtual, 1));
    } else if (visualizacao === 'semana') {
      setDataAtual(addWeeks(dataAtual, 1));
    } else {
      setDataAtual(addDays(dataAtual, 1));
    }
  };

  const irParaHoje = () => {
    setDataAtual(startOfToday());
  };

  const getTitulo = () => {
    if (visualizacao === 'mes') {
      return format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR });
    } else if (visualizacao === 'semana') {
      return format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR });
    } else {
      return format(dataAtual, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
    }
  };

  const handleEventoClick = (evento: EventoAgenda) => {
    setEventoSelecionado(evento);
    setSheetAberto(true);
  };

  const toggleCategoria = (categoria: CategoriaEvento) => {
    const novasCategorias = new Set(categoriasFiltro);
    if (novasCategorias.has(categoria)) {
      novasCategorias.delete(categoria);
    } else {
      novasCategorias.add(categoria);
    }
    setCategoriasFiltro(novasCategorias);
  };

  const eventosFiltrados = eventosAgenda.filter(evento => 
    categoriasFiltro.has(evento.categoria)
  );

  return (
    <>
      <Card className="shadow-lg h-[600px] flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0 border-b border-gray-100">
          <div className="flex flex-col gap-4">
            {/* Linha de navegação e visualização */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={irParaHoje}
                  className="font-medium"
                >
                  Hoje
                </Button>
                <div className="flex items-center gap-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={navegarAnterior}
                    className="h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={navegarProximo}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold text-foreground capitalize">{getTitulo()}</h2>
              </div>

              <div className="flex gap-1">
                <Button
                  variant={visualizacao === 'dia' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVisualizacao('dia')}
                  className="font-medium"
                >
                  Dia
                </Button>
                <Button
                  variant={visualizacao === 'semana' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVisualizacao('semana')}
                  className="font-medium"
                >
                  Semana
                </Button>
                <Button
                  variant={visualizacao === 'mes' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVisualizacao('mes')}
                  className="font-medium"
                >
                  Mês
                </Button>
              </div>
            </div>

            {/* Filtros por categoria */}
            <div className="flex gap-2 flex-wrap">
              {(Object.entries(NOME_CATEGORIAS) as [CategoriaEvento, string][]).map(([categoria, nome]) => {
                const cores = CORES_CATEGORIAS[categoria];
                const ativo = categoriasFiltro.has(categoria);
                return (
                  <label
                    key={categoria}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer
                      transition-all border text-xs font-medium
                      ${ativo 
                        ? `${cores.bgLight} ${cores.textDark} border-current` 
                        : 'bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/50'
                      }
                    `}
                  >
                    <Checkbox
                      checked={ativo}
                      onCheckedChange={() => toggleCategoria(categoria)}
                      className="h-3.5 w-3.5"
                    />
                    <span>{nome}</span>
                    <div className={`w-2 h-2 rounded-full ${cores.bg}`} />
                  </label>
                );
              })}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          {visualizacao === 'semana' && (
            <CalendarioSemanal
              dataAtual={dataAtual}
              eventos={eventosFiltrados}
              onEventoClick={handleEventoClick}
            />
          )}
          {visualizacao === 'dia' && (
            <CalendarioDiario
              dataAtual={dataAtual}
              eventos={eventosFiltrados}
              onEventoClick={handleEventoClick}
            />
          )}
          {visualizacao === 'mes' && (
            <CalendarioMensal
              dataAtual={dataAtual}
              eventos={eventosFiltrados}
              onEventoClick={handleEventoClick}
            />
          )}
        </CardContent>
      </Card>

      <EventoDetalheSheet
        evento={eventoSelecionado}
        open={sheetAberto}
        onOpenChange={setSheetAberto}
      />
    </>
  );
};

export default AgendaComercial;
