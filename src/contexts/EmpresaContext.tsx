import React, { createContext, useContext, useState, useEffect } from 'react';
import { Empresa, ModuloSistema } from '@/types/super';
import { empresasMock } from '@/data/superModules';

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
}

const EmpresaContext = createContext<EmpresaContextType | undefined>(undefined);

export const EmpresaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [empresas, setEmpresas] = useState<Empresa[]>(empresasMock);
  const [empresaAtual, setEmpresaAtual] = useState<Empresa | null>(null);

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

  const isMasterUser = empresaAtual?.tipo === 'master';
  const modulosDisponiveis = empresaAtual?.modulosHabilitados || [];

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
        ativarEmpresa
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
