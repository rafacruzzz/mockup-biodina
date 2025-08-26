import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { X, Plus, FileText, MessageSquare, Upload, Package, Thermometer, ShoppingCart, Eye, Headphones, AlertTriangle, Clock, DollarSign, Calendar, MapPin, Building2, Phone, Mail } from 'lucide-react';
import { PedidoCompleto } from '@/types/comercial';
import { Chamado, StatusChamado } from '@/types/chamado';
import { licitacoesDetalhadas } from '@/data/licitacaoMockData';
import ChatInterno from './ChatInterno';
import PedidoModal from './PedidoModal';
import ChamadosTab from './ChamadosTab';
import { toast } from 'sonner';

interface OportunidadeAvancadaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const OportunidadeAvancadaForm = ({ isOpen, onClose, onSave, oportunidade }: OportunidadeAvancadaFormProps) => {
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [pedidos, setPedidos] = useState<PedidoCompleto[]>([]);
  const [chamados, setChamados] = useState<Chamado[]>(oportunidade?.chamados || []);
  const [isPedidoModalOpen, setIsPedidoModalOpen] = useState(false);
  
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
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || '',
    procurandoPor: oportunidade?.procurandoPor || '',
    
    // Organização
    tags: oportunidade?.tags || '',
    caracteristicas: oportunidade?.caracteristicas || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    status: oportunidade?.status || 'em_triagem',
    descricao: oportunidade?.descricao || '',
    
    // Outros
    dataVisita: oportunidade?.dataVisita || '',
    propostaNegociacao: oportunidade?.propostaNegociacao || false,
    termometro: oportunidade?.termometro || 50,
    
    // Campos condicionais
    motivoGanho: oportunidade?.motivoGanho || '',
    motivoPerda: oportunidade?.motivoPerda || '',
    
    // Análise Técnica
    analiseTecnica: oportunidade?.analiseTecnica || '',
    
    // Modalidade
    modalidade: 'licitacao',
    
    // Campos específicos da licitação
    numeroPregao: oportunidade?.numeroPregao || '',
    nomeInstituicao: oportunidade?.nomeInstituicao || '',
    municipio: oportunidade?.municipio || '',
    objetoLicitacao: oportunidade?.objetoLicitacao || '',
    dataAbertura: oportunidade?.dataAbertura || '',
    dataEntregaProposta: oportunidade?.dataEntregaProposta || '',
    linkEdital: oportunidade?.linkEdital || '',
    palavraChave: oportunidade?.palavraChave || '',
    resumoEdital: oportunidade?.resumoEdital || '',
    solicitarAnaliseTecnica: oportunidade?.solicitarAnaliseTecnica || false,
    
    // Estratégia Comercial
    estrategiaValorMinimo: oportunidade?.estrategiaValorMinimo || 0,
    estrategiaValorMaximo: oportunidade?.estrategiaValorMaximo || 0,
    estrategiaValorFinal: oportunidade?.estrategiaValorFinal || 0,
    estrategiaObservacoes: oportunidade?.estrategiaObservacoes || '',
    
    // Análise de Risco
    riscoPolitico: oportunidade?.riscoPolitico || 'baixo',
    riscoTecnico: oportunidade?.riscoTecnico || 'baixo',
    riscoFinanceiro: oportunidade?.riscoFinanceiro || 'baixo',
    riscoOperacional: oportunidade?.riscoOperacional || 'baixo',
    observacoesRisco: oportunidade?.observacoesRisco || '',
    
