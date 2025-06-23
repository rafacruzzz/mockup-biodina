
import { ChevronDown, ChevronRight, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { estoqueModules } from "@/data/estoqueModules";

interface EstoqueSidebarProps {
  activeModule: string;
  activeSubModule: string;
  expandedModules: string[];
  isCollapsed: boolean;
  onModuleToggle: (module: string) => void;
  onModuleSelect: (module: string, subModule: string) => void;
  onClose: () => void;
  onToggleCollapse: () => void;
}

const EstoqueSidebar = ({
  activeModule,
  activeSubModule,
  expandedModules,
  isCollapsed,
  onModuleToggle,
  onModuleSelect,
  onClose,
  onToggleCollapse
}: EstoqueSidebarProps) => {

  const handleCollapseModule = (moduleKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onModuleToggle(moduleKey);
  };

  const handleSubModuleSelect = (module: string, subModule: string) => {
    onModuleSelect(module, subModule);
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200/80 shadow-sm transition-all duration-300 ease-in-out flex-shrink-0",
      isCollapsed ? "w-16" : "w-80"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100">
        <div className={cn("flex items-center", isCollapsed && "justify-center w-full")}>
          <span className={cn("text-xl font-bold text-biodina-blue", isCollapsed && "hidden")}>
            Estoque
          </span>
          <span className={cn("text-sm text-biodina-gold ml-2", isCollapsed && "hidden")}>
            Sistemas
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
          {!isCollapsed && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Fechar estoque"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="py-4 px-3">
        <div className={cn("mb-4", isCollapsed && "sr-only")}>
          <h3 className="text-sm font-medium text-gray-500 px-3">Módulos de Estoque</h3>
        </div>
        
        <div className="space-y-1">
          {Object.entries(estoqueModules).map(([key, module]) => (
            <div key={key} className="space-y-1">
              <button
                onClick={() => onModuleToggle(key)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                  activeModule === key 
                    ? 'bg-gradient-to-r from-biodina-blue to-biodina-blue/90 text-white shadow-md' 
                    : 'hover:bg-gray-50 text-gray-700'
                )}
                title={isCollapsed ? module.name : undefined}
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
                  {!isCollapsed && <span className="font-medium">{module.name}</span>}
                </div>
                {!isCollapsed && (
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
                )}
              </button>
              
              {expandedModules.includes(key) && !isCollapsed && (
                <div className="ml-4 space-y-1 animate-fade-in">
                  {Object.entries(module.subModules).map(([subKey, subModule]) => (
                    <button
                      key={subKey}
                      onClick={() => handleSubModuleSelect(key, subKey)}
                      className={cn(
                        "w-full flex items-center gap-2 p-3 text-sm ml-4 rounded-xl transition-all duration-200",
                        activeModule === key && activeSubModule === subKey
                          ? 'bg-biodina-gold text-white shadow-sm'
                          : 'hover:bg-gray-50 text-gray-600'
                      )}
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        activeModule === key && activeSubModule === subKey
                          ? 'bg-white'
                          : 'bg-biodina-gold/60'
                      )} />
                      {subModule.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstoqueSidebar;
