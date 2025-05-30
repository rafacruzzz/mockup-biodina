import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Save, FileText, Users, History, BarChart3, Plus, Edit, Trash2, Lock } from "lucide-react";

interface OportunidadeFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (oportunidade: any) => void;
}

// Dados mock para produtos e serviços (normalmente viriam do cadastro)
const produtosCadastro = [
  { id: 1, nome: 'ABL800 Flex', codigo: 'ABL-800-F' },
  { id: 2, nome: 'ABL800 Basic', codigo: 'ABL-800-B' },
  { id: 3, nome: 'Sensor pH', codigo: 'SEN-PH-01' },
  { id: 4, nome: 'Gasômetro Stat Profile', codigo: 'GSM-SP-01' },
  { id: 5, nome: 'Sistema WEBMED', codigo: 'WEB-SYS-01' }
];

const servicosCadastro = [
  { id: 1, nome: 'Instalação', codigo: 'SRV-INST' },
  { id: 2, nome: 'Treinamento', codigo: 'SRV-TREI' },
  { id: 3, nome: 'Manutenção', codigo: 'SRV-MANUT' },
  { id: 4, nome: 'Consultoria', codigo: 'SRV-CONS' },
  { id: 5, nome: 'Implementação', codigo: 'SRV-IMPL' }
];

// Dados mock para concorrentes
const concorrentes = [
  { id: 1, nome: 'Concorrente A', produto: 'ABL900 Plus', preco: 85000 },
  { id: 2, nome: 'Concorrente B', produto: 'GasAnalyzer Pro', preco: 92000 },
  { id: 3, nome: 'Concorrente C', produto: 'LabSystem X1', preco: 78000 }
];

// Dados mock para pedidos
const pedidos = [
  { id: 1, numero: 'PED-2024-001', tipo: 'Venda', status: 'Em Andamento', valor: 125000, dataEntrega: '2024-04-15' },
  { id: 2, numero: 'PED-2024-002', tipo: 'Serviço', status: 'Pendente', valor: 15000, dataEntrega: '2024-04-20' }
];

