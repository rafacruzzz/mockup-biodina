import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Eye, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
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

  const estatisticas = {
    total: processos.length,
    emAndamento: processos.filter(p => p.status === StatusProcesso.EM_ANDAMENTO).length,
    aguardandoPrazo: processos.filter(p => p.status === StatusProcesso.AGUARDANDO_PRAZO).length,
    encerrados: processos.filter(p => p.status === StatusProcesso.ENCERRADO).length,
  };

  return (
    <div className="space-y-6">
      {/* Dashboard com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                return (
                  <TableRow key={processo.id}>
                    <TableCell className="font-mono text-sm">{processo.numeroProcesso}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{tipoProcessoLabels[processo.tipo]}</Badge>
                    </TableCell>
                    <TableCell>{processo.parteContraria}</TableCell>
                    <TableCell>{getStatusBadge(processo.status)}</TableCell>
                    <TableCell>{processo.responsavelInterno}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {ultimoAndamento ? ultimoAndamento.data : 'Sem andamentos'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerDetalhes(processo)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalhes
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
