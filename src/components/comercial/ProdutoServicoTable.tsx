
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputMask } from "@/components/ui/input-mask";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface Item {
  id: string;
  tipo: 'produto' | 'servico';
  codigo: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

interface ProdutoServicoTableProps {
  tipo: 'produto' | 'servico';
  items: Item[];
  onItemsChange: (items: Item[]) => void;
}

const ProdutoServicoTable = ({ tipo, items, onItemsChange }: ProdutoServicoTableProps) => {
  const [newItem, setNewItem] = useState<Omit<Item, 'id' | 'valorTotal'>>({
    tipo,
    codigo: '',
    descricao: '',
    quantidade: 1,
    valorUnitario: 0
  });

  const addItem = () => {
    if (newItem.descricao.trim() === '') return;
    
    const valorTotal = newItem.quantidade * newItem.valorUnitario;
    const item: Item = {
      ...newItem,
      id: Date.now().toString(),
      valorTotal
    };
    
    onItemsChange([...items, item]);
    
    setNewItem({
      tipo,
      codigo: '',
      descricao: '',
      quantidade: 1,
      valorUnitario: 0
    });
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const title = tipo === 'produto' ? 'Produtos' : 'Serviços';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          <Input
            placeholder="Código"
            value={newItem.codigo}
            onChange={(e) => setNewItem({...newItem, codigo: e.target.value})}
          />
          <Input
            placeholder="Descrição"
            value={newItem.descricao}
            onChange={(e) => setNewItem({...newItem, descricao: e.target.value})}
            className="col-span-2"
          />
          <Input
            type="number"
            placeholder="Qtd"
            value={newItem.quantidade}
            onChange={(e) => setNewItem({...newItem, quantidade: parseInt(e.target.value) || 1})}
          />
          <InputMask
            mask="currency"
            placeholder="R$ 0,00"
            value={newItem.valorUnitario.toString()}
            onChange={(e) => {
              const value = parseFloat(e.target.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
              setNewItem({...newItem, valorUnitario: value});
            }}
          />
          <Button onClick={addItem} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {items.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Valor Unitário</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>{formatCurrency(item.valorUnitario)}</TableCell>
                  <TableCell>{formatCurrency(item.valorTotal)}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        {items.length > 0 && (
          <div className="text-right font-semibold">
            Total {title}: {formatCurrency(items.reduce((sum, item) => sum + item.valorTotal, 0))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProdutoServicoTable;
