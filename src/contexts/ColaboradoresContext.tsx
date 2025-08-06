
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Colaborador {
  id: string;
  nome: string;
  cargo: string;
  departamento: string;
  email: string;
  telefone: string;
  dataAdmissao: string;
  status: 'Novo' | 'Ativo' | 'Inativo';
  documentos?: any[];
}

interface ColaboradoresContextType {
  colaboradores: Colaborador[];
  adicionarColaborador: (colaborador: Omit<Colaborador, 'id'>) => Colaborador;
  atualizarColaborador: (id: string, dados: Partial<Colaborador>) => void;
  obterColaborador: (id: string) => Colaborador | undefined;
}

const ColaboradoresContext = createContext<ColaboradoresContextType | null>(null);

export const ColaboradoresProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  const adicionarColaborador = useCallback((novoColaborador: Omit<Colaborador, 'id'>) => {
    const colaborador: Colaborador = {
      ...novoColaborador,
      id: Date.now().toString()
    };
    
    setColaboradores(prev => [...prev, colaborador]);
    console.log('Colaborador adicionado ao contexto:', colaborador);
    
    return colaborador;
  }, []);

  const atualizarColaborador = useCallback((id: string, dados: Partial<Colaborador>) => {
    setColaboradores(prev => 
      prev.map(colaborador => 
        colaborador.id === id ? { ...colaborador, ...dados } : colaborador
      )
    );
  }, []);

  const obterColaborador = useCallback((id: string) => {
    return colaboradores.find(c => c.id === id);
  }, [colaboradores]);

  const contextValue: ColaboradoresContextType = {
    colaboradores,
    adicionarColaborador,
    atualizarColaborador,
    obterColaborador
  };

  return (
    <ColaboradoresContext.Provider value={contextValue}>
      {children}
    </ColaboradoresContext.Provider>
  );
};

export const useColaboradores = () => {
  const context = useContext(ColaboradoresContext);
  if (!context) {
    throw new Error('useColaboradores must be used within a ColaboradoresProvider');
  }
  return context;
};
