
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Plus, Edit, Trash, Settings } from "lucide-react";
import { ModuleAccess } from "@/types/permissions";

interface AccessSummaryProps {
  modules: ModuleAccess[];
}

const AccessSummary = ({ modules }: AccessSummaryProps) => {
  const enabledModules = modules.filter(module => module.enabled);
  
  const totalPermissions = modules.reduce((total, module) => {
    return total + module.subModules.reduce((subTotal, subModule) => {
      return subTotal + Object.values(subModule.permissions).filter(Boolean).length;
    }, 0);
  }, 0);

  const permissionsByType = modules.reduce((acc, module) => {
    module.subModules.forEach(subModule => {
      Object.entries(subModule.permissions).forEach(([permission, value]) => {
        if (value) {
          acc[permission] = (acc[permission] || 0) + 1;
        }
      });
    });
    return acc;
  }, {} as Record<string, number>);

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'view': return <Eye className="h-3 w-3" />;
      case 'create': return <Plus className="h-3 w-3" />;
      case 'edit': return <Edit className="h-3 w-3" />;
      case 'delete': return <Trash className="h-3 w-3" />;
      case 'admin': return <Settings className="h-3 w-3" />;
      default: return <Shield className="h-3 w-3" />;
    }
  };

  const getPermissionLabel = (permission: string) => {
    switch (permission) {
      case 'view': return 'Visualizar';
      case 'create': return 'Criar';
      case 'edit': return 'Editar';
      case 'delete': return 'Excluir';
      case 'admin': return 'Administrar';
      default: return permission;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>Resumo dos Acessos</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Módulos Habilitados</p>
            <p className="text-lg font-semibold text-blue-600">
              {enabledModules.length} / {modules.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total de Permissões</p>
            <p className="text-lg font-semibold text-green-600">
              {totalPermissions}
            </p>
          </div>
        </div>

        {Object.keys(permissionsByType).length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Permissões por Tipo</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(permissionsByType).map(([permission, count]) => (
                <Badge key={permission} variant="secondary" className="flex items-center space-x-1">
                  {getPermissionIcon(permission)}
                  <span>{getPermissionLabel(permission)}: {count}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {enabledModules.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Módulos Ativos</p>
            <div className="flex flex-wrap gap-2">
              {enabledModules.map((module) => (
                <Badge key={module.key} variant="outline">
                  {module.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccessSummary;
