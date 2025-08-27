
import { useState } from 'react';
import { Eye, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { solicitacoesMock, getStatusColor, getStatusText } from '@/data/solicitacoes';
import { SolicitacaoGenerica } from '@/types/solicitacao';
import { useUser } from '@/contexts/UserContext';

interface MinhasSolicitacoesProps {
  searchTerm: string;
}

const MinhasSolicitacoes = ({ searchTerm }: MinhasSolicitacoesProps) => {
  const { user } = useUser();
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<SolicitacaoGenerica | null>(null);

  if (!user) return null;

  const minhasSolicitacoes = solicitacoesMock.filter(s => 
    s.id_usuario_solicitante === user.id &&
    (s.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
     s.nome_setor_destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
     s.tipo_solicitacao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusIcon = (status: SolicitacaoGenerica['status']) => {
    switch (status) {
      case 'aberta':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'em-andamento':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'concluida':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejeitada':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (minhasSolicitacoes.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">
          {searchTerm ? 'Nenhuma solicitação encontrada' : 'Você ainda não criou solicitações'}
        </p>
        <p className="text-gray-400 text-sm">
          {searchTerm ? 'Tente outros termos de busca' : 'Clique em "Nova Solicitação" para começar'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {minhasSolicitacoes.map((solicitacao) => (
        <Card key={solicitacao.id_solicitacao} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(solicitacao.status)}
                  <CardTitle className="text-lg">{solicitacao.assunto}</CardTitle>
                  <Badge className={getStatusColor(solicitacao.status)}>
                    {getStatusText(solicitacao.status)}
                  </Badge>
                </div>
                <CardDescription>
                  <span className="font-medium">{solicitacao.nome_setor_destino}</span>
                  {solicitacao.nome_responsavel && (
                    <span> • Responsável: {solicitacao.nome_responsavel}</span>
                  )}
                </CardDescription>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>Criada em {formatDate(solicitacao.data_criacao)}</p>
                {solicitacao.expectativa_conclusao && (
                  <p>Prazo: {formatDate(solicitacao.expectativa_conclusao)}</p>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 line-clamp-2">
                {solicitacao.descricao}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Última atualização: {formatDateTime(solicitacao.data_atualizacao)}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedSolicitacao(solicitacao)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {selectedSolicitacao?.assunto}
                      </DialogTitle>
                    </DialogHeader>

                    {selectedSolicitacao && (
                      <div className="space-y-6">
                        {/* Informações Básicas */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Informações da Solicitação</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p><strong>ID:</strong> #{selectedSolicitacao.id_solicitacao}</p>
                              <p><strong>Setor:</strong> {selectedSolicitacao.nome_setor_destino}</p>
                              <p><strong>Tipo:</strong> {selectedSolicitacao.tipo_solicitacao}</p>
                            </div>
                            <div>
                              <p><strong>Status:</strong> 
                                <Badge className={`ml-2 ${getStatusColor(selectedSolicitacao.status)}`}>
                                  {getStatusText(selectedSolicitacao.status)}
                                </Badge>
                              </p>
                              <p><strong>Responsável:</strong> {selectedSolicitacao.nome_responsavel || 'Não atribuído'}</p>
                              <p><strong>Criada em:</strong> {formatDateTime(selectedSolicitacao.data_criacao)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Descrição */}
                        <div>
                          <h4 className="font-medium mb-2">Descrição</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            {selectedSolicitacao.descricao}
                          </p>
                        </div>

                        {/* Campos Específicos */}
                        {Object.keys(selectedSolicitacao.campos_especificos).length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Dados Específicos</h4>
                            <div className="bg-gray-50 p-3 rounded text-sm">
                              {Object.entries(selectedSolicitacao.campos_especificos).map(([key, value]) => (
                                <div key={key} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                                  <span className="font-medium capitalize">
                                    {key.replace(/_/g, ' ')}:
                                  </span>
                                  <span>{String(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Histórico */}
                        <div>
                          <h4 className="font-medium mb-2">Histórico de Interações</h4>
                          <div className="space-y-3">
                            {selectedSolicitacao.historico_interacoes.map((interacao) => (
                              <div key={interacao.id} className="bg-gray-50 p-3 rounded text-sm">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="font-medium">{interacao.usuario}</span>
                                  <span className="text-gray-500">
                                    {formatDateTime(interacao.data)}
                                  </span>
                                </div>
                                <p className="text-gray-600">{interacao.descricao}</p>
                                {interacao.status_anterior && interacao.status_novo && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Status alterado de "{interacao.status_anterior}" para "{interacao.status_novo}"
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MinhasSolicitacoes;
