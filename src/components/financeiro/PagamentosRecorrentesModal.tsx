// Modal para gestão de pagamentos recorrentes

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import { mockContasRecorrentes } from '@/data/contasPagarData';
import { Periodicidade, CategoriaContaRecorrente } from '@/types/financeiro';

interface PagamentosRecorrentesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNovaContaRecorrente?: () => void;
}

const PagamentosRecorrentesModal = ({ isOpen, onClose }: PagamentosRecorrentesModalProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getPeriodicidadeLabel = (periodicidade: Periodicidade) => {
    const labels = {
      [Periodicidade.MENSAL]: 'Mensal',
      [Periodicidade.BIMESTRAL]: 'Bimestral',
      [Periodicidade.TRIMESTRAL]: 'Trimestral',
      [Periodicidade.SEMESTRAL]: 'Semestral',
      [Periodicidade.ANUAL]: 'Anual'
    };
    return labels[periodicidade];
  };

  const getCategoriaColor = (categoria: CategoriaContaRecorrente) => {
    const colors = {
      [CategoriaContaRecorrente.LUZ]: 'bg-yellow-500',
      [CategoriaContaRecorrente.AGUA]: 'bg-blue-500',
      [CategoriaContaRecorrente.TELEFONIA]: 'bg-green-500',
      [CategoriaContaRecorrente.INTERNET]: 'bg-purple-500',
      [CategoriaContaRecorrente.ALUGUEL]: 'bg-red-500',
      [CategoriaContaRecorrente.CONDOMINIO]: 'bg-orange-500',
      [CategoriaContaRecorrente.SEGUROS]: 'bg-indigo-500',
      [CategoriaContaRecorrente.SOFTWARE]: 'bg-pink-500',
      [CategoriaContaRecorrente.OUTROS]: 'bg-gray-500'
    };
    return colors[categoria];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Pagamentos Recorrentes
            </DialogTitle>
            <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
              <Plus className="h-4 w-4 mr-2" />
              Nova Conta Recorrente
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {mockContasRecorrentes.filter(c => c.ativa).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Contas Ativas</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      mockContasRecorrentes
                        .filter(c => c.ativa && c.periodicidade === Periodicidade.MENSAL)
                        .reduce((sum, c) => sum + c.valor, 0)
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Mensal</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(
                      mockContasRecorrentes
                        .filter(c => c.ativa)
                        .reduce((sum, c) => {
                          const multiplicador = c.periodicidade === Periodicidade.MENSAL ? 12 :
                                               c.periodicidade === Periodicidade.BIMESTRAL ? 6 :
                                               c.periodicidade === Periodicidade.TRIMESTRAL ? 4 :
                                               c.periodicidade === Periodicidade.SEMESTRAL ? 2 : 1;
                          return sum + (c.valor * multiplicador);
                        }, 0)
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Anual</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Contas */}
          <Card>
            <CardHeader>
              <CardTitle>Contas Cadastradas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome da Conta</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Periodicidade</TableHead>
                    <TableHead>Próximo Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockContasRecorrentes.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell className="font-medium">{conta.nome}</TableCell>
                      <TableCell>{conta.fornecedor.nome}</TableCell>
                      <TableCell>
                        <Badge className={`${getCategoriaColor(conta.categoria)} text-white`}>
                          {conta.categoria.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(conta.valor)}
                      </TableCell>
                      <TableCell>{getPeriodicidadeLabel(conta.periodicidade)}</TableCell>
                      <TableCell>
                        {conta.proximoVencimento.toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <Badge className={conta.ativa ? 'bg-green-500' : 'bg-gray-500'}>
                          {conta.ativa ? 'Ativa' : 'Inativa'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PagamentosRecorrentesModal;