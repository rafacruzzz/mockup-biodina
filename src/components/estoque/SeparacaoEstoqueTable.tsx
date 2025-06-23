
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye } from "lucide-react";
import { PedidoSeparacao, StatusSeparacao } from "@/types/estoque";
import SeparacaoDetalhadaModal from "./SeparacaoDetalhadaModal";

interface SeparacaoEstoqueTableProps {
  data: PedidoSeparacao[];
}

const SeparacaoEstoqueTable = ({ data }: SeparacaoEstoqueTableProps) => {
  const [selectedPedido, setSelectedPedido] = useState<PedidoSeparacao | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [vendedorFilter, setVendedorFilter] = useState("todos");

  const getStatusBadge = (status: StatusSeparacao) => {
    const statusConfig = {
      [StatusSeparacao.SEPARADO]: { label: "Separado", className: "bg-green-100 text-green-800 hover:bg-green-100" },
      [StatusSeparacao.SEPARADO_PARCIAL]: { label: "Separado Parcial", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
      [StatusSeparacao.PLANEJADO]: { label: "Planejado", className: "bg-orange-100 text-orange-800 hover:bg-orange-100" },
      [StatusSeparacao.INDISPONIVEL]: { label: "Indisponível", className: "bg-red-100 text-red-800 hover:bg-red-100" },
      [StatusSeparacao.FINALIZADO]: { label: "Finalizado", className: "bg-gray-100 text-gray-800 hover:bg-gray-100" },
      [StatusSeparacao.SOLICITADO]: { label: "Solicitado", className: "bg-purple-100 text-purple-800 hover:bg-purple-100" }
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleSeparar = (pedido: PedidoSeparacao) => {
    setSelectedPedido(pedido);
    setIsModalOpen(true);
  };

  const filteredData = data.filter(pedido => {
    const matchesSearch = searchTerm === "" || 
      pedido.numero_pedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.nop.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "todos" || pedido.status === statusFilter;
    const matchesVendedor = vendedorFilter === "todos" || pedido.vendedor === vendedorFilter;
    
    return matchesSearch && matchesStatus && matchesVendedor;
  });

  const vendedores = [...new Set(data.map(p => p.vendedor))];

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros de Separação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar pedido, cliente ou NOP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value={StatusSeparacao.SEPARADO}>Separado</SelectItem>
                <SelectItem value={StatusSeparacao.SEPARADO_PARCIAL}>Separado Parcial</SelectItem>
                <SelectItem value={StatusSeparacao.PLANEJADO}>Planejado</SelectItem>
                <SelectItem value={StatusSeparacao.INDISPONIVEL}>Indisponível</SelectItem>
                <SelectItem value={StatusSeparacao.FINALIZADO}>Finalizado</SelectItem>
                <SelectItem value={StatusSeparacao.SOLICITADO}>Solicitado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={vendedorFilter} onValueChange={setVendedorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Vendedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Vendedores</SelectItem>
                {vendedores.map(vendedor => (
                  <SelectItem key={vendedor} value={vendedor}>{vendedor}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>NOP</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data de Entrega</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Região</TableHead>
                <TableHead>Transportadora</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell className="font-medium">{pedido.numero_pedido}</TableCell>
                  <TableCell>{pedido.nop}</TableCell>
                  <TableCell>{pedido.vendedor}</TableCell>
                  <TableCell>{pedido.cliente}</TableCell>
                  <TableCell>{new Date(pedido.data_entrega).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{getStatusBadge(pedido.status)}</TableCell>
                  <TableCell>{pedido.regiao}</TableCell>
                  <TableCell>{pedido.transportadora || "—"}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {pedido.progresso.separados}/{pedido.progresso.total} itens
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => handleSeparar(pedido)}
                      className="bg-biodina-gold hover:bg-biodina-gold/90"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Separar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedPedido && (
        <SeparacaoDetalhadaModal
          pedido={selectedPedido}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default SeparacaoEstoqueTable;
