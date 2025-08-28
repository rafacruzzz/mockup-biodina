
import { Users, Shield, Settings } from "lucide-react";

export const cadastroModules = [
  {
    id: 'usuarios',
    name: 'Usuários',
    description: 'Gerencie todos os usuários do sistema',
    icon: Users,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'permissoes',
    name: 'Permissões',
    description: 'Configure perfis e permissões de acesso',
    icon: Shield,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'configuracoes',
    name: 'Configurações',
    description: 'Configurações gerais do sistema',
    icon: Settings,
    color: 'bg-purple-100 text-purple-600'
  }
];
