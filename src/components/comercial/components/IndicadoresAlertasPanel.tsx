import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Clock, 
  FileText, 
  TrendingDown,
  Bell,
  CheckCircle,
  XCircle
} from "lucide-react";
import { IndicadorPedido, AlertaPedido } from "@/types/comercial";

interface IndicadoresAlertasPanelProps {
  indicadores: IndicadorPedido[];
  alertas: AlertaPedido[];
  onMarcarAlertaLido?: (index: number) => void;
}

const IndicadoresAlertasPanel = ({ 
  indicadores, 
  alertas, 
  onMarcarAlertaLido 
}: IndicadoresAlertasPanelProps) => {
  
  const getIndicadorIcon = (tipo: IndicadorPedido['tipo']) => {
    switch (tipo) {
      case 'atraso_separacao': return <Clock className="h-5 w-5" />;
      case 'prazo_excedido': return <AlertTriangle className="h-5 w-5" />;
      case 'nf_pendente': return <FileText className="h-5 w-5" />;
      case 'divergencia_quantidade': return <TrendingDown className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getIndicadorColor = (severidade: IndicadorPedido['severidade']) => {
    switch (severidade) {
      case 'baixa': return 'bg-blue-500';
      case 'media': return 'bg-yellow-500';
      case 'alta': return 'bg-orange-500';
      case 'critica': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeveridadeLabel = (severidade: IndicadorPedido['severidade']) => {
    switch (severidade) {
      case 'baixa': return 'Baixa';
      case 'media': return 'Média';
      case 'alta': return 'Alta';
      case 'critica': return 'Crítica';
      default: return severidade;
    }
  };

  const getAlertaPrioridadeVariant = (prioridade: AlertaPedido['prioridade']) => {
    switch (prioridade) {
      case 'urgente': return 'destructive';
      case 'alta': return 'default';
      case 'normal': return 'secondary';
      default: return 'secondary';
    }
  };

  const getAlertaIcon = (tipo: AlertaPedido['tipo']) => {
    switch (tipo) {
      case 'mudanca_status': return <CheckCircle className="h-4 w-4" />;
      case 'atualizacao_entrega': return <Clock className="h-4 w-4" />;
      case 'emissao_nf': return <FileText className="h-4 w-4" />;
      case 'divergencia': return <AlertTriangle className="h-4 w-4" />;
      case 'atraso': return <XCircle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  if (indicadores.length === 0 && alertas.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Indicadores */}
      {indicadores.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Indicadores Automáticos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {indicadores.map((indicador, index) => (
              <Card key={index} className="border-l-4" style={{ borderLeftColor: `hsl(var(--${getIndicadorColor(indicador.severidade)}))` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-lg ${getIndicadorColor(indicador.severidade)} text-white`}>
                      {getIndicadorIcon(indicador.tipo)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {getSeveridadeLabel(indicador.severidade)}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{indicador.mensagem}</h4>
                  {indicador.detalhes && (
                    <p className="text-xs text-muted-foreground">{indicador.detalhes}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Detectado: {new Date(indicador.dataDeteccao).toLocaleDateString('pt-BR')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Alertas */}
      {alertas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alertas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {alertas.map((alerta, index) => (
                <div 
                  key={index} 
                  className={`p-4 border rounded-lg ${alerta.lido ? 'bg-muted/30' : 'bg-background'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getAlertaIcon(alerta.tipo)}
                      <h4 className="font-semibold text-sm">{alerta.titulo}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getAlertaPrioridadeVariant(alerta.prioridade)}>
                        {alerta.prioridade === 'urgente' && '🔴 Urgente'}
                        {alerta.prioridade === 'alta' && '🟠 Alta'}
                        {alerta.prioridade === 'normal' && 'Normal'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alerta.mensagem}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {alerta.dataAlerta} às {alerta.horaAlerta}
                    </p>
                    {!alerta.lido && onMarcarAlertaLido && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => onMarcarAlertaLido(index)}
                      >
                        Marcar como lido
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IndicadoresAlertasPanel;
