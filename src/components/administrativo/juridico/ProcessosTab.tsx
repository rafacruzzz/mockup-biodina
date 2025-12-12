import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Eye, FileText, Clock, CheckCircle, AlertCircle, Bell, Newspaper } from 'lucide-react';
import { processosMock, tipoProcessoLabels, statusProcessoLabels } from '@/data/juridicoModules';
import { ProcessoJuridico, StatusProcesso } from '@/types/juridico';
import { NovoProcessoModal } from './NovoProcessoModal';
import { ProcessoDetalhesModal } from './ProcessoDetalhesModal';
import { NovoAndamentoModal } from './NovoAndamentoModal';

export const ProcessosTab = () => {
  const [processos, setProcessos] = useState<ProcessoJuridico[]>(processosMock);
  const [showNovoProcessoModal, setShowNovoProcessoModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showAndamentoModal, setShowAndamentoModal] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] = useState<ProcessoJuridico | null>(null);

  const getStatusBadge = (status: StatusProcesso) => {
    const config = {
      [StatusProcesso.EM_ANDAMENTO]: { color: 'bg-blue-500', icon: Clock },
      [StatusProcesso.AGUARDANDO_PRAZO]: { color: 'bg-yellow-500', icon: AlertCircle },
      [StatusProcesso.SUSPENSO]: { color: 'bg-orange-500', icon: AlertCircle },
      [StatusProcesso.ENCERRADO]: { color: 'bg-green-500', icon: CheckCircle },
      [StatusProcesso.ARQUIVADO]: { color: 'bg-gray-500', icon: FileText },
    };

    const { color, icon: Icon } = config[status];
    return (
      <Badge className={`${color} text-white flex items-center gap-1 w-fit`}>
        <Icon className="h-3 w-3" />
        {statusProcessoLabels[status]}
      </Badge>
    );
  };

  const handleVerDetalhes = (processo: ProcessoJuridico) => {
    setProcessoSelecionado(processo);
    setShowDetalhesModal(true);
  };

  const handleAdicionarAndamento = (processo: ProcessoJuridico) => {
    setProcessoSelecionado(processo);
    setShowAndamentoModal(true);
  };

  // Verifica se processo tem atualizações não visualizadas do DOU
  const temAtualizacoesNaoVisualizadas = (processo: ProcessoJuridico) => {
    return processo.atualizacoesDOU?.some(a => !a.visualizada) ?? false;
  };

  const contarAtualizacoesNaoVisualizadas = (processo: ProcessoJuridico) => {
    return processo.atualizacoesDOU?.filter(a => !a.visualizada).length ?? 0;
  };

  const estatisticas = {
    total: processos.length,
    emAndamento: processos.filter(p => p.status === StatusProcesso.EM_ANDAMENTO).length,
    aguardandoPrazo: processos.filter(p => p.status === StatusProcesso.AGUARDANDO_PRAZO).length,
    encerrados: processos.filter(p => p.status === StatusProcesso.ENCERRADO).length,
    comAtualizacoesDOU: processos.filter(p => temAtualizacoesNaoVisualizadas(p)).length,
  };

  return (
    <div className="space-y-6">
      {/* Dashboard com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Processos</p>
                <p className="text-3xl font-bold">{estatisticas.total}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
                <p className="text-3xl font-bold text-blue-600">{estatisticas.emAndamento}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aguardando Prazo</p>
                <p className="text-3xl font-bold text-yellow-600">{estatisticas.aguardandoPrazo}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Encerrados</p>
                <p className="text-3xl font-bold text-green-600">{estatisticas.encerrados}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className={estatisticas.comAtualizacoesDOU > 0 ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20' : ''}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atualizações DOU</p>
                <p className={`text-3xl font-bold ${estatisticas.comAtualizacoesDOU > 0 ? 'text-orange-600' : ''}`}>
                  {estatisticas.comAtualizacoesDOU}
                </p>
              </div>
              <div className="relative">
                <Newspaper className={`h-8 w-8 ${estatisticas.comAtualizacoesDOU > 0 ? 'text-orange-600' : 'text-muted-foreground'}`} />
                {estatisticas.comAtualizacoesDOU > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                    <Bell className="h-2.5 w-2.5 text-white animate-pulse" />
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Processos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Processos Judiciais e Administrativos</CardTitle>
          <Button onClick={() => setShowNovoProcessoModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Processo
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número do Processo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Parte Contrária</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Última Movimentação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processos.map((processo) => {
                const ultimoAndamento = processo.andamentos[processo.andamentos.length - 1];
                const temNovasAtualizacoes = temAtualizacoesNaoVisualizadas(processo);
                const qtdAtualizacoes = contarAtualizacoesNaoVisualizadas(processo);
                
                return (
                  <TableRow 
                    key={processo.id}
                    className={temNovasAtualizacoes ? 'bg-orange-50 dark:bg-orange-950/20' : ''}
                  >
                    <TableCell className="font-mono text-sm">
                      <div className="flex items-center gap-2">
                        {processo.numeroProcesso}
                        {processo.monitoramentoDOU?.ativo && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            <Newspaper className="h-3 w-3 mr-1" />
                            DOU
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tipoProcessoLabels[processo.tipo]}</Badge>
                    </TableCell>
                    <TableCell>{processo.parteContraria}</TableCell>
                    <TableCell>{getStatusBadge(processo.status)}</TableCell>
                    <TableCell>{processo.responsavelInterno}</TableCell>
                    <TableCell>
                      {temNovasAtualizacoes ? (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-orange-500 text-white animate-pulse flex items-center gap-1">
                            <Bell className="h-3 w-3" />
                            {qtdAtualizacoes} nova{qtdAtualizacoes > 1 ? 's' : ''} atualização{qtdAtualizacoes > 1 ? 'ões' : ''} DOU
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {ultimoAndamento ? ultimoAndamento.data : 'Sem andamentos'}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant={temNovasAtualizacoes ? "default" : "outline"}
                          onClick={() => handleVerDetalhes(processo)}
                          className={temNovasAtualizacoes ? 'bg-orange-500 hover:bg-orange-600' : ''}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {temNovasAtualizacoes ? 'Ver Atualizações' : 'Ver Detalhes'}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAdicionarAndamento(processo)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Andamento
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modais */}
      <NovoProcessoModal
        open={showNovoProcessoModal}
        onOpenChange={setShowNovoProcessoModal}
        onProcessoCreated={(novoProcesso) => {
          setProcessos([novoProcesso, ...processos]);
        }}
      />

      {processoSelecionado && (
        <>
          <ProcessoDetalhesModal
            open={showDetalhesModal}
            onOpenChange={setShowDetalhesModal}
            processo={processoSelecionado}
            onProcessoUpdated={(processoAtualizado) => {
              setProcessos(processos.map(p => 
                p.id === processoAtualizado.id ? processoAtualizado : p
              ));
              setProcessoSelecionado(processoAtualizado);
            }}
          />

          <NovoAndamentoModal
            open={showAndamentoModal}
            onOpenChange={setShowAndamentoModal}
            processo={processoSelecionado}
            onAndamentoCreated={(processoAtualizado) => {
              setProcessos(processos.map(p => 
                p.id === processoAtualizado.id ? processoAtualizado : p
              ));
            }}
          />
        </>
      )}
    </div>
  );
};
