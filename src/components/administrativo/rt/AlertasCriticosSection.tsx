import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, AlertTriangle, Bell, CheckCircle } from 'lucide-react';
import { AlertaRT } from '@/types/rt';
import { useState } from 'react';

interface AlertasCriticosSectionProps {
  alertas: AlertaRT[];
}

export const AlertasCriticosSection = ({ alertas }: AlertasCriticosSectionProps) => {
  const [alertasState, setAlertasState] = useState(alertas);

  const getIconeAlerta = (tipo: AlertaRT['tipo']) => {
    switch (tipo) {
      case 'nc_critica':
        return <AlertCircle className="h-5 w-5" />;
      case 'capa_atrasado':
        return <AlertTriangle className="h-5 w-5" />;
      case 'limite_nc_mensal':
        return <Bell className="h-5 w-5" />;
      case 'insatisfacao_cliente':
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getPrioridadeBadge = (prioridade: AlertaRT['prioridade']) => {
    switch (prioridade) {
      case 'critica':
        return <Badge variant="destructive" className="animate-pulse">Crítica</Badge>;
      case 'alta':
        return <Badge variant="destructive">Alta</Badge>;
      case 'media':
        return <Badge className="bg-warning text-warning-foreground">Média</Badge>;
    }
  };

  const marcarComoLido = (id: string) => {
    setAlertasState(prev => 
      prev.map(a => a.id === id ? { ...a, lido: true } : a)
    );
  };

  const alertasNaoLidos = alertasState.filter(a => !a.lido).length;

  // Agrupar alertas por tipo
  const alertasPorTipo = {
    nc_critica: alertasState.filter(a => a.tipo === 'nc_critica'),
    capa_atrasado: alertasState.filter(a => a.tipo === 'capa_atrasado'),
    limite_nc_mensal: alertasState.filter(a => a.tipo === 'limite_nc_mensal'),
    insatisfacao_cliente: alertasState.filter(a => a.tipo === 'insatisfacao_cliente')
  };

  const getResumoTipo = (tipo: AlertaRT['tipo']) => {
    const alertasTipo = alertasPorTipo[tipo];
    if (alertasTipo.length === 0) return null;

    const titulosTipo = {
      nc_critica: 'NCs Críticas',
      capa_atrasado: 'CAPAs Atrasados',
      limite_nc_mensal: 'Limite de NCs',
      insatisfacao_cliente: 'Insatisfação Cliente'
    };

    return (
      <Card key={tipo} className="border-l-4 border-l-destructive">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-destructive mt-1">
              {getIconeAlerta(tipo)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{titulosTipo[tipo]}</h4>
                <Badge variant="secondary">{alertasTipo.length}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {alertasTipo[0].mensagem}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alertas Críticos
            </CardTitle>
            {alertasNaoLidos > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {alertasNaoLidos} {alertasNaoLidos === 1 ? 'novo' : 'novos'}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {alertasState.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-success" />
              <p>Nenhum alerta crítico no momento</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Cards resumidos por tipo */}
              <div className="grid gap-3 md:grid-cols-2">
                {(['nc_critica', 'capa_atrasado', 'limite_nc_mensal', 'insatisfacao_cliente'] as const).map(tipo => 
                  getResumoTipo(tipo)
                )}
              </div>

              {/* Lista completa de alertas */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Todos os Alertas</h4>
                <div className="space-y-2">
                  {alertasState.map(alerta => (
                    <div
                      key={alerta.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        alerta.lido ? 'bg-muted/50 opacity-60' : 'bg-background'
                      }`}
                    >
                      <div className={alerta.prioridade === 'critica' ? 'text-destructive' : 'text-warning'}>
                        {getIconeAlerta(alerta.tipo)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h5 className="font-medium text-sm">{alerta.titulo}</h5>
                          {getPrioridadeBadge(alerta.prioridade)}
                        </div>
                        <p className="text-sm text-muted-foreground">{alerta.mensagem}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(alerta.dataCriacao).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      {!alerta.lido && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => marcarComoLido(alerta.id)}
                        >
                          Marcar como lido
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
