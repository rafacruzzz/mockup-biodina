
import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ProductForm from "@/components/ProductForm";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import EmptyState from "@/components/cadastro/EmptyState";
import { modules } from "@/data/cadastroModules";

const Cadastro = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);

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
      // If we're collapsing the active module, reset selection
      if (activeModule === module) {
        setActiveModule('');
        setActiveSubModule('');
      }
    } else {
      setExpandedModules([...expandedModules, module]);
      // Auto-select the first submodule when expanding
      const moduleData = modules[module as keyof typeof modules];
      if (moduleData) {
        const firstSubModule = Object.keys(moduleData.subModules)[0];
        setActiveModule(module);
        setActiveSubModule(firstSubModule);
      }
    }
  };

  const handleModuleSelect = (module: string, subModule: string) => {
    setActiveModule(module);
    setActiveSubModule(subModule);
  };

  const handleNewRecord = () => {
    if (activeModule === 'produtos' && activeSubModule === 'produtos') {
      setShowProductForm(true);
    } else {
      console.log(`Criar novo registro para ${activeModule} - ${activeSubModule}`);
    }
  };

  const handleGetStarted = () => {
    setActiveModule('produtos');
    setActiveSubModule('produtos');
    setExpandedModules(['produtos']);
  };

  const currentSubModule = activeModule && activeSubModule ? 
    modules[activeModule as keyof typeof modules]?.subModules[activeSubModule] : null;

  return (
    <SidebarLayout>
      <div className="flex h-full bg-gray-50/50">
        <CadastroSidebar
          activeModule={activeModule}
          activeSubModule={activeSubModule}
          expandedModules={expandedModules}
          onModuleToggle={toggleModule}
          onModuleSelect={handleModuleSelect}
        />

        <div className="flex-1">
          {activeSubModule && currentSubModule ? (
            <div className="h-full flex flex-col">
              <ContentHeader
                title={currentSubModule.name}
                description={`Gerencie os registros de ${currentSubModule.name.toLowerCase()}`}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onNewRecord={handleNewRecord}
              />

              <div className="flex-1 p-6 overflow-auto">
                <DataTable 
                  data={currentSubModule.data} 
                  moduleName={currentSubModule.name}
                />
              </div>
            </div>
          ) : (
            <EmptyState onGetStarted={handleGetStarted} />
          )}
        </div>
      </div>

      {showProductForm && (
        <ProductForm onClose={() => setShowProductForm(false)} />
      )}
    </SidebarLayout>
  );
};

export default Cadastro;
