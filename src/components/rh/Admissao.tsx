
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { UserCheck, FileText, Calendar, Clock, Search, User, Mail, Phone, CheckCircle, AlertCircle, FileX } from 'lucide-react';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { CandidatoProcesso, Curriculo } from '@/types/processoSeletivo';
import AdmissaoDetailsModal from './AdmissaoDetailsModal';

interface CandidatoAdmissao {
  candidato: CandidatoProcesso;
  curriculo: Curriculo;
  processo: string;
  dataAprovacao: string;
  statusAdmissao: 'documentos-pendentes' | 'documentos-completos' | 'aguardando-assinatura' | 'admitido';
  documentosRecebidos: number;
  totalDocumentos: number;
  salarioDefinitivo?: string;
  cargoDefinitivo?: string;
}

const Admissao = () => {
  const { processosSeletivos, curriculos } = useProcessoSeletivo();
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('all');
  const [candidatoSelecionado, setCandidatoSelecionado] = useState<CandidatoAdmissao | null>(null);
  const [modalDetalhes, setModalDetalhes] = useState(false);

  // Mock data para demonstração - na implementação real, isso viria do contexto
  const candidatosAdmissao: CandidatoAdmissao[] = useMemo(() => {
    const candidatosAprovados: CandidatoAdmissao[] = [];

    processosSeletivos.forEach(processo => {
      processo.candidatos.forEach(candidato => {
        if (candidato.status === 'aprovado') {
          const curriculo = curriculos.find(c => c.id === candidato.curriculoId);
          if (curriculo) {
            // Simula dados de admissão para demonstração
            const statusOptions: CandidatoAdmissao['statusAdmissao'][] = [
              'documentos-pendentes', 'documentos-completos', 'aguardando-assinatura', 'admitido'
            ];
            const statusAdmissao = statusOptions[Math.floor(Math.random() * statusOptions.length)];
            const totalDocumentos = 8;
            const documentosRecebidos = statusAdmissao === 'admitido' ? totalDocumentos : 
              statusAdmissao === 'aguardando-assinatura' ? totalDocumentos :
              statusAdmissao === 'documentos-completos' ? totalDocumentos :
              Math.floor(Math.random() * totalDocumentos);

            candidatosAprovados.push({
              candidato,
              curriculo,
              processo: processo.titulo,
              dataAprovacao: candidato.dataUltimaAtualizacao,
              statusAdmissao,
              documentosRecebidos,
              totalDocumentos,
              salarioDefinitivo: processo.salario?.split(' - ')[0],
              cargoDefinitivo: processo.cargo
            });
          }
        }
      });
    });

    return candidatosAprovados;
  }, [processosSeletivos, curriculos]);

  const candidatosFiltrados = useMemo(() => {
    return candidatosAdmissao.filter(item => {
      const matchBusca = !busca || 
        item.curriculo.nome.toLowerCase().includes(busca.toLowerCase()) ||
        item.curriculo.email.toLowerCase().includes(busca.toLowerCase()) ||
        item.processo.toLowerCase().includes(busca.toLowerCase()) ||
        item.curriculo.cargoDesejado.toLowerCase().includes(busca.toLowerCase());
      
      const matchStatus = filtroStatus === 'all' || item.statusAdmissao === filtroStatus;
      
      return matchBusca && matchStatus;
    });
  }, [candidatosAdmissao, busca, filtroStatus]);

  const estatisticas = useMemo(() => {
    return {
      total: candidatosAdmissao.length,
      documentosPendentes: candidatosAdmissao.filter(c => c.statusAdmissao === 'documentos-pendentes').length,
      documentosCompletos: candidatosAdmissao.filter(c => c.statusAdmissao === 'documentos-completos').length,
      aguardandoAssinatura: candidatosAdmissao.filter(c => c.statusAdmissao === 'aguardando-assinatura').length,
      admitidos: candidatosAdmissao.filter(c => c.statusAdmissao === 'admitido').length
    };
  }, [candidatosAdmissao]);

  const getStatusColor = (status: CandidatoAdmissao['statusAdmissao']) => {
    switch (status) {
      case 'documentos-pendentes': return 'bg-red-100 text-red-700 border-red-200';
      case 'documentos-completos': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'aguardando-assinatura': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'admitido': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: CandidatoAdmissao['statusAdmissao']) => {
    switch (status) {
      case 'documentos-pendentes': return <FileX className="h-4 w-4" />;
      case 'documentos-completos': return <FileText className="h-4 w-4" />;
      case 'aguardando-assinatura': return <AlertCircle className="h-4 w-4" />;
      case 'admitido': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: CandidatoAdmissao['statusAdmissao']) => {
    switch (status) {
      case 'documentos-pendentes': return 'Documentos Pendentes';
      case 'documentos-completos': return 'Documentos Completos';
      case 'aguardando-assinatura': return 'Aguardando Assinatura';
      case 'admitido': return 'Admitido';
      default: return status;
    }
  };

  const handleVerDetalhes = (candidato: CandidatoAdmissao) => {
    setCandidatoSelecionado(candidato);
    setModalDetalhes(true);
  };

  const calcularProgressoDocumentos = (recebidos: number, total: number) => {
    return Math.round((recebidos / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Processo de Admissão</h2>
          <p className="text-gray-600">Gerencie a documentação e formalização da contratação dos candidatos aprovados</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-biodina-blue" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileX className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Doc. Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.documentosPendentes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Doc. Completos</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.documentosCompletos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Ag. Assinatura</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.aguardandoAssinatura}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Admitidos</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.admitidos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-lg border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nome, email, processo ou cargo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="documentos-pendentes">Documentos Pendentes</SelectItem>
            <SelectItem value="documentos-completos">Documentos Completos</SelectItem>
            <SelectItem value="aguardando-assinatura">Aguardando Assinatura</SelectItem>
            <SelectItem value="admitido">Admitido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Candidatos */}
      <div className="space-y-4">
        {candidatosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <UserCheck className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {busca || filtroStatus !== 'all' ? 'Nenhum candidato encontrado' : 'Nenhum candidato em processo de admissão'}
            </h3>
            <p className="text-gray-500">
              {busca || filtroStatus !== 'all' 
                ? 'Tente ajustar os filtros para encontrar o que procura'
                : 'Os candidatos aprovados nos processos seletivos aparecerão aqui'
              }
            </p>
          </div>
        ) : (
          candidatosFiltrados.map((item, index) => (
            <Card key={`${item.candidato.id}-${index}`} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-biodina-blue/10">
                        <User className="h-6 w-6 text-biodina-blue" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.curriculo.nome}</h3>
                          <Badge className={getStatusColor(item.statusAdmissao)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(item.statusAdmissao)}
                              <span>{getStatusText(item.statusAdmissao)}</span>
                            </div>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span>{item.curriculo.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span>{item.curriculo.telefone}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FileText className="h-4 w-4" />
                              <span><strong>Processo:</strong> {item.processo}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span><strong>Aprovado em:</strong> {new Date(item.dataAprovacao).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progresso dos Documentos */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700">Documentos</span>
                            <span className="text-gray-600">
                              {item.documentosRecebidos}/{item.totalDocumentos} recebidos
                            </span>
                          </div>
                          <Progress 
                            value={calcularProgressoDocumentos(item.documentosRecebidos, item.totalDocumentos)} 
                            className="h-2"
                          />
                        </div>
                        
                        {/* Informações do Cargo */}
                        {(item.cargoDefinitivo || item.salarioDefinitivo) && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4 text-sm">
                              {item.cargoDefinitivo && (
                                <span><strong>Cargo:</strong> {item.cargoDefinitivo}</span>
                              )}
                              {item.salarioDefinitivo && (
                                <span><strong>Salário:</strong> {item.salarioDefinitivo}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <Button 
                      size="sm" 
                      onClick={() => handleVerDetalhes(item)}
                    >
                      Ver Detalhes
                    </Button>
                    
                    {item.statusAdmissao === 'documentos-completos' && (
                      <Button size="sm" variant="outline">
                        Cadastrar Colaborador
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AdmissaoDetailsModal
        isOpen={modalDetalhes}
        onClose={() => {
          setModalDetalhes(false);
          setCandidatoSelecionado(null);
        }}
        candidatoAdmissao={candidatoSelecionado}
      />
    </div>
  );
};

export default Admissao;
