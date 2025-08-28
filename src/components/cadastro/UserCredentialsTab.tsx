
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, User, Settings } from "lucide-react";
import { UserCredentials } from "@/types/user";
import { ModuleAccess as PermissionsModuleAccess } from "@/types/permissions";

interface UserCredentialsTabProps {
  formData: UserCredentials;
  onInputChange: (field: keyof UserCredentials, value: any) => void;
}

const UserCredentialsTab = ({ formData, onInputChange }: UserCredentialsTabProps) => {
  // Convert system modules to permissions format
  const systemModules: PermissionsModuleAccess[] = [
    {
      key: 'rh',
      name: 'Recursos Humanos',
      enabled: false,
      subModules: [
        { key: 'colaboradores', name: 'Colaboradores', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'processos', name: 'Processos Seletivos', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    },
    {
      key: 'comercial',
      name: 'Comercial',
      enabled: false,
      subModules: [
        { key: 'oportunidades', name: 'Oportunidades', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'propostas', name: 'Propostas', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    },
    {
      key: 'estoque',
      name: 'Estoque',
      enabled: false,
      subModules: [
        { key: 'produtos', name: 'Produtos', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'movimentacoes', name: 'Movimentações', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    }
  ];

  const [moduleAccess, setModuleAccess] = useState<PermissionsModuleAccess[]>(
    formData.moduleAccess as PermissionsModuleAccess[] || systemModules
  );

  const handleModuleToggle = (moduleKey: string) => {
    const updatedModules = moduleAccess.map(module => 
      module.key === moduleKey 
        ? { ...module, enabled: !module.enabled }
        : module
    );
    setModuleAccess(updatedModules);
    onInputChange('moduleAccess', updatedModules);
  };

  const handlePermissionChange = (moduleKey: string, subModuleKey: string, permission: string, value: boolean) => {
    const updatedModules = moduleAccess.map(module => {
      if (module.key === moduleKey) {
        const updatedSubModules = module.subModules.map(subModule => 
          subModule.key === subModuleKey 
            ? { 
                ...subModule, 
                permissions: { 
                  ...subModule.permissions, 
                  [permission]: value 
                }
              }
            : subModule
        );
        return { ...module, subModules: updatedSubModules };
      }
      return module;
    });
    setModuleAccess(updatedModules);
    onInputChange('moduleAccess', updatedModules);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-biodina-gold/10 rounded-lg">
          <Shield className="h-5 w-5 text-biodina-gold" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-biodina-blue">Credenciais e Acesso ao Sistema</h3>
          <p className="text-sm text-gray-600">Configure o acesso e permissões do usuário</p>
        </div>
      </div>

      {/* Status e Configurações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Configurações de Acesso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isActive">Usuário Ativo</Label>
              <p className="text-sm text-gray-600">Permite que o usuário faça login no sistema</p>
            </div>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => onInputChange('isActive', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userType">Tipo de Usuário</Label>
            <Select 
              value={formData.userType} 
              onValueChange={(value) => onInputChange('userType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de usuário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usuario">Usuário</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="gerente">Gerente</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Permissões por Módulo */}
      {formData.isActive && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Permissões de Módulos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {moduleAccess.map((module) => (
              <div key={module.key} className="space-y-3 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{module.name}</h4>
                    {module.enabled && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Ativo
                      </Badge>
                    )}
                  </div>
                  <Switch
                    checked={module.enabled}
                    onCheckedChange={() => handleModuleToggle(module.key)}
                  />
                </div>

                {module.enabled && (
                  <div className="ml-4 space-y-3">
                    {module.subModules.map((subModule) => (
                      <div key={subModule.key} className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-700">{subModule.name}</h5>
                        <div className="flex gap-4 text-sm">
                          {Object.entries(subModule.permissions).map(([permission, value]) => (
                            <div key={permission} className="flex items-center gap-2">
                              <Checkbox
                                id={`${module.key}-${subModule.key}-${permission}`}
                                checked={value}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(module.key, subModule.key, permission, checked as boolean)
                                }
                              />
                              <Label 
                                htmlFor={`${module.key}-${subModule.key}-${permission}`}
                                className="text-xs capitalize"
                              >
                                {permission}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {!formData.isActive && (
        <Card className="bg-gray-50">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Usuário Inativo</h3>
            <p className="text-sm text-gray-600">
              Este usuário não possui acesso ao sistema. Ative o usuário para configurar permissões.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserCredentialsTab;
