import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, Upload, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Etapa4Agendamentos as Etapa4Type } from '@/types/rescisao';

interface Props {
  dados: Etapa4Type;
  onSave: (dados: Partial<Etapa4Type>) => void;
  onNext: () => void;
}

export function Etapa4Agendamentos({ dados, onSave, onNext }: Props) {
  const [formData, setFormData] = useState<Etapa4Type>(dados);

  const handleSave = () => {
    onSave(formData);
    onNext();
  };

  const updateField = (field: keyof Etapa4Type, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">4. Agendamentos e Prazos</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Alerta */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              As etapas anteriores devem ser concluídas para prosseguir com esta etapa.
            </AlertDescription>
          </Alert>

          <div className="text-center py-8">
            <p className="text-muted-foreground">Esta etapa foi reorganizada. Os campos de datas foram movidos para a Etapa 3.</p>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave} className="w-full">
              Salvar e Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}