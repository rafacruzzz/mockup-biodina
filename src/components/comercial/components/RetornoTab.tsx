
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoneyInput } from "@/components/ui/money-input";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface RetornoTabProps {
  formData: any;
  onInputChange: (field: string, value: string | Date | null) => void;
}

const RetornoTab = ({ formData, onInputChange }: RetornoTabProps) => {
  const getCurrencyLabel = () => {
    return formData.moeda === 'BRL' ? 'R$' : 'USD';
  };

  const DatePicker = ({ 
    label, 
    field
  }: { 
    label: string; 
    field: string; 
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !formData[field as keyof typeof formData] && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formData[field as keyof typeof formData] ? 
              format(formData[field as keyof typeof formData] as Date, "dd/MM/yyyy") : 
              "Selecionar data"
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={formData[field as keyof typeof formData] as Date}
            onSelect={(date) => onInputChange(field, date)}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Seção Opcional:</strong> Preencha apenas quando houver dados de retorno/devolução disponíveis.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Número da DANFE de Retorno</Label>
          <Input
            value={formData.numeroDanfeRetorno}
            onChange={(e) => onInputChange('numeroDanfeRetorno', e.target.value)}
            placeholder="Número da DANFE de devolução"
          />
        </div>

        <div className="space-y-2">
          <Label>Referência do Produto Recebido</Label>
          <Input
            value={formData.referenciaProdutoRecebido}
            onChange={(e) => onInputChange('referenciaProdutoRecebido', e.target.value)}
            placeholder="Pode ser diferente do produto emprestado"
          />
        </div>

        <div className="space-y-2">
          <Label>Descrição do Produto Recebido</Label>
          <Textarea
            value={formData.descricaoProdutoRecebido}
            onChange={(e) => onInputChange('descricaoProdutoRecebido', e.target.value)}
            placeholder="Descrição do produto recebido na devolução"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label>Valor Retornado ({getCurrencyLabel()})</Label>
          <MoneyInput
            value={formData.valorRetornado}
            onChange={(value) => onInputChange('valorRetornado', value)}
            currency={formData.moeda}
            placeholder={formData.moeda === 'BRL' ? 'R$ 0,00' : '$0.00'}
          />
          <p className="text-xs text-gray-500">Para comparar com valor_emprestimo</p>
        </div>

        <DatePicker label="Data do Retorno" field="dataRetorno" />
        <DatePicker label="Data da Baixa" field="dataBaixa" />
      </div>
    </div>
  );
};

export default RetornoTab;
