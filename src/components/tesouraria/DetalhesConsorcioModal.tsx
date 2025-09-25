import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, TrendingUp, Award } from 'lucide-react';
import { mockConsorcios } from '@/data/tesouraria';
import { formatCurrency, formatDate } from '@/data/tesouraria';
import { StatusConsorcio } from '@/types/tesouraria';

interface DetalhesConsorcioModalProps {
  isOpen: boolean;
  onClose: () => void;
  consorcioId: string;
}

const DetalhesConsorcioModal: React.FC<DetalhesConsorcioModalProps> = ({ 
  isOpen, 
  onClose, 
  consorcioId 
}) => {
  const consorcio = mockConsorcios.find(c => c.id === consorcioId);

  if (!consorcio || !isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-blue-500';
      case 'Contemplado': return 'bg-green-500';
      case 'Quitado': return 'bg-gray-500';
      case 'Cancelado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const calcularPercentualPago = () => {
    return (consorcio.parcelasPagas / consorcio.numeroParcelas) * 100;
  };

  const calcularValorPago = () => {
    return consorcio.valorParcela * consorcio.parcelasPagas;
  };

  const calcularValorRestante = () => {
    return consorcio.valorBem - calcularValorPago();
  };

  const calcularParcelasRestantes = () => {
    return consorcio.numeroParcelas - consorcio.parcelasPagas;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da Cota - {consorcio.numeroCota}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Administradora:</span>
                  <span>{consorcio.administradora}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Número da Cota:</span>
                  <span>{consorcio.numeroCota}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Bem Referenciado:</span>
                  <span className="text-right max-w-[200px]">{consorcio.bemReferenciado}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge className={`${getStatusColor(consorcio.status)} text-white`}>
                    {consorcio.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Valores Financeiros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Valor do Bem:</span>
                  <span className="font-bold text-blue-600">
                    {formatCurrency(consorcio.valorBem)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Valor da Parcela:</span>
                  <span>{formatCurrency(consorcio.valorParcela)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Taxa de Administração:</span>
                  <span>{consorcio.taxaAdministracao}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Data do Contrato:</span>
                  <span>{formatDate(consorcio.dataContrato)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progresso do Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progresso de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <span className="text-sm font-medium text-muted-foreground">Parcelas Pagas</span>
                  <p className="text-2xl font-bold text-green-600">
                    {consorcio.parcelasPagas}/{consorcio.numeroParcelas}
                  </p>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-muted-foreground">% Concluído</span>
                  <p className="text-2xl font-bold text-blue-600">
                    {calcularPercentualPago().toFixed(1)}%
                  </p>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-muted-foreground">Valor Pago</span>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(calcularValorPago())}
                  </p>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-muted-foreground">Valor Restante</span>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(calcularValorRestante())}
                  </p>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300" 
                  style={{ width: `${calcularPercentualPago()}%` }}
                />
              </div>

              <div className="text-center text-sm text-muted-foreground">
                {calcularParcelasRestantes()} parcelas restantes
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Reajustes */}
          {consorcio.historicoReajustes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Histórico de Reajustes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor Anterior</TableHead>
                      <TableHead>Valor Novo</TableHead>
                      <TableHead>Reajuste</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consorcio.historicoReajustes.map((reajuste) => (
                      <TableRow key={reajuste.id}>
                        <TableCell>{formatDate(reajuste.dataReajuste)}</TableCell>
                        <TableCell>{formatCurrency(reajuste.valorAnterior)}</TableCell>
                        <TableCell>{formatCurrency(reajuste.valorNovo)}</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          +{reajuste.percentualReajuste.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Contemplações */}
          {consorcio.contemplacoes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Histórico de Contemplações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Valor do Lance</TableHead>
                      <TableHead>Valor Contemplado</TableHead>
                      <TableHead>Situação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consorcio.contemplacoes.map((contemplacao) => (
                      <TableRow key={contemplacao.id}>
                        <TableCell>{formatDate(contemplacao.dataContemplacao)}</TableCell>
                        <TableCell>
                          <Badge variant={contemplacao.tipoContemplacao === 'Sorteio' ? 'default' : 'secondary'}>
                            {contemplacao.tipoContemplacao}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {contemplacao.valorLance ? formatCurrency(contemplacao.valorLance) : '-'}
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {formatCurrency(contemplacao.valorContemplado)}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              contemplacao.situacao === 'Utilizada' ? 'default' :
                              contemplacao.situacao === 'Pendente' ? 'secondary' : 'destructive'
                            }
                          >
                            {contemplacao.situacao}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Projeções e Alertas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Projeção de Quitação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Data prevista de quitação:</span>
                    <span className="font-semibold">
                      {(() => {
                        const dataQuitacao = new Date(consorcio.dataContrato);
                        dataQuitacao.setMonth(dataQuitacao.getMonth() + consorcio.numeroParcelas);
                        return formatDate(dataQuitacao);
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meses restantes:</span>
                    <span className="font-semibold text-orange-600">
                      {calcularParcelasRestantes()} meses
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor total a pagar:</span>
                    <span className="font-semibold">
                      {formatCurrency(consorcio.valorParcela * consorcio.numeroParcelas)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Oportunidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Próxima Assembleia</h4>
                    <p className="text-sm text-blue-600">
                      Estimada para próximo mês - nova oportunidade de contemplação
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Lance Sugerido</h4>
                    <p className="text-sm text-green-600">
                      Baseado no histórico: {formatCurrency(consorcio.valorBem * 0.15)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Observações */}
          {consorcio.observacoes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{consorcio.observacoes}</p>
              </CardContent>
            </Card>
          )}

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Contrato de Consórcio</span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetalhesConsorcioModal;