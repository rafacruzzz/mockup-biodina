
import { useState, useCallback } from 'react';
import { colaboradores as colaboradoresData } from '@/data/rhModules';

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

export const useColaboradores = () => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>(colaboradoresData || []);

  const adicionarColaborador = useCallback((novoColaborador: Omit<Colaborador, 'id'>) => {
    const colaborador: Colaborador = {
      ...novoColaborador,
      id: Date.now().toString()
    };
    setColaboradores(prev => [...prev, colaborador]);
    return colaborador;
  }, []);

  return {
    colaboradores,
    adicionarColaborador
  };
};
