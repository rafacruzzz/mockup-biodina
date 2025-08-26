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
import { X, Plus, FileText, MessageSquare, Upload, Package, Thermometer, ShoppingCart, Eye, Headphones, Link2, Download, Clock, Calendar, DollarSign, Users, Building, MapPin, Phone, Mail, Globe, Tag, FileCheck, AlertCircle, TrendingUp, Target, Briefcase, CheckCircle, XCircle, Pause, Play } from 'lucide-react';
import { PedidoCompleto } from '@/types/comercial';
import { Chamado, StatusChamado } from '@/types/chamado';
import { licitacoesDetalhadas } from '@/data/licitacaoMockData';
import ChatInterno from './ChatInterno';
import PedidoModal from './PedidoModal';
import ChamadosTab from './ChamadosTab';
import { MoneyInput } from '@/components/ui/money-input';

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
  const [licitacaoVinculada, setLicitacaoVinculada] = useState<string>('');
  const [documentosLicitacao, setDocumentosLicitacao] = useState<any[]>([]);
  const [historicoLicitacao, setHistoricoLicitacao] = useState<any[]>([]);
  
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
    
    // Campos específicos de licitação
    numeroProcesso: oportunidade?.numeroProcesso || '',
    orgaoLicitante: oportunidade?.orgaoLicitante || '',
    modalidadeLicitacao: oportunidade?.modalidadeLicitacao || '',
    tipoLicitacao: oportunidade?.tipoLicitacao || '',
    objetoLicitacao: oportunidade?.objetoLicitacao || '',
    dataAbertura: oportunidade?.dataAbertura || '',
    dataEntregaProposta: oportunidade?.dataEntregaProposta || '',
    localEntregaProposta: oportunidade?.localEntregaProposta || '',
    valorEstimado: oportunidade?.valorEstimado || '',
    criterioJulgamento: oportunidade?.criterioJulgamento || '',
    linkEdital: oportunidade?.linkEdital || '',
    
    // Estratégia Comercial
    estrategiaValorMinimo: oportunidade?.estrategiaValorMinimo || '',
    estrategiaValorMaximo: oportunidade?.estrategiaValorMaximo || '',
    valorMinimoFinal: oportunidade?.valorMinimoFinal || '',
    manifestacaoInteresseRecorrer: oportunidade?.manifestacaoInteresseRecorrer || '',
    
    // Acompanhamento
    statusLicitacao: oportunidade?.statusLicitacao || 'em_andamento',
    resultadoFinal: oportunidade?.resultadoFinal || '',
    posicaoClassificacao: oportunidade?.posicaoClassificacao || '',
    valorVencedor: oportunidade?.valorVencedor || '',
    empresaVencedora: oportunidade?.empresaVencedora || '',
    observacoesFinais: oportunidade?.observacoesFinais || ''
  });

  const [concorrentes, setConcorrentes] = useState(oportunidade?.concorrentes || []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVincularLicitacao = (licitacaoId: string) => {
    if (!licitacaoId) {
      setLicitacaoVinculada('');
      setDocumentosLicitacao([]);
      setHistoricoLicitacao([]);
      return;
    }

    const licitacao = licitacoesDetalhadas.find(l => l.id.toString() === licitacaoId);
    if (!licitacao) return;

    setLicitacaoVinculada(licitacaoId);
    setDocumentosLicitacao(licitacao.documentos);
    setHistoricoLicitacao(licitacao.historico);

    // Preencher automaticamente os campos da licitação
    setFormData(prev => ({
      ...prev,
      cpfCnpj: licitacao.cnpj,
      nomeFantasia: licitacao.nomeInstituicao,
      razaoSocial: licitacao.nomeInstituicao,
      endereco: `${licitacao.municipio} - ${licitacao.uf}`,
      uf: licitacao.uf,
      website: licitacao.linkEdital || '',
      fonteLead: 'licitacao',
      valorNegocio: licitacao.valorEstimado,
      tags: licitacao.palavraChave,
      caracteristicas: licitacao.objetoLicitacao,
      fluxoTrabalho: `Licitação ${licitacao.numeroPregao}`,
      status: licitacao.status === 'ganha' ? 'ganha' : 'em_acompanhamento',
      descricao: licitacao.resumoEdital,
      analiseTecnica: licitacao.analiseTecnica,
      numeroProcesso: licitacao.numeroProcesso,
      orgaoLicitante: licitacao.nomeInstituicao,
      modalidadeLicitacao: licitacao.modalidade,
      tipoLicitacao: licitacao.tipo,
      objetoLicitacao: licitacao.objetoLicitacao,
      dataAbertura: licitacao.dataAbertura,
      dataEntregaProposta: licitacao.dataLimiteEntrega,
      localEntregaProposta: licitacao.localEntrega,
      valorEstimado: licitacao.valorEstimado.toString(),
      criterioJulgamento: licitacao.criterioJulgamento,
      linkEdital: licitacao.linkEdital,
      estrategiaValorMinimo: licitacao.estrategiaValorMinimo?.toString() || '',
      estrategiaValorMaximo: licitacao.estrategiaValorMaximo?.toString() || '',
      valorMinimoFinal: licitacao.estrategiaValorFinal?.toString() || '',
      statusLicitacao: licitacao.status,
      resultadoFinal: licitacao.resultadoFinal || '',
      posicaoClassificacao: licitacao.posicaoClassificacao?.toString() || '',
      valorVencedor: licitacao.valorVencedor?.toString() || '',
      empresaVencedora: licitacao.empresaVencedora || '',
      observacoesFinais: licitacao.observacoesFinais || ''
    }));
  };

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
      licitacaoVinculada,
      documentosLicitacao,
      historicoLicitacao,
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

  const getTermometroColor = (valor: number) => {
    if (valor < 30) return 'bg-red-500';
    if (valor < 60) return 'bg-yellow-500';
    if (valor < 80) return 'bg-orange-500';
    return 'bg-green-500';
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

  const getStatusLicitacaoColor = (status: string) => {
    switch (status) {
      case 'em_andamento': return 'bg-blue-500';
      case 'ganha': return 'bg-green-500';
      case 'perdida': return 'bg-red-500';
      case 'cancelada': return 'bg-gray-500';
      case 'suspensa': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLicitacaoIcon = (status: string) => {
    switch (status) {
      case 'em_andamento': return <Play className="h-4 w-4" />;
      case 'ganha': return <CheckCircle className="h-4 w-4" />;
      case 'perdida': return <XCircle className="h-4 w-4" />;
      case 'cancelada': return <XCircle className="h-4 w-4" />;
      case 'suspensa': return <Pause className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const isReadOnlyMode = () => {
    return formData.statusLicitacao === 'ganha' || formData.statusLicitacao === 'perdida' || formData.statusLicitacao === 'cancelada';
  };

  const licitacaoVinculadaData = licitacoesDetalhadas.find(l => l.id.toString() === licitacaoVinculada);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>
                  {oportunidade ? 'Editar' : 'Nova'} Oportunidade - Licitação
                </span>
                {licitacaoVinculadaData && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Link2 className="h-3 w-3 mr-1" />
                    Vinculada à {licitacaoVinculadaData.numeroPregao}
                  </Badge>
                )}
                {formData.statusLicitacao && (
                  <Badge className={`${getStatusLicitacaoColor(formData.statusLicitacao)} text-white`}>
                    {getStatusLicitacaoIcon(formData.statusLicitacao)}
                    <span className="ml-1">{formData.statusLicitacao.replace('_', ' ').toUpperCase()}</span>
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2 text-xs">
                <Building className="h-3 w-3" />
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger value="licitacao" className="flex items-center gap-2 text-xs">
                <FileCheck className="h-3 w-3" />
                Licitação
              </TabsTrigger>
              <TabsTrigger value="estrategia" className="flex items-center gap-2 text-xs">
                <Target className="h-3 w-3" />
                Estratégia
              </TabsTrigger>
              <TabsTrigger value="acompanhamento" className="flex items-center gap-2 text-xs">
                <TrendingUp className="h-3 w-3" />
                Acompanhamento
              </TabsTrigger>
              <TabsTrigger value="historico-chat" className="flex items-center gap-2 text-xs">
                <MessageSquare className="h-3 w-3" />
                Histórico/Chat
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2 text-xs">
                <Package className="h-3 w-3" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="chamados" className="flex items-center gap-2 text-xs">
                <Headphones className="h-3 w-3" />
                Chamados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais" className="space-y-6">
              {/* Vincular Licitação */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" />
                    Vincular Licitação Existente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="licitacao">Selecionar Licitação</Label>
                      <Select value={licitacaoVinculada} onValueChange={handleVincularLicitacao}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma licitação para vincular" />
                        </SelectTrigger>
                        <SelectContent>
                          {licitacoesDetalhadas.map((licitacao) => (
                            <SelectItem key={licitacao.id} value={licitacao.id.toString()}>
                              {licitacao.numeroPregao} - {licitacao.nomeInstituicao} ({formatCurrency(licitacao.valorEstimado)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {licitacaoVinculadaData && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Licitação Vinculada:</strong> {licitacaoVinculadaData.numeroPregao}
                        </p>
                        <p className="text-sm text-blue-600">
                          {licitacaoVinculadaData.objetoLicitacao}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Os dados do cliente, documentos, histórico e informações da licitação foram importados automaticamente.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dados do Cliente */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
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
                          disabled={isReadOnlyMode()}
                        />
                      </div>
                      <div>
                        <Label htmlFor="nomeFantasia">Nome/Nome Fantasia *</Label>
                        <Input
                          id="nomeFantasia"
                          value={formData.nomeFantasia}
                          onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                          placeholder="Digite o nome"
                          disabled={isReadOnlyMode()}
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
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="endereco" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Endereço do Cliente
                        </Label>
                        <Input
                          id="endereco"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange('endereco', e.target.value)}
                          placeholder="Digite o endereço"
                          disabled={isReadOnlyMode()}
                        />
                      </div>
                      <div>
                        <Label htmlFor="uf">UF</Label>
                        <Select value={formData.uf} onValueChange={(value) => handleInputChange('uf', value)} disabled={isReadOnlyMode()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AC">AC</SelectItem>
                            <SelectItem value="AL">AL</SelectItem>
                            <SelectItem value="AP">AP</SelectItem>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="BA">BA</SelectItem>
                            <SelectItem value="CE">CE</SelectItem>
                            <SelectItem value="DF">DF</SelectItem>
                            <SelectItem value="ES">ES</SelectItem>
                            <SelectItem value="GO">GO</SelectItem>
                            <SelectItem value="MA">MA</SelectItem>
                            <SelectItem value="MT">MT</SelectItem>
                            <SelectItem value="MS">MS</SelectItem>
                            <SelectItem value="MG">MG</SelectItem>
                            <SelectItem value="PA">PA</SelectItem>
                            <SelectItem value="PB">PB</SelectItem>
                            <SelectItem value="PR">PR</SelectItem>
                            <SelectItem value="PE">PE</SelectItem>
                            <SelectItem value="PI">PI</SelectItem>
                            <SelectItem value="RJ">RJ</SelectItem>
                            <SelectItem value="RN">RN</SelectItem>
                            <SelectItem value="RS">RS</SelectItem>
                            <SelectItem value="RO">RO</SelectItem>
                            <SelectItem value="RR">RR</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                            <SelectItem value="SP">SP</SelectItem>
                            <SelectItem value="SE">SE</SelectItem>
                            <SelectItem value="TO">TO</SelectItem>
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
                          disabled={isReadOnlyMode()}
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
                          disabled={isReadOnlyMode()}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="Digite o website"
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ativo"
                        checked={formData.ativo}
                        onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                        disabled={isReadOnlyMode()}
                      />
                      <Label htmlFor="ativo">Cliente Ativo</Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Dados da Oportunidade */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Dados da Oportunidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fonteLead">Fonte do Lead</Label>
                        <Select value={formData.fonteLead} onValueChange={(value) => handleInputChange('fonteLead', value)} disabled={isReadOnlyMode()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="site">Site</SelectItem>
                            <SelectItem value="indicacao">Indicação</SelectItem>
                            <SelectItem value="cold_call">Cold Call</SelectItem>
                            <SelectItem value="licitacao">Licitação</SelectItem>
                            <SelectItem value="referencia">Referência</SelectItem>
                            <SelectItem value="portal_compras">Portal de Compras</SelectItem>
                            <SelectItem value="evento">Evento</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="valorNegocio" className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Valor do Negócio *
                        </Label>
                        <Input
                          id="valorNegocio"
                          type="number"
                          value={formData.valorNegocio}
                          onChange={(e) => handleInputChange('valorNegocio', parseFloat(e.target.value) || 0)}
                          placeholder="Digite o valor"
                          disabled={isReadOnlyMode()}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="metodoContato">Método de Contato</Label>
                        <Select value={formData.metodoContato} onValueChange={(value) => handleInputChange('metodoContato', value)} disabled={isReadOnlyMode()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="telefone">Telefone</SelectItem>
                            <SelectItem value="email">E-mail</SelectItem>
                            <SelectItem value="presencial">Presencial</SelectItem>
                            <SelectItem value="video_call">Video Call</SelectItem>
                            <SelectItem value="portal_fornecedor">Portal do Fornecedor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="segmentoLead">Segmento do Lead</Label>
                        <Select value={formData.segmentoLead} onValueChange={(value) => handleInputChange('segmentoLead', value)} disabled={isReadOnlyMode()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hospitalar">Hospitalar</SelectItem>
                            <SelectItem value="universitario">Universitário</SelectItem>
                            <SelectItem value="publico">Público</SelectItem>
                            <SelectItem value="privado">Privado</SelectItem>
                            <SelectItem value="municipal">Municipal</SelectItem>
                            <SelectItem value="estadual">Estadual</SelectItem>
                            <SelectItem value="federal">Federal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="colaboradoresResponsaveis" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Colaboradores Responsáveis
                      </Label>
                      <Input
                        id="colaboradoresResponsaveis"
                        value={formData.colaboradoresResponsaveis}
                        onChange={(e) => handleInputChange('colaboradoresResponsaveis', e.target.value)}
                        placeholder="Digite os responsáveis"
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="procurandoPor">Procurando Por (Contatos vinculados)</Label>
                      <Input
                        id="procurandoPor"
                        value={formData.procurandoPor}
                        onChange={(e) => handleInputChange('procurandoPor', e.target.value)}
                        placeholder="Digite os contatos"
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="status">Status da Oportunidade</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)} disabled={isReadOnlyMode()}>
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
                          disabled={isReadOnlyMode()}
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
                          disabled={isReadOnlyMode()}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Organização */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Organização
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        placeholder="Digite as tags separadas por vírgula"
                        disabled={isReadOnlyMode()}
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
                        disabled={isReadOnlyMode()}
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
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        value={formData.descricao}
                        onChange={(e) => handleInputChange('descricao', e.target.value)}
                        placeholder="Descrição geral da oportunidade"
                        rows={4}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="analiseTecnica">Análise Técnica-Científica</Label>
                      <Textarea
                        id="analiseTecnica"
                        value={formData.analiseTecnica}
                        onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                        placeholder="Digite a análise técnica-científica..."
                        rows={6}
                        disabled={isReadOnlyMode()}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Análise da Concorrência e Outros */}
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
                              disabled={isReadOnlyMode()}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Input
                              placeholder="Nome do concorrente"
                              value={concorrente.nome}
                              onChange={(e) => atualizarConcorrente(index, 'nome', e.target.value)}
                              disabled={isReadOnlyMode()}
                            />
                            <Input
                              placeholder="Produto do concorrente"
                              value={concorrente.produto}
                              onChange={(e) => atualizarConcorrente(index, 'produto', e.target.value)}
                              disabled={isReadOnlyMode()}
                            />
                            <Input
                              type="number"
                              placeholder="Preço praticado"
                              value={concorrente.preco}
                              onChange={(e) => atualizarConcorrente(index, 'preco', parseFloat(e.target.value) || 0)}
                              disabled={isReadOnlyMode()}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={adicionarConcorrente}
                        className="w-full"
                        disabled={isReadOnlyMode()}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Concorrente
                      </Button>
                    </div>

                    <div className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="dataVisita" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Data da Visita
                        </Label>
                        <Input
                          id="dataVisita"
                          type="date"
                          value={formData.dataVisita}
                          onChange={(e) => handleInputChange('dataVisita', e.target.value)}
                          disabled={isReadOnlyMode()}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="propostaNegociacao"
                          checked={formData.propostaNegociacao}
                          onCheckedChange={(checked) => handleInputChange('propostaNegociacao', checked)}
                          disabled={isReadOnlyMode()}
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
                            disabled={isReadOnlyMode()}
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
              </div>
            </TabsContent>

            <TabsContent value="licitacao" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informações Básicas da Licitação */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Informações Básicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="numeroProcesso">Número do Processo *</Label>
                      <Input
                        id="numeroProcesso"
                        value={formData.numeroProcesso}
                        onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                        placeholder="Ex: 001/2024"
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="orgaoLicitante">Órgão Licitante *</Label>
                      <Input
                        id="orgaoLicitante"
                        value={formData.orgaoLicitante}
                        onChange={(e) => handleInputChange('orgaoLicitante', e.target.value)}
                        placeholder="Nome do órgão licitante"
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="modalidadeLicitacao">Modalidade *</Label>
                        <Select value={formData.modalidadeLicitacao} onValueChange={(value) => handleInputChange('modalidadeLicitacao', value)} disabled={isReadOnlyMode()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pregao_eletronico">Pregão Eletrônico</SelectItem>
                            <SelectItem value="pregao_presencial">Pregão Presencial</SelectItem>
                            <SelectItem value="concorrencia">Concorrência</SelectItem>
                            <SelectItem value="tomada_precos">Tomada de Preços</SelectItem>
                            <SelectItem value="convite">Convite</SelectItem>
                            <SelectItem value="concurso">Concurso</SelectItem>
                            <SelectItem value="leilao">Leilão</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tipoLicitacao">Tipo</Label>
                        <Select value={formData.tipoLicitacao} onValueChange={(value) => handleInputChange('tipoLicitacao', value)} disabled={isReadOnlyMode()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="menor_preco">Menor Preço</SelectItem>
                            <SelectItem value="melhor_tecnica">Melhor Técnica</SelectItem>
                            <SelectItem value="tecnica_preco">Técnica e Preço</SelectItem>
                            <SelectItem value="maior_lance">Maior Lance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="objetoLicitacao">Objeto da Licitação *</Label>
                      <Textarea
                        id="objetoLicitacao"
                        value={formData.objetoLicitacao}
                        onChange={(e) => handleInputChange('objetoLicitacao', e.target.value)}
                        placeholder="Descreva o objeto da licitação"
                        rows={4}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="criterioJulgamento">Critério de Julgamento</Label>
                      <Select value={formData.criterioJulgamento} onValueChange={(value) => handleInputChange('criterioJulgamento', value)} disabled={isReadOnlyMode()}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="menor_preco">Menor Preço</SelectItem>
                          <SelectItem value="melhor_tecnica">Melhor Técnica</SelectItem>
                          <SelectItem value="tecnica_preco">Técnica e Preço</SelectItem>
                          <SelectItem value="maior_desconto">Maior Desconto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Prazos e Valores */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Prazos e Valores
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="dataAbertura">Data de Abertura *</Label>
                      <Input
                        id="dataAbertura"
                        type="datetime-local"
                        value={formData.dataAbertura}
                        onChange={(e) => handleInputChange('dataAbertura', e.target.value)}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="dataEntregaProposta">Data Limite para Entrega de Proposta *</Label>
                      <Input
                        id="dataEntregaProposta"
                        type="datetime-local"
                        value={formData.dataEntregaProposta}
                        onChange={(e) => handleInputChange('dataEntregaProposta', e.target.value)}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="localEntregaProposta">Local de Entrega da Proposta</Label>
                      <Textarea
                        id="localEntregaProposta"
                        value={formData.localEntregaProposta}
                        onChange={(e) => handleInputChange('localEntregaProposta', e.target.value)}
                        placeholder="Endereço ou plataforma para entrega"
                        rows={3}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="valorEstimado" className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Valor Estimado (R$)
                      </Label>
                      <Input
                        id="valorEstimado"
                        type="number"
                        step="0.01"
                        value={formData.valorEstimado}
                        onChange={(e) => handleInputChange('valorEstimado', e.target.value)}
                        placeholder="0,00"
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="linkEdital" className="flex items-center gap-2">
                        <Link2 className="h-4 w-4" />
                        Link do Edital
                      </Label>
                      <Input
                        id="linkEdital"
                        type="url"
                        value={formData.linkEdital}
                        onChange={(e) => handleInputChange('linkEdital', e.target.value)}
                        placeholder="https://..."
                        disabled={isReadOnlyMode()}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="estrategia" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Estratégia Comercial
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="estrategiaValorMinimo">Valor Mínimo Estratégico (R$)</Label>
                      <MoneyInput
                        id="estrategiaValorMinimo"
                        value={formData.estrategiaValorMinimo}
                        onChange={(value) => handleInputChange('estrategiaValorMinimo', value)}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="estrategiaValorMaximo">Valor Máximo Estratégico (R$)</Label>
                      <MoneyInput
                        id="estrategiaValorMaximo"
                        value={formData.estrategiaValorMaximo}
                        onChange={(value) => handleInputChange('estrategiaValorMaximo', value)}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="valorMinimoFinal">Valor mínimo Final (R$)</Label>
                      <MoneyInput
                        id="valorMinimoFinal"
                        value={formData.valorMinimoFinal}
                        onChange={(value) => handleInputChange('valorMinimoFinal', value)}
                        disabled={isReadOnlyMode()}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="manifestacaoInteresseRecorrer">Razões para Recurso</Label>
                    <Textarea
                      id="manifestacaoInteresseRecorrer"
                      value={formData.manifestacaoInteresseRecorrer}
                      onChange={(e) => handleInputChange('manifestacaoInteresseRecorrer', e.target.value)}
                      placeholder="Descreva as razões para recurso se necessário..."
                      rows={4}
                      disabled={isReadOnlyMode()}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="acompanhamento" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Acompanhamento da Licitação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="statusLicitacao">Status da Licitação</Label>
                    <Select value={formData.statusLicitacao} onValueChange={(value) => handleInputChange('statusLicitacao', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="em_andamento">Em Andamento</SelectItem>
                        <SelectItem value="ganha">Ganha</SelectItem>
                        <SelectItem value="perdida">Perdida</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                        <SelectItem value="suspensa">Suspensa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(formData.statusLicitacao === 'ganha' || formData.statusLicitacao === 'perdida') && (
                    <>
                      <div>
                        <Label htmlFor="resultadoFinal">Resultado Final</Label>
                        <Textarea
                          id="resultadoFinal"
                          value={formData.resultadoFinal}
                          onChange={(e) => handleInputChange('resultadoFinal', e.target.value)}
                          placeholder="Descreva o resultado final da licitação"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="posicaoClassificacao">Posição na Classificação</Label>
                          <Input
                            id="posicaoClassificacao"
                            type="number"
                            value={formData.posicaoClassificacao}
                            onChange={(e) => handleInputChange('posicaoClassificacao', e.target.value)}
                            placeholder="Ex: 1, 2, 3..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="valorVencedor">Valor Vencedor (R$)</Label>
                          <MoneyInput
                            id="valorVencedor"
                            value={formData.valorVencedor}
                            onChange={(value) => handleInputChange('valorVencedor', value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="empresaVencedora">Empresa Vencedora</Label>
                        <Input
                          id="empresaVencedora"
                          value={formData.empresaVencedora}
                          onChange={(e) => handleInputChange('empresaVencedora', e.target.value)}
                          placeholder="Nome da empresa vencedora"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="observacoesFinais">Observações Finais</Label>
                    <Textarea
                      id="observacoesFinais"
                      value={formData.observacoesFinais}
                      onChange={(e) => handleInputChange('observacoesFinais', e.target.value)}
                      placeholder="Observações gerais sobre o acompanhamento"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico-chat" className="space-y-4">
              {/* Histórico importado da licitação */}
              {historicoLicitacao.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Histórico Importado da Licitação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {historicoLicitacao.map((entry, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{entry.usuario}</span>
                              <Badge variant="outline" className="text-xs">
                                {entry.departamento}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleString('pt-BR')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{entry.texto}</p>
                          {entry.anexos && entry.anexos.length > 0 && (
                            <div className="mt-2">
                              {entry.anexos.map((anexo, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs mr-1">
                                  {anexo}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Chat Interno</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChatInterno oportunidadeId={oportunidade?.id || 'nova'} />
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
                    disabled={isReadOnlyMode()}
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
                        {isReadOnlyMode() 
                          ? 'Esta licitação está finalizada e não permite novos pedidos'
                          : 'Clique em "Criar Novo Pedido" para começar a adicionar produtos'
                        }
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
                readOnly={isReadOnlyMode()}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-biodina-gold hover:bg-biodina-gold/90"
              disabled={isReadOnlyMode()}
            >
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
