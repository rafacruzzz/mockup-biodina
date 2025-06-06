
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown, ChevronRight, TrendingUp, Headphones, Users, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { comercialModules } from "@/data/comercialModules";

interface ComercialSidebarProps {
  onModuleSelect?: (moduleId: string) => void;
}

const ComercialSidebar: React.FC<ComercialSidebarProps> = ({ onModuleSelect }) => {
  const location = useLocation();
  const [expandedModules, setExpandedModules] = useState<string[]>(['pos-vendas']);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return TrendingUp;
      case 'Headphones': return Headphones;
      case 'Users': return Users;
      case 'Wrench': return Wrench;
      default: return TrendingUp;
    }
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const isModuleExpanded = (moduleId: string) => expandedModules.includes(moduleId);
  const isActive = (path: string) => location.pathname === path;
  const hasActiveChild = (module: any) => {
    return module.subModules?.some((sub: any) => isActive(sub.path));
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <nav className="space-y-2">
        {comercialModules.map((module) => {
          const Icon = getIcon(module.icon);
          const expanded = isModuleExpanded(module.id);
          const moduleActive = module.path ? isActive(module.path) : hasActiveChild(module);

          return (
            <div key={module.id}>
              {module.path ? (
                <Link
                  to={module.path}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors",
                    moduleActive 
                      ? "bg-biodina-blue text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => onModuleSelect?.(module.id)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{module.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleModule(module.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors",
                      moduleActive 
                        ? "bg-biodina-blue text-white" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{module.name}</span>
                    </div>
                    {expanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {expanded && module.subModules && (
                    <div className="ml-4 mt-2 space-y-1">
                      {module.subModules.map((subModule) => {
                        const SubIcon = getIcon(subModule.icon);
                        const subActive = isActive(subModule.path);

                        return (
                          <Link
                            key={subModule.id}
                            to={subModule.path}
                            className={cn(
                              "flex items-center gap-3 p-2 rounded-lg text-sm transition-colors",
                              subActive
                                ? "bg-biodina-blue/10 text-biodina-blue font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                            onClick={() => onModuleSelect?.(subModule.id)}
                          >
                            <SubIcon className="h-4 w-4" />
                            <span>{subModule.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default ComercialSidebar;
