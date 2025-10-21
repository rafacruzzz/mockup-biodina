import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoneyInput } from "@/components/ui/money-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarIcon, 
  Package, 
  Briefcase, 
  DollarSign, 
  RotateCcw, 
  Info, 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  Truck, 
  CheckCircle2, 
  Calendar as CalendarIcon2, 
  RefreshCw 
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface RetornoTabProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const RetornoTab = ({ formData, onInputChange }: RetornoTabProps) => {
  const [uploadedDANFE, setUploadedDANFE] = useState<File | null>(null);

  const getCurrencyLabel = () => {
    return formData.moeda === 'BRL' ? 'R$' : 'USD';
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
            onSelect={(date) => onInputChange(field, date)}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  const handleDANFEUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDANFE(file);
      onInputChange('danfeRetornoFile', file);
    }
  };

  const handleComprovanteUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onInputChange('comprovanteFile', file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Card 1: Tipo de Retorno */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Tipo de Retorno do Empréstimo *
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Selecione como o empréstimo será abatido
          </p>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.tipoRetorno || ''}
            onValueChange={(value) => onInputChange('tipoRetorno', value)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Opção 1: Retorno de Produto */}
            <div className="flex items-center space-x-2 border-2 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
              <RadioGroupItem value="produto" id="produto" />
              <Label htmlFor="produto" className="flex flex-col cursor-pointer flex-1">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Produto</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  Devolução física de mercadoria
                </span>
              </Label>
            </div>

            {/* Opção 2: Prestação de Serviço */}
            <div className="flex items-center space-x-2 border-2 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
              <RadioGroupItem value="servico" id="servico" />
              <Label htmlFor="servico" className="flex flex-col cursor-pointer flex-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">Serviço</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  Prestação de serviço equivalente
                </span>
              </Label>
            </div>

            {/* Opção 3: Retorno Financeiro */}
            <div className="flex items-center space-x-2 border-2 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
              <RadioGroupItem value="financeiro" id="financeiro" />
              <Label htmlFor="financeiro" className="flex flex-col cursor-pointer flex-1">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold">Financeiro</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  Pagamento em dinheiro/transferência
                </span>
              </Label>
            </div>
          </RadioGroup>

          {/* Alerta Informativo */}
          {!formData.tipoRetorno && (
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Selecione o tipo de retorno para visualizar os campos específicos
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Card 2: Upload de DANFE de Retorno (OPCIONAL) */}
      {formData.tipoRetorno && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upload de DANFE de Retorno
              <Badge variant="outline" className="ml-2">Opcional</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Caso o retorno seja acompanhado de nota fiscal
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Área de Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                Selecione o arquivo da DANFE (PDF ou XML)
              </p>
              <input
                type="file"
                accept=".pdf,.xml"
                onChange={handleDANFEUpload}
                className="hidden"
                id="danfe-retorno-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('danfe-retorno-upload')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Selecionar Arquivo
              </Button>
            </div>

            {/* Preview do arquivo uploadado */}
            {uploadedDANFE && (
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">{uploadedDANFE.name}</p>
                    <p className="text-xs text-gray-500">
                      {(uploadedDANFE.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Anexado
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Card 3: Informações do Retorno - PRODUTO */}
      {formData.tipoRetorno === 'produto' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Informações do Retorno de Produto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status do Produto */}
            <div>
              <Label>Status do Produto no Estoque *</Label>
              <Select 
                value={formData.statusRetorno}
                onValueChange={(value) => onInputChange('statusRetorno', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aguardando_recebimento">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      Aguardando Recebimento
                    </div>
                  </SelectItem>
                  <SelectItem value="em_transito">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-600" />
                      Em Trânsito
                    </div>
                  </SelectItem>
                  <SelectItem value="recebido_estoque">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Recebido no Estoque
                    </div>
                  </SelectItem>
                  <SelectItem value="conferido_aprovado">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-700" />
                      Conferido e Aprovado
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid de campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Número da DANFE de Retorno</Label>
                <Input
                  value={formData.numeroDanfeRetorno}
                  onChange={(e) => onInputChange('numeroDanfeRetorno', e.target.value)}
                  placeholder="Ex: 12345"
                />
              </div>

              <div>
                <Label>Referência do Produto</Label>
                <Input
                  value={formData.referenciaProdutoRecebido}
                  onChange={(e) => onInputChange('referenciaProdutoRecebido', e.target.value)}
                  placeholder="Ex: PRD-001"
                />
              </div>

              <div>
                <Label>Valor Retornado ({getCurrencyLabel()}) *</Label>
                <MoneyInput
                  value={formData.valorRetornadoProduto}
                  onChange={(value) => onInputChange('valorRetornadoProduto', value)}
                  currency={formData.moeda}
                />
              </div>

              <div className="md:col-span-2">
                <Label>Descrição do Produto Recebido</Label>
                <Textarea
                  value={formData.descricaoProdutoRecebido}
                  onChange={(e) => onInputChange('descricaoProdutoRecebido', e.target.value)}
                  placeholder="Descreva o produto recebido na devolução"
                  rows={3}
                />
              </div>

              <DatePicker label="Data do Retorno" field="dataRetorno" required />
              <DatePicker label="Data da Baixa" field="dataBaixa" />
            </div>

            {/* Badge de Status Atual */}
            {formData.statusRetorno && (
              <Alert className={
                formData.statusRetorno === 'conferido_aprovado' ? 'bg-green-50 border-green-200' :
                formData.statusRetorno === 'recebido_estoque' ? 'bg-blue-50 border-blue-200' :
                'bg-yellow-50 border-yellow-200'
              }>
                <AlertDescription className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Status atual: <strong>{formData.statusRetorno.replace(/_/g, ' ').toUpperCase()}</strong>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Card 3: Informações do Retorno - SERVIÇO */}
      {formData.tipoRetorno === 'servico' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-green-600" />
              Informações da Prestação de Serviço
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status do Serviço */}
            <div>
              <Label>Status do Serviço *</Label>
              <Select 
                value={formData.statusRetorno}
                onValueChange={(value) => onInputChange('statusRetorno', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agendado">
                    <div className="flex items-center gap-2">
                      <CalendarIcon2 className="h-4 w-4 text-blue-600" />
                      Agendado
                    </div>
                  </SelectItem>
                  <SelectItem value="em_andamento">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-yellow-600" />
                      Em Andamento
                    </div>
                  </SelectItem>
                  <SelectItem value="concluido">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Concluído
                    </div>
                  </SelectItem>
                  <SelectItem value="aprovado_cliente">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-700" />
                      Aprovado pelo Cliente
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid de campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tipo de Serviço *</Label>
                <Input
                  value={formData.tipoServico}
                  onChange={(e) => onInputChange('tipoServico', e.target.value)}
                  placeholder="Ex: Instalação, Manutenção, Treinamento"
                />
              </div>

              <div>
                <Label>Valor do Serviço ({getCurrencyLabel()}) *</Label>
                <MoneyInput
                  value={formData.valorServico}
                  onChange={(value) => onInputChange('valorServico', value)}
                  currency={formData.moeda}
                />
              </div>

              <div>
                <Label>Responsável pela Execução</Label>
                <Input
                  value={formData.responsavelServico}
                  onChange={(e) => onInputChange('responsavelServico', e.target.value)}
                  placeholder="Nome do responsável"
                />
              </div>

              <DatePicker label="Data de Execução" field="dataExecucaoServico" required />
              <DatePicker label="Data de Conclusão" field="dataConclusaoServico" />

              <div className="md:col-span-2">
                <Label>Descrição do Serviço Prestado</Label>
                <Textarea
                  value={formData.descricaoServico}
                  onChange={(e) => onInputChange('descricaoServico', e.target.value)}
                  placeholder="Descreva detalhadamente o serviço prestado..."
                  rows={4}
                />
              </div>

              <div className="md:col-span-2">
                <Label>Observações / Notas do Cliente</Label>
                <Textarea
                  value={formData.observacoesServico}
                  onChange={(e) => onInputChange('observacoesServico', e.target.value)}
                  placeholder="Feedback do cliente, pendências, etc."
                  rows={2}
                />
              </div>
            </div>

            {/* Badge de Status Atual */}
            {formData.statusRetorno && (
              <Alert className={
                formData.statusRetorno === 'aprovado_cliente' ? 'bg-green-50 border-green-200' :
                formData.statusRetorno === 'concluido' ? 'bg-blue-50 border-blue-200' :
                'bg-yellow-50 border-yellow-200'
              }>
                <AlertDescription className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Status atual: <strong>{formData.statusRetorno.replace(/_/g, ' ').toUpperCase()}</strong>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Card 3: Informações do Retorno - FINANCEIRO */}
      {formData.tipoRetorno === 'financeiro' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-600" />
              Informações do Retorno Financeiro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status do Pagamento */}
            <div>
              <Label>Status do Pagamento *</Label>
              <Select 
                value={formData.statusRetorno}
                onValueChange={(value) => onInputChange('statusRetorno', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aguardando_pagamento">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      Aguardando Pagamento
                    </div>
                  </SelectItem>
                  <SelectItem value="pagamento_realizado">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Pagamento Realizado
                    </div>
                  </SelectItem>
                  <SelectItem value="pagamento_confirmado">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Pagamento Confirmado
                    </div>
                  </SelectItem>
                  <SelectItem value="baixa_concluida">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-700" />
                      Baixa Concluída
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid de campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Forma de Pagamento *</Label>
                <Select
                  value={formData.formaPagamento}
                  onValueChange={(value) => onInputChange('formaPagamento', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="ted">TED</SelectItem>
                    <SelectItem value="doc">DOC</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Valor Retornado ({getCurrencyLabel()}) *</Label>
                <MoneyInput
                  value={formData.valorRetornado}
                  onChange={(value) => onInputChange('valorRetornado', value)}
                  currency={formData.moeda}
                  placeholder={formData.moeda === 'BRL' ? 'R$ 0,00' : '$0.00'}
                />
              </div>

              <div>
                <Label>Número do Comprovante / Transação</Label>
                <Input
                  value={formData.numeroComprovante}
                  onChange={(e) => onInputChange('numeroComprovante', e.target.value)}
                  placeholder="Ex: PIX-123456789"
                />
              </div>

              <DatePicker label="Data do Pagamento" field="dataPagamento" required />

              <div className="md:col-span-2">
                <Label>Upload do Comprovante de Pagamento</Label>
                <div className="border-2 border-dashed rounded-lg p-4 mt-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleComprovanteUpload}
                    className="hidden"
                    id="comprovante-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('comprovante-upload')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Anexar Comprovante
                  </Button>
                </div>
                {formData.comprovanteFile && (
                  <div className="flex items-center gap-2 mt-2 p-2 bg-green-50 rounded-lg">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{formData.comprovanteFile.name}</span>
                    <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <Label>Observações sobre o Pagamento</Label>
                <Textarea
                  value={formData.observacoesPagamento}
                  onChange={(e) => onInputChange('observacoesPagamento', e.target.value)}
                  placeholder="Informações adicionais sobre o pagamento..."
                  rows={2}
                />
              </div>

              <DatePicker label="Data da Baixa" field="dataBaixa" />
            </div>

            {/* Badge de Status Atual */}
            {formData.statusRetorno && (
              <Alert className={
                formData.statusRetorno === 'baixa_concluida' ? 'bg-green-50 border-green-200' :
                formData.statusRetorno === 'pagamento_confirmado' ? 'bg-blue-50 border-blue-200' :
                'bg-yellow-50 border-yellow-200'
              }>
                <AlertDescription className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Status atual: <strong>{formData.statusRetorno.replace(/_/g, ' ').toUpperCase()}</strong>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RetornoTab;
