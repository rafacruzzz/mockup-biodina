import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  BarChart3, ArrowDownCircle, ArrowUpCircle, RotateCcw, 
  XCircle, Settings, FileText 
} from "lucide-react";

interface FaturamentoSidebarProps {
  activeModule: string;
  onModuleChange: (moduleId: string) => void;
}

const FaturamentoSidebar = ({ activeModule, onModuleChange }: FaturamentoSidebarProps) => {
  const modules = [
    {
      id: 'dashboard-relatorios',
      title: 'Dashboard & Relatórios',
      icon: BarChart3,
      description: 'Análise completa e exportações'
    },
    {
      id: 'entrada',
      title: 'Entrada',
      icon: ArrowDownCircle,
      description: 'Checklist de vendas e validações'
    },
    {
      id: 'saida', 
      title: 'Saída',
      icon: ArrowUpCircle,
      description: 'Emissão de documentos fiscais'
    },
    {
      id: 'servicos',
      title: 'Serviços',
      icon: Settings,
      description: 'Faturamento de serviços (NFS-e)'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-2">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Faturamento</h2>
        <p className="text-sm text-gray-600">Gestão completa de documentos fiscais</p>
      </div>
      
      {modules.map((module) => {
        const Icon = module.icon;
        return (
          <Button
            key={module.id}
            variant={activeModule === module.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start text-left p-3 h-auto",
              activeModule === module.id 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-gray-100"
            )}
            onClick={() => onModuleChange(module.id)}
          >
            <div className="flex items-center gap-3 w-full">
              <Icon className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{module.title}</div>
                <div className="text-xs opacity-70 truncate">{module.description}</div>
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default FaturamentoSidebar;