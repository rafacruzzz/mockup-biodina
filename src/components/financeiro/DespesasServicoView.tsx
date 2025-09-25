import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Plus, Search, Plane, Hotel, FileText, MapPin,
  CheckCircle, Clock, Upload, CalendarIcon, User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DespesasServicoView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [showNovaDespesaModal, setShowNovaDespesaModal] = useState(false);
  const [dataInicio, setDataInicio] = useState<Date>();
  const [dataFim, setDataFim] = useState<Date>();
  const { toast } = useToast();

  // Mock data para despesas de serviço
  const despesasServico = [
    {
      id: "DS001",
      tipo: "Passagem",
      descricao: "Viagem para reunião com cliente",
      colaborador: "João Silva",
      destino: "São Paulo - SP",
      projetoVenda: "VENDA-2025-001",
      dataInicio: "2025-01-25",
      dataFim: "2025-01-26",
      valor: 850.00,
      status: "Aprovado",
      documentos: ["passagem", "justificativa"]
    },
    {
      id: "DS002",
      tipo: "Hospedagem",
      descricao: "Hotel para reunião comercial",
      colaborador: "Maria Santos",
      destino: "Rio de Janeiro - RJ",
      projetoVenda: "VENDA-2025-002",
      dataInicio: "2025-02-01",
      dataFim: "2025-02-03",
      valor: 1200.00,
      status: "Pendente Aprovação",
      documentos: ["reserva"]
    },
    {
      id: "DS003",
      tipo: "Passagem",
      descricao: "Treinamento técnico",
      colaborador: "Carlos Oliveira",
      destino: "Brasília - DF",
      projetoVenda: "",
      dataInicio: "2025-02-10",
      dataFim: "2025-02-12",
      valor: 920.00,
      status: "Rejeitado",
      documentos: ["passagem"]
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
      case 'Pendente Aprovação':
        return 'bg-yellow-500';
      case 'Rejeitado':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Passagem':
        return <Plane className="h-4 w-4" />;
      case 'Hospedagem':
        return <Hotel className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleNovaDespesa = () => {
    toast({
      title: "Sucesso",
      description: "Nova despesa de serviço criada com sucesso!"
    });
    setShowNovaDespesaModal(false);
  };

  const NovaDespesaModal = () => (
    <Dialog open={showNovaDespesaModal} onOpenChange={setShowNovaDespesaModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Nova Despesa de Serviço
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="dados-gerais" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
            <TabsTrigger value="projeto-vinculacao">Projeto/Vinculação</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="dados-gerais" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Despesa *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passagem">Passagem</SelectItem>
                    <SelectItem value="hospedagem">Hospedagem</SelectItem>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="transporte">Transporte Local</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="colaborador">Colaborador *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o colaborador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                    <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destino">Destino *</Label>
                <Input 
                  id="destino"
                  placeholder="Ex: São Paulo - SP"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor Estimado</Label>
                <Input 
                  id="valor"
                  placeholder="R$ 0,00"
                  type="text"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data de Início *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataInicio ? format(dataInicio, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dataInicio}
                      onSelect={setDataInicio}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Data de Fim *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataFim ? format(dataFim, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dataFim}
                      onSelect={setDataFim}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição/Justificativa *</Label>
              <Textarea 
                id="descricao"
                placeholder="Descreva o motivo da viagem e atividades a serem realizadas"
              />
            </div>
          </TabsContent>

          <TabsContent value="projeto-vinculacao" className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-800">Regras de Vinculação</h4>
              </div>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• <strong>Passagens:</strong> Vinculação obrigatória a projeto de vendas</li>
                <li>• <strong>Hospedagem:</strong> Vinculação obrigatória a projeto (vendas ou interno)</li>
                <li>• Justificativa obrigatória para despesas sem vinculação</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoria-projeto">Categoria do Projeto *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendas">Projeto de Vendas</SelectItem>
                    <SelectItem value="interno">Projeto Interno</SelectItem>
                    <SelectItem value="treinamento">Treinamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projeto">Projeto *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venda-001">VENDA-2025-001</SelectItem>
                    <SelectItem value="venda-002">VENDA-2025-002</SelectItem>
                    <SelectItem value="interno-001">INTERNO-2025-001</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente (se aplicável)</Label>
              <Input 
                id="cliente"
                placeholder="Nome do cliente relacionado ao projeto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="justificativa-vinculacao">Justificativa para Não Vinculação</Label>
              <Textarea 
                id="justificativa-vinculacao"
                placeholder="Obrigatório caso não haja vinculação a projeto"
              />
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
                    "Autorização de Viagem",
                    "Comprovante de Reserva/Passagem",
                    "Justificativa Comercial",
                    "Relatório de Viagem (após retorno)"
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
          <Button variant="outline" onClick={() => setShowNovaDespesaModal(false)}>
            Cancelar
          </Button>
          <Button onClick={handleNovaDespesa}>
            Criar Despesa
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
          <h1 className="text-2xl font-bold text-foreground">Despesas a Serviço</h1>
          <p className="text-muted-foreground">Passagens, hospedagem e outras despesas de viagem</p>
        </div>
        <Button onClick={() => setShowNovaDespesaModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Despesa
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Passagens</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
              </div>
              <Plane className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hospedagem</p>
                <p className="text-2xl font-bold text-green-600">1</p>
              </div>
              <Hotel className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendente Aprovação</p>
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
                <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-primary">R$ 2.970</p>
              </div>
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Tabela */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Despesas de Serviço
            </CardTitle>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Pesquisar despesas..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="passagem">Passagem</SelectItem>
                <SelectItem value="hospedagem">Hospedagem</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Colaborador</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {despesasServico.map((despesa) => (
                <TableRow key={despesa.id}>
                  <TableCell className="font-medium">{despesa.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTipoIcon(despesa.tipo)}
                      {despesa.tipo}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {despesa.colaborador}
                    </div>
                  </TableCell>
                  <TableCell>{despesa.destino}</TableCell>
                  <TableCell>{despesa.projetoVenda || "Não vinculado"}</TableCell>
                  <TableCell>{despesa.dataInicio} a {despesa.dataFim}</TableCell>
                  <TableCell>{formatCurrency(despesa.valor)}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(despesa.status)} text-white`}>
                      {despesa.status}
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

      <NovaDespesaModal />
    </div>
  );
};

export default DespesasServicoView;