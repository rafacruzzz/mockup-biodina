import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Search, FileText, CheckCircle, AlertTriangle, Package, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from "@radix-ui/react-icons"
import { Textarea } from "@/components/ui/textarea"
import PedidoForm from "./PedidoForm";

interface Oportunidade {
  id: number;
  cliente: string;
  nomeFantasia: string;
  dataAbertura: string;
  status: string;
  valorEstimado: number;
  probabilidade: number;
  dataFechamento: string;
  vendedor: string;
}

const oportunidadesData: Oportunidade[] = [
  {
    id: 1,
    cliente: "Empresa A",
    nomeFantasia: "Empresa A Inc.",
    dataAbertura: "2024-01-15",
    status: "Em Andamento",
    valorEstimado: 50000,
    probabilidade: 75,
    dataFechamento: "2024-03-30",
    vendedor: "João Silva",
  },
  {
    id: 2,
    cliente: "Empresa B",
    nomeFantasia: "B Solutions",
    dataAbertura: "2024-02-01",
    status: "Qualificação",
    valorEstimado: 30000,
    probabilidade: 50,
    dataFechamento: "2024-04-15",
    vendedor: "Maria Oliveira",
  },
  {
    id: 3,
    cliente: "Empresa C",
    nomeFantasia: "C Innovations",
    dataAbertura: "2024-02-10",
    status: "Proposta",
    valorEstimado: 75000,
    probabilidade: 90,
    dataFechamento: "2024-05-01",
    vendedor: "Carlos Pereira",
  },
  {
    id: 4,
    cliente: "Empresa D",
    nomeFantasia: "D Tech",
    dataAbertura: "2024-03-01",
    status: "Negociação",
    valorEstimado: 120000,
    probabilidade: 60,
    dataFechamento: "2024-06-15",
    vendedor: "Ana Souza",
  },
  {
    id: 5,
    cliente: "Empresa E",
    nomeFantasia: "E Global",
    dataAbertura: "2024-03-15",
    status: "Fechado",
    valorEstimado: 90000,
    probabilidade: 100,
    dataFechamento: "2024-07-01",
    vendedor: "Ricardo Alves",
  },
];

