
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputMask } from "@/components/ui/input-mask";
import SidebarLayout from "@/components/SidebarLayout";
import ConcorrenteTable from "@/components/comercial/ConcorrenteTable";
import ProdutoServicoTable from "@/components/comercial/ProdutoServicoTable";
import ChatInterno from "@/components/comercial/ChatInterno";
import { 
  ArrowLeft, Save, FileText, Users, MessageSquare, Upload, 
  Calendar, DollarSign, Thermometer, Building, User, Phone, Mail,
  MapPin, Briefcase, Target, Clock, AlertTriangle, CheckCircle
} from "lucide-react";

const OportunidadeComercial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Dados básicos
    codigo: '',
    cliente: '',
    contato: '',
    telefone: '',
    email: '',
    responsavel: '',
    origem: '',
    dataAbertura: '',
    dataContato: '',
    valor: 0,
    
    // Classificação
    familiaComercial: '',
    fonteLead: '',
    segmento: '',
    tipoAplicacao: 'venda',
    tipoOportunidade: 'pontual',
    situacao: 'em_triagem',
    termometro: 50,
    
    // Descrição e observações
    descricao: '',
    observacoes: '',
    
    // Licitação (condicional)
    numeroLicitacao: '',
    orgaoLicitante: '',
    modalidadeLicitacao: '',
    dataAberturaProposta: '',
    dataEntregaProposta: '',
    valorEstimado: 0,
    
    // Importação Direta (condicional)
    paisOrigem: '',
    incoterm: '',
    tempoImportacao: '',
    documentosNecessarios: '',
    
    // Status e aprovação
    status: 'Em Triagem',
    motivoPerdaDesistencia: '',
    dataAprovacao: '',
    aprovadoPor: ''
  });

  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [activeTab, setActiveTab] = useState('dados-gerais');

  // Simular carregamento de dados baseado no ID
  useEffect(() => {
    if (id && id !== 'nova') {
      // Aqui você carregaria os dados da oportunidade do backend
      // Por enquanto, vou simular dados
      setFormData({
        codigo: '10678',
        cliente: 'Associação das Pioneiras Sociais',
        contato: 'João Silva',
        telefone: '(11) 3319-1111',
        email: 'joao@pioneiras.com.br',
        responsavel: 'Faber Oliveira',
        origem: 'Vendas RJ',
        dataAbertura: '2024-03-20',
        dataContato: '2024-03-20',
        valor: 782530,
        familiaComercial: 'Radiometer ABL',
        fonteLead: 'Site',
        segmento: 'Hospitalar',
        tipoAplicacao: 'venda',
        tipoOportunidade: 'pontual',
        situacao: 'ganha',
        termometro: 100,
        descricao: 'DOS 3 EQUIPAMENTOS ADQUIRIDOS POR (ID) O DE Nº SERIE 754R2826N025 IRA SER INSTALADO NO SARAH-DF.',
        observacoes: 'Cliente muito interessado, já aprovado pela diretoria.',
        status: 'Ganha',
        numeroLicitacao: '',
        orgaoLicitante: '',
        modalidadeLicitacao: '',
        dataAberturaProposta: '',
        dataEntregaProposta: '',
        valorEstimado: 0,
        paisOrigem: '',
        incoterm: '',
        tempoImportacao: '',
        documentosNecessarios: '',
        motivoPerdaDesistencia: '',
        dataAprovacao: '2024-03-25',
        aprovadoPor: 'Maria Santos'
      });
    }
  }, [id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Salvando oportunidade:', { ...formData, produtos, servicos });
    // Aqui você salvaria no backend
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'ganha': return 'bg-green-500';
      case 'em_triagem': return 'bg-blue-500';
      case 'em_acompanhamento': return 'bg-orange-500';
      case 'perdida': return 'bg-red-500';
      case 'cancelada': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getTermometroColor = (termometro: number) => {
    if (termometro < 60) return 'text-red-500';
    if (termometro < 80) return 'text-yellow-500';
    if (termometro < 90) return 'text-orange-500';
    return 'text-green-500';
  };

  const renderDadosGerais = () => (
    <div className="space-y-6">
      {/* Header com informações principais */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Oportunidade #{formData.codigo}
              </CardTitle>
              <p className="text-gray-600 mt-2">{formData.cliente}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={`${getSituacaoColor(formData.situacao)} text-white`}>
                {formData.status}
              </Badge>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                <span className={`font-semibold ${getTermometroColor(formData.termometro)}`}>
                  {formData.termometro}°
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(formData.valor)}
                </div>
                <div className="text-sm text-gray-500">Valor da Oportunidade</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Dados do Cliente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Dados do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              placeholder="Nome do contato"
            />
          </div>
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <InputMask
              mask="phone"
              value={formData.telefone}
              onChange={(e) => handleInputChange('telefone', e.target.value)}
              placeholder="(00) 00000-0000"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="email@cliente.com"
            />
          </div>
          <div>
            <Label htmlFor="segmento">Segmento</Label>
            <Select value={formData.segmento} onValueChange={(value) => handleInputChange('segmento', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o segmento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hospitalar">Hospitalar</SelectItem>
                <SelectItem value="Universitário">Universitário</SelectItem>
                <SelectItem value="Público">Público</SelectItem>
                <SelectItem value="Privado">Privado</SelectItem>
                <SelectItem value="Municipal">Municipal</SelectItem>
                <SelectItem value="Estadual">Estadual</SelectItem>
                <SelectItem value="Federal">Federal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dados da Oportunidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Dados da Oportunidade
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="responsavel">Responsável</Label>
            <Select value={formData.responsavel} onValueChange={(value) => handleInputChange('responsavel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o responsável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Faber Oliveira">Faber Oliveira</SelectItem>
                <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                <SelectItem value="João Silva">João Silva</SelectItem>
                <SelectItem value="Carlos Oliveira">Carlos Oliveira</SelectItem>
                <SelectItem value="Ana Costa">Ana Costa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="origem">Origem</Label>
            <Input
              id="origem"
              value={formData.origem}
              onChange={(e) => handleInputChange('origem', e.target.value)}
              placeholder="Ex: Vendas RJ"
            />
          </div>
          <div>
            <Label htmlFor="familiaComercial">Família Comercial</Label>
            <Select value={formData.familiaComercial} onValueChange={(value) => handleInputChange('familiaComercial', value)}>
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
            <Label htmlFor="fonteLead">Fonte do Lead</Label>
            <Select value={formData.fonteLead} onValueChange={(value) => handleInputChange('fonteLead', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Como conheceu?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Site">Site</SelectItem>
                <SelectItem value="Indicação">Indicação</SelectItem>
                <SelectItem value="Cold Call">Cold Call</SelectItem>
                <SelectItem value="Licitação">Licitação</SelectItem>
                <SelectItem value="Referência">Referência</SelectItem>
                <SelectItem value="Feira/Evento">Feira/Evento</SelectItem>
                <SelectItem value="Email Marketing">Email Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tipoAplicacao">Tipo de Aplicação</Label>
            <Select value={formData.tipoAplicacao} onValueChange={(value) => handleInputChange('tipoAplicacao', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="venda">Venda</SelectItem>
                <SelectItem value="locacao">Locação</SelectItem>
                <SelectItem value="servico">Serviço</SelectItem>
                <SelectItem value="manutencao">Manutenção</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tipoOportunidade">Tipo de Oportunidade</Label>
            <Select value={formData.tipoOportunidade} onValueChange={(value) => handleInputChange('tipoOportunidade', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pontual">Pontual</SelectItem>
                <SelectItem value="periodica">Periódica</SelectItem>
                <SelectItem value="licitacao">Licitação</SelectItem>
                <SelectItem value="importacao_direta">Importação Direta</SelectItem>
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
          <div>
            <Label htmlFor="dataContato">Data do Contato</Label>
            <Input
              id="dataContato"
              type="date"
              value={formData.dataContato}
              onChange={(e) => handleInputChange('dataContato', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="valor">Valor da Oportunidade</Label>
            <InputMask
              mask="currency"
              value={formData.valor.toString()}
              onChange={(e) => {
                const value = parseFloat(e.target.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
                handleInputChange('valor', value);
              }}
              placeholder="R$ 0,00"
            />
          </div>
        </CardContent>
      </Card>

      {/* Campos condicionais para Licitação */}
      {formData.tipoOportunidade === 'licitacao' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Dados da Licitação
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="numeroLicitacao">Número da Licitação</Label>
              <Input
                id="numeroLicitacao"
                value={formData.numeroLicitacao}
                onChange={(e) => handleInputChange('numeroLicitacao', e.target.value)}
                placeholder="Ex: PP 001/2024"
              />
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
            <div>
              <Label htmlFor="modalidadeLicitacao">Modalidade</Label>
              <Select value={formData.modalidadeLicitacao} onValueChange={(value) => handleInputChange('modalidadeLicitacao', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pregao_eletronico">Pregão Eletrônico</SelectItem>
                  <SelectItem value="pregao_presencial">Pregão Presencial</SelectItem>
                  <SelectItem value="concorrencia">Concorrência</SelectItem>
                  <SelectItem value="tomada_precos">Tomada de Preços</SelectItem>
                  <SelectItem value="convite">Convite</SelectItem>
                  <SelectItem value="rdc">RDC</SelectItem>
                </SelectContent>
              </Select>
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
            <div>
              <Label htmlFor="valorEstimado">Valor Estimado</Label>
              <InputMask
                mask="currency"
                value={formData.valorEstimado.toString()}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
                  handleInputChange('valorEstimado', value);
                }}
                placeholder="R$ 0,00"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campos condicionais para Importação Direta */}
      {formData.tipoOportunidade === 'importacao_direta' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Dados da Importação
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paisOrigem">País de Origem</Label>
              <Input
                id="paisOrigem"
                value={formData.paisOrigem}
                onChange={(e) => handleInputChange('paisOrigem', e.target.value)}
                placeholder="Ex: Estados Unidos"
              />
            </div>
            <div>
              <Label htmlFor="incoterm">Incoterm</Label>
              <Select value={formData.incoterm} onValueChange={(value) => handleInputChange('incoterm', value)}>
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
              <Label htmlFor="tempoImportacao">Tempo de Importação</Label>
              <Input
                id="tempoImportacao"
                value={formData.tempoImportacao}
                onChange={(e) => handleInputChange('tempoImportacao', e.target.value)}
                placeholder="Ex: 45-60 dias"
              />
            </div>
            <div>
              <Label htmlFor="documentosNecessarios">Documentos Necessários</Label>
              <Textarea
                id="documentosNecessarios"
                value={formData.documentosNecessarios}
                onChange={(e) => handleInputChange('documentosNecessarios', e.target.value)}
                placeholder="Liste os documentos necessários para importação"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Descrição e Observações */}
      <Card>
        <CardHeader>
          <CardTitle>Descrição e Observações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="descricao">Descrição da Oportunidade</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Descreva detalhadamente a oportunidade..."
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              placeholder="Observações importantes..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProdutosServicos = () => (
    <div className="space-y-6">
      <ProdutoServicoTable 
        tipo="produto" 
        items={produtos} 
        onItemsChange={setProdutos} 
      />
      <ProdutoServicoTable 
        tipo="servico" 
        items={servicos} 
        onItemsChange={setServicos} 
      />
    </div>
  );

  const renderAnaliseTecnica = () => (
    <div className="space-y-6">
      <ConcorrenteTable />
      
      <Card>
        <CardHeader>
          <CardTitle>Análise Técnica Detalhada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="vantagens">Vantagens Competitivas</Label>
            <Textarea
              id="vantagens"
              placeholder="Descreva as vantagens da nossa solução..."
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="desvantagens">Pontos de Atenção</Label>
            <Textarea
              id="desvantagens"
              placeholder="Pontos que precisam ser trabalhados..."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="estrategia">Estratégia Comercial</Label>
            <Textarea
              id="estrategia"
              placeholder="Estratégia para ganhar esta oportunidade..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHistoricoChat = () => (
    <div className="space-y-6">
      <ChatInterno />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Timeline da Oportunidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50">
              <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <div className="font-semibold">Oportunidade Criada</div>
                <div className="text-sm text-gray-600">20/03/2024 - 14:30</div>
                <div className="text-sm">Oportunidade registrada por Faber Oliveira</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border-l-4 border-orange-500 bg-orange-50">
              <Phone className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <div className="font-semibold">Primeiro Contato</div>
                <div className="text-sm text-gray-600">20/03/2024 - 15:45</div>
                <div className="text-sm">Ligação realizada com João Silva</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-semibold">Proposta Aprovada</div>
                <div className="text-sm text-gray-600">25/03/2024 - 10:15</div>
                <div className="text-sm">Cliente aprovou a proposta apresentada</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDocumentos = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Documentos da Oportunidade
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <div className="text-lg font-medium text-gray-700 mb-2">
            Faça upload dos documentos
          </div>
          <div className="text-sm text-gray-500 mb-4">
            Arraste e solte arquivos aqui ou clique para selecionar
          </div>
          <Button variant="outline">
            Selecionar Arquivos
          </Button>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">Proposta Comercial.pdf</div>
                <div className="text-sm text-gray-500">2.4 MB • 20/03/2024</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium">Especificações Técnicas.xlsx</div>
                <div className="text-sm text-gray-500">1.8 MB • 22/03/2024</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/comercial')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-biodina-blue">
                {id === 'nova' ? 'Nova Oportunidade' : `Oportunidade #${formData.codigo}`}
              </h1>
              <p className="text-gray-600">{formData.cliente}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Gerar Pedido
            </Button>
            <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Conteúdo com abas */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Dados Gerais
            </TabsTrigger>
            <TabsTrigger value="produtos-servicos" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Produtos/Serviços
            </TabsTrigger>
            <TabsTrigger value="analise-tecnica" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Análise Técnica
            </TabsTrigger>
            <TabsTrigger value="historico-chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Histórico/Chat
            </TabsTrigger>
            <TabsTrigger value="documentos" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dados-gerais">
            {renderDadosGerais()}
          </TabsContent>

          <TabsContent value="produtos-servicos">
            {renderProdutosServicos()}
          </TabsContent>

          <TabsContent value="analise-tecnica">
            {renderAnaliseTecnica()}
          </TabsContent>

          <TabsContent value="historico-chat">
            {renderHistoricoChat()}
          </TabsContent>

          <TabsContent value="documentos">
            {renderDocumentos()}
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default OportunidadeComercial;
