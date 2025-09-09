
import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import RHSidebar from "@/components/rh/RHSidebar";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import EmptyState from "@/components/cadastro/EmptyState";
import DepartamentoModal from "@/components/rh/DepartamentoModal";
import ExpedienteModal from "@/components/rh/ExpedienteModal";
import CargoModal from "@/components/rh/CargoModal";
import PlanoCarreiraModal from "@/components/rh/PlanoCarreiraModal";
import CargoPlanoModal from "@/components/rh/CargoPlanoModal";
import NiveisProgressaoModal from "@/components/rh/NiveisProgressaoModal";
import ProcessoSeletivoKanban from "@/components/rh/ProcessoSeletivoKanban";
import ProcessosSeletivosTable from "@/components/rh/ProcessosSeletivosTable";
import BancoCurriculos from "@/components/rh/BancoCurriculos";
import EtapasSelecao from "@/components/rh/EtapasSelecao";
import Admissao from "@/components/rh/Admissao";
import RescisaoColaboradores from "@/components/rh/RescisaoColaboradores";
import { ProcessoSeletivoProvider } from "@/contexts/ProcessoSeletivoContext";
import { modules } from "@/data/rhModules";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Upload } from "lucide-react";

const RH = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  
  // Estado para controlar o processo seletivo específico no Kanban
  const [selectedProcessoId, setSelectedProcessoId] = useState<string | null>(null);
  
  // Estados dos modais existentes
  const [isDepartamentoModalOpen, setIsDepartamentoModalOpen] = useState(false);
  const [isExpedienteModalOpen, setIsExpedienteModalOpen] = useState(false);
  const [isCargoModalOpen, setIsCargoModalOpen] = useState(false);
  
  // Estados dos modais de Planos de Carreira
  const [isPlanoCarreiraModalOpen, setIsPlanoCarreiraModalOpen] = useState(false);
  const [isCargoPlanoModalOpen, setIsCargoPlanoModalOpen] = useState(false);
  const [isNiveisProgressaoModalOpen, setIsNiveisProgressaoModalOpen] = useState(false);

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
    if (activeModule === 'departamentos') {
      if (activeSubModule === 'setores') {
        setIsDepartamentoModalOpen(true);
      } else if (activeSubModule === 'cargos') {
        setIsCargoModalOpen(true);
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

  const handleGetStarted = () => {
    setActiveModule('processoSeletivo');
    setActiveSubModule('visaoGeral');
    setExpandedModules(['processoSeletivo']);
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
      case 'rescisao':
        return <RescisaoColaboradores />;
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
    if (activeModule === 'departamentos') {
      if (activeSubModule === 'setores') return "Novo Setor";
      if (activeSubModule === 'cargos') return "Novo Cargo";
    }
    if (activeModule === 'expedientes') return "Novo Expediente";
    if (activeModule === 'planosCarreira') {
      if (activeSubModule === 'planos') return "Novo Plano de Carreira";
      if (activeSubModule === 'cargos') return "Novo Cargo";
      if (activeSubModule === 'niveis') return "Gerenciar Níveis";
    }
    return "Novo Registro";
  };

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
        <DepartamentoModal isOpen={isDepartamentoModalOpen} onClose={() => setIsDepartamentoModalOpen(false)} />
        <CargoModal isOpen={isCargoModalOpen} onClose={() => setIsCargoModalOpen(false)} />
        <ExpedienteModal isOpen={isExpedienteModalOpen} onClose={() => setIsExpedienteModalOpen(false)} />
        
        <PlanoCarreiraModal isOpen={isPlanoCarreiraModalOpen} onClose={() => setIsPlanoCarreiraModalOpen(false)} />
        <CargoPlanoModal isOpen={isCargoPlanoModalOpen} onClose={() => setIsCargoPlanoModalOpen(false)} />
        <NiveisProgressaoModal isOpen={isNiveisProgressaoModalOpen} onClose={() => setIsNiveisProgressaoModalOpen(false)} />
      </SidebarLayout>
    </ProcessoSeletivoProvider>
  );
};

export default RH;
