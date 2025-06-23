import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import EstoqueSidebar from "@/components/estoque/EstoqueSidebar";
import EstoqueDashboard from "@/components/estoque/EstoqueDashboard";
import NovaMovimentacaoModal from "@/components/estoque/NovaMovimentacaoModal";
import MovExcelModal from "@/components/estoque/MovExcelModal";
import MovimentacoesDataTable from "@/components/estoque/MovimentacoesDataTable";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import { estoqueModules } from "@/data/estoqueModules";
import { MovimentacaoEstoque } from "@/types/estoque";
import SeparacaoEstoqueTable from "@/components/estoque/SeparacaoEstoqueTable";
import PosicaoAtualTable from "@/components/estoque/dashboard/PosicaoAtualTable";

const Estoque = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [isNovaMovimentacaoOpen, setIsNovaMovimentacaoOpen] = useState(false);
  const [isMovExcelOpen, setIsMovExcelOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('estoque-sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (!activeModule) {
      setActiveSubModule('');
      setSearchTerm('');
    }
  }, [activeModule]);

  useEffect(() => {
    localStorage.setItem('estoque-sidebar-collapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

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

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
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
  };

  const getButtonText = () => {
    if (activeModule === 'movimentacoes') {
      return 'Nova Movimentação';
    }
    return 'Novo Registro';
  };

  const handleExcelClick = () => {
    setIsMovExcelOpen(true);
  };

  const shouldShowNewButton = () => {
    // Não mostrar botão "Novo Registro" para posição atual e separação
    return activeModule !== 'posicao_estoque';
  };

  const currentSubModule = activeModule && activeSubModule ? 
    estoqueModules[activeModule as keyof typeof estoqueModules]?.subModules[activeSubModule] : null;

  return (
    <SidebarLayout>
      <div className="flex h-full bg-gray-50/50 w-full">
        <EstoqueSidebar
          activeModule={activeModule}
          activeSubModule={activeSubModule}
          expandedModules={expandedModules}
          isCollapsed={isSidebarCollapsed}
          onModuleToggle={toggleModule}
          onModuleSelect={handleModuleSelect}
          onClose={handleCloseSidebar}
          onToggleCollapse={handleToggleSidebar}
        />

        <div className="flex-1 flex flex-col min-h-0">
          {activeSubModule && currentSubModule ? (
            <>
              <ContentHeader
                title={currentSubModule.name}
                description={`Gerencie os registros de ${currentSubModule.name.toLowerCase()}`}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onNewRecord={shouldShowNewButton() ? handleNewRecord : undefined}
                buttonText={getButtonText()}
                showExcelButton={activeModule === 'movimentacoes'}
                onExcelClick={handleExcelClick}
              />

              <div className="flex-1 p-6 min-h-0">
                {activeModule === 'movimentacoes' && activeSubModule === 'movimentacao_estoque' ? (
                  <MovimentacoesDataTable 
                    data={currentSubModule?.data || []} 
                    onRowDetails={handleMovimentacaoDetails}
                  />
                ) : activeModule === 'posicao_estoque' && activeSubModule === 'separacao_estoque' ? (
                  <SeparacaoEstoqueTable 
                    data={currentSubModule?.data || []} 
                  />
                ) : activeModule === 'posicao_estoque' && activeSubModule === 'posicao_atual' ? (
                  <PosicaoAtualTable 
                    data={currentSubModule?.data || []} 
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

      <MovExcelModal 
        isOpen={isMovExcelOpen}
        onOpenChange={setIsMovExcelOpen}
      />
    </SidebarLayout>
  );
};

export default Estoque;
