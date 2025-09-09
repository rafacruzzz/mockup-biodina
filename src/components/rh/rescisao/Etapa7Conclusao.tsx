import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, FileArchive } from 'lucide-react';
import { Etapa7Conclusao as Etapa7Type } from '@/types/rescisao';

interface Props {
  dados: Etapa7Type;
  onSave: (dados: Partial<Etapa7Type>) => void;
  onArchive: () => void;
}

export function Etapa7Conclusao({ dados, onSave, onArchive }: Props) {
  const [formData, setFormData] = useState<Etapa7Type>(dados);
  const [assinaturaGestor, setAssinaturaGestor] = useState(false);

  const handleArchive = () => {
    const dadosFinais = {
      ...formData,
      assinaturaGestor: 'Assinado digitalmente',
      arquivado: true,
      concluida: true
    };
    
    onSave(dadosFinais);
    onArchive();
  };

  const updateField = (field: keyof Etapa7Type, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canArchive = formData.redistribuicaoTarefas.trim().length > 0 && assinaturaGestor;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-semibold">7. Conclusão</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Esta etapa só é acessível após a confirmação final da etapa 6.
            </AlertDescription>
          </Alert>

          {/* Campo Obrigatório - Redistribuição de Tarefas */}
          <div className="space-y-3">
            <Label htmlFor="redistribuicao" className="text-base font-medium">
              Indicação de como será redistribuída a tarefa daquele funcionário que saiu *
            </Label>
            <Textarea
              id="redistribuicao"
              value={formData.redistribuicaoTarefas}
              onChange={(e) => updateField('redistribuicaoTarefas', e.target.value)}
              placeholder="Descreva detalhadamente como as responsabilidades e tarefas do colaborador desligado serão redistribuídas entre a equipe ou se será necessária nova contratação..."
              className="min-h-[120px]"
              required
            />
            <p className="text-sm text-muted-foreground">
              * Campo obrigatório para prosseguir
            </p>
          </div>

          {/* Assinatura do Gestor */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Assinatura do Gestor Imediato</Label>
            
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              {!assinaturaGestor ? (
                <div className="space-y-3">
                  <div className="text-muted-foreground">
                    <FileArchive className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">
                      Clique para confirmar a assinatura digital do gestor imediato
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setAssinaturaGestor(true)}
                    disabled={formData.redistribuicaoTarefas.trim().length === 0}
                  >
                    Assinar Digitalmente
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Assinado digitalmente pelo gestor</span>
                </div>
              )}
            </div>
          </div>

          {/* Resumo Final */}
          {canArchive && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Todas as etapas foram concluídas com sucesso. O processo está pronto para ser arquivado.
              </AlertDescription>
            </Alert>
          )}

          {/* Botão Final */}
          <div className="pt-4">
            <Button 
              onClick={handleArchive}
              disabled={!canArchive}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <FileArchive className="h-4 w-4 mr-2" />
              Arquivar Processo de Rescisão
            </Button>
            
            {!canArchive && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                Complete todos os campos obrigatórios e obtenha a assinatura do gestor para arquivar o processo.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}