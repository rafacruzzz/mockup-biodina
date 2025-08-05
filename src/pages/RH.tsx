
import { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import RHSidebar from "@/components/rh/RHSidebar";
import { ProcessoSeletivoProvider } from "@/contexts/ProcessoSeletivoContext";
import { ColaboradorProvider } from "@/contexts/ColaboradorContext";
import Dashboard from "@/components/rh/Dashboard";
import ProcessoSeletivoKanban from "@/components/rh/ProcessoSeletivoKanban";
import Admissao from "@/components/rh/Admissao";
import Colaboradores from "@/components/rh/Colaboradores";

const RH = () => {
  const [activeModule, setActiveModule] = useState("colaboradores");
  const [activeSubModule, setActiveSubModule] = useState("colaboradores");
  const [expandedModules, setExpandedModules] = useState<string[]>(["colaboradores"]);

  const handleModuleToggle = (module: string) => {
    setExpandedModules(prev => 
      prev.includes(module) 
        ? prev.filter(m => m !== module)
        : [...prev, module]
    );
  };

  const handleModuleSelect = (module: string, subModule: string) => {
    setActiveModule(module);
    setActiveSubModule(subModule);
  };

  const renderContent = () => {
    if (activeModule === "colaboradores" && activeSubModule === "colaboradores") {
      return <Colaboradores />;
    }
    if (activeModule === "processoSeletivo") {
      if (activeSubModule === "admissao") {
        return <Admissao />;
      }
      return <ProcessoSeletivoKanban />;
    }
    return <Dashboard />;
  };

  return (
    <ProcessoSeletivoProvider>
      <ColaboradorProvider>
        <SidebarLayout>
          <div className="flex h-screen">
            <RHSidebar
              activeModule={activeModule}
              activeSubModule={activeSubModule}
              expandedModules={expandedModules}
              onModuleToggle={handleModuleToggle}
              onModuleSelect={handleModuleSelect}
              onClose={() => {}}
            />
            <div className="flex-1 p-6">
              {renderContent()}
            </div>
          </div>
        </SidebarLayout>
      </ColaboradorProvider>
    </ProcessoSeletivoProvider>
  );
};

export default RH;
