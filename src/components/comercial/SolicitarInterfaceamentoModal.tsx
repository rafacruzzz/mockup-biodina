import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Network, Upload, X, FileText, Calendar, Building, DollarSign, CreditCard, User, Repeat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SolicitarInterfaceamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade: any;
}

const SolicitarInterfaceamentoModal = ({ isOpen, onClose, onSave, oportunidade }: SolicitarInterfaceamentoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    sistemaCliente: '',
    prazoDesejado: '',
    anexos: [] as File[],
    observacoes: '',
    valor: oportunidade?.valor || 0,
    // Novos campos para financeiro
    contratoAnexo: null as File | null,
    periodoContratoInicio: '',
    periodoContratoFim: '',
    recorrenciaContrato: '',
    formaPagamento: '',
    cnpjFornecedor: '',
    banco: '',
    agencia: '',
    conta: '',
    chavePix: '',
    boletoAnexo: null as File | null,
    responsavelAutorizacao: ''
  });

  useEffect(() => {
    if (oportunidade?.valor !== undefined) {
      setFormData(prev => ({ ...prev, valor: oportunidade.valor }));
    }
  }, [oportunidade]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ 
      ...prev, 
      anexos: [...prev.anexos, ...files].slice(0, 5) // Máximo 5 arquivos
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      anexos: prev.anexos.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.sistemaCliente.trim()) {
      toast({
        variant: "destructive", 
        title: "Erro de Validação",
        description: "O sistema do cliente é obrigatório."
      });
      return;
    }

    if (!formData.prazoDesejado) {
      toast({
        variant: "destructive",
        title: "Erro de Validação", 
        description: "O prazo desejado é obrigatório."
      });
      return;
    }

    if (!formData.periodoContratoInicio || !formData.periodoContratoFim) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "O período do contrato é obrigatório."
      });
      return;
    }

    if (!formData.recorrenciaContrato) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "A recorrência do contrato é obrigatória."
      });
      return;
    }

    if (!formData.formaPagamento) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "A forma de pagamento é obrigatória."
      });
      return;
    }

    if (!formData.responsavelAutorizacao.trim()) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "O responsável pela autorização é obrigatório."
      });
      return;
    }

    const solicitacaoData = {
      ...formData,
      clienteNome: oportunidade?.cliente || '',
      oportunidadeId: oportunidade?.codigo || '',
      responsavel: oportunidade?.responsavel || '',
      status: 'aguardando_aprovacao',
      statusOportunidade: oportunidade?.status || '',
      segmento: oportunidade?.segmento || '',
      valor: formData.valor,
      solicitante: 'Current User', // This would come from auth context
      departamentoSolicitante: 'Comercial',
      dataSolicitacao: new Date().toISOString(),
      dataUltimaAtualizacao: new Date().toISOString(),
      histomicoStatus: [
        {
          status: 'aguardando_aprovacao',
          data: new Date().toISOString(),
          responsavel: 'Current User',
          observacoes: 'Solicitação criada pelo módulo Comercial'
        }
      ]
    };

    onSave(solicitacaoData);
    
    // Reset form
    setFormData({
      sistemaCliente: '',
      prazoDesejado: '',
      anexos: [],
      observacoes: '',
      valor: 0,
      contratoAnexo: null,
      periodoContratoInicio: '',
      periodoContratoFim: '',
      recorrenciaContrato: '',
      formaPagamento: '',
      cnpjFornecedor: '',
      banco: '',
      agencia: '',
      conta: '',
      chavePix: '',
      boletoAnexo: null,
      responsavelAutorizacao: ''
    });

    toast({
      title: "Requisição de Pagamento Criada",
      description: "A requisição foi enviada para Contas a Pagar para aprovação."
    });
  };

  const handleClose = () => {
    setFormData({
      sistemaCliente: '',
      prazoDesejado: '',
      anexos: [],
      observacoes: '',
      valor: 0,
      contratoAnexo: null,
      periodoContratoInicio: '',
      periodoContratoFim: '',
      recorrenciaContrato: '',
      formaPagamento: '',
      cnpjFornecedor: '',
      banco: '',
      agencia: '',
      conta: '',
      chavePix: '',
      boletoAnexo: null,
      responsavelAutorizacao: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Network className="h-6 w-6 text-primary" />
            Solicitação de Interfaceamento para {oportunidade?.cliente}
          </DialogTitle>
          <DialogDescription>
            Preencha os detalhes da solicitação de integração de sistemas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações da Oportunidade */}
          <Card className="bg-muted/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Building className="h-5 w-5" />
                Informações da Oportunidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Cliente:</span>
                  <p className="mt-1">{oportunidade?.cliente}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Oportunidade:</span>
                  <p className="mt-1">{oportunidade?.codigo}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Responsável:</span>
                  <p className="mt-1">{oportunidade?.responsavel}</p>
                </div>
                <div>
                  <Label htmlFor="valorOportunidade" className="font-medium text-muted-foreground">
                    Valor:
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm">R$</span>
                    <Input
                      id="valorOportunidade"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.valor}
                      onChange={(e) => handleInputChange('valor', parseFloat(e.target.value) || 0)}
                      className="w-full"
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Status:</span>
                  <Badge variant="secondary" className="mt-1">
                    {oportunidade?.status}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Segmento:</span>
                  <p className="mt-1">{oportunidade?.segmento}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Formulário de Solicitação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="sistemaCliente" className="flex items-center gap-2">
                  Sistema do Cliente *
                  <Badge variant="outline" className="text-xs">Obrigatório</Badge>
                </Label>
                <Select 
                  value={formData.sistemaCliente} 
                  onValueChange={(value) => handleInputChange('sistemaCliente', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o sistema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aquare">Aquare</SelectItem>
                    <SelectItem value="webmed">WebMed</SelectItem>
                    <SelectItem value="philips">Philips</SelectItem>
                    <SelectItem value="tasy">Tasy</SelectItem>
                    <SelectItem value="soul-mv">Soul MV</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="tiss">TISS</SelectItem>
                    <SelectItem value="horus">Horus</SelectItem>
                    <SelectItem value="sgh">SGH</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="prazoDesejado" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Prazo Desejado *
                  <Badge variant="outline" className="text-xs">Obrigatório</Badge>
                </Label>
                <Input
                  id="prazoDesejado"
                  type="date"
                  value={formData.prazoDesejado}
                  onChange={(e) => handleInputChange('prazoDesejado', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="observacoes">Observações Adicionais</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  placeholder="Informações adicionais que possam ajudar a TI..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Documentação Técnica
                  <Badge variant="secondary" className="text-xs">Máx. 5 arquivos</Badge>
                </Label>
                <div className="mt-1">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="fileUpload"
                  />
                  <label 
                    htmlFor="fileUpload"
                    className="flex items-center justify-center w-full h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                      <p className="text-sm text-muted-foreground">
                        Clique para selecionar arquivos
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, XLS, imagens
                      </p>
                    </div>
                  </label>
                </div>

                {formData.anexos.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.anexos.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm truncate">{file.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {(file.size / 1024).toFixed(1)} KB
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Contrato */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Contrato de Interfaceamento *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="contratoAnexo">Anexar Contrato</Label>
                    <Input
                      id="contratoAnexo"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleInputChange('contratoAnexo', file);
                      }}
                      className="mt-1"
                    />
                    {formData.contratoAnexo && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.contratoAnexo.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="periodoContratoInicio" className="text-xs">
                        Início do Contrato *
                      </Label>
                      <Input
                        id="periodoContratoInicio"
                        type="date"
                        value={formData.periodoContratoInicio}
                        onChange={(e) => handleInputChange('periodoContratoInicio', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="periodoContratoFim" className="text-xs">
                        Fim do Contrato *
                      </Label>
                      <Input
                        id="periodoContratoFim"
                        type="date"
                        value={formData.periodoContratoFim}
                        onChange={(e) => handleInputChange('periodoContratoFim', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="recorrenciaContrato" className="flex items-center gap-2 text-xs">
                      <Repeat className="h-3 w-3" />
                      Recorrência *
                    </Label>
                    <Select 
                      value={formData.recorrenciaContrato} 
                      onValueChange={(value) => handleInputChange('recorrenciaContrato', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="bimestral">Bimestral</SelectItem>
                        <SelectItem value="trimestral">Trimestral</SelectItem>
                        <SelectItem value="semestral">Semestral</SelectItem>
                        <SelectItem value="anual">Anual</SelectItem>
                        <SelectItem value="pagamento_unico">Pagamento Único</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Dados de Pagamento */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Dados para Pagamento *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="formaPagamento" className="flex items-center gap-2 text-xs">
                      <CreditCard className="h-3 w-3" />
                      Forma de Pagamento *
                    </Label>
                    <Select 
                      value={formData.formaPagamento} 
                      onValueChange={(value) => handleInputChange('formaPagamento', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pix">PIX</SelectItem>
                        <SelectItem value="boleto">Boleto</SelectItem>
                        <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                        <SelectItem value="ted">TED</SelectItem>
                        <SelectItem value="doc">DOC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="cnpjFornecedor" className="text-xs">CNPJ Fornecedor</Label>
                    <Input
                      id="cnpjFornecedor"
                      value={formData.cnpjFornecedor}
                      onChange={(e) => handleInputChange('cnpjFornecedor', e.target.value)}
                      placeholder="00.000.000/0000-00"
                      className="mt-1"
                    />
                  </div>

                  {formData.formaPagamento === 'pix' && (
                    <div>
                      <Label htmlFor="chavePix" className="text-xs">Chave PIX</Label>
                      <Input
                        id="chavePix"
                        value={formData.chavePix}
                        onChange={(e) => handleInputChange('chavePix', e.target.value)}
                        placeholder="Digite a chave PIX"
                        className="mt-1"
                      />
                    </div>
                  )}

                  {(formData.formaPagamento === 'transferencia' || formData.formaPagamento === 'ted' || formData.formaPagamento === 'doc') && (
                    <>
                      <div>
                        <Label htmlFor="banco" className="text-xs">Banco</Label>
                        <Input
                          id="banco"
                          value={formData.banco}
                          onChange={(e) => handleInputChange('banco', e.target.value)}
                          placeholder="Nome do banco"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="agencia" className="text-xs">Agência</Label>
                          <Input
                            id="agencia"
                            value={formData.agencia}
                            onChange={(e) => handleInputChange('agencia', e.target.value)}
                            placeholder="0000"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="conta" className="text-xs">Conta</Label>
                          <Input
                            id="conta"
                            value={formData.conta}
                            onChange={(e) => handleInputChange('conta', e.target.value)}
                            placeholder="00000-0"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {formData.formaPagamento === 'boleto' && (
                    <div>
                      <Label htmlFor="boletoAnexo" className="text-xs">Anexar Boleto</Label>
                      <Input
                        id="boletoAnexo"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleInputChange('boletoAnexo', file);
                        }}
                        className="mt-1"
                      />
                      {formData.boletoAnexo && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {formData.boletoAnexo.name}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Responsável pela Autorização */}
              <div>
                <Label htmlFor="responsavelAutorizacao" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Responsável pela Autorização *
                  <Badge variant="outline" className="text-xs">Obrigatório</Badge>
                </Label>
                <Input
                  id="responsavelAutorizacao"
                  value={formData.responsavelAutorizacao}
                  onChange={(e) => handleInputChange('responsavelAutorizacao', e.target.value)}
                  placeholder="Nome do responsável"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <Separator />
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Network className="h-4 w-4" />
              Enviar Solicitação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SolicitarInterfaceamentoModal;