import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ComprasSidebar from "@/components/compras/ComprasSidebar";
import ComprasDashboard from "@/components/compras/ComprasDashboard";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import PedidoDetalhesModal from "@/components/compras/PedidoDetalhesModal";
import NovoPedidoModal from "@/components/compras/NovoPedidoModal";
import ImportarXMLModal from "@/components/compras/ImportarXMLModal";
import ReviewXMLData from "@/components/compras/ReviewXMLData";
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
  const [showImportarXML, setShowImportarXML] = useState(false);
  const [xmlData, setXmlData] = useState(null);

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
    // Para compra fiscal, abre o modal de importar XML
    if (activeModule === 'compra_fiscal' && activeSubModule === 'compra_fiscal') {
      setShowImportarXML(true);
    }
    // Para pedidos, abre o modal de novo pedido
    else if (activeModule === 'pedidos' && activeSubModule === 'pedidos') {
      setShowNovoPedido(true);
    }
  };

  const handleImportarXML = (dadosXML: any) => {
    console.log('XML importado:', dadosXML);
    setXmlData(dadosXML);
    setShowImportarXML(false);
  };

  const handleRowClick = (item: any) => {
    // Só abre detalhes para pedidos
    if (activeModule === 'pedidos' && activeSubModule === 'pedidos') {
      setSelectedPedido(item as Pedido);
      setShowPedidoDetalhes(true);
    }
  };

  const getButtonText = () => {
    if (activeModule === 'compra_fiscal' && activeSubModule === 'compra_fiscal') {
      return 'Importar XML';
    }
    if (activeModule === 'pedidos' && activeSubModule === 'pedidos') {
      return 'Novo Pedido';
    }
    return 'Novo Registro';
  };

  const currentSubModule = activeModule && activeSubModule ? 
    comprasModules[activeModule as keyof typeof comprasModules]?.subModules[activeSubModule] : null;

  const renderContent = () => {
    // Para compra fiscal, renderiza interface específica
    if (activeModule === 'compra_fiscal' && activeSubModule === 'compra_fiscal') {
      return (
        <div className="flex-1 p-6 min-h-0">
          {xmlData ? (
            <ReviewXMLData 
              data={xmlData} 
              onFinalize={() => setXmlData(null)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="max-w-md">
                <h3 className="text-xl font-semibold text-biodina-blue mb-4">
                  Nenhum XML importado
                </h3>
                <p className="text-gray-600 mb-6">
                  Clique em "Importar XML" para começar a importar uma nota fiscal
                </p>
              </div>
            </div>
          )}
        </div>
      );
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

      {showImportarXML && (
        <ImportarXMLModal 
          onClose={() => setShowImportarXML(false)}
          onImport={handleImportarXML}
        />
      )}
    </SidebarLayout>
  );
};

export default Compras;
