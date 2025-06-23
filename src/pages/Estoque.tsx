
import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import EstoqueSidebar from "@/components/estoque/EstoqueSidebar";
import EstoqueDashboard from "@/components/estoque/EstoqueDashboard";
import NovaMovimentacaoModal from "@/components/estoque/NovaMovimentacaoModal";
import MovimentacoesDataTable from "@/components/estoque/MovimentacoesDataTable";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import { estoqueModules } from "@/data/estoqueModules";
import { MovimentacaoEstoque } from "@/types/estoque";

const Estoque = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [isNovaMovimentacaoOpen, setIsNovaMovimentacaoOpen] = useState(false);

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
    if (activeModule === 'movimentacoes') {
      setIsNovaMovimentacaoOpen(true);
    } else {
      console.log('Novo registro para:', activeModule, activeSubModule);
    }
  };

  const handleRowClick = (item: any) => {
    console.log('Item clicado:', item);
  };

  const handleMovimentacaoDetails = (item: MovimentacaoEstoque) => {
    console.log('Detalhes da movimentação:', item);
    // Aqui você pode abrir um modal de detalhes
  };

  const getButtonText = () => {
    if (activeModule === 'movimentacoes') {
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
                {activeModule === 'movimentacoes' && activeSubModule === 'historico' ? (
                  <MovimentacoesDataTable 
                    data={currentSubModule?.data || []} 
                    onRowDetails={handleMovimentacaoDetails}
                  />
                ) : (
                  <DataTable 
                    data={currentSubModule?.data || []} 
                    moduleName={currentSubModule?.name || ''}
                    onRowClick={handleRowClick}
                  />
                )}
              </div>
            </>
          ) : (
            <EstoqueDashboard />
          )}
        </div>
      </div>

      <NovaMovimentacaoModal 
        isOpen={isNovaMovimentacaoOpen}
        onOpenChange={setIsNovaMovimentacaoOpen}
      />
    </SidebarLayout>
  );
};

export default Estoque;
