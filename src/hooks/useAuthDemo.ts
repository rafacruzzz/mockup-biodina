// Hook de autenticação mockada para demonstração

export interface UserProfile {
  id: string;
  email: string;
  nome: string;
  role: 'assessor' | 'gestor_assessoria' | 'admin';
}

const STORAGE_KEY = 'auth_demo_user';

export const useAuthDemo = () => {
  const getCurrentUser = (): UserProfile | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  };

  const setCurrentUser = (user: UserProfile | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const isGestor = (): boolean => {
    const user = getCurrentUser();
    return user?.role === 'gestor_assessoria' || user?.role === 'admin';
  };

  const isAssessor = (): boolean => {
    const user = getCurrentUser();
    return user?.role === 'assessor';
  };

  return {
    getCurrentUser,
    setCurrentUser,
    logout,
    isGestor,
    isAssessor
  };
};
