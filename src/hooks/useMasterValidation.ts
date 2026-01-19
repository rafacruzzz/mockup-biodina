import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface MasterValidationResult {
  isValidating: boolean;
  attemptsRemaining: number;
  isBlocked: boolean;
  validateMasterPassword: (password: string) => Promise<boolean>;
  canAlterCNPJ: (userId: string) => boolean;
  resetAttempts: () => void;
}

// Senha master mock para desenvolvimento
const MASTER_PASSWORD_HASH = 'master123';
const MAX_ATTEMPTS = 3;

export const useMasterValidation = (): MasterValidationResult => {
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState(MAX_ATTEMPTS);
  const [isBlocked, setIsBlocked] = useState(false);

  const validateMasterPassword = useCallback(async (password: string): Promise<boolean> => {
    if (isBlocked) {
      toast({
        title: "Acesso bloqueado",
        description: "Número máximo de tentativas excedido. Tente novamente mais tarde.",
        variant: "destructive"
      });
      return false;
    }

    setIsValidating(true);
    
    // Simula uma validação async (em produção seria uma chamada à API)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const isValid = password === MASTER_PASSWORD_HASH;
    
    if (!isValid) {
      const newAttempts = attemptsRemaining - 1;
      setAttemptsRemaining(newAttempts);
      
      if (newAttempts <= 0) {
        setIsBlocked(true);
        toast({
          title: "Acesso bloqueado",
          description: "Número máximo de tentativas excedido.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Senha incorreta",
          description: `Tentativas restantes: ${newAttempts}`,
          variant: "destructive"
        });
      }
    }
    
    setIsValidating(false);
    return isValid;
  }, [attemptsRemaining, isBlocked, toast]);

  const canAlterCNPJ = useCallback((userId: string): boolean => {
    // Lista de usuários masters que podem alterar CNPJ
    // Em produção, isso viria do banco de dados ou contexto de autenticação
    const masterUsers = ['master-user-001', 'admin-001'];
    return masterUsers.includes(userId);
  }, []);

  const resetAttempts = useCallback(() => {
    setAttemptsRemaining(MAX_ATTEMPTS);
    setIsBlocked(false);
  }, []);

  return {
    isValidating,
    attemptsRemaining,
    isBlocked,
    validateMasterPassword,
    canAlterCNPJ,
    resetAttempts
  };
};
