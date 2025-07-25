
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { CheckCircle, XCircle, Clock, FileText, AlertCircle } from 'lucide-react';
import { SolicitacaoAlteracao } from '@/types/solicitacao';
import { getSolicitacoesByColaborador, getStatusColor, getStatusText } from '@/data/solicitacoes';
import { useToast } from '@/hooks/use-toast';

interface SolicitacoesTabProps {
  colaboradorId: string;
}

const SolicitacoesTab = ({ colaboradorId }: SolicitacoesTabProps) => {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAlteracao[]>(
    getSolicitacoesByColaborador(colaboradorId)
  );
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<SolicitacaoAlteracao | null>(null);
  const [observacoesRH, setObservacoesRH] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleAprovar = () => {
    if (!selectedSolicitacao) return;

    const updatedSolicitacoes = solicitacoes.map(sol => 
      sol.id === selectedSolicitacao.id 
        ? {
            ...sol,
            status: 'aprovada' as const,
            observacoesRH,
            dataProcessamento: new Date().toISOString().split('T')[0],
            processadoPor: 'Sistema RH'
          }
        : sol
    );

    setSolicitacoes(updatedSolicitacoes);
    setIsModalOpen(false);
    setObservacoesRH('');
    setSelectedSolicitacao(null);

    toast({
      title: "Solicitação aprovada",
      description: `Protocolo #${selectedSolicitacao.protocolo} foi aprovado com sucesso.`,
    });
  };

  const handleRejeitar = () => {
    if (!selectedSolicitacao) return;

    const updatedSolicitacoes = solicitacoes.map(sol => 
      sol.id === selectedSolicitacao.id 
        ? {
            ...sol,
            status: 'rejeitada' as const,
            observacoesRH,
            dataProcessamento: new Date().toISOString().split('T')[0],
            processadoPor: 'Sistema RH'
          }
        : sol
    );

    setSolicitacoes(updatedSolicitacoes);
    setIsModalOpen(false);
    setObservacoesRH('');
    setSelectedSolicitacao(null);

    toast({
      title: "Solicitação rejeitada",
      description: `Protocolo #${selectedSolicitacao.protocolo} foi rejeitado.`,
    });
  };

  const handleEmAnalise = () => {
    if (!selectedSolicitacao) return;

    const updatedSolicitacoes = solicitacoes.map(sol => 
      sol.id === selectedSolicitacao.id 
        ? {
            ...sol,
            status: 'em-analise' as const,
            observacoesRH,
            dataProcessamento: new Date().toISOString().split('T')[0],
            processadoPor: 'Sistema RH'
          }
        : sol
    );

    setSolicitacoes(updatedSolicitacoes);
    setIsModalOpen(false);
    setObservacoesRH('');
    setSelectedSolicitacao(null);

    toast({
      title: "Solicitação em análise",
      description: `Protocolo #${selectedSolicitacao.protocolo} está sendo analisado.`,
    });
  };

  const openModal = (solicitacao: SolicitacaoAlteracao) => {
    setSelectedSolicitacao(solicitacao);
    setObservacoesRH(solicitacao.observacoesRH || '');
    setIsModalOpen(true);
  };

  if (solicitacoes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Nenhuma solicitação encontrada</p>
        <p className="text-gray-400 text-sm">Este colaborador ainda não fez solicitações de alteração</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-biodina-blue">
          Solicitações de Alteração
        </h3>
        <Badge variant="outline" className="bg-biodina-gold/10 text-biodina-gold">
          {solicitacoes.length} solicitações
        </Badge>
      </div>

      <div className="grid gap-4">
        {solicitacoes.map((solicitacao) => (
          <Card key={solicitacao.id} className="border-l-4 border-l-biodina-gold/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Protocolo #{solicitacao.protocolo}
                    <Badge className={getStatusColor(solicitacao.status)}>
                      {getStatusText(solicitacao.status)}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {solicitacao.aba} • {solicitacao.campo}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{new Date(solicitacao.dataSolicitacao).toLocaleDateString('pt-BR')}</p>
                  <p>{solicitacao.tipoSolicitacao}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Valor Atual:</p>
                  <p className="text-sm bg-gray-50 p-2 rounded">{solicitacao.valorAtual}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Valor Solicitado:</p>
                  <p className="text-sm bg-blue-50 p-2 rounded">{solicitacao.valorSolicitado}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Motivo:</p>
                <p className="text-sm text-gray-600">{solicitacao.motivo}</p>
              </div>

              {solicitacao.observacoesRH && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Observações do RH:</p>
                  <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                    {solicitacao.observacoesRH}
                  </p>
                </div>
              )}

              {solicitacao.status === 'pendente' && (
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => openModal(solicitacao)}
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Analisar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Análise */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Analisar Solicitação #{selectedSolicitacao?.protocolo}</DialogTitle>
          </DialogHeader>

          {selectedSolicitacao && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Detalhes da Solicitação</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Campo:</strong> {selectedSolicitacao.campo}</p>
                    <p><strong>Aba:</strong> {selectedSolicitacao.aba}</p>
                    <p><strong>Tipo:</strong> {selectedSolicitacao.tipoSolicitacao}</p>
                  </div>
                  <div>
                    <p><strong>Data:</strong> {new Date(selectedSolicitacao.dataSolicitacao).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Status:</strong> {getStatusText(selectedSolicitacao.status)}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-1">Valor Atual:</p>
                  <p className="bg-gray-50 p-2 rounded text-sm">{selectedSolicitacao.valorAtual}</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Valor Solicitado:</p>
                  <p className="bg-blue-50 p-2 rounded text-sm">{selectedSolicitacao.valorSolicitado}</p>
                </div>
              </div>

              <div>
                <p className="font-medium mb-1">Motivo:</p>
                <p className="text-sm text-gray-600">{selectedSolicitacao.motivo}</p>
              </div>

              <div>
                <p className="font-medium mb-1">Observações do RH:</p>
                <Textarea
                  value={observacoesRH}
                  onChange={(e) => setObservacoesRH(e.target.value)}
                  placeholder="Adicione observações sobre a análise..."
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="outline" onClick={handleEmAnalise}>
              <Clock className="h-4 w-4 mr-2" />
              Em Análise
            </Button>
            <Button variant="outline" onClick={handleRejeitar}>
              <XCircle className="h-4 w-4 mr-2" />
              Rejeitar
            </Button>
            <Button onClick={handleAprovar} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Aprovar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SolicitacoesTab;
