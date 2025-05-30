import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, FileText, MessageSquare, Upload, Package, Thermometer } from 'lucide-react';
import ChatInterno from './ChatInterno';
import PedidoForm from './PedidoForm';

interface OportunidadeAvancadaFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const OportunidadeAvancadaForm = ({ onClose, onSave, oportunidade }: OportunidadeAvancadaFormProps) => {
  const [currentStage, setCurrentStage] = useState<'triagem' | 'participacao'>('triagem');
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [showPedidoForm, setShowPedidoForm] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  
  const [formData, setFormData] = useState({
    // Dados do Cliente
    nome: oportunidade?.nome || '',
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
    dataInicio: oportunidade?.dataInicio || '',
    dataLimite: oportunidade?.dataLimite || '',
    procurandoPor: oportunidade?.procurandoPor || '',
    
    // Organização
    tags: oportunidade?.tags || '',
    caracteristicas: oportunidade?.caracteristicas || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    status: oportunidade?.status || 'em_triagem',
    descricao: oportunidade?.descricao || '',
    
    // Licitação - Triagem
    dataLicitacao: oportunidade?.dataLicitacao || '',
    resumoEdital: oportunidade?.resumoEdital || '',
    impugnacaoEdital: oportunidade?.impugnacaoEdital || '',
    analiseEstrategia: oportunidade?.analiseEstrategia || '',
    naturezaOperacao: oportunidade?.naturezaOperacao || '',
    numeroPregao: oportunidade?.numeroPregao || '',
    numeroProcesso: oportunidade?.numeroProcesso || '',
    numeroUasg: oportunidade?.numeroUasg || '',
    site: oportunidade?.site || '',
    permiteAdesao: oportunidade?.permiteAdesao || false,
    produto: oportunidade?.produto || '',
    valorEstimado: oportunidade?.valorEstimado || 0,
    qtdEquipamentos: oportunidade?.qtdEquipamentos || 0,
    qtdExames: oportunidade?.qtdExames || 0,
    contratoAnterior: oportunidade?.contratoAnterior || false,
    
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
    modalidade: 'licitacao'
  });

  const [concorrentes, setConcorrentes] = useState(oportunidade?.concorrentes || []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      concorrentes,
      id: oportunidade?.id || Date.now(),
    };
    onSave(dataToSave);
    onClose();
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

  const getTermometroColor = (valor: number) => {
    if (valor < 30) return 'bg-red-500';
    if (valor < 60) return 'bg-yellow-500';
    if (valor < 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  // Updated validation function - removed tipoOportunidade dependency
  const isTriagemComplete = () => {
    return formData.nome && formData.cpfCnpj && formData.valorNegocio > 0;
  };

  const handleSolicitarAprovacao = () => {
    if (isTriagemComplete()) {
      setCurrentStage('participacao');
      setActiveTab('dados-gerais');
    }
  };

  const handleAdicionarPedido = () => {
    setShowPedidoForm(true);
  };

  const handleSavePedido = (pedidoData: any) => {
    setPedidos(prev => [...prev, { ...pedidoData, id: Date.now() }]);
    setShowPedidoForm(false);
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>
                {oportunidade ? 'Editar' : 'Nova'} Oportunidade - Licitação
              </span>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {/* Master Tabs - Fixed layout to stay on same line */}
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-center gap-4 py-2" style={{ flexWrap: 'nowrap', minWidth: 'fit-content' }}>
              <button
                onClick={() => setCurrentStage('triagem')}
                className={`px-6 py-2 font-medium transition-colors ${
                  currentStage === 'triagem'
                    ? 'text-biodina-blue border-b-2 border-biodina-blue'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                TRIAGEM
              </button>
              <span className="text-gray-400 font-bold">{'>'}</span>
              <button
                onClick={() => isTriagemComplete() && setCurrentStage('participacao')}
                disabled={!isTriagemComplete()}
                className={`px-6 py-2 font-medium transition-colors ${
                  currentStage === 'participacao'
                    ? 'text-biodina-blue border-b-2 border-biodina-blue'
                    : isTriagemComplete()
                    ? 'text-gray-500 hover:text-gray-700'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                PARTICIPAÇÃO
              </button>
            </div>
          </div>

          {currentStage === 'triagem' && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Dados Gerais
                </TabsTrigger>
                <TabsTrigger value="analise-tecnica" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
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
                <TabsTrigger value="pedidos" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Pedidos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dados-gerais" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Dados do Cliente */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Dados do Cliente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nome">Nome do Cliente *</Label>
                          <Input
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => handleInputChange('nome', e.target.value)}
                            placeholder="Digite o nome do cliente"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                          <Input
                            id="cpfCnpj"
                            value={formData.cpfCnpj}
                            onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                            placeholder="Digite o CPF ou CNPJ"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                        <Input
                          id="nomeFantasia"
                          value={formData.nomeFantasia}
                          onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                          placeholder="Digite o nome fantasia"
                        />
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
                          <Label htmlFor="email">E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Digite o e-mail"
                          />
                        </div>
                        <div>
                          <Label htmlFor="telefone">Telefone</Label>
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

                      <div className="grid grid-cols-2 gap-4">
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
                    </CardContent>
                  </Card>
                </div>

                {/* Dados Específicos de Licitação - with yellow highlights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados Específicos de Licitação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dataLicitacao">Data da Licitação</Label>
                        <Input
                          id="dataLicitacao"
                          type="date"
                          value={formData.dataLicitacao}
                          onChange={(e) => handleInputChange('dataLicitacao', e.target.value)}
                          className="bg-yellow-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numeroPregao">Nº Pregão/INEX/ATA/SRP</Label>
                        <Input
                          id="numeroPregao"
                          value={formData.numeroPregao}
                          onChange={(e) => handleInputChange('numeroPregao', e.target.value)}
                          placeholder="Digite o número"
                          className="bg-yellow-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="numeroProcesso">Nº Processo</Label>
                        <Input
                          id="numeroProcesso"
                          value={formData.numeroProcesso}
                          onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                          placeholder="Digite o número do processo"
                          className="bg-yellow-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numeroUasg">Nº UASG</Label>
                        <Input
                          id="numeroUasg"
                          value={formData.numeroUasg}
                          onChange={(e) => handleInputChange('numeroUasg', e.target.value)}
                          placeholder="Digite o número UASG"
                          className="bg-yellow-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="resumoEdital">Resumo do Edital</Label>
                      <Textarea
                        id="resumoEdital"
                        value={formData.resumoEdital}
                        onChange={(e) => handleInputChange('resumoEdital', e.target.value)}
                        placeholder="Digite o resumo do edital"
                        rows={3}
                        className="bg-yellow-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="impugnacaoEdital">Impugnação do Edital</Label>
                      <Textarea
                        id="impugnacaoEdital"
                        value={formData.impugnacaoEdital}
                        onChange={(e) => handleInputChange('impugnacaoEdital', e.target.value)}
                        placeholder="Digite a impugnação do edital"
                        rows={3}
                        className="bg-yellow-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="analiseEstrategia">Análise de Estratégia</Label>
                      <Textarea
                        id="analiseEstrategia"
                        value={formData.analiseEstrategia}
                        onChange={(e) => handleInputChange('analiseEstrategia', e.target.value)}
                        placeholder="Digite a análise de estratégia"
                        rows={3}
                        className="bg-yellow-50"
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="naturezaOperacao">Qual Natureza da Operação</Label>
                        <Select value={formData.naturezaOperacao} onValueChange={(value) => handleInputChange('naturezaOperacao', value)}>
                          <SelectTrigger className="bg-yellow-50">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="venda">Venda</SelectItem>
                            <SelectItem value="locacao">Locação</SelectItem>
                            <SelectItem value="servico">Serviço</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="site">Qual Site?</Label>
                        <Input
                          id="site"
                          value={formData.site}
                          onChange={(e) => handleInputChange('site', e.target.value)}
                          placeholder="Digite o site"
                          className="bg-yellow-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="valorEstimado">Valor Estimado</Label>
                        <Input
                          id="valorEstimado"
                          type="number"
                          value={formData.valorEstimado}
                          onChange={(e) => handleInputChange('valorEstimado', parseFloat(e.target.value) || 0)}
                          placeholder="Digite o valor estimado"
                          className="bg-yellow-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="qtdEquipamentos">Qtd Equipamentos</Label>
                        <Input
                          id="qtdEquipamentos"
                          type="number"
                          value={formData.qtdEquipamentos}
                          onChange={(e) => handleInputChange('qtdEquipamentos', parseInt(e.target.value) || 0)}
                          placeholder="Digite a quantidade"
                          className="bg-yellow-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="qtdExames">Qtd Exames</Label>
                        <Input
                          id="qtdExames"
                          type="number"
                          value={formData.qtdExames}
                          onChange={(e) => handleInputChange('qtdExames', parseInt(e.target.value) || 0)}
                          placeholder="Digite a quantidade"
                          className="bg-yellow-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="produto">Produto</Label>
                      <Input
                        id="produto"
                        value={formData.produto}
                        onChange={(e) => handleInputChange('produto', e.target.value)}
                        placeholder="Digite o produto"
                        className="bg-yellow-50"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="permiteAdesao"
                          checked={formData.permiteAdesao}
                          onCheckedChange={(checked) => handleInputChange('permiteAdesao', checked)}
                        />
                        <Label htmlFor="permiteAdesao" className="bg-yellow-50 px-2 py-1 rounded">Permite Adesão?</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="contratoAnterior"
                          checked={formData.contratoAnterior}
                          onCheckedChange={(checked) => handleInputChange('contratoAnterior', checked)}
                        />
                        <Label htmlFor="contratoAnterior" className="bg-yellow-50 px-2 py-1 rounded">Havia Contrato Anterior?</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Organização */}
                <Card>
                  <CardHeader>
                    <CardTitle>Organização</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        placeholder="Digite as tags separadas por vírgula"
                      />
                    </div>

                    <div>
                      <Label htmlFor="caracteristicas">Características</Label>
                      <Textarea
                        id="caracteristicas"
                        value={formData.caracteristicas}
                        onChange={(e) => handleInputChange('caracteristicas', e.target.value)}
                        placeholder="Descreva as características"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="fluxoTrabalho">Fluxo de Trabalho</Label>
                      <Textarea
                        id="fluxoTrabalho"
                        value={formData.fluxoTrabalho}
                        onChange={(e) => handleInputChange('fluxoTrabalho', e.target.value)}
                        placeholder="Descreva o fluxo de trabalho"
                        rows={3}
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

                    {formData.status === 'ganha' && (
                      <div>
                        <Label htmlFor="motivoGanho">Motivo do Ganho</Label>
                        <Textarea
                          id="motivoGanho"
                          value={formData.motivoGanho}
                          onChange={(e) => handleInputChange('motivoGanho', e.target.value)}
                          placeholder="Descreva o motivo do ganho"
                          rows={3}
                        />
                      </div>
                    )}

                    {formData.status === 'perdida' && (
                      <div>
                        <Label htmlFor="motivoPerda">Motivo de Perda</Label>
                        <Textarea
                          id="motivoPerda"
                          value={formData.motivoPerda}
                          onChange={(e) => handleInputChange('motivoPerda', e.target.value)}
                          placeholder="Descreva o motivo da perda"
                          rows={3}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        value={formData.descricao}
                        onChange={(e) => handleInputChange('descricao', e.target.value)}
                        placeholder="Descrição geral da oportunidade"
                        rows={4}
                      />
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

                    <div className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="dataVisita">Data da Visita</Label>
                        <Input
                          id="dataVisita"
                          type="date"
                          value={formData.dataVisita}
                          onChange={(e) => handleInputChange('dataVisita', e.target.value)}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="propostaNegociacao"
                          checked={formData.propostaNegociacao}
                          onCheckedChange={(checked) => handleInputChange('propostaNegociacao', checked)}
                        />
                        <Label htmlFor="propostaNegociacao">Proposta em Negociação</Label>
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
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSolicitarAprovacao}
                      disabled={!isTriagemComplete()}
                      className="bg-biodina-gold hover:bg-biodina-gold/90"
                    >
                      Solicitar Aprovação para Participação
                    </Button>
                  </div>
                </div>
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
                      placeholder="Digite a análise técnica-científica da oportunidade..."
                      rows={15}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historico-chat" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico e Chat Interno</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChatInterno oportunidadeId={oportunidade?.id || 'nova'} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documentos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Arraste e solte arquivos aqui ou clique para selecionar</p>
                      <Button variant="outline">
                        Selecionar Arquivos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pedidos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Gerenciamento de Pedidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pedidos.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Nenhum pedido associado a esta oportunidade</p>
                        <Button onClick={handleAdicionarPedido} className="bg-biodina-gold hover:bg-biodina-gold/90">
                          <Plus className="h-4 w-4 mr-2" />
                          Criar Novo Pedido
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">Pedidos ({pedidos.length})</h3>
                          <Button onClick={handleAdicionarPedido} className="bg-biodina-gold hover:bg-biodina-gold/90">
                            <Plus className="h-4 w-4 mr-2" />
                            Novo Pedido
                          </Button>
                        </div>
                        <div className="grid gap-4">
                          {pedidos.map((pedido: any) => (
                            <div key={pedido.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">Pedido #{pedido.numero || pedido.id}</h4>
                                  <p className="text-sm text-gray-600">
                                    Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido.valor || 0)}
                                  </p>
                                  <p className="text-sm text-gray-600">Status: {pedido.status || 'Em andamento'}</p>
                                </div>
                                <Badge variant="outline">{pedido.tipo || 'Padrão'}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {currentStage === 'participacao' && (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-4">Fase de Participação</h3>
              <p className="text-gray-600">Configurações específicas para participação na licitação</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {showPedidoForm && (
        <PedidoForm
          onClose={() => setShowPedidoForm(false)}
          onSave={handleSavePedido}
        />
      )}
    </>
  );
};

export default OportunidadeAvancadaForm;
