import { useState } from "react";
import { ChevronDown, ChevronRight, Eye, Plus, Edit, Trash, Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { modulosCompletosSistema, ModuloDefinicao } from "@/data/sistemaModulosCompletos";
import { ModuloUsuario, SubModuloUsuario, Permission } from "@/types/permissions";

interface ModuleAccessTreeProps {
  modules: ModuloUsuario[];
  onModuleChange: (modules: ModuloUsuario[]) => void;
  modulosDisponiveis?: string[]; // Keys dos módulos disponíveis (limite da empresa)
}

const defaultPermissions: Permission = {
  view: false,
  create: false,
  edit: false,
  delete: false,
  admin: false
};

const ModuleAccessTree = ({ modules, onModuleChange, modulosDisponiveis }: ModuleAccessTreeProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  // Filtrar módulos disponíveis
  const modulosParaMostrar = modulosDisponiveis 
    ? modulosCompletosSistema.filter(m => modulosDisponiveis.includes(m.key))
    : modulosCompletosSistema;

  const toggleModule = (moduleKey: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleKey) 
        ? prev.filter(key => key !== moduleKey)
        : [...prev, moduleKey]
    );
  };

  const getModuloSelecionado = (key: string): ModuloUsuario | undefined => {
    return modules.find(m => m.key === key);
  };

  const isModuloHabilitado = (key: string): boolean => {
    const modulo = getModuloSelecionado(key);
    return modulo?.habilitado ?? false;
  };

  const getSubModulo = (moduloKey: string, subModuloKey: string): SubModuloUsuario | undefined => {
    const modulo = getModuloSelecionado(moduloKey);
    if (!modulo) return undefined;
    return modulo.subModulos.find(s => s.key === subModuloKey);
  };

  const isSubModuloHabilitado = (moduloKey: string, subModuloKey: string): boolean => {
    const subModulo = getSubModulo(moduloKey, subModuloKey);
    return subModulo?.habilitado ?? false;
  };

  const handleModuloToggle = (moduloDef: ModuloDefinicao, checked: boolean) => {
    const existingModulo = getModuloSelecionado(moduloDef.key);
    
    if (checked) {
      const novoModulo: ModuloUsuario = {
        key: moduloDef.key,
        name: moduloDef.name,
        icon: moduloDef.icon,
        habilitado: true,
        subModulos: moduloDef.subModulos.map(s => ({
          key: s.key,
          name: s.name,
          habilitado: true,
          permissions: { view: true, create: false, edit: false, delete: false, admin: false }
        }))
      };

      if (existingModulo) {
        onModuleChange(modules.map(m => m.key === moduloDef.key ? novoModulo : m));
      } else {
        onModuleChange([...modules, novoModulo]);
      }
    } else {
      if (existingModulo) {
        onModuleChange(modules.map(m => 
          m.key === moduloDef.key 
            ? { ...m, habilitado: false, subModulos: m.subModulos.map(s => ({ ...s, habilitado: false, permissions: defaultPermissions })) }
            : m
        ));
      }
    }
  };

  const handleSubModuloToggle = (moduloDef: ModuloDefinicao, subModuloKey: string, checked: boolean) => {
    const existingModulo = getModuloSelecionado(moduloDef.key);
    
    if (existingModulo) {
      const subExists = existingModulo.subModulos.find(s => s.key === subModuloKey);
      
      let updatedSubModulos: SubModuloUsuario[];
      if (subExists) {
        updatedSubModulos = existingModulo.subModulos.map(s => 
          s.key === subModuloKey 
            ? { ...s, habilitado: checked, permissions: checked ? { ...s.permissions, view: true } : defaultPermissions } 
            : s
        );
      } else {
        const subDef = moduloDef.subModulos.find(s => s.key === subModuloKey);
        updatedSubModulos = [
          ...existingModulo.subModulos,
          { 
            key: subModuloKey, 
            name: subDef?.name || subModuloKey, 
            habilitado: checked,
            permissions: checked ? { view: true, create: false, edit: false, delete: false, admin: false } : defaultPermissions
          }
        ];
      }
      
      const hasAnyEnabled = updatedSubModulos.some(s => s.habilitado);
      
      onModuleChange(modules.map(m => 
        m.key === moduloDef.key 
          ? { ...m, habilitado: hasAnyEnabled, subModulos: updatedSubModulos }
          : m
      ));
    } else if (checked) {
      const novoModulo: ModuloUsuario = {
        key: moduloDef.key,
        name: moduloDef.name,
        icon: moduloDef.icon,
        habilitado: true,
        subModulos: moduloDef.subModulos.map(s => ({
          key: s.key,
          name: s.name,
          habilitado: s.key === subModuloKey,
          permissions: s.key === subModuloKey 
            ? { view: true, create: false, edit: false, delete: false, admin: false }
            : defaultPermissions
        }))
      };
      onModuleChange([...modules, novoModulo]);
    }
  };

  const handlePermissionChange = (moduloKey: string, subModuloKey: string, permission: keyof Permission, value: boolean) => {
    const existingModulo = getModuloSelecionado(moduloKey);
    if (!existingModulo) return;

    const updatedSubModulos = existingModulo.subModulos.map(s => {
      if (s.key === subModuloKey) {
        return {
          ...s,
          permissions: { ...s.permissions, [permission]: value }
        };
      }
      return s;
    });

    onModuleChange(modules.map(m => 
      m.key === moduloKey 
        ? { ...m, subModulos: updatedSubModulos }
        : m
    ));
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

  const getPermissionLabel = (permission: keyof Permission) => {
    switch (permission) {
      case 'view': return 'Ver';
      case 'create': return 'Criar';
      case 'edit': return 'Editar';
      case 'delete': return 'Excluir';
      case 'admin': return 'Admin';
    }
  };

  const getActivePermissionsCount = (moduloKey: string): number => {
    const modulo = getModuloSelecionado(moduloKey);
    if (!modulo) return 0;
    return modulo.subModulos.reduce((total, subModule) => {
      return total + Object.values(subModule.permissions).filter(Boolean).length;
    }, 0);
  };

  const getSubModulosHabilitadosCount = (moduloKey: string): number => {
    const modulo = getModuloSelecionado(moduloKey);
    if (!modulo) return 0;
    return modulo.subModulos.filter(s => s.habilitado).length;
  };

  return (
    <div className="space-y-2">
      {modulosParaMostrar.map((moduloDef) => {
        const isExpanded = expandedModules.includes(moduloDef.key);
        const isEnabled = isModuloHabilitado(moduloDef.key);
        const activePermissions = getActivePermissionsCount(moduloDef.key);
        const subModulosCount = getSubModulosHabilitadosCount(moduloDef.key);
        
        return (
          <div key={moduloDef.key} className="border rounded-lg">
            <div className={`flex items-center justify-between p-3 ${isEnabled ? 'bg-primary/5' : 'hover:bg-gray-50'}`}>
              <div className="flex items-center space-x-3 flex-1">
                <button
                  type="button"
                  onClick={() => toggleModule(moduloDef.key)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                <Checkbox
                  id={`module-${moduloDef.key}`}
                  checked={isEnabled}
                  onCheckedChange={(checked) => handleModuloToggle(moduloDef, checked as boolean)}
                />
                
                <span className="text-lg">{moduloDef.icon}</span>
                
                <Label htmlFor={`module-${moduloDef.key}`} className="font-medium cursor-pointer">
                  {moduloDef.name}
                </Label>
                
                {subModulosCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {subModulosCount}/{moduloDef.subModulos.length} submódulos
                  </Badge>
                )}
                
                {activePermissions > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {activePermissions} permissões
                  </Badge>
                )}
              </div>
            </div>

            {isExpanded && (
              <div className="border-t bg-gray-50/50 p-3">
                <div className="space-y-3">
                  {moduloDef.subModulos.map((subModuloDef) => {
                    const isSubEnabled = isSubModuloHabilitado(moduloDef.key, subModuloDef.key);
                    const subModulo = getSubModulo(moduloDef.key, subModuloDef.key);
                    
                    return (
                      <div key={subModuloDef.key} className={`bg-white rounded p-3 border ${isSubEnabled ? 'border-primary/30' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`submodule-${moduloDef.key}-${subModuloDef.key}`}
                              checked={isSubEnabled}
                              onCheckedChange={(checked) => 
                                handleSubModuloToggle(moduloDef, subModuloDef.key, checked as boolean)
                              }
                            />
                            <Label 
                              htmlFor={`submodule-${moduloDef.key}-${subModuloDef.key}`}
                              className="font-medium text-sm cursor-pointer"
                            >
                              {subModuloDef.name}
                            </Label>
                          </div>
                        </div>
                        
                        {isSubEnabled && (
                          <div className="grid grid-cols-5 gap-2 mt-2 pl-6">
                            {(['view', 'create', 'edit', 'delete', 'admin'] as const).map((permission) => (
                              <div key={permission} className="flex items-center space-x-1">
                                <Checkbox
                                  id={`${moduloDef.key}-${subModuloDef.key}-${permission}`}
                                  checked={subModulo?.permissions[permission] ?? false}
                                  onCheckedChange={(checked) => 
                                    handlePermissionChange(moduloDef.key, subModuloDef.key, permission, checked as boolean)
                                  }
                                />
                                <Label 
                                  htmlFor={`${moduloDef.key}-${subModuloDef.key}-${permission}`}
                                  className="text-xs flex items-center space-x-1 cursor-pointer"
                                >
                                  {getPermissionIcon(permission)}
                                  <span>{getPermissionLabel(permission)}</span>
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
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
