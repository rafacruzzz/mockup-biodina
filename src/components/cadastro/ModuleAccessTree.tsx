
import { useState } from "react";
import { ChevronDown, ChevronRight, Shield, Eye, Plus, Edit, Trash, Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ModuleAccess, Permission } from "@/types/permissions";

interface ModuleAccessTreeProps {
  modules: ModuleAccess[];
  onModuleChange: (modules: ModuleAccess[]) => void;
}

const ModuleAccessTree = ({ modules, onModuleChange }: ModuleAccessTreeProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (moduleKey: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleKey) 
        ? prev.filter(key => key !== moduleKey)
        : [...prev, moduleKey]
    );
  };

  const handleModuleToggle = (moduleKey: string, enabled: boolean) => {
    const updated = modules.map(module => 
      module.key === moduleKey 
        ? { ...module, enabled }
        : module
    );
    onModuleChange(updated);
  };

  const handlePermissionChange = (moduleKey: string, subModuleKey: string, permission: keyof Permission, value: boolean) => {
    const updated = modules.map(module => {
      if (module.key === moduleKey) {
        return {
          ...module,
          subModules: module.subModules.map(subModule => 
            subModule.key === subModuleKey
              ? {
                  ...subModule,
                  permissions: { ...subModule.permissions, [permission]: value }
                }
              : subModule
          )
        };
      }
      return module;
    });
    onModuleChange(updated);
  };

  const getPermissionIcon = (permission: keyof Permission) => {
    switch (permission) {
      case 'view': return <Eye className="h-3 w-3" />;
      case 'create': return <Plus className="h-3 w-3" />;
      case 'edit': return <Edit className="h-3 w-3" />;
      case 'delete': return <Trash className="h-3 w-3" />;
      case 'admin': return <Settings className="h-3 w-3" />;
    }
  };

  const getActivePermissionsCount = (module: ModuleAccess) => {
    return module.subModules.reduce((total, subModule) => {
      return total + Object.values(subModule.permissions).filter(Boolean).length;
    }, 0);
  };

  return (
    <div className="space-y-2">
      {modules.map((module) => {
        const isExpanded = expandedModules.includes(module.key);
        const activePermissions = getActivePermissionsCount(module);
        
        return (
          <div key={module.key} className="border rounded-lg">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50">
              <div className="flex items-center space-x-3 flex-1">
                <button
                  onClick={() => toggleModule(module.key)}
                  className="p-1"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                <Checkbox
                  id={`module-${module.key}`}
                  checked={module.enabled}
                  onCheckedChange={(checked) => handleModuleToggle(module.key, checked as boolean)}
                />
                
                <Shield className="h-4 w-4 text-blue-500" />
                
                <Label htmlFor={`module-${module.key}`} className="font-medium cursor-pointer">
                  {module.name}
                </Label>
                
                {activePermissions > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {activePermissions} permissões
                  </Badge>
                )}
              </div>
            </div>

            {isExpanded && (
              <div className="border-t bg-gray-50/50 p-3">
                <div className="space-y-3">
                  {module.subModules.map((subModule) => (
                    <div key={subModule.key} className="bg-white rounded p-3 border">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="font-medium text-sm">{subModule.name}</Label>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(subModule.permissions).map(([permission, value]) => (
                          <div key={permission} className="flex items-center space-x-1">
                            <Checkbox
                              id={`${module.key}-${subModule.key}-${permission}`}
                              checked={value}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(module.key, subModule.key, permission as keyof Permission, checked as boolean)
                              }
                            />
                            <Label 
                              htmlFor={`${module.key}-${subModule.key}-${permission}`}
                              className="text-xs flex items-center space-x-1 cursor-pointer"
                            >
                              {getPermissionIcon(permission as keyof Permission)}
                              <span className="capitalize">{permission === 'admin' ? 'Admin' : permission === 'view' ? 'Ver' : permission === 'create' ? 'Criar' : permission === 'edit' ? 'Editar' : 'Excluir'}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ModuleAccessTree;
