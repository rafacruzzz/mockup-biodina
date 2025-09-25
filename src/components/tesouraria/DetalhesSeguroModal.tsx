import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, TrendingUp } from 'lucide-react';
import { mockSeguros } from '@/data/tesouraria';
import { formatCurrency, formatDate } from '@/data/tesouraria';
import { StatusSeguro } from '@/types/tesouraria';

interface DetalhesSeguroModalProps {
  isOpen: boolean;
  onClose: () => void;
  seguroId: string;
}

const DetalhesSeguroModal: React.FC<DetalhesSeguroModalProps> = ({ 
  isOpen, 
  onClose, 
  seguroId 
}) => {
  const seguro = mockSeguros.find(s => s.id === seguroId);

  if (!seguro || !isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Vigente': return 'bg-green-500';
      case 'Vencido': return 'bg-red-500';
      case 'Cancelado': return 'bg-gray-500';
      case 'Sinistro': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const calcularProximoReajuste = () => {
    const hoje = new Date();
    const proximoAno = new Date(seguro.dataInicio);
    proximoAno.setFullYear(hoje.getFullYear() + 1);
    return proximoAno;
  };

  const calcularDiasRestantes = () => {
    const hoje = new Date();
    const diferenca = seguro.dataFim.getTime() - hoje.getTime();
    return Math.max(0, Math.ceil(diferenca / (1000 * 60 * 60 * 24)));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da Apólice - {seguro.numeroApolice}</DialogTitle>
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
                  <span className="font-medium">Seguradora:</span>
                  <span>{seguro.seguradora}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Número da Apólice:</span>
                  <span>{seguro.numeroApolice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tipo de Seguro:</span>
                  <span>{seguro.tipoSeguro}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge className={`${getStatusColor(seguro.status)} text-white`}>
                    {seguro.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Valores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Valor Segurado:</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(seguro.valorSegurado)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Prêmio:</span>
                  <span>{formatCurrency(seguro.premio)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Periodicidade:</span>
                  <span>{seguro.periodicidadePagamento}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Prêmio Anual:</span>
                  <span className="font-bold">
                    {formatCurrency(
                      seguro.periodicidadePagamento === 'Mensal' ? seguro.premio * 12 :
                      seguro.periodicidadePagamento === 'Trimestral' ? seguro.premio * 4 :
                      seguro.periodicidadePagamento === 'Semestral' ? seguro.premio * 2 :
                      seguro.premio
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vigência */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Período de Vigência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Início</span>
                  <p className="text-lg font-semibold">{formatDate(seguro.dataInicio)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Término</span>
                  <p className="text-lg font-semibold">{formatDate(seguro.dataFim)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Dias Restantes</span>
                  <p className="text-lg font-semibold text-blue-600">
                    {calcularDiasRestantes()} dias
                  </p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <span className="text-sm font-medium text-muted-foreground">Próximo Vencimento</span>
                <p className="text-lg font-semibold text-orange-600">
                  {formatDate(seguro.proximoVencimento)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Reajustes */}
          {seguro.historicoReajustes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Histórico de Reajustes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seguro.historicoReajustes.map((reajuste) => (
                    <div key={reajuste.id} className="p-3 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div>
                          <span className="text-sm font-medium">Data:</span>
                          <p>{formatDate(reajuste.dataReajuste)}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Valor Anterior:</span>
                          <p>{formatCurrency(reajuste.valorAnterior)}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Valor Novo:</span>
                          <p>{formatCurrency(reajuste.valorNovo)}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Reajuste:</span>
                          <p className="text-red-600 font-semibold">
                            +{reajuste.percentualReajuste.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm font-medium">Motivo:</span>
                        <p className="text-sm text-muted-foreground">{reajuste.motivo}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    Próximo Reajuste Previsto
                  </span>
                  <p className="text-lg font-semibold">
                    {formatDate(calcularProximoReajuste())}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ressarcimento */}
          {seguro.ressarcimento?.aplicavel && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações de Ressarcimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Valor Esperado</span>
                    <p className="text-lg font-semibold text-green-600">
                      {formatCurrency(seguro.ressarcimento.valorEsperado || 0)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Data de Retorno</span>
                    <p className="text-lg font-semibold">
                      {seguro.ressarcimento.dataRetorno ? 
                        formatDate(seguro.ressarcimento.dataRetorno) : 
                        'Não definida'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Observações */}
          {seguro.observacoes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{seguro.observacoes}</p>
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
                  <span>Apólice de Seguro</span>
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

export default DetalhesSeguroModal;