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
import { AlertCircle, Circle } from 'lucide-react';
import { naoConformidadesMockadas, responsaveisNC } from '@/data/qualidadeData';
import { NaoConformidade, ImpactoNC, TipoNC, StatusCAPA } from '@/types/qualidade';
import { format } from 'date-fns';

export const GestaoNCTab = () => {
  const [ncs, setNcs] = useState<NaoConformidade[]>(naoConformidadesMockadas);
  const [ncSelecionada, setNcSelecionada] = useState<NaoConformidade | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const getImpactoColor = (impacto: ImpactoNC) => {
    switch (impacto) {
      case 'Crítico':
        return 'text-destructive';
      case 'Moderado':
        return 'text-yellow-500';
      case 'Baixo':
        return 'text-blue-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getImpactoBadgeVariant = (impacto: ImpactoNC) => {
    switch (impacto) {
      case 'Crítico':
        return 'destructive';
      case 'Moderado':
        return 'default';
      case 'Baixo':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Aberta':
        return 'destructive';
      case 'Em Análise':
        return 'default';
      case 'Aguardando CAPA':
        return 'secondary';
      case 'Resolvida':
      case 'Concluída':
        return 'outline';
      default:
        return 'secondary';
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
    baixas: ncs.filter(nc => nc.impacto === 'Baixo').length,
    abertas: ncs.filter(nc => nc.status === 'Aberta' || nc.status === 'Em Análise').length
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{estatisticas.total}</div>
              <div className="text-sm text-muted-foreground mt-1">Total de NCs</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive flex items-center justify-center gap-2">
                <Circle className="h-4 w-4 fill-current animate-pulse" />
                {estatisticas.criticas}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Críticas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 flex items-center justify-center gap-2">
                <Circle className="h-4 w-4 fill-current animate-pulse" />
                {estatisticas.moderadas}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Moderadas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 flex items-center justify-center gap-2">
                <Circle className="h-4 w-4 fill-current" />
                {estatisticas.baixas}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Baixas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{estatisticas.abertas}</div>
              <div className="text-sm text-muted-foreground mt-1">Em Aberto</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Não Conformidades Abertas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Impacto</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ncs.map((nc) => (
                <TableRow key={nc.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{nc.numeroNC}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{nc.origem}</Badge>
                  </TableCell>
                  <TableCell>{nc.tipo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Circle className={`h-3 w-3 fill-current ${getImpactoColor(nc.impacto)} ${nc.impacto === 'Crítico' || nc.impacto === 'Moderado' ? 'animate-pulse' : ''}`} />
                      <Badge variant={getImpactoBadgeVariant(nc.impacto)}>
                        {nc.impacto}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{nc.responsavel}</TableCell>
                  <TableCell>{format(nc.prazo, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(nc.status)}>
                      {nc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
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
                      <SelectItem value="Baixo">Baixo</SelectItem>
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
                      <Select
                        value={ncSelecionada.capa?.status || 'Pendente'}
                        onValueChange={(value: StatusCAPA) => setNcSelecionada({
                          ...ncSelecionada,
                          capa: {
                            ...ncSelecionada.capa!,
                            id: ncSelecionada.capa?.id || `capa-${ncSelecionada.id}`,
                            acaoPreventiva: ncSelecionada.capa?.acaoPreventiva || '',
                            acaoCorretiva: ncSelecionada.capa?.acaoCorretiva || '',
                            prazoFinal: ncSelecionada.capa?.prazoFinal || new Date(),
                            status: value,
                            responsavel: ncSelecionada.capa?.responsavel || ''
                          }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                          <SelectItem value="Concluída">Concluída</SelectItem>
                        </SelectContent>
                      </Select>
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
