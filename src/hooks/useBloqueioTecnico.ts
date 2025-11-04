import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { OSPendenteBaixaFiscal } from "@/types/assessoria-cientifica";

export const useBloqueioTecnico = (usuarioId: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [osPendentes, setOsPendentes] = useState<OSPendenteBaixaFiscal[]>([]);
  const [isBloqueado, setIsBloqueado] = useState(false);

  useEffect(() => {
    const verificarBloqueio = async () => {
      // Simular busca de OSs pendentes de baixa fiscal
      // Em produção, isso seria uma chamada à API
      const mockOsPendentes: OSPendenteBaixaFiscal[] = [
        // Descomente para testar o bloqueio
        // {
        //   osId: "OS001",
        //   numeroOS: "OS-2025-001",
        //   tecnicoId: usuarioId,
        //   nomeTecnico: "João Silva",
        //   dataRemessa: new Date(Date.now() - 26 * 60 * 60 * 1000), // 26 horas atrás
        //   prazoLimite: new Date(Date.now() - 2 * 60 * 60 * 1000),
        //   horasVencidas: 2,
        //   statusBloqueio: "Bloqueado"
        // }
      ];

      setOsPendentes(mockOsPendentes);
      setIsBloqueado(mockOsPendentes.length > 0);

      // Se houver OSs pendentes e não estiver na página de apontamento, redirecionar
      if (mockOsPendentes.length > 0 && 
          location.pathname !== '/os/apontamento' &&
          !location.pathname.includes('/os/apontamento/')) {
        toast.error(`Você possui ${mockOsPendentes.length} OS(s) pendente(s) de baixa fiscal!`, {
          duration: 5000,
        });
        
        // Redirecionar para o apontamento da primeira OS pendente
        setTimeout(() => {
          navigate(`/comercial/assessoria-cientifica?osApontamento=${mockOsPendentes[0].osId}`);
        }, 2000);
      }
    };

    verificarBloqueio();
  }, [location, navigate, usuarioId]);

  return { osPendentes, isBloqueado };
};
