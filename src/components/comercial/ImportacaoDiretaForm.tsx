
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, FileText, DollarSign } from "lucide-react";

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const ImportacaoDiretaForm = ({ isOpen, onClose, onSave, oportunidade }: ImportacaoDiretaFormProps) => {
  const [activeTab, setActiveTab] = useState('comercial');
  const [formData, setFormData] = useState({
    // Dados Comerciais
    codigo: oportunidade?.codigo || '',
    cliente: oportunidade?.cliente || '',
    contato: oportunidade?.contato || '',
    responsavel: oportunidade?.responsavel || '',
    origem: oportunidade?.origem || '',
    familiaComercial: oportunidade?.familiaComercial || '',
    status: oportunidade?.status || 'Em Triagem',
    valor: oportunidade?.valor || 0,
    dataAbertura: oportunidade?.dataAbertura || '',
    descricao: oportunidade?.descricao || '',
    modalidade: 'importacao_direta',
    
    // Dados SPI
    dadosImportacao: {
      paisOrigem: '',
      moeda: 'USD',
      valorMoedaEstrangeira: 0,
      taxaCambio: 0,
      valorConvertido: 0,
      incoterm: '',
      localEntrega: '',
      prazoEntrega: '',
      formaPagamento: '',
      observacoes: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatCurrencyUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {oportunidade ? `Editar Importação Direta - ${formData.codigo}` : 'Nova Importação Direta'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="comercial" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Comercial
                </TabsTrigger>
                <TabsTrigger value="spi" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  SPI
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comercial" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="codigo">Código da Oportunidade</Label>
                    <Input
                      id="codigo"
                      value={formData.codigo}
                      onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="valor">Valor (R$)</Label>
                    <Input
                      id="valor"
                      type="number"
                      value={formData.valor}
                      onChange={(e) => setFormData({...formData, valor: Number(e.target.value)})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cliente">Cliente / Instituição</Label>
                    <Input
                      id="cliente"
                      value={formData.cliente}
                      onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contato">Contato</Label>
                    <Input
                      id="contato"
                      value={formData.contato}
                      onChange={(e) => setFormData({...formData, contato: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Select value={formData.responsavel} onValueChange={(value) => setFormData({...formData, responsavel: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o responsável" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="João Silva">João Silva</SelectItem>
                        <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                        <SelectItem value="Carlos Oliveira">Carlos Oliveira</SelectItem>
                        <SelectItem value="Faber Oliveira">Faber Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="origem">Origem</Label>
                    <Select value={formData.origem} onValueChange={(value) => setFormData({...formData, origem: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vendas RJ">Vendas RJ</SelectItem>
                        <SelectItem value="Vendas SP">Vendas SP</SelectItem>
                        <SelectItem value="Vendas RN">Vendas RN</SelectItem>
                        <SelectItem value="Vendas CE">Vendas CE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="familiaComercial">Família Comercial</Label>
                    <Select value={formData.familiaComercial} onValueChange={(value) => setFormData({...formData, familiaComercial: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a família" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Radiometer ABL">Radiometer ABL</SelectItem>
                        <SelectItem value="Nova Biomedical">Nova Biomedical</SelectItem>
                        <SelectItem value="WEBMED">WEBMED</SelectItem>
                        <SelectItem value="Stat Profile">Stat Profile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Em Triagem">Em Triagem</SelectItem>
                        <SelectItem value="Em Acompanhamento">Em Acompanhamento</SelectItem>
                        <SelectItem value="Ganha">Ganha</SelectItem>
                        <SelectItem value="Perdida">Perdida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dataAbertura">Data de Abertura</Label>
                    <Input
                      id="dataAbertura"
                      type="date"
                      value={formData.dataAbertura}
                      onChange={(e) => setFormData({...formData, dataAbertura: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="spi" className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold mb-4">Dados de Importação</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paisOrigem">País de Origem</Label>
                    <Select 
                      value={formData.dadosImportacao.paisOrigem} 
                      onValueChange={(value) => setFormData({
                        ...formData, 
                        dadosImportacao: {...formData.dadosImportacao, paisOrigem: value}
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o país" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                        <SelectItem value="Alemanha">Alemanha</SelectItem>
                        <SelectItem value="China">China</SelectItem>
                        <SelectItem value="Japão">Japão</SelectItem>
                        <SelectItem value="Coreia do Sul">Coreia do Sul</SelectItem>
                        <SelectItem value="França">França</SelectItem>
                        <SelectItem value="Itália">Itália</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="moeda">Moeda</Label>
                    <Select 
                      value={formData.dadosImportacao.moeda} 
                      onValueChange={(value) => setFormData({
                        ...formData, 
                        dadosImportacao: {...formData.dadosImportacao, moeda: value}
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - Dólar Americano</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - Libra Esterlina</SelectItem>
                        <SelectItem value="JPY">JPY - Iene Japonês</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="valorMoedaEstrangeira">Valor em Moeda Estrangeira</Label>
                    <Input
                      id="valorMoedaEstrangeira"
                      type="number"
                      step="0.01"
                      value={formData.dadosImportacao.valorMoedaEstrangeira}
                      onChange={(e) => setFormData({
                        ...formData, 
                        dadosImportacao: {...formData.dadosImportacao, valorMoedaEstrangeira: Number(e.target.value)}
                      })}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      {formatCurrencyUSD(formData.dadosImportacao.valorMoedaEstrangeira)}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="taxaCambio">Taxa de Câmbio</Label>
                    <Input
                      id="taxaCambio"
                      type="number"
                      step="0.0001"
                      value={formData.dadosImportacao.taxaCambio}
                      onChange={(e) => {
                        const taxa = Number(e.target.value);
                        const valorConvertido = formData.dadosImportacao.valorMoedaEstrangeira * taxa;
                        setFormData({
                          ...formData, 
                          dadosImportacao: {
                            ...formData.dadosImportacao, 
                            taxaCambio: taxa,
                            valorConvertido: valorConvertido
                          }
                        });
                      }}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Valor Convertido (BRL)</Label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <span className="text-lg font-semibold text-green-600">
                        {formatCurrency(formData.dadosImportacao.valorConvertido)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="incoterm">Incoterm</Label>
                    <Select 
                      value={formData.dadosImportacao.incoterm} 
                      onValueChange={(value) => setFormData({
                        ...formData, 
                        dadosImportacao: {...formData.dadosImportacao, incoterm: value}
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o Incoterm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EXW">EXW - Ex Works</SelectItem>
                        <SelectItem value="FCA">FCA - Free Carrier</SelectItem>
                        <SelectItem value="CPT">CPT - Carriage Paid To</SelectItem>
                        <SelectItem value="CIP">CIP - Carriage and Insurance Paid To</SelectItem>
                        <SelectItem value="DAP">DAP - Delivered at Place</SelectItem>
                        <SelectItem value="DPU">DPU - Delivered at Place Unloaded</SelectItem>
                        <SelectItem value="DDP">DDP - Delivered Duty Paid</SelectItem>
                        <SelectItem value="FAS">FAS - Free Alongside Ship</SelectItem>
                        <SelectItem value="FOB">FOB - Free on Board</SelectItem>
                        <SelectItem value="CFR">CFR - Cost and Freight</SelectItem>
                        <SelectItem value="CIF">CIF - Cost, Insurance and Freight</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="localEntrega">Local de Entrega</Label>
                    <Input
                      id="localEntrega"
                      value={formData.dadosImportacao.localEntrega}
                      onChange={(e) => setFormData({
                        ...formData, 
                        dadosImportacao: {...formData.dadosImportacao, localEntrega: e.target.value}
                      })}
                      placeholder="Endereço completo de entrega"
                    />
                  </div>

                  <div>
                    <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
                    <Input
                      id="prazoEntrega"
                      value={formData.dadosImportacao.prazoEntrega}
                      onChange={(e) => setFormData({
                        ...formData, 
                        dadosImportacao: {...formData.dadosImportacao, prazoEntrega: e.target.value}
                      })}
                      placeholder="Ex: 30 dias úteis"
                    />
                  </div>

                  <div>
                    <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                    <Select 
                      value={formData.dadosImportacao.formaPagamento} 
                      onValueChange={(value) => setFormData({
                        ...formData, 
                        dadosImportacao: {...formData.dadosImportacao, formaPagamento: value}
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a forma de pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carta_credito">Carta de Crédito</SelectItem>
                        <SelectItem value="cobranca_documentaria">Cobrança Documentária</SelectItem>
                        <SelectItem value="remessa_antecipada">Remessa Antecipada</SelectItem>
                        <SelectItem value="pagamento_vista">Pagamento à Vista</SelectItem>
                        <SelectItem value="parcelado">Parcelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.dadosImportacao.observacoes}
                    onChange={(e) => setFormData({
                      ...formData, 
                      dadosImportacao: {...formData.dadosImportacao, observacoes: e.target.value}
                    })}
                    rows={3}
                    placeholder="Informações adicionais sobre a importação..."
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportacaoDiretaForm;
