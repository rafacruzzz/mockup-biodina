import React, { createContext, useContext, useState, useEffect } from 'react';
import { Empresa, ModuloSistema, Filial } from '@/types/super';
import { empresasMock, filiaisMock } from '@/data/superModules';

interface EmpresaContextType {
  empresaAtual: Empresa | null;
  empresas: Empresa[];
  trocarEmpresa: (empresaId: string) => void;
  isMasterUser: boolean;
  modulosDisponiveis: ModuloSistema[];
  adicionarEmpresa: (empresa: Empresa) => void;
  atualizarEmpresa: (empresaId: string, empresa: Partial<Empresa>) => void;
  suspenderEmpresa: (empresaId: string) => void;
  ativarEmpresa: (empresaId: string) => void;
  
  // Gestão de filiais
  filiais: Filial[];
  filialAtual: Filial | null;
  adicionarFilial: (filial: Filial) => void;
  atualizarFilial: (filialId: string, filial: Partial<Filial>) => void;
  suspenderFilial: (filialId: string) => void;
  ativarFilial: (filialId: string) => void;
  trocarFilial: (filialId: string | null) => void;
  isPrincipal: boolean;
  modulosDisponiveisFilial: ModuloSistema[];
}

const EmpresaContext = createContext<EmpresaContextType | undefined>(undefined);

export const EmpresaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [empresas, setEmpresas] = useState<Empresa[]>(empresasMock);
  const [empresaAtual, setEmpresaAtual] = useState<Empresa | null>(null);
  const [filiais, setFiliais] = useState<Filial[]>(filiaisMock);
  const [filialAtual, setFilialAtual] = useState<Filial | null>(null);

  useEffect(() => {
    // Por padrão, carregar a empresa Master ao iniciar
    const empresaMaster = empresas.find(e => e.tipo === 'master');
    if (empresaMaster) {
      setEmpresaAtual(empresaMaster);
      localStorage.setItem('empresaAtualId', empresaMaster.id);
    }
  }, []);

  useEffect(() => {
    // Recuperar empresa salva no localStorage
    const empresaId = localStorage.getItem('empresaAtualId');
    if (empresaId) {
      const empresa = empresas.find(e => e.id === empresaId);
      if (empresa) {
        setEmpresaAtual(empresa);
      }
    }
  }, [empresas]);

  const trocarEmpresa = (empresaId: string) => {
    const empresa = empresas.find(e => e.id === empresaId);
    if (empresa) {
      setEmpresaAtual(empresa);
      localStorage.setItem('empresaAtualId', empresaId);
    }
  };

  const adicionarEmpresa = (empresa: Empresa) => {
    setEmpresas(prev => [...prev, empresa]);
  };

  const atualizarEmpresa = (empresaId: string, empresaAtualizada: Partial<Empresa>) => {
    setEmpresas(prev => prev.map(e => 
      e.id === empresaId ? { ...e, ...empresaAtualizada } : e
    ));
    
    // Se estiver editando a empresa atual, atualizar também
    if (empresaAtual?.id === empresaId) {
      setEmpresaAtual(prev => prev ? { ...prev, ...empresaAtualizada } : null);
    }
  };

  const suspenderEmpresa = (empresaId: string) => {
    atualizarEmpresa(empresaId, { status: 'suspensa' });
  };

  const ativarEmpresa = (empresaId: string) => {
    atualizarEmpresa(empresaId, { status: 'ativa' });
  };

  // Gestão de filiais
  const adicionarFilial = (filial: Filial) => {
    setFiliais(prev => [...prev, filial]);
  };

  const atualizarFilial = (filialId: string, filialAtualizada: Partial<Filial>) => {
    setFiliais(prev => prev.map(f => 
      f.id === filialId ? { ...f, ...filialAtualizada } : f
    ));
    
    if (filialAtual?.id === filialId) {
      setFilialAtual(prev => prev ? { ...prev, ...filialAtualizada } : null);
    }
  };

  const suspenderFilial = (filialId: string) => {
    atualizarFilial(filialId, { status: 'suspensa' });
  };

  const ativarFilial = (filialId: string) => {
    atualizarFilial(filialId, { status: 'ativa' });
  };

  const trocarFilial = (filialId: string | null) => {
    if (filialId === null) {
      // Voltar para a empresa principal
      setFilialAtual(null);
      localStorage.removeItem('filialAtualId');
    } else {
      const filial = filiais.find(f => f.id === filialId);
      if (filial) {
        setFilialAtual(filial);
        localStorage.setItem('filialAtualId', filialId);
      }
    }
  };

  // Recuperar filial salva no localStorage
  useEffect(() => {
    const filialId = localStorage.getItem('filialAtualId');
    if (filialId) {
      const filial = filiais.find(f => f.id === filialId);
      if (filial) {
        setFilialAtual(filial);
      }
    }
  }, [filiais]);

  // Filtrar filiais da empresa atual
  const filiaisEmpresaAtual = filiais.filter(f => f.empresaPrincipalId === empresaAtual?.id);

  const isMasterUser = empresaAtual?.tipo === 'master';
  const isPrincipal = !filialAtual;
  const modulosDisponiveis = empresaAtual?.modulosHabilitados || [];
  const modulosDisponiveisFilial = filialAtual?.modulosHabilitados || modulosDisponiveis;

  return (
    <EmpresaContext.Provider
      value={{
        empresaAtual,
        empresas,
        trocarEmpresa,
        isMasterUser,
        modulosDisponiveis,
        adicionarEmpresa,
        atualizarEmpresa,
        suspenderEmpresa,
        ativarEmpresa,
        filiais: filiaisEmpresaAtual,
        filialAtual,
        adicionarFilial,
        atualizarFilial,
        suspenderFilial,
        ativarFilial,
        trocarFilial,
        isPrincipal,
        modulosDisponiveisFilial
      }}
    >
      {children}
    </EmpresaContext.Provider>
  );
};

export const useEmpresa = () => {
  const context = useContext(EmpresaContext);
  if (context === undefined) {
    throw new Error('useEmpresa must be used within an EmpresaProvider');
  }
  return context;
};
