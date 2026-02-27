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
import { Switch } from '@/components/ui/switch';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import BancoSelect from './BancoSelect';
import { ContaRecorrenteEnhanced, CategoriaContaRecorrente, Periodicidade, FormaPagamento, TipoRequisicaoSimples } from '@/types/financeiro';
import { mockDepartamentosSimples, mockProjetosSimples, mockFornecedoresSimples } from '@/data/contasPagarData';

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
    tipo: '' as TipoRequisicaoSimples,
    departamentoSolicitante: '',
    vincularA: 'projeto' as 'projeto' | 'departamento',
    projetoCliente: '',
    departamento: '',
    fornecedor: '',
    categoria: '' as CategoriaContaRecorrente,
    descricao: '',
    valor: '',
    periodicidade: '' as Periodicidade,
    dataPrimeiroVencimento: undefined as Date | undefined,
    formaPagamento: '' as FormaPagamento,
    alteracaoValor: false,
    pagamentoEfetuado: false,
    dataPagamentoEfetuado: undefined as Date | undefined,
    bancoPagamento: '',
    agenciaPagamento: '',
    contaPagamento: '',
    multa: '',
    juros: '',
    desconto: '',
    anexos: [] as File[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const calcularProximoVencimento = (dataPrimeiro: Date, periodicidade: Periodicidade): Date => {
    const proxima = new Date(dataPrimeiro);
    switch (periodicidade) {
      case 'mensal': proxima.setMonth(proxima.getMonth() + 1); break;
      case 'bimestral': proxima.setMonth(proxima.getMonth() + 2); break;
      case 'trimestral': proxima.setMonth(proxima.getMonth() + 3); break;
      case 'semestral': proxima.setMonth(proxima.getMonth() + 6); break;
      case 'anual': proxima.setFullYear(proxima.getFullYear() + 1); break;
    }
    return proxima;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome) newErrors.nome = 'Nome da conta é obrigatório';
    if (!formData.tipo) newErrors.tipo = 'Tipo é obrigatório';
    if (!formData.departamentoSolicitante) newErrors.departamentoSolicitante = 'Departamento é obrigatório';
    if (formData.vincularA === 'projeto' && !formData.projetoCliente) newErrors.projetoCliente = 'Projeto/Cliente é obrigatório';
    if (formData.vincularA === 'departamento' && !formData.departamento) newErrors.departamento = 'Departamento é obrigatório';
    if (!formData.fornecedor) newErrors.fornecedor = 'Fornecedor é obrigatório';
    if (!formData.categoria) newErrors.categoria = 'Categoria é obrigatória';
    if (!formData.alteracaoValor && !formData.valor) newErrors.valor = 'Valor é obrigatório';
    if (!formData.periodicidade) newErrors.periodicidade = 'Periodicidade é obrigatória';
    if (!formData.dataPrimeiroVencimento) newErrors.dataPrimeiroVencimento = 'Data do primeiro vencimento é obrigatória';
    if (!formData.formaPagamento) newErrors.formaPagamento = 'Forma de pagamento é obrigatória';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const novaConta: Omit<ContaRecorrenteEnhanced, 'id' | 'status' | 'proximoVencimento'> = {
        empresaId: 'biodina-001',
        nome: formData.nome,
        fornecedor: formData.fornecedor,
        categoria: formData.categoria,
        valor: formData.valor ? parseFloat(formData.valor) / 100 : 0,
        periodicidade: formData.periodicidade,
        diaVencimento: formData.dataPrimeiroVencimento!.getDate(),
        ativa: true,
        centroCusto: 'Geral',
        dataPrimeiroVencimento: formData.dataPrimeiroVencimento!,
        formaPagamento: formData.formaPagamento,
        anexos: formData.anexos.map(file => file.name),
        tipo: formData.tipo,
        departamentoSolicitante: formData.departamentoSolicitante,
        vincularA: formData.vincularA,
        projetoCliente: formData.vincularA === 'projeto' ? formData.projetoCliente : undefined,
        departamento: formData.vincularA === 'departamento' ? formData.departamento : undefined,
        descricao: formData.descricao,
        alteracaoValor: formData.alteracaoValor,
        pagamentoEfetuado: formData.pagamentoEfetuado,
        dataPagamentoEfetuado: formData.pagamentoEfetuado ? formData.dataPagamentoEfetuado : undefined,
        bancoPagamento: formData.bancoPagamento || undefined,
        agenciaPagamento: formData.agenciaPagamento || undefined,
        contaPagamento: formData.contaPagamento || undefined,
        multa: formData.multa ? parseFloat(formData.multa) / 100 : undefined,
        juros: formData.juros ? parseFloat(formData.juros) / 100 : undefined,
        desconto: formData.desconto ? parseFloat(formData.desconto) / 100 : undefined,
        isRecorrente: true,
      };
      
      onSave(novaConta);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      nome: '',
      tipo: '' as TipoRequisicaoSimples,
      departamentoSolicitante: '',
      vincularA: 'projeto',
      projetoCliente: '',
      departamento: '',
      fornecedor: '',
      categoria: '' as CategoriaContaRecorrente,
      descricao: '',
      valor: '',
      periodicidade: '' as Periodicidade,
      dataPrimeiroVencimento: undefined,
      formaPagamento: '' as FormaPagamento,
      alteracaoValor: false,
      pagamentoEfetuado: false,
      dataPagamentoEfetuado: undefined,
      bancoPagamento: '',
      agenciaPagamento: '',
      contaPagamento: '',
      multa: '',
      juros: '',
      desconto: '',
      anexos: []
    });
    setErrors({});
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, anexos: [...prev.anexos, ...newFiles] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({ ...prev, anexos: prev.anexos.filter((_, i) => i !== index) }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Conta Recorrente</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Linha 1: Nome + Tipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome da Conta *</Label>
              <Input
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: Aluguel escritório"
              />
              {errors.nome && <span className="text-sm text-destructive">{errors.nome}</span>}
            </div>
            <div className="space-y-2">
              <Label>Tipo de Requisição *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value as TipoRequisicaoSimples }))}>
                <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
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
          </div>

          {/* Linha 2: Departamento Solicitante + Categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Setor/Departamento Solicitante *</Label>
              <Select value={formData.departamentoSolicitante} onValueChange={(value) => setFormData(prev => ({ ...prev, departamentoSolicitante: value }))}>
                <SelectTrigger><SelectValue placeholder="Selecione o departamento" /></SelectTrigger>
                <SelectContent>
                  {mockDepartamentosSimples.map(dept => (
                    <SelectItem key={dept.id} value={dept.nome}>{dept.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.departamentoSolicitante && <span className="text-sm text-destructive">{errors.departamentoSolicitante}</span>}
            </div>
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value as CategoriaContaRecorrente }))}>
                <SelectTrigger><SelectValue placeholder="Selecione a categoria" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="agua">Água</SelectItem>
                  <SelectItem value="luz">Luz</SelectItem>
                  <SelectItem value="aluguel">Aluguel</SelectItem>
                  <SelectItem value="telefonia">Telefonia</SelectItem>
                  <SelectItem value="internet">Internet</SelectItem>
                  <SelectItem value="condominio">Condomínio</SelectItem>
                  <SelectItem value="seguros">Seguros</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              {errors.categoria && <span className="text-sm text-destructive">{errors.categoria}</span>}
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
                <RadioGroupItem value="projeto" id="rec-projeto" />
                <Label htmlFor="rec-projeto">Projeto/Cliente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="departamento" id="rec-departamento" />
                <Label htmlFor="rec-departamento">Estrutura/Departamento</Label>
              </div>
            </RadioGroup>

            {formData.vincularA === 'projeto' ? (
              <div className="space-y-2">
                <Label>Projeto/Cliente *</Label>
                <Select value={formData.projetoCliente} onValueChange={(value) => setFormData(prev => ({ ...prev, projetoCliente: value }))}>
                  <SelectTrigger><SelectValue placeholder="Selecione o projeto/cliente" /></SelectTrigger>
                  <SelectContent>
                    {mockProjetosSimples.map(p => (
                      <SelectItem key={p.id} value={p.nome}>{p.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.projetoCliente && <span className="text-sm text-destructive">{errors.projetoCliente}</span>}
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Departamento *</Label>
                <Select value={formData.departamento} onValueChange={(value) => setFormData(prev => ({ ...prev, departamento: value }))}>
                  <SelectTrigger><SelectValue placeholder="Selecione o departamento" /></SelectTrigger>
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

          {/* Fornecedor + Valor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fornecedor *</Label>
              <Select value={formData.fornecedor} onValueChange={(value) => setFormData(prev => ({ ...prev, fornecedor: value }))}>
                <SelectTrigger><SelectValue placeholder="Selecione o fornecedor" /></SelectTrigger>
                <SelectContent>
                  {mockFornecedoresSimples.map(f => (
                    <SelectItem key={f.id} value={f.nome}>{f.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fornecedor && <span className="text-sm text-destructive">{errors.fornecedor}</span>}
            </div>
            <div className="space-y-2">
              <Label>Valor {!formData.alteracaoValor ? '*' : '(fixo)'}</Label>
              <MoneyInput
                value={formData.valor}
                onChange={(value) => setFormData(prev => ({ ...prev, valor: value }))}
                currency="BRL"
              />
              {errors.valor && <span className="text-sm text-destructive">{errors.valor}</span>}
            </div>
          </div>

          {/* Há alteração de valor? */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Switch
              checked={formData.alteracaoValor}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, alteracaoValor: checked }))}
            />
            <div>
              <Label className="text-sm font-medium">Há alteração de valor?</Label>
              <p className="text-xs text-muted-foreground">
                {formData.alteracaoValor 
                  ? 'Sim — o valor virá em branco a cada mês para preenchimento manual'
                  : 'Não — o valor será repetido todo mês (editável em caso de atraso/multa)'
                }
              </p>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              placeholder="Descreva a despesa recorrente..."
              rows={3}
            />
          </div>

          {/* Periodicidade + Data Primeiro Vencimento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Periodicidade *</Label>
              <Select value={formData.periodicidade} onValueChange={(value) => setFormData(prev => ({ ...prev, periodicidade: value as Periodicidade }))}>
                <SelectTrigger><SelectValue placeholder="Selecione a periodicidade" /></SelectTrigger>
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
            <div className="space-y-2">
              <Label>Data do Primeiro Vencimento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !formData.dataPrimeiroVencimento && "text-muted-foreground")}
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
            <Label>Forma de Pagamento *</Label>
            <Select value={formData.formaPagamento} onValueChange={(value) => setFormData(prev => ({ ...prev, formaPagamento: value as FormaPagamento }))}>
              <SelectTrigger><SelectValue placeholder="Selecione a forma de pagamento" /></SelectTrigger>
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

          {/* Pagamento Efetuado */}
          <div className="space-y-3 p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Switch
                checked={formData.pagamentoEfetuado}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, pagamentoEfetuado: checked }))}
              />
              <Label className="text-sm font-medium">Pagamento já efetuado?</Label>
            </div>

            {formData.pagamentoEfetuado && (
              <div className="space-y-4 mt-3">
                <div className="space-y-2">
                  <Label>Data do Pagamento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !formData.dataPagamentoEfetuado && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dataPagamentoEfetuado ? format(formData.dataPagamentoEfetuado, "dd/MM/yyyy") : "Selecione a data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dataPagamentoEfetuado}
                        onSelect={(date) => setFormData(prev => ({ ...prev, dataPagamentoEfetuado: date }))}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <BancoSelect
                  compact
                  value={formData.bancoPagamento}
                  agencia={formData.agenciaPagamento}
                  conta={formData.contaPagamento}
                  onBancoSelect={(banco, agencia, conta) => setFormData(prev => ({ ...prev, bancoPagamento: banco, agenciaPagamento: agencia, contaPagamento: conta }))}
                />
              </div>
            )}
          </div>

          {/* Multa, Juros, Desconto */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Multa</Label>
              <MoneyInput value={formData.multa} onChange={(value) => setFormData(prev => ({ ...prev, multa: value }))} currency="BRL" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Juros</Label>
              <MoneyInput value={formData.juros} onChange={(value) => setFormData(prev => ({ ...prev, juros: value }))} currency="BRL" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Desconto</Label>
              <MoneyInput value={formData.desconto} onChange={(value) => setFormData(prev => ({ ...prev, desconto: value }))} currency="BRL" />
            </div>
          </div>

          {/* Anexos */}
          <div className="space-y-3">
            <Label>Anexos (Contratos, boletos, etc.)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <div className="mt-2">
                  <Label htmlFor="file-upload-recorrente" className="cursor-pointer">
                    <span className="text-primary hover:text-primary/80">Clique para fazer upload</span>
                    <span className="text-muted-foreground"> ou arraste os arquivos aqui</span>
                  </Label>
                  <input id="file-upload-recorrente" type="file" multiple className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, JPG, PNG até 10MB</p>
              </div>
              {formData.anexos.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Arquivos carregados:</p>
                  {formData.anexos.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <span className="text-sm truncate flex-1">{file.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
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
                <strong>Próximo vencimento após o primeiro:</strong>{' '}
                {format(calcularProximoVencimento(formData.dataPrimeiroVencimento, formData.periodicidade), "dd/MM/yyyy")}
              </p>
            </div>
          )}

          {/* Botões */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
