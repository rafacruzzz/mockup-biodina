
import React, { createContext, useContext, useState, useCallback } from 'react';
import { ColaboradorData } from '@/types/colaborador';
import { colaboradores as colaboradoresData } from '@/data/rhModules';

interface ColaboradorContextType {
  colaboradores: (ColaboradorData & { id: string; status: 'ativo' | 'inativo' | 'novo' })[];
  loading: boolean;
  
  adicionarColaborador: (colaborador: ColaboradorData) => string;
  atualizarColaborador: (id: string, colaborador: Partial<ColaboradorData>) => void;
  buscarColaborador: (id: string) => (ColaboradorData & { id: string; status: 'ativo' | 'inativo' | 'novo' }) | null;
  buscarColaboradores: (filtros: any) => (ColaboradorData & { id: string; status: 'ativo' | 'inativo' | 'novo' })[];
}

const ColaboradorContext = createContext<ColaboradorContextType | null>(null);

export const ColaboradorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colaboradores, setColaboradores] = useState<(ColaboradorData & { id: string; status: 'ativo' | 'inativo' | 'novo' })[]>(
    colaboradoresData.map(col => ({
      ...col,
      status: 'ativo' as const
    }))
  );
  const [loading, setLoading] = useState(false);

  const adicionarColaborador = useCallback((novoColaborador: ColaboradorData): string => {
    const id = Date.now().toString();
    const colaboradorCompleto = {
      ...novoColaborador,
      id,
      status: 'novo' as const
    };
    
    setColaboradores(prev => [...prev, colaboradorCompleto]);
    return id;
  }, []);

  const atualizarColaborador = useCallback((id: string, dadosAtualizados: Partial<ColaboradorData>) => {
    setColaboradores(prev => 
      prev.map(colaborador => 
        colaborador.id === id ? { ...colaborador, ...dadosAtualizados } : colaborador
      )
    );
  }, []);

  const buscarColaborador = useCallback((id: string) => {
    return colaboradores.find(col => col.id === id) || null;
  }, [colaboradores]);

  const buscarColaboradores = useCallback((filtros: any) => {
    return colaboradores.filter(colaborador => {
      if (filtros.departamento && colaborador.dadosProfissionais.setor !== filtros.departamento) return false;
      if (filtros.status && colaborador.status !== filtros.status) return false;
      if (filtros.busca) {
        const busca = filtros.busca.toLowerCase();
        return (
          colaborador.dadosPessoais.nome.toLowerCase().includes(busca) ||
          colaborador.dadosPessoais.email.toLowerCase().includes(busca) ||
          colaborador.dadosProfissionais.cargo.toLowerCase().includes(busca)
        );
      }
      return true;
    });
  }, [colaboradores]);

  const contextValue: ColaboradorContextType = {
    colaboradores,
    loading,
    adicionarColaborador,
    atualizarColaborador,
    buscarColaborador,
    buscarColaboradores
  };

  return (
    <ColaboradorContext.Provider value={contextValue}>
      {children}
    </ColaboradorContext.Provider>
  );
};

export const useColaborador = () => {
  const context = useContext(ColaboradorContext);
  if (!context) {
    throw new Error('useColaborador must be used within a ColaboradorProvider');
  }
  return context;
};
