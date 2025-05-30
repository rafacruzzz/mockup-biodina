
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SidebarLayout from "@/components/SidebarLayout";
import ChatInterno from "@/components/comercial/ChatInterno";
import ConcorrenteTable from "@/components/comercial/ConcorrenteTable";
import ProdutoServicoTable from "@/components/comercial/ProdutoServicoTable";
import ApprovalModal from "@/components/comercial/ApprovalModal";
import { 
  ArrowLeft, Save, FileText, Users, MessageSquare, Upload, 
  Calendar, MapPin, Phone, Mail, Building, User, DollarSign,
  AlertTriangle, CheckCircle, Clock, Target, Thermometer,
  Lock, Eye, Plus, Edit, Trash2
} from "lucide-react";

const OportunidadeComercial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('triagem');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  
  // Estado dos dados da oportunidade
  const [formData, setFormData] = useState({
    // Dados básicos
    codigo: '10678',
    cliente: 'Associação das Pioneiras Sociais',
    contato: 'Ramal - 3319-1111',
    email: 'contato@pioneiras.org.br',
    responsavel: 'Faber Oliveira',
    origem: 'Vendas RJ',
    familiaComercial: 'Radiometer ABL',
    situacao: 'ganha',
    status: 'Ganha', // Campo restaurado
    resultadoOportunidade: 'ganho',
    tipoAplicacao: 'venda',
    tipoOportunidade: 'pontual',
    valor: 782530,
    dataAbertura: '20/03/2024',
    dataContato: '20/03/2024',
    termometro: 100,
    fonteLead: 'Site',
    segmento: 'Hospitalar',
    descricao: 'DOS 3 EQUIPAMENTOS ADQUIRIDOS POR (ID) O DE Nº SERIE 754R2826N025 IRA SER INSTALADO NO SARAH-DF.',
    
    // Campos da Triagem - RESTAURADOS
    nome: 'João Silva Santos',
    cpfCnpj: '123.456.789-00',
    valorNegocio: 782530,
    
    // Campos específicos para licitação
    numeroLicitacao: '',
    orgaoLicitante: '',
    dataAberturaProposta: '',
    dataEntregaProposta: '',
    
    // Campos de importação direta
    ncm: '',
    valorFrete: 0,
    valorSeguro: 0,
    tempoEntrega: '',
    
    // Análise técnica
    analiseRealizada: false,
    aprovadoTecnicamente: null,
    observacoesTecnicas: '',
    
    // Status do processo
    faseConclusao: 'triagem',
    aprovacaoSolicitada: false,
    aprovacaoRecebida: false
  });

  const [concorrentes, setConcorrentes] = useState([
    {
      id: 1,
      nome: 'Abbott Point of Care',
      produto: 'i-STAT System',
      preco: 850000,
      vantagens: 'Portabilidade, Resultados rápidos',
      desvantagens: 'Custo por teste elevado',
      probabilidadeGanho: 30
    },
    {
      id: 2,
      nome: 'Roche Diagnostics',
      produto: 'cobas b 123',
      preco: 920000,
      vantagens: 'Marca reconhecida, Suporte técnico',
      desvantagens: 'Preço alto, Manutenção complexa',
      probabilidadeGanho: 25
    }
  ]);

  const [produtos, setProdutos] = useState([
    {
      id: 1,
      tipo: 'produto',
      nome: 'ABL800 Flex',
      quantidade: 3,
      valorUnitario: 250000,
      valorTotal: 750000
    }
  ]);

  const [servicos, setServicos] = useState([
    {
      id: 1,
      tipo: 'servico',
      nome: 'Instalação e Treinamento',
      quantidade: 1,
      valorUnitario: 32530,
      valorTotal: 32530
    }
  ]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Verificar se pode solicitar aprovação - LÓGICA RESTAURADA
  const canRequestApproval = () => {
    return formData.nome && 
           formData.cpfCnpj && 
           formData.valorNegocio > 0 && 
           formData.tipoOportunidade &&
           !formData.aprovacaoSolicitada;
  };

  const handleRequestApproval = () => {
    if (canRequestApproval()) {
      setShowApprovalModal(true);
    }
  };

  const handleApprovalSuccess = () => {
    setFormData(prev => ({
      ...prev,
      aprovacaoSolicitada: true,
      faseConclusao: 'participacao'
    }));
    setActiveTab('participacao');
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

  const renderTriagem = () => (
    <div className="space-y-6">
      {/* Informações Básicas da Oportunidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Informações da Oportunidade
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>Código da Oportunidade</Label>
            <Input value={formData.codigo} disabled className="bg-gray-50" />
          </div>
          <div>
            <Label>Cliente</Label>
            <Input value={formData.cliente} disabled className="bg-gray-50" />
          </div>
          <div>
            <Label>Responsável</Label>
            <Input value={formData.responsavel} disabled className="bg-gray-50" />
          </div>
          <div>
            <Label>Origem</Label>
            <Input value={formData.origem} disabled className="bg-gray-50" />
          </div>
          <div>
            <Label>Família Comercial</Label>
            <Input value={formData.familiaComercial} disabled className="bg-gray-50" />
          </div>
          <div>
            <Label>Status Atual</Label>
            <div className="flex items-center gap-2">
              <Badge className={`${getSituacaoColor(formData.situacao)} text-white`}>
                {formData.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dados do Prospect - CAMPOS RESTAURADOS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Dados do Prospect
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Nome completo do prospect"
            />
          </div>
          <div>
            <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
            <Input
              id="cpfCnpj"
              value={formData.cpfCnpj}
              onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
              placeholder="000.000.000-00 ou 00.000.000/0000-00"
            />
          </div>
          <div>
            <Label htmlFor="contato">Telefone</Label>
            <Input
              id="contato"
              value={formData.contato}
              onChange={(e) => handleInputChange('contato', e.target.value)}
              placeholder="(00) 00000-0000"
            />
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="contato@empresa.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Detalhes do Negócio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Detalhes do Negócio
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="valorNegocio">Valor do Negócio *</Label>
            <Input
              id="valorNegocio"
              type="number"
              value={formData.valorNegocio}
              onChange={(e) => handleInputChange('valorNegocio', Number(e.target.value))}
              placeholder="0,00"
            />
          </div>
          <div>
            <Label htmlFor="tipoOportunidade">Tipo de Oportunidade *</Label>
            <Select 
              value={formData.tipoOportunidade} 
              onValueChange={(value) => handleInputChange('tipoOportunidade', value)}
            >
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
            <Label htmlFor="tipoAplicacao">Tipo de Aplicação</Label>
            <Select 
              value={formData.tipoAplicacao} 
              onValueChange={(value) => handleInputChange('tipoAplicacao', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="venda">Venda</SelectItem>
                <SelectItem value="locacao">Locação</SelectItem>
                <SelectItem value="servico">Serviço</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campos específicos para Licitação */}
      {formData.tipoOportunidade === 'licitacao' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Informações da Licitação
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numeroLicitacao">Número da Licitação</Label>
              <Input
                id="numeroLicitacao"
                value={formData.numeroLicitacao}
                onChange={(e) => handleInputChange('numeroLicitacao', e.target.value)}
                placeholder="Ex: 001/2024"
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
          </CardContent>
        </Card>
      )}

      {/* Campos específicos para Importação Direta */}
      {formData.tipoOportunidade === 'importacao_direta' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Informações de Importação
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ncm">NCM</Label>
              <Input
                id="ncm"
                value={formData.ncm}
                onChange={(e) => handleInputChange('ncm', e.target.value)}
                placeholder="0000.00.00"
              />
            </div>
            <div>
              <Label htmlFor="valorFrete">Valor do Frete</Label>
              <Input
                id="valorFrete"
                type="number"
                value={formData.valorFrete}
                onChange={(e) => handleInputChange('valorFrete', Number(e.target.value))}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="valorSeguro">Valor do Seguro</Label>
              <Input
                id="valorSeguro"
                type="number"
                value={formData.valorSeguro}
                onChange={(e) => handleInputChange('valorSeguro', Number(e.target.value))}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="tempoEntrega">Tempo de Entrega</Label>
              <Input
                id="tempoEntrega"
                value={formData.tempoEntrega}
                onChange={(e) => handleInputChange('tempoEntrega', e.target.value)}
                placeholder="Ex: 30 dias"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ações da Triagem */}
      <Card>
        <CardHeader>
          <CardTitle>Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={handleRequestApproval}
              disabled={!canRequestApproval()}
              className="bg-biodina-gold hover:bg-biodina-gold/90"
            >
              <Lock className="h-4 w-4 mr-2" />
              Solicitar Aprovação para Participação
            </Button>
            {!canRequestApproval() && (
              <Alert className="flex-1">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Para solicitar aprovação, preencha: Nome, CPF/CNPJ, Valor do Negócio e Tipo de Oportunidade.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderParticipacao = () => (
    <div className="space-y-6">
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription className="text-green-800">
          Aprovação recebida! Agora você pode participar da oportunidade.
        </AlertDescription>
      </Alert>

      {/* Produtos e Serviços */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos e Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          <ProdutoServicoTable 
            produtos={produtos}
            servicos={servicos}
            onProdutosChange={setProdutos}
            onServicosChange={setServicos}
          />
        </CardContent>
      </Card>

      {/* Análise de Concorrentes */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Concorrentes</CardTitle>
        </CardHeader>
        <CardContent>
          <ConcorrenteTable 
            concorrentes={concorrentes}
            onConcorrentesChange={setConcorrentes}
          />
        </CardContent>
      </Card>

      {/* Observações */}
      <Card>
        <CardHeader>
          <CardTitle>Observações da Participação</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.descricao}
            onChange={(e) => handleInputChange('descricao', e.target.value)}
            placeholder="Adicione observações sobre a participação..."
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );

  const renderAnaliseTecnica = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Análise Técnica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Análise Realizada</Label>
              <Select 
                value={formData.analiseRealizada ? 'sim' : 'nao'} 
                onValueChange={(value) => handleInputChange('analiseRealizada', value === 'sim')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nao">Não</SelectItem>
                  <SelectItem value="sim">Sim</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.analiseRealizada && (
              <div>
                <Label>Aprovado Tecnicamente</Label>
                <Select 
                  value={formData.aprovadoTecnicamente === null ? '' : formData.aprovadoTecnicamente ? 'sim' : 'nao'} 
                  onValueChange={(value) => handleInputChange('aprovadoTecnicamente', value === 'sim')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div>
            <Label>Observações Técnicas</Label>
            <Textarea
              value={formData.observacoesTecnicas}
              onChange={(e) => handleInputChange('observacoesTecnicas', e.target.value)}
              placeholder="Adicione observações sobre a análise técnica..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHistoricoChat = () => (
    <div className="space-y-6">
      <ChatInterno oportunidadeId={formData.codigo} />
    </div>
  );

  const renderDocumentos = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Documentos da Oportunidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Arraste arquivos aqui ou clique para selecionar
            </p>
            <Button variant="outline">
              Selecionar Arquivos
            </Button>
          </div>
          
          {/* Lista de documentos existentes */}
          <div className="mt-6 space-y-2">
            <h4 className="font-semibold">Documentos Anexados</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>proposta_comercial.pdf</span>
                  <Badge variant="outline">PDF</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>especificacoes_tecnicas.docx</span>
                  <Badge variant="outline">DOCX</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/comercial')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-biodina-blue">
                Oportunidade Comercial - {formData.codigo}
              </h1>
              <p className="text-gray-600">{formData.cliente}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Status e Termômetro */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className={`${getSituacaoColor(formData.situacao)} text-white`}>
                  {formData.status}
                </Badge>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  <span className="font-medium">Termômetro: {formData.termometro}°</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-biodina-blue">
                  {formatCurrency(formData.valor)}
                </div>
                <div className="text-sm text-gray-600">Valor da Oportunidade</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="triagem">Triagem</TabsTrigger>
            <TabsTrigger value="participacao" disabled={formData.faseConclusao === 'triagem'}>
              Participação
            </TabsTrigger>
            <TabsTrigger value="analise-tecnica">Análise Técnica</TabsTrigger>
            <TabsTrigger value="historico-chat">Histórico/Chat</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="triagem" className="space-y-6">
            {renderTriagem()}
          </TabsContent>

          <TabsContent value="participacao" className="space-y-6">
            {renderParticipacao()}
          </TabsContent>

          <TabsContent value="analise-tecnica" className="space-y-6">
            {renderAnaliseTecnica()}
          </TabsContent>

          <TabsContent value="historico-chat" className="space-y-6">
            {renderHistoricoChat()}
          </TabsContent>

          <TabsContent value="documentos" className="space-y-6">
            {renderDocumentos()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Aprovação */}
      <ApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onApprove={handleApprovalSuccess}
        oportunidadeId={formData.codigo}
      />
    </SidebarLayout>
  );
};

export default OportunidadeComercial;
