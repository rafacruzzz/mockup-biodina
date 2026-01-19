import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoneyInput } from '@/components/ui/money-input';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TipoRequisicaoSimples, StatusConta, FormaPagamento, ContaPagar } from '@/types/financeiro';
import { mockDepartamentosSimples, mockProjetosSimples, mockFornecedoresSimples, DOCUMENTOS_OBRIGATORIOS_MODAL } from '@/data/contasPagarData';

interface NovaContaPagarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (conta: Omit<ContaPagar, 'id' | 'numero' | 'status' | 'createdAt'>) => void;
}

export const NovaContaPagarModal: React.FC<NovaContaPagarModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    tipo: '' as TipoRequisicaoSimples,
    departamentoSolicitante: '',
    vincularA: 'projeto' as 'projeto' | 'departamento',
    projetoCliente: '',
    departamento: '',
    fornecedor: '',
    descricao: '',
    valor: '',
    dataVencimento: undefined as Date | undefined,
    formaPagamentoSugerida: '' as FormaPagamento,
    anexos: [] as File[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    const newErrors: Record<string, string> = {};
    
    if (!formData.tipo) newErrors.tipo = 'Tipo de requisição é obrigatório';
    if (!formData.departamentoSolicitante) newErrors.departamentoSolicitante = 'Departamento solicitante é obrigatório';
    if (formData.vincularA === 'projeto' && !formData.projetoCliente) {
      newErrors.projetoCliente = 'Projeto/Cliente é obrigatório';
    }
    if (formData.vincularA === 'departamento' && !formData.departamento) {
      newErrors.departamento = 'Departamento é obrigatório';
    }
    if (!formData.fornecedor) newErrors.fornecedor = 'Fornecedor é obrigatório';
    if (!formData.descricao) newErrors.descricao = 'Descrição é obrigatória';
    if (!formData.valor) newErrors.valor = 'Valor é obrigatório';
    if (!formData.dataVencimento) newErrors.dataVencimento = 'Data de vencimento é obrigatória';
    if (!formData.formaPagamentoSugerida) newErrors.formaPagamentoSugerida = 'Forma de pagamento é obrigatória';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const novaConta = {
        empresaId: 'biodina-001', // Será substituído pelo contexto da empresa ativa
        tipo: formData.tipo,
        departamentoSolicitante: formData.departamentoSolicitante,
        vincularA: formData.vincularA,
        projetoCliente: formData.vincularA === 'projeto' ? formData.projetoCliente : undefined,
        departamento: formData.vincularA === 'departamento' ? formData.departamento : undefined,
        fornecedor: formData.fornecedor,
        descricao: formData.descricao,
        valor: parseFloat(formData.valor) / 100,
        dataVencimento: formData.dataVencimento!,
        formaPagamentoSugerida: formData.formaPagamentoSugerida,
        anexos: formData.anexos.map(file => file.name)
      };
      
      onSave(novaConta);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      tipo: '' as TipoRequisicaoSimples,
      departamentoSolicitante: '',
      vincularA: 'projeto',
      projetoCliente: '',
      departamento: '',
      fornecedor: '',
      descricao: '',
      valor: '',
      dataVencimento: undefined,
      formaPagamentoSugerida: '' as FormaPagamento,
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Conta a Pagar</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo de Requisição */}
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Requisição *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value as TipoRequisicaoSimples }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pagamento">Pagamento</SelectItem>
                  <SelectItem value="compra">Compra</SelectItem>
                  <SelectItem value="hospedagem">Hospedagem</SelectItem>
                  <SelectItem value="passagem">Passagem</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              {errors.tipo && <span className="text-sm text-destructive">{errors.tipo}</span>}
            </div>

            {/* Departamento Solicitante */}
            <div className="space-y-2">
              <Label htmlFor="departamentoSolicitante">Setor/Departamento Solicitante *</Label>
              <Select value={formData.departamentoSolicitante} onValueChange={(value) => setFormData(prev => ({ ...prev, departamentoSolicitante: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  {mockDepartamentosSimples.map(dept => (
                    <SelectItem key={dept.id} value={dept.nome}>{dept.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.departamentoSolicitante && <span className="text-sm text-destructive">{errors.departamentoSolicitante}</span>}
            </div>
          </div>

          {/* Vincular a */}
          <div className="space-y-3">
            <Label>Vincular a *</Label>
            <RadioGroup
              value={formData.vincularA}
              onValueChange={(value) => setFormData(prev => ({ ...prev, vincularA: value as 'projeto' | 'departamento' }))}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="projeto" id="projeto" />
                <Label htmlFor="projeto">Projeto/Cliente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="departamento" id="departamento" />
                <Label htmlFor="departamento">Estrutura/Departamento</Label>
              </div>
            </RadioGroup>

            {/* Campo condicional */}
            {formData.vincularA === 'projeto' ? (
              <div className="space-y-2">
                <Label htmlFor="projetoCliente">Projeto/Cliente *</Label>
                <Select value={formData.projetoCliente} onValueChange={(value) => setFormData(prev => ({ ...prev, projetoCliente: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto/cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProjetosSimples.map(projeto => (
                      <SelectItem key={projeto.id} value={projeto.nome}>{projeto.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.projetoCliente && <span className="text-sm text-destructive">{errors.projetoCliente}</span>}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento *</Label>
                <Select value={formData.departamento} onValueChange={(value) => setFormData(prev => ({ ...prev, departamento: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDepartamentosSimples.map(dept => (
                      <SelectItem key={dept.id} value={dept.nome}>{dept.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.departamento && <span className="text-sm text-destructive">{errors.departamento}</span>}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição da Despesa *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              placeholder="Descreva a despesa..."
              rows={3}
            />
            {errors.descricao && <span className="text-sm text-destructive">{errors.descricao}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Data de Vencimento */}
            <div className="space-y-2">
              <Label>Data de Vencimento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dataVencimento && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataVencimento ? format(formData.dataVencimento, "dd/MM/yyyy") : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dataVencimento}
                    onSelect={(date) => setFormData(prev => ({ ...prev, dataVencimento: date }))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.dataVencimento && <span className="text-sm text-destructive">{errors.dataVencimento}</span>}
            </div>

            {/* Forma de Pagamento */}
            <div className="space-y-2">
              <Label htmlFor="formaPagamento">Forma de Pagamento Sugerida *</Label>
              <Select value={formData.formaPagamentoSugerida} onValueChange={(value) => setFormData(prev => ({ ...prev, formaPagamentoSugerida: value as FormaPagamento }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="debito_automatico">Débito Automático</SelectItem>
                  <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              {errors.formaPagamentoSugerida && <span className="text-sm text-destructive">{errors.formaPagamentoSugerida}</span>}
            </div>
          </div>

          {/* Anexos Obrigatórios */}
          <div className="space-y-3">
            <Label>Anexos Obrigatórios</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <div className="mt-2">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-primary hover:text-primary/80">Clique para fazer upload</span>
                    <span className="text-muted-foreground"> ou arraste os arquivos aqui</span>
                  </Label>
                  <input
                    id="file-upload"
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

              {/* Lista de documentos obrigatórios */}
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Documentos obrigatórios:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {DOCUMENTOS_OBRIGATORIOS_MODAL.map((doc, index) => (
                    <li key={index}>• {doc}</li>
                  ))}
                </ul>
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