import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { modulosCompletosSistema, ModuloDefinicao } from "@/data/sistemaModulosCompletos";
import { ModuloEmpresa, SubModuloEmpresa } from "@/types/permissions";

interface SeletorModulosDetalhadoProps {
  modulosSelecionados: ModuloEmpresa[];
  onChange: (modulos: ModuloEmpresa[]) => void;
  modulosDisponiveis?: string[]; // Keys dos módulos disponíveis (limite da empresa principal)
}

export const SeletorModulosDetalhado = ({ 
  modulosSelecionados, 
  onChange, 
  modulosDisponiveis 
}: SeletorModulosDetalhadoProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  // Filtrar módulos disponíveis
  const modulosParaMostrar = modulosDisponiveis 
    ? modulosCompletosSistema.filter(m => modulosDisponiveis.includes(m.key))
    : modulosCompletosSistema;

  const toggleExpand = (moduleKey: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleKey) 
        ? prev.filter(key => key !== moduleKey)
        : [...prev, moduleKey]
    );
  };

  const getModuloSelecionado = (key: string): ModuloEmpresa | undefined => {
    return modulosSelecionados.find(m => m.key === key);
  };

  const isModuloHabilitado = (key: string): boolean => {
    const modulo = getModuloSelecionado(key);
    return modulo?.habilitado ?? false;
  };

  const isSubModuloHabilitado = (moduloKey: string, subModuloKey: string): boolean => {
    const modulo = getModuloSelecionado(moduloKey);
    if (!modulo) return false;
    const subModulo = modulo.subModulos.find(s => s.key === subModuloKey);
    return subModulo?.habilitado ?? false;
  };

  const getSubModulosHabilitadosCount = (moduloKey: string): number => {
    const modulo = getModuloSelecionado(moduloKey);
    if (!modulo) return 0;
    return modulo.subModulos.filter(s => s.habilitado).length;
  };

  const handleModuloToggle = (moduloDef: ModuloDefinicao, checked: boolean) => {
    const existingModulo = getModuloSelecionado(moduloDef.key);
    
    if (checked) {
      // Habilitar módulo e todos os submódulos
      const novoModulo: ModuloEmpresa = {
        key: moduloDef.key,
        name: moduloDef.name,
        icon: moduloDef.icon,
        habilitado: true,
        subModulos: moduloDef.subModulos.map(s => ({
          key: s.key,
          name: s.name,
          habilitado: true
        }))
      };

      if (existingModulo) {
        onChange(modulosSelecionados.map(m => 
          m.key === moduloDef.key ? novoModulo : m
        ));
      } else {
        onChange([...modulosSelecionados, novoModulo]);
      }
    } else {
      // Desabilitar módulo e todos os submódulos
      if (existingModulo) {
        onChange(modulosSelecionados.map(m => 
          m.key === moduloDef.key 
            ? { ...m, habilitado: false, subModulos: m.subModulos.map(s => ({ ...s, habilitado: false })) }
            : m
        ));
      }
    }
  };

  const handleSubModuloToggle = (moduloDef: ModuloDefinicao, subModuloKey: string, checked: boolean) => {
    const existingModulo = getModuloSelecionado(moduloDef.key);
    
    if (existingModulo) {
      const updatedSubModulos = existingModulo.subModulos.map(s => 
        s.key === subModuloKey ? { ...s, habilitado: checked } : s
      );
      
      // Se algum submódulo está habilitado, o módulo deve estar habilitado
      const hasAnyEnabled = updatedSubModulos.some(s => s.habilitado);
      
      onChange(modulosSelecionados.map(m => 
        m.key === moduloDef.key 
          ? { ...m, habilitado: hasAnyEnabled, subModulos: updatedSubModulos }
          : m
      ));
    } else if (checked) {
      // Criar novo módulo com este submódulo habilitado
      const novoModulo: ModuloEmpresa = {
        key: moduloDef.key,
        name: moduloDef.name,
        icon: moduloDef.icon,
        habilitado: true,
        subModulos: moduloDef.subModulos.map(s => ({
          key: s.key,
          name: s.name,
          habilitado: s.key === subModuloKey
        }))
      };
      onChange([...modulosSelecionados, novoModulo]);
    }
  };

  const totalModulosHabilitados = modulosSelecionados.filter(m => m.habilitado).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Selecione os módulos e submódulos habilitados</h3>
        <Badge variant="outline">
          {totalModulosHabilitados} de {modulosParaMostrar.length} módulos
        </Badge>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {modulosParaMostrar.map((modulo) => {
          const isExpanded = expandedModules.includes(modulo.key);
          const isEnabled = isModuloHabilitado(modulo.key);
          const subModulosCount = getSubModulosHabilitadosCount(modulo.key);

          return (
            <div key={modulo.key} className="border rounded-lg">
              <div className={`flex items-center justify-between p-3 ${isEnabled ? 'bg-primary/5' : 'hover:bg-gray-50'}`}>
                <div className="flex items-center space-x-3 flex-1">
                  <button
                    type="button"
                    onClick={() => toggleExpand(modulo.key)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  <Checkbox
                    id={`modulo-${modulo.key}`}
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleModuloToggle(modulo, checked as boolean)}
                  />
                  
                  <span className="text-lg">{modulo.icon}</span>
                  
                  <Label htmlFor={`modulo-${modulo.key}`} className="font-medium cursor-pointer flex-1">
                    {modulo.name}
                  </Label>
                  
                  {subModulosCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {subModulosCount}/{modulo.subModulos.length} submódulos
                    </Badge>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t bg-gray-50/50 p-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {modulo.subModulos.map((subModulo) => {
                      const isSubEnabled = isSubModuloHabilitado(modulo.key, subModulo.key);
                      
                      return (
                        <div 
                          key={subModulo.key} 
                          className={`flex items-center space-x-2 p-2 rounded border ${isSubEnabled ? 'bg-white border-primary/30' : 'bg-white'}`}
                        >
                          <Checkbox
                            id={`submodulo-${modulo.key}-${subModulo.key}`}
                            checked={isSubEnabled}
                            onCheckedChange={(checked) => 
                              handleSubModuloToggle(modulo, subModulo.key, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={`submodulo-${modulo.key}-${subModulo.key}`}
                            className="text-sm cursor-pointer"
                          >
                            {subModulo.name}
                          </Label>
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
    </div>
  );
};

export default SeletorModulosDetalhado;
