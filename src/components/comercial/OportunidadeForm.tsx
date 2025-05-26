
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Save, FileText, Users, History, BarChart3, Plus, Edit, Trash2 } from "lucide-react";

interface OportunidadeFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (oportunidade: any) => void;
}

const OportunidadeForm = ({ oportunidade, onClose, onSave }: OportunidadeFormProps) => {
  const [formData, setFormData] = useState({
    codigo: oportunidade?.codigo || '',
    cliente: oportunidade?.cliente || '',
    contato: oportunidade?.contato || '',
    telefone: oportunidade?.telefone || '',
    responsavel: oportunidade?.responsavel || '',
    origem: oportunidade?.origem || '',
    familiaComercial: oportunidade?.familiaComercial || '',
    situacao: oportunidade?.situacao || 'em_analise',
    tipoAplicacao: oportunidade?.tipoAplicacao || 'venda',
    tipoOportunidade: oportunidade?.tipoOportunidade || 'pontual',
    valor: oportunidade?.valor || 0,
    dataAbertura: oportunidade?.dataAbertura || '',
    dataContato: oportunidade?.dataContato || '',
    descricao: oportunidade?.descricao || '',
    observacoes: oportunidade?.observacoes || ''
  });

  // Dados de exemplo para análise técnica
  const [concorrentes, setConcorrentes] = useState([
    { id: 1, nome: 'DroneTech Ltda', produto: 'Phantom 4 Pro', preco: 42000 },
    { id: 2, nome: 'AgroSky Solutions', produto: 'Mavic 3 Agriculture', preco: 38500 }
  ]);

  // Dados de exemplo para pedidos
  const [pedidos, setPedidos] = useState([
    { 
      id: 1, 
      numero: 'PED-001/2024', 
      tipo: 'Produto', 
      status: 'Em Análise', 
      valor: 125000,
      dataEntrega: '2024-03-15'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'ganha': return 'bg-green-500';
      case 'em_analise': return 'bg-yellow-500';
      case 'perdida': return 'bg-red-500';
      case 'cancelada': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle>
              {oportunidade ? `Oportunidade ${formData.codigo}` : 'Nova Oportunidade'}
            </CardTitle>
            <Badge className={`${getSituacaoColor(formData.situacao)} text-white`}>
              {formData.situacao}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="geral" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Geral
              </TabsTrigger>
              <TabsTrigger value="analise" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Análise Técnica
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="historico" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Histórico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="space-y-4 mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="codigo">Código da Oportunidade</Label>
                    <Input
                      id="codigo"
                      value={formData.codigo}
                      onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="situacao">Situação</Label>
                    <Select value={formData.situacao} onValueChange={(value: any) => setFormData({...formData, situacao: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="em_analise">Em Análise</SelectItem>
                        <SelectItem value="ganha">Ganha</SelectItem>
                        <SelectItem value="perdida">Perdida</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="valor">Valor (R$)</Label>
                    <Input
                      id="valor"
                      type="number"
                      value={formData.valor}
                      onChange={(e) => setFormData({...formData, valor: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cliente">Cliente / Instituição</Label>
                    <Input
                      id="cliente"
                      value={formData.cliente}
                      onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contato">Contato</Label>
                    <Input
                      id="contato"
                      value={formData.contato}
                      onChange={(e) => setFormData({...formData, contato: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="responsavel">Representante Comercial</Label>
                    <Input
                      id="responsavel"
                      value={formData.responsavel}
                      onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="familiaComercial">Família Comercial</Label>
                    <Input
                      id="familiaComercial"
                      value={formData.familiaComercial}
                      onChange={(e) => setFormData({...formData, familiaComercial: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="origem">Origem</Label>
                    <Input
                      id="origem"
                      value={formData.origem}
                      onChange={(e) => setFormData({...formData, origem: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tipoAplicacao">Tipo da Aplicação</Label>
                    <Select value={formData.tipoAplicacao} onValueChange={(value: any) => setFormData({...formData, tipoAplicacao: value})}>
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
                  <div>
                    <Label htmlFor="tipoOportunidade">Tipo da Oportunidade</Label>
                    <Select value={formData.tipoOportunidade} onValueChange={(value: any) => setFormData({...formData, tipoOportunidade: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pontual">Pontual</SelectItem>
                        <SelectItem value="periodica">Periódica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dataAbertura">Data de Abertura</Label>
                    <Input
                      id="dataAbertura"
                      type="date"
                      value={formData.dataAbertura}
                      onChange={(e) => setFormData({...formData, dataAbertura: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataContato">Data de Contato</Label>
                    <Input
                      id="dataContato"
                      type="date"
                      value={formData.dataContato}
                      onChange={(e) => setFormData({...formData, dataContato: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
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
                  <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Gerar Novo Pedido
                  </Button>
                </div>
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OportunidadeForm;
