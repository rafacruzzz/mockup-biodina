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
  // Iniciar em Janeiro de 2025 onde temos os eventos mockados
  const [dataAtual, setDataAtual] = useState<Date>(new Date(2025, 0, 22));
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
        <CardHeader className="pb-3 flex-shrink-0 space-y-4">
          <CardTitle className="flex items-center justify-center gap-3 text-xl font-bold text-biodina-blue">
            <Calendar className="h-6 w-6 text-biodina-blue" />
            Agenda Comercial
          </CardTitle>

          {/* Controles de Navegação e Visualização */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={irParaHoje}>
                Hoje
              </Button>
              <Button variant="ghost" size="icon" onClick={navegarAnterior}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={navegarProximo}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="text-base font-semibold capitalize min-w-[200px] text-center">
                {getTitulo()}
              </div>
            </div>

            <div className="flex gap-1">
              {(['dia', 'semana', 'mes'] as TipoVisualizacao[]).map((tipo) => (
                <Button
                  key={tipo}
                  variant={visualizacao === tipo ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVisualizacao(tipo)}
                  className="capitalize"
                >
                  {tipo}
                </Button>
              ))}
            </div>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap gap-3">
            {(Object.keys(CORES_CATEGORIAS) as CategoriaEvento[]).map((categoria) => {
              const cores = CORES_CATEGORIAS[categoria];
              const nome = NOME_CATEGORIAS[categoria];
              const checked = categoriasFiltro.has(categoria);

              return (
                <div key={categoria} className="flex items-center gap-2">
                  <Checkbox
                    id={categoria}
                    checked={checked}
                    onCheckedChange={() => toggleCategoria(categoria)}
                  />
                  <label
                    htmlFor={categoria}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <div className={`w-3 h-3 rounded ${cores.bg}`} />
                    {nome}
                  </label>
                </div>
              );
            })}
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
