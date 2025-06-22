
import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import EstoqueSidebar from "@/components/estoque/EstoqueSidebar";
import EstoqueDashboard from "@/components/estoque/EstoqueDashboard";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import { estoqueModules } from "@/data/estoqueModules";

const Estoque = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  // Reset state when no module is selected
  useEffect(() => {
    if (!activeModule) {
      setActiveSubModule('');
      setSearchTerm('');
    }
  }, [activeModule]);

  const toggleModule = (module: string) => {
    if (expandedModules.includes(module)) {
      setExpandedModules(expandedModules.filter(m => m !== module));
      // Only reset selection if we're collapsing the currently active module
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
    setSearchTerm(''); // Reset search when changing modules
  };

  const handleCloseSidebar = () => {
    setActiveModule('');
    setActiveSubModule('');
    setExpandedModules([]);
    setSearchTerm('');
  };

  const handleNewRecord = () => {
    console.log('Novo registro para:', activeModule, activeSubModule);
    // Implementar lógica específica para cada tipo de registro
  };

  const handleRowClick = (item: any) => {
    console.log('Item clicado:', item);
    // Implementar lógica específica para cada tipo de item
  };

  const getButtonText = () => {
    if (activeModule === 'ajustes' && activeSubModule === 'ajustes_pendentes') {
      return 'Novo Ajuste';
    }
    if (activeModule === 'transferencias' && activeSubModule === 'transferencias_pendentes') {
      return 'Nova Transferência';
    }
    return 'Novo Registro';
  };

  const currentSubModule = activeModule && activeSubModule ? 
    estoqueModules[activeModule as keyof typeof estoqueModules]?.subModules[activeSubModule] : null;

  return (
    <SidebarLayout>
      <div className="flex h-full bg-gray-50/50">
        <EstoqueSidebar
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
                  data={currentSubModule?.data || []} 
                  moduleName={currentSubModule?.name || ''}
                  onRowClick={handleRowClick}
                />
              </div>
            </>
          ) : (
            <EstoqueDashboard />
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Estoque;
