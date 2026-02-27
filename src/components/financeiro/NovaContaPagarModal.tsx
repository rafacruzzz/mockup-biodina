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
import { CalendarIcon, Upload, X, Plus, Trash2 } from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import BancoSelect from './BancoSelect';
import { TipoRequisicaoSimples, StatusConta, FormaPagamento, ContaPagar, ParcelaConta } from '@/types/financeiro';
import { mockDepartamentosSimples, mockProjetosSimples, mockFornecedoresSimples, DOCUMENTOS_OBRIGATORIOS_MODAL } from '@/data/contasPagarData';
import { Switch } from '@/components/ui/switch';

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
    anexos: [] as File[],
    // Novos campos
    pagamentoEfetuado: false,
    dataPagamentoEfetuado: undefined as Date | undefined,
    bancoPagamento: '',
    agenciaPagamento: '',
    contaPagamento: '',
    multa: '',
    juros: '',
    desconto: '',
    tipoPagamento: 'unico' as 'unico' | 'parcelado',
    numeroParcelas: 2,
    parcelas: [] as Array<{
      numero: number;
      dataVencimento: Date | undefined;
      valor: string;
      multa: string;
      juros: string;
      desconto: string;
    }>
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Gerar parcelas automaticamente quando mudar número de parcelas ou valor
  useEffect(() => {
    if (formData.tipoPagamento === 'parcelado' && formData.numeroParcelas > 0 && formData.valor) {
      const valorTotal = parseFloat(formData.valor) / 100;
      const valorParcela = Math.floor((valorTotal / formData.numeroParcelas) * 100);
      const resto = parseFloat(formData.valor) - (valorParcela * formData.numeroParcelas);
      
      const novasParcelas = Array.from({ length: formData.numeroParcelas }, (_, i) => {
        const existing = formData.parcelas[i];
        const parcelaValor = i === 0 ? (valorParcela + resto).toString() : valorParcela.toString();
        return {
          numero: i + 1,
          dataVencimento: existing?.dataVencimento || (formData.dataVencimento ? addMonths(formData.dataVencimento, i) : undefined),
          valor: existing?.valor || parcelaValor,
          multa: existing?.multa || '',
          juros: existing?.juros || '',
          desconto: existing?.desconto || ''
        };
      });
      setFormData(prev => ({ ...prev, parcelas: novasParcelas }));
    }
  }, [formData.numeroParcelas, formData.tipoPagamento]);

  const handleDistribuirParcelas = () => {
    if (!formData.valor || formData.numeroParcelas <= 0) return;
    const valorParcela = Math.floor(parseFloat(formData.valor) / formData.numeroParcelas);
    const resto = parseFloat(formData.valor) - (valorParcela * formData.numeroParcelas);
    
    setFormData(prev => ({
      ...prev,
      parcelas: prev.parcelas.map((p, i) => ({
        ...p,
        valor: i === 0 ? (valorParcela + resto).toString() : valorParcela.toString(),
        dataVencimento: prev.dataVencimento ? addMonths(prev.dataVencimento, i) : p.dataVencimento
      }))
    }));
  };

  const updateParcela = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      parcelas: prev.parcelas.map((p, i) => i === index ? { ...p, [field]: value } : p)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      const parcelasFinais: ParcelaConta[] | undefined = formData.tipoPagamento === 'parcelado' 
        ? formData.parcelas.map(p => ({
            numero: p.numero,
            dataVencimento: p.dataVencimento || new Date(),
            valor: parseFloat(p.valor) / 100,
            multa: p.multa ? parseFloat(p.multa) / 100 : undefined,
            juros: p.juros ? parseFloat(p.juros) / 100 : undefined,
            desconto: p.desconto ? parseFloat(p.desconto) / 100 : undefined,
            pago: false
          }))
        : undefined;

      const novaConta = {
        empresaId: 'biodina-001',
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
        anexos: formData.anexos.map(file => file.name),
        pagamentoEfetuado: formData.pagamentoEfetuado,
        dataPagamentoEfetuado: formData.pagamentoEfetuado ? formData.dataPagamentoEfetuado : undefined,
        bancoPagamento: formData.bancoPagamento || undefined,
        agenciaPagamento: formData.agenciaPagamento || undefined,
        contaPagamento: formData.contaPagamento || undefined,
        multa: formData.multa ? parseFloat(formData.multa) / 100 : undefined,
        juros: formData.juros ? parseFloat(formData.juros) / 100 : undefined,
        desconto: formData.desconto ? parseFloat(formData.desconto) / 100 : undefined,
        tipoPagamento: formData.tipoPagamento,
        numeroParcelas: formData.tipoPagamento === 'parcelado' ? formData.numeroParcelas : undefined,
        parcelas: parcelasFinais,
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
      anexos: [],
      pagamentoEfetuado: false,
      dataPagamentoEfetuado: undefined,
      bancoPagamento: '',
      agenciaPagamento: '',
      contaPagamento: '',
      multa: '',
      juros: '',
      desconto: '',
      tipoPagamento: 'unico',
      numeroParcelas: 2,
      parcelas: []
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

  const formatCurrencyDisplay = (value: string) => {
    if (!value) return 'R$ 0,00';
    const amount = parseFloat(value) / 100;
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
              <Label htmlFor="valor">Valor Total *</Label>
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

          {/* Multa, Juros, Desconto */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Multa, Juros e Desconto</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Multa</Label>
                <MoneyInput
                  value={formData.multa}
                  onChange={(value) => setFormData(prev => ({ ...prev, multa: value }))}
                  currency="BRL"
                />
              </div>
              <div className="space-y-2">
                <Label>Juros</Label>
                <MoneyInput
                  value={formData.juros}
                  onChange={(value) => setFormData(prev => ({ ...prev, juros: value }))}
                  currency="BRL"
                />
              </div>
              <div className="space-y-2">
                <Label>Desconto</Label>
                <MoneyInput
                  value={formData.desconto}
                  onChange={(value) => setFormData(prev => ({ ...prev, desconto: value }))}
                  currency="BRL"
                />
              </div>
            </div>
          </div>

          {/* Pagamento Efetuado */}
          <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Pagamento Efetuado?</Label>
              <Switch
                checked={formData.pagamentoEfetuado}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, pagamentoEfetuado: checked }))}
              />
            </div>

            {formData.pagamentoEfetuado && (
              <div className="space-y-4">
                {/* Data do pagamento efetuado */}
                <div className="space-y-2">
                  <Label>Data do Pagamento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dataPagamentoEfetuado && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dataPagamentoEfetuado ? format(formData.dataPagamentoEfetuado, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dataPagamentoEfetuado}
                        onSelect={(date) => setFormData(prev => ({ ...prev, dataPagamentoEfetuado: date }))}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Dados bancários */}
                <BancoSelect
                  value={formData.bancoPagamento}
                  agencia={formData.agenciaPagamento}
                  conta={formData.contaPagamento}
                  onBancoSelect={(banco, agencia, conta) => setFormData(prev => ({ ...prev, bancoPagamento: banco, agenciaPagamento: agencia, contaPagamento: conta }))}
                />
              </div>
            )}

            {!formData.pagamentoEfetuado && (
              <p className="text-sm text-muted-foreground">
                Se o pagamento ainda não foi efetuado, os dados bancários poderão ser informados no momento da confirmação do pagamento pelo calendário.
              </p>
            )}
          </div>

          {/* Tipo de Pagamento: Único ou Parcelado */}
          <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
            <Label className="text-base font-semibold">Tipo de Pagamento</Label>
            <RadioGroup
              value={formData.tipoPagamento}
              onValueChange={(value) => setFormData(prev => ({ ...prev, tipoPagamento: value as 'unico' | 'parcelado' }))}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unico" id="pagamento-unico" />
                <Label htmlFor="pagamento-unico">Pagamento Único</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parcelado" id="pagamento-parcelado" />
                <Label htmlFor="pagamento-parcelado">Pagamento Parcelado</Label>
              </div>
            </RadioGroup>

            {formData.tipoPagamento === 'parcelado' && (
              <div className="space-y-4">
                <div className="flex items-end gap-4">
                  <div className="space-y-2">
                    <Label>Número de Parcelas</Label>
                    <Input
                      type="number"
                      min={2}
                      max={48}
                      value={formData.numeroParcelas}
                      onChange={(e) => setFormData(prev => ({ ...prev, numeroParcelas: parseInt(e.target.value) || 2 }))}
                      className="w-24"
                    />
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={handleDistribuirParcelas}>
                    Redistribuir valores
                  </Button>
                </div>

                {/* Tabela de parcelas */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-2 font-medium">Parcela</th>
                          <th className="text-left p-2 font-medium">Data Vencimento</th>
                          <th className="text-left p-2 font-medium">Valor</th>
                          <th className="text-left p-2 font-medium">Multa</th>
                          <th className="text-left p-2 font-medium">Juros</th>
                          <th className="text-left p-2 font-medium">Desconto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.parcelas.map((parcela, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-2 font-medium text-muted-foreground">
                              {parcela.numero}/{formData.numeroParcelas}
                            </td>
                            <td className="p-2">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" size="sm" className={cn("w-[130px] justify-start text-left font-normal text-xs", !parcela.dataVencimento && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-1 h-3 w-3" />
                                    {parcela.dataVencimento ? format(parcela.dataVencimento, "dd/MM/yyyy") : "Data"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={parcela.dataVencimento}
                                    onSelect={(date) => updateParcela(index, 'dataVencimento', date)}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                            </td>
                            <td className="p-2">
                              <MoneyInput
                                value={parcela.valor}
                                onChange={(value) => updateParcela(index, 'valor', value)}
                                currency="BRL"
                                className="w-[120px] text-xs h-8"
                              />
                            </td>
                            <td className="p-2">
                              <MoneyInput
                                value={parcela.multa}
                                onChange={(value) => updateParcela(index, 'multa', value)}
                                currency="BRL"
                                className="w-[100px] text-xs h-8"
                              />
                            </td>
                            <td className="p-2">
                              <MoneyInput
                                value={parcela.juros}
                                onChange={(value) => updateParcela(index, 'juros', value)}
                                currency="BRL"
                                className="w-[100px] text-xs h-8"
                              />
                            </td>
                            <td className="p-2">
                              <MoneyInput
                                value={parcela.desconto}
                                onChange={(value) => updateParcela(index, 'desconto', value)}
                                currency="BRL"
                                className="w-[100px] text-xs h-8"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Totais */}
                  <div className="bg-muted/30 p-2 border-t flex justify-between text-sm">
                    <span className="font-medium">Total das parcelas:</span>
                    <span className="font-semibold">
                      {formatCurrencyDisplay(formData.parcelas.reduce((acc, p) => acc + (parseFloat(p.valor) || 0), 0).toString())}
                    </span>
                  </div>
                </div>
              </div>
            )}
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

              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Documentos obrigatórios:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {DOCUMENTOS_OBRIGATORIOS_MODAL.map((doc, index) => (
                    <li key={index}>• {doc}</li>
                  ))}
                </ul>
              </div>

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
