import React from "react";
import IndicadoresFaturamento from "./IndicadoresFaturamento";
import AssistenteFiscalIA from "./AssistenteFiscalIA";
import RodapeFaturamento from "./RodapeFaturamento";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock de notificações
const mockNotificacoes = [
  {
    id: 1,
    tipo: 'alerta',
    titulo: 'NF-e pendente de autorização',
    descricao: 'Nota fiscal 001234 aguardando retorno SEFAZ',
    data: '2024-01-15 10:30',
  },
  {
    id: 2,
    tipo: 'info',
    titulo: 'Importação concluída',
    descricao: 'Pedido #45678 desembaraçado com sucesso',
    data: '2024-01-15 09:15',
  },
  {
    id: 3,
    tipo: 'sucesso',
    titulo: 'Faturamento realizado',
    descricao: 'NF-e 001233 autorizada pela SEFAZ',
    data: '2024-01-14 16:45',
  },
  {
    id: 4,
    tipo: 'pendente',
    titulo: 'Conferência pendente',
    descricao: 'Mercadoria aguardando conferência no estoque',
    data: '2024-01-14 14:20',
  },
];

const FaturamentoResumo = () => {
  const getNotificacaoIcon = (tipo: string) => {
    switch (tipo) {
      case 'alerta':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'sucesso':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pendente':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificacaoBadge = (tipo: string) => {
    switch (tipo) {
      case 'alerta':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Alerta</Badge>;
      case 'sucesso':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Concluído</Badge>;
      case 'pendente':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pendente</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Indicadores */}
      <IndicadoresFaturamento />

      {/* Notificações e Assistente IA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Painel de Notificações */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5" />
              Notificações
              <Badge variant="secondary" className="ml-auto">{mockNotificacoes.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockNotificacoes.map((notificacao) => (
              <div
                key={notificacao.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                {getNotificacaoIcon(notificacao.tipo)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-sm truncate">{notificacao.titulo}</p>
                    {getNotificacaoBadge(notificacao.tipo)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notificacao.descricao}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notificacao.data}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Assistente Fiscal IA */}
        <AssistenteFiscalIA />
      </div>

      {/* Rodapé com recursos e chamados */}
      <RodapeFaturamento />
    </div>
  );
};

export default FaturamentoResumo;
