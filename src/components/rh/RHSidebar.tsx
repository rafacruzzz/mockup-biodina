
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { rhModules } from '@/data/rhModules';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface RHSidebarProps {
  activeModule: string;
  onModuleChange: (moduleId: string) => void;
}

const RHSidebar = ({ activeModule, onModuleChange }: RHSidebarProps) => {
  const [openModules, setOpenModules] = React.useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const isModuleOpen = (moduleId: string) => openModules.includes(moduleId);

  return (
    <div className="w-64 bg-white shadow-lg h-full border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-biodina-blue">Recursos Humanos</h2>
      </div>
      
      <nav className="p-4 space-y-2">
        {rhModules.map((module: any) => {
          const IconComponent = module.icon;
          const hasSubModules = module.subModules && module.subModules.length > 0;
          
          return (
            <div key={module.id}>
              {hasSubModules ? (
                <Collapsible
                  open={isModuleOpen(module.id)}
                  onOpenChange={() => toggleModule(module.id)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                      activeModule === module.id ? 'bg-biodina-gold text-white' : 'hover:bg-gray-100'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5" />
                        <span className="font-medium">{module.name}</span>
                      </div>
                      {isModuleOpen(module.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  
                  {module.subModules && (
                    <CollapsibleContent className="ml-4 mt-2 space-y-1">
                      {module.subModules.map((subModule: any) => (
                        <button
                          key={subModule.id}
                          onClick={() => onModuleChange(subModule.id)}
                          className={`w-full text-left p-2 rounded-lg transition-colors ${
                            activeModule === subModule.id 
                              ? 'bg-biodina-gold/20 text-biodina-blue' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-sm">{subModule.name}</span>
                        </button>
                      ))}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              ) : (
                <button
                  onClick={() => onModuleChange(module.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeModule === module.id ? 'bg-biodina-gold text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{module.name}</span>
                </button>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default RHSidebar;
