import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, FileText, Save, Plus, Trash2, Building, User, MapPin, Clock, DollarSign, Shield, Search, Target, FileCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { cn, formatCurrency, getTermometroColor, getTermometroStage, getRankingColor, getUnidadeColor } from '@/lib/utils';
import { licitantes } from '@/data/licitacaoMockData';

interface FormData {
  empresa: string;
  cnpj: string;
  telefone: string;
  email: string;
  enderecoCompleto: string;
  contato: string;
  produto: string;
  quantidade: number;
  valor: number;
  valorTotal: number;
  prazoEntrega: string;
  formaPagamento: string;
  garantia: string;
  validadeProposta: Date | undefined;
  dataVencimento: Date | undefined;
  observacoes: string;
  analiseTecnica: string;
  parecer: string;
  aprovado: boolean;
  motivo: string;
  responsavel: string;
  dataAprovacao: Date | undefined;
  numeroProcesso: string;
  orgaoComprador: string;
  modalidadeLicitacao: string;
  objetoLicitacao: string;
  dataAbertura: Date | undefined;
  dataLimiteEntrega: Date | undefined;
  dataPublicacao: Date | undefined;
  valorEstimado: number;
  situacaoLicitacao: string;
  classificacao: number;
  participantes: number;
  linkEdital: string;
  numeroEdital: string;
  numeroUasg: string;
  srp: boolean;
  tipo: string;
  natureza: string;
  regime: string;
  criterio: string;
  localizacao: string;
  setor: string;
  categoria: string;
  subcategoria: string;
  tags: string[];
  prioridade: string;
  probabilidade: number;
  estagio: string;
  temperatura: number;
  proximaAcao: string;
  dataProximaAcao: Date | undefined;
  historico: Array<{
    data: Date;
    acao: string;
    usuario: string;
    observacao: string;
  }>;
  anexos: Array<{
    nome: string;
    tipo: string;
    tamanho: string;
    dataUpload: Date;
  }>;
}

const OportunidadeAvancadaForm = () => {
  const [formData, setFormData] = useState<FormData>({
    empresa: '',
    cnpj: '',
    telefone: '',
    email: '',
    enderecoCompleto: '',
    contato: '',
    produto: '',
    quantidade: 1,
    valor: 0,
    valorTotal: 0,
    prazoEntrega: '',
    formaPagamento: '',
    garantia: '',
    validadeProposta: undefined,
    dataVencimento: undefined,
    observacoes: '',
    analiseTecnica: '',
    parecer: '',
    aprovado: false,
    motivo: '',
    responsavel: '',
    dataAprovacao: undefined,
    numeroProcesso: '',
    orgaoComprador: '',
    modalidadeLicitacao: '',
    objetoLicitacao: '',
    dataAbertura: undefined,
    dataLimiteEntrega: undefined,
    dataPublicacao: undefined,
    valorEstimado: 0,
    situacaoLicitacao: '',
    classificacao: 0,
    participantes: 0,
    linkEdital: '',
    numeroEdital: '',
    numeroUasg: '',
    srp: false,
    tipo: '',
    natureza: '',
    regime: '',
    criterio: '',
    localizacao: '',
    setor: '',
    categoria: '',
    subcategoria: '',
    tags: [],
    prioridade: '',
    probabilidade: 50,
    estagio: '',
    temperatura: 50,
    proximaAcao: '',
    dataProximaAcao: undefined,
    historico: [],
    anexos: []
  });

  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [novaTag, setNovaTag] = useState('');
  const [novoHistorico, setNovoHistorico] = useState({
    acao: '',
    observacao: ''
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (field: keyof FormData, date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const adicionarTag = () => {
    if (novaTag.trim() && !formData.tags.includes(novaTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, novaTag.trim()]
      }));
      setNovaTag('');
    }
  };

  const removerTag = (tagParaRemover: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagParaRemover)
    }));
  };

  const adicionarHistorico = () => {
    if (novoHistorico.acao.trim()) {
      const novoItem = {
        data: new Date(),
        acao: novoHistorico.acao,
        usuario: 'Usuário Atual',
        observacao: novoHistorico.observacao
      };
      
      setFormData(prev => ({
        ...prev,
        historico: [novoItem, ...prev.historico]
      }));
      
      setNovoHistorico({ acao: '', observacao: '' });
    }
  };

  const calcularTermometro = (temp: number) => {
    const stage = getTermometroStage(temp);
    const color = getTermometroColor(stage);
    return { stage, color };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da oportunidade avançada:', formData);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Oportunidade Avançada</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os aspectos da sua oportunidade comercial</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Relatório
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dados-gerais" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
          <TabsTrigger value="cliente">Cliente</TabsTrigger>
          <TabsTrigger value="produto">Produto</TabsTrigger>
          <TabsTrigger value="comercial">Comercial</TabsTrigger>
          <TabsTrigger value="licitacao">Licitação</TabsTrigger>
          <TabsTrigger value="analise-tecnica">Análise Técnica</TabsTrigger>
          <TabsTrigger value="gestao">Gestão</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="dados-gerais" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="numeroProcesso">Número do Processo</Label>
                  <Input
                    id="numeroProcesso"
                    value={formData.numeroProcesso}
                    onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                    placeholder="Ex: 2024/001"
                  />
                </div>
                <div>
                  <Label htmlFor="orgaoComprador">Órgão Comprador</Label>
                  <Input
                    id="orgaoComprador"
                    value={formData.orgaoComprador}
                    onChange={(e) => handleInputChange('orgaoComprador', e.target.value)}
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
                      <SelectItem value="pregao">Pregão</SelectItem>
                      <SelectItem value="concorrencia">Concorrência</SelectItem>
                      <SelectItem value="tomada-precos">Tomada de Preços</SelectItem>
                      <SelectItem value="convite">Convite</SelectItem>
                      <SelectItem value="concurso">Concurso</SelectItem>
                      <SelectItem value="leilao">Leilão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="objetoLicitacao">Objeto da Licitação</Label>
                <Textarea
                  id="objetoLicitacao"
                  value={formData.objetoLicitacao}
                  onChange={(e) => handleInputChange('objetoLicitacao', e.target.value)}
                  placeholder="Descreva o objeto da licitação..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Data de Abertura</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dataAbertura && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dataAbertura ? format(formData.dataAbertura, "dd/MM/yyyy") : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dataAbertura}
                        onSelect={(date) => handleDateChange('dataAbertura', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Data Limite de Entrega</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dataLimiteEntrega && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dataLimiteEntrega ? format(formData.dataLimiteEntrega, "dd/MM/yyyy") : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dataLimiteEntrega}
                        onSelect={(date) => handleDateChange('dataLimiteEntrega', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Data de Publicação</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dataPublicacao && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dataPublicacao ? format(formData.dataPublicacao, "dd/MM/yyyy") : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dataPublicacao}
                        onSelect={(date) => handleDateChange('dataPublicacao', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="valorEstimado">Valor Estimado</Label>
                  <Input
                    id="valorEstimado"
                    type="number"
                    value={formData.valorEstimado}
                    onChange={(e) => handleInputChange('valorEstimado', Number(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="situacaoLicitacao">Situação</Label>
                  <Select value={formData.situacaoLicitacao} onValueChange={(value) => handleInputChange('situacaoLicitacao', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a situação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aguardando_inicio">Aguardando Início</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="concluida">Concluída</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                      <SelectItem value="suspensa">Suspensa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="classificacao">Classificação</Label>
                  <Input
                    id="classificacao"
                    type="number"
                    value={formData.classificacao}
                    onChange={(e) => handleInputChange('classificacao', Number(e.target.value))}
                    placeholder="1"
                  />
                </div>
                <div>
                  <Label htmlFor="participantes">Participantes</Label>
                  <Input
                    id="participantes"
                    type="number"
                    value={formData.participantes}
                    onChange={(e) => handleInputChange('participantes', Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkEdital">Link do Edital</Label>
                  <Input
                    id="linkEdital"
                    value={formData.linkEdital}
                    onChange={(e) => handleInputChange('linkEdital', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="numeroEdital">Número do Edital</Label>
                  <Input
                    id="numeroEdital"
                    value={formData.numeroEdital}
                    onChange={(e) => handleInputChange('numeroEdital', e.target.value)}
                    placeholder="Ex: 001/2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroUasg">Número UASG</Label>
                  <Input
                    id="numeroUasg"
                    value={formData.numeroUasg}
                    onChange={(e) => handleInputChange('numeroUasg', e.target.value)}
                    placeholder="123456"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="srp"
                    checked={formData.srp}
                    onCheckedChange={(checked) => handleInputChange('srp', checked)}
                  />
                  <Label htmlFor="srp">Sistema de Registro de Preços (SRP)</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="analiseTecnica">Análise Técnica</Label>
                <Textarea
                  id="analiseTecnica"
                  value={formData.analiseTecnica}
                  readOnly={true}
                  placeholder="Este campo reflete automaticamente o conteúdo da Análise Técnica-Científica..."
                  rows={4}
                  className="bg-gray-50 text-gray-700"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Campo somente leitura - Para editar, use a aba "Análise Técnica"
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cliente" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    value={formData.empresa}
                    onChange={(e) => handleInputChange('empresa', e.target.value)}
                    placeholder="Nome da empresa"
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
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
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="enderecoCompleto">Endereço Completo</Label>
                <Textarea
                  id="enderecoCompleto"
                  value={formData.enderecoCompleto}
                  onChange={(e) => handleInputChange('enderecoCompleto', e.target.value)}
                  placeholder="Rua, número, bairro, cidade, estado, CEP"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="contato">Pessoa de Contato</Label>
                <Input
                  id="contato"
                  value={formData.contato}
                  onChange={(e) => handleInputChange('contato', e.target.value)}
                  placeholder="Nome do responsável"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="produto" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Detalhes do Produto/Serviço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="produto">Produto/Serviço</Label>
                <Input
                  id="produto"
                  value={formData.produto}
                  onChange={(e) => handleInputChange('produto', e.target.value)}
                  placeholder="Descrição do produto ou serviço"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    value={formData.quantidade}
                    onChange={(e) => handleInputChange('quantidade', Number(e.target.value))}
                    placeholder="1"
                  />
                </div>
                <div>
                  <Label htmlFor="valor">Valor Unitário</Label>
                  <Input
                    id="valor"
                    type="number"
                    value={formData.valor}
                    onChange={(e) => handleInputChange('valor', Number(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="valorTotal">Valor Total</Label>
                  <Input
                    id="valorTotal"
                    type="number"
                    value={formData.valorTotal}
                    onChange={(e) => handleInputChange('valorTotal', Number(e.target.value))}
                    placeholder="0.00"
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
                    placeholder="Ex: 30 dias"
                  />
                </div>
                <div>
                  <Label htmlFor="garantia">Garantia</Label>
                  <Input
                    id="garantia"
                    value={formData.garantia}
                    onChange={(e) => handleInputChange('garantia', e.target.value)}
                    placeholder="Ex: 12 meses"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comercial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Informações Comerciais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                  <Input
                    id="formaPagamento"
                    value={formData.formaPagamento}
                    onChange={(e) => handleInputChange('formaPagamento', e.target.value)}
                    placeholder="Ex: À vista, parcelado"
                  />
                </div>
                <div>
                  <Label>Validade da Proposta</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.validadeProposta && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.validadeProposta ? format(formData.validadeProposta, "dd/MM/yyyy") : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.validadeProposta}
                        onSelect={(date) => handleDateChange('validadeProposta', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label>Data de Vencimento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dataVencimento && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dataVencimento ? format(formData.dataVencimento, "dd/MM/yyyy") : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dataVencimento}
                      onSelect={(date) => handleDateChange('dataVencimento', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="observacoes">Observações Comerciais</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  placeholder="Observações adicionais sobre a proposta comercial..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licitacao" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Concorrentes e Licitantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{licitantes.length}</div>
                    <div className="text-sm text-blue-600">Total de Licitantes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {licitantes.filter(l => l.ranking === 1).length}
                    </div>
                    <div className="text-sm text-green-600">1º Colocado</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(Math.min(...licitantes.map(l => l.valorFinal)))}
                    </div>
                    <div className="text-sm text-orange-600">Menor Valor</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(Math.max(...licitantes.map(l => l.valorFinal)))}
                    </div>
                    <div className="text-sm text-purple-600">Maior Valor</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">Ranking</th>
                        <th className="border border-gray-300 p-3 text-left">Empresa</th>
                        <th className="border border-gray-300 p-3 text-left">Marca/Modelo</th>
                        <th className="border border-gray-300 p-3 text-left">Valor Entrada</th>
                        <th className="border border-gray-300 p-3 text-left">Valor Final</th>
                        <th className="border border-gray-300 p-3 text-left">Unidade</th>
                        <th className="border border-gray-300 p-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {licitantes.map((licitante) => (
                        <tr key={licitante.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-3">
                            <div className="flex items-center gap-2">
                              <Badge className={`${getRankingColor(licitante.ranking)} text-white`}>
                                {licitante.ranking}º
                              </Badge>
                            </div>
                          </td>
                          <td className="border border-gray-300 p-3 font-medium">
                            {licitante.empresa}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {licitante.marca} {licitante.modelo}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {formatCurrency(licitante.valorEntrada)}
                          </td>
                          <td className="border border-gray-300 p-3 font-semibold">
                            {formatCurrency(licitante.valorFinal)}
                          </td>
                          <td className="border border-gray-300 p-3">
                            <Badge className={`${getUnidadeColor(licitante.unidade)} text-white`}>
                              {licitante.unidade}
                            </Badge>
                          </td>
                          <td className="border border-gray-300 p-3">
                            {licitante.ranking === 1 ? (
                              <Badge className="bg-green-500 text-white">Vencedor</Badge>
                            ) : (
                              <Badge variant="outline">Participante</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analise-tecnica" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Análise Técnica-Científica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="analiseTecnicaCientifica">Análise Técnica-Científica</Label>
                <Textarea
                  id="analiseTecnicaCientifica"
                  value={formData.analiseTecnica}
                  onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                  placeholder="Descreva a análise técnica-científica detalhada do produto/serviço..."
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="parecer">Parecer Técnico</Label>
                <Textarea
                  id="parecer"
                  value={formData.parecer}
                  onChange={(e) => handleInputChange('parecer', e.target.value)}
                  placeholder="Parecer técnico sobre a viabilidade e adequação..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="aprovado"
                    checked={formData.aprovado}
                    onCheckedChange={(checked) => handleInputChange('aprovado', checked)}
                  />
                  <Label htmlFor="aprovado">Aprovado Tecnicamente</Label>
                </div>
                <div>
                  <Label htmlFor="responsavel">Responsável Técnico</Label>
                  <Input
                    id="responsavel"
                    value={formData.responsavel}
                    onChange={(e) => handleInputChange('responsavel', e.target.value)}
                    placeholder="Nome do responsável"
                  />
                </div>
              </div>

              {!formData.aprovado && (
                <div>
                  <Label htmlFor="motivo">Motivo da Reprovação</Label>
                  <Textarea
                    id="motivo"
                    value={formData.motivo}
                    onChange={(e) => handleInputChange('motivo', e.target.value)}
                    placeholder="Descreva o motivo da reprovação técnica..."
                    rows={3}
                  />
                </div>
              )}

              <div>
                <Label>Data da Aprovação</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dataAprovacao && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dataAprovacao ? format(formData.dataAprovacao, "dd/MM/yyyy") : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dataAprovacao}
                      onSelect={(date) => handleDateChange('dataAprovacao', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gestao" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Classificação e Categorização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="produto">Produto</SelectItem>
                        <SelectItem value="servico">Serviço</SelectItem>
                        <SelectItem value="obra">Obra</SelectItem>
                        <SelectItem value="consultoria">Consultoria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="natureza">Natureza</Label>
                    <Select value={formData.natureza} onValueChange={(value) => handleInputChange('natureza', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a natureza" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="publica">Pública</SelectItem>
                        <SelectItem value="privada">Privada</SelectItem>
                        <SelectItem value="mista">Mista</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="regime">Regime</Label>
                    <Select value={formData.regime} onValueChange={(value) => handleInputChange('regime', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o regime" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diferenciado">Diferenciado</SelectItem>
                        <SelectItem value="comum">Comum</SelectItem>
                        <SelectItem value="integral">Integral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="criterio">Critério de Julgamento</Label>
                    <Select value={formData.criterio} onValueChange={(value) => handleInputChange('criterio', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o critério" />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="localizacao">Localização</Label>
                    <Input
                      id="localizacao"
                      value={formData.localizacao}
                      onChange={(e) => handleInputChange('localizacao', e.target.value)}
                      placeholder="Estado/Cidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="setor">Setor</Label>
                    <Select value={formData.setor} onValueChange={(value) => handleInputChange('setor', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o setor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="seguranca">Segurança</SelectItem>
                        <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input
                      id="categoria"
                      value={formData.categoria}
                      onChange={(e) => handleInputChange('categoria', e.target.value)}
                      placeholder="Categoria principal"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subcategoria">Subcategoria</Label>
                    <Input
                      id="subcategoria"
                      value={formData.subcategoria}
                      onChange={(e) => handleInputChange('subcategoria', e.target.value)}
                      placeholder="Subcategoria específica"
                    />
                  </div>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={novaTag}
                      onChange={(e) => setNovaTag(e.target.value)}
                      placeholder="Digite uma tag"
                      onKeyPress={(e) => e.key === 'Enter' && adicionarTag()}
                    />
                    <Button onClick={adicionarTag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          onClick={() => removerTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Status e Acompanhamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prioridade">Prioridade</Label>
                    <Select value={formData.prioridade} onValueChange={(value) => handleInputChange('prioridade', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="critica">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="estagio">Estágio</Label>
                    <Select value={formData.estagio} onValueChange={(value) => handleInputChange('estagio', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estágio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prospecao">Prospecção</SelectItem>
                        <SelectItem value="qualificacao">Qualificação</SelectItem>
                        <SelectItem value="proposta">Proposta</SelectItem>
                        <SelectItem value="negociacao">Negociação</SelectItem>
                        <SelectItem value="fechamento">Fechamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="probabilidade">Probabilidade de Sucesso (%)</Label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.probabilidade}
                      onChange={(e) => handleInputChange('probabilidade', Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-12 text-center font-medium">{formData.probabilidade}%</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="temperatura">Termômetro de Negociação</Label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.temperatura}
                      onChange={(e) => handleInputChange('temperatura', Number(e.target.value))}
                      className="flex-1"
                    />
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${calcularTermometro(formData.temperatura).color}`}></div>
                      <span className="capitalize font-medium">{calcularTermometro(formData.temperatura).stage}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="proximaAcao">Próxima Ação</Label>
                  <Input
                    id="proximaAcao"
                    value={formData.proximaAcao}
                    onChange={(e) => handleInputChange('proximaAcao', e.target.value)}
                    placeholder="Descreva a próxima ação necessária"
                  />
                </div>

                <div>
                  <Label>Data da Próxima Ação</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dataProximaAcao && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dataProximaAcao ? format(formData.dataProximaAcao, "dd/MM/yyyy") : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dataProximaAcao}
                        onSelect={(date) => handleDateChange('dataProximaAcao', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="historico" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Adicionar ao Histórico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="novaAcao">Ação Realizada</Label>
                  <Input
                    id="novaAcao"
                    value={novoHistorico.acao}
                    onChange={(e) => setNovoHistorico(prev => ({ ...prev, acao: e.target.value }))}
                    placeholder="Descreva a ação realizada"
                  />
                </div>
                <div>
                  <Label htmlFor="novaObservacao">Observação</Label>
                  <Textarea
                    id="novaObservacao"
                    value={novoHistorico.observacao}
                    onChange={(e) => setNovoHistorico(prev => ({ ...prev, observacao: e.target.value }))}
                    placeholder="Observações adicionais (opcional)"
                    rows={3}
                  />
                </div>
                <Button onClick={adicionarHistorico} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar ao Histórico
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Histórico de Ações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {formData.historico.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhuma ação registrada ainda</p>
                  ) : (
                    formData.historico.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 pb-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{item.acao}</h4>
                          <span className="text-sm text-gray-500">
                            {format(item.data, "dd/MM/yyyy HH:mm")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Por: {item.usuario}</p>
                        {item.observacao && (
                          <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                            {item.observacao}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Anexos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Arraste arquivos aqui ou clique para fazer upload</p>
                  <Button variant="outline">
                    Selecionar Arquivos
                  </Button>
                </div>
                
                {formData.anexos.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Arquivos Anexados:</h4>
                    {formData.anexos.map((anexo, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">{anexo.nome}</p>
                            <p className="text-sm text-gray-500">
                              {anexo.tipo} • {anexo.tamanho} • {format(anexo.dataUpload, "dd/MM/yyyy")}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
};

export default OportunidadeAvancadaForm;
