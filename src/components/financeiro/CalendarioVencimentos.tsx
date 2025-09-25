import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar, DollarSign } from "lucide-react";
import DetalhesContaModal from "./DetalhesContaModal";

// Mock data enriquecido com exemplos de diferentes setores e tipos de solicitação
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
        status: "normal",
        tipo: "suprimentos",
        origem: "Chamado Comercial #CH-2025-045",
        setor: "Comercial",
        solicitante: "João Oliveira",
        detalhes: {
          projeto: "Projeto Alpha - Cliente XYZ Corp",
          justificativa: "Materiais necessários para conclusão da fase 2 do projeto",
          urgencia: "Alta - impacta cronograma de entrega",
          aprovacao: "Aguardando aprovação do gestor comercial"
        }
      }
    ],
    totalValor: 15000.00,
    totalContas: 1
  },
  {
    id: 2,
    data: "terça-feira, 28 de janeiro", 
    dataObj: new Date(2025, 0, 28),
    contas: [
      {
        id: "CP-002",
        descricao: "Curso capacitação técnica - RH",
        valor: 3200.00,
        fornecedor: "Instituto Profissionalizante",
        status: "normal",
        tipo: "treinamento",
        origem: "Solicitação Interna RH",
        setor: "Recursos Humanos",
        solicitante: "Maria Silva",
        detalhes: {
          beneficiados: "5 colaboradores da produção",
          justificativa: "Atualização em novas tecnologias de processo",
          periodo: "3 dias - 10 a 12 de fevereiro",
          local: "Presencial - São Paulo"
        }
      }
    ],
    totalValor: 3200.00,
    totalContas: 1
  },
  {
    id: 3,
    data: "quarta-feira, 29 de janeiro",
    dataObj: new Date(2025, 0, 29),
    contas: [
      {
        id: "CP-003",
        descricao: "Passagem aérea - Projeto Beta",
        valor: 2800.00,
        fornecedor: "Agência de Viagens",
        status: "aprovado",
        tipo: "passagem",
        origem: "Chamado Comercial #CH-2025-051",
        setor: "Comercial",
        solicitante: "Ana Santos",
        detalhes: {
          destino: "Rio de Janeiro - Reunião com cliente",
          periodo: "02 a 04 de fevereiro",
          projeto: "Projeto Beta - Expansão Sul",
          aprovacao: "Aprovado pelo gestor comercial e financeiro"
        }
      },
      {
        id: "CP-004",
        descricao: "Licenças Office 365 - TI",
        valor: 1500.00,
        fornecedor: "Microsoft Brasil",
        status: "recorrente",
        tipo: "software",
        origem: "Conta Recorrente",
        setor: "Tecnologia da Informação",
        solicitante: "Pedro Costa",
        detalhes: {
          usuarios: "25 licenças mensais",
          renovacao: "Automática",
          categoria: "Software essencial",
          proximoVencimento: "29 de fevereiro"
        }
      }
    ],
    totalValor: 4300.00,
    totalContas: 2
  },
  {
    id: 4,
    data: "domingo, 2 de fevereiro",
    dataObj: new Date(2025, 1, 2),
    contas: [
      {
        id: "CP-005",
        descricao: "Manutenção equipamento A1 - Produção",
        valor: 4500.00,
        fornecedor: "TecnoMec Manutenção",
        status: "urgente",
        tipo: "manutencao",
        origem: "Chamado Técnico #CH-2025-038",
        setor: "Produção",
        solicitante: "Carlos Mendes",
        detalhes: {
          equipamento: "Linha de produção A1",
          problema: "Falha no sistema hidráulico",
          impacto: "Parada total da linha - perdas diárias de R$ 25.000",
          prazo: "Manutenção emergencial - 48h máximo"
        }
      }
    ],
    totalValor: 4500.00,
    totalContas: 1
  },
  {
    id: 5,
    data: "terça-feira, 4 de fevereiro",
    dataObj: new Date(2025, 1, 4),
    contas: [
      {
        id: "CP-006",
        descricao: "Aluguel - Galpão Produção",
        valor: 12000.00,
        fornecedor: "Imobiliária XYZ Ltda",
        status: "recorrente",
        tipo: "aluguel",
        origem: "Conta Recorrente",
        setor: "Administração",
        solicitante: "Sistema Automático",
        detalhes: {
          contrato: "Aluguel galpão principal",
          area: "2.500m² - Zona Industrial",
          vigencia: "Contrato até dezembro/2025",
          reajuste: "Próximo reajuste: julho/2025"
        }
      }
    ],
    totalValor: 12000.00,
    totalContas: 1
  },
  {
    id: 6,
    data: "quinta-feira, 6 de fevereiro",
    dataObj: new Date(2025, 1, 6),
    contas: [
      {
        id: "CP-007",
        descricao: "Auditoria ISO 9001 - Qualidade",
        valor: 8500.00,
        fornecedor: "QualityCert Consultoria",
        status: "normal",
        tipo: "consultoria",
        origem: "Solicitação Qualidade",
        setor: "Qualidade",
        solicitante: "Regina Oliveira",
        detalhes: {
          servico: "Auditoria para renovação ISO 9001",
          prazo: "15 dias - inclui relatório final",
          importancia: "Certificação obrigatória para manter contratos",
          historico: "Última auditoria: fevereiro/2023"
        }
      },
      {
        id: "CP-008",
        descricao: "Material promocional - Marketing",
        valor: 2800.00,
        fornecedor: "Gráfica Digital Plus",
        status: "normal",
        tipo: "marketing",
        origem: "Chamado Comercial #CH-2025-053",
        setor: "Comercial",
        solicitante: "Lucia Fernandes",
        detalhes: {
          evento: "Feira Industrial São Paulo",
          itens: "Banners, folders, brindes personalizados",
          prazo: "Entrega até 15 de fevereiro",
          aprovacao: "Aguardando aprovação da arte final"
        }
      }
    ],
    totalValor: 11300.00,
    totalContas: 2
  },
  {
    id: 7,
    data: "domingo, 9 de fevereiro",
    dataObj: new Date(2025, 1, 9),
    contas: [
      {
        id: "CP-009",
        descricao: "Telecomunicações - Pacote Completo",
        valor: 1200.00,
        fornecedor: "TelecomBR",
        status: "recorrente",
        tipo: "telecom",
        origem: "Conta Recorrente",
        setor: "Administração",
        solicitante: "Sistema Automático",
        detalhes: {
          servicos: "Internet, telefonia fixa e móvel",
          plano: "Empresarial 500MB + 20 linhas móveis",
          vencimento: "Todo dia 9",
          contrato: "Vigente até agosto/2025"
        }
      }
    ],
    totalValor: 1200.00,
    totalContas: 1
  },
  {
    id: 8,
    data: "quarta-feira, 12 de fevereiro",
    dataObj: new Date(2025, 1, 12),
    contas: [
      {
        id: "CP-010",
        descricao: "Assessoria jurídica - Contratos",
        valor: 5500.00,
        fornecedor: "Advocacia Silva & Associados",
        status: "normal",
        tipo: "juridico",
        origem: "Solicitação Diretoria",
        setor: "Jurídico",
        solicitante: "Director Executivo",
        detalhes: {
          servico: "Revisão de contratos comerciais complexos",
          quantidade: "5 contratos de grande porte",
          prazo: "20 dias úteis",
          importancia: "Contratos acima de R$ 500mil cada"
        }
      }
    ],
    totalValor: 5500.00,
    totalContas: 1
  },
  {
    id: 9,
    data: "sexta-feira, 14 de fevereiro",
    dataObj: new Date(2025, 1, 14),
    contas: [
      {
        id: "CP-011",
        descricao: "Combustível frota - Logística",
        valor: 3200.00,
        fornecedor: "Posto Rodoviário Ltda",
        status: "normal",
        tipo: "combustivel",
        origem: "Solicitação Logística",
        setor: "Logística",
        solicitante: "Roberto Lima",
        detalhes: {
          finalidade: "Abastecimento frota de entregas",
          periodo: "Quinzena 01-15 de fevereiro",
          veiculos: "8 veículos de entrega",
          controle: "Cartão combustível com limite mensal"
        }
      },
      {
        id: "CP-012",
        descricao: "Hospedagem equipe - Projeto Gamma",
        valor: 1800.00,
        fornecedor: "Hotel Business Center",
        status: "aprovado",
        tipo: "hospedagem",
        origem: "Chamado Comercial #CH-2025-061",
        setor: "Comercial",
        solicitante: "Fernando Souza",
        detalhes: {
          destino: "Belo Horizonte - Instalação equipamentos",
          periodo: "3 diárias - 18 a 20 de fevereiro",
          equipe: "2 técnicos + 1 supervisor",
          projeto: "Projeto Gamma - Cliente MG Solutions"
        }
      }
    ],
    totalValor: 5000.00,
    totalContas: 2
  }
];

const CalendarioVencimentos = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedConta, setSelectedConta] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContaClick = (conta: any) => {
    setSelectedConta(conta);
    setIsModalOpen(true);
  };

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

  // Funções para estilização das contas
  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'suprimentos': return '📦';
      case 'passagem': return '✈️';
      case 'hospedagem': return '🏨';
      case 'treinamento': return '🎓';
      case 'software': return '💻';
      case 'manutencao': return '🔧';
      case 'aluguel': return '🏢';
      case 'consultoria': return '👥';
      case 'marketing': return '📢';
      case 'telecom': return '📞';
      case 'juridico': return '⚖️';
      case 'combustivel': return '⛽';
      default: return '📄';
    }
  };

  const getContaBackgroundColor = (status: string, tipo: string) => {
    if (status === 'urgente') return 'hsl(var(--destructive) / 0.1)';
    if (status === 'aprovado') return 'hsl(var(--chart-2) / 0.1)';
    if (status === 'recorrente') return 'hsl(var(--chart-3) / 0.1)';
    return 'hsl(var(--primary) / 0.1)';
  };

  const getContaBorderColor = (status: string, tipo: string) => {
    if (status === 'urgente') return 'hsl(var(--destructive) / 0.3)';
    if (status === 'aprovado') return 'hsl(var(--chart-2) / 0.3)';
    if (status === 'recorrente') return 'hsl(var(--chart-3) / 0.3)';
    return 'hsl(var(--primary) / 0.3)';
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'urgente': return 'bg-red-100 text-red-700 border-red-200';
      case 'aprovado': return 'bg-green-100 text-green-700 border-green-200';
      case 'recorrente': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'urgente': return 'URG';
      case 'aprovado': return 'APR';
      case 'recorrente': return 'REC';
      default: return 'PEN';
    }
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
                        className="text-xs rounded p-1.5 cursor-pointer transition-colors border hover:shadow-sm"
                        style={{
                          backgroundColor: getContaBackgroundColor(conta.status, conta.tipo),
                          borderColor: getContaBorderColor(conta.status, conta.tipo)
                        }}
                        onClick={() => handleContaClick(conta)}
                      >
                        <div className="flex items-start gap-1 mb-1">
                          <span className="text-xs">{getTipoIcon(conta.tipo)}</span>
                          <div className="font-medium truncate text-foreground" title={conta.descricao}>
                            {conta.descricao.length > 18 ? conta.descricao.substring(0, 18) + '...' : conta.descricao}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="font-semibold text-foreground text-[10px]">
                            {formatCurrency(conta.valor)}
                          </span>
                          <Badge 
                            variant="outline"
                            className={`text-[8px] px-1 py-0 h-3 ${getStatusBadgeStyle(conta.status)}`}
                          >
                            {getStatusLabel(conta.status)}
                          </Badge>
                        </div>
                        <div className="text-[8px] text-muted-foreground truncate mt-0.5" title={conta.setor}>
                          {conta.setor} • {conta.fornecedor.length > 12 ? conta.fornecedor.substring(0, 12) + '...' : conta.fornecedor}
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

      <DetalhesContaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        conta={selectedConta}
      />
    </Card>
  );
};

export default CalendarioVencimentos;