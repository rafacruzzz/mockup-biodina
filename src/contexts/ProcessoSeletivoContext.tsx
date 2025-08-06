import React, { createContext, useContext, useState, useCallback } from 'react';
import { Curriculo, ProcessoSeletivo, CandidatoProcesso } from '@/types/processoSeletivo';
import { curriculos as curriculosData, processosSeletivos as processosData } from '@/data/processoSeletivo';

interface CandidatoAdmissao {
  candidatoId: string;
  statusAdmissao: 'documentos-pendentes' | 'documentos-completos' | 'aguardando-assinatura' | 'admitido';
}

interface ProcessoSeletivoContextType {
  curriculos: Curriculo[];
  processosSeletivos: ProcessoSeletivo[];
  candidatosAdmissao: CandidatoAdmissao[];
  loading: boolean;
  
  // Funções para currículos
  adicionarCurriculo: (curriculo: Omit<Curriculo, 'id'>) => void;
  atualizarCurriculo: (id: string, curriculo: Partial<Curriculo>) => void;
  buscarCurriculos: (filtros: any) => Curriculo[];
  
  // Funções para processos seletivos
  criarProcessoSeletivo: (processo: Omit<ProcessoSeletivo, 'id'>) => void;
  atualizarProcessoSeletivo: (id: string, processo: Partial<ProcessoSeletivo>) => void;
  
  // Funções para candidatos
  adicionarCandidatoProcesso: (candidato: Omit<CandidatoProcesso, 'id'>) => void;
  moverCandidatoEtapa: (candidatoId: string, novaEtapa: string) => void;
  atualizarStatusCandidato: (candidatoId: string, status: CandidatoProcesso['status']) => void;
  
  // Função para admissão
  atualizarStatusAdmissao: (candidatoId: string, status: string) => void;
  obterStatusAdmissao: (candidatoId: string) => string;
}

const ProcessoSeletivoContext = createContext<ProcessoSeletivoContextType | null>(null);

// Função para obter candidatos aprovados e criar status iniciais variados
const criarStatusIniciais = () => {
  const candidatosAprovados: string[] = [];
  
  processosData.forEach(processo => {
    processo.candidatos.forEach(candidato => {
      if (candidato.status === 'aprovado') {
        candidatosAprovados.push(candidato.id);
      }
    });
  });

  const statusOptions: CandidatoAdmissao['statusAdmissao'][] = [
    'documentos-pendentes',
    'documentos-completos', 
    'aguardando-assinatura',
    'admitido'
  ];

  return candidatosAprovados.map((candidatoId, index) => ({
    candidatoId,
    statusAdmissao: statusOptions[index % statusOptions.length]
  }));
};

export const ProcessoSeletivoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [curriculos, setCurriculos] = useState<Curriculo[]>(curriculosData);
  const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivo[]>(processosData);
  const [candidatosAdmissao, setCandidatosAdmissao] = useState<CandidatoAdmissao[]>(criarStatusIniciais());
  const [loading, setLoading] = useState(false);

  const adicionarCurriculo = useCallback((novoCurriculo: Omit<Curriculo, 'id'>) => {
    const curriculo: Curriculo = {
      ...novoCurriculo,
      id: Date.now().toString()
    };
    setCurriculos(prev => [...prev, curriculo]);
  }, []);

  const atualizarCurriculo = useCallback((id: string, dadosAtualizados: Partial<Curriculo>) => {
    setCurriculos(prev => 
      prev.map(curriculo => 
        curriculo.id === id ? { ...curriculo, ...dadosAtualizados } : curriculo
      )
    );
  }, []);

  const buscarCurriculos = useCallback((filtros: any) => {
    return curriculos.filter(curriculo => {
      if (filtros.departamento && curriculo.departamento !== filtros.departamento) return false;
      if (filtros.status && curriculo.status !== filtros.status) return false;
      if (filtros.busca) {
        const busca = filtros.busca.toLowerCase();
        return (
          curriculo.nome.toLowerCase().includes(busca) ||
          curriculo.email.toLowerCase().includes(busca) ||
          curriculo.cargoDesejado.toLowerCase().includes(busca) ||
          curriculo.habilidades.some(h => h.toLowerCase().includes(busca))
        );
      }
      return true;
    });
  }, [curriculos]);

  const criarProcessoSeletivo = useCallback((novoProcesso: Omit<ProcessoSeletivo, 'id'>) => {
    const processo: ProcessoSeletivo = {
      ...novoProcesso,
      id: Date.now().toString()
    };
    setProcessosSeletivos(prev => [...prev, processo]);
  }, []);

  const atualizarProcessoSeletivo = useCallback((id: string, dadosAtualizados: Partial<ProcessoSeletivo>) => {
    setProcessosSeletivos(prev =>
      prev.map(processo =>
        processo.id === id ? { ...processo, ...dadosAtualizados } : processo
      )
    );
  }, []);

  const adicionarCandidatoProcesso = useCallback((novoCandidato: Omit<CandidatoProcesso, 'id'>) => {
    const candidato: CandidatoProcesso = {
      ...novoCandidato,
      id: Date.now().toString()
    };

    setProcessosSeletivos(prev =>
      prev.map(processo =>
        processo.id === novoCandidato.processoSeletivoId
          ? { ...processo, candidatos: [...processo.candidatos, candidato] }
          : processo
      )
    );
  }, []);

  const moverCandidatoEtapa = useCallback((candidatoId: string, novaEtapa: string) => {
    setProcessosSeletivos(prev =>
      prev.map(processo => ({
        ...processo,
        candidatos: processo.candidatos.map(candidato =>
          candidato.id === candidatoId
            ? { ...candidato, etapaAtual: novaEtapa, dataUltimaAtualizacao: new Date().toISOString() }
            : candidato
        )
      }))
    );
  }, []);

  const atualizarStatusCandidato = useCallback((candidatoId: string, status: CandidatoProcesso['status']) => {
    setProcessosSeletivos(prev =>
      prev.map(processo => ({
        ...processo,
        candidatos: processo.candidatos.map(candidato =>
          candidato.id === candidatoId
            ? { ...candidato, status, dataUltimaAtualizacao: new Date().toISOString() }
            : candidato
        )
      }))
    );
  }, []);

  const atualizarStatusAdmissao = useCallback((candidatoId: string, status: string) => {
    console.log(`Atualizando status de admissão do candidato ${candidatoId} para ${status}`);
    
    setCandidatosAdmissao(prev => {
      const existing = prev.find(c => c.candidatoId === candidatoId);
      if (existing) {
        return prev.map(c => 
          c.candidatoId === candidatoId 
            ? { ...c, statusAdmissao: status as any }
            : c
        );
      } else {
        return [...prev, { 
          candidatoId, 
          statusAdmissao: status as any 
        }];
      }
    });
  }, []);

  const obterStatusAdmissao = useCallback((candidatoId: string): string => {
    const candidatoAdmissao = candidatosAdmissao.find(c => c.candidatoId === candidatoId);
    return candidatoAdmissao?.statusAdmissao || 'documentos-pendentes';
  }, [candidatosAdmissao]);

  const contextValue: ProcessoSeletivoContextType = {
    curriculos,
    processosSeletivos,
    candidatosAdmissao,
    loading,
    adicionarCurriculo,
    atualizarCurriculo,
    buscarCurriculos,
    criarProcessoSeletivo,
    atualizarProcessoSeletivo,
    adicionarCandidatoProcesso,
    moverCandidatoEtapa,
    atualizarStatusCandidato,
    atualizarStatusAdmissao,
    obterStatusAdmissao
  };

  return (
    <ProcessoSeletivoContext.Provider value={contextValue}>
      {children}
    </ProcessoSeletivoContext.Provider>
  );
};

export const useProcessoSeletivo = () => {
  const context = useContext(ProcessoSeletivoContext);
  if (!context) {
    throw new Error('useProcessoSeletivo must be used within a ProcessoSeletivoProvider');
  }
  return context;
};
