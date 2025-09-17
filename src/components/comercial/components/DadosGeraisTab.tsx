
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DadosGeraisTabProps {
  formData: any;
  onInputChange: (field: string, value: string | Date | null) => void;
}

const DadosGeraisTab = ({ formData, onInputChange }: DadosGeraisTabProps) => {
  const DatePicker = ({ 
    label, 
    field, 
    required = false 
  }: { 
    label: string; 
    field: string; 
    required?: boolean;
  }) => (
    <div className="space-y-2">
      <Label>{label} {required && '*'}</Label>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Número do Processo *</Label>
            <Input
              value={formData.numeroProcesso}
              onChange={(e) => onInputChange('numeroProcesso', e.target.value)}
              placeholder="Gerado automaticamente"
              disabled
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500">Gerado automaticamente pelo sistema</p>
          </div>

          <div className="space-y-2">
            <Label>CNPJ do Cliente *</Label>
            <Input
              value={formData.cnpjCliente}
              onChange={(e) => onInputChange('cnpjCliente', e.target.value)}
              placeholder="00.000.000/0000-00"
            />
          </div>

          <div className="space-y-2">
            <Label>Nome do Cliente *</Label>
            <Input
              value={formData.nomeCliente}
              onChange={(e) => onInputChange('nomeCliente', e.target.value)}
              placeholder="Nome completo do cliente"
            />
          </div>
        </div>

        <div className="space-y-4">
          <DatePicker label="Data de Empréstimo" field="dataEmprestimo" required />
          <DatePicker label="Data de Saída" field="dataSaida" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Observações</Label>
        <Textarea
          value={formData.observacoes}
          onChange={(e) => onInputChange('observacoes', e.target.value)}
          placeholder="Observações gerais sobre o empréstimo..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default DadosGeraisTab;
