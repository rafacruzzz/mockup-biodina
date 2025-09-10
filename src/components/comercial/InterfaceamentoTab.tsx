import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Network, Plus, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import SolicitarInterfaceamentoModal from "./SolicitarInterfaceamentoModal";
import InterfaceamentoStatusWidget from "./InterfaceamentoStatusWidget";
import { tiModules } from "@/data/tiModules";
import type { SolicitacaoInterfaceamento } from "@/types/ti";

interface InterfaceamentoTabProps {
  oportunidade: any;
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const InterfaceamentoTab = ({ oportunidade, formData, onInputChange }: InterfaceamentoTabProps) => {
  const [showSolicitarModal, setShowSolicitarModal] = useState(false);
  
  // Get existing requests for this opportunity
  const solicitacoes = tiModules.interfaceamento.subModules.solicitacoes.data as SolicitacaoInterfaceamento[];
  const solicitacoesOportunidade = solicitacoes.filter(s => s.oportunidadeId === oportunidade?.codigo);
  
  const getStatusIcon = (status: SolicitacaoInterfaceamento['status']) => {
    switch (status) {
      case 'aguardando_aprovacao': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'aprovado': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'em_analise': return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'em_desenvolvimento': return <Network className="h-4 w-4 text-purple-600" />;
      case 'concluido': return <CheckCircle className="h-4 w-4 text-green-800" />;
      case 'cancelado': return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusLabel = (status: SolicitacaoInterfaceamento['status']) => {
    const labels = {
      aguardando_aprovacao: "Aguardando Aprovação",
      aprovado: "Aprovado",
      em_analise: "Em Análise",
      em_desenvolvimento: "Em Desenvolvimento", 
      concluido: "Concluído",
      cancelado: "Cancelado"
    };
    return labels[status];
  };

  const getStatusColor = (status: SolicitacaoInterfaceamento['status']) => {
    const colors = {
      aguardando_aprovacao: "bg-yellow-100 text-yellow-800 border-yellow-200",
      aprovado: "bg-green-100 text-green-800 border-green-200",
      em_analise: "bg-blue-100 text-blue-800 border-blue-200", 
      em_desenvolvimento: "bg-purple-100 text-purple-800 border-purple-200",
      concluido: "bg-green-200 text-green-900 border-green-300",
      cancelado: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status];
  };

  const handleNovasolicitacao = (solicitacaoData: any) => {
    // This would normally save to backend/context
    console.log('Nova solicitação de interfaceamento:', solicitacaoData);
    setShowSolicitarModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Network className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Interfaceamento TI</h3>
            <p className="text-sm text-muted-foreground">
              Solicitações de integração entre sistemas para esta oportunidade
            </p>
          </div>
        </div>
        <Button 
          onClick={() => setShowSolicitarModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Solicitar Interfaceamento
        </Button>
      </div>

      <Separator />

      {/* Status Widget for Active Requests */}
      {solicitacoesOportunidade.length > 0 && (
        <InterfaceamentoStatusWidget 
          solicitacoes={solicitacoesOportunidade}
          oportunidadeId={oportunidade?.codigo}
        />
      )}

      {/* Requests List */}
      <div className="grid gap-4">
        {solicitacoesOportunidade.length > 0 ? (
          solicitacoesOportunidade.map((solicitacao) => (
            <Card key={solicitacao.id} className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    {getStatusIcon(solicitacao.status)}
                    Solicitação #{solicitacao.id}
                  </CardTitle>
                  <Badge className={getStatusColor(solicitacao.status)}>
                    {getStatusLabel(solicitacao.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Sistema do Cliente:</span>
                    <p className="mt-1">{solicitacao.sistemaCliente}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Prazo Desejado:</span>
                    <p className="mt-1">{new Date(solicitacao.prazoDesejado).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium text-muted-foreground">Descrição:</span>
                    <p className="mt-1 text-foreground">{solicitacao.descricaoNecessidade}</p>
                  </div>
                  {solicitacao.responsavelExecucao && (
                    <div>
                      <span className="font-medium text-muted-foreground">Execução:</span>
                      <p className="mt-1">
                        {solicitacao.responsavelExecucao === 'ti_interno' ? 'TI Interno' : 'Fornecedor Externo'}
                        {solicitacao.nomeFornecedor && ` (${solicitacao.nomeFornecedor})`}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-muted-foreground">Solicitado em:</span>
                    <p className="mt-1">{new Date(solicitacao.dataSolicitacao).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                {solicitacao.notasTecnicas && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <span className="font-medium text-sm text-muted-foreground">Notas Técnicas da TI:</span>
                    <p className="mt-1 text-sm">{solicitacao.notasTecnicas}</p>
                  </div>
                )}

                {solicitacao.histomicoStatus && solicitacao.histomicoStatus.length > 0 && (
                  <div className="mt-4">
                    <span className="font-medium text-sm text-muted-foreground">Histórico de Status:</span>
                    <div className="mt-2 space-y-2">
                      {solicitacao.histomicoStatus.slice(0, 3).map((historico, index) => (
                        <div key={index} className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <span>{getStatusLabel(historico.status as SolicitacaoInterfaceamento['status'])}</span>
                          <span>•</span>
                          <span>{new Date(historico.data).toLocaleDateString('pt-BR')}</span>
                          <span>•</span>
                          <span>{historico.responsavel}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-dashed border-2">
            <CardContent className="p-8 text-center">
              <Network className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2">Nenhuma solicitação de interfaceamento</h4>
              <p className="text-muted-foreground mb-4">
                Esta oportunidade ainda não possui solicitações de integração TI.
              </p>
              <Button 
                onClick={() => setShowSolicitarModal(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Criar Primeira Solicitação
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal */}
      <SolicitarInterfaceamentoModal
        isOpen={showSolicitarModal}
        onClose={() => setShowSolicitarModal(false)}
        onSave={handleNovasolicitacao}
        oportunidade={oportunidade}
      />
    </div>
  );
};

export default InterfaceamentoTab;