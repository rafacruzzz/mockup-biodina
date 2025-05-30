
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
import { Checkbox } from "@/components/ui/checkbox";
import SidebarLayout from "@/components/SidebarLayout";
import ChatInterno from "@/components/comercial/ChatInterno";
import ConcorrenteTable from "@/components/comercial/ConcorrenteTable";
import ProdutoServicoTable from "@/components/comercial/ProdutoServicoTable";
import ApprovalModal from "@/components/comercial/ApprovalModal";
import { 
  ArrowLeft, Save, FileText, Users, MessageSquare, Upload, 
  Calendar, MapPin, Phone, Mail, Building, User, DollarSign,
  AlertTriangle, CheckCircle, Clock, Target, Thermometer,
  Lock, Eye, Plus, Edit, Trash2, ChevronRight
} from "lucide-react";

// Tipo Item para produtos e serviços
interface Item {
  id: string;
  tipo: 'produto' | 'servico';
  codigo: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

// Tipos para o fluxo
type FaseMaster = 'triagem' | 'participacao';
type FerramentaTab = 'dados-gerais' | 'analise-tecnica' | 'historico-chat' | 'pedidos' | 'documentos';
type StatusTriagem = 'em_triagem' | 'aprovada_participacao' | 'perdida_triagem';
type StatusParticipacao = 'em_acompanhamento' | 'ganha' | 'perdida_participacao';

const OportunidadeComercial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estados principais
  const [faseMasterAtiva, setFaseMasterAtiva] = useState<FaseMaster>('triagem');
  const [ferramentaAtiva, setFerramentaAtiva] = useState<FerramentaTab>('dados-gerais');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  
  // Estado dos dados da oportunidade
  const [formData, setFormData] = useState({
    // Dados básicos
    codigo: '10678',
    cliente: 'Associação das Pioneiras Sociais',
    
    // Status e controle de fluxo
    statusTriagem: 'em_triagem' as StatusTriagem,
    statusParticipacao: null as StatusParticipacao | null,
    aprovacaoRecebida: false,
    triagemBloqueada: false,
    
    // Dados Gerais - Triagem
    tipoOportunidade: 'licitacao' as 'licitacao' | 'importacao_direta',
    
    // Dados do Cliente
    cpfCnpj: '12.345.678/0001-90',
    nomeFantasia: 'Associação das Pioneiras Sociais',
    razaoSocial: 'Associação das Pioneiras Sociais',
    endereco: 'Rua das Flores, 123',
    uf: 'RJ',
    email: 'contato@pioneiras.org.br',
    telefone: '(21) 3319-1111',
    website: 'www.pioneiras.org.br',
    ativo: true,
    
    // Dados da Oportunidade
    fonteLead: 'Site',
    valorNegocio: 782530,
    metodoContato: 'Email',
    segmentoLead: 'Hospitalar',
    colaboradorResponsavel: 'Faber Oliveira',
    dataInicio: '2024-03-20',
    dataLimite: '2024-05-20',
    procurandoPor: '',
    
    // Organização
    tags: 'Radiometer, Hospitalar, RJ',
    caracteristicas: 'DOS 3 EQUIPAMENTOS ADQUIRIDOS POR (ID) O DE Nº SERIE 754R2826N025 IRA SER INSTALADO NO SARAH-DF.',
    fluxoTrabalho: '',
    descricao: 'Oportunidade para fornecimento de equipamentos médicos hospitalares.',
    
    // Campos condicionais - Licitação
    dataLicitacao: '2024-04-15',
    resumoEdital: 'Edital para aquisição de equipamentos de gasometria',
    impugnacaoEdital: '',
    analiseEstrategia: '',
    naturezaOperacao: 'venda_equipamento',
    numeroPregao: 'PE 001/2024',
    numeroProcesso: 'PROC-2024-001',
    numeroUasg: '154321',
    qualSite: 'ComprasNet',
    permiteAdesao: true,
    obsAdesao: 'Permite adesão conforme art. 15',
    valorEstimado: 800000,
    qtdEquipamentos: 3,
    qtdExames: 10000,
    haviaContratoAnterior: true,
    marcaModeloAnterior: 'ABL700 - Radiometer',
    propostaNegociacao: false,
    termometro: 85,
    
    // Análise Técnica
    analiseTecnicaCientifica: '',
    
    // Participação - Dados Gerais Adicionais
    numeroProjetoPart: '',
    numeroPedidoPart: '',
    numeroContratoPart: '',
    publicoPrivado: 'publico',
    naturezaOperacaoPart: '',
    detalharNatureza: '',
    situacaoVenda: '',
    previsaoFechamento: '',
    nfConsumoFinal: false,
    localEstoque: '',
    
    // Dados Financeiros
    emailNf: '',
    formaPgto: '',
    dadosBancarios: '',
    parcelas: '',
    prazoPgto: '',
    docsNf: '',
    destacarIr: false,
    saldoEmpenho: 0,
    saldoAta: 0,
    
    // Informações de Frete
    fretePagoPor: '',
    freteRetiradoPor: '',
    prazoEntrega: '',
    cuidadosQuem: '',
    dadosRecebedor: '',
    horariosEntrega: '',
    locaisEntrega: '',
    infoAdicionalEntrega: '',
    
    // Outros
    urgente: false,
    justificativaUrgencia: '',
    autorizadoPor: '',
    dataAutorizacao: '',
    
    // Campos Licitação - Participação
    situacaoPregao: '',
    manifestacaoRecurso: '',
    statusLicitacao: '',
    motivosFracasso: '',
    dataAssinaturaAta: '',
    observacaoGeral: ''
  });

  const [produtos, setProdutos] = useState<Item[]>([
    {
      id: '1',
      tipo: 'produto',
      codigo: 'ABL800',
      descricao: 'ABL800 Flex',
      quantidade: 3,
      valorUnitario: 250000,
      valorTotal: 750000
    }
  ]);

  const [servicos, setServicos] = useState<Item[]>([
    {
      id: '2',
      tipo: 'servico',
      codigo: 'INST001',
      descricao: 'Instalação e Treinamento',
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

  // Verificar se pode solicitar aprovação
  const canRequestApproval = () => {
    return formData.statusTriagem === 'em_triagem' && 
           formData.cpfCnpj && 
           formData.nomeFantasia && 
           formData.valorNegocio > 0;
  };

  const handleRequestApproval = () => {
    if (canRequestApproval()) {
      setShowApprovalModal(true);
    }
  };

  const handleApprovalSuccess = () => {
    setFormData(prev => ({
      ...prev,
      statusTriagem: 'aprovada_participacao',
      statusParticipacao: 'em_acompanhamento',
      aprovacaoRecebida: true,
      triagemBloqueada: true
    }));
    setFaseMasterAtiva('participacao');
  };

  // Controle de acesso às abas
  const isFaseAccessible = (fase: FaseMaster) => {
    if (fase === 'triagem') return true;
    if (fase === 'participacao') return formData.aprovacaoRecebida;
    return false;
  };

  const isFerramentaAccessible = (ferramenta: FerramentaTab) => {
    if (ferramenta === 'pedidos') {
      return formData.statusParticipacao === 'ganha';
    }
    return true;
  };

  const getSituacaoColor = (status: string) => {
    switch (status) {
      case 'ganha': return 'bg-green-500';
      case 'em_triagem': return 'bg-blue-500';
      case 'em_acompanhamento': return 'bg-orange-500';
      case 'perdida_triagem': 
      case 'perdida_participacao': return 'bg-red-500';
      case 'aprovada_participacao': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusDisplay = () => {
    if (formData.statusParticipacao) {
      switch (formData.statusParticipacao) {
        case 'em_acompanhamento': return 'Em Acompanhamento';
        case 'ganha': return 'Ganha';
        case 'perdida_participacao': return 'Perdida na Participação';
      }
    }
    switch (formData.statusTriagem) {
      case 'em_triagem': return 'Em Triagem';
      case 'aprovada_participacao': return 'Aprovada para Participação';
      case 'perdida_triagem': return 'Perdida na Triagem';
      default: return 'Em Triagem';
    }
  };

  // Renderização das abas de ferramentas
  const renderDadosGerais = () => {
    const isReadOnly = formData.triagemBloqueada && faseMasterAtiva === 'triagem';
    
    return (
      <div className="space-y-6">
        {/* Tipo de Oportunidade - Controla campos condicionais */}
        <Card>
          <CardHeader>
            <CardTitle>Tipo de Oportunidade</CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              value={formData.tipoOportunidade} 
              onValueChange={(value) => handleInputChange('tipoOportunidade', value)}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="licitacao">Licitação</SelectItem>
                <SelectItem value="importacao_direta">Importação Direta</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

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
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="nomeFantasia">Nome/Nome Fantasia *</Label>
              <Input
                id="nomeFantasia"
                value={formData.nomeFantasia}
                onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="razaoSocial">Razão Social</Label>
              <Input
                id="razaoSocial"
                value={formData.razaoSocial}
                onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="uf">UF</Label>
              <Select 
                value={formData.uf} 
                onValueChange={(value) => handleInputChange('uf', value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RJ">RJ</SelectItem>
                  <SelectItem value="SP">SP</SelectItem>
                  <SelectItem value="MG">MG</SelectItem>
                  {/* Adicionar outros estados conforme necessário */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ativo"
                checked={formData.ativo}
                onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                disabled={isReadOnly}
              />
              <Label htmlFor="ativo">Ativo</Label>
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
              <Label htmlFor="fonteLead">Fonte do Lead</Label>
              <Select 
                value={formData.fonteLead} 
                onValueChange={(value) => handleInputChange('fonteLead', value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Site">Site</SelectItem>
                  <SelectItem value="Indicação">Indicação</SelectItem>
                  <SelectItem value="Cold Call">Cold Call</SelectItem>
                  <SelectItem value="Licitação">Licitação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="valorNegocio">Valor do Negócio *</Label>
              <Input
                id="valorNegocio"
                type="number"
                value={formData.valorNegocio}
                onChange={(e) => handleInputChange('valorNegocio', Number(e.target.value))}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="metodoContato">Método de Contato</Label>
              <Select 
                value={formData.metodoContato} 
                onValueChange={(value) => handleInputChange('metodoContato', value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Telefone">Telefone</SelectItem>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="segmentoLead">Segmento do Lead</Label>
              <Select 
                value={formData.segmentoLead} 
                onValueChange={(value) => handleInputChange('segmentoLead', value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hospitalar">Hospitalar</SelectItem>
                  <SelectItem value="Universitário">Universitário</SelectItem>
                  <SelectItem value="Público">Público</SelectItem>
                  <SelectItem value="Municipal">Municipal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="colaboradorResponsavel">Colaborador Responsável</Label>
              <Input
                id="colaboradorResponsavel"
                value={formData.colaboradorResponsavel}
                onChange={(e) => handleInputChange('colaboradorResponsavel', e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="dataInicio">Data de Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={formData.dataInicio}
                onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="dataLimite">Data Limite</Label>
              <Input
                id="dataLimite"
                type="date"
                value={formData.dataLimite}
                onChange={(e) => handleInputChange('dataLimite', e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="procurandoPor">Procurando Por (Contatos)</Label>
              <Input
                id="procurandoPor"
                value={formData.procurandoPor}
                onChange={(e) => handleInputChange('procurandoPor', e.target.value)}
                placeholder="Contatos vinculados"
                disabled={isReadOnly}
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
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="Separe as tags por vírgula"
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="caracteristicas">Características</Label>
              <Textarea
                id="caracteristicas"
                value={formData.caracteristicas}
                onChange={(e) => handleInputChange('caracteristicas', e.target.value)}
                rows={3}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="fluxoTrabalho">Fluxo de Trabalho</Label>
              <Textarea
                id="fluxoTrabalho"
                value={formData.fluxoTrabalho}
                onChange={(e) => handleInputChange('fluxoTrabalho', e.target.value)}
                rows={3}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="statusTriagem">Status</Label>
              <Select 
                value={formData.statusTriagem} 
                onValueChange={(value) => handleInputChange('statusTriagem', value)}
                disabled={isReadOnly || faseMasterAtiva === 'participacao'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="em_triagem">Em Triagem</SelectItem>
                  <SelectItem value="aprovada_participacao">Aprovada para Participação</SelectItem>
                  <SelectItem value="perdida_triagem">Perdida na Triagem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                rows={3}
                disabled={isReadOnly}
              />
            </div>
          </CardContent>
        </Card>

        {/* Campos Condicionais - Licitação */}
        {formData.tipoOportunidade === 'licitacao' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Informações de Licitação
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dataLicitacao">Data da Licitação</Label>
                <Input
                  id="dataLicitacao"
                  type="date"
                  value={formData.dataLicitacao}
                  onChange={(e) => handleInputChange('dataLicitacao', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="resumoEdital">Resumo do Edital</Label>
                <Textarea
                  id="resumoEdital"
                  value={formData.resumoEdital}
                  onChange={(e) => handleInputChange('resumoEdital', e.target.value)}
                  rows={2}
                  disabled={isReadOnly}
                />
              </div>
              <div className="col-span-3">
                <Label htmlFor="impugnacaoEdital">Impugnação do Edital</Label>
                <Textarea
                  id="impugnacaoEdital"
                  value={formData.impugnacaoEdital}
                  onChange={(e) => handleInputChange('impugnacaoEdital', e.target.value)}
                  rows={2}
                  disabled={isReadOnly}
                />
              </div>
              <div className="col-span-3">
                <Label htmlFor="analiseEstrategia">Análise de Estratégia</Label>
                <Textarea
                  id="analiseEstrategia"
                  value={formData.analiseEstrategia}
                  onChange={(e) => handleInputChange('analiseEstrategia', e.target.value)}
                  rows={2}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label htmlFor="naturezaOperacao">Natureza da Operação</Label>
                <Select 
                  value={formData.naturezaOperacao} 
                  onValueChange={(value) => handleInputChange('naturezaOperacao', value)}
                  disabled={isReadOnly}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venda_equipamento">Venda de Equipamento</SelectItem>
                    <SelectItem value="locacao">Locação</SelectItem>
                    <SelectItem value="servico">Serviço</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numeroPregao">Nº Pregão/Inex/Ata/SRP</Label>
                <Input
                  id="numeroPregao"
                  value={formData.numeroPregao}
                  onChange={(e) => handleInputChange('numeroPregao', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label htmlFor="numeroProcesso">Nº Processo</Label>
                <Input
                  id="numeroProcesso"
                  value={formData.numeroProcesso}
                  onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label htmlFor="numeroUasg">Nº UASG</Label>
                <Input
                  id="numeroUasg"
                  value={formData.numeroUasg}
                  onChange={(e) => handleInputChange('numeroUasg', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label htmlFor="qualSite">Qual Site?</Label>
                <Input
                  id="qualSite"
                  value={formData.qualSite}
                  onChange={(e) => handleInputChange('qualSite', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="permiteAdesao"
                  checked={formData.permiteAdesao}
                  onCheckedChange={(checked) => handleInputChange('permiteAdesao', checked)}
                  disabled={isReadOnly}
                />
                <Label htmlFor="permiteAdesao">Permite Adesão?</Label>
              </div>
              {formData.permiteAdesao && (
                <div className="col-span-2">
                  <Label htmlFor="obsAdesao">Observações sobre Adesão</Label>
                  <Input
                    id="obsAdesao"
                    value={formData.obsAdesao}
                    onChange={(e) => handleInputChange('obsAdesao', e.target.value)}
                    disabled={isReadOnly}
                  />
                </div>
              )}
              <div>
                <Label htmlFor="valorEstimado">Valor Estimado</Label>
                <Input
                  id="valorEstimado"
                  type="number"
                  value={formData.valorEstimado}
                  onChange={(e) => handleInputChange('valorEstimado', Number(e.target.value))}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label htmlFor="qtdEquipamentos">Qtd Equipamentos</Label>
                <Input
                  id="qtdEquipamentos"
                  type="number"
                  value={formData.qtdEquipamentos}
                  onChange={(e) => handleInputChange('qtdEquipamentos', Number(e.target.value))}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label htmlFor="qtdExames">Qtd Exames</Label>
                <Input
                  id="qtdExames"
                  type="number"
                  value={formData.qtdExames}
                  onChange={(e) => handleInputChange('qtdExames', Number(e.target.value))}
                  disabled={isReadOnly}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="haviaContratoAnterior"
                  checked={formData.haviaContratoAnterior}
                  onCheckedChange={(checked) => handleInputChange('haviaContratoAnterior', checked)}
                  disabled={isReadOnly}
                />
                <Label htmlFor="haviaContratoAnterior">Havia Contrato Anterior?</Label>
              </div>
              {formData.haviaContratoAnterior && (
                <div className="col-span-2">
                  <Label htmlFor="marcaModeloAnterior">Marca/Modelo Anterior</Label>
                  <Input
                    id="marcaModeloAnterior"
                    value={formData.marcaModeloAnterior}
                    onChange={(e) => handleInputChange('marcaModeloAnterior', e.target.value)}
                    disabled={isReadOnly}
                  />
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="propostaNegociacao"
                  checked={formData.propostaNegociacao}
                  onCheckedChange={(checked) => handleInputChange('propostaNegociacao', checked)}
                  disabled={isReadOnly}
                />
                <Label htmlFor="propostaNegociacao">Proposta em Negociação</Label>
              </div>
              <div>
                <Label htmlFor="termometro">Termômetro (%)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="termometro"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.termometro}
                    onChange={(e) => handleInputChange('termometro', Number(e.target.value))}
                    disabled={isReadOnly}
                  />
                  <Thermometer className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Seção de Participação - Campos Adicionais */}
        {faseMasterAtiva === 'participacao' && (
          <>
            {/* Status e Estratégia */}
            <Card>
              <CardHeader>
                <CardTitle>Status e Estratégia da Participação</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="statusParticipacao">Status da Participação</Label>
                  <Select 
                    value={formData.statusParticipacao || ''} 
                    onValueChange={(value) => handleInputChange('statusParticipacao', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                      <SelectItem value="ganha">Ganha</SelectItem>
                      <SelectItem value="perdida_participacao">Perdida na Participação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="termometroParticipacao">Termômetro de Chances (%)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="termometroParticipacao"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.termometro}
                      onChange={(e) => handleInputChange('termometro', Number(e.target.value))}
                    />
                    <Thermometer className="h-4 w-4" />
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="estrategiaParticipacao">Estratégia de Participação</Label>
                  <Textarea
                    id="estrategiaParticipacao"
                    placeholder="Descreva a estratégia para esta participação..."
                    rows={3}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="planejamentoComercial">Planejamento Comercial</Label>
                  <Textarea
                    id="planejamentoComercial"
                    placeholder="Detalhe o planejamento comercial..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Identificadores e Detalhes Contratuais */}
            <Card>
              <CardHeader>
                <CardTitle>Identificadores e Detalhes Contratuais</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="numeroProjetoPart">Número do Projeto</Label>
                  <Input
                    id="numeroProjetoPart"
                    value={formData.numeroProjetoPart}
                    onChange={(e) => handleInputChange('numeroProjetoPart', e.target.value)}
                    placeholder="Automático"
                  />
                </div>
                <div>
                  <Label htmlFor="numeroPedidoPart">Número do Pedido</Label>
                  <Input
                    id="numeroPedidoPart"
                    value={formData.numeroPedidoPart}
                    onChange={(e) => handleInputChange('numeroPedidoPart', e.target.value)}
                    placeholder="Automático"
                  />
                </div>
                <div>
                  <Label htmlFor="numeroContratoPart">Número do Contrato</Label>
                  <Input
                    id="numeroContratoPart"
                    value={formData.numeroContratoPart}
                    onChange={(e) => handleInputChange('numeroContratoPart', e.target.value)}
                    placeholder="Automático"
                  />
                </div>
                <div>
                  <Label htmlFor="publicoPrivado">Público ou Privado</Label>
                  <Select 
                    value={formData.publicoPrivado} 
                    onValueChange={(value) => handleInputChange('publicoPrivado', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="publico">Público</SelectItem>
                      <SelectItem value="privado">Privado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="naturezaOperacaoPart">Natureza da Operação</Label>
                  <Select 
                    value={formData.naturezaOperacaoPart} 
                    onValueChange={(value) => handleInputChange('naturezaOperacaoPart', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venda_equipamento">Venda de Equipamento</SelectItem>
                      <SelectItem value="locacao">Locação</SelectItem>
                      <SelectItem value="servico">Serviço</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="situacaoVenda">Situação (Venda)</Label>
                  <Input
                    id="situacaoVenda"
                    value={formData.situacaoVenda}
                    onChange={(e) => handleInputChange('situacaoVenda', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="previsaoFechamento">Previsão de Fechamento</Label>
                  <Input
                    id="previsaoFechamento"
                    type="date"
                    value={formData.previsaoFechamento}
                    onChange={(e) => handleInputChange('previsaoFechamento', e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nfConsumoFinal"
                    checked={formData.nfConsumoFinal}
                    onCheckedChange={(checked) => handleInputChange('nfConsumoFinal', checked)}
                  />
                  <Label htmlFor="nfConsumoFinal">NF para Consumo Final</Label>
                </div>
                <div>
                  <Label htmlFor="localEstoque">Local de Estoque</Label>
                  <Input
                    id="localEstoque"
                    value={formData.localEstoque}
                    onChange={(e) => handleInputChange('localEstoque', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Botão de Aprovação - Apenas na Triagem */}
        {faseMasterAtiva === 'triagem' && !formData.aprovacaoRecebida && (
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
                      Para solicitar aprovação, preencha: CPF/CNPJ, Nome/Nome Fantasia e Valor do Negócio.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderAnaliseTecnica = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Análise Técnica-Científica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.analiseTecnicaCientifica}
            onChange={(e) => handleInputChange('analiseTecnicaCientifica', e.target.value)}
            placeholder="Descreva a análise técnica-científica da oportunidade..."
            rows={6}
            disabled={formData.triagemBloqueada && faseMasterAtiva === 'triagem'}
          />
        </CardContent>
      </Card>

      {/* Análise de Concorrentes */}
      <ConcorrenteTable />
    </div>
  );

  const renderHistoricoChat = () => (
    <div className="space-y-6">
      <ChatInterno oportunidadeId={formData.codigo} />
    </div>
  );

  const renderPedidos = () => (
    <div className="space-y-6">
      {formData.statusParticipacao !== 'ganha' ? (
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Os pedidos ficam disponíveis apenas quando a oportunidade tem status "Ganha".
          </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Gestão de Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
              <Plus className="h-4 w-4 mr-2" />
              Criar Novo Pedido
            </Button>
            {/* Aqui viria a tabela de pedidos */}
          </CardContent>
        </Card>
      )}
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
              <p className="text-gray-600">{formData.nomeFantasia}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Status e Valor */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className={`${getSituacaoColor(getStatusDisplay())} text-white`}>
                  {getStatusDisplay()}
                </Badge>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  <span className="font-medium">Termômetro: {formData.termometro}%</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-biodina-blue">
                  {formatCurrency(formData.valorNegocio)}
                </div>
                <div className="text-sm text-gray-600">Valor da Oportunidade</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Abas Masters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border">
            <Button
              variant={faseMasterAtiva === 'triagem' ? 'default' : 'outline'}
              onClick={() => setFaseMasterAtiva('triagem')}
              disabled={!isFaseAccessible('triagem')}
              className="text-lg font-semibold px-8 py-3"
            >
              TRIAGEM
            </Button>
            
            {formData.aprovacaoRecebida && (
              <ChevronRight className="h-6 w-6 text-biodina-gold" />
            )}
            
            <Button
              variant={faseMasterAtiva === 'participacao' ? 'default' : 'outline'}
              onClick={() => setFaseMasterAtiva('participacao')}
              disabled={!isFaseAccessible('participacao')}
              className="text-lg font-semibold px-8 py-3"
            >
              PARTICIPAÇÃO
            </Button>
          </div>

          {/* Indicador de Aprovação */}
          {formData.aprovacaoRecebida && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800">
                Aprovação recebida! Fase de participação habilitada.
              </AlertDescription>
            </Alert>
          )}

          {/* Abas de Ferramentas */}
          <Tabs value={ferramentaAtiva} onValueChange={setFerramentaAtiva} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger 
                value="dados-gerais"
                disabled={!isFerramentaAccessible('dados-gerais')}
              >
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger 
                value="analise-tecnica"
                disabled={!isFerramentaAccessible('analise-tecnica')}
              >
                Análise Técnica
              </TabsTrigger>
              <TabsTrigger 
                value="historico-chat"
                disabled={!isFerramentaAccessible('historico-chat')}
              >
                Histórico/Chat
              </TabsTrigger>
              <TabsTrigger 
                value="pedidos"
                disabled={!isFerramentaAccessible('pedidos')}
                className="relative"
              >
                {!isFerramentaAccessible('pedidos') && (
                  <Lock className="h-3 w-3 mr-1" />
                )}
                Pedidos
              </TabsTrigger>
              <TabsTrigger 
                value="documentos"
                disabled={!isFerramentaAccessible('documentos')}
              >
                Documentos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais">
              {renderDadosGerais()}
            </TabsContent>

            <TabsContent value="analise-tecnica">
              {renderAnaliseTecnica()}
            </TabsContent>

            <TabsContent value="historico-chat">
              {renderHistoricoChat()}
            </TabsContent>

            <TabsContent value="pedidos">
              {renderPedidos()}
            </TabsContent>

            <TabsContent value="documentos">
              {renderDocumentos()}
            </TabsContent>
          </Tabs>
        </div>
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
