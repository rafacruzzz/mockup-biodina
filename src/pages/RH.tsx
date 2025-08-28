import { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import RHSidebar from "@/components/rh/RHSidebar";
import ProcessosSeletivosTable from "@/components/rh/ProcessosSeletivosTable";
import BancoCurriculos from "@/components/rh/BancoCurriculos";
import DataTable from "@/components/cadastro/DataTable";
import ContentHeader from "@/components/cadastro/ContentHeader";
import EmptyState from "@/components/cadastro/EmptyState";
import PlanoCarreiraModal from "@/components/rh/PlanoCarreiraModal";
import CargoModal from "@/components/rh/CargoModal";
import NiveisProgressaoModal from "@/components/rh/NiveisProgressaoModal";
import DepartamentoModal from "@/components/rh/DepartamentoModal";
import ExpedienteModal from "@/components/rh/ExpedienteModal";
import AdicionarCurriculoModal from "@/components/rh/AdicionarCurriculoModal";
import ConfigurarEtapasModal from "@/components/rh/ConfigurarEtapasModal";
import EtapasSelecao from "@/components/rh/EtapasSelecao";
import ProcessoSeletivoKanban from "@/components/rh/ProcessoSeletivoKanban";
import { rhModules } from "@/data/rhModules";

const RH = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  
  // Modal states
  const [showPlanoCarreiraModal, setShowPlanoCarreiraModal] = useState(false);
  const [showCargoModal, setShowCargoModal] = useState(false); 
  const [showNiveisProgressaoModal, setShowNiveisProgressaoModal] = useState(false);
  const [showDepartamentoModal, setShowDepartamentoModal] = useState(false);
  const [showExpedienteModal, setShowExpedienteModal] = useState(false);
  const [showAdicionarCurriculoModal, setShowAdicionarCurriculoModal] = useState(false);
  const [showConfigurarEtapasModal, setShowConfigurarEtapasModal] = useState(false);

  const toggleModule = (module: string) => {
    if (expandedModules.includes(module)) {
      setExpandedModules(expandedModules.filter(m => m !== module));
      if (activeModule === module && !activeSubModule) {
        setActiveModule('');
        setActiveSubModule('');
      }
    } else {
      setExpandedModules([...expandedModules, module]);
    }
  };

  const handleModuleSelect = (module: string, subModule: string) => {
    setActiveModule(module);
    setActiveSubModule(subModule);
    setSearchTerm('');
  };

  const handleCloseSidebar = () => {
    setActiveModule('');
    setActiveSubModule('');
    setExpandedModules([]);
    setSearchTerm('');
  };

  const handleNewRecord = () => {
    if (activeModule === 'planos-carreira') {
      if (activeSubModule === 'planos') {
        setShowPlanoCarreiraModal(true);
      } else if (activeSubModule === 'cargos') {
        setShowCargoModal(true);
      } else if (activeSubModule === 'niveis') {
        setShowNiveisProgressaoModal(true);
      }
    } else if (activeModule === 'departamentos' && activeSubModule === 'departamentos') {
      setShowDepartamentoModal(true);
    } else if (activeModule === 'expedientes' && activeSubModule === 'expedientes') {
      setShowExpedienteModal(true);
    } else if (activeModule === 'processo-seletivo' && activeSubModule === 'banco-curriculos') {
      setShowAdicionarCurriculoModal(true);
    }
  };

  const handleGetStarted = () => {
    setActiveModule('processo-seletivo');
    setActiveSubModule('processos');
    setExpandedModules(['processo-seletivo']);
  };

  const currentSubModule = activeModule && activeSubModule ? 
    rhModules[activeModule as keyof typeof rhModules]?.subModules[activeSubModule] : null;

  const renderContent = () => {
    if (!activeModule || !activeSubModule) {
      return <EmptyState onGetStarted={handleGetStarted} />;
    }

    // Processo Seletivo
    if (activeModule === 'processo-seletivo') {
      if (activeSubModule === 'processos') {
        return <ProcessosSeletivosTable />;
      } else if (activeSubModule === 'banco-curriculos') {
        return <BancoCurriculos />;
      }
    }

    // Etapas do processo (quando selecionado um processo específico)
    if (activeModule === 'etapas-processo') {
      return <EtapasSelecao />;
    }

    // Kanban do processo seletivo
    if (activeModule === 'kanban-processo') {
      return <ProcessoSeletivoKanban />;
    }

    // Default table view for other modules  
    if (currentSubModule) {
      return (
        <DataTable 
          data={currentSubModule.data} 
          moduleName={currentSubModule.name}
        />
      );
    }

    return null;
  };

  return (
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
          {activeSubModule && currentSubModule && (
            <ContentHeader
              title={currentSubModule.name}
              description={`Gerencie os registros de ${currentSubModule.name.toLowerCase()}`}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onNewRecord={handleNewRecord}
              additionalActions={
                activeModule === 'processo-seletivo' && activeSubModule === 'processos' ? 
                  <button
                    onClick={() => setShowConfigurarEtapasModal(true)}
                    className="bg-biodina-blue text-white px-4 py-2 rounded-lg hover:bg-biodina-blue/90 transition-colors"
                  >
                    Configurar Etapas
                  </button> : undefined
              }
            />
          )}

          <div className="flex-1 p-6 min-h-0">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Modals */}
      <PlanoCarreiraModal 
        isOpen={showPlanoCarreiraModal}
        onClose={() => setShowPlanoCarreiraModal(false)}
      />
      
      <CargoModal 
        isOpen={showCargoModal}
        onClose={() => setShowCargoModal(false)}
      />
      
      <NiveisProgressaoModal 
        isOpen={showNiveisProgressaoModal}
        onClose={() => setShowNiveisProgressaoModal(false)}
      />
      
      <DepartamentoModal 
        isOpen={showDepartamentoModal}
        onClose={() => setShowDepartamentoModal(false)}
      />
      
      <ExpedienteModal 
        isOpen={showExpedienteModal}
        onClose={() => setShowExpedienteModal(false)}
      />
      
      <AdicionarCurriculoModal 
        isOpen={showAdicionarCurriculoModal}
        onClose={() => setShowAdicionarCurriculoModal(false)}
      />
      
      <ConfigurarEtapasModal 
        isOpen={showConfigurarEtapasModal}
        onClose={() => setShowConfigurarEtapasModal(false)}
      />
    </SidebarLayout>
  );
};

export default RH;
