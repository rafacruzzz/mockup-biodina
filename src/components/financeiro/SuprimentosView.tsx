import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { 
  Plus, Search, FileText, Package, Users, AlertCircle,
  CheckCircle, Clock, X, Upload
} from "lucide-react";

const SuprimentosView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [showNovaRequisicaoModal, setShowNovaRequisicaoModal] = useState(false);

  // Mock data para requisições de suprimentos - Módulo Cinthia
  const requisicoesSuprimentos = [
    {
      id: "SUP-001",
      departamento: "Administrativo",
      solicitante: "Maria Silva",
      descricao: "Material de escritório - Papéis e canetas",
      categoria: "Material Escritório",
      valorEstimado: 500.00,
      cotacoes: 3,
      status: "Aguardando Cotação",
      dataRequisicao: "2025-01-20",
      projeto: null,
      justificativa: ""
    },
    {
      id: "SUP-002", 
      departamento: "TI",
      solicitante: "João Santos",
      descricao: "Equipamentos de informática - Cabos e adaptadores",
      categoria: "Equipamentos TI",
      valorEstimado: 1200.00,
      cotacoes: 3,
      status: "Cotado - Análise",
      dataRequisicao: "2025-01-18",
      projeto: "Modernização TI",
      justificativa: ""
    },
    {
      id: "SUP-003",
      departamento: "Produção",
      solicitante: "Carlos Oliveira", 
      descricao: "Matéria prima - Componentes especiais",
      categoria: "Produção",
      valorEstimado: 5500.00,
      cotacoes: 2,
      status: "Pendente Justificativa",
      dataRequisicao: "2025-01-15",
      projeto: "Projeto Cliente X",
      justificativa: "Fornecedor único no mercado nacional"
    },
    {
      id: "SUP-004",
      departamento: "Comercial",
      solicitante: "Ana Costa",
      descricao: "Material promocional - Brindes corporativos",
      categoria: "Marketing",
      valorEstimado: 800.00,
      cotacoes: 3,
      status: "Aprovado - Enviar CP",
      dataRequisicao: "2025-01-12",
      projeto: "Campanha Q1",
      justificativa: ""
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aguardando Cotação': return 'bg-yellow-500';
      case 'Cotado - Análise': return 'bg-blue-500';
      case 'Pendente Justificativa': return 'bg-orange-500';
      case 'Aprovado - Enviar CP': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aguardando Cotação': return <Clock className="h-4 w-4" />;
      case 'Cotado - Análise': return <FileText className="h-4 w-4" />;
      case 'Pendente Justificativa': return <AlertCircle className="h-4 w-4" />;
      case 'Aprovado - Enviar CP': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleNovaRequisicao = () => {
    toast({
      title: "Requisição Criada",
      description: "Nova requisição de suprimentos criada com sucesso.",
    });
    setShowNovaRequisicaoModal(false);
  };

  const filteredRequisicoes = requisicoesSuprimentos.filter(req => {
    const matchesSearch = req.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.departamento.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Suprimentos (Módulo Cinthia)</h2>
          <p className="text-muted-foreground">Gestão de requisições de suprimentos - Uso e Consumo</p>
        </div>
        <Dialog open={showNovaRequisicaoModal} onOpenChange={setShowNovaRequisicaoModal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Requisição
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      {/* Resumo por Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aguardando Cotações</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Em Análise</p>
                <p className="text-2xl font-bold text-blue-600">1</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendente Justif.</p>
                <p className="text-2xl font-bold text-orange-600">1</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Valor</p>
                <p className="text-2xl font-bold text-green-600">R$ 8.000</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Requisições */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Requisições de Suprimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Input
                placeholder="Pesquisar por descrição, departamento ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-96"
              />
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="Aguardando Cotação">Aguardando Cotação</SelectItem>
                <SelectItem value="Cotado - Análise">Cotado - Análise</SelectItem>
                <SelectItem value="Pendente Justificativa">Pendente Justificativa</SelectItem>
                <SelectItem value="Aprovado - Enviar CP">Aprovado - Enviar CP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Cotações</TableHead>
                <TableHead>Valor Est.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequisicoes.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id}</TableCell>
                  <TableCell>{req.departamento}</TableCell>
                  <TableCell>{req.solicitante}</TableCell>
                  <TableCell>{req.descricao}</TableCell>
                  <TableCell>
                    <Badge variant={req.cotacoes >= 3 ? "default" : "destructive"}>
                      {req.cotacoes}/3
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(req.valorEstimado)}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(req.status)} text-white flex items-center gap-1 w-fit`}>
                      {getStatusIcon(req.status)}
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">Ver</Button>
                      {req.status === "Pendente Justificativa" && (
                        <Button size="sm">Justificar</Button>
                      )}
                      {req.status === "Aprovado - Enviar CP" && (
                        <Button size="sm">Enviar CP</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Nova Requisição */}
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Nova Requisição de Suprimentos</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="dados" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dados">Dados Gerais</TabsTrigger>
            <TabsTrigger value="cotacoes">Sistema de Cotações</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dados" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento Solicitante</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                    <SelectItem value="ti">TI</SelectItem>
                    <SelectItem value="producao">Produção</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="rh">RH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="solicitante">Colaborador Solicitante</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o colaborador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maria">Maria Silva</SelectItem>
                    <SelectItem value="joao">João Santos</SelectItem>
                    <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                    <SelectItem value="ana">Ana Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria do material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="escritorio">Material Escritório</SelectItem>
                    <SelectItem value="ti">Equipamentos TI</SelectItem>
                    <SelectItem value="producao">Produção</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valor">Valor Estimado</Label>
                <Input 
                  id="valor"
                  type="number"
                  placeholder="0,00"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição Detalhada</Label>
              <Textarea 
                id="descricao"
                placeholder="Descreva detalhadamente os materiais/suprimentos necessários..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projeto">Projeto/Cliente (Opcional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Vincular a projeto específico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="projeto-x">Projeto Cliente X</SelectItem>
                  <SelectItem value="campanha-q1">Campanha Q1</SelectItem>
                  <SelectItem value="modernizacao-ti">Modernização TI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="cotacoes" className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Sistema de 3 Cotações Obrigatórias</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    É obrigatório obter pelo menos 3 cotações de fornecedores diferentes. 
                    Caso não seja possível, uma justificativa detalhada deve ser fornecida.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Fornecedor 1</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="Nome do fornecedor" />
                  <Input placeholder="Valor cotado" type="number" />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Anexar Cotação
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Fornecedor 2</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="Nome do fornecedor" />
                  <Input placeholder="Valor cotado" type="number" />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Anexar Cotação
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Fornecedor 3</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="Nome do fornecedor" />
                  <Input placeholder="Valor cotado" type="number" />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Anexar Cotação
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="justificativa">Justificativa (se não atingir 3 cotações)</Label>
              <Textarea 
                id="justificativa"
                placeholder="Justifique por que não foi possível obter 3 cotações (ex: fornecedor único, urgência, etc.)"
                rows={3}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="documentos" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>E-mail da Requisição (Obrigatório)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Clique para fazer upload ou arraste o arquivo</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Requisição Formal (Obrigatório)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Clique para fazer upload ou arraste o arquivo</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Cotações (3 obrigatórias)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Anexe as 3 cotações em formato PDF</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setShowNovaRequisicaoModal(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleNovaRequisicao}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Criar Requisição
          </Button>
        </div>
      </DialogContent>
    </div>
  );
};

export default SuprimentosView;