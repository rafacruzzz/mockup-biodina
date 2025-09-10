import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Building, 
  AlertTriangle, 
  Timer, 
  DollarSign,
  BarChart3,
  MonitorSpeaker
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AtivoTI } from "@/types/ti";

interface RelatoriosModalProps {
  isOpen: boolean;
  onClose: () => void;
  ativos: AtivoTI[];
}

type TipoRelatorio = 'unidade_setor' | 'status' | 'vida_util' | 'valor_contabil' | 'garantia';

export const RelatoriosModal = ({ isOpen, onClose, ativos }: RelatoriosModalProps) => {
  const [tipoRelatorio, setTipoRelatorio] = useState<TipoRelatorio>('unidade_setor');

  // Relatório por Unidade e Setor
  const relatorioUnidadeSetor = useMemo(() => {
    const agrupados = ativos.reduce((acc, ativo) => {
      const key = `${ativo.departamento}`;
      if (!acc[key]) {
        acc[key] = {
          departamento: ativo.departamento,
          totalAtivos: 0,
          tipos: {} as Record<string, number>,
          valorTotal: 0
        };
      }
      acc[key].totalAtivos++;
      acc[key].tipos[ativo.tipo] = (acc[key].tipos[ativo.tipo] || 0) + 1;
      acc[key].valorTotal += ativo.valorAquisicao || 0;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(agrupados);
  }, [ativos]);

  // Relatório por Status
  const relatorioStatus = useMemo(() => {
    const agrupados = ativos.reduce((acc, ativo) => {
      if (!acc[ativo.status]) {
        acc[ativo.status] = {
          status: ativo.status,
          quantidade: 0,
          ativos: [] as AtivoTI[],
          valorTotal: 0
        };
      }
      acc[ativo.status].quantidade++;
      acc[ativo.status].ativos.push(ativo);
      acc[ativo.status].valorTotal += ativo.valorAquisicao || 0;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(agrupados);
  }, [ativos]);

  // Relatório de Vida Útil
  const relatorioVidaUtil = useMemo(() => {
    const hoje = new Date();
    
    return ativos.map(ativo => {
      const aquisicao = new Date(ativo.dataAquisicao);
      const anos = hoje.getFullYear() - aquisicao.getFullYear();
      const proximoFimVida = anos >= 4; // Próximo aos 5 anos
      
      return {
        ...ativo,
        idadeAnos: anos,
        proximoFimVida
      };
    }).filter(ativo => ativo.proximoFimVida);
  }, [ativos]);

  // Relatório de Garantia
  const relatorioGarantia = useMemo(() => {
    const hoje = new Date();
    
    return ativos.map(ativo => {
      if (!ativo.dataGarantia) return null;
      
      const garantia = new Date(ativo.dataGarantia);
      const diasRestantes = Math.ceil((garantia.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
      
      let statusGarantia = 'ok';
      if (diasRestantes < 0) statusGarantia = 'vencida';
      else if (diasRestantes <= 90) statusGarantia = 'vencendo';
      
      return {
        ...ativo,
        diasRestantes: Math.abs(diasRestantes),
        statusGarantia
      };
    }).filter(item => item && item.statusGarantia !== 'ok');
  }, [ativos]);

  // Relatório de Valor Contábil
  const relatorioValorContabil = useMemo(() => {
    const totalGeral = ativos.reduce((sum, ativo) => sum + (ativo.valorAquisicao || 0), 0);
    
    const porDepartamento = ativos.reduce((acc, ativo) => {
      if (!acc[ativo.departamento]) {
        acc[ativo.departamento] = {
          departamento: ativo.departamento,
          valorTotal: 0,
          quantidade: 0,
          percentual: 0
        };
      }
      acc[ativo.departamento].valorTotal += ativo.valorAquisicao || 0;
      acc[ativo.departamento].quantidade++;
      return acc;
    }, {} as Record<string, any>);

    // Calcular percentuais
    Object.values(porDepartamento).forEach((dept: any) => {
      dept.percentual = (dept.valorTotal / totalGeral) * 100;
    });

    return {
      totalGeral,
      porDepartamento: Object.values(porDepartamento)
    };
  }, [ativos]);

  const exportarRelatorio = () => {
    let csvContent = '';
    let filename = '';

    switch (tipoRelatorio) {
      case 'unidade_setor':
        csvContent = [
          ['Departamento', 'Total de Ativos', 'Tipos', 'Valor Total'],
          ...relatorioUnidadeSetor.map((item: any) => [
            item.departamento,
            item.totalAtivos,
            Object.entries(item.tipos).map(([tipo, qtd]) => `${tipo}: ${qtd}`).join('; '),
            `R$ ${item.valorTotal.toLocaleString('pt-BR')}`
          ])
        ].map(row => row.join(',')).join('\n');
        filename = 'relatorio_unidade_setor.csv';
        break;

      case 'status':
        csvContent = [
          ['Status', 'Quantidade', 'Valor Total'],
          ...relatorioStatus.map((item: any) => [
            item.status,
            item.quantidade,
            `R$ ${item.valorTotal.toLocaleString('pt-BR')}`
          ])
        ].map(row => row.join(',')).join('\n');
        filename = 'relatorio_status.csv';
        break;

      case 'vida_util':
        csvContent = [
          ['Nº Inventário', 'Equipamento', 'Idade (anos)', 'Data Aquisição', 'Departamento'],
          ...relatorioVidaUtil.map((item: any) => [
            item.numeroInventario,
            item.equipamento,
            item.idadeAnos,
            item.dataAquisicao,
            item.departamento
          ])
        ].map(row => row.join(',')).join('\n');
        filename = 'relatorio_vida_util.csv';
        break;

      case 'garantia':
        csvContent = [
          ['Nº Inventário', 'Equipamento', 'Status Garantia', 'Dias', 'Data Garantia'],
          ...relatorioGarantia.map((item: any) => [
            item.numeroInventario,
            item.equipamento,
            item.statusGarantia,
            item.diasRestantes,
            item.dataGarantia
          ])
        ].map(row => row.join(',')).join('\n');
        filename = 'relatorio_garantia.csv';
        break;

      case 'valor_contabil':
        csvContent = [
          ['Departamento', 'Quantidade', 'Valor Total', 'Percentual'],
          ...(relatorioValorContabil.porDepartamento as any[]).map((item: any) => [
            item.departamento,
            item.quantidade,
            `R$ ${item.valorTotal.toLocaleString('pt-BR')}`,
            `${item.percentual.toFixed(1)}%`
          ])
        ].map(row => row.join(',')).join('\n');
        filename = 'relatorio_valor_contabil.csv';
        break;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'manutencao': return 'bg-yellow-100 text-yellow-800';
      case 'reserva': return 'bg-blue-100 text-blue-800';
      case 'descartado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Relatórios de Inventário
          </DialogTitle>
          <DialogDescription>
            Relatórios detalhados para análise e auditoria do inventário de ativos de TI
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Seleção de Relatório */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tipo de Relatório</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Select value={tipoRelatorio} onValueChange={(value: TipoRelatorio) => setTipoRelatorio(value)}>
                <SelectTrigger className="w-96">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unidade_setor">Por Unidade e Setor</SelectItem>
                  <SelectItem value="status">Por Status</SelectItem>
                  <SelectItem value="vida_util">Próximos ao Fim da Vida Útil</SelectItem>
                  <SelectItem value="garantia">Alertas de Garantia</SelectItem>
                  <SelectItem value="valor_contabil">Por Valor Contábil</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={exportarRelatorio} className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </CardContent>
          </Card>

          {/* Conteúdo do Relatório */}
          <Card>
            <CardContent className="p-0">
              {tipoRelatorio === 'unidade_setor' && (
                <div className="space-y-4 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">Relatório por Unidade e Setor</h3>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Total de Ativos</TableHead>
                        <TableHead>Tipos de Equipamentos</TableHead>
                        <TableHead>Valor Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {relatorioUnidadeSetor.map((item: any, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.departamento}</TableCell>
                          <TableCell>{item.totalAtivos}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(item.tipos).map(([tipo, qtd]: [string, any]) => (
                                <Badge key={tipo} variant="outline" className="text-xs">
                                  {tipo}: {qtd}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>R$ {item.valorTotal.toLocaleString('pt-BR')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {tipoRelatorio === 'status' && (
                <div className="space-y-4 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MonitorSpeaker className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">Relatório por Status</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {relatorioStatus.map((item: any, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <Badge className={`${getStatusColor(item.status)} mb-2 capitalize`}>
                              {item.status}
                            </Badge>
                            <p className="text-2xl font-bold">{item.quantidade}</p>
                            <p className="text-sm text-gray-600">
                              R$ {item.valorTotal.toLocaleString('pt-BR')}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {tipoRelatorio === 'vida_util' && (
                <div className="space-y-4 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Timer className="h-5 w-5 text-yellow-600" />
                    <h3 className="font-semibold">Equipamentos Próximos ao Fim da Vida Útil</h3>
                  </div>

                  {relatorioVidaUtil.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Nenhum equipamento próximo ao fim da vida útil</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Equipamento</TableHead>
                          <TableHead>Nº Inventário</TableHead>
                          <TableHead>Idade</TableHead>
                          <TableHead>Data Aquisição</TableHead>
                          <TableHead>Departamento</TableHead>
                          <TableHead>Alerta</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {relatorioVidaUtil.map((item: any, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.equipamento}</TableCell>
                            <TableCell className="font-mono">{item.numeroInventario}</TableCell>
                            <TableCell>{item.idadeAnos} anos</TableCell>
                            <TableCell>{item.dataAquisicao}</TableCell>
                            <TableCell>{item.departamento}</TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Planejar renovação
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              )}

              {tipoRelatorio === 'garantia' && (
                <div className="space-y-4 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <h3 className="font-semibold">Alertas de Garantia</h3>
                  </div>

                  {relatorioGarantia.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Nenhum alerta de garantia</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Equipamento</TableHead>
                          <TableHead>Nº Inventário</TableHead>
                          <TableHead>Status Garantia</TableHead>
                          <TableHead>Dias</TableHead>
                          <TableHead>Data Garantia</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {relatorioGarantia.map((item: any, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.equipamento}</TableCell>
                            <TableCell className="font-mono">{item.numeroInventario}</TableCell>
                            <TableCell>
                              <Badge className={
                                item.statusGarantia === 'vencida' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }>
                                {item.statusGarantia === 'vencida' ? 'Vencida' : 'Vencendo'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {item.statusGarantia === 'vencida' 
                                ? `${item.diasRestantes} dias atrás`
                                : `${item.diasRestantes} dias`
                              }
                            </TableCell>
                            <TableCell>{item.dataGarantia}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              )}

              {tipoRelatorio === 'valor_contabil' && (
                <div className="space-y-4 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">Relatório por Valor Contábil</h3>
                  </div>

                  <Card className="mb-6">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-600">Valor Total do Inventário</p>
                      <p className="text-3xl font-bold text-green-600">
                        R$ {relatorioValorContabil.totalGeral.toLocaleString('pt-BR')}
                      </p>
                    </CardContent>
                  </Card>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Quantidade de Ativos</TableHead>
                        <TableHead>Valor Total</TableHead>
                        <TableHead>Percentual do Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(relatorioValorContabil.porDepartamento as any[]).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.departamento}</TableCell>
                          <TableCell>{item.quantidade}</TableCell>
                          <TableCell>R$ {item.valorTotal.toLocaleString('pt-BR')}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${item.percentual}%` }}
                                />
                              </div>
                              <span className="text-sm">{item.percentual.toFixed(1)}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botão Fechar */}
          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};