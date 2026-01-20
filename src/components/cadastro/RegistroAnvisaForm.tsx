import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, AlertCircle, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { RegistroAnvisa, assuntosProdutosSaude, assuntosDiagnosticoInVitro } from '@/types/anvisa';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDraft } from '@/hooks/useDraft';
import { DraftIndicator, DraftSaveButton } from '@/components/cadastro/DraftIndicator';

interface RegistroAnvisaFormProps {
  onSubmit: (registro: RegistroAnvisa) => void;
  onCancel: () => void;
  initialData?: RegistroAnvisa | null;
}

export const RegistroAnvisaForm = ({ onSubmit, onCancel, initialData }: RegistroAnvisaFormProps) => {
  const [formData, setFormData] = useState<RegistroAnvisa>({
    areaAnvisa: 'produtos_saude',
    nomeProduto: '',
    referencia: '',
    processo: '',
    assunto: '',
    breveDescricao: '',
    transacao: '',
    expediente: '',
    dataEnvio: '',
    status: 'enviado'
  });

  const [showInstrucaoAlert, setShowInstrucaoAlert] = useState(false);

  // Hook de rascunho
  const { 
    hasDraft, 
    draftInfo, 
    saveDraft, 
    loadDraft, 
    discardDraft, 
    clearDraftOnSave 
  } = useDraft<RegistroAnvisa>({
    moduleName: 'cadastro',
    entityType: 'registro_anvisa',
    expirationDays: 7
  });

  const handleRestoreDraft = () => {
    const draftData = loadDraft();
    if (draftData) {
      setFormData(draftData);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    // Show alert when DOU publication is filled
    if (formData.publicacaoData && formData.publicacaoNumero && !showInstrucaoAlert) {
      setShowInstrucaoAlert(true);
      toast({
        title: "Atenção!",
        description: "Publicação no DOU preenchida. Lembre-se de disponibilizar as instruções de uso.",
        variant: "default"
      });
    }
  }, [formData.publicacaoData, formData.publicacaoNumero, showInstrucaoAlert]);

  const handleInputChange = (field: keyof RegistroAnvisa, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.nomeProduto || !formData.processo || !formData.assunto || !formData.dataEnvio) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Determine status based on filled fields
    let status = 'enviado';
    if (formData.instrucaoDataEnvio) {
      status = 'instruções_disponibilizadas';
    } else if (formData.publicacaoData) {
      status = 'publicado';
    }

    clearDraftOnSave();
    onSubmit({
      ...formData,
      status: status as any,
      updatedAt: new Date().toISOString()
    });
  };

  const isFormEmpty = !formData.nomeProduto && !formData.processo;

  const getAssuntosOptions = () => {
    return formData.areaAnvisa === 'produtos_saude' ? assuntosProdutosSaude : assuntosDiagnosticoInVitro;
  };

  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Draft Indicator */}
      {hasDraft && !initialData && (
        <DraftIndicator
          hasDraft={hasDraft}
          draftInfo={draftInfo}
          onRestore={handleRestoreDraft}
          onDiscard={discardDraft}
        />
      )}

      {/* Registro/Notificação */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Registro/Notificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="areaAnvisa">Área da ANVISA *</Label>
              <Select value={formData.areaAnvisa} onValueChange={(value) => handleInputChange('areaAnvisa', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="produtos_saude">Produtos para Saúde (Correlatos)</SelectItem>
                  <SelectItem value="diagnostico_in_vitro">Produtos para diagnóstico de uso in vitro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomeProduto">Nome do produto *</Label>
              <Input
                id="nomeProduto"
                value={formData.nomeProduto}
                onChange={(e) => handleInputChange('nomeProduto', e.target.value)}
                placeholder="Digite o nome do produto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="referencia">Referência</Label>
              <Input
                id="referencia"
                value={formData.referencia}
                onChange={(e) => handleInputChange('referencia', e.target.value)}
                placeholder="Digite a referência"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="processo">Processo *</Label>
              <Input
                id="processo"
                value={formData.processo}
                onChange={(e) => handleInputChange('processo', e.target.value)}
                placeholder="Digite o número do processo"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="assunto">Assunto *</Label>
              <Select value={formData.assunto} onValueChange={(value) => handleInputChange('assunto', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o assunto" />
                </SelectTrigger>
                <SelectContent>
                  {getAssuntosOptions().map((assunto) => (
                    <SelectItem key={assunto.value} value={assunto.value}>
                      {assunto.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="breveDescricao">Breve descrição sobre o motivo do peticionamento</Label>
              <Textarea
                id="breveDescricao"
                value={formData.breveDescricao}
                onChange={(e) => handleInputChange('breveDescricao', e.target.value)}
                placeholder="Descreva o motivo do peticionamento"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transacao">Transação</Label>
              <Input
                id="transacao"
                value={formData.transacao}
                onChange={(e) => handleInputChange('transacao', e.target.value)}
                placeholder="Digite a transação"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expediente">Expediente</Label>
              <Input
                id="expediente"
                value={formData.expediente}
                onChange={(e) => handleInputChange('expediente', e.target.value)}
                placeholder="Digite o expediente"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="dataEnvio">Data de envio *</Label>
              <Input
                id="dataEnvio"
                type="date"
                value={formatDateForInput(formData.dataEnvio)}
                onChange={(e) => handleInputChange('dataEnvio', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publicação no DOU */}
      <Card>
        <CardHeader>
          <CardTitle>📰 Publicação no DOU</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publicacaoData">Data</Label>
              <Input
                id="publicacaoData"
                type="date"
                value={formatDateForInput(formData.publicacaoData)}
                onChange={(e) => handleInputChange('publicacaoData', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicacaoNumero">Número</Label>
              <Input
                id="publicacaoNumero"
                value={formData.publicacaoNumero || ''}
                onChange={(e) => handleInputChange('publicacaoNumero', e.target.value)}
                placeholder="Digite o número da publicação"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="publicacaoObservacao">Observação</Label>
              <Textarea
                id="publicacaoObservacao"
                value={formData.publicacaoObservacao || ''}
                onChange={(e) => handleInputChange('publicacaoObservacao', e.target.value)}
                placeholder="Digite observações sobre a publicação"
                rows={2}
              />
            </div>
          </div>

          {showInstrucaoAlert && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Publicação no DOU preenchida! Lembre-se de disponibilizar as instruções de uso na seção abaixo.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Disponibilização das instruções de uso */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Disponibilização das Instruções de Uso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instrucaoAssunto">Assunto</Label>
              <Input
                id="instrucaoAssunto"
                value={formData.instrucaoAssunto || ''}
                onChange={(e) => handleInputChange('instrucaoAssunto', e.target.value)}
                placeholder="Digite o assunto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instrucaoTransacao">Transação</Label>
              <Input
                id="instrucaoTransacao"
                value={formData.instrucaoTransacao || ''}
                onChange={(e) => handleInputChange('instrucaoTransacao', e.target.value)}
                placeholder="Digite a transação"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instrucaoExpediente">Expediente</Label>
              <Input
                id="instrucaoExpediente"
                value={formData.instrucaoExpediente || ''}
                onChange={(e) => handleInputChange('instrucaoExpediente', e.target.value)}
                placeholder="Digite o expediente"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instrucaoNomeArquivo">Nome do arquivo da instrução de uso enviada</Label>
              <Input
                id="instrucaoNomeArquivo"
                value={formData.instrucaoNomeArquivo || ''}
                onChange={(e) => handleInputChange('instrucaoNomeArquivo', e.target.value)}
                placeholder="Digite o nome do arquivo"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="instrucaoDataEnvio">Data de envio</Label>
              <Input
                id="instrucaoDataEnvio"
                type="date"
                value={formatDateForInput(formData.instrucaoDataEnvio)}
                onChange={(e) => handleInputChange('instrucaoDataEnvio', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        {!initialData && (
          <DraftSaveButton
            onSaveDraft={() => saveDraft(formData)}
            disabled={isFormEmpty}
          />
        )}
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? 'Atualizar' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
};