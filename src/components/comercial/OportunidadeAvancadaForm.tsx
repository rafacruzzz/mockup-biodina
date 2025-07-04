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
import { Separator } from "@/components/ui/separator";
import { X, Plus, FileText, MessageSquare, Upload, Package, Thermometer, Target, BarChart3, Eye, Edit, Trash2 } from 'lucide-react';
import ChatInterno from './ChatInterno';
import PedidoModal from './PedidoModal';
import { PedidoCompleto } from '@/types/comercial';
import LicitacaoValidationModal from './LicitacaoValidationModal';

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [pedidos, setPedidos] = useState<PedidoCompleto[]>([]);
  const [isPedidoModalOpen, setIsPedidoModalOpen] = useState(false);
  const [showLicitanteModal, setShowLicitanteModal] = useState(false);
  const [editingLicitante, setEditingLicitante] = useState<any>(null);

  // Estado dos licitantes atualizado
  const [licitantes, setLicitantes] = useState([
    {
      id: 1,
      empresa: 'Empresa Alpha Ltda',
      cnpj: '12.345.678/0001-90',
      marca: 'Radiometer',
      modelo: 'ABL800 Flex',
      valorEntrada: 850000,
      valorFinal: 780000,
      unidade: 'unidade',
      ranking: 1,
      status: 'ativo'
    },
    {
      id: 2,
      empresa: 'Beta Equipamentos SA',
      cnpj: '98.765.432/0001-10',
      marca: 'Nova Biomedical',
      modelo: 'Stat Profile Prime Plus',
      valorEntrada: 920000,
      valorFinal: 820000,
      unidade: 'unidade',
      ranking: 2,
      status: 'ativo'
    },
    {
      id: 3,
      empresa: 'Gamma Medical Corp',
      cnpj: '11.222.333/0001-44',
      marca: 'Abbott',
      modelo: 'i-STAT Alinity',
      valorEntrada: 1100000,
      valorFinal: 950000,
      unidade: 'lote',
      ranking: 3,
      status: 'desclassificado'
    }
  ]);

  const [formData, setFormData] = useState({
    numeroPregao: oportunidade?.numeroPregao || '',
    nomeInstituicao: oportunidade?.nomeInstituicao || '',
    uf: oportunidade?.uf || '',
    objetoLicitacao: oportunidade?.objetoLicitacao || '',
    valorMaximo: oportunidade?.valorMaximo || 0,
    dataAbertura: oportunidade?.dataAbertura || '',
    dataVisita: oportunidade?.dataVisita || '',
    dataNegociacao: oportunidade?.dataNegociacao || '',
    status: oportunidade?.status || 'rascunho',
    observacoes: oportunidade?.observacoes || '',
    analiseDetalhada: oportunidade?.analiseDetalhada || '',
    estrategiaValorInicial: oportunidade?.estrategiaValorInicial || 0,
    estrategiaValorFinal: oportunidade?.estrategiaValorFinal || 0,
    probabilidadeGanho: oportunidade?.probabilidadeGanho || 50,
    riscosIdentificados: oportunidade?.riscosIdentificados || '',
    pontosFortes: oportunidade?.pontosFortes || '',
    pontosFracos: oportunidade?.pontosFracos || '',
    situacaoLicitacao: oportunidade?.situacaoLicitacao || 'aberta',
    resultadoNegociacao: oportunidade?.resultadoNegociacao || '',
    valorFinalNegociado: oportunidade?.valorFinalNegociado || 0,
    motivoResultado: oportunidade?.motivoResultado || '',
    proximosPassos: oportunidade?.proximosPassos || '',
    modalidade: 'licitacao'
  });

  const [concorrentes, setConcorrentes] = useState(oportunidade?.concorrentes || []);
  const [licitanteFormData, setLicitanteFormData] = useState({
    empresa: '',
    cnpj: '',
    marca: '',
    modelo: '',
    valorEntrada: 0,
    valorFinal: 0,
    unidade: 'unidade',
    status: 'ativo'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (formData.situacaoLicitacao === 'finalizada' && formData.resultadoNegociacao === 'ganha') {
      setShowValidationModal(true);
    } else {
      const dataToSave = {
        ...formData,
        concorrentes,
        licitantes,
        pedidos,
        id: oportunidade?.id || Date.now(),
      };
      onSave(dataToSave);
      onClose();
    }
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const getRankingLabel = (ranking: number) => {
    switch (ranking) {
      case 1: return '1º';
      case 2: return '2º';
      case 3: return '3º';
      default: return `${ranking}º`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-500';
      case 'desclassificado': return 'bg-red-500';
      case 'pendente': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAdicionarLicitante = () => {
    setEditingLicitante(null);
    setLicitanteFormData({
      empresa: '',
      cnpj: '',
      marca: '',
      modelo: '',
      valorEntrada: 0,
      valorFinal: 0,
      unidade: 'unidade',
      status: 'ativo'
    });
    setShowLicitanteModal(true);
  };

  const handleEditarLicitante = (licitante: any) => {
    setEditingLicitante(licitante);
    setLicitanteFormData({
      empresa: licitante.empresa,
      cnpj: licitante.cnpj,
      marca: licitante.marca,
      modelo: licitante.modelo,
      valorEntrada: licitante.valorEntrada,
      valorFinal: licitante.valorFinal,
      unidade: licitante.unidade,
      status: licitante.status
    });
    setShowLicitanteModal(true);
  };

  const handleSalvarLicitante = () => {
    if (editingLicitante) {
      // Editar licitante existente
      setLicitantes(prev => prev.map(l => 
        l.id === editingLicitante.id 
          ? { ...l, ...licitanteFormData }
          : l
      ));
    } else {
      // Adicionar novo licitante
      const newLicitante = {
        id: Date.now(),
        ...licitanteFormData,
        ranking: licitantes.length + 1
      };
      setLicitantes(prev => [...prev, newLicitante]);
    }
    setShowLicitanteModal(false);
  };

  const handleRemoverLicitante = (id: number) => {
    setLicitantes(prev => prev.filter(l => l.id !== id));
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger value="analise" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Análise
              </TabsTrigger>
              <TabsTrigger value="negociacao" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Negociação
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
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Licitação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="numeroPregao">Número do Pregão *</Label>
                        <Input
                          id="numeroPregao"
                          value={formData.numeroPregao}
                          onChange={(e) => handleInputChange('numeroPregao', e.target.value)}
                          placeholder="Ex: 001/2024"
                        />
                      </div>
                      <div>
                        <Label htmlFor="uf">UF *</Label>
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

                    <div>
                      <Label htmlFor="nomeInstituicao">Nome da Instituição *</Label>
                      <Input
                        id="nomeInstituicao"
                        value={formData.nomeInstituicao}
                        onChange={(e) => handleInputChange('nomeInstituicao', e.target.value)}
                        placeholder="Digite o nome da instituição"
                      />
                    </div>

                    <div>
                      <Label htmlFor="objetoLicitacao">Objeto da Licitação *</Label>
                      <Textarea
                        id="objetoLicitacao"
                        value={formData.objetoLicitacao}
                        onChange={(e) => handleInputChange('objetoLicitacao', e.target.value)}
                        placeholder="Descreva o objeto da licitação"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="valorMaximo">Valor Máximo *</Label>
                      <Input
                        id="valorMaximo"
                        type="number"
                        value={formData.valorMaximo}
                        onChange={(e) => handleInputChange('valorMaximo', parseFloat(e.target.value) || 0)}
                        placeholder="Digite o valor máximo"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="dataAbertura">Data de Abertura *</Label>
                        <Input
                          id="dataAbertura"
                          type="date"
                          value={formData.dataAbertura}
                          onChange={(e) => handleInputChange('dataAbertura', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataVisita">Data da Visita</Label>
                        <Input
                          id="dataVisita"
                          type="date"
                          value={formData.dataVisita}
                          onChange={(e) => handleInputChange('dataVisita', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataNegociacao">Data da Negociação</Label>
                        <Input
                          id="dataNegociacao"
                          type="date"
                          value={formData.dataNegociacao}
                          onChange={(e) => handleInputChange('dataNegociacao', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rascunho">Rascunho</SelectItem>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="concluido">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        value={formData.observacoes}
                        onChange={(e) => handleInputChange('observacoes', e.target.value)}
                        placeholder="Observações adicionais"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Tabela de Licitantes Atualizada */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Licitantes</CardTitle>
                    <Button onClick={handleAdicionarLicitante} className="bg-biodina-gold hover:bg-biodina-gold/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Licitante
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ranking</TableHead>
                            <TableHead>Empresa</TableHead>
                            <TableHead>CNPJ</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead>Valor de Entrada</TableHead>
                            <TableHead>Valor Final</TableHead>
                            <TableHead>Unidade</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {licitantes.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                                Nenhum licitante adicionado
                              </TableCell>
                            </TableRow>
                          ) : (
                            licitantes.map((licitante) => (
                              <TableRow key={licitante.id}>
                                <TableCell className="font-bold text-center">
                                  {getRankingLabel(licitante.ranking)}
                                </TableCell>
                                <TableCell className="font-medium">{licitante.empresa}</TableCell>
                                <TableCell className="font-mono text-sm">{formatCNPJ(licitante.cnpj)}</TableCell>
                                <TableCell>{licitante.marca}</TableCell>
                                <TableCell>{licitante.modelo}</TableCell>
                                <TableCell className="font-medium text-blue-600">
                                  {formatCurrency(licitante.valorEntrada)}
                                </TableCell>
                                <TableCell className="font-medium text-green-600">
                                  {formatCurrency(licitante.valorFinal)}
                                </TableCell>
                                <TableCell>{licitante.unidade}</TableCell>
                                <TableCell>
                                  <Badge className={`${getStatusColor(licitante.status)} text-white`}>
                                    {licitante.status.toUpperCase()}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEditarLicitante(licitante)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleRemoverLicitante(licitante.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analise" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Estratégica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="analiseDetalhada">Análise Detalhada</Label>
                    <Textarea
                      id="analiseDetalhada"
                      value={formData.analiseDetalhada}
                      onChange={(e) => handleInputChange('analiseDetalhada', e.target.value)}
                      placeholder="Análise detalhada da licitação..."
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="estrategiaValorInicial">Estratégia - Valor Inicial</Label>
                      <Input
                        id="estrategiaValorInicial"
                        type="number"
                        value={formData.estrategiaValorInicial}
                        onChange={(e) => handleInputChange('estrategiaValorInicial', parseFloat(e.target.value) || 0)}
                        placeholder="Valor inicial da estratégia"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estrategiaValorFinal">Estratégia - Valor Final</Label>
                      <Input
                        id="estrategiaValorFinal"
                        type="number"
                        value={formData.estrategiaValorFinal}
                        onChange={(e) => handleInputChange('estrategiaValorFinal', parseFloat(e.target.value) || 0)}
                        placeholder="Valor final da estratégia"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="probabilidadeGanho">Probabilidade de Ganho: {formData.probabilidadeGanho}%</Label>
                    <input
                      type="range"
                      id="probabilidadeGanho"
                      min="0"
                      max="100"
                      value={formData.probabilidadeGanho}
                      onChange={(e) => handleInputChange('probabilidadeGanho', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="riscosIdentificados">Riscos Identificados</Label>
                    <Textarea
                      id="riscosIdentificados"
                      value={formData.riscosIdentificados}
                      onChange={(e) => handleInputChange('riscosIdentificados', e.target.value)}
                      placeholder="Descreva os riscos identificados..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pontosFortes">Pontos Fortes</Label>
                      <Textarea
                        id="pontosFortes"
                        value={formData.pontosFortes}
                        onChange={(e) => handleInputChange('pontosFortes', e.target.value)}
                        placeholder="Nossos pontos fortes..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pontosFracos">Pontos Fracos</Label>
                      <Textarea
                        id="pontosFracos"
                        value={formData.pontosFracos}
                        onChange={(e) => handleInputChange('pontosFracos', e.target.value)}
                        placeholder="Pontos a melhorar..."
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="negociacao" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Negociação e Resultado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="situacaoLicitacao">Situação da Licitação</Label>
                    <Select value={formData.situacaoLicitacao} onValueChange={(value) => handleInputChange('situacaoLicitacao', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a situação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aberta">Aberta</SelectItem>
                        <SelectItem value="em_negociacao">Em Negociação</SelectItem>
                        <SelectItem value="finalizada">Finalizada</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.situacaoLicitacao === 'finalizada' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="resultadoNegociacao">Resultado da Negociação</Label>
                          <Select value={formData.resultadoNegociacao} onValueChange={(value) => handleInputChange('resultadoNegociacao', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o resultado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ganha">Ganha</SelectItem>
                              <SelectItem value="perdida">Perdida</SelectItem>
                              <SelectItem value="empate_tecnico">Empate Técnico</SelectItem>
                              <SelectItem value="desclassificada">Desclassificada</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="valorFinalNegociado">Valor Final Negociado</Label>
                          <Input
                            id="valorFinalNegociado"
                            type="number"
                            value={formData.valorFinalNegociado}
                            onChange={(e) => handleInputChange('valorFinalNegociado', parseFloat(e.target.value) || 0)}
                            placeholder="Valor final negociado"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="motivoResultado">Motivo do Resultado</Label>
                        <Textarea
                          id="motivoResultado"
                          value={formData.motivoResultado}
                          onChange={(e) => handleInputChange('motivoResultado', e.target.value)}
                          placeholder="Descreva o motivo do resultado..."
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="proximosPassos">Próximos Passos</Label>
                    <Textarea
                      id="proximosPassos"
                      value={formData.proximosPassos}
                      onChange={(e) => handleInputChange('proximosPassos', e.target.value)}
                      placeholder="Descreva os próximos passos..."
                      rows={3}
                    />
                  </div>
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
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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
                                <Badge>
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

      {/* Modal para adicionar/editar licitante */}
      <Dialog open={showLicitanteModal} onOpenChange={setShowLicitanteModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingLicitante ? 'Editar' : 'Adicionar'} Licitante
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="empresa">Empresa *</Label>
                <Input
                  id="empresa"
                  value={licitanteFormData.empresa}
                  onChange={(e) => setLicitanteFormData(prev => ({ ...prev, empresa: e.target.value }))}
                  placeholder="Nome da empresa"
                />
              </div>
              <div>
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  id="cnpj"
                  value={licitanteFormData.cnpj}
                  onChange={(e) => setLicitanteFormData(prev => ({ ...prev, cnpj: e.target.value }))}
                  placeholder="00.000.000/0000-00"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marca">Marca *</Label>
                <Input
                  id="marca"
                  value={licitanteFormData.marca}
                  onChange={(e) => setLicitanteFormData(prev => ({ ...prev, marca: e.target.value }))}
                  placeholder="Marca do produto"
                />
              </div>
              <div>
                <Label htmlFor="modelo">Modelo *</Label>
                <Input
                  id="modelo"
                  value={licitanteFormData.modelo}
                  onChange={(e) => setLicitanteFormData(prev => ({ ...prev, modelo: e.target.value }))}
                  placeholder="Modelo do produto"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valorEntrada">Valor de Entrada *</Label>
                <Input
                  id="valorEntrada"
                  type="number"
                  value={licitanteFormData.valorEntrada}
                  onChange={(e) => setLicitanteFormData(prev => ({ ...prev, valorEntrada: parseFloat(e.target.value) || 0 }))}
                  placeholder="Valor de entrada"
                />
              </div>
              <div>
                <Label htmlFor="valorFinal">Valor Final *</Label>
                <Input
                  id="valorFinal"
                  type="number"
                  value={licitanteFormData.valorFinal}
                  onChange={(e) => setLicitanteFormData(prev => ({ ...prev, valorFinal: parseFloat(e.target.value) || 0 }))}
                  placeholder="Valor final"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unidade">Unidade *</Label>
                <Select value={licitanteFormData.unidade} onValueChange={(value) => setLicitanteFormData(prev => ({ ...prev, unidade: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unidade">Unidade</SelectItem>
                    <SelectItem value="lote">Lote</SelectItem>
                    <SelectItem value="caixa">Caixa</SelectItem>
                    <SelectItem value="kit">Kit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select value={licitanteFormData.status} onValueChange={(value) => setLicitanteFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="desclassificado">Desclassificado</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowLicitanteModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSalvarLicitante} className="bg-biodina-gold hover:bg-biodina-gold/90">
                {editingLicitante ? 'Atualizar' : 'Adicionar'} Licitante
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PedidoModal
        isOpen={isPedidoModalOpen}
        onClose={() => setIsPedidoModalOpen(false)}
        onSave={handleSalvarPedido}
        oportunidade={oportunidade || { nomeFantasia: 'Cliente Licitação', id: 'nova' }}
      />

      <LicitacaoValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        onConfirm={(shouldCreateOpportunity) => {
          if (shouldCreateOpportunity) {
            const dataToSave = {
              ...formData,
              concorrentes,
              licitantes,
              pedidos,
              id: oportunidade?.id || Date.now(),
              status: 'convertida'
            };
            onSave(dataToSave);
          } else {
            const dataToSave = {
              ...formData,
              concorrentes,
              licitantes,
              pedidos,
              id: oportunidade?.id || Date.now(),
            };
            onSave(dataToSave);
          }
          onClose();
        }}
        licitacaoData={formData}
      />
    </>
  );
};

export default OportunidadeAvancadaForm;
