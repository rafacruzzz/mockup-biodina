import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Eye, Check, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { mockNotificacoesEntrada } from "@/data/faturamentoModules";
import { NotificacaoEntrada } from "@/types/faturamento";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PainelNotificacoesEntradaProps {
  onVerDetalhes: (pedidoId: string) => void;
}

const PainelNotificacoesEntrada = ({ onVerDetalhes }: PainelNotificacoesEntradaProps) => {
  const [notificacoes, setNotificacoes] = useState<NotificacaoEntrada[]>(mockNotificacoesEntrada);
  const [filtroTab, setFiltroTab] = useState<'todos' | 'Produto' | 'Servico'>('todos');

  const notificacoesFiltradas = notificacoes.filter(notif => {
    if (filtroTab === 'todos') return true;
    return notif.tipo === filtroTab;
  });

  const naoLidas = notificacoesFiltradas.filter(n => !n.lida).length;

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Baixa':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPrioridadeIcon = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta':
        return <AlertCircle className="h-4 w-4" />;
      case 'Media':
        return <Clock className="h-4 w-4" />;
      case 'Baixa':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const marcarComoLida = (id: string) => {
    setNotificacoes(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, lida: true } : notif
      )
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Notificações</h3>
          {naoLidas > 0 && (
            <Badge variant="destructive" className="ml-2">
              {naoLidas} nova{naoLidas > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      <Tabs value={filtroTab} onValueChange={(v) => setFiltroTab(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="Produto">Produtos</TabsTrigger>
          <TabsTrigger value="Servico">Serviços</TabsTrigger>
        </TabsList>

        <TabsContent value={filtroTab} className="space-y-3">
          {notificacoesFiltradas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma notificação encontrada</p>
            </div>
          ) : (
            notificacoesFiltradas.map((notif) => (
              <Card
                key={notif.id}
                className={`p-4 transition-all ${
                  !notif.lida ? 'border-l-4 border-l-primary bg-primary/5' : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getPrioridadeColor(notif.prioridade)}>
                        {getPrioridadeIcon(notif.prioridade)}
                        <span className="ml-1">{notif.prioridade}</span>
                      </Badge>
                      <Badge variant="outline">{notif.tipo}</Badge>
                      {!notif.lida && (
                        <Badge variant="default" className="text-xs">
                          Nova
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium mb-1">{notif.mensagem}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notif.dataNotificacao, {
                        addSuffix: true,
                        locale: ptBR
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onVerDetalhes(notif.pedidoId)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    {!notif.lida && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => marcarComoLida(notif.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PainelNotificacoesEntrada;
