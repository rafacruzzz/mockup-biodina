
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, Clock, MoreHorizontal, Plus, Users } from 'lucide-react';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { ProcessoSeletivo, CandidatoProcesso, Curriculo } from '@/types/processoSeletivo';

interface KanbanCardProps {
  candidato: CandidatoProcesso;
  curriculo: Curriculo;
  onMoverEtapa: (candidatoId: string, etapaId: string) => void;
  onStatusChange: (candidatoId: string, status: CandidatoProcesso['status']) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ candidato, curriculo, onMoverEtapa, onStatusChange }) => {
  const getStatusColor = (status: CandidatoProcesso['status']) => {
    switch (status) {
      case 'em-andamento': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'aprovado': return 'bg-green-100 text-green-700 border-green-200';
      case 'reprovado': return 'bg-red-100 text-red-700 border-red-200';
      case 'aguardando': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="mb-3 shadow-sm hover:shadow-md transition-shadow cursor-move bg-white border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-biodina-blue/10">
              <User className="h-4 w-4 text-biodina-blue" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">{curriculo.nome}</h4>
              <p className="text-xs text-gray-600">{curriculo.cargoDesejado}</p>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <Badge className={`text-xs w-fit ${getStatusColor(candidato.status)}`}>
          {candidato.status}
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="h-3 w-3" />
            <span className="truncate">{curriculo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3" />
            <span>{curriculo.telefone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>Há {Math.floor((new Date().getTime() - new Date(candidato.dataUltimaAtualizacao).getTime()) / (1000 * 60 * 60 * 24))} dias</span>
          </div>
        </div>
        
        {curriculo.habilidades.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {curriculo.habilidades.slice(0, 3).map((habilidade, index) => (
              <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                {habilidade}
              </Badge>
            ))}
            {curriculo.habilidades.length > 3 && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                +{curriculo.habilidades.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ProcessoSeletivoKanban: React.FC = () => {
  const { processosSeletivos, curriculos, moverCandidatoEtapa, atualizarStatusCandidato } = useProcessoSeletivo();
  const [processoSelecionado, setProcessoSelecionado] = useState<string>('');

  const processoAtual = useMemo(() => {
    if (processoSelecionado && processosSeletivos.find(p => p.id === processoSelecionado)) {
      return processosSeletivos.find(p => p.id === processoSelecionado);
    }
    return processosSeletivos[0] || null;
  }, [processosSeletivos, processoSelecionado]);

  // Set initial selection when processes are loaded
  React.useEffect(() => {
    if (!processoSelecionado && processosSeletivos.length > 0) {
      setProcessoSelecionado(processosSeletivos[0].id);
    }
  }, [processosSeletivos, processoSelecionado]);

  const candidatosPorEtapa = useMemo(() => {
    if (!processoAtual) return {};
    
    const candidatosComCurriculos = processoAtual.candidatos.map(candidato => ({
      candidato,
      curriculo: curriculos.find(c => c.id === candidato.curriculoId)
    })).filter(item => item.curriculo);

    const etapasMap: Record<string, Array<{ candidato: CandidatoProcesso; curriculo: Curriculo }>> = {};
    
    processoAtual.etapas.forEach(etapa => {
      etapasMap[etapa.id] = candidatosComCurriculos.filter(item => 
        item.candidato.etapaAtual === etapa.id
      ) as Array<{ candidato: CandidatoProcesso; curriculo: Curriculo }>;
    });

    return etapasMap;
  }, [processoAtual, curriculos]);

  const handleMoverEtapa = (candidatoId: string, etapaId: string) => {
    moverCandidatoEtapa(candidatoId, etapaId);
  };

  const handleStatusChange = (candidatoId: string, status: CandidatoProcesso['status']) => {
    atualizarStatusCandidato(candidatoId, status);
  };

  if (processosSeletivos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Users className="h-12 w-12 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Nenhum processo seletivo encontrado</h3>
        <p className="text-sm text-center mb-4">Crie um novo processo seletivo para começar</p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Processo Seletivo
        </Button>
      </div>
    );
  }

  if (!processoAtual) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Users className="h-12 w-12 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Carregando processo seletivo...</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Processo Seletivo</h2>
          <p className="text-gray-600">Acompanhe os candidatos através das etapas de seleção</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select
            value={processoSelecionado}
            onValueChange={setProcessoSelecionado}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Selecionar processo" />
            </SelectTrigger>
            <SelectContent>
              {processosSeletivos.map((processo) => (
                <SelectItem key={processo.id} value={processo.id}>
                  {processo.titulo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Processo
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-900">{processoAtual.titulo}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span><strong>Departamento:</strong> {processoAtual.departamento}</span>
            <span><strong>Cargo:</strong> {processoAtual.cargo}</span>
            <span><strong>Vagas:</strong> {processoAtual.vagas}</span>
            <span><strong>Responsável:</strong> {processoAtual.responsavel}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[500px]">
          {processoAtual.etapas.map((etapa) => (
            <div key={etapa.id} className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{etapa.nome}</h4>
                  <Badge variant="outline" className="text-xs">
                    {candidatosPorEtapa[etapa.id]?.length || 0}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{etapa.descricao}</p>
                {etapa.responsavel && (
                  <p className="text-xs text-gray-500 mt-1">
                    <strong>Responsável:</strong> {etapa.responsavel}
                  </p>
                )}
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {candidatosPorEtapa[etapa.id]?.map(({ candidato, curriculo }) => (
                  <KanbanCard
                    key={candidato.id}
                    candidato={candidato}
                    curriculo={curriculo}
                    onMoverEtapa={handleMoverEtapa}
                    onStatusChange={handleStatusChange}
                  />
                ))}
                
                {(!candidatosPorEtapa[etapa.id] || candidatosPorEtapa[etapa.id].length === 0) && (
                  <div className="h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                    Nenhum candidato
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessoSeletivoKanban;
