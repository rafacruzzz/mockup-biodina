import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Etapa4Agendamentos as Etapa4Type } from '@/types/rescisao';

interface Props {
  dados: Etapa4Type;
  onSave: (dados: Partial<Etapa4Type>) => void;
  onNext: () => void;
  canProceed: boolean;
}

export function Etapa4Agendamentos({ dados, onSave, onNext, canProceed }: Props) {
  const [formData, setFormData] = useState<Etapa4Type>(dados);

  const handleSave = () => {
    const isComplete = !!(formData.homologacao.data && formData.homologacao.local && formData.homologacao.horario);
    onSave({ ...formData, concluida: isComplete });
    if (isComplete) {
      onNext();
    }
  };

  const updateField = (field: keyof Etapa4Type, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateHomologacao = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      homologacao: { ...prev.homologacao, [field]: value }
    }));
  };

  const isFormValid = formData.homologacao.data && formData.homologacao.local && formData.homologacao.horario;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">4. Agendamentos e Prazos</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {!canProceed && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                As etapas 1 e 2 devem estar totalmente completas para liberar o preenchimento desta etapa.
              </AlertDescription>
            </Alert>
          )}

          {/* Data do Pagamento da Rescisão */}
          <div className="space-y-2">
            <Label htmlFor="dataPagamentoRescisao">Data do pagamento da Rescisão</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dataPagamentoRescisao && "text-muted-foreground"
                  )}
                  disabled={!canProceed}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dataPagamentoRescisao 
                    ? format(new Date(formData.dataPagamentoRescisao), "PPP", { locale: ptBR })
                    : "Selecione a data"
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dataPagamentoRescisao ? new Date(formData.dataPagamentoRescisao) : undefined}
                  onSelect={(date) => updateField('dataPagamentoRescisao', date ? date.toISOString() : '')}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Data do Pagamento da Guia FGTS */}
          <div className="space-y-2">
            <Label htmlFor="dataPagamentoFGTS">Data de pagamento da guia FGTS</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dataPagamentoFGTS && "text-muted-foreground"
                  )}
                  disabled={!canProceed}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dataPagamentoFGTS 
                    ? format(new Date(formData.dataPagamentoFGTS), "PPP", { locale: ptBR })
                    : "Selecione a data"
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dataPagamentoFGTS ? new Date(formData.dataPagamentoFGTS) : undefined}
                  onSelect={(date) => updateField('dataPagamentoFGTS', date ? date.toISOString() : '')}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Homologação */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Homologação</h3>
            
            {/* Data da Homologação */}
            <div className="space-y-2">
              <Label htmlFor="homologacaoData">Data da homologação</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.homologacao.data && "text-muted-foreground"
                    )}
                    disabled={!canProceed}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.homologacao.data 
                      ? format(new Date(formData.homologacao.data), "PPP", { locale: ptBR })
                      : "Selecione a data"
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.homologacao.data ? new Date(formData.homologacao.data) : undefined}
                    onSelect={(date) => updateHomologacao('data', date ? date.toISOString() : '')}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Local da Homologação */}
            <div className="space-y-2">
              <Label htmlFor="homologacaoLocal">Local da homologação</Label>
              <Input
                id="homologacaoLocal"
                value={formData.homologacao.local}
                onChange={(e) => updateHomologacao('local', e.target.value)}
                placeholder="Digite o local da homologação"
                disabled={!canProceed}
              />
            </div>

            {/* Horário da Homologação */}
            <div className="space-y-2">
              <Label htmlFor="homologacaoHorario">Horário da homologação</Label>
              <Input
                id="homologacaoHorario"
                type="time"
                value={formData.homologacao.horario}
                onChange={(e) => updateHomologacao('horario', e.target.value)}
                disabled={!canProceed}
              />
            </div>
          </div>

          {!isFormValid && canProceed && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Preencha todos os dados de homologação (data, local e horário) para avançar para a próxima etapa.
              </AlertDescription>
            </Alert>
          )}

          <div className="pt-4">
            <Button 
              onClick={handleSave} 
              className="w-full"
              disabled={!canProceed}
            >
              {isFormValid ? "Salvar e Continuar" : "Salvar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}