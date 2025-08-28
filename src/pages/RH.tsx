
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Calendar, Building2, BarChart3, UserCheck } from 'lucide-react';
import { rhModules } from '@/data/rhModules';
import ProcessosSeletivosTable from '@/components/rh/ProcessosSeletivosTable';
import NovoProcessoModal from '@/components/rh/NovoProcessoModal';
import ContentHeader from '@/components/ui/ContentHeader';

const RH = () => {
  const [activeModule, setActiveModule] = useState('processo-seletivo');
  const [isNovoProcessoModalOpen, setIsNovoProcessoModalOpen] = useState(false);

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'processo-seletivo':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-biodina-blue">Processos Seletivos</h2>
                <p className="text-gray-600">Gerencie vagas e processos de seleção</p>
              </div>
              <Button 
                onClick={() => setIsNovoProcessoModalOpen(true)}
                className="bg-biodina-gold hover:bg-biodina-gold/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Processo
              </Button>
            </div>
            <ProcessosSeletivosTable />
          </div>
        );
      
      case 'departamentos':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-biodina-blue">Departamentos</h2>
              <p className="text-gray-600">Estrutura organizacional da empresa</p>
            </div>
            <div className="text-center py-12 text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Módulo de Departamentos em desenvolvimento</p>
            </div>
          </div>
        );
      
      case 'expedientes':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-biodina-blue">Expedientes</h2>
              <p className="text-gray-600">Horários de trabalho e escalas</p>
            </div>
            <div className="text-center py-12 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Módulo de Expedientes em desenvolvimento</p>
            </div>
          </div>
        );
      
      case 'planos-carreira':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-biodina-blue">Planos de Carreira</h2>
              <p className="text-gray-600">Níveis, cargos e progressão profissional</p>
            </div>
            <div className="text-center py-12 text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Módulo de Planos de Carreira em desenvolvimento</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <ContentHeader 
        title="Recursos Humanos"
        subtitle="Gerencie processos de RH, estrutura organizacional e desenvolvimento profissional"
      />

      {/* Module Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rhModules.map((module) => {
          const Icon = module.icon;
          return (
            <Card 
              key={module.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                activeModule === module.id ? 'ring-2 ring-biodina-gold shadow-lg' : ''
              }`}
              onClick={() => setActiveModule(module.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${module.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {activeModule === module.id && (
                    <Badge className="bg-biodina-gold/10 text-biodina-gold">Ativo</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{module.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{module.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Module Content */}
      <Card>
        <CardContent className="p-6">
          {renderModuleContent()}
        </CardContent>
      </Card>

      <NovoProcessoModal
        isOpen={isNovoProcessoModalOpen}
        onClose={() => setIsNovoProcessoModalOpen(false)}
      />
    </div>
  );
};

export default RH;
