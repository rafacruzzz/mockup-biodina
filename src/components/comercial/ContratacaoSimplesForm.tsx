
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, MessageCircle, Upload, ShoppingCart, Plus, X, 
  Thermometer, Calendar, User, Building, Phone, Mail, Globe, MapPin
} from "lucide-react";

interface ContratacaoSimplesFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const ContratacaoSimplesForm = ({ isOpen, onClose, onSave, oportunidade }: ContratacaoSimplesFormProps) => {
  const [activeTab, setActiveTab] = useState('dados_gerais');
  const [formData, setFormData] = useState({
    // Dados do Cliente
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nomeFantasia: oportunidade?.nomeFantasia || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    uf: oportunidade?.uf || '',
    email: oportunidade?.email || '',
    telefone: oportunidade?.telefone || '',
    website: oportunidade?.website || '',
    ativo: oportunidade?.ativo || true,
    
    // Dados da Oportunidade
    fonteLead: oportunidade?.fonteLead || '',
    valorNegocio: oportunidade?.valorNegocio || 0,
    metodoContato: oportunidade?.metodoContato || '',
    segmentoLead: oportunidade?.segmentoLead || '',
    responsaveis: oportunidade?.responsaveis || [],
    dataInicio: oportunidade?.dataInicio || '',
    dataLimite: oportunidade?.dataLimite || '',
    procurandoPor: oportunidade?.procurandoPor || '',
    
    // Organização
    tags: oportunidade?.tags || [],
    caracteristicas: oportunidade?.caracteristicas || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    status: oportunidade?.status || 'em_triagem',
    descricao: oportunidade?.descricao || '',
    
    // Análise da Concorrência
    concorrentes: oportunidade?.concorrentes || [],
    
    // Outros
    dataVisita: oportunidade?.dataVisita || '',
    propostaEmNegociacao: oportunidade?.propostaEmNegociacao || false,
    termometro: oportunidade?.termometro || 50,
    
    // Campos Condicionais
    motivoGanho: oportunidade?.motivoGanho || '',
    motivoPerda: oportunidade?.motivoPerda || '',
    
    // Análise Técnica
    analiseTecnica: oportunidade?.analiseTecnica || '',
    
    // Modalidade
    modalidade: 'contratacao_simples'
  });

  const [novoConcorrente, setNovoConcorrente] = useState({
    nome: '',
    produto: '',
    preco: ''
  });

  const statusOptions = [
    { value: 'em_triagem', label: 'Em Triagem' },
    { value: 'em_acompanhamento', label: 'Em Acompanhamento' },
    { value: 'ganha', label: 'Ganha' },
    { value: 'perdida', label: 'Perdida' },
    { value: 'cancelada', label: 'Cancelada' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const adicionarConcorrente = () => {
    if (novoConcorrente.nome && novoConcorrente.produto) {
      setFormData(prev => ({
        ...prev,
        concorrentes: [...prev.concorrentes, { ...novoConcorrente, id: Date.now() }]
      }));
      setNovoConcorrente({ nome: '', produto: '', preco: '' });
    }
  };

  const removerConcorrente = (id: number) => {
    setFormData(prev => ({
      ...prev,
      concorrentes: prev.concorrentes.filter((c: any) => c.id !== id)
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const getTermometroColor = (value: number) => {
    if (value < 30) return 'bg-red-500';
    if (value < 60) return 'bg-yellow-500';
    if (value < 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {oportunidade ? 'Editar' : 'Nova'} Oportunidade - Contratação Simples
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dados_gerais" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Dados Gerais
            </TabsTrigger>
            <TabsTrigger value="analise_tecnica" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Análise Técnica
            </TabsTrigger>
            <TabsTrigger value="historico_chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Histórico/Chat
            </TabsTrigger>
            <TabsTrigger value="documentos" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Documentos
            </TabsTrigger>
            <TabsTrigger value="pedidos" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Pedidos
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="dados_gerais" className="space-y-6 p-1">
              {/* Dados do Cliente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Dados do Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                    <Input
                      id="cpfCnpj"
                      value={formData.cpfCnpj}
                      onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomeFantasia">Nome/Nome Fantasia *</Label>
                    <Input
                      id="nomeFantasia"
                      value={formData.nomeFantasia}
                      onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="razaoSocial">Razão Social</Label>
                    <Input
                      id="razaoSocial"
                      value={formData.razaoSocial}
                      onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endereco">Endereço do Cliente</Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="uf">UF</Label>
                    <Input
                      id="uf"
                      value={formData.uf}
                      onChange={(e) => handleInputChange('uf', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ativo"
                      checked={formData.ativo}
                      onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                    />
                    <Label htmlFor="ativo">Ativo</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Dados da Oportunidade */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Oportunidade</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="fonteLead">Fonte do Lead</Label>
                    <Input
                      id="fonteLead"
                      value={formData.fonteLead}
                      onChange={(e) => handleInputChange('fonteLead', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="valorNegocio">Valor do Negócio *</Label>
                    <Input
                      id="valorNegocio"
                      type="number"
                      value={formData.valorNegocio}
                      onChange={(e) => handleInputChange('valorNegocio', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metodoContato">Método de Contato</Label>
                    <Input
                      id="metodoContato"
                      value={formData.metodoContato}
                      onChange={(e) => handleInputChange('metodoContato', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="segmentoLead">Segmento do Lead</Label>
                    <Input
                      id="segmentoLead"
                      value={formData.segmentoLead}
                      onChange={(e) => handleInputChange('segmentoLead', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataInicio">Data de Início</Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      value={formData.dataInicio}
                      onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataLimite">Data Limite</Label>
                    <Input
                      id="dataLimite"
                      type="date"
                      value={formData.dataLimite}
                      onChange={(e) => handleInputChange('dataLimite', e.target.value)}
                    />
                  </div>
                  <div className="col-span-full">
                    <Label htmlFor="procurandoPor">Procurando Por</Label>
                    <Textarea
                      id="procurandoPor"
                      value={formData.procurandoPor}
                      onChange={(e) => handleInputChange('procurandoPor', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Organização */}
              <Card>
                <CardHeader>
                  <CardTitle>Organização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dataVisita">Data da Visita</Label>
                      <Input
                        id="dataVisita"
                        type="date"
                        value={formData.dataVisita}
                        onChange={(e) => handleInputChange('dataVisita', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="caracteristicas">Características</Label>
                    <Textarea
                      id="caracteristicas"
                      value={formData.caracteristicas}
                      onChange={(e) => handleInputChange('caracteristicas', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fluxoTrabalho">Fluxo de Trabalho</Label>
                    <Textarea
                      id="fluxoTrabalho"
                      value={formData.fluxoTrabalho}
                      onChange={(e) => handleInputChange('fluxoTrabalho', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={formData.descricao}
                      onChange={(e) => handleInputChange('descricao', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="propostaEmNegociacao"
                      checked={formData.propostaEmNegociacao}
                      onCheckedChange={(checked) => handleInputChange('propostaEmNegociacao', checked)}
                    />
                    <Label htmlFor="propostaEmNegociacao">Proposta em Negociação</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Termômetro */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5" />
                    Termômetro de Chances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">0%</span>
                      <div className="flex-1">
                        <Progress 
                          value={formData.termometro} 
                          className={`h-3 ${getTermometroColor(formData.termometro)}`}
                        />
                      </div>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.termometro}
                      onChange={(e) => handleInputChange('termometro', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-lg font-bold">{formData.termometro}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Análise da Concorrência */}
              <Card>
                <CardHeader>
                  <CardTitle>Análise da Concorrência</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="concorrenteNome">Concorrente</Label>
                      <Input
                        id="concorrenteNome"
                        value={novoConcorrente.nome}
                        onChange={(e) => setNovoConcorrente(prev => ({ ...prev, nome: e.target.value }))}
                        placeholder="Nome do concorrente"
                      />
                    </div>
                    <div>
                      <Label htmlFor="concorrenteProduto">Produto do Concorrente</Label>
                      <Input
                        id="concorrenteProduto"
                        value={novoConcorrente.produto}
                        onChange={(e) => setNovoConcorrente(prev => ({ ...prev, produto: e.target.value }))}
                        placeholder="Produto oferecido"
                      />
                    </div>
                    <div>
                      <Label htmlFor="concorrentePreco">Preço Praticado</Label>
                      <Input
                        id="concorrentePreco"
                        value={novoConcorrente.preco}
                        onChange={(e) => setNovoConcorrente(prev => ({ ...prev, preco: e.target.value }))}
                        placeholder="Preço praticado"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        onClick={adicionarConcorrente}
                        disabled={!novoConcorrente.nome || !novoConcorrente.produto}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </div>

                  {formData.concorrentes.length > 0 && (
                    <div className="space-y-2">
                      <Label>Concorrentes Cadastrados:</Label>
                      {formData.concorrentes.map((concorrente: any) => (
                        <div key={concorrente.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1 grid grid-cols-3 gap-4">
                            <div>
                              <span className="font-medium">{concorrente.nome}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">{concorrente.produto}</span>
                            </div>
                            <div>
                              <span className="text-green-600">{concorrente.preco}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removerConcorrente(concorrente.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Campos Condicionais */}
              {formData.status === 'ganha' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Motivo do Ganho</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={formData.motivoGanho}
                      onChange={(e) => handleInputChange('motivoGanho', e.target.value)}
                      placeholder="Descreva os motivos que levaram ao ganho desta oportunidade..."
                    />
                  </CardContent>
                </Card>
              )}

              {formData.status === 'perdida' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Motivo de Perda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={formData.motivoPerda}
                      onChange={(e) => handleInputChange('motivoPerda', e.target.value)}
                      placeholder="Descreva os motivos que levaram à perda desta oportunidade..."
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analise_tecnica" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Técnica-Científica</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.analiseTecnica}
                    onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                    placeholder="Descreva a análise técnica-científica da oportunidade..."
                    rows={10}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico_chat" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Histórico/Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    Funcionalidade de chat/histórico será implementada
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentos" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Documentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    Funcionalidade de upload de documentos será implementada
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pedidos" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Pedidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    Funcionalidade de gerenciamento de pedidos será implementada
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContratacaoSimplesForm;
