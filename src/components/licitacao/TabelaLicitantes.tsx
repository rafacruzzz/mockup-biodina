import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Licitante, ProdutoLicitacao } from "@/types/licitacao";
import { Plus, Edit, Trash2, Trophy, Package, ArrowUp, ArrowDown } from "lucide-react";

interface TabelaLicitantesProps {
  licitacaoId: number;
  licitantes: Licitante[];
  produtos: ProdutoLicitacao[];
  onLicitantesChange: (licitantes: Licitante[]) => void;
  onProdutosChange: (produtos: ProdutoLicitacao[]) => void;
}

const TabelaLicitantes = ({ 
  licitacaoId, 
  licitantes, 
  produtos, 
  onLicitantesChange, 
  onProdutosChange 
}: TabelaLicitantesProps) => {
  const [showLicitanteModal, setShowLicitanteModal] = useState(false);
  const [showProdutoModal, setShowProdutoModal] = useState(false);
  const [editingLicitante, setEditingLicitante] = useState<Licitante | null>(null);
  const [editingProduto, setEditingProduto] = useState<ProdutoLicitacao | null>(null);
  const [selectedLicitanteId, setSelectedLicitanteId] = useState<number | null>(null);

  const [licitanteForm, setLicitanteForm] = useState<{
    empresa: string;
    cnpj: string;
    marca: string;
    modelo: string;
    valorEntrada: number;
    valorFinal: number;
    unidade: string;
    status: 'habilitado' | 'inabilitado' | 'desclassificado' | 'vencedor';
    observacoes: string;
  }>({
    empresa: '',
    cnpj: '',
    marca: '',
    modelo: '',
    valorEntrada: 0,
    valorFinal: 0,
    unidade: 'unidade',
    status: 'habilitado',
    observacoes: ''
  });

  const [produtoForm, setProdutoForm] = useState({
    codigo: '',
    descricao: '',
    marca: '',
    modelo: '',
    quantidade: 1,
    valorUnitario: 0,
    especificacoes: ''
  });

  const unidadeOptions = [
    'unidade',
    'lote',
    'caixa',
    'kit',
    'conjunto',
    'pacote',
    'm²',
    'm³',
    'kg',
    'peça'
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'habilitado': return 'bg-blue-500';
      case 'inabilitado': return 'bg-red-500';
      case 'desclassificado': return 'bg-gray-500';
      case 'vencedor': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      habilitado: 'Habilitado',
      inabilitado: 'Inabilitado',
      desclassificado: 'Desclassificado',
      vencedor: 'Vencedor'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const calculateRanking = (newLicitantes: Licitante[]) => {
    return newLicitantes
      .sort((a, b) => {
        // Desclassificados ficam por último
        if (a.status === 'desclassificado' && b.status !== 'desclassificado') return 1;
        if (b.status === 'desclassificado' && a.status !== 'desclassificado') return -1;
        if (a.status === 'desclassificado' && b.status === 'desclassificado') return 0;
        
        // Para os demais, ranking por valor final
        return a.valorFinal - b.valorFinal;
      })
      .map((licitante, index) => ({
        ...licitante,
        ranking: licitante.status === 'desclassificado' ? 0 : index + 1
      }));
  };

  const getRankingDisplay = (licitante: Licitante) => {
    if (licitante.status === 'desclassificado') {
      return (
        <Badge variant="outline" className="text-gray-500 border-gray-300">
          Desclassificado
        </Badge>
      );
    }
    
    const rankingText = `${licitante.ranking}º`;
    return (
      <div className="flex items-center gap-2">
        {licitante.ranking === 1 && <Trophy className="h-4 w-4 text-yellow-500" />}
        <Badge variant="outline" className="font-bold">
          {rankingText}
        </Badge>
      </div>
    );
  };

  const handleSaveLicitante = () => {
    if (!licitanteForm.empresa || !licitanteForm.cnpj) return;

    const newLicitante: Licitante = {
      id: editingLicitante?.id || Date.now(),
      licitacaoId,
      ...licitanteForm,
      ranking: 0 // Será calculado automaticamente
    };

    let updatedLicitantes;
    if (editingLicitante) {
      updatedLicitantes = licitantes.map(l => 
        l.id === editingLicitante.id ? newLicitante : l
      );
    } else {
      updatedLicitantes = [...licitantes, newLicitante];
    }

    // Recalcular ranking
    const licitantesWithRanking = calculateRanking(updatedLicitantes);
    onLicitantesChange(licitantesWithRanking);

    // Reset form
    setLicitanteForm({
      empresa: '',
      cnpj: '',
      marca: '',
      modelo: '',
      valorEntrada: 0,
      valorFinal: 0,
      unidade: 'unidade',
      status: 'habilitado',
      observacoes: ''
    });
    setEditingLicitante(null);
    setShowLicitanteModal(false);
  };

  const handleEditLicitante = (licitante: Licitante) => {
    setLicitanteForm({
      empresa: licitante.empresa,
      cnpj: licitante.cnpj,
      marca: licitante.marca,
      modelo: licitante.modelo,
      valorEntrada: licitante.valorEntrada,
      valorFinal: licitante.valorFinal,
      unidade: licitante.unidade || 'unidade',
      status: licitante.status,
      observacoes: licitante.observacoes || ''
    });
    setEditingLicitante(licitante);
    setShowLicitanteModal(true);
  };

  const handleDeleteLicitante = (id: number) => {
    const updatedLicitantes = licitantes.filter(l => l.id !== id);
    const licitantesWithRanking = calculateRanking(updatedLicitantes);
    onLicitantesChange(licitantesWithRanking);
    
    // Remove produtos do licitante excluído
    const updatedProdutos = produtos.filter(p => p.licitanteId !== id);
    onProdutosChange(updatedProdutos);
  };

  const handleSaveProduto = () => {
    if (!selectedLicitanteId || !produtoForm.codigo || !produtoForm.descricao) return;

    const newProduto: ProdutoLicitacao = {
      id: editingProduto?.id || Date.now(),
      licitanteId: selectedLicitanteId,
      ...produtoForm,
      valorTotal: produtoForm.quantidade * produtoForm.valorUnitario
    };

    let updatedProdutos;
    if (editingProduto) {
      updatedProdutos = produtos.map(p => 
        p.id === editingProduto.id ? newProduto : p
      );
    } else {
      updatedProdutos = [...produtos, newProduto];
    }

    onProdutosChange(updatedProdutos);

    // Reset form
    setProdutoForm({
      codigo: '',
      descricao: '',
      marca: '',
      modelo: '',
      quantidade: 1,
      valorUnitario: 0,
      especificacoes: ''
    });
    setEditingProduto(null);
    setShowProdutoModal(false);
    setSelectedLicitanteId(null);
  };

  const handleEditProduto = (produto: ProdutoLicitacao) => {
    setProdutoForm({
      codigo: produto.codigo,
      descricao: produto.descricao,
      marca: produto.marca,
      modelo: produto.modelo,
      quantidade: produto.quantidade,
      valorUnitario: produto.valorUnitario,
      especificacoes: produto.especificacoes || ''
    });
    setEditingProduto(produto);
    setSelectedLicitanteId(produto.licitanteId);
    setShowProdutoModal(true);
  };

  const handleDeleteProduto = (id: number) => {
    const updatedProdutos = produtos.filter(p => p.id !== id);
    onProdutosChange(updatedProdutos);
  };

  const getProdutosPorLicitante = (licitanteId: number) => {
    return produtos.filter(p => p.licitanteId === licitanteId);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="licitantes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="licitantes" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Licitantes
          </TabsTrigger>
          <TabsTrigger value="produtos" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Produtos Detalhados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="licitantes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Tabela de Licitantes
                </CardTitle>
                <Dialog open={showLicitanteModal} onOpenChange={setShowLicitanteModal}>
                  <DialogTrigger asChild>
                    <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Licitante
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingLicitante ? 'Editar Licitante' : 'Novo Licitante'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="empresa">Empresa *</Label>
                          <Input
                            id="empresa"
                            value={licitanteForm.empresa}
                            onChange={(e) => setLicitanteForm({...licitanteForm, empresa: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cnpj">CNPJ *</Label>
                          <Input
                            id="cnpj"
                            value={licitanteForm.cnpj}
                            onChange={(e) => setLicitanteForm({...licitanteForm, cnpj: e.target.value})}
                            placeholder="00.000.000/0000-00"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="marca">Marca</Label>
                          <Input
                            id="marca"
                            value={licitanteForm.marca}
                            onChange={(e) => setLicitanteForm({...licitanteForm, marca: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="modelo">Modelo</Label>
                          <Input
                            id="modelo"
                            value={licitanteForm.modelo}
                            onChange={(e) => setLicitanteForm({...licitanteForm, modelo: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="valorEntrada">Valor de Entrada</Label>
                          <Input
                            id="valorEntrada"
                            type="number"
                            min="0"
                            step="0.01"
                            value={licitanteForm.valorEntrada}
                            onChange={(e) => setLicitanteForm({...licitanteForm, valorEntrada: parseFloat(e.target.value) || 0})}
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formatCurrency(licitanteForm.valorEntrada)}
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="valorFinal">Valor Final</Label>
                          <Input
                            id="valorFinal"
                            type="number"
                            min="0"
                            step="0.01"
                            value={licitanteForm.valorFinal}
                            onChange={(e) => setLicitanteForm({...licitanteForm, valorFinal: parseFloat(e.target.value) || 0})}
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formatCurrency(licitanteForm.valorFinal)}
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="unidade">Unidade</Label>
                          <Select 
                            value={licitanteForm.unidade} 
                            onValueChange={(value) => setLicitanteForm({...licitanteForm, unidade: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {unidadeOptions.map((unidade) => (
                                <SelectItem key={unidade} value={unidade}>
                                  {unidade}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select 
                          value={licitanteForm.status} 
                          onValueChange={(value: 'habilitado' | 'inabilitado' | 'desclassificado' | 'vencedor') => 
                            setLicitanteForm({...licitanteForm, status: value})
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="habilitado">Habilitado</SelectItem>
                            <SelectItem value="inabilitado">Inabilitado</SelectItem>
                            <SelectItem value="desclassificado">Desclassificado</SelectItem>
                            <SelectItem value="vencedor">Vencedor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="observacoes">Observações</Label>
                        <Textarea
                          id="observacoes"
                          value={licitanteForm.observacoes}
                          onChange={(e) => setLicitanteForm({...licitanteForm, observacoes: e.target.value})}
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowLicitanteModal(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveLicitante}>
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Ranking</TableHead>
                      <TableHead className="min-w-[200px]">Empresa</TableHead>
                      <TableHead className="w-32">CNPJ</TableHead>
                      <TableHead className="w-24">Marca</TableHead>
                      <TableHead className="w-24">Modelo</TableHead>
                      <TableHead className="w-28">Valor de Entrada</TableHead>
                      <TableHead className="w-28">Valor Final</TableHead>
                      <TableHead className="w-20">Unidade</TableHead>
                      <TableHead className="w-24">Status</TableHead>
                      <TableHead className="w-20">Produtos</TableHead>
                      <TableHead className="w-20">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {licitantes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                          Nenhum licitante cadastrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      licitantes.map((licitante) => (
                        <TableRow key={licitante.id}>
                          <TableCell>
                            {getRankingDisplay(licitante)}
                          </TableCell>
                          <TableCell className="font-medium">{licitante.empresa}</TableCell>
                          <TableCell className="text-sm">{formatCNPJ(licitante.cnpj)}</TableCell>
                          <TableCell>{licitante.marca}</TableCell>
                          <TableCell>{licitante.modelo}</TableCell>
                          <TableCell className="text-sm">{formatCurrency(licitante.valorEntrada)}</TableCell>
                          <TableCell className="font-bold text-sm">{formatCurrency(licitante.valorFinal)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {licitante.unidade || 'unidade'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(licitante.status)} text-white text-xs`}>
                              {getStatusLabel(licitante.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {getProdutosPorLicitante(licitante.id).length}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => handleEditLicitante(licitante)}>
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleDeleteLicitante(licitante.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
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
        </TabsContent>

        <TabsContent value="produtos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Produtos dos Licitantes
                </CardTitle>
                <Dialog open={showProdutoModal} onOpenChange={setShowProdutoModal}>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-biodina-gold hover:bg-biodina-gold/90"
                      disabled={licitantes.length === 0}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Produto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProduto ? 'Editar Produto' : 'Novo Produto'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="licitante">Licitante *</Label>
                        <Select 
                          value={selectedLicitanteId?.toString() || ''} 
                          onValueChange={(value) => setSelectedLicitanteId(Number(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um licitante" />
                          </SelectTrigger>
                          <SelectContent>
                            {licitantes.map((licitante) => (
                              <SelectItem key={licitante.id} value={licitante.id.toString()}>
                                {licitante.empresa}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="codigo">Código *</Label>
                          <Input
                            id="codigo"
                            value={produtoForm.codigo}
                            onChange={(e) => setProdutoForm({...produtoForm, codigo: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="quantidade">Quantidade</Label>
                          <Input
                            id="quantidade"
                            type="number"
                            min="1"
                            value={produtoForm.quantidade}
                            onChange={(e) => setProdutoForm({...produtoForm, quantidade: parseInt(e.target.value) || 1})}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="descricao">Descrição *</Label>
                        <Input
                          id="descricao"
                          value={produtoForm.descricao}
                          onChange={(e) => setProdutoForm({...produtoForm, descricao: e.target.value})}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="marca">Marca</Label>
                          <Input
                            id="marca"
                            value={produtoForm.marca}
                            onChange={(e) => setProdutoForm({...produtoForm, marca: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="modelo">Modelo</Label>
                          <Input
                            id="modelo"
                            value={produtoForm.modelo}
                            onChange={(e) => setProdutoForm({...produtoForm, modelo: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="valorUnitario">Valor Unitário</Label>
                        <Input
                          id="valorUnitario"
                          type="number"
                          min="0"
                          step="0.01"
                          value={produtoForm.valorUnitario}
                          onChange={(e) => setProdutoForm({...produtoForm, valorUnitario: parseFloat(e.target.value) || 0})}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Valor Total: {formatCurrency(produtoForm.quantidade * produtoForm.valorUnitario)}
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="especificacoes">Especificações</Label>
                        <Textarea
                          id="especificacoes"
                          value={produtoForm.especificacoes}
                          onChange={(e) => setProdutoForm({...produtoForm, especificacoes: e.target.value})}
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowProdutoModal(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveProduto}>
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Licitante</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Marca</TableHead>
                      <TableHead>Modelo</TableHead>
                      <TableHead>Qtd</TableHead>
                      <TableHead>Valor Unit.</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {produtos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                          Nenhum produto cadastrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      produtos.map((produto) => {
                        const licitante = licitantes.find(l => l.id === produto.licitanteId);
                        return (
                          <TableRow key={produto.id}>
                            <TableCell className="font-medium">
                              {licitante?.empresa || 'N/A'}
                            </TableCell>
                            <TableCell>{produto.codigo}</TableCell>
                            <TableCell>{produto.descricao}</TableCell>
                            <TableCell>{produto.marca}</TableCell>
                            <TableCell>{produto.modelo}</TableCell>
                            <TableCell>{produto.quantidade}</TableCell>
                            <TableCell>{formatCurrency(produto.valorUnitario)}</TableCell>
                            <TableCell className="font-bold">{formatCurrency(produto.valorTotal)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEditProduto(produto)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => handleDeleteProduto(produto.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabelaLicitantes;
