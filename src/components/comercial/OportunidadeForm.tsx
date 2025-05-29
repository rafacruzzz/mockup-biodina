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
import { X, Save, FileText, Users, History, BarChart3, Plus, Edit, Trash2 } from "lucide-react";

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

const OportunidadeForm = ({ oportunidade, onClose, onSave }: OportunidadeFormProps) => {
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
    // Campos específicos para Em Triagem
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nome: oportunidade?.nome || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    cep: oportunidade?.cep || '',
    cidade: oportunidade?.cidade || '',
    estado: oportunidade?.estado || '',
    email: oportunidade?.email || '',
    motivoPerda: oportunidade?.motivoPerda || '',
    // Campos específicos para Em Acompanhamento
    chaveLicitacao: oportunidade?.chaveLicitacao || '',
    dataLicitacao: oportunidade?.dataLicitacao || '',
    resumoEdital: oportunidade?.resumoEdital || '',
    analiseTecnica: oportunidade?.analiseTecnica || '',
    concorrencia: oportunidade?.concorrencia || '',
    // Campos de produtos e serviços
    produtos: oportunidade?.produtos || [],
    servicos: oportunidade?.servicos || []
  });

  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>(formData.produtos);
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>(formData.servicos);

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
      case 'Em Acompanhamento': return 'bg-orange-500';
      case 'Perdida': return 'bg-red-500';
      case 'Cancelada': return 'bg-gray-500';
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
    setProdutosSelecionados(prev => 
      prev.includes(produtoNome) 
        ? prev.filter(p => p !== produtoNome)
        : [...prev, produtoNome]
    );
  };

  const handleServicoToggle = (servicoNome: string) => {
    setServicosSelecionados(prev => 
      prev.includes(servicoNome) 
        ? prev.filter(s => s !== servicoNome)
        : [...prev, servicoNome]
    );
  };

  const renderCamposTriagem = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
        <Input
          id="cpfCnpj"
          value={formData.cpfCnpj}
          onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          value={formData.nome}
          onChange={(e) => setFormData({...formData, nome: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="razaoSocial">Razão Social</Label>
        <Input
          id="razaoSocial"
          value={formData.razaoSocial}
          onChange={(e) => setFormData({...formData, razaoSocial: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="endereco">Endereço</Label>
        <Input
          id="endereco"
          value={formData.endereco}
          onChange={(e) => setFormData({...formData, endereco: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="cep">CEP</Label>
        <Input
          id="cep"
          value={formData.cep}
          onChange={(e) => setFormData({...formData, cep: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="cidade">Cidade</Label>
        <Input
          id="cidade"
          value={formData.cidade}
          onChange={(e) => setFormData({...formData, cidade: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="estado">Estado</Label>
        <Input
          id="estado"
          value={formData.estado}
          onChange={(e) => setFormData({...formData, estado: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      {(formData.status === 'Perdida' || formData.status === 'Cancelada') && (
        <div className="col-span-2">
          <Label htmlFor="motivoPerda">Motivo de Perda/Cancelamento</Label>
          <Textarea
            id="motivoPerda"
            value={formData.motivoPerda}
            onChange={(e) => setFormData({...formData, motivoPerda: e.target.value})}
            rows={3}
          />
        </div>
      )}
    </div>
  );

  const renderCamposAcompanhamento = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="chaveLicitacao">Chave da Licitação</Label>
        <Input
          id="chaveLicitacao"
          value={formData.chaveLicitacao}
          onChange={(e) => setFormData({...formData, chaveLicitacao: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="dataLicitacao">Data da Licitação</Label>
        <Input
          id="dataLicitacao"
          type="date"
          value={formData.dataLicitacao}
          onChange={(e) => setFormData({...formData, dataLicitacao: e.target.value})}
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="resumoEdital">Resumo do Edital</Label>
        <Textarea
          id="resumoEdital"
          value={formData.resumoEdital}
          onChange={(e) => setFormData({...formData, resumoEdital: e.target.value})}
          rows={3}
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="analiseTecnica" className={!formData.analiseTecnica ? 'text-red-500' : ''}>
          Análise Técnica {!formData.analiseTecnica && '(Obrigatório)'}
        </Label>
        <Textarea
          id="analiseTecnica"
          value={formData.analiseTecnica}
          onChange={(e) => setFormData({...formData, analiseTecnica: e.target.value})}
          rows={3}
          className={!formData.analiseTecnica ? 'border-red-500' : ''}
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="concorrencia" className={!formData.concorrencia ? 'text-red-500' : ''}>
          Concorrência {!formData.concorrencia && '(Obrigatório)'}
        </Label>
        <Textarea
          id="concorrencia"
          value={formData.concorrencia}
          onChange={(e) => setFormData({...formData, concorrencia: e.target.value})}
          rows={3}
          className={!formData.concorrencia ? 'border-red-500' : ''}
        />
      </div>
    </div>
  );

  const renderCamposFinais = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <Label>Resumo dos Dados Principais</Label>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p><strong>Cliente:</strong> {formData.cliente}</p>
          <p><strong>Contato:</strong> {formData.contato}</p>
          <p><strong>Valor:</strong> {formatCurrency(formData.valor)}</p>
        </div>
      </div>
      {formData.status === 'Ganha' && (
        <div className="col-span-2">
          <Label htmlFor="motivoGanho">Motivo do Ganho</Label>
          <Textarea
            id="motivoGanho"
            rows={3}
            placeholder="Descreva os fatores que levaram ao sucesso..."
          />
        </div>
      )}
      {(formData.status === 'Perdida' || formData.status === 'Cancelada') && (
        <div className="col-span-2">
          <Label htmlFor="motivoPerda">Motivo de Perda/Cancelamento</Label>
          <Textarea
            id="motivoPerda"
            value={formData.motivoPerda}
            onChange={(e) => setFormData({...formData, motivoPerda: e.target.value})}
            rows={3}
          />
        </div>
      )}
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
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="geral" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger value="analise" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Análise Técnica
              </TabsTrigger>
              <TabsTrigger 
                value="pedidos" 
                className="flex items-center gap-2"
                disabled={formData.status !== 'Ganha'}
              >
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
                {/* Campos básicos sempre visíveis */}
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
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Em Triagem">Em Triagem</SelectItem>
                        <SelectItem value="Em Acompanhamento">Em Acompanhamento</SelectItem>
                        <SelectItem value="Ganha">Ganha</SelectItem>
                        <SelectItem value="Perdida">Perdida</SelectItem>
                        <SelectItem value="Cancelada">Cancelada</SelectItem>
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

                {/* Seção de Produtos e Serviços */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-semibold">Dados do Lead/Negócio</h3>
                  
                  <div>
                    <Label>Produto(s)</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {produtosCadastro.map((produto) => (
                        <div key={produto.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`produto-${produto.id}`}
                            checked={produtosSelecionados.includes(produto.nome)}
                            onCheckedChange={() => handleProdutoToggle(produto.nome)}
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
                          />
                          <Label htmlFor={`servico-${servico.id}`} className="text-sm">
                            {servico.nome}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Campos condicionais baseados no status */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-semibold">
                    {formData.status === 'Em Triagem' && 'Informações de Triagem'}
                    {formData.status === 'Em Acompanhamento' && 'Informações de Acompanhamento'}
                    {(formData.status === 'Ganha' || formData.status === 'Perdida' || formData.status === 'Cancelada') && 'Informações Finais'}
                  </h3>
                  
                  {formData.status === 'Em Triagem' && renderCamposTriagem()}
                  {formData.status === 'Em Acompanhamento' && renderCamposAcompanhamento()}
                  {(formData.status === 'Ganha' || formData.status === 'Perdida' || formData.status === 'Cancelada') && renderCamposFinais()}
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OportunidadeForm;
