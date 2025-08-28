import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Users, Calendar, Building2, TrendingUp, Clock, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import RHSidebar from "@/components/rh/RHSidebar";
import Admissao from "@/components/rh/Admissao";
import DepartamentoModal from "@/components/rh/DepartamentoModal";
import NiveisProgressaoModal from "@/components/rh/NiveisProgressaoModal";
import { rhModules } from "@/data/rhModules";

const RH = () => {
  const [selectedModule, setSelectedModule] = useState('processo-seletivo');
  const [isAdmissaoOpen, setIsAdmissaoOpen] = useState(false);
  const [isDepartamentoModalOpen, setIsDepartamentoModalOpen] = useState(false);
  const [isNiveisProgressaoModalOpen, setIsNiveisProgressaoModalOpen] = useState(false);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState(null);

  // Mock data for processo seletivo
  const candidatos = [
    {
      id: '1',
      nome: 'Ana Carolina Silva',
      cargo: 'Analista de Marketing',
      status: 'Em Análise',
      dataAplicacao: '2024-01-15',
      pontuacao: 85,
      fase: 'Entrevista Final'
    },
    {
      id: '2',
      nome: 'Roberto Santos',
      cargo: 'Desenvolvedor Frontend',
      status: 'Aprovado',
      dataAplicacao: '2024-01-10',
      pontuacao: 92,
      fase: 'Aprovado'
    },
    {
      id: '3',
      nome: 'Mariana Costa',
      cargo: 'Assistente Administrativo',
      status: 'Reprovado',
      dataAplicacao: '2024-01-08',
      pontuacao: 65,
      fase: 'Prova Técnica'
    }
  ];

  const handleAdmitirCandidato = (candidato: any) => {
    setCandidatoSelecionado(candidato);
    setIsAdmissaoOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Em Análise': { variant: 'outline', color: 'bg-yellow-100 text-yellow-800' },
      'Aprovado': { variant: 'default', color: 'bg-green-100 text-green-800' },
      'Reprovado': { variant: 'destructive', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Em Análise'];
    
    return (
      <Badge className={config.color}>
        {status}
      </Badge>
    );
  };

  const renderProcessoSeletivo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-biodina-blue">Processo Seletivo</h2>
          <p className="text-gray-600">Gerencie candidatos e processos de recrutamento</p>
        </div>
        <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
          <Plus className="h-4 w-4 mr-2" />
          Nova Vaga
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar candidatos..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Candidato</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cargo</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fase</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Pontuação</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {candidatos.map((candidato) => (
                  <tr key={candidato.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{candidato.nome}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{candidato.cargo}</td>
                    <td className="py-3 px-4">{getStatusBadge(candidato.status)}</td>
                    <td className="py-3 px-4 text-gray-600">{candidato.fase}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="font-medium">{candidato.pontuacao}</span>
                        <span className="text-gray-500 ml-1">/100</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(candidato.dataAplicacao).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {candidato.status === 'Aprovado' && (
                          <Button 
                            size="sm" 
                            className="bg-biodina-gold hover:bg-biodina-gold/90"
                            onClick={() => handleAdmitirCandidato(candidato)}
                          >
                            Admitir
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDepartamentos = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-biodina-blue">Departamentos</h2>
          <p className="text-gray-600">Configure e gerencie os departamentos da empresa</p>
        </div>
        <Button 
          className="bg-biodina-gold hover:bg-biodina-gold/90"
          onClick={() => setIsDepartamentoModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Departamento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-biodina-gold" />
              Tecnologia da Informação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Responsável: João Silva</p>
              <p className="text-sm text-gray-600">Colaboradores: 8</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-biodina-gold" />
              Recursos Humanos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Responsável: Maria Santos</p>
              <p className="text-sm text-gray-600">Colaboradores: 5</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-biodina-gold" />
              Comercial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Responsável: Carlos Lima</p>
              <p className="text-sm text-gray-600">Colaboradores: 12</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderExpedientes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-biodina-blue">Expedientes</h2>
          <p className="text-gray-600">Controle de horários e jornadas de trabalho</p>
        </div>
        <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Expediente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-biodina-gold" />
              Expediente Padrão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Horário: 08:00 - 17:00</p>
              <p className="text-sm text-gray-600">Intervalo: 12:00 - 13:00</p>
              <p className="text-sm text-gray-600">Carga Horária: 40h semanais</p>
              <p className="text-sm text-gray-600">Colaboradores: 25</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-biodina-gold" />
              Expediente Comercial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Horário: 08:00 - 18:00</p>
              <p className="text-sm text-gray-600">Intervalo: 12:00 - 13:00</p>
              <p className="text-sm text-gray-600">Carga Horária: 44h semanais</p>
              <p className="text-sm text-gray-600">Colaboradores: 12</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderNiveisProgressao = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-biodina-blue">Níveis e Progressão</h2>
          <p className="text-gray-600">Defina níveis hierárquicos e planos de carreira</p>
        </div>
        <Button 
          className="bg-biodina-gold hover:bg-biodina-gold/90"
          onClick={() => setIsNiveisProgressaoModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Plano
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-biodina-gold" />
              Plano Técnico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Níveis: 5</p>
              <p className="text-sm text-gray-600">Área: Tecnologia</p>
              <p className="text-sm text-gray-600">Colaboradores: 15</p>
              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-1">Progressão Salarial</div>
                <div className="text-sm font-medium">R$ 3.000 - R$ 12.000</div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-biodina-gold" />
              Plano Administrativo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Níveis: 4</p>
              <p className="text-sm text-gray-600">Área: Administrativo</p>
              <p className="text-sm text-gray-600">Colaboradores: 8</p>
              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-1">Progressão Salarial</div>
                <div className="text-sm font-medium">R$ 2.500 - R$ 8.000</div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedModule) {
      case 'processo-seletivo':
        return renderProcessoSeletivo();
      case 'departamentos':
        return renderDepartamentos();
      case 'expedientes':
        return renderExpedientes();
      case 'niveis-progressao':
        return renderNiveisProgressao();
      default:
        return renderProcessoSeletivo();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <RHSidebar 
        selectedModule={selectedModule}
        onModuleChange={setSelectedModule}
      />
      
      <main className="flex-1 overflow-y-auto p-8">
        {renderContent()}
      </main>

      <Admissao
        isOpen={isAdmissaoOpen}
        onClose={() => setIsAdmissaoOpen(false)}
        candidatoSelecionado={candidatoSelecionado}
      />

      <DepartamentoModal
        isOpen={isDepartamentoModalOpen}
        onClose={() => setIsDepartamentoModalOpen(false)}
      />

      <NiveisProgressaoModal
        isOpen={isNiveisProgressaoModalOpen}
        onClose={() => setIsNiveisProgressaoModalOpen(false)}
      />
    </div>
  );
};

export default RH;
