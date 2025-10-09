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
import { Network, Upload, X, FileText, Calendar, Building } from "lucide-react";
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
    descricaoNecessidade: '',
    sistemaCliente: '',
    prazoDesejado: '',
    anexos: [] as File[],
    observacoes: '',
    valor: oportunidade?.valor || 0
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
    if (!formData.descricaoNecessidade.trim()) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "A descrição da necessidade é obrigatória."
      });
      return;
    }

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
      descricaoNecessidade: '',
      sistemaCliente: '',
      prazoDesejado: '',
      anexos: [],
      observacoes: '',
      valor: 0
    });

    toast({
      title: "Solicitação Enviada",
      description: "A solicitação de interfaceamento foi enviada para a TI."
    });
  };

  const handleClose = () => {
    setFormData({
      descricaoNecessidade: '',
      sistemaCliente: '',
      prazoDesejado: '',
      anexos: [],
      observacoes: '',
      valor: 0
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
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="descricaoNecessidade" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Descrição da Necessidade *
                  <Badge variant="outline" className="text-xs">Obrigatório</Badge>
                </Label>
                <Textarea
                  id="descricaoNecessidade"
                  value={formData.descricaoNecessidade}
                  onChange={(e) => handleInputChange('descricaoNecessidade', e.target.value)}
                  placeholder="Descreva detalhadamente a necessidade de integração..."
                  rows={6}
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
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
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