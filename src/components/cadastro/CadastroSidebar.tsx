
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { modules } from "@/data/cadastroModules";

interface CadastroSidebarProps {
  activeModule: string;
  activeSubModule: string;
  expandedModules: string[];
  onModuleToggle: (module: string) => void;
  onModuleSelect: (module: string, subModule: string) => void;
}

const CadastroSidebar = ({ 
  activeModule, 
  activeSubModule, 
  expandedModules, 
  onModuleToggle, 
  onModuleSelect 
}: CadastroSidebarProps) => {
  const handleCollapseModule = (moduleKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onModuleToggle(moduleKey);
  };

  const handleSubModuleSelect = (module: string, subModule: string) => {
    onModuleSelect(module, subModule);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200/80 overflow-y-auto shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-biodina-blue mb-2">Cadastros</h2>
        <p className="text-gray-600 text-sm">Gerencie todos os cadastros do sistema</p>
      </div>
      
      <div className="p-4 space-y-2">
        {Object.entries(modules).map(([key, module]) => (
          <div key={key} className="space-y-1">
            <button
              onClick={() => onModuleToggle(key)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                activeModule === key 
                  ? 'bg-gradient-to-r from-biodina-blue to-biodina-blue/90 text-white shadow-md' 
                  : 'hover:bg-gray-50 text-gray-700 hover:shadow-sm'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  activeModule === key ? 'bg-white/20' : 'bg-biodina-gold/10'
                )}>
                  <module.icon className={cn(
                    "h-5 w-5",
                    activeModule === key ? 'text-white' : 'text-biodina-gold'
                  )} />
                </div>
                <span className="font-medium">{module.name}</span>
              </div>
              <div className="flex items-center gap-1">
                {expandedModules.includes(key) && (
                  <button
                    onClick={(e) => handleCollapseModule(key, e)}
                    className="p-1 rounded-md hover:bg-white/20 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
                {expandedModules.includes(key) ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
            </button>
            
            {expandedModules.includes(key) && (
              <div className="ml-4 space-y-1 animate-fade-in">
                {Object.entries(module.subModules).map(([subKey, subModule]) => (
                  <button
                    key={subKey}
                    onClick={() => handleSubModuleSelect(key, subKey)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg text-sm transition-all duration-200",
                      activeModule === key && activeSubModule === subKey
                        ? 'bg-biodina-gold text-white shadow-sm'
                        : 'hover:bg-gray-50 text-gray-600'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        activeModule === key && activeSubModule === subKey
                          ? 'bg-white'
                          : 'bg-biodina-gold/60'
                      )} />
                      {subModule.name}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CadastroSidebar;
