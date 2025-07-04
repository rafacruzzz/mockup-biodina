import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays, Plus, Edit, Trash2, FileText, Target, DollarSign, Clock, MapPin, Users, AlertTriangle, Trophy, Medal, Award } from 'lucide-react';
import { toast } from 'sonner';
import AdicionarLicitanteModal from './AdicionarLicitanteModal';

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm: React.FC<OportunidadeAvancadaFormProps> = ({
  oportunidade,
  onClose,
  onSave
}) => {
  const [numeroPregao, setNumeroPregao] = useState(oportunidade?.numeroPregao || '');
  const [nomeInstituicao, setNomeInstituicao] = useState(oportunidade?.nomeInstituicao || '');
  const [cnpj, setCnpj] = useState(oportunidade?.cnpj || '');
  const [endereco, setEndereco] = useState(oportunidade?.endereco || '');
  const [objetoLicitacao, setObjetoLicitacao] = useState(oportunidade?.objetoLicitacao || '');
  const [dataPublicacao, setDataPublicacao] = useState(oportunidade?.dataPublicacao || '');
  const [dataContato, setDataContato] = useState(oportunidade?.dataContato || '');
  const [estrategiaUtilizada, setEstrategiaUtilizada] = useState(oportunidade?.estrategiaUtilizada || '');
  const [estrategiaValorInicial, setEstrategiaValorInicial] = useState(oportunidade?.estrategiaValorInicial || 0);
  const [estrategiaValorFinal, setEstrategiaValorFinal] = useState(oportunidade?.estrategiaValorFinal || 0);
  const [observacoes, setObservacoes] = useState(oportunidade?.observacoes || '');
  const [status, setStatus] = useState(oportunidade?.status || 'em_andamento');

  // Dados expandidos dos licitantes com nova estrutura
  const [licitantes, setLicitantes] = useState([
    { 
      id: 1, 
      nome: 'Empresa ABC Ltda', 
      marca: 'Radiometer', 
      modelo: 'ABL800 Flex',
      quantidade: 2, 
      valorEntrada: 45000,
      valorFinal: 50000,
      unidade: 'lote',
      ranking: '1º',
      preco: 50000
    },
    { 
      id: 2, 
      nome: 'Tecnologia XYZ S.A.', 
      marca: 'Nova Biomedical', 
      modelo: 'StatProfile Prime',
      quantidade: 3, 
      valorEntrada: 46000,
      valorFinal: 48000,
      unidade: 'unidade',
      ranking: '2º',
      preco: 48000
    },
    { 
      id: 3, 
      nome: 'Medical Solutions Inc', 
      marca: 'Siemens', 
      modelo: 'RAPIDPoint 500',
      quantidade: 1, 
      valorEntrada: 52000,
      valorFinal: 55000,
      unidade: 'caixa',
      ranking: '3º',
      preco: 55000
    },
    { 
      id: 4, 
      nome: 'BioTech Equipamentos', 
      marca: 'Abbott', 
      modelo: 'i-STAT Alinity',
      quantidade: 2, 
      valorEntrada: 60000,
      valorFinal: 58000,
      unidade: 'unidade',
      ranking: 'desclassificado',
      preco: 58000
    }
  ]);

  const [showAdicionarLicitante, setShowAdicionarLicitante] = useState(false);
  const [editingLicitante, setEditingLicitante] = useState<any>(null);

  useEffect(() => {
    if (oportunidade) {
      setNumeroPregao(oportunidade.numeroPregao || '');
      setNomeInstituicao(oportunidade.nomeInstituicao || '');
      setCnpj(oportunidade.cnpj || '');
      setEndereco(oportunidade.endereco || '');
      setObjetoLicitacao(oportunidade.objetoLicitacao || '');
      setDataPublicacao(oportunidade.dataPublicacao || '');
      setDataContato(oportunidade.dataContato || '');
      setEstrategiaUtilizada(oportunidade.estrategiaUtilizada || '');
      setEstrategiaValorInicial(oportunidade.estrategiaValorInicial || 0);
      setEstrategiaValorFinal(oportunidade.estrategiaValorFinal || 0);
      setObservacoes(oportunidade.observacoes || '');
      setStatus(oportunidade.status || 'em_andamento');
    }
  }, [oportunidade]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getRankingBadge = (ranking: string) => {
    switch (ranking) {
      case '1º':
        return <Badge className="bg-yellow-500 text-white flex items-center gap-1"><Trophy className="h-3 w-3" />{ranking}</Badge>;
      case '2º':
        return <Badge className="bg-gray-400 text-white flex items-center gap-1"><Medal className="h-3 w-3" />{ranking}</Badge>;
      case '3º':
        return <Badge className="bg-amber-600 text-white flex items-center gap-1"><Award className="h-3 w-3" />{ranking}</Badge>;
      case 'desclassificado':
        return <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{ranking}</Badge>;
      default:
        return <Badge variant="outline">{ranking}</Badge>;
    }
  };

  const getUnidadeBadge = (unidade: string) => {
    const colors = {
      'unidade': 'bg-blue-100 text-blue-800',
      'lote': 'bg-green-100 text-green-800',
      'caixa': 'bg-purple-100 text-purple-800',
      'metro': 'bg-orange-100 text-orange-800',
      'kg': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[unidade as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {unidade}
      </Badge>
    );
  };

  const handleAdicionarLicitante = (licitanteData: any) => {
    if (editingLicitante) {
      setLicitantes(prev => prev.map(l => 
        l.id === editingLicitante.id ? { ...licitanteData, id: editingLicitante.id } : l
      ));
      setEditingLicitante(null);
      toast.success('Licitante atualizado com sucesso!');
    } else {
      const newLicitante = {
        ...licitanteData,
        id: Date.now()
      };
      setLicitantes(prev => [...prev, newLicitante]);
      toast.success('Licitante adicionado com sucesso!');
    }
    setShowAdicionarLicitante(false);
  };

  const handleEditLicitante = (licitante: any) => {
    setEditingLicitante(licitante);
    setShowAdicionarLicitante(true);
  };

  const handleDeleteLicitante = (id: number) => {
    setLicitantes(prev => prev.filter(l => l.id !== id));
    toast.success('Licitante removido com sucesso!');
  };

  const handleSave = () => {
    const data = {
      numeroPregao,
      nomeInstituicao,
      cnpj,
      endereco,
      objetoLicitacao,
      dataPublicacao,
      dataContato,
      estrategiaUtilizada,
      estrategiaValorInicial,
      estrategiaValorFinal,
      observacoes,
      status
    };
    onSave(data);
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {oportunidade ? 'Editar Licitação' : 'Nova Licitação'}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4">
            <Tabs defaultValue="geral" className="space-y-4">
              <TabsList>
                <TabsTrigger value="geral">Informações Gerais</TabsTrigger>
                <TabsTrigger value="licitacao">Licitantes</TabsTrigger>
                <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
              </TabsList>

              <TabsContent value="geral" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Dados da Licitação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numeroPregao">Número do Pregão</Label>
                      <Input
                        id="numeroPregao"
                        value={numeroPregao}
                        onChange={(e) => setNumeroPregao(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="nomeInstituicao">Nome da Instituição</Label>
                      <Input
                        id="nomeInstituicao"
                        value={nomeInstituicao}
                        onChange={(e) => setNomeInstituicao(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="objetoLicitacao">Objeto da Licitação</Label>
                      <Textarea
                        id="objetoLicitacao"
                        value={objetoLicitacao}
                        onChange={(e) => setObjetoLicitacao(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Datas e Estratégia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dataPublicacao">Data de Publicação</Label>
                      <Input
                        id="dataPublicacao"
                        type="date"
                        value={dataPublicacao}
                        onChange={(e) => setDataPublicacao(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dataContato">Data de Contato</Label>
                      <Input
                        id="dataContato"
                        type="date"
                        value={dataContato}
                        onChange={(e) => setDataContato(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="estrategiaUtilizada">Estratégia Utilizada</Label>
                      <Input
                        id="estrategiaUtilizada"
                        value={estrategiaUtilizada}
                        onChange={(e) => setEstrategiaUtilizada(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="estrategiaValorInicial">Valor Inicial (R$)</Label>
                      <Input
                        id="estrategiaValorInicial"
                        type="number"
                        value={estrategiaValorInicial}
                        onChange={(e) => setEstrategiaValorInicial(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="estrategiaValorFinal">Valor Final (R$)</Label>
                      <Input
                        id="estrategiaValorFinal"
                        type="number"
                        value={estrategiaValorFinal}
                        onChange={(e) => setEstrategiaValorFinal(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="licitacao" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Tabela de Licitantes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-gray-600">
                        Gerencie os licitantes participantes do processo
                      </p>
                      <Button 
                        onClick={() => setShowAdicionarLicitante(true)}
                        className="bg-biodina-gold hover:bg-biodina-gold/90"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Licitante
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-20">Ranking</TableHead>
                            <TableHead>Nome Licitante</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead>Valor Entrada</TableHead>
                            <TableHead>Valor Final</TableHead>
                            <TableHead className="w-20">Qtd</TableHead>
                            <TableHead>Unidade</TableHead>
                            <TableHead className="w-20">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {licitantes.map((licitante) => (
                            <TableRow key={licitante.id}>
                              <TableCell>
                                {getRankingBadge(licitante.ranking)}
                              </TableCell>
                              <TableCell className="font-medium">
                                {licitante.nome}
                              </TableCell>
                              <TableCell>{licitante.marca}</TableCell>
                              <TableCell>{licitante.modelo}</TableCell>
                              <TableCell className="font-mono">
                                {formatCurrency(licitante.valorEntrada)}
                              </TableCell>
                              <TableCell className="font-mono font-semibold">
                                {formatCurrency(licitante.valorFinal)}
                              </TableCell>
                              <TableCell className="text-center">
                                {licitante.quantidade}
                              </TableCell>
                              <TableCell>
                                {getUnidadeBadge(licitante.unidade)}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleEditLicitante(licitante)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleDeleteLicitante(licitante.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="detalhes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Informações Adicionais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        placeholder="Detalhes adicionais sobre a licitação"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status da Licitação</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="em_andamento">Em Andamento</SelectItem>
                          <SelectItem value="ganha">Ganha</SelectItem>
                          <SelectItem value="perdida">Perdida</SelectItem>
                          <SelectItem value="cancelada">Cancelada</SelectItem>
                          <SelectItem value="convertida">Converter em Oportunidade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </ScrollArea>

          <div className="flex justify-end gap-2 py-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {showAdicionarLicitante && (
        <AdicionarLicitanteModal
          isOpen={showAdicionarLicitante}
          licitante={editingLicitante}
          onClose={() => {
            setShowAdicionarLicitante(false);
            setEditingLicitante(null);
          }}
          onSave={handleAdicionarLicitante}
        />
      )}
    </>
  );
};

export default OportunidadeAvancadaForm;
