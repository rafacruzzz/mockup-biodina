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
import { TipoInvestimento } from "@/types/tesouraria";

interface NovoInvestimentoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovoInvestimentoModal = ({ isOpen, onClose }: NovoInvestimentoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    instituicaoFinanceira: '',
    produto: '',
    tipoInvestimento: '',
    valorAplicado: '',
    dataAplicacao: undefined as Date | undefined,
    dataVencimento: undefined as Date | undefined,
    rentabilidadeEsperada: '',
    impostos: '',
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
    if (!formData.instituicaoFinanceira || !formData.produto || !formData.valorAplicado) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    console.log('Dados do investimento:', formData);
    
    toast({
      title: "Sucesso",
      description: "Investimento cadastrado com sucesso!",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Investimento</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <Label htmlFor="instituicao">Instituição Financeira *</Label>
            <Input
              id="instituicao"
              value={formData.instituicaoFinanceira}
              onChange={(e) => handleInputChange('instituicaoFinanceira', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="produto">Produto *</Label>
            <Input
              id="produto"
              value={formData.produto}
              onChange={(e) => handleInputChange('produto', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="tipo">Tipo de Investimento *</Label>
            <Select value={formData.tipoInvestimento} onValueChange={(value) => handleInputChange('tipoInvestimento', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TipoInvestimento).map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="valor">Valor Aplicado *</Label>
            <MoneyInput
              id="valor"
              value={formData.valorAplicado}
              onChange={(value) => handleInputChange('valorAplicado', value)}
            />
          </div>

          <div>
            <Label>Data de Aplicação</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dataAplicacao ? format(formData.dataAplicacao, "PPP", { locale: ptBR }) : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dataAplicacao}
                  onSelect={(date) => handleInputChange('dataAplicacao', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="rentabilidade">Rentabilidade Esperada (% a.a.)</Label>
            <Input
              id="rentabilidade"
              type="number"
              step="0.01"
              value={formData.rentabilidadeEsperada}
              onChange={(e) => handleInputChange('rentabilidadeEsperada', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            value={formData.observacoes}
            onChange={(e) => handleInputChange('observacoes', e.target.value)}
            className="h-20"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Investimento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NovoInvestimentoModal;