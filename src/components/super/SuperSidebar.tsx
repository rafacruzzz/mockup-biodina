import { ChevronRight, X } from "lucide-react";
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
  const handleCollapseModule = (e: React.MouseEvent, moduleId: string) => {
    e.stopPropagation();
    onModuleToggle(moduleId);
  };

  const handleSubModuleSelect = (moduleId: string, subModuleId: string) => {
    onSubModuleSelect(moduleId, subModuleId);
  };

  return (
    <div className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">SUPER</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-accent rounded-md transition-colors"
          aria-label="Fechar sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Modules List */}
      <div className="flex-1 overflow-y-auto py-2">
        {Object.entries(superModules).map(([moduleId, module]) => {
          const isExpanded = expandedModules.includes(moduleId);
          const isActive = activeModule === moduleId;
          const Icon = module.icon;

          return (
            <div key={moduleId} className="mb-1">
              {/* Module Header */}
              <button
                onClick={() => onModuleToggle(moduleId)}
                className={cn(
                  "w-full px-4 py-2 flex items-center justify-between hover:bg-accent transition-colors",
                  isActive && "bg-accent"
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{module.name}</span>
                </div>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isExpanded && "rotate-90"
                  )}
                  onClick={(e) => handleCollapseModule(e, moduleId)}
                />
              </button>

              {/* SubModules */}
              {isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {Object.entries(module.subModules).map(([subModuleId, subModule]) => {
                    const isSubActive =
                      activeModule === moduleId && activeSubModule === subModuleId;

                    return (
                      <button
                        key={subModuleId}
                        onClick={() => handleSubModuleSelect(moduleId, subModuleId)}
                        className={cn(
                          "w-full px-4 py-2 text-left text-sm hover:bg-accent/50 transition-colors rounded-md",
                          isSubActive && "bg-primary/10 text-primary font-medium"
                        )}
                      >
                        {subModule.name}
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
