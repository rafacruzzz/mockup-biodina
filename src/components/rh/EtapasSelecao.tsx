
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Settings, Clock, User, FileText, Search } from 'lucide-react';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { ProcessoSeletivo } from '@/types/processoSeletivo';
import ConfigurarEtapasModal from './ConfigurarEtapasModal';
import TemplateEtapasModal from './TemplateEtapasModal';

const EtapasSelecao = () => {
  const { processosSeletivos } = useProcessoSeletivo();
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('all');
  const [configurarEtapasModal, setConfigurarEtapasModal] = useState(false);
  const [templateEtapasModal, setTemplateEtapasModal] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] = useState<ProcessoSeletivo | null>(null);

  const processosFiltrados = useMemo(() => {
    return processosSeletivos.filter(processo => {
      const matchBusca = !busca || 
        processo.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        processo.departamento.toLowerCase().includes(busca.toLowerCase()) ||
        processo.cargo.toLowerCase().includes(busca.toLowerCase());
      
      const matchStatus = filtroStatus === 'all' || processo.status === filtroStatus;
      
      return matchBusca && matchStatus;
    });
  }, [processosSeletivos, busca, filtroStatus]);

  const getStatusColor = (status: ProcessoSeletivo['status']) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-700 border-green-200';
      case 'pausado': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'finalizado': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTipoEtapaIcon = (tipo: string) => {
    switch (tipo) {
      case 'triagem': return <FileText className="h-4 w-4" />;
      case 'entrevista': return <User className="h-4 w-4" />;
      case 'teste': return <Settings className="h-4 w-4" />;
      case 'dinamica': return <User className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleConfigurarEtapas = (processo: ProcessoSeletivo) => {
    setProcessoSelecionado(processo);
    setConfigurarEtapasModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Etapas de Seleção</h2>
          <p className="text-gray-600">Configure e gerencie as etapas dos processos seletivos</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setTemplateEtapasModal(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button onClick={() => setConfigurarEtapasModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Configurar Etapas
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por título, departamento ou cargo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="pausado">Pausado</SelectItem>
            <SelectItem value="finalizado">Finalizado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {processosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {busca || filtroStatus !== 'all' ? 'Nenhum processo encontrado' : 'Nenhum processo seletivo configurado'}
            </h3>
            <p className="text-gray-500 mb-4">
              {busca || filtroStatus !== 'all' 
                ? 'Tente ajustar os filtros para encontrar o que procura'
                : 'Configure as etapas dos seus processos seletivos para começar'
              }
            </p>
            {(!busca && filtroStatus === 'all') && (
              <Button onClick={() => setConfigurarEtapasModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Configurar Primeira Etapa
              </Button>
            )}
          </div>
        ) : (
          processosFiltrados.map(processo => (
            <Card key={processo.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{processo.titulo}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span><strong>Departamento:</strong> {processo.departamento}</span>
                      <span><strong>Cargo:</strong> {processo.cargo}</span>
                      <span><strong>Vagas:</strong> {processo.vagas}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(processo.status)}>
                      {processo.status}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConfigurarEtapas(processo)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Configurar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">
                    Etapas Configuradas ({processo.etapas.length})
                  </h4>
                  
                  {processo.etapas.length === 0 ? (
                    <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                      <Settings className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-500">Nenhuma etapa configurada</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {processo.etapas
                        .sort((a, b) => a.ordem - b.ordem)
                        .map(etapa => (
                          <div 
                            key={etapa.id}
                            className="p-3 bg-gray-50 rounded-lg border"
                          >
                            <div className="flex items-start gap-2">
                              <div className="p-1.5 rounded bg-biodina-blue/10 text-biodina-blue">
                                {getTipoEtapaIcon(etapa.tipo)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs bg-biodina-gold/20 text-biodina-gold px-1.5 py-0.5 rounded font-medium">
                                    #{etapa.ordem}
                                  </span>
                                  <h5 className="font-medium text-sm text-gray-900 truncate">
                                    {etapa.nome}
                                  </h5>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                  {etapa.descricao}
                                </p>
                                {etapa.responsavel && (
                                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                    <User className="h-3 w-3" />
                                    <span className="truncate">{etapa.responsavel}</span>
                                  </div>
                                )}
                                {etapa.duracao && (
                                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                    <Clock className="h-3 w-3" />
                                    <span>{etapa.duracao}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <ConfigurarEtapasModal
        isOpen={configurarEtapasModal}
        onClose={() => {
          setConfigurarEtapasModal(false);
          setProcessoSelecionado(null);
        }}
        processo={processoSelecionado}
      />

      <TemplateEtapasModal
        isOpen={templateEtapasModal}
        onClose={() => setTemplateEtapasModal(false)}
      />
    </div>
  );
};

export default EtapasSelecao;
