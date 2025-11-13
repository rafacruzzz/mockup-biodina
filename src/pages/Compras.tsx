import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ComprasSidebar from "@/components/compras/ComprasSidebar";
import ComprasDashboard from "@/components/compras/ComprasDashboard";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import PedidoDetalhesModal from "@/components/compras/PedidoDetalhesModal";
import NovoPedidoModal from "@/components/compras/NovoPedidoModal";
import PagamentosImportacaoView from "@/components/compras/importacao/PagamentosImportacaoView";
import FechamentoCambioView from "@/components/compras/importacao/FechamentoCambioView";
import CustosImportacaoView from "@/components/compras/importacao/CustosImportacaoView";
import { comprasModules } from "@/data/comprasModules";
import { Pedido } from "@/types/compras";

const Compras = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [showPedidoDetalhes, setShowPedidoDetalhes] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [showNovoPedido, setShowNovoPedido] = useState(false);

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
    // Para pedidos, abre o modal de novo pedido
    if (activeModule === 'pedidos' && activeSubModule === 'pedidos') {
      setShowNovoPedido(true);
    }
    // Para submódulos de importação, ações específicas podem ser implementadas futuramente
    else if (activeModule === 'di') {
      console.log(`Novo registro para: ${activeSubModule}`);
    }
  };

  const handleRowClick = (item: any) => {
    // Só abre detalhes para pedidos
    if (activeModule === 'pedidos' && activeSubModule === 'pedidos') {
      setSelectedPedido(item as Pedido);
      setShowPedidoDetalhes(true);
    }
  };

  const getButtonText = () => {
    if (activeModule === 'pedidos' && activeSubModule === 'pedidos') {
      return 'Novo Pedido';
    }
    if (activeModule === 'di' && activeSubModule === 'pagamentos_importacao') {
      return 'Novo Pagamento';
    }
    if (activeModule === 'di' && activeSubModule === 'fechamento_cambio') {
      return 'Nova Operação';
    }
    if (activeModule === 'di' && activeSubModule === 'custos_importacao') {
      return 'Novo Custo';
    }
    return 'Novo Registro';
  };

  const currentSubModule = activeModule && activeSubModule ? 
    comprasModules[activeModule as keyof typeof comprasModules]?.subModules[activeSubModule] : null;

  const renderContent = () => {
    // Para submódulos de importação, renderiza componentes específicos
    if (activeModule === 'di') {
      if (activeSubModule === 'pagamentos_importacao') {
        return <PagamentosImportacaoView />;
      }
      if (activeSubModule === 'fechamento_cambio') {
        return <FechamentoCambioView />;
      }
      if (activeSubModule === 'custos_importacao') {
        return <CustosImportacaoView />;
      }
      // Para DI principal, mantém a DataTable
      if (activeSubModule === 'di') {
        return (
          <div className="flex-1 p-6 min-h-0">
            <DataTable 
              data={currentSubModule?.data || []} 
              moduleName={currentSubModule?.name || ''}
              onRowClick={handleRowClick}
            />
          </div>
        );
      }
    }

    // Para outros módulos, renderiza a DataTable normal
    return (
      <div className="flex-1 p-6 min-h-0">
        <DataTable 
          data={currentSubModule?.data || []} 
          moduleName={currentSubModule?.name || ''}
          onRowClick={handleRowClick}
        />
      </div>
    );
  };

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
                buttonText={getButtonText()}
              />

              {renderContent()}
            </>
          ) : (
            <ComprasDashboard />
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

      {showNovoPedido && (
        <NovoPedidoModal 
          onClose={() => setShowNovoPedido(false)}
        />
      )}
    </SidebarLayout>
  );
};

export default Compras;
