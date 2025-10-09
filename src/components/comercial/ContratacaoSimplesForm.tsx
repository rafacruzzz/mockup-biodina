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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { X, Plus, FileText, MessageSquare, Upload, Package, Thermometer, ShoppingCart, Eye, Headphones, Link2, Download, Clock, Calendar, Network } from 'lucide-react';
import { PedidoCompleto } from '@/types/comercial';
import { Chamado, StatusChamado } from '@/types/chamado';
import { licitacoesGanhasDetalhadas } from '@/data/licitacaoMockData';
import { useColaboradores } from '@/hooks/useColaboradores';
import ChatInterno from './ChatInterno';
import PedidoModal from './PedidoModal';
import ChamadosTab from './ChamadosTab';
import InterfaceamentoTab from './InterfaceamentoTab';

interface ContratacaoSimplesFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

interface HistoricoVisita {
  id: string;
  colaborador: string;
  data: string;
  observacao: string;
}

const ContratacaoSimplesForm = ({ isOpen, onClose, onSave, oportunidade }: ContratacaoSimplesFormProps) => {
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [pedidos, setPedidos] = useState<PedidoCompleto[]>([]);
  const [chamados, setChamados] = useState<Chamado[]>(oportunidade?.chamados || []);
  const [isPedidoModalOpen, setIsPedidoModalOpen] = useState(false);
  const [licitacaoVinculada, setLicitacaoVinculada] = useState<string>('');
  const [documentosLicitacao, setDocumentosLicitacao] = useState<any[]>([]);
  const [historicoLicitacao, setHistoricoLicitacao] = useState<any[]>([]);
  const [historicoVisitas, setHistoricoVisitas] = useState<HistoricoVisita[]>(oportunidade?.historicoVisitas || []);
  const [interfaceamentos, setInterfaceamentos] = useState<any[]>(oportunidade?.interfaceamentos || []);
  const [modalHistoricoOpen, setModalHistoricoOpen] = useState(false);
  const [novaVisita, setNovaVisita] = useState({
    colaborador: '',
    data: '',
    observacao: ''
  });

  const { colaboradores } = useColaboradores();
  
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
    segmentoLead: oportunidade?.segmentoLead || '',
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || '',
    procurandoPor: oportunidade?.procurandoPor || '',
    
    // Contato Comercial
    contatoComercialNome: oportunidade?.contatoComercialNome || '',
    contatoComercialSetor: oportunidade?.contatoComercialSetor || '',
    contatoComercialTelefone: oportunidade?.contatoComercialTelefone || '',
    contatoComercialEmail: oportunidade?.contatoComercialEmail || '',
    
    // Organização
    tags: oportunidade?.tags || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    status: oportunidade?.status || 'em_triagem',
    descricao: oportunidade?.descricao || '',
    
    // Outros
    propostaNegociacao: oportunidade?.propostaNegociacao || false,
    termometro: oportunidade?.termometro || 50,
    
    // Campos condicionais
    motivoGanho: oportunidade?.motivoGanho || '',
    motivoPerda: oportunidade?.motivoPerda || '',
    
    // Análise Técnica
    analiseTecnica: oportunidade?.analiseTecnica || '',
    
    // Modalidade
    modalidade: 'contratacao_simples'
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

    const licitacao = licitacoesGanhasDetalhadas.find(l => l.id.toString() === licitacaoId);
    if (!licitacao) return;

    setLicitacaoVinculada(licitacaoId);
    setDocumentosLicitacao(licitacao.documentos);
    setHistoricoLicitacao(licitacao.historico);

    // Preencher automaticamente os campos da contratação
    setFormData(prev => ({
      ...prev,
      cpfCnpj: licitacao.cnpj,
      nomeFantasia: licitacao.nomeInstituicao,
      razaoSocial: licitacao.nomeInstituicao,
      endereco: `${licitacao.municipio} - ${licitacao.uf}`,
      uf: licitacao.uf,
      website: licitacao.linkEdital || '',
      fonteLead: 'licitacao',
      valorNegocio: licitacao.estrategiaValorFinal,
      tags: licitacao.palavraChave,
      fluxoTrabalho: `Contrato derivado da licitação ${licitacao.numeroPregao}`,
      status: 'ganha',
      descricao: licitacao.resumoEdital,
      analiseTecnica: licitacao.analiseTecnica
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

  const handleAdicionarVisita = () => {
    if (!novaVisita.colaborador || !novaVisita.data || !novaVisita.observacao) {
      return;
    }

    const visita: HistoricoVisita = {
      id: `visita_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      colaborador: novaVisita.colaborador,
      data: novaVisita.data,
      observacao: novaVisita.observacao
    };

    setHistoricoVisitas(prev => [...prev, visita]);
    setNovaVisita({ colaborador: '', data: '', observacao: '' });
    setModalHistoricoOpen(false);
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      concorrentes,
      pedidos,
      chamados,
      interfaceamentos,
      historicoVisitas,
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
      marca: '', 
      modelo: '', 
      quantidade: 0,
      quantidadeExamesMes: 0
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

  const licitacaoVinculadaData = licitacoesGanhasDetalhadas.find(l => l.id.toString() === licitacaoVinculada);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>
                  {oportunidade ? 'Editar' : 'Nova'} Oportunidade - Contratação
                </span>
                {licitacaoVinculadaData && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Link2 className="h-3 w-3 mr-1" />
                    Vinculada à {licitacaoVinculadaData.numeroPregao}
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
              <TabsTrigger value="chamados" className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                Chamados
              </TabsTrigger>
              <TabsTrigger value="interfaceamento" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                Interfaceamento
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais" className="space-y-6">
              {/* Vincular Licitação */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" />
                    Vincular Licitação Ganha
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="licitacao">Selecionar Licitação</Label>
                      <Select value={licitacaoVinculada} onValueChange={handleVincularLicitacao}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma licitação ganha para vincular" />
                        </SelectTrigger>
                        <SelectContent>
                          {licitacoesGanhasDetalhadas.map((licitacao) => (
                            <SelectItem key={licitacao.id} value={licitacao.id.toString()}>
                              {licitacao.numeroPregao} - {licitacao.nomeInstituicao} ({formatCurrency(licitacao.estrategiaValorFinal)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {licitacaoVinculadaData && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Licitação Vinculada:</strong> {licitacaoVinculadaData.numeroPregao}
                        </p>
                        <p className="text-sm text-green-600">
                          {licitacaoVinculadaData.objetoLicitacao}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Os dados do cliente, documentos, histórico e pedidos foram importados automaticamente.
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
                    <CardTitle>Dados do Cliente</CardTitle>
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
                            <SelectItem value="evento">Evento</SelectItem>
                            <SelectItem value="telefone">Telefone</SelectItem>
                            <SelectItem value="email">E-mail</SelectItem>
                            <SelectItem value="presencial">Presencial</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="video_chamada">Vídeo Chamada</SelectItem>
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

                    {/* Seção Contato Comercial */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Contato Comercial</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contatoComercialNome">Nome do Contato Comercial</Label>
                          <Input
                            id="contatoComercialNome"
                            value={formData.contatoComercialNome}
                            onChange={(e) => handleInputChange('contatoComercialNome', e.target.value)}
                            placeholder="Digite o nome do contato"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contatoComercialSetor">Setor do Contato Comercial</Label>
                          <Input
                            id="contatoComercialSetor"
                            value={formData.contatoComercialSetor}
                            onChange={(e) => handleInputChange('contatoComercialSetor', e.target.value)}
                            placeholder="Digite o setor"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contatoComercialTelefone">Telefone do Contato Comercial</Label>
                          <Input
                            id="contatoComercialTelefone"
                            type="tel"
                            value={formData.contatoComercialTelefone}
                            onChange={(e) => handleInputChange('contatoComercialTelefone', e.target.value)}
                            placeholder="Digite o telefone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contatoComercialEmail">E-mail do Contato Comercial</Label>
                          <Input
                            id="contatoComercialEmail"
                            type="email"
                            value={formData.contatoComercialEmail}
                            onChange={(e) => handleInputChange('contatoComercialEmail', e.target.value)}
                            placeholder="Digite o e-mail"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Marca do concorrente"
                                value={concorrente.marca}
                                onChange={(e) => atualizarConcorrente(index, 'marca', e.target.value)}
                              />
                              <Input
                                placeholder="Modelo do concorrente"
                                value={concorrente.modelo}
                                onChange={(e) => atualizarConcorrente(index, 'modelo', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label>Quantidade</Label>
                                <Input
                                  type="number"
                                  placeholder="Quantidade"
                                  value={concorrente.quantidade}
                                  onChange={(e) => atualizarConcorrente(index, 'quantidade', parseFloat(e.target.value) || 0)}
                                />
                              </div>
                              <div>
                                <Label>Quantidade de exames/mês</Label>
                                <Input
                                  type="number"
                                  placeholder="Quantidade de exames/mês"
                                  value={concorrente.quantidadeExamesMes}
                                  onChange={(e) => atualizarConcorrente(index, 'quantidadeExamesMes', parseFloat(e.target.value) || 0)}
                                />
                              </div>
                            </div>
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

                      {/* Histórico de Visitas */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Histórico de Visitas
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setModalHistoricoOpen(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar Histórico
                          </Button>
                        </div>
                        
                        {historicoVisitas.length === 0 ? (
                          <div className="text-center py-6 text-gray-500">
                            <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm">Nenhuma visita registrada</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Data</TableHead>
                                  <TableHead>Colaborador</TableHead>
                                  <TableHead>Observação</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {historicoVisitas
                                  .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                                  .map((visita) => (
                                  <TableRow key={visita.id}>
                                    <TableCell className="font-medium">
                                      {new Date(visita.data).toLocaleDateString('pt-BR')}
                                    </TableCell>
                                    <TableCell>{visita.colaborador}</TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                      {visita.observacao}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
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

            <TabsContent value="documentos" className="space-y-4">
              {/* Documentos importados da licitação */}
              {documentosLicitacao.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documentos Importados da Licitação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {documentosLicitacao.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium text-sm">{doc.nome}</p>
                              <p className="text-xs text-gray-500">
                                {doc.tipo} • {new Date(doc.data).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Novos Documentos</CardTitle>
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
                oportunidade={{
                  id: oportunidade?.id,
                  codigo: oportunidade?.codigo || oportunidade?.id || `OPP-${Date.now()}`,
                  cliente: formData.nomeFantasia || formData.razaoSocial,
                  responsavel: formData.colaboradoresResponsaveis,
                  valor: formData.valorNegocio,
                  status: formData.status,
                  segmento: formData.segmentoLead
                }}
              />
            </TabsContent>

            <TabsContent value="interfaceamento" className="space-y-4">
              <InterfaceamentoTab 
                oportunidade={{
                  id: oportunidade?.id,
                  codigo: oportunidade?.codigo || oportunidade?.id || `OPP-${Date.now()}`,
                  cliente: formData.nomeFantasia || formData.razaoSocial,
                  responsavel: formData.colaboradoresResponsaveis,
                  valor: formData.valorNegocio,
                  status: formData.status,
                  segmento: formData.segmentoLead
                }}
                formData={formData}
                onInputChange={handleInputChange}
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

      {/* Modal Adicionar Histórico de Visitas */}
      <Dialog open={modalHistoricoOpen} onOpenChange={setModalHistoricoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Histórico de Visita</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="colaboradorVisita">Colaborador</Label>
              <Select 
                value={novaVisita.colaborador} 
                onValueChange={(value) => setNovaVisita(prev => ({ ...prev, colaborador: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o colaborador" />
                </SelectTrigger>
                <SelectContent>
                  {colaboradores.map((colaborador) => (
                    <SelectItem key={colaborador.id} value={colaborador.nome}>
                      {colaborador.nome} - {colaborador.cargo}
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
                value={novaVisita.data}
                onChange={(e) => setNovaVisita(prev => ({ ...prev, data: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="observacaoVisita">Observações</Label>
              <Textarea
                id="observacaoVisita"
                value={novaVisita.observacao}
                onChange={(e) => setNovaVisita(prev => ({ ...prev, observacao: e.target.value }))}
                placeholder="Descreva os detalhes da visita..."
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setModalHistoricoOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAdicionarVisita}
              disabled={!novaVisita.colaborador || !novaVisita.data || !novaVisita.observacao}
            >
              Adicionar
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

export default ContratacaoSimplesForm;
