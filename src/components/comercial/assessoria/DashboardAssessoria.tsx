import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react";
import { OrdemServico, FiltrosAgenda, StatusOS, DepartamentoOS } from "@/types/assessoria-cientifica";
import { ordensServicoMock, getTipoOSIcon, getTipoOSLabel, getStatusColor, alertasMock } from "@/data/assessoria-cientifica";
import { FiltrosAgendaOS } from "./FiltrosAgendaOS";
import { DetalhesOSSheet } from "./DetalhesOSSheet";
import { PainelAlertas } from "./PainelAlertas";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardAssessoriaProps {
  onNavigateToOS?: (filtroStatus?: StatusOS[]) => void;
}

const DashboardAssessoria = ({ onNavigateToOS }: DashboardAssessoriaProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedOS, setSelectedOS] = useState<OrdemServico | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosAgenda>({
    departamentos: ["Assessoria Científica", "Departamento Técnico"],
    assessores: [],
    clientes: [],
    status: []
  });

  const handleOSClick = (os: OrdemServico) => {
    setSelectedOS(os);
    setIsSheetOpen(true);
  };

  const handleAlertaClick = (osIds?: string[]) => {
    // Quando um alerta for clicado, navega para a aba OS com filtro
    if (onNavigateToOS) {
      onNavigateToOS(['URGENTE', 'ABERTA']);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const getMonthName = () => {
    return currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  // Aplicar filtros às OSs
  const aplicarFiltros = (os: OrdemServico): boolean => {
    if (filtros.departamentos.length > 0 && !filtros.departamentos.includes(os.departamento)) {
      return false;
    }
    if (filtros.assessores.length > 0 && !filtros.assessores.includes(os.responsavel)) {
      return false;
    }
    if (filtros.clientes.length > 0 && !filtros.clientes.includes(os.cliente)) {
      return false;
    }
    if (filtros.status.length > 0 && !filtros.status.includes(os.status)) {
      return false;
    }
    return true;
  };

  // Função para gerar a grade do calendário
  const generateCalendarGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const calendarDays = [];
    
    // Adicionar dias do mês anterior
    const prevMonth = new Date(year, month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      calendarDays.push({
        day,
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        ordensServico: []
      });
    }
    
    // Adicionar dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const ordensServico = ordensServicoMock.filter(os => {
        const osDate = new Date(os.dataAgendada);
        return osDate.getDate() === day && 
               osDate.getMonth() === month && 
               osDate.getFullYear() === year &&
               aplicarFiltros(os);
      });
      
      calendarDays.push({
        day,
        date,
        isCurrentMonth: true,
        ordensServico
      });
    }
    
    // Adicionar dias do próximo mês
    const remainingDays = 42 - calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
      calendarDays.push({
        day,
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        ordensServico: []
      });
    }
    
    return calendarDays;
  };

  const calendarDays = generateCalendarGrid();
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Contar eventos filtrados no mês atual
  const totalEventosNoMes = calendarDays
    .filter(day => day.isCurrentMonth)
    .reduce((total, day) => total + day.ordensServico.length, 0);

  return (
    <TooltipProvider>
      {/* Painel de Alertas */}
      <PainelAlertas 
        alertas={alertasMock}
        onAlertaClick={handleAlertaClick}
      />

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Agenda de Ordens de Serviço
              </CardTitle>
              <Badge variant="secondary" className="text-sm">
                {totalEventosNoMes} eventos este mês
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={prevMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold min-w-48 text-center capitalize">
                {getMonthName()}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={nextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                className="ml-4"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova OS
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {/* Filtros */}
          <FiltrosAgendaOS filtros={filtros} onFiltrosChange={setFiltros} />
          
          {/* Cabeçalho com dias da semana */}
          <div className="grid grid-cols-7 gap-1 mb-2 mt-4">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Grade do calendário */}
          <div className="grid grid-cols-7 gap-1 transition-opacity duration-300">
            {calendarDays.map((calendarDay, index) => (
              <div
                key={index}
                className={`min-h-[120px] border rounded-lg p-2 transition-all duration-300 ${
                  calendarDay.isCurrentMonth 
                    ? 'bg-background border-border hover:bg-accent/5' 
                    : 'bg-muted/30 border-muted text-muted-foreground'
                }`}
              >
                {/* Número do dia */}
                <div className={`text-sm font-medium mb-1 ${
                  calendarDay.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {calendarDay.day}
                </div>
                
                {/* Ordens de Serviço do dia */}
                <div className="space-y-1">
                  {calendarDay.ordensServico.map((os) => {
                    const statusColor = getStatusColor(os.status);
                    return (
                      <Tooltip key={os.id}>
                        <TooltipTrigger asChild>
                          <div
                            className="text-xs p-2 rounded border cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                            style={{
                              backgroundColor: statusColor.bg,
                              borderColor: statusColor.border
                            }}
                            onClick={() => handleOSClick(os)}
                          >
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <span className="font-medium truncate flex-1" title={`${os.cliente} - ${getTipoOSLabel(os.tipo)}`}>
                                {getTipoOSIcon(os.tipo)} {os.cliente}
                              </span>
                              <Badge 
                                variant="outline" 
                                className="text-[10px] px-1 py-0 h-4"
                                style={{ 
                                  borderColor: statusColor.border,
                                  color: statusColor.text
                                }}
                              >
                                {os.status === 'EM_ANDAMENTO' ? 'ANDAMENTO' : os.status}
                              </Badge>
                            </div>
                            <div className="text-[10px] text-muted-foreground truncate" title={getTipoOSLabel(os.tipo)}>
                              {getTipoOSLabel(os.tipo)}
                            </div>
                            <div className="text-[10px] text-muted-foreground truncate mt-1" title={os.responsavel}>
                              👤 {os.responsavel}
                            </div>
                            <div className="text-[10px] text-muted-foreground truncate" title={os.departamento}>
                              🏢 {os.departamento === 'Assessoria Científica' ? 'AS' : 'DT'}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="space-y-1">
                            <p className="font-semibold">OS: {os.numero}</p>
                            <p className="text-xs">Equip: {os.equipamento || 'N/A'}</p>
                            <p className="text-xs">Status: {os.status === 'EM_ANDAMENTO' ? 'Em Andamento' : os.status}</p>
                            <p className="text-xs text-muted-foreground">Clique para ver detalhes completos</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sheet de Detalhes */}
      {selectedOS && (
        <DetalhesOSSheet
          os={selectedOS}
          isOpen={isSheetOpen}
          onClose={() => {
            setIsSheetOpen(false);
            setSelectedOS(null);
          }}
        />
      )}
    </TooltipProvider>
  );
};

export default DashboardAssessoria;
