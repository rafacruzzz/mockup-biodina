import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ClipboardCheck, 
  Search, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  FileSearch,
  ShieldCheck
} from "lucide-react";
import { PedidoAdministrativo, StatusPedidoAdministrativo } from "@/types/estoque";
import AnaliseAutorizacaoModal from "./AnaliseAutorizacaoModal";
import ValidacaoSeparacaoModal from "./ValidacaoSeparacaoModal";

interface EstoqueAdministrativoTableProps {
  data: PedidoAdministrativo[];
}

const EstoqueAdministrativoTable = ({ data }: EstoqueAdministrativoTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [selectedPedido, setSelectedPedido] = useState<PedidoAdministrativo | null>(null);
  const [isAnaliseModalOpen, setIsAnaliseModalOpen] = useState(false);
  const [isValidacaoModalOpen, setIsValidacaoModalOpen] = useState(false);

  const getStatusBadge = (status: StatusPedidoAdministrativo) => {
    const statusConfig = {
      [StatusPedidoAdministrativo.PENDENTE_ANALISE]: { 
        label: "Pendente Análise", 
        className: "bg-amber-100 text-amber-800 border-amber-300",
        icon: <Clock className="h-3 w-3 mr-1" />
      },
      [StatusPedidoAdministrativo.AUTORIZADO]: { 
        label: "Autorizado", 
        className: "bg-blue-100 text-blue-800 border-blue-300",
        icon: <CheckCircle className="h-3 w-3 mr-1" />
      },
      [StatusPedidoAdministrativo.REJEITADO]: { 
        label: "Rejeitado", 
        className: "bg-red-100 text-red-800 border-red-300",
        icon: <XCircle className="h-3 w-3 mr-1" />
      },
      [StatusPedidoAdministrativo.AGUARDANDO_SEPARACAO]: { 
        label: "Aguard. Separação", 
        className: "bg-purple-100 text-purple-800 border-purple-300",
        icon: <Clock className="h-3 w-3 mr-1" />
      },
      [StatusPedidoAdministrativo.AGUARDANDO_VALIDACAO]: { 
        label: "Aguard. Validação", 
        className: "bg-orange-100 text-orange-800 border-orange-300",
        icon: <AlertCircle className="h-3 w-3 mr-1" />
      },
      [StatusPedidoAdministrativo.LIBERADO_FATURAMENTO]: { 
        label: "Liberado p/ Fatur.", 
        className: "bg-green-100 text-green-800 border-green-300",
        icon: <CheckCircle className="h-3 w-3 mr-1" />
      }
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={`${config.className} flex items-center`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const filteredData = data.filter(pedido => {
    const matchesSearch = 
      pedido.numero_pedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.vendedor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "todos" || pedido.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAnalisar = (pedido: PedidoAdministrativo) => {
    setSelectedPedido(pedido);
    setIsAnaliseModalOpen(true);
  };

  const handleValidar = (pedido: PedidoAdministrativo) => {
    setSelectedPedido(pedido);
    setIsValidacaoModalOpen(true);
  };

  const getAcoes = (pedido: PedidoAdministrativo) => {
    switch (pedido.status) {
      case StatusPedidoAdministrativo.PENDENTE_ANALISE:
        return (
          <Button 
            size="sm" 
            onClick={() => handleAnalisar(pedido)}
            className="bg-biodina-gold hover:bg-biodina-gold/90"
          >
            <FileSearch className="h-4 w-4 mr-1" />
            Analisar
          </Button>
        );
      case StatusPedidoAdministrativo.AGUARDANDO_VALIDACAO:
        return (
          <Button 
            size="sm" 
            onClick={() => handleValidar(pedido)}
            className="bg-green-600 hover:bg-green-700"
          >
            <ShieldCheck className="h-4 w-4 mr-1" />
            Validar
          </Button>
        );
      default:
        return (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleAnalisar(pedido)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Visualizar
          </Button>
        );
    }
  };

  // Contadores por status
  const contadores = {
    pendentes: data.filter(p => p.status === StatusPedidoAdministrativo.PENDENTE_ANALISE).length,
    aguardandoValidacao: data.filter(p => p.status === StatusPedidoAdministrativo.AGUARDANDO_VALIDACAO).length,
    liberados: data.filter(p => p.status === StatusPedidoAdministrativo.LIBERADO_FATURAMENTO).length
  };

  return (
    <>
      <div className="space-y-4">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pendentes de Análise</p>
                  <p className="text-2xl font-bold text-amber-600">{contadores.pendentes}</p>
                </div>
                <Clock className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aguardando Validação</p>
                  <p className="text-2xl font-bold text-orange-600">{contadores.aguardandoValidacao}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Liberados p/ Faturamento</p>
                  <p className="text-2xl font-bold text-green-600">{contadores.liberados}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Pedidos para Análise Administrativa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por pedido, cliente ou vendedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value={StatusPedidoAdministrativo.PENDENTE_ANALISE}>Pendente Análise</SelectItem>
                  <SelectItem value={StatusPedidoAdministrativo.AUTORIZADO}>Autorizado</SelectItem>
                  <SelectItem value={StatusPedidoAdministrativo.AGUARDANDO_SEPARACAO}>Aguard. Separação</SelectItem>
                  <SelectItem value={StatusPedidoAdministrativo.AGUARDANDO_VALIDACAO}>Aguard. Validação</SelectItem>
                  <SelectItem value={StatusPedidoAdministrativo.LIBERADO_FATURAMENTO}>Liberado p/ Fatur.</SelectItem>
                  <SelectItem value={StatusPedidoAdministrativo.REJEITADO}>Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Data Pedido</TableHead>
                    <TableHead>Qtd. Itens</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Nenhum pedido encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((pedido) => (
                      <TableRow key={pedido.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{pedido.numero_pedido}</TableCell>
                        <TableCell>{pedido.cliente}</TableCell>
                        <TableCell>{pedido.vendedor}</TableCell>
                        <TableCell>
                          {new Date(pedido.data_pedido).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{pedido.itens.length} itens</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(pedido.status)}</TableCell>
                        <TableCell className="text-right">
                          {getAcoes(pedido)}
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

      {selectedPedido && (
        <>
          <AnaliseAutorizacaoModal
            pedido={selectedPedido}
            isOpen={isAnaliseModalOpen}
            onOpenChange={setIsAnaliseModalOpen}
          />
          
          <ValidacaoSeparacaoModal
            pedido={selectedPedido}
            isOpen={isValidacaoModalOpen}
            onOpenChange={setIsValidacaoModalOpen}
          />
        </>
      )}
    </>
  );
};

export default EstoqueAdministrativoTable;
