import { useState } from "react";
import { ChevronDown, ChevronRight, Eye, Edit, Trash, CheckSquare, XSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { modulosCompletosSistema, ModuloDefinicao } from "@/data/sistemaModulosCompletos";
import { ModuloUsuario, SubModuloUsuario, Permission } from "@/types/permissions";
import { useUser } from "@/contexts/UserContext";

interface ModuleAccessTreeProps {
  modules: ModuloUsuario[];
  onModuleChange: (modules: ModuloUsuario[]) => void;
  modulosDisponiveis?: string[]; // Keys dos módulos disponíveis (limite da empresa)
}

const defaultPermissions: Permission = {
  view: false,
  create: false,
  edit: false,
  delete: false
};

type PermissionLevel = 'view' | 'edit' | 'delete';

const MODULOS_EXCLUSIVOS_SUPER = ['solicitacoes', 'personalizar-navegacao', 'categorias'];

const ModuleAccessTree = ({ modules, onModuleChange, modulosDisponiveis }: ModuleAccessTreeProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const { user } = useUser();
  const isSuperUser = user?.email === 'super@super.com.br';

  // Filtrar módulos disponíveis
  const modulosBase = modulosDisponiveis 
    ? modulosCompletosSistema.filter(m => modulosDisponiveis.includes(m.key))
    : modulosCompletosSistema;

  const modulosParaMostrar = isSuperUser
    ? modulosBase
    : modulosBase.filter(m => !MODULOS_EXCLUSIVOS_SUPER.includes(m.key));

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

  // Determina o nível de permissão atual
  const getPermissionLevel = (permissions: Permission): PermissionLevel => {
    if (permissions.delete) return 'delete';
    if (permissions.edit || permissions.create) return 'edit';
    return 'view';
  };

  // Converte nível de permissão para objeto Permission
  const permissionLevelToPermission = (level: PermissionLevel): Permission => {
    switch (level) {
      case 'delete':
        return { view: true, create: true, edit: true, delete: true };
      case 'edit':
        return { view: true, create: true, edit: true, delete: false };
      case 'view':
      default:
        return { view: true, create: false, edit: false, delete: false };
    }
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
          permissions: { view: true, create: false, edit: false, delete: false }
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
            permissions: checked ? { view: true, create: false, edit: false, delete: false } : defaultPermissions
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
            ? { view: true, create: false, edit: false, delete: false }
            : defaultPermissions
        }))
      };
      onModuleChange([...modules, novoModulo]);
    }
  };

  const handlePermissionLevelChange = (moduloKey: string, subModuloKey: string, level: PermissionLevel) => {
    const existingModulo = getModuloSelecionado(moduloKey);
    if (!existingModulo) return;

    const newPermissions = permissionLevelToPermission(level);

    const updatedSubModulos = existingModulo.subModulos.map(s => {
      if (s.key === subModuloKey) {
        return {
          ...s,
          permissions: newPermissions
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

  const getSubModulosHabilitadosCount = (moduloKey: string): number => {
    const modulo = getModuloSelecionado(moduloKey);
    if (!modulo) return 0;
    return modulo.subModulos.filter(s => s.habilitado).length;
  };

  const handleMarcarTodos = () => {
    const allModules: ModuloUsuario[] = modulosParaMostrar.map(m => ({
      key: m.key,
      name: m.name,
      icon: m.icon,
      habilitado: true,
      subModulos: m.subModulos.map(s => ({
        key: s.key,
        name: s.name,
        habilitado: true,
        permissions: { view: true, create: false, edit: false, delete: false }
      }))
    }));
    onModuleChange(allModules);
  };

  const handleDesmarcarTodos = () => {
    onModuleChange([]);
  };

  const handleAplicarNivelTodos = (level: PermissionLevel) => {
    const perms = permissionLevelToPermission(level);
    const allModules: ModuloUsuario[] = modulosParaMostrar.map(m => ({
      key: m.key,
      name: m.name,
      icon: m.icon,
      habilitado: true,
      subModulos: m.subModulos.map(s => ({
        key: s.key,
        name: s.name,
        habilitado: true,
        permissions: perms
      }))
    }));
    onModuleChange(allModules);
  };

  // Detectar estado atual dos módulos para destacar botões
  const todosHabilitados = modulosParaMostrar.length > 0 && modulosParaMostrar.every(m => {
    const mod = getModuloSelecionado(m.key);
    return mod?.habilitado && mod.subModulos.every(s => s.habilitado);
  });
  const nenhumHabilitado = modules.length === 0 || modules.every(m => !m.habilitado);

  const getNivelAtual = (): PermissionLevel | null => {
    if (!todosHabilitados) return null;
    const allSubs = modules.flatMap(m => m.subModulos.filter(s => s.habilitado));
    if (allSubs.length === 0) return null;
    const levels = allSubs.map(s => getPermissionLevel(s.permissions));
    const allSame = levels.every(l => l === levels[0]);
    return allSame ? levels[0] : null;
  };
  const nivelAtual = getNivelAtual();

  return (
    <div className="space-y-2">
      {/* Barra de ações em massa */}
      <div className="flex flex-wrap items-center gap-2 p-3 border rounded-lg bg-muted/50">
        <Button type="button" size="sm" 
          variant={todosHabilitados ? "default" : "outline"} 
          onClick={handleMarcarTodos}
        >
          <CheckSquare className="h-3.5 w-3.5 mr-1" />
          Marcar Todos
        </Button>
        <Button type="button" size="sm" 
          variant={nenhumHabilitado ? "default" : "outline"} 
          onClick={handleDesmarcarTodos}
        >
          <XSquare className="h-3.5 w-3.5 mr-1" />
          Desmarcar Todos
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Button type="button" size="sm" 
          variant={nivelAtual === 'view' ? "default" : "outline"} 
          onClick={() => handleAplicarNivelTodos('view')}
        >
          <Eye className="h-3.5 w-3.5 mr-1" />
          Todos Ver
        </Button>
        <Button type="button" size="sm" 
          variant={nivelAtual === 'edit' ? "default" : "outline"} 
          onClick={() => handleAplicarNivelTodos('edit')}
        >
          <Edit className="h-3.5 w-3.5 mr-1" />
          Todos Ver/Editar
        </Button>
        <Button type="button" size="sm" 
          variant={nivelAtual === 'delete' ? "default" : "outline"} 
          onClick={() => handleAplicarNivelTodos('delete')}
        >
          <Trash className="h-3.5 w-3.5 mr-1" />
          Todos Excluir
        </Button>
      </div>

      {modulosParaMostrar.map((moduloDef) => {
        const isExpanded = expandedModules.includes(moduloDef.key);
        const isEnabled = isModuloHabilitado(moduloDef.key);
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
              </div>
            </div>

            {isExpanded && (
              <div className="border-t bg-gray-50/50 p-3">
                <div className="space-y-3">
                  {moduloDef.subModulos.map((subModuloDef) => {
                    const isSubEnabled = isSubModuloHabilitado(moduloDef.key, subModuloDef.key);
                    const subModulo = getSubModulo(moduloDef.key, subModuloDef.key);
                    const currentLevel = subModulo ? getPermissionLevel(subModulo.permissions) : 'view';
                    
                    return (
                      <div key={subModuloDef.key} className={`bg-white rounded p-3 border ${isSubEnabled ? 'border-primary/30' : ''}`}>
                        <div className="flex items-center justify-between">
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
                          
                          {isSubEnabled && (
                            <RadioGroup
                              value={currentLevel}
                              onValueChange={(value) => 
                                handlePermissionLevelChange(moduloDef.key, subModuloDef.key, value as PermissionLevel)
                              }
                              className="flex items-center space-x-4"
                            >
                              <div className="flex items-center space-x-1">
                                <RadioGroupItem value="view" id={`${moduloDef.key}-${subModuloDef.key}-view`} />
                                <Label 
                                  htmlFor={`${moduloDef.key}-${subModuloDef.key}-view`}
                                  className="text-xs flex items-center space-x-1 cursor-pointer"
                                >
                                  <Eye className="h-3 w-3" />
                                  <span>Ver</span>
                                </Label>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <RadioGroupItem value="edit" id={`${moduloDef.key}-${subModuloDef.key}-edit`} />
                                <Label 
                                  htmlFor={`${moduloDef.key}-${subModuloDef.key}-edit`}
                                  className="text-xs flex items-center space-x-1 cursor-pointer"
                                >
                                  <Edit className="h-3 w-3" />
                                  <span>Ver/Editar</span>
                                </Label>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <RadioGroupItem value="delete" id={`${moduloDef.key}-${subModuloDef.key}-delete`} />
                                <Label 
                                  htmlFor={`${moduloDef.key}-${subModuloDef.key}-delete`}
                                  className="text-xs flex items-center space-x-1 cursor-pointer"
                                >
                                  <Trash className="h-3 w-3" />
                                  <span>Excluir</span>
                                </Label>
                              </div>
                            </RadioGroup>
                          )}
                        </div>
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