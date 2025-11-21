import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ColaboradorData } from '@/types/colaborador';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  profilePicture?: string;
  role: string;
  empresaId?: string;
  colaboradorId?: string;
  fotoPerfil?: File;
  colaboradorData?: ColaboradorData;
}

interface UserContextType {
  user: User | null;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  
  // Carregar usuário do localStorage ou usar null como padrão
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        return null;
      }
    }
    return null;
  });

  const updateUser = (userData: Partial<User>) => {
    const updatedUser = user ? { ...user, ...userData } : (userData as User);
    setUser(updatedUser);
    
    // Salvar no localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('empresaAtualId');
    navigate('/login');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema.",
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;