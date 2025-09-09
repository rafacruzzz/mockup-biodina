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
              As etapas 1 e 2 devem ser concluídas para prosseguir com os agendamentos.
            </AlertDescription>
          </Alert>

          {/* Datas do Processo */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Datas do Processo</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="solicitacao-dp">Solicitação ao DP</Label>
                <Input
                  id="solicitacao-dp"
                  type="date"
                  value={formData.solicitacaoDP}
                  onChange={(e) => updateField('solicitacaoDP', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conclusao-dp">Conclusão do DP</Label>
                <Input
                  id="conclusao-dp"
                  type="date"
                  value={formData.conclusaoDP}
                  onChange={(e) => updateField('conclusaoDP', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="data-limite">Data Limite para Pagamento (Rescisão e Guia FGTS)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Bell className="h-4 w-4 text-amber-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Alerta será gerado 3 dias corridos antes do vencimento</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="data-limite"
                  type="date"
                  value={formData.dataLimitePagamento}
                  onChange={(e) => updateField('dataLimitePagamento', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Upload de Comprovantes */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Upload de Comprovantes</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Anexar comprovantes de quitação (recibos, termo de devolução, etc.)
                </p>
                <Input 
                  type="file" 
                  multiple 
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="max-w-xs mx-auto"
                />
              </div>
            </div>
            
            {/* Lista de arquivos anexados */}
            {formData.comprovantesAnexados && formData.comprovantesAnexados.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm">Arquivos Anexados:</Label>
                <div className="space-y-1">
                  {formData.comprovantesAnexados.map((arquivo, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <span className="text-sm">{arquivo.name}</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => {
                          const novosArquivos = formData.comprovantesAnexados.filter((_, i) => i !== index);
                          updateField('comprovantesAnexados', novosArquivos);
                        }}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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