import React, { useState, useEffect } from 'react';
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
import { TipoRequisicaoSimples, FormaPagamento, ContaPagar } from '@/types/financeiro';
import { mockDepartamentosSimples, mockProjetosSimples, mockFornecedoresSimples } from '@/data/contasPagarData';

interface EditarContaModalProps {
  isOpen: boolean;
  onClose: () => void;
  conta: ContaPagar | null;
  onSave: (contaAtualizada: ContaPagar) => void;
}

export const EditarContaModal: React.FC<EditarContaModalProps> = ({
  isOpen,
  onClose,
  conta,
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
    anexos: [] as File[],
    anexosExistentes: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Preencher formulário quando a conta for carregada
  useEffect(() => {
    if (conta) {
      setFormData({
        tipo: conta.tipo,
        departamentoSolicitante: conta.departamentoSolicitante,
        vincularA: conta.vincularA,
        projetoCliente: conta.projetoCliente || '',
        departamento: conta.departamento || '',
        fornecedor: conta.fornecedor,
        descricao: conta.descricao,
        valor: (conta.valor * 100).toString(),
        dataVencimento: conta.dataVencimento,
        formaPagamentoSugerida: conta.formaPagamentoSugerida,
        anexos: [],
        anexosExistentes: conta.anexos || []
      });
    }
  }, [conta]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!conta) return;

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
      const contaAtualizada: ContaPagar = {
        ...conta,
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
        anexos: [
          ...formData.anexosExistentes,
          ...formData.anexos.map(file => file.name)
        ]
      };
      
      onSave(contaAtualizada);
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
      anexos: [],
      anexosExistentes: []
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

  const removeExistingFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      anexosExistentes: prev.anexosExistentes.filter((_, i) => i !== index)
    }));
  };

  if (!conta) return null;

  // Verificar se a conta pode ser editada
  const canEdit = conta.status === 'programado' || conta.status === 'pendente';

  if (!canEdit) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edição não permitida</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Esta conta não pode ser editada pois seu status é "{conta.status}". 
              Apenas contas com status "Programado" ou "Pendente" podem ser editadas.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={onClose}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Conta a Pagar - {conta.numero}</DialogTitle>
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

          {/* Anexos */}
          <div className="space-y-3">
            <Label>Anexos</Label>
            
            {/* Anexos existentes */}
            {formData.anexosExistentes.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Arquivos existentes:</p>
                {formData.anexosExistentes.map((arquivo, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <span className="text-sm truncate flex-1">{arquivo}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExistingFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <div className="mt-2">
                  <Label htmlFor="file-upload-edit" className="cursor-pointer">
                    <span className="text-primary hover:text-primary/80">Clique para adicionar mais arquivos</span>
                    <span className="text-muted-foreground"> ou arraste os arquivos aqui</span>
                  </Label>
                  <input
                    id="file-upload-edit"
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

              {/* Novos arquivos */}
              {formData.anexos.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Novos arquivos:</p>
                  {formData.anexos.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 p-2 rounded">
                      <span className="text-sm truncate flex-1 text-green-800">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-green-600 hover:text-green-700"
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
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};