import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, AlertCircle, Network, XCircle, ArrowRight } from "lucide-react";
import type { SolicitacaoInterfaceamento } from "@/types/ti";

interface InterfaceamentoStatusWidgetProps {
  solicitacoes: SolicitacaoInterfaceamento[];
  oportunidadeId: string;
}

const InterfaceamentoStatusWidget = ({ solicitacoes, oportunidadeId }: InterfaceamentoStatusWidgetProps) => {
  const getStatusInfo = (status: SolicitacaoInterfaceamento['status']) => {
    const statusMap = {
      aguardando_aprovacao: {
        label: "Aguardando Aprovação",
        icon: Clock,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 border-yellow-200",
        progress: 10
      },
      aprovado: {
        label: "Aprovado",
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50 border-green-200",
        progress: 25
      },
      em_analise: {
        label: "Em Análise",
        icon: AlertCircle,
        color: "text-blue-600", 
        bgColor: "bg-blue-50 border-blue-200",
        progress: 40
      },
      em_desenvolvimento: {
        label: "Em Desenvolvimento",
        icon: Network,
        color: "text-purple-600",
        bgColor: "bg-purple-50 border-purple-200",
        progress: 70
      },
      concluido: {
        label: "Concluído",
        icon: CheckCircle,
        color: "text-green-800",
        bgColor: "bg-green-100 border-green-300",
        progress: 100
      },
      cancelado: {
        label: "Cancelado", 
        icon: XCircle,
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200",
        progress: 0
      }
    };
    return statusMap[status];
  };

  const getOverallProgress = () => {
    if (solicitacoes.length === 0) return 0;
    
    const totalProgress = solicitacoes.reduce((sum, sol) => {
      const statusInfo = getStatusInfo(sol.status);
      return sum + statusInfo.progress;
    }, 0);
    
    return Math.round(totalProgress / solicitacoes.length);
  };

  const getStatusCounts = () => {
    const counts = {
      total: solicitacoes.length,
      aguardando: solicitacoes.filter(s => s.status === 'aguardando_aprovacao').length,
      em_andamento: solicitacoes.filter(s => ['aprovado', 'em_analise', 'em_desenvolvimento'].includes(s.status)).length,
      concluido: solicitacoes.filter(s => s.status === 'concluido').length,
      cancelado: solicitacoes.filter(s => s.status === 'cancelado').length,
    };
    return counts;
  };

  const getCurrentStatus = () => {
    // Priority: concluido > em_desenvolvimento > em_analise > aprovado > aguardando_aprovacao > cancelado
    const priorityOrder: SolicitacaoInterfaceamento['status'][] = [
      'concluido',
      'em_desenvolvimento', 
      'em_analise',
      'aprovado',
      'aguardando_aprovacao',
      'cancelado'
    ];

    for (const status of priorityOrder) {
      if (solicitacoes.some(s => s.status === status)) {
        return status;
      }
    }
    return 'aguardando_aprovacao';
  };

  const overallProgress = getOverallProgress();
  const statusCounts = getStatusCounts();
  const currentStatus = getCurrentStatus();
  const statusInfo = getStatusInfo(currentStatus);
  const StatusIcon = statusInfo.icon;

  if (solicitacoes.length === 0) return null;

  return (
    <Card className={`border-l-4 border-l-primary ${statusInfo.bgColor}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-3">
          <Network className="h-5 w-5 text-primary" />
          Status do Interfaceamento
          <Badge variant="secondary" className="ml-auto">
            {statusCounts.total} solicitaç{statusCounts.total === 1 ? 'ão' : 'ões'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Principal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusIcon className={`h-6 w-6 ${statusInfo.color}`} />
            <div>
              <p className="font-medium text-foreground">{statusInfo.label}</p>
              <p className="text-sm text-muted-foreground">
                Status atual do interfaceamento
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">
              {overallProgress}%
            </div>
            <p className="text-xs text-muted-foreground">Progresso</p>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso Geral</span>
            <span className="font-medium">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Resumo de Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {statusCounts.aguardando > 0 && (
            <div className="text-center p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="text-lg font-bold text-yellow-700">{statusCounts.aguardando}</div>
              <div className="text-xs text-yellow-600">Aguardando</div>
            </div>
          )}
          
          {statusCounts.em_andamento > 0 && (
            <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-lg font-bold text-blue-700">{statusCounts.em_andamento}</div>
              <div className="text-xs text-blue-600">Em Andamento</div>
            </div>
          )}

          {statusCounts.concluido > 0 && (
            <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="text-lg font-bold text-green-700">{statusCounts.concluido}</div>
              <div className="text-xs text-green-600">Concluído</div>
            </div>
          )}

          {statusCounts.cancelado > 0 && (
            <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200">
              <div className="text-lg font-bold text-red-700">{statusCounts.cancelado}</div>
              <div className="text-xs text-red-600">Cancelado</div>
            </div>
          )}
        </div>

        {/* Última Atualização */}
        {solicitacoes.length > 0 && (
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Última atualização:</span>
              <span>
                {new Date(
                  Math.max(...solicitacoes.map(s => new Date(s.dataUltimaAtualizacao).getTime()))
                ).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit', 
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        )}

        {/* Timeline Preview */}
        <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
          <span>Solicitação</span>
          <ArrowRight className="h-3 w-3" />
          <span>Análise TI</span> 
          <ArrowRight className="h-3 w-3" />
          <span>Desenvolvimento</span>
          <ArrowRight className="h-3 w-3" />
          <span>Conclusão</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterfaceamentoStatusWidget;