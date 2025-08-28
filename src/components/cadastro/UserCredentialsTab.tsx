
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Shield, Users, Key, Lock, Settings } from 'lucide-react';
import { UserCredentials } from '@/types/user';
import { ModuleAccess as PermissionsModuleAccess } from '@/types/permissions';

interface UserCredentialsTabProps {
  formData: UserCredentials;
  onInputChange: (field: keyof UserCredentials, value: string | boolean | PermissionsModuleAccess[]) => void;
}

// Mock data for modules - in a real app this would come from a service
const availableModules: PermissionsModuleAccess[] = [
  {
    key: 'comercial',
    name: 'Comercial',
    icon: 'briefcase',
    enabled: false,
    subModules: [
      { key: 'vendas', name: 'Vendas', icon: 'shopping-cart', enabled: false, subModules: [] },
      { key: 'propostas', name: 'Propostas', icon: 'file-text', enabled: false, subModules: [] }
    ]
  },
  {
    key: 'estoque',
    name: 'Estoque',
    icon: 'package',
    enabled: false,
    subModules: [
      { key: 'movimentacao', name: 'Movimentação', icon: 'truck', enabled: false, subModules: [] },
      { key: 'inventario', name: 'Inventário', icon: 'clipboard', enabled: false, subModules: [] }
    ]
  },
  {
    key: 'rh',
    name: 'Recursos Humanos',
    icon: 'users',
    enabled: false,
    subModules: [
      { key: 'processos', name: 'Processos Seletivos', icon: 'user-check', enabled: false, subModules: [] },
      { key: 'colaboradores', name: 'Colaboradores', icon: 'user', enabled: false, subModules: [] }
    ]
  }
];

const UserCredentialsTab = ({ formData, onInputChange }: UserCredentialsTabProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleModuleAccessChange = (moduleKey: string, field: 'read' | 'write' | 'delete' | 'admin', value: boolean) => {
    const updatedModules = formData.moduleAccess.map(module => {
      if (module.moduleId === moduleKey) {
        return {
          ...module,
          permissions: {
            ...module.permissions,
            [field]: value
          }
        };
      }
      return module;
    });

    // If module doesn't exist, add it
    if (!updatedModules.find(m => m.moduleId === moduleKey)) {
      const moduleInfo = availableModules.find(m => m.key === moduleKey);
      if (moduleInfo) {
        updatedModules.push({
          moduleId: moduleKey,
          moduleName: moduleInfo.name,
          hasAccess: true,
          permissions: {
            read: field === 'read' ? value : false,
            write: field === 'write' ? value : false,
            delete: field === 'delete' ? value : false,
            admin: field === 'admin' ? value : false
          }
        });
      }
    }

    onInputChange('moduleAccess', updatedModules);
  };

  const getModulePermissions = (moduleKey: string) => {
    const module = formData.moduleAccess.find(m => m.moduleId === moduleKey);
    return module?.permissions || { read: false, write: false, delete: false, admin: false };
  };

  const hasAnyPermission = (moduleKey: string) => {
    const permissions = getModulePermissions(moduleKey);
    return permissions.read || permissions.write || permissions.delete || permissions.admin;
  };

  return (
    <div className="space-y-6">
      {/* Status do Usuário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Status do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => onInputChange('isActive', checked)}
            />
            <Label htmlFor="isActive" className="text-sm font-medium">
              Usuário Ativo
            </Label>
            <Badge variant={formData.isActive ? "default" : "secondary"}>
              {formData.isActive ? "Ativo" : "Inativo"}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="userType">Tipo de Usuário</Label>
            <Select value={formData.userType} onValueChange={(value) => onInputChange('userType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de usuário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usuario">Usuário</SelectItem>
                <SelectItem value="gerente">Gerente</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="super-admin">Super Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Credenciais de Acesso */}
      {formData.isActive && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Credenciais de Acesso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                value={formData.username || ''}
                onChange={(e) => onInputChange('username', e.target.value)}
                placeholder="Digite o nome de usuário"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password || ''}
                  onChange={(e) => onInputChange('password', e.target.value)}
                  placeholder="Digite a senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword || ''}
                  onChange={(e) => onInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirme a senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Permissões e Módulos */}
      {formData.isActive && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permissões de Módulos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableModules.map((module) => (
                <div key={module.key} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className="font-medium">{module.name}</span>
                    </div>
                    {hasAnyPermission(module.key) && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Acesso Concedido
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${module.key}-read`}
                        checked={getModulePermissions(module.key).read}
                        onCheckedChange={(checked) => 
                          handleModuleAccessChange(module.key, 'read', !!checked)
                        }
                      />
                      <Label htmlFor={`${module.key}-read`} className="text-sm">
                        Leitura
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${module.key}-write`}
                        checked={getModulePermissions(module.key).write}
                        onCheckedChange={(checked) => 
                          handleModuleAccessChange(module.key, 'write', !!checked)
                        }
                      />
                      <Label htmlFor={`${module.key}-write`} className="text-sm">
                        Escrita
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${module.key}-delete`}
                        checked={getModulePermissions(module.key).delete}
                        onCheckedChange={(checked) => 
                          handleModuleAccessChange(module.key, 'delete', !!checked)
                        }
                      />
                      <Label htmlFor={`${module.key}-delete`} className="text-sm">
                        Exclusão
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${module.key}-admin`}
                        checked={getModulePermissions(module.key).admin}
                        onCheckedChange={(checked) => 
                          handleModuleAccessChange(module.key, 'admin', !!checked)
                        }
                      />
                      <Label htmlFor={`${module.key}-admin`} className="text-sm">
                        Admin
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserCredentialsTab;
