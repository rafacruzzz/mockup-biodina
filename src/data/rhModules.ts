
import { Users, Calendar, Building2, TrendingUp } from "lucide-react";

export const rhModules = [
  {
    id: 'processo-seletivo',
    name: 'Processo Seletivo',
    description: 'Gerencie processos seletivos e candidatos',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
    href: '/rh'
  },
  {
    id: 'departamentos',
    name: 'Departamentos',
    description: 'Organize a estrutura departamental',
    icon: Building2,
    color: 'bg-green-100 text-green-600',
    href: '/rh',
    departamentos: [] // Add empty array for compatibility
  },
  {
    id: 'expedientes',
    name: 'Expedientes',
    description: 'Configure horários e expedientes',
    icon: Calendar,
    color: 'bg-purple-100 text-purple-600',
    href: '/rh'
  },
  {
    id: 'planos-carreira',
    name: 'Planos de Carreira',
    description: 'Defina progressões e níveis',
    icon: TrendingUp,
    color: 'bg-orange-100 text-orange-600',
    href: '/rh',
    planosCarreira: [] // Add empty array for compatibility
  }
];
