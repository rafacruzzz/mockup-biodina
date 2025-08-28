
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, Settings } from 'lucide-react';
import { cadastroModules } from '@/data/cadastroModules';
import UsersTable from '@/components/cadastro/UsersTable';
import UserModal from '@/components/cadastro/UserModal';
import ContentHeader from '@/components/ui/ContentHeader';

const Cadastro = () => {
  const [activeModule, setActiveModule] = useState('usuarios');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>();

  const handleEditUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsUserModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUserModalOpen(false);
    setSelectedUserId(undefined);
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'usuarios':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-biodina-blue">Usuários</h2>
                <p className="text-gray-600">Gerencie todos os usuários do sistema</p>
              </div>
              {/* Removido o botão "Novo Registro" - usuários vêm do processo seletivo */}
            </div>
            <UsersTable onEditUser={handleEditUser} />
          </div>
        );
      
      case 'permissoes':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-biodina-blue">Permissões</h2>
              <p className="text-gray-600">Configure perfis e permissões de acesso</p>
            </div>
            <div className="text-center py-12 text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Módulo de Permissões em desenvolvimento</p>
            </div>
          </div>
        );
      
      case 'configuracoes':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-biodina-blue">Configurações</h2>
              <p className="text-gray-600">Configurações gerais do sistema</p>
            </div>
            <div className="text-center py-12 text-gray-500">
              <Settings className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Módulo de Configurações em desenvolvimento</p>
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
        title="Cadastro"
        subtitle="Gerencie usuários, permissões e configurações do sistema"
      />

      {/* Module Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cadastroModules.map((module) => {
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

      <UserModal
        isOpen={isUserModalOpen}
        onClose={handleCloseModal}
        userId={selectedUserId}
        editMode={!!selectedUserId}
      />
    </div>
  );
};

export default Cadastro;
