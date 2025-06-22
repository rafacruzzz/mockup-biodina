
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { comprasModules } from "@/data/comprasModules";

interface ComprasSidebarProps {
  activeModule: string;
  activeSubModule: string;
  expandedModules: string[];
  onModuleToggle: (module: string) => void;
  onModuleSelect: (module: string, subModule: string) => void;
  onClose: () => void;
}

const ComprasSidebar = ({
  activeModule,
  activeSubModule,
  expandedModules,
  onModuleToggle,
  onModuleSelect,
  onClose
}: ComprasSidebarProps) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Módulo de Compras</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {Object.entries(comprasModules).map(([moduleKey, module]) => {
            const isExpanded = expandedModules.includes(moduleKey);
            const Icon = module.icon;
            
            return (
              <div key={moduleKey} className="space-y-1">
                <button
                  onClick={() => onModuleToggle(moduleKey)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                  <Icon className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{module.name}</span>
                </button>

                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {Object.entries(module.subModules).map(([subModuleKey, subModule]) => (
                      <button
                        key={subModuleKey}
                        onClick={() => onModuleSelect(moduleKey, subModuleKey)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                          activeModule === moduleKey && activeSubModule === subModuleKey
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {subModule.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComprasSidebar;
