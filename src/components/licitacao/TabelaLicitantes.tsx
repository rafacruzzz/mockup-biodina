
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus } from "lucide-react";
import { Licitante } from '@/types/licitacao';

interface TabelaLicitantesProps {
  licitantes: Licitante[];
  onAdicionarLicitante: () => void;
  onEditarLicitante: (licitante: Licitante) => void;
  onRemoverLicitante: (id: number) => void;
}

const TabelaLicitantes: React.FC<TabelaLicitantesProps> = ({
  licitantes,
  onAdicionarLicitante,
  onEditarLicitante,
  onRemoverLicitante
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Licitantes</h3>
        <Button onClick={onAdicionarLicitante} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Licitante
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {licitantes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Nenhum licitante adicionado
                </TableCell>
              </TableRow>
            ) : (
              licitantes.map((licitante) => (
                <TableRow key={licitante.id}>
                  <TableCell className="font-medium">{licitante.empresa}</TableCell>
                  <TableCell>{licitante.cnpj}</TableCell>
                  <TableCell>{licitante.produto}</TableCell>
                  <TableCell>{formatCurrency(licitante.valor)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={licitante.status === 'ativo' ? 'default' : 'secondary'}
                      className={
                        licitante.status === 'ativo' ? 'bg-green-500' : 
                        licitante.status === 'desclassificado' ? 'bg-red-500' : 
                        'bg-yellow-500'
                      }
                    >
                      {licitante.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditarLicitante(licitante)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoverLicitante(licitante.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TabelaLicitantes;
