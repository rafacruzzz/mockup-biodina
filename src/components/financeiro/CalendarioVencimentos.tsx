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
      <CardContent className="space-y-6">
        {vencimentosCalendario.map((vencimento) => (
          <div key={vencimento.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            {/* Cabeçalho da Data - Seguindo exatamente o design da imagem */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800 capitalize">
                {vencimento.data}
              </h3>
              <div className="text-right">
                <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <DollarSign className="h-6 w-6" />
                  {formatCurrency(vencimento.totalValor)}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {vencimento.totalContas} conta{vencimento.totalContas !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {/* Lista de Contas - Layout igual à imagem */}
            <div className="space-y-3">
              {vencimento.contas.map((conta) => (
                <div key={conta.id} className="pl-4 border-l-2 border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-medium text-gray-900">
                          {conta.descricao}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(conta.valor)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-blue-600 font-medium">
                          {conta.fornecedor}
                        </span>
                        <Badge 
                          variant="secondary"
                          className="text-xs bg-green-100 text-green-700 border-green-200 hover:bg-green-100"
                        >
                          {conta.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CalendarioVencimentos;