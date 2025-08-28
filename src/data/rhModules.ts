
import { Users, Calendar, Building2, BarChart3, FileUser, UserCheck } from "lucide-react";

export const rhModules = [
  {
    id: 'processo-seletivo',
    name: 'Processo Seletivo',
    description: 'Gerenciar vagas, candidatos e processos de seleção',
    icon: UserCheck,
    color: 'bg-blue-100 text-blue-600',
    href: '/rh/processo-seletivo'
  },
  {
    id: 'departamentos',
    name: 'Departamentos',
    description: 'Estrutura organizacional e departamentos',
    icon: Building2,
    color: 'bg-purple-100 text-purple-600',
    href: '/rh/departamentos'
  },
  {
    id: 'expedientes',
    name: 'Expedientes',
    description: 'Horários de trabalho e escalas',
    icon: Calendar,
    color: 'bg-green-100 text-green-600',
    href: '/rh/expedientes'
  },
  {
    id: 'planos-carreira',
    name: 'Planos de Carreira',
    description: 'Níveis, cargos e progressão profissional',
    icon: BarChart3,
    color: 'bg-yellow-100 text-yellow-600',
    href: '/rh/planos-carreira'
  }
];
