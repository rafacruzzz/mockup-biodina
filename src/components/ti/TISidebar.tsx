import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Headphones, 
  HardDrive, 
  Network, 
  FileText, 
  Shield, 
  CheckSquare, 
  Users, 
  Settings, 
  Database 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tiMenuItems = [
  { name: 'Dashboard', path: '/ti', icon: BarChart3 },
  { name: 'Gestão de Chamados', path: '/ti/chamados', icon: Headphones },
  { name: 'Inventário de Ativos', path: '/ti/inventario', icon: HardDrive },
  { name: 'Mapeamento da Rede', path: '/ti/rede', icon: Network },
  { name: 'Políticas e Procedimentos', path: '/ti/politicas', icon: FileText },
  { name: 'Segurança', path: '/ti/seguranca', icon: Shield },
  { name: 'Conformidade', path: '/ti/conformidade', icon: CheckSquare },
  { name: 'Gestão de Usuários', path: '/ti/usuarios', icon: Users },
  { name: 'Configurações', path: '/ti/configuracoes', icon: Settings },
  { name: 'Backup e Recuperação', path: '/ti/backup', icon: Database }
];

interface TISidebarProps {
  className?: string;
}

const TISidebar: React.FC<TISidebarProps> = ({ className }) => {
  const location = useLocation();

  return (
    <aside className={cn("w-64 bg-card border-r border-border h-full", className)}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Módulo TI</h2>
        <nav className="space-y-2">
          {tiMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default TISidebar;