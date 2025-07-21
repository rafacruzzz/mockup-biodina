
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, ChevronDown, X, Users, UserCheck } from "lucide-react";
import { modules } from "@/data/rhModules";

interface RHSidebarProps {
  activeModule: string;
  activeSubModule: string;
  expandedModules: string[];
  onModuleToggle: (module: string) => void;
  onModuleSelect: (module: string, subModule: string) => void;
  onClose: () => void;
}

const RHSidebar = ({
  activeModule,
  activeSubModule,
  expandedModules,
  onModuleToggle,
  onModuleSelect,
  onClose
}: RHSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getIcon = (moduleKey: string) => {
    const iconMap: Record<string, any> = {
      colaboradores: Users,
      avaliacao: UserCheck,
    };
    return iconMap[moduleKey] || Users;
  };

  const hasActiveSubModule = activeModule && activeSubModule;

  if (isCollapsed) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col">
        <Button
          variant="ghost"
          size="sm"
          className="m-2 h-10 w-10 p-0"
          onClick={() => setIsCollapsed(false)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {Object.entries(modules).map(([key, module]) => {
              const Icon = getIcon(key);
              return (
                <Button
                  key={key}
                  variant={activeModule === key ? "default" : "ghost"}
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => {
                    if (module.subModules) {
                      const firstSubModule = Object.keys(module.subModules)[0];
                      onModuleSelect(key, firstSubModule);
                    }
                    setIsCollapsed(false);
                  }}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-biodina-blue">Recursos Humanos</h2>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsCollapsed(true)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            {hasActiveSubModule && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {Object.entries(modules).map(([key, module]) => {
            const Icon = getIcon(key);
            const isExpanded = expandedModules.includes(key);
            
            return (
              <div key={key} className="space-y-1">
                <Button
                  variant={activeModule === key && !activeSubModule ? "default" : "ghost"}
                  className="w-full justify-start h-10 text-left"
                  onClick={() => {
                    if (module.subModules) {
                      onModuleToggle(key);
                    } else {
                      onModuleSelect(key, '');
                    }
                  }}
                >
                  <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{module.name}</span>
                  {module.subModules && (
                    <div className="ml-auto flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  )}
                </Button>

                {isExpanded && module.subModules && (
                  <div className="ml-6 space-y-1">
                    {Object.entries(module.subModules).map(([subKey, subModule]) => (
                      <Button
                        key={subKey}
                        variant={activeModule === key && activeSubModule === subKey ? "default" : "ghost"}
                        className="w-full justify-start h-9 text-left text-sm"
                        onClick={() => onModuleSelect(key, subKey)}
                      >
                        <span className="truncate">{subModule.name}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RHSidebar;
