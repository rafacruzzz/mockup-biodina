import { useState } from "react";
import { Search, Filter, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tiModules } from "@/data/tiModules";
import DetalhesInterfaceamentoModal from "./DetalhesInterfaceamentoModal";
import type { SolicitacaoInterfaceamento } from "@/types/ti";

const PainelInterfaceamento = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<SolicitacaoInterfaceamento | null>(null);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);

  const solicitacoes = tiModules.interfaceamento.subModules.solicitacoes.data as SolicitacaoInterfaceamento[];

  const getStatusBadge = (status: SolicitacaoInterfaceamento['status']) => {
    const statusConfig = {
      aguardando_aprovacao: { label: "Aguardando Aprovação", className: "bg-yellow-100 text-yellow-800" },
      aprovado: { label: "Aprovado", className: "bg-green-100 text-green-800" },
      em_analise: { label: "Em Análise", className: "bg-blue-100 text-blue-800" },
      em_desenvolvimento: { label: "Em Desenvolvimento", className: "bg-purple-100 text-purple-800" },
      concluido: { label: "Concluído", className: "bg-gray-100 text-gray-800" },
      cancelado: { label: "Cancelado", className: "bg-red-100 text-red-800" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleViewDetails = (solicitacao: SolicitacaoInterfaceamento) => {
    setSelectedSolicitacao(solicitacao);
    setShowDetalhesModal(true);
  };

  const handleSaveSolicitacao = (updatedSolicitacao: SolicitacaoInterfaceamento) => {
    // This would normally update the backend/context
    console.log('Solicitação atualizada:', updatedSolicitacao);
    setShowDetalhesModal(false);
    setSelectedSolicitacao(null);
  };

  const statusColumns = [
    { key: 'aprovado', title: 'Aprovados', color: 'green' },
    { key: 'em_analise', title: 'Em Análise', color: 'blue' },
    { key: 'em_desenvolvimento', title: 'Em Desenvolvimento', color: 'purple' },
    { key: 'concluido', title: 'Concluído', color: 'gray' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel de Controle de Interfaceamentos</h1>
          <p className="text-gray-600">Gerencie todas as solicitações de integração entre sistemas</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-lg border">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar por cliente ou oportunidade"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            <SelectItem value="aprovado">Aprovados</SelectItem>
            <SelectItem value="em_analise">Em Análise</SelectItem>
            <SelectItem value="em_desenvolvimento">Em Desenvolvimento</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {statusColumns.map(column => {
          const columnSolicitacoes = solicitacoes.filter(s => s.status === column.key);
          
          return (
            <div key={column.key} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <Badge variant="secondary">{columnSolicitacoes.length}</Badge>
              </div>
              
              <div className="space-y-3 min-h-[400px]">
                {columnSolicitacoes.map(solicitacao => (
                  <Card 
                    key={solicitacao.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleViewDetails(solicitacao)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium truncate">
                          {solicitacao.clienteNome}
                        </CardTitle>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(solicitacao);
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-xs text-gray-600">
                        <div><strong>OPT:</strong> {solicitacao.oportunidadeId}</div>
                        <div><strong>Sistema:</strong> {solicitacao.sistemaCliente}</div>
                        <div><strong>Prazo:</strong> {new Date(solicitacao.prazoDesejado).toLocaleDateString()}</div>
                        {solicitacao.responsavelExecucao && (
                          <div>
                            <strong>Execução:</strong> {solicitacao.responsavelExecucao === 'ti_interno' ? 'TI Interno' : 'Fornecedor Externo'}
                          </div>
                        )}
                        {solicitacao.nomeFornecedor && (
                          <div><strong>Fornecedor:</strong> {solicitacao.nomeFornecedor}</div>
                        )}
                      </div>
                      <div className="mt-3">
                        {getStatusBadge(solicitacao.status)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Detalhes */}
      {selectedSolicitacao && (
        <DetalhesInterfaceamentoModal
          isOpen={showDetalhesModal}
          onClose={() => {
            setShowDetalhesModal(false);
            setSelectedSolicitacao(null);
          }}
          onSave={handleSaveSolicitacao}
          solicitacao={selectedSolicitacao}
        />
      )}
    </div>
  );
};

export default PainelInterfaceamento;