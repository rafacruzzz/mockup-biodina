import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { naoConformidadesRTMockadas, responsaveisNCRT } from "@/data/rtModules";
import type { NaoConformidadeRT, ImpactoNCRT, StatusNCRT } from "@/types/rt";

export function GestaoNCTab() {
  const [naoConformidades, setNaoConformidades] = useState(naoConformidadesRTMockadas);
  const [selectedNC, setSelectedNC] = useState<NaoConformidadeRT | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenNC = (nc: NaoConformidadeRT) => {
    setSelectedNC({ ...nc });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNC(null);
  };

  const handleSalvar = () => {
    if (!selectedNC) return;
    setNaoConformidades(prev => prev.map(nc => nc.id === selectedNC.id ? selectedNC : nc));
    setShowModal(false);
    setSelectedNC(null);
  };

  const getImpactoBadge = (impacto: ImpactoNCRT) => {
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

  const getStatusBadge = (status: StatusNCRT) => {
    switch (status) {
      case "Aberta":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Aberta</Badge>;
      case "Em Análise":
        return <Badge className="bg-orange-500 hover:bg-orange-600"><Clock className="w-3 h-3 mr-1" />Em Análise</Badge>;
      case "Aguardando Ação":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><AlertCircle className="w-3 h-3 mr-1" />Aguardando Ação</Badge>;
      case "Resolvida":
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" />Resolvida</Badge>;
      case "Fechada":
        return <Badge variant="secondary"><CheckCircle2 className="w-3 h-3 mr-1" />Fechada</Badge>;
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

  const totalNCs = naoConformidades.length;
  const ncsCriticas = naoConformidades.filter(nc => nc.impacto === "Crítico").length;
  const ncsModeradas = naoConformidades.filter(nc => nc.impacto === "Moderado").length;
  const ncsLeves = naoConformidades.filter(nc => nc.impacto === "Leve").length;
  const ncsAbertas = naoConformidades.filter(nc => nc.status === "Aberta" || nc.status === "Em Análise" || nc.status === "Aguardando Ação").length;

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de NCs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNCs}</div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-700">NCs Críticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{ncsCriticas}</div>
          </CardContent>
        </Card>

        <Card className="border-yellow-400 bg-yellow-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-yellow-800">NCs Moderadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">{ncsModeradas}</div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700">NCs Leves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{ncsLeves}</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">NCs Abertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{ncsAbertas}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Não Conformidades */}
      <Card>
        <CardHeader>
          <CardTitle>Não Conformidades Abertas - RT</CardTitle>
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
              {naoConformidades.map((nc) => (
                <TableRow key={nc.id}>
                  <TableCell className="font-medium">{nc.id}</TableCell>
                  <TableCell>{new Date(nc.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{nc.origem}</TableCell>
                  <TableCell>{nc.tipo}</TableCell>
                  <TableCell>{getImpactoBadge(nc.impacto)}</TableCell>
                  <TableCell>{nc.responsavel}</TableCell>
                  <TableCell>{new Date(nc.prazoExecucao).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{getStatusBadge(nc.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenNC(nc)}
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
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Não Conformidade - {selectedNC?.id}</DialogTitle>
          </DialogHeader>

          {selectedNC && (
            <div className="space-y-6">
              {/* Linha 1: Data + Origem (disabled) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Data da NC</Label>
                  <Input 
                    value={new Date(selectedNC.data).toLocaleDateString('pt-BR')} 
                    disabled 
                  />
                </div>
                <div>
                  <Label>Origem</Label>
                  <Input value={selectedNC.origem} disabled />
                </div>
              </div>

              {/* Linha 2: Tipo */}
              <div>
                <Label>Tipo</Label>
                <Select value={selectedNC.tipo} onValueChange={(val) => setSelectedNC({ ...selectedNC, tipo: val as any })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Documentação Desatualizada">Documentação Desatualizada</SelectItem>
                    <SelectItem value="Treinamento Inadequado">Treinamento Inadequado</SelectItem>
                    <SelectItem value="Falha de Processo">Falha de Processo</SelectItem>
                    <SelectItem value="Produto Não Liberado">Produto Não Liberado</SelectItem>
                    <SelectItem value="Não Conformidade Regulatória">Não Conformidade Regulatória</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Linha 3: Impacto + Responsável */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Impacto</Label>
                  <Select value={selectedNC.impacto} onValueChange={(val) => setSelectedNC({ ...selectedNC, impacto: val as ImpactoNCRT })}>
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
                  <Select value={selectedNC.responsavel} onValueChange={(val) => setSelectedNC({ ...selectedNC, responsavel: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {responsaveisNCRT.map((resp) => (
                        <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Prazo de Execução */}
              <div>
                <Label>Prazo de Execução</Label>
                <Input 
                  type="date" 
                  value={selectedNC.prazoExecucao} 
                  onChange={(e) => setSelectedNC({ ...selectedNC, prazoExecucao: e.target.value })}
                />
              </div>

              {/* Descrição */}
              <div>
                <Label>Descrição da NC</Label>
                <Textarea 
                  value={selectedNC.descricao} 
                  onChange={(e) => setSelectedNC({ ...selectedNC, descricao: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              {/* Ação Imediata */}
              <div>
                <Label>Ação Imediata</Label>
                <Textarea 
                  value={selectedNC.acaoImediata} 
                  onChange={(e) => setSelectedNC({ ...selectedNC, acaoImediata: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              {/* Observações */}
              <div>
                <Label>Observações</Label>
                <Textarea 
                  value={selectedNC.observacoes || ""} 
                  onChange={(e) => setSelectedNC({ ...selectedNC, observacoes: e.target.value })}
                  className="min-h-[60px]"
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
                      value={selectedNC.capa.acaoPreventiva} 
                      onChange={(e) => setSelectedNC({ ...selectedNC, capa: { ...selectedNC.capa, acaoPreventiva: e.target.value } })}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label>Ação Corretiva</Label>
                    <Textarea 
                      value={selectedNC.capa.acaoCorretiva} 
                      onChange={(e) => setSelectedNC({ ...selectedNC, capa: { ...selectedNC.capa, acaoCorretiva: e.target.value } })}
                      className="min-h-[80px]"
                    />
                  </div>

                  {selectedNC.capa.gerenciamentoTarefas && (
                    <div>
                      <Label>Gerenciamento da Execução de Tarefas</Label>
                      <Textarea 
                        value={selectedNC.capa.gerenciamentoTarefas} 
                        onChange={(e) => setSelectedNC({ ...selectedNC, capa: { ...selectedNC.capa, gerenciamentoTarefas: e.target.value } })}
                        className="min-h-[80px]"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Prazo Final</Label>
                      <Input 
                        type="date" 
                        value={selectedNC.capa.prazoFinal} 
                        onChange={(e) => setSelectedNC({ ...selectedNC, capa: { ...selectedNC.capa, prazoFinal: e.target.value } })}
                      />
                    </div>
                    <div>
                      <Label>Status CAPA</Label>
                      <div className="mt-2">
                        {getStatusCAPABadge(selectedNC.capa.status)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Responsável CAPA</Label>
                    <Select value={selectedNC.capa.responsavel} onValueChange={(val) => setSelectedNC({ ...selectedNC, capa: { ...selectedNC.capa, responsavel: val } })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {responsaveisNCRT.map((resp) => (
                          <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCloseModal}>Cancelar</Button>
                <Button onClick={handleSalvar}>Salvar Alterações</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
