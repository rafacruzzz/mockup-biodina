
import { useState, useCallback } from 'react';

export interface Colaborador {
  id: string;
  nome: string;
  cargo: string;
  departamento: string;
  email: string;
  telefone: string;
  dataAdmissao: string;
  status: 'Novo' | 'Ativo' | 'Inativo' | 'Desligado';
  documentos?: any[];
}

// Initialize with empty array since we'll be adding colaboradores dynamically
const initialColaboradores: Colaborador[] = [];

export const useColaboradores = () => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>(initialColaboradores);

  const adicionarColaborador = useCallback((novoColaborador: Omit<Colaborador, 'id'>) => {
    const colaborador: Colaborador = {
      ...novoColaborador,
      id: Date.now().toString()
    };
    setColaboradores(prev => [...prev, colaborador]);
    return colaborador;
  }, []);

  const desligarColaborador = useCallback((id: string) => {
    setColaboradores(prev => 
      prev.map(colaborador => 
        colaborador.id === id 
          ? { ...colaborador, status: 'Desligado' as const }
          : colaborador
      )
    );
  }, []);

  return {
    colaboradores,
    adicionarColaborador,
    desligarColaborador
  };
};
