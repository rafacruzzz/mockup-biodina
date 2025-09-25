import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Search, Package, FileText, AlertCircle, 
  CheckCircle, Clock, Upload, Building2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UsoConsumoView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [showNovaRequisicaoModal, setShowNovaRequisicaoModal] = useState(false);
  const { toast } = useToast();

  // Mock data para requisições de suprimentos
  const requisicoesSuprimentos = [
    {
      id: "SUP001",
      descricao: "Material de escritório",
      setor: "Administrativo",
      projeto: "PROJ-2025-001",
      valorAprovado: 2500.00,
      fornecedorEscolhido: "Papelaria Central",
      status: "Aguardando Cotações",
      cotacoes: 1,
      dataRequisicao: "2025-01-15",
      justificativa: ""
    },
    {
      id: "SUP002",
      descricao: "Equipamentos de segurança",
      setor: "Produção",
      projeto: "PROJ-2025-002",
      valorAprovado: 8500.00,
      fornecedorEscolhido: "Segurança Total",
      status: "Aprovado",
      cotacoes: 3,
      dataRequisicao: "2025-01-10",
      justificativa: ""
    },
    {
      id: "SUP003",
      descricao: "Produtos de limpeza",
      setor: "Facilities",
      projeto: "",
      valorAprovado: 1200.00,
      fornecedorEscolhido: "",
      status: "Pendente Vinculação",
      cotacoes: 0,
      dataRequisicao: "2025-01-20",
      justificativa: "Produto de uso específico disponível apenas em fornecedor único"
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
      case 'Aprovado':
        return 'bg-green-500';
      case 'Aguardando Cotações':
        return 'bg-yellow-500';
      case 'Pendente Vinculação':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <CheckCircle className="h-4 w-4" />;
      case 'Aguardando Cotações':
        return <Clock className="h-4 w-4" />;
      case 'Pendente Vinculação':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleNovaRequisicao = () => {
    toast({
      title: "Sucesso",
      description: "Nova requisição de suprimentos criada com sucesso!"
    });
    setShowNovaRequisicaoModal(false);
  };

  const NovaRequisicaoModal = () => (
    <Dialog open={showNovaRequisicaoModal} onOpenChange={setShowNovaRequisicaoModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Nova Requisição de Suprimentos
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="dados-gerais" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
            <TabsTrigger value="cotacoes">Cotações</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="dados-gerais" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea 
                  id="descricao"
                  placeholder="Descreva detalhadamente os itens solicitados"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setor">Setor Solicitante *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                    <SelectItem value="producao">Produção</SelectItem>
                    <SelectItem value="vendas">Vendas</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projeto">Projeto/Produto *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proj-001">PROJ-2025-001</SelectItem>
                    <SelectItem value="proj-002">PROJ-2025-002</SelectItem>
                    <SelectItem value="sem-vinculacao">Sem Vinculação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor-estimado">Valor Estimado</Label>
                <Input 
                  id="valor-estimado"
                  placeholder="R$ 0,00"
                  type="text"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="justificativa">Justificativa para Não Vinculação</Label>
              <Textarea 
                id="justificativa"
                placeholder="Obrigatório caso não haja vinculação a projeto/produto"
              />
            </div>
          </TabsContent>

          <TabsContent value="cotacoes" className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-800">Regra de Cotações</h4>
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                São obrigatórias 3 cotações para valores acima de R$ 1.000,00. 
                Caso não seja possível obter 3 cotações, justifique o motivo.
              </p>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((num) => (
                <Card key={num}>
                  <CardHeader>
                    <CardTitle className="text-lg">Cotação {num}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Fornecedor</Label>
                        <Input placeholder="Nome do fornecedor" />
                      </div>
                      <div className="space-y-2">
                        <Label>Valor</Label>
                        <Input placeholder="R$ 0,00" />
                      </div>
                      <div className="space-y-2">
                        <Label>Prazo de Entrega</Label>
                        <Input placeholder="Ex: 5 dias úteis" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Anexar Cotação</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Clique para anexar ou arraste o arquivo aqui
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Justificativa para Menos de 3 Cotações</Label>
              <Textarea placeholder="Caso não seja possível obter 3 cotações, justifique aqui" />
            </div>
          </TabsContent>

          <TabsContent value="documentos" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documentos Obrigatórios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Requisição Formal Assinada",
                    "E-mail de Solicitação",
                    "Especificações Técnicas",
                    "Orçamento Aprovado"
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{doc}</span>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Anexar
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setShowNovaRequisicaoModal(false)}>
            Cancelar
          </Button>
          <Button onClick={handleNovaRequisicao}>
            Criar Requisição
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Uso e Consumo - Suprimentos</h1>
          <p className="text-muted-foreground">Módulo Cinthia - Gestão de requisições de suprimentos</p>
        </div>
        <Button onClick={() => setShowNovaRequisicaoModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Requisição
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aguardando Cotações</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aprovadas</p>
                <p className="text-2xl font-bold text-green-600">1</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendente Vinculação</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-primary">R$ 12.200</p>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Tabela */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Requisições de Suprimentos
            </CardTitle>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Pesquisar requisições..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="aguardando">Aguardando Cotações</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="pendente">Pendente Vinculação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Cotações</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requisicoesSuprimentos.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id}</TableCell>
                  <TableCell>{req.descricao}</TableCell>
                  <TableCell>{req.setor}</TableCell>
                  <TableCell>{req.projeto || "Não vinculado"}</TableCell>
                  <TableCell>{req.cotacoes}/3</TableCell>
                  <TableCell>{formatCurrency(req.valorAprovado)}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(req.status)} text-white flex items-center gap-1 w-fit`}>
                      {getStatusIcon(req.status)}
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NovaRequisicaoModal />
    </div>
  );
};

export default UsoConsumoView;