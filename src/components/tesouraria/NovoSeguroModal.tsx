import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { TipoSeguro } from '@/types/tesouraria';
import { Switch } from '@/components/ui/switch';

interface NovoSeguroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovoSeguroModal: React.FC<NovoSeguroModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    seguradora: '',
    numeroApolice: '',
    tipoSeguro: '',
    valorSegurado: '',
    premio: '',
    periodicidadePagamento: 'Anual',
    dataInicio: undefined as Date | undefined,
    dataFim: undefined as Date | undefined,
    taxaAdministracao: '',
    ressarcimentoAplicavel: false,
    valorEsperadoRessarcimento: '',
    observacoes: ''
  });

  const [anexos, setAnexos] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string | boolean | Date | undefined) => {
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
    if (!formData.seguradora || !formData.numeroApolice || !formData.tipoSeguro || 
        !formData.valorSegurado || !formData.premio || !formData.dataInicio || !formData.dataFim) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Simular salvamento
    console.log('Salvando seguro:', formData, anexos);
    
    toast({
      title: "Sucesso",
      description: "Apólice de seguro cadastrada com sucesso!"
    });

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      seguradora: '',
      numeroApolice: '',
      tipoSeguro: '',
      valorSegurado: '',
      premio: '',
      periodicidadePagamento: 'Anual',
      dataInicio: undefined,
      dataFim: undefined,
      taxaAdministracao: '',
      ressarcimentoAplicavel: false,
      valorEsperadoRessarcimento: '',
      observacoes: ''
    });
    setAnexos([]);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Apólice de Seguro</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seguradora">Seguradora *</Label>
              <Input
                id="seguradora"
                value={formData.seguradora}
                onChange={(e) => handleInputChange('seguradora', e.target.value)}
                placeholder="Nome da seguradora"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroApolice">Número da Apólice *</Label>
              <Input
                id="numeroApolice"
                value={formData.numeroApolice}
                onChange={(e) => handleInputChange('numeroApolice', e.target.value)}
                placeholder="Número da apólice"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoSeguro">Tipo de Seguro *</Label>
              <Select value={formData.tipoSeguro} onValueChange={(value) => handleInputChange('tipoSeguro', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TipoSeguro).map(tipo => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorSegurado">Valor Segurado *</Label>
              <Input
                id="valorSegurado"
                type="number"
                value={formData.valorSegurado}
                onChange={(e) => handleInputChange('valorSegurado', e.target.value)}
                placeholder="Valor segurado"
              />
            </div>
          </div>

          {/* Valores e Datas */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="premio">Prêmio *</Label>
              <Input
                id="premio"
                type="number"
                value={formData.premio}
                onChange={(e) => handleInputChange('premio', e.target.value)}
                placeholder="Valor do prêmio"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="periodicidadePagamento">Periodicidade do Pagamento</Label>
              <Select value={formData.periodicidadePagamento} onValueChange={(value) => handleInputChange('periodicidadePagamento', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mensal">Mensal</SelectItem>
                  <SelectItem value="Trimestral">Trimestral</SelectItem>
                  <SelectItem value="Semestral">Semestral</SelectItem>
                  <SelectItem value="Anual">Anual</SelectItem>
                  <SelectItem value="À Vista">À Vista</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Data de Início da Vigência *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dataInicio && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataInicio ? format(formData.dataInicio, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dataInicio}
                    onSelect={(date) => handleInputChange('dataInicio', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Data de Fim da Vigência *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dataFim && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataFim ? format(formData.dataFim, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dataFim}
                    onSelect={(date) => handleInputChange('dataFim', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Ressarcimento */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="ressarcimento"
              checked={formData.ressarcimentoAplicavel}
              onCheckedChange={(checked) => handleInputChange('ressarcimentoAplicavel', checked)}
            />
            <Label htmlFor="ressarcimento">Seguro com Ressarcimento (ex: Garantia Contratual)</Label>
          </div>

          {formData.ressarcimentoAplicavel && (
            <div className="space-y-2">
              <Label htmlFor="valorEsperadoRessarcimento">Valor Esperado de Ressarcimento</Label>
              <Input
                id="valorEsperadoRessarcimento"
                type="number"
                value={formData.valorEsperadoRessarcimento}
                onChange={(e) => handleInputChange('valorEsperadoRessarcimento', e.target.value)}
                placeholder="Valor que será ressarcido"
              />
            </div>
          )}
        </div>

        {/* Upload de Documentos */}
        <div className="space-y-4">
          <Label>Anexar Documentos da Apólice</Label>
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
            placeholder="Informações adicionais sobre a apólice"
            rows={3}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Apólice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NovoSeguroModal;