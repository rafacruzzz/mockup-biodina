import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Etapa2AcoesImediatas as Etapa2Type } from '@/types/rescisao';

interface Props {
  dados: Etapa2Type;
  onSave: (dados: Partial<Etapa2Type>) => void;
  onNext: () => void;
}

export function Etapa2AcoesImediatas({ dados, onSave, onNext }: Props) {
  const [formData, setFormData] = useState<Etapa2Type>(dados);

  const handleSave = () => {
    onSave(formData);
    onNext();
  };

  const updateChecklistItem = (index: number, field: string, value: any) => {
    const newChecklist = [...formData.checklist];
    newChecklist[index] = { ...newChecklist[index], [field]: value };
    setFormData(prev => ({ ...prev, checklist: newChecklist }));
  };

  const updateObservacoes = (value: string) => {
    setFormData(prev => ({ ...prev, observacoes: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">2. Ações Imediatas</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Checklist de Ações</Label>
            <p className="text-sm text-muted-foreground">
              Marque cada item conforme for sendo concluído e informe a data e responsável.
            </p>

            <div className="space-y-4">
              {formData.checklist.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={item.concluido}
                      onCheckedChange={(checked) => 
                        updateChecklistItem(index, 'concluido', checked)
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{item.item}</p>
                    </div>
                  </div>
                  
                  {item.concluido && (
                    <div className="grid grid-cols-2 gap-3 ml-6">
                      <div className="space-y-1">
                        <Label className="text-xs">Data de Conclusão</Label>
                        <Input
                          type="date"
                          value={item.dataConclusao || ''}
                          onChange={(e) => updateChecklistItem(index, 'dataConclusao', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Responsável pelo Preenchimento</Label>
                        <Input
                          value={item.responsavel || ''}
                          onChange={(e) => updateChecklistItem(index, 'responsavel', e.target.value)}
                          placeholder="Nome do responsável"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="observacoes" className="text-base font-medium">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => updateObservacoes(e.target.value)}
              placeholder="Adicione observações importantes sobre as ações realizadas..."
              className="min-h-[100px]"
            />
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