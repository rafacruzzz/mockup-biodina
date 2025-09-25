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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { 
  Plus, Search, Plane, Hotel, CreditCard, Calendar as CalendarIcon,
  MapPin, Clock, DollarSign, FileText, Upload, X, CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const DespesasViagemServicosView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [showNovaDespesaModal, setShowNovaDespesaModal] = useState(false);
  const [date, setDate] = useState<Date>();

  // Mock data para despesas de viagem e serviços
  const despesasViagem = [
    {
      id: "VG-001",
      tipo: "Passagem",
      colaborador: "João Silva",
      destino: "São Paulo - SP",
      projeto: "Projeto Cliente ABC",
      periodo: "20/01 a 22/01",
      valor: 850.00,
      status: "Pendente Aprovação",
      formaPagamento: "Cartão Corporativo"
    },
    {
      id: "VG-002", 
      tipo: "Hospedagem",
      colaborador: "Maria Santos",
      destino: "Rio de Janeiro - RJ",
      projeto: "Negociação Contrato XYZ",
      periodo: "15/01 a 17/01",
      valor: 1200.00,
      status: "Aprovada",
      formaPagamento: "Reembolso"
    },
    {
      id: "VG-003",
      tipo: "Cartão Crédito",
      colaborador: "Carlos Oliveira",
      destino: "Belo Horizonte - MG",
      projeto: "Projeto Expansão",
      periodo: "10/01 a 12/01",
      valor: 650.00,
      status: "Pago",
      formaPagamento: "Cartão Corporativo"
    },
    {
      id: "VG-004",
      tipo: "Passagem",
      colaborador: "Ana Costa",
      destino: "Brasília - DF", 
      projeto: "Reunião Estratégica",
      periodo: "25/01 a 26/01",
      valor: 1100.00,
      status: "Rejeitada",
      formaPagamento: "Adiantamento"
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
      case 'Pendente Aprovação': return 'bg-yellow-500';
      case 'Aprovada': return 'bg-blue-500';
      case 'Pago': return 'bg-green-500';
      case 'Rejeitada': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Passagem': return <Plane className="h-4 w-4" />;
      case 'Hospedagem': return <Hotel className="h-4 w-4" />;
      case 'Cartão Crédito': return <CreditCard className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleNovaDespesa = () => {
    toast({
      title: "Despesa Criada",
      description: "Nova despesa de viagem/serviço criada com sucesso.",
    });
    setShowNovaDespesaModal(false);
  };

  const filteredDespesas = despesasViagem.filter(desp => {
    const matchesSearch = desp.destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         desp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         desp.colaborador.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === 'todos' || desp.tipo === filterTipo;
    return matchesSearch && matchesTipo;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Despesas de Viagem e Serviços</h2>
          <p className="text-muted-foreground">Passagens, hospedagem e despesas com cartão corporativo</p>
        </div>
        <Button onClick={() => setShowNovaDespesaModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Despesa
        </Button>
      </div>

      {/* Resumo por Tipo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Passagens</p>
                <p className="text-2xl font-bold text-blue-600">{despesasViagem.filter(d => d.tipo === 'Passagem').length}</p>
              </div>
              <Plane className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hospedagem</p>
                <p className="text-2xl font-bold text-green-600">{despesasViagem.filter(d => d.tipo === 'Hospedagem').length}</p>
              </div>
              <Hotel className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cartão Corporativo</p>
                <p className="text-2xl font-bold text-purple-600">{despesasViagem.filter(d => d.tipo === 'Cartão Crédito').length}</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Valor</p>
                <p className="text-2xl font-bold text-orange-600">R$ 3.800</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Despesas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Despesas de Viagem e Serviços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Input
                placeholder="Pesquisar por destino, colaborador ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-96"
              />
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="Passagem">Passagem</SelectItem>
                <SelectItem value="Hospedagem">Hospedagem</SelectItem>
                <SelectItem value="Cartão Crédito">Cartão Crédito</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
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
              {filteredDespesas.map((despesa) => (
                <TableRow key={despesa.id}>
                  <TableCell className="font-medium">{despesa.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      {getTipoIcon(despesa.tipo)}
                      {despesa.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>{despesa.colaborador}</TableCell>
                  <TableCell>{despesa.destino}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{despesa.projeto}</Badge>
                  </TableCell>
                  <TableCell>{despesa.periodo}</TableCell>
                  <TableCell>{formatCurrency(despesa.valor)}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(despesa.status)} text-white`}>
                      {despesa.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">Ver</Button>
                      {despesa.status === "Pendente Aprovação" && (
                        <Button size="sm">Aprovar</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Nova Despesa */}
      <Dialog open={showNovaDespesaModal} onOpenChange={setShowNovaDespesaModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Nova Despesa de Viagem/Serviço</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="dados" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dados">Dados Gerais</TabsTrigger>
              <TabsTrigger value="projeto">Projeto/Vinculação</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dados" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Despesa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passagem">
                        <div className="flex items-center gap-2">
                          <Plane className="h-4 w-4" />
                          Passagem
                        </div>
                      </SelectItem>
                      <SelectItem value="hospedagem">
                        <div className="flex items-center gap-2">
                          <Hotel className="h-4 w-4" />
                          Hospedagem
                        </div>
                      </SelectItem>
                      <SelectItem value="cartao">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Cartão Crédito
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="colaborador">Colaborador</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o colaborador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva</SelectItem>
                      <SelectItem value="maria">Maria Santos</SelectItem>
                      <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                      <SelectItem value="ana">Ana Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destino">Destino</Label>
                  <Input 
                    id="destino"
                    placeholder="Cidade - Estado"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor</Label>
                  <Input 
                    id="valor"
                    type="number"
                    placeholder="0,00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Data de Início</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Selecionar data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Data de Fim</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Selecionar data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição/Justificativa</Label>
                <Textarea 
                  id="descricao"
                  placeholder="Descreva o motivo da viagem e detalhes da despesa..."
                  rows={3}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="projeto" className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Vinculação Obrigatória a Projeto</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Todas as despesas de viagem devem estar vinculadas a um projeto específico para controle de custos.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Projeto Principal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="projeto-abc">Projeto Cliente ABC</SelectItem>
                      <SelectItem value="negociacao-xyz">Negociação Contrato XYZ</SelectItem>
                      <SelectItem value="projeto-expansao">Projeto Expansão</SelectItem>
                      <SelectItem value="reuniao-estrategica">Reunião Estratégica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Cliente/Beneficiário</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cliente-1">Cliente ABC Ltda</SelectItem>
                      <SelectItem value="cliente-2">Empresa XYZ S.A.</SelectItem>
                      <SelectItem value="interno">Uso Interno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Centro de Custo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Centro de custo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="administrativo">Administrativo</SelectItem>
                      <SelectItem value="operacional">Operacional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Forma de Pagamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Como será pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cartao">Cartão Corporativo</SelectItem>
                      <SelectItem value="reembolso">Reembolso</SelectItem>
                      <SelectItem value="adiantamento">Adiantamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documentos" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>E-mail de Solicitação (Obrigatório)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Anexe o e-mail com a solicitação da viagem</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Comprovantes/Recibos</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Anexe comprovantes de passagens, hospedagem ou despesas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowNovaDespesaModal(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleNovaDespesa}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Criar Despesa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DespesasViagemServicosView;