
import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { estoqueModules } from "@/data/estoqueModules";

interface EstoqueSidebarProps {
  activeModule: string;
  activeSubModule: string;
  expandedModules: string[];
  onModuleToggle: (module: string) => void;
  onModuleSelect: (module: string, subModule: string) => void;
  onClose: () => void;
}

const EstoqueSidebar = ({
  activeModule,
  activeSubModule,
  expandedModules,
  onModuleToggle,
  onModuleSelect,
  onClose
}: EstoqueSidebarProps) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Módulos de Estoque</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 h-auto"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {Object.entries(estoqueModules).map(([moduleKey, module]) => {
            const isExpanded = expandedModules.includes(moduleKey);
            const isActive = activeModule === moduleKey;
            const Icon = module.icon;

            return (
              <div key={moduleKey} className="space-y-1">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-3 py-2 h-auto text-left",
                    isActive && !activeSubModule ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => onModuleToggle(moduleKey)}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 text-sm font-medium">{module.name}</span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    )}
                  </div>
                </Button>

                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {Object.entries(module.subModules).map(([subModuleKey, subModule]) => {
                      const isSubModuleActive = activeModule === moduleKey && activeSubModule === subModuleKey;
                      
                      return (
                        <Button
                          key={subModuleKey}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start px-3 py-1.5 h-auto text-left text-sm",
                            isSubModuleActive 
                              ? "bg-blue-50 text-blue-700 font-medium" 
                              : "text-gray-600 hover:bg-gray-50"
                          )}
                          onClick={() => onModuleSelect(moduleKey, subModuleKey)}
                        >
                          {subModule.name}
                        </Button>
                      );
                    })}
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

export default EstoqueSidebar;
