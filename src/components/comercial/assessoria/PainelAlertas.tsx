import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, UserCheck, ChevronRight } from "lucide-react";
import { Alerta, TipoAlerta } from "@/types/assessoria-cientifica";

interface PainelAlertasProps {
  alertas: Alerta[];
  onAlertaClick?: (alerta: Alerta) => void;
}

const getAlertaIcon = (tipo: TipoAlerta) => {
  switch (tipo) {
    case 'prazo':
      return <Clock className="h-4 w-4" />;
    case 'acompanhamento':
      return <UserCheck className="h-4 w-4" />;
    case 'urgente':
      return <AlertTriangle className="h-4 w-4" />;
  }
};

const getPrioridadeVariant = (prioridade: 'baixa' | 'media' | 'alta') => {
  switch (prioridade) {
    case 'baixa':
      return 'secondary';
    case 'media':
      return 'default';
    case 'alta':
      return 'destructive';
  }
};

const getPrioridadeLabel = (prioridade: 'baixa' | 'media' | 'alta') => {
  switch (prioridade) {
    case 'baixa':
      return 'Baixa';
    case 'media':
      return 'Média';
    case 'alta':
      return 'Alta';
  }
};

export function PainelAlertas({ alertas, onAlertaClick }: PainelAlertasProps) {
  if (alertas.length === 0) {
    return null;
  }

  return (
    <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Alertas do Sistema
          </CardTitle>
          <Badge variant="secondary">{alertas.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {alertas.map((alerta) => (
            <div
              key={alerta.id}
              className="flex items-center justify-between p-3 bg-background rounded-lg border hover:border-primary transition-colors cursor-pointer"
              onClick={() => onAlertaClick?.(alerta)}
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1 text-muted-foreground">
                  {getAlertaIcon(alerta.tipo)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{alerta.titulo}</p>
                    <Badge variant={getPrioridadeVariant(alerta.prioridade)} className="text-xs">
                      {getPrioridadeLabel(alerta.prioridade)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alerta.descricao}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
