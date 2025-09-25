// Componente de calendário para visualização de vencimentos

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, DollarSign } from 'lucide-react';
import { mockCalendarioItens } from '@/data/contasPagarData';
import { URGENCIA_COLORS } from '@/types/financeiro';

const CalendarioVencimentos = () => {
  const [mesAtual, setMesAtual] = useState(new Date());

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendário de Vencimentos
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">
              {mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockCalendarioItens.map((item) => (
            <Card key={item.data.toISOString()} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-lg">
                      {item.data.toLocaleDateString('pt-BR', { 
                        day: 'numeric', 
                        month: 'long',
                        weekday: 'long'
                      })}
                    </div>
                    <div className="space-y-2 mt-3">
                      {item.contas.map((conta) => (
                        <div key={conta.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium text-sm">{conta.nome}</div>
                            <div className="text-xs text-muted-foreground">{conta.fornecedor}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatCurrency(conta.valor)}</div>
                            <Badge className={URGENCIA_COLORS[conta.urgencia]} variant="outline">
                              {conta.urgencia}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-bold text-primary">
                      <DollarSign className="h-5 w-5" />
                      {formatCurrency(item.totalValor)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.contas.length} conta{item.contas.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarioVencimentos;