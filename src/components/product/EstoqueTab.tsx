
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EstoqueTab = () => {
  const estoqueData = [
    {
      local: "Matriz",
      deposito: "Depósito Principal",
      disponivel: 150,
      cmcUnitario: 25.50,
      cmcTotal: 3825.00,
      minimo: 10,
      previsaoEntrada: 50,
      previsaoSaida: 30
    },
    {
      local: "Filial 01",
      deposito: "Depósito Filial",
      disponivel: 75,
      cmcUnitario: 25.50,
      cmcTotal: 1912.50,
      minimo: 5,
      previsaoEntrada: 20,
      previsaoSaida: 15
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posição de Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Local de Estoque</TableHead>
                <TableHead>Depósito</TableHead>
                <TableHead className="text-right">Estoque Disponível</TableHead>
                <TableHead className="text-right">CMC Unitário</TableHead>
                <TableHead className="text-right">CMC Total</TableHead>
                <TableHead className="text-right">Estoque Mínimo</TableHead>
                <TableHead className="text-right">Previsão Entrada</TableHead>
                <TableHead className="text-right">Previsão Saída</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estoqueData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.local}</TableCell>
                  <TableCell>{item.deposito}</TableCell>
                  <TableCell className="text-right">{item.disponivel}</TableCell>
                  <TableCell className="text-right">R$ {item.cmcUnitario.toFixed(2)}</TableCell>
                  <TableCell className="text-right">R$ {item.cmcTotal.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.minimo}</TableCell>
                  <TableCell className="text-right">{item.previsaoEntrada}</TableCell>
                  <TableCell className="text-right">{item.previsaoSaida}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstoqueTab;
