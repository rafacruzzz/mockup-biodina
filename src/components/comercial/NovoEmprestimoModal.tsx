
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoneyInput } from "@/components/ui/money-input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NovoEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovoEmprestimoModal = ({ isOpen, onClose }: NovoEmprestimoModalProps) => {
  const [formData, setFormData] = useState({
    numeroProcesso: `EMP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    cnpjCliente: "",
    nomeCliente: "",
    numeroDanfeEmprestimo: "",
    referenciaProdutoEmprestado: "",
    descricaoProdutoEmprestado: "",
    valorEmprestimoDolar: "",
    dataEmprestimo: null as Date | null,
    dataSaida: null as Date | null,
    numeroDanfeRetorno: "",
    referenciaProdutoRecebido: "",
    descricaoProdutoRecebido: "",
    dataRetorno: null as Date | null,
    dataBaixa: null as Date | null,
    valorRetornadoDolar: "",
    idImportacaoDireta: ""
  });

  const handleInputChange = (field: string, value: string | Date | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Salvando empréstimo:", formData);
    onClose();
  };

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
            onSelect={(date) => handleInputChange(field, date)}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-biodina-blue">
            Novo Empréstimo
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Dados do Empréstimo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-biodina-blue border-b pb-2">
              Dados do Empréstimo
            </h3>
            
            <div className="space-y-2">
              <Label>Número do Processo *</Label>
              <Input
                value={formData.numeroProcesso}
                onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
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
                onChange={(e) => handleInputChange('cnpjCliente', e.target.value)}
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div className="space-y-2">
              <Label>Nome do Cliente *</Label>
              <Input
                value={formData.nomeCliente}
                onChange={(e) => handleInputChange('nomeCliente', e.target.value)}
                placeholder="Nome completo do cliente"
              />
            </div>

            <div className="space-y-2">
              <Label>Número da DANFE de Empréstimo *</Label>
              <Input
                value={formData.numeroDanfeEmprestimo}
                onChange={(e) => handleInputChange('numeroDanfeEmprestimo', e.target.value)}
                placeholder="Número da DANFE"
              />
            </div>

            <DatePicker label="Data de Empréstimo" field="dataEmprestimo" required />
            <DatePicker label="Data de Saída" field="dataSaida" required />
          </div>

          {/* Produto Emprestado */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-biodina-blue border-b pb-2">
              Produto Emprestado
            </h3>

            <div className="space-y-2">
              <Label>Referência do Produto *</Label>
              <Input
                value={formData.referenciaProdutoEmprestado}
                onChange={(e) => handleInputChange('referenciaProdutoEmprestado', e.target.value)}
                placeholder="Código/referência do produto"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição do Produto *</Label>
              <Textarea
                value={formData.descricaoProdutoEmprestado}
                onChange={(e) => handleInputChange('descricaoProdutoEmprestado', e.target.value)}
                placeholder="Descrição detalhada do produto emprestado"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Valor de Empréstimo (USD) *</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.valorEmprestimoDolar}
                onChange={(e) => handleInputChange('valorEmprestimoDolar', e.target.value)}
                placeholder="0.00"
              />
              <p className="text-xs text-gray-500">Valor principal para lógica de devolução</p>
            </div>
          </div>

          {/* Dados de Retorno (Opcionais) */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-biodina-blue border-b pb-2">
              Dados de Retorno (Opcional)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número da DANFE de Retorno</Label>
                <Input
                  value={formData.numeroDanfeRetorno}
                  onChange={(e) => handleInputChange('numeroDanfeRetorno', e.target.value)}
                  placeholder="Número da DANFE de devolução"
                />
              </div>

              <div className="space-y-2">
                <Label>Referência do Produto Recebido</Label>
                <Input
                  value={formData.referenciaProdutoRecebido}
                  onChange={(e) => handleInputChange('referenciaProdutoRecebido', e.target.value)}
                  placeholder="Pode ser diferente do produto emprestado"
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição do Produto Recebido</Label>
                <Textarea
                  value={formData.descricaoProdutoRecebido}
                  onChange={(e) => handleInputChange('descricaoProdutoRecebido', e.target.value)}
                  placeholder="Descrição do produto recebido na devolução"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Valor Retornado (USD)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.valorRetornadoDolar}
                  onChange={(e) => handleInputChange('valorRetornadoDolar', e.target.value)}
                  placeholder="0.00"
                />
                <p className="text-xs text-gray-500">Para comparar com valor_emprestimo_dolar</p>
              </div>

              <DatePicker label="Data do Retorno" field="dataRetorno" />
              <DatePicker label="Data da Baixa" field="dataBaixa" />

              <div className="space-y-2 md:col-span-2">
                <Label>ID da Importação Direta</Label>
                <Input
                  value={formData.idImportacaoDireta}
                  onChange={(e) => handleInputChange('idImportacaoDireta', e.target.value)}
                  placeholder="ID vinculado à importação direta (opcional)"
                />
                <p className="text-xs text-gray-500">Chave estrangeira para o módulo de Importação Direta</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Empréstimo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NovoEmprestimoModal;
