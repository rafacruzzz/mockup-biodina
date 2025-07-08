import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Calendar, User, Building, Phone, MapPin, DollarSign, 
  FileText, Clock, Target, Thermometer, Plus, Minus,
  AlertTriangle, CheckCircle, XCircle, Users, Briefcase,
  Mail, Globe, Hash, TrendingUp, Award, Zap
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import ConcorrenteModal from './ConcorrenteModal';
import LicitacaoValidationModal from './LicitacaoValidationModal';

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const [activeTab, setActiveTab] = useState('informacoes-basicas');
  const [showConcorrenteModal, setShowConcorrenteModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [editingConcorrente, setEditingConcorrente] = useState<any>(null);

  const [concorrentes, setConcorrentes] = useState(oportunidade?.concorrentes || []);
  const [produtos, setProdutos] = useState(oportunidade?.produtos || []);

  const [formData, setFormData] = useState({
    // Informações Básicas
    codigo: oportunidade?.codigo || '',
    dataAbertura: oportunidade?.dataAbertura || '',
    dataContato: oportunidade?.dataContato || '',
    cliente: oportunidade?.cliente || '',
    contato: oportunidade?.contato || '',
    cnpj: oportunidade?.cnpj || '',
    endereco: oportunidade?.endereco || '',
    responsavel: oportunidade?.responsavel || '',
    origem: oportunidade?.origem || '',
    segmento: oportunidade?.segmento || '',
    
    // Dados da Licitação
    numeroPregao: oportunidade?.numeroPregao || '',
    modalidadeLicitacao: oportunidade?.modalidadeLicitacao || '',
    orgaoLicitante: oportunidade?.orgaoLicitante || '',
    objetoLicitacao: oportunidade?.objetoLicitacao || '',
    dataPublicacao: oportunidade?.dataPublicacao || '',
    dataAberturaProposta: oportunidade?.dataAberturaProposta || '',
    dataEntregaProposta: oportunidade?.dataEntregaProposta || '',
    prazoEntrega: oportunidade?.prazoEntrega || '',
    condicoesPagamento: oportunidade?.condicoesPagamento || '',
    garantiaExigida: oportunidade?.garantiaExigida || '',
    criterioJulgamento: oportunidade?.criterioJulgamento || '',
    
    // Estratégia Comercial
    estrategiaComercial: oportunidade?.estrategiaComercial || '',
    analiseCompetitiva: oportunidade?.analiseCompetitiva || '',
    pontosFortes: oportunidade?.pontosFortes || '',
    pontosFracos: oportunidade?.pontosFracos || '',
    estrategiaPreco: oportunidade?.estrategiaPreco || '',
    estrategiaValorInicial: oportunidade?.estrategiaValorInicial || '',
    estrategiaValorFinal: oportunidade?.estrategiaValorFinal || '',
    margemLucro: oportunidade?.margemLucro || '',
    
    // Acompanhamento
    resultadoOportunidade: oportunidade?.resultadoOportunidade || '',
    dataResultado: oportunidade?.dataResultado || '',
    valorGanho: oportunidade?.valorGanho || '',
    motivoFracasso: oportunidade?.motivoFracasso || '',
    observacoes: oportunidade?.observacoes || '',
    proximosPassos: oportunidade?.proximosPassos || '',
    
    // Comunicação
    historicoContatos: oportunidade?.historicoContatos || [],
    documentos: oportunidade?.documentos || [],
    anexos: oportunidade?.anexos || []
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddConcorrente = () => {
    setEditingConcorrente(null);
    setShowConcorrenteModal(true);
  };

  const handleEditConcorrente = (concorrente: any) => {
    setEditingConcorrente(concorrente);
    setShowConcorrenteModal(true);
  };

  const handleSaveConcorrente = (concorrenteData: any) => {
    if (editingConcorrente) {
      setConcorrentes(prev => prev.map(c => 
        c.id === editingConcorrente.id ? { ...concorrenteData, id: c.id } : c
      ));
    } else {
      setConcorrentes(prev => [...prev, { ...concorrenteData, id: Date.now() }]);
    }
    setShowConcorrenteModal(false);
    setEditingConcorrente(null);
  };

  const handleRemoveConcorrente = (id: number) => {
    setConcorrentes(prev => prev.filter(c => c.id !== id));
  };

  const handleAddHistoricoContato = () => {
    const novoContato = {
      id: Date.now(),
      data: new Date().toISOString().split('T')[0],
      tipo: '',
      descricao: '',
      responsavel: ''
    };
    
    setFormData(prev => ({
      ...prev,
      historicoContatos: [...prev.historicoContatos, novoContato]
    }));
  };

  const handleRemoveHistoricoContato = (id: number) => {
    setFormData(prev => ({
      ...prev,
      historicoContatos: prev.historicoContatos.filter(h => h.id !== id)
    }));
  };

  const handleHistoricoContatoChange = (id: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      historicoContatos: prev.historicoContatos.map(h => 
        h.id === id ? { ...h, [field]: value } : h
      )
    }));
  };

  const handleValidateAndSave = () => {
    setShowValidationModal(true);
  };

  const handleConfirmSave = () => {
    const dadosCompletos = {
      ...formData,
      concorrentes,
      produtos,
      id: oportunidade?.id || Date.now()
    };
    
    onSave(dadosCompletos);
    setShowValidationModal(false);
  };

  const tabs = [
    { id: 'informacoes-basicas', label: 'Informações Básicas', icon: Building },
    { id: 'dados-licitacao', label: 'Dados da Licitação', icon: FileText },
    { id: 'produtos', label: 'Produtos/Serviços', icon: Briefcase },
    { id: 'concorrentes', label: 'Concorrentes', icon: Users },
    { id: 'estrategia', label: 'Estratégia Comercial', icon: Target },
    { id: 'acompanhamento', label: 'Acompanhamento', icon: TrendingUp },
    { id: 'comunicacao', label: 'Comunicação', icon: Mail }
  ];

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-biodina-blue flex items-center gap-2">
              <Award className="h-5 w-5" />
              {oportunidade ? 'Editar Licitação' : 'Nova Licitação'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="grid w-full grid-cols-7 mb-4">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1 text-xs">
                    <tab.icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <ScrollArea className="flex-1 pr-4">
                {/* Informações Básicas */}
                <TabsContent value="informacoes-basicas" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Informações Básicas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="codigo">Código da Oportunidade</Label>
                          <Input
                            id="codigo"
                            value={formData.codigo}
                            onChange={(e) => handleInputChange('codigo', e.target.value)}
                            placeholder="Ex: LIC-001"
                          />
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

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cliente">Cliente/Órgão</Label>
                          <Input
                            id="cliente"
                            value={formData.cliente}
                            onChange={(e) => handleInputChange('cliente', e.target.value)}
                            placeholder="Nome do cliente ou órgão"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cnpj">CNPJ</Label>
                          <Input
                            id="cnpj"
                            value={formData.cnpj}
                            onChange={(e) => handleInputChange('cnpj', e.target.value)}
                            placeholder="00.000.000/0000-00"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input
                          id="endereco"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange('endereco', e.target.value)}
                          placeholder="Endereço completo"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contato">Contato</Label>
                          <Input
                            id="contato"
                            value={formData.contato}
                            onChange={(e) => handleInputChange('contato', e.target.value)}
                            placeholder="Telefone, email ou pessoa de contato"
                          />
                        </div>
                        <div>
                          <Label htmlFor="dataContato">Data do Contato</Label>
                          <Input
                            id="dataContato"
                            type="date"
                            value={formData.dataContato}
                            onChange={(e) => handleInputChange('dataContato', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="responsavel">Responsável</Label>
                          <Input
                            id="responsavel"
                            value={formData.responsavel}
                            onChange={(e) => handleInputChange('responsavel', e.target.value)}
                            placeholder="Nome do responsável"
                          />
                        </div>
                        <div>
                          <Label htmlFor="origem">Origem</Label>
                          <Select value={formData.origem} onValueChange={(value) => handleInputChange('origem', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a origem" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vendas-rj">Vendas RJ</SelectItem>
                              <SelectItem value="vendas-sp">Vendas SP</SelectItem>
                              <SelectItem value="vendas-ce">Vendas CE</SelectItem>
                              <SelectItem value="vendas-rn">Vendas RN</SelectItem>
                              <SelectItem value="marketing">Marketing</SelectItem>
                              <SelectItem value="indicacao">Indicação</SelectItem>
                              <SelectItem value="portal-gov">Portal do Governo</SelectItem>
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
                              <SelectItem value="publico">Público</SelectItem>
                              <SelectItem value="privado">Privado</SelectItem>
                              <SelectItem value="hospitalar">Hospitalar</SelectItem>
                              <SelectItem value="universitario">Universitário</SelectItem>
                              <SelectItem value="municipal">Municipal</SelectItem>
                              <SelectItem value="estadual">Estadual</SelectItem>
                              <SelectItem value="federal">Federal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Dados da Licitação */}
                <TabsContent value="dados-licitacao" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Dados da Licitação
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="numeroPregao">Número do Pregão</Label>
                          <Input
                            id="numeroPregao"
                            value={formData.numeroPregao}
                            onChange={(e) => handleInputChange('numeroPregao', e.target.value)}
                            placeholder="Ex: 001/2024"
                          />
                        </div>
                        <div>
                          <Label htmlFor="modalidadeLicitacao">Modalidade</Label>
                          <Select value={formData.modalidadeLicitacao} onValueChange={(value) => handleInputChange('modalidadeLicitacao', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a modalidade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pregao-eletronico">Pregão Eletrônico</SelectItem>
                              <SelectItem value="pregao-presencial">Pregão Presencial</SelectItem>
                              <SelectItem value="concorrencia">Concorrência</SelectItem>
                              <SelectItem value="tomada-precos">Tomada de Preços</SelectItem>
                              <SelectItem value="convite">Convite</SelectItem>
                              <SelectItem value="dispensa">Dispensa</SelectItem>
                              <SelectItem value="inexigibilidade">Inexigibilidade</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="orgaoLicitante">Órgão Licitante</Label>
                          <Input
                            id="orgaoLicitante"
                            value={formData.orgaoLicitante}
                            onChange={(e) => handleInputChange('orgaoLicitante', e.target.value)}
                            placeholder="Nome do órgão"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="objetoLicitacao">Objeto da Licitação</Label>
                        <Textarea
                          id="objetoLicitacao"
                          value={formData.objetoLicitacao}
                          onChange={(e) => handleInputChange('objetoLicitacao', e.target.value)}
                          placeholder="Descreva o objeto da licitação"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="dataPublicacao">Data de Publicação</Label>
                          <Input
                            id="dataPublicacao"
                            type="date"
                            value={formData.dataPublicacao}
                            onChange={(e) => handleInputChange('dataPublicacao', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="dataAberturaProposta">Data de Abertura</Label>
                          <Input
                            id="dataAberturaProposta"
                            type="date"
                            value={formData.dataAberturaProposta}
                            onChange={(e) => handleInputChange('dataAberturaProposta', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="dataEntregaProposta">Data de Entrega</Label>
                          <Input
                            id="dataEntregaProposta"
                            type="date"
                            value={formData.dataEntregaProposta}
                            onChange={(e) => handleInputChange('dataEntregaProposta', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
                          <Input
                            id="prazoEntrega"
                            value={formData.prazoEntrega}
                            onChange={(e) => handleInputChange('prazoEntrega', e.target.value)}
                            placeholder="Ex: 30 dias"
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

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="garantiaExigida">Garantia Exigida</Label>
                          <Input
                            id="garantiaExigida"
                            value={formData.garantiaExigida}
                            onChange={(e) => handleInputChange('garantiaExigida', e.target.value)}
                            placeholder="Ex: 5% do valor do contrato"
                          />
                        </div>
                        <div>
                          <Label htmlFor="criterioJulgamento">Critério de Julgamento</Label>
                          <Select value={formData.criterioJulgamento} onValueChange={(value) => handleInputChange('criterioJulgamento', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o critério" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="menor-preco">Menor Preço</SelectItem>
                              <SelectItem value="melhor-tecnica">Melhor Técnica</SelectItem>
                              <SelectItem value="tecnica-preco">Técnica e Preço</SelectItem>
                              <SelectItem value="maior-lance">Maior Lance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Produtos/Serviços */}
                <TabsContent value="produtos" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Produtos e Serviços
                        </CardTitle>
                        <Button onClick={() => setProdutos([...produtos, { id: Date.now(), codigo: '', descricao: '', quantidade: '', unidade: '', valorUnitario: '', valorTotal: '' }])}>
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Produto
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {produtos.map((produto, index) => (
                          <div key={produto.id} className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Produto {index + 1}</h4>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setProdutos(produtos.filter(p => p.id !== produto.id))}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label>Código</Label>
                                <Input
                                  value={produto.codigo}
                                  onChange={(e) => {
                                    const newProdutos = produtos.map(p => 
                                      p.id === produto.id ? { ...p, codigo: e.target.value } : p
                                    );
                                    setProdutos(newProdutos);
                                  }}
                                  placeholder="Código do produto"
                                />
                              </div>
                              <div>
                                <Label>Descrição</Label>
                                <Input
                                  value={produto.descricao}
                                  onChange={(e) => {
                                    const newProdutos = produtos.map(p => 
                                      p.id === produto.id ? { ...p, descricao: e.target.value } : p
                                    );
                                    setProdutos(newProdutos);
                                  }}
                                  placeholder="Descrição do produto"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                              <div>
                                <Label>Quantidade</Label>
                                <Input
                                  value={produto.quantidade}
                                  onChange={(e) => {
                                    const newProdutos = produtos.map(p => 
                                      p.id === produto.id ? { ...p, quantidade: e.target.value } : p
                                    );
                                    setProdutos(newProdutos);
                                  }}
                                  placeholder="Qtd"
                                />
                              </div>
                              <div>
                                <Label>Unidade</Label>
                                <Input
                                  value={produto.unidade}
                                  onChange={(e) => {
                                    const newProdutos = produtos.map(p => 
                                      p.id === produto.id ? { ...p, unidade: e.target.value } : p
                                    );
                                    setProdutos(newProdutos);
                                  }}
                                  placeholder="UN, KG, etc"
                                />
                              </div>
                              <div>
                                <Label>Valor Unitário</Label>
                                <Input
                                  value={produto.valorUnitario}
                                  onChange={(e) => {
                                    const newProdutos = produtos.map(p => 
                                      p.id === produto.id ? { ...p, valorUnitario: e.target.value } : p
                                    );
                                    setProdutos(newProdutos);
                                  }}
                                  placeholder="R$ 0,00"
                                />
                              </div>
                              <div>
                                <Label>Valor Total</Label>
                                <Input
                                  value={produto.valorTotal}
                                  onChange={(e) => {
                                    const newProdutos = produtos.map(p => 
                                      p.id === produto.id ? { ...p, valorTotal: e.target.value } : p
                                    );
                                    setProdutos(newProdutos);
                                  }}
                                  placeholder="R$ 0,00"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Concorrentes */}
                <TabsContent value="concorrentes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Análise de Concorrentes
                        </CardTitle>
                        <Button onClick={handleAddConcorrente}>
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Concorrente
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {concorrentes.map((concorrente) => (
                          <div key={concorrente.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{concorrente.nome}</h4>
                                <p className="text-sm text-gray-600">
                                  {concorrente.porte} • Experiência: {concorrente.experiencia}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Preço estimado: {formatCurrency(concorrente.precoEstimado)}
                                </p>
                                <Badge variant={concorrente.nivelAmeaca === 'alta' ? 'destructive' : 
                                               concorrente.nivelAmeaca === 'media' ? 'default' : 'secondary'}>
                                  Ameaça {concorrente.nivelAmeaca}
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEditConcorrente(concorrente)}>
                                  Editar
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleRemoveConcorrente(concorrente.id)}>
                                  <Minus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {concorrentes.length === 0 && (
                          <p className="text-center text-gray-500 py-8">
                            Nenhum concorrente adicionado ainda
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Estratégia Comercial */}
                <TabsContent value="estrategia" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Estratégia Comercial
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="estrategiaComercial">Estratégia Comercial</Label>
                        <Textarea
                          id="estrategiaComercial"
                          value={formData.estrategiaComercial}
                          onChange={(e) => handleInputChange('estrategiaComercial', e.target.value)}
                          placeholder="Descreva a estratégia comercial para esta licitação"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="analiseCompetitiva">Análise Competitiva</Label>
                        <Textarea
                          id="analiseCompetitiva"
                          value={formData.analiseCompetitiva}
                          onChange={(e) => handleInputChange('analiseCompetitiva', e.target.value)}
                          placeholder="Análise do cenário competitivo"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="pontosFortes">Pontos Fortes</Label>
                          <Textarea
                            id="pontosFortes"
                            value={formData.pontosFortes}
                            onChange={(e) => handleInputChange('pontosFortes', e.target.value)}
                            placeholder="Nossos pontos fortes"
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label htmlFor="pontosFracos">Pontos Fracos</Label>
                          <Textarea
                            id="pontosFracos"
                            value={formData.pontosFracos}
                            onChange={(e) => handleInputChange('pontosFracos', e.target.value)}
                            placeholder="Pontos que precisam ser melhorados"
                            rows={4}
                          />
                        </div>
                      </div>

                      <Separator />

                      <h3 className="text-lg font-semibold">Estratégia de Preços</h3>
                      
                      <div>
                        <Label htmlFor="estrategiaPreco">Estratégia de Preço</Label>
                        <Textarea
                          id="estrategiaPreco"
                          value={formData.estrategiaPreco}
                          onChange={(e) => handleInputChange('estrategiaPreco', e.target.value)}
                          placeholder="Descreva a estratégia de precificação"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="estrategiaValorInicial">Valor Inicial</Label>
                          <Input
                            id="estrategiaValorInicial"
                            value={formData.estrategiaValorInicial}
                            onChange={(e) => handleInputChange('estrategiaValorInicial', e.target.value)}
                            placeholder="R$ 0,00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="estrategiaValorFinal">Valor Final</Label>
                          <Input
                            id="estrategiaValorFinal"
                            value={formData.estrategiaValorFinal}
                            onChange={(e) => handleInputChange('estrategiaValorFinal', e.target.value)}
                            placeholder="R$ 0,00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="margemLucro">Margem de Lucro (%)</Label>
                          <Input
                            id="margemLucro"
                            value={formData.margemLucro}
                            onChange={(e) => handleInputChange('margemLucro', e.target.value)}
                            placeholder="0%"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Acompanhamento */}
                <TabsContent value="acompanhamento" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Acompanhamento do Resultado
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="resultadoOportunidade">Resultado da Oportunidade</Label>
                          <Select value={formData.resultadoOportunidade} onValueChange={(value) => handleInputChange('resultadoOportunidade', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o resultado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="em_andamento">Em Andamento</SelectItem>
                              <SelectItem value="ganho">Ganho</SelectItem>
                              <SelectItem value="perda">Perda</SelectItem>
                              <SelectItem value="cancelado">Cancelado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="dataResultado">Data do Resultado</Label>
                          <Input
                            id="dataResultado"
                            type="date"
                            value={formData.dataResultado}
                            onChange={(e) => handleInputChange('dataResultado', e.target.value)}
                          />
                        </div>
                      </div>

                      {formData.resultadoOportunidade === 'ganho' && (
                        <div>
                          <Label htmlFor="valorGanho">Valor Ganho</Label>
                          <Input
                            id="valorGanho"
                            value={formData.valorGanho}
                            onChange={(e) => handleInputChange('valorGanho', e.target.value)}
                            placeholder="R$ 0,00"
                          />
                        </div>
                      )}

                      {formData.resultadoOportunidade === 'perda' && (
                        <div>
                          <Label htmlFor="motivoFracasso">Motivos do Fracasso do Pregão</Label>
                          <Textarea
                            id="motivoFracasso"
                            value={formData.motivoFracasso}
                            onChange={(e) => handleInputChange('motivoFracasso', e.target.value)}
                            placeholder="Descreva os motivos que levaram ao fracasso"
                            rows={3}
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="observacoes">Observações</Label>
                        <Textarea
                          id="observacoes"
                          value={formData.observacoes}
                          onChange={(e) => handleInputChange('observacoes', e.target.value)}
                          placeholder="Observações gerais sobre a oportunidade"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="proximosPassos">Próximos Passos</Label>
                        <Textarea
                          id="proximosPassos"
                          value={formData.proximosPassos}
                          onChange={(e) => handleInputChange('proximosPassos', e.target.value)}
                          placeholder="Defina os próximos passos e ações"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Comunicação */}
                <TabsContent value="comunicacao" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Histórico de Comunicação
                        </CardTitle>
                        <Button onClick={handleAddHistoricoContato}>
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Contato
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {formData.historicoContatos.map((contato) => (
                          <div key={contato.id} className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Contato #{contato.id}</h4>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveHistoricoContato(contato.id)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <Label>Data</Label>
                                <Input
                                  type="date"
                                  value={contato.data}
                                  onChange={(e) => handleHistoricoContatoChange(contato.id, 'data', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Tipo</Label>
                                <Select value={contato.tipo} onValueChange={(value) => handleHistoricoContatoChange(contato.id, 'tipo', value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Tipo" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="telefone">Telefone</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="reuniao">Reunião</SelectItem>
                                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                    <SelectItem value="visita">Visita</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Responsável</Label>
                                <Input
                                  value={contato.responsavel}
                                  onChange={(e) => handleHistoricoContatoChange(contato.id, 'responsavel', e.target.value)}
                                  placeholder="Nome do responsável"
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Descrição</Label>
                              <Textarea
                                value={contato.descricao}
                                onChange={(e) => handleHistoricoContatoChange(contato.id, 'descricao', e.target.value)}
                                placeholder="Descreva o que foi conversado"
                                rows={2}
                              />
                            </div>
                          </div>
                        ))}
                        {formData.historicoContatos.length === 0 && (
                          <p className="text-center text-gray-500 py-8">
                            Nenhum contato registrado ainda
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </ScrollArea>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleValidateAndSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
                Salvar Licitação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConcorrenteModal
        isOpen={showConcorrenteModal}
        concorrente={editingConcorrente}
        onClose={() => {
          setShowConcorrenteModal(false);
          setEditingConcorrente(null);
        }}
        onSave={handleSaveConcorrente}
      />

      <LicitacaoValidationModal
        isOpen={showValidationModal}
        formData={formData}
        concorrentes={concorrentes}
        produtos={produtos}
        onClose={() => setShowValidationModal(false)}
        onConfirm={handleConfirmSave}
      />
    </>
  );
};

export default OportunidadeAvancadaForm;
