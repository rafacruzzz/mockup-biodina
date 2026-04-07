import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ClipboardCheck } from 'lucide-react';
import { RoteiroAuditoriaModal } from './RoteiroAuditoriaModal';

export const AuditoriaInternaTab = () => {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Auditoria da Qualidade - Interna</h3>
        <Button onClick={() => setModalAberto(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Auditoria Interna
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Histórico de Auditorias Internas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhuma auditoria interna registrada. Clique em "Nova Auditoria Interna" para iniciar.
          </p>
        </CardContent>
      </Card>

      <RoteiroAuditoriaModal open={modalAberto} onOpenChange={setModalAberto} />
    </div>
  );
};
