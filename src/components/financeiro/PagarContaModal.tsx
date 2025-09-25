import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { ContaPagar } from '@/types/financeiro';

interface PagarContaModalProps {
  isOpen: boolean;
  onClose: () => void;
  conta: ContaPagar | null;
  onConfirmarPagamento: (dadosPagamento: {
    contaId: string;
    dataPagamento: Date;
    contaBancariaSaida: string;
    comprovante: File | null;
  }) => void;
}

const mockContasBancarias = [
  { id: '1', nome: 'Banco do Brasil - Conta Corrente', numero: '001-12345-6' },
  { id: '2', nome: 'Itaú - Conta Corrente', numero: '341-67890-1' },
  { id: '3', nome: 'Bradesco - Conta Corrente', numero: '237-11111-2' },
  { id: '4', nome: 'Santander - Conta Corrente', numero: '033-22222-3' }
];

export const PagarContaModal: React.FC<PagarContaModalProps> = ({
  isOpen,
  onClose,
  conta,
  onConfirmarPagamento
}) => {
  const [formData, setFormData] = useState({
    dataPagamento: new Date(),
    contaBancariaSaida: '',
    comprovante: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!conta) return;

    // Validação
    const newErrors: Record<string, string> = {};
    
    if (!formData.contaBancariaSaida) {
      newErrors.contaBancariaSaida = 'Conta bancária de saída é obrigatória';
    }
    if (!formData.comprovante) {
      newErrors.comprovante = 'Comprovante de pagamento é obrigatório';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onConfirmarPagamento({
        contaId: conta.id,
        dataPagamento: formData.dataPagamento,
        contaBancariaSaida: formData.contaBancariaSaida,
        comprovante: formData.comprovante
      });
      
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      dataPagamento: new Date(),
      contaBancariaSaida: '',
      comprovante: null
    });
    setErrors({});
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        comprovante: e.target.files![0]
      }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      comprovante: null
    }));
  };

  if (!conta) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Confirmar Pagamento</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações da Conta */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Informações da Conta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Número</label>
                <p className="text-sm">{conta.numero}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Fornecedor</label>
                <p className="text-sm">{conta.fornecedor}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Valor</label>
                <p className="text-lg font-semibold text-primary">{formatCurrency(conta.valor)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Vencimento</label>
                <p className="text-sm">{format(conta.dataVencimento, "dd/MM/yyyy")}</p>
              </div>
            </div>
            <div className="mt-3">
              <label className="text-sm font-medium text-muted-foreground">Descrição</label>
              <p className="text-sm">{conta.descricao}</p>
            </div>
          </div>

          {/* Dados do Pagamento */}
          <div className="space-y-4">
            <h3 className="font-semibold">Dados do Pagamento</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Data do Pagamento */}
              <div className="space-y-2">
                <Label>Data do Pagamento *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(formData.dataPagamento, "dd/MM/yyyy", { locale: ptBR })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dataPagamento}
                      onSelect={(date) => date && setFormData(prev => ({ ...prev, dataPagamento: date }))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Conta Bancária de Saída */}
              <div className="space-y-2">
                <Label htmlFor="contaBancaria">Conta Bancária de Saída *</Label>
                <Select value={formData.contaBancariaSaida} onValueChange={(value) => setFormData(prev => ({ ...prev, contaBancariaSaida: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a conta" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockContasBancarias.map(conta => (
                      <SelectItem key={conta.id} value={conta.nome}>
                        <div>
                          <div className="font-medium">{conta.nome}</div>
                          <div className="text-xs text-muted-foreground">{conta.numero}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.contaBancariaSaida && <span className="text-sm text-destructive">{errors.contaBancariaSaida}</span>}
              </div>
            </div>

            {/* Anexar Comprovante */}
            <div className="space-y-3">
              <Label>Anexar Comprovante de Pagamento *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="mt-2">
                    <Label htmlFor="comprovante-upload" className="cursor-pointer">
                      <span className="text-primary hover:text-primary/80">Clique para fazer upload</span>
                      <span className="text-muted-foreground"> ou arraste o arquivo aqui</span>
                    </Label>
                    <input
                      id="comprovante-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG até 10MB
                  </p>
                </div>

                {/* Arquivo carregado */}
                {formData.comprovante && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">{formData.comprovante.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="text-green-600 hover:text-green-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              {errors.comprovante && <span className="text-sm text-destructive">{errors.comprovante}</span>}
            </div>

            {/* Aviso importante */}
            <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Atenção:</p>
                <p>Após confirmar o pagamento, o status da conta será alterado para "Pago" e não poderá ser desfeito. Certifique-se de que o comprovante está correto.</p>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Confirmar Pagamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};