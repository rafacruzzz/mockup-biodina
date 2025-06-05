
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';
import { formatUSD, parseUSD } from '../utils/spiUtils';

interface SPIProductsTableProps {
  mercadorias: any[];
  onUpdateMercadorias: (mercadorias: any[]) => void;
}

const SPIProductsTable = ({ mercadorias, onUpdateMercadorias }: SPIProductsTableProps) => {
  const addMercadoria = () => {
    const novaMercadoria = {
      id: Date.now(),
      mercadoria: '',
      equip: '',
      codigo: '',
      unidade: '',
      qtde: '',
      qtdePendente: '',
      totalOrdens: '',
      plU: '',
      plT: '',
      precoUnitUsd: '',
      precoTotalUsd: ''
    };
    onUpdateMercadorias([...mercadorias, novaMercadoria]);
  };

  const removeMercadoria = (id: number) => {
    const mercadoriasFiltradas = mercadorias.filter((item: any) => item.id !== id);
    onUpdateMercadorias(mercadoriasFiltradas);
  };

  const updateMercadoria = (id: number, field: string, value: any) => {
    const mercadoriasAtualizadas = mercadorias.map((item: any) => {
      if (item.id === id) {
        const itemAtualizado = { ...item, [field]: value };
        
        // Calcular "Total das Qtdes" automaticamente
        if (field === 'qtde' || field === 'qtdePendente') {
          const qtde = parseFloat(itemAtualizado.qtde) || 0;
          const qtdePendente = parseFloat(itemAtualizado.qtdePendente) || 0;
          itemAtualizado.totalOrdens = (qtde + qtdePendente).toString();
        }
        
        // Calcular preço total automaticamente
        if (field === 'qtde' || field === 'precoUnitUsd') {
          const qtde = parseFloat(itemAtualizado.qtde) || 0;
          const precoUnit = parseUSD(itemAtualizado.precoUnitUsd) || 0;
          itemAtualizado.precoTotalUsd = formatUSD(qtde * precoUnit);
        }
        
        return itemAtualizado;
      }
      return item;
    });
    onUpdateMercadorias(mercadoriasAtualizadas);
  };

  return (
    <div className="mb-6 border p-4 rounded">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold border-b pb-2">PRODUTOS/MERCADORIAS</h3>
        <Button onClick={addMercadoria} size="sm" className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Item
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[50px]">Item</TableHead>
              <TableHead className="min-w-[150px]">Mercadoria</TableHead>
              <TableHead className="min-w-[80px]">Equip</TableHead>
              <TableHead className="min-w-[80px]">Código</TableHead>
              <TableHead className="min-w-[100px]">Unidade/QX</TableHead>
              <TableHead className="min-w-[80px]">Qtde</TableHead>
              <TableHead className="min-w-[100px]">Qtde Pendente</TableHead>
              <TableHead className="min-w-[120px]">Total das Qtdes</TableHead>
              <TableHead className="min-w-[80px]">PL U</TableHead>
              <TableHead className="min-w-[80px]">PL T</TableHead>
              <TableHead className="min-w-[120px]">Preço Unit USD</TableHead>
              <TableHead className="min-w-[120px]">Preço Total USD</TableHead>
              <TableHead className="min-w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mercadorias.map((item: any, index: number) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Input
                    value={item.mercadoria}
                    onChange={(e) => updateMercadoria(item.id, 'mercadoria', e.target.value)}
                    placeholder="Buscar produto..."
                    className="min-w-[150px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.equip}
                    onChange={(e) => updateMercadoria(item.id, 'equip', e.target.value)}
                    placeholder="Equip"
                    className="min-w-[80px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.codigo}
                    onChange={(e) => updateMercadoria(item.id, 'codigo', e.target.value)}
                    placeholder="Código"
                    className="min-w-[80px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.unidade}
                    onChange={(e) => updateMercadoria(item.id, 'unidade', e.target.value)}
                    placeholder="UN"
                    className="min-w-[100px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.qtde}
                    onChange={(e) => updateMercadoria(item.id, 'qtde', e.target.value)}
                    placeholder="0"
                    className="min-w-[80px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.qtdePendente}
                    onChange={(e) => updateMercadoria(item.id, 'qtdePendente', e.target.value)}
                    placeholder="0"
                    className="min-w-[100px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.totalOrdens}
                    readOnly
                    className="bg-gray-100 min-w-[120px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.plU}
                    onChange={(e) => updateMercadoria(item.id, 'plU', e.target.value)}
                    placeholder="PL U"
                    className="min-w-[80px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.plT}
                    onChange={(e) => updateMercadoria(item.id, 'plT', e.target.value)}
                    placeholder="PL T"
                    className="min-w-[80px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.precoUnitUsd}
                    onChange={(e) => {
                      const numValue = parseUSD(e.target.value);
                      const formattedValue = formatUSD(numValue);
                      updateMercadoria(item.id, 'precoUnitUsd', formattedValue);
                    }}
                    placeholder="0.00"
                    className="min-w-[120px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.precoTotalUsd}
                    readOnly
                    className="bg-gray-100 min-w-[120px]"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => removeMercadoria(item.id)}
                    size="sm"
                    variant="destructive"
                    className="min-w-[80px]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SPIProductsTable;
