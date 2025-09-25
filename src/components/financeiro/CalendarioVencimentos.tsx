import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar, DollarSign } from "lucide-react";

// Mock data seguindo exatamente o design da imagem enviada
const vencimentosCalendario = [
  {
    id: 1,
    data: "sexta-feira, 24 de janeiro",
    dataObj: new Date(2025, 0, 24),
    contas: [
      {
        id: "CP-001",
        descricao: "Aquisição de materiais - Projeto Alpha",
        valor: 15000.00,
        fornecedor: "Distribuidora ABC Ltda",
        status: "normal"
      }
    ],
    totalValor: 15000.00,
    totalContas: 1
  },
  {
    id: 2,
    data: "quarta-feira, 29 de janeiro", 
    dataObj: new Date(2025, 0, 29),
    contas: [
      {
        id: "CP-002",
        descricao: "Passagem aérea - Projeto Beta",
        valor: 2800.00,
        fornecedor: "Agência de Viagens",
        status: "normal"
      }
    ],
    totalValor: 2800.00,
    totalContas: 1
  },
  {
    id: 3,
    data: "terça-feira, 4 de fevereiro",
    dataObj: new Date(2025, 1, 4),
    contas: [
      {
        id: "CP-003", 
        descricao: "Aluguel - Galpão Produção",
        valor: 12000.00,
        fornecedor: "Imobiliária XYZ Ltda",
        status: "normal"
      }
    ],
    totalValor: 12000.00,
    totalContas: 1
  },
  {
    id: 4,
    data: "domingo, 9 de fevereiro",
    dataObj: new Date(2025, 1, 9),
    contas: [
      {
        id: "CP-004",
        descricao: "Telecomunicações - Pacote Completo",
        valor: 1200.00,
        fornecedor: "TelecomBR",
        status: "normal"
      }
    ],
    totalValor: 1200.00,
    totalContas: 1
  }
];

const CalendarioVencimentos = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
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

  // Função para gerar a grade do calendário
  const generateCalendarGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);
    
    // Dia da semana do primeiro dia (0-6, domingo = 0)
    const startingDayOfWeek = firstDay.getDay();
    // Quantos dias tem o mês
    const daysInMonth = lastDay.getDate();
    
    const calendarDays = [];
    
    // Adicionar dias do mês anterior para completar a primeira semana
    const prevMonth = new Date(year, month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      calendarDays.push({
        day,
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        vencimentos: []
      });
    }
    
    // Adicionar dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const vencimentos = vencimentosCalendario.filter(v => 
        v.dataObj.getDate() === day && 
        v.dataObj.getMonth() === month && 
        v.dataObj.getFullYear() === year
      );
      
      calendarDays.push({
        day,
        date,
        isCurrentMonth: true,
        vencimentos
      });
    }
    
    // Adicionar dias do próximo mês para completar a grade
    const remainingDays = 42 - calendarDays.length; // 6 semanas * 7 dias
    for (let day = 1; day <= remainingDays; day++) {
      calendarDays.push({
        day,
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        vencimentos: []
      });
    }
    
    return calendarDays;
  };

  const calendarDays = generateCalendarGrid();
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendário de Vencimentos
          </CardTitle>
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Cabeçalho com dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Grade do calendário */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((calendarDay, index) => (
            <div
              key={index}
              className={`min-h-[120px] border rounded-lg p-2 ${
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
              
              {/* Vencimentos do dia */}
              <div className="space-y-1">
                {calendarDay.vencimentos.slice(0, 3).map((vencimento) => (
                  <div key={vencimento.id} className="space-y-1">
                    {vencimento.contas.map((conta) => (
                      <div
                        key={conta.id}
                        className="text-xs bg-primary/10 border border-primary/20 rounded p-1.5 hover:bg-primary/20 cursor-pointer transition-colors"
                      >
                        <div className="font-medium text-primary truncate" title={conta.descricao}>
                          {conta.descricao.length > 20 ? conta.descricao.substring(0, 20) + '...' : conta.descricao}
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="font-semibold text-foreground text-[10px]">
                            {formatCurrency(conta.valor)}
                          </span>
                          <Badge 
                            variant={conta.status === 'normal' ? 'secondary' : 'outline'}
                            className={`text-[9px] px-1 py-0 h-4 ${
                              conta.status === 'normal' 
                                ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-100' 
                                : conta.status === 'vencido'
                                ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-100'
                                : 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100'
                            }`}
                          >
                            {conta.status === 'normal' ? 'OK' : conta.status === 'vencido' ? 'Venc.' : 'Pend.'}
                          </Badge>
                        </div>
                        <div className="text-[9px] text-muted-foreground truncate mt-0.5" title={conta.fornecedor}>
                          {conta.fornecedor.length > 15 ? conta.fornecedor.substring(0, 15) + '...' : conta.fornecedor}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                
                {/* Indicador de mais vencimentos */}
                {calendarDay.vencimentos.length > 3 && (
                  <div className="text-[10px] text-muted-foreground text-center py-1">
                    +{calendarDay.vencimentos.length - 3} mais...
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarioVencimentos;