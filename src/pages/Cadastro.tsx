
import { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ProductForm from "@/components/ProductForm";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import EmptyState from "@/components/cadastro/EmptyState";
import { modules } from "@/data/cadastroModules";

const Cadastro = () => {
  const [activeModule, setActiveModule] = useState('produtos');
  const [activeSubModule, setActiveSubModule] = useState('produtos');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>(['produtos']);
  const [showProductForm, setShowProductForm] = useState(false);

  const toggleModule = (module: string) => {
    if (expandedModules.includes(module)) {
      setExpandedModules(expandedModules.filter(m => m !== module));
    } else {
      setExpandedModules([...expandedModules, module]);
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

  const currentSubModule = activeSubModule ? 
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
