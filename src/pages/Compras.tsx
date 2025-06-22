
import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ComprasSidebar from "@/components/compras/ComprasSidebar";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import EmptyState from "@/components/cadastro/EmptyState";
import PedidoDetalhesModal from "@/components/compras/PedidoDetalhesModal";
import { comprasModules } from "@/data/comprasModules";
import { Pedido } from "@/types/compras";

const Compras = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [showPedidoDetalhes, setShowPedidoDetalhes] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

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
    // Por enquanto, apenas para pedidos que temos funcionalidade
    if (activeModule === 'pedidos' && activeSubModule === 'pedidos') {
      console.log('Criar novo pedido');
    }
  };

  const handleGetStarted = () => {
    setActiveModule('pedidos');
    setActiveSubModule('pedidos');
    setExpandedModules(['pedidos']);
  };

  const handleRowClick = (item: any) => {
    // Só abre detalhes para pedidos
    if (activeModule === 'pedidos' && activeSubModule === 'pedidos') {
      setSelectedPedido(item as Pedido);
      setShowPedidoDetalhes(true);
    }
  };

  const currentSubModule = activeModule && activeSubModule ? 
    comprasModules[activeModule as keyof typeof comprasModules]?.subModules[activeSubModule] : null;

  return (
    <SidebarLayout>
      <div className="flex h-full bg-gray-50/50">
        <ComprasSidebar
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
              />

              <div className="flex-1 p-6 min-h-0">
                <DataTable 
                  data={currentSubModule.data} 
                  moduleName={currentSubModule.name}
                  onRowClick={handleRowClick}
                />
              </div>
            </>
          ) : (
            <EmptyState onGetStarted={handleGetStarted} />
          )}
        </div>
      </div>

      {showPedidoDetalhes && selectedPedido && (
        <PedidoDetalhesModal 
          pedido={selectedPedido}
          onClose={() => {
            setShowPedidoDetalhes(false);
            setSelectedPedido(null);
          }}
        />
      )}
    </SidebarLayout>
  );
};

export default Compras;
