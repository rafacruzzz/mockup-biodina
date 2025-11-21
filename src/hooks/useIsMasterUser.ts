import { useUser } from '@/contexts/UserContext';
import { useEmpresa } from '@/contexts/EmpresaContext';

export const useIsMasterUser = () => {
  const { user } = useUser();
  const { empresaAtual } = useEmpresa();
  
  // Usuário é master se o ID dele corresponde ao usuarioMaster da empresa
  const isMaster = user?.id === empresaAtual?.usuarioMaster?.id;
  
  console.log('🔍 DEBUG useIsMasterUser:', {
    userId: user?.id,
    userName: user?.name,
    userEmail: user?.email,
    empresaId: empresaAtual?.id,
    empresaNome: empresaAtual?.nome,
    masterUserId: empresaAtual?.usuarioMaster?.id,
    masterUserName: empresaAtual?.usuarioMaster?.nome,
    planoId: empresaAtual?.planoId,
    isMaster,
    comparison: `${user?.id} === ${empresaAtual?.usuarioMaster?.id}`
  });
  
  return {
    isMaster,
    empresaAtual,
    planoId: empresaAtual?.planoId,
  };
};
