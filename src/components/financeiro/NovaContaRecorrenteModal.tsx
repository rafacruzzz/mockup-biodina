import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoneyInput } from '@/components/ui/money-input';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ContaRecorrenteEnhanced, CategoriaContaRecorrente, Periodicidade, FormaPagamento } from '@/types/financeiro';
import { mockFornecedoresSimples } from '@/data/contasPagarData';

interface NovaContaRecorrenteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (conta: Omit<ContaRecorrenteEnhanced, 'id' | 'status' | 'proximoVencimento'>) => void;
}

export const NovaContaRecorrenteModal: React.FC<NovaContaRecorrenteModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    fornecedor: '',
    categoria: '' as CategoriaContaRecorrente,
    valor: '',
    periodicidade: '' as Periodicidade,
    dataPrimeiroVencimento: undefined as Date | undefined,
    formaPagamento: '' as FormaPagamento,
    anexos: [] as File[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const calcularProximoVencimento = (dataPrimeiro: Date, periodicidade: Periodicidade): Date => {
    const proxima = new Date(dataPrimeiro);
    
    switch (periodicidade) {
      case 'mensal':
        proxima.setMonth(proxima.getMonth() + 1);
        break;
      case 'bimestral':
        proxima.setMonth(proxima.getMonth() + 2);
        break;
      case 'trimestral':
        proxima.setMonth(proxima.getMonth() + 3);
        break;
      case 'semestral':
        proxima.setMonth(proxima.getMonth() + 6);
        break;
      case 'anual':
        proxima.setFullYear(proxima.getFullYear() + 1);
        break;
    }
    
    return proxima;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome) newErrors.nome = 'Nome da conta é obrigatório';
    if (!formData.fornecedor) newErrors.fornecedor = 'Fornecedor é obrigatório';
    if (!formData.categoria) newErrors.categoria = 'Categoria é obrigatória';
    if (!formData.valor) newErrors.valor = 'Valor é obrigatório';
    if (!formData.periodicidade) newErrors.periodicidade = 'Periodicidade é obrigatória';
    if (!formData.dataPrimeiroVencimento) newErrors.dataPrimeiroVencimento = 'Data do primeiro vencimento é obrigatória';
    if (!formData.formaPagamento) newErrors.formaPagamento = 'Forma de pagamento é obrigatória';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const novaConta: Omit<ContaRecorrenteEnhanced, 'id' | 'status' | 'proximoVencimento'> = {
        empresaId: 'biodina-001', // Será substituído pelo contexto da empresa ativa
        nome: formData.nome,
        fornecedor: formData.fornecedor,
        categoria: formData.categoria,
        valor: parseFloat(formData.valor) / 100,
        periodicidade: formData.periodicidade,
        diaVencimento: formData.dataPrimeiroVencimento!.getDate(),
        ativa: true,
        centroCusto: 'Geral',
        dataPrimeiroVencimento: formData.dataPrimeiroVencimento!,
        formaPagamento: formData.formaPagamento,
        anexos: formData.anexos.map(file => file.name)
      };
      
      onSave(novaConta);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      nome: '',
      fornecedor: '',
      categoria: '' as CategoriaContaRecorrente,
      valor: '',
      periodicidade: '' as Periodicidade,
      dataPrimeiroVencimento: undefined,
      formaPagamento: '' as FormaPagamento,
      anexos: []
    });
    setErrors({});
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        anexos: [...prev.anexos, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      anexos: prev.anexos.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Conta Recorrente</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome da Conta */}
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Conta *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: Aluguel escritório"
              />
              {errors.nome && <span className="text-sm text-destructive">{errors.nome}</span>}
            </div>

            {/* Fornecedor */}
            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor *</Label>
              <Select value={formData.fornecedor} onValueChange={(value) => setFormData(prev => ({ ...prev, fornecedor: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {mockFornecedoresSimples.map(fornecedor => (
                    <SelectItem key={fornecedor.id} value={fornecedor.nome}>{fornecedor.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fornecedor && <span className="text-sm text-destructive">{errors.fornecedor}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Categoria */}
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria *</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value as CategoriaContaRecorrente }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agua">Água</SelectItem>
                  <SelectItem value="luz">Luz</SelectItem>
                  <SelectItem value="aluguel">Aluguel</SelectItem>
                  <SelectItem value="telefonia">Telefonia</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              {errors.categoria && <span className="text-sm text-destructive">{errors.categoria}</span>}
            </div>

            {/* Valor */}
            <div className="space-y-2">
              <Label htmlFor="valor">Valor *</Label>
              <MoneyInput
                value={formData.valor}
                onChange={(value) => setFormData(prev => ({ ...prev, valor: value }))}
                currency="BRL"
              />
              {errors.valor && <span className="text-sm text-destructive">{errors.valor}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Periodicidade */}
            <div className="space-y-2">
              <Label htmlFor="periodicidade">Periodicidade *</Label>
              <Select value={formData.periodicidade} onValueChange={(value) => setFormData(prev => ({ ...prev, periodicidade: value as Periodicidade }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a periodicidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="bimestral">Bimestral</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="semestral">Semestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
              {errors.periodicidade && <span className="text-sm text-destructive">{errors.periodicidade}</span>}
            </div>

            {/* Data do Primeiro Vencimento */}
            <div className="space-y-2">
              <Label>Data do Primeiro Vencimento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dataPrimeiroVencimento && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataPrimeiroVencimento ? format(formData.dataPrimeiroVencimento, "dd/MM/yyyy") : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dataPrimeiroVencimento}
                    onSelect={(date) => setFormData(prev => ({ ...prev, dataPrimeiroVencimento: date }))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.dataPrimeiroVencimento && <span className="text-sm text-destructive">{errors.dataPrimeiroVencimento}</span>}
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="space-y-2">
            <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
            <Select value={formData.formaPagamento} onValueChange={(value) => setFormData(prev => ({ ...prev, formaPagamento: value as FormaPagamento }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="debito_automatico">Débito Automático</SelectItem>
                <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
            {errors.formaPagamento && <span className="text-sm text-destructive">{errors.formaPagamento}</span>}
          </div>

          {/* Anexos */}
          <div className="space-y-3">
            <Label>Anexos (Contratos, etc.)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <div className="mt-2">
                  <Label htmlFor="file-upload-recorrente" className="cursor-pointer">
                    <span className="text-primary hover:text-primary/80">Clique para fazer upload</span>
                    <span className="text-muted-foreground"> ou arraste os arquivos aqui</span>
                  </Label>
                  <input
                    id="file-upload-recorrente"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, DOCX, JPG, PNG até 10MB
                </p>
              </div>

              {/* Arquivos carregados */}
              {formData.anexos.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Arquivos carregados:</p>
                  {formData.anexos.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <span className="text-sm truncate flex-1">{file.name}</span>
                      <Button
                        type="button"
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
          </div>

          {/* Preview do próximo vencimento */}
          {formData.dataPrimeiroVencimento && formData.periodicidade && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Próximo vencimento após o primeiro:</strong> {' '}
                {format(calcularProximoVencimento(formData.dataPrimeiroVencimento, formData.periodicidade), "dd/MM/yyyy")}
              </p>
            </div>
          )}

          {/* Botões */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};