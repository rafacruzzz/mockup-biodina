import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Calendar, DollarSign, CalendarIcon, Building2 } from "lucide-react";
import { ContaPagar } from "@/types/financeiro";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import DetalhesContaModal from "./DetalhesContaModal";

interface CalendarContaItem {
  contaId: string;
  conta: ContaPagar;
  parcelaIndex?: number; // undefined = pagamento único
  descricao: string;
  valor: number;
  dataVencimento: Date;
  parcelaLabel?: string; // "Parcela 1 de 3"
}

interface CalendarioVencimentosProps {
  contasSalvas?: ContaPagar[];
  onUpdateConta?: (contaId: string, updates: Partial<ContaPagar>) => void;
}

// Mock data fallback
const mockContas: ContaPagar[] = [
  {
    id: 'mock-001',
    empresaId: 'biodina-001',
    numero: 'CP-001',
    tipo: 'compra' as any,
    departamentoSolicitante: 'Comercial',
    vincularA: 'projeto',
    projetoCliente: 'Projeto Alpha - Cliente XYZ',
    fornecedor: 'Distribuidora ABC Ltda',
    descricao: 'Aquisição de materiais - Projeto Alpha',
    valor: 30000,
    dataVencimento: new Date(2025, 8, 3),
    formaPagamentoSugerida: 'boleto' as any,
    status: 'pendente' as any,
    createdAt: new Date(),
    pagamentoEfetuado: false,
    tipoPagamento: 'parcelado',
    numeroParcelas: 2,
    parcelas: [
      { numero: 1, dataVencimento: new Date(2025, 8, 3), valor: 15000 },
      { numero: 2, dataVencimento: new Date(2025, 9, 3), valor: 15000 },
    ],
    anexos: ['boleto_001.pdf', 'nota_fiscal_001.pdf'],
  },
  {
    id: 'mock-002',
    empresaId: 'biodina-001',
    numero: 'CP-002',
    tipo: 'outros' as any,
    departamentoSolicitante: 'RH',
    vincularA: 'departamento',
    departamento: 'RH',
    fornecedor: 'Instituto Profissionalizante',
    descricao: 'Curso capacitação técnica - RH',
    valor: 3200,
    dataVencimento: new Date(2025, 8, 6),
    formaPagamentoSugerida: 'pix' as any,
    status: 'pendente' as any,
    createdAt: new Date(),
    pagamentoEfetuado: false,
    tipoPagamento: 'unico',
  },
  {
    id: 'mock-003',
    empresaId: 'biodina-001',
    numero: 'CP-003',
    tipo: 'passagem' as any,
    departamentoSolicitante: 'Comercial',
    vincularA: 'projeto',
    projetoCliente: 'Projeto Beta',
    fornecedor: 'Agência de Viagens',
    descricao: 'Passagem aérea - Projeto Beta',
    valor: 2800,
    dataVencimento: new Date(2025, 8, 9),
    formaPagamentoSugerida: 'cartao_credito' as any,
    status: 'programado' as any,
    createdAt: new Date(),
    pagamentoEfetuado: true,
    tipoPagamento: 'unico',
    bancoPagamento: 'Banco do Brasil',
    agenciaPagamento: '1234',
    contaPagamento: '56789-0',
  },
  {
    id: 'mock-004',
    empresaId: 'biodina-001',
    numero: 'CP-004',
    tipo: 'outros' as any,
    departamentoSolicitante: 'TI',
    vincularA: 'departamento',
    departamento: 'TI',
    fornecedor: 'Microsoft Brasil',
    descricao: 'Licenças Office 365 - TI',
    valor: 1500,
    dataVencimento: new Date(2025, 8, 9),
    formaPagamentoSugerida: 'debito_automatico' as any,
    status: 'programado' as any,
    createdAt: new Date(),
    pagamentoEfetuado: false,
    tipoPagamento: 'unico',
  },
  {
    id: 'mock-005',
    empresaId: 'biodina-001',
    numero: 'CP-005',
    tipo: 'outros' as any,
    departamentoSolicitante: 'Produção',
    vincularA: 'departamento',
    departamento: 'Produção',
    fornecedor: 'TecnoMec Manutenção',
    descricao: 'Manutenção equipamento A1 - Produção',
    valor: 4500,
    dataVencimento: new Date(2025, 8, 12),
    formaPagamentoSugerida: 'boleto' as any,
    status: 'vencido' as any,
    createdAt: new Date(),
    pagamentoEfetuado: false,
    tipoPagamento: 'unico',
    anexos: ['orcamento_manutencao.pdf'],
  },
];

const CalendarioVencimentos = ({ contasSalvas, onUpdateConta }: CalendarioVencimentosProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedContaDetalhes, setSelectedContaDetalhes] = useState<ContaPagar | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contas = contasSalvas && contasSalvas.length > 0 ? contasSalvas : mockContas;

  // Flatten contas into calendar items (one per parcela or one per conta única)
  const calendarItems = useMemo(() => {
    const items: CalendarContaItem[] = [];
    contas.forEach(conta => {
      if (conta.tipoPagamento === 'parcelado' && conta.parcelas && conta.parcelas.length > 0) {
        conta.parcelas.forEach((parcela, idx) => {
          items.push({
            contaId: conta.id,
            conta,
            parcelaIndex: idx,
            descricao: conta.descricao,
            valor: parcela.valor,
            dataVencimento: new Date(parcela.dataVencimento),
            parcelaLabel: `Parcela ${parcela.numero} de ${conta.numeroParcelas || conta.parcelas!.length}`,
          });
        });
      } else {
        items.push({
          contaId: conta.id,
          conta,
          descricao: conta.descricao,
          valor: conta.valor,
          dataVencimento: new Date(conta.dataVencimento),
        });
      }
    });
    return items;
  }, [contas]);

  const handleContaClick = (item: CalendarContaItem) => {
    setSelectedContaDetalhes(item.conta);
    setIsModalOpen(true);
  };

  const handlePagoNaData = (contaId: string, pago: boolean) => {
    if (onUpdateConta) {
      onUpdateConta(contaId, {
        pagamentoEfetuado: pago,
        dataPagamentoEfetuado: pago ? new Date() : undefined,
      });
    }
  };

  const handleDataPagamento = (contaId: string, date: Date | undefined) => {
    if (onUpdateConta && date) {
      onUpdateConta(contaId, { dataPagamentoEfetuado: date });
    }
  };

  const handleBancoChange = (contaId: string, field: 'bancoPagamento' | 'agenciaPagamento' | 'contaPagamento', value: string) => {
    if (onUpdateConta) {
      onUpdateConta(contaId, { [field]: value });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const getMonthName = () => currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const getStatusColor = (conta: ContaPagar) => {
    if (conta.pagamentoEfetuado) return { bg: 'hsl(var(--chart-2) / 0.1)', border: 'hsl(var(--chart-2) / 0.3)' };
    if (conta.status === 'vencido') return { bg: 'hsl(var(--destructive) / 0.1)', border: 'hsl(var(--destructive) / 0.3)' };
    return { bg: 'hsl(var(--primary) / 0.1)', border: 'hsl(var(--primary) / 0.3)' };
  };

  const getStatusBadge = (conta: ContaPagar) => {
    if (conta.pagamentoEfetuado) return { label: 'PAGO', className: 'bg-green-100 text-green-700 border-green-200' };
    if (conta.status === 'vencido') return { label: 'VENC', className: 'bg-red-100 text-red-700 border-red-200' };
    if (conta.status === 'programado') return { label: 'PROG', className: 'bg-blue-100 text-blue-700 border-blue-200' };
    return { label: 'PEN', className: 'bg-orange-100 text-orange-700 border-orange-200' };
  };

  const generateCalendarGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const calendarDays: { day: number; date: Date; isCurrentMonth: boolean; items: CalendarContaItem[] }[] = [];

    const prev = new Date(year, month - 1, 0);
    const daysInPrevMonth = prev.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      calendarDays.push({ day, date: new Date(year, month - 1, day), isCurrentMonth: false, items: [] });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayItems = calendarItems.filter(item => {
        const d = item.dataVencimento;
        return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
      });
      calendarDays.push({ day, date, isCurrentMonth: true, items: dayItems });
    }

    const remainingDays = 42 - calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
      calendarDays.push({ day, date: new Date(year, month + 1, day), isCurrentMonth: false, items: [] });
    }
    return calendarDays;
  };

  const calendarDays = generateCalendarGrid();
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Inline controls for a specific conta (shown in popover)
  const InlineControls = ({ item }: { item: CalendarContaItem }) => {
    const conta = item.conta;
    const colors = getStatusColor(conta);
    const badge = getStatusBadge(conta);
    
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="text-xs rounded p-1.5 cursor-pointer transition-colors border hover:shadow-sm"
            style={{ backgroundColor: colors.bg, borderColor: colors.border }}
          >
            <div className="font-medium truncate text-foreground text-[10px]" title={item.descricao}>
              {item.descricao.length > 18 ? item.descricao.substring(0, 18) + '...' : item.descricao}
            </div>
            {item.parcelaLabel && (
              <div className="text-[8px] font-semibold text-primary">{item.parcelaLabel}</div>
            )}
            {(item.conta as any).isRecorrente && (
              <div className="text-[8px] font-semibold text-purple-600">Recorrente</div>
            )}
            <div className="flex items-center justify-between mt-0.5">
              <span className="font-semibold text-foreground text-[10px]">{formatCurrency(item.valor)}</span>
              <Badge variant="outline" className={`text-[8px] px-1 py-0 h-3 ${badge.className}`}>
                {badge.label}
              </Badge>
            </div>
            <div className="text-[8px] text-muted-foreground truncate mt-0.5">
              {conta.fornecedor.length > 15 ? conta.fornecedor.substring(0, 15) + '...' : conta.fornecedor}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 z-50" align="start" side="right">
          <div className="space-y-3">
            {/* Header */}
            <div>
              <h4 className="font-semibold text-sm">{conta.descricao}</h4>
              <p className="text-xs text-muted-foreground">{conta.fornecedor} • {conta.numero}</p>
              {item.parcelaLabel && (
                <Badge variant="outline" className="text-xs mt-1 text-primary border-primary">{item.parcelaLabel}</Badge>
              )}
              {(conta as any).isRecorrente && (
                <Badge variant="outline" className="text-xs mt-1 ml-1 border-purple-400 text-purple-600 bg-purple-50">Recorrente</Badge>
              )}
              <p className="text-sm font-bold mt-1">{formatCurrency(item.valor)}</p>
            </div>

            {/* Anexos link */}
            {conta.anexos && conta.anexos.length > 0 && (
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Anexos ({conta.anexos.length})</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto text-xs"
                  onClick={(e) => { e.stopPropagation(); handleContaClick(item); }}
                >
                  Ver documentos anexados →
                </Button>
              </div>
            )}

            {/* Pago na data */}
            <div className="flex items-center gap-2">
              <Switch
                checked={conta.pagamentoEfetuado}
                onCheckedChange={(checked) => handlePagoNaData(conta.id, checked)}
              />
              <Label className="text-xs">Pago na data</Label>
            </div>

            {/* Data do pagamento (se não pago na data) */}
            {!conta.pagamentoEfetuado && (
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Data do pagamento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("w-full justify-start text-left text-xs h-8", !conta.dataPagamentoEfetuado && "text-muted-foreground")}
                    >
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {conta.dataPagamentoEfetuado ? format(new Date(conta.dataPagamentoEfetuado), "dd/MM/yyyy") : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[60]" align="start">
                    <CalendarPicker
                      mode="single"
                      selected={conta.dataPagamentoEfetuado ? new Date(conta.dataPagamentoEfetuado) : undefined}
                      onSelect={(date) => handleDataPagamento(conta.id, date)}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Dados bancários */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Building2 className="h-3 w-3" /> Dados bancários do pagamento
              </Label>
              <Input
                placeholder="Banco"
                className="h-7 text-xs"
                value={conta.bancoPagamento || ''}
                onChange={(e) => handleBancoChange(conta.id, 'bancoPagamento', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Agência"
                  className="h-7 text-xs"
                  value={conta.agenciaPagamento || ''}
                  onChange={(e) => handleBancoChange(conta.id, 'agenciaPagamento', e.target.value)}
                />
                <Input
                  placeholder="Conta"
                  className="h-7 text-xs"
                  value={conta.contaPagamento || ''}
                  onChange={(e) => handleBancoChange(conta.id, 'contaPagamento', e.target.value)}
                />
              </div>
            </div>

            {/* Botão ver detalhes completos */}
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={(e) => { e.stopPropagation(); handleContaClick(item); }}
            >
              Ver detalhes completos
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendário de Vencimentos
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold min-w-48 text-center capitalize">{getMonthName()}</span>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">{day}</div>
          ))}
        </div>

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
              <div className={`text-sm font-medium mb-1 ${calendarDay.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}`}>
                {calendarDay.day}
                {calendarDay.items.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-[8px] px-1 py-0 h-3">
                    {calendarDay.items.length}
                  </Badge>
                )}
              </div>

              <div className="space-y-1">
                {calendarDay.items.slice(0, 3).map((item, idx) => (
                  <InlineControls key={`${item.contaId}-${item.parcelaIndex ?? 'u'}-${idx}`} item={item} />
                ))}
                {calendarDay.items.length > 3 && (
                  <div className="text-[10px] text-muted-foreground text-center py-1">
                    +{calendarDay.items.length - 3} mais...
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
        conta={selectedContaDetalhes}
      />
    </Card>
  );
};

export default CalendarioVencimentos;
