import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, Search, Filter, MoreHorizontal, Users, Building2, UserCheck, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CadastroSidebar from '@/components/cadastro/CadastroSidebar';
import UserModal from '@/components/cadastro/UserModal';
import { useUsers } from '@/hooks/useUsers';
import { UserData } from '@/types/user';

const Cadastro = () => {
  const { users } = useUsers();
  const [selectedModule, setSelectedModule] = useState('usuarios');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setEditMode(true);
    setIsUserModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
    setEditMode(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Ativo': { variant: 'default', color: 'bg-green-100 text-green-800' },
      'Inativo': { variant: 'secondary', color: 'bg-gray-100 text-gray-800' },
      'Novo': { variant: 'outline', color: 'bg-blue-100 text-blue-800' },
      'Desligado': { variant: 'destructive', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Inativo'];
    
    return (
      <Badge className={config.color}>
        {status}
      </Badge>
    );
  };

  const renderUsuarios = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-biodina-blue">Usuários</h2>
          <p className="text-gray-600">Gerencie os usuários do sistema</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Usuário</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cargo</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{user.dadosPessoais.nome}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.credentials.username}</td>
                    <td className="py-3 px-4 text-gray-600">{user.dadosPessoais.email}</td>
                    <td className="py-3 px-4 text-gray-600">{user.dadosProfissionais.cargo}</td>
                    <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">
                        {user.credentials.userType}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
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

  const renderPerfis = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-biodina-blue">Perfis de Acesso</h2>
          <p className="text-gray-600">Configure perfis de permissões para diferentes tipos de usuários</p>
        </div>
        <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Perfil
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-red-600" />
              Administrador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Acesso completo a todos os módulos e funcionalidades do sistema</p>
            <div className="flex items-center justify-between">
              <Badge className="bg-red-100 text-red-800">Sistema</Badge>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Gerente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Acesso a módulos de gestão e relatórios gerenciais</p>
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-100 text-blue-800">Personalizado</Badge>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              Usuário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Acesso básico aos módulos operacionais</p>
            <div className="flex items-center justify-between">
              <Badge className="bg-green-100 text-green-800">Padrão</Badge>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEmpresas = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-biodina-blue">Empresas</h2>
          <p className="text-gray-600">Gerencie as empresas do grupo</p>
        </div>
        <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
          <Plus className="h-4 w-4 mr-2" />
          Nova Empresa
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar empresas..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="todas">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as empresas</SelectItem>
                <SelectItem value="ativas">Ativas</SelectItem>
                <SelectItem value="inativas">Inativas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-biodina-gold" />
                    Biodina Matriz
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Configurações</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Desativar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
                  <p><strong>Endereço:</strong> São Paulo - SP</p>
                  <p><strong>Funcionários:</strong> 150</p>
                </div>
                <div className="mt-4">
                  <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-biodina-gold" />
                    Biodina Filial RJ
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Configurações</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Desativar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>CNPJ:</strong> 12.345.678/0002-71</p>
                  <p><strong>Endereço:</strong> Rio de Janeiro - RJ</p>
                  <p><strong>Funcionários:</strong> 85</p>
                </div>
                <div className="mt-4">
                  <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-biodina-gold" />
                    Biodina Filial DF
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Configurações</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Desativar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>CNPJ:</strong> 12.345.678/0003-52</p>
                  <p><strong>Endereço:</strong> Brasília - DF</p>
                  <p><strong>Funcionários:</strong> 45</p>
                </div>
                <div className="mt-4">
                  <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedModule) {
      case 'usuarios':
        return renderUsuarios();
      case 'perfis':
        return renderPerfis();
      case 'empresas':
        return renderEmpresas();
      default:
        return renderUsuarios();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CadastroSidebar 
        selectedModule={selectedModule}
        onModuleChange={setSelectedModule}
      />
      
      <main className="flex-1 overflow-y-auto p-8">
        {renderContent()}
      </main>

      <UserModal
        isOpen={isUserModalOpen}
        onClose={handleCloseModal}
        userData={selectedUser || undefined}
        editMode={editMode}
      />
    </div>
  );
};

export default Cadastro;
