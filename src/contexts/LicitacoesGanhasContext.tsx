import React, { createContext, useContext, useState } from 'react';
import { licitacoesGanhasDetalhadas as dadosIniciais } from '@/data/licitacaoMockData';

export interface EmpresaParticipanteData {
  empresaParticipanteId: string;
  empresaParticipanteNome: string;
  empresaParticipanteCNPJ: string;
}

export interface LicitacaoGanha {
  id: number;
  numeroPregao: string;
  nomeInstituicao: string;
  cnpj: string;
  uf: string;
  municipio: string;
  linkEdital?: string;
  objetoLicitacao: string;
  resumoEdital: string;
  analiseTecnica: string;
  palavraChave?: string;
  estrategiaValorFinal: number;
  dataAbertura: string;
  status: string;
  documentos: any[];
  historico: any[];
  pedidos: any[];
  // Empresa participante 1
  empresaParticipanteId?: string;
  empresaParticipanteNome?: string;
  empresaParticipanteCNPJ?: string;
  // Empresa participante 2 (opcional)
  empresaParticipanteId2?: string;
  empresaParticipanteNome2?: string;
  empresaParticipanteCNPJ2?: string;
}

interface LicitacoesGanhasContextType {
  licitacoesGanhas: LicitacaoGanha[];
  atualizarEmpresaLicitacao: (
    licitacaoId: string,
    empresa: EmpresaParticipanteData,
    empresaNumero: 1 | 2
  ) => void;
  getLicitacaoById: (id: string) => LicitacaoGanha | undefined;
}

const LicitacoesGanhasContext = createContext<LicitacoesGanhasContextType | undefined>(undefined);

export const LicitacoesGanhasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [licitacoesGanhas, setLicitacoesGanhas] = useState<LicitacaoGanha[]>(
    dadosIniciais.map(l => ({
      ...l,
      // Inicializar campos de empresa se não existirem
      empresaParticipanteId: l.empresaParticipanteId || '',
      empresaParticipanteNome: l.empresaParticipanteNome || '',
      empresaParticipanteCNPJ: l.empresaParticipanteCNPJ || '',
      empresaParticipanteId2: l.empresaParticipanteId2 || '',
      empresaParticipanteNome2: l.empresaParticipanteNome2 || '',
      empresaParticipanteCNPJ2: l.empresaParticipanteCNPJ2 || '',
    })) as LicitacaoGanha[]
  );

  const atualizarEmpresaLicitacao = (
    licitacaoId: string,
    empresa: EmpresaParticipanteData,
    empresaNumero: 1 | 2
  ) => {
    setLicitacoesGanhas(prev => 
      prev.map(l => {
        if (l.id.toString() === licitacaoId) {
          if (empresaNumero === 1) {
            return {
              ...l,
              empresaParticipanteId: empresa.empresaParticipanteId,
              empresaParticipanteNome: empresa.empresaParticipanteNome,
              empresaParticipanteCNPJ: empresa.empresaParticipanteCNPJ,
            };
          } else {
            return {
              ...l,
              empresaParticipanteId2: empresa.empresaParticipanteId,
              empresaParticipanteNome2: empresa.empresaParticipanteNome,
              empresaParticipanteCNPJ2: empresa.empresaParticipanteCNPJ,
            };
          }
        }
        return l;
      })
    );
  };

  const getLicitacaoById = (id: string) => {
    return licitacoesGanhas.find(l => l.id.toString() === id);
  };

  return (
    <LicitacoesGanhasContext.Provider
      value={{
        licitacoesGanhas,
        atualizarEmpresaLicitacao,
        getLicitacaoById,
      }}
    >
      {children}
    </LicitacoesGanhasContext.Provider>
  );
};

export const useLicitacoesGanhas = () => {
  const context = useContext(LicitacoesGanhasContext);
  if (context === undefined) {
    throw new Error('useLicitacoesGanhas must be used within a LicitacoesGanhasProvider');
  }
  return context;
};
