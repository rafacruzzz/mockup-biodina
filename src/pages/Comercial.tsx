import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ComercialSidebar from "@/components/comercial/ComercialSidebar";
import ComercialDashboard from "@/components/comercial/ComercialDashboard";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import NovoProjetoModal from "@/components/comercial/NovoProjetoModal";
import { comercialModules } from "@/data/comercialModules";
import { Projeto } from "@/types/comercial";
import { FileSpreadsheet } from "lucide-react";
import { downloadImportacaoDiretaTemplate } from "@/utils/excelTemplates";
import { Button } from "@/components/ui/button";

const Comercial = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [showNovoProjeto, setShowNovoProjeto] = useState(false);
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);

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
    setShowNovoProjeto(true);
  };

  const handleRowClick = (item: any) => {
    setSelectedProjeto(item as Projeto);
  };

  const getButtonText = () => {
    return 'Novo Projeto';
  };

  const currentSubModule = activeModule && activeSubModule ? 
    comercialModules[activeModule as keyof typeof comercialModules]?.subModules[activeSubModule] : null;

  const filteredData = currentSubModule?.data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  const handleDownloadTemplate = () => {
    downloadImportacaoDiretaTemplate();
  };

  const renderContent = () => {
    if (!activeSubModule || !currentSubModule) {
      return <ComercialDashboard />;
    }

    return (
      <div className="flex-1 p-6 min-h-0">
        <DataTable 
          data={filteredData} 
          moduleName={currentSubModule?.name || ''}
          onRowClick={handleRowClick}
        />
      </div>
    );
  };

  return (
    <SidebarLayout>
      <div className="flex h-full bg-gray-50/50">
        <ComercialSidebar
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
                // Add template download button for Importação Direta
                extraActions={
                  activeSubModule === 'importacao_direta' ? (
                    <Button 
                      onClick={handleDownloadTemplate}
                      variant="outline"
                      className="gap-2"
                    >
                      <FileSpreadsheet className="h-4 w-4" />
                      Modelo de Importação
                    </Button>
                  ) : undefined
                }
              />

              {renderContent()}
            </>
          ) : (
            <ComercialDashboard />
          )}
        </div>
      </div>

      {showNovoProjeto && (
        <NovoProjetoModal 
          onClose={() => setShowNovoProjeto(false)}
        />
      )}
    </SidebarLayout>
  );
};

export default Comercial;
