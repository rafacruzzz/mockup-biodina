
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

// Initialize with example colaboradores
const initialColaboradores: Colaborador[] = [
  {
    id: '1',
    nome: 'Maria Silva Santos',
    cargo: 'Analista de Sistemas',
    departamento: 'Tecnologia da Informação',
    email: 'maria.santos@biodina.com.br',
    telefone: '(11) 98765-4321',
    dataAdmissao: '2023-01-15',
    status: 'Ativo'
  },
  {
    id: '2',
    nome: 'João Pedro Oliveira',
    cargo: 'Coordenador Comercial',
    departamento: 'Comercial',
    email: 'joao.oliveira@biodina.com.br',
    telefone: '(11) 97654-3210',
    dataAdmissao: '2022-08-20',
    status: 'Ativo'
  },
  {
    id: '3',
    nome: 'Ana Carolina Ferreira',
    cargo: 'Assistente de RH',
    departamento: 'Recursos Humanos',
    email: 'ana.ferreira@biodina.com.br',
    telefone: '(11) 96543-2109',
    dataAdmissao: '2023-03-10',
    status: 'Ativo'
  },
  {
    id: '4',
    nome: 'Carlos Eduardo Lima',
    cargo: 'Operador de Estoque',
    departamento: 'Logística',
    email: 'carlos.lima@biodina.com.br',
    telefone: '(11) 95432-1098',
    dataAdmissao: '2023-06-05',
    status: 'Novo'
  }
];

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
