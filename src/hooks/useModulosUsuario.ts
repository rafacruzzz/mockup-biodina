import { useMemo } from 'react';
import { ModuloSistema, Empresa, Filial } from '@/types/super';
import { EmpresaVinculada } from '@/types/permissions';

interface UseModulosUsuarioProps {
  empresaPrincipal: Empresa;
  empresasVinculadas: EmpresaVinculada[];
  filiais: Filial[];
}

export const useModulosUsuario = ({
  empresaPrincipal,
  empresasVinculadas,
  filiais,
}: UseModulosUsuarioProps) => {
  const modulosDisponiveis = useMemo(() => {
    // Se não tem empresas vinculadas, retorna módulos da principal
    if (empresasVinculadas.length === 0) {
      return empresaPrincipal.modulosHabilitados;
    }

    // Começa com os módulos da empresa principal
    const modulosSet = new Set<ModuloSistema>(empresaPrincipal.modulosHabilitados);

    // Para cada filial vinculada, verifica quais módulos ela tem
    const filiaisVinculadas = empresasVinculadas.filter(e => e.tipo === 'filial');
    
    filiaisVinculadas.forEach(empresaVinculada => {
      const filial = filiais.find(f => f.id === empresaVinculada.id);
      if (filial) {
        // Adiciona os módulos da filial ao conjunto
        filial.modulosHabilitados.forEach(m => modulosSet.add(m));
      }
    });

    return Array.from(modulosSet);
  }, [empresaPrincipal, empresasVinculadas, filiais]);

  const verificarModuloDisponivel = (modulo: ModuloSistema): {
    disponivel: boolean;
    empresasComModulo: string[];
    empresasSemModulo: string[];
  } => {
    const empresasComModulo: string[] = [];
    const empresasSemModulo: string[] = [];

    // Verifica empresa principal
    if (empresaPrincipal.modulosHabilitados.includes(modulo)) {
      empresasComModulo.push(empresaPrincipal.nome);
    } else {
      empresasSemModulo.push(empresaPrincipal.nome);
    }

    // Verifica filiais vinculadas
    const filiaisVinculadas = empresasVinculadas.filter(e => e.tipo === 'filial');
    
    filiaisVinculadas.forEach(empresaVinculada => {
      const filial = filiais.find(f => f.id === empresaVinculada.id);
      if (filial) {
        if (filial.modulosHabilitados.includes(modulo)) {
          empresasComModulo.push(filial.nome);
        } else {
          empresasSemModulo.push(filial.nome);
        }
      }
    });

    return {
      disponivel: empresasComModulo.length > 0,
      empresasComModulo,
      empresasSemModulo,
    };
  };

  return {
    modulosDisponiveis,
    verificarModuloDisponivel,
  };
};
