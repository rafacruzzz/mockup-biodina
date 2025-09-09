import { useState, useEffect } from 'react';
import { ProcessoRescisao, CHECKLIST_ACOES_IMEDIATAS, ITENS_DEVOLUCAO_PADRAO, DOCUMENTOS_HOMOLOGACAO } from '@/types/rescisao';
import { useColaboradores } from './useColaboradores';

const createInitialProcess = (colaboradorId: string): ProcessoRescisao => ({
  id: `processo-${colaboradorId}`,
  colaboradorId,
  etapaAtual: 1,
  dataInicio: new Date().toISOString(),
  status: 'em_andamento',
  etapas: {
    etapa1: {
      solicitacaoPreviaCalculos: false,
      previaRescisao: false,
      desligamentoSolicitadoPor: '',
      dataDesligamento: '',
      avisoPrevia: 'indenizado',
      tipoDesligamento: 'iniciativa_empresa',
      motivoDesligamento: '',
      exameDemissional: { data: '', local: '', horario: '' },
      contatosPosEmpresa: { telefone: '', email: '' },
      dadosBancarios: { banco: '', agencia: '', conta: '', chavePix: '' },
      concluida: false
    },
    etapa2: {
      checklist: CHECKLIST_ACOES_IMEDIATAS.map(item => ({
        item,
        concluido: false
      })),
      observacoes: '',
      concluida: false
    },
    etapa3: {
      itensParaDevolucao: ITENS_DEVOLUCAO_PADRAO.map(item => ({ ...item })),
      verbasAdicionais: [],
      descontos: [],
      solicitacaoDP: '',
      conclusaoDP: '',
      dataLimitePagamento: '',
      comprovantesAnexados: [],
      termoGerado: false,
      concluida: false
    },
    etapa4: {
      concluida: false
    },
    etapa5: {
      documentos: DOCUMENTOS_HOMOLOGACAO.map(nome => ({
        nome,
        anexado: false
      })),
      concluida: false
    },
    etapa6: {
      cancelamentos: {},
      planoSaude: {
        direitoManutencao: false,
        titularDependentes: 0
      },
      outrasAcoes: {},
      confirmacaoFinal: false,
      concluida: false
    },
    etapa7: {
      redistribuicaoTarefas: '',
      arquivado: false,
      concluida: false
    }
  }
});

export const useRescisaoProcess = (colaboradorId: string) => {
  const [processo, setProcesso] = useState<ProcessoRescisao>(() => 
    createInitialProcess(colaboradorId)
  );
  const { desligarColaborador } = useColaboradores();

  const updateEtapa = (etapaNumber: number, dados: any) => {
    setProcesso(prev => ({
      ...prev,
      etapas: {
        ...prev.etapas,
        [`etapa${etapaNumber}`]: {
          ...prev.etapas[`etapa${etapaNumber}` as keyof typeof prev.etapas],
          ...dados,
          concluida: true
        }
      }
    }));
  };

  const canAdvanceToStep = (stepNumber: number): boolean => {
    if (stepNumber === 1) return true;
    
    // Check if previous step is completed
    const previousStep = stepNumber - 1;
    const previousEtapa = processo.etapas[`etapa${previousStep}` as keyof typeof processo.etapas];
    return previousEtapa?.concluida || false;
  };

  const finalizeProcess = (colaboradorId: string) => {
    desligarColaborador(colaboradorId);
    setProcesso(prev => ({
      ...prev,
      status: 'arquivado'
    }));
  };

  return {
    processo,
    updateEtapa,
    canAdvanceToStep,
    finalizeProcess
  };
};