
import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { comercialModules } from "@/data/comercialModules";

interface ComercialSidebarProps {
  activeModule: string;
  activeSubModule: string;
  expandedModules: string[];
  onModuleToggle: (module: string) => void;
  onModuleSelect: (module: string, subModule: string) => void;
  onClose: () => void;
}

const ComercialSidebar = ({
  activeModule,
  activeSubModule,
  expandedModules,
  onModuleToggle,
  onModuleSelect,
  onClose
}: ComercialSidebarProps) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200/80 h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-biodina-blue">Módulos Comerciais</h2>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {Object.entries(comercialModules).map(([moduleKey, module]) => (
          <div key={moduleKey} className="mb-2">
            <button
              onClick={() => onModuleToggle(moduleKey)}
              className={cn(
                "w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors",
                activeModule === moduleKey && "bg-biodina-blue/10 text-biodina-blue"
              )}
            >
              <span className="font-medium">{module.name}</span>
              {expandedModules.includes(moduleKey) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {expandedModules.includes(moduleKey) && (
              <div className="ml-4 mt-1 space-y-1">
                {Object.entries(module.subModules).map(([subModuleKey, subModule]) => (
                  <button
                    key={subModuleKey}
                    onClick={() => onModuleSelect(moduleKey, subModuleKey)}
                    className={cn(
                      "w-full text-left p-2 hover:bg-gray-50 rounded-md transition-colors text-sm",
                      activeModule === moduleKey && activeSubModule === subModuleKey && 
                      "bg-biodina-blue text-white"
                    )}
                  >
                    {subModule.name}
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

export default ComercialSidebar;