const ComercialTabs = () => {
  const [oportunidades, setOportunidades] = useState(oportunidadesData);
  const [selectedOportunidadeId, setSelectedOportunidadeId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Oportunidade | null>(null);
  const [isPedidoModalOpen, setIsPedidoModalOpen] = useState(false);
  const [isPedidoFormOpen, setIsPedidoFormOpen] = useState(false);
  const [selectedOportunidade, setSelectedOportunidade] = useState<any>(null);

  const { toast } = useToast()

  const handleEditarOportunidade = (id: number) => {
    const oportunidade = oportunidades.find((o) => o.id === id);
    if (oportunidade) {
      setSelectedOportunidadeId(id);
      setFormData({ ...oportunidade });
      setIsEditing(true);
    }
  };

  const handleSalvarOportunidade = () => {
    if (formData) {
      const updatedOportunidades = oportunidades.map((o) =>
        o.id === formData.id ? { ...formData } : o
      );
      setOportunidades(updatedOportunidades);
      setIsEditing(false);
      toast({
        title: "Sucesso!",
        description: "Oportunidade atualizada com sucesso.",
      })
    }
  };

  const handleExcluirOportunidade = (id: number) => {
    setOportunidades((prevOportunidades) =>
      prevOportunidades.filter((oportunidade) => oportunidade.id !== id)
    );
    toast({
      title: "Sucesso!",
      description: "Oportunidade excluída com sucesso.",
    })
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    } as any));
  };

  const handleStatusChange = (status: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: status,
    } as any));
  };

  const handleNovoPedido = (oportunidade: any) => {
    setSelectedOportunidade(oportunidade);
    setIsPedidoFormOpen(true);
  };

  const handleSavePedido = (pedido: any) => {
    console.log('Pedido salvo:', pedido);
    setIsPedidoFormOpen(false);
    setSelectedOportunidade(null);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="oportunidades" className="space-y-4">
        <TabsList>
          <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          <TabsTrigger value="expedicao">Expedição</TabsTrigger>
        </TabsList>
        <TabsContent value="oportunidades" className="space-y-4">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Lista de Oportunidades</CardTitle>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Oportunidade
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data Abertura</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor Estimado</TableHead>
                    <TableHead>Probabilidade</TableHead>
                    <TableHead>Data Fechamento</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {oportunidades.map((oportunidade) => (
                    <TableRow key={oportunidade.id}>
                      <TableCell>{oportunidade.nomeFantasia || oportunidade.cliente}</TableCell>
                      <TableCell>{oportunidade.dataAbertura}</TableCell>
                      <TableCell>
                        {oportunidade.status === "Em Andamento" && (
                          <Badge variant="secondary">Em Andamento</Badge>
                        )}
                        {oportunidade.status === "Qualificação" && (
                          <Badge variant="outline">Qualificação</Badge>
                        )}
                        {oportunidade.status === "Proposta" && (
                          <Badge>Proposta</Badge>
                        )}
                        {oportunidade.status === "Negociação" && (
                          <Badge variant="destructive">Negociação</Badge>
                        )}
                        {oportunidade.status === "Fechado" && (
                          <Badge variant="success">Fechado</Badge>
                        )}
                      </TableCell>
                      <TableCell>{oportunidade.valorEstimado}</TableCell>
                      <TableCell>{oportunidade.probabilidade}%</TableCell>
                      <TableCell>{oportunidade.dataFechamento}</TableCell>
                      <TableCell>{oportunidade.vendedor}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditarOportunidade(oportunidade.id)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleNovoPedido(oportunidade)}>
                              <FileText className="w-4 h-4 mr-2" />
                              Novo Pedido
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleExcluirOportunidade(oportunidade.id)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pedidos">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Lista de Pedidos</CardTitle>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Pedido
              </Button>
            </CardHeader>
            <CardContent>
              <p>Lista de pedidos será implementada aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expedicao">
          <Card>
            <CardHeader>
              <CardTitle>Expedição</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Informações de expedição serão exibidas aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isEditing && formData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Editar Oportunidade</CardTitle>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input
                    id="cliente"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                  <Input
                    id="nomeFantasia"
                    name="nomeFantasia"
                    value={formData.nomeFantasia}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dataAbertura">Data de Abertura</Label>
                  <Input
                    id="dataAbertura"
                    name="dataAbertura"
                    value={formData.dataAbertura}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="valorEstimado">Valor Estimado</Label>
                  <Input
                    id="valorEstimado"
                    name="valorEstimado"
                    value={formData.valorEstimado.toString()}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="probabilidade">Probabilidade (%)</Label>
                  <Input
                    id="probabilidade"
                    name="probabilidade"
                    value={formData.probabilidade.toString()}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="dataFechamento">Data de Fechamento</Label>
                  <Input
                    id="dataFechamento"
                    name="dataFechamento"
                    value={formData.dataFechamento}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="vendedor">Vendedor</Label>
                <Input
                  id="vendedor"
                  name="vendedor"
                  value={formData.vendedor}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <div className="flex gap-2">
                  <Button
                    variant={formData.status === "Em Andamento" ? "secondary" : "outline"}
                    onClick={() => handleStatusChange("Em Andamento")}
                  >
                    Em Andamento
                  </Button>
                  <Button
                    variant={formData.status === "Qualificação" ? "secondary" : "outline"}
                    onClick={() => handleStatusChange("Qualificação")}
                  >
                    Qualificação
                  </Button>
                  <Button
                    variant={formData.status === "Proposta" ? "secondary" : "outline"}
                    onClick={() => handleStatusChange("Proposta")}
                  >
                    Proposta
                  </Button>
                  <Button
                    variant={formData.status === "Negociação" ? "secondary" : "outline"}
                    onClick={() => handleStatusChange("Negociação")}
                  >
                    Negociação
                  </Button>
                  <Button
                    variant={formData.status === "Fechado" ? "secondary" : "outline"}
                    onClick={() => handleStatusChange("Fechado")}
                  >
                    Fechado
                  </Button>
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end space-x-2 p-4">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button className="bg-biodina-gold hover:bg-biodina-gold/90" onClick={handleSalvarOportunidade}>
                Salvar
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {/* Substituir PedidoModal por PedidoForm */}
      {isPedidoFormOpen && selectedOportunidade && (
        <PedidoForm
          onClose={() => {
            setIsPedidoFormOpen(false);
            setSelectedOportunidade(null);
          }}
          onSave={handleSavePedido}
          oportunidade={selectedOportunidade}
        />
      )}
    </div>
  );
};

export default ComercialTabs;
