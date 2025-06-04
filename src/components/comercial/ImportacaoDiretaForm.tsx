
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Save, Upload, MessageSquare, FileText, Building2, ClipboardList, Calendar, User } from "lucide-react";

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const ImportacaoDiretaForm = ({ isOpen, onClose, onSave }: ImportacaoDiretaFormProps) => {
  const [activeTab, setActiveTab] = useState("comercial");
  const [formData, setFormData] = useState({
    // Dados Comerciais
    numeroOportunidade: '',
    cliente: '',
    contato: '',
    email: '',
    telefone: '',
    valorEstimado: '',
    prazoEntrega: '',
    condicoesPagamento: '',
    observacoesComerciais: '',
    
    // SPI
    fornecedor: '',
    paisOrigem: '',
    incoterm: '',
    localEntrega: '',
    prazoFabricacao: '',
    validadeProposta: '',
    condicoesTecnicas: '',
    certificacoes: '',
    garantia: '',
    observacoesSPI: '',
    
    // Dados Gerais
    dataAbertura: new Date().toISOString().split('T')[0],
    responsavel: '',
    prioridade: 'media',
    categoria: 'equipamento',
    subcategoria: '',
    aplicacao: '',
    
    // Análise Técnica
    especificacoesTecnicas: '',
    requisitosMinimos: '',
    compatibilidade: '',
    instalacao: '',
    manutencao: '',
    
    // Histórico/Chat
    historico: [],
    
    // Documentos
    documentos: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addHistoryEntry = (message: string) => {
    const newEntry = {
      id: Date.now(),
      message,
      timestamp: new Date(),
      author: 'Sistema'
    };
    setFormData(prev => ({
      ...prev,
      historico: [...prev.historico, newEntry]
    }));
  };

  const uploadDocument = (file: File) => {
    const newDoc = {
      id: Date.now(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date()
    };
    setFormData(prev => ({
      ...prev,
      documentos: [...prev.documentos, newDoc]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Nova Importação Direta
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="comercial" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Comercial
              </TabsTrigger>
              <TabsTrigger value="spi" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                SPI
              </TabsTrigger>
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger value="analise-tecnica" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Análise Técnica
              </TabsTrigger>
              <TabsTrigger value="historico" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Histórico/Chat
              </TabsTrigger>
              <TabsTrigger value="documentos" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comercial" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Comerciais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numeroOportunidade">Número da Oportunidade</Label>
                      <Input
                        id="numeroOportunidade"
                        value={formData.numeroOportunidade}
                        onChange={(e) => setFormData({...formData, numeroOportunidade: e.target.value})}
                        placeholder="Auto-gerado"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cliente">Cliente</Label>
                      <Input
                        id="cliente"
                        value={formData.cliente}
                        onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                        placeholder="Nome do cliente"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="contato">Contato</Label>
                      <Input
                        id="contato"
                        value={formData.contato}
                        onChange={(e) => setFormData({...formData, contato: e.target.value})}
                        placeholder="Nome do contato"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valorEstimado">Valor Estimado (R$)</Label>
                      <Input
                        id="valorEstimado"
                        type="number"
                        step="0.01"
                        value={formData.valorEstimado}
                        onChange={(e) => setFormData({...formData, valorEstimado: e.target.value})}
                        placeholder="0,00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="prazoEntrega">Prazo de Entrega (dias)</Label>
                      <Input
                        id="prazoEntrega"
                        type="number"
                        value={formData.prazoEntrega}
                        onChange={(e) => setFormData({...formData, prazoEntrega: e.target.value})}
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="condicoesPagamento">Condições de Pagamento</Label>
                    <Select value={formData.condicoesPagamento} onValueChange={(value) => setFormData({...formData, condicoesPagamento: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione as condições" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a-vista">À Vista</SelectItem>
                        <SelectItem value="30-dias">30 dias</SelectItem>
                        <SelectItem value="60-dias">60 dias</SelectItem>
                        <SelectItem value="90-dias">90 dias</SelectItem>
                        <SelectItem value="parcelado">Parcelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="observacoesComerciais">Observações Comerciais</Label>
                    <Textarea
                      id="observacoesComerciais"
                      value={formData.observacoesComerciais}
                      onChange={(e) => setFormData({...formData, observacoesComerciais: e.target.value})}
                      placeholder="Observações e detalhes comerciais..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="spi" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitação de Proposta de Importação (SPI)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fornecedor">Fornecedor Internacional</Label>
                      <Input
                        id="fornecedor"
                        value={formData.fornecedor}
                        onChange={(e) => setFormData({...formData, fornecedor: e.target.value})}
                        placeholder="Nome do fornecedor"
                      />
                    </div>
                    <div>
                      <Label htmlFor="paisOrigem">País de Origem</Label>
                      <Select value={formData.paisOrigem} onValueChange={(value) => setFormData({...formData, paisOrigem: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alemanha">Alemanha</SelectItem>
                          <SelectItem value="china">China</SelectItem>
                          <SelectItem value="eua">Estados Unidos</SelectItem>
                          <SelectItem value="italia">Itália</SelectItem>
                          <SelectItem value="japao">Japão</SelectItem>
                          <SelectItem value="coreia">Coreia do Sul</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="incoterm">Incoterm</Label>
                      <Select value={formData.incoterm} onValueChange={(value) => setFormData({...formData, incoterm: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o Incoterm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fob">FOB - Free on Board</SelectItem>
                          <SelectItem value="cif">CIF - Cost, Insurance and Freight</SelectItem>
                          <SelectItem value="exw">EXW - Ex Works</SelectItem>
                          <SelectItem value="ddu">DDU - Delivered Duty Unpaid</SelectItem>
                          <SelectItem value="ddp">DDP - Delivered Duty Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="localEntrega">Local de Entrega</Label>
                      <Input
                        id="localEntrega"
                        value={formData.localEntrega}
                        onChange={(e) => setFormData({...formData, localEntrega: e.target.value})}
                        placeholder="Endereço de entrega"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prazoFabricacao">Prazo de Fabricação (semanas)</Label>
                      <Input
                        id="prazoFabricacao"
                        type="number"
                        value={formData.prazoFabricacao}
                        onChange={(e) => setFormData({...formData, prazoFabricacao: e.target.value})}
                        placeholder="8"
                      />
                    </div>
                    <div>
                      <Label htmlFor="validadeProposta">Validade da Proposta (dias)</Label>
                      <Input
                        id="validadeProposta"
                        type="number"
                        value={formData.validadeProposta}
                        onChange={(e) => setFormData({...formData, validadeProposta: e.target.value})}
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="condicoesTecnicas">Condições Técnicas</Label>
                    <Textarea
                      id="condicoesTecnicas"
                      value={formData.condicoesTecnicas}
                      onChange={(e) => setFormData({...formData, condicoesTecnicas: e.target.value})}
                      placeholder="Especificações técnicas detalhadas..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="certificacoes">Certificações Necessárias</Label>
                      <Textarea
                        id="certificacoes"
                        value={formData.certificacoes}
                        onChange={(e) => setFormData({...formData, certificacoes: e.target.value})}
                        placeholder="CE, FDA, ISO..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="garantia">Garantia</Label>
                      <Input
                        id="garantia"
                        value={formData.garantia}
                        onChange={(e) => setFormData({...formData, garantia: e.target.value})}
                        placeholder="12 meses"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="observacoesSPI">Observações da SPI</Label>
                    <Textarea
                      id="observacoesSPI"
                      value={formData.observacoesSPI}
                      onChange={(e) => setFormData({...formData, observacoesSPI: e.target.value})}
                      placeholder="Informações adicionais da SPI..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dados-gerais" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Gerais da Oportunidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="dataAbertura">Data de Abertura</Label>
                      <Input
                        id="dataAbertura"
                        type="date"
                        value={formData.dataAbertura}
                        onChange={(e) => setFormData({...formData, dataAbertura: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="responsavel">Responsável</Label>
                      <Select value={formData.responsavel} onValueChange={(value) => setFormData({...formData, responsavel: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o responsável" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="joao">João Silva</SelectItem>
                          <SelectItem value="maria">Maria Santos</SelectItem>
                          <SelectItem value="pedro">Pedro Costa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="prioridade">Prioridade</Label>
                      <Select value={formData.prioridade} onValueChange={(value) => setFormData({...formData, prioridade: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixa">Baixa</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="alta">Alta</SelectItem>
                          <SelectItem value="urgente">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="categoria">Categoria</Label>
                      <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equipamento">Equipamento</SelectItem>
                          <SelectItem value="reagente">Reagente</SelectItem>
                          <SelectItem value="consumivel">Consumível</SelectItem>
                          <SelectItem value="servico">Serviço</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subcategoria">Subcategoria</Label>
                      <Input
                        id="subcategoria"
                        value={formData.subcategoria}
                        onChange={(e) => setFormData({...formData, subcategoria: e.target.value})}
                        placeholder="Subcategoria específica"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="aplicacao">Aplicação</Label>
                    <Textarea
                      id="aplicacao"
                      value={formData.aplicacao}
                      onChange={(e) => setFormData({...formData, aplicacao: e.target.value})}
                      placeholder="Descreva a aplicação do produto/serviço..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analise-tecnica" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Técnica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="especificacoesTecnicas">Especificações Técnicas</Label>
                    <Textarea
                      id="especificacoesTecnicas"
                      value={formData.especificacoesTecnicas}
                      onChange={(e) => setFormData({...formData, especificacoesTecnicas: e.target.value})}
                      placeholder="Detalhe as especificações técnicas..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="requisitosMinimos">Requisitos Mínimos</Label>
                    <Textarea
                      id="requisitosMinimos"
                      value={formData.requisitosMinimos}
                      onChange={(e) => setFormData({...formData, requisitosMinimos: e.target.value})}
                      placeholder="Liste os requisitos mínimos..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="compatibilidade">Compatibilidade</Label>
                    <Textarea
                      id="compatibilidade"
                      value={formData.compatibilidade}
                      onChange={(e) => setFormData({...formData, compatibilidade: e.target.value})}
                      placeholder="Informações de compatibilidade..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instalacao">Requisitos de Instalação</Label>
                      <Textarea
                        id="instalacao"
                        value={formData.instalacao}
                        onChange={(e) => setFormData({...formData, instalacao: e.target.value})}
                        placeholder="Requisitos para instalação..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="manutencao">Requisitos de Manutenção</Label>
                      <Textarea
                        id="manutencao"
                        value={formData.manutencao}
                        onChange={(e) => setFormData({...formData, manutencao: e.target.value})}
                        placeholder="Requisitos para manutenção..."
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Histórico e Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                      {formData.historico.length === 0 ? (
                        <p className="text-gray-500 text-center">Nenhum histórico disponível</p>
                      ) : (
                        formData.historico.map((entry: any) => (
                          <div key={entry.id} className="border-b pb-2 mb-2 last:border-b-0">
                            <div className="flex justify-between items-start">
                              <span className="font-medium">{entry.author}</span>
                              <span className="text-sm text-gray-500">
                                {new Date(entry.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="mt-1">{entry.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Digite sua mensagem..." 
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addHistoryEntry((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <Button type="button" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentos" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documentos Anexados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                      <Button type="button" variant="outline">
                        Selecionar Arquivos
                      </Button>
                    </div>
                    
                    {formData.documentos.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Arquivos Anexados:</h4>
                        {formData.documentos.map((doc: any) => (
                          <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>{doc.name}</span>
                              <Badge variant="secondary">{(doc.size / 1024).toFixed(1)} KB</Badge>
                            </div>
                            <Button type="button" variant="ghost" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
              <Save className="h-4 w-4 mr-2" />
              Salvar Importação
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportacaoDiretaForm;
