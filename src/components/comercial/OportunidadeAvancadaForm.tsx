import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Save, Plus, Trash2, Upload, Download, MessageSquare, Send, User, Eye, File, Lock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import LicitacaoValidationModal from "./LicitacaoValidationModal";
import ConcorrenteModal from "./ConcorrenteModal";
import ChatInterno from "./ChatInterno";
import PedidoForm from "./PedidoForm";

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (oportunidade: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  // Debug log to confirm component is rendering
  console.log('OportunidadeAvancadaForm rendering with oportunidade:', oportunidade);
  
  // Estados para abas masters
  const [activeMasterTab, setActiveMasterTab] = useState('triagem');
  
  console.log('Current activeMasterTab:', activeMasterTab);
  
  const [showLicitacaoModal, setShowLicitacaoModal] = useState(false);
  const [showConcorrenteModal, setShowConcorrenteModal] = useState(false);
  const [showPedidoForm, setShowPedidoForm] = useState(false);
  const [concorrentes, setConcorrentes] = useState([
    { id: 1, nome: 'MedTech SA', produto: 'Kit diagnóstico rápido', preco: 4200 },
    { id: 2, nome: 'Global Diagnóstico', produto: 'Serviço de instalação', preco: 1200 }
  ]);

  const [pedidos, setPedidos] = useState([
    { 
      id: 1, 
      codigo: 'PED-001', 
      cliente: 'Associação das Pioneiras Sociais',
      dataGeracao: '2024-03-20',
      situacao: 'Em Aberto',
      valor: 782530
    }
  ]);

  const [formData, setFormData] = useState({
    tipoOportunidade: oportunidade?.tipoOportunidade || '',
    chaveLicitacao: oportunidade?.chaveLicitacao || '',
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nome: oportunidade?.nome || '',
    nomeFantasia: oportunidade?.nomeFantasia || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    uf: oportunidade?.uf || '',
    email: oportunidade?.email || '',
    telefone: oportunidade?.telefone || '',
    website: oportunidade?.website || '',
    ativo: oportunidade?.ativo || true,
    fonteLead: oportunidade?.fonteLead || '',
    segmentoLead: oportunidade?.segmentoLead || '',
    metodoContato: oportunidade?.metodoContato || '',
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || [],
    produtosServicos: oportunidade?.produtosServicos || [],
    valorNegocio: oportunidade?.valorNegocio || 0,
    procurandoPor: oportunidade?.procurandoPor || '',
    tags: oportunidade?.tags || '',
    caracteristicas: oportunidade?.caracteristicas || '',
    dataInicio: oportunidade?.dataInicio || '',
    dataLimite: oportunidade?.dataLimite || '',
    dataVisita: oportunidade?.dataVisita || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    status: oportunidade?.status || 'em_triagem',
    descricao: oportunidade?.descricao || '',
    analiseTecnica: oportunidade?.analiseTecnica || '',
    termometro: oportunidade?.termometro || 50,
    resultadoOportunidade: oportunidade?.resultadoOportunidade || 'em_andamento',
    motivoGanho: oportunidade?.motivoGanho || '',
    motivoPerda: oportunidade?.motivoPerda || '',
    propostaNegociacao: oportunidade?.propostaNegociacao || false,
    fornecedorInternacional: oportunidade?.fornecedorInternacional || '',
    moeda: oportunidade?.moeda || 'USD',
    numeroInvoice: oportunidade?.numeroInvoice || '',
    numeroDI: oportunidade?.numeroDI || '',
    dataChegadaEstimada: oportunidade?.dataChegadaEstimada || ''
  });

  const handleChaveLicitacaoChange = (value: string) => {
    setFormData({ ...formData, chaveLicitacao: value });
    if (value === '123') {
      setShowLicitacaoModal(true);
    }
  };

  const handleAddConcorrente = (concorrente: any) => {
    setConcorrentes([...concorrentes, { ...concorrente, id: Date.now() }]);
  };

  const handleAddPedido = (pedidoData: any) => {
    const novoPedido = {
      id: Date.now(),
      codigo: `PED-${String(pedidos.length + 1).padStart(3, '0')}`,
      cliente: formData.nome,
      dataGeracao: new Date().toISOString().split('T')[0],
      situacao: 'Em Aberto',
      valor: pedidoData.produtos?.reduce((sum: number, prod: any) => sum + (prod.valorTotal || 0), 0) || 0
    };
    setPedidos([...pedidos, novoPedido]);
    setShowPedidoForm(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTermometroColor = (valor: number) => {
    if (valor < 60) return '#ff8c00';
    if (valor < 80) return '#ff6600';
    if (valor < 90) return '#ff4400';
    if (valor >= 90) return '#cc0000';
    return '#990000';
  };

  const getTermometroStage = (valor: number) => {
    if (valor < 60) return 'Temperatura < 60';
    if (valor < 80) return 'Em Processo (60-80)';
    if (valor < 90) return 'Boas Chances (80-90)';
    if (valor >= 90) return 'Comprometido (90+)';
    return 'Conquistado (100)';
  };

  const isPhaseCompleted = (phase: string) => {
    if (phase === 'triagem') {
      return formData.nome && formData.cpfCnpj && formData.valorNegocio > 0;
    }
    if (phase === 'participacao') {
      return isPhaseCompleted('triagem') && formData.termometro >= 70;
    }
    return false;
  };

  const isPhaseAccessible = (phase: string) => {
    if (phase === 'triagem') return true;
    if (phase === 'participacao') return isPhaseCompleted('triagem');
    return false;
  };

  const canShowPedidosTab = () => {
    return formData.resultadoOportunidade === 'ganho' || formData.resultadoOportunidade === 'em_andamento';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderTriagemContent = () => (
    <div className="space-y-6">
      <Tabs defaultValue="dados-gerais" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
          <TabsTrigger value="analise-tecnica">Análise Técnica</TabsTrigger>
          <TabsTrigger value="historico">Histórico/Chat</TabsTrigger>
          <TabsTrigger 
            value="pedidos" 
            disabled={!canShowPedidosTab()}
            className={!canShowPedidosTab() ? "opacity-50 cursor-not-allowed" : ""}
          >
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="dados-gerais" className="space-y-6 mt-6">
          <div className="mb-6">
            <Label htmlFor="tipoOportunidade" className="text-base font-semibold">
              Tipo de Oportunidade *
            </Label>
            <Select 
              value={formData.tipoOportunidade} 
              onValueChange={(value) => setFormData({...formData, tipoOportunidade: value})}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecione o tipo de oportunidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="licitacao">Licitação</SelectItem>
                <SelectItem value="importacao_direta">Importação Direta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <Label htmlFor="chaveLicitacao">Chave da Licitação</Label>
            <Input
              id="chaveLicitacao"
              value={formData.chaveLicitacao}
              onChange={(e) => handleChaveLicitacaoChange(e.target.value)}
              placeholder="Digite a chave da licitação"
              className="mt-2"
            />
            {formData.chaveLicitacao && formData.chaveLicitacao !== '123' && (
              <p className="text-green-600 text-sm mt-1">✓ Nenhuma licitação anterior</p>
            )}
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Dados do Cliente</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                <Input
                  id="cpfCnpj"
                  value={formData.cpfCnpj}
                  onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <Label htmlFor="nome">Nome / Nome Fantasia</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Nome do cliente"
                />
                {formData.nome.toLowerCase() === 'sabesp' && (
                  <p className="text-red-600 text-sm mt-1">⚠️ Cliente com pendência financeira</p>
                )}
              </div>
              <div>
                <Label htmlFor="razaoSocial">Razão Social</Label>
                <Input
                  id="razaoSocial"
                  value={formData.razaoSocial}
                  onChange={(e) => setFormData({...formData, razaoSocial: e.target.value})}
                  placeholder="Razão social"
                />
              </div>
              <div>
                <Label htmlFor="endereco">Endereço do Cliente</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                  placeholder="Endereço completo"
                />
              </div>
              <div>
                <Label htmlFor="uf">UF</Label>
                <Select value={formData.uf} onValueChange={(value) => setFormData({...formData, uf: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="https://website.com"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ativo" 
                checked={formData.ativo}
                onCheckedChange={(checked) => setFormData({...formData, ativo: checked as boolean})}
              />
              <Label htmlFor="ativo">Ativo</Label>
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Dados do Lead/Negócio</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fonteLead">Fonte do Lead</Label>
                <Select value={formData.fonteLead} onValueChange={(value) => setFormData({...formData, fonteLead: value})}>
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
                <Label htmlFor="segmentoLead">Segmento do Lead</Label>
                <Select value={formData.segmentoLead} onValueChange={(value) => setFormData({...formData, segmentoLead: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospitalar">Hospitalar</SelectItem>
                    <SelectItem value="universitario">Universitário</SelectItem>
                    <SelectItem value="publico">Público</SelectItem>
                    <SelectItem value="municipal">Municipal</SelectItem>
                    <SelectItem value="privado">Privado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="metodoContato">Método de Contato</Label>
                <Select value={formData.metodoContato} onValueChange={(value) => setFormData({...formData, metodoContato: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telefone">Telefone</SelectItem>
                    <SelectItem value="email">E-mail</SelectItem>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="video_chamada">Videochamada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="valorNegocio">Valor do Negócio</Label>
                <Input
                  id="valorNegocio"
                  type="number"
                  step="0.01"
                  value={formData.valorNegocio}
                  onChange={(e) => setFormData({...formData, valorNegocio: Number(e.target.value)})}
                  placeholder="0,00"
                />
              </div>
              <div>
                <Label htmlFor="dataInicio">Data de Início</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => setFormData({...formData, dataInicio: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="dataLimite">Data Limite</Label>
                <Input
                  id="dataLimite"
                  type="date"
                  value={formData.dataLimite}
                  onChange={(e) => setFormData({...formData, dataLimite: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="dataVisita">Data da Visita</Label>
                <Input
                  id="dataVisita"
                  type="date"
                  value={formData.dataVisita}
                  onChange={(e) => setFormData({...formData, dataVisita: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="procurandoPor">Procurando por (Contatos vinculados)</Label>
                <Input
                  id="procurandoPor"
                  value={formData.procurandoPor}
                  onChange={(e) => setFormData({...formData, procurandoPor: e.target.value})}
                  placeholder="Descrição dos contatos"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="Separadas por vírgula"
              />
            </div>
            
            <div>
              <Label htmlFor="caracteristicas">Características</Label>
              <Textarea
                id="caracteristicas"
                value={formData.caracteristicas}
                onChange={(e) => setFormData({...formData, caracteristicas: e.target.value})}
                placeholder="Descreva as características da oportunidade"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="fluxoTrabalho">Fluxo de Trabalho</Label>
              <Textarea
                id="fluxoTrabalho"
                value={formData.fluxoTrabalho}
                onChange={(e) => setFormData({...formData, fluxoTrabalho: e.target.value})}
                placeholder="Descreva o fluxo de trabalho"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="em_triagem">Em Triagem</SelectItem>
                  <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                  <SelectItem value="ganha">Ganha</SelectItem>
                  <SelectItem value="perdida">Perdida</SelectItem>
                  <SelectItem value="finalizada">Finalizada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="descricao">Descrição da Oportunidade</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                placeholder="Descrição detalhada da oportunidade"
                rows={4}
              />
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Dados Técnicos</h3>
            
            <div>
              <Label htmlFor="analiseTecnica">Análise Técnica-Científica</Label>
              <Textarea
                id="analiseTecnica"
                value={formData.analiseTecnica}
                onChange={(e) => setFormData({...formData, analiseTecnica: e.target.value})}
                placeholder="Análise técnica detalhada"
                rows={4}
              />
            </div>

            <div>
              <Label>Termômetro ({formData.termometro}°)</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-4">
                  <Slider
                    value={[formData.termometro]}
                    onValueChange={(value) => setFormData({...formData, termometro: value[0]})}
                    max={100}
                    min={0}
                    step={5}
                    className="flex-1"
                  />
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: getTermometroColor(formData.termometro) }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0°</span>
                  <span>25°</span>
                  <span>50°</span>
                  <span>75°</span>
                  <span>100°</span>
                </div>
                <p className="text-sm font-medium" style={{ color: getTermometroColor(formData.termometro) }}>
                  {getTermometroStage(formData.termometro)}
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="resultadoOportunidade">Resultado da Oportunidade</Label>
              <Select 
                value={formData.resultadoOportunidade} 
                onValueChange={(value) => setFormData({...formData, resultadoOportunidade: value})}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="ganho">Ganho</SelectItem>
                  <SelectItem value="perda">Perda</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.resultadoOportunidade === 'ganho' && (
              <div>
                <Label htmlFor="motivoGanho">Motivo do Ganho</Label>
                <Textarea
                  id="motivoGanho"
                  value={formData.motivoGanho}
                  onChange={(e) => setFormData({...formData, motivoGanho: e.target.value})}
                  placeholder="Descreva o motivo do ganho"
                  rows={3}
                />
              </div>
            )}

            {formData.resultadoOportunidade === 'perda' && (
              <div>
                <Label htmlFor="motivoPerda">Motivo da Perda</Label>
                <Textarea
                  id="motivoPerda"
                  value={formData.motivoPerda}
                  onChange={(e) => setFormData({...formData, motivoPerda: e.target.value})}
                  placeholder="Descreva o motivo da perda"
                  rows={3}
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="propostaNegociacao" 
                checked={formData.propostaNegociacao}
                onCheckedChange={(checked) => setFormData({...formData, propostaNegociacao: checked as boolean})}
              />
              <Label htmlFor="propostaNegociacao">Proposta em Negociação</Label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pedidos" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Pedidos da Oportunidade</h3>
            <Button 
              type="button"
              className="bg-biodina-gold hover:bg-biodina-gold/90"
              onClick={() => setShowPedidoForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar novos pedidos
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumo de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Dt. Gerado</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell className="font-medium">{pedido.codigo}</TableCell>
                      <TableCell>{pedido.dataGeracao}</TableCell>
                      <TableCell>{pedido.cliente}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500 text-white">
                          {pedido.situacao}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(pedido.valor)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pedidos.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                        Nenhum pedido cadastrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analise-tecnica" className="space-y-6 mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Análise da Concorrência</h3>
              <Button onClick={() => setShowConcorrenteModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Concorrente
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Concorrentes Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Concorrente</TableHead>
                      <TableHead>Produto/Serviço</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Comparação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {concorrentes.map((concorrente) => (
                      <TableRow key={concorrente.id}>
                        <TableCell className="font-medium">{concorrente.nome}</TableCell>
                        <TableCell>{concorrente.produto}</TableCell>
                        <TableCell>{formatCurrency(concorrente.preco)}</TableCell>
                        <TableCell>
                          <Badge className={concorrente.preco > formData.valorNegocio ? "bg-red-500" : "bg-green-500"}>
                            {concorrente.preco > formData.valorNegocio ? "Acima do nosso valor" : "Abaixo do nosso valor"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico Técnico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm"><strong>27/05/2025 - Análise realizada por Maria Santos:</strong></p>
                    <p className="text-sm text-gray-600">"Concorrente tem um valor inferior, mas não inclui instalação."</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm"><strong>26/05/2025 - Assessoria Técnica:</strong></p>
                    <p className="text-sm text-gray-600">"Produto aprovado conforme edital. Requisitos mínimos atendidos."</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="historico" className="space-y-6 mt-6">
          <ChatInterno oportunidadeId={oportunidade?.id || formData.chaveLicitacao || 'nova'} />
        </TabsContent>

        <TabsContent value="documentos" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentos da Oportunidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Clique para fazer upload</span>
                </div>
                
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <File className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-sm font-medium">Edital.pdf</span>
                  <span className="text-xs text-gray-500">27/05/2025</span>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <File className="h-8 w-8 text-green-500 mb-2" />
                  <span className="text-sm font-medium">Proposta.xlsx</span>
                  <span className="text-xs text-gray-500">26/05/2025</span>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderParticipacaoContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fase de Participação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Status da Participação</h3>
              <p className="text-blue-700">
                Esta fase estará disponível após completar todos os campos obrigatórios da triagem.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="statusParticipacao">Status da Participação</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="em_triagem">Em Triagem</SelectItem>
                    <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                    <SelectItem value="ganha">Ganha</SelectItem>
                    <SelectItem value="perdida">Perdida</SelectItem>
                    <SelectItem value="finalizada">Finalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Termômetro de Chances ({formData.termometro}°)</Label>
                <div className="mt-2 space-y-2">
                  <Slider
                    value={[formData.termometro]}
                    onValueChange={(value) => setFormData({...formData, termometro: value[0]})}
                    max={100}
                    min={0}
                    step={5}
                    className="flex-1"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0°</span>
                    <span>50°</span>
                    <span>100°</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-2xl">
            {oportunidade ? 'Editar Oportunidade' : 'Nova Oportunidade Comercial'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            {/* MASTER TABS - NÍVEL SUPERIOR */}
            <div className="mb-6 bg-white border-2 border-red-500 p-4">
              <h2 className="text-xl font-bold mb-4 text-red-600">DEBUG: Master Tabs Section</h2>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    console.log('Clicking TRIAGEM tab');
                    setActiveMasterTab('triagem');
                  }}
                  className={`px-8 py-4 text-lg font-bold border-2 rounded ${
                    activeMasterTab === 'triagem'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  TRIAGEM
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log('Clicking PARTICIPAÇÃO tab');
                    setActiveMasterTab('participacao');
                  }}
                  className={`px-8 py-4 text-lg font-bold border-2 rounded ${
                    activeMasterTab === 'participacao'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                  disabled={!isPhaseAccessible('participacao')}
                >
                  {isPhaseCompleted('participacao') && <Lock className="h-4 w-4 inline mr-2" />}
                  PARTICIPAÇÃO
                </button>
              </div>
              <p className="mt-2 text-sm text-red-600">Active Tab: {activeMasterTab}</p>
            </div>

            {/* CONTEÚDO DAS ABAS MASTERS */}
            {activeMasterTab === 'triagem' && renderTriagemContent()}
            {activeMasterTab === 'participacao' && renderParticipacaoContent()}

            <div className="flex justify-end gap-2 pt-6 border-t mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar Oportunidade
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {showLicitacaoModal && (
        <LicitacaoValidationModal 
          chave={formData.chaveLicitacao}
          onClose={() => setShowLicitacaoModal(false)} 
        />
      )}

      {showConcorrenteModal && (
        <ConcorrenteModal
          onClose={() => setShowConcorrenteModal(false)}
          onSave={handleAddConcorrente}
          valorReferencia={formData.valorNegocio}
        />
      )}

      {showPedidoForm && (
        <PedidoForm
          onClose={() => setShowPedidoForm(false)}
          onSave={handleAddPedido}
          oportunidade={formData}
        />
      )}
    </div>
  );
};

export default OportunidadeAvancadaForm;
