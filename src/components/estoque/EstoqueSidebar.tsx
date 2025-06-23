
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { estoqueModules } from "@/data/estoqueModules";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

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
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleCollapseModule = (moduleKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onModuleToggle(moduleKey);
  };

  const handleSubModuleSelect = (module: string, subModule: string) => {
    onModuleSelect(module, subModule);
  };

  return (
    <Sidebar className="w-80 data-[state=collapsed]:w-16">
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
          <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors" />
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

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={cn(isCollapsed && "sr-only")}>
            Módulos de Estoque
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.entries(estoqueModules).map(([key, module]) => (
                <div key={key} className="space-y-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => onModuleToggle(key)}
                      isActive={activeModule === key}
                      tooltip={isCollapsed ? module.name : undefined}
                      className={cn(
                        "w-full justify-between",
                        activeModule === key 
                          ? 'bg-gradient-to-r from-biodina-blue to-biodina-blue/90 text-white shadow-md' 
                          : 'hover:bg-gray-50 text-gray-700'
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
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {expandedModules.includes(key) && !isCollapsed && (
                    <div className="ml-4 space-y-1 animate-fade-in">
                      {Object.entries(module.subModules).map(([subKey, subModule]) => (
                        <SidebarMenuItem key={subKey}>
                          <SidebarMenuButton
                            onClick={() => handleSubModuleSelect(key, subKey)}
                            isActive={activeModule === key && activeSubModule === subKey}
                            className={cn(
                              "text-sm ml-4",
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
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default EstoqueSidebar;
