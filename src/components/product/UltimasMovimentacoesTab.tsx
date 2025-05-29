
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const UltimasMovimentacoesTab = () => {
  const movimentacoes = [
    {
      tipo: "Entrada",
      localOrigem: "Fornecedor",
      data: "28/05/2025",
      motivo: "Compra",
      quantidade: 100,
      nfe: "000123456",
      observacao: "Entrada de mercadoria"
    },
    {
      tipo: "Saída",
      localOrigem: "Matriz",
      data: "27/05/2025",
      motivo: "Venda",
      quantidade: 25,
      nfe: "000123457",
      observacao: "Venda para cliente"
    },
    {
      tipo: "Transferência",
      localOrigem: "Matriz",
      data: "26/05/2025",
      motivo: "Reposição",
      quantidade: 50,
      nfe: "",
      observacao: "Transferência para filial"
    }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Últimas Movimentações
            <div className="flex items-center gap-4">
              <Select defaultValue="todos">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
                  <SelectItem value="transferencia">Transferência</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nova Movimentação
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Movimento</TableHead>
                  <TableHead>Local de Estoque de Origem</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Motivo da Movimentação</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead>NFe</TableHead>
                  <TableHead>Observação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movimentacoes.map((mov, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge 
                        variant={
                          mov.tipo === "Entrada" ? "default" : 
                          mov.tipo === "Saída" ? "destructive" : 
                          "secondary"
                        }
                      >
                        {mov.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>{mov.localOrigem}</TableCell>
                    <TableCell>{mov.data}</TableCell>
                    <TableCell>{mov.motivo}</TableCell>
                    <TableCell className="text-right">{mov.quantidade}</TableCell>
                    <TableCell>{mov.nfe || "-"}</TableCell>
                    <TableCell>{mov.observacao}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UltimasMovimentacoesTab;
