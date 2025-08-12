
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  ShoppingCart, 
  UserCheck, 
  HandCoins,
  Calendar, 
  MessageSquare, 
  Phone,
  FileImport,
  FileCheck
} from 'lucide-react';

interface ComercialTabsProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const ComercialTabs = ({ activeModule, onModuleChange }: ComercialTabsProps) => {
  const modules = [
    {
      id: "oportunidades",
      label: "Oportunidades",
      icon: FileText
    },
    {
      id: "vendas", 
      label: "Vendas",
      icon: ShoppingCart
    },
    {
      id: "pos-venda",
      label: "Pós-Venda", 
      icon: UserCheck
    },
    {
      id: "emprestimos",
      label: "Empréstimos",
      icon: HandCoins
    },
    {
      id: "agenda",
      label: "Agenda",
      icon: Calendar
    },
    {
      id: "chat",
      label: "Chat",
      icon: MessageSquare
    },
    {
      id: "chamados",
      label: "Chamados", 
      icon: Phone
    },
    {
      id: "importacao-direta",
      label: "Importação Direta",
      icon: FileImport
    },
    {
      id: "contratacao-simples", 
      label: "Contratação Simples",
      icon: FileCheck
    }
  ];

  return (
    <Card className="w-64 h-full rounded-none border-r">
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-lg mb-4 text-biodina-blue">Módulos Comerciais</h3>
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Button
              key={module.id}
              variant={activeModule === module.id ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => onModuleChange(module.id)}
            >
              <Icon className="h-4 w-4" />
              {module.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ComercialTabs;
