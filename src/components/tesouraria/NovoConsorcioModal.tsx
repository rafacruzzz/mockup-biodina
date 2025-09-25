import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface NovoConsorcioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovoConsorcioModal: React.FC<NovoConsorcioModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    administradora: '',
    numeroCota: '',
    bemReferenciado: '',
    valorBem: '',
    prazoTotal: '',
    numeroParcelas: '',
    valorParcela: '',
    taxaAdministracao: '',
    dataContrato: undefined as Date | undefined,
    observacoes: ''
  });

  const [anexos, setAnexos] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAnexos(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAnexos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Validações básicas
    if (!formData.administradora || !formData.numeroCota || !formData.bemReferenciado || 
        !formData.valorBem || !formData.numeroParcelas || !formData.valorParcela || 
        !formData.taxaAdministracao || !formData.dataContrato) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Simular salvamento
    console.log('Salvando consórcio:', formData, anexos);
    
    toast({
      title: "Sucesso",
      description: "Cota de consórcio cadastrada com sucesso!"
    });

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      administradora: '',
      numeroCota: '',
      bemReferenciado: '',
      valorBem: '',
      prazoTotal: '',
      numeroParcelas: '',
      valorParcela: '',
      taxaAdministracao: '',
      dataContrato: undefined,
      observacoes: ''
    });
    setAnexos([]);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Cota de Consórcio</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="administradora">Administradora *</Label>
              <Input
                id="administradora"
                value={formData.administradora}
                onChange={(e) => handleInputChange('administradora', e.target.value)}
                placeholder="Nome da administradora"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroCota">Número da Cota *</Label>
              <Input
                id="numeroCota"
                value={formData.numeroCota}
                onChange={(e) => handleInputChange('numeroCota', e.target.value)}
                placeholder="Número da cota"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bemReferenciado">Bem Referenciado *</Label>
              <Input
                id="bemReferenciado"
                value={formData.bemReferenciado}
                onChange={(e) => handleInputChange('bemReferenciado', e.target.value)}
                placeholder="Descrição do bem"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorBem">Valor do Bem *</Label>
              <Input
                id="valorBem"
                type="number"
                value={formData.valorBem}
                onChange={(e) => handleInputChange('valorBem', e.target.value)}
                placeholder="Valor do bem"
              />
            </div>
          </div>

          {/* Valores e Prazos */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prazoTotal">Prazo Total (meses)</Label>
              <Input
                id="prazoTotal"
                type="number"
                value={formData.prazoTotal}
                onChange={(e) => handleInputChange('prazoTotal', e.target.value)}
                placeholder="Prazo total em meses"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroParcelas">Número de Parcelas *</Label>
              <Input
                id="numeroParcelas"
                type="number"
                value={formData.numeroParcelas}
                onChange={(e) => handleInputChange('numeroParcelas', e.target.value)}
                placeholder="Total de parcelas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorParcela">Valor da Parcela *</Label>
              <Input
                id="valorParcela"
                type="number"
                value={formData.valorParcela}
                onChange={(e) => handleInputChange('valorParcela', e.target.value)}
                placeholder="Valor da parcela mensal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxaAdministracao">Taxa de Administração (%) *</Label>
              <Input
                id="taxaAdministracao"
                type="number"
                step="0.1"
                value={formData.taxaAdministracao}
                onChange={(e) => handleInputChange('taxaAdministracao', e.target.value)}
                placeholder="Taxa de administração"
              />
            </div>
          </div>
        </div>

        {/* Data do Contrato */}
        <div className="space-y-2">
          <Label>Data do Contrato *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.dataContrato && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dataContrato ? format(formData.dataContrato, "PPP", { locale: ptBR }) : "Selecione a data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.dataContrato}
                onSelect={(date) => handleInputChange('dataContrato', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Upload de Documentos */}
        <div className="space-y-4">
          <Label>Anexar Contrato de Consórcio</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                Clique para selecionar ou arraste arquivos aqui
              </span>
              <span className="text-xs text-gray-400 mt-1">
                PDF, DOC, JPG, PNG (máx. 10MB cada)
              </span>
            </label>
          </div>

          {anexos.length > 0 && (
            <div className="space-y-2">
              <Label>Arquivos selecionados:</Label>
              {anexos.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Observações */}
        <div className="space-y-2">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            value={formData.observacoes}
            onChange={(e) => handleInputChange('observacoes', e.target.value)}
            placeholder="Informações adicionais sobre a cota"
            rows={3}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Consórcio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NovoConsorcioModal;