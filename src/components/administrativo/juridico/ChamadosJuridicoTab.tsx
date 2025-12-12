import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Eye, AlertCircle, Clock, CheckCircle2, Send, MessageSquare, Calendar, User, FileText, Briefcase } from 'lucide-react';
import { chamadosMock, tipoChamadoLabels, urgenciaLabels, statusChamadoLabels } from '@/data/juridicoModules';
import { ChamadoJuridico, StatusChamadoJuridico, UrgenciaChamadoJuridico, RespostaJuridico } from '@/types/juridico';
import { toast } from '@/components/ui/use-toast';

export const ChamadosJuridicoTab = () => {
  const [chamados, setChamados] = useState<ChamadoJuridico[]>(chamadosMock);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState<ChamadoJuridico | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  // Estado para nova resposta
  const [novaResposta, setNovaResposta] = useState('');
  const [novoStatus, setNovoStatus] = useState<StatusChamadoJuridico | ''>('');

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

  const handleEnviarResposta = () => {
    if (!novaResposta.trim()) {
      toast({
        title: 'Erro',
        description: 'Digite uma resposta antes de enviar',
        variant: 'destructive',
      });
      return;
    }

    if (!chamadoSelecionado) return;

    const resposta: RespostaJuridico = {
      id: String(Date.now()),
      data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      responsavel: 'Dr. Carlos Silva', // Mock - seria o usuário logado
      mensagem: novaResposta,
    };

    const chamadoAtualizado: ChamadoJuridico = {
      ...chamadoSelecionado,
      historicoRespostas: [...(chamadoSelecionado.historicoRespostas || []), resposta],
      status: novoStatus || chamadoSelecionado.status,
      responsavelJuridico: chamadoSelecionado.responsavelJuridico || 'Dr. Carlos Silva',
      dataResposta: new Date().toLocaleDateString('pt-BR'),
    };

    // Atualizar a lista de chamados
    setChamados(chamados.map(c => c.id === chamadoAtualizado.id ? chamadoAtualizado : c));
    setChamadoSelecionado(chamadoAtualizado);

    // Limpar formulário
    setNovaResposta('');
    setNovoStatus('');

    toast({
      title: 'Resposta enviada',
      description: `Resposta enviada para ${chamadoSelecionado.solicitante} do departamento ${chamadoSelecionado.departamento}`,
    });
  };

  const chamadosFiltrados = filtroStatus === 'todos' 
    ? chamados 
    : chamados.filter(c => c.status === filtroStatus);

  // Estatísticas
  const estatisticas = {
    total: chamados.length,
    abertos: chamados.filter(c => c.status === StatusChamadoJuridico.ABERTO).length,
    emAnalise: chamados.filter(c => c.status === StatusChamadoJuridico.EM_ANALISE).length,
    respondidos: chamados.filter(c => c.status === StatusChamadoJuridico.RESPONDIDO || c.status === StatusChamadoJuridico.FINALIZADO).length,
  };

  return (
    <div className="space-y-6">
      {/* Dashboard com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Chamados</p>
                <p className="text-3xl font-bold">{estatisticas.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className={estatisticas.abertos > 0 ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' : ''}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aguardando Resposta</p>
                <p className="text-3xl font-bold text-blue-600">{estatisticas.abertos}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Análise</p>
                <p className="text-3xl font-bold text-purple-600">{estatisticas.emAnalise}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Respondidos/Finalizados</p>
                <p className="text-3xl font-bold text-green-600">{estatisticas.respondidos}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Tabela */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Chamados Recebidos</CardTitle>
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
                <TableHead>Departamento</TableHead>
                <TableHead>Urgência</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Abertura</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chamadosFiltrados.map((chamado) => (
                <TableRow 
                  key={chamado.id}
                  className={chamado.status === StatusChamadoJuridico.ABERTO ? 'bg-blue-50 dark:bg-blue-950/20' : ''}
                >
                  <TableCell>
                    <Badge variant="outline">{tipoChamadoLabels[chamado.tipo]}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{chamado.titulo}</TableCell>
                  <TableCell>{chamado.solicitante}</TableCell>
                  <TableCell>{chamado.departamento}</TableCell>
                  <TableCell>{getUrgenciaBadge(chamado.urgencia)}</TableCell>
                  <TableCell>{getStatusBadge(chamado.status)}</TableCell>
                  <TableCell>{chamado.dataAbertura}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant={chamado.status === StatusChamadoJuridico.ABERTO ? "default" : "outline"}
                      onClick={() => {
                        setChamadoSelecionado(chamado);
                        setShowDetalhesModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {chamado.status === StatusChamadoJuridico.ABERTO ? 'Responder' : 'Ver Detalhes'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Detalhes do Chamado com Resposta */}
      {chamadoSelecionado && (
        <Dialog open={showDetalhesModal} onOpenChange={setShowDetalhesModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Chamado #{chamadoSelecionado.id}
                {getStatusBadge(chamadoSelecionado.status)}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Informações do Chamado */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Informações do Chamado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Tipo</Label>
                      <p className="text-sm font-medium">{tipoChamadoLabels[chamadoSelecionado.tipo]}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Urgência</Label>
                      <div className="mt-1">{getUrgenciaBadge(chamadoSelecionado.urgencia)}</div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Data de Abertura</Label>
                      <p className="text-sm font-medium">{chamadoSelecionado.dataAbertura}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Prazo Resposta</Label>
                      <p className="text-sm font-medium">{chamadoSelecionado.prazoResposta || '-'}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-xs text-muted-foreground">Título</Label>
                    <p className="text-base font-semibold">{chamadoSelecionado.titulo}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Descrição</Label>
                    <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-lg mt-1">
                      {chamadoSelecionado.descricao}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="text-xs text-muted-foreground">Solicitante</Label>
                        <p className="text-sm font-medium">{chamadoSelecionado.solicitante}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="text-xs text-muted-foreground">Departamento</Label>
                        <p className="text-sm font-medium">{chamadoSelecionado.departamento}</p>
                      </div>
                    </div>
                  </div>

                  {chamadoSelecionado.licitacaoRelacionada && (
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <Label className="text-xs text-muted-foreground">Licitação Relacionada</Label>
                      <p className="text-sm font-medium">{chamadoSelecionado.licitacaoRelacionada}</p>
                    </div>
                  )}

                  {chamadoSelecionado.projetoRelacionado && (
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <Label className="text-xs text-muted-foreground">Projeto Relacionado</Label>
                      <p className="text-sm font-medium">{chamadoSelecionado.projetoRelacionado}</p>
                    </div>
                  )}

                  {chamadoSelecionado.documentosAnexados && chamadoSelecionado.documentosAnexados.length > 0 && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Documentos Anexados</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {chamadoSelecionado.documentosAnexados.map((doc) => (
                          <Badge key={doc.id} variant="secondary" className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {doc.nome}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Histórico de Respostas */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Histórico de Respostas
                    {chamadoSelecionado.historicoRespostas && chamadoSelecionado.historicoRespostas.length > 0 && (
                      <Badge variant="secondary">{chamadoSelecionado.historicoRespostas.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(!chamadoSelecionado.historicoRespostas || chamadoSelecionado.historicoRespostas.length === 0) ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nenhuma resposta registrada ainda
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {chamadoSelecionado.historicoRespostas.map((resposta, index) => (
                        <div key={resposta.id} className="relative pl-8 pb-4">
                          {/* Linha vertical */}
                          {index !== chamadoSelecionado.historicoRespostas!.length - 1 && (
                            <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
                          )}
                          
                          {/* Ponto */}
                          <div className="absolute left-2 top-1 h-3 w-3 rounded-full bg-primary" />

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{resposta.data}</span>
                              <span>•</span>
                              <User className="h-4 w-4" />
                              <span>{resposta.responsavel}</span>
                            </div>

                            <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                              <p className="text-sm whitespace-pre-wrap">{resposta.mensagem}</p>
                            </div>

                            {resposta.documentosAnexados && resposta.documentosAnexados.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {resposta.documentosAnexados.map((doc) => (
                                  <Badge key={doc.id} variant="secondary" className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    {doc.nome}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Parecer antigo (para compatibilidade) */}
                  {chamadoSelecionado.parecer && !chamadoSelecionado.historicoRespostas?.length && (
                    <div className="p-4 bg-muted rounded-lg">
                      <Label className="text-xs text-muted-foreground">Parecer Jurídico</Label>
                      <p className="text-sm whitespace-pre-wrap mt-1">{chamadoSelecionado.parecer}</p>
                      {chamadoSelecionado.dataResposta && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Respondido em: {chamadoSelecionado.dataResposta} por {chamadoSelecionado.responsavelJuridico}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Formulário de Nova Resposta */}
              {chamadoSelecionado.status !== StatusChamadoJuridico.FINALIZADO && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Enviar Resposta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Resposta *</Label>
                      <Textarea
                        value={novaResposta}
                        onChange={(e) => setNovaResposta(e.target.value)}
                        placeholder="Digite sua resposta para o solicitante..."
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        Esta resposta será enviada para {chamadoSelecionado.solicitante} ({chamadoSelecionado.departamento})
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Atualizar Status (opcional)</Label>
                      <Select value={novoStatus} onValueChange={(value) => setNovoStatus(value as StatusChamadoJuridico)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Manter status atual" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={StatusChamadoJuridico.EM_ANALISE}>Em Análise</SelectItem>
                          <SelectItem value={StatusChamadoJuridico.AGUARDANDO_DOCUMENTOS}>Aguardando Documentos</SelectItem>
                          <SelectItem value={StatusChamadoJuridico.RESPONDIDO}>Respondido</SelectItem>
                          <SelectItem value={StatusChamadoJuridico.FINALIZADO}>Finalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleEnviarResposta}>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Resposta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
