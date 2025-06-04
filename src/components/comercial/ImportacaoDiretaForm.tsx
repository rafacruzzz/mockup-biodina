import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, FileText, MessageSquare, Upload, User, Building, Package, Truck, DollarSign, Clock, CheckCircle, AlertCircle, Upload as UploadIcon } from "lucide-react";

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const ImportacaoDiretaForm: React.FC<ImportacaoDiretaFormProps> = ({ 
  isOpen, 
  oportunidade, 
  onClose, 
  onSave 
}) => {
  const [activeTab, setActiveTab] = useState('comercial');
  const [activeSpiTab, setSpiTab] = useState('dados-gerais');

  // Form state management and handlers
  const [formData, setFormData] = useState({
    // Dados Comerciais
    cliente: oportunidade?.cliente || '',
    contato: oportunidade?.contato || '',
    responsavel: oportunidade?.responsavel || '',
    origem: oportunidade?.origem || '',
    familiaComercial: oportunidade?.familiaComercial || '',
    valor: oportunidade?.valor || '',
    dataAbertura: oportunidade?.dataAbertura || '',
    dataContato: oportunidade?.dataContato || '',
    fonteLead: oportunidade?.fonteLead || '',
    segmento: oportunidade?.segmento || '',
    descricao: oportunidade?.descricao || '',
    
    // Dados SPI
    numeroProcesso: '',
    orgaoComprador: '',
    modalidadeCompra: 'importacao_direta',
    prazoEntrega: '',
    condicoesPagamento: '',
    garantiaExigida: '',
    documentosNecessarios: '',
    observacoesTecnicas: '',
    statusAnalise: 'em_analise',
    responsavelTecnico: '',
    parecer: '',
    recomendacao: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      modalidade: 'importacao_direta',
      tipoOportunidade: 'importacao_direta'
    });
  };

  const renderComercialTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Informações do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                value={formData.cliente}
                onChange={(e) => handleInputChange('cliente', e.target.value)}
                placeholder="Nome do cliente"
              />
            </div>
            <div>
              <Label htmlFor="contato">Contato</Label>
              <Input
                id="contato"
                value={formData.contato}
                onChange={(e) => handleInputChange('contato', e.target.value)}
                placeholder="Informações de contato"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => handleInputChange('responsavel', e.target.value)}
                placeholder="Responsável pela oportunidade"
              />
            </div>
            <div>
              <Label htmlFor="origem">Origem</Label>
              <Input
                id="origem"
                value={formData.origem}
                onChange={(e) => handleInputChange('origem', e.target.value)}
                placeholder="Origem da oportunidade"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Detalhes Comerciais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="familiaComercial">Família Comercial</Label>
              <Select value={formData.familiaComercial} onValueChange={(value) => handleInputChange('familiaComercial', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a família comercial" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radiometer_abl">Radiometer ABL</SelectItem>
                  <SelectItem value="nova_biomedical">Nova Biomedical</SelectItem>
                  <SelectItem value="webmed">WEBMED</SelectItem>
                  <SelectItem value="stat_profile">Stat Profile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                value={formData.valor}
                onChange={(e) => handleInputChange('valor', e.target.value)}
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fonteLead">Fonte do Lead</Label>
              <Select value={formData.fonteLead} onValueChange={(value) => handleInputChange('fonteLead', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a fonte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="site">Site</SelectItem>
                  <SelectItem value="indicacao">Indicação</SelectItem>
                  <SelectItem value="cold_call">Cold Call</SelectItem>
                  <SelectItem value="licitacao">Licitação</SelectItem>
                  <SelectItem value="referencia">Referência</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="segmento">Segmento</Label>
              <Select value={formData.segmento} onValueChange={(value) => handleInputChange('segmento', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospitalar">Hospitalar</SelectItem>
                  <SelectItem value="universitario">Universitário</SelectItem>
                  <SelectItem value="publico">Público</SelectItem>
                  <SelectItem value="privado">Privado</SelectItem>
                  <SelectItem value="municipal">Municipal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dataAbertura">Data de Abertura</Label>
              <Input
                id="dataAbertura"
                type="date"
                value={formData.dataAbertura}
                onChange={(e) => handleInputChange('dataAbertura', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição da Oportunidade</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Descreva os detalhes da oportunidade de importação direta..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSpiTab = () => (
    <div className="space-y-4">
      <Tabs value={activeSpiTab} onValueChange={setSpiTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Dados Gerais
          </TabsTrigger>
          <TabsTrigger value="analise-tecnica" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Análise Técnica
          </TabsTrigger>
          <TabsTrigger value="historico-chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Histórico/Chat
          </TabsTrigger>
          <TabsTrigger value="documentos" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Documentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dados-gerais" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informações do Processo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroProcesso">Número do Processo</Label>
                  <Input
                    id="numeroProcesso"
                    value={formData.numeroProcesso}
                    onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                    placeholder="Ex: 23456.123456/2024-12"
                  />
                </div>
                <div>
                  <Label htmlFor="orgaoComprador">Órgão Comprador</Label>
                  <Input
                    id="orgaoComprador"
                    value={formData.orgaoComprador}
                    onChange={(e) => handleInputChange('orgaoComprador', e.target.value)}
                    placeholder="Nome do órgão comprador"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
                  <Input
                    id="prazoEntrega"
                    value={formData.prazoEntrega}
                    onChange={(e) => handleInputChange('prazoEntrega', e.target.value)}
                    placeholder="Ex: 90 dias"
                  />
                </div>
                <div>
                  <Label htmlFor="condicoesPagamento">Condições de Pagamento</Label>
                  <Input
                    id="condicoesPagamento"
                    value={formData.condicoesPagamento}
                    onChange={(e) => handleInputChange('condicoesPagamento', e.target.value)}
                    placeholder="Ex: 30 dias após entrega"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="garantiaExigida">Garantia Exigida</Label>
                <Input
                  id="garantiaExigida"
                  value={formData.garantiaExigida}
                  onChange={(e) => handleInputChange('garantiaExigida', e.target.value)}
                  placeholder="Tipo de garantia exigida"
                />
              </div>

              <div>
                <Label htmlFor="documentosNecessarios">Documentos Necessários</Label>
                <Textarea
                  id="documentosNecessarios"
                  value={formData.documentosNecessarios}
                  onChange={(e) => handleInputChange('documentosNecessarios', e.target.value)}
                  placeholder="Liste os documentos necessários para a importação..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <UploadIcon className="h-4 w-4" />
                  Upload PI
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analise-tecnica" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Análise Técnica SPI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="statusAnalise">Status da Análise</Label>
                  <Select value={formData.statusAnalise} onValueChange={(value) => handleInputChange('statusAnalise', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="em_analise">Em Análise</SelectItem>
                      <SelectItem value="aprovado">Aprovado</SelectItem>
                      <SelectItem value="reprovado">Reprovado</SelectItem>
                      <SelectItem value="pendente_documentos">Pendente Documentos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="responsavelTecnico">Responsável Técnico</Label>
                  <Input
                    id="responsavelTecnico"
                    value={formData.responsavelTecnico}
                    onChange={(e) => handleInputChange('responsavelTecnico', e.target.value)}
                    placeholder="Nome do responsável técnico"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="observacoesTecnicas">Observações Técnicas</Label>
                <Textarea
                  id="observacoesTecnicas"
                  value={formData.observacoesTecnicas}
                  onChange={(e) => handleInputChange('observacoesTecnicas', e.target.value)}
                  placeholder="Observações técnicas sobre o processo..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="parecer">Parecer Técnico</Label>
                <Textarea
                  id="parecer"
                  value={formData.parecer}
                  onChange={(e) => handleInputChange('parecer', e.target.value)}
                  placeholder="Parecer técnico detalhado..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="recomendacao">Recomendação</Label>
                <Select value={formData.recomendacao} onValueChange={(value) => handleInputChange('recomendacao', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a recomendação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aprovar">Aprovar</SelectItem>
                    <SelectItem value="reprovar">Reprovar</SelectItem>
                    <SelectItem value="solicitar_ajustes">Solicitar Ajustes</SelectItem>
                    <SelectItem value="aguardar_documentos">Aguardar Documentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico-chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Histórico de Comunicações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">Sistema</span>
                    <span className="text-xs text-gray-500">Hoje às 14:30</span>
                  </div>
                  <p className="text-sm text-gray-700">Processo de importação direta criado</p>
                </div>
                
                <div className="border-t pt-4">
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm">Enviar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Documentos do Processo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Arraste e solte arquivos aqui ou</p>
                  <Button variant="outline" size="sm">
                    Selecionar arquivos
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Documentos anexados:</h4>
                  <div className="text-sm text-gray-500">Nenhum documento anexado ainda</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            {oportunidade ? 'Editar' : 'Nova'} Importação Direta
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comercial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Comercial
              </TabsTrigger>
              <TabsTrigger value="spi" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                SPI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comercial" className="space-y-4">
              {renderComercialTab()}
            </TabsContent>

            <TabsContent value="spi" className="space-y-4">
              {renderSpiTab()}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
              {oportunidade ? 'Salvar' : 'Criar'} Importação Direta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportacaoDiretaForm;
