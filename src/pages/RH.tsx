
import { useState } from "react";
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
import { modules } from "@/data/rhModules";

const RH = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  
  // Estados dos modais existentes
  const [isColaboradorModalOpen, setIsColaboradorModalOpen] = useState(false);
  const [isDepartamentoModalOpen, setIsDepartamentoModalOpen] = useState(false);
  const [isExpedienteModalOpen, setIsExpedienteModalOpen] = useState(false);
  const [isFuncaoModalOpen, setIsFuncaoModalOpen] = useState(false);
  
  // Estados dos novos modais de Planos de Carreira
  const [isPlanoCarreiraModalOpen, setIsPlanoCarreiraModalOpen] = useState(false);
  const [isCargoPlanoModalOpen, setIsCargoPlanoModalOpen] = useState(false);
  const [isNiveisProgressaoModalOpen, setIsNiveisProgressaoModalOpen] = useState(false);

  // Reset state when no module is selected
  const resetSelection = () => {
    setActiveModule('');
    setActiveSubModule('');
    setSearchTerm('');
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
  };

  const handleCloseSidebar = () => {
    setExpandedModules([]);
    resetSelection();
  };

  const handleNewRecord = () => {
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

  const handleGetStarted = () => {
    setActiveModule('colaboradores');
    setActiveSubModule('colaboradores');
    setExpandedModules(['colaboradores']);
  };

  const currentSubModule = activeModule && activeSubModule ? 
    modules[activeModule as keyof typeof modules]?.subModules[activeSubModule] : null;

  // Filter data based on search term
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
          {activeSubModule && currentSubModule ? (
            <>
              <ContentHeader
                title={currentSubModule.name}
                description={`Gerencie os registros de ${currentSubModule.name.toLowerCase()}`}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onNewRecord={handleNewRecord}
                buttonText={getButtonText()}
              />

              <div className="flex-1 p-6 min-h-0">
                <DataTable 
                  data={filteredData} 
                  moduleName={currentSubModule.name}
                />
              </div>
            </>
          ) : (
            <EmptyState onGetStarted={handleGetStarted} />
          )}
        </div>
      </div>

      {/* Modais existentes */}
      <ColaboradorModal isOpen={isColaboradorModalOpen} onClose={() => setIsColaboradorModalOpen(false)} />
      <DepartamentoModal isOpen={isDepartamentoModalOpen} onClose={() => setIsDepartamentoModalOpen(false)} />
      <FuncaoModal isOpen={isFuncaoModalOpen} onClose={() => setIsFuncaoModalOpen(false)} />
      <ExpedienteModal isOpen={isExpedienteModalOpen} onClose={() => setIsExpedienteModalOpen(false)} />
      
      {/* Novos modais de Planos de Carreira */}
      <PlanoCarreiraModal isOpen={isPlanoCarreiraModalOpen} onClose={() => setIsPlanoCarreiraModalOpen(false)} />
      <CargoPlanoModal isOpen={isCargoPlanoModalOpen} onClose={() => setIsCargoPlanoModalOpen(false)} />
      <NiveisProgressaoModal isOpen={isNiveisProgressaoModalOpen} onClose={() => setIsNiveisProgressaoModalOpen(false)} />
    </SidebarLayout>
  );
};

export default RH;
