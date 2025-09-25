import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MoneyInput } from "@/components/ui/money-input";
import { useToast } from "@/hooks/use-toast";

interface NovoEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovoEmprestimoModal = ({ isOpen, onClose }: NovoEmprestimoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    codigo: '',
    instituicaoFinanceira: '',
    valorTotal: '',
    indexador: '',
    taxaJuros: '',
    multaAtraso: '',
    garantia: '',
    dataInicio: undefined as Date | undefined,
    dataFim: undefined as Date | undefined,
    observacoes: ''
  });

  const [anexos, setAnexos] = useState<File[]>([]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAnexos(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAnexos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Validações básicas
    if (!formData.codigo || !formData.instituicaoFinanceira || !formData.valorTotal) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Aqui seria feita a integração com a API
    console.log('Dados do empréstimo:', {
      ...formData,
      valorTotal: parseFloat(formData.valorTotal) / 100, // Converter centavos para reais
      taxaJuros: parseFloat(formData.taxaJuros),
      multaAtraso: formData.multaAtraso ? parseFloat(formData.multaAtraso) : undefined,
      anexos
    });

    toast({
      title: "Sucesso",
      description: "Empréstimo cadastrado com sucesso!",
    });

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      codigo: '',
      instituicaoFinanceira: '',
      valorTotal: '',
      indexador: '',
      taxaJuros: '',
      multaAtraso: '',
      garantia: '',
      dataInicio: undefined,
      dataFim: undefined,
      observacoes: ''
    });
    setAnexos([]);
  };

  const gerarCronograma = () => {
    if (!formData.valorTotal || !formData.taxaJuros || !formData.dataInicio || !formData.dataFim) {
      toast({
        title: "Informações Insuficientes",
        description: "Preencha valor, taxa de juros e datas para gerar o cronograma.",
        variant: "destructive"
      });
      return;
    }

    // Aqui seria implementada a lógica de geração do cronograma
    toast({
      title: "Cronograma Gerado",
      description: "Cronograma de amortização gerado com sucesso!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Empréstimo</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Coluna Esquerda */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="codigo">Código do Empréstimo *</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => handleInputChange('codigo', e.target.value)}
                placeholder="EMP-2025-001"
              />
            </div>

            <div>
              <Label htmlFor="instituicao">Instituição Financeira *</Label>
              <Input
                id="instituicao"
                value={formData.instituicaoFinanceira}
                onChange={(e) => handleInputChange('instituicaoFinanceira', e.target.value)}
                placeholder="Banco do Brasil"
              />
            </div>

            <div>
              <Label htmlFor="valor">Valor Total *</Label>
              <MoneyInput
                id="valor"
                value={formData.valorTotal}
                onChange={(value) => handleInputChange('valorTotal', value)}
              />
            </div>

            <div>
              <Label htmlFor="indexador">Indexador *</Label>
              <Select value={formData.indexador} onValueChange={(value) => handleInputChange('indexador', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o indexador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CDI">CDI</SelectItem>
                  <SelectItem value="SELIC">SELIC</SelectItem>
                  <SelectItem value="IPCA">IPCA</SelectItem>
                  <SelectItem value="FIXO">Taxa Fixa</SelectItem>
                  <SelectItem value="TJLP">TJLP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="taxa">Taxa de Juros (% a.a.) *</Label>
              <Input
                id="taxa"
                type="number"
                step="0.01"
                value={formData.taxaJuros}
                onChange={(e) => handleInputChange('taxaJuros', e.target.value)}
                placeholder="12.50"
              />
            </div>

            <div>
              <Label htmlFor="multa">Multa por Atraso (%)</Label>
              <Input
                id="multa"
                type="number"
                step="0.01"
                value={formData.multaAtraso}
                onChange={(e) => handleInputChange('multaAtraso', e.target.value)}
                placeholder="2.00"
              />
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="garantia">Garantia</Label>
              <Input
                id="garantia"
                value={formData.garantia}
                onChange={(e) => handleInputChange('garantia', e.target.value)}
                placeholder="Garantia Real - Imóvel"
              />
            </div>

            <div>
              <Label>Data de Início *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataInicio ? format(formData.dataInicio, "PPP", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dataInicio}
                    onSelect={(date) => handleInputChange('dataInicio', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Data de Vencimento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataFim ? format(formData.dataFim, "PPP", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dataFim}
                    onSelect={(date) => handleInputChange('dataFim', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                placeholder="Observações sobre o empréstimo..."
                className="h-20"
              />
            </div>

            <div>
              <Label>Anexar Contrato</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Clique para selecionar arquivos</span>
                  <span className="text-xs text-gray-400">PDF, DOC, DOCX</span>
                </label>
              </div>
              
              {anexos.length > 0 && (
                <div className="mt-2 space-y-2">
                  {anexos.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <Button onClick={gerarCronograma} variant="outline">
            Gerar Cronograma de Amortização
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Empréstimo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NovoEmprestimoModal;