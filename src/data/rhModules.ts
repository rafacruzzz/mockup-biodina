
import { 
  Users, 
  Calendar, 
  Building2, 
  TrendingUp,
  Clock
} from 'lucide-react';

export const rhModules = [
  {
    id: 'processo-seletivo',
    name: 'Processo Seletivo',
    description: 'Gerencie todo o processo de recrutamento e seleção',
    icon: Users,
    color: 'text-blue-600',
    href: '/rh/processo-seletivo'
  },
  {
    id: 'departamentos',
    name: 'Departamentos',
    description: 'Configure e gerencie os departamentos da empresa',
    icon: Building2,
    color: 'text-green-600', 
    href: '/rh/departamentos',
    // Compatibility properties for existing code
    departamentos: []
  },
  {
    id: 'expedientes',
    name: 'Expedientes',
    description: 'Controle de horários e jornadas de trabalho',
    icon: Clock,
    color: 'text-purple-600',
    href: '/rh/expedientes'
  },
  {
    id: 'niveis-progressao',
    name: 'Níveis e Progressão',
    description: 'Defina níveis hierárquicos e planos de carreira',
    icon: TrendingUp,
    color: 'text-orange-600',
    href: '/rh/niveis-progressao',
    // Compatibility properties for existing code
    planosCarreira: []
  }
];
