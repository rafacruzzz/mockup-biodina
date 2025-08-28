
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, Users } from 'lucide-react';

const ProcessosSeletivosTable = () => {
  const processos = [
    {
      id: '1',
      titulo: 'Analista de Sistemas',
      departamento: 'TI',
      status: 'Em Andamento',
      candidatos: 12,
      dataAbertura: '2024-01-15',
      dataFechamento: '2024-02-15'
    },
    {
      id: '2',
      titulo: 'Coordenador Comercial',
      departamento: 'Comercial',
      status: 'Finalizado',
      candidatos: 8,
      dataAbertura: '2023-12-01',
      dataFechamento: '2024-01-01'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Finalizado':
        return 'bg-green-100 text-green-800';
      case 'Pausado':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título da Vaga</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Candidatos</TableHead>
            <TableHead>Data de Abertura</TableHead>
            <TableHead>Data de Fechamento</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processos.map((processo) => (
            <TableRow key={processo.id}>
              <TableCell className="font-medium">{processo.titulo}</TableCell>
              <TableCell>{processo.departamento}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(processo.status)}>
                  {processo.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{processo.candidatos}</span>
                </div>
              </TableCell>
              <TableCell>{new Date(processo.dataAbertura).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>{new Date(processo.dataFechamento).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProcessosSeletivosTable;
