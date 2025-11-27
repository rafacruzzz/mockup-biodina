import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Eye, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { chamadosMock, tipoChamadoLabels, urgenciaLabels, statusChamadoLabels } from '@/data/juridicoModules';
import { ChamadoJuridico, TipoChamadoJuridico, UrgenciaChamadoJuridico, StatusChamadoJuridico } from '@/types/juridico';
import { toast } from '@/components/ui/use-toast';

export const ChamadosJuridicoTab = () => {
  const [chamados, setChamados] = useState<ChamadoJuridico[]>(chamadosMock);
  const [showNovoChamadoModal, setShowNovoChamadoModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState<ChamadoJuridico | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  // Formulário de novo chamado
  const [novoTipo, setNovoTipo] = useState<TipoChamadoJuridico>(TipoChamadoJuridico.ANALISE_DOCUMENTOS);
  const [novoUrgencia, setNovoUrgencia] = useState<UrgenciaChamadoJuridico>(UrgenciaChamadoJuridico.MEDIA);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoDescricao, setNovoDescricao] = useState('');
  const [novoPrazo, setNovoPrazo] = useState('');
  const [novoLicitacao, setNovoLicitacao] = useState('');

  const getUrgenciaBadge = (urgencia: UrgenciaChamadoJuridico) => {
    const config = {
      [UrgenciaChamadoJuridico.BAIXA]: 'bg-green-500',
      [UrgenciaChamadoJuridico.MEDIA]: 'bg-yellow-500',
      [UrgenciaChamadoJuridico.ALTA]: 'bg-orange-500',
      [UrgenciaChamadoJuridico.CRITICA]: 'bg-red-500',
    };

    return (
      <Badge className={`${config[urgencia]} text-white`}>
        {urgenciaLabels[urgencia]}
      </Badge>
    );
  };

  const getStatusBadge = (status: StatusChamadoJuridico) => {
    const config = {
      [StatusChamadoJuridico.ABERTO]: { color: 'bg-blue-500', icon: Clock },
      [StatusChamadoJuridico.EM_ANALISE]: { color: 'bg-purple-500', icon: AlertCircle },
      [StatusChamadoJuridico.AGUARDANDO_DOCUMENTOS]: { color: 'bg-yellow-500', icon: AlertCircle },
      [StatusChamadoJuridico.RESPONDIDO]: { color: 'bg-green-500', icon: CheckCircle2 },
      [StatusChamadoJuridico.FINALIZADO]: { color: 'bg-gray-500', icon: CheckCircle2 },
    };

    const { color, icon: Icon } = config[status];
    return (
      <Badge className={`${color} text-white flex items-center gap-1 w-fit`}>
        <Icon className="h-3 w-3" />
        {statusChamadoLabels[status]}
      </Badge>
    );
  };

  const handleCriarChamado = () => {
    if (!novoTitulo || !novoDescricao) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
        variant: 'destructive',
      });
      return;
    }

    const novoChamado: ChamadoJuridico = {
      id: String(chamados.length + 1),
      tipo: novoTipo,
      urgencia: novoUrgencia,
      status: StatusChamadoJuridico.ABERTO,
      titulo: novoTitulo,
      descricao: novoDescricao,
      solicitante: 'Usuário Atual',
      departamento: 'Departamento Atual',
      dataAbertura: new Date().toLocaleDateString('pt-BR'),
      prazoResposta: novoPrazo || undefined,
      licitacaoRelacionada: novoLicitacao || undefined,
    };

    setChamados([novoChamado, ...chamados]);
    setShowNovoChamadoModal(false);
    
    // Limpar formulário
    setNovoTitulo('');
    setNovoDescricao('');
    setNovoPrazo('');
    setNovoLicitacao('');

    toast({
      title: 'Sucesso',
      description: 'Chamado criado com sucesso!',
    });
  };

  const chamadosFiltrados = filtroStatus === 'todos' 
    ? chamados 
    : chamados.filter(c => c.status === filtroStatus);

  return (
    <div className="space-y-6">
      {/* Formulário de Novo Chamado */}
      <Card>
        <CardHeader>
          <CardTitle>Abrir Novo Chamado Jurídico</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowNovoChamadoModal(true)} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Novo Chamado
          </Button>
        </CardContent>
      </Card>

      {/* Filtros e Tabela */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Histórico de Chamados</CardTitle>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              {Object.entries(statusChamadoLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Urgência</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Abertura</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chamadosFiltrados.map((chamado) => (
                <TableRow key={chamado.id}>
                  <TableCell>
                    <Badge variant="outline">{tipoChamadoLabels[chamado.tipo]}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{chamado.titulo}</TableCell>
                  <TableCell>{chamado.solicitante}</TableCell>
                  <TableCell>{getUrgenciaBadge(chamado.urgencia)}</TableCell>
                  <TableCell>{getStatusBadge(chamado.status)}</TableCell>
                  <TableCell>{chamado.dataAbertura}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setChamadoSelecionado(chamado);
                        setShowDetalhesModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Novo Chamado */}
      <Dialog open={showNovoChamadoModal} onOpenChange={setShowNovoChamadoModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Chamado Jurídico</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Chamado *</Label>
                <Select value={novoTipo} onValueChange={(value) => setNovoTipo(value as TipoChamadoJuridico)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(tipoChamadoLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Urgência *</Label>
                <Select value={novoUrgencia} onValueChange={(value) => setNovoUrgencia(value as UrgenciaChamadoJuridico)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(urgenciaLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Título *</Label>
              <Input
                value={novoTitulo}
                onChange={(e) => setNovoTitulo(e.target.value)}
                placeholder="Título do chamado"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição Detalhada *</Label>
              <Textarea
                value={novoDescricao}
                onChange={(e) => setNovoDescricao(e.target.value)}
                placeholder="Descreva detalhadamente o que você precisa..."
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label>Prazo Desejado para Resposta</Label>
              <Input
                type="date"
                value={novoPrazo}
                onChange={(e) => setNovoPrazo(e.target.value)}
              />
            </div>

            {novoTipo === TipoChamadoJuridico.ELABORACAO_RECURSOS_LICITACAO && (
              <div className="space-y-2">
                <Label>Licitação Relacionada</Label>
                <Input
                  value={novoLicitacao}
                  onChange={(e) => setNovoLicitacao(e.target.value)}
                  placeholder="Ex: PE-045/2024 - Hospital Municipal"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNovoChamadoModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCriarChamado}>Criar Chamado</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Detalhes do Chamado */}
      {chamadoSelecionado && (
        <Dialog open={showDetalhesModal} onOpenChange={setShowDetalhesModal}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes do Chamado</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Tipo</Label>
                  <p className="font-medium">{tipoChamadoLabels[chamadoSelecionado.tipo]}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Urgência</Label>
                  <div className="mt-1">{getUrgenciaBadge(chamadoSelecionado.urgencia)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(chamadoSelecionado.status)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Data de Abertura</Label>
                  <p className="font-medium">{chamadoSelecionado.dataAbertura}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Título</Label>
                <p className="font-medium text-lg">{chamadoSelecionado.titulo}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Descrição</Label>
                <p className="text-sm whitespace-pre-wrap">{chamadoSelecionado.descricao}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Solicitante</Label>
                  <p className="font-medium">{chamadoSelecionado.solicitante}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Departamento</Label>
                  <p className="font-medium">{chamadoSelecionado.departamento}</p>
                </div>
              </div>

              {chamadoSelecionado.licitacaoRelacionada && (
                <div>
                  <Label className="text-muted-foreground">Licitação Relacionada</Label>
                  <p className="font-medium">{chamadoSelecionado.licitacaoRelacionada}</p>
                </div>
              )}

              {chamadoSelecionado.responsavelJuridico && (
                <div>
                  <Label className="text-muted-foreground">Responsável Jurídico</Label>
                  <p className="font-medium">{chamadoSelecionado.responsavelJuridico}</p>
                </div>
              )}

              {chamadoSelecionado.parecer && (
                <div className="border-t pt-4">
                  <Label className="text-muted-foreground">Parecer Jurídico</Label>
                  <div className="mt-2 p-4 bg-muted rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{chamadoSelecionado.parecer}</p>
                  </div>
                  {chamadoSelecionado.dataResposta && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Respondido em: {chamadoSelecionado.dataResposta}
                    </p>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