    // Cronograma
    cronograma: oportunidade?.cronograma || []
  });

  const [concorrentes, setConcorrentes] = useState(oportunidade?.concorrentes || []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSolicitarAnaliseTecnica = () => {
    toast.success('Notificação enviada para análise técnica!', {
      description: 'Os responsáveis foram notificados para preencherem a análise técnica.'
    });
  };

  // Sincronizar análise técnica entre abas
  useEffect(() => {
    if (formData.analiseTecnica) {
      // Atualizar o campo de análise técnica na aba de dados gerais
      setFormData(prev => ({
        ...prev,
        analiseTecnica: prev.analiseTecnica
      }));
    }
  }, [formData.analiseTecnica]);

  const handleAdicionarChamado = (novoChamado: Omit<Chamado, 'id' | 'dataAbertura' | 'status'>) => {
    const chamado: Chamado = {
      ...novoChamado,
      id: `chamado_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dataAbertura: new Date().toISOString(),
      status: StatusChamado.ABERTO
    };

    setChamados(prev => [...prev, chamado]);
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      concorrentes,
      pedidos,
      chamados,
      id: oportunidade?.id || Date.now(),
    };
    onSave(dataToSave);
    onClose();
  };

  const handleSalvarPedido = (pedido: PedidoCompleto) => {
    setPedidos(prev => [...prev, pedido]);
    setIsPedidoModalOpen(false);
  };

  const adicionarConcorrente = () => {
    setConcorrentes([...concorrentes, { 
      nome: '', 
      produto: '', 
      preco: 0 
    }]);
  };

  const removerConcorrente = (index: number) => {
    setConcorrentes(concorrentes.filter((_, i) => i !== index));
  };

  const atualizarConcorrente = (index: number, campo: string, valor: any) => {
    const novosConcorrentes = [...concorrentes];
    novosConcorrentes[index] = { ...novosConcorrentes[index], [campo]: valor };
    setConcorrentes(novosConcorrentes);
  };

  const adicionarEtapaCronograma = () => {
    const novaEtapa = {
      id: Date.now(),
      titulo: '',
      descricao: '',
      dataInicio: '',
      dataFim: '',
      responsavel: '',
      status: 'pendente'
    };
    setFormData(prev => ({
      ...prev,
      cronograma: [...prev.cronograma, novaEtapa]
    }));
  };

  const removerEtapaCronograma = (id: number) => {
    setFormData(prev => ({
      ...prev,
      cronograma: prev.cronograma.filter(etapa => etapa.id !== id)
    }));
  };

  const atualizarEtapaCronograma = (id: number, campo: string, valor: any) => {
    setFormData(prev => ({
      ...prev,
      cronograma: prev.cronograma.map(etapa => 
        etapa.id === id ? { ...etapa, [campo]: valor } : etapa
      )
    }));
  };

  const getTermometroColor = (valor: number) => {
    if (valor < 30) return 'bg-red-500';
    if (valor < 60) return 'bg-yellow-500';
    if (valor < 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getRiscoColor = (risco: string) => {
    switch (risco) {
      case 'baixo': return 'bg-green-100 text-green-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'alto': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rascunho': return 'bg-gray-500';
      case 'enviado': return 'bg-blue-500';
      case 'aprovado': return 'bg-green-500';
      case 'cancelado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>
                  {oportunidade ? 'Editar' : 'Nova'} Oportunidade - Licitação
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger value="analise-tecnica" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Análise Técnica
              </TabsTrigger>
              <TabsTrigger value="estrategia-comercial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Estratégia
              </TabsTrigger>
              <TabsTrigger value="analise-risco" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Análise de Risco
              </TabsTrigger>
              <TabsTrigger value="cronograma" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Cronograma
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="chamados" className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                Chamados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dados do Cliente */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Dados do Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                        <Input
                          id="cpfCnpj"
                          value={formData.cpfCnpj}
                          onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                          placeholder="Digite o CPF ou CNPJ"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nomeFantasia">Nome/Nome Fantasia *</Label>
                        <Input
                          id="nomeFantasia"
                          value={formData.nomeFantasia}
                          onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                          placeholder="Digite o nome"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                        placeholder="Digite a razão social"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="endereco">Endereço do Cliente</Label>
                        <Input
                          id="endereco"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange('endereco', e.target.value)}
                          placeholder="Digite o endereço"
                        />
                      </div>
                      <div>
                        <Label htmlFor="uf">UF</Label>
                        <Select value={formData.uf} onValueChange={(value) => handleInputChange('uf', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SP">SP</SelectItem>
                            <SelectItem value="RJ">RJ</SelectItem>
                            <SelectItem value="MG">MG</SelectItem>
                            <SelectItem value="RS">RS</SelectItem>
                            <SelectItem value="PR">PR</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          E-mail
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Digite o e-mail"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Telefone
                        </Label>
                        <Input
                          id="telefone"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange('telefone', e.target.value)}
                          placeholder="Digite o telefone"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="Digite o website"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ativo"
                        checked={formData.ativo}
                        onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                      />
                      <Label htmlFor="ativo">Cliente Ativo</Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Dados da Oportunidade */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados da Oportunidade</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fonteLead">Fonte do Lead</Label>
                        <Select value={formData.fonteLead} onValueChange={(value) => handleInputChange('fonteLead', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
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
                        <Label htmlFor="valorNegocio">Valor do Negócio *</Label>
                        <Input
                          id="valorNegocio"
                          type="number"
                          value={formData.valorNegocio}
                          onChange={(e) => handleInputChange('valorNegocio', parseFloat(e.target.value) || 0)}
                          placeholder="Digite o valor"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="metodoContato">Método de Contato</Label>
                        <Select value={formData.metodoContato} onValueChange={(value) => handleInputChange('metodoContato', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="telefone">Telefone</SelectItem>
                            <SelectItem value="email">E-mail</SelectItem>
                            <SelectItem value="presencial">Presencial</SelectItem>
                            <SelectItem value="video_call">Video Call</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="segmentoLead">Segmento do Lead</Label>
                        <Select value={formData.segmentoLead} onValueChange={(value) => handleInputChange('segmentoLead', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
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
                    </div>

                    <div>
                      <Label htmlFor="colaboradoresResponsaveis">Colaboradores Responsáveis</Label>
                      <Input
                        id="colaboradoresResponsaveis"
                        value={formData.colaboradoresResponsaveis}
                        onChange={(e) => handleInputChange('colaboradoresResponsaveis', e.target.value)}
                        placeholder="Digite os responsáveis"
                      />
                    </div>

                    <div>
                      <Label htmlFor="procurandoPor">Procurando Por (Contatos vinculados)</Label>
                      <Input
                        id="procurandoPor"
                        value={formData.procurandoPor}
                        onChange={(e) => handleInputChange('procurandoPor', e.target.value)}
                        placeholder="Digite os contatos"
                      />
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="em_triagem">Em Triagem</SelectItem>
                          <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                          <SelectItem value="ganha">Ganha</SelectItem>
                          <SelectItem value="perdida">Perdida</SelectItem>
                          <SelectItem value="cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="termometro" className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4" />
                        Termômetro: {formData.termometro}°
                      </Label>
                      <div className="mt-2">
                        <input
                          type="range"
                          id="termometro"
                          min="0"
                          max="100"
                          value={formData.termometro}
                          onChange={(e) => handleInputChange('termometro', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0°</span>
                          <span>50°</span>
                          <span>100°</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div 
                          className={`w-4 h-4 rounded-full ${getTermometroColor(formData.termometro)}`}
                          title={`Termômetro: ${formData.termometro}°`}
                        />
                        <span className="text-sm text-gray-600">
                          {formData.termometro < 30 ? 'Frio' : 
                           formData.termometro < 60 ? 'Morno' : 
                           formData.termometro < 80 ? 'Quente' : 'Muito Quente'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Informações Específicas da Licitação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="numeroPregao">Número do Pregão *</Label>
                      <Input
                        id="numeroPregao"
                        value={formData.numeroPregao}
                        onChange={(e) => handleInputChange('numeroPregao', e.target.value)}
                        placeholder="Ex: PE 001/2024"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nomeInstituicao">Nome da Instituição *</Label>
                      <Input
                        id="nomeInstituicao"
                        value={formData.nomeInstituicao}
                        onChange={(e) => handleInputChange('nomeInstituicao', e.target.value)}
                        placeholder="Nome da instituição"
                      />
                    </div>
                    <div>
                      <Label htmlFor="municipio" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Município
                      </Label>
                      <Input
                        id="municipio"
                        value={formData.municipio}
                        onChange={(e) => handleInputChange('municipio', e.target.value)}
                        placeholder="Município da licitação"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="objetoLicitacao">Objeto da Licitação *</Label>
                    <Textarea
                      id="objetoLicitacao"
                      value={formData.objetoLicitacao}
                      onChange={(e) => handleInputChange('objetoLicitacao', e.target.value)}
                      placeholder="Descreva o objeto da licitação..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="dataAbertura">Data de Abertura</Label>
                      <Input
                        id="dataAbertura"
                        type="date"
                        value={formData.dataAbertura}
                        onChange={(e) => handleInputChange('dataAbertura', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dataEntregaProposta">Data de Entrega da Proposta</Label>
                      <Input
                        id="dataEntregaProposta"
                        type="date"
                        value={formData.dataEntregaProposta}
                        onChange={(e) => handleInputChange('dataEntregaProposta', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkEdital">Link do Edital</Label>
                      <Input
                        id="linkEdital"
                        value={formData.linkEdital}
                        onChange={(e) => handleInputChange('linkEdital', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="palavraChave">Palavra-chave</Label>
                    <Input
                      id="palavraChave"
                      value={formData.palavraChave}
                      onChange={(e) => handleInputChange('palavraChave', e.target.value)}
                      placeholder="Palavras-chave da licitação"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resumoEdital">Resumo do Edital</Label>
                    <Textarea
                      id="resumoEdital"
                      value={formData.resumoEdital}
                      onChange={(e) => setFormData({ ...formData, resumoEdital: e.target.value })}
                      placeholder="Descreva o resumo do edital..."
                      className="min-h-[120px] resize-y"
                    />
                  </div>

                  {/* Solicitar análise técnica - movido para cima */}
                  <div className="space-y-2 p-3 border rounded-lg bg-blue-50">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="solicitarAnaliseTecnica"
                        checked={formData.solicitarAnaliseTecnica}
                        onCheckedChange={(checked) => {
                          setFormData({ ...formData, solicitarAnaliseTecnica: checked as boolean });
                          if (checked) {
                            handleSolicitarAnaliseTecnica();
                          }
                        }}
                      />
                      <Label htmlFor="solicitarAnaliseTecnica" className="font-medium">
                        Solicitar análise técnica
                      </Label>
                    </div>
                    <p className="text-sm text-blue-600">
                      Enviar notificação para responsáveis pela análise técnica preencherem os campos necessários
                    </p>
                  </div>

                  {/* Análise Técnica - movido para baixo */}
                  <div className="space-y-2">
                    <Label htmlFor="analiseTecnica">Análise Técnica</Label>
                    <p className="text-sm text-blue-600 mb-2">
                      Este campo reflete automaticamente o conteúdo da Análise Técnica-Científica
                    </p>
                    <Textarea
                      id="analiseTecnica"
                      value={formData.analiseTecnica}
                      onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                      placeholder="Análise técnica-científica da licitação..."
                      rows={6}
                      readOnly
                      className="bg-gray-50"
                    />
                    <p className="text-sm text-gray-500">
                      Campo somente leitura - Para editar, use o campo "Análise Técnica-Científica" na aba "Análise Técnica"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Análise da Concorrência */}
              <Card>
                <CardHeader>
                  <CardTitle>Análise da Concorrência</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {concorrentes.map((concorrente, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium">Concorrente {index + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removerConcorrente(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Nome do concorrente"
                            value={concorrente.nome}
                            onChange={(e) => atualizarConcorrente(index, 'nome', e.target.value)}
                          />
                          <Input
                            placeholder="Produto do concorrente"
                            value={concorrente.produto}
                            onChange={(e) => atualizarConcorrente(index, 'produto', e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Preço praticado"
                            value={concorrente.preco}
                            onChange={(e) => atualizarConcorrente(index, 'preco', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={adicionarConcorrente}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Concorrente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analise-tecnica" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Técnica-Científica</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.analiseTecnica}
                    onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                    placeholder="Digite a análise técnica-científica da licitação..."
                    rows={15}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Este conteúdo será sincronizado automaticamente com o campo "Análise Técnica" na aba "Dados Gerais"
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estrategia-comercial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Estratégia Comercial
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="estrategiaValorMinimo">Valor Mínimo</Label>
                      <Input
                        id="estrategiaValorMinimo"
                        type="number"
                        value={formData.estrategiaValorMinimo}
                        onChange={(e) => handleInputChange('estrategiaValorMinimo', parseFloat(e.target.value) || 0)}
                        placeholder="Valor mínimo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estrategiaValorMaximo">Valor Máximo</Label>
                      <Input
                        id="estrategiaValorMaximo"
                        type="number"
                        value={formData.estrategiaValorMaximo}
                        onChange={(e) => handleInputChange('estrategiaValorMaximo', parseFloat(e.target.value) || 0)}
                        placeholder="Valor máximo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estrategiaValorFinal">Valor Final</Label>
                      <Input
                        id="estrategiaValorFinal"
                        type="number"
                        value={formData.estrategiaValorFinal}
                        onChange={(e) => handleInputChange('estrategiaValorFinal', parseFloat(e.target.value) || 0)}
                        placeholder="Valor final"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor Mínimo</p>
                      <p className="text-lg font-semibold text-green-600">
                        {formatCurrency(formData.estrategiaValorMinimo)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor Máximo</p>
                      <p className="text-lg font-semibold text-orange-600">
                        {formatCurrency(formData.estrategiaValorMaximo)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor Final</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {formatCurrency(formData.estrategiaValorFinal)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="estrategiaObservacoes">Observações da Estratégia</Label>
                    <Textarea
                      id="estrategiaObservacoes"
                      value={formData.estrategiaObservacoes}
                      onChange={(e) => handleInputChange('estrategiaObservacoes', e.target.value)}
                      placeholder="Observações sobre a estratégia comercial..."
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analise-risco" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Análise de Risco
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="riscoPolitico">Risco Político</Label>
                        <Select value={formData.riscoPolitico} onValueChange={(value) => handleInputChange('riscoPolitico', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="baixo">Baixo</SelectItem>
                            <SelectItem value="medio">Médio</SelectItem>
                            <SelectItem value="alto">Alto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="riscoTecnico">Risco Técnico</Label>
                        <Select value={formData.riscoTecnico} onValueChange={(value) => handleInputChange('riscoTecnico', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="baixo">Baixo</SelectItem>
                            <SelectItem value="medio">Médio</SelectItem>
                            <SelectItem value="alto">Alto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="riscoFinanceiro">Risco Financeiro</Label>
                        <Select value={formData.riscoFinanceiro} onValueChange={(value) => handleInputChange('riscoFinanceiro', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="baixo">Baixo</SelectItem>
                            <SelectItem value="medio">Médio</SelectItem>
                            <SelectItem value="alto">Alto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="riscoOperacional">Risco Operacional</Label>
                        <Select value={formData.riscoOperacional} onValueChange={(value) => handleInputChange('riscoOperacional', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="baixo">Baixo</SelectItem>
                            <SelectItem value="medio">Médio</SelectItem>
                            <SelectItem value="alto">Alto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Político</p>
                      <Badge className={getRiscoColor(formData.riscoPolitico)}>
                        {formData.riscoPolitico.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Técnico</p>
                      <Badge className={getRiscoColor(formData.riscoTecnico)}>
                        {formData.riscoTecnico.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Financeiro</p>
                      <Badge className={getRiscoColor(formData.riscoFinanceiro)}>
                        {formData.riscoFinanceiro.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Operacional</p>
                      <Badge className={getRiscoColor(formData.riscoOperacional)}>
                        {formData.riscoOperacional.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="observacoesRisco">Observações sobre Riscos</Label>
                    <Textarea
                      id="observacoesRisco"
                      value={formData.observacoesRisco}
                      onChange={(e) => handleInputChange('observacoesRisco', e.target.value)}
                      placeholder="Observações detalhadas sobre os riscos identificados..."
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cronograma" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Cronograma da Licitação
                  </CardTitle>
                  <Button onClick={adicionarEtapaCronograma} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Etapa
                  </Button>
                </CardHeader>
                <CardContent>
                  {formData.cronograma.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Nenhuma etapa adicionada ao cronograma</p>
                      <p className="text-sm text-gray-500">
                        Clique em "Adicionar Etapa" para começar a organizar o cronograma
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.cronograma.map((etapa, index) => (
                        <div key={etapa.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-sm font-medium">Etapa {index + 1}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removerEtapaCronograma(etapa.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <Label>Título da Etapa</Label>
                              <Input
                                value={etapa.titulo}
                                onChange={(e) => atualizarEtapaCronograma(etapa.id, 'titulo', e.target.value)}
                                placeholder="Ex: Análise do Edital"
                              />
                            </div>
                            <div>
                              <Label>Responsável</Label>
                              <Input
                                value={etapa.responsavel}
                                onChange={(e) => atualizarEtapaCronograma(etapa.id, 'responsavel', e.target.value)}
                                placeholder="Nome do responsável"
                              />
                            </div>
                            <div>
                              <Label>Data de Início</Label>
                              <Input
                                type="date"
                                value={etapa.dataInicio}
                                onChange={(e) => atualizarEtapaCronograma(etapa.id, 'dataInicio', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Data de Fim</Label>
                              <Input
                                type="date"
                                value={etapa.dataFim}
                                onChange={(e) => atualizarEtapaCronograma(etapa.id, 'dataFim', e.target.value)}
                              />
                            </div>
                            <div className="lg:col-span-2">
                              <Label>Descrição</Label>
                              <Textarea
                                value={etapa.descricao}
                                onChange={(e) => atualizarEtapaCronograma(etapa.id, 'descricao', e.target.value)}
                                placeholder="Descrição detalhada da etapa..."
                                rows={2}
                              />
                            </div>
                            <div>
                              <Label>Status</Label>
                              <Select 
                                value={etapa.status} 
                                onValueChange={(value) => atualizarEtapaCronograma(etapa.id, 'status', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pendente">Pendente</SelectItem>
                                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                                  <SelectItem value="concluida">Concluída</SelectItem>
                                  <SelectItem value="atrasada">Atrasada</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pedidos" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Gerenciamento de Pedidos</CardTitle>
                  <Button 
                    onClick={() => setIsPedidoModalOpen(true)}
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Novo Pedido
                  </Button>
                </CardHeader>
                <CardContent>
                  {pedidos.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Nenhum pedido associado a esta oportunidade</p>
                      <p className="text-sm text-gray-500">
                        Clique em "Criar Novo Pedido" para começar a adicionar produtos
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nº Pedido</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Produtos</TableHead>
                            <TableHead>Valor Total</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pedidos.map((pedido) => (
                            <TableRow key={pedido.id}>
                              <TableCell className="font-mono text-sm">
                                #{pedido.id.toString().slice(-6)}
                              </TableCell>
                              <TableCell>
                                {new Date(pedido.dataVenda).toLocaleDateString('pt-BR')}
                              </TableCell>
                              <TableCell>
                                <Badge className={`${getStatusColor(pedido.status)} text-white`}>
                                  {pedido.status.toUpperCase()}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {pedido.produtos.length} {pedido.produtos.length === 1 ? 'produto' : 'produtos'}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {pedido.produtos.slice(0, 2).map(p => p.codigo).join(', ')}
                                    {pedido.produtos.length > 2 && ` +${pedido.produtos.length - 2}`}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium text-green-600">
                                {formatCurrency(pedido.valorTotal)}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chamados" className="space-y-4">
              <ChamadosTab 
                chamados={chamados}
                onAdicionarChamado={handleAdicionarChamado}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
              {oportunidade ? 'Atualizar' : 'Salvar'} Oportunidade
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PedidoModal
        isOpen={isPedidoModalOpen}
        onClose={() => setIsPedidoModalOpen(false)}
        onSave={handleSalvarPedido}
        oportunidade={oportunidade || { nomeFantasia: 'Cliente Novo', id: 'novo' }}
      />
    </>
  );
};

export default OportunidadeAvancadaForm;
