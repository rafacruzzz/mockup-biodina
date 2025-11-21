import { useUser } from '@/contexts/UserContext';
import { useEmpresa } from '@/contexts/EmpresaContext';

export const useIsMasterUser = () => {
  const { user } = useUser();
  const { empresaAtual } = useEmpresa();
  
  // Usuário é master se o ID dele corresponde ao usuarioMaster da empresa
  const isMaster = user?.id === empresaAtual?.usuarioMaster?.id;
  
  return {
    isMaster,
    empresaAtual,
    planoId: empresaAtual?.planoId,
  };
};
