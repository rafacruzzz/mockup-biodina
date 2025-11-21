import { ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { superModules } from "@/data/superMenuModules";

interface SuperSidebarProps {
  activeModule: string;
  activeSubModule: string;
  expandedModules: string[];
  onModuleToggle: (moduleId: string) => void;
  onSubModuleSelect: (moduleId: string, subModuleId: string) => void;
  onClose: () => void;
}

export const SuperSidebar = ({
  activeModule,
  activeSubModule,
  expandedModules,
  onModuleToggle,
  onSubModuleSelect,
  onClose,
}: SuperSidebarProps) => {
  const handleCollapseModule = (moduleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onModuleToggle(moduleId);
  };

  const handleSubModuleSelect = (moduleId: string, subModuleId: string) => {
    onSubModuleSelect(moduleId, subModuleId);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200/80 overflow-y-auto shadow-sm">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">SUPER</h2>
          <p className="text-gray-600 text-sm">Gestão Multi-Tenant do Sistema</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Fechar SUPER"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      <div className="p-4 space-y-2">
        {Object.entries(superModules).map(([moduleId, module]) => {
          const isExpanded = expandedModules.includes(moduleId);
          const isActive = activeModule === moduleId;
          const Icon = module.icon;

          return (
            <div key={moduleId} className="space-y-1">
              <button
                onClick={() => onModuleToggle(moduleId)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-md' 
                    : 'hover:bg-gray-50 text-gray-700 hover:shadow-sm'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    isActive ? 'bg-white/20' : 'bg-primary/10'
                  )}>
                    <Icon className={cn(
                      "h-5 w-5",
                      isActive ? 'text-white' : 'text-primary'
                    )} />
                  </div>
                  <span className="font-medium">{module.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {isExpanded && (
                    <button
                      onClick={(e) => handleCollapseModule(moduleId, e)}
                      className="p-1 rounded-md hover:bg-white/20 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                  {isExpanded ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </div>
              </button>
              
              {isExpanded && (
                <div className="ml-4 space-y-1 animate-fade-in">
                  {Object.entries(module.subModules).map(([subModuleId, subModule]) => {
                    const isSubActive =
                      activeModule === moduleId && activeSubModule === subModuleId;

                    return (
                      <button
                        key={subModuleId}
                        onClick={() => handleSubModuleSelect(moduleId, subModuleId)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg text-sm transition-all duration-200",
                          isSubActive
                            ? 'bg-primary text-white shadow-sm'
                            : 'hover:bg-gray-50 text-gray-600'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            isSubActive
                              ? 'bg-white'
                              : 'bg-primary/60'
                          )} />
                          {subModule.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
