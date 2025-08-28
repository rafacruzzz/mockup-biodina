
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cadastroModules } from "@/data/cadastroModules";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface CadastroSidebarProps {
  selectedModule: string;
  onModuleSelect: (moduleId: string) => void;
}

const CadastroSidebar = ({ selectedModule, onModuleSelect }: CadastroSidebarProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const location = useLocation();

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const isModuleExpanded = (moduleId: string) => expandedModules.includes(moduleId);
  const isModuleActive = (moduleId: string) => selectedModule === moduleId;

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-biodina-blue">Cadastro</h2>
        <p className="text-sm text-gray-600">Gerenciamento de dados</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {cadastroModules.map((module, index) => {
            const IconComponent = module.icon;
            const isActive = isModuleActive(module.id);

            return (
              <div key={module.id} className="mb-1">
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start p-3 h-auto ${
                    isActive ? "bg-biodina-gold/10 text-biodina-gold" : "hover:bg-gray-50"
                  }`}
                  onClick={() => onModuleSelect(module.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${module.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{module.name}</div>
                      <div className="text-xs text-gray-500">{module.description}</div>
                    </div>
                  </div>
                </Button>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CadastroSidebar;
