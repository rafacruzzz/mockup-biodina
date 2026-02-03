import { useMemo } from 'react';
import { ModuloSistema, Empresa, Filial } from '@/types/super';
import { EmpresaVinculada, ModuloUsuario } from '@/types/permissions';

interface UseModulosUsuarioProps {
  empresaPrincipal: Empresa | null;
  empresasVinculadas: EmpresaVinculada[];
  filiais: Filial[];
  empresaAtualId?: string; // ID da empresa atualmente selecionada no contexto
}

export const useModulosUsuario = ({
  empresaPrincipal,
  empresasVinculadas,
  filiais,
  empresaAtualId,
}: UseModulosUsuarioProps) => {
  // Retorna os módulos disponíveis (limite da empresa/filial)
  const modulosDisponiveis = useMemo(() => {
    // Guard: se não tem empresa principal, retorna array vazio
    if (!empresaPrincipal) {
      return [];
    }

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

  // Retorna os módulos do usuário para a empresa atualmente selecionada
  // Este hook agora sempre é chamado, independente das condições
  const modulosUsuarioAtual = useMemo((): ModuloUsuario[] => {
    if (!empresaAtualId || empresasVinculadas.length === 0) {
      return [];
    }

    const empresaAtiva = empresasVinculadas.find(e => e.id === empresaAtualId);
    return empresaAtiva?.moduleAccess || [];
  }, [empresaAtualId, empresasVinculadas]);

  // Funções helper - não são hooks, podem ter condições
  const verificarModuloDisponivel = (modulo: ModuloSistema): {
    disponivel: boolean;
    empresasComModulo: string[];
    empresasSemModulo: string[];
  } => {
    const empresasComModulo: string[] = [];
    const empresasSemModulo: string[] = [];

    if (!empresaPrincipal) {
      return {
        disponivel: false,
        empresasComModulo: [],
        empresasSemModulo: [],
      };
    }

    if (empresaPrincipal.modulosHabilitados.includes(modulo)) {
      empresasComModulo.push(empresaPrincipal.nome);
    } else {
      empresasSemModulo.push(empresaPrincipal.nome);
    }

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

  const verificarAcessoModulo = (moduloKey: string): boolean => {
    const modulo = modulosUsuarioAtual.find(m => m.key === moduloKey);
    return (modulo?.habilitado && modulo?.subModulos?.some(s => s.habilitado)) || false;
  };

  const verificarAcessoSubModulo = (moduloKey: string, subModuloKey: string): {
    habilitado: boolean;
    permissions: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  } => {
    const modulo = modulosUsuarioAtual.find(m => m.key === moduloKey);
    if (!modulo?.habilitado) {
      return { habilitado: false, permissions: { view: false, create: false, edit: false, delete: false } };
    }

    const subModulo = modulo.subModulos.find(s => s.key === subModuloKey);
    if (!subModulo?.habilitado) {
      return { habilitado: false, permissions: { view: false, create: false, edit: false, delete: false } };
    }

    return {
      habilitado: true,
      permissions: subModulo.permissions
    };
  };

  return {
    modulosDisponiveis,
    modulosUsuarioAtual,
    verificarModuloDisponivel,
    verificarAcessoModulo,
    verificarAcessoSubModulo,
  };
};
