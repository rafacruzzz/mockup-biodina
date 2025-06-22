
import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import EstoqueSidebar from "@/components/estoque/EstoqueSidebar";
import EstoqueDashboard from "@/components/estoque/EstoqueDashboard";
import MovimentacaoEstoqueForm from "@/components/estoque/MovimentacaoEstoqueForm";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import { estoqueModules } from "@/data/estoqueModules";

const Estoque = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  useEffect(() => {
    if (!activeModule) {
      setActiveSubModule('');
      setSearchTerm('');
    }
  }, [activeModule]);

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
    console.log('Novo registro para:', activeModule, activeSubModule);
  };

  const handleRowClick = (item: any) => {
    console.log('Item clicado:', item);
  };

  const getButtonText = () => {
    if (activeModule === 'movimentacao_estoque') {
      return 'Nova Movimentação';
    }
    if (activeModule === 'ajustes') {
      return 'Novo Ajuste';
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
          {activeModule === 'movimentacao_estoque' && activeSubModule === 'formulario' ? (
            <MovimentacaoEstoqueForm />
          ) : activeSubModule && currentSubModule ? (
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
