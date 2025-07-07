
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, User, Eye, Crown } from "lucide-react";
import { ModuleAccess } from "@/types/permissions";

interface AccessProfileSelectorProps {
  onProfileSelect: (modules: ModuleAccess[]) => void;
}

const AccessProfileSelector = ({ onProfileSelect }: AccessProfileSelectorProps) => {
  const profiles = [
    {
      id: 'admin',
      name: 'Administrador',
      description: 'Acesso completo a todos os módulos',
      icon: <Crown className="h-4 w-4" />,
      color: 'text-red-600'
    },
    {
      id: 'manager',
      name: 'Gerente',
      description: 'Acesso de gestão aos principais módulos',
      icon: <Shield className="h-4 w-4" />,
      color: 'text-blue-600'
    },
    {
      id: 'seller',
      name: 'Vendedor',
      description: 'Acesso aos módulos comerciais e cadastros básicos',
      icon: <User className="h-4 w-4" />,
      color: 'text-green-600'
    },
    {
      id: 'operator',
      name: 'Operador',
      description: 'Acesso aos módulos operacionais',
      icon: <User className="h-4 w-4" />,
      color: 'text-orange-600'
    },
    {
      id: 'viewer',
      name: 'Visualizador',
      description: 'Apenas visualização dos dados',
      icon: <Eye className="h-4 w-4" />,
      color: 'text-gray-600'
    }
  ];

  const getDefaultModulesForProfile = (profileId: string): ModuleAccess[] => {
    const baseModules: ModuleAccess[] = [
      {
        key: 'cadastro',
        name: 'Cadastro',
        icon: 'Users',
        enabled: false,
        subModules: [
          { key: 'entidades', name: 'Entidades', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
          { key: 'produtos', name: 'Produtos', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
          { key: 'servicos', name: 'Serviços', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
          { key: 'usuarios', name: 'Usuários', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
        ]
      },
      {
        key: 'comercial',
        name: 'Comercial',
        icon: 'ShoppingCart',
        enabled: false,
        subModules: [
          { key: 'oportunidades', name: 'Oportunidades', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
          { key: 'pedidos', name: 'Pedidos', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
          { key: 'propostas', name: 'Propostas', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
        ]
      },
      {
        key: 'estoque',
        name: 'Estoque',
        icon: 'Package',
        enabled: false,
        subModules: [
          { key: 'posicao', name: 'Posição de Estoque', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
          { key: 'movimentacoes', name: 'Movimentações', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
        ]
      }
    ];

    switch (profileId) {
      case 'admin':
        return baseModules.map(module => ({
          ...module,
          enabled: true,
          subModules: module.subModules.map(sub => ({
            ...sub,
            permissions: { view: true, create: true, edit: true, delete: true, admin: true }
          }))
        }));
      
      case 'manager':
        return baseModules.map(module => ({
          ...module,
          enabled: true,
          subModules: module.subModules.map(sub => ({
            ...sub,
            permissions: { view: true, create: true, edit: true, delete: false, admin: false }
          }))
        }));
      
      case 'seller':
        return baseModules.map(module => {
          if (module.key === 'comercial' || module.key === 'cadastro') {
            return {
              ...module,
              enabled: true,
              subModules: module.subModules.map(sub => ({
                ...sub,
                permissions: { view: true, create: true, edit: true, delete: false, admin: false }
              }))
            };
          }
          return module;
        });
      
      case 'operator':
        return baseModules.map(module => {
          if (module.key === 'estoque') {
            return {
              ...module,
              enabled: true,
              subModules: module.subModules.map(sub => ({
                ...sub,
                permissions: { view: true, create: true, edit: true, delete: false, admin: false }
              }))
            };
          }
          return module;
        });
      
      case 'viewer':
        return baseModules.map(module => ({
          ...module,
          enabled: true,
          subModules: module.subModules.map(sub => ({
            ...sub,
            permissions: { view: true, create: false, edit: false, delete: false, admin: false }
          }))
        }));
      
      default:
        return baseModules;
    }
  };

  const handleProfileSelect = (profileId: string) => {
    const modules = getDefaultModulesForProfile(profileId);
    onProfileSelect(modules);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Aplicar Perfil Pré-definido</Label>
        <p className="text-sm text-gray-600 mb-2">
          Selecione um perfil para aplicar permissões padrão rapidamente
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {profiles.map((profile) => (
          <Button
            key={profile.id}
            variant="outline"
            className="h-auto p-4 flex flex-col items-start space-y-2"
            onClick={() => handleProfileSelect(profile.id)}
          >
            <div className={`flex items-center space-x-2 ${profile.color}`}>
              {profile.icon}
              <span className="font-medium">{profile.name}</span>
            </div>
            <p className="text-xs text-gray-600 text-left">
              {profile.description}
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AccessProfileSelector;
