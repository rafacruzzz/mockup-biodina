import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { naoConformidadesMockadas, responsaveisNC } from '@/data/qualidadeData';
import { NaoConformidade, ImpactoNC, TipoNC, StatusCAPA } from '@/types/qualidade';
import { format } from 'date-fns';

export const GestaoNCTab = () => {
  const [ncs, setNcs] = useState<NaoConformidade[]>(naoConformidadesMockadas);
  const [ncSelecionada, setNcSelecionada] = useState<NaoConformidade | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const getImpactoBadge = (impacto: ImpactoNC) => {
    switch (impacto) {
      case "Crítico":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <Badge variant="destructive">Crítico</Badge>
          </div>
        );
      case "Moderado":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            <Badge className="bg-yellow-400 hover:bg-yellow-500 text-yellow-950">Moderado</Badge>
          </div>
        );
      case "Leve":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <Badge className="bg-green-500 hover:bg-green-600 text-white">Leve</Badge>
          </div>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aberta":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Aberta</Badge>;
      case "Em Análise":
        return <Badge className="bg-orange-500 hover:bg-orange-600"><Clock className="w-3 h-3 mr-1" />Em Análise</Badge>;
      case "Aguardando CAPA":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><AlertCircle className="w-3 h-3 mr-1" />Aguardando CAPA</Badge>;
      case "Resolvida":
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" />Resolvida</Badge>;
      case "Concluída":
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" />Concluída</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusCAPABadge = (status: string) => {
    switch (status) {
      case "Pendente":
        return <Badge variant="outline">Pendente</Badge>;
      case "Em Andamento":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Em Andamento</Badge>;
      case "Concluída":
        return <Badge className="bg-green-500 hover:bg-green-600">Concluída</Badge>;
      case "Verificada":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Verificada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const abrirDetalhesNC = (nc: NaoConformidade) => {
    setNcSelecionada(nc);
    setModalAberto(true);
  };

  const atualizarNC = () => {
    if (ncSelecionada) {
      setNcs(ncs.map(nc => nc.id === ncSelecionada.id ? { ...ncSelecionada, dataAtualizacao: new Date() } : nc));
      setModalAberto(false);
    }
  };

  // Estatísticas
  const estatisticas = {
    total: ncs.length,
    criticas: ncs.filter(nc => nc.impacto === 'Crítico').length,
    moderadas: ncs.filter(nc => nc.impacto === 'Moderado').length,
    leves: ncs.filter(nc => nc.impacto === 'Leve').length,
    abertas: ncs.filter(nc => nc.status === 'Aberta' || nc.status === 'Em Análise').length
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de NCs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.total}</div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-700">NCs Críticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{estatisticas.criticas}</div>
          </CardContent>
        </Card>

        <Card className="border-yellow-400 bg-yellow-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-yellow-800">NCs Moderadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">{estatisticas.moderadas}</div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700">NCs Leves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{estatisticas.leves}</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">NCs Abertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{estatisticas.abertas}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Não Conformidades Abertas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID da NC</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Impacto</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ncs.map((nc) => (
                <TableRow key={nc.id}>
                  <TableCell className="font-medium">{nc.numeroNC}</TableCell>
                  <TableCell>{format(nc.dataCriacao, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{nc.origem}</TableCell>
                  <TableCell>{nc.tipo}</TableCell>
                  <TableCell>{getImpactoBadge(nc.impacto)}</TableCell>
                  <TableCell>{nc.responsavel}</TableCell>
                  <TableCell>{format(nc.prazo, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{getStatusBadge(nc.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => abrirDetalhesNC(nc)}
                    >
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Detalhes da NC */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Não Conformidade - {ncSelecionada?.numeroNC}</DialogTitle>
          </DialogHeader>
          
          {ncSelecionada && (
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Origem</Label>
                  <Input value={ncSelecionada.origem} disabled />
                </div>
                <div>
                  <Label>Tipo</Label>
                  <Select
                    value={ncSelecionada.tipo}
                    onValueChange={(value: TipoNC) => setNcSelecionada({ ...ncSelecionada, tipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Material Não Conforme">Material Não Conforme</SelectItem>
                      <SelectItem value="Atendimento">Atendimento</SelectItem>
                      <SelectItem value="Treinamento Falho">Treinamento Falho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Impacto</Label>
                  <Select
                    value={ncSelecionada.impacto}
                    onValueChange={(value: ImpactoNC) => setNcSelecionada({ ...ncSelecionada, impacto: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Crítico">Crítico</SelectItem>
                      <SelectItem value="Moderado">Moderado</SelectItem>
                      <SelectItem value="Leve">Leve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Responsável</Label>
                  <Select
                    value={ncSelecionada.responsavel}
                    onValueChange={(value) => setNcSelecionada({ ...ncSelecionada, responsavel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {responsaveisNC.map((resp) => (
                        <SelectItem key={resp} value={resp}>
                          {resp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Prazo de Execução</Label>
                <Input
                  type="date"
                  value={format(ncSelecionada.prazo, 'yyyy-MM-dd')}
                  onChange={(e) => setNcSelecionada({ ...ncSelecionada, prazo: new Date(e.target.value) })}
                />
              </div>

              <div>
                <Label>Descrição da NC</Label>
                <Textarea
                  value={ncSelecionada.descricao}
                  onChange={(e) => setNcSelecionada({ ...ncSelecionada, descricao: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label>Ação Imediata</Label>
                <Textarea
                  value={ncSelecionada.acaoImediata || ''}
                  onChange={(e) => setNcSelecionada({ ...ncSelecionada, acaoImediata: e.target.value })}
                  rows={2}
                  placeholder="Descreva a ação imediata tomada..."
                />
              </div>

              {/* Seção CAPA */}
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">CAPA - Ação Corretiva e Preventiva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Ação Preventiva</Label>
                    <Textarea
                      value={ncSelecionada.capa?.acaoPreventiva || ''}
                      onChange={(e) => setNcSelecionada({
                        ...ncSelecionada,
                        capa: {
                          ...ncSelecionada.capa!,
                          id: ncSelecionada.capa?.id || `capa-${ncSelecionada.id}`,
                          acaoPreventiva: e.target.value,
                          acaoCorretiva: ncSelecionada.capa?.acaoCorretiva || '',
                          prazoFinal: ncSelecionada.capa?.prazoFinal || new Date(),
                          status: ncSelecionada.capa?.status || 'Pendente',
                          responsavel: ncSelecionada.capa?.responsavel || ''
                        }
                      })}
                      rows={2}
                      placeholder="Descreva a ação preventiva..."
                    />
                  </div>

                  <div>
                    <Label>Ação Corretiva</Label>
                    <Textarea
                      value={ncSelecionada.capa?.acaoCorretiva || ''}
                      onChange={(e) => setNcSelecionada({
                        ...ncSelecionada,
                        capa: {
                          ...ncSelecionada.capa!,
                          id: ncSelecionada.capa?.id || `capa-${ncSelecionada.id}`,
                          acaoPreventiva: ncSelecionada.capa?.acaoPreventiva || '',
                          acaoCorretiva: e.target.value,
                          prazoFinal: ncSelecionada.capa?.prazoFinal || new Date(),
                          status: ncSelecionada.capa?.status || 'Pendente',
                          responsavel: ncSelecionada.capa?.responsavel || ''
                        }
                      })}
                      rows={2}
                      placeholder="Descreva a ação corretiva..."
                    />
                  </div>

                  {ncSelecionada.capa?.gerenciamentoTarefas && (
                    <div>
                      <Label>Gerenciamento da Execução de Tarefas</Label>
                      <Textarea 
                        value={ncSelecionada.capa.gerenciamentoTarefas} 
                        disabled 
                        className="min-h-[80px]"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Prazo Final</Label>
                      <Input
                        type="date"
                        value={ncSelecionada.capa?.prazoFinal ? format(ncSelecionada.capa.prazoFinal, 'yyyy-MM-dd') : ''}
                        onChange={(e) => setNcSelecionada({
                          ...ncSelecionada,
                          capa: {
                            ...ncSelecionada.capa!,
                            id: ncSelecionada.capa?.id || `capa-${ncSelecionada.id}`,
                            acaoPreventiva: ncSelecionada.capa?.acaoPreventiva || '',
                            acaoCorretiva: ncSelecionada.capa?.acaoCorretiva || '',
                            prazoFinal: new Date(e.target.value),
                            status: ncSelecionada.capa?.status || 'Pendente',
                            responsavel: ncSelecionada.capa?.responsavel || ''
                          }
                        })}
                      />
                    </div>
                    <div>
                      <Label>Status CAPA</Label>
                      <div className="mt-2">
                        {getStatusCAPABadge(ncSelecionada.capa?.status || 'Pendente')}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Responsável CAPA</Label>
                    <Select
                      value={ncSelecionada.capa?.responsavel || ''}
                      onValueChange={(value) => setNcSelecionada({
                        ...ncSelecionada,
                        capa: {
                          ...ncSelecionada.capa!,
                          id: ncSelecionada.capa?.id || `capa-${ncSelecionada.id}`,
                          acaoPreventiva: ncSelecionada.capa?.acaoPreventiva || '',
                          acaoCorretiva: ncSelecionada.capa?.acaoCorretiva || '',
                          prazoFinal: ncSelecionada.capa?.prazoFinal || new Date(),
                          status: ncSelecionada.capa?.status || 'Pendente',
                          responsavel: value
                        }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o responsável" />
                      </SelectTrigger>
                      <SelectContent>
                        {responsaveisNC.map((resp) => (
                          <SelectItem key={resp} value={resp}>
                            {resp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
                <Button onClick={atualizarNC}>
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
