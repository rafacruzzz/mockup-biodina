
import React from 'react';
import { Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/contexts/UserContext';

const UserProfileMenu = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) return null;

  const handleEditProfile = () => {
    navigate('/editar-perfil');
  };

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.fotoPerfil} alt={user.nome} />
            <AvatarFallback className="bg-biodina-blue text-white">
              {getInitials(user.nome)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.fotoPerfil} alt={user.nome} />
              <AvatarFallback className="bg-biodina-blue text-white">
                {getInitials(user.nome)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">{user.nome}</h3>
              <p className="text-xs text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500">{user.nomeUsuario}</p>
            </div>
          </div>
          
          <Separator className="my-3" />
          
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-10 px-3"
              onClick={handleEditProfile}
            >
              <Settings className="mr-3 h-4 w-4" />
              Alterar meus Dados
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sair do ERP
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfileMenu;
