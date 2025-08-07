import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import RHSidebar from "@/components/rh/RHSidebar";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import EmptyState from "@/components/cadastro/EmptyState";
import ColaboradorModal from "@/components/rh/ColaboradorModal";
import DepartamentoModal from "@/components/rh/DepartamentoModal";
import ExpedienteModal from "@/components/rh/ExpedienteModal";
import FuncaoModal from "@/components/rh/FuncaoModal";
import PlanoCarreiraModal from "@/components/rh/PlanoCarreiraModal";
import CargoPlanoModal from "@/components/rh/CargoPlanoModal";
import NiveisProgressaoModal from "@/components/rh/NiveisProgressaoModal";
import ProcessoSeletivoKanban from "@/components/rh/ProcessoSeletivoKanban";
import ProcessosSeletivosTable from "@/components/rh/ProcessosSeletivosTable";
import BancoCurriculos from "@/components/rh/BancoCurriculos";
import EtapasSelecao from "@/components/rh/EtapasSelecao";
import Admissao from "@/components/rh/Admissao";
import { ProcessoSeletivoProvider } from "@/contexts/ProcessoSeletivoContext";
import { modules } from "@/data/rhModules";

const RH = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  
  // Estado para controlar o processo seletivo específico no Kanban
  const [selectedProcessoId, setSelectedProcessoId] = useState<string | null>(null);
  
  // Estados dos modais existentes
  const [isColaboradorModalOpen, setIsColaboradorModalOpen] = useState(false);
  const [isDepartamentoModalOpen, setIsDepartamentoModalOpen] = useState(false);
  const [isExpedienteModalOpen, setIsExpedienteModalOpen] = useState(false);
  const [isFuncaoModalOpen, setIsFuncaoModalOpen] = useState(false);
  
  // Estados dos modais de Planos de Carreira
  const [isPlanoCarreiraModalOpen, setIsPlanoCarreiraModalOpen] = useState(false);
  const [isCargoPlanoModalOpen, setIsCargoPlanoModalOpen] = useState(false);
  const [isNiveisProgressaoModalOpen, setIsNiveisProgressaoModalOpen] = useState(false);

  // Estados para modo edição
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingColaboradorId, setEditingColaboradorId] = useState<string | null>(null);
  const [editingColaboradorData, setEditingColaboradorData] = useState<any>(null);

  // Reset state when no module is selected
  const resetSelection = () => {
    setActiveModule('');
    setActiveSubModule('');
    setSearchTerm('');
    setSelectedProcessoId(null);
  };

  const toggleModule = (module: string) => {
    if (expandedModules.includes(module)) {
      setExpandedModules(expandedModules.filter(m => m !== module));
      if (activeModule === module && !activeSubModule) {
        resetSelection();
      }
    } else {
      setExpandedModules([...expandedModules, module]);
    }
  };

  const handleModuleSelect = (module: string, subModule: string) => {
    setActiveModule(module);
    setActiveSubModule(subModule);
    setSearchTerm('');
    setSelectedProcessoId(null); // Reset selected process when changing modules
  };

  const handleCloseSidebar = () => {
    setExpandedModules([]);
    resetSelection();
  };

  const handleNewRecord = () => {
    setIsEditMode(false);
    setEditingColaboradorId(null);
    setEditingColaboradorData(null);
    
    if (activeModule === 'colaboradores') {
      setIsColaboradorModalOpen(true);
    } else if (activeModule === 'departamentos') {
      if (activeSubModule === 'setores') {
        setIsDepartamentoModalOpen(true);
      } else if (activeSubModule === 'funcoes') {
        setIsFuncaoModalOpen(true);
      }
    } else if (activeModule === 'expedientes') {
      setIsExpedienteModalOpen(true);
    } else if (activeModule === 'planosCarreira') {
      if (activeSubModule === 'planos') {
        setIsPlanoCarreiraModalOpen(true);
      } else if (activeSubModule === 'cargos') {
        setIsCargoPlanoModalOpen(true);
      } else if (activeSubModule === 'niveis') {
        setIsNiveisProgressaoModalOpen(true);
      }
    }
  };

  const handleEditItem = (item: any, moduleName: string) => {
    if (activeModule === 'colaboradores' && moduleName === 'Colaboradores') {
      setIsEditMode(true);
      setEditingColaboradorId(String(item.id));
      
      const colaboradorCompleto = {
        dadosPessoais: {
          nome: item.nome || '',
          cpf: item.cpf || '',
          pis: item.pis || '',
          idade: item.idade || '',
          dataNascimento: item.dataNascimento || '',
          genero: item.genero || '',
          etnia: item.etnia || '',
          rg: item.rg || '',
          orgaoExpedidorRg: item.orgaoExpedidorRg || '',
          ufEmissorRg: item.ufEmissorRg || '',
          dataExpedicaoRg: item.dataExpedicaoRg || '',
          naturalidade: item.naturalidade || '',
          nomeMae: item.nomeMae || '',
          nomePai: item.nomePai || '',
          cid: item.cid || '',
          email: item.email || '',
          telefone: item.telefone || '',
          endereco: item.endereco || '',
          bairro: item.bairro || '',
          observacoes: item.observacoes || ''
        },
        dadosProfissionais: {
          empresa: item.empresa || '',
          uf: item.uf || '',
          setor: item.setor || '',
          funcao: item.funcao || '',
          cargo: item.cargo || '',
          nivel: item.nivel || '',
          cbo: item.cbo || '',
          compativelFuncao: item.compativelFuncao || false,
          funcoesDesempenhadas: item.funcoesDesempenhadas || '',
          dataAdmissao: item.dataAdmissao || '',
          dataCadastro: item.dataCadastro || '',
          tempoCasa: item.tempoCasa || '',
          ultimaPromocao: item.ultimaPromocao || '',
          previsaoFerias: item.previsaoFerias || ''
        },
        dadosFinanceiros: {
          salarioBase: item.salarioBase || '',
          adicionalNivel: item.adicionalNivel || '',
          insalubridade: item.insalubridade || '',
          sobreaviso: item.sobreaviso || '',
          salarioBruto: item.salarioBruto || '',
          valorHoraTrabalhada: item.valorHoraTrabalhada || '',
          pisoSalarial: item.pisoSalarial || '',
          mediaSalarial: item.mediaSalarial || '',
          dependentesIR: item.dependentesIR || ''
        },
        dadosBancarios: {
          banco: item.banco || '',
          tipoConta: item.tipoConta || '',
          agencia: item.agencia || '',
          conta: item.conta || ''
        },
        formacaoEscolaridade: {
          escolaridade: item.escolaridade || '',
          possuiDiploma: item.possuiDiploma || false
        },
        beneficios: {
          tipoPlano: item.tipoPlano || '',
          quantidadeDependentesPlano: item.quantidadeDependentesPlano || ''
        },
        documentacao: {
          anexos: item.anexos || []
        }
      };
      
      setEditingColaboradorData(colaboradorCompleto);
      setIsColaboradorModalOpen(true);
    }
  };

  const handleCloseColaboradorModal = () => {
    setIsColaboradorModalOpen(false);
    setIsEditMode(false);
    setEditingColaboradorId(null);
    setEditingColaboradorData(null);
  };

  const handleGetStarted = () => {
    setActiveModule('colaboradores');
    setActiveSubModule('colaboradores');
    setExpandedModules(['colaboradores']);
  };

  // Handlers para navegação do processo seletivo
  const handleViewProcess = (processoId: string) => {
    setSelectedProcessoId(processoId);
  };

  const handleVoltarParaTabela = () => {
    setSelectedProcessoId(null);
  };

  // Renderizar componente específico do Processo Seletivo
  const renderProcessoSeletivoContent = () => {
    switch (activeSubModule) {
      case 'visaoGeral':
        // Se um processo específico foi selecionado, mostrar o Kanban
        if (selectedProcessoId) {
          return (
            <ProcessoSeletivoKanban 
              processoId={selectedProcessoId}
              onVoltar={handleVoltarParaTabela}
            />
          );
        }
        // Caso contrário, mostrar a tabela de processos
        return <ProcessosSeletivosTable onViewProcess={handleViewProcess} />;
      case 'bancoCurriculos':
        return <BancoCurriculos />;
      case 'etapasSelecao':
        return <EtapasSelecao />;
      case 'admissao':
        return <Admissao />;
      default:
        return null;
    }
  };

  const currentSubModule = activeModule && activeSubModule && activeModule !== 'processoSeletivo' ? 
    modules[activeModule as keyof typeof modules]?.subModules[activeSubModule] : null;

  // Filter data based on search term for non-processo-seletivo modules
  const filteredData = currentSubModule?.data?.filter((item: any) => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  // Get button text based on active module
  const getButtonText = () => {
    if (activeModule === 'colaboradores') return "Novo Colaborador";
    if (activeModule === 'departamentos') {
      if (activeSubModule === 'setores') return "Novo Setor";
      if (activeSubModule === 'funcoes') return "Nova Função";
    }
    if (activeModule === 'expedientes') return "Novo Expediente";
    if (activeModule === 'planosCarreira') {
      if (activeSubModule === 'planos') return "Novo Plano de Carreira";
      if (activeSubModule === 'cargos') return "Novo Cargo";
      if (activeSubModule === 'niveis') return "Gerenciar Níveis";
    }
    return "Novo Registro";
  };

  // Adicionar listener para eventos de edição
  React.useEffect(() => {
    const handleEditEvent = (event: any) => {
      handleEditItem(event.detail.item, event.detail.moduleName);
    };

    window.addEventListener('editItem', handleEditEvent);
    return () => window.removeEventListener('editItem', handleEditEvent);
  }, [activeModule]);

  return (
    <ProcessoSeletivoProvider>
      <SidebarLayout>
        <div className="flex h-full bg-gray-50/50">
          <RHSidebar
            activeModule={activeModule}
            activeSubModule={activeSubModule}
            expandedModules={expandedModules}
            onModuleToggle={toggleModule}
            onModuleSelect={handleModuleSelect}
            onClose={handleCloseSidebar}
          />

          <div className="flex-1 flex flex-col min-h-0">
            {activeSubModule ? (
              <>
                {activeModule === 'processoSeletivo' ? (
                  <div className="flex-1 p-6 min-h-0">
                    {renderProcessoSeletivoContent()}
                  </div>
                ) : (
                  <>
                    <ContentHeader
                      title={currentSubModule?.name || ''}
                      description={`Gerencie os registros de ${currentSubModule?.name?.toLowerCase() || ''}`}
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      onNewRecord={handleNewRecord}
                      buttonText={getButtonText()}
                    />

                    <div className="flex-1 p-6 min-h-0">
                      <DataTable 
                        data={filteredData} 
                        moduleName={currentSubModule?.name || ''}
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              <EmptyState onGetStarted={handleGetStarted} />
            )}
          </div>
        </div>

        {/* Modais existentes */}
        <ColaboradorModal 
          isOpen={isColaboradorModalOpen} 
          onClose={handleCloseColaboradorModal}
          editMode={isEditMode}
          colaboradorId={editingColaboradorId || undefined}
          colaboradorData={editingColaboradorData}
        />
        
        <DepartamentoModal isOpen={isDepartamentoModalOpen} onClose={() => setIsDepartamentoModalOpen(false)} />
        <FuncaoModal isOpen={isFuncaoModalOpen} onClose={() => setIsFuncaoModalOpen(false)} />
        <ExpedienteModal isOpen={isExpedienteModalOpen} onClose={() => setIsExpedienteModalOpen(false)} />
        
        <PlanoCarreiraModal isOpen={isPlanoCarreiraModalOpen} onClose={() => setIsPlanoCarreiraModalOpen(false)} />
        <CargoPlanoModal isOpen={isCargoPlanoModalOpen} onClose={() => setIsCargoPlanoModalOpen(false)} />
        <NiveisProgressaoModal isOpen={isNiveisProgressaoModalOpen} onClose={() => setIsNiveisProgressaoModalOpen(false)} />
      </SidebarLayout>
    </ProcessoSeletivoProvider>
  );
};

export default RH;
