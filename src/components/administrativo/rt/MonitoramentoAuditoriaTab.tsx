import { Card } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export const MonitoramentoAuditoriaTab = () => {
  return (
    <div className="space-y-6">
      <Card className="p-12 text-center">
        <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold mb-2">Monitoramento e Auditoria</h3>
        <p className="text-muted-foreground">
          Seção de monitoramento e auditoria de responsabilidade técnica
        </p>
      </Card>
    </div>
  );
};