const OportunidadeForm = ({ oportunidade, onClose, onSave }: OportunidadeFormProps) => {
  const [activeMasterTab, setActiveMasterTab] = useState('triagem');
  const [activeToolTab, setActiveToolTab] = useState('geral');
  
  const [formData, setFormData] = useState({
    codigo: oportunidade?.codigo || '',
    cliente: oportunidade?.cliente || '',
    contato: oportunidade?.contato || '',
    telefone: oportunidade?.telefone || '',
    responsavel: oportunidade?.responsavel || '',
    origem: oportunidade?.origem || '',
    familiaComercial: oportunidade?.familiaComercial || '',
    status: oportunidade?.status || 'Em Triagem',
    tipoAplicacao: oportunidade?.tipoAplicacao || 'venda',
    tipoOportunidade: oportunidade?.tipoOportunidade || 'pontual',
    valor: oportunidade?.valor || 0,
    dataAbertura: oportunidade?.dataAbertura || '',
    dataContato: oportunidade?.dataContato || '',
    descricao: oportunidade?.descricao || '',
    observacoes: oportunidade?.observacoes || '',
    // Campos de Triagem
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nome: oportunidade?.nome || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    cep: oportunidade?.cep || '',
    cidade: oportunidade?.cidade || '',
    estado: oportunidade?.estado || '',
    email: oportunidade?.email || '',
    fonteLead: oportunidade?.fonteLead || '',
    segmento: oportunidade?.segmento || '',
    // Campos de Participação
    chaveLicitacao: oportunidade?.chaveLicitacao || '',
    dataLicitacao: oportunidade?.dataLicitacao || '',
    resumoEdital: oportunidade?.resumoEdital || '',
    analiseTecnica: oportunidade?.analiseTecnica || '',
    concorrencia: oportunidade?.concorrencia || '',
    // Produtos e serviços
    produtos: oportunidade?.produtos || [],
    servicos: oportunidade?.servicos || []
  });

  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>(formData.produtos);
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>(formData.servicos);

  // Determinar a fase atual baseada no status
  const getCurrentPhase = () => {
    const triagemStatuses = ['Em Triagem'];
    const participacaoStatuses = ['Aprovada para Participação', 'Em Acompanhamento'];
    const finalizadoStatuses = ['Ganha', 'Perdida na Triagem', 'Perdida na Participação'];
    
    if (triagemStatuses.includes(formData.status)) return 'triagem';
    if (participacaoStatuses.includes(formData.status)) return 'participacao';
    if (finalizadoStatuses.includes(formData.status)) return 'finalizada';
    return 'triagem';
  };

  const currentPhase = getCurrentPhase();
  const isPhaseCompleted = (phase: string) => {
    if (phase === 'triagem') return ['Aprovada para Participação', 'Em Acompanhamento', 'Ganha', 'Perdida na Participação'].includes(formData.status);
    if (phase === 'participacao') return ['Ganha', 'Perdida na Participação'].includes(formData.status);
    return false;
  };

  const isPhaseAccessible = (phase: string) => {
    if (phase === 'triagem') return true;
    if (phase === 'participacao') return isPhaseCompleted('triagem') || currentPhase === 'participacao';
    return false;
  };

  const isReadOnly = currentPhase === 'finalizada';

  // Atualizar aba master ativa baseado na fase
  useEffect(() => {
    if (currentPhase === 'participacao' && activeMasterTab === 'triagem') {
      setActiveMasterTab('participacao');
    }
  }, [currentPhase, activeMasterTab]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      produtos: produtosSelecionados,
      servicos: servicosSelecionados
    }));
  }, [produtosSelecionados, servicosSelecionados]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ganha': return 'bg-green-500';
      case 'Em Triagem': return 'bg-blue-500';
      case 'Aprovada para Participação': return 'bg-purple-500';
      case 'Em Acompanhamento': return 'bg-orange-500';
      case 'Perdida na Triagem': 
      case 'Perdida na Participação': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleProdutoToggle = (produtoNome: string) => {
    if (isReadOnly) return;
    setProdutosSelecionados(prev => 
      prev.includes(produtoNome) 
        ? prev.filter(p => p !== produtoNome)
        : [...prev, produtoNome]
    );
  };

  const handleServicoToggle = (servicoNome: string) => {
    if (isReadOnly) return;
    setServicosSelecionados(prev => 
      prev.includes(servicoNome) 
        ? prev.filter(s => s !== servicoNome)
        : [...prev, servicoNome]
    );
  };

  const renderCamposTriagem = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="codigo">Código da Oportunidade</Label>
        <Input
          id="codigo"
          value={formData.codigo}
          onChange={(e) => setFormData({...formData, codigo: e.target.value})}
          required
          disabled={isReadOnly}
        />
      </div>
      <div>
        <Label htmlFor="valor">Valor (R$)</Label>
        <Input
          id="valor"
          type="number"
          value={formData.valor}
          onChange={(e) => setFormData({...formData, valor: Number(e.target.value)})}
          disabled={isReadOnly}
        />
      </div>

      <div>
        <Label htmlFor="cliente">Cliente / Instituição</Label>
        <Input
          id="cliente"
          value={formData.cliente}
          onChange={(e) => setFormData({...formData, cliente: e.target.value})}
          required
          disabled={isReadOnly}
        />
      </div>
      <div>
        <Label htmlFor="contato">Contato</Label>
        <Input
          id="contato"
          value={formData.contato}
          onChange={(e) => setFormData({...formData, contato: e.target.value})}
          disabled={isReadOnly}
        />
      </div>

      <div>
        <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
        <Input
          id="cpfCnpj"
          value={formData.cpfCnpj}
          onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
          disabled={isReadOnly}
        />
      </div>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          disabled={isReadOnly}
        />
      </div>

      <div>
        <Label htmlFor="endereco">Endereço</Label>
        <Input
          id="endereco"
          value={formData.endereco}
          onChange={(e) => setFormData({...formData, endereco: e.target.value})}
          disabled={isReadOnly}
        />
      </div>
      <div>
        <Label htmlFor="cidade">Cidade</Label>
        <Input
          id="cidade"
          value={formData.cidade}
          onChange={(e) => setFormData({...formData, cidade: e.target.value})}
          disabled={isReadOnly}
        />
      </div>

      <div>
        <Label htmlFor="fonteLead">Fonte do Lead</Label>
        <Select value={formData.fonteLead} onValueChange={(value: any) => setFormData({...formData, fonteLead: value})} disabled={isReadOnly}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a fonte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Site">Site</SelectItem>
            <SelectItem value="Indicação">Indicação</SelectItem>
            <SelectItem value="Cold Call">Cold Call</SelectItem>
            <SelectItem value="Licitação">Licitação</SelectItem>
            <SelectItem value="Referência">Referência</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="segmento">Segmento</Label>
        <Select value={formData.segmento} onValueChange={(value: any) => setFormData({...formData, segmento: value})} disabled={isReadOnly}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o segmento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hospitalar">Hospitalar</SelectItem>
            <SelectItem value="Universitário">Universitário</SelectItem>
            <SelectItem value="Público">Público</SelectItem>
            <SelectItem value="Municipal">Municipal</SelectItem>
            <SelectItem value="Privado">Privado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Seção de Produtos e Serviços */}
      <div className="col-span-2 space-y-4 border-t pt-4">
        <h3 className="text-lg font-semibold">Produtos e Serviços de Interesse</h3>
        
        <div>
          <Label>Produto(s)</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {produtosCadastro.map((produto) => (
              <div key={produto.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`produto-${produto.id}`}
                  checked={produtosSelecionados.includes(produto.nome)}
                  onCheckedChange={() => handleProdutoToggle(produto.nome)}
                  disabled={isReadOnly}
                />
                <Label htmlFor={`produto-${produto.id}`} className="text-sm">
                  {produto.nome}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Serviço(s)</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {servicosCadastro.map((servico) => (
              <div key={servico.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`servico-${servico.id}`}
                  checked={servicosSelecionados.includes(servico.nome)}
                  onCheckedChange={() => handleServicoToggle(servico.nome)}
                  disabled={isReadOnly}
                />
                <Label htmlFor={`servico-${servico.id}`} className="text-sm">
                  {servico.nome}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <Label htmlFor="status">Status da Triagem</Label>
        <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})} disabled={isReadOnly}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Em Triagem">Em Triagem</SelectItem>
            <SelectItem value="Aprovada para Participação">Aprovada para Participação</SelectItem>
            <SelectItem value="Perdida na Triagem">Perdida na Triagem</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderCamposParticipacao = () => (
    <div className="grid grid-cols-2 gap-4">
      {/* Resumo da Triagem (Read-only) */}
      <div className="col-span-2 p-4 bg-gray-50 rounded-lg border">
        <h4 className="font-semibold mb-2">Resumo da Triagem</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p><strong>Cliente:</strong> {formData.cliente}</p>
          <p><strong>Contato:</strong> {formData.contato}</p>
          <p><strong>Valor:</strong> {formatCurrency(formData.valor)}</p>
          <p><strong>Fonte:</strong> {formData.fonteLead}</p>
        </div>
      </div>

      <div>
        <Label htmlFor="chaveLicitacao">Chave da Licitação</Label>
        <Input
          id="chaveLicitacao"
          value={formData.chaveLicitacao}
          onChange={(e) => setFormData({...formData, chaveLicitacao: e.target.value})}
          disabled={isReadOnly}
        />
      </div>
      <div>
        <Label htmlFor="dataLicitacao">Data da Licitação</Label>
        <Input
          id="dataLicitacao"
          type="date"
          value={formData.dataLicitacao}
          onChange={(e) => setFormData({...formData, dataLicitacao: e.target.value})}
          disabled={isReadOnly}
        />
      </div>

      <div className="col-span-2">
        <Label htmlFor="resumoEdital">Resumo do Edital</Label>
        <Textarea
          id="resumoEdital"
          value={formData.resumoEdital}
          onChange={(e) => setFormData({...formData, resumoEdital: e.target.value})}
          rows={3}
          disabled={isReadOnly}
        />
      </div>

      <div className="col-span-2">
        <Label htmlFor="analiseTecnica" className={!formData.analiseTecnica ? 'text-red-500' : ''}>
          Análise Técnica {!formData.analiseTecnica && !isReadOnly && '(Obrigatório)'}
        </Label>
        <Textarea
          id="analiseTecnica"
          value={formData.analiseTecnica}
          onChange={(e) => setFormData({...formData, analiseTecnica: e.target.value})}
          rows={3}
          className={!formData.analiseTecnica && !isReadOnly ? 'border-red-500' : ''}
          disabled={isReadOnly}
        />
      </div>

      <div className="col-span-2">
        <Label htmlFor="concorrencia" className={!formData.concorrencia ? 'text-red-500' : ''}>
          Análise da Concorrência {!formData.concorrencia && !isReadOnly && '(Obrigatório)'}
        </Label>
        <Textarea
          id="concorrencia"
          value={formData.concorrencia}
          onChange={(e) => setFormData({...formData, concorrencia: e.target.value})}
          rows={3}
          className={!formData.concorrencia && !isReadOnly ? 'border-red-500' : ''}
          disabled={isReadOnly}
        />
      </div>

      <div className="col-span-2">
        <Label htmlFor="status">Status da Participação</Label>
        <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})} disabled={isReadOnly}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Em Acompanhamento">Em Acompanhamento</SelectItem>
            <SelectItem value="Ganha">Ganha</SelectItem>
            <SelectItem value="Perdida na Participação">Perdida na Participação</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle>
              {oportunidade ? `Oportunidade ${formData.codigo}` : 'Nova Oportunidade'}
            </CardTitle>
            <Badge className={`${getStatusColor(formData.status)} text-white`}>
              {formData.status}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {/* Abas Masters */}
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => isPhaseAccessible('triagem') && setActiveMasterTab('triagem')}
                className={`px-6 py-3 font-semibold text-lg flex items-center gap-2 border-b-2 transition-colors ${
                  activeMasterTab === 'triagem'
                    ? 'border-biodina-blue text-biodina-blue'
                    : isPhaseAccessible('triagem')
                    ? 'border-transparent text-gray-600 hover:text-gray-800'
                    : 'border-transparent text-gray-400 cursor-not-allowed'
                }`}
                disabled={!isPhaseAccessible('triagem')}
              >
                {isPhaseCompleted('triagem') && <Lock className="h-4 w-4" />}
                TRIAGEM
              </button>
              <button
                onClick={() => isPhaseAccessible('participacao') && setActiveMasterTab('participacao')}
                className={`px-6 py-3 font-semibold text-lg flex items-center gap-2 border-b-2 transition-colors ${
                  activeMasterTab === 'participacao'
                    ? 'border-biodina-blue text-biodina-blue'
                    : isPhaseAccessible('participacao')
                    ? 'border-transparent text-gray-600 hover:text-gray-800'
                    : 'border-transparent text-gray-400 cursor-not-allowed'
                }`}
                disabled={!isPhaseAccessible('participacao')}
              >
                {isPhaseCompleted('participacao') && <Lock className="h-4 w-4" />}
                PARTICIPAÇÃO
              </button>
            </div>
          </div>

          {/* Abas de Ferramentas */}
          <Tabs value={activeToolTab} onValueChange={setActiveToolTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="geral" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger value="analise" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Análise Técnica
              </TabsTrigger>
              <TabsTrigger value="historico" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Histórico/Chat
              </TabsTrigger>
              <TabsTrigger 
                value="pedidos" 
                className="flex items-center gap-2"
                disabled={formData.status !== 'Ganha'}
              >
                <Users className="h-4 w-4" />
                {formData.status !== 'Ganha' && <Lock className="h-3 w-3" />}
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="documentos" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="space-y-4 mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeMasterTab === 'triagem' ? renderCamposTriagem() : renderCamposParticipacao()}

                <div className="col-span-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    rows={3}
                    disabled={isReadOnly}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90" disabled={isReadOnly}>
                    <Save className="h-4 w-4 mr-2" />
                    {isReadOnly ? 'Visualizar' : 'Salvar'}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="analise" className="mt-4">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="analiseAssessoria">Análise da Assessoria Científica</Label>
                  <Textarea
                    id="analiseAssessoria"
                    placeholder="Especificações técnicas atendem nossos produtos..."
                    rows={4}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Concorrentes</h3>
                    <Button size="sm" className="bg-biodina-gold hover:bg-biodina-gold/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Concorrente
                    </Button>
                  </div>
                  <div className="overflow-x-auto max-h-60 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Concorrente</TableHead>
                          <TableHead>Produto</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {concorrentes.map((concorrente) => (
                          <TableRow key={concorrente.id}>
                            <TableCell>{concorrente.nome}</TableCell>
                            <TableCell>{concorrente.produto}</TableCell>
                            <TableCell>{formatCurrency(concorrente.preco)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <Label htmlFor="avaliacaoTecnica">Avaliação Técnica do Edital</Label>
                  <Textarea
                    id="avaliacaoTecnica"
                    placeholder="Análise técnica dos requisitos..."
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pedidos" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Pedidos Vinculados</h3>
                  <Button 
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                    disabled={formData.status !== 'Ganha'}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Gerar Novo Pedido
                  </Button>
                </div>
                {formData.status !== 'Ganha' && (
                  <div className="text-center text-gray-500 py-8">
                    Pedidos só podem ser gerenciados para oportunidades com status "Ganha"
                  </div>
                )}
                {formData.status === 'Ganha' && (
                  <div className="overflow-x-auto max-h-80 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nº do Pedido</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Data Entrega</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pedidos.map((pedido) => (
                          <TableRow key={pedido.id}>
                            <TableCell className="font-medium">{pedido.numero}</TableCell>
                            <TableCell>{pedido.tipo}</TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500 text-white">
                                {pedido.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatCurrency(pedido.valor)}</TableCell>
                            <TableCell>{pedido.dataEntrega}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="historico" className="mt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Histórico e Documentos</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Arraste arquivos aqui ou clique para fazer upload</p>
                  <p className="text-sm text-gray-400 mt-2">Edital, ata, proposta, contrato</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Linha do Tempo</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">15/03/2024 - Oportunidade criada</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">16/03/2024 - Primeiro contato realizado</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentos" className="mt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Documentos</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Arraste arquivos aqui ou clique para fazer upload</p>
                  <p className="text-sm text-gray-400 mt-2">Edital, ata, proposta, contrato</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Linha do Tempo</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">15/03/2024 - Oportunidade criada</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">16/03/2024 - Primeiro contato realizado</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OportunidadeForm;
