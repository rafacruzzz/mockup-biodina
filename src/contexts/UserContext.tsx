
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  nome: string;
  email: string;
  nomeUsuario: string;
  fotoPerfil?: string;
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

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  
  // Dados mockados do usuário logado
  const [user, setUser] = useState<User>({
    id: '1',
    nome: 'Danilo Silva',
    email: 'danilo@tecnologiadc.com.br',
    nomeUsuario: 'GERENCIADOR',
    fotoPerfil: undefined
  });

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  const logout = () => {
    setUser(null);
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
