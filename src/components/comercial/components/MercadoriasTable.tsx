import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Mercadoria {
  id: string;
  fabrica: string;
  referencia: string;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  total: number;
  lote: string;
  validade: string;
  categoria: string;
}

interface MercadoriasTableProps {
  mercadorias: Mercadoria[];
  onMercadoriasChange: (mercadorias: Mercadoria[]) => void;
}

const categorias = [
  'insumo',
  'acessório',
  'partes e peças',
  'equipamento',
  'controle de qualidade',
  'reagente'
];

const MercadoriasTable = ({ mercadorias, onMercadoriasChange }: MercadoriasTableProps) => {
  const adicionarMercadoria = () => {
    const novaMercadoria: Mercadoria = {
      id: Date.now().toString(),
      fabrica: '',
      referencia: '',
      descricao: '',
      quantidade: 0,
      precoUnitario: 0,
      total: 0,
      lote: '',
      validade: '',
      categoria: ''
    };
    onMercadoriasChange([...mercadorias, novaMercadoria]);
  };

  const removerMercadoria = (id: string) => {
    onMercadoriasChange(mercadorias.filter(m => m.id !== id));
  };

  const atualizarMercadoria = (id: string, campo: keyof Mercadoria, valor: any) => {
    const mercadoriasAtualizadas = mercadorias.map(m => {
      if (m.id === id) {
        const mercadoriaAtualizada = { ...m, [campo]: valor };
        
        // Recalcular total se quantidade ou preço unitário mudaram
        if (campo === 'quantidade' || campo === 'precoUnitario') {
          mercadoriaAtualizada.total = mercadoriaAtualizada.quantidade * mercadoriaAtualizada.precoUnitario;
        }
        
        return mercadoriaAtualizada;
      }
      return m;
    });
    onMercadoriasChange(mercadoriasAtualizadas);
  };

  const calcularTotalGeral = () => {
    return mercadorias.reduce((acc, m) => acc + m.total, 0);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Informação da Mercadoria a ser Importada</CardTitle>
        <Button onClick={adicionarMercadoria} size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Mercadoria
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fábrica</TableHead>
                <TableHead>Referência</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Preço Unitário</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mercadorias.map((mercadoria) => (
                <TableRow key={mercadoria.id}>
                  <TableCell>
                    <Input
                      value={mercadoria.fabrica}
                      onChange={(e) => atualizarMercadoria(mercadoria.id, 'fabrica', e.target.value)}
                      placeholder="Fábrica"
                      className="min-w-[120px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={mercadoria.referencia}
                      onChange={(e) => atualizarMercadoria(mercadoria.id, 'referencia', e.target.value)}
                      placeholder="Referência"
                      className="min-w-[120px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={mercadoria.descricao}
                      onChange={(e) => atualizarMercadoria(mercadoria.id, 'descricao', e.target.value)}
                      placeholder="Descrição"
                      className="min-w-[150px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={mercadoria.quantidade}
                      onChange={(e) => atualizarMercadoria(mercadoria.id, 'quantidade', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="min-w-[100px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      value={mercadoria.precoUnitario}
                      onChange={(e) => atualizarMercadoria(mercadoria.id, 'precoUnitario', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="min-w-[100px]"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium min-w-[100px]">
                      {mercadoria.total.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={mercadoria.lote}
                      onChange={(e) => atualizarMercadoria(mercadoria.id, 'lote', e.target.value)}
                      placeholder="Lote"
                      className="min-w-[100px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={mercadoria.validade}
                      onChange={(e) => atualizarMercadoria(mercadoria.id, 'validade', e.target.value)}
                      className="min-w-[130px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={mercadoria.categoria}
                      onValueChange={(value) => atualizarMercadoria(mercadoria.id, 'categoria', value)}
                    >
                      <SelectTrigger className="min-w-[140px]">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removerMercadoria(mercadoria.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {mercadorias.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                    Nenhuma mercadoria adicionada. Clique em "Adicionar Mercadoria" para começar.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {mercadorias.length > 0 && (
          <div className="mt-4 flex justify-end">
            <div className="text-lg font-semibold">
              Total Geral: {calcularTotalGeral().toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MercadoriasTable;